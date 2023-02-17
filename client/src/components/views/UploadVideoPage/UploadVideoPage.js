import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Typography, Button, Form, message, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import { fileInfoVideo, fileInfoVideo2 } from '../../../_actions/video_action';

const {Title} = Typography;
const {TextArea} = Input;

const PrivateOption = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
];

const CategoryOption = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
];

function VideoUploadPage() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");
    const video = useSelector(state => state.video);
    
    const navigate = useNavigate();

    const onChangeVideoTitle = (event) => {
        setVideoTitle(event.currentTarget.value);
    };

    const onChangeDecsription = (event) => {
        setDescription(event.currentTarget.value);
    };

    const onChangePrivate = (event) => {
        setPrivate(event.currentTarget.value);
    };

    const onChangeCategory = (event) => {
        setCategory(event.currentTarget.value);
    };

    const onDropVideo = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        };
        formData.append("file", files[0]);

        dispatch(fileInfoVideo(formData, config))
            .then(res => {
                if(res.payload.success) {
                    let body = {
                        filePath: res.payload.filePath,
                        fileName: res.payload.fileName
                    };
                    dispatch(fileInfoVideo2(body))
                        .then(res => {
                            if(res.payload.success) {
                                console.log('업로드 성공');
                            } else {
                                alert('썸네일 생성에 실패했습니다.');
                            }
                        });
                } else {
                    alert('파일 업로드에 실패했습니다.');
                }
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            private: Private,
            filePath: video.fileInfo.filePath,
            category: Category,
            duration: video.fileInfo2.fileDuration,
            thumbnail: video.fileInfo2.thumbsFilePath
        };
        axios.post('/api/video/uploadVideo', variables)
            .then(res => {
                if(res.data.success) {
                    message.success('비디오가 업로드되었습니다.');
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else {
                    alert('비디오 업로드에 실패했습니다.');
                }
            })
    }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDropVideo}
                        multiple={false}
                        maxSize={100000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <PlusOutlined style={{ fontSize: '3rem' }}/>
                            </div>
                        )}
                    </Dropzone>
                    {video.fileInfo2 &&
                        <div>
                            <img src={`http://localhost:5000/${video.fileInfo2.thumbsFilePath}`} alt="Thumbnail" />
                        </div>
                    }
                </div>
                <br /><br />
                <label>Title</label>
                <Input 
                    onChange={onChangeVideoTitle}
                    value={VideoTitle}
                />
                <br /><br />
                <label>Description</label>
                <TextArea 
                    onChange={onChangeDecsription}
                    value={Description}
                />
                <br /><br />
                <select onChange={onChangePrivate}>
                    {PrivateOption.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />
                <select onChange={onChangeCategory}>
                    {CategoryOption.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
    </div>
  );
};

export default VideoUploadPage;