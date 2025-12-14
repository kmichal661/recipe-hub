import { roleResolvers } from "./roleResolvers";
import { userResolvers } from "./userResolvers";
import { recipeResolvers } from "./recipeResolvers";
import { ingredientResolvers } from "./ingredientResolvers";
import { imageResolvers } from "./imageResolvers";
import { commentResolvers } from "./commentResolvers";
import { ratingResolvers } from "./ratingResolvers";
import { categoryResolvers } from "./categoryResolvers";
import { tagResolvers } from "./tagResolvers";
import { subscriberResolvers } from "./subscribersResolvers";

export const resolvers = [
  roleResolvers,
  userResolvers,
  recipeResolvers,
  ingredientResolvers,
  imageResolvers,
  commentResolvers,
  ratingResolvers,
  categoryResolvers,
  tagResolvers,
  subscriberResolvers,
];

export default resolvers;
