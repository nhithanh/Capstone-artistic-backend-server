import { PartialType } from '@nestjs/swagger';
import { CreateTranferImageDto } from './create-tranfer-image.dto';

export class UpdateTranferImageDto extends PartialType(CreateTranferImageDto) {}
