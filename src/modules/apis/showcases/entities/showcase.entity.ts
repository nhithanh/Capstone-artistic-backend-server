import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Style } from "../../styles/entities/style.entity";

@Entity()
export class Showcase {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true, default: null })
    styleId: string;

    @ManyToOne(() => Style)
    @JoinColumn()
    style: Style

    @Column({
        type: 'varchar',
        nullable: false
    })
    photoName: string;

    @Column({
        type: 'integer',
        nullable: true
    })
    priority: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    photoLocation: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: string
}
