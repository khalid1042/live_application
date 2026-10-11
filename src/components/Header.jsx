import React from 'react';
import { Lock, Volume2, VolumeX, Smartphone, Monitor, Radio, CreditCard, ReceiptText, ShieldCheck } from './Icons';
import { sound } from '../utils/soundFx';

export default function Header({ 
  balance, 
  onOpenVault, 
  onOpenProfile,
  isAudioMuted, 
  setIsAudioMuted,
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode
}) {
  const toggleAudio = (e) => {
    e.stopPropagation();
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    sound.enabled = !nextState;
    if (!nextState) sound.playClick();
  };

  const desktopTabs = [
    { id: 'live', label: 'Live Room', icon: Radio },
    { id: 'buy', label: 'Buy Coins', icon: CreditCard },
    { id: 'ledger', label: 'Bank Ledger', icon: ReceiptText },
    { id: 'security', label: 'Security Ops', icon: ShieldCheck },
  ];

  const handleTabClick = (tabId) => {
    sound.playSelect();
    setActiveTab(tabId);
  };

  const toggleViewMode = () => {
    sound.playClick();
    setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop');
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    sound.playSelect();
    if (onOpenProfile) {
      onOpenProfile();
    } else if (onOpenVault) {
      onOpenVault();
    }
  };

  return (
    <header className="global-header" id="global-header">
      {/* Brand & TLS Node */}
      <div className="brand-section" id="brand-logo-area">
        <div className="brand-logo-icon">
          <svg className="brand-logo-hex" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 29,9.5 29,24.5 16,32 3,24.5 3,9.5" stroke="#00e599" strokeWidth="2.5" fill="#00e599" fillOpacity="0.12" />
            <circle cx="16" cy="17" r="4.5" fill="#00e599" />
            <path d="M16 6 L16 12.5 M25 21 L19.5 19 M7 21 L12.5 19" stroke="#00e599" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div className="brand-info">
          <span className="brand-title">VaultStream</span>
          <div className="brand-node-status">
            <span className="status-dot-green pulse-green"></span>
            <span className="font-mono">TLS 1.3 NODE</span>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar (Visible only when in desktop dashboard mode) */}
      {viewMode === 'desktop' && (
        <nav className="desktop-header-nav" id="desktop-header-nav">
          {desktopTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`desktop-tab-${tab.id}`}
                className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <Icon size={16} strokeWidth={isActive ? 2.3 : 1.8} />
                <span>{tab.label}</span>
                {isActive && <div className="desktop-nav-glow-indicator" />}
              </button>
            );
          })}
        </nav>
      )}

      {/* Right Controls: Audio Toggle, Balance, Avatar */}
      <div className="header-right">
        {/* Device View Mode Toggle: shown in header only when in desktop mode */}
        {viewMode === 'desktop' && (
          <button 
            className="view-mode-toggle-btn"
            onClick={toggleViewMode}
            title="Switch to Phone Frame view"
            id="btn-toggle-view-mode"
          >
            <Smartphone size={13} color="#00e599" />
            <span className="view-mode-label">Mobile View</span>
          </button>
        )}

        <button 
          className="audio-toggle-btn" 
          onClick={toggleAudio} 
          title={isAudioMuted ? "Unmute Sound FX" : "Mute Sound FX"}
          id="audio-toggle-btn"
          aria-label="Toggle Audio FX"
        >
          {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <div 
          className="balance-pill" 
          onClick={onOpenVault} 
          id="header-balance-pill" 
          title="Click to view Coin Vault"
          role="button"
          tabIndex={0}
        >
          <svg className="coin-icon-gold" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" fill="#f59e0b" />
          </svg>
          <span className="balance-amount font-mono">
            {balance.toLocaleString()}
          </span>
          <Lock className="balance-lock-icon" size={12} />
        </div>

        {/* User Profile Avatar Button - Always visible & prominent in mobile & desktop */}
        <button 
          className="header-avatar-btn" 
          id="header-avatar-btn" 
          onClick={handleAvatarClick}
          title="View Cryptographic Identity & User Profile"
          aria-label="User Profile"
        >
          <img 
            src="/streamer_avatar.png" 
            alt="User Profile Avatar" 
            className="header-avatar-img"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&auto=format&fit=crop&q=80';
            }}
          />
          <span className="avatar-online-dot pulse-green"></span>
        </button>
      </div>
    </header>
  );
}
