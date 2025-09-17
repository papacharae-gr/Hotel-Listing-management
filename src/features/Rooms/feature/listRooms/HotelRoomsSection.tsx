import Box from '@mui/material/Box';
import { RoomList } from '../../components';

type Props = { hotelId: string };

export default function HotelRoomsSection({ hotelId }: Props) {
  return (
    <Box mt={8}>
      <RoomList hotelId={hotelId} />
    </Box>
  );
}
