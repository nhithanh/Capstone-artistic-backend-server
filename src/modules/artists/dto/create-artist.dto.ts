import { IsString } from "class-validator";
import { Gender } from "../entities/artist.entity";

export class CreateArtistDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    gender: Gender;
}


