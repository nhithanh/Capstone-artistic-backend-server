import { Artist } from "src/modules/artists/entities/artist.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Style {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    artistId: string;

    @ManyToOne(() => Artist)
    @JoinColumn()
    artist: Artist;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    styleName: string;

    @Column({
        type: 'boolean',
        default: false
    })
    isGeneric: boolean

    @CreateDateColumn()
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt: Date;
}
