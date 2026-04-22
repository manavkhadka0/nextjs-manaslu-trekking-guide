"use server";

import { z } from "zod";
import { getWriteClient } from "@/sanity/client";
import { resend } from "../resend";
import { TestimonialAdminEmail } from "../../emails/TestimonialAdminEmail";
import { TestimonialThankYouEmail } from "../../emails/TestimonialThankYouEmail";
import React from "react";

// Define the testimonial submission schema
const testimonialSubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  quote: z.string().min(10, "Testimonial must be at least 10 characters"),
  rating: z.number().min(1).max(5),
  designation: z.string().optional(),
  location: z.string().optional(),
  trekRoute: z.string().optional(),
  trekDate: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  status: z.enum(["published", "review", "rejected"]).default("review"),
  verified: z.boolean().default(false),
  submissionDate: z.string().default(new Date().toISOString()),
});

export type TestimonialSubmission = z.infer<typeof testimonialSubmissionSchema>;

export async function submitTestimonial(data: TestimonialSubmission) {
  try {
    // Validate the submission data
    const validatedData = testimonialSubmissionSchema.parse(data);

    // Create the testimonial document in Sanity
    const result = await getWriteClient().create({
      _type: "testimonial",
      name: validatedData.name,
      quote: validatedData.quote,
      rating: validatedData.rating,
      designation: validatedData.designation || "",
      location: validatedData.location || "",
      trekRoute: validatedData.trekRoute || "",
      trekDate: validatedData.trekDate || "",
      testimonialType: "text",
      verified: validatedData.verified,
      status: validatedData.status,
      submissionDate: validatedData.submissionDate,
    });

    // Email delivery should not block a successful testimonial submission.
    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: "Manaslu Trekking Guide <info@manaslutrekguide.com>",
        to: ["adhikarisamrat4545@gmail.com"],
        subject: `New Testimonial from ${validatedData.name}`,
        react: TestimonialAdminEmail(validatedData),
      }),
      resend.emails.send({
        from: "Manaslu Trekking Guide <info@manaslutrekguide.com>",
        to: [validatedData.email],
        subject: "Thank you for your testimonial!",
        react: TestimonialThankYouEmail(validatedData),
      }),
    ]);

    emailResults.forEach((result, index) => {
      if (result.status === "rejected") {
        const label = index === 0 ? "admin notification" : "thank-you";
        console.error(`Failed to send ${label} email`, result.reason);
      }
    });

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors,
      };
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    if (
      errorMessage.includes("Insufficient permissions") ||
      errorMessage.includes('permission "create" required')
    ) {
      const runtimeToken = process.env.SANITY_API_TOKEN ?? "";
      console.error("Sanity create permission error", {
        statusCode:
          typeof error === "object" && error && "statusCode" in error
            ? (error as { statusCode?: number }).statusCode
            : undefined,
        message: errorMessage,
        projectId: "aiqpnnbw",
        dataset: "production",
        tokenFingerprint: runtimeToken
          ? `${runtimeToken.slice(0, 8)}...${runtimeToken.slice(-6)} (len:${runtimeToken.length})`
          : "missing",
      });

      return {
        success: false,
        error:
          "Sanity token cannot create documents for the configured project or dataset. Verify token role and project access.",
      };
    }

    console.error("submitTestimonial failed", error);

    return {
      success: false,
      error: "Failed to submit testimonial. Please try again later.",
    };
  }
}
