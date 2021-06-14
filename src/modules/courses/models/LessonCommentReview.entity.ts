import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LessonComment } from './LessonComment.entity';

@Entity('lesson_comment_review')
export class LessonCommentReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public account_id!: number;

  @Column()
  public lesson_comment_id!: number;

  @Column('boolean', { nullable: false })
  is_like: boolean;

  @ManyToOne(
    () => Account,
    account => account.lessons_comments_reviews,
  )
  public account!: Account;

  @ManyToOne(
    () => LessonComment,
    comment => comment.lessons_comments_reviews,
  )
  public lesson_comment!: LessonComment;
}
