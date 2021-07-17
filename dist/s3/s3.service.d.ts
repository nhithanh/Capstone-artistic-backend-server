import { S3 } from 'aws-sdk';
export declare class S3Service {
    s3: S3;
    private bucketName;
    private mainCDN;
    private temporaryBucketName;
    private temporaryCDN;
    constructor();
    getS3SignedURL(locationURL: string): string;
    getCDNURL(locationURL: string): string;
    uploadFile(filePath: string, bucketName: string, key: string): Promise<void>;
    uploadFolder(dir: string, s3FolderName: string): Promise<void>;
    copyPhotoToPermanentBucket(temporaryLocationURL: string, key: string): Promise<import("aws-sdk/lib/request").PromiseResult<S3.CopyObjectOutput, import("aws-sdk").AWSError>>;
}
