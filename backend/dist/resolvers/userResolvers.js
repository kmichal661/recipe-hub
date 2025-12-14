"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const Role_1 = require("../entity/Role");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userResolvers = {
    Query: {
        users: async () => {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            return repo.find({ relations: ["role", "recipes"] });
        },
        user: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            return repo.findOne({
                where: { userId: args.id },
                relations: ["role", "recipes"],
            });
        },
    },
    Mutation: {
        createUser: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const input = { ...args.input };
            if (input.roleId) {
                const roleRepo = data_source_1.AppDataSource.getRepository(Role_1.Role);
                const role = await roleRepo.findOne({ where: { id: input.roleId } });
                if (role)
                    input.role = role;
                delete input.roleId;
            }
            if (input.password) {
                const salt = await bcryptjs_1.default.genSalt(10);
                input.password = await bcryptjs_1.default.hash(input.password, salt);
            }
            const r = repo.create(input);
            return repo.save(r);
        },
        register: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const input = { ...args.input };
            // default role (if you have a default role id, you can set it here)
            const roleRepo = data_source_1.AppDataSource.getRepository(Role_1.Role);
            let defaultRole = await roleRepo.findOne({ where: { name: "user" } });
            if (!defaultRole) {
                const newRole = roleRepo.create({ name: "user" });
                defaultRole = await roleRepo.save(newRole);
                console.log("[register] created default role:", defaultRole);
            }
            input.role = defaultRole;
            const salt = await bcryptjs_1.default.genSalt(10);
            input.password = await bcryptjs_1.default.hash(input.password, salt);
            const r = repo.create(input);
            const saved = await repo.save(r);
            const token = jsonwebtoken_1.default.sign({ userId: saved.userId }, process.env.JWT_SECRET || "dev_secret", {
                expiresIn: "7d",
            });
            return { token, user: saved };
        },
        updateUser: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const input = { ...args.input };
            if (input.roleId) {
                const roleRepo = data_source_1.AppDataSource.getRepository(Role_1.Role);
                const role = await roleRepo.findOne({ where: { id: input.roleId } });
                if (role)
                    input.role = role;
                delete input.roleId;
            }
            await repo.update({ userId: args.id }, input);
            return repo.findOne({ where: { userId: args.id } });
        },
        deleteUser: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const res = await repo.delete({ userId: args.id });
            return res.affected && res.affected > 0;
        },
        login: async (_, args) => {
            const repo = data_source_1.AppDataSource.getRepository(User_1.User);
            const user = await repo.findOne({ where: { email: args.email } });
            if (!user)
                throw new Error("Invalid credentials");
            const valid = await bcryptjs_1.default.compare(args.password, user.password);
            if (!valid)
                throw new Error("Invalid credentials");
            const token = jsonwebtoken_1.default.sign({ userId: user.userId }, process.env.JWT_SECRET || "dev_secret", {
                expiresIn: "7d",
            });
            return { token, user };
        },
    },
};
