import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { MEDIA_TYPE } from '../entities/media.entity'

export class CreateMediaDTO {

    @ApiProperty({type: String, name: "id", description: "id of the photo"})
    @IsString()
    @IsOptional()
    id? : string;

    @ApiProperty({type: String, name: "userId", description: "userId of who own the photo"})
    @IsString()
    userId: string;

    @ApiProperty({type: String, name: "photoLocation", description: "location of the photo"})
    @IsString() 
    storageLocation: string;
    
    @ApiProperty({type: String, name: "photoName", description: "original name of the photo"})
    @IsString()
    name: string;

    @IsString()
    type: MEDIA_TYPE;

    @ApiProperty({type: String, name: "albumId",description: "id of the album where the photo belong to", default: null})
    @IsString() 
    @IsOptional()
    albumId?: string;
}
