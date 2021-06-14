import { MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from './Course.entity';

@Entity('course_level')
export class CourseLevel extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @MinLength(3)
  @MaxLength(100)
  @Column('varchar', { nullable: false })
  name: string;

  //relations
  @ManyToOne(
    () => Course,
    course => course.levels,
    { onDelete: 'CASCADE' },
  )
  course: Course;
}
