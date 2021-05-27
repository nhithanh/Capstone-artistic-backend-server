import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Model } from "../../models/entities/model.entity";

@Entity()
export class Style {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    styleName: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    iconURL: string;

    @Column({
        type: 'varchar'
    })
    description: string;

    @Column()
    activeModelId: string

    @OneToOne(() => Model)
    @JoinColumn()
    activeModel: Model

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    transportChannelName: string;

    @CreateDateColumn()
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
