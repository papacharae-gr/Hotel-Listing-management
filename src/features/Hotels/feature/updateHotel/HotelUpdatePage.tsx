import { useListOneHotelQuery } from "../../data-access/useListOneHotelQuery";
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ListingDetails from "../listOneHotel/HotelDetails";
import { Link, useParams } from "react-router-dom";


export default function ListingViewPage() {
  const { id } = useParams();
  const queryResult = useListOneHotelQuery(id || "");
  
  if (!id) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
  <Alert severity={"error" as 'success' | 'info' | 'warning' | 'error'}>
          No hotel id provided in URL.
        </Alert>
      </Container>
    );
  }
  const { data, isLoading, isError, error } = queryResult;

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
          <Typography variant="h6" fontWeight={600}>Hotel Listing</Typography>
          <Button component={Link} to="/" color="primary" variant="contained">
            Go Home
          </Button>
        </Box>
        <Divider />
        <ListingDetails hotel={data} />
      </Stack>
    </Container>
  );
}
