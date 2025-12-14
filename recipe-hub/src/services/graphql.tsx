import { gql } from "@apollo/client";
export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
    }
  }
`;

export const GET_RECIPE_BY_ID = gql`
  query Recipe($recipeId: ID!) {
    recipe(id: $recipeId) {
      id
      title
      description
      cookingTime
      shortDescription
      calories
      protein
      carbs
      fat
      servings
      difficulty
      steps {
        id
        stepNumber
        instruction
      }
      author {
        userId
        lastName
        firstName
      }
      images {
        id
        imageUrl
      }
      ratings {
        id
        rating
      }
      ingredients {
        id
        quantity
        ingredient {
          id
          name
        }
      }
    }
  }
`;

export const GET_RECIPES_old = gql`
  query Recipies {
    recipes(limit: 6) {
      id
      title
      shortDescription
      createdAt
      servings
      cookingTime
      totalTime
      difficulty
      author {
        userId
        lastName
        firstName
      }
      images {
        id
        imageUrl
      }
      ratings {
        id
        rating
      }
      tags {
        id
        name
      }
    }
  }
`;

// const SbscriberInput = {
//   email: "String!",
// }

export const CREATE_SUBSCRIBER = gql`
  mutation CreateSubscriber($input: SubscriberInput!) {
    createSubscriber(input: $input) {
      email
    }
  }
`;

export const GET_RECIPES = gql`
  query RecipesPaginated($page: Int!, $perPage: Int!) {
    recipesPaginated(page: $page, perPage: $perPage) {
      items {
        id
        title
        shortDescription
        createdAt
        servings
        cookingTime
        totalTime
        difficulty
        author {
          userId
          lastName
          firstName
        }
        images {
          id
          imageUrl
        }
        avgRating
        ratingCount
        tags {
          id
          name
        }
      }
      total
      page
      perPage
      totalPages
      requestedPage
      skip
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        userId
        email
        firstName
        lastName
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        userId
        email
        firstName
        lastName
      }
    }
  }
`;
