import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Snapshot } from "../../snapshots/entities/snapshot.entity";

@Entity()
export class Style {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        unique: false,
        nullable: false
    })
    styleName: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    iconURL: string;

    @Column({
        type: 'boolean',
        nullable: true, 
        default: false
    })
    isActive: boolean;

    @Column({
        type: 'varchar',
        nullable: true,
        unique: false
    })
    activeSnapshotId: string

    @OneToOne(() => Snapshot)
    @JoinColumn()
    activeSnapshot: Promise<Snapshot>

    @Column({
        type: 'varchar',
        unique: false,
        nullable: true
    })
    routingKey: string;

    @Column({
        type: 'boolean',
        unique: false,
        nullable: true,
        default: true
    })
    isSupportVideo: boolean;

    @Column({
        type: 'varchar',
        unique: false,
        nullable: true,
    })
    demoVideoURL: string;

    @CreateDateColumn()
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
