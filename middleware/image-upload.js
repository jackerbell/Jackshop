const multer = require('multer');
const uuid = require('uuid').v4 // 파일 이름으로 충돌하는 것을 방지하기 위해 고유 아이디 생성

const upload = multer({
  storage: multer.diskStorage({
    destination: 'product-data/images', // 업로드된 이미지가 저장되는 경로
    filename: (req,file,cb) => {
      cb(null,uuid() + '-' + file.originalname); // 잠재적오류, 콜백함수...
    }
  })
});

const configureMulterMiddleware = upload.single('image'); // 들어오는 요청에서 필드 이름으로 단일 파일 추출 가능

module.exports = configureMulterMiddleware;