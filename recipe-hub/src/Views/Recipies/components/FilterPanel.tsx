import {
  Select,
  HStack,
  Button,
  createListCollection,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export function FilterPanel() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cookTime, setCookTime] = useState("");

  const categories = [
    { value: "", label: "All Categories" },
    { value: "italian", label: "Italian" },
    { value: "chinese", label: "Chinese" },
    { value: "mexican", label: "Mexican" },
    { value: "indian", label: "Indian" },
  ];

  const difficulties = [
    { value: "", label: "All levels" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
    { value: "expert", label: "Expert" },
  ];

  const cookTimes = [
    { value: "", label: "Any duration" },
    { value: "under_15", label: "Under 15 min" },
    { value: "under_30", label: "Under 30 min" },
    { value: "under_60", label: "Under 60 min" },
    { value: "over_60", label: "Over 60 min" },
  ];
  const categoriesCollection = createListCollection({
    items: categories.map((c) => ({ label: c.label, value: c.value })),
  });

  const difficultiesCollection = createListCollection({
    items: difficulties.map((d) => ({ label: d.label, value: d.value })),
  });

  const cookTimesCollection = createListCollection({
    items: cookTimes.map((t) => ({ label: t.label, value: t.value })),
  });

  function applyFilters() {
    console.log("Applying filters:", { category, difficulty, cookTime });
  }

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap={4}
      width="100%"
      alignItems={{ base: "stretch", md: "center" }}
      mt={10}
    >
      <Box w={{ base: "100%", md: "auto" }} flex={{ base: "none", md: 1 }}>
        <Select.Root
          collection={categoriesCollection}
          onValueChange={(v: any) => setCategory(v)}
        >
          <Select.HiddenSelect />
          <Select.Label>Category</Select.Label>

          <Select.Control>
            <Select.Trigger w="100%">
              <Select.ValueText placeholder="All Categories" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {categories.map((item) => (
                <Select.Item key={item.value} item={item as any}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Box>

      <Box w={{ base: "100%", md: "auto" }} flex={{ base: "none", md: 1 }}>
        <Select.Root
          collection={difficultiesCollection}
          onValueChange={(v: any) => setDifficulty(v)}
        >
          <Select.HiddenSelect />
          <Select.Label>Difficulty</Select.Label>

          <Select.Control>
            <Select.Trigger w="100%">
              <Select.ValueText placeholder="All levels" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {difficulties.map((item) => (
                <Select.Item key={item.value} item={item as any}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Box>

      <Box w={{ base: "100%", md: "auto" }} flex={{ base: "none", md: 1 }}>
        <Select.Root
          collection={cookTimesCollection}
          onValueChange={(v: any) => setCookTime(v)}
        >
          <Select.HiddenSelect />
          <Select.Label>Cook Time</Select.Label>

          <Select.Control>
            <Select.Trigger w="100%">
              <Select.ValueText placeholder="Any duration" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {cookTimes.map((item) => (
                <Select.Item key={item.value} item={item as any}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Box>

      <Box
        w={{ base: "100%", md: "auto" }}
        flex={{ md: 0 }}
        display="flex"
        justifyContent={{ base: "center", md: "flex-end" }}
      >
        <Button
          colorScheme="teal"
          onClick={applyFilters}
          mt={{ base: 2, md: 6 }}
          w={{ base: "100%", md: "auto" }}
        >
          Apply Filter
        </Button>
      </Box>
    </Stack>
  );
}
