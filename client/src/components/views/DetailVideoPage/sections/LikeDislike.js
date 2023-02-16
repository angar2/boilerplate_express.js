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
    if(props.videoId) {
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
                setDislikesCount(res.data.dislikes.length);
                res.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setDisliked(true);
                    }
                });
            } else {
                alert('싫어요 정보를 가져오지 못했습니다.');
            }
        });
    }, []);

    const onLike = () => {
        if(!Liked) {
            axios.post('/api/like/upLike', variable)
            .then(res => {
                if(res.data.success) {
                    setLikesCount(LikesCount + 1);
                    setLiked(true);

                    if(Disliked) {
                        setDislikesCount(DislikesCount -1);
                        setDisliked(false);
                    }
                } else {
                    alert('좋아요에 실패했습니다.');
                }
            });
        } else {
            axios.post('/api/like/downLike', variable)
            .then(res => {
                if(res.data.success) {
                    setLikesCount(LikesCount - 1);
                    setLiked(false);
                } else {
                    alert('좋아요 취소에 실패했습니다.');
                }
            });
        }
    };

    const onDislike = () => {
        if(!Disliked) {
            axios.post('/api/like/upDislike', variable)
            .then(res => {
                if(res.data.success) {
                    setDislikesCount(DislikesCount + 1);
                    setDisliked(true);

                    if(Liked) {
                        setLikesCount(LikesCount -1);
                        setLiked(false);
                    }
                } else {
                    alert('싫어요에 실패했습니다.');
                }
            });
        } else {
            axios.post('/api/like/downDislike', variable)
            .then(res => {
                if(res.data.success) {
                    setDislikesCount(DislikesCount - 1);
                    setDisliked(false);
                } else {
                    alert('좋아요 취소에 실패했습니다.');
                }
            });
        }
    };

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    { Liked === true ? <LikeFilled onClick={onLike}/> : <LikeOutlined onClick={onLike} /> }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{LikesCount}</span>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    { Disliked === true ? <DislikeFilled onClick={onDislike}/> : <DislikeOutlined onClick={onDislike}/> }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{DislikesCount}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislike