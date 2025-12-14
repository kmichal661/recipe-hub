import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Recipies } from "./Recipies";
import { User } from "./User";

@Entity({ name: "ratings" })
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipies, (recipe) => recipe.ratings, { nullable: false })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipies;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "integer" })
  rating: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
