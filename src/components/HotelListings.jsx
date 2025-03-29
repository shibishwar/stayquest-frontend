import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import HotelCard from "./HotelCard";

export default function HotelListings() {
    const searchValue = useSelector((state) => state.search.value);
    const {
        data: hotels = [],
        isLoading,
        isError,
        error,
    } = useGetHotelsForSearchQueryQuery({ query: searchValue });

    const [filter, setFilter] = useState("ALL");

    const filterOptions = [
        { label: "All Hotels", value: "ALL" },
        { label: "Budget Friendly", value: "BUDGET" },
        { label: "Best Rated", value: "BEST_RATED" },
        { label: "Trending", value: "TRENDING" },
        { label: "Luxury Stays", value: "LUXURY" },
        {
            label: "Hidden Gems",
            value: "HIDDEN_GEMS",
        },
    ];

    const filteredHotels = useMemo(() => {
        if (filter === "ALL") return hotels;
        return hotels.filter(({ hotel }) => {
            if (!hotel) return false;
            if (filter === "BUDGET") return hotel.price < 400;
            if (filter === "BEST_RATED") return hotel.rating >= 4;
            if (filter === "TRENDING") return hotel.reviews > 500;
            if (filter === "LUXURY") return hotel.price > 500;

            if (filter === "HIDDEN_GEMS")
                return hotel.rating >= 4 && hotel.reviews < 50;
            return true;
        });
    }, [hotels, filter]);

    if (isLoading) {
        return (
            <section className="px-8 py-8 lg:py-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Trending destinations
                </h2>
                <div className="flex gap-x-8">
                    <div className="w-1/4">
                        <div className="space-y-4">
                            <p>Loading filters...</p>
                        </div>
                    </div>
                    <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <p>Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="px-8 py-8 lg:py-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Top trending hotels worldwide
                </h2>
                <p className="text-lg text-muted-foreground">
                    Discover the most trending hotels worldwide for an
                    unforgettable experience.
                </p>
                <div className="flex gap-x-8">
                    <div className="w-1/4">
                        <div className="space-y-4">
                            <p>Error loading filters.</p>
                        </div>
                    </div>
                    <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <p className="text-red-500">
                            {error?.message ||
                                "An unexpected error occurred. Please try again later."}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="px-8 py-8 lg:py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Trending Stays, Curated by AI
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
                Smart Picks for Your Stay!
            </p>

            <div className="flex gap-x-8">
                <div className="w-1/4">
                    <div className="flex flex-col space-y-4">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFilter(option.value)}
                                className={`p-2 rounded-lg border transition-all duration-200 ${
                                    filter === option.value
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-black"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredHotels.length === 0 ? (
                        <p>No hotels found.</p>
                    ) : (
                        filteredHotels.map(({ hotel, confidence }, index) => {
                            if (!hotel) return null;
                            return (
                                <div
                                    key={hotel._id}
                                    className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${
                                        index % 2 === 0
                                            ? "bg-gray-100"
                                            : "bg-white"
                                    } ${
                                        index % 3 === 0
                                            ? "border-l-4 border-blue-500"
                                            : "border-none"
                                    }`}
                                >
                                    <HotelCard
                                        hotel={hotel}
                                        confidence={confidence}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
