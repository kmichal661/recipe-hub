import { AppDataSource } from "../data-source";
import { Role } from "../entity/Role";

export const roleResolvers = {
  Query: {
    roles: async () => {
      const repo = AppDataSource.getRepository(Role);
      return repo.find({ relations: ["users"] });
    },
    role: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Role);
      return repo.findOne({ where: { id: args.id }, relations: ["users"] });
    },
  },
  Mutation: {
    createRole: async (_: any, args: { input: any }) => {
      const repo = AppDataSource.getRepository(Role);
      const r = repo.create(args.input);
      return repo.save(r);
    },
    updateRole: async (_: any, args: { id: number; input: any }) => {
      const repo = AppDataSource.getRepository(Role);
      await repo.update({ id: args.id }, args.input);
      return repo.findOne({ where: { id: args.id } });
    },
    deleteRole: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Role);
      const res = await repo.delete({ id: args.id });
      return res.affected && res.affected > 0;
    },
  },
};
