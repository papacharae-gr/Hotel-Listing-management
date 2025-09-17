

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { HotelForm } from "../../components/HotelForm";
import { useCreateHotelMutation } from "../../data-access/useCreateHotelMutation";
import { useNavigate } from "react-router-dom";

export default function HotelCreatePage() {
  const mutation = useCreateHotelMutation();
  const navigate = useNavigate();

  interface HotelFormValues {
    name: string;
    description: string;
    amenities: string[];
  }

  function handleSubmit(values: HotelFormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        navigate("/home");
      },
    });
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '40px auto', p: 4, boxShadow: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Προσθήκη Ξενοδοχείου
      </Typography>
      <HotelForm
        defaultValues={{
          name: "",
          description: "",
          amenities: [],
        }}
        onSubmit={handleSubmit}
        isLoading={mutation.isPending}
        submitText="Αποθήκευση"
      />
    </Box>
  );
}