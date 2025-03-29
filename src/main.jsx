import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/clerk-react";
import { neobrutalism } from "@clerk/themes";
import "./index.css";

import MainLayout from "./layouts/main.layout";
import RootLayout from "./layouts/root-layout.layout";
import ProtectedLayout from "./layouts/protected.layout";
import AdminProtectedLayout from "./layouts/admin-protected-layout";

import { store } from "./lib/store";

import HomePage from "./pages/home.page";
import HotelsPage from "./pages/hotels.page";
import HotelPage from "./pages/hotel.page";
import UserBookings from "./pages/user-bookings.page";
import AdminDashboard from "./pages/admin-dashboard.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import NotFoundPage from "./pages/not-found.page";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            appearance={{
                baseTheme: neobrutalism,
            }}
        >
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<RootLayout />}>
                            <Route element={<MainLayout />}>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/hotels"
                                    element={<HotelsPage />}
                                />
                                <Route
                                    path="/hotels/:id"
                                    element={<HotelPage />}
                                />
                                {/* Protected Routes */}
                                <Route element={<ProtectedLayout />}>
                                    <Route
                                        path="/bookings"
                                        element={<UserBookings />}
                                    />
                                    <Route element={<AdminProtectedLayout />}>
                                        <Route
                                            path="/admin"
                                            element={<AdminDashboard />}
                                        />
                                    </Route>
                                </Route>
                            </Route>
                            <Route path="/sign-in" element={<SignInPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ClerkProvider>
    </StrictMode>
);
