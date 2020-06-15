// 6. ES6
//let, const 추가
// var vs let (var : 함수레벨 스코프, let : 블록레벨 스코프)
let a = 10;
let b = [1, 2, 3];
let c = {};

const d = 10;

// 템플릿 문자열(백틱 `)
let n1 = "펭",
    n2 = "수";
// My name is 펭 수.
let name = "My name is " + n1 + " " + n2 + ".";
console.log(name);

let name2 = `My name is ${n1} ${n2}.`;
console.log(name2);

// 화살표 함수 (arrow function)
function hello() {
    console.log("hello");
}

var hello = () => {
    console.log("hello");
};
hello();

(() => console.log("hello"))();

// 매개변수 1개 함수
function print(a) {
    console.log(a);
}
print("펭수");

// 익명함수
let print1 = function (a) {
    console.log(a);
};

//함수정의 + 호출
let print2 = (function (a) {
    console.log(a);
})("펭수");

// 화살표 함수
let print3 = ((a) => {
    console.log(a);
})("펭수");

// 매개변수 2개
function add(a, b) {
    return a + b;
}

// 익명함수
let add1 = function (a, b) {
    return a + b;
};

//함수정의 + 호출
let add2 = (function (a, b) {
    return a + b;
})(2, 3);
console.log(add2);

// 화살표 함수
let add3 = (a, b) => {
    return a + b;
};

console.log(((a, b) => a + b)(2, 3));
