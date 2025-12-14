import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "subscribers" })
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  email: string;
}
