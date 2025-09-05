

import { useHotelsQuery } from '../data-access/useHotelsQuery';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Stack,
  Button,
} from '@chakra-ui/react';




export default function HotelListPage() {
  const { data, isLoading, isError, error } = useHotelsQuery();

  return (
    <Box maxW="container.lg" mx="auto" py={8} px={4}>
      <Heading mb={6} size="lg">All Hotels</Heading>
      {isLoading && <Spinner size="xl" />}
      {isError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error instanceof Error ? error.message : 'Failed to load hotels.'}
        </Alert>
      )}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {Array.isArray(data) && data.map((hotel: any) => (
          <Card
            key={hotel.id}
            as={RouterLink}
            to={`/listings/${hotel.id}/view`}
            _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
          >
            <CardBody>
              <Stack spacing={3}>
                <Heading size="md">{hotel.name}</Heading>
                <Text>{hotel.description}</Text>
                <Text fontSize="sm" color="gray.500">
                  {(hotel.location?.city || '—')}, {(hotel.location?.country || '—')}
                </Text>
                <Button
                  as={RouterLink}
                  to={`/listings/${hotel.id}/view`}
                  colorScheme="blue"
                  size="sm"
                  onClick={e => e.stopPropagation()}
                >
                  View
                </Button>
                <Button
                  as={RouterLink}
                  to={`/listings/${hotel.id}/edit`}
                  colorScheme="blue"
                  size="sm"
                  onClick={e => e.stopPropagation()}
                >
                  Edit
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}