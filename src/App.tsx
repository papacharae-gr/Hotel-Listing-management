import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListingViewPage from "./features/listings/feature/update/ListingViewPage";
import ListingUpdatePage from "./features/listings/feature/update/ListingUpdatePage";
import Layout from "./components/Layout";
import Home from "./components/Home";
import HotelCreatePage from "./features/listings/feature/create/HotelCreatePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Redirect root -> home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          {/* Home page */}
          <Route path="/home" element={<Home />} />
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
