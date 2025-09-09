/* eslint-disable @typescript-eslint/no-explicit-any */
import { useListingQuery } from "../../data-access/useListingQuery";
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
import { useListingUpdateHandler } from "../../data-access/useListingUpdateHandler";
import { useToast } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { HotelForm } from "../../components/HotelForm";

export default function ListingUpdatePage() {
  const { id = "listing-123" } = useParams();
  const { data, isLoading, isError, error } = useListingQuery(id);
  const { onSubmit } = useListingUpdateHandler(id);
  const toast = useToast();

  async function handleSubmit(values: any) {
    try {
      await onSubmit(values);
      toast({
        title: "Listing updated",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
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
