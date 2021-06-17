import { IsPositive, MaxLength, MinLength } from 'class-validator';
import { AccountLessonTimeCode } from 'src/modules/accounts/models/AccountLessonTimeCode.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import {
  Entity,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from './Course.entity';
import { LessonFile } from './LessonFile.entity';
import { LessonHomework } from './LessonHomework.entity';
import { LessonIsDone } from './LessonIsDone.entity';
import { LessonViewed } from './LessonViewed.entity';

@Entity('lesson')
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @MinLength(3)
  @MaxLength(5000)
  @Column('varchar', { nullable: false })
  name: string;

  @IsPositive()
  @Column('integer', { nullable: false })
  number: number;

  @Column('varchar', { nullable: false })
  photo_link: string;

  @MinLength(3)
  @MaxLength(5000)
  @Column('varchar', { nullable: false })
  description: string;

  @IsPositive()
  @Column('integer', { nullable: false })
  duration: number;

  @Column('varchar', { nullable: false })
  m3u8_file_link: string;

  //relations
  @ManyToOne(
    () => Course,
    course => course.lessons,
    { onDelete: 'CASCADE' },
  )
  course: Course;

  @OneToMany(
    () => LessonFile,
    file => file.lesson,
    {
      cascade: true,
    },
  )
  files?: LessonFile[];

  @OneToMany(
    () => LessonHomework,
    homework => homework.lesson,
    {
      cascade: true,
    },
  )
  homeworks?: LessonHomework[];

  @OneToMany(
    () => LessonIsDone,
    lesson_is_done => lesson_is_done.lesson,
  )
  lessons_is_done!: LessonIsDone[];

  @OneToMany(
    () => AccountLessonTimeCode,
    time_code => time_code.lesson,
  )
  time_codes!: AccountLessonTimeCode[];

  @OneToMany(
    () => LessonViewed,
    view => view.lesson,
  )
  lesson_views!: LessonViewed[];
}
