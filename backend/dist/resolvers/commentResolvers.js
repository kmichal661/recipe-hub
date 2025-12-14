"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentResolvers = void 0;
const data_source_1 = require("../data-source");
const Comment_1 = require("../entity/Comment");
exports.commentResolvers = {
    Query: {
        comments: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Comment_1.Comment);
            return repo.find({
                where: { recipe: { id: args.recipeId } },
                relations: ["user"],
            });
        },
    },
    Mutation: {
        createComment: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Comment_1.Comment);
            const r = repo.create(args.input);
            return repo.save(r);
        },
        deleteComment: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Comment_1.Comment);
            const res = await repo.delete({ id: args.id });
            return res.affected && res.affected > 0;
        },
    },
};
