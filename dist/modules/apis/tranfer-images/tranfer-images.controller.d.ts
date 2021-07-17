import { TranferImagesService } from './tranfer-images.service';
import { CreateTranferImageDto } from './dto/create-tranfer-image.dto';
import { UpdateTranferImageDto } from './dto/update-tranfer-image.dto';
export declare class TranferImagesController {
    private readonly tranferImagesService;
    constructor(tranferImagesService: TranferImagesService);
    create(createTranferImageDto: CreateTranferImageDto): Promise<import("./entities/tranfer-image.entity").TranferImage>;
    findAll(): Promise<import("./entities/tranfer-image.entity").TranferImage[]>;
    findOne(id: string): Promise<import("./entities/tranfer-image.entity").TranferImage>;
    update(id: string, updateTranferImageDto: UpdateTranferImageDto): string;
    remove(id: string): string;
}
