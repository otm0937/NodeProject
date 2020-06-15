const MovieModel = require("..//../models/movie");
const mongoose = require("mongoose");

const checkId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).end();
    }
    next();
};

const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    MovieModel.find((err, result) => {
        if (err) return res.status(500).end();
        res.json(result);
    }).limit(limit);
};

const detail = (req, res) => {
    const id = req.params.id;

    MovieModel.findOne({ _id: id }, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.json(result);
    });
};

const create = (req, res) => {
    const { director, title, year } = req.body;
    MovieModel.create({ title, director, year }, (err, result) => {
        if (err) return res.status(500).end;
        res.status(201).json(result);
    });
};

const update = (req, res) => {
    const id = req.params.id;

    const { title, director, year } = req.body;

    MovieModel.findByIdAndUpdate(id, { title, director, year }, { new: true }, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.json(result);
    });
};

const remove = (req, res) => {
    const id = req.params.id;

    MovieModel.findByIdAndDelete(id, (err, result) => {
        if (err) return res.status(500).end();
        if (!result) return res.status(404).end();
        res.json(result);
    });
};

module.exports = { list, detail, create, update, remove, checkId };
