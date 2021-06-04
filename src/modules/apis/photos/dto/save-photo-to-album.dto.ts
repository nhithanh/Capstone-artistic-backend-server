import { IsNotEmpty, IsString } from "class-validator";

export class SavePhotoToAlbumDto {
    @IsString()
    @IsNotEmpty()
    photoLocation: string
}