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
import ListingUpdateForm from "./ListingUpdateForm";
import { useListingUpdateHandler } from "../../data-access/useListingUpdateHandler";
import { Link, useParams } from "react-router-dom";

export default function ListingUpdatePage() {
  const { id = "listing-123" } = useParams();
  const { data, isLoading, isError, error } = useListingQuery(id);
  const { onSubmit, isPending } = useListingUpdateHandler(id);

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

        <ListingUpdateForm
          defaultValues={{
            name: data.name,
            description: data.description,
            amenities: data.amenities,
          }}
          onSubmit={onSubmit}
          isSubmitting={isPending}
        />

        <Divider />
        {/* <Text color="gray.500" fontSize="sm">
          * Rating and location are read-only in this demo.
        </Text> */} 
      </Stack>
    </Container>
  );
}
