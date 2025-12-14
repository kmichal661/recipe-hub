"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const entity_1 = require("./entity");
const seed_data_1 = require("./seed-data");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seed() {
    await data_source_1.AppDataSource.initialize();
    const roleRepo = data_source_1.AppDataSource.getRepository(entity_1.Role);
    const userRepo = data_source_1.AppDataSource.getRepository(entity_1.User);
    const recipeRepo = data_source_1.AppDataSource.getRepository(entity_1.Recipies);
    const imageRepo = data_source_1.AppDataSource.getRepository(entity_1.RecipeImage);
    const ingredientRepo = data_source_1.AppDataSource.getRepository(entity_1.Ingredient);
    const recipeIngredientRepo = data_source_1.AppDataSource.getRepository(entity_1.RecipeIngredient);
    const categoryRepo = data_source_1.AppDataSource.getRepository(entity_1.Category);
    const recipeCategoryRepo = data_source_1.AppDataSource.getRepository(entity_1.RecipeCategory);
    const tagRepo = data_source_1.AppDataSource.getRepository(entity_1.Tag);
    const recipeTagRepo = data_source_1.AppDataSource.getRepository(entity_1.RecipeTag);
    const commentRepo = data_source_1.AppDataSource.getRepository(entity_1.Comment);
    const ratingRepo = data_source_1.AppDataSource.getRepository(entity_1.Rating);
    const stepRepo = data_source_1.AppDataSource.getRepository(entity_1.RecipeStep);
    // Roles
    const adminRole = await roleRepo.save(roleRepo.create({ name: "Admin" }));
    const userRole = await roleRepo.save(roleRepo.create({ name: "User" }));
    // Users (create authors)
    const users = [];
    for (let i = 0; i < seed_data_1.USER_NAMES.length; i++) {
        const [firstName, lastName] = seed_data_1.USER_NAMES[i].split(" ");
        const rawPassword = `pass${i + 1}`;
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(rawPassword, salt);
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
    const ingredients = [];
    for (const n of seed_data_1.INGREDIENT_POOL) {
        ingredients.push(await ingredientRepo.save(ingredientRepo.create({ name: n })));
    }
    // Categories & Tags
    const cats = [];
    for (const c of seed_data_1.CATEGORIES)
        cats.push(await categoryRepo.save(categoryRepo.create({ name: c })));
    const tagNames = ["Easy", "Quick", "Comfort", "Healthy", "Family"];
    const tags = [];
    for (const t of tagNames)
        tags.push(await tagRepo.save(tagRepo.create({ name: t })));
    const imageFiles = (0, seed_data_1.loadImageFiles)();
    // Create 30 recipes with realistic details
    for (let i = 0; i < 30; i++) {
        const title = seed_data_1.TITLES[i % seed_data_1.TITLES.length];
        const servings = (0, seed_data_1.getRandomInt)(3, 8);
        const difficulty = (0, seed_data_1.pick)(seed_data_1.DIFFICULTIES);
        const shortDescription = (0, seed_data_1.shortDescriptionFor)(title);
        const calories = (0, seed_data_1.getRandomInt)(250, 900);
        const protein = (0, seed_data_1.getRandomInt)(10, 60);
        const carbs = (0, seed_data_1.getRandomInt)(20, 150);
        const fat = (0, seed_data_1.getRandomInt)(5, 60);
        const preparationTime = (0, seed_data_1.getRandomInt)(10, 45);
        const cookingTime = (0, seed_data_1.getRandomInt)(15, 120);
        const totalTime = preparationTime + cookingTime;
        const createdAt = (0, seed_data_1.randomDateBetween)(2023, 2025);
        const description = `${title} is prepared by combining fresh ingredients and following classic steps that produce a balanced and flavorful dish. This recipe yields ${servings} servings and works well for family dinners.`;
        const recipeEntity = new entity_1.Recipies();
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
        const saved = (await recipeRepo.save(recipeEntity));
        // Images - pick up to 3 images for the recipe
        const imgs = imageFiles.length ? [imageFiles[i % imageFiles.length]] : [];
        for (const img of imgs) {
            await imageRepo.save(imageRepo.create({
                recipe: { id: saved.id },
                imageUrl: `http://localhost:5001/images/${img}`,
            }));
        }
        // Ingredients - 10-15 per recipe
        const ingCount = (0, seed_data_1.getRandomInt)(10, 15);
        const used = new Set();
        for (let j = 0; j < ingCount; j++) {
            let idx = (0, seed_data_1.getRandomInt)(0, ingredients.length - 1);
            while (used.has(idx))
                idx = (0, seed_data_1.getRandomInt)(0, ingredients.length - 1);
            used.add(idx);
            const ingredient = ingredients[idx];
            await recipeIngredientRepo.save(recipeIngredientRepo.create({
                recipe: { id: saved.id },
                ingredient,
                quantity: (0, seed_data_1.randomQuantity)(),
            }));
        }
        // Categories & Tags - assign 1-2 categories and 1-2 tags
        const catCount = (0, seed_data_1.getRandomInt)(1, 2);
        const tagCount = (0, seed_data_1.getRandomInt)(1, 2);
        const usedCat = new Set();
        for (let c = 0; c < catCount; c++) {
            let idx = (0, seed_data_1.getRandomInt)(0, cats.length - 1);
            while (usedCat.has(idx))
                idx = (0, seed_data_1.getRandomInt)(0, cats.length - 1);
            usedCat.add(idx);
            await recipeCategoryRepo.save(recipeCategoryRepo.create({
                recipe: { id: saved.id },
                category: cats[idx],
            }));
        }
        const usedTag = new Set();
        for (let t = 0; t < tagCount; t++) {
            let idx = (0, seed_data_1.getRandomInt)(0, tags.length - 1);
            while (usedTag.has(idx))
                idx = (0, seed_data_1.getRandomInt)(0, tags.length - 1);
            usedTag.add(idx);
            await recipeTagRepo.save(recipeTagRepo.create({
                recipe: { id: saved.id },
                tag: tags[idx],
            }));
        }
        // Steps - 7-12 steps
        const stepCount = (0, seed_data_1.getRandomInt)(7, 12);
        const steps = (0, seed_data_1.generateSteps)(title, stepCount);
        for (let s = 0; s < steps.length; s++) {
            await stepRepo.save(stepRepo.create({
                recipe: { id: saved.id },
                stepNumber: s + 1,
                instruction: steps[s],
            }));
        }
        // Comments - 5-6 comments
        const commentCount = (0, seed_data_1.getRandomInt)(5, 6);
        for (let c = 0; c < commentCount; c++) {
            const u = users[(i + c + 1) % users.length];
            await commentRepo.save(commentRepo.create({
                recipe: { id: saved.id },
                user: u,
                content: `I tried this recipe and loved it! Tip: adjust seasoning to taste.`,
            }));
        }
        // Ratings - 10-15 ratings
        const ratingCount = (0, seed_data_1.getRandomInt)(10, 15);
        for (let r = 0; r < ratingCount; r++) {
            const u = users[(i + r + 2) % users.length];
            await ratingRepo.save(ratingRepo.create({
                recipe: { id: saved.id },
                user: u,
                rating: (0, seed_data_1.getRandomInt)(3, 5),
            }));
        }
    }
    console.log("Seeding complete");
    await data_source_1.AppDataSource.destroy();
}
seed().catch((e) => {
    console.error(e);
    process.exit(1);
});
