"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagResolvers = void 0;
const data_source_1 = require("../data-source");
const Tag_1 = require("../entity/Tag");
exports.tagResolvers = {
    Query: {
        tags: async () => {
            const repo = data_source_1.AppDataSource.getRepository(Tag_1.Tag);
            return repo.find();
        },
        tag: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Tag_1.Tag);
            return repo.findOne({ where: { id: args.id } });
        },
    },
    Mutation: {
        createTag: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Tag_1.Tag);
            const r = repo.create(args.input);
            return repo.save(r);
        },
        updateTag: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Tag_1.Tag);
            await repo.update({ id: args.id }, args.input);
            return repo.findOne({ where: { id: args.id } });
        },
        deleteTag: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Tag_1.Tag);
            const res = await repo.delete({ id: args.id });
            return res.affected && res.affected > 0;
        },
    },
};
