import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { RecipeImage } from "./RecipeImage";
import { RecipeIngredient } from "./RecipeIngredient";
import { Comment } from "./Comment";
import { Rating } from "./Rating";
import { RecipeCategory } from "./RecipeCategory";
import { RecipeTag } from "./RecipeTag";
import { RecipeStep } from "./RecipeStep";

@Entity({ name: "recipes" })
export class Recipies {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "authorId" })
  author: User;

  @Column({ length: 150 })
  title: string;

  @Column({ type: "integer", nullable: true })
  servings: number | null;

  @Column({ type: "text", nullable: true })
  difficulty: "Easy | Medium | Hard" | null;

  @Column({ type: "text", nullable: true })
  shortDescription: string | null;

  @Column({ type: "integer", nullable: true })
  calories: number | null;

  @Column({ type: "integer", nullable: true })
  protein: number | null;

  @Column({ type: "integer", nullable: true })
  carbs: number | null;

  @Column({ type: "integer", nullable: true })
  fat: number | null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "integer", nullable: true })
  preparationTime: number | null;

  @Column({ type: "integer", nullable: true })
  cookingTime: number | null;

  @Column({ type: "integer", nullable: true })
  totalTime: number | null;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => RecipeImage, (img) => img.recipe)
  images: RecipeImage[];

  @OneToMany(() => RecipeIngredient, (ri) => ri.recipe)
  ingredients: RecipeIngredient[];

  @OneToMany(() => Comment, (c) => c.recipe)
  comments: Comment[];

  @OneToMany(() => Rating, (r) => r.recipe)
  ratings: Rating[];

  @OneToMany(() => RecipeCategory, (rc) => rc.recipe)
  categories: RecipeCategory[];

  @OneToMany(() => RecipeTag, (rt) => rt.recipe)
  tags: RecipeTag[];

  @OneToMany(() => RecipeStep, (s) => s.recipe)
  steps: RecipeStep[];
}
