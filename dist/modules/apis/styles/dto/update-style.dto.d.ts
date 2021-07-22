import { CreateStyleDto } from './create-style.dto';
declare const UpdateStyleDto_base: import("@nestjs/common").Type<Partial<CreateStyleDto>>;
export declare class UpdateStyleDto extends UpdateStyleDto_base {
    activeSnapshotId?: string;
    isActive?: boolean;
}
export {};
