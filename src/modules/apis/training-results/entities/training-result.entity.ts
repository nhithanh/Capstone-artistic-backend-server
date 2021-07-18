import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrainingRequest } from "../../training-requests/entities/training-request.entity";

@Entity()
export class TrainingResult {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'integer',
        nullable: false
    })
    step: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    trainingRequestId: string;

    @ManyToOne(() => TrainingRequest)
    @JoinColumn()
    trainingRequset: TrainingRequest;

    @Column({
        type: 'varchar',
        nullable: true
    })
    resultPhotoLocation: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    snapshotLocation: string;

    @CreateDateColumn()
    createdAt: Date;
}
