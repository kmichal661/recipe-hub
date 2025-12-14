import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Recipies } from "./Recipies";

@Entity({ name: "recipe_steps" })
export class RecipeStep {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipies, (recipe) => recipe.steps, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipies;

  @Column({ type: "integer" })
  stepNumber: number;

  @Column({ type: "text" })
  instruction: string;
}
