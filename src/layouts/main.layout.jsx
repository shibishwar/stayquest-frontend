import { Outlet } from "react-router";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import Footer from "@/components/Footer";

function MainLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;
