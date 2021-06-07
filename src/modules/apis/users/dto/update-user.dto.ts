import { IsDateString, IsOptional, IsString } from "class-validator"
import { Gender } from './create-user.dto'

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsOptional()
    @IsDateString()
    dateOfBirth: string

    

    @IsOptional()
    @IsString()
    gender: Gender
}
