import React from 'react'
import AddPosts from './AddPosts.jsx'
import ShowPosts from './ShowPosts.jsx'
import "./scrollbar.css"
const Posts = () => {
  return (
    <div className='h-full overflow-y-scroll example'>
      <AddPosts/>
      <ShowPosts/>
    </div>
  )
}

export default Posts
