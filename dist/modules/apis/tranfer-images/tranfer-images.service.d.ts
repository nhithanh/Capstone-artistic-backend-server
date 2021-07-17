import { CreateTranferImageDto } from './dto/create-tranfer-image.dto';
import { UpdateTranferImageDto } from './dto/update-tranfer-image.dto';
import { TranferImage } from './entities/tranfer-image.entity';
export declare class TranferImagesService {
    private readonly tranferImageRepository;
    create(createTranferImageDto: CreateTranferImageDto): Promise<TranferImage>;
    findAll(): Promise<TranferImage[]>;
    findOne(id: number): Promise<TranferImage>;
    update(id: number, updateTranferImageDto: UpdateTranferImageDto): string;
    remove(id: number): string;
}
