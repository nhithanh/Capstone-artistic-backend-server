export declare class User {
    id: string;
    email: string;
    role: string;
    defaultAlbumId: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    comparePassword(password: string): boolean;
    hashPassword(): void;
}
