import { Account } from 'src/modules/accounts/models/Account/Account.entity';
import { Course } from 'src/modules/courses/models/Course.entity';
import { BaseEntity } from 'src/modules/database/models/BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase')
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  public account_id!: number;

  @Column()
  public course_id!: number;

  @Column('integer', { nullable: false })
  amount!: number;

  @Column('integer', { nullable: false })
  purchase_type!: number;

  @Column('integer', { nullable: false })
  purchase_status!: number;

  @Column('varchar', { nullable: false })
  subscription_type!: string;

  @Column('varchar', { nullable: false, unique: true })
  order_id!: number;

  @ManyToOne(
    () => Account,
    account => account.purchases,
  )
  public account!: Account;

  @ManyToOne(
    () => Course,
    course => course.purchases,
  )
  public course!: Course;
}
