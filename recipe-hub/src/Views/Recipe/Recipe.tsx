import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_RECIPE_BY_ID } from "@/services/graphql";
import { useQuery } from "@apollo/client/react";
import {
  VStack,
  Heading,
  Text,
  HStack,
  Stack,
  Breadcrumb,
  Avatar,
  Tag,
  Image,
  Circle,
  Checkbox,
  Card,
  Center,
  Spinner,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import type { Recipe } from "../Recipies/components/interfaces";
import {
  LuGroup,
  LuTimer,
  LuStar,
  LuBookmark,
  LuPrinter,
  LuShare,
} from "react-icons/lu";

export default function Recipe() {
  const { id } = useParams<{ id: string }>();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { loading, error, data } = useQuery<any>(GET_RECIPE_BY_ID, {
    variables: { recipeId: id },
  });

  useEffect(() => {
    console.log("Recipe ID:", id);
    if (data) {
      console.log("Fetched recipe data:", data);
    }
  }, [id, data]);

  if (loading)
    return (
      <Center height="70vh">
        <Spinner color="teal.500" size="xl" />
      </Center>
    );
  if (error) return <p>Error: {error.message}</p>;

  const { recipe }: { recipe: Recipe } = data;

  return (
    <VStack
      px={{ base: 4, md: 20 }}
      gap={6}
      width="100%"
      align={"start"}
      color={"gray.500"}
    >
      <Breadcrumb.Root width="100%">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Italian</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>{recipe.title}</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Stack
        direction={{ base: "column", md: "row" }}
        align={"start"}
        width="100%"
      >
        <VStack p={3} w={{ base: "100%", md: "60%" }} align={"start"} gap={6}>
          <Heading color={"black"} size="2xl">
            {recipe.title}
          </Heading>
          <HStack gap={4}>
            <HStack>
              <LuTimer /> {recipe.cookingTime} min
            </HStack>
            <HStack>
              <LuGroup /> {recipe.servings} servings
            </HStack>
            <HStack>
              <Tag.Root variant={"solid"} size={"lg"}>
                <Tag.Label>{recipe.difficulty}</Tag.Label>
              </Tag.Root>
            </HStack>
          </HStack>
          <HStack width="100%">
            <VStack align="start">
              <HStack>
                <Avatar.Root>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src="" />
                </Avatar.Root>
                <Text>
                  By {recipe.author.firstName} {recipe.author.lastName}
                </Text>
              </HStack>
            </VStack>

            <HStack marginLeft="auto">
              <LuStar />
              {recipe.ratings.length > 0 ? (
                <>
                  {(
                    recipe.ratings.reduce((acc, r) => acc + r.rating, 0) /
                    recipe.ratings.length
                  ).toFixed(1)}
                  {` (${recipe.ratings.length} reviews)`}
                </>
              ) : (
                "No ratings"
              )}
            </HStack>
          </HStack>
          <Image
            src={recipe.images[0]?.imageUrl}
            alt={recipe.title}
            width={{ base: "100%", md: "90%" }}
            minWidth={{ base: "auto", md: "600px" }}
            height={{ base: "auto", md: "400px" }}
            objectFit="cover"
            borderRadius={10}
            boxShadow="lg"
          />
          <VStack align={"start"} gap={4} w={"90%"}>
            <Text fontSize={17}>{recipe.description}</Text>
          </VStack>
          <Heading color={"black"} size="lg">
            Ingredients
          </Heading>
          {/* Ingredients in two even columns */}
          {/* Ingredients: two columns on md+, single column on mobile */}
          <Stack
            direction={{ base: "column", md: "row" }}
            align={"start"}
            gap={8}
            w={{ base: "100%", md: "90%" }}
          >
            {(() => {
              if (isMobile) {
                return (
                  <VStack align={"start"} gap={2} width="100%">
                    {recipe.ingredients.map((item) => (
                      <Checkbox.Root key={item.ingredient.id + item.quantity}>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>
                          {item.quantity} {item.ingredient.name}
                        </Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </VStack>
                );
              }

              const cols = [[], []] as (typeof recipe.ingredients)[];
              recipe.ingredients.forEach((it, idx) => cols[idx % 2].push(it));
              return cols.map((col, ci) => (
                <VStack key={ci} align={"start"} gap={2} width="50%">
                  {col.map((item) => (
                    <Checkbox.Root key={item.ingredient.id + item.quantity}>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>
                        {item.quantity} {item.ingredient.name}
                      </Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </VStack>
              ));
            })()}
          </Stack>
          <Heading color={"black"} size="lg">
            Steps
          </Heading>
          <VStack align={"start"} gap={4}>
            {recipe.steps.map((step) => (
              <Text key={step.id}>
                <HStack gap={10}>
                  <Circle size="50px" bg="black" color="white">
                    {step.stepNumber}
                  </Circle>{" "}
                  {step.instruction}
                </HStack>
              </Text>
            ))}
          </VStack>
        </VStack>
        {/* Right panel: only nutrition card (moved responsively) */}
        <VStack p={3} w={{ base: "100%", md: "30%" }} align={"start"} gap={6}>
          {/* Actions (hidden on mobile) */}
          <Card.Root
            padding={5}
            boxShadow="md"
            width="100%"
            display={{ base: "none", md: "block" }}
          >
            <VStack align={"center"} gap={4}>
              <Button size="lg" w={"80%"}>
                <LuBookmark /> Save Recipe
              </Button>
              <Button size={"lg"} variant={"outline"} w={"80%"}>
                <LuPrinter /> Print Recipe
              </Button>
              <Button size={"lg"} variant={"outline"} w={"80%"}>
                <LuShare /> Share Recipe
              </Button>
            </VStack>
          </Card.Root>

          {/* On mobile we'll hide this card here and render it between ingredients and steps */}
          <Card.Root
            padding={5}
            boxShadow="md"
            width="100%"
            display={{ base: "none", md: "block" }}
          >
            <VStack align={"start"} gap={4}>
              <Heading size="lg" color={"black"}>
                Nutrition Facts
              </Heading>
              <VStack width={"100%"}>
                <HStack justify={"space-between"} width="100%">
                  <Text>Calories:</Text>
                  <Text fontWeight={"bold"}>{recipe.calories} kcal</Text>
                </HStack>
                <HStack justify={"space-between"} width="100%">
                  <Text>Protein:</Text>
                  <Text fontWeight={"bold"}>{recipe.protein} g</Text>
                </HStack>
                <HStack justify={"space-between"} width="100%">
                  <Text>Carbohydrates:</Text>
                  <Text fontWeight={"bold"}>{recipe.carbs} g</Text>
                </HStack>
                <HStack justify={"space-between"} width="100%">
                  <Text>Fat:</Text>
                  <Text fontWeight={"bold"}>{recipe.fat} g</Text>
                </HStack>
              </VStack>
            </VStack>
          </Card.Root>
        </VStack>
      </Stack>
      {/* Nutrition card for mobile: show between ingredients and steps */}
      {isMobile && (
        <Card.Root padding={5} boxShadow="md" width="100%">
          <VStack align={"start"} gap={4}>
            <Heading size="lg" color={"black"}>
              Nutrition Facts
            </Heading>
            <VStack width={"100%"}>
              <HStack justify={"space-between"} width="100%">
                <Text>Calories:</Text>
                <Text fontWeight={"bold"}>{recipe.calories} kcal</Text>
              </HStack>
              <HStack justify={"space-between"} width={"100%"}>
                <Text>Protein:</Text>
                <Text fontWeight={"bold"}>{recipe.protein} g</Text>
              </HStack>
              <HStack justify={"space-between"} width={"100%"}>
                <Text>Carbohydrates:</Text>
                <Text fontWeight={"bold"}>{recipe.carbs} g</Text>
              </HStack>
              <HStack justify={"space-between"} width={"100%"}>
                <Text>Fat:</Text>
                <Text fontWeight={"bold"}>{recipe.fat} g</Text>
              </HStack>
            </VStack>
          </VStack>
        </Card.Root>
      )}
    </VStack>
  );
}
