import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Subscribe(props) {

    const [SubscribeCount, setSubscribeCount] = useState(0);
    const [Subscribing, setSubscribing] = useState(false);

    let variables = {
        subscriber: props.subscriber,
        subscribing : localStorage.getItem('user_id')
    };

    useEffect(() => {
        axios.post('/api/subscribe/subscribeCount', variables)
        .then(res => {
            if(res.data.success) {
                setSubscribeCount(res.data.subscribers);
            } else {
                alert('구독자 정보 불러오기를 실패했습니다.');
            }
        });
    
        axios.post('/api/subscribe/isSubscribing', variables)
        .then(res => {
            if(res.data.success) {
                setSubscribing(res.data.isSubscribing);
            } else {
                alert('구독 정보 불러오기를 실패했습니다.');
            }
        });
    }, []);
    

    return (
        <div>
            <button 
                style={{
                    backgroundColor: `${Subscribing ? '#AAAAAA' : '#CC0000'}`, color: 'white',
                    padding: '10px 16px', borderRadius: '4px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {SubscribeCount} {Subscribing ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    );
};

export default Subscribe;