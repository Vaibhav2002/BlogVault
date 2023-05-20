import format from "date-fns/format"
import {formatDistanceToNowStrict} from "date-fns";

export const generateSlug = (title: string) => {
    return title
        .replaceAll(/[^a-zA-Z0-9 ]/g, "") // remove special characters
        .replaceAll(/\s\s+/g, " ") // replace multiple spaces with single space
        .replaceAll(" ", "-") // replace spaces with hyphens
        .trim()
        .toLowerCase()
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const currentDate = new Date(Date.now())

    if (date.getFullYear() === currentDate.getFullYear())
        return format(date, "MMM dd")
    else
        return format(new Date(date), "MMM dd, yyyy")
}

export const formatRelativeDate = (date:string) => formatDistanceToNowStrict(new Date(date), {addSuffix: true})