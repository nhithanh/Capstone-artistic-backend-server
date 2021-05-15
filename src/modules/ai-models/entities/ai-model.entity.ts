import { Style } from "src/modules/styles/entities/style.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AiModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    styleId: string;

    @ManyToOne(() => Style)
    @JoinColumn()
    style: Style

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    activeModelID: string;

    @CreateDateColumn()
    CreatedAt: Date;
 
    @UpdateDateColumn()
    UpdatedAt: Date;
}

