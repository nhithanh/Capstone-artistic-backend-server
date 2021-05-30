import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreatePhoToDTO {

    @ApiProperty({type: String, name: "id", description: "id of the photo"})
    @IsString()
    @IsOptional()
    id? : string;

    @ApiProperty({type: String, name: "userId", description: "userId of who own the photo"})
    @IsString()
    userId: string;

    @ApiProperty({type: String, name: "photoLocation", description: "location of the photo"})
    @IsString() 
    photoLocation: string;
    
    @ApiProperty({type: String, name: "photoName", description: "original name of the photo"})
    @IsString()
    photoName: string;
}
