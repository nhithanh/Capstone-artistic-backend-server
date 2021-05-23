import { Artist } from "src/modules/apis/artists/entities/artist.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Style {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    artist_id: string;

    @ManyToOne(() => Artist)
    @JoinColumn()
    artist: Artist;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    style_name: string;

    @Column({
        type: 'boolean',
        default: false
    })
    is_generic: boolean

    @Column({
        type: 'varchar',
        nullable: false
    })
    icon_url: string;

    @CreateDateColumn()
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt: Date;
}
