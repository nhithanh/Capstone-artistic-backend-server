import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SavePhotoToAlbumDto {
    @IsString()
    @IsNotEmpty()
    photoLocation: string

    @IsString()
    @IsOptional()
    albumId: string
}