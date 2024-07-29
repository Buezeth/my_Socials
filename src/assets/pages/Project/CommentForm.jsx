import React, { useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFireStore } from '../../hooks/useFireStore'
import './CommentForm.css'
import Avatar from '../../components/Avatar'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

export default function CommentForm({data, id}) {
    const [comment, setComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument } = useFireStore('projects')

    const handleSubmit = (e) => {
        e.preventDefault()
        const commentToUpdate = {
            id: Math.random(),
            createdAt : Timestamp.fromDate(new Date()),
            commentedBy: user.uid,
            content: comment,
            displayName: user.displayName,
            photoURL: user.photoURL,
        }

        const commentDetail = data.comment === "" ? { comment: data.comment, commentToUpdate}: { comment: [...data.comment, commentToUpdate]}
        // const commentDetail = data.comment === "" ? "Empty": "NotEmpty"

        if(comment !== "") {
            updateDocument(id, commentDetail)
            setComment('')
            console.log(commentDetail)
        }

    }

  return (
    <div className='comment'>
      {/* comments */}
      <div>
        <p><b>Project Comments</b></p>
        <br /><br />
        {data.comment.map((doc) => (
            <div key={doc.id} className='comment-content'>
                <div className="photo-name">
                    <Avatar img={doc.photoURL} imgSize="30px" />
                    <p>{doc.displayName}</p>
                </div>
                <p className='date'>{formatDistanceToNow(doc.createdAt.toDate(), {addSuffix: true})}</p>
                <br />
                <p className='content'>{doc.content}</p>
            </div>
            
        ))}
      </div>
      {/* form */}
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <span>Add Comment</span>
        <textarea onChange={(e) => {setComment(e.target.value)}} value={comment}></textarea>
        <button>Add Comment</button>
      </form>
    </div>
  )
}
