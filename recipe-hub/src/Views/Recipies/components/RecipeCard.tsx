import {
  Card,
  HStack,
  Image,
  Tag,
  Avatar,
  Text,
  Button,
} from "@chakra-ui/react";
import { type Recipe } from "./interfaces";
import { LuStar, LuTimer, LuGroup } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const avg =
    typeof recipe.avgRating === "number"
      ? recipe.avgRating
      : recipe.ratings && recipe.ratings.length
        ? recipe.ratings.reduce((acc, r) => acc + r.rating, 0) /
          recipe.ratings.length
        : null;
  const imgSrc =
    recipe?.images && recipe.images.length > 0 && recipe.images[0]?.imageUrl
      ? recipe.images[0].imageUrl
      : undefined;
  return (
    <Card.Root w="400px" overflow="hidden">
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={recipe.title}
          width="100%"
          height="250px"
          objectFit="cover"
        />
      ) : (
        <Image
          src={
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjaXBlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
          }
          alt={recipe.title}
          width="100%"
          height="250px"
          objectFit="cover"
        />
      )}
      <Card.Body gap="2">
        <HStack>
          {recipe.tags &&
            recipe.tags.map((tag) => (
              <Tag.Root variant="subtle" colorScheme="teal" key={tag.id}>
                <Tag.Label>{tag.name}</Tag.Label>
              </Tag.Root>
            ))}
        </HStack>
        <Card.Title>
          <HStack justify={"space-between"}>
            {recipe.title}
            <Text>
              <HStack>
                <LuStar /> {avg !== null ? avg.toFixed(1) : "No ratings"}
              </HStack>
            </Text>
          </HStack>
        </Card.Title>
        <Card.Description>{recipe.shortDescription}</Card.Description>
        <HStack justifyContent="space-between" width="100%">
          <Text>
            <HStack>
              <LuTimer />
              {recipe?.cookingTime} min
            </HStack>
          </Text>
          <Text>
            <HStack>
              <LuGroup />
              {recipe?.servings} servings
            </HStack>
          </Text>
          <Text>
            <Tag.Root variant={"solid"} size={"lg"}>
              {recipe?.difficulty}
            </Tag.Root>
          </Text>
        </HStack>
      </Card.Body>
      {/* <br /> */}
      <Card.Footer gap="2">
        <NavLink to={`/recipes/${recipe.id}`} style={{ width: "100%" }}>
          <Button w="100%" colorScheme="teal">
            View Recipe
          </Button>
        </NavLink>
      </Card.Footer>
    </Card.Root>
  );
}
