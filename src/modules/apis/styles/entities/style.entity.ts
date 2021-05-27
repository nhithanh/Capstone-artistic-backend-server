import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
