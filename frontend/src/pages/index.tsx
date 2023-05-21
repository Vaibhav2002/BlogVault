import {Stack} from "@mui/material";
import HeroSection from "@/components/landingPage/HeroSection";
import React from "react";
import FeatureSection from "@/components/landingPage/FeatureSection";
import TechStackSection from "@/components/landingPage/TechStackSection";
import FooterSection from "@/components/landingPage/FooterSection";
import {useLandedEvent} from "@/hooks/useTracker";

export default function Home() {
    useLandedEvent()
    return (
        <Stack height='100%'>
            <HeroSection/>
            <FeatureSection/>
            <TechStackSection/>
            <FooterSection/>
        </Stack>
    )
}


