"use server";

import { Resend } from "resend";
import { ContactFormValues } from "./schema";
import { ContactFormEmail } from "@/components/email/ContactFormEmail";

// Note: You need to install the Resend package and set up an API key
// npm install resend
// Then add RESEND_API_KEY to your .env.local file

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormValues) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Manaslu Trekking Guide <info@manaslutrekguide.com>",
      to: ["adhikarisamrat4545@gmail.com"],
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      html: ContactFormEmail(data),
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
