"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const roleResolvers_1 = require("./roleResolvers");
const userResolvers_1 = require("./userResolvers");
const recipeResolvers_1 = require("./recipeResolvers");
const ingredientResolvers_1 = require("./ingredientResolvers");
const imageResolvers_1 = require("./imageResolvers");
const commentResolvers_1 = require("./commentResolvers");
const ratingResolvers_1 = require("./ratingResolvers");
const categoryResolvers_1 = require("./categoryResolvers");
const tagResolvers_1 = require("./tagResolvers");
const subscribersResolvers_1 = require("./subscribersResolvers");
exports.resolvers = [
    roleResolvers_1.roleResolvers,
    userResolvers_1.userResolvers,
    recipeResolvers_1.recipeResolvers,
    ingredientResolvers_1.ingredientResolvers,
    imageResolvers_1.imageResolvers,
    commentResolvers_1.commentResolvers,
    ratingResolvers_1.ratingResolvers,
    categoryResolvers_1.categoryResolvers,
    tagResolvers_1.tagResolvers,
    subscribersResolvers_1.subscriberResolvers,
];
exports.default = exports.resolvers;
