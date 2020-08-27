import React, {useEffect, useState} from 'react';

import {fetchJson} from './apiService'

export const RandomUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const randomUserApiUrl = 'https://randomuser.me/api';
        fetchJson(randomUserApiUrl).then(
            response => {
                setUserInfo(response.results[0])
            }
        ); // go on working with a single user
    }, []);
    return userInfo && (
        <>
            <h2>Some random user Info</h2>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>profile picture</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{Object.values(userInfo.name).join(' ')}</td>
                    <td>{userInfo.email}</td>
                    <td>
                        <img src={userInfo.picture.thumbnail}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
};