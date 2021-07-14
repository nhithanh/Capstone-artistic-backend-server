import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Style } from "../../styles/entities/style.entity";

@Entity()
export class Snapshot {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        nullable: false
    })
    styleId: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @ManyToOne(() => Style)
    @JoinColumn()
    style: Style;

    @Column({
        type: 'varchar',
        nullable: false
    })
    location: string

    @Column({
        type: 'varchar',
        default: ""
    })
    description: string

    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
