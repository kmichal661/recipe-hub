export const typeDefs = `#graphql

type Role {
  id: ID
  name: String
  users: [User]
}

type User {
  userId: ID
  email: String
  firstName: String
  lastName: String
  bio: String
  avatarUrl: String
  role: Role
  recipes: [Recipe]
}

type Recipe {
  id: ID
  author: User
  title: String
  description: String
  preparationTime: Int
  cookingTime: Int
  totalTime: Int
  shortDescription: String
  calories: Int
  protein: Int
  carbs: Int
  fat: Int
  difficulty: String
  servings: Int
  createdAt: String
  images: [RecipeImage]
  ingredients: [RecipeIngredient]
  comments: [Comment]
  ratings: [Rating]
  avgRating: Float
  ratingCount: Int
  categories: [Category]
  tags: [Tag]
  steps: [RecipeStep]
}

type RecipePage {
  items: [Recipe]
  total: Int
  page: Int
  perPage: Int
  totalPages: Int
  requestedPage: Int
  skip: Int
}

type RecipeImage {
  id: ID
  imageUrl: String
}

type Ingredient {
  id: ID
  name: String
}

type Subscriber {
  id: ID
  email: String
}

type RecipeIngredient {
  id: ID
  ingredient: Ingredient
  quantity: String
}

type Comment {
  id: ID
  user: User
  content: String
  createdAt: String
}

type Rating {
  id: ID
  user: User
  rating: Int
  createdAt: String
}

type Category {
  id: ID
  name: String
}

type Tag {
  id: ID
  name: String
}

type RecipeStep {
  id: ID
  stepNumber: Int
  instruction: String
}
type AuthPayload {
  token: String
  user: User
}

type Query {
  users: [User]
  user(id: ID!): User
  roles: [Role]
  role(id: ID!): Role
  subscribers: [Subscriber]
  subscriber(id: ID!): Subscriber

  recipes: [Recipe]
  recipesPaginated(page: Int!, perPage: Int!): RecipePage
  recipe(id: ID!): Recipe

  images: [RecipeImage]

  ingredients: [Ingredient]
  ingredient(id: ID!): Ingredient

  categories: [Category]
  category(id: ID!): Category

  tags: [Tag]
  tag(id: ID!): Tag

  comments(recipeId: ID!): [Comment]
  ratings(recipeId: ID!): [Rating]
}

input RoleInput {
  name: String
}

input UserInput {
  email: String
  password: String
  firstName: String
  lastName: String
  bio: String
  avatarUrl: String
  roleId: ID
}

input RecipeInput {
  authorId: ID
  title: String
  description: String
  preparationTime: Int
  cookingTime: Int
}
input RegisterInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
}

input IngredientInput {
  name: String
}

input CommentInput {
  recipeId: ID!
  userId: ID!
  content: String!
}

input RatingInput {
  recipeId: ID!
  userId: ID!
  rating: Int!
}

input CategoryInput {
  name: String
}

input SubscriberInput {
  email: String
}

input TagInput {
  name: String
}

type Mutation {
  createRole(input: RoleInput!): Role
  updateRole(id: ID!, input: RoleInput!): Role
  deleteRole(id: ID!): Boolean

  createSubscriber(input: SubscriberInput!): Subscriber
  deleteSubscriber(id: ID!): Boolean
  updateSubscriber(id: ID!, input: SubscriberInput!): Subscriber

  createUser(input: UserInput!): User
  register(input: RegisterInput!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  updateUser(id: ID!, input: UserInput!): User
  deleteUser(id: ID!): Boolean

  createRecipe(input: RecipeInput!): Recipe
  updateRecipe(id: ID!, input: RecipeInput!): Recipe
  deleteRecipe(id: ID!): Boolean

  createIngredient(input: IngredientInput!): Ingredient
  updateIngredient(id: ID!, input: IngredientInput!): Ingredient
  deleteIngredient(id: ID!): Boolean

  createComment(input: CommentInput!): Comment
  deleteComment(id: ID!): Boolean

  createRating(input: RatingInput!): Rating
  deleteRating(id: ID!): Boolean

  createCategory(input: CategoryInput!): Category
  updateCategory(id: ID!, input: CategoryInput!): Category
  deleteCategory(id: ID!): Boolean

  createTag(input: TagInput!): Tag
  updateTag(id: ID!, input: TagInput!): Tag
  deleteTag(id: ID!): Boolean
}

`;
