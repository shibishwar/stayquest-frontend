import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = "https://aidf-stayquest-backend-shibishwar.onrender.com";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/`,
        tagTypes: ["Bookings"],
        prepareHeaders: async (headers, { getState }) => {
            const token = await window?.Clerk?.session?.getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        },
    }),
    endpoints: (builder) => ({
        getHotels: builder.query({
            query: ({ location, priceRange, sort }) => {
                const params = new URLSearchParams();

                if (location) params.append("location", location);
                if (priceRange) {
                    params.append("minPrice", priceRange[0]);
                    params.append("maxPrice", priceRange[1]);
                }
                if (sort) params.append("sort", sort);

                return `hotels?${params.toString()}`;
            },
        }),

        getHotelsForSearchQuery: builder.query({
            query: ({ query }) => `hotels/search/retrieve?query=${query}`,
        }),
        getHotelById: builder.query({
            query: (id) => `hotels/${id}`,
        }),
        createHotel: builder.mutation({
            query: (hotel) => ({
                url: "hotels",
                method: "POST",
                body: hotel,
            }),
        }),
        createBooking: builder.mutation({
            query: (booking) => ({
                url: "bookings",
                method: "POST",
                body: booking,
            }),
            invalidatesTags: ["Bookings"],
        }),
        getUserBookings: builder.query({
            query: () => `bookings/user`,
            providesTags: ["Bookings"],
        }),
        deleteBooking: builder.mutation({
            query: (bookingId) => ({
                url: `bookings/${bookingId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Bookings"],
        }),
    }),
});

export const {
    useGetHotelsQuery,
    useGetHotelsForSearchQueryQuery,
    useGetHotelByIdQuery,
    useCreateHotelMutation,
    useCreateBookingMutation,
    useGetUserBookingsQuery,
    useDeleteBookingMutation,
} = api;
