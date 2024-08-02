const multer = require('multer');
const path = require('path');

const fileFilter = (req,file,cb)=>{
    const extname = ['.png','.jpg','.jpeg','.webp'];

    let ext = path.extname(file.originalname);

    if(extname.includes(ext)){
      return cb(null,true);
    }
    else{
        cb(new Error('Only images are allowed'),false);
    }
}

const storage = multer.memoryStorage();

const upload = multer({ storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }});

module.exports = upload;