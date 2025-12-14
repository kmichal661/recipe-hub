import { HeroHeader } from "./components/HeroHeader";
import { VStack } from "@chakra-ui/react";
import { CategoriesSection } from "./components/CategoriesSection";
import { FeaturedRecipes } from "./components/FeaturedRecipes";
import { HowItWorks } from "./components/HowItWorks";
import { NewsletterSubscribe } from "./components/NewsletterSubscribe";

export default function Home() {
  return (
    <VStack>
      <HeroHeader />
      <CategoriesSection />
      <FeaturedRecipes />
      <HowItWorks />
      <NewsletterSubscribe />
    </VStack>
  );
}
