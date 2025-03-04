"use server";

import { ContactFormValues } from "./schema";

// Note: You need to install the Resend package and set up an API key
// npm install resend
// Then add RESEND_API_KEY to your .env.local file

export async function sendContactEmail(data: ContactFormValues) {
  try {
    // In a real implementation, you would use Resend like this:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // const { data: emailData, error } = await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: ['your-email@example.com'],
    //   subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    //   text: `
    //     Name: ${data.firstName} ${data.lastName}
    //     Email: ${data.email}
    //     Message: ${data.message}
    //   `,
    // });
    //
    // if (error) {
    //   return { success: false, message: error.message };
    // }

    // For now, we'll simulate a successful email send
    console.log("Contact form data:", data);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
