import { AiModel } from "src/modules/apis/ai-models/entities/ai-model.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AiModelSnapshot {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    aiModelId: string;

    @ManyToOne(() => AiModel)
    @JoinColumn()
    aiModel: AiModel;

    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
