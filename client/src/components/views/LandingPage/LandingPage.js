import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from 'moment';
import { getVideos } from '../../../_actions/video_action';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

  const dispatch = useDispatch();
  const videos = useSelector(state => state.video).videos;

  let Videos = [];
  if(videos !== undefined) {
    videos.map((video, i) => {
      Videos.push(video)
    })
  }

  useEffect(() => {
    dispatch(getVideos())
    .then(res => {
      if(res.payload.success) {
      } else {
        alert('비디오 불러오기를 실패했습니다.');
      }
    });
  }, []);

  const renderCards = Videos.map((video, i) => {

    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col key={i} lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
            <a href={`/video/${video._id}`} >
              <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
              <div className=" duration"
                style={{
                  bottom: 0, right:0, position: 'absolute', margin: '4px', 
                  color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                  padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                  fontWeight:'500', lineHeight:'12px'
                }}
              >
                <span>{minutes} : {seconds}</span>
              </div>
            </a>
        </div>
        <br />
        <Meta
            avatar={
                <Avatar src={video.writer.image} />
            }
            title={video.title}
        />
        <span>{video.writer.name} </span><br />
        <span> {video.views}</span>
        - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
      </Col>
    );
  });
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2} > Recommended </Title>
        <hr />

        {videos !== undefined &&
          <Row gutter={16}>
            {renderCards}
          </Row>
        }
        
    </div>
  );
};

export default LandingPage