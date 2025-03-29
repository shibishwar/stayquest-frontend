import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import { MapPin, Star, Check } from "lucide-react";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function HotelPage() {
    const { id } = useParams();
    const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(id);
    const [createBooking, { isLoading: isCreateBookingLoading }] =
        useCreateBookingMutation();

    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetBookingState = () => {
        setStep(1);
        setCheckIn(null);
        setCheckOut(null);
        setIsModalOpen(false);
    };

    const handleCheckInSelect = (date) => {
        setCheckIn(date);
        setStep(2);
    };

    const handleCheckOutSelect = (date) => {
        if (date <= checkIn) {
            toast.error("Check-out date must be after check-in date.");
            return;
        }
        setCheckOut(date);
    };

    const handleBook = async () => {
        if (!checkIn || !checkOut) {
            toast.error("Please select both check-in and check-out dates.");
            return;
        }

        const toastId = toast.loading("Booking hotel...");
        try {
            await createBooking({
                hotelId: id,
                checkIn,
                checkOut,
            }).unwrap();

            toast.dismiss(toastId);
            toast.success("Hotel booked successfully!");

            resetBookingState();
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Booking failed. Please try again.");
        }
    };

    if (isLoading)
        return (
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <Skeleton className="h-96 w-full rounded-lg" />
                <Skeleton className="h-6 w-1/2 mt-4" />
                <Skeleton className="h-4 w-1/3 mt-2" />
            </div>
        );

    if (isError)
        return (
            <p className="text-red">
                Error: {hotel?.message ?? "Failed to load hotel data"}
            </p>
        );

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative w-full h-[400px]">
                        <img
                            src={hotel?.image ?? "/placeholder.jpg"}
                            alt={hotel?.name ?? "Hotel Image"}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {hotel?.name ?? "Hotel Name"}
                            </h1>
                            <div className="flex items-center mt-2">
                                <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                                <p className="text-muted-foreground">
                                    {hotel?.location ??
                                        "Location not available"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-primary text-primary" />
                        <span className="font-bold">
                            {hotel?.rating ?? "No rating"}
                        </span>
                        <span className="text-muted-foreground">
                            ({hotel?.reviews?.toLocaleString() ?? "No"} reviews)
                        </span>
                    </div>

                    <p className="text-muted-foreground">
                        {hotel?.description ?? "No description available"}
                    </p>

                    {hotel?.amenities?.length > 0 && (
                        <Card>
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold mb-4">
                                    Amenities
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {hotel.amenities.map((amenity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <Check className="h-5 w-5 mr-2 text-green-600" />
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold">
                                ${hotel?.price ?? "N/A"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                per night
                            </p>
                        </div>
                        <Button size="lg" onClick={() => setIsModalOpen(true)}>
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {step === 1
                                ? "Select Check-in Date"
                                : "Select Check-out Date"}
                        </DialogTitle>
                    </DialogHeader>

                    {step === 1 && (
                        <div>
                            <p className="font-semibold">Check-in</p>
                            <Calendar
                                mode="single"
                                selected={checkIn}
                                onSelect={handleCheckInSelect}
                                fromDate={new Date()}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <p className="font-semibold">Check-out</p>
                            <Calendar
                                mode="single"
                                selected={checkOut}
                                onSelect={handleCheckOutSelect}
                                fromDate={checkIn || new Date()}
                            />

                            <div className="flex justify-between mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleBook}
                                    disabled={isCreateBookingLoading}
                                >
                                    {isCreateBookingLoading
                                        ? "Booking..."
                                        : "Confirm Booking"}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
