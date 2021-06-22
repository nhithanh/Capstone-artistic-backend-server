import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SaveMediaToAlbumDto {
    @IsString()
    @IsNotEmpty()
    photoLocation: string

    @IsString()
    @IsOptional()
    albumId: string
}