"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryResolvers = void 0;
const data_source_1 = require("../data-source");
const Category_1 = require("../entity/Category");
exports.categoryResolvers = {
    Query: {
        categories: async () => {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            return repo.find();
        },
        category: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            return repo.findOne({ where: { id: args.id } });
        },
    },
    Mutation: {
        createCategory: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            const r = repo.create(args.input);
            return repo.save(r);
        },
        updateCategory: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            await repo.update({ id: args.id }, args.input);
            return repo.findOne({ where: { id: args.id } });
        },
        deleteCategory: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Category_1.Category);
            const res = await repo.delete({ id: args.id });
            return res.affected && res.affected > 0;
        },
    },
};
