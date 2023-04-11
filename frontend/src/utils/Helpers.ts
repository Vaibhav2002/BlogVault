export const generateSlug = (title:string) => {
    return title
        .replaceAll(/[^a-zA-Z0-9 ]/g, "") // remove special characters
        .replaceAll(/\s\s+/g, " ") // replace multiple spaces with single space
        .replaceAll(" ", "-") // replace spaces with hyphens
        .trim()
        .toLowerCase()
}