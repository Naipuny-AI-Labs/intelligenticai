import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  usecase!: string;

  @Column()
  companysize!: string;

  @Column()
  industry!: string;

  @Column()
  companyname!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  designation!: string;

  @Column()
  phone!: string;

  @Column({ type: "text" })
  requirements!: string;

  @Column({ nullable: true })
  dataprivacy?: boolean;

  @Column({ nullable: true })
  marketingconsent?: boolean;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  apikey!: string;

  @Column({ type: "jsonb", nullable: true })
  flowids?: string[];

  @Column({ type: "jsonb", nullable: true })
  agentids?: string[];

  @Column({ type: "timestamp" })
  @CreateDateColumn()
  createdDate!: Date;

  @Column({ type: "timestamp" })
  @UpdateDateColumn()
  updatedDate!: Date;
}
