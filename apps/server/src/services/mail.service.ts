import nodemailer from "nodemailer";
import type { MailOptions } from "@/types";

class MailService {
  private transporter!: nodemailer.Transporter;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      host: "resonantfinance.org",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
      logger: process.env.NODE_ENV !== "production",
      debug: process.env.NODE_ENV !== "production",
    });
  }

  async sendMail({ to, subject, text, html }: MailOptions): Promise<void> {
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      throw new Error("Failed to send email");
    }
  }

  async sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
    const subject = "Reset your password";
    const { text, html } = this.getPasswordResetTemplate(resetUrl);

    await this.sendMail({
      to: email,
      subject,
      text,
      html,
    });
  }

  async sendVerificationEmail(
    email: string,
    verificationUrl: string
  ): Promise<void> {
    const subject = "Verify your email address";
    const { text, html } = this.getVerificationEmailTemplate(verificationUrl);

    await this.sendMail({
      to: email,
      subject,
      text,
      html,
    });
  }

  private getPasswordResetTemplate(resetUrl: string): {
    text: string;
    html: string;
  } {
    const text = `Click the link below to reset your password: ${resetUrl}`;
    const html = `<p>Click the link below to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`;
    return { text, html };
  }

  private getVerificationEmailTemplate(verificationUrl: string): {
    text: string;
    html: string;
  } {
    const text = `Click the link below to verify your email: ${verificationUrl}`;
    const html = `<p>Click the link below to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>`;
    return { text, html };
  }
}

export const mailService = new MailService();