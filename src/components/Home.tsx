/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetListingsQuery } from "../features/listings/data-access/useListingQuery";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Badge,
  Flex,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Skeleton,
  SkeletonText,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListing } from "../features/listings/data-access/gateway/listing.gateway";
import { FiPlus, FiMapPin } from "react-icons/fi";

const Home: React.FC = () => {
  const { data, isLoading, error } = useGetListingsQuery();

  const cardBg = useColorModeValue("white", "gray.800");
  const muted = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  if (isLoading) {
    return (
      <Box p={8}>
        <Flex align="center" justify="space-between" mb={6}>
          <Heading>Hotels</Heading>
          <Button leftIcon={<FiPlus />} colorScheme="blue" as={Link} to="/listings/new">
            Create Hotel
          </Button>
        </Flex>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} maxW="sm" bg={cardBg} borderRadius="lg" boxShadow="md" p={4}>
              <Skeleton height="16" borderRadius="md" />
              <CardBody px={0}>
                <Skeleton height="24px" mt={4} mb={2} />
                <SkeletonText noOfLines={3} spacing="3" />
                <HStack mt={3} spacing={2}>
                  <Skeleton height="20px" width="60px" borderRadius="full" />
                  <Skeleton height="20px" width="80px" borderRadius="full" />
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (error)
    return (
      <Box p={8}>
        <Text color="red.500">Error: {(error as any).message}</Text>
      </Box>
    );

  const navigate = useNavigate();
  return (
    <Box p={8} minH="80vh" display="flex" flexDirection="column">
      <Flex align="center" justify="space-between" mb={6}>
        <Heading>Hotels</Heading>
      </Flex>

      {!data || data.length === 0 ? (
        <Box
          border="1px dashed"
          borderColor={borderColor}
          borderRadius="lg"
          p={10}
          textAlign="center"
          flex="1"
        >
          <Heading size="md" mb={2}>
            No hotels yet
          </Heading>
          <Text mb={6} color={muted}>
            Get started by creating your first hotel listing.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6} flex="1">
          {data.map((hotel) => {
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

                    {/* Optional location row (only if you have these fields; otherwise it stays hidden) */}
                    {(hotel as any).city || (hotel as any).country ? (
                      <HStack spacing={2} color={muted} fontSize="sm">
                        <Icon as={FiMapPin} />
                        <Text>
                          {((hotel as any).city ?? "").toString()}
                          {((hotel as any).city && (hotel as any).country) ? ", " : ""}
                          {((hotel as any).country ?? "").toString()}
                        </Text>
                      </HStack>
                    ) : null}

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
                    <Button
                      as={Link}
                      to={`/listings/${hotel.id}`}
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                    >
                      View
                    </Button>
                    <Button
                      as={Link}
                      to={`/listings/${hotel.id}/edit`}
                      colorScheme="blue"
                      variant="solid"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      isLoading={deleteMutation.isPending}
                      onClick={() => deleteMutation.mutate(hotel.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
      <Box mt={10} mb={2} display="flex" justifyContent="center">
        <Button
          colorScheme="teal"
          size="lg"
          leftIcon={<FiPlus />}
          onClick={() => navigate("/listings/create")}
        >
          Create Hotel
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
