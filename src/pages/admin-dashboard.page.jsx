import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreateHotelForm from "@/components/CreateHotelForm";

const AdminPage = () => {
    const [selectedTab, setSelectedTab] = useState("create-hotel");

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav className="flex flex-col gap-4">
                    <Button
                        variant="ghost"
                        className={`w-full text-left ${
                            selectedTab === "create-hotel" ? "bg-gray-700" : ""
                        }`}
                        onClick={() => setSelectedTab("create-hotel")}
                    >
                        Create Hotel
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full text-left ${
                            selectedTab === "manage-hotels" ? "bg-gray-700" : ""
                        }`}
                        onClick={() => setSelectedTab("manage-hotels")}
                    >
                        Manage Hotels
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full text-left ${
                            selectedTab === "bookings" ? "bg-gray-700" : ""
                        }`}
                        onClick={() => setSelectedTab("bookings")}
                    >
                        Bookings
                    </Button>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <Card>
                    <CardContent className="p-6">
                        {selectedTab === "create-hotel" && <CreateHotelForm />}
                        {selectedTab === "manage-hotels" && (
                            <p className="text-gray-500">
                                This section is under development.
                            </p>
                        )}
                        {selectedTab === "bookings" && (
                            <p className="text-gray-500">
                                This section is under development.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default AdminPage;
