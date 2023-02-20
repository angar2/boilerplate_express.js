import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { getComments } from '../../../../_actions/comment_action';
const { TextArea } = Input;

function Comment(props) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer).userData;
    const comments = useSelector(state => state.commentReducer).comments;
    let Comments = [];
    if(comments !== undefined) {
        for(let i = 0; i < comments.length; i++) {
            Comments.push(comments[i])
        }      
    }

    const [CommentValue, setCommentValue] = useState('')

    const onChangeComment = (event) => {
        setCommentValue(event.currentTarget.value);
    };

    useEffect(() => {
        dispatch(getComments({
            videoId: props.videoId
        }))
        .then(res => {
            if(res.payload.success) {
            } else {
                alert('댓글 정보 불러오기에 실패했습니다.');
            }
        });
    }, [])
    
    const onSubmit = (event) => {
        event.preventDefault();

        let variable = {
            writer: user._id,
            videoId: props.videoId,
            content: CommentValue
        };
        axios.post('/api/comment/saveComment', variable)
        .then(res => {
            if(res.data.success) {
                setCommentValue("");
                dispatch(getComments({
                    videoId: props.videoId
                }));
            } else {
                alert('댓글 저장에 실패했습니다.');
            }
        });
    };

    return (
        <div>
            <br />
            <p>replies</p>
            <hr />
            {Comments && Comments.map((comment, i) => {
                return (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} videoId={props.videoId} />
                        <ReplyComment parentCommentId={comment._id} videoId={props.videoId} />
                    </React.Fragment>
                )
            })}
            {/* Root Comment Form */}
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
        </div>
    );
};

export default Comment;