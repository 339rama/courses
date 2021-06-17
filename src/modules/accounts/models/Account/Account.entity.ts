import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AccountRelations } from './AccountRelations';

@Entity('account')
export class Account extends AccountRelations {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  last_name: string;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('boolean', { default: false, nullable: false })
  is_email_confirmed: boolean;

  @Column('varchar', { nullable: false })
  hash_password: string;

  @Column('varchar')
  photo_link?: string;

  @Column('varchar', { nullable: false, unique: true })
  phone_number: string;

  @Column('boolean', { default: false, nullable: false })
  is_admin: boolean;

  @Column('varchar')
  description?: string;

  @Column('varchar')
  telegram?: string;

  @Column('varchar')
  vk_link?: string;

  @Column('varchar')
  instagram_link?: string;

  @Column('varchar')
  facebook_link?: string;

  @Column('varchar')
  site_link?: string;

  @Column('integer', { default: 0 })
  wallet: number;
}
