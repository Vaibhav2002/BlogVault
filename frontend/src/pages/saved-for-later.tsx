import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import {useContext, useState} from "react";
import {AuthModalsContext} from "@/components/modals/auth/AuthModal";
import * as savedDataSource from "@/data/dataSources/SavedBlogDataSource";
import useSWR from "swr";
import NavScreen from "@/components/NavScreen/NavScreen";
import {NavScreen as NavPage} from "@/components/navBars/NavOptions";
import {Stack, Typography} from "@mui/material";
import BlogList from "@/components/blogItem/BlogList";
import {useRouter} from "next/router";
import {getBlogRoute} from "@/utils/Routes";
import Blog from "@/data/models/Blog";
import PaginationBar from "@/components/PaginationBar";

const SavedBlogsPage = () => {
    const {user} = useAuthenticatedUser()
    const {showLogin} = useContext(AuthModalsContext)

    // if (!user) showLogin()
    //
    // if (!user) return (
    //     <EmptyState
    //         title='Login to see your Saved Blogs'
    //         message='You need to be logged in to see your saved blogs'
    //         ctaText='Login'
    //         onCtaClick={showLogin}
    //     />
    // )
    const router = useRouter()

    const [page, setPage] = useState(1)

    const {data: blogPage, isLoading, error} = useSWR(
        [page, 'savedBlogs'],
        ([page]) => savedDataSource.getSavedBlogs(page)
    )

    const onBlogClick = (blog: Blog) => router.push(getBlogRoute(blog.slug))

    return (
        <NavScreen selected={NavPage.Bookmarks}>
            <Stack
                spacing={2}
                paddingY={4}
                paddingX={6}
            >
                <Typography variant="h4">Saved Blogs</Typography>
                {blogPage &&
                    <>
                        <BlogList blogs={blogPage.blogs} onBlogClick={onBlogClick}/>
                        <PaginationBar
                            page={page}
                            count={blogPage.totalPages}
                            onPageChange={setPage}
                            sx={{alignSelf: 'center'}}
                        />
                    </>
                }
            </Stack>
        </NavScreen>
    )
}

export default SavedBlogsPage;