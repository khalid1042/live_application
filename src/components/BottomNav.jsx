import React from 'react';
import { Radio, CreditCard, ReceiptText, ShieldCheck } from './Icons';
import { sound } from '../utils/soundFx';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'live', label: 'Live Room', icon: Radio },
    { id: 'buy', label: 'Buy Coins', icon: CreditCard },
    { id: 'ledger', label: 'Bank Ledger', icon: ReceiptText },
    { id: 'security', label: 'Security Ops', icon: ShieldCheck },
  ];

  const handleTabClick = (id) => {
    sound.playSelect();
    setActiveTab(id);
  };

  return (
    <nav className="bottom-nav-wrapper" id="bottom-nav-container">
      <div className="bottom-nav-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              className={`nav-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <Icon className="nav-tab-icon" strokeWidth={isActive ? 2.3 : 1.8} />
              <span className="nav-tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="bottom-tx-intent-bar" id="tx-intent-uuid-bar">
        TX INTENT UUID: c0e1e29d-7b9e-4d62-91f8...
      </div>
    </nav>
  );
}
