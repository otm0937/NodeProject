// 1.변수
var a = 1;
var b = 2;
c = 3;
console.log(a);
console.log(b);
console.log(c);
console.log("%d %d %d", a, b, c);
console.log(a, b, c);

var s1 = "Hello";
var s2 = "World";
console.log(s1, s2);
console.log("%s %s", s1, s2);

console.log(typeof a); // number
console.log(typeof s1); //string
console.log(typeof true); // boolean
console.log(typeof {}); // object

// 변수 호이스팅(hoisting)
function foo() {
    console.log(d); // undefined
    var d = 10;
    console.log(d);
}

foo();

// ES6(2015) let, const 추가
let e = 10;

// ES5까지는 함수 레벨 스코프
// ES6 : let 추가 -> 블럭 레벨 스코프
function foo2() {
    if (true) {
        var tmp = 0;
        console.log("1:", tmp);
    }
    console.log("2:", tmp);
}

foo2();

const v = 10;
//v++;
