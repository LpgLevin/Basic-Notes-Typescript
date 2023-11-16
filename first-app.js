var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Typescript naturally infers that whatever type the value you initialise the variable with is the type it must remain. AKA if you initialise Lily with a string value, you can only ever change it to a string value. If you try to use a number, the variable name will be underlined like so;
var userName = 'Lily';
//userName = 1114;
//the same with initialising with a number then trying to change it to a boolean;
var userAge = 33;
//userAge = true;
// and a boolean to a string;
var isValid = true;
//isValid = 'yes';
//----------------------------------------------------UNION TYPES----------------------------------------------------
//the below tells typescript that userID is either a string or a number.
var userID = 'abc1';
userID = 123;
//----------------------------------------------------OBJECT TYPES----------------------------------------------------
//This is how we tell typescript that the variable is an object with specific properties and their types.
//setting the type/types of user:
var user;
// assigning the value of user:
user = {
    name: 'Lily',
    age: 33,
    isAdmin: true,
    id: 'abc1' //123
};
//----------------------------------------------------ARRAY TYPES----------------------------------------------------
//When you set the type as an array, unlike the other type, you need to use a capital letter.
//Array cannot be set as a type without more information. You need to tell typescript what types will be in the array like so:
//let hobbies: Array<string>;
//OR put the type that will be inside the array with square brackets at the end to represent the array, like so:
var hobbies;
hobbies = ['Sports', 'Cooking'];
//For an array of objects, you can do the following:
var recipes;
//This will be an array of recipe objects with the properties shown above.
//Functions
// You can set the type of the parameters as below
// The type for the return alue is after the parameters outside the brackets.
// The type for the return value for this function is void because it doesn't return anything. You could use undefined but void is better.
//----------------------------------------------------FUNCTION TYPES----------------------------------------------------
function add(a, b) {
    // result is inferred to be of type number because typescript knows that a and b are numbers.
    var result = a + b;
    console.log(result);
}
// If you have a return value, you can set the type of the return value as below - but in this case the return value is inferd to be a number because typescript knows that a and b are numbers:
function add2(a, b) {
    // result is inferred to be of type number because typescript knows that a and b are numbers.
    var result = a + b;
    return result;
}
// Defining function types
//Below you can see a function which takes a function as its 3rd parameter. calcfunc is the name of the parameter and it is a function which takes 2 numbers and returns a number. **calcfunc: (a: number, b: number) => number**
function calculate(a, b, calcfunc) {
    calcfunc(a, b);
}
;
function calculate2(a, b, calcFunc) {
    calcFunc(a, b);
}
;
var veganCake = {
    prepTime: 30,
    difficulty: 'easy',
    serves: 8,
    vegan: true
};
var userLily = {
    email: 'lpglevin@gmail.com',
    username: 'Lily',
    password: 'password'
};
// Then use them in a class like so:
//----------------------------------------------------CLASSES----------------------------------------------------
var AuthCredentials = /** @class */ (function () {
    function AuthCredentials() {
    }
    return AuthCredentials;
}());
function login(details) {
    // uses the user object to log in
}
//call the login function on a user object like so:
login(userLily);
//OR - call the function on a new instance of the class like so:
login(new AuthCredentials());
var adminUser = {
    permissions: ['create-server'],
    userName: 'Lily'
};
var roleName;
roleName = 'admin';
roleName = 'user';
roleName = 'editor';
//roleName = 'moderator'; 
// If you uncomment that last line, this will throw an error because 'moderator' is not one of the three strings specified in the type.
//----------------------------------------------------ADDING TYPE GUARDS----------------------------------------------------
//Sometimes you might want a piece of code ONLY to be executed if you have a value of one of the accepted types. For example, if you have a union type which takes a string or a number, you might want to do something with the value if it is a string, but not if it is a number. You can do this with a type guard.
function performAction(action, roleName) {
    if (roleName === 'admin' && typeof action === 'string') {
        // do something
    }
}
;
//So I think type guards are just if statements to double check the types in the case that multiple types/specific values are allowed?
// Type Guards & Type Narrowing - A Closer Look
// When using "Type Guards" (i.e., if statements that check which concrete type is being used), TypeScript performs so-called "Type Narrowing".
// This means that TypeScript is able to narrow a broader type down to a more specific type.
// Consider this example:
function combine(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    return "".concat(a, " ").concat(b);
}
function login2(u) {
    //if (typeof u === User2) {
    // do something
    // } -------------------------------------------------Uncomment this code to see the problem!
}
// But you could check for the existence of the permissions property since only the Admin object will have one:
function login3(u) {
    if ('permissions' in u) {
        // do something
    }
}
// That code would work at runtime.
//----------------------------------------------------GENERIC TYPES----------------------------------------------------
var roles;
//OR
// let roles: Array<Role>;
roles = ['admin', 'user', 'editor'];
// We can now use the generic type to create multiple storages for different data because its a flexible (generic) type. Like a class.
var textStorage = {
    storage: [],
    add: function (data) {
        this.storage.push(data);
    } // because you have defined T as being string type, typescript knows that the data parameter must be a string.
};
var userStorage = {
    storage: [],
    add: function (user) { }
};
//by using the generic type DataStorage, we create a new type which is like a type-child of DataStorage. It is a specific type which has the properties of DataStorage but also has the specific types we have defined for it.
//----------------------------------------CONFUSING GENERIC FUNCTION TYPES----------------------------------------
function merge(a, b) {
    return __assign(__assign({}, a), b);
}
;
var newUser = merge({ name: 'Lily' }, { age: 33 });
newUser.age; //autocomplete options because you've defined the types of the properties in the merge function. Try deleting the age part and see what the IDE offers you.
// From my understanding so far, generic types are like classes for types. Aka, you can make a type which is inflexible and has to be fillfilled exactly - but you can make a template for a type AKA a PARENT/generic type, from which you can create new instances, and that new instance becomes the specific and inflexible type.
//----------------------------------------COMPILING YOUR CODE----------------------------------------
// To complie the code you can use:
// npx tsc first-app.ts
// Inyour terminal. This will create a new file called first-app.js which is the compiled version of your typescript file. You can then run this file with:
