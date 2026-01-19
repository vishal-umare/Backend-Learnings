// const stu1 ={
//     name : "gilly",
//     age: 22,
//     place: "nagpur"
// };

// const stu2 ={
//     name : "steve",
//     age: 24,
//     place: "pune"
// };
// const stu3 ={
//     name : "noob",
//     age: 22,
//     place: "mumbai"
// };

// CONSTRUCTORS - doesn't return anything and starts with Capital.

// function Person(name, age){
//     this.name = name;
//     this.age = age;
// }

// Person.prototype.talk = function(){
//     console.log(`Hi, My name is ${this.name}`)
// }

// let p1 = new Person("adam" , 25);
// let p2 = new Person("steve", 32);

// CLASSES - similar like constructors but in better way

// class Person{
//     constructor( name , age ){
//         this.name = name;
//         this.age = age;
//     }

//     talk(){
//         console.log(`My name is ${this.name}`)
//     }
// }

// let p1 = new Person("adam", 23);
// let p2 = new Person("steve", 26);

// INHERITANCE

class Person {                             //Parent
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk() {
    console.log(`Hii, my name is ${name}`);
  }
}

class Student extends Person {              //Child
  constructor(name, age, marks) {
    super(name, age);
    // this.name = name;
    // this.age = age;
    this.marks = marks;
  }
}

class Teacher extends Person{                //Child
  constructor(name, age, subject) {
    super(name, age);
    // this.name = name;
    // this.age = age;
    this.subject = subject;
  }
}

let s2 = new Student("steve", 26, 99);
let t2 = new Teacher("eve", 26, "english");
