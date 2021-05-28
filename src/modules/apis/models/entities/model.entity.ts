import { Style } from "src/modules/apis/styles/entities/style.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Snapshot } from "../../snapshots/entities/snapshot.entity";

export enum ModelType {
    CYCLE_GAN = "CYCLE_GAN",
    NEURAL_STYLE_TRANSFER = "NEURAL_STYLE_TRANSFER"
}

@Entity()
export class Model {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    styleId: string;

    @ManyToOne(() => Style)
    @JoinColumn()
    style: Style

    @Column({
        type: 'varchar'
    })
    type: ModelType;

    @Column({
        nullable: true
    })
    activeSnapshotId: string;

    @OneToOne(() =>  Snapshot)
    @JoinColumn()
    activeSnapshot: Promise<Snapshot>;

    @CreateDateColumn()
    CreatedAt: Date;
 
    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

