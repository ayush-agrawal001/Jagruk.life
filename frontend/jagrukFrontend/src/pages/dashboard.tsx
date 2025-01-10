import { useState, useEffect } from 'react'
import { Header } from "../components/header"
import { Nav } from "../components/nav"
import { ArticleCard } from "../components/article-card"
import { Sidebar } from "../components/sidebar"
import axios from 'axios'
import { PulseLoader } from 'react-spinners'
// import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { searchArticlesAtom } from '@/atoms'
import serverDownSvg from '@/assets/server-down.svg'

export interface Article {
  id: string;
  title: string;
  firstContent: string;
  firstImageLink: string; 
  authorId: string;
  createdAt: string;
  readTime: string;
}

export default function Dashboard() {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [displayedArticlesAll, setDisplayedArticlesAll] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  // const navigate = useNavigate();
  const [searchArticles, _setSearchArticles] = useRecoilState(searchArticlesAtom);

  const getArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8787/api/v1/user/blog/bulk", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if(response.data.message === "Something went wrong at getting the bulk blog post"){
        setServerError(true);
      }
      setDisplayedArticles(response.data);
      setDisplayedArticlesAll(response.data);
    } catch (error) {
      setServerError(true);
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    setDisplayedArticles(displayedArticlesAll.filter((article) => article.title.toLowerCase().includes(searchArticles.toLowerCase())));
  }, [searchArticles]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className='flex w-[84vw] justify-center mx-auto'>
        <div className="container max-w-7xl mx-auto px-4 lg:px-8">
          <Nav /> 
          <div className="flex gap-6 py-6">
            <main className="flex-1">
              <div className="grid gap-20">
                {!serverError ? 
                <div>
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div> */}
                    <PulseLoader />
                  </div>
                ) : (
                  displayedArticles.map((article, _index) => (
                    <div className='mt-5 mb-15' key={article.id}>
                      <ArticleCard 
                        key={article.id} 
                        id={article.id}
                        title={article.title} 
                        excerpt={article.firstContent} 
                        author={article.authorId} 
                        _date={article.createdAt} 
                        image={article.firstImageLink} 
                      />
                    </div>
                  ))
                )} </div> : <div className='flex flex-col items-center gap-20 justify-center h-64 mt-28'>
                  <div>
                  <h1 className='text-4xl font-bold'>Oops!!!</h1>
                  <h3 className='text-xl'>Something went wrong at getting the blog post please try again later</h3>
                  </div>
                  <img src={serverDownSvg} className='h-96 w-96' alt="server down" />
                  </div>}
              </div>
            </main>
          </div>
        </div>
        <div className='border-black hidden md:hidden lg:block'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

