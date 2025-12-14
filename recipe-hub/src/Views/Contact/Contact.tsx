import {
  VStack,
  HStack,
  Heading,
  Input,
  Text,
  Field,
  Textarea,
  Button,
  Box,
  Icon,
  Card,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form, Field as FormikField } from "formik";
import * as Yup from "yup";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Contact() {
  return (
    <VStack gap={8} width="100%" alignItems="start">
      <VStack
        alignItems="flex-start"
        justify={"flex-start"}
        gap={4}
        p={20}
        width="100%"
        bg={"gray.100"}
      >
        <Heading size={"5xl"}>Get in Touch</Heading>
        <Text color={"gray.500"}>
          Have a question, suggestion, or just want to share your cooking
          experience? We'd love to hear from you!
        </Text>
      </VStack>

      <HStack
        alignItems="flex-start"
        gap={10}
        width="100%"
        padding={20}
        justify={"space-around"}
      >
        <Card.Root
          width="40vw"
          gap={4}
          alignItems="flex-start"
          border={"1px solid rgba(0,0,0,0.1)"}
          p={10}
          borderRadius={15}
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
                        <Field.ErrorText>{form.errors.subject}</Field.ErrorText>
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
                        <Field.ErrorText>{form.errors.message}</Field.ErrorText>
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
                          I agree to receive occasional updates and newsletters
                          from RecipeHub
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
        </Card.Root>
        <VStack>
          <Card.Root p={20} borderRadius={15} w={"38vw"}>
            <VStack gap={10} alignItems="flex-start">
              <HStack>
                <Box bgColor={"black"} p={3} borderRadius={8}>
                  <FiMail size={30} color="white" />
                </Box>
                <VStack alignItems="flex-start">
                  <Text>Email us</Text>
                  <Text color={"gray.500"}>
                    Our team typically responds within 24 hours
                  </Text>
                  <Text>hello@recipehub.com</Text>
                </VStack>
              </HStack>
              <HStack>
                <Box bgColor={"black"} p={3} borderRadius={8}>
                  <FiPhone size={30} color="white" />
                </Box>
                <VStack alignItems="flex-start">
                  <Text>Call Us</Text>
                  <Text color={"gray.500"}>Mon-Fri from 9am to 6pm EST</Text>
                  <Text>+1 (555) 123-4567</Text>
                </VStack>
              </HStack>
              <HStack>
                <Box bgColor={"black"} p={3} borderRadius={8}>
                  <FiMapPin size={30} color="white" />
                </Box>
                <VStack alignItems="flex-start">
                  <Text>Visit Us</Text>
                  <Text color={"gray.500"}>
                    123 Culinary Street New York, NY 10001 United States
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Card.Root>
          <Card.Root w={"38vw"} borderRadius={15}>
            <Card.Header>
              <Text>Follow Us</Text>
            </Card.Header>
            <Card.Body>
              <HStack gap={4}>
                <IconButton aria-label="Facebook">
                  <Icon as={FaFacebookF} boxSize={6} />
                </IconButton>
                <IconButton aria-label="Twitter">
                  <Icon as={FaTwitter} boxSize={6} />
                </IconButton>
                <IconButton aria-label="Instagram">
                  <Icon as={FaInstagram} boxSize={6} />
                </IconButton>
                <IconButton aria-label="LinkedIn">
                  <Icon as={FaLinkedinIn} boxSize={6} />
                </IconButton>
              </HStack>
            </Card.Body>
          </Card.Root>
          <Card.Root
            w={"38vw"}
            borderRadius={15}
            bgColor={"black"}
            color="white"
          >
            <Card.Header>
              <Heading>Need Quick Answers?</Heading>
            </Card.Header>
            <Card.Body>
              <Text color={"gray.300"}>
                Check out our FAQ section for instant help
              </Text>
              <Button mt={4}>
                <Text>Visit FAQ</Text>
              </Button>
            </Card.Body>
          </Card.Root>
        </VStack>
      </HStack>

      <VStack gap={8} width="100%" alignItems="center" bgColor={"gray.100"}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10326.207102090975!2d-73.99380947377739!3d40.76168321039456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1spl!2spl!4v1764432284196!5m2!1spl!2spl"
          width="1200"
          height="450"
        />
      </VStack>

      <VStack gap={8} width="100%" alignItems="center" p={20}>
        <Heading size={"2xl"}>Office Hours</Heading>
        <Text color={"gray.500"}>We're here to help during these times</Text>

        <HStack>
          <Card.Root p={10} borderRadius={15} bgColor={"gray.100"} w={"20vw"}>
            <VStack alignItems="center" gap={4}>
              <Text>Monday - Friday</Text>
              <Text>9:00 AM - 6:00 PM</Text>
            </VStack>
          </Card.Root>
          <Card.Root p={10} borderRadius={15} bgColor={"gray.100"} w={"20vw"}>
            <VStack alignItems="center" gap={4}>
              <Text>Saturday</Text>
              <Text>10:00 AM - 4:00 PM</Text>
            </VStack>
          </Card.Root>
          <Card.Root p={10} borderRadius={15} bgColor={"gray.100"} w={"20vw"}>
            <VStack alignItems="center" gap={4}>
              <Text>Sunday</Text>
              <Text>Closed</Text>
            </VStack>
          </Card.Root>
          <Card.Root p={10} borderRadius={15} bgColor={"gray.100"} w={"20vw"}>
            <VStack alignItems="center" gap={4}>
              <Text>Holidays</Text>
              <Text>Closed</Text>
            </VStack>
          </Card.Root>
        </HStack>
      </VStack>
    </VStack>
  );
}
