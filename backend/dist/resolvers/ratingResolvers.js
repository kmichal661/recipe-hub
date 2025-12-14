"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingResolvers = void 0;
const data_source_1 = require("../data-source");
const Rating_1 = require("../entity/Rating");
exports.ratingResolvers = {
    Query: {
        ratings: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Rating_1.Rating);
            return repo.find({
                where: { recipe: { id: args.recipeId } },
                relations: ["user"],
            });
        },
    },
    Mutation: {
        createRating: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Rating_1.Rating);
            const r = repo.create(args.input);
            return repo.save(r);
        },
        deleteRating: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Rating_1.Rating);
            const res = await repo.delete({ id: args.id });
            return res.affected && res.affected > 0;
        },
    },
};
