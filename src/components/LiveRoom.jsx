import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  Zap, 
  Flame, 
  Plus, 
  Gauge, 
  Terminal, 
  Lock, 
  Radio
} from './Icons';
import { sound } from '../utils/soundFx';
import { fireGiftConfetti } from '../utils/confetti';

export default function LiveRoom({ 
  balance, 
  setBalance, 
  onTopUpClick, 
  onAddLedgerEntry 
}) {
  const [selectedGiftId, setSelectedGiftId] = useState('crown');
  const [multiplier, setMultiplier] = useState(1);
  const [lastTxId, setLastTxId] = useState('0x4a7c89f1...98f');
  const [isCommitting, setIsCommitting] = useState(false);
  const [dailyAllocation, setDailyAllocation] = useState(12500);

  // Live stream active toast & chat
  const [activeToast, setActiveToast] = useState({
    sender: 'Zain',
    gift: 'Cyber Diamond',
    coins: 1000,
    multiplier: 5,
    lockCleared: true,
  });

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Alex',
      text: 'Sent Neon Dragon (500 Coins)',
      tx: 'Tx#9482',
      isGift: true,
    },
    {
      id: 2,
      sender: 'Cypher_99',
      text: 'The low latency on this vault node is insane...',
      tx: null,
      isGift: false,
    },
  ]);

  const [inputChatText, setInputChatText] = useState('');

  // 6 Interactive Cryptographic Gifts matching exact design
  const gifts = [
    {
      id: 'heart',
      name: 'Cyber Heart',
      coins: 50,
      iconEmoji: '💖',
      badge: null,
    },
    {
      id: 'mic',
      name: 'Laser Mic',
      coins: 150,
      iconEmoji: '🎙️',
      badge: null,
    },
    {
      id: 'crown',
      name: 'Holo Crown',
      coins: 500,
      iconEmoji: '👑',
      badge: 'POPULAR',
      badgeType: 'popular',
    },
    {
      id: 'rocket',
      name: 'Quantum Rocket',
      coins: 1000,
      iconEmoji: '🚀',
      badge: null,
    },
    {
      id: 'dragon',
      name: 'Apex Dragon',
      coins: 2500,
      iconEmoji: '🐉',
      badge: null,
    },
    {
      id: 'diamond',
      name: 'Vault Diamond',
      coins: 4000,
      iconEmoji: '💎',
      badge: 'VIP',
      badgeType: 'vip',
    },
  ];

  const selectedGift = gifts.find((g) => g.id === selectedGiftId) || gifts[2];
  const totalCost = selectedGift.coins * multiplier;

  const handleSelectGift = (gift) => {
    sound.playSelect();
    setSelectedGiftId(gift.id);
  };

  const handleSelectMultiplier = (mult) => {
    sound.playClick();
    setMultiplier(mult);
  };

  const handleDispatchGift = () => {
    if (balance < totalCost) {
      alert(`Insufficient Coins. You need ${totalCost.toLocaleString()} Coins, but currently have ${balance.toLocaleString()} Coins. Please top up.`);
      onTopUpClick();
      return;
    }

    setIsCommitting(true);
    sound.playGiftDispatch();
    fireGiftConfetti();

    // Generate simulated cryptographic TxID
    const randomHex = Math.random().toString(16).substring(2, 8);
    const generatedTxId = `0x${randomHex}...${Math.random().toString(16).substring(2, 5)}`;
    setLastTxId(generatedTxId);

    // Deduct coins & update allocation
    setBalance((prev) => Math.max(0, prev - totalCost));
    setDailyAllocation((prev) => Math.min(50000, prev + totalCost));

    // Update Live Toast in Stream
    setActiveToast({
      sender: 'You (Vault Node)',
      gift: selectedGift.name,
      coins: totalCost,
      multiplier: multiplier,
      lockCleared: true,
    });

    // Add to chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        text: `Dispatched ${selectedGift.name} (${totalCost.toLocaleString()} Coins)`,
        tx: `Tx#${Math.floor(1000 + Math.random() * 9000)}`,
        isGift: true,
      },
    ]);

    // Record into Bank Ledger
    if (onAddLedgerEntry) {
      onAddLedgerEntry({
        type: 'GIFT_DISPATCH',
        title: `Dispatched ${selectedGift.name} (${multiplier}x)`,
        amount: -totalCost,
        txId: generatedTxId,
        enclave: 'PK-SOUTH-1',
        protocol: 'POSTGRES_SERIALIZABLE_LOCK',
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    setTimeout(() => {
      setIsCommitting(false);
    }, 600);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputChatText.trim()) return;
    sound.playClick();
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        text: inputChatText.trim(),
        tx: null,
        isGift: false,
      },
    ]);
    setInputChatText('');
  };

  return (
    <div className="screen-scroll-container" id="live-room-screen">
      {/* Responsive Columns Wrapper */}
      <div className="live-responsive-columns">
        {/* Left Column: Stream Theater, Video HUD, Chat & Lock Receipt */}
        <div className="live-col-theater">
          {/* Streamer Profile Bar */}
          <div className="streamer-profile-bar" id="streamer-profile-bar">
        <div className="streamer-identity">
          <div className="streamer-badge-avatar">
            <img 
              src="/streamer_avatar.png" 
              alt="@AriaVibe" 
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&auto=format&fit=crop&q=80';
              }}
            />
            <span className="streamer-status-dot pulse-green"></span>
          </div>
          <div>
            <div className="streamer-name-title">
              <span>@AriaVibe</span>
              <CheckCircle2 size={13} fill="#00e599" color="#060a0f" />
            </div>
            <div className="streamer-vault-tag">
              <span>ZERO-TRUST VAULT #882</span>
            </div>
          </div>
        </div>

        <div className="streamer-top-badges">
          <div className="badge-live-red" id="live-indicator-badge">
            <span className="status-dot-green pulse-red" style={{ background: '#f43f5e' }}></span>
            <span>LIVE 14.8k</span>
          </div>
          <div className="badge-webrtc-green" id="webrtc-latency-badge">
            <span className="status-dot-green pulse-green"></span>
            <span>84ms WebRTC</span>
          </div>
        </div>
      </div>

      {/* Live Broadcast Video Canvas */}
      <div className="stream-viewport-canvas" id="stream-video-viewport">
        <img 
          src="/live_stream_bg.png" 
          alt="Live Stream AriaVibe" 
          className="stream-background-img"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="stream-overlay-scrim"></div>

        {/* Real-time Audio EQ HUD */}
        <div className="audio-equalizer-hud" title="WebRTC 48kHz Stereo Audio Feed">
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
        </div>

        {/* Live Gift Event Toast */}
        {activeToast && (
          <div className="stream-gift-toast" id="stream-gift-toast">
            <div className="toast-left">
              <Zap className="toast-icon-lightning" size={20} fill="#f59e0b" />
              <div>
                <div className="toast-sender-action">
                  <span className="toast-sender-name">{activeToast.sender}</span>
                  {' '}sent{' '}
                  <span className="toast-gift-name">{activeToast.gift}</span>
                </div>
                <div className="toast-lock-detail">
                  <span className="status-dot-green pulse-green"></span>
                  <span>Pessimistic Lock cleared • {activeToast.coins.toLocaleString()} Coins</span>
                </div>
              </div>
            </div>
            <div className="toast-multiplier-badge font-mono">
              x{activeToast.multiplier}
            </div>
          </div>
        )}

        {/* Live Chat Overlay */}
        <div className="stream-chat-overlay" id="stream-live-chat">
          {chatMessages.slice(-2).map((msg) => (
            <div key={msg.id} className="chat-message-item">
              {msg.isGift && <Flame className="chat-sender-flame" size={12} />}
              <span className="chat-user-highlight">{msg.sender}:</span>
              <span>{msg.text}</span>
              {msg.tx && <span className="chat-tx-badge font-mono">{msg.tx}</span>}
            </div>
          ))}
        </div>
      </div>

        {/* Live Chat Quick Input */}
        <form onSubmit={handleSendChat} className="live-chat-input-bar">
          <input 
            type="text" 
            placeholder="Send live chat to @AriaVibe..." 
            value={inputChatText}
            onChange={(e) => setInputChatText(e.target.value)}
            className="live-chat-text-field"
            id="input-live-chat"
          />
          <button type="submit" className="live-chat-send-btn" id="btn-send-chat">
            <span>Send</span>
          </button>
        </form>

        {/* Ledger Heartbeat Ticker */}
        <div className="ledger-heartbeat-ticker" id="ledger-heartbeat-banner">
          <Shield size={14} color="#00e599" />
          <span>Ledger Heartbeat: 128 Tx/s • Double-entry DB synced</span>
        </div>
      </div>{/* End live-col-theater */}

      {/* Right Column: Vault Controls, Limit Gauge & Interactive Gifting Station */}
      <div className="live-col-gifting">
        {/* VAULT BALANCE Card */}
        <div className="live-vault-balance-card" id="live-vault-balance-card">
        <div className="vault-bal-left">
          <span className="vault-bal-label font-mono">VAULT BALANCE</span>
          <div className="vault-bal-numbers">
            <svg className="coin-icon-gold" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="12" cy="12" r="6" fill="#f59e0b" />
            </svg>
            <span className="vault-bal-val font-mono">
              {balance.toLocaleString()}
            </span>
            <div className="vault-verified-pill">
              <Shield size={10} color="#00e599" />
              <span>Verified</span>
            </div>
          </div>
        </div>

        <button 
          className="vault-topup-btn" 
          id="btn-live-topup"
          onClick={onTopUpClick}
        >
          <Plus size={14} strokeWidth={3} />
          <span>Top Up</span>
        </button>
      </div>

      {/* Daily Limit Allocation Card */}
      <div className="daily-limit-allocation-card" id="daily-limit-allocation-card">
        <div className="allocation-top-row">
          <div className="allocation-title">
            <Gauge size={13} color="#38bdf8" />
            <span>Daily Limit Allocation</span>
          </div>
          <div className="allocation-numbers">
            {dailyAllocation.toLocaleString()} / 50,000 Coins ({Math.round(((50000 - dailyAllocation) / 50000) * 100)}% remaining)
          </div>
        </div>

        <div className="progress-track-sleek">
          <div 
            className="progress-fill-neon" 
            style={{ width: `${Math.min(100, (dailyAllocation / 50000) * 100)}%` }}
          ></div>
        </div>

        <div className="allocation-sub-stats">
          <div className="redis-sliding-window">
            <span className="status-dot-green"></span>
            <span>Redis Sliding Window: 3 gifts/sec Max</span>
          </div>
          <div className="pessimistic-db-locks">
            Pessimistic DB Locks: Active
          </div>
        </div>
      </div>

      {/* Interactive Cryptographic Gifts Section */}
      <div className="section-header-row" style={{ marginTop: 2 }}>
        <div className="section-header-left">
          <span>Interactive Cryptographic Gifts</span>
        </div>
        <span className="section-header-badge font-mono" style={{ color: '#00e599' }}>Tap to Prime</span>
      </div>

      <div className="gifts-grid-6" id="gifts-selector-grid">
        {gifts.map((gift) => {
          const isSelected = selectedGiftId === gift.id;
          return (
            <div
              key={gift.id}
              id={`gift-card-${gift.id}`}
              className={`gift-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelectGift(gift)}
            >
              {gift.badge && (
                <span className={`gift-corner-badge ${gift.badgeType} font-mono`}>
                  {gift.badge}
                </span>
              )}
              <div className="gift-icon-container">
                {gift.iconEmoji}
              </div>
              <span className="gift-name-label">{gift.name}</span>
              <div className="gift-price-row">
                <span>{gift.coins.toLocaleString()}</span>
                <span style={{ fontSize: 8.5, color: '#f59e0b' }}>COINS</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multiplier & Dispatch Action Bar */}
      <div className="dispatch-action-row" id="dispatch-controls-bar">
        {/* 1x, 5x, 10x */}
        <div className="multiplier-segmented-control" id="multiplier-selector">
          {[1, 5, 10].map((m) => (
            <button
              key={m}
              id={`mult-btn-${m}x`}
              className={`mult-btn ${multiplier === m ? 'active' : ''}`}
              onClick={() => handleSelectMultiplier(m)}
            >
              {m}x
            </button>
          ))}
        </div>

        {/* Big Neon Dispatch Button */}
        <button
          className="dispatch-submit-btn"
          id="btn-dispatch-gift"
          onClick={handleDispatchGift}
          style={{ opacity: isCommitting ? 0.8 : 1 }}
        >
          <Zap size={16} fill="#060a0f" />
          <span>
            Dispatch {selectedGift.name} ({multiplier}x)
          </span>
          <span className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: 3, fontWeight: 800 }}>
            {totalCost.toLocaleString()}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#060a0f" />
            </svg>
          </span>
        </button>
      </div>

      {/* PostgreSQL Pessimistic Lock Protocol Receipt */}
      <div className="pessimistic-lock-box" id="pessimistic-lock-receipt">
        <div className="lock-box-left">
          <CheckCircle2 size={15} color="#00e599" />
          <div className="lock-box-left-text">
            <span className="lock-title">PostgreSQL Pessimistic Lock Protocol</span>
            <span className="lock-txid-sub font-mono">
              TxID: {lastTxId} • ACID Isolated
            </span>
          </div>
        </div>

        <div className="committed-badge">
          <span className="status-dot-green"></span>
          <span>COMMITTED</span>
        </div>
      </div>

      {/* Zero Client Authority Banner */}
      <div className="server-side-zero-auth-banner" id="zero-client-auth-footer">
        <Terminal size={12} color="#64748b" />
        <span>All transactions signed & validated server-side. Zero client authority.</span>
      </div>
    </div>{/* End live-col-gifting */}
  </div>{/* End live-responsive-columns */}
</div>
  );
}
