// src/components/TransactionManager.js
import React, {useEffect, useState} from 'react';
import {Button, Modal, Input, notification, Spin} from 'antd';
import {useWeb3} from '../context/Web3Provider';

const TransactionManager = () => {
    const web3 = useWeb3();
    const [isModalVisible, setIsModalVisible] = useState(false); // 트랜잭션 모달창 표시 상태 관리
    const [isLoading, setIsLoading] = useState(false);  // 트랜잭션 처리 중 로딩 상태 관리
    const [transactionHash, setTransactionHash] = useState(''); // 트랜잭션 성공 후 해시값 저장
    const [senderAddress, setSenderAddress] = useState(''); // 송금자 주소 상태 관리
    const [address, setAddress] = useState(''); // 수신자 주소 상태 관리
    const [amount, setAmount] = useState(''); // 송금액 상태 관리

    // 계정 변경 시 송금자 주소 업데이트하는 useEffect 훅
    useEffect(() => {
        const updateAccounts = (accounts) => {
            if (accounts.length > 0) {
                setSenderAddress(accounts[0]);
            }
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', updateAccounts);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', updateAccounts);
            }
        };
    }, []);

    // 트랜잭션 모달창 표시 함수
    const showModal = async () => {
        if (!web3) {
            notification.error({
                message: 'Web3 Not Initialized', description: '지갑 연결 먼저 해주세요',
            });
            return;
        }

        setIsModalVisible(true); // 모달창 열기

        const accounts = await web3.eth.getAccounts(); // 사용자 계정 가져오기
        if (accounts.length > 0) {
            setSenderAddress(accounts[0]); // 첫 번째 계정을 senderAddress 상태에 저장
        } else {
            // 계정이 없는 경우, 사용자에게 알림
            notification.error({
                message: 'No Accounts Found', description: '지갑 연결 먼저 해주세요',
            });
        }
    };

    // 트랜잭션 모달창에서 submit 버튼 클릭 시 호출되는 함수
    const handleOk = () => {
        sendTransaction();
    };

    // 트랜잭션 모달창 닫기 함수
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 트랜잭션 전송 함수
    const sendTransaction = async () => {
        if (!web3) {
            notification.error({
                message: 'Web3가 초기화되지 않았습니다', description:'지갑 연결 먼저 해주세요',
            });
            return;
        }

        setIsLoading(true);

        try {
            const accounts = await web3.eth.getAccounts();
            setSenderAddress(accounts[0]); // 발신자 주소 저장
            const gasPrice = await web3.eth.getGasPrice(); // 가스 가격 조회
            const gasLimit = await web3.eth.estimateGas({ // 가스 한도 추정
                from: accounts[0],
                to: address,
                value: web3.utils.toWei(amount, 'ether'),
            });

            const txHash = await web3.eth.sendTransaction({ // 트랜잭션 전송
                from: accounts[0],
                to: address,
                value: web3.utils.toWei(amount, 'ether'),
                gasPrice,
                gas: gasLimit,
            });

            setTransactionHash(txHash.transactionHash); // 트랜잭션 해시값 저장
            notification.success({
                message: 'Transaction Successful', description: `Transaction hash: ${txHash.transactionHash}`,
            });
        } catch (error) {
            notification.error({
                message: 'Transaction Failed', description: error.message,
            });
        } finally {
            setIsLoading(false); // 로딩 상태 종료
            setIsModalVisible(false); // 모달창 닫기
        }
    };

    return ( // UI 렌더링
        <>
            <Button type="primary" onClick={showModal} style={{marginTop: '20px'}}>
                송금하기
            </Button>
            <Modal title="Send Transaction" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                   footer={null}>
                <Spin spinning={isLoading} tip="Processing..."> {/*// 로딩 상태에 따라 스핀 표시*/}
                    <Input
                        placeholder="From Address"
                        value={senderAddress}
                        disabled
                        style={{marginBottom: '10px'}}
                    />
                    <Input
                        placeholder="To Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={isLoading} // 로딩 상태에 따라 'To Address' 입력 필드 비활성화
                        style={{marginBottom: '10px'}}
                    />
                    <Input
                        placeholder="Amount (ETH)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={isLoading} // 로딩 상태에 따라 'Amount' 입력 필드 비활성화
                    />
                    <div style={{marginTop: '20px', textAlign: 'right'}}>
                        <Button key="back" onClick={handleCancel} style={{marginRight: '10px'}}>
                            Cancel
                        </Button>
                        <Button key="submit" type="primary" onClick={handleOk} disabled={isLoading}>
                            Submit
                        </Button>
                    </div>
                </Spin>
            </Modal>
            {transactionHash && (<p style={{marginTop: '20px'}}>Transaction Hash: {transactionHash}</p>)}
        </>
    );
};

export default TransactionManager;