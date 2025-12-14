"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeIngredient = void 0;
const typeorm_1 = require("typeorm");
const Recipies_1 = require("./Recipies");
const Ingredient_1 = require("./Ingredient");
let RecipeIngredient = class RecipeIngredient {
    id;
    recipe;
    ingredient;
    quantity;
};
exports.RecipeIngredient = RecipeIngredient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecipeIngredient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Recipies_1.Recipies, (recipe) => recipe.ingredients, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: "recipeId" }),
    __metadata("design:type", Recipies_1.Recipies)
], RecipeIngredient.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Ingredient_1.Ingredient, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "ingredientId" }),
    __metadata("design:type", Ingredient_1.Ingredient)
], RecipeIngredient.prototype, "ingredient", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], RecipeIngredient.prototype, "quantity", void 0);
exports.RecipeIngredient = RecipeIngredient = __decorate([
    (0, typeorm_1.Entity)({ name: "recipe_ingredients" })
], RecipeIngredient);
