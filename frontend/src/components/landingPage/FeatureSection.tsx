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
        title: "Discover a World of Ideas",
        description: "Explore a diverse collection of captivating blogs on various topics, written by passionate individuals. Immerse yourself in a wealth of knowledge, inspiration, and thought-provoking content.",
        videoUrl: '/home_vid.mp4'
    },
    {
        title: "Share Your Voice with the World",
        description: "Unleash your creativity and express your ideas through blogging. Create and publish your own compelling articles, essays, stories, or any form of written expression. Inspire others with your unique perspective and contribute to the growing community of passionate writers.",
        videoUrl: '/create_vid.mp4'
    },
    {
        title: 'Stay Updated with the Latest Trends',
        description: 'Explore our Discover screen to stay in the loop with the most popular blogs and influential authors. Discover trending blogs that are capturing attention and making waves within the community. Delve into a curated selection of captivating content, handpicked for your reading pleasure.',
        videoUrl: '/discover_vid.mp4'
    }
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