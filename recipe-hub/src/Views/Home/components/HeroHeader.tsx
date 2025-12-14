import {
  HStack,
  VStack,
  Image,
  Box,
  Button,
  Tag,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export function HeroHeader() {
  return (
    <Stack
      bg="gray.100"
      width="100%"
      p={{ base: 6, md: 10 }}
      direction={{ base: "column", md: "row" }}
      gap={{ base: 6, md: 0 }}
      align={{ base: "stretch", md: "center" }}
    >
      <VStack
        alignItems="flex-start"
        gap={4}
        padding={{ base: 6, md: 8 }}
        w={{ base: "100%", md: "40vw" }}
      >
        <Tag.Root size={"xl"} variant={"solid"} w={{ base: "65%", md: "auto" }}>
          <Tag.Label>
            <HStack>
              <LuStar /> <Text>Featured Recipe Collection</Text>
            </HStack>
          </Tag.Label>
        </Tag.Root>

        <Heading fontSize={{ base: "2xl", md: "4xl" }} maxW={{ md: "40ch" }}>
          Discover Delicious Recipes Daily
        </Heading>

        <Text color={"gray.500"} fontSize={{ base: "md", md: "xl" }}>
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
      <VStack
        flex={1}
        alignItems="center"
        display={{ base: "none", md: "flex" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVjaXBlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="Delicious Food"
          borderRadius={10}
          boxShadow="lg"
          maxHeight="400px"
          objectFit="cover"
        />
      </VStack>
    </Stack>
  );
}
