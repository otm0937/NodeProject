const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Doucument의 구조를 정의
// 필드, 타입, 필수여부 등
const MusicSchema = new mongoose.Schema({
    singer: {
        type: String, // 자료형
        required: true, // 필수 여부
        trim: true, // 앞뒤 공백 제거 여부
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

// 스키마 -> 모델
// 컬렉션 -> musics 컬렉션 생성
const Music = mongoose.model("music", MusicSchema);
module.exports = Music;
