import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comment(props) {

    const user = useSelector(state => state.userReducer);

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
                setCommentValue("");
                props.updateComment(res.data.comment);
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
                return (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} videoId={props.videoId} updateComment={props.updateComment} />
                        <ReplyComment comments={props.comments} parentCommentId={comment._id} videoId={props.videoId} updateComment={props.updateComment}/>
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