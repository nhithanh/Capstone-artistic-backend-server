import { IsOptional, IsString } from "class-validator";
import { Gender } from "../entities/artist.entity";

export class CreateArtistDto {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    name: string;

    @IsString()
    gender: Gender;
}
