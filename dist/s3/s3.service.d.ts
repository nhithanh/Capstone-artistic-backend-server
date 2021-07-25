import { S3 } from 'aws-sdk';
export declare class S3Service {
    s3: S3;
    private BUCKET_NAME;
    private CDN_ENDPOINT;
    constructor();
    getCDNURL(locationURL: string): string;
    uploadFile(filePath: string, key: string): Promise<void>;
    uploadFileWithBuffer(fileContent: any, key: string): Promise<S3.ManagedUpload.SendData>;
    uploadFolder(dir: string, s3FolderName: string): Promise<void>;
}
