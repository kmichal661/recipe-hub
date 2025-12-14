import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export const categoryResolvers = {
  Query: {
    categories: async () => {
      const repo = AppDataSource.getRepository(Category);
      return repo.find();
    },
    category: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Category);
      return repo.findOne({ where: { id: args.id } });
    },
  },
  Mutation: {
    createCategory: async (_: any, args: { input: any }) => {
      const repo = AppDataSource.getRepository(Category);
      const r = repo.create(args.input);
      return repo.save(r);
    },
    updateCategory: async (_: any, args: { id: number; input: any }) => {
      const repo = AppDataSource.getRepository(Category);
      await repo.update({ id: args.id }, args.input);
      return repo.findOne({ where: { id: args.id } });
    },
    deleteCategory: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Category);
      const res = await repo.delete({ id: args.id });
      return res.affected && res.affected > 0;
    },
  },
};
