import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";

function Navigation() {
    const { user } = useUser();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const closeSheet = () => setIsSheetOpen(false);

    return (
        <nav className="bg-blue-900 shadow-md py-4 px-6 md:px-12 flex items-center justify-between">
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-2xl font-bold text-white">
                    STAYQUEST
                </Link>
                <div className="hidden md:flex items-center space-x-6 text-gray-700">
                    <Link
                        to="/hotels"
                        className="px-4 py-2 text-white rounded-lg transition duration-0 hover:bg-blue-800 hover:opacity-80"
                    >
                        Hotels
                    </Link>
                    {user?.publicMetadata?.role === "admin" && (
                        <>
                            <Link
                                to="/admin"
                                className="px-4 py-2 text-white rounded-lg transition duration-0 hover:bg-blue-800 hover:opacity-80"
                            >
                                Admin
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <SignedIn>
                    <Button
                        asChild
                        className="bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white"
                    >
                        <Link to="/bookings">My Bookings</Link>
                    </Button>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <Button
                        asChild
                        className="bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white"
                    >
                        <Link to="/sign-in">Log In</Link>
                    </Button>
                    <Button
                        asChild
                        className="bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white"
                    >
                        <Link to="/sign-up">Sign Up</Link>
                    </Button>
                </SignedOut>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger>
                        <Menu size={24} className="text-white" />
                    </SheetTrigger>
                    <SheetContent side="left" className="p-6">
                        <div className="flex flex-col space-y-4 text-lg">
                            <Link
                                to="/"
                                className="hover:text-blue-900 transition"
                                onClick={closeSheet}
                            >
                                Home
                            </Link>
                            <Link
                                to="/hotels"
                                className="hover:text-blue-900 transition"
                                onClick={closeSheet}
                            >
                                Hotels
                            </Link>
                            {user?.publicMetadata?.role === "admin" && (
                                <Link
                                    to="/hotels/create"
                                    className="hover:text-blue-900 transition"
                                    onClick={closeSheet}
                                >
                                    Create Hotel
                                </Link>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}

export default Navigation;
