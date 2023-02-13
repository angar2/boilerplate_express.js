import React, {useEffect, useState} from 'react';
import axios from 'axios';

function SideVideos() {

    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
        .then(res => {
            if (res.data.success) {
                setVideos(res.data.videos);
            } else {
                alert('Failed to get Videos');
            }
        });
    }, []);

    const sideVideosItem = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

       return (
            <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
                <div style={{ width:'40%', marginRight:'1rem', position: 'relative'}}>
                    <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
                        <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                        <div className="duration"
                            style={{
                                bottom: 2, right:0, position: 'absolute', margin: '4px', 
                                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                                padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'10px',
                                fontWeight:'500', lineHeight:'12px'
                            }}
                        >
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </a>
                </div>

                <div style={{ width:'50%' }}>
                    <a href={`/video/${video._id}`} style={{ color:'gray', fontSize: '0.7rem'}}>
                        <span style={{color: 'black'}}>{video.title}  </span><br />
                        <span>{video.writer.name}</span><br />
                        <span>조회수 {video.views}</span><br />
                    </a>
                </div>
            </div>
       )
    });

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {sideVideosItem}
        </React.Fragment> 
    );
};

export default SideVideos;