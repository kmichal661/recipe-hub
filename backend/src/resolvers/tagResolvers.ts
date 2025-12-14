import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";

export const tagResolvers = {
  Query: {
    tags: async () => {
      const repo = AppDataSource.getRepository(Tag);
      return repo.find();
    },
    tag: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Tag);
      return repo.findOne({ where: { id: args.id } });
    },
  },
  Mutation: {
    createTag: async (_: any, args: { input: any }) => {
      const repo = AppDataSource.getRepository(Tag);
      const r = repo.create(args.input);
      return repo.save(r);
    },
    updateTag: async (_: any, args: { id: number; input: any }) => {
      const repo = AppDataSource.getRepository(Tag);
      await repo.update({ id: args.id }, args.input);
      return repo.findOne({ where: { id: args.id } });
    },
    deleteTag: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Tag);
      const res = await repo.delete({ id: args.id });
      return res.affected && res.affected > 0;
    },
  },
};
