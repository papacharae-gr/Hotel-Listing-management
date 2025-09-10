import { Box } from '@chakra-ui/react';
import { RoomList } from '../../components';

type Props = { hotelId: string };

export default function HotelRoomsSection({ hotelId }: Props) {
  return (
    <Box mt={8}>
      <RoomList hotelId={hotelId} />
    </Box>
  );
}
