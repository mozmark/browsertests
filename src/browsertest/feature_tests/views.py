from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.
from django.shortcuts import render_to_response
from django.template import Context, loader
from django import forms
from browsertest import settings
import binascii, json
from django.views.decorators.csrf import csrf_exempt

img = '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082'

class CookieForm(forms.Form):
    name = forms.CharField()
    value = forms.CharField()
    secure = forms.BooleanField(required=False)
    httponly = forms.BooleanField(required=False)
    
class CookieAbsentForm(forms.Form):
    name = forms.CharField()
    
class XfoForm(forms.Form):
    xfo = forms.CharField(required=False)

def config(request):
    data = {'http_base':settings.HTTP_BASE,
            'https_base':settings.HTTPS_BASE};
    return HttpResponse("browserTestConfig=%s;"%(json.dumps(data)),status=200,mimetype="text/javascript")

def home(request): 
    return render_to_response('index.html')

def setCookie(request):
    form = CookieForm(request.GET) # A form bound to the POST data
    response = HttpResponse('bad data',status=500)
    if form.is_valid():
        name = form.cleaned_data['name']
        value = form.cleaned_data['value']
        secure = form.cleaned_data['secure']
        httponly = form.cleaned_data['httponly']
        response = HttpResponse(binascii.unhexlify(img),mimetype="image/png") 
        response.set_cookie(key=str(name), value=str(value), secure=secure, httponly=httponly)
    return response

def cookiePresent(request,invert=False):
    form = CookieAbsentForm(request.GET) # A form bound to the POST data
    response = HttpResponse('bad data',status=500)
    if form.is_valid():
        name = form.cleaned_data['name']
        if request.COOKIES.has_key(name) != invert:
            response = HttpResponse(binascii.unhexlify(img),mimetype="image/png") 
    return response

def xfoFrame(request):
    form = XfoForm(request.GET)
    t = loader.get_template('xfoframe.html')
    response = HttpResponse(t.render(Context()), mimetype="text/html")
    if form.is_valid():
        xfo = form.cleaned_data['xfo']
        if len(xfo) > 0:
            if xfo.lower() == 'deny':
                response['X-Frame-Options']='DENY'
            elif xfo.lower() == 'sameorigin':
                response['X-Frame-Options']='SAMEORIGIN'
    return response

@csrf_exempt
def originFrame(request):
    data = {}
    if request.META.has_key('HTTP_ORIGIN'):
        data['hasOrigin'] = True
    else:
        print request.META
    return render_to_response('originframe.html',data);
    