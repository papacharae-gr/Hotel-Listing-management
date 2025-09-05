import {
  Box,
  Heading,
  Text,
  Badge,
  List,
  ListItem,
  Stack,
  Divider,
} from "@chakra-ui/react";
import type { Listing } from "../../domain/listing.model";

type Props = {
  listing: Listing;
};

export default function ListingDetails({ listing }: Props) {
  return (
    <Stack gap={6}>
      <Box>
        <Heading size="lg">{listing.name}</Heading>
        <Text color="gray.500">
          {listing.location.city}, {listing.location.country}
        </Text>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={2}>Description</Heading>
        <Text>{listing.description}</Text>
      </Box>

      <Box>
        <Heading size="md" mb={2}>Amenities</Heading>
        <List display="flex" gap={2} flexWrap="wrap">
          {listing.amenities.map((a: string) => (
            <ListItem key={a}><Badge>{a}</Badge></ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Heading size="sm" color="gray.600">Rating</Heading>
        <Text>{listing.rating} / 5</Text>
      </Box>
    </Stack>
  );
}
