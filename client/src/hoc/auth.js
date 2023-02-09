import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { authUser } from '../_actions/user_action';
import { useNavigate } from "react-router-dom";

export default function(SpecificComponent, option, isAdmin = null) {
    // option
    // null => 아무나 출입 가능한 페이지
    // true => 로그인한 유저만 출입 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지

    function AuthCheck() {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        
        useEffect(() => {
            dispatch(authUser()).then(res => {
                if (!res.payload.isAuth) {
                    if(option) {
                        navigate('/login');
                    }
                } else {
                    if (isAdmin && !res.payload.isAdmin) {
                        navigate('/');
                    } else {
                        if (option === false) {
                            navigate('/');
                        }
                    }
                }
            });
        }, []);
        return (
            <SpecificComponent />
        );
    };
    return AuthCheck;
};