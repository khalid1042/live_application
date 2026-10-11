import React, { useState } from 'react';
import { ReceiptText, Shield, ArrowUpRight, ArrowDownLeft, CheckCircle2, ShieldCheck, Database } from './Icons';
import { sound } from '../utils/soundFx';

export default function BankLedger({ ledgerEntries }) {
  const [filterType, setFilterType] = useState('ALL');
  const [verifiedTx, setVerifiedTx] = useState({});

  const handleVerify = (txId) => {
    sound.playClick();
    setVerifiedTx((prev) => ({ ...prev, [txId]: true }));
  };

  const filtered = ledgerEntries.filter((item) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'MINTS') return item.amount > 0;
    if (filterType === 'GIFTS') return item.amount < 0;
    return true;
  });

  const totalInflow = ledgerEntries
    .filter((e) => e.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalOutflow = Math.abs(
    ledgerEntries
      .filter((e) => e.amount < 0)
      .reduce((acc, curr) => acc + curr.amount, 0)
  );

  return (
    <div className="screen-scroll-container" id="bank-ledger-screen">
      {/* Title */}
      <div className="section-header-row" style={{ marginTop: 2 }}>
        <div className="section-header-left">
          <ReceiptText className="section-icon-neon" size={18} />
          <span>Double-Entry Bank Ledger</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#00e599', fontSize: 10 }}>
          <Database size={12} />
          <span className="font-mono">POSTGRES ACID</span>
        </div>
      </div>

      {/* Mini Stat Cards */}
      <div className="ledger-stat-cards-grid">
        <div className="ledger-mini-stat">
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
            Total Minted Inflow
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#00e599', marginTop: 4, fontFamily: 'JetBrains Mono' }}>
            +{totalInflow.toLocaleString()}
          </div>
          <div style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 2 }}>
            Cryptographically Settled
          </div>
        </div>

        <div className="ledger-mini-stat">
          <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
            Dispatched Outflow
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#f43f5e', marginTop: 4, fontFamily: 'JetBrains Mono' }}>
            -{totalOutflow.toLocaleString()}
          </div>
          <div style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 2 }}>
            Pessimistic DB Locks
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="ledger-filter-pills">
        {['ALL', 'MINTS', 'GIFTS'].map((f) => (
          <button
            key={f}
            className={`ledger-filter-btn font-mono ${filterType === f ? 'active' : ''}`}
            onClick={() => {
              sound.playClick();
              setFilterType(f);
            }}
          >
            {f === 'ALL' && 'All Records'}
            {f === 'MINTS' && 'Mint Allocations (+)'}
            {f === 'GIFTS' && 'Gift Dispatches (-)'}
          </button>
        ))}
      </div>

      {/* Ledger Records List */}
      <div className="ledger-entries-list">
        {filtered.map((entry, idx) => {
          const isPositive = entry.amount > 0;
          const isVerified = verifiedTx[entry.txId];
          return (
            <div key={idx} className="ledger-entry-card" id={`ledger-entry-${idx}`}>
              <div className="ledger-row-main">
                <div className="ledger-tag-type">
                  <div style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: isPositive ? 'rgba(0,229,153,0.15)' : 'rgba(236,72,153,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isPositive ? '#00e599' : '#ec4899',
                  }}>
                    {isPositive ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>
                      {entry.title}
                    </div>
                    <div style={{ fontSize: 9.5, color: '#64748b', fontFamily: 'JetBrains Mono' }}>
                      {entry.timestamp} • {entry.enclave}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono',
                    color: isPositive ? '#00e599' : '#f43f5e',
                  }}>
                    {isPositive ? `+${entry.amount.toLocaleString()}` : `${entry.amount.toLocaleString()}`}
                  </div>
                  <div style={{ fontSize: 8.5, color: '#f59e0b', fontWeight: 700 }}>
                    COINS
                  </div>
                </div>
              </div>

              <div className="ledger-row-meta">
                <div>TxID: <span style={{ color: '#94a3b8' }}>{entry.txId}</span></div>
                <button
                  onClick={() => handleVerify(entry.txId)}
                  style={{
                    background: isVerified ? 'rgba(0,229,153,0.15)' : '#1e293b',
                    color: isVerified ? '#00e599' : '#94a3b8',
                    border: '1px solid',
                    borderColor: isVerified ? '#00e599' : 'rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    padding: '2px 7px',
                    fontSize: 9,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    cursor: 'pointer',
                  }}
                >
                  <ShieldCheck size={11} />
                  <span>{isVerified ? 'PROOF VERIFIED' : 'Verify Merkle'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
