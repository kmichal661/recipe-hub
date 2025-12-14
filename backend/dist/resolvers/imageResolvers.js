"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResolvers = void 0;
const data_source_1 = require("../data-source");
const RecipeImage_1 = require("../entity/RecipeImage");
exports.imageResolvers = {
    Query: {
        images: async () => {
            const repo = data_source_1.AppDataSource.getRepository(RecipeImage_1.RecipeImage);
            return repo.find({ relations: ["recipe"] });
        },
    },
};
