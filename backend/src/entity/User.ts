import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Role } from "./Role";
import { Recipies } from "./Recipies";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string | null;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ nullable: true })
  bio: string | null;

  @Column({ nullable: true })
  avatarUrl: string | null;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: "roleId" })
  role: Role;

  @OneToMany(() => Recipies, (recipe) => recipe.author)
  recipes: Recipies[];
}
