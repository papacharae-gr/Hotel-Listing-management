import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import type { Hotel } from "../../domain/hotel.model";

type Props = {
  hotel: Hotel;
};

export default function HotelDetails({ hotel }: Props) {
  const cardBg = '#fff';
  const muted = '#757575';
  const border = '#e0e0e0';

  // Προαιρετικό limit εμφάνισης amenities για καλύτερο flow σε πολύ μεγάλες λίστες
  const AMENITY_LIMIT = 20;
  const hasMoreAmenities = hotel.amenities.length > AMENITY_LIMIT;
  const visibleAmenities = hotel.amenities.slice(0, AMENITY_LIMIT);

  return (
    <Box sx={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 3, boxShadow: 1, p: { xs: 2, md: 4 } }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h5" sx={{ lineHeight: 1.2 }} noWrap>{hotel.name}</Typography>
          {/* <Typography variant="body2" sx={{ mt: 1, color: muted, fontWeight: 500 }} noWrap>
            {hotel.location.city}, {hotel.location.country}
          </Typography> */}
        </Box>

  <Divider sx={{ bgcolor: '#212121' }} />

        {/* Description */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Typography variant="h6">Description</Typography>
            <Chip label="Details" color="default" size="small" />
          </Stack>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
            {hotel.description}
          </Typography>
        </Box>

        {/* Amenities */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Typography variant="h6">Amenities</Typography>
            <Chip label={hotel.amenities.length} color="primary" size="small" />
          </Stack>
          {hotel.amenities.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {visibleAmenities.map((a) => (
                <Chip key={a} label={a} color="primary" variant="outlined" size="small" sx={{ borderRadius: 1 }} />
              ))}
              {hasMoreAmenities && (
                <Tooltip title={hotel.amenities.slice(AMENITY_LIMIT).join(", ")} placement="top" enterDelay={200}>
                  <Chip label={`+${hotel.amenities.length - AMENITY_LIMIT} more`} color="primary" size="small" sx={{ borderRadius: 1 }} />
                </Tooltip>
              )}
            </Stack>
          ) : (
            <Typography variant="body2" color={muted}>No amenities listed.</Typography>
          )}
        </Box>

        {/* Προαιρετικό block rating */}
        {/* <Box>
          <Heading size="sm" color={muted} mb={1}>
            Rating
          </Heading>
          <Text>{listing.rating} / 5</Text>
        </Box> */}
      </Stack>
    </Box>
  );
}
