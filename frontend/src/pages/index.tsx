import {Stack} from "@mui/material";
import HeroSection from "@/components/landingPage/HeroSection";
import React from "react";
import FeatureSection from "@/components/landingPage/FeatureSection";
import TechStackSection from "@/components/landingPage/TechStackSection";

export default function Home() {
    return (
        <Stack height='100%'>
            <HeroSection/>
            <FeatureSection/>
            <TechStackSection/>
        </Stack>
    )
}


