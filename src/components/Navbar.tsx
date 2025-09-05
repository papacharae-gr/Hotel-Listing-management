
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Link as ChakraLink,
  useColorMode,
  useColorModeValue,
  Collapse,
  Container,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";

function useCurrentListingId() {
  const { pathname } = useLocation();
  // Προσπαθεί να πιάσει /listings/:id ή /listings/:id/edit
  const m = pathname.match(/\/listings\/([^/]+)/);
  return m?.[1] ?? "listing-123";
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const location = useLocation();
  const id = useCurrentListingId();

  const Links = [
    { label: "Home", to: "/home" },
    { label: "View", to: `/listings/${id}` },
    { label: "Edit", to: `/listings/${id}/edit` },
  ];

  return (
    <Box
      borderBottom="1px solid"
      borderColor={border}
      bg={bg}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW="container.xl">
        <Flex h={14} alignItems="center" justifyContent="space-between">
          {/* Left: Brand + mobile menu button */}
          <HStack spacing={3} align="center">
            <IconButton
              size="sm"
              variant="ghost"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              display={{ base: "inline-flex", md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
              <Text fontWeight="bold">Hotel Workspace</Text>
            </ChakraLink>
          </HStack>

          {/* Desktop Links */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <Button
                  key={l.to}
                  as={Link}
                  to={l.to}
                  variant={isActive ? "solid" : "ghost"}
                  colorScheme={isActive ? "blue" : undefined}
                  size="sm"
                >
                  {l.label}
                </Button>
              );
            })}
            <IconButton
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />
          </HStack>

          {/* Mobile right-side: color mode */}
          <HStack spacing={2} display={{ base: "flex", md: "none" }}>
            <IconButton
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />
          </HStack>
        </Flex>

        {/* Mobile menu */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={3} display={{ md: "none" }}>
            <Stack as="nav" spacing={1}>
              {Links.map((l) => {
                const isActive = location.pathname === l.to;
                return (
                  <Button
                    key={l.to}
                    as={Link}
                    to={l.to}
                    variant={isActive ? "solid" : "ghost"}
                    colorScheme={isActive ? "blue" : undefined}
                    justifyContent="flex-start"
                    onClick={onClose}
                    size="sm"
                  >
                    {l.label}
                  </Button>
                );
              })}
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
}
