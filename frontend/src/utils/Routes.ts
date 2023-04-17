enum Route {
    Home = '/home',
    Blog = "/blogs"
}



export const getBlogRoute = (slug: string) => `${Route.Blog}/${slug}`