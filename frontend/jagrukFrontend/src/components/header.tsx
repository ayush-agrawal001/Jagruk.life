import { Bell, Search, Edit, Check, Clock, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userProfileMeta } from '@/atoms'
import { useNavigate } from 'react-router-dom'

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: 'new',
    title: 'Your story has been published',
    description: 'Your story "Getting Started with React" is now live.',
    time: '5m ago'
  },
  {
    id: 2,
    type: 'new',
    title: 'New follower',
    description: 'John Doe started following you',
    time: '10m ago'
  },
  {
    id: 3,
    type: 'read',
    title: 'Story approved',
    description: 'Your story has been approved by the publication',
    time: '1h ago'
  },
  {
    id: 4,
    type: 'read',
    title: 'Comment on your story',
    description: 'Sarah left a comment on your story',
    time: '2h ago'
  },
  {
    id: 5,
    type: 'read',
    title: 'Your story is trending',
    description: 'Your story is gaining traction in React community',
    time: '3h ago'
  }
]

export function Header() {

    const navigate = useNavigate();
    const [userProfilePic, setUserProfile] = useRecoilState(userProfileMeta);

    interface ProfileInfo {
        profilePic : string,
        fallbackText : string
        id : string
    }

    const getProfileInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No auth token found");
                return;
            }
            const response = await axios.get<ProfileInfo>("http://127.0.0.1:8787/api/v1/user/update/getprofileinfo", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setUserProfile({ profilePic : response.data.profilePic, fallbackText : response.data.fallbackText, id : response.data.id });
        } catch (error) {
            console.error("Failed to fetch profile info:", error);
        }
    }

    useEffect(() => {
      setTimeout(() => {
        getProfileInfo();
      }, 1);
    }, []);

    return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-14 items-center px-4 lg:px-8">
        <a href="/" className="flex items-center space-x-2">
          <span className="text-xl font-serif text-primary">Jagruk.life</span>
        </a>
        <div className="flex items-center space-x-4 ml-4">
          <div className="relative w-60">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8 bg-secondary" />
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="flex items-center justify-between pb-4">
                <h4 className="font-medium text-sm">Notifications</h4>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[300px] -mx-4 px-4">
                <div className="grid gap-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="grid gap-1 relative">
                      {notification.type === 'new' && (
                        <span className="absolute left-[-8px] top-2 h-2 w-2 rounded-full bg-primary"></span>
                      )}
                      <div className="grid gap-1">
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="text-xs text-muted-foreground">{notification.description}</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </div>
                      {notification.id !== notifications.length && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <a href="/write">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Edit className="mr-2 h-4 w-4" />
              Write
            </Button>
          </a>
            <Avatar className='w-10 h-10 hover:cursor-pointer' onClick={() => {navigate("/profile/" + userProfilePic.id)}}>
                <AvatarImage src={userProfilePic.profilePic}/>
                <AvatarFallback>{userProfilePic.fallbackText}</AvatarFallback>
            </Avatar>
        </div>
      </div>
    </header>
  )
}

