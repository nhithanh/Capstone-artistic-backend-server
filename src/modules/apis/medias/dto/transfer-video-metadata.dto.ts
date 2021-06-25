import { IsNotEmpty, IsString } from "class-validator";
import { Style } from "../../styles/entities/style.entity";
import { User } from "../../users/entities/user.entity";

export class TransferVideoMetadataDto {
    @IsString()
    @IsNotEmpty()
    storageLocation: string;

    @IsNotEmpty()
    @IsString()
    styleId: Style;
}