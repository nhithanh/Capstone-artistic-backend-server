import { Style } from "src/modules/apis/styles/entities/style.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    type: string;

    @Column({
        type: 'varchar'
    })
    activeSnapshotId: string;

    @CreateDateColumn()
    CreatedAt: Date;
 
    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

