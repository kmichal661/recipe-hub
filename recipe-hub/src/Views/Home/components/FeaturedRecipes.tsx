import {
  Heading,
  VStack,
  HStack,
  Text,
  Stack,
  Button,
  Card,
  Image,
  Tag,
  Avatar,
} from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";
import { NavLink } from "react-router-dom";

interface IRecipieCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
  chefName: string;
  rating: number;
}

function RecipieCard({
  title,
  description,
  imageUrl,
  tags,
  chefName,
  rating,
}: IRecipieCardProps) {
  return (
    <Card.Root w="400px" overflow="hidden">
      <Image
        src={
          imageUrl ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjaXBlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        }
        alt={title}
        width="100%"
        height="250px"
        objectFit="cover"
      />
      <Card.Body gap="2">
        <HStack>
          {tags &&
            tags.map((tag) => (
              <Tag.Root variant="subtle" colorScheme="teal" key={tag}>
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            ))}
        </HStack>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <hr />
      <Card.Footer gap="2" mt={5}>
        <HStack justifyContent="space-between" width="100%">
          <HStack>
            <Avatar.Root>
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="" />
            </Avatar.Root>
            <Text>{chefName}</Text>
          </HStack>
          <Text>
            <HStack>
              <LuStar /> {rating}
            </HStack>
          </Text>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
}

export function FeaturedRecipes() {
  return (
    <VStack
      width="100%"
      alignItems="start"
      padding={20}
      bgColor={"gray.100"}
      mt={20}
    >
      <HStack justifyContent="space-between" width="100%">
        <Stack>
          <Heading size={"4xl"} mt={10} mb={1}>
            Featured Recipes
          </Heading>
          <Text color={"gray.500"}>Our most popular recipes this week</Text>
        </Stack>
        <NavLink to="/recipes">
          <Button variant={"outline"} mt={10}>
            See All Recipes
          </Button>
        </NavLink>
      </HStack>

      <HStack
        justify={"space-around"}
        align={"center"}
        width="100%"
        mt={10}
        gap={10}
      >
        <RecipieCard
          title="Creamy Tuscan Chicken"
          description="A rich and creamy Italian-inspired chicken dish with sun-dried tomatoes and spinach."
          imageUrl="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVjaXBlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          tags={["Italian", "30 mins"]}
          chefName="Chef Mario"
          rating={4.8}
        />
        <RecipieCard
          title="Vegan Buddha Bowl"
          description="A colorful and nutritious bowl packed with quinoa, roasted veggies, and a tangy tahini dressing."
          imageUrl="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjaXBlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
          tags={["Vegan", "Gluten-Free"]}
          chefName="Chef Anna"
          rating={4.9}
        />
        <RecipieCard
          title="Chocolate Lava Cake"
          description="A decadent dessert with a gooey molten chocolate center, perfect for chocolate lovers."
          imageUrl="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          tags={["Dessert", "Quick"]}
          chefName="Chef Lisa"
          rating={4.7}
        />
      </HStack>
    </VStack>
  );
}
