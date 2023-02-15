import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Avatar, Button, Input } from 'antd';
import { Comment } from '@ant-design/compatible';
import SingleComment from './SingleComment';
const { TextArea } = Input;

function ReplyComment(props) {

    const [ChildCommentCount, setChildCommentCount] = useState(0);
    const [OpenReply, setOpenReply] = useState(false);

    useEffect(() => {

        let childCommentCount = 0;
        props.comments.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                childCommentCount ++
            }
        });
        setChildCommentCount(childCommentCount)
    }, [props.comments, props.parentCommentId]);


    const renderReplyComment = props.comments.map((comment, i) => {
        // <React.Fragment>
            console.log(comment.responseTo, props.parentCommentId)
            return (comment.responseTo === props.parentCommentId &&
                <div style={{ width: '80%', marginLeft: '40px' }}>
                    <SingleComment comment={comment} videoId={props.videoId} updateComment={props.updateComment}/>
                    <ReplyComment comments={props.comments} parentCommentId={comment._id} videoId={props.videoId} updateComment={props.updateComment}/>
                </div>
            );
        // </React.Fragment>
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