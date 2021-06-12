import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/modules/apis/users/entities/user.entity";

@Entity()
export class Album {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'https://i.pinimg.com/564x/b5/3b/9b/b53b9bd45a1d81a52edda8692a8178bc.jpg'
    })
    thumbnailURL: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: string
}
