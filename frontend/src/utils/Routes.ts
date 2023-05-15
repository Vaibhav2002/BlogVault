enum Route {
    Home = '/home',
    Blog = "/blogs",
    Users = "/users",
    Edit = "/blogs/edit",
    Discover = '/discover',
    Search = '/search',
}

export const getBlogRoute = (slug: string) => `${Route.Blog}/${slug}`

export const getUserRoute = (username: string) => `${Route.Users}/${username}`

export const getEditBlogRoute = (slug: string) => `${Route.Edit}/${slug}`

export const getSearchRouteForTopic = (topic: string) => `${Route.Search}?topic=${topic}`

export default Route