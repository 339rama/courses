import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from './Lesson.entity';
import { LessonCommentAnswer } from './LessonCommentAnswer.entity';
import { LessonCommentReview } from './LessonCommentReview.entity';

@Entity('lesson_comment')
export class LessonComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_id!: number;

  @Column('text', { nullable: false })
  message: string;

  @ManyToOne(
    () => Account,
    account => account.lessons_comments,
  )
  public account!: Account;

  @ManyToOne(
    () => Lesson,
    lesson => lesson.lessons_comments,
  )
  public lesson!: Lesson;

  @OneToMany(
    () => LessonCommentAnswer,
    comment_answer => comment_answer.lesson_comment,
  )
  lessons_comments_answers!: LessonCommentAnswer[];

  @OneToMany(
    () => LessonCommentReview,
    comment_review => comment_review.lesson_comment,
  )
  lessons_comments_reviews!: LessonCommentReview[];
}
