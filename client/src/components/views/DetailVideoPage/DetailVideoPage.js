import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { List, Avatar, Col, Row } from 'antd';
import SideVideos from './sections/SideVideos';
import Subscribe from './sections/Subscribe';
import Comment from './sections/Comment';
import LikeDislike from './sections/LikeDislike';
import { getVideo } from '../../../_actions/video_action';

function DetailVideoPage(props) {

    const dispatch = useDispatch();
    const videoId = useParams().videoId;

    const Video = useSelector(state => state.videoReducer).video;

    useEffect(() => {
        dispatch(getVideo({
            videoId: videoId
        }))
        .then(res => {
            if(res.payload.success) {
            } else {
                alert('게시물 정보 불러오기에 실패했습니다.');
            }
        });
    }, []);
    
    if (Video) {
        const subscribeButton = Video.writer._id !== localStorage.getItem('user_id') && <Subscribe subscribed={Video.writer._id} subscriber={localStorage.getItem('user_id')} />
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
                        <List.Item
                            actions={[
                                <LikeDislike userId={localStorage.getItem('user_id')} videoId={Video._id}/>, 
                                subscribeButton
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>
                        <Comment videoId={Video._id} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideos />
                </Col>
            </Row>
        );
    } else {
        return (
            <div>Loading...</div>
        );
    }
};


export default DetailVideoPage;