import React, { useEffect, useState } from "react";
import { useGetListingsQuery} from "../features/listings/data-access/useListingQuery"
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

const Home: React.FC = () => {
    const { data, isLoading, error } = useGetListingsQuery();
    

    if (isLoading) return <Box p={8}><Text>Loading hotels...</Text></Box>;
    if (error) return <Box p={8}><Text color="red.500">Error: {error.message}</Text></Box>;

    return (
        <Box p={8}>
            <Heading mb={6}>Hotels</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {data?.map((hotel) => (
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