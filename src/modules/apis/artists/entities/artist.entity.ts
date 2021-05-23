import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Gender {
    male = 'Male',
    female = 'Female'
}

@Entity()
export class Artist {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    gender: Gender;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    biography: string;

    @CreateDateColumn()
    CreatedAt: Date;
 
    @UpdateDateColumn()
    UpdatedAt: Date;
}
