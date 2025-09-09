/* eslint-disable @typescript-eslint/no-explicit-any */
import { useListingQuery } from "../../data-access/useListOneHotelQuery";
import {
  Container,
  Spinner,
  Text,
  Stack,
  Alert,
  AlertIcon,
  Divider,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useUpdateListingMutation } from "../../data-access/useUpdateHotelMutation";
import { Link, useParams } from "react-router-dom";
import { HotelForm } from "../../components/HotelForm";

export default function ListingUpdatePage() {
  const { id = "listing-123" } = useParams();
  const { data, isLoading, isError, error } = useListingQuery(id);
  const mutation = useUpdateListingMutation(id);

  async function handleSubmit(values: any) {
    await mutation.mutateAsync(values);
  }

  if (isLoading) {
    return (
      <Container maxW="container.md" py={10}>
        <Stack align="center" gap={4}>
          <Spinner />
          <Text>Loading listing…</Text>
        </Stack>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="error">
          <AlertIcon />
          {(error as Error)?.message || "Failed to load listing."}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <Stack gap={6}>
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="semibold">Edit Listing</Text>
          <Button as={Link} to={`/listings/${id}`} variant="outline">
            View
          </Button>
        </Flex>

        <Divider />

        <HotelForm
          defaultValues={{
            name: data.name,
            description: data.description,
            amenities: data.amenities,
          }}
          onSubmit={handleSubmit}
        />

        <Divider />
        {/* <Text color="gray.500" fontSize="sm">
          * Rating and location are read-only in this demo.
        </Text> */} 
      </Stack>
    </Container>
  );
}
