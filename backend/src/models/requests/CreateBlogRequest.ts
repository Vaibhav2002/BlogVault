interface CreateBlogRequest {
    slug:string
    title: string
    description: string
    content: string
    tags: string[]
}

export default CreateBlogRequest