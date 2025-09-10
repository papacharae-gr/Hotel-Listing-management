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
import type { Hotel } from "../../domain/hotel.model";

type Props = {
  hotel: Hotel;
};

export default function HotelDetails({ hotel }: Props) {
  const cardBg = useColorModeValue("white", "gray.800");
  const muted = useColorModeValue("gray.600", "gray.400");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");

  // Προαιρετικό limit εμφάνισης amenities για καλύτερο flow σε πολύ μεγάλες λίστες
  const AMENITY_LIMIT = 20;
  const hasMoreAmenities = hotel.amenities.length > AMENITY_LIMIT;
  const visibleAmenities = hotel.amenities.slice(0, AMENITY_LIMIT);

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
            {hotel.name}
          </Heading>
          {/* <Text mt={1} color={muted} fontWeight="medium" noOfLines={1}>
            {hotel.location.city}, {hotel.location.country}
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
            {hotel.description}
          </Text>
        </Box>

        {/* Amenities */}
        <Box>
          <Flex align="baseline" mb={2} gap={2}>
            <Heading size="md">Amenities</Heading>
            <Badge variant="subtle" colorScheme="teal">
              {hotel.amenities.length}
            </Badge>
          </Flex>

          {hotel.amenities.length > 0 ? (
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
                    label={hotel.amenities.slice(AMENITY_LIMIT).join(", ")}
                    placement="top"
                    openDelay={200}
                  >
                    <Badge variant="solid" colorScheme="teal" px={2} py={1} borderRadius="md">
                      +{hotel.amenities.length - AMENITY_LIMIT} more
                    </Badge>
                  </Tooltip>
                </WrapItem>
              )}
            </Wrap>
          ) : (
            <Text color={muted}>No amenities listed.</Text>
          )}
        </Box>

        {/* Προαιρετικό block rating */}
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
