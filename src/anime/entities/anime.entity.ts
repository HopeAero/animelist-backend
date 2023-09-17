import { List } from 'src/list/entities/list.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => List, (list) => list.anime)
  lists: List[];

  @Column()
  year: number;

  @DeleteDateColumn()
  deleteAt: Date;
}
