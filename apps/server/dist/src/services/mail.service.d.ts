import type { MailOptions } from "../types/index.js";
declare class MailService {
    private transporter;
    constructor();
    private initializeTransporter;
    sendMail({ to, subject, text, html }: MailOptions): Promise<void>;
    sendPasswordResetEmail(email: string, resetUrl: string): Promise<void>;
    sendVerificationEmail(email: string, verificationUrl: string): Promise<void>;
    private getPasswordResetTemplate;
    private getVerificationEmailTemplate;
}
export declare const mailService: MailService;
export {};
