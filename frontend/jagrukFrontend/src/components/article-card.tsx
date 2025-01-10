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
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate();
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
    const response = await axios.get("https://my-app.ayushthestar8679.workers.dev/api/v1/user/getinfo/" + articleId, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    });
    setUserInfo(response.data);
    const date = new Date(_date);
    setDate(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
  };
  
  return (
    <Card id={id} className="font-serif lg:h-80 hover:cursor-pointer shadow-2xl bg-background">
  <CardContent
    onClick={() => navigate(`/blog/${id}`)}
    className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-4"
  >
    <div className="space-y-2 sm:col-span-3">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-primary">
          {userInfo.firstname} {userInfo.lastname}
        </span>
        <span className="text-sm text-muted-foreground">·</span>
        <span className="text-sm text-muted-foreground">{dateToSet}</span>
      </div>
      <Separator className="w-5/12 bg-gray-100" />
      <h2 className="text-lg font-bold text-foreground sm:text-xl">{title}</h2>
      <Separator className="w-full" />
      <p className="truncate lg:text-wrap lg:text-clip lg:h-36 w-full text-muted-foreground">{excerpt}</p>
    </div>
    {image && (
      <div className="flex justify-center items-center">
        <img
          src={image}
          alt=""
          className="rounded-md object-cover w-full h-40 sm:h-56"
        />
      </div>
    )}
  </CardContent>
  <CardFooter className="pb-8">
    <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <span className="text-sm text-muted-foreground">{readTime} min read</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="text-primary">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-80">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  <div className="grid gap-1 text-left">
                    <div className="font-medium">Show more</div>
                    <div className="text-xs text-muted-foreground">
                      Recommend more stories like this to me.
                    </div>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Minus className="h-4 w-4" />
                  <div className="grid gap-1 text-left">
                    <div className="font-medium">Show less</div>
                    <div className="text-xs text-muted-foreground">
                      Recommend fewer stories like this to me.
                    </div>
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
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-destructive"
              >
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

