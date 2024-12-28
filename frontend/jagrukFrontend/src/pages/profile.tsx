"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Plus } from 'lucide-react'
// import Image from "next/image"
import { EditProfileDialog } from "@/components/edit-profile-dialouge"
import { CreatePostDialog } from "@/components/create-post-dialogue"
import { PostCard } from "@/components/post-card"
import { Header } from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Post {
  id: string
  content: string
  author: {
    name: string
    handle: string
    avatar?: string
  }
  createdAt: string
}

interface ProfileStats {
  following: number
  followers: number
  posts: number
}

interface ProfileData {
  name: string
  handle: string
  bio: string
  joinDate: string
  location: string
  stats: ProfileStats
  isVerified?: boolean
}

export default function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [profile, setProfile] = useState<ProfileData>({
    name: "John Doe",
    handle: "@johndoe",
    bio: "There must be a separate and unchanging being that is the source of all other beings.",
    joinDate: "March 2023",
    location: "Earth",
    stats: {
      following: 134,
      followers: 33,
      posts: 129,
    },
    isVerified: true
  })

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content: "Just published my latest blog post about modern web development!",
      author: {
        name: profile.name,
        handle: profile.handle,
      },
      createdAt: "2h ago"
    }
  ])

  const handleProfileUpdate = (updatedProfile: Partial<ProfileData>) => {
    setProfile(prev => ({
      ...prev,
      ...updatedProfile
    }))
  }

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      author: {
        name: profile.name,
        handle: profile.handle,
      },
      createdAt: "Just now"
    }
    setPosts(prev => [newPost, ...prev])
  }

  return (
    <div>
    <Header></Header>
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="mx-auto max-w-2xl border-none shadow-none">
        <CardHeader className="relative pb-0">
          <div className="mb-4 flex items-end justify-between">
            <Avatar className='w-44 h-44 hover:cursor-pointer'> 
                <AvatarImage src="https://images.pexels.com/photos/29749740/pexels-photo-29749740/free-photo-of-dramatic-portrait-of-woman-in-silhouette-with-flowers.jpeg"/>
                <AvatarFallback>AA</AvatarFallback>
            </Avatar>

            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => setIsEditProfileOpen(true)}
            >
              Edit profile
            </Button>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              {profile.isVerified && (
                <CheckCircle className="h-5 w-5 fill-primary text-background" />
              )}
            </div>
            <p className="text-muted-foreground">{profile.handle}</p>
          </div>
          
          <div className="mt-4 space-y-4">
            <p className="text-base">{profile.bio}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                📍 {profile.location}
              </span>
              <span className="flex items-center gap-1">
                📅 Joined {profile.joinDate}
              </span>
            </div>
            
            <div className="flex gap-4 text-sm">
              <span>
                <strong className="font-medium">{profile.stats.following}</strong>{" "}
                <span className="text-muted-foreground">Following</span>
              </span>
              <span>
                <strong className="font-medium">{profile.stats.followers}</strong>{" "}
                <span className="text-muted-foreground">Followers</span>
              </span>
              <span>
                <strong className="font-medium">{profile.stats.posts}</strong>{" "}
                <span className="text-muted-foreground">Posts</span>
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="posts"
                className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 font-medium data-[state=active]:border-primary"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="replies"
                className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 font-medium data-[state=active]:border-primary"
              >
                Replies
              </TabsTrigger>
              <TabsTrigger
                value="highlights"
                className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 font-medium data-[state=active]:border-primary"
              >
                Highlights
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 font-medium data-[state=active]:border-primary"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 font-medium data-[state=active]:border-primary"
              >
                Likes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-4">
              <div className="mb-4">
                <Button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create new post
                </Button>
              </div>
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  No posts yet
                </div>
              )}
            </TabsContent>
            {/* Add other TabsContent components as needed */}
          </Tabs>
        </CardContent>
      </Card>

      <EditProfileDialog
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        profile={profile}
        onSave={handleProfileUpdate}
      />

      <CreatePostDialog
        open={isCreatePostOpen}
        onOpenChange={setIsCreatePostOpen}
        onPost={handleCreatePost}
      />
    </div>
    </div>
  )
}

