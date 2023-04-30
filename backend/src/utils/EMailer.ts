import {createTransport} from "nodemailer"
import env from "./CleanEnv";

const transport = createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
        user: env.SMTP_EMAIL,
        pass: env.SMTP_PWD,
    }
})

export const sendVerificationCode = async (toEmail: string, code: number) => {
    await transport.sendMail({
        from: 'noreply@blogVault.com',
        to: toEmail,
        subject: "Verify your email",
        html: ` 
              <h1>Verify your email</h1>
              <p>Enter the following code to verify your email: <h2><strong>${code}</strong></h2></p>
              `
    })
}

export const sendPasswordResetCode = async (toEmail: string, code: number) => {
    await transport.sendMail({
        from: 'noreply@blogVault.com',
        to: toEmail,
        subject: "Reset your password",
        html: ` 
             <h1>Reset your password</h1> 
             <p>Enter the following code to reset your password: <h2><strong>${code}</strong></h2></p>
             <p>This code will expire in 10 minutes </p>
             <p>If you didn't request a password reset, you can ignore this email.</p>
            `
    })
}