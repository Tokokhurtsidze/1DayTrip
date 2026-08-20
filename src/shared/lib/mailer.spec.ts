import nodemailer from 'nodemailer';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(),
  },
}));

import { MailerClient } from './mailer';

describe('MailerClient', () => {
  let client: MailerClient;
  const sendMail = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sendMail.mockResolvedValue(undefined);
    vi.mocked(nodemailer.createTransport).mockReturnValue({ sendMail } as never);
    client = new MailerClient();
  });

  it('creates the transporter lazily and reuses it', async () => {
    await client.sendWelcomeEmail('alice@example.com', 'Alice');
    await client.sendWelcomeEmail('alice@example.com', 'Alice');
    expect(nodemailer.createTransport).toHaveBeenCalledOnce();
    expect(sendMail).toHaveBeenCalledTimes(2);
  });

  it('sends an English welcome email by default', async () => {
    await client.sendWelcomeEmail('alice@example.com', 'Alice');
    const call = sendMail.mock.calls[0][0];
    expect(call.to).toBe('alice@example.com');
    expect(call.subject).toContain('Welcome');
  });

  it('sends a Georgian welcome email when locale is ka', async () => {
    await client.sendWelcomeEmail('alice@example.com', 'Alice', 'ka');
    const call = sendMail.mock.calls[0][0];
    expect(call.subject).toContain('მოგესალმებით');
  });

  it('sends a booking confirmation email with meeting point revealed', async () => {
    await client.sendBookingConfirmationEmail('alice@example.com', {
      tourTitle: 'Kazbegi Day Trip',
      bookingDate: '2026-07-10',
      paidAmount: 120,
      transactionId: 'tx_123',
      meetingPoint: 'Freedom Square, 9:00 AM',
    });
    const call = sendMail.mock.calls[0][0];
    expect(call.subject).toContain('Kazbegi Day Trip');
    expect(call.html).toContain('Freedom Square, 9:00 AM');
  });
});
