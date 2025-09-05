
import React, { useEffect, useState } from "react";
import { getHotels } from "../lib/httpClient";
import {
    Box,
    Heading,
    Text,
    Stack,
    Button,
    Badge,
    Flex,
    SimpleGrid,
    Card,
    CardBody,
    CardFooter,
    Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Hotel = {
    id: string;
    name: string;
    description?: string;
    amenities?: string[];
    rating?: number;
    location?: { city?: string; country?: string };
    imageUrl?: string;
};


const Home: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHotels = async () => {
            try {
                const data = await getHotels();
                setHotels(data.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        
        fetchHotels();
    }, []);

    if (loading) return <Box p={8}><Text>Loading hotels...</Text></Box>;
    if (error) return <Box p={8}><Text color="red.500">Error: {error}</Text></Box>;

    return (
        <Box p={8}>
            <Heading mb={6}>Hotels</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {hotels.map((hotel) => (
                    <Card key={hotel.id} maxW="sm" boxShadow="md" borderRadius="lg">
                        <CardBody>
                            <Stack spacing={3}>
                                <Heading size="md">{hotel.name}</Heading>
                                <Text noOfLines={2}>{hotel.description}</Text>
                                <Flex gap={2} wrap="wrap">
                                    {hotel.amenities?.map((a) => (
                                        <Badge key={a} colorScheme="blue">{a}</Badge>
                                    ))}
                                </Flex>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Flex w="100%" justify="space-between">
                                <Button as={Link} to={`/listings/${hotel.id}`} colorScheme="teal" variant="outline" size="sm">
                                    View
                                </Button>
                                <Button as={Link} to={`/listings/${hotel.id}/edit`} colorScheme="blue" variant="solid" size="sm">
                                    Edit
                                </Button>
                            </Flex>
                        </CardFooter>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Home;