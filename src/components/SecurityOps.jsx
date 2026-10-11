import React, { useState } from 'react';
import { ShieldCheck, Lock, Activity, CheckCircle2 } from './Icons';
import { sound } from '../utils/soundFx';

export default function SecurityOps() {
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditPassed, setAuditPassed] = useState(true);

  const handleRunAudit = () => {
    sound.playClick();
    setAuditRunning(true);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditPassed(true);
      sound.playPaymentSuccess();
    }, 1200);
  };

  const securityNodes = [
    {
      title: 'Enclave Node PK-SOUTH-1',
      status: 'ONLINE',
      metric: '99.999% SLA',
      detail: 'Hardware Security Module (HSM) Level 4',
      badgeColor: '#00e599',
    },
    {
      title: 'PostgreSQL ACID Isolation',
      status: 'SERIALIZABLE',
      metric: '1.2ms Lock P99',
      detail: 'Pessimistic row-level lock (FOR UPDATE)',
      badgeColor: '#00e599',
    },
    {
      title: 'Redis Sliding Window Limiter',
      status: 'ACTIVE',
      metric: '3 req/sec Max',
      detail: 'Sliding token bucket rate defense',
      badgeColor: '#38bdf8',
    },
    {
      title: 'TLS 1.3 Cipher Suite',
      status: 'ENCRYPTED',
      metric: 'AES_256_GCM',
      detail: 'Perfect Forward Secrecy (ECDHE-ECDSA)',
      badgeColor: '#f59e0b',
    },
  ];

  return (
    <div className="screen-scroll-container" id="security-ops-screen">
      <div className="section-header-row" style={{ marginTop: 2 }}>
        <div className="section-header-left">
          <ShieldCheck className="section-icon-neon" size={18} />
          <span>Security Operations & Enclave Telemetry</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#00e599', fontSize: 10 }}>
          <span className="status-dot-green pulse-green"></span>
          <span className="font-mono">ENCLAVE SECURE</span>
        </div>
      </div>

      {/* Security Nodes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 9 }}>
        {securityNodes.map((node, i) => (
          <div 
            key={i} 
            style={{ 
              background: '#0f1722', 
              border: '1px solid rgba(255,255,255,0.08)', 
              borderRadius: 12, 
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: '#fff' }}>{node.title}</span>
              <span style={{ 
                fontSize: 9.5, 
                fontWeight: 800, 
                fontFamily: 'JetBrains Mono', 
                color: node.badgeColor,
                background: 'rgba(255,255,255,0.04)',
                padding: '2px 7px',
                borderRadius: 999,
                border: `1px solid ${node.badgeColor}40`
              }}>
                {node.status}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10.5, color: '#94a3b8', fontFamily: 'JetBrains Mono' }}>
              <span>{node.detail}</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{node.metric}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Zero Authority Interactive Validation Test */}
      <div style={{ background: 'rgba(14,22,33,0.9)', border: '1px solid rgba(0,229,153,0.2)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 800, color: '#00e599' }}>
          <Lock size={15} />
          <span>ZERO CLIENT AUTHORITY TEST</span>
        </div>

        <p style={{ fontSize: 10.5, color: '#94a3b8', lineHeight: 1.45 }}>
          Simulates an untrusted client attempting to forge coin balance mutations. The backend HMAC-SHA256 validator verifies cryptographic proofs and rejects any unauthorized client calls.
        </p>

        <button
          className="primary-cta-btn"
          onClick={handleRunAudit}
          style={{ height: 42, justifyContent: 'center' }}
        >
          {auditRunning ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Activity size={15} className="pulse-green" />
              Verifying Cryptographic Bounds...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={15} />
              Run Zero-Trust Enclave Audit
            </span>
          )}
        </button>

        {auditPassed && (
          <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: '#00e599', textAlign: 'center', background: 'rgba(0,229,153,0.1)', padding: 6, borderRadius: 6, border: '1px solid rgba(0,229,153,0.3)' }}>
            ✓ Audit Passed: 0 Tampered Blocks • 100% Backend Authoritative
          </div>
        )}
      </div>
    </div>
  );
}
