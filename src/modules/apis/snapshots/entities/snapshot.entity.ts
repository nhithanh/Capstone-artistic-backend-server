import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
