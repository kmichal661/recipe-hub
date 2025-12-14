import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "tags" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}
