/// <reference types="multer" />
import { S3 } from 'aws-sdk';
export declare const uploadImageToS3Option: (s3: S3) => {
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
export declare const uploadImageToS3OptionAdmin: (s3: S3) => {
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
export declare const uploadSnapshotOption: (s3: S3) => {
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
export declare const uploadVideoOption: (s3: S3) => {
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
