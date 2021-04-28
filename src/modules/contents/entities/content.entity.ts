import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Content {
    @Column({ nullable: true })
    creatorId: User;

    @ManyToOne(() => User)
    @JoinColumn()
    creator: User;

    @Column({
        type: 'varchar',
        nullable: false
    })
    title: string

    @Column({
        type: 'varchar',
        nullable: false
    })
    content: string
}
