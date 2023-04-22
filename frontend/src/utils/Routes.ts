enum Route {
    Home = '/home',
    Blog = "/blogs",

    Users= "/users",
}



export const getBlogRoute = (slug: string) => `${Route.Blog}/${slug}`
export const getUserRoute = (username:string) => `${Route.Users}/${username}`