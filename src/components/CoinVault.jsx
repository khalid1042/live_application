import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  Clock, 
  Box, 
  Star, 
  Award, 
  Gem, 
  Wallet, 
  Lock, 
  Smartphone, 
  CreditCard, 
  ArrowRight, 
  Key, 
  Gauge, 
  Check, 
  Copy
} from './Icons';
import { sound } from '../utils/soundFx';

export default function CoinVault({ 
  balance, 
  onInitializePayment, 
  currency, 
  setCurrency 
}) {
  const [selectedPackageId, setSelectedPackageId] = useState(2); // 1,200 Booster by default
  const [selectedGateway, setSelectedGateway] = useState('jazzcash');
  const [copiedSeed, setCopiedSeed] = useState(false);

  // Currency exchange rates relative to PKR
  const currencyRates = {
    PKR: { symbol: 'PKR', rate: 1, limitSpent: 25000, limitTotal: 100000 },
    USD: { symbol: 'USD', rate: 0.0036, limitSpent: 90, limitTotal: 360 },
    AED: { symbol: 'AED', rate: 0.013, limitSpent: 325, limitTotal: 1300 },
  };

  const currentRate = currencyRates[currency] || currencyRates.PKR;

  const packages = [
    {
      id: 1,
      coins: 500,
      bonus: null,
      title: 'Starter Vault Allocation',
      basePricePKR: 1250,
      savingsText: 'Zero Gas Fee',
      savingsType: 'green',
      iconType: 'loops',
    },
    {
      id: 2,
      coins: 1200,
      bonus: '+100 BONUS',
      bonusClass: 'green',
      title: 'Broadcast Streamer Booster',
      basePricePKR: 2800,
      savingsText: 'Instant Clearance',
      savingsType: 'muted',
      isPopular: true,
      popularTag: 'MOST POPULAR • +8% EXTRA',
      iconType: 'star',
    },
    {
      id: 3,
      coins: 3000,
      bonus: '+350 BONUS',
      bonusClass: 'gold',
      title: 'Pro Creator Pack',
      basePricePKR: 6500,
      savingsText: '12% Value Savings',
      savingsType: 'cyan',
      iconType: 'medal',
    },
    {
      id: 4,
      coins: 10000,
      bonus: '+1,500 BONUS',
      bonusClass: 'purple',
      title: 'VIP High Roller Allocation',
      basePricePKR: 20000,
      savingsText: 'Maximum Liquidity',
      savingsType: 'gold',
      iconType: 'diamond',
    },
  ];

  const formatPrice = (basePkr) => {
    if (currency === 'PKR') {
      return `PKR ${basePkr.toLocaleString()}`;
    }
    const converted = Math.round(basePkr * currentRate.rate * 10) / 10;
    return `${currency} ${converted.toLocaleString()}`;
  };

  const selectedPackage = packages.find((p) => p.id === selectedPackageId) || packages[1];

  const handleSelectPackage = (pkg) => {
    sound.playSelect();
    setSelectedPackageId(pkg.id);
  };

  const handleSelectGateway = (gwKey) => {
    sound.playClick();
    setSelectedGateway(gwKey);
  };

  const handleCopySeed = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('IDEMP-CFF9-A842-88B1-DFA3');
    setCopiedSeed(true);
    sound.playClick();
    setTimeout(() => setCopiedSeed(false), 2000);
  };

  const handleInitPayment = () => {
    sound.playClick();
    onInitializePayment({
      package: selectedPackage,
      gateway: selectedGateway,
      formattedPrice: formatPrice(selectedPackage.basePricePKR),
      currency,
    });
  };

  return (
    <div className="screen-scroll-container" id="coin-vault-screen">
      {/* Top Enclave Title & Currency Switcher */}
      <div className="enclave-title-row" id="enclave-header-row">
        <div className="enclave-left">
          <div className="enclave-shield-icon">
            <Shield size={18} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="enclave-heading">Official Coin Vault</h1>
            <div className="enclave-subline">
              <span className="status-dot-green pulse-green"></span>
              <span>ZERO-TRUST ENCLAVE • PK-SOUTH-1</span>
            </div>
          </div>
        </div>

        {/* Currency Switcher: PKR / USD / AED */}
        <div className="currency-switcher-group" id="currency-switcher">
          {['PKR', 'USD', 'AED'].map((cur) => (
            <button
              key={cur}
              id={`currency-btn-${cur}`}
              className={`currency-pill-btn ${currency === cur ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                setCurrency(cur);
              }}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Columns Wrapper */}
      <div className="vault-responsive-columns">
        {/* Left Column: Primary Reserve & Mint Packages */}
        <div className="vault-col-left">
          {/* PRIMARY RESERVE BALANCE Card */}
          <div className="primary-reserve-card" id="primary-reserve-balance-card">
        {/* Subtle Watermark Graphic */}
        <svg className="reserve-watermark" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" rx="16" stroke="#00e599" strokeWidth="3" />
          <circle cx="50" cy="50" r="24" stroke="#00e599" strokeWidth="3" />
          <path d="M50 26 L50 40 M50 60 L50 74 M26 50 L40 50 M60 50 L74 50" stroke="#00e599" strokeWidth="2.5" />
        </svg>

        <div className="reserve-header-row">
          <span className="reserve-label font-mono">PRIMARY RESERVE BALANCE</span>
          <div className="reserve-sync-status">
            <span className="postgres-sync-text font-mono">
              <CheckCircle2 size={13} color="#00e599" />
              Synced 1s ago via PostgreSQL
            </span>
            <div className="acid-sync-pill">
              <span className="status-dot-green pulse-green"></span>
              <span>ACID Sync</span>
            </div>
          </div>
        </div>

        <div className="reserve-huge-balance">
          <span className="balance-number-massive font-mono">
            {balance.toLocaleString()}
          </span>
          <span className="coins-badge-gold">
            COINS
            <Lock size={12} color="#f59e0b" />
          </span>
        </div>

        {/* 24h Purchase Limit Section */}
        <div className="limit-gauge-container">
          <div className="limit-top-row">
            <div className="limit-title-left">
              <Gauge size={13} color="#38bdf8" />
              <span>24h Purchase Limit:</span>
            </div>
            <div className="limit-values-right">
              <span className="limit-spent font-mono">
                {currency} {currentRate.limitSpent.toLocaleString()}
              </span>
              <span className="limit-total font-mono">
                {' '}/ {currency} {currentRate.limitTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="progress-track-sleek">
            <div className="progress-fill-neon" style={{ width: '25%' }}></div>
          </div>

          <div className="limit-bottom-meta">
            <div className="kyc-unlocked-tag font-mono">
              <span className="status-dot-green"></span>
              <span>Tier 2 KYC Unlocked</span>
            </div>
            <div className="resets-timer-tag">
              <Clock size={11} />
              <span>Resets in 6h 14m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Mint Packages Section */}
      <div className="section-header-row">
        <div className="section-header-left">
          <Box className="section-icon-neon" size={17} />
          <span>Fixed Mint Packages</span>
        </div>
        <span className="section-header-badge font-mono">4 VERIFIED TIERS</span>
      </div>

      <div className="mint-packages-list" id="mint-packages-container">
        {packages.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          return (
            <div key={pkg.id} className="mint-card-wrapper">
              {pkg.isPopular && (
                <div className="popular-ribbon font-mono">
                  🔥 {pkg.popularTag}
                </div>
              )}
              <div
                id={`mint-pkg-card-${pkg.id}`}
                className={`mint-package-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectPackage(pkg)}
              >
                <div className="package-left-col">
                  <div className={`package-icon-box ${pkg.isPopular ? 'popular' : ''}`}>
                    {pkg.iconType === 'loops' && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="9" cy="12" r="6" stroke="#f59e0b" strokeWidth="2.2" />
                        <circle cx="15" cy="12" r="6" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="3 2" />
                      </svg>
                    )}
                    {pkg.iconType === 'star' && (
                      <div style={{ background: '#00e599', borderRadius: 6, padding: 4, display: 'flex' }}>
                        <Star size={16} fill="#060a0f" color="#060a0f" />
                      </div>
                    )}
                    {pkg.iconType === 'medal' && (
                      <Award size={20} color="#f59e0b" />
                    )}
                    {pkg.iconType === 'diamond' && (
                      <Gem size={20} color="#ec4899" />
                    )}
                  </div>

                  <div className="package-text-meta">
                    <div className="package-amount-row">
                      <span className="package-coins-amount font-mono">
                        {pkg.coins.toLocaleString()}
                      </span>
                      {pkg.bonus ? (
                        <span className={`bonus-pill ${pkg.bonusClass} font-mono`}>
                          {pkg.bonus}
                        </span>
                      ) : (
                        <span className="package-coins-unit">COINS</span>
                      )}
                    </div>
                    <span className="package-subtitle">{pkg.title}</span>
                  </div>
                </div>

                <div className="package-right-col">
                  <span className="package-price-text">
                    {formatPrice(pkg.basePricePKR)}
                  </span>
                  <span className={`package-savings-badge ${pkg.savingsType}`}>
                    {pkg.savingsText}
                  </span>
                </div>

                <div className="radio-indicator-dot"></div>
              </div>
            </div>
          );
        })}
        </div>{/* End mint-packages-list */}
      </div>{/* End vault-col-left */}

      {/* Right Column: Gateways, Zero Trust, and Checkout */}
      <div className="vault-col-right">
          {/* Verified Payment Gateways Section */}
          <div className="section-header-row" style={{ marginTop: 0 }}>
        <div className="section-header-left">
          <Wallet className="section-icon-neon" size={17} />
          <span>Verified Payment Gateways</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#00e599', fontSize: 10, fontWeight: 700 }}>
          <Lock size={11} />
          <span className="font-mono">3D-SECURE 2.2</span>
        </div>
      </div>

      <div className="gateways-grid-3" id="payment-gateways-selector">
        {/* JazzCash */}
        <div
          id="gateway-jazzcash"
          className={`gateway-card ${selectedGateway === 'jazzcash' ? 'selected' : ''}`}
          onClick={() => handleSelectGateway('jazzcash')}
        >
          <div className="gateway-icon-box jazzcash">
            <Smartphone size={18} />
          </div>
          <span className="gateway-name">JazzCash</span>
          <span className="gateway-sub">MPIN OTP</span>
        </div>

        {/* EasyPaisa */}
        <div
          id="gateway-easypaisa"
          className={`gateway-card ${selectedGateway === 'easypaisa' ? 'selected' : ''}`}
          onClick={() => handleSelectGateway('easypaisa')}
        >
          <div className="gateway-icon-box easypaisa">
            <Wallet size={18} />
          </div>
          <span className="gateway-name">EasyPaisa</span>
          <span className="gateway-sub">One-Tap Wallet</span>
        </div>

        {/* Stripe INT */}
        <div
          id="gateway-stripe"
          className={`gateway-card ${selectedGateway === 'stripe' ? 'selected' : ''}`}
          onClick={() => handleSelectGateway('stripe')}
        >
          <div className="gateway-icon-box stripe">
            <CreditCard size={18} />
          </div>
          <span className="gateway-name">Stripe INT</span>
          <span className="gateway-sub">Visa / MC</span>
        </div>
      </div>

      {/* Gateway Tunnel Sub-banner */}
      <div className="tunnel-status-row">
        <div className="tunnel-left-info">
          <Shield size={12} color="#00e599" />
          <span>
            {selectedGateway === 'jazzcash' && 'Direct Mobile Account authorization prompt via JazzCash secure tunnel.'}
            {selectedGateway === 'easypaisa' && 'Instant biometric authorization link via EasyPaisa secure tunnel.'}
            {selectedGateway === 'stripe' && 'Direct 256-bit AES encrypted card gateway via Stripe secure tunnel.'}
          </span>
        </div>
        <span className="tunnel-speed-tag">2.4s avg</span>
      </div>

      {/* ZERO-TRUST PROTOCOL ACTIVE Banner */}
      <div className="zero-trust-info-card" id="zero-trust-protocol-card">
        <div className="zero-trust-header">
          <Lock size={14} />
          <span>ZERO-TRUST PROTOCOL ACTIVE</span>
        </div>
        <p className="zero-trust-explanation">
          Frontend never confirms transactions. Coins are credited exclusively upon HMAC-SHA256 verified webhook dispatch from the payment provider with atomic database transactions.
        </p>

        <div className="zero-trust-chips-row">
          <div className="zero-trust-chip">
            <div className="chip-label">ISOLATION LEVEL</div>
            <div className="chip-val">SERIALIZABLE + LOCK</div>
          </div>
          <div className="zero-trust-chip">
            <div className="chip-label">CRYPTOGRAPHIC PROOF</div>
            <div className="chip-val">HMAC-SHA256 Hash</div>
          </div>
        </div>

        <div className="idempotency-seed-row" onClick={handleCopySeed} style={{ cursor: 'pointer' }} title="Click to copy idempotency seed">
          <div className="seed-label-left">
            <span className="status-dot-green"></span>
            <span>Idempotency Seed:</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="seed-val-gold">IDEMP-CFF9...DFA3</span>
            <Copy size={11} color={copiedSeed ? '#00e599' : '#64748b'} />
          </div>
        </div>
      </div>

      {/* Big Action Button (Initialize Secure Payment) */}
      <div className="cta-button-container">
        <button
          className="primary-cta-btn"
          id="btn-initialize-secure-payment"
          onClick={handleInitPayment}
        >
          <div className="cta-left-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Lock size={18} />
              <Clock size={12} style={{ marginLeft: -6, marginTop: 4 }} />
            </div>
            <span>Initialize Secure Payment</span>
          </div>

          <div className="cta-price-pill font-mono">
            <span>{formatPrice(selectedPackage.basePricePKR)}</span>
            <ArrowRight size={14} />
          </div>
        </button>

        <div className="cta-footer-subtext font-mono">
          <Key size={11} />
          <span>Generates Idempotent Session • Backend Authoritative Only</span>
        </div>
      </div>
    </div>{/* End vault-col-right */}
  </div>{/* End vault-responsive-columns */}
</div>
  );
}
