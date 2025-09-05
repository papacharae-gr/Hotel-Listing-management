import { useListingQuery } from "../../data-access/useListingQuery";
import {
  Container,
  Spinner,
  Text,
  Stack,
  Alert,
  AlertIcon,
  Divider,
} from "@chakra-ui/react";
import ListingUpdateForm from "./ListingUpdateForm";
import { useListingUpdateHandler } from "./useListingUpdateHandler";

interface Props {
  id: string;
}

export default function ListingUpdatePage({ id }: Props) {
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
        <Text color="gray.500" fontSize="sm">
          * Rating and location are read-only in this demo.
        </Text>
      </Stack>
    </Container>
  );
}
