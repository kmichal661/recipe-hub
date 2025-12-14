import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";

export const commentResolvers = {
  Query: {
    comments: async (_: any, args: { recipeId: number }) => {
      const repo = AppDataSource.getRepository(Comment);
      return repo.find({
        where: { recipe: { id: args.recipeId } },
        relations: ["user"],
      });
    },
  },
  Mutation: {
    createComment: async (_: any, args: { input: any }) => {
      const repo = AppDataSource.getRepository(Comment);
      const r = repo.create(args.input);
      return repo.save(r);
    },
    deleteComment: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Comment);
      const res = await repo.delete({ id: args.id });
      return res.affected && res.affected > 0;
    },
  },
};
