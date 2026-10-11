import React, { useState, useEffect } from 'react';
import { Shield, Lock, CheckCircle2, ArrowRight, X, Smartphone, CreditCard, Wallet, Cpu, Key } from './Icons';
import { sound } from '../utils/soundFx';
import { fireMintSuccessConfetti } from '../utils/confetti';

export default function PaymentModal({ 
  paymentData, 
  onClose, 
  onCompletePayment 
}) {
  const [stage, setStage] = useState('input'); // 'input' | 'tunnel' | 'success'
  const [accountNumber, setAccountNumber] = useState('0300-1234567');
  const [otpPin, setOtpPin] = useState('9482');
  const [tunnelProgress, setTunnelProgress] = useState(0);

  const { package: pkg, gateway, formattedPrice, currency } = paymentData;

  const handleStartHandshake = (e) => {
    e.preventDefault();
    sound.playClick();
    setStage('tunnel');
    setTunnelProgress(10);

    const interval = setInterval(() => {
      setTunnelProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('success');
          sound.playPaymentSuccess();
          fireMintSuccessConfetti();
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  const handleFinalize = () => {
    sound.playSelect();
    onCompletePayment(pkg.coins);
    onClose();
  };

  return (
    <div className="modal-backdrop" id="payment-modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-panel" 
        id="payment-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(0,229,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e599' }}>
              <Lock size={15} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                {stage === 'success' ? 'Payment Verified & Minted' : 'Secure Enclave Tunnel'}
              </div>
              <div style={{ fontSize: 9.5, color: '#00e599', fontFamily: 'JetBrains Mono', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="status-dot-green pulse-green"></span>
                HMAC-SHA256 • 3D-SECURE 2.2
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ color: '#94a3b8', padding: 4, cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Stage 1: Input Account Details */}
        {stage === 'input' && (
          <form onSubmit={handleStartHandshake} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Summary Box */}
            <div style={{ background: '#090e15', borderRadius: 10, padding: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
                <span>Package Allocation:</span>
                <span style={{ color: '#fff', fontWeight: 700 }}>{pkg.coins.toLocaleString()} Coins</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, color: '#fff', marginTop: 4 }}>
                <span>Total Authorization:</span>
                <span style={{ color: '#00e599', fontFamily: 'JetBrains Mono' }}>{formattedPrice}</span>
              </div>
            </div>

            {/* Gateway Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: '#e2e8f0', background: 'rgba(0,229,153,0.08)', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(0,229,153,0.2)' }}>
              {gateway === 'jazzcash' && <Smartphone size={16} color="#ef4444" />}
              {gateway === 'easypaisa' && <Wallet size={16} color="#10b981" />}
              {gateway === 'stripe' && <CreditCard size={16} color="#f59e0b" />}
              <span style={{ textTransform: 'capitalize' }}>
                {gateway} Direct Webhook Tunnel
              </span>
            </div>

            {/* Inputs */}
            <div>
              <label style={{ fontSize: 10.5, color: '#94a3b8', display: 'block', marginBottom: 4 }}>
                {gateway === 'stripe' ? 'Card Number (256-bit AES Tokenized)' : 'Mobile Account Number'}
              </label>
              <input 
                type="text" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', background: '#080c13', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 13 }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 10.5, color: '#94a3b8', display: 'block', marginBottom: 4 }}>
                {gateway === 'stripe' ? 'CVV Security Code' : 'MPIN / One-Time Authorization OTP'}
              </label>
              <input 
                type="password" 
                value={otpPin}
                onChange={(e) => setOtpPin(e.target.value)}
                maxLength={6}
                style={{ width: '100%', padding: '9px 12px', background: '#080c13', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#00e599', fontFamily: 'JetBrains Mono', fontSize: 14, letterSpacing: 4 }}
                required
              />
            </div>

            <button 
              type="submit" 
              className="primary-cta-btn" 
              style={{ marginTop: 6, height: 46, justifyContent: 'center' }}
            >
              <span>Authorize & Dispatch Webhook</span>
              <ArrowRight size={16} style={{ marginLeft: 6 }} />
            </button>
          </form>
        )}

        {/* Stage 2: Handshake In Flight */}
        {stage === 'tunnel' && (
          <div style={{ textAlign: 'center', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
            <Cpu size={40} color="#00e599" className="pulse-green" />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Establishing Zero-Trust Enclave Tunnel</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                Verifying HMAC-SHA256 signature with bank gateway...
              </div>
            </div>

            <div className="progress-track-sleek" style={{ width: '80%', height: 8 }}>
              <div className="progress-fill-neon" style={{ width: `${tunnelProgress}%` }}></div>
            </div>

            <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: '#00e599' }}>
              Latency: 2.1s • Status: SERIALIZABLE_COMMIT_PENDING
            </div>
          </div>
        )}

        {/* Stage 3: Success Confirmation */}
        {stage === 'success' && (
          <div style={{ textAlign: 'center', padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(0,229,153,0.15)', border: '2px solid #00e599', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={30} color="#00e599" />
            </div>

            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
                +{pkg.coins.toLocaleString()} Coins Minted!
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>
                Atomic database transaction committed successfully via PostgreSQL ACID protocol.
              </div>
            </div>

            {/* Cryptographic Receipt Box */}
            <div style={{ width: '100%', background: '#090e15', borderRadius: 8, padding: 10, border: '1px solid rgba(0,229,153,0.2)', textAlign: 'left', fontFamily: 'JetBrains Mono', fontSize: 10 }}>
              <div style={{ color: '#64748b' }}>TxID: <span style={{ color: '#00e599' }}>0x8bf2...49e1</span></div>
              <div style={{ color: '#64748b', marginTop: 2 }}>HMAC: <span style={{ color: '#f59e0b' }}>7d2e9...a1b4</span></div>
              <div style={{ color: '#64748b', marginTop: 2 }}>Enclave: <span style={{ color: '#38bdf8' }}>PK-SOUTH-1</span></div>
            </div>

            <button 
              className="primary-cta-btn" 
              onClick={handleFinalize}
              style={{ width: '100%', height: 46, justifyContent: 'center' }}
            >
              <span>Return to Vault</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
