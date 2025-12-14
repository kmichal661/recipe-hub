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
exports.RecipeTag = void 0;
const typeorm_1 = require("typeorm");
const Recipies_1 = require("./Recipies");
const Tag_1 = require("./Tag");
let RecipeTag = class RecipeTag {
    id;
    recipe;
    tag;
};
exports.RecipeTag = RecipeTag;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecipeTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Recipies_1.Recipies, (recipe) => recipe.tags, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "recipeId" }),
    __metadata("design:type", Recipies_1.Recipies)
], RecipeTag.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tag_1.Tag, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "tagId" }),
    __metadata("design:type", Tag_1.Tag)
], RecipeTag.prototype, "tag", void 0);
exports.RecipeTag = RecipeTag = __decorate([
    (0, typeorm_1.Entity)({ name: "recipe_tags" })
], RecipeTag);
