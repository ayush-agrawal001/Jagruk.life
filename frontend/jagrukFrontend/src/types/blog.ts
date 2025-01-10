export interface Author {
    name: string
    avatar: string
    isVerified?: boolean
  }
  
  export interface Publication {
    name: string
    logo?: string
  }
  
  export interface BlogPost {
    isMemberOnly?: boolean
    title: string
    subtitle: string
    author: Author
    publication: Publication
    publishedAt: string
    readingTime: string
    engagementCount: number
    commentCount: number
    heroImage: string
    content: string
  }
  
  