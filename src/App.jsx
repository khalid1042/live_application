import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import CoinVault from './components/CoinVault';
import LiveRoom from './components/LiveRoom';
import BankLedger from './components/BankLedger';
import SecurityOps from './components/SecurityOps';
import PaymentModal from './components/PaymentModal';
import ProfileModal from './components/ProfileModal';
import { Monitor } from './components/Icons';
import './App.css';

function App() {
  // Tab state: 'buy' matches Image 1, 'live' matches Image 2
  const [activeTab, setActiveTab] = useState('buy');
  const [balance, setBalance] = useState(4250);
  const [currency, setCurrency] = useState('PKR');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Initial Bank Ledger history
  const [ledgerEntries, setLedgerEntries] = useState([
    {
      type: 'MINT_ALLOCATION',
      title: 'Mint: Broadcast Streamer Booster',
      amount: 1200,
      txId: '0x8bf2...49e1',
      enclave: 'PK-SOUTH-1',
      protocol: 'POSTGRES_ACID_COMMIT',
      timestamp: '12:41:09',
    },
    {
      type: 'GIFT_DISPATCH',
      title: 'Dispatched Holo Crown (1x)',
      amount: -500,
      txId: '0x4a7c...98f',
      enclave: 'PK-SOUTH-1',
      protocol: 'PESSIMISTIC_LOCK',
      timestamp: '12:40:12',
    },
    {
      type: 'MINT_ALLOCATION',
      title: 'Mint: Starter Vault Allocation',
      amount: 500,
      txId: '0x12c4...e059',
      enclave: 'PK-SOUTH-1',
      protocol: 'POSTGRES_ACID_COMMIT',
      timestamp: '12:35:48',
    },
    {
      type: 'MINT_ALLOCATION',
      title: 'Initial Reserve Allocation',
      amount: 3050,
      txId: '0x99a1...1002',
      enclave: 'PK-SOUTH-1',
      protocol: 'GENESIS_BLOCK',
      timestamp: '12:00:00',
    },
  ]);

  const handleAddLedgerEntry = (newEntry) => {
    setLedgerEntries((prev) => [newEntry, ...prev]);
  };

  const handleInitializePayment = (data) => {
    setPaymentData(data);
  };

  const handleCompletePayment = (addedCoins) => {
    setBalance((prev) => prev + addedCoins);
    handleAddLedgerEntry({
      type: 'MINT_ALLOCATION',
      title: `Mint: ${paymentData?.package?.title || 'Coin Package'}`,
      amount: addedCoins,
      txId: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
      enclave: 'PK-SOUTH-1',
      protocol: 'POSTGRES_ACID_COMMIT',
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  const [viewMode, setViewMode] = useState('desktop');

  return (
    <div className={`app-viewport ${viewMode === 'desktop' ? 'is-desktop-mode' : 'is-phone-mode'}`}>
      <div 
        className={`mobile-frame ${viewMode === 'desktop' ? 'desktop-expanded' : 'phone-enclosure'}`} 
        id="app-mobile-frame"
      >
        {/* Global VaultStream Header */}
        <Header 
          balance={balance} 
          onOpenVault={() => setActiveTab('buy')}
          onOpenProfile={() => setIsProfileOpen(true)}
          isAudioMuted={isAudioMuted}
          setIsAudioMuted={setIsAudioMuted}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Tab 1: Live Stream Room (Image 2) */}
        {activeTab === 'live' && (
          <LiveRoom 
            balance={balance}
            setBalance={setBalance}
            onTopUpClick={() => setActiveTab('buy')}
            onAddLedgerEntry={handleAddLedgerEntry}
          />
        )}

        {/* Tab 2: Buy Coins / Official Coin Vault (Image 1) */}
        {activeTab === 'buy' && (
          <CoinVault 
            balance={balance}
            onInitializePayment={handleInitializePayment}
            currency={currency}
            setCurrency={setCurrency}
          />
        )}

        {/* Tab 3: Double-Entry Bank Ledger */}
        {activeTab === 'ledger' && (
          <BankLedger 
            ledgerEntries={ledgerEntries}
          />
        )}

        {/* Tab 4: Security Operations Telemetry */}
        {activeTab === 'security' && (
          <SecurityOps />
        )}

        {/* Global Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Interactive Payment Checkout Modal */}
        {paymentData && (
          <PaymentModal 
            paymentData={paymentData}
            onClose={() => setPaymentData(null)}
            onCompletePayment={handleCompletePayment}
          />
        )}

        {/* Interactive User Profile & Cryptographic Identity Modal */}
        <ProfileModal 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          balance={balance}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* When in Phone Enclosure mode on desktop screens, provide floating switcher */}
      {viewMode === 'mobile' && (
        <button 
          className="phone-mode-switch-badge" 
          onClick={() => setViewMode('desktop')}
          title="Switch back to Full Desktop Dashboard"
          id="btn-floating-switch-desktop"
        >
          <Monitor size={14} color="#00e599" />
          <span>Switch to Desktop View</span>
        </button>
      )}
    </div>
  );
}

export default App;
