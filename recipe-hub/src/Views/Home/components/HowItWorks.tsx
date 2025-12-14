import { HStack, VStack, Heading, Text, Circle } from "@chakra-ui/react";

export function HowItWorks() {
  return (
    <VStack width="100%" padding={10} alignItems="center" gap={6}>
      <Heading size="3xl">How It Works</Heading>
      <Text color="gray.500" fontSize="md" textAlign="center" maxW="800px">
        Get cooking in three simple steps
      </Text>

      <HStack gap={20} mt={10}>
        <VStack alignItems="center" gap={4}>
          <Circle size="60px" bg="black" color="white">
            1
          </Circle>
          <Heading size="md">Browse & Choose</Heading>
          <Text color="gray.500" fontSize="sm" textAlign="center" maxW="200px">
            Explore our extensive collection of recipes and find the perfect
            dish for any occasion.
          </Text>
        </VStack>
        <VStack alignItems="center" gap={4}>
          <Circle size="60px" bg="black" color="white">
            2
          </Circle>
          <Heading size="md">Follow Steps</Heading>
          <Text color="gray.500" fontSize="sm" textAlign="center" maxW="200px">
            Get detailed instructions with photos and videos to guide you
            through each step.
          </Text>
        </VStack>
        <VStack alignItems="center" gap={4}>
          <Circle size="60px" bg="black" color="white">
            3
          </Circle>
          <Heading size="md">Cook & Enjoy</Heading>
          <Text color="gray.500" fontSize="sm" textAlign="center" maxW="200px">
            Create delicious meals and share your culinary creations with our
            community.
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
