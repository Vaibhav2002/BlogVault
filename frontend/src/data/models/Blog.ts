export default interface Blog {
    _id: string
    title: string
    description: string
    content: string
    tags: Tag[]
    createdAt: string
    updatedAt: string
}