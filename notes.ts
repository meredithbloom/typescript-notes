// TYPESCRIPT NOTES

// tsconfig.json file: configuration file for typescript at root of project
// also allows you to use 'tsc' in terminal with no further arguments


// TYPES
// all "primitive", or built-in, types in javascript are recognized by typescript

// type inference: typescript expects the data type of the variable to match the type of the value assigned to it at its declaration. if you later try to set that variable to another type, typescript will throw an error
// when typescript isn't able to infer a type, it will consder the variable to be of type 'any'

let first = 'Anders'; // type inference: string
// first = 3; // error: type '3' is not assignable to type 'string'
let second = 3; // type inference: number
let third = true; // type inference: boolean
let fourth = [1, 2, 3]; // type inference: number[]
let fifth = { name: 'Anders', age: 30 }; // type inference: { name: string, age: number }

// the shape of an object - what member properties it does or doesn't contain. typescript will log an error if the code tries to access members of an object known not to exist. it may even make suggestions for what you meant to do
let firstName = 'muriel!';
// console.log(firstName.toUppercase()); // error: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
console.log(firstName.toUpperCase()); // MURIEL!

let any; // type inference: any - no type is inferred because a variable is not assigned an initial value

// type annotations: explicitly declaring the type of a variable
let num: number = 3;
let str: string = 'hello'; 
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let obj: { name: string, age: number } = { name: 'Anders', age: 30 };

// FUNCTIONS
// function parameters can have type annotations for both arguments and return values 

function greet(name: string): string {
    return `Hello, ${name}!`;
}

greet('Anders'); // Hello, Anders!

// optional parameters: a parameter can be made optional by adding a question mark after its name and type annotation
function greet2(name?: string): string {
    return `Hello, ${name || 'stranger'}!`;
}

greet2(); // Hello, stranger!

// default parameters: a parameter can be given a default value - typescript will infer the parameter type to be the same as the default value's type
function exponentiation(power=1) {
    return 2 ** power;
}

// inferring return types - typescript can infer the return type of a function based on the return value type, even if it's not explicitly annotated
function factOrFiction() {
  return Math.random() >= 0.5 ? 'fact' : 'fiction';
}

// const invalidAnswer: boolean = factOrFiction(); // error: Type 'string' is not assignable to type 'boolean'

// if a function doesn't return any value, its return type can be annotated as 'void'
function sayHi(): void {
    console.log('Hi!');
}

// explicit return types
function trueOrFalse(value: boolean): boolean {
  if (value) {
    return true;
  }
  // return 'false'; // error: Type 'string' is not assignable to type 'boolean'
  return false;
}

// COMPLEX TYPES

// ENUM type: define a set of possible values for a variable 
enum MaritalStatus {
  Single,
  Married,
  Separated,
  Divorced
};

let employee: [string, number, MaritalStatus] = ['Anders', 30, MaritalStatus.Married];

// NUMERIC ENUM: enum values are initialized with a numeric value
enum ClassGrade {
  Freshman = 9, // default value would normally be 0 for first enum member
  Sophomore, // since first member is assigned a value, the rest will be incremented from that value // 10
  Junior, // 11
  Senior // 12
};

// STRING ENUM: enum values are initialized with a string value
enum ClassName {
  Freshman = 'FRESHMAN',
  Sophomore = 'SOPHOMORE',
  Junior = 'JUNIOR',
  Senior = 'SENIOR'
}

const studentClass: ClassName = ClassName.Sophomore;
const studentGrade: ClassGrade = ClassGrade.Sophomore;

console.log(`I am a ${studentClass} in high school in ${studentGrade}th grade.`);
// I am a SOPHOMORE in high school in 10th grade.

// by default, typescript assigns a value of 0 to the first member of a numeric enum type and auto-increments the value of the rest of the members. however, you can override the default value of any member by assigning specific nurmeric values to some or all of the members
enum Weekdays {
  Monday = 1, // numeric enum type will start at 1 rather than 0
  Tuesday, // 2
  Wednesday, // 3
  Thursday, // 4
  Friday // 5
}

// numeric enum type with all explicit values
enum Grades {
  A = 90,
  B = 80,
  C = 70,
  D = 60,
  F = 50
}

// this numeric enum type has only some explicit values
enum Prizes {
  Pencil = 5,
  Notebook, // no error, value is 6
  Eraser = 10,
  Ruler // no error, value is 11
}

const day: Weekdays = Weekdays.Wednesday;
const grade: Grades = Grades.B;
const prize: Prizes = Prizes.Eraser;
console.log(`On day ${day} of the week, I got ${grade} on my test! I won a prize with ${prize} points!`);
// On day 3 of the week, I got 80 on my test! I won a prize with 10 points!

// you can assign a valid numeric value to a variable whose type is a numeric enum
enum Weekend {
  Friday = 5,
  Saturday,
  Sunday
}

// assign a valid value of Weekend
const today: Weekend = 7; // no error
console.log(`Today is the ${today}th day of the week!`);
// Today is the 7th day of the week!

// string enum variable assignment - unlike numeric enums, you can't assign a string value to a variable whose type is a string enum
enum Directions {
  North = 'NORTH',
  South = 'SOUTH',
  East = 'EAST',
  West = 'WEST'
}

// assign a string to a string enum type
let direction: Directions;
// direction = 'NORTH'; // error: Type '"NORTH"' is not assignable to type 'Directions'
direction = Directions.North; // no error

// object type: define an object type with specific properties and their types

let car: { make: string, model: string, year: number };

car = { make: 'Toyota', model: 'Corolla', year: 2019 };
// car = { make: 'Honda', mode: 'Civic', year: 2020 }; // will throw an error because 'model' is misspelled and will suggest if you meant 'model'
car = { make: 'Honda', model: 'Civic', year: 2020 }; // no error
// car = { make: 'Ford', model: 'Fusion', year: '2021' }; // error: Type 'string' is not assignable to type 'number'


// TYPE ALIAS: define a custom type that can be used in place of a built-in type or a complex type
// syntax: type <alias> = <type>

type Student = {
  name: string,
  age: number,
  courses: string[]
};

let boris: Student = { name: 'Boris', age: 30, courses: ['Math', 'Science'] };

// multiple type aliases - you can create multiple type aliases that define the same data type, and use them interchangeably
type Employee = {
  name: string,
  age: number,
  courses: string[]
};

let studentMegan: Student = { name: 'Megan', age: 25, courses: ['History', 'English'] };
let employeeMegan: Employee = studentMegan;
console.log(studentMegan === employeeMegan); // true


// FUNCTION TYPE alias
// syntax is similar to defining a function, but with the 'type' keyword
type NumberArrayToNumber = (numbers: number[]) => number;

// this function uses a function type alias
let sumAll: NumberArrayToNumber = function(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// this function also uses the same function type
let computeAverage: NumberArrayToNumber = function(numbers: number[]): number {
  return sumAll(numbers) / numbers.length;
}

console.log(computeAverage([1, 2, 3, 4, 5])); // 3


// GENERIC TYPE alias - symbol can be any alphanumeric character or string
// syntax: type <alias> = <type><T> where T is a type parameter

type Collection<G> = {
  name: string,
  quantity: number,
  items: G[]
}

let bookCollection: Collection<string> = {
  name: 'Books',
  quantity: 5,
  items: ['The Great Gatsby', 'Pride and Prejudice']
};

let primeNumberCollection: Collection<number> = {
  name: 'Prime Numbers',
  quantity: 3,
  items: [2, 3, 5]
};

// GENERIC FUNCTION TYPE
// a function can take parameters of generic types and return a generic type

// This is a generic function type alias
function findMiddleMember<M>(members: M[]): M {
  return members[Math.floor(members.length/2)];
}

// Call function for an array of strings
console.log(findMiddleMember<string>(['I', 'am', 'very', 'happy'])); // Prints "very"

// Call function for an array of numbers
console.log(findMiddleMember<number>([210, 369, 102]));     // Prints 369


// ONE DIMENSIONAL ARRAY

// typescript type
// syntax type[] = [type, type2, ...typeN]

let zipCodes: string[] = ['28341', '12234', '13259']
// zipCodes.push(11237); // pushing a number to zipcodes will throw an error, as it is not of type string

// typescript generic type for one dimensional array
let zipCodes2: Array<string> = ['28341', '12234', '13259']
zipCodes2.push('11237'); // no error


// MULTI DIMENSIONAL ARRAY

// can be annotated by adding an extra [] for each extra dimension of the array 
let matrix: number[][] = [[1, 2], [3, 4], [5, 6]];

let zipCodesMatrix: string[][] = [zipCodes, zipCodes2];

// an array of any dimension can be initialized as an empty array without generating any error
let emptyMatrix: number[][] = [];
let emptyArray: number[] = [];

// TUPLE type: a fixed-length array where each element has a specific type

// will throw an error if a tuple with a different number/type of elements is assigned to a variable with a different tuple type
// a tuple cannot expand, whereas an array can
// assigning an array to a tuple, even one of the same type and length, will throw an error

// an array
let header: string[] = ['Name','Age', 'Smoking', 'Salary'];

// vs a tuple
let profile: [string, number, boolean, number] = ['Anders', 30, false, 50000];

// when an array is declared without explicit type annotation, typescript will infer the type as an array NOT a tuple

// the javascript method .concat() can be called on a typescript tuple, and this produces a new array type instead of a tuple
const threeWords: [string, string, string] = ['hello', 'world', 'typescript'];

// creates a new array type
let moreWords = threeWords.concat(['is', 'awesome']);
moreWords[5] = '!';
console.log(moreWords); // ['hello', 'world', 'typescript', 'is', 'awesome', '!']

// REST PARAMETER
// a rest parameter allows a function to accept an indefinite number of arguments as an array
// when a rest param is inside a function, typescript implicitly assigns an array type of 'any'

const sumAllNumbers = (...numberList): number => {
    // Error: Rest parameter 'numberList' implicitly has an 'any[]' type.
    let sum = 0;
    for (let i=0; i < numberList.length; i++) {
      sum += numberList[i];
    }
    return sum;
}

// Notice third argument is a string
console.log(sumAllNumbers(100, 70, '30'));
// Prints a string "17030 instead of a number 200


// rest parameter EXPLICIT type
const sumAllNumberOnly = (...numberList: number[]): number => { 
    let sum = 0;
    for (let i=0; i < numberList.length; i++) {
      sum += numberList[i];
    }
    return sum;
}
console.log(sumAllNumbers(100, 70, '30')); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// TUPLE spread syntax
// spread syntax can be used with a tuple as an argument to a function call whose parameter types match those of the tuple elements


function modulo(dividend: number, divisor: number): number {
  return dividend % divisor;
}

const numbers: [number, number] = [6, 4];

// Call modulo() with a tuple
// console.log(modulo(numbers));
// Error: Expected 2 arguments, but got 1.
// Prints NaN

// Call modulo() with spread syntax
console.log(modulo(...numbers));
// No error, prints 2