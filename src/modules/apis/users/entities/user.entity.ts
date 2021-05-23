import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    username: string

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string
}
