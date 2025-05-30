"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2Icon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitTestimonial } from "@/lib/actions/testimonialActions";
import { toast } from "sonner";
import Link from "next/link";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  quote: z.string().min(10, "Testimonial must be at least 10 characters"),
  rating: z.number().min(1).max(5),
  designation: z.string().optional(),
  location: z.string().optional(),
  trekRoute: z.string().optional(),
  trekDate: z.date().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  status: z.enum(["published", "review", "rejected"]).default("review"),
  verified: z.boolean().default(false),
  submissionDate: z.string().default(new Date().toISOString()),
});

type FormValues = z.infer<typeof formSchema>;

export default function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      quote: "",
      rating: 5,
      designation: "",
      location: "",
      trekRoute: "",
      acceptTerms: false,
      status: "review",
      verified: false,
      submissionDate: new Date().toISOString(),
    },
  });

  async function onSubmit(
    data: Omit<FormValues, "testimonialType" | "videoUrl">
  ) {
    setIsSubmitting(true);
    try {
      const result = await submitTestimonial({
        ...data,
        trekDate: data.trekDate
          ? format(data.trekDate, "yyyy-MM-dd")
          : undefined,
      });

      if (result.success) {
        setSubmitted(true);
        toast.success(
          "Thank you for your testimonial! It has been submitted for review."
        );
      } else {
        toast.error(
          result.error || "Failed to submit testimonial. Please try again."
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-lg text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <StarIcon className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-4">
          Thank You for Your Feedback!
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Your testimonial has been submitted and is awaiting review. We
          appreciate you taking the time to share your experience with us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/testimonials">View All Testimonials</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              form.reset();
              setSubmitted(false);
            }}
          >
            Submit Another Testimonial
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
      <p className="text-muted-foreground mb-8">
        Your feedback helps future trekkers and allows us to continuously
        improve our services.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession/Designation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Photographer, Engineer, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country/Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. United States, Germany, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trekRoute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trek Route</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Manaslu Circuit, Tsum Valley, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trekDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Trek Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MMMM yyyy")
                          ) : (
                            <span>When did you trek?</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2000-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => field.onChange(rating)}
                        className="focus:outline-none"
                      >
                        <StarIcon
                          className={cn(
                            "w-8 h-8 transition-colors",
                            rating <= field.value
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Testimonial</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience with us..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <Link
                      href="/terms-conditions"
                      className="text-primary hover:underline"
                    >
                      terms and conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      privacy policy
                    </Link>
                    .
                  </FormLabel>
                  <FormDescription>
                    By submitting, you allow us to use your testimonial on our
                    website.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Testimonial"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
