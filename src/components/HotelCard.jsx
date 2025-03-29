import { MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";

function HotelCard({ hotel, confidence }) {
    return (
        <Card className="shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
            <Link to={`/hotels/${hotel._id}`} className="block">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={hotel.image || "/default-hotel.jpg"}
                        alt={hotel.name ? `Image of ${hotel.name}` : "Hotel"}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                </div>
                <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold text-xl">
                        {hotel.name ?? "Unnamed Hotel"}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-primary" />
                        <span>{hotel.location ?? "Unknown location"}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-yellow-500" />
                        <span className="font-medium">
                            {hotel.rating ?? "No rating"}
                        </span>
                        <span className="text-muted-foreground">
                            ({hotel.reviews?.toLocaleString() ?? "No"} Reviews)
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">
                            ${hotel.price ?? "N/A"}
                        </span>
                        <Button
                            variant="outline"
                            className="text-sm text-white bg-blue-600 hover:bg-blue-700 hover:text-white transition-all duration-300 py-2 px-4 rounded-md flex items-center space-x-2"
                            as={Link}
                            to={`/hotels/${hotel._id}`}
                        >
                            <span>Explore</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                    {confidence !== undefined && (
                        <p className="text-xs text-muted-foreground">
                            Similarity: {(confidence * 100).toFixed(2)}%
                        </p>
                    )}
                </CardContent>
            </Link>
        </Card>
    );
}

export default HotelCard;
