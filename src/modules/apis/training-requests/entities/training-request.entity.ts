import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
        default: 0.7
    })
    relu12Weight: number;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
