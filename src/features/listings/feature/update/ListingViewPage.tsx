import { useListingQuery } from "../../data-access/useListingQuery";
import {
  Container,
  Spinner,
  Text,
  Stack,
  Alert,
  AlertIcon,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react";
import ListingDetails from "./ListingDetails";
import { Link, useParams } from "react-router-dom";

export default function ListingViewPage() {
  const { id = "listing-123" } = useParams();
  const { data, isLoading, isError, error } = useListingQuery(id);

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
          <Text fontSize="xl" fontWeight="semibold">Hotel Listing</Text>
          <Button as={Link} to={`/listings/${id}/edit`} colorScheme="blue">
            Edit
          </Button>
        </Flex>

        <Divider />

        <ListingDetails listing={data} />
      </Stack>
    </Container>
  );
}
