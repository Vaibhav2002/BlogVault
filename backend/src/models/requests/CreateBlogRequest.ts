interface CreateBlogRequest {
    slug:string
    title: string
    description: string
    content: string
    hashtags: string[]
}

export default CreateBlogRequest