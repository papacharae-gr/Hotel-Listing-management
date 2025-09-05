import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListingViewPage from "./features/listings/feature/update/ListingViewPage";
import ListingUpdatePage from "./features/listings/feature/update/ListingUpdatePage";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Redirect root -> read-only σελίδα του demo listing */}
          <Route path="/" element={<Navigate to="/listings/listing-123" replace />} />
          {/* Read-only view */}
          <Route path="/listings/:id" element={<ListingViewPage />} />
          {/* Edit page */}
          <Route path="/listings/:id/edit" element={<ListingUpdatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
