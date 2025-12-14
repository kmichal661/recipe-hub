import { AppDataSource } from "../data-source";
import { Recipies } from "../entity/Recipies";

export const recipeResolvers = {
  Query: {
    recipes: async () => {
      const repo = AppDataSource.getRepository(Recipies);
      return repo.find({
        relations: [
          "author",
          "images",
          "ingredients",
          "ingredients.ingredient",
          "comments",
          "ratings",
          "categories",
          "categories.category",
          "tags",
          "tags.tag",
          "steps",
        ],
      });
    },
    recipesPaginated: async (
      _: any,
      args: { page: number; perPage: number }
    ) => {
      const repo = AppDataSource.getRepository(Recipies);
      const page = Math.max(1, args.page || 1);
      const perPage = Math.max(1, Math.min(100, args.perPage || 10));
      const skip = (page - 1) * perPage;
      console.log(
        `[recipesPaginated] received args: page=${args.page} perPage=${args.perPage}`
      );

      // Use QueryBuilder for reliable skip/take and include images/author
      const qb = repo
        .createQueryBuilder("r")
        .leftJoinAndSelect("r.images", "images")
        .leftJoinAndSelect("r.author", "author")
        .orderBy("r.createdAt", "DESC")
        .skip(skip)
        .take(perPage);

      const [items, total] = await qb.getManyAndCount();

      // Aggregate ratings for these items in one query
      const recipeIds = items.map((it: any) => it.id);
      let ratingMap: Record<number, { avg: number; count: number }> = {};
      if (recipeIds.length) {
        const rb = AppDataSource.createQueryBuilder();
        const rows = await rb
          .select("rating.recipeId", "recipeId")
          .addSelect("AVG(rating.rating)", "avg")
          .addSelect("COUNT(rating.id)", "count")
          .from("ratings", "rating")
          .where("rating.recipeId IN (:...ids)", { ids: recipeIds })
          .groupBy("rating.recipeId")
          .getRawMany();
        rows.forEach((r: any) => {
          ratingMap[Number(r.recipeId)] = {
            avg: Number(r.avg),
            count: Number(r.count),
          };
        });
      }

      const totalPages = Math.ceil(total / perPage);
      // attach aggregates
      const itemsWithAgg = items.map((it: any) => ({
        ...it,
        avgRating: ratingMap[it.id]?.avg ?? null,
        ratingCount: ratingMap[it.id]?.count ?? 0,
      }));

      return {
        items: itemsWithAgg,
        total,
        page,
        perPage,
        totalPages,
        requestedPage: args.page,
        skip,
      };
    },
    recipe: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Recipies);
      return repo.findOne({
        where: { id: args.id },
        relations: [
          "author",
          "images",
          "ingredients",
          "ingredients.ingredient",
          "comments",
          "ratings",
          "categories",
          "categories.category",
          "tags",
          "tags.tag",
          "steps",
        ],
      });
    },
  },
  Recipe: {
    tags: (parent: any) => {
      // parent.tags is an array of RecipeTag entities with a nested `tag`
      if (!parent.tags) return [];
      return parent.tags.map((rt: any) => rt.tag || rt);
    },
    categories: (parent: any) => {
      if (!parent.categories) return [];
      return parent.categories.map((rc: any) => rc.category || rc);
    },
  },
  Mutation: {
    createRecipe: async (_: any, args: { input: any }) => {
      const repo = AppDataSource.getRepository(Recipies);
      const r = repo.create(args.input);
      return repo.save(r);
    },
    updateRecipe: async (_: any, args: { id: number; input: any }) => {
      const repo = AppDataSource.getRepository(Recipies);
      await repo.update({ id: args.id }, args.input);
      return repo.findOne({ where: { id: args.id } });
    },
    deleteRecipe: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Recipies);
      const res = await repo.delete({ id: args.id });
      return res.affected && res.affected > 0;
    },
  },
};
