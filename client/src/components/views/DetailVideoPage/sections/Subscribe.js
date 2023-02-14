import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Subscribe(props) {

    const [SubscribeCount, setSubscribeCount] = useState(0);
    const [Subscribing, setSubscribing] = useState(false);

    let variables = {
        subscribed: props.subscribed,
        subscriber: localStorage.getItem('user_id')
    };
    const subscribe = () => {

        if(Subscribing) {
            axios.post('/api/subscribe/unSubscribe', variables)
            .then(res => {
                if(res.data.success) {
                    setSubscribeCount(SubscribeCount - 1);
                    setSubscribing(!Subscribing);
                } else {
                    alert('구독 취소를 실패했습니다.');
                }
            });
        } else {
            axios.post('/api/subscribe/subscribe', variables)
            .then(res => {
                if(res.data.success) {
                    setSubscribeCount(SubscribeCount + 1);
                    setSubscribing(!Subscribing);
                } else {
                    alert('구독을 실패했습니다.');
                }
            });
        }
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
    
        axios.post('/api/subscribe/isSubscriber', variables)
        .then(res => {
            if(res.data.success) {
                setSubscribing(res.data.isSubscriber);
            } else {
                alert('구독 정보 불러오기를 실패했습니다.');
            }
        });
    }, []);
    

    return (
        <div>
            <button 
                onClick={subscribe}
                style={{
                    backgroundColor: `${Subscribing ? '#AAAAAA' : '#CC0000'}`, color: 'white',
                    padding: '10px 16px', borderRadius: '4px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {SubscribeCount} {Subscribing ? 'UnSubscribe' : 'Subscribe'}
            </button>
        </div>
    );
};

export default Subscribe;