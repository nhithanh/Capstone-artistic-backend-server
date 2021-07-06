import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true, default: null })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    @Column({
        type: 'varchar',
        nullable: false
    })
    message: string;

    @Column({
        type: 'boolean',
        default: false
    })
    isReaded: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
