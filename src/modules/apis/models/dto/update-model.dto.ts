import { PartialType } from '@nestjs/swagger';
import { CreateModelDTO } from './create-model.dto';

export class UpdateModelDTO extends PartialType(CreateModelDTO) {}
