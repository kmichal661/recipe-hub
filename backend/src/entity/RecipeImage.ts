import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Recipies } from "./Recipies";

@Entity({ name: "recipe_images" })
export class RecipeImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipies, (recipe) => recipe.images, { nullable: false })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipies;

  @Column({ length: 255 })
  imageUrl: string;
}
