const express = require("express");
const router = express.Router();
const ctrl = require("./music.ctrl");

// 라우팅 설정
router.get("/", ctrl.list); // 목록조회 (/music)
router.get("/:id", ctrl.checkId, ctrl.detail); // 상세조회 (/music:id)
router.post("/", ctrl.create); // 등록 (/music)
router.put("/:id", ctrl.checkId, ctrl.update); // 수정 (/music:id)
router.delete("/:id", ctrl.checkId, ctrl.remove); // 삭제 (/music:id)

module.exports = router;
