import { useListingQuery } from "../../data-access/useListOneHotelQuery";
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
import ListingDetails from "./HotelDetails";
import { Link, useParams } from "react-router-dom";
import HotelRoomsSection from '../../../Rooms/feature/listRooms/HotelRoomsSection';


export default function HotelViewPage() {
  const { id } = useParams();
  const queryResult = useListingQuery(id || "");
  if (!id) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="error">
          <AlertIcon />
          No hotel id provided in URL.
        </Alert>
      </Container>
    );
  }
  const { data, isLoading, isError, error } = queryResult;

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
            <Button as={Link} to="/" colorScheme="blue">
            Go Home
            </Button>
        </Flex>

        <Divider />

        <ListingDetails hotel={data} />
        <HotelRoomsSection hotelId={data.id} />
      </Stack>
    </Container>
  );
}
