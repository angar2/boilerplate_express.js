import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
const { TextArea } = Input;

function Comment(props) {

    const user = useSelector(state => state.user);

    const [CommentValue, setCommentValue] = useState('')

    const onChangeComment = (event) => {
        setCommentValue(event.currentTarget.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        let variable = {
            writer: user.userData._id,
            videoId: props.videoId,
            content: CommentValue
        };

        axios.post('/api/comment/saveComment', variable)
        .then(res => {
            if(res.data.success) {
                console.log(res.data);
            } else {
                alert('댓글 저장에 실패했습니다.')
            }
        });
    };

    return (
        <div>
            <br />
            <p>replies</p>
            <hr />
            {props.comments && props.comments.map((comment, i) => {
                console.log(comment.responseTo)
                return (!comment.responseTo &&
                    <SingleComment comment={comment} videoId={props.videoId} />
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