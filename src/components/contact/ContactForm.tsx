"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { contactFormSchema, type ContactFormValues } from "@/lib/schema";
import { sendContactEmail } from "@/lib/actions";
import { Loader2Icon, SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = "" }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await sendContactEmail(data);

      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`shadow-none ${className}`}>
      <CardContent className="p-6 md:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
          <p className="text-muted-foreground">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
            <div className="col-span-2 sm:col-span-1">
              <Label
                htmlFor="firstName"
                className={cn(
                  "text-sm font-medium",
                  errors.firstName ? "text-destructive" : ""
                )}
              >
                First Name
              </Label>
              <Input
                {...register("firstName")}
                placeholder="Your first name"
                id="firstName"
                className={cn(
                  "mt-1.5 h-11 bg-white/5  backdrop-blur-sm border-gray-400 focus:border-primary/50 shadow-none",
                  errors.firstName ? "border-destructive" : ""
                )}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label
                htmlFor="lastName"
                className={cn(
                  "text-sm font-medium",
                  errors.lastName ? "text-destructive" : ""
                )}
              >
                Last Name
              </Label>
              <Input
                {...register("lastName")}
                placeholder="Your last name"
                id="lastName"
                className={cn(
                  "mt-1.5 h-11 bg-white/5  backdrop-blur-sm border-gray-400 focus:border-primary/50 shadow-none",
                  errors.lastName ? "border-destructive" : ""
                )}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <Label
                htmlFor="email"
                className={cn(
                  "text-sm font-medium",
                  errors.email ? "text-destructive" : ""
                )}
              >
                Email
              </Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="your.email@example.com"
                id="email"
                className={cn(
                  "mt-1.5 h-11 bg-white/5  backdrop-blur-sm border-gray-400 focus:border-primary/50 shadow-none",
                  errors.email ? "border-destructive" : ""
                )}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <Label
                htmlFor="message"
                className={cn(
                  "text-sm font-medium",
                  errors.message ? "text-destructive" : ""
                )}
              >
                Message
              </Label>
              <Textarea
                {...register("message")}
                id="message"
                placeholder="Tell us about your trekking plans, questions, or special requirements..."
                className={cn(
                  "mt-1.5 bg-white/5  backdrop-blur-sm border-gray-400 focus:border-primary/50 shadow-none min-h-[150px]",
                  errors.message ? "border-destructive" : ""
                )}
                rows={6}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="col-span-2 flex items-start gap-2">
              <Checkbox
                id="acceptTerms"
                {...register("acceptTerms")}
                className={cn(
                  "border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary",
                  errors.acceptTerms ? "border-destructive" : ""
                )}
              />
              <div>
                <Label
                  htmlFor="acceptTerms"
                  className={cn(
                    "text-sm",
                    errors.acceptTerms ? "text-destructive" : ""
                  )}
                >
                  I agree to the{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:underline"
                  >
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms of service
                  </Link>
                  .
                </Label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Button
            className="mt-8 w-full bg-primary hover:bg-primary/90 text-white group"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <SendIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
