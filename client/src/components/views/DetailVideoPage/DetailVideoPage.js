import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { List, Avatar, Col, Row } from 'antd';
import SideVideos from './sections/SideVideos';
import Subscribe from './sections/Subscribe';
import Comment from './sections/Comment';
import LikeDislike from './sections/LikeDislike';

function DetailVideoPage(props) {

    const videoId = useParams().videoId;

    const [Video, setVideo] = useState([]);
    const [Comments, setComments] = useState([]);
    
    const variable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', variable)
        .then(res => {
            if(res.data.success) {
                setVideo(res.data.video);
            } else {
                alert('게시물 정보 불러오기에 실패했습니다.');
            }
        });

        axios.post('/api/comment/getcomments', variable)
        .then(res => {
            if(res.data.success) {
                setComments(res.data.comments);
            } else {
                alert('댓글 정보 불러오기에 실패했습니다.');
            }
        });
    }, []);

    // redux로 변경 예정
    const updateComment = (newComment) => {
        setComments(Comments.concat(newComment))
    }
    
    if (Video.writer) {
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
                        <Comment comments={Comments} videoId={Video._id} updateComment={updateComment} />
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