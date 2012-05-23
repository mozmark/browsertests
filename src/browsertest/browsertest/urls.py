from django.conf.urls import patterns, include, url
from browsertest import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    (r'^$','feature_tests.views.home'),
    (r'^config.js$','feature_tests.views.config'),
    (r'^setCookie$','feature_tests.views.setCookie'),
    (r'^cookiePresent$','feature_tests.views.cookiePresent'),
    (r'^cookieAbsent$','feature_tests.views.cookiePresent',{'invert':True}),
    (r'^xfoFrame$','feature_tests.views.xfoFrame'),
    (r'^originFrame$','feature_tests.views.originFrame'),
)

urlpatterns += staticfiles_urlpatterns()