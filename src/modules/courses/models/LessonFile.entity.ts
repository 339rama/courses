import { MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Lesson } from './Lesson.entity';

@Entity('lesson_file')
export class LessonFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @MinLength(3)
  @MaxLength(5000)
  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  file_link: string;

  //relations
  @ManyToOne(
    () => Lesson,
    lesson => lesson.files,
    { onDelete: 'CASCADE' },
  )
  lesson: Lesson;
}
