import { useGetUserBookingsQuery, useDeleteBookingMutation } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function UserBookings() {
    const {
        data: bookings,
        isLoading,
        isError,
        refetch,
    } = useGetUserBookingsQuery();
    const [deleteBooking, { isLoading: isDeleting }] =
        useDeleteBookingMutation();
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (bookingId) => {
        setDeletingId(bookingId);
        try {
            await deleteBooking(bookingId).unwrap();
            refetch();
            toast.success("Booking successfully cancelled!");
        } catch (error) {
            console.error("Failed to cancel booking:", error);
            toast.error("Failed to cancel booking.");
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) return <Skeleton className="h-32 w-full rounded-lg" />;
    if (isError) return <p className="text-red-500">Error loading bookings.</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul className="space-y-4">
                    {bookings.map((booking) => {
                        const checkInDate = new Date(booking.checkIn);
                        const checkOutDate = new Date(booking.checkOut);
                        const totalNights = Math.max(
                            Math.ceil(
                                (checkOutDate - checkInDate) /
                                    (1000 * 60 * 60 * 24)
                            ),
                            1
                        );
                        const pricePerNight = booking.hotelId?.price || 0;
                        const finalPrice = booking.price || 0;

                        return (
                            <li
                                key={booking._id}
                                className="border p-4 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {booking.hotelId?.name ||
                                            "Unknown Hotel"}
                                    </h2>
                                    <p>
                                        Check-in: {checkInDate.toDateString()}
                                    </p>
                                    <p>
                                        Check-out: {checkOutDate.toDateString()}
                                    </p>
                                    <p className="text-sm">
                                        Price per night:{" "}
                                        <span className="font-semibold">
                                            ${pricePerNight.toFixed(2)}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        Total nights:{" "}
                                        <span className="font-semibold">
                                            {totalNights}
                                        </span>
                                    </p>
                                    <p className="text-lg font-bold">
                                        Final Price:{" "}
                                        <span className="text-green-600">
                                            ${finalPrice.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex gap-2 ml-auto">
                                    <Button variant="default">
                                        Pay to Confirm
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(booking._id)
                                        }
                                        disabled={
                                            isDeleting &&
                                            deletingId === booking._id
                                        }
                                    >
                                        {isDeleting &&
                                        deletingId === booking._id
                                            ? "Cancelling..."
                                            : "Cancel"}
                                    </Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
