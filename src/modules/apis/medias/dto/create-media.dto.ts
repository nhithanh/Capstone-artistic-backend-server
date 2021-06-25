import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { MEDIA_TYPE } from '../entities/media.entity'

export class CreateMediaDTO {

    @ApiProperty({type: String, name: "id", description: "id of the media"})
    @IsString()
    @IsOptional()
    id? : string;

    @ApiProperty({type: String, name: "userId", description: "userId of who own the media"})
    @IsString()
    @IsOptional()
    userId?: string;

    @ApiProperty({type: String, name: "photoLocation", description: "location of the media"})
    @IsString()
    @IsOptional() 
    storageLocation?: string;
    
    @ApiProperty({type: String, name: "photoName", description: "original name of the media"})
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({type: String, name: "type", description: "type of the media VIDEO/PHOTO"})
    @IsString()
    @IsOptional()
    type?: MEDIA_TYPE;

    @ApiProperty({type: String, name: "albumId",description: "id of the album where the media belong to", default: null})
    @IsString() 
    @IsOptional()
    albumId?: string;
}
