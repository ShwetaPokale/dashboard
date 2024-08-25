import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nse_data_source')
export class NSEDataSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  script: string;

  @Column('float')
  close: number;

  @Column('float')
  dayHigh: number;

  @Column('float')
  dayLow: number;

  @Column('int')
  volume: number;

  @Column('float')
  percentDelivery: number;
}
