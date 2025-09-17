import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
// TODO: Integrate MUI Dialog for modal logic
import { useMemo, useRef, useState } from 'react';
import { useListRoomsByHotelQuery } from '../data-access/useListRoomsByHotelQuery';
import type { Room } from '../domain/room.model';
import RoomCard from './RoomCard';
import { CreateRoomModal } from '../feature/createRoom/createRoom';
import { UpdateRoomModal } from '../feature/updateRoom/updateRoom';
import DeleteDialog from '../../../components/DeleteDialog';
import { useDeleteRoomMutation } from '../data-access/useDeleteRoomMutation';

type Props = { hotelId: string };

function sortRooms(rooms: Room[]) {
  return [...rooms].sort((a, b) => {
    const na = Number(a.roomNumber);
    const nb = Number(b.roomNumber);
    const aNum = !Number.isNaN(na);
    const bNum = !Number.isNaN(nb);
    if (aNum && bNum) return na - nb;
    if (aNum && !bNum) return -1;
    if (!aNum && bNum) return 1;
    return a.roomNumber.localeCompare(b.roomNumber, undefined, { numeric: true, sensitivity: 'base' });
  });
}

export default function RoomsList({ hotelId }: Props) {
  const { data, isLoading, isError, error } = useListRoomsByHotelQuery(hotelId);
  const rooms = useMemo(() => (data ? sortRooms(data) : []), [data]);

  // TODO: Replace useDisclosure with MUI Dialog or useState logic for modal control
  const [editing, setEditing] = useState<Room | null>(null);

  // Delete dialog state
  const [toDelete, setToDelete] = useState<Room | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const deleteMutation = useDeleteRoomMutation(hotelId);

  const openAdd = () => { setEditing(null); setFormModalOpen(true); };
  const openEdit = (r: Room) => { setEditing(r); setFormModalOpen(true); };
  const confirmDelete = (r: Room) => { setToDelete(r); setDeleteDialogOpen(true); };
  const handleCloseModal = () => { setFormModalOpen(false); setEditing(null); };
  const handleCloseDeleteDialog = () => { setDeleteDialogOpen(false); setToDelete(null); };

  if (isLoading) {
    return (
      <Stack alignItems="center" py={6}>
        <CircularProgress />
        <Typography>Loading rooms…</Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
  <Alert severity={"error" as 'success' | 'info' | 'warning' | 'error'}>
        {error?.message || 'Αποτυχία φόρτωσης δωματίων'}
      </Alert>
    );
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="h6">Rooms</Typography>
          <Chip label={rooms.length} color="primary" variant="outlined" size="small" />
        </Stack>
        <Button color="primary" variant="contained" size="small" onClick={openAdd}>
          Add Room
        </Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {rooms.length === 0 ? (
        <Box py={6} textAlign="center" color="text.secondary">
          Δεν υπάρχουν δωμάτια — πρόσθεσε το πρώτο.
        </Box>
      ) : (
        <Stack gap={3}>
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onEdit={openEdit}
              onDelete={confirmDelete}
            />
          ))}
        </Stack>
      )}

      {/* Add/Edit Form Modal */}
      {editing ? (
        <UpdateRoomModal
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          room={{
            id: editing.id,
            hotelId: editing.hotelId,
            roomNumber: editing.roomNumber,
            type: editing.type,
            pricePerNight: editing.pricePerNight,
            isAvailable: editing.isAvailable,
          }}
          onSuccess={handleCloseModal}
        />
      ) : (
        <CreateRoomModal
          isOpen={isFormModalOpen}
          onClose={handleCloseModal}
          hotelId={hotelId}
          onSuccess={handleCloseModal}
        />
      )}

      {/* Delete confirmation dialog (shared component) */}
      {toDelete && (
        <DeleteDialog
          isDialogOpen={isDeleteDialogOpen}
          handleCancelDelete={handleCloseDeleteDialog}
          handleConfirmDelete={() => {
            if (!toDelete) return;
            deleteMutation.mutate(toDelete.id, {
              onSuccess: handleCloseDeleteDialog,
            });
          }}
          deleteMutation={deleteMutation}
          cancelRef={cancelRef}
          title="Διαγραφή Δωματίου"
          bodyText={`Θέλεις σίγουρα να διαγράψεις το δωμάτιο ${toDelete.roomNumber};`}
          cancelText="Άκυρο"
          confirmText="Διαγραφή"
        />
      )}
    </Box>
  );
}
