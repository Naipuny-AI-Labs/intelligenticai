import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";
import { IRequestAgent } from "../../Interface";

@Entity()
export class RequestAgent implements IRequestAgent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  userid: string;

  @Column("uuid")
  agentid: string;

  @Column("text")
  usecase: string;

  @Column("text", { default: "pending" })
  status: string;

  @CreateDateColumn({ name: "createdDate", type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ name: "updatedDate", type: "timestamp" })
  updatedDate: Date;

  @Column("uuid", { nullable: true })
  updatedby: string | null;
}
