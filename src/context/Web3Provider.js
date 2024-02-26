// src/context/Web3Provider.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import Web3 from 'web3';

const Web3Context = createContext(null);

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({children}) => {
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            console.log('web3Instance:', web3Instance);
            setWeb3(web3Instance);
        } else {
            alert('메타마스크가 설치되어 있지 않습니다. 설치해주세요.');
        }
    }, []);
    return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};