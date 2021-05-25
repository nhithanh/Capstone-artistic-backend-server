import { PartialType } from '@nestjs/swagger';
import { CreatePhotoLocalDto } from './create-photo-local.dto';

export class UpdatePhotoLocalDto extends PartialType(CreatePhotoLocalDto) {}
