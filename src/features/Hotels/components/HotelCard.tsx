import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import type { Hotel } from "../domain/hotel.model";


interface HotelCardProps {
	hotel: Hotel;
	onDelete: (id: string) => void;
	isDeleting: boolean;
}

export const HotelCard = ({ hotel, onDelete, isDeleting }: HotelCardProps) => {
	const cardBg = "#fff";
	const muted = "#757575";
	const hasDescription = !!hotel.description?.trim();
	const amenityList = (hotel.amenities ?? []).filter(Boolean);
		return (
			<Card sx={{ maxWidth: 345, height: 300, bgcolor: cardBg, borderRadius: 3, boxShadow: 3, transition: 'all 0.15s ease', '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' } }}>
				<CardContent>
					<Stack spacing={2}>
						<Typography variant="h6">{hotel.name}</Typography>
						{hasDescription ? (
							<Typography variant="body2" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hotel.description}</Typography>
						) : (
							<Typography variant="body2" color={muted} sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
								No description provided.
							</Typography>
						)}
						{amenityList.length > 0 && (
							<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
								{amenityList.map((a) => (
									<Chip key={a} label={a} color="primary" variant="outlined" size="small" />
								))}
							</Box>
						)}
					</Stack>
				</CardContent>
				<Divider />
				<CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
					<Button component={Link} to={`/listings/${hotel.id}`} color="info" variant="outlined" size="small">
						View
					</Button>
					<Button component={Link} to={`/listings/${hotel.id}/edit`} color="primary" variant="contained" size="small">
						Edit
					</Button>
					<Button color="error" variant="outlined" size="small" disabled={isDeleting} onClick={() => onDelete(hotel.id)}>
						Delete
					</Button>
				</CardActions>
			</Card>
		);
};	