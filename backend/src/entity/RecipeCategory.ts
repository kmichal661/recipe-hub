import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Recipies } from "./Recipies";
import { Category } from "./Category";

@Entity({ name: "recipe_categories" })
export class RecipeCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipies, (recipe) => recipe.categories, { nullable: false })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipies;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: "categoryId" })
  category: Category;
}
