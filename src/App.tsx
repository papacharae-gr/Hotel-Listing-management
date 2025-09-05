import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListingViewPage from "./features/listings/feature/update/ListingViewPage";
import ListingUpdatePage from "./features/listings/feature/update/ListingUpdatePage";
import Layout from "./components/Layout";
import HotelListPage from './features/listings/feature/HotelListPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Redirect root -> read-only σελίδα του demo listing */}
          <Route path="/" element={<HotelListPage />} />
          {/* Read-only view (support both /view and /) */}
          <Route path="/listings/:id" element={<ListingViewPage />} />
          <Route path="/listings/:id/view" element={<ListingViewPage />} />
          {/* Edit page */}
          <Route path="/listings/:id/edit" element={<ListingUpdatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
