import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LessonComment } from './LessonComment.entity';
import { LessonCommentAnswerReview } from './LessonCommentAnswerReview.entity';

@Entity('lesson_comment_answer')
export class LessonCommentAnswer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_comment_id!: number;

  @Column('text', { nullable: false })
  message: string;

  @ManyToOne(
    () => Account,
    account => account.lessons_comments_answers,
  )
  public account!: Account;

  @ManyToOne(
    () => LessonComment,
    comment => comment.lessons_comments_answers,
  )
  public lesson_comment!: LessonComment;

  @OneToMany(
    () => LessonCommentAnswerReview,
    answer_review => answer_review.lesson_comment_answer,
  )
  lessons_comments_answers_reviews!: LessonCommentAnswerReview[];
}
