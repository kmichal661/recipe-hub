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
exports.Recipies = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const RecipeImage_1 = require("./RecipeImage");
const RecipeIngredient_1 = require("./RecipeIngredient");
const Comment_1 = require("./Comment");
const Rating_1 = require("./Rating");
const RecipeCategory_1 = require("./RecipeCategory");
const RecipeTag_1 = require("./RecipeTag");
const RecipeStep_1 = require("./RecipeStep");
let Recipies = class Recipies {
    id;
    author;
    title;
    servings;
    difficulty;
    shortDescription;
    calories;
    protein;
    carbs;
    fat;
    description;
    preparationTime;
    cookingTime;
    totalTime;
    createdAt;
    images;
    ingredients;
    comments;
    ratings;
    categories;
    tags;
    steps;
};
exports.Recipies = Recipies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Recipies.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "authorId" }),
    __metadata("design:type", User_1.User)
], Recipies.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Recipies.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Recipies.prototype, "servings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Recipies.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Recipies.prototype, "shortDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Recipies.prototype, "calories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Recipies.prototype, "protein", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Recipies.prototype, "carbs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Recipies.prototype, "fat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Recipies.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Recipies.prototype, "preparationTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Recipies.prototype, "cookingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: true }),
    __metadata("design:type", Number)
], Recipies.prototype, "totalTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Recipies.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeImage_1.RecipeImage, (img) => img.recipe),
    __metadata("design:type", Array)
], Recipies.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeIngredient_1.RecipeIngredient, (ri) => ri.recipe),
    __metadata("design:type", Array)
], Recipies.prototype, "ingredients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (c) => c.recipe),
    __metadata("design:type", Array)
], Recipies.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Rating_1.Rating, (r) => r.recipe),
    __metadata("design:type", Array)
], Recipies.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeCategory_1.RecipeCategory, (rc) => rc.recipe),
    __metadata("design:type", Array)
], Recipies.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeTag_1.RecipeTag, (rt) => rt.recipe),
    __metadata("design:type", Array)
], Recipies.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeStep_1.RecipeStep, (s) => s.recipe),
    __metadata("design:type", Array)
], Recipies.prototype, "steps", void 0);
exports.Recipies = Recipies = __decorate([
    (0, typeorm_1.Entity)({ name: "recipes" })
], Recipies);
