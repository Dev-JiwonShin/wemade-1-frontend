// src/components/WalletConnector.js
import React, {useState} from 'react';
import {Button, Modal, notification} from 'antd';
import {useWeb3} from '../context/Web3Provider';
import Web3 from "web3";

const WalletConnector = () => {
    const web3 = useWeb3();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const connectWallet = async () => {
        if (!web3) { // web3 인스턴스의 존재 여부를 확인
            notification.error({
                message: 'Wallet Connection Error',
                description: '메타마스크를 설치해주세요',
            });
            return;
        }

        try {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log('accounts:', accounts);
            if (accounts.length === 0) {
                notification.error({
                    message: 'No Accounts Found',
                    description: '이더리움 지갑이 연결되었는지 확인해주세요. 잠금해제되었는지 확인해주세요.',
                });
            } else {
                console.log('Connected account:', accounts[0]);
                notification.success({
                    message: 'Wallet Connected',
                    description: `Connected with account: ${accounts[0]}`,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Wallet Connection Error',
                description: '지갑 연결에 실패했습니다. 다시 시도해주세요.',
            });
            console.error('Error connecting to wallet:', error);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        connectWallet();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                지갑 연결하기
            </Button>
            <Modal title="Confirm Signature" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>이더리움 지갑으로 연결하시겠습니까?</p>
            </Modal>
        </>
    );
};

export default WalletConnector;
