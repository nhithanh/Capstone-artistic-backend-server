import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateStyleDto } from './create-style.dto';

export class UpdateStyleDto extends PartialType(CreateStyleDto) {
    @IsString()
    @IsOptional()
    activeSnapshotId?: string

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
