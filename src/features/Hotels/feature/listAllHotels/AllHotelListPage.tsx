import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useListHotelsQuery } from '../../data-access/useListAllHotelsQuery';
import { HotelList } from './AllHotelList';
import { Link, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import { useRef, useState } from "react";
import DeleteDialog from "../../../../components/DeleteDialog";
import { useDeleteHotelMutation } from "../../data-access/useDeleteHotelMutation";
import { useQueryClient } from "@tanstack/react-query";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function HotelListPage() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const deleteMutation = useDeleteHotelMutation();

  // Show Snackbar on mutation success/error
  if (deleteMutation.isSuccess && !snackbar.open) {
    setSnackbar({ open: true, message: 'Το ξενοδοχείο διαγράφηκε!', severity: 'success' });
  }
  if (deleteMutation.isError && !snackbar.open) {
    setSnackbar({ open: true, message: deleteMutation.error?.message || 'Αποτυχία διαγραφής ξενοδοχείου', severity: 'error' });
  }
  const navigate = useNavigate();
  const { data, isLoading, error } = useListHotelsQuery();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const queryClient = useQueryClient();
  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    }
    setDialogOpen(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setDeleteId(null);
  };

  if (isLoading) {
    return <Box sx={{ p: 8 }}>Loading...</Box>;
  }
  if (error) {
    return <Box sx={{ p: 8, color: 'error.main' }}>Error: {error.message}</Box>;
  }

  return (
    <Box sx={{ p: 8, minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
  <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity as 'success' | 'info' | 'warning' | 'error'} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
        <Typography variant="h4">Hotels</Typography>
      </Stack>
      {(!data || (Array.isArray(data) && data.length === 0)) ? (
        <Box sx={{ border: '1px dashed', borderColor: 'grey.300', borderRadius: 2, p: 10, textAlign: 'center', flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>No hotels yet</Typography>
          <Button variant="contained" color="primary" startIcon={<FiPlus />} onClick={() => navigate("/listings/create")}>Create Hotel</Button>
        </Box>
      ) : (
        <HotelList hotels={data} onDelete={handleDeleteClick} isDeleting={deleteMutation.isPending} />
      )}
      <Stack direction="row" justifyContent="center" sx={{ mt: 8 }}>
        <Button
          startIcon={<FiPlus />}
          variant="contained"
          color="success"
          component={Link}
          to="/listings/create"
        >
          Create Hotel
        </Button>
      </Stack>
      <DeleteDialog
        isDialogOpen={isDialogOpen}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        deleteMutation={deleteMutation}
        cancelRef={cancelRef}
        title={"Delete Hotel"}
        bodyText={"Are you sure you want to delete this hotel? This action cannot be undone."}
        cancelText={"Cancel"}
        confirmText={"Delete"}
      />
    </Box>
  );
}
