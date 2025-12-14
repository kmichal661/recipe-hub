import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Recipies } from "./Recipies";
import { User } from "./User";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipies, (recipe) => recipe.comments, { nullable: false })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipies;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
