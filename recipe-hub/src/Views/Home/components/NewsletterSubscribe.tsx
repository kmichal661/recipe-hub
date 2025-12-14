import { Heading, Text, Input, Button, VStack, HStack } from "@chakra-ui/react";
import { LuMail } from "react-icons/lu";
import { useMutation } from "@apollo/client/react";
import { CREATE_SUBSCRIBER } from "@/services/graphql";
import { useState } from "react";
import { toaster, Toaster } from "@/components/ui/toaster";

export function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [createSubscriber] = useMutation(CREATE_SUBSCRIBER);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toaster.create({ title: "Please enter a valid email", type: "error" });
      return;
    }

    createSubscriber({ variables: { input: { email } } })
      .then((res: any) => {
        if (res?.data?.createSubscriber) {
          toaster.create({
            title: "Subscribed successfully!",
            type: "success",
          });
          setEmail("");
        } else {
          toaster.create({ title: "Subscription failed", type: "error" });
          console.error("createSubscriber returned null:", res);
        }
      })
      .catch((error) => {
        console.error("Subscription error:", error);
        toaster.create({
          title: "Failed to subscribe. Please try again.",
          type: "error",
        });
      });
  };

  return (
    <VStack
      bg="black"
      width="100%"
      padding={10}
      alignItems="center"
      gap={6}
      color="white"
      mt={10}
    >
      <Heading as={LuMail} size="4xl" />
      <Heading size="3xl">Get Weekly Recipe Updates</Heading>
      <Text color="gray.200" fontSize="md" textAlign="center" maxW="600px">
        Subscribe to our newsletter and receive new recipes, cooking tips, and
        exclusive content every week.
      </Text>
      <HStack mt={5} gap={2}>
        <Input
          placeholder="Enter your email address"
          size="lg"
          w={"40vw"}
          bg="gray.800"
          //   borderColor="gray.300"
          _placeholder={{ color: "white" }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button
          size="lg"
          variant="solid"
          bg="white"
          color="black"
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </HStack>
      <Toaster />
    </VStack>
  );
}
