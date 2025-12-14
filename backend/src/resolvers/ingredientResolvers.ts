import { AppDataSource } from "../data-source";
import { Ingredient } from "../entity/Ingredient";

export const ingredientResolvers = {
  Query: {
    ingredients: async () => {
      const repo = AppDataSource.getRepository(Ingredient);
      return repo.find();
    },
    ingredient: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Ingredient);
      return repo.findOne({ where: { id: args.id } });
    },
  },
  Mutation: {
    createIngredient: async (_: any, args: { input: any }) => {
      const repo = AppDataSource.getRepository(Ingredient);
      const r = repo.create(args.input);
      return repo.save(r);
    },
    updateIngredient: async (_: any, args: { id: number; input: any }) => {
      const repo = AppDataSource.getRepository(Ingredient);
      await repo.update({ id: args.id }, args.input);
      return repo.findOne({ where: { id: args.id } });
    },
    deleteIngredient: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Ingredient);
      const res = await repo.delete({ id: args.id });
      return res.affected && res.affected > 0;
    },
  },
};
