import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { HomeworkType } from '../enums/HomeworkType';
import { HomeworkAnswerFree } from './HomeworkAnswerFree.entity';
import { HomeworkIsDone } from './HomeworkIsDone.entity';
import { HomeworkQuestion } from './HomeworkQuestion.entity';
import { HomeworkResult } from './HomeworkResult.entity';
import { Lesson } from './Lesson.entity';

@Entity('lesson_homework')
export class LessonHomework extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('enum', { enum: HomeworkType })
  homework_type: HomeworkType;

  @Column('boolean', { nullable: false, default: false })
  is_required: boolean;

  //relations
  @ManyToOne(
    () => Lesson,
    lesson => lesson.homeworks,
    { onDelete: 'CASCADE' },
  )
  lesson: Lesson;

  @OneToMany(
    () => HomeworkResult,
    result => result.homework,
    {
      cascade: true,
    },
  )
  results?: HomeworkResult[];

  @OneToMany(
    () => HomeworkQuestion,
    question => question.lesson_homework,
    {
      cascade: true,
    },
  )
  questions?: HomeworkQuestion[];

  @OneToMany(
    () => HomeworkIsDone,
    homework_is_done => homework_is_done.lesson_homework,
  )
  homeworks_is_done!: HomeworkIsDone[];

  @OneToMany(
    () => HomeworkAnswerFree,
    answer => answer.lesson_homework,
  )
  homework_answers_free!: HomeworkAnswerFree[];
}
