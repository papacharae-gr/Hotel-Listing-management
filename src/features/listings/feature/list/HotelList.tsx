import { Heading, Text, Stack, Button, Badge, Flex, SimpleGrid, Card, CardBody, CardFooter, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
//import { FiPlus, FiMapPin } from "react-icons/fi";
import type { Listing } from '../../domain/listing.model';

interface HotelListProps {
  hotels: Listing[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function HotelList({ hotels, onDelete, isDeleting }: HotelListProps) {
  const cardBg = "white";
  const muted = "gray.600";
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6} flex="1">
      {hotels.map((hotel) => {
        const hasDescription = !!hotel.description?.trim();
        const amenityList = (hotel.amenities ?? []).filter(Boolean);
        return (
          <Card
            key={hotel.id}
            maxW="sm"
            bg={cardBg}
            borderRadius="xl"
            boxShadow="md"
            _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
            transition="all 0.15s ease"
          >
            <CardBody>
              <Stack spacing={3}>
                <Heading size="md">{hotel.name}</Heading>
                {/* {(hotel.location?.city || hotel.location?.country) && (
                  <HStack spacing={2} color={muted} fontSize="sm">
                    <Icon as={FiMapPin} />
                    <Text>
                      {hotel.location.city}
                      {hotel.location.city && hotel.location.country ? ", " : ""}
                      {hotel.location.country}
                    </Text>
                  </HStack>
                )} */}
                {hasDescription ? (
                  <Text noOfLines={3}>{hotel.description}</Text>
                ) : (
                  <Text noOfLines={2} color={muted}>
                    No description provided.
                  </Text>
                )}
                {amenityList.length > 0 && (
                  <Flex gap={2} wrap="wrap">
                    {amenityList.map((a) => (
                      <Badge key={a} colorScheme="blue" variant="subtle" borderRadius="full" px={2} py={1}>
                        {a}
                      </Badge>
                    ))}
                  </Flex>
                )}
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Flex w="100%" justify="space-between" gap={2}>
                <Button as={Link} to={`/listings/${hotel.id}`} colorScheme="cyan" variant="outline" size="sm">
                  View
                </Button>
                <Button as={Link} to={`/listings/${hotel.id}/edit`} colorScheme="blue" variant="solid" size="sm">
                  Edit
                </Button>
                <Button colorScheme="red" variant="outline" size="sm" isLoading={isDeleting} onClick={() => onDelete(hotel.id)}>
                  Delete
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
