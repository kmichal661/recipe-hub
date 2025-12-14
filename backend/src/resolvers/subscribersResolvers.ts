import { AppDataSource } from "../data-source";
import { Subscriber } from "../entity/Subscribers";

export const subscriberResolvers = {
  Query: {
    subscribers: async () => {
      const repo = AppDataSource.getRepository(Subscriber);
      return repo.find();
    },
    subscriber: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Subscriber);
      return repo.findOne({ where: { id: args.id } });
    },
  },
  Mutation: {
    createSubscriber: async (_: any, args: { input: any }) => {
      console.log("[createSubscriber] input:", args.input);
      const repo = AppDataSource.getRepository(Subscriber);
      const r = repo.create(args.input);
      const saved = await repo.save(r);
      console.log("[createSubscriber] saved:", saved);
      return saved;
    },
    updateSubscriber: async (_: any, args: { id: number; input: any }) => {
      const repo = AppDataSource.getRepository(Subscriber);
      await repo.update({ id: args.id }, args.input);
      return repo.findOne({ where: { id: args.id } });
    },
    deleteSubscriber: async (_: any, args: { id: number }) => {
      const repo = AppDataSource.getRepository(Subscriber);
      const res = await repo.delete({ id: args.id });
      return res.affected && res.affected > 0;
    },
  },
};
