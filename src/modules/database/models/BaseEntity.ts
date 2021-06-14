import { Column, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  readonly created_at: string;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  edited_at: string;
}
