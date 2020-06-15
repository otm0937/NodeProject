// 웹 어플리케이션 = 프론트 앤드(화면) + 백 엔드(서버)
// HTML, CSS, Javascript :브라우저 내에서 동작
// Node.js 특징
// 1. 크롬 V8 엔진 -> 브라우저 밖에서 동작
// 2. 이벤트 기반 비동기 I/O 방식
// 3. 모듈 시스템 기반 -> 파일 단위로 무듈 관리 (CommonJS 표준 스펙)

// 1. REPL
// 2. 콘솔 출력
console.log("Hello World");
// 3. 웹서버를 띄워 출력
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

// 요청(request), 응답(response)
const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/") {
        res.statusCode = 200; //OK
        res.setHeader("Content-Type", "text/plain");
        res.end("Hello World");
    } else if (req.url === "/html") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<!DOCTYPE html>");
        res.write("<html>");
        res.write("<body><h1>Hello, world</h1></body>");
        res.write("</html>");
        res.end();
    } else if (req.url === "/json") {
        //127.0.0.1:3000/json
        const data = { msg: "Hello, World" };
        res.statusCode = 200; //OK
        res.setHeader("Content-Type", "application/json");
        res.end("Hello World");
        res.end(JSON.stringify(data));
    } else {
        // 그 외의 url인 경우 404 not found
        // Not found (plain, html, json)
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
