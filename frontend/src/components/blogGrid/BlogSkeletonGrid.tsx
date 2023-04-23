import Grid2, {Grid2Props} from "@mui/material/Unstable_Grid2";
import BlogGridSkeletonItem from "@/components/blogGridItem/BlogGridSkeletonItem";

interface BlogSkeletonGridProps {
    count: number
    className?: string
}

const BlogSkeletonGrid = ({count, className, ...props}: BlogSkeletonGridProps & Grid2Props) => {

    const skeletons = [...Array(count)].map(_ =>
        <Grid2 width={{xs: 1, md: 0.5, xl: 0.33}}>
            <BlogGridSkeletonItem/>
        </Grid2>
    )

    return (
        <Grid2 container spacing={4} columns={{xs: 1, md: 2, xl: 4}} {...props}>
            {skeletons}
        </Grid2>
    )
}

export default BlogSkeletonGrid;
