interface CreateBlogRequest {
    slug: string
    title: string
    description: string
    content: string
    topics: string[]
}

export default CreateBlogRequest