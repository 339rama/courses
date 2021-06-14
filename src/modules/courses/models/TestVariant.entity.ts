import { MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { HomeworkQuestion } from './HomeworkQuestion.entity';

@Entity('test_variant')
export class TestVariant extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @MinLength(3)
  @MaxLength(1000)
  @Column('varchar', { nullable: false })
  answer: string;

  @Column('boolean', { nullable: false })
  is_right: boolean;

  //relations
  @ManyToOne(
    () => HomeworkQuestion,
    question => question.test_variants,
    { onDelete: 'CASCADE' },
  )
  homework_question: HomeworkQuestion[];
}
