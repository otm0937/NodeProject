// 데이터
let nextId = 4;
let movie = [
    { id: 1, title: "스타워즈", director: "조지 루카스", year: "1977" },
    { id: 2, title: "아바타", director: "제임스 카메론", year: "2009" },
    { id: 3, title: "인터스텔라", director: "크리스토버 놀란", year: "2014" },
];
// 목록 조회 (localhost:3000/api/movie)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    res.json(movie.slice(0, limit));
};

// 상세 조회 (localhost:3000/api/movie/:id)
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.filter((m) => m.id === id)[0];

    if (!result) return res.status(404).end();
    res.json(result);
};

// 등록 (localhost:3000/api/movie)
const create = (req, res) => {
    const { director, title, year } = req.body;
    if (!director || !title || !year) return res.status(400).end();
    const m = { id: nextId++, director, title, year };
    movie.push(m);
    res.status(201).json(m);
};

// 수정 (localhost:3000/api/movie/:id)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end;

    const result = movie.find((m) => m.id === id);
    if (!result) return res.status(404).end;

    const { director, title, year } = req.body;
    if (director) result.director = director;
    if (title) result.title = title;
    if (year) result.year = year;
    res.json(result);
};

// 삭제 (localhost:3000/api/movie/:id)
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find((m) => m.id === id);
    if (!result) return res.status(404).end();

    movie = movie.filter((m) => m.id !== id); // [2, 3]
    res.json(movie);
};

module.exports = { list, detail, create, update, remove };
