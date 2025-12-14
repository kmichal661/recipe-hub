import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Recipies } from "./Recipies";
import { Ingredient } from "./Ingredient";

@Entity({ name: "recipe_ingredients" })
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipies, (recipe) => recipe.ingredients, {
    nullable: false,
  })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipies;

  @ManyToOne(() => Ingredient, { nullable: false })
  @JoinColumn({ name: "ingredientId" })
  ingredient: Ingredient;

  @Column({ length: 100, nullable: true })
  quantity: string | null;
}
