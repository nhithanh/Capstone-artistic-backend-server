import { Style } from "src/modules/apis/styles/entities/style.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Snapshot } from "../../snapshots/entities/snapshot.entity";

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

