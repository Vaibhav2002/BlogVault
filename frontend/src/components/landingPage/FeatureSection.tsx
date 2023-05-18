import CenteredBox from "@/components/styled/CenteredBox";
import {Divider, Stack, Typography} from "@mui/material";
import useDevices from "@/hooks/useDevices";
import {motion} from "framer-motion";

export interface Feature {
    title: string
    description: string
    videoUrl: string
}

interface FeatureSectionProps {
    className?: string
}

const features: Feature[] = [
    {
        title: "Explore the World of Engaging Content",
        description: "Discover a vast collection of captivating blogs covering various topics. Immerse yourself in diverse perspectives and gain knowledge with our extensive content library.",
        videoUrl: "home_vid.mp4"
    },
    {
        title: "Unleash Your Creativity",
        description: "Bring your ideas to life with our intuitive and user-friendly create blog screen. Seamlessly draft, edit, and publish your thoughts, and connect with your audience through a streamlined writing experience.",
        videoUrl: "create_vid.mp4"
    },
    {
        title: "Stay Updated with What's Trending",
        description: "Stay in the loop with the latest trends in the blogging community. Explore our curated selection of trending blogs and influential authors. Gain insights, broaden your horizons, and be inspired by the creativity of trending authors.",
        videoUrl: "discover_vid.mp4"
    },
    {
        title: "Refine and Discover",
        description: "Refine your search and discover precisely what you're looking for. Customize your search with keywords and categories to find tailored content. Experience the joy of personalized search and uncover valuable information at your fingertips.",
        videoUrl: "search_vid.mp4"
    },
    {
        title: "Never Miss a Read",
        description: "Save blogs for later and never miss out on great reads. Curate a personalized reading list to enjoy captivating content at your convenience. Enhance your reading experience and make the most of your valuable time.",
        videoUrl: "saved_vid.mp4"
    },
]

const FeatureSection = ({className}: FeatureSectionProps) => {
    const {isMobile} = useDevices()
    return (
        <Stack
            spacing={{xs: 6, md: 10, lg: 14}}
            paddingX={{xs: 4, md: 6, lg: 14}}
            paddingY={{xs: 6, md: 8, lg: 10}}
        >
            <CenteredBox paddingX={2} width={1} gap={4}>
                <Divider style={{flex: '1'}}/>
                <Typography variant={isMobile ? 'h5' : 'h3'} textAlign='center' fontWeight='bold'>Features</Typography>
                <Divider style={{flex: '1'}}/>
            </CenteredBox>

            <Stack spacing={{xs: 4, md: 8}}>
                {features.map((feature, index) => (
                    <FeatureCard feature={feature} reverse={index % 2 != 0}/>
                ))}
            </Stack>
        </Stack>

    )
}


interface FeatureCardProps {
    feature: Feature,
    reverse?: boolean
    className?: string
}

const FeatureCard = ({feature, reverse, className}: FeatureCardProps) => {
    const {isMobile} = useDevices()

    const textSection = <Stack spacing={1} sx={{overflow: 'hidden', flex: 0.6}}>
        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight='bold' fontFamily='Poppins'>
            {feature.title}
        </Typography>
        <Typography variant={isMobile ? 'subtitle2' : 'h6'} color='text.secondary' fontWeight='400'>
            {feature.description}
        </Typography>
    </Stack>

    const videoSection = <CenteredBox flex={0.4}>
        <video autoPlay loop muted width='100%' preload="auto" style={{borderRadius: '0.7rem'}}>
            <source src={feature.videoUrl} type="video/mp4"/>
        </video>
    </CenteredBox>

    return (
        <motion.div
            whileInView={{scale: 1, opacity: 1}}
            initial={{scale: 0.4, opacity: 0}}
            viewport={{once: true, amount: 0.8}}
            transition={{ease: 'easeInOut', duration: 0.7, delay: 0.2}}
        >
            <CenteredBox
                gap={{xs: '2rem', md: '4rem', lg: '8rem'}}
                flexDirection={{xs: 'column', md: 'row'}}
                padding={{xs: 4, lg: 6}}
                sx={{
                    backgroundColor: 'background.light',
                    borderRadius: '1rem'
                }}

            >

                {(reverse || isMobile)
                    ? <>{videoSection}{textSection}</>
                    : <>{textSection}{videoSection}</>
                }
            </CenteredBox>
        </motion.div>

    )
}

export default FeatureSection