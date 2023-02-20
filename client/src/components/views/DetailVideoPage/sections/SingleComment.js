import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Avatar, Button, Input } from 'antd';
import { Comment } from '@ant-design/compatible';
import LikeDislike from './LikeDislike';
import { getComments } from '../../../../_actions/comment_action';
const { TextArea } = Input;

function SingleComment(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer).userData;

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState('')

    const onChangeComment = (event) => {
        setCommentValue(event.currentTarget.value)
    };

    const openReply = () => {
        setOpenReply(!OpenReply)
    };

    const onSubmit = (event) => {
        event.preventDefault();

        let variable = {
            writer: user._id,
            videoId: props.videoId,
            responseTo: props.comment._id,
            content: CommentValue
        };

        axios.post('/api/comment/saveComment', variable)
        .then(res => {
            if(res.data.success) {
                setCommentValue("");
                openReply();
                dispatch(getComments({
                    videoId: props.videoId
                }));
            } else {
                alert('댓글 저장에 실패했습니다.')
            }
        });
    };

    const actions =[
        <LikeDislike userId={localStorage.getItem('user_id')} commentId={props.comment._id}/>,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to</span>
    ];

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={<p>{props.comment.content}</p>}
            >
            </Comment>
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onChangeComment}
                        value={CommentValue}
                        placeholder="댓글을 작성해주세요."
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }
        </div>
    );
};

export default SingleComment;