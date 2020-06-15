const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
const port = 3000;

// 로깅처리 미들웨어 설정
app.use(logger("combined")); //dev < short < common < combined

// HTTP Method : GET, POST, PUT, DELETE, ...
app.get("/", (req, res) => res.send("으아아아아악!!!"));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// true: qs(확장모듈), false: querystring(기본모듈)
app.use(bodyParser.urlencoded({ extended: false }));

// 바디 메시지가 JSON 형식인 경우에 바디파서 설정
app.use(bodyParser.json());

// 정적 파일 위치 설정
// 127.0.0.1:3000/music.html
app.use("/" /*생략가능*/, express.static("public"));
// 127.0.0.1:3000/static/music.html
app.use("/static", express.static("public"));
// music, 127.0.0.1:3000/?singer=아이유&title=좋은날
// Query string
app.get("/music", (req, res) => {
    console.log(req);
    // ES6, 객체 구조 분해 할당 (비구조화 할당)
    const { singer, title } = req.query; // {singer:xx, title:xx}
    res.send(`query string(get) -> ${singer}의 ${title}입니다.`);
});

// URL 파라미터 (REST API)
// 127.0.0.1:3000/music/아이유/좋은날
app.get("/music/:singer/:title", (req, res) => {
    const { singer, title } = req.params;
    res.send(`url parametor(get) -> ${singer}의 ${title}입니다.`);
});

// POST방식
// HTTP Message = Header부 + Body부
// GET: Header부에 데이터를 담음, 길이 제한이 있음, 캐싱이 됨
// POST: Body부에 데이터를 담음, 길이 제한이 없음, 캐싱이 안됨
// company.com/apply?id=10002 -> 해킹사고
// content-type : x-www-forn-urlenoded
app.post("/music", (req, res) => {
    const { singer, title } = req.body;
    res.send(`urlencoded(post) -> ${singer}의 ${title}입니다.`);
});

// URL 파라메터 방식 (REST API)
app.post("/music/:singer/:title", (req, res) => {
    const { singer, title } = req.params;
    res.send(`url parameter(post) -> ${singer}의 ${title}입니다.`);
});

// PUT : http://localhost:3000/music/:id
// { singer: 아이유, title: 좋은날 }
//결과 : {id} -> 아이유의 좋은날로 수정됨
app.put("/music/:id", (req, res) => {
    const { id } = req.param;
    const { singer, title } = req.body;
    res.send(`${id} -> ${singer}의 ${title}로 수정됨`);
});

// 여기까지 내려왔으면 위에서 처리가 되지 않은 것
app.use((req, res, next) => {
    const error = new Error("없는 페이지입니다.");
    ///error.code = 404;
    next(error);
});

// 오류처리 미들웨어 함수
app.use((err, req, res, _) => {
    // if (err.code) res.status(err.code);
    // else res.status(500); // 500: Internal Server Error
    res.status(err.code || 500);
    // if (err.message) res.send(err.message);
    // res.send("Internal Server Error");
    res.send(err.message || "Internal Server Error");
});

// HTTP Method (CRUD)
// - GET : 조회
// - POST : 생성
// - PUT : 갱신
// - DELETE : 삭제
const a = (b) => (c) => b * c;

// REST API
// HTTP요청 시 경로에 자원을 요청 -> 명사 지정
// 예) GET /users, GET /users/{id}
// test.com/users [GET] : 조회 (목록, 상세)
// test.com/users [POST] : 등록
// test.com/users [PUT] : 갱신
// test.com/users {id} [DELETE] : 삭제

// (bad case)
// test.com/users/create
// test.com/users/search
// test.com/users/update
// test.com/users/delete
