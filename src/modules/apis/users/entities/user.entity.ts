import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as hmacSHA512 from 'crypto-js/hmac-sha512'
import * as Base64 from 'crypto-js/enc-base64'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        type: 'varchar',
        nullable: true,
        default: 'user'
    })
    role: string;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: true
    })
    defaultAlbumId: string
    

    @Column({
        type: 'varchar',
        nullable: true,
        select: false
    })
    password: string

    @Column({
        default: 'Aimé'
    })
    firstName: string;

    @Column({
        default: 'Favre' 
    })
    lastName: string;

    @Column({
        type: 'date',
        default: new Date(1998, 8, 10)
    })
    dateOfBirth: string;

    public comparePassword(password: string): boolean {
        const encryptPassword = Base64.stringify(hmacSHA512(password, process.env.PASSWORD_HASH_SECRET_KEY));
        return this.password === encryptPassword;
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = Base64.stringify(hmacSHA512(this.password, process.env.PASSWORD_HASH_SECRET_KEY));
        }
    }
}
