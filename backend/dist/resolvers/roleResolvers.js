"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleResolvers = void 0;
const data_source_1 = require("../data-source");
const Role_1 = require("../entity/Role");
exports.roleResolvers = {
    Query: {
        roles: async () => {
            const repo = data_source_1.AppDataSource.getRepository(Role_1.Role);
            return repo.find({ relations: ["users"] });
        },
        role: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Role_1.Role);
            return repo.findOne({ where: { id: args.id }, relations: ["users"] });
        },
    },
    Mutation: {
        createRole: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Role_1.Role);
            const r = repo.create(args.input);
            return repo.save(r);
        },
        updateRole: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Role_1.Role);
            await repo.update({ id: args.id }, args.input);
            return repo.findOne({ where: { id: args.id } });
        },
        deleteRole: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Role_1.Role);
            const res = await repo.delete({ id: args.id });
            return res.affected && res.affected > 0;
        },
    },
};
