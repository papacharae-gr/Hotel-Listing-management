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

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  // νέα, πιο «όμορφα» χρώματα
  const bgGlass = useColorModeValue("rgba(255,255,255,0.75)", "rgba(26,32,44,0.65)");
  const border = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const hoverBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const activeScheme = "blue";

  const location = useLocation();
  const Links = [
    { label: "Home", to: "/home" },
    { label: "Create Hotel", to: "/listings/create" },
  ];
  const isActive = (to: string) => location.pathname === to;

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1000}
      // απαλό gradient + γυαλάδα
      bgGradient={useColorModeValue(
        "linear(to-r, blue.50, white)",
        "linear(to-r, gray.900, gray.800)"
      )}
    >
      <Box
        borderBottom="1px solid"
        borderColor={border}
        bg={bgGlass}
        backdropFilter="saturate(180%) blur(10px)"
        boxShadow="sm"
        transition="background 0.2s ease"
      >
        <Container maxW="container.xl">
          <Flex h={14} alignItems="center" justifyContent="space-between">
            {/* Left: Brand + mobile menu */}
            <HStack spacing={3} align="center">
              <IconButton
                size="sm"
                variant="ghost"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                display={{ base: "inline-flex", md: "none" }}
                onClick={isOpen ? onClose : onOpen}
                rounded="full"
              />
              <ChakraLink as={Link} to="/home" _hover={{ textDecoration: "none" }}>
                <Text fontWeight="bold" letterSpacing="0.2px">
                  Hotel Workspace
                </Text>
              </ChakraLink>
            </HStack>

            {/* Desktop Links */}
            <HStack spacing={2} display={{ base: "none", md: "flex" }}>
              {Links.map((l) => (
                <Button
                  key={l.label}
                  as={Link}
                  to={l.to}
                  size="sm"
                  rounded="full"
                  variant={isActive(l.to) ? "solid" : "ghost"}
                  colorScheme={isActive(l.to) ? activeScheme : undefined}
                  _hover={!isActive(l.to) ? { bg: hoverBg } : undefined}
                >
                  {l.label}
                </Button>
              ))}
              <IconButton
                aria-label="Toggle color mode"
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
                rounded="full"
                _hover={{ bg: hoverBg }}
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
                rounded="full"
                _hover={{ bg: hoverBg }}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              />
            </HStack>
          </Flex>

          {/* Mobile menu */}
          <Collapse in={isOpen} animateOpacity>
            <Box pb={3} display={{ md: "none" }}>
              <Stack as="nav" spacing={1}>
                {Links.map((l) => (
                  <Button
                    key={l.label}
                    as={Link}
                    to={l.to}
                    size="sm"
                    rounded="md"
                    justifyContent="flex-start"
                    variant={isActive(l.to) ? "solid" : "ghost"}
                    colorScheme={isActive(l.to) ? activeScheme : undefined}
                    _hover={!isActive(l.to) ? { bg: hoverBg } : undefined}
                    onClick={onClose}
                  >
                    {l.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Collapse>
        </Container>
      </Box>
    </Box>
  );
}
