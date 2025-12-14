import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Recipies } from "./Recipies";
import { Tag } from "./Tag";

@Entity({ name: "recipe_tags" })
export class RecipeTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipies, (recipe) => recipe.tags, { nullable: false })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipies;

  @ManyToOne(() => Tag, { nullable: false })
  @JoinColumn({ name: "tagId" })
  tag: Tag;
}
