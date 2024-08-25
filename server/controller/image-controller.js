import mongoose from 'mongoose';
import grid from 'gridfs-stream';

const baseUrl = process.env.BASE_URL || 'http://localhost:8000'; // Use environment variable for base URL

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    // Initialize GridFSBucket
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos' // Bucket name should match the one used in upload.js
    });

    // Initialize gridfs-stream
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos'); // Ensure this matches the bucket name in upload.js
});

export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "File not found" });
    }

    // Construct the image URL
    const imageUrl = `${baseUrl}/file/${req.file.filename}`;
    res.status(200).json({ imageUrl });
}

export const getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Set the content type header based on the file's mime type
        const contentType = file.contentType || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);

        // Create a read stream from GridFSBucket
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.on('error', () => {
            res.status(500).json({ message: "Error occurred while streaming the file" });
        });

        // Pipe the read stream to the response
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}