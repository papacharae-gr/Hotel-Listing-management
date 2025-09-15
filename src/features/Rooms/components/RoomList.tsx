import {
  Box, Heading, Badge, Flex, Button, Stack, Spinner, Alert, AlertIcon, Text, Divider, useDisclosure
} from '@chakra-ui/react';
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

  // Add/Edit modal state
  const formDisclosure = useDisclosure();
  const [editing, setEditing] = useState<Room | null>(null);

  // Delete dialog state
  const [toDelete, setToDelete] = useState<Room | null>(null);
  const deleteDisclosure = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const deleteMutation = useDeleteRoomMutation(hotelId);

  const openAdd = () => { setEditing(null); formDisclosure.onOpen(); };
  const openEdit = (r: Room) => { setEditing(r); formDisclosure.onOpen(); };
  const confirmDelete = (r: Room) => { setToDelete(r); deleteDisclosure.onOpen(); };
  const handleCloseModal = () => { formDisclosure.onClose(); setEditing(null); };

  if (isLoading) {
    return (
      <Stack align="center" py={6}>
        <Spinner />
        <Text>Loading rooms…</Text>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error?.message || 'Αποτυχία φόρτωσης δωματίων'}
      </Alert>
    );
  }

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={3}>
        <Flex align="center" gap={2}>
          <Heading size="md">Rooms</Heading>
          <Badge colorScheme="teal" variant="subtle">{rooms.length}</Badge>
        </Flex>

        <Button colorScheme="blue" size="sm" onClick={openAdd}>
          Add Room
        </Button>
      </Flex>

      <Divider mb={3} />

      {rooms.length === 0 ? (
        <Box py={6} textAlign="center" color="gray.500">
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
          isOpen={formDisclosure.isOpen}
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
          isOpen={formDisclosure.isOpen}
          onClose={handleCloseModal}
          hotelId={hotelId}
          onSuccess={handleCloseModal}
        />
      )}

      {/* Delete confirmation dialog (shared component) */}
      {toDelete && (
        <DeleteDialog
          isDialogOpen={deleteDisclosure.isOpen}
          handleCancelDelete={() => {
            deleteDisclosure.onClose();
            setToDelete(null);
          }}
          handleConfirmDelete={() => {
            if (!toDelete) return;
            deleteMutation.mutate(toDelete.id, {
              onSuccess: () => {
                deleteDisclosure.onClose();
                setToDelete(null);
              },
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
