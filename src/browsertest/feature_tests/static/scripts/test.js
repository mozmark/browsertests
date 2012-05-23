    // define the Person Class  
    function Person() {
    	this.walk = function(){  
    	    console.log ('I am walking!');  
        };  
        this.sayHello = function(){  
            console.log ('hello');  
        }; 
    }  
      
    // define the Student class  
    function Student() {  
      // Call the parent constructor  
      Person.call(this);  
      this.sayGoodBye = function(){ 
    	  this.walk();
          console.log('goodBye');  
      };
      this.sayHello = function(){  
          console.log('hi, I am a student');  
      };  
    }  
      
    // inherit Person  
    Student.prototype = new Person();  
      
    // correct the constructor pointer because it points to Person  
    Student.prototype.constructor = Student;  
      
    var student1 = new Student();  
    student1.sayHello();  
    student1.walk();  
    student1.sayGoodBye();  
      
    // check inheritance  
    console.log(student1 instanceof Person); // true   
    console.log(student1 instanceof Student); // true  