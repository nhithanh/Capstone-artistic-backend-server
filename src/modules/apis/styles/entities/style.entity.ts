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
        nullable: true
    })
    iconURL: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    description: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    activeModelId: string

    @OneToOne(() => Model)
    @JoinColumn()
    activeModel: Promise<Model>

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
