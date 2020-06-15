// 2. 배열
var arr = [1, 2, 3, 4, 5];
console.log(arr.length); // 5
console.log(arr[2]); // 3

let arr2 = [1, 2, "apple", "banana"];
// apple 출력
console.log(arr2[2]);

// 반복문
for (i = 0; i < arr2.length; i++) {
    console.log(i, arr2[i]);
}

// for-in
for (i in arr2) {
    console.log(i); //index
}

// for-of (ES6)
for (i of arr) {
    console.log(i);
}

// splice
// index, howmany(삭제), elements(추가)
let a = ["a", "b", "c"];
a.splice(1, 0, "d"); //a, d, b, c
console.log(a);

// [ 'a', 'd', 'b', 'c' ]
// a, d, x, y, c

a.splice(2, 1, "x", "y");
console.log(a);

const b = [1, 2, 3, 4, 5];
console.log(b.slice(0, 3));

const result = b.find((item) => item >= 4); // 3, 4, 5
console.log(result);

const result2 = b.filter((item) => item >= 3);
console.log(result2);

const result3 = b.map((item) => item * 2);
console.log(result3);
