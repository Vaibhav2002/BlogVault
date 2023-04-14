export default interface Blog {
    _id: string
    title: string
    description: string
    content: string
    topics: Topic[]
    createdAt: string
    updatedAt: string
}