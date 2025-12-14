import { AppDataSource } from "../data-source";
import { Rating } from "../entity/Rating";

export const ratingResolvers = {
  Query: {
    ratings: async (_: any, args: { recipeId: number }) => {
      const repo = AppDataSource.getRepository(Rating);
      return repo.find({
        where: { recipe: { id: args.recipeId } },
        relations: ["user"],
      });
    },
  },
  Mutation: {
    createRating: async (_: any, args: { input: any }) => {
      const repo = AppDataSource.getRepository(Rating);
      const r = repo.create(args.input);
      return repo.save(r);
    },
    deleteRating: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Rating);
      const res = await repo.delete({ id: args.id });
      return res.affected && res.affected > 0;
    },
  },
};
