import React, { useState, useRef } from 'react'
import api from '../lib/api'
import { url } from '../lib/url'
import marked from 'marked'

export default function UserComments(props) {
  const comments = props
  const commentRef = useRef()
  const [currentComment, setCurrentComment] = useState(0)
  const editInput = document.querySelector(`.single-article-comments-${currentComment} p`)

  const editNewComment = (event) => {   
    const commentsID = commentRef.current.dataset.id
    if(event.key == 'Enter' && event.target.value != '') {
      api('PUT', commentsID, event.target.value, url())
      setCurrentComment(0)
      setTimeout(() => {
        document.querySelector(`.single-article-comments-${commentsID} p`).textContent = event.target.value
      }, 0) 
    }
  }

  function CommentsAction() {   
    const editComment = () => {  
      const commentsID = commentRef.current.dataset.id
      setCurrentComment(commentsID)
      setTimeout(() => { document.getElementById(`${commentsID}`).focus() }, 0)
    }

    const destroyComment = () => {    
      const commentsID = commentRef.current.dataset.id
        if(confirm('確認要刪除這則留言？')) {
          commentRef.current.style = 'display: none'
          api('DELETE', commentsID, '', url())
        } 
      }
    const cancelEditComment = () => {
      setCurrentComment(0)
    }
    return(
      <div className="user-comments-action">
        { currentComment 
        ? 
        <button onClick={ cancelEditComment }>取消</button> 
        : 
        <div>
          <button onClick={ editComment }>編輯</button>
          <button onClick={ destroyComment }>刪除</button>
        </div> 
        }
      </div>
    )
  }

  return(
    <div data-id={ comments.id } ref={ commentRef } className="single-article-user-comments">
      <div className="single-article-user-title">
        <img src="https://picsum.photos/50/50?grayscale" alt="comments-img" />
        <h4>王小明</h4>
        <span>0</span>
        <span>a few seconds ago</span>
      </div>
      <div className="single-article-user-content" >
        { currentComment == comments.id 
          ? 
          <input className="single-article-single-input" type="text" defaultValue={ editInput ? editInput.textContent : null } id={  comments.id } onKeyPress={ editNewComment } /> 
          :
          <div className={ `single-article-comments-${comments.id} single-article-content-markdown  markdown-body` } dangerouslySetInnerHTML={ {__html: marked(comments.content)} }></div>
        }
        <CommentsAction />
      </div>
    </div>
  )  
}


// import React, { useState, useRef } from 'react'
// import api from '../lib/api'
// import marked from 'marked'

// export default function UserComments(props) {
//   const comments = props
//   const commentRef = useRef()
//   const [currentComment, setCurrentComment] = useState(0)
//   const editInput = document.querySelector(`.single-article-comments-${currentComment} p`)

//   const editNewComment = event => {   // 新的留言會有問題，因為Comments.js寫的方式是看長度
//     const commentsID = commentRef.current.dataset.id
//     if(event.key == 'Enter' && event.target.value != '') {
//       api('PUT', commentsID, event.target.value)
//       setCurrentComment(0)
//       setTimeout(() => {
//         const editValue = document.querySelector(`.single-article-comments-${commentsID} p`)
//         editValue.textContent = event.target.value
//       }, 0) 
//     }
//   }

//   function CommentsAction() {   
//     const editComment = () => {  
//       const commentsID = commentRef.current.dataset.id
//       setCurrentComment(commentsID)
//       setTimeout(() => { document.getElementById(`${commentsID}`).focus() }, 0)
//     }

//     const destroyComment = () => {    
//       const commentsID = commentRef.current.dataset.id
//       if(confirm('確認要刪除這則留言？')) {
//         commentRef.current.style = 'display: none'
//         api('DELETE', commentsID)
//       } 
//     }
//     const cancelEditComment = () => { setCurrentComment(0) }
//     return(
//       <div className="user-comments-action">
//         { currentComment ? 
//         <button onClick={ cancelEditComment }>取消</button> 
//         : 
//         <div>
//           <button onClick={ editComment }>編輯</button>
//           <button onClick={ destroyComment }>刪除</button>
//         </div> 
//         }
//       </div>
//     )
//   }

//   return(
//     <div data-id={ comments.id } ref={ commentRef } className="single-article-user-comments">
//       <div className="single-article-user-title">
//         <img src="https://picsum.photos/50/50?grayscale" alt="comments-img" />
//         <h4>王小明</h4>
//         <span>0</span>
//         <span>a few seconds ago</span>
//       </div>
//       <div className="single-article-user-content" >
//         { currentComment == comments.id 
//           ? 
//           <input className="single-article-single-input" type="text" defaultValue={ editInput ? editInput.textContent : null } id={ comments.id } onKeyPress={ editNewComment } /> 
//           :
//           <div className={ `single-article-comments-${comments.id} single-article-content-markdown  markdown-body` } dangerouslySetInnerHTML={ {__html: marked(comments.content)} }></div>
//         }
//         <CommentsAction />
//       </div>
//     </div>
//   )  
// }