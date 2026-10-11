import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Key, 
  Copy, 
  Check, 
  Radio, 
  CreditCard, 
  ReceiptText, 
  Shield, 
  Zap, 
  Lock 
} from './Icons';
import { sound } from '../utils/soundFx';

export default function ProfileModal({ 
  isOpen, 
  onClose, 
  balance, 
  setActiveTab 
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    sound.playSelect();
    navigator.clipboard?.writeText('0x7a89e14f9d2cc0e1e29dc4b299e1a04');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateTo = (tab) => {
    sound.playSelect();
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="modal-backdrop-blur" onClick={onClose} id="profile-modal-backdrop">
      <div 
        className="profile-modal-card" 
        onClick={(e) => e.stopPropagation()}
        id="profile-modal-content"
      >
        {/* Header */}
        <div className="profile-modal-header">
          <div className="profile-modal-header-left">
            <div className="profile-badge-hex">
              <ShieldCheck size={16} color="#00e599" />
            </div>
            <div>
              <span className="profile-modal-title">CRYPTOGRAPHIC IDENTITY</span>
              <span className="profile-modal-sub font-mono">ENCLAVE ATTESTATION #882</span>
            </div>
          </div>
          <button 
            className="profile-close-btn" 
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            id="btn-close-profile-modal"
            aria-label="Close Profile"
          >
            <X size={16} color="#94a3b8" />
          </button>
        </div>

        {/* User Identity Banner */}
        <div className="profile-identity-banner">
          <div className="profile-avatar-wrapper">
            <img 
              src="/streamer_avatar.png" 
              alt="User Profile" 
              className="profile-large-avatar"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=160&auto=format&fit=crop&q=80';
              }}
            />
            <span className="profile-online-glow pulse-green"></span>
          </div>

          <div className="profile-user-details">
            <div className="profile-name-row">
              <h3>@Cipher_Operative</h3>
              <CheckCircle2 size={16} fill="#00e599" color="#06090d" />
            </div>
            <p className="profile-role-tag">Zero-Trust Vault Owner • Level 42</p>
            <div className="profile-pills-row">
              <span className="profile-status-pill green">
                <span className="pulse-green status-dot-green"></span>
                TLS 1.3 Certified
              </span>
              <span className="profile-status-pill gold">
                Tier 2 KYC Unlocked
              </span>
            </div>
          </div>
        </div>

        {/* Vault Balance & Limits Card */}
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <div className="profile-stat-label">
              <span>PRIMARY RESERVE</span>
              <Lock size={12} color="#f59e0b" />
            </div>
            <div className="profile-stat-value font-mono">
              <span className="gold-text">{balance.toLocaleString()}</span>
              <span className="unit-label">COINS</span>
            </div>
            <div className="profile-stat-footnote">Synced via PostgreSQL ACID</div>
          </div>

          <div className="profile-stat-box">
            <div className="profile-stat-label">
              <span>24H LIMIT REMAINING</span>
              <Zap size={12} color="#00e599" />
            </div>
            <div className="profile-stat-value font-mono">
              <span>PKR 75,000</span>
            </div>
            <div className="profile-stat-footnote">Resets in 6h 14m</div>
          </div>
        </div>

        {/* Cryptographic Public Enclave Key */}
        <div className="profile-enclave-key-box">
          <div className="enclave-key-top">
            <div className="enclave-key-label">
              <Key size={13} color="#06b6d4" />
              <span>Public Enclave Key (ECDSA P-256)</span>
            </div>
            <button 
              className="copy-key-btn" 
              onClick={handleCopyKey}
              id="btn-copy-enclave-key"
            >
              {copied ? (
                <>
                  <Check size={12} color="#00e599" />
                  <span style={{ color: '#00e599' }}>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} color="#94a3b8" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="enclave-key-string font-mono">
            0x7a89e14f9d2cc0e1e29dc4b299e1a04...
          </div>
        </div>

        {/* Zero-Trust Hardware Telemetry */}
        <div className="profile-security-specs">
          <div className="security-spec-item">
            <span className="spec-bullet green"></span>
            <span className="spec-name">HSM Hardware Attestation:</span>
            <span className="spec-val font-mono">Intel SGX Active</span>
          </div>
          <div className="security-spec-item">
            <span className="spec-bullet green"></span>
            <span className="spec-name">Transaction Isolation:</span>
            <span className="spec-val font-mono">SERIALIZABLE</span>
          </div>
          <div className="security-spec-item">
            <span className="spec-bullet cyan"></span>
            <span className="spec-name">Node Region:</span>
            <span className="spec-val font-mono">PK-SOUTH-1 (84ms)</span>
          </div>
        </div>

        {/* Quick Navigation Shortcuts */}
        <div className="profile-shortcuts-header">
          <span>QUICK ACTIONS</span>
        </div>
        <div className="profile-shortcuts-grid">
          <button 
            className="profile-shortcut-btn"
            onClick={() => navigateTo('buy')}
            id="profile-quick-buy"
          >
            <CreditCard size={15} color="#00e599" />
            <span>Top Up Coins</span>
          </button>
          <button 
            className="profile-shortcut-btn"
            onClick={() => navigateTo('live')}
            id="profile-quick-live"
          >
            <Radio size={15} color="#ec4899" />
            <span>Live Stream</span>
          </button>
          <button 
            className="profile-shortcut-btn"
            onClick={() => navigateTo('ledger')}
            id="profile-quick-ledger"
          >
            <ReceiptText size={15} color="#f59e0b" />
            <span>Bank Ledger</span>
          </button>
          <button 
            className="profile-shortcut-btn"
            onClick={() => navigateTo('security')}
            id="profile-quick-security"
          >
            <Shield size={15} color="#06b6d4" />
            <span>Security Ops</span>
          </button>
        </div>
      </div>
    </div>
  );
}
