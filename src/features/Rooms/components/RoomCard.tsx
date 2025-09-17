import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import type { Room } from '../domain/room.model';

type Props = {
  room: Room;
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;
};

function formatPrice(value: number) {
  try {
    return new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(value);
  } catch {
    return `€${value}`;
  }
}

export default function RoomCard({ room, onEdit, onDelete }: Props) {
  const border = '#e0e0e0';
  const available = room.isAvailable;

  return (
    <Box sx={{ border: `1px solid ${border}`, borderRadius: 2, p: 2, mb: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack spacing={1} direction="column">
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="h6" fontSize={16}>Room {room.roomNumber}</Typography>
            <Chip label={room.type} color="primary" size="small" />
            <Chip label={available ? 'Available' : 'Unavailable'} color={available ? 'success' : 'error'} size="small" />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(room.pricePerNight)} / night
          </Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Button size="small" variant="contained" color="primary" onClick={() => onEdit?.(room)}>Edit</Button>
          <Button size="small" variant="outlined" color="error" onClick={() => onDelete?.(room)}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
