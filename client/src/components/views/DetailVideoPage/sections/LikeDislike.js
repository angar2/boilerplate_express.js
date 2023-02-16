import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons';
import axios from 'axios';

function LikeDislike(props) {

    const [LikesCount, setLikesCount] = useState(0);
    const [DislikesCount, setDislikesCount] = useState(0);
    const [Liked, setLiked] = useState(false);
    const [Disliked, setDisliked] = useState(false);

    let variable = {};
    if(props.video) {
        variable = {videoId: props.videoId, userId: props.userId};
    } else {
        variable = {commentId: props.commentId, userId: props.userId};
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
        .then(res => {
            if(res.data.success) {
                setLikesCount(res.data.likes.length);
                res.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setLiked(true);
                    }
                });
            } else {
                alert('좋아요 정보를 가져오지 못했습니다.')
            }
        });

        axios.post('/api/like/getDislikes', variable)
        .then(res => {
            if(res.data.success) {
                setDislikesCount(res.data.likes.length);
                res.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setDisliked(true);
                    }
                });
            } else {
                alert('싫어요 정보를 가져오지 못했습니다.')
            }
        });
    }, []);
    

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    { Liked === true ? <LikeFilled onClick/> : <LikeOutlined onClick/> }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{LikesCount}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    { Disliked === true ? <DislikeFilled onClick/> : <DislikeOutlined onClick/> }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{DislikesCount}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislike