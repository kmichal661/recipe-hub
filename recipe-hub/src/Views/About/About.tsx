import {
  VStack,
  HStack,
  Stack,
  Wrap,
  WrapItem,
  Heading,
  Text,
  Image,
  Box,
  Button,
  Avatar,
  Input,
  Field,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form, Field as FormikField } from "formik";
import * as Yup from "yup";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import AboutUs from "../../assets/AboutUs.jpg";
import TeamOne from "../../assets/TeamOne.jpg";
import TeamTwo from "../../assets/TeamTwo.jpg";
import TeamThree from "../../assets/TeamThree.jpg";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export default function About() {
  return (
    <VStack>
      <VStack
        padding={{ base: 8, md: 20 }}
        gap={8}
        align="center"
        bgColor={"gray.100"}
        w="100%"
      >
        <Heading size={{ base: "2xl", md: "4xl" }}>About RecipeHub</Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.600"
          w={{ base: "100%", md: "60vw" }}
          textAlign="center"
        >
          Discover the story behind your favorite recipe destination and meet
          the passionate team bringing delicious dishes to your kitchen.
        </Text>
      </VStack>
      <Stack
        width="100%"
        p={{ base: 6, md: 10 }}
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "stretch" }}
      >
        <VStack
          alignItems="flex-start"
          gap={4}
          w={{ base: "100%", md: "40vw" }}
        >
          <Heading size={{ base: "xl", md: "4xl" }}>Our Story</Heading>

          <Text color={"gray.500"} fontSize={{ base: "md", md: "xl" }}>
            Founded in 2020, RecipeHub started as a small blog sharing family
            recipes passed down through generations. What began as a personal
            project quickly grew into a vibrant community of food enthusiasts
            from around the world.
          </Text>
          <br />
          <Text color={"gray.500"} fontSize={{ base: "md", md: "xl" }}>
            Today, we're proud to be home to over 10,000 tested recipes, serving
            millions of home cooks who trust us to help them create memorable
            meals for their loved ones.
          </Text>

          <HStack pt={5} gap={6} mt={6}>
            <Box>
              <VStack justify={"start"} align={"start"}>
                <Text fontSize={24}>10K+</Text>
                <Text color={"gray.500"}>Recipes</Text>
              </VStack>
            </Box>
            <Box>
              <VStack justify={"start"} align={"start"}>
                <Text fontSize={24}>2M+</Text>
                <Text color={"gray.500"}>Monthly Users</Text>
              </VStack>
            </Box>
            <Box>
              <VStack justify={"start"} align={"start"}>
                <Text fontSize={24}>50+</Text>
                <Text color={"gray.500"}>Countries</Text>
              </VStack>
            </Box>
          </HStack>
        </VStack>
        <VStack flex={1} alignItems="center" mt={{ base: 6, md: 0 }}>
          <Image
            src={AboutUs}
            alt="Delicious Food"
            borderRadius={10}
            boxShadow="lg"
            maxHeight={{ base: "300px", md: "400px" }}
            objectFit="cover"
            width={{ base: "100%", md: "auto" }}
          />
        </VStack>
      </Stack>

      <VStack
        mt={10}
        align="center"
        bgColor={"gray.100"}
        w="100%"
        px={{ base: 4, md: 0 }}
      >
        <Heading
          size={{ base: "xl", md: "3xl" }}
          mb={1}
          mt={10}
          textAlign="center"
        >
          Meet Our Team
        </Heading>
        <Text
          color={"gray.500"}
          w={{ base: "100%", md: "40vw" }}
          textAlign="center"
        >
          Our passionate team of chefs, food writers, and recipe developers work
          tirelessly to bring you the best culinary content.
        </Text>
        <Wrap gap={6} justify="center" mt={6} px={4}>
          {[
            {
              name: "Sarah Johnson",
              role: "Head Chef & Founder",
              img: TeamTwo,
              bio: "15 years of culinary experience",
            },
            {
              name: "Mike Chen",
              role: "Recipe Developer",
              img: TeamThree,
              bio: "Asian cuisine specialist",
            },
            {
              name: "Emma Rodriguez",
              role: "Food Writer",
              img: TeamOne,
              bio: "Nutrition & wellness expert",
            },
          ].map((member) => (
            <WrapItem key={member.name}>
              <VStack
                align="center"
                p={{ base: 4, md: 10 }}
                gap={2}
                w={{ base: "80vw", md: "auto" }}
              >
                <Avatar.Root size={{ base: "lg", md: "2xl" }}>
                  <Avatar.Fallback name={member.name} />
                  <Avatar.Image src={member.img} />
                </Avatar.Root>
                <Text>{member.name}</Text>
                <Text color={"gray.500"}>{member.role}</Text>
                <Text textAlign="center" color={"gray.500"}>
                  {member.bio}
                </Text>
              </VStack>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>

      {/* Get in Touch section */}
      <VStack px={{ base: 4, md: 0 }} py={10} w="100%">
        <Heading
          size={{ base: "xl", md: "3xl" }}
          mb={1}
          mt={2}
          textAlign="center"
        >
          Get in Touch
        </Heading>
        <Text
          color={"gray.500"}
          w={{ base: "100%", md: "40vw" }}
          textAlign="center"
        >
          Have questions or want to collaborate? We'd love to hear from you!
        </Text>

        <Stack
          direction={{ base: "column", md: "row" }}
          gap={6}
          width="100%"
          alignItems={{ base: "center", md: "flex-start" }}
          justify={{ base: "center", md: "space-between" }}
          maxW={{ base: "100%", md: "1100px" }}
          mx={{ base: 0, md: "auto" }}
        >
          <VStack
            width={{ base: "100%", md: "48%" }}
            gap={4}
            alignItems="flex-start"
            p={{ base: 4, md: 10 }}
          >
            <Heading size="xl">Send Us a Message</Heading>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                subject: "general",
                message: "",
                consent: false,
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("First name is required"),
                lastName: Yup.string().required("Last name is required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                subject: Yup.string().required("Subject is required"),
                message: Yup.string().required("Message is required"),
              })}
              onSubmit={(values, actions) => {
                console.log("Contact form submitted:", values);
                actions.setSubmitting(false);
                actions.resetForm();
              }}
            >
              {(props) => (
                <Form style={{ width: "100%" }}>
                  <HStack gap={4} width="100%">
                    <FormikField name="firstName">
                      {({ field, form }: any) => (
                        <Field.Root>
                          <Field.Label>First Name</Field.Label>
                          <Input {...field} placeholder="First name" />
                          {form.errors.firstName && form.touched.firstName && (
                            <Field.ErrorText>
                              {form.errors.firstName}
                            </Field.ErrorText>
                          )}
                        </Field.Root>
                      )}
                    </FormikField>
                    <FormikField name="lastName">
                      {({ field, form }: any) => (
                        <Field.Root>
                          <Field.Label>Last Name</Field.Label>
                          <Input {...field} placeholder="Last name" />
                          {form.errors.lastName && form.touched.lastName && (
                            <Field.ErrorText>
                              {form.errors.lastName}
                            </Field.ErrorText>
                          )}
                        </Field.Root>
                      )}
                    </FormikField>
                  </HStack>

                  <FormikField name="email">
                    {({ field, form }: any) => (
                      <Field.Root style={{ marginTop: 16 }}>
                        <Field.Label>Email Address</Field.Label>
                        <Input {...field} placeholder="you@example.com" />
                        {form.errors.email && form.touched.email && (
                          <Field.ErrorText>{form.errors.email}</Field.ErrorText>
                        )}
                      </Field.Root>
                    )}
                  </FormikField>

                  <FormikField name="subject">
                    {({ field, form }: any) => (
                      <Field.Root style={{ marginTop: 16 }}>
                        <Field.Label>Subject</Field.Label>
                        <select
                          {...field}
                          style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            border: "1px solid rgba(0,0,0,0.1)",
                          }}
                        >
                          <option value="general">General Question</option>
                          <option value="recipe">Recipe Submission</option>
                          <option value="bug">Report a Bug</option>
                        </select>
                        {form.errors.subject && form.touched.subject && (
                          <Field.ErrorText>
                            {form.errors.subject}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    )}
                  </FormikField>

                  <FormikField name="message">
                    {({ field, form }: any) => (
                      <Field.Root style={{ marginTop: 16 }}>
                        <Field.Label>Message</Field.Label>
                        <Textarea
                          {...field}
                          placeholder="Write your message..."
                          height={200}
                        />
                        {form.errors.message && form.touched.message && (
                          <Field.ErrorText>
                            {form.errors.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    )}
                  </FormikField>

                  <FormikField name="consent" type="checkbox">
                    {({ field }: any) => (
                      <Field.Root style={{ marginTop: 12 }}>
                        <HStack alignItems="center">
                          <input
                            type="checkbox"
                            {...field}
                            style={{ width: 16, height: 16, marginRight: 8 }}
                          />
                          <Text fontSize="sm">
                            I agree to receive occasional updates and
                            newsletters from RecipeHub
                          </Text>
                        </HStack>
                      </Field.Root>
                    )}
                  </FormikField>

                  <Button
                    mt={6}
                    colorScheme="teal"
                    loading={props.isSubmitting}
                    type="submit"
                  >
                    Send Message
                  </Button>
                </Form>
              )}
            </Formik>
          </VStack>

          <VStack
            width={{ base: "100%", md: "48%" }}
            gap={4}
            alignItems={{ base: "center", md: "flex-start" }}
            color={"gray.600"}
          >
            <VStack align={{ base: "center", md: "flex-start" }}>
              <Heading color={"black"} size="xl">
                Contact Information
              </Heading>
              <Text>
                <HStack>
                  <LuMail /> hello@recipehub.com
                </HStack>
              </Text>
              <Text>
                <HStack>
                  <LuPhone /> +1 (555) 123-4567
                </HStack>
              </Text>
              <Text>
                <HStack>
                  <LuMapPin /> 123 Culinary Street, Food City, FC 12345
                </HStack>
              </Text>
            </VStack>
            <VStack align={{ base: "center", md: "flex-start" }} mt={10}>
              <Heading color={"black"} size="xl">
                {" "}
                Follow Us
              </Heading>
              <HStack>
                <IconButton
                  aria-label="Facebook"
                  variant="ghost"
                  size="lg"
                  _hover={{ bg: "gray.200" }}
                >
                  <FaFacebookF />
                </IconButton>
                <IconButton
                  aria-label="Twitter"
                  variant="ghost"
                  size="lg"
                  _hover={{ bg: "gray.200" }}
                >
                  <FaTwitter />
                </IconButton>
                <IconButton
                  aria-label="Instagram"
                  variant="ghost"
                  size="lg"
                  _hover={{ bg: "gray.200" }}
                >
                  <FaInstagram />
                </IconButton>
                <IconButton
                  aria-label="LinkedIn"
                  variant="ghost"
                  size="lg"
                  _hover={{ bg: "gray.200" }}
                >
                  <FaLinkedinIn />
                </IconButton>
              </HStack>
            </VStack>

            <VStack
              w={{ base: "100%", md: "30vw" }}
              align={{ base: "center", md: "flex-start" }}
              mt={10}
            >
              <Heading>Office Hours</Heading>
              <HStack
                justify={{ base: "center", md: "space-between" }}
                w="100%"
              >
                <Text>Monday - Friday:</Text>
                <Text>9:00 AM - 6:00 PM</Text>
              </HStack>
              <HStack
                justify={{ base: "center", md: "space-between" }}
                w="100%"
              >
                <Text>Saturday:</Text>
                <Text>10:00 AM - 4:00 PM</Text>
              </HStack>
              <HStack
                justify={{ base: "center", md: "space-between" }}
                w="100%"
              >
                <Text>Sunday:</Text>
                <Text>Closed</Text>
              </HStack>
            </VStack>
          </VStack>
        </Stack>
      </VStack>
    </VStack>
  );
}
