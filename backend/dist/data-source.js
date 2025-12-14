"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("./entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "recipeHub.sqlite",
    synchronize: true,
    logging: true,
    entities: [
        entity_1.User,
        entity_1.Role,
        entity_1.Recipies,
        entity_1.Subscriber,
        entity_1.Category,
        entity_1.Comment,
        entity_1.Ingredient,
        entity_1.Rating,
        entity_1.RecipeCategory,
        entity_1.RecipeImage,
        entity_1.RecipeIngredient,
        entity_1.RecipeTag,
        entity_1.RecipeStep,
        entity_1.Tag,
    ],
    subscribers: [],
    migrations: [],
});
