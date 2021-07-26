"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoOption = exports.uploadSnapshotOption = exports.uploadImageToS3OptionAdmin = exports.uploadImageToS3Option = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const multerS3 = require("multer-s3");
const uploadImageToS3Option = (s3) => {
    return {
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                cb(null, true);
            }
            else {
                cb(new common_1.HttpException({
                    status: 400,
                    message: `Unsupported file type ${path_1.extname(file.originalname)}`
                }, common_1.HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: multerS3({
            s3: s3,
            bucket: 'artisan-photos',
            key: function (req, file, cb) {
                let destination = `users/${req.user.id}/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`;
                cb(null, destination);
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    };
};
exports.uploadImageToS3Option = uploadImageToS3Option;
const uploadImageToS3OptionAdmin = (s3) => {
    return {
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                cb(null, true);
            }
            else {
                cb(new common_1.HttpException({
                    status: 400,
                    message: `Unsupported file type ${path_1.extname(file.originalname)}`
                }, common_1.HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: multerS3({
            s3: s3,
            bucket: 'artisan-photos',
            key: function (req, file, cb) {
                let destination = `assets/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`;
                cb(null, destination);
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    };
};
exports.uploadImageToS3OptionAdmin = uploadImageToS3OptionAdmin;
const uploadSnapshotOption = (s3) => {
    return {
        fileFilter: (req, file, cb) => {
            if (file.originalname.includes('.pth')) {
                cb(null, true);
            }
            else {
                cb(new common_1.HttpException({
                    status: 400,
                    message: `Unsupported file type ${path_1.extname(file.originalname)}`
                }, common_1.HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: multerS3({
            s3: s3,
            bucket: 'artisan-photos',
            key: function (req, file, cb) {
                let destination = `snapshots/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`;
                cb(null, destination);
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    };
};
exports.uploadSnapshotOption = uploadSnapshotOption;
const uploadVideoOption = (s3) => {
    return {
        fileFilter: (req, file, cb) => {
            if (file.mimetype.match(/\/(mp4)$/)) {
                cb(null, true);
            }
            else {
                cb(new common_1.HttpException({
                    status: 400,
                    message: `Unsupported video file type ${path_1.extname(file.originalname)} ${JSON.stringify(file)}`
                }, common_1.HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: multerS3({
            s3: s3,
            bucket: 'artisan-photos',
            key: function (req, file, cb) {
                const userId = req.body['userId'] ? req.body['userId'] : req.user.id;
                const folderName = `users/${userId}/${new Date().toISOString().substring(0, 10)}/${Date.now().toString()}`;
                req.folderName = folderName;
                const destination = `${folderName}/original.mp4`;
                cb(null, destination);
            },
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    };
};
exports.uploadVideoOption = uploadVideoOption;
//# sourceMappingURL=multer.service.js.map