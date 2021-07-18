import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum STATUS {
    WAITING = 'WAITING',
    ON_PROGRESS = 'ON PROGRESS',
    STOPPED = 'STOPPED',
    COMPLETED = 'COMPLETED'
}

@Entity()
export class TrainingRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        unique: false,
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    referenceStyleLocation: string

    @Column({
        type: 'varchar',
        unique: false,
        nullable: false
    })
    description: string;

    @Column({
        type: 'float',
        unique: false,
        default: 0.001
    })
    lr: number;

    @Column({
        type: 'integer',
        unique: false,
        default: 1000
    })
    saveStep: number;

    @Column({
        type: 'float',
        unique: false,
        default: 1e5
    })
    contentWeight: number;

    @Column({
        type: 'float',
        unique: false,
        default: 1e10
    })
    styleWeight: number;

    @Column({
        type: 'float',
        unique: false,
        default: 1.0
    })
    relu12Weight: number;

    @Column({
        type: 'float',
        unique: false,
        default: 1.0
    })
    relu22Weight: number;

    @Column({
        type: 'float',
        unique: false,
        default: 1.0
    })
    relu33Weight: number;

    @Column({
        type: 'float',
        unique: false,
        default: 1.0
    })
    relu43Weight: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    stauts: STATUS;

    @Column({
        type: 'integer',
        unique: false,
        default: 0
    })
    checkpoint: number;

    @Column({
        type: 'integer',
        unique: false,
        default: 500
    })
    epochs: number;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
