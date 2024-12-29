import { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Hash, MessageCircle, Plus, Send, UserCheck, UserPlus } from 'lucide-react'
import { EditProfileDialog } from "@/components/edit-profile-dialouge"
import { CreatePostDialog } from "@/components/create-post-dialogue"
import { PostCard } from "@/components/post-card"
import { Header } from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRecoilValue } from "recoil"
import { userProfileMeta } from "@/atoms"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { HashLoader } from "react-spinners"

interface Post {
  id: string
  content: string
  title: string
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
  const [profilePic, setProfilePic] = useState<string>("");
  const [checkIsUser, setCheckIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    handle: "",
    bio: "There must be a separate and unchanging being that is the source of all other beings.",
    joinDate: "",
    location: "Earth",
    stats: {
      following: 134,
      followers: 33,
      posts: 129,
    },
    isVerified: true
  })

  const navigate = useNavigate();
  const userId = useParams().id;

  const getDate = (_date : string) => {
    const date = new Date(_date);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  const setUserInfo = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    const response = await axios.get("http://127.0.0.1:8787/api/v1/user/getinfo/" + userId, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    setProfile(prev => ({ ...prev, name : response.data.firstname + " " + response.data.lastname, handle : response.data.handle, bio : response.data.bio, joinDate : getDate(response.data.createdAt)}));
    setProfilePic(response.data.socialMedia[0]);
    console.log(profilePic);
  }, [userId]);

  const getFollowers = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    const response2 = await axios.get("http://127.0.0.1:8787/api/v1/user/" + userId + "/followers", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    setProfile(prev => ({ ...prev, stats : { ...prev.stats, followers : response2.data.count }}));

  }, [userId]);

  const getFollowing = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    const response3 = await axios.get("http://127.0.0.1:8787/api/v1/user/" + userId + "/following", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    setProfile(prev => ({ ...prev, stats : { ...prev.stats, following : response3.data.count }}));
  }, [userId]);

  const getBlogs = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    const response4 = await axios.get("http://127.0.0.1:8787/api/v1/user/blog/" + userId + "/posts", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response4.data.posts);
    setProfile(prev => ({ ...prev, stats : { ...prev.stats, posts : response4.data.count }}));
    const posts = response4.data.posts;
    setPosts(() => posts);
  }, [userId]);

  const checkingUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    const response5 = await axios.get("http://127.0.0.1:8787/api/v1/user/isuser/" + userId, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response5.data);
    setCheckIsUser(response5.data.isUser);
  }, [userId]);

  const trigger = useCallback( async() => {
    await setUserInfo();
    await getFollowers();
    await getFollowing();
    await getBlogs();
    await checkingUser();
  }, [setProfile,getFollowers, getFollowing, getBlogs, checkingUser]);

  useEffect(() => {
    trigger();
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, [userId]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      content: "Just published my latest blog post about modern web development!",
      title : "",
      createdAt: "2h ago"
    }
  ])

  const handleProfileUpdate = (updatedProfile: Partial<ProfileData>) => {
    setProfile(prev => ({
      ...prev,
      ...updatedProfile
    }))
  }
  
  const followUser = async (userId : string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    const response = await axios.post("http://127.0.0.1:8787/api/v1/user/" + userId + "/follow", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    console.log(response.data);
  }

  const [isFollowing, setIsFollowing] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [showMessages, setShowMessages] = useState(false)  

    // Mock data for demonstration
    const followers = [
      { id: 1, name: "John Doe", username: "@johndoe", avatar: "/placeholder.svg" },
      { id: 2, name: "Jane Smith", username: "@janesmith", avatar: "/placeholder.svg" },
    ]
  
    const following = [
      { id: 1, name: "Alice Johnson", username: "@alice", avatar: "/placeholder.svg" },
      { id: 2, name: "Bob Wilson", username: "@bobwilson", avatar: "/placeholder.svg" },
    ]

  return (
    <>
      {
        isLoading ? (
          <div className="flex justify-center items-center h-screen">
            {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" /> */}
            <HashLoader />
          </div>
        ) : (
      <div>
      <Header></Header>
      <div className=" min-h-screen bg-background p-4 md:p-8">
        <Card className="mx-auto max-w-2xl border-2 shadow-2xl">
          <CardHeader className="flex flex-col items-center relative pb-0">
            <div className="mb-4 flex flex-col items-center space-y-4 justify-between">
              <Avatar className='w-44 h-44 hover:cursor-pointer'> 
                  <AvatarImage src={profilePic}/>
                  <AvatarFallback>{profile.name[0] + profile.name[1]}</AvatarFallback>
              </Avatar>

              {checkIsUser && <Button
                variant="outline" 
                className="rounded-full"
                onClick={() => setIsEditProfileOpen(true)}
              >
                Edit profile
              </Button>}
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
            {checkIsUser || <div className="flex gap-3">
              <Button 
                    className={`gap-2 transition-all duration-300 ${
                      isFollowing ? 'bg-green-600 hover:bg-red-600 hover:text-white' : ''
                    }`}
                    onClick={() => {followUser(userId!);setIsFollowing(!isFollowing)}}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span className="inline-block">Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span className="inline-block">Follow</span>
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => setShowMessages(true)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </Button>
                </div>}
          </CardHeader>

          <CardContent className="mt-6">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full justify-center rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="posts"
                  className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 font-medium data-[state=active]:border-primary"
                >
                  Posts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="mt-4">
                <div className="mb-4">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => navigate("/write")}
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

        <FollowerAndFollowingDialog showFollowers={showFollowers} setShowFollowers={setShowFollowers} showFollowing={showFollowing} setShowFollowing={setShowFollowing} followers={followers} following={following}/>
        <MessageDialog showMessages={showMessages} setShowMessages={setShowMessages}/>

        <EditProfileDialog
          open={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
          profile={profile}
          onSave={handleProfileUpdate}
        />
      </div>
      </div>
    )}
    </>
  )
}

const FollowerAndFollowingDialog  = ({showFollowers, setShowFollowers, showFollowing, setShowFollowing, followers, following}) => {
  return (
    <div> 
  <Dialog open={showFollowers} onOpenChange={setShowFollowers}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Followers</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        {followers.map((follower : any) => (
          <div key={follower.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={follower.avatar} />
              <AvatarFallback>{follower.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-semibold">{follower.name}</div>
              <div className="text-sm text-muted-foreground">{follower.username}</div>
            </div>
            <Button variant="outline" size="sm">Follow</Button>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>

  {/* Following Dialog */}
  <Dialog open={showFollowing} onOpenChange={setShowFollowing}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Following</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        {following.map((user : any) => (
          <div key={user.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.username}</div>
            </div>
            <Button variant="outline" size="sm">Unfollow</Button>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
 </div>
  )
}


const MessageDialog = ( {showMessages, setShowMessages}) => (
  <div>
            {/* Messages Sheet */}
            <Sheet open={showMessages} onOpenChange={setShowMessages}>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Messages</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <div className="flex-1 py-4 overflow-auto">
                <div className="space-y-4">
                  {/* Example messages */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%]">
                      Hello! How are you?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
                      I'm doing great, thanks for asking!
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t pb-8">
                <form className="flex gap-2 top-0" onSubmit={(e) => e.preventDefault()}>
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </div>
            </div>
          </SheetContent>
        </Sheet>
  </div>
)