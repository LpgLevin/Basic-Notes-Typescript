// Typescript naturally infers that whatever type the value you initialise the variable with is the type it must remain. AKA if you initialise Lily with a string value, you can only ever change it to a string value. If you try to use a number, the variable name will be underlined like so;
let userName = 'Lily';
//userName = 1114;
//the same with initialising with a number then trying to change it to a boolean;
let userAge = 33;
//userAge = true;
// and a boolean to a string;
let isValid = true;
//isValid = 'yes';
  
//the below tells typescript that userID is either a string or a number.
let userID: string | number ='abc1';
userID = 123;

//This is how we tell typescript that the variable is an object with specific properties and their types.
//setting the type/types of user:
let user: {
    name: string;
    age: number;
    isAdmin: boolean;
    id: string | number;
};
// assigning the value of user:
user = {
    name: 'Lily',
    age: 33,
    isAdmin: true,
    id: 'abc1' //123
}

//Arrays
//When you set the type as an array, unlike the other type, you need to use a capital letter.
//Array cannot be set as a type without more information. You need to tell typescript what types will be in the array like so:

//let hobbies: Array<string>;

//OR put the type that will be inside the array with square brackets at the end to represent the array, like so:

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];

//For an array of objects, you can do the following:

let recipes: {prepTime: number; difficulty: string; serves: number; vegan: boolean}[];

//This will be an array of recipe objects with the properties shown above.

//Functions
// You can set the type of the parameters as below
// The type for the return alue is after the parameters outside the brackets.
// The type for the return value for this function is void because it doesn't return anything. You could use undefined but void is better.

function add(a: number, b: string): void {
    // result is inferred to be of type number because typescript knows that a and b are numbers.
    const result = a + b;
    console.log(result);
}

// If you have a return value, you can set the type of the return value as below - but in this case the return value is inferd to be a number because typescript knows that a and b are numbers:

function add2(a: number, b: number): number {
    // result is inferred to be of type number because typescript knows that a and b are numbers.
    const result = a + b;
    return result;
}

// Defining function types
//Below you can see a function which takes a function as its 3rd parameter. calcfunc is the name of the parameter and it is a function which takes 2 numbers and returns a number. **calcfunc: (a: number, b: number) => number**
function calculate(
    a: number, 
    b: number, 
    calcfunc: (a: number, b: number) => number
){
    calcfunc(a, b);
};

// creating custom types
// by using the type key word and storing the type assignments in the variable name, you don't have to type our the type assignments inside the parameters in the function. You can just use the variable name instead. The variable name becomes the type.

type Addfn = (a: number, b: number) => number;


function calculate2(a: number, b: number, calcFunc: Addfn){
   calcFunc(a, b);
};

// The interface key word is used to create custom types for objects. The interface is a blueprint for the object. It defines the properties and their types. The interface is used to define the type of the object.

interface Recipe {
    prepTime: number;
    difficulty: string;
    serves: number;
    vegan: boolean;
}

let veganCake: Recipe = {
    prepTime: 30,
    difficulty: 'easy',
    serves: 8,
    vegan: true
};

// You can use the type key word to do the same thing. The interafce key word does not allow you to store union types.
//However there are some advantages to using the interface key word. If you are making a class, you can set the types:

interface Credentials {
    email: string;
    username: string;
    password: string;
}

let userLily: Credentials = {
    email: 'lpglevin@gmail.com',
    username: 'Lily',
    password: 'password'
}

// Then use them in a class like so:

class AuthCredentials implements Credentials {
    email: string;
    username: string;
    password: string;
    // you can add more properties if you want but it will throw an error if you don't add the properties from the interface.
    
}

function login(details: Credentials){
    // uses the user object to log in
}

//call the login function on a user object like so:

login( userLily );

//OR - call the function on a new instance of the class like so:

login( new AuthCredentials() );

// in conclusion, the interface key word is better if you are using classes.
// and interface is extendable. You can redfine the same interface with the same name and add more properties or methods to it.

// interface Credentials {
//     age: number
// } 


// the above just adds the age property to the interface. You can't do this with the type key word. This may not be necessary for a small project where you can just edit the original interface, but tis allows remote devs to add to the interface without having access to the original declaration. If you un-comment the above code, you will see that the login function can no longer be called on the new instance of the class (red line will appear on lines 121 and 139) because the declaration of the class AuthCredentials no longer fullfils its type, Credentials, which requires an age property. 


// In most cases, it doesn't matter if you use interface or type. It's just a matter of preference. I personally feel as though type might be safer in the same way that const is safer than let. It's more restrictive. But I'm not sure. I need to do more research on this.


// Merging Types

type Admin = {
    permissions: string[];
};

type AppUser = {
    userName: string;
};

//the above types are seperate but cna be merged - we might want to do this if we want to continue using those types seperately but also have access to a type which has the properties of both types. We can do this by using the & symbol like so:

type AppAdmin = Admin & AppUser;

let adminUser: AppAdmin = {
    permissions: ['create-server'],
    userName: 'Lily'
};

// you can do all the same stuff replacing the keyword type with interface. Except for the merging part, which would be written like so:

interface AppAdmin2 extends Admin, AppUser {}

// Above, I am using 'AppAdmin2' to avoid an error, but its meant to represent what you would do instead of line 167. In the curly brackets, you can either add more properties or you can leave it blank.



