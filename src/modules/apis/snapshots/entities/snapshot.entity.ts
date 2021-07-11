import { Model } from "src/modules/apis/models/entities/model.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Snapshot {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        nullable: false
    })
    modelId: string;

    @ManyToOne(() => Model)
    @JoinColumn()
    model: Model;

    @Column({
        type: 'varchar',
        nullable: false
    })
    location: string

    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
