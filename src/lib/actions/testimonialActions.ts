"use server";

import { z } from "zod";
import { client } from "@/sanity/client";

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
  testimonialType: z.enum(["text", "video"]),
  videoUrl: z.string().url().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type TestimonialSubmission = z.infer<typeof testimonialSubmissionSchema>;

export async function submitTestimonial(data: TestimonialSubmission) {
  try {
    // Validate the submission data
    const validatedData = testimonialSubmissionSchema.parse(data);

    // Create the testimonial document in Sanity
    const result = await client.create({
      _type: "testimonial",
      name: validatedData.name,
      quote: validatedData.quote,
      rating: validatedData.rating,
      designation: validatedData.designation || "",
      location: validatedData.location || "",
      trekRoute: validatedData.trekRoute || "",
      trekDate: validatedData.trekDate || "",
      testimonialType: validatedData.testimonialType,
      videoUrl: validatedData.videoUrl || "",
      verified: false, // User-submitted testimonials are not verified by default
      status: "review", // Set status to review for admin approval
      submissionDate: new Date().toISOString(),
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

    return {
      success: false,
      error: "Failed to submit testimonial. Please try again later.",
    };
  }
}
