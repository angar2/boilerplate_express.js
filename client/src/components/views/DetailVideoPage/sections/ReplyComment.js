import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const comments = useSelector(state => state.commentReducer).comments;

    let Comments = [];
    if(comments !== undefined) {
        for(let i = 0; i < comments.length; i++) {
            Comments.push(comments[i])
        }      
    }

    const [ChildCommentCount, setChildCommentCount] = useState(0);
    const [OpenReply, setOpenReply] = useState(false);

    useEffect(() => {

        let childCommentCount = 0;
        Comments.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                childCommentCount ++
            }
        });
        setChildCommentCount(childCommentCount)
    }, [Comments, props.parentCommentId]);


    const renderReplyComment = Comments.map((comment, i) => {
        return (comment.responseTo === props.parentCommentId &&
            <div style={{ width: '80%', marginLeft: '40px' }}>
                <SingleComment comment={comment} videoId={props.videoId} />
                <ReplyComment parentCommentId={comment._id} videoId={props.videoId} />
            </div>
        );
    });

    const openReply = () => {
        setOpenReply(!OpenReply)
    };
    
    return (
        <div>
            {ChildCommentCount > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={openReply} >
                    View {ChildCommentCount} more comment(s)
                </p>
            }
            {OpenReply &&
                renderReplyComment
            }
        </div>
    );
};

export default ReplyComment;