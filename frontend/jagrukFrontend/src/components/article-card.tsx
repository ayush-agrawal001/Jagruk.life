import React, { useEffect, useState } from 'react'
import { MoreHorizontal, Plus, Minus, User, BookOpen, VolumeX, Flag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import axios from 'axios'

interface ArticleCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  _date: string
  image?: string
}

interface UserInfo {
  id : string,
  firstname : string,
  lastname : string,
  email : string,
  bio : string,
  username : string,
  createdAt : string,
}

export const ArticleCard = React.memo(function ArticleCard({ id, title, excerpt, author, _date, image }: ArticleCardProps) {
  const readTime = Math.floor(Math.random() * 10) + 3;
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id : "",
    firstname : "",
    lastname : "",
    email : "",
    bio : "",
    username : "",
    createdAt : "",
  });
  const [dateToSet, setDate] = useState<string>("");

  useEffect(() => {
    getUserInfo(author);
  }, []);

  const getUserInfo = async (articleId : string) => {
    const response = await axios.get("http://127.0.0.1:8787/api/v1/user/getinfo/" + articleId, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    });
    setUserInfo(response.data);
    const date = new Date(_date);
    setDate(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
  };
  
  return (
    <Card id={id} className="hover:cursor-pointer border-0 shadow-none bg-background">
      <CardContent className="p-0 grid grid-cols-4 gap-4">
        <div className="col-span-3 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-primary">{userInfo.firstname} {userInfo.lastname}</span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{dateToSet}</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{excerpt}</p>
        </div>
        {image && (
          <div className="col-span-1">
            <img src={image} alt="" className="rounded-md object-cover w-full h-32" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-0 mt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">{readTime} min read</span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Plus className="h-4 w-4" />
                      <div className="grid gap-1 text-left">
                        <div className="font-medium">Show more</div>
                        <div className="text-xs text-muted-foreground">Recommend more stories like this to me.</div>
                      </div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Minus className="h-4 w-4" />
                      <div className="grid gap-1 text-left">
                        <div className="font-medium">Show less</div>
                        <div className="text-xs text-muted-foreground">Recommend fewer stories like this to me.</div>
                      </div>
                    </Button>
                  </div>
                  <Separator />
                  <div className="grid gap-1">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      <span>Follow author</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Follow publication</span>
                    </Button>
                  </div>
                  <Separator />
                  <div className="grid gap-1">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <VolumeX className="h-4 w-4" />
                      <span>Mute author</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <VolumeX className="h-4 w-4" />
                      <span>Mute publication</span>
                    </Button>
                  </div>
                  <Separator />
                  <Button variant="ghost" className="w-full justify-start gap-2 text-destructive">
                    <Flag className="h-4 w-4" />
                    <span>Report story...</span>
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardFooter>
    </Card>
  )
})

