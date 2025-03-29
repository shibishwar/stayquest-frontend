import { useGetHotelsQuery } from "@/lib/api";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import HotelCard from "@/components/HotelCard";

export default function HotelPage() {
    const [filters, setFilters] = useState({
        location: "",
        priceRange: [0, 2000],
        sort: "featured",
    });

    const {
        data: hotels = [],
        isLoading,
        isError,
        error,
    } = useGetHotelsQuery({
        location: filters.location || undefined,
        priceRange: filters.priceRange || undefined,
        sort: filters.sort || undefined,
    });

    const filterSections = [
        {
            title: "Location",
            content: (
                <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full p-2 border rounded-lg"
                    value={filters.location}
                    onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                    }
                />
            ),
        },
        {
            title: "Price",
            content: (
                <div className="space-y-2">
                    <p className="text-sm">
                        Max Price: ${filters.priceRange[1]}
                    </p>
                    <Slider
                        min={0}
                        max={2000}
                        step={50}
                        value={filters.priceRange}
                        onValueChange={(value) =>
                            setFilters({ ...filters, priceRange: value })
                        }
                    />

                    <p className="text-sm text-center">
                        Selected Price Range:{" "}
                        <strong>${filters.priceRange[0]}</strong> -{" "}
                        <strong>${filters.priceRange[1]}</strong>
                    </p>
                </div>
            ),
        },
    ];

    return (
        <section className="px-4 py-6 lg:px-8 lg:py-16 grid grid-cols-1 lg:grid-cols-4 gap-2">
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-end ">
                <Sheet>
                    <SheetTrigger className="p-2 text-white bg-blue-500 rounded-lg">
                        Filter
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-4">
                        <h2 className="text-lg font-semibold mb-4">
                            Filter by:
                        </h2>
                        <div className="space-y-4">
                            {filterSections.map((section, index) => (
                                <Card
                                    key={index}
                                    className="p-4 border rounded-lg"
                                >
                                    <h3 className="font-semibold">
                                        {section.title}
                                    </h3>
                                    {section.content}
                                </Card>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block col-span-1 space-y-6">
                <h2 className="text-lg font-semibold">Filter by:</h2>
                {filterSections.map((section, index) => (
                    <Card key={index} className="p-4 border rounded-lg">
                        <h3 className="font-semibold">{section.title}</h3>
                        {section.content}
                    </Card>
                ))}
            </aside>

            {/* Right Side Hotel Listings */}
            <div className="col-span-3">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold">Hotels</h2>
                        {(filters.location ||
                            filters.priceRange[0] !== 0 ||
                            filters.priceRange[1] !== 2000) && (
                            <button
                                onClick={() =>
                                    setFilters({
                                        location: "",
                                        priceRange: [0, 2000],
                                        sort: "featured",
                                    })
                                }
                                className="p-2 text-xs sm:text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 sm:px-4 sm:py-2 px-3 py-1"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Sorting Dropdown */}
                    <Select
                        value={filters.sort}
                        onValueChange={(value) =>
                            setFilters({ ...filters, sort: value })
                        }
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="price_asc">
                                Price: Low to High
                            </SelectItem>
                            <SelectItem value="price_desc">
                                Price: High to Low
                            </SelectItem>
                            <SelectItem value="alphabetical_asc">
                                Name: A to Z
                            </SelectItem>
                            <SelectItem value="alphabetical_desc">
                                Name: Z to A
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p className="text-red-500">
                            {error?.message || "An error occurred."}
                        </p>
                    ) : hotels.length === 0 ? (
                        <p>No hotels available.</p>
                    ) : (
                        hotels.map((hotel) => (
                            <HotelCard key={hotel._id} hotel={hotel} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
