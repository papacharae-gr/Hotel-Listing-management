
import { SimpleGrid } from "@chakra-ui/react";
import type { Listing } from '../../domain/listing.model';
import { HotelCard } from '../../components/HotelCard';

interface HotelListProps {
  hotels: Listing[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function HotelList({ hotels, onDelete, isDeleting }: HotelListProps) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6} flex="1">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </SimpleGrid>
  );
}
