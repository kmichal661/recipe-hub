import {
  Button,
  HStack,
  Text,
  Input,
  InputGroup,
  Tabs,
  Dialog,
  Portal,
  CloseButton,
  VStack,
  Field as FieldComponent,
  Avatar,
  Menu,
  IconButton,
  Drawer,
  Box,
  Stack,
} from "@chakra-ui/react";
import { PiForkKnifeFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { LOGIN, REGISTER } from "@/services/graphql";
import { toaster } from "@/components/ui/toaster";

export function Navbar() {
  const [value, setValue] = useState<string | null>("home");
  const location = useLocation();
  const [authMode, setAuthMode] = useState<"signIn" | "register">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [registerMutation, { loading: registering }] = useMutation(REGISTER);
  const [loginMutation, { loading: loggingIn }] = useMutation(LOGIN);

  const handleRegister = async () => {
    if (!email || !password) {
      toaster.create({ title: "Email and password required", type: "error" });
      return;
    }
    try {
      const res = await registerMutation({
        variables: { input: { email, password, firstName, lastName } },
      });
      const payload = (res as any)?.data?.register;
      if (payload?.token) {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("user", JSON.stringify(payload.user));
        setCurrentUser(payload.user);
        toaster.create({ title: "Registered and signed in", type: "success" });
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setAuthMode("signIn");
      } else {
        toaster.create({ title: "Registration failed", type: "error" });
      }
    } catch (err) {
      console.error(err);
      toaster.create({ title: "Registration error", type: "error" });
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toaster.create({ title: "Email and password required", type: "error" });
      return;
    }
    try {
      const res = await loginMutation({ variables: { email, password } });
      const payload = (res as any)?.data?.login;
      if (payload?.token) {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("user", JSON.stringify(payload.user));
        setCurrentUser(payload.user);
        toaster.create({ title: "Signed in", type: "success" });
        setEmail("");
        setPassword("");
      } else {
        toaster.create({ title: "Login failed", type: "error" });
      }
    } catch (err) {
      console.error(err);
      toaster.create({ title: "Login error", type: "error" });
    }
  };

  useEffect(() => {
    const pathname = location.pathname || "/";
    const mapPathToTab = (path: string) => {
      if (path === "/" || path === "") return "home";
      if (path.startsWith("/recipes")) return "recipes";
      if (path.startsWith("/about")) return "about";
      if (path.startsWith("/contact")) return "contact";
      return null;
    };

    const tab = mapPathToTab(pathname);
    setValue(tab);
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    if (token && userJson) {
      try {
        setCurrentUser(JSON.parse(userJson));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    toaster.create({ title: "Signed out", type: "info" });
  };

  return (
    <HStack justifyContent="space-between" padding={4}>
      <HStack>
        <PiForkKnifeFill size={40} /> <Text fontSize={20}>RecipeHub</Text>
      </HStack>

      {/* Desktop Tabs - hidden on small screens */}
      <HStack gap={10} display={{ base: "none", md: "flex" }}>
        <Tabs.Root value={value} onValueChange={(val: any) => setValue(val)}>
          <Tabs.List>
            <NavLink to="/">
              <Tabs.Trigger value="home">Home</Tabs.Trigger>
            </NavLink>

            <NavLink to="/recipes">
              <Tabs.Trigger value="recipes">Recipes</Tabs.Trigger>
            </NavLink>

            <NavLink to="/about">
              <Tabs.Trigger value="about">About</Tabs.Trigger>
            </NavLink>

            <NavLink to="/contact">
              <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
            </NavLink>
          </Tabs.List>
        </Tabs.Root>
      </HStack>

      <HStack>
        {/* Search - hidden on small screens */}
        <Box display={{ base: "none", md: "block" }}>
          <InputGroup endElement={<IoIosSearch />}>
            <Input placeholder="Search recipes" />
          </InputGroup>
        </Box>

        {/* Desktop auth / avatar - hidden on small screens */}
        <Box display={{ base: "none", md: "block" }}>
          {currentUser ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="ghost">
                  <Avatar.Root size="sm">
                    <Avatar.Fallback>
                      {currentUser.firstName
                        ? currentUser.firstName.charAt(0).toUpperCase() +
                          "" +
                          currentUser.lastName.charAt(0).toUpperCase()
                        : currentUser.email.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                    {currentUser?.avatar ? (
                      <Avatar.Image src={currentUser.avatar} />
                    ) : null}
                  </Avatar.Root>
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item disabled value={currentUser.firstName}>
                      {currentUser.firstName + " " + currentUser.lastName ||
                        currentUser.email}
                    </Menu.Item>
                    <Menu.Item value="logout" onSelect={handleLogout}>
                      Logout
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="solid" size="sm">
                  Sign In
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Sign In</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <VStack gap={4} align="stretch">
                        {authMode === "signIn" ? (
                          <>
                            <FieldComponent.Root>
                              <FieldComponent.Label>
                                Email <FieldComponent.RequiredIndicator />
                              </FieldComponent.Label>
                              <Input
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </FieldComponent.Root>
                            <FieldComponent.Root>
                              <FieldComponent.Label>
                                Password <FieldComponent.RequiredIndicator />
                              </FieldComponent.Label>
                              <Input
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </FieldComponent.Root>
                          </>
                        ) : (
                          <>
                            <FieldComponent.Root>
                              <FieldComponent.Label>
                                Email <FieldComponent.RequiredIndicator />
                              </FieldComponent.Label>
                              <Input
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </FieldComponent.Root>
                            <FieldComponent.Root>
                              <FieldComponent.Label>
                                First Name <FieldComponent.RequiredIndicator />
                              </FieldComponent.Label>
                              <Input
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </FieldComponent.Root>
                            <FieldComponent.Root>
                              <FieldComponent.Label>
                                Last Name <FieldComponent.RequiredIndicator />
                              </FieldComponent.Label>
                              <Input
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </FieldComponent.Root>
                            <FieldComponent.Root>
                              <FieldComponent.Label>
                                Password <FieldComponent.RequiredIndicator />
                              </FieldComponent.Label>
                              <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </FieldComponent.Root>
                            <FieldComponent.Root>
                              <FieldComponent.Label>
                                Retype Password{" "}
                                <FieldComponent.RequiredIndicator />
                              </FieldComponent.Label>
                              <Input
                                placeholder="Retype password"
                                type="password"
                              />
                            </FieldComponent.Root>
                          </>
                        )}

                        <Text fontSize="sm" color="gray.600">
                          {authMode === "signIn" ? (
                            <>
                              Don't have an account?{" "}
                              <Button
                                variant="ghost"
                                onClick={() => setAuthMode("register")}
                              >
                                Please register
                              </Button>
                            </>
                          ) : (
                            <>
                              Already have an account?{" "}
                              <Button
                                variant="ghost"
                                onClick={() => setAuthMode("signIn")}
                              >
                                Sign in
                              </Button>
                            </>
                          )}
                        </Text>
                      </VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.ActionTrigger>
                      {authMode === "signIn" ? (
                        <Button onClick={handleLogin} loading={loggingIn}>
                          Sign In
                        </Button>
                      ) : (
                        <Button onClick={handleRegister} loading={registering}>
                          Register
                        </Button>
                      )}
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )}
        </Box>

        {/* Mobile hamburger - visible on small screens */}
        <Box display={{ base: "block", md: "none" }}>
          <Drawer.Root>
            <Drawer.Trigger asChild>
              <IconButton variant={"ghost"} aria-label="Open menu">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="currentColor"
                    d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"
                  />
                </svg>
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Menu</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Stack gap={4}>
                      <NavLink to="/">
                        <Button variant="ghost">Home</Button>
                      </NavLink>
                      <NavLink to="/recipes">
                        <Button variant="ghost">Recipes</Button>
                      </NavLink>
                      <NavLink to="/about">
                        <Button variant="ghost">About</Button>
                      </NavLink>
                      <NavLink to="/contact">
                        <Button variant="ghost">Contact</Button>
                      </NavLink>

                      <InputGroup>
                        <Input placeholder="Search recipes" />
                      </InputGroup>

                      {currentUser ? (
                        <>
                          <Text>
                            {currentUser.firstName +
                              " " +
                              currentUser.lastName || currentUser.email}
                          </Text>
                          <Button
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Dialog.Root>
                            <Dialog.Trigger asChild>
                              <Button>Sign In / Register</Button>
                            </Dialog.Trigger>
                            <Portal>
                              <Dialog.Backdrop />
                              <Dialog.Positioner>
                                <Dialog.Content>
                                  <Dialog.Header>
                                    <Dialog.Title>Sign In</Dialog.Title>
                                  </Dialog.Header>
                                  <Dialog.Body>
                                    <VStack gap={4} align="stretch">
                                      {authMode === "signIn" ? (
                                        <>
                                          <FieldComponent.Root>
                                            <FieldComponent.Label>
                                              Email{" "}
                                              <FieldComponent.RequiredIndicator />
                                            </FieldComponent.Label>
                                            <Input
                                              placeholder="Enter your email"
                                              value={email}
                                              onChange={(e) =>
                                                setEmail(e.target.value)
                                              }
                                            />
                                          </FieldComponent.Root>
                                          <FieldComponent.Root>
                                            <FieldComponent.Label>
                                              Password{" "}
                                              <FieldComponent.RequiredIndicator />
                                            </FieldComponent.Label>
                                            <Input
                                              placeholder="Enter your password"
                                              type="password"
                                              value={password}
                                              onChange={(e) =>
                                                setPassword(e.target.value)
                                              }
                                            />
                                          </FieldComponent.Root>
                                        </>
                                      ) : (
                                        <>
                                          <FieldComponent.Root>
                                            <FieldComponent.Label>
                                              Email{" "}
                                              <FieldComponent.RequiredIndicator />
                                            </FieldComponent.Label>
                                            <Input
                                              placeholder="Enter your email"
                                              value={email}
                                              onChange={(e) =>
                                                setEmail(e.target.value)
                                              }
                                            />
                                          </FieldComponent.Root>
                                          <FieldComponent.Root>
                                            <FieldComponent.Label>
                                              First Name{" "}
                                              <FieldComponent.RequiredIndicator />
                                            </FieldComponent.Label>
                                            <Input
                                              placeholder="First name"
                                              value={firstName}
                                              onChange={(e) =>
                                                setFirstName(e.target.value)
                                              }
                                            />
                                          </FieldComponent.Root>
                                          <FieldComponent.Root>
                                            <FieldComponent.Label>
                                              Last Name{" "}
                                              <FieldComponent.RequiredIndicator />
                                            </FieldComponent.Label>
                                            <Input
                                              placeholder="Last name"
                                              value={lastName}
                                              onChange={(e) =>
                                                setLastName(e.target.value)
                                              }
                                            />
                                          </FieldComponent.Root>
                                          <FieldComponent.Root>
                                            <FieldComponent.Label>
                                              Password{" "}
                                              <FieldComponent.RequiredIndicator />
                                            </FieldComponent.Label>
                                            <Input
                                              placeholder="Password"
                                              type="password"
                                              value={password}
                                              onChange={(e) =>
                                                setPassword(e.target.value)
                                              }
                                            />
                                          </FieldComponent.Root>
                                          <FieldComponent.Root>
                                            <FieldComponent.Label>
                                              Retype Password{" "}
                                              <FieldComponent.RequiredIndicator />
                                            </FieldComponent.Label>
                                            <Input
                                              placeholder="Retype password"
                                              type="password"
                                            />
                                          </FieldComponent.Root>
                                        </>
                                      )}

                                      <Text fontSize="sm" color="gray.600">
                                        {authMode === "signIn" ? (
                                          <>
                                            Don't have an account?{" "}
                                            <Button
                                              variant="ghost"
                                              onClick={() =>
                                                setAuthMode("register")
                                              }
                                            >
                                              Please register
                                            </Button>
                                          </>
                                        ) : (
                                          <>
                                            Already have an account?{" "}
                                            <Button
                                              variant="ghost"
                                              onClick={() =>
                                                setAuthMode("signIn")
                                              }
                                            >
                                              Sign in
                                            </Button>
                                          </>
                                        )}
                                      </Text>
                                    </VStack>
                                  </Dialog.Body>
                                  <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </Dialog.ActionTrigger>
                                    {authMode === "signIn" ? (
                                      <Button
                                        onClick={handleLogin}
                                        loading={loggingIn}
                                      >
                                        Sign In
                                      </Button>
                                    ) : (
                                      <Button
                                        onClick={handleRegister}
                                        loading={registering}
                                      >
                                        Register
                                      </Button>
                                    )}
                                  </Dialog.Footer>
                                  <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                  </Dialog.CloseTrigger>
                                </Dialog.Content>
                              </Dialog.Positioner>
                            </Portal>
                          </Dialog.Root>
                        </>
                      )}
                    </Stack>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Box>
      </HStack>
    </HStack>
  );
}
