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
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px;">
          <img src="https://xyen-ai-web.vercel.app/logo.png" alt="Xyen AI Logo" style="max-width: 150px; height: auto;"/>
        </div>
        <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px;">
          <h2 style="color: #2c3e50; text-align: center; font-weight: 600; margin-top:0;">Password Reset</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">We received a request to reset the password for your account. Click the button below to reset your password:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px; font-weight: bold;">Reset Password</a>
          </p>
          <p style="font-size: 16px;">If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
          <p style="font-size: 16px;">Thanks,<br>The Xyen AI Team</p>
        </div>
        <div style="text-align: center; margin-top: 25px; font-size: 0.9em; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Xyen AI. All rights reserved.</p>
        </div>
      </div>
    `;
    return { text, html };
  }

  private getVerificationEmailTemplate(verificationUrl: string): {
    text: string;
    html: string;
  } {
    const text = `Click the link below to verify your email: ${verificationUrl}`;
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px;">
          <img src="https://xyen-ai-web.vercel.app/logo.png" alt="Xyen AI Logo" style="max-width: 150px; height: auto;"/>
        </div>
        <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px;">
          <h2 style="color: #2c3e50; text-align: center; font-weight: 600; margin-top:0;">Verify Your Email Address</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">Thanks for signing up with Xyen AI! Please verify your email address by clicking the button below:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px; font-weight: bold;">Verify Email</a>
          </p>
          <p style="font-size: 16px;">If you did not create an account, please ignore this email.</p>
          <p style="font-size: 16px;">Thanks,<br>The Xyen AI Team</p>
        </div>
        <div style="text-align: center; margin-top: 25px; font-size: 0.9em; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Xyen AI. All rights reserved.</p>
        </div>
      </div>
    `;
    return { text, html };
  }
}

export const mailService = new MailService();
