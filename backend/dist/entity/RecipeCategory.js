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
exports.RecipeCategory = void 0;
const typeorm_1 = require("typeorm");
const Recipies_1 = require("./Recipies");
const Category_1 = require("./Category");
let RecipeCategory = class RecipeCategory {
    id;
    recipe;
    category;
};
exports.RecipeCategory = RecipeCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecipeCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Recipies_1.Recipies, (recipe) => recipe.categories, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "recipeId" }),
    __metadata("design:type", Recipies_1.Recipies)
], RecipeCategory.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "categoryId" }),
    __metadata("design:type", Category_1.Category)
], RecipeCategory.prototype, "category", void 0);
exports.RecipeCategory = RecipeCategory = __decorate([
    (0, typeorm_1.Entity)({ name: "recipe_categories" })
], RecipeCategory);
