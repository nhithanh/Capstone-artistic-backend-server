import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateShowcaseDto {

    @ApiProperty({type: String, name: "id", description: "id of the photo"})
    @IsString()
    @IsOptional()
    id? : string;

    @ApiProperty({type: String, name: "photoLocation", description: "location of the photo"})
    @IsString() 
    photoLocation: string;
    
    @ApiProperty({type: String, name: "photoName", description: "original name of the photo"})
    @IsString()
    photoName: string;

    @ApiProperty({type: String, name: "styleId",description: "id of the style where the showcase belong to", default: null})
    @IsString() 
    @IsOptional()
    styleId?: string;

}
