import React from 'react'
import BlogCardBig from '../../components/BlogsPage/BlogCardBig/BlogCardBig';
import BlogCardSmall from '../../components/BlogsPage/BlogCardSmall/BlogCardSmall';
import axios from 'axios';
import './Blogs.scss';

const Blogs = () => {

  const [blogsBig, setBlogsBig] = React.useState();
  const [blogsSmall, setBlogsSmall] = React.useState();
  React.useEffect(() => {
    axios.get('http://localhost:8000/blog')
      .then(res => {
        setBlogsBig(res.data.filter(obj=>obj.view==='big'));
        setBlogsSmall(res.data.filter(obj=>obj.view==='small'));
      }); 
  }, [])

  if (!blogsBig) return 'loding';
  console.log(blogsBig);
  return (
    <div className="blogs">
      <div className='container'>
        <h2 className='blogs__title'>Blog</h2>
        <div className='blogs__top'>
          {blogsBig.map(obj=><BlogCardBig key={obj.title} {...obj} />)}
          
        </div>
        <div className="blogs__main">
        {/* {blogsSmall.map(obj=><BlogCardSmall {...obj} />)} */}
        <BlogCardSmall {...blogsSmall[0]} />
        <BlogCardSmall {...blogsSmall[0]} />
        <BlogCardSmall {...blogsSmall[0]} />
        <BlogCardSmall {...blogsSmall[0]} />
        </div>
      </div>
    </div>
  )
}

export default Blogs