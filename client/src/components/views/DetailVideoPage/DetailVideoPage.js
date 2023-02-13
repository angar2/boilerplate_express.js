import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { List, Avatar, Col, Row } from 'antd';
import SideVideos from './sections/SideVideos';

function DetailVideoPage(props) {

    const videoId = useParams().videoId;

    const [Video, setVideo] = useState([])

    const variable = {
        videoId: videoId
    }

    axios.post('/api/video/getVideo', variable)
    .then(res => {
        if(res.data.success) {
            setVideo(res.data.video);
        } else {
            alert('게시물 정보 불러오기에 실패했습니다.');
        }
    });
    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
                        <List.Item
                            actions={[]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>
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