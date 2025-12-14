import {
  VStack,
  Heading,
  Text,
  HStack,
  ButtonGroup,
  IconButton,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FilterPanel } from "./components/FilterPanel";
import { useQuery } from "@apollo/client/react";
import { GET_ROLES, GET_RECIPES } from "../../services/graphql";
import { useEffect } from "react";
import type { Recipe } from "./components/interfaces";
import { RecipeCard } from "./components/RecipeCard";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Recipes() {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const { loading, error, data, refetch } = useQuery<any>(GET_RECIPES, {
    variables: { page, perPage },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    console.log(`[Recipes] requesting page=${page} perPage=${perPage}`);
  }, [page, perPage, refetch]);

  useEffect(() => {
    if (data) {
      console.log("Fetched recipes:", data);
    }
  }, [data]);

  if (loading)
    return (
      <Center height="70vh">
        <Spinner color="teal.500" size="xl" />
      </Center>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <VStack padding={8} gap={6} width="100%">
      <Heading size="2xl">Delicious Recipes</Heading>
      <Text fontSize="lg" color="gray.600">
        Discover amazing dishes from around the world
      </Text>
      <FilterPanel />
      <HStack width="100%" flexWrap="wrap" gap={8} justifyContent="center">
        {data?.recipesPaginated?.items.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </HStack>

      {(() => {
        const total = data?.recipesPaginated?.total || 0;
        const totalPages = Math.max(1, Math.ceil(total / perPage));
        const pages: number[] = [];
        for (let i = 1; i <= totalPages; i++) pages.push(i);

        return (
          <HStack gap={3}>
            <IconButton
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <HiChevronLeft />
            </IconButton>

            <ButtonGroup variant="ghost" size="sm">
              {pages.map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "outline" : "ghost"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
            </ButtonGroup>

            <IconButton
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              <HiChevronRight />
            </IconButton>
          </HStack>
        );
      })()}
    </VStack>
  );
}
