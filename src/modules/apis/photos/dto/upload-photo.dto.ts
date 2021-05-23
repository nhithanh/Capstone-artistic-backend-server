import { PartialType } from '@nestjs/swagger';
import { CreatePhoToDTO } from './create-photo.dto';

export class UpdatePhotoDTO extends PartialType(CreatePhoToDTO) {}
