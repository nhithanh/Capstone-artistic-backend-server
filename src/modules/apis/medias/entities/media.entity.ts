import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/modules/apis/users/entities/user.entity";
import { Album } from "../../albums/entities/album.entity";

export enum MEDIA_TYPE {
    PHOTO = "PHOTO",
    VIDEO = "VIDEO"
}

@Entity()
export class Media {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User


    @Column({ nullable: true, default: null })
    albumId: string;

    @ManyToOne(() => Album)
    @JoinColumn()
    album: Album

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    storageLocation: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    type: MEDIA_TYPE;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: string;
}
