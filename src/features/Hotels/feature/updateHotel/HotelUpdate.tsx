/* eslint-disable @typescript-eslint/no-explicit-any */
import { useListOneHotelQuery } from "../../data-access/useListOneHotelQuery";
import React from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useUpdateHotelMutation } from "../../data-access/useUpdateHotelMutation";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link, useParams } from "react-router-dom";
import { HotelForm } from "../../components/HotelForm";

export default function HotelUpdatePage() {
  const { id = "hotel" } = useParams();
  const { data, isLoading, isError, error } = useListOneHotelQuery(id);
  const mutation = useUpdateHotelMutation(id);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  async function handleSubmit(values: any) {
    try {
      await mutation.mutateAsync(values);
      setSnackbarMessage("Hotel updated successfully!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    
    } catch (err: any) {
      setSnackbarMessage(err?.message || "Failed to update hotel.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography>Loading listing…</Typography>
        </Stack>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
  <Alert severity={"error" as 'success' | 'info' | 'warning' | 'error'}>
          {(error as Error)?.message || "Failed to load listing."}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Stack spacing={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>Edit Listing</Typography>
          <Button component={Link} to={`/listings/${id}`} variant="outlined" color="primary">
            View
          </Button>
        </Box>
        <Divider />
        <HotelForm
          defaultValues={{
            name: data.name,
            description: data.description,
            amenities: data.amenities,
          }}
          onSubmit={handleSubmit}
        />
        <Divider />
        {/* <Typography color="text.secondary" fontSize="small">
          * Rating and location are read-only in this demo.
        </Typography> */}
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
