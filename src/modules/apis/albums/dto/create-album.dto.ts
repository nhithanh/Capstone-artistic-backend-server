import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class CreateAlbumDto {

    @ApiProperty({type: String, name: "id", description: "id of the album"})
    @IsString()
    @IsOptional()
    id? : string;

    @ApiProperty({type: String, name: "userId", description: "userId of who own the albums"})
    @IsString()
    userId: string;


    @ApiProperty({type: String, name: "name", description: "name of the album"})
    @IsString()
    name: string;


    @ApiProperty({type: String, name: "thumbnailURL", description: "thumbnailURL of the albums"})
    @IsString()
    thumbnailURL: string;
}
