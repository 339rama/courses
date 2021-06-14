import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LessonCommentAnswer } from './LessonCommentAnswer.entity';

@Entity('lesson_comment_answer_review')
export class LessonCommentAnswerReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_comment_answer_id!: number;

  @Column('boolean', { nullable: false })
  is_like: boolean;

  @ManyToOne(
    () => Account,
    account => account.lessons_comments_answers_reviews,
  )
  public account!: Account;

  @ManyToOne(
    () => LessonCommentAnswer,
    answer => answer.lessons_comments_answers_reviews,
  )
  public lesson_comment_answer!: LessonCommentAnswer;
}
