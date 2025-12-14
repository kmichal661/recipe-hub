import "reflect-metadata";
import { AppDataSource } from "./data-source";
import {
  Role,
  User,
  Recipies,
  RecipeImage,
  Ingredient,
  RecipeIngredient,
  Category,
  RecipeCategory,
  Tag,
  RecipeTag,
  Comment,
  Rating,
  RecipeStep,
} from "./entity";
import {
  TITLES,
  DIFFICULTIES,
  CATEGORIES,
  USER_NAMES,
  INGREDIENT_POOL,
  getRandomInt,
  pick,
  randomDateBetween,
  shortDescriptionFor,
  generateSteps,
  loadImageFiles,
  randomQuantity,
} from "./seed-data";
import bcrypt from "bcryptjs";

async function seed() {
  await AppDataSource.initialize();
  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);
  const recipeRepo = AppDataSource.getRepository(Recipies);
  const imageRepo = AppDataSource.getRepository(RecipeImage);
  const ingredientRepo = AppDataSource.getRepository(Ingredient);
  const recipeIngredientRepo = AppDataSource.getRepository(RecipeIngredient);
  const categoryRepo = AppDataSource.getRepository(Category);
  const recipeCategoryRepo = AppDataSource.getRepository(RecipeCategory);
  const tagRepo = AppDataSource.getRepository(Tag);
  const recipeTagRepo = AppDataSource.getRepository(RecipeTag);
  const commentRepo = AppDataSource.getRepository(Comment);
  const ratingRepo = AppDataSource.getRepository(Rating);
  const stepRepo = AppDataSource.getRepository(RecipeStep);

  // Roles
  const adminRole = await roleRepo.save(roleRepo.create({ name: "Admin" }));
  const userRole = await roleRepo.save(roleRepo.create({ name: "User" }));

  // Users (create authors)
  const users = [] as User[];
  for (let i = 0; i < USER_NAMES.length; i++) {
    const [firstName, lastName] = USER_NAMES[i].split(" ");
    const rawPassword = `pass${i + 1}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const u = userRepo.create({
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      password: hashedPassword,
      firstName,
      lastName,
      bio: `${firstName} is a home cook who loves sharing recipes.`,
      avatarUrl: null,
      role: i === 0 ? adminRole : userRole,
    });
    users.push(await userRepo.save(u));
  }

  // Ingredients pool - seed from helper pool
  const ingredients = [] as Ingredient[];
  for (const n of INGREDIENT_POOL) {
    ingredients.push(
      await ingredientRepo.save(ingredientRepo.create({ name: n }))
    );
  }

  // Categories & Tags
  const cats = [] as Category[];
  for (const c of CATEGORIES)
    cats.push(await categoryRepo.save(categoryRepo.create({ name: c })));
  const tagNames = ["Easy", "Quick", "Comfort", "Healthy", "Family"];
  const tags = [] as Tag[];
  for (const t of tagNames)
    tags.push(await tagRepo.save(tagRepo.create({ name: t })));

  const imageFiles = loadImageFiles();

  // Create 30 recipes with realistic details
  for (let i = 0; i < 30; i++) {
    const title = TITLES[i % TITLES.length];
    const servings = getRandomInt(3, 8);
    const difficulty = pick(DIFFICULTIES) as Recipies["difficulty"];
    const shortDescription = shortDescriptionFor(title);
    const calories = getRandomInt(250, 900);
    const protein = getRandomInt(10, 60);
    const carbs = getRandomInt(20, 150);
    const fat = getRandomInt(5, 60);
    const preparationTime = getRandomInt(10, 45);
    const cookingTime = getRandomInt(15, 120);
    const totalTime = preparationTime + cookingTime;
    const createdAt = randomDateBetween(2023, 2025);

    const description = `${title} is prepared by combining fresh ingredients and following classic steps that produce a balanced and flavorful dish. This recipe yields ${servings} servings and works well for family dinners.`;

    const recipeEntity = new Recipies();
    recipeEntity.author = users[i % users.length];
    recipeEntity.title = title;
    recipeEntity.shortDescription = shortDescription;
    recipeEntity.servings = servings;
    recipeEntity.difficulty = difficulty;
    recipeEntity.calories = calories;
    recipeEntity.protein = protein;
    recipeEntity.carbs = carbs;
    recipeEntity.fat = fat;
    recipeEntity.description = description;
    recipeEntity.preparationTime = preparationTime;
    recipeEntity.cookingTime = cookingTime;
    recipeEntity.totalTime = totalTime;
    recipeEntity.createdAt = createdAt;

    const saved = (await recipeRepo.save(recipeEntity)) as Recipies;

    // Images - pick up to 3 images for the recipe
    const imgs = imageFiles.length ? [imageFiles[i % imageFiles.length]] : [];
    for (const img of imgs) {
      await imageRepo.save(
        imageRepo.create({
          recipe: { id: saved.id } as any,
          imageUrl: `http://localhost:5001/images/${img}`,
        })
      );
    }

    // Ingredients - 10-15 per recipe
    const ingCount = getRandomInt(10, 15);
    const used = new Set<number>();
    for (let j = 0; j < ingCount; j++) {
      let idx = getRandomInt(0, ingredients.length - 1);
      while (used.has(idx)) idx = getRandomInt(0, ingredients.length - 1);
      used.add(idx);
      const ingredient = ingredients[idx];
      await recipeIngredientRepo.save(
        recipeIngredientRepo.create({
          recipe: { id: saved.id } as any,
          ingredient,
          quantity: randomQuantity(),
        })
      );
    }

    // Categories & Tags - assign 1-2 categories and 1-2 tags
    const catCount = getRandomInt(1, 2);
    const tagCount = getRandomInt(1, 2);
    const usedCat = new Set<number>();
    for (let c = 0; c < catCount; c++) {
      let idx = getRandomInt(0, cats.length - 1);
      while (usedCat.has(idx)) idx = getRandomInt(0, cats.length - 1);
      usedCat.add(idx);
      await recipeCategoryRepo.save(
        recipeCategoryRepo.create({
          recipe: { id: saved.id } as any,
          category: cats[idx],
        })
      );
    }
    const usedTag = new Set<number>();
    for (let t = 0; t < tagCount; t++) {
      let idx = getRandomInt(0, tags.length - 1);
      while (usedTag.has(idx)) idx = getRandomInt(0, tags.length - 1);
      usedTag.add(idx);
      await recipeTagRepo.save(
        recipeTagRepo.create({
          recipe: { id: saved.id } as any,
          tag: tags[idx],
        })
      );
    }

    // Steps - 7-12 steps
    const stepCount = getRandomInt(7, 12);
    const steps = generateSteps(title, stepCount);
    for (let s = 0; s < steps.length; s++) {
      await stepRepo.save(
        stepRepo.create({
          recipe: { id: saved.id } as any,
          stepNumber: s + 1,
          instruction: steps[s],
        })
      );
    }

    // Comments - 5-6 comments
    const commentCount = getRandomInt(5, 6);
    for (let c = 0; c < commentCount; c++) {
      const u = users[(i + c + 1) % users.length];
      await commentRepo.save(
        commentRepo.create({
          recipe: { id: saved.id } as any,
          user: u,
          content: `I tried this recipe and loved it! Tip: adjust seasoning to taste.`,
        })
      );
    }

    // Ratings - 10-15 ratings
    const ratingCount = getRandomInt(10, 15);
    for (let r = 0; r < ratingCount; r++) {
      const u = users[(i + r + 2) % users.length];
      await ratingRepo.save(
        ratingRepo.create({
          recipe: { id: saved.id } as any,
          user: u,
          rating: getRandomInt(3, 5),
        })
      );
    }
  }

  console.log("Seeding complete");
  await AppDataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
