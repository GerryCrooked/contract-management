require('dotenv').config();
const Minio = require('minio');

const minioEndpoint = process.env.MINIO_ENDPOINT.replace("http://", "").replace("https://", "");
const minioPort = 9000; // MinIO default API port

const minioClient = new Minio.Client({
    endPoint: minioEndpoint.split(":")[0], // Extract hostname (remove port if present)
    port: minioPort,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

// 🚀 Create bucket if not exists
const initMinio = async () => {
    try {
        const bucketExists = await minioClient.bucketExists(process.env.MINIO_BUCKET_NAME);
        if (!bucketExists) {
            await minioClient.makeBucket(process.env.MINIO_BUCKET_NAME);
            console.log(`✅ MinIO bucket '${process.env.MINIO_BUCKET_NAME}' created.`);
        }
    } catch (error) {
        console.error("❌ MinIO setup error:", error);
    }
};

// 🚀 Upload file
const uploadFile = async (fileName, fileBuffer, mimeType) => {
    try {
        await minioClient.putObject(process.env.MINIO_BUCKET_NAME, fileName, fileBuffer, { "Content-Type": mimeType });
        return `File '${fileName}' uploaded successfully.`;
    } catch (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }
};

// 🚀 Download file
const downloadFile = async (fileName) => {
    try {
        return await minioClient.getObject(process.env.MINIO_BUCKET_NAME, fileName);
    } catch (error) {
        throw new Error(`Download failed: ${error.message}`);
    }
};

// 🚀 Delete file
const deleteFile = async (fileName) => {
    try {
        await minioClient.removeObject(process.env.MINIO_BUCKET_NAME, fileName);
        return `File '${fileName}' deleted successfully.`;
    } catch (error) {
        throw new Error(`Delete failed: ${error.message}`);
    }
};

module.exports = { initMinio, uploadFile, downloadFile, deleteFile };
