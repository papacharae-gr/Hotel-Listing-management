import { Heading, Text, Stack, Button, Badge, Flex, Card, CardBody, CardFooter, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { Hotel } from "../domain/hotel.model";


interface HotelCardProps {
	hotel: Hotel;
	onDelete: (id: string) => void;
	isDeleting: boolean;
}

export const HotelCard = ({ hotel, onDelete, isDeleting }: HotelCardProps) => {
	const cardBg = "white";
	const muted = "gray.600";
	const hasDescription = !!hotel.description?.trim();
	const amenityList = (hotel.amenities ?? []).filter(Boolean);
	return (
		<Card
			maxW="sm"
			height="300px"
			bg={cardBg}
			borderRadius="xl"
			boxShadow="md"
			_hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
			transition="all 0.15s ease"
		>
			<CardBody>
				<Stack spacing={3}>
					<Heading size="md">{hotel.name}</Heading>
					{hasDescription ? (
						<Text noOfLines={3}>{hotel.description}</Text>
					) : (
						<Text noOfLines={2} color={muted}>
							No description provided.
						</Text>
					)}
					{amenityList.length > 0 && (
						<Flex gap={2} wrap="wrap">
							{amenityList.map((a) => (
								<Badge key={a} colorScheme="blue" variant="subtle" borderRadius="full" px={2} py={1}>
									{a}
								</Badge>
							))}
						</Flex>
					)}
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<Flex w="100%" justify="space-between" gap={2}>
					<Button as={Link} to={`/listings/${hotel.id}`} colorScheme="cyan" variant="outline" size="sm">
						View
					</Button>
					<Button as={Link} to={`/listings/${hotel.id}/edit`} colorScheme="blue" variant="solid" size="sm">
						Edit
					</Button>
					<Button colorScheme="red" variant="outline" size="sm" isLoading={isDeleting} onClick={() => onDelete(hotel.id)}>
						Delete
					</Button>
				</Flex>
			</CardFooter>
		</Card>
	);
};	