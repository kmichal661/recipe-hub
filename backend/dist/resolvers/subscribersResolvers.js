"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberResolvers = void 0;
const data_source_1 = require("../data-source");
const Subscribers_1 = require("../entity/Subscribers");
exports.subscriberResolvers = {
    Query: {
        subscribers: async () => {
            const repo = data_source_1.AppDataSource.getRepository(Subscribers_1.Subscriber);
            return repo.find();
        },
        subscriber: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Subscribers_1.Subscriber);
            return repo.findOne({ where: { id: args.id } });
        },
    },
    Mutation: {
        createSubscriber: async (_, args) => {
            console.log("[createSubscriber] input:", args.input);
            const repo = data_source_1.AppDataSource.getRepository(Subscribers_1.Subscriber);
            const r = repo.create(args.input);
            const saved = await repo.save(r);
            console.log("[createSubscriber] saved:", saved);
            return saved;
        },
        updateSubscriber: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Subscribers_1.Subscriber);
            await repo.update({ id: args.id }, args.input);
            return repo.findOne({ where: { id: args.id } });
        },
        deleteSubscriber: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(Subscribers_1.Subscriber);
            const res = await repo.delete({ id: args.id });
            return res.affected && res.affected > 0;
        },
    },
};
