// ./index.js
/**
 * 지원포지션 : 프론트엔드 개발(WemixPlay, una 서비스, 백오피스)
 * 팁1 : 본인이 작성한 자신의 코딩스타일과 기술을 잘 표현할 수 있는 소스코드를 전달 부탁 드립니다.
 * 팁2 : react.js, antd, web3.js 사용을 권장함.
 *
 * 1. web3.js 기능 개발
 *     요구사항 : 지갑 연결, 서명(서명 전 요청정보 노출 팝업), 트랜젝션 요청, 성공여부
 *
 * 2. CRUD 화면 구현
 *     요구사항 : 사용자 관리기능(react.js 대용량 처리 기술)
 *
 * 제출기한/제출처: 2/27(화) 오후까지, 본 메일에 회신 (wm_recruit@wemade.com)
 * 제출 방법 :
 *      git 주소 또는 zip 파일로 제출, readme에 실행방법 작성 부탁드립니다.
 *      파일로 제출하시면 되며, 컴파일은 안 하셔도 됩니다.
 * */

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import App from './components/App';
import { Web3Provider } from './context/Web3Provider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Web3Provider>
            <App />
        </Web3Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
