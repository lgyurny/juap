import React, { useEffect, useState } from 'react';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: TelegramUser;
        };
        themeParams?: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        ready?: () => void;
        expand?: () => void;
        close?: () => void;
        MainButton?: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (fn: () => void) => void;
          offClick: (fn: () => void) => void;
        };
      };
    };
  }
}

export const App: React.FC = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [counter, setCounter] = useState<number>(0);
  const [isInTelegram, setIsInTelegram] = useState<boolean>(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready?.();
      tg.expand?.();
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
      setIsInTelegram(true);

      if (tg.MainButton) {
        tg.MainButton.text = 'Main Telegram Action';
        tg.MainButton.show();
      }
    }
  }, []);

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
  };

  const handleClose = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close?.();
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 Telegram Mini App</h1>
        <p style={styles.subtitle}>
          {isInTelegram ? 'Running inside Telegram Client' : 'Standalone Browser Mode'}
        </p>
      </header>

      {user ? (
        <section style={styles.card} data-testid="user-info">
          <h2>👋 Welcome, {user.first_name} {user.last_name || ''}!</h2>
          {user.username && <p><strong>Username:</strong> @{user.username}</p>}
          <p><strong>User ID:</strong> {user.id}</p>
          {user.is_premium && <p style={styles.badge}>⭐ Telegram Premium User</p>}
        </section>
      ) : (
        <section style={styles.card} data-testid="guest-info">
          <h2>👋 Hello Guest!</h2>
          <p>Open this app inside Telegram to access user data integration.</p>
        </section>
      )}

      <section style={styles.card}>
        <h3>Interactive Counter</h3>
        <p style={styles.counterText} data-testid="counter-value">{counter}</p>
        <button style={styles.button} onClick={handleIncrement} data-testid="increment-btn">
          Increment Counter
        </button>
      </section>

      {isInTelegram && (
        <button style={{ ...styles.button, backgroundColor: '#e53e3e' }} onClick={handleClose}>
          Close Mini App
        </button>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--tg-theme-hint-color, #888888)',
    margin: 0,
  },
  card: {
    backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f5)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
  },
  counterText: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '12px 0',
  },
  button: {
    backgroundColor: 'var(--tg-theme-button-color, #2481cc)',
    color: 'var(--tg-theme-button-text-color, #ffffff)',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
  },
  badge: {
    color: '#d69e2e',
    fontWeight: 'bold',
  },
};

export default App;
