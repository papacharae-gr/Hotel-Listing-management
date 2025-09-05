
import React from 'react';
import {
	Container,
	Stack,
	Spinner,
	Text,
	Box,
	Heading,
	Badge,
	Divider,
	Alert,
	AlertIcon,
	List,
	ListItem
} from '@chakra-ui/react';
import { useListingQuery } from '../../data-access/useListingQuery';

type Props = {
	id: string;
};

export default function ListingUpdatePage({ id }: Props) {
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


if (isError) {
return (
<Container maxW="container.md" py={10}>
<Alert status="error">
<AlertIcon />
{(error as Error)?.message || 'Failed to load listing.'}
</Alert>
</Container>
);
}


if (!data) return null;


return (
<Container maxW="container.md" py={10}>
<Stack gap={6}>
<Box>
<Heading size="lg">{data.name}</Heading>
<Text color="gray.500">
{data.location.city}, {data.location.country}
</Text>
</Box>


<Divider />


<Box>
<Heading size="md" mb={2}>
Description
</Heading>
<Text>{data.description}</Text>
</Box>


<Box>
<Heading size="md" mb={2}>
Amenities
</Heading>
<List display="flex" gap={2} flexWrap="wrap">
{data.amenities.map((a) => (
<ListItem key={a}>
<Badge>{a}</Badge>
</ListItem>
))}
</List>
</Box>


<Box>
<Heading size="sm" color="gray.600">
Rating
</Heading>
<Text>{data.rating} / 5</Text>
</Box>
</Stack>
</Container>
);
}