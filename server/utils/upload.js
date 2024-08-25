import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

// Set up GridFS storage configuration
console.log(process.env.MONGO_URI);
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        
        if (allowedMimeTypes.indexOf(file.mimetype) === -1) {
            console.log(`File type not allowed: ${file.mimetype}`);
            return null;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        
        if (allowedMimeTypes.indexOf(file.mimetype) === -1) {
            console.log(`Invalid file type: ${file.mimetype}`);
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    }
});

export default upload;