import nodemailer, { Transporter } from 'nodemailer';

import { APP_NAME } from '@/shared/const/app.const';
import { Locale } from '@/shared/const/locale.const';

type BookingConfirmationEmailData = {
  tourTitle: string;
  bookingDate: string;
  paidAmount: number;
  transactionId: string;
  meetingPoint: string;
};

class MailerClient {
  private transporter: Transporter | null = null;

  private getTransporter(): Transporter {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 465),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }
    return this.transporter;
  }

  private async sendMail(to: string, subject: string, html: string): Promise<void> {
    const fromName = process.env.SMTP_FROM_NAME ?? APP_NAME;
    await this.getTransporter().sendMail({
      from: `"${fromName}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  }

  async sendWelcomeEmail(to: string, name: string, locale: Locale = 'en'): Promise<void> {
    const copy = {
      en: {
        subject: `Welcome to ${APP_NAME}`,
        heading: `Welcome, ${name}!`,
        body: 'Your account is ready. Start exploring one-day tours and book your next adventure.',
      },
      ka: {
        subject: `მოგესალმებით ${APP_NAME}-ში`,
        heading: `მოგესალმებით, ${name}!`,
        body: 'თქვენი ანგარიში მზადაა. დაათვალიერეთ ერთდღიანი ტურები და დაჯავშნეთ თქვენი შემდეგი მოგზაურობა.',
      },
    }[locale];

    await this.sendMail(
      to,
      copy.subject,
      `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h1 style="font-size:20px">${copy.heading}</h1>
        <p style="font-size:14px;color:#444">${copy.body}</p>
      </div>`
    );
  }

  async sendBookingConfirmationEmail(
    to: string,
    data: BookingConfirmationEmailData,
    locale: Locale = 'en'
  ): Promise<void> {
    const copy = {
      en: {
        subject: `Booking confirmed — ${data.tourTitle}`,
        heading: 'Your booking is confirmed',
        tour: 'Tour',
        date: 'Date',
        paid: 'Paid amount',
        transaction: 'Transaction ID',
        meetingPoint: 'Meeting point',
      },
      ka: {
        subject: `ჯავშანი დადასტურებულია — ${data.tourTitle}`,
        heading: 'თქვენი ჯავშანი დადასტურებულია',
        tour: 'ტური',
        date: 'თარიღი',
        paid: 'გადახდილი თანხა',
        transaction: 'ტრანზაქციის ID',
        meetingPoint: 'შეხვედრის ადგილი',
      },
    }[locale];

    await this.sendMail(
      to,
      copy.subject,
      `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h1 style="font-size:20px">${copy.heading}</h1>
        <table style="font-size:14px;color:#444;width:100%">
          <tr><td>${copy.tour}</td><td>${data.tourTitle}</td></tr>
          <tr><td>${copy.date}</td><td>${data.bookingDate}</td></tr>
          <tr><td>${copy.paid}</td><td>${data.paidAmount}</td></tr>
          <tr><td>${copy.transaction}</td><td>${data.transactionId}</td></tr>
          <tr><td>${copy.meetingPoint}</td><td>${data.meetingPoint}</td></tr>
        </table>
      </div>`
    );
  }
}

export const mailer = new MailerClient();
export { MailerClient };
