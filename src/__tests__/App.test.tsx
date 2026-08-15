import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App.tsx';

describe('App Component', () => {
  beforeEach(() => {
    delete window.Telegram;
  });

  it('renders correctly in standalone browser mode when Telegram WebApp is not available', () => {
    render(<App />);

    expect(screen.getByText(/Telegram Mini App/i)).toBeInTheDocument();
    expect(screen.getByText(/Standalone Browser Mode/i)).toBeInTheDocument();
    expect(screen.getByTestId('guest-info')).toBeInTheDocument();
  });

  it('renders user info when running inside Telegram Client with user data', () => {
    window.Telegram = {
      WebApp: {
        initDataUnsafe: {
          user: {
            id: 12345,
            first_name: 'Telegram',
            last_name: 'User',
            username: 'tguser',
            is_premium: true,
          },
        },
        ready: () => {},
        expand: () => {},
        MainButton: {
          text: '',
          show: () => {},
          hide: () => {},
          onClick: () => {},
          offClick: () => {},
        },
      },
    };

    render(<App />);

    expect(screen.getByText(/Running inside Telegram Client/i)).toBeInTheDocument();
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
    expect(screen.getByText(/Welcome, Telegram User!/i)).toBeInTheDocument();
    expect(screen.getByText(/@tguser/i)).toBeInTheDocument();
  });

  it('increments counter on button click', () => {
    render(<App />);

    const counterVal = screen.getByTestId('counter-value');
    const button = screen.getByTestId('increment-btn');

    expect(counterVal).toHaveTextContent('0');

    fireEvent.click(button);
    expect(counterVal).toHaveTextContent('1');

    fireEvent.click(button);
    expect(counterVal).toHaveTextContent('2');
  });
});
