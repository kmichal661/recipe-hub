"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientResolvers = void 0;
const data_source_1 = require("../data-source");
const Ingredient_1 = require("../entity/Ingredient");
exports.ingredientResolvers = {
    Query: {
        ingredients: async () => {
            const repo = data_source_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
            return repo.find();
        },
        ingredient: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
            return repo.findOne({ where: { id: args.id } });
        },
    },
    Mutation: {
        createIngredient: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
            const r = repo.create(args.input);
            return repo.save(r);
        },
        updateIngredient: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
            await repo.update({ id: args.id }, args.input);
            return repo.findOne({ where: { id: args.id } });
        },
        deleteIngredient: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
            const res = await repo.delete({ id: args.id });
            return res.affected && res.affected > 0;
        },
    },
};
