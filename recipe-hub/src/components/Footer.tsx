import {
  HStack,
  VStack,
  Text,
  Box,
  Link,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <Box bg="gray.50" width="100%" paddingY={10} paddingX={6} mt={10}>
      <Box maxW="1200px" margin="0 auto">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <VStack alignItems="flex-start" gap={4}>
            <HStack>
              <PiForkKnifeFill size={30} />
              <Text fontSize="lg" fontWeight="bold">
                RecipeHub
              </Text>
            </HStack>
            <Text color="gray.600">
              Your ultimate destination for discovering and sharing amazing
              recipes from around the world.
            </Text>

            <HStack>
              <IconButton aria-label="facebook" size="sm" variant={"outline"}>
                <FaFacebookF />
              </IconButton>
              <IconButton aria-label="instagram" variant={"outline"} size="sm">
                <FaInstagram />
              </IconButton>
              <IconButton aria-label="twitter" variant={"outline"} size="sm">
                <FaTwitter />
              </IconButton>
              <IconButton aria-label="youtube" variant={"outline"} size="sm">
                <FaYoutube />
              </IconButton>
            </HStack>
          </VStack>

          {/* Column 2: Recipes links */}
          <VStack alignItems="flex-start" gap={2}>
            <Text fontWeight="semibold">Recipes</Text>
            <Link>Breakfast</Link>
            <Link>Lunch</Link>
            <Link>Dinner</Link>
            <Link>Deserts</Link>
          </VStack>

          {/* Column 3: Company links */}
          <VStack alignItems="flex-start" gap={2}>
            <Text fontWeight="semibold">Company</Text>
            <Link>About Us</Link>
            <Link>Careers</Link>
            <Link>Blog</Link>
            <Link>Contact</Link>
          </VStack>
        </SimpleGrid>

        <HStack justifyContent="space-between" marginTop={8}>
          <Text fontSize="sm" color="gray.500">
            © 2024 RecipeHub. All rights reserved.
          </Text>
          <HStack gap={6}>
            <Link fontSize="sm" color="gray.500">
              Privacy Policy
            </Link>
            <Link fontSize="sm" color="gray.500">
              Terms of Service
            </Link>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}
