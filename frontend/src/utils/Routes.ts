enum Route {
    LANDING = '/',
    Home = '/home',
    Blog = "/blogs",
    Users = "/users",
    Edit = "/blogs/edit",
    Discover = '/discover',
    Search = '/search',
    SavedForLater = '/saved-for-later',
    Post = '/blogs/create',

}

export const getRouteFromString = (routeStr: string) => {
    if (routeStr === '/') return Route.LANDING
    const routes = Object.entries(Route)
    for (const [key, value] of routes) {
        if (routeStr.startsWith(value)) return value
    }
    return undefined
}

export const getBlogRoute = (slug: string) => `${Route.Blog}/${slug}`

export const getUserRoute = (username: string) => `${Route.Users}/${username}`

export const getEditBlogRoute = (slug: string) => `${Route.Edit}/${slug}`

export const getSearchRouteForTopic = (topic: string) => `${Route.Search}?topic=${topic}`

export default Route