// Feature pages
export { default as ListingUpdatePage } from './feature/updateHotel/HotelUpdate';
export { default as ListingViewPage } from './feature/listOneHotel/HotelDetailsPage';
export { default as ListingDetails } from './feature/listOneHotel/HotelDetails';
export { default as HotelListPage } from './feature/listAllHotels/AllHotelListPage';
export { HotelList } from './feature/listAllHotels/AllHotelList';

// Components
export { HotelCard } from './components/HotelCard';

// Data-access
export * from './data-access/useListOneHotelQuery';
export * from './data-access/useListAllHotelsQuery';
export * from './data-access/useDeleteHotelMutation';
export * from './data-access/useUpdateHotelMutation';
// export * from './data-access/useListingUpdateHandler'; (removed, file deleted)
export * from './data-access/gateway/hotel.gateway';

// Domain model
export * from './domain/hotel.model';