import { MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { LessonHomework } from './LessonHomework.entity';
import { TestVariant } from './TestVariant.entity';

@Entity('homework_question')
export class HomeworkQuestion extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @MinLength(3)
  @MaxLength(1000)
  @Column('varchar')
  question: string;

  //relations
  @OneToOne(
    () => LessonHomework,
    hm => hm.question,
  )
  homework: LessonHomework;

  @ManyToOne(
    () => TestVariant,
    test_variant => test_variant.homework_question,
    { onDelete: 'CASCADE' },
  )
  test_variants: TestVariant;
}
