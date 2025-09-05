import { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  Input, 
  Badge,
  Grid,
  Card,
  Stack
} from '@chakra-ui/react';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading size="2xl" mb={6} textAlign="center" color="blue.600">
          🏨 Hotel Management App
        </Heading>
        
        <Text fontSize="lg" textAlign="center" mb={8} color="gray.600">
          Welcome to the Hotel Management System built with Chakra UI v3
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={8}>
          <Card.Root>
            <Card.Header>
              <Heading size="lg">Counter Demo</Heading>
            </Card.Header>
            <Card.Body>
              <Stack gap={4}>
                <Text>Current count: {count}</Text>
                <Box>
                  <Button 
                    onClick={() => setCount(count + 1)}
                    colorScheme="blue"
                    mr={2}
                  >
                    Increment
                  </Button>
                  <Button 
                    onClick={() => setCount(count - 1)}
                    colorScheme="red"
                    variant="outline"
                  >
                    Decrement
                  </Button>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Heading size="lg">Input Demo</Heading>
            </Card.Header>
            <Card.Body>
              <Stack gap={4}>
                <Input
                  placeholder="Type something..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Text>You typed: {inputValue || 'Nothing yet...'}</Text>
                <Button 
                  onClick={() => setInputValue('')}
                  colorScheme="purple"
                  variant="solid"
                  size="sm"
                >
                  Clear Input
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Grid>

        <Box textAlign="center">
          <Heading size="md" mb={4}>Hotel Features (Coming Soon)</Heading>
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
            <Badge colorScheme="blue" variant="solid">Hotel Listings</Badge>
            <Badge colorScheme="green" variant="solid">View Details</Badge>
            <Badge colorScheme="purple" variant="solid">Edit Hotels</Badge>
            <Badge colorScheme="orange" variant="solid">Amenity Management</Badge>
          </Box>
        </Box>

        <Box mt={8} p={4} bg="gray.50" borderRadius="md">
          <Text fontSize="sm" textAlign="center" color="gray.600">
            🚀 Built with React + TypeScript + Vite + Chakra UI v3 + React Query + React Hook Form + Zod
          </Text>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
