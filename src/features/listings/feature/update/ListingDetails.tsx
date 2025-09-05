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
  const location = listing.location || { city: '—', country: '—' };
  const rating = typeof listing.rating === 'number' ? listing.rating : 'N/A';
  const amenities = Array.isArray(listing.amenities) ? listing.amenities : [];
  return (
    <Stack gap={6}>
      <Box>
        <Heading size="lg">{listing.name ?? '—'}</Heading>
        <Text color="gray.500">
          {location.city}, {location.country}
        </Text>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={2}>Description</Heading>
        <Text>{listing.description ?? '—'}</Text>
      </Box>

      <Box>
        <Heading size="md" mb={2}>Amenities</Heading>
        <List display="flex" gap={2} flexWrap="wrap">
          {amenities.length > 0 ? amenities.map((a: string) => (
            <ListItem key={a}><Badge>{a}</Badge></ListItem>
          )) : <ListItem><Text color="gray.400">—</Text></ListItem>}
        </List>
      </Box>

      <Box>
        <Heading size="sm" color="gray.600">Rating</Heading>
        <Text>{rating} / 5</Text>
      </Box>
    </Stack>
  );
}
