import { Heading, Text, Box, Card, HStack, VStack } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
  LuPizza,
  LuSandwich,
  LuSoup,
  LuCitrus,
  LuDessert,
  LuVegan,
} from "react-icons/lu";

export function CategoryCard({
  title,
  icon: Icon,
}: {
  title: string;
  icon: IconType;
}) {
  return (
    <Card.Root padding={6} boxShadow="sm">
      <VStack>
        <Box bgColor={"black"} p={3} borderRadius={8}>
          <Icon size={40} color="white" />
        </Box>
        <Text>{title}</Text>
      </VStack>
    </Card.Root>
  );
}

export function CategoriesSection() {
  return (
    <VStack width="100%" padding={10} alignItems="center" gap={6}>
      <Heading size="3xl">Browse by Category</Heading>
      <Text color="gray.500" fontSize="xl">
        Find recipes by your favorite cuisine or meal type
      </Text>
      <HStack width="80%" justifyContent="space-around" wrap="wrap" mt={10}>
        <CategoryCard title="Italian" icon={LuPizza} />
        <CategoryCard title="American" icon={LuSandwich} />
        <CategoryCard title="Asian" icon={LuSoup} />
        <CategoryCard title="Mexican" icon={LuCitrus} />
        <CategoryCard title="Desserts" icon={LuDessert} />
        <CategoryCard title="Vegan" icon={LuVegan} />
      </HStack>
    </VStack>
  );
}
