import { IsOptional, IsString } from 'class-validator'

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}
export class CreateUserDto {
    @IsString()
    username: string

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
