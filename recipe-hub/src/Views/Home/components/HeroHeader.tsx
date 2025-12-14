import {
  HStack,
  VStack,
  Image,
  Box,
  Button,
  Tag,
  Text,
  Heading,
} from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export function HeroHeader() {
  return (
    <HStack bg="gray.100" width="100%" p={10}>
      <VStack alignItems="flex-start" gap={4} padding={8} w={"40vw"}>
        <Tag.Root size={"xl"} variant={"solid"}>
          <Tag.Label>
            <HStack>
              <LuStar /> <Text>Featured Recipe Collection</Text>
            </HStack>
          </Tag.Label>
        </Tag.Root>

        <Heading size="7xl">Discover Delicious Recipes Daily</Heading>

        <Text color={"gray.500"} fontSize={"xl"}>
          Explore thousands of tested recipes from around the world. Cook like a
          chef at home with our easy-to-follow guides.
        </Text>

        <HStack pt={10}>
          <NavLink to="/recipes">
            <Button size={"lg"}>Explore Recipes</Button>
          </NavLink>
          <Button size={"lg"} variant="outline">
            Watch Tutorial
          </Button>
        </HStack>

        <HStack pt={5} gap={10} mt={10}>
          <Box>
            <VStack justify={"start"} align={"start"}>
              <Text fontSize={30}>10K+</Text>
              <Text color={"gray.500"}>Recipes</Text>
            </VStack>
          </Box>
          <Box>
            <VStack justify={"start"} align={"start"}>
              <Text fontSize={30}>50K+</Text>
              <Text color={"gray.500"}>Users</Text>
            </VStack>
          </Box>
          <Box>
            <VStack justify={"start"} align={"start"}>
              <Text fontSize={30}>4.9</Text>
              <Text color={"gray.500"}>Rating</Text>
            </VStack>
          </Box>
        </HStack>
      </VStack>
      <VStack flex={1} alignItems="center">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVjaXBlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="Delicious Food"
          borderRadius={10}
          boxShadow="lg"
          maxHeight="400px"
          objectFit="cover"
        />
      </VStack>
    </HStack>
  );
}
