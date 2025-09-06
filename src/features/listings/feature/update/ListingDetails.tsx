import {
  Box,
  Heading,
  Text,
  Badge,
  Wrap,
  WrapItem,
  Stack,
  Divider,
  Flex,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import type { Listing } from "../../domain/listing.model";

type Props = {
  listing: Listing;
};

export default function ListingDetails({ listing }: Props) {
  const cardBg = useColorModeValue("white", "gray.800");
  const muted = useColorModeValue("gray.600", "gray.400");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");

  // Προαιρετικό limit εμφάνισης amenities για καλύτερο flow σε πολύ μεγάλες λίστες
  const AMENITY_LIMIT = 20;
  const hasMoreAmenities = listing.amenities.length > AMENITY_LIMIT;
  const visibleAmenities = listing.amenities.slice(0, AMENITY_LIMIT);

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={border}
      borderRadius="xl"
      boxShadow="sm"
      p={{ base: 4, md: 6 }}
    >
      <Stack gap={6}>
        {/* Header */}
        <Box>
          <Heading size="lg" noOfLines={2} lineHeight={1.2}>
            {listing.name}
          </Heading>
          {/* <Text mt={1} color={muted} fontWeight="medium" noOfLines={1}>
            {listing.location.city}, {listing.location.country}
          </Text> */}
        </Box>

        <Divider color={"blackAlpha.900"} />

        {/* Description */}
        <Box>
          <Flex align="baseline" mb={2} gap={2}>
            <Heading size="md">Description</Heading>
            <Badge variant="subtle" colorScheme="gray">
              Details
            </Badge>
          </Flex>
          <Text whiteSpace="pre-line" lineHeight={1.7}>
            {listing.description}
          </Text>
        </Box>

        {/* Amenities */}
        <Box>
          <Flex align="baseline" mb={2} gap={2}>
            <Heading size="md">Amenities</Heading>
            <Badge variant="subtle" colorScheme="teal">
              {listing.amenities.length}
            </Badge>
          </Flex>

          {listing.amenities.length > 0 ? (
            <Wrap spacing={2}>
              {visibleAmenities.map((a) => (
                <WrapItem key={a}>
                  <Badge variant="subtle" colorScheme="teal" px={2} py={1} borderRadius="md">
                    {a}
                  </Badge>
                </WrapItem>
              ))}

              {hasMoreAmenities && (
                <WrapItem>
                  <Tooltip
                    hasArrow
                    label={listing.amenities.slice(AMENITY_LIMIT).join(", ")}
                    placement="top"
                    openDelay={200}
                  >
                    <Badge variant="solid" colorScheme="teal" px={2} py={1} borderRadius="md">
                      +{listing.amenities.length - AMENITY_LIMIT} more
                    </Badge>
                  </Tooltip>
                </WrapItem>
              )}
            </Wrap>
          ) : (
            <Text color={muted}>No amenities listed.</Text>
          )}
        </Box>

        {/* Προαιρετικό block rating — έτοιμο αν θελήσεις να το εμφανίσεις */}
        {/* <Box>
          <Heading size="sm" color={muted} mb={1}>
            Rating
          </Heading>
          <Text>{listing.rating} / 5</Text>
        </Box> */}
      </Stack>
    </Box>
  );
}
