import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateCreated: string;

  @Column()
  driverName: string;

  @Column()
  orderRef: string;

  @Column()
  address: string;

  @Column('float')
  lat: number;

  @Column('float')
  lon: number;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  startTime: string;

  @Column({ nullable: true })
  endTime: string;

  @Column({ nullable: true })
  driverNotes: string;

  @Column({ nullable: true })
  completedAt: string;

  @Column({ nullable: true })
  skipNotes: string;

  @Column({ nullable: true })
  routePlanType: string;

  @Column({ nullable: true })
  load: string;

  @Column({ nullable: true })
  arrivalTime: string;

  @Column({ nullable: true })
  finishTime: string;

  @Column({ nullable: true })
  order: number;
}
