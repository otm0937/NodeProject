const MusicModel = require("../../models/music");
const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
};

// 목록조회 (localhost:3000/music?limit=3)
// - 성공: limit 수만큼 music 객체를담은 배열을 리턴 (200:OK)
// - 실패: liimt가 숫자형이 아닌 경우 오류 (400:Bad Request)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    // limit수만큼 music객체를 담은 배열 리턴
    MusicModel.find((err, result) => {
        if (err) return res.status(500).end(); // next(err)
        //res.json(result);
        res.render("music/list", { result });
    }).limit(limit);
};

// 상세 조회 (localhost:3000/apimusic/:id)
// - 성공 : id에 해당하는 music 객체를 리턴 (200: OK)
// - 실패 : 유효한 id가 아닐 경우 (400: Bad Request)
// - 실패 : id가 숫자가 아닐 경우 (404: Bad Request)
const detail = (req, res) => {
    const id = req.params.id;

    // 1. findById()
    /*MusicModel.findById(id, (err, result) => {
        if (err) throw err;
        if (!result) return res.status(404).end();
        res.json(result);
    });*/

    // 2. findOne()
    MusicModel.findOne({ _id: id }, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.json(result);
    });
};

// 등록 (localhost:3000/api/music)
// - 성공 : 등록한 music 객체를 리턴(201: Created)
// - 실패 :singer, title 값 누락 시 400 반환 (400: Bad Request)
const create = (req, res) => {
    const { singer, title } = req.body;
    //if (!singer || !title) return res.status(400).end();

    // 1. Model의 객체의 Document 생성 후 save
    /*const music = new MusicModel({ singer, title });
    music.save((err, result) => {
        if (err) throw err;
        res.status(201).json(result);
    });*/

    // 2. Model.create()
    MusicModel.create({ singer, title }, (err, result) => {
        if (err) throw err;
        res.status(201).json(result);
    });
};

// 수정 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체에 입력데이터로 변경
//           해당 객체를 반환 (200: OK)
// - 실패 : 유효한 id가 아닐 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const update = (req, res) => {
    const id = req.params.id;

    const { singer, title } = req.body;

    MusicModel.findByIdAndUpdate(id, { singer, title }, { new: true }, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.json(result);
    });
};

// 삭제 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체를 배열에서 삭제 후 결과 배열 리턴(200: OK)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
    // const id = parseInt(req.params.id, 10);
    // if (Number.isNaN(id)) return res.status(400).end();

    // const result = music.find((m) => m.id === id);
    // if (!result) return res.status(404).end();

    // music = music.filter((m) => m.id !== id); // [2, 3]
    // res.json(music);

    const id = req.params.id;

    // 삭제처리 (FindByIdAnd)
    MusicModel.findByIdAndDelete(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.json(result);
    });
};

module.exports = { list, detail, create, update, remove, checkId };
