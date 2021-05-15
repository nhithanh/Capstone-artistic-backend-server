import { IsNotEmpty, IsString } from "class-validator";
import { Gender } from "../entities/artist.entity";

export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    gender: Gender;
}


