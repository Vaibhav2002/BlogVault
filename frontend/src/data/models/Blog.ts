export default interface Blog {
    _id: string
    title: string

    slug:string
    description: string
    content: string
    topics: Topic[]
    createdAt: string
    updatedAt: string

    coverImage: string
}