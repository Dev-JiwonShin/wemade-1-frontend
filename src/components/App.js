// src/components/App.js
import React from 'react';
import '../styles/App.css';
import WalletConnector from './WalletConnector';
import TransactionManager from './TransactionManager';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <WalletConnector />
          <TransactionManager />
        </header>
      </div>
  );
}

export default App;
