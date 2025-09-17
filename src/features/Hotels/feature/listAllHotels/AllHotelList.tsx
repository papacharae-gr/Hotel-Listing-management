import { Box } from '@mui/material';
import type { Hotel } from '../../domain/hotel.model';
import { HotelCard } from '../../components/HotelCard';

interface HotelListProps {
  hotels: Hotel[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function HotelList({ hotels, onDelete, isDeleting }: HotelListProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {hotels.map((hotel) => (
        <Box key={hotel.id}>
          <HotelCard
            hotel={hotel}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        </Box>
      ))}
    </Box>
  );
}
