import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListingViewPage from "./features/Hotels/feature/listOneHotel/HotelDetailsPage";
import ListingUpdatePage from "./features/Hotels/feature/updateHotel/HotelUpdate";
import { Layout } from "./components";
import HotelListPage from "./features/Hotels/feature/listAllHotels/AllHotelListPage";
import HotelCreatePage from "./features/Hotels/feature/createHotel/HotelCreatePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Redirect root -> home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          {/* Home/List page */}
          <Route path="/home" element={<HotelListPage />} />
          {/* Read-only view */}
          <Route path="/listings/:id" element={<ListingViewPage />} />
          {/* Edit page */}
          <Route path="/listings/:id/edit" element={<ListingUpdatePage />} />
          {/* Create page */}
          <Route path="/listings/create" element={<HotelCreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
