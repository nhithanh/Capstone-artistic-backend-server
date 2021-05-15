import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TranferImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  user_id: string;

  @Column({
      type: 'varchar',
      nullable: false
  })
  style_id: string;

  
  @Column({
    type: 'varchar',
    nullable: false
})
upload_image_id: string;


  @Column({
    type: 'varchar',
    nullable: false,
  })
  image_url: string;

}
