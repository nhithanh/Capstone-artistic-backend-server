import { IsEmail, IsOptional, IsString } from 'class-validator'

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export class CreateUserDto {
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsOptional()
    @IsString()
    gender: Gender
}
