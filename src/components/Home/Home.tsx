import React from "react";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import theme from "../../theme";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { BestDeal } from "./BestDeal";
import { BeExclusive } from "./BeExclusive";
import { CheckoutNewArrivals } from "./CheckoutNewArrivals";
import { ShopByCategory } from "./ShopByCategory";
import { CountryLightSection } from "./CountryLightSection";
import { BestSeller } from "./BestSeller";
import { SummerSection } from "./SummerSection";
import { GentleFormalLookSection } from "./GentleFormalLookSection";
import { CardFooterSection } from "./CardFooterSection";
import { FooterSliderSection } from "./FooterSliderSection";
import { Footer } from "./Footer";
import Navbar from "../Navbar/Navbar";
import { FC } from "react";

interface homeProps {}
const Home: FC<homeProps> = () => {
    return (
        // <ProtectedRoute>
        <Box sx={{ backgroundColor: theme.palette?.backgroundColor.default }}>
            <Navbar />
            <Header />
            <BestDeal />
            <BeExclusive />
            <CheckoutNewArrivals />
            <ShopByCategory />
            <CountryLightSection />
            <BestSeller />
            <SummerSection />
            <GentleFormalLookSection />
            <CardFooterSection />
            <FooterSliderSection />
            <Footer />
        </Box>
        // </ProtectedRoute>
    );
};
export default Home;
