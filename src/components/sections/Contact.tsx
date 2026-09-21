"use client";

import React, { useState } from "react";
import { brand } from "@/data/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number." })
    .regex(/^\+?[\d\s\-()]+$/, { message: "Invalid phone format." }),
  need: z.string().min(1, { message: "Please select a requirement." }),
  message: z.string().optional(),
});

const contactItems = [
  {
    Icon: MapPin,
    label: "Office Address",
    value: brand.contact.address,
    href: brand.contact.mapUrl,
    linkLabel: "View on Map",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: brand.contact.phone,
    href: brand.contact.phoneUrl,
  },
  {
    Icon: Mail,
    label: "Email",
    value: brand.contact.email,
    href: `mailto:${brand.contact.email}`,
  },
  {
    Icon: Clock,
    label: "Working Hours",
    value: brand.contact.hours,
  },
];

import { BlurFade } from "@/components/ui/blur-fade";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", need: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Construct email body
    const subject = encodeURIComponent(`New Enquiry from ${values.name} - ${values.need}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\n` +
      `Phone: ${values.phone}\n` +
      `Requirement: ${values.need}\n\n` +
      `Message:\n${values.message || "No additional message."}`
    );
    
    // Trigger mailto link
    window.location.href = `mailto:${brand.contact.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  }

  return (
    <section id="contact" className="py-14 md:py-24 bg-dark relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(var(--color-bg) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      {/* Ambient glow */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(230,145,15,0.06), transparent 60%)" }}
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: Contact Info ──────────────────────────── */}
          <BlurFade delay={0.1} inView className="flex flex-col justify-center">
            <p className="eyebrow text-brand-amber mb-4">Contact Us</p>
            <h3 className="h2-fluid font-display text-bg mb-6 leading-tight">
              Let's discuss your<br className="hidden md:block" /> dream home
            </h3>
            <p className="text-bg/75 body-base mb-10 max-w-md">
              We are ready to help you with planning, permits, design, and construction. Reach out for a free consultation.
            </p>

            <div className="space-y-6 md:space-y-8">
              {contactItems.map(({ Icon, label, value, href, linkLabel }, i) => (
                <BlurFade key={label} delay={0.2 + (i * 0.1)} inView>
                  <div className="flex gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-bg/5 flex items-center justify-center shrink-0 border border-bg/10 group-hover:bg-brand-amber/10 group-hover:border-brand-amber/30 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-brand-amber group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-bg font-medium text-sm mb-1">{label}</h4>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-bg/65 text-sm hover:text-brand-amber transition-colors leading-relaxed break-words block"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-bg/65 text-sm leading-relaxed">{value}</p>
                      )}
                      {linkLabel && href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-amber text-xs mt-1.5 inline-block hover:underline font-medium"
                        >
                          {linkLabel} →
                        </a>
                      )}
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </BlurFade>

          {/* ── Right: Form ─────────────────────────────────── */}
          <BlurFade delay={0.4} inView>
            <div className="bg-bg rounded-3xl p-7 sm:p-10 md:p-12 shadow-raised relative group hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)] transition-shadow duration-500">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 min-h-[400px]">
                  <div className="w-16 h-16 bg-brand-green-tint rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-brand-green" />
                  </div>
                  <h4 className="font-display text-2xl md:text-3xl text-ink mb-3">Request Sent!</h4>
                  <p className="text-ink-soft mb-8 max-w-xs text-sm leading-relaxed">
                    Thank you for reaching out. One of our experts will contact you shortly to discuss your requirements.
                  </p>
                  <Button
                    onClick={() => { setIsSuccess(false); form.reset(); }}
                    variant="outline"
                    className="rounded-full"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <h4 className="font-display text-2xl text-ink mb-6">Send an Enquiry</h4>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink-soft text-sm">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="bg-bg-alt border-line focus-visible:ring-brand-orange rounded-xl h-11 text-ink placeholder:text-ink/35 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink-soft text-sm">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+91 XXXXX XXXXX"
                              type="tel"
                              className="bg-bg-alt border-line focus-visible:ring-brand-orange rounded-xl h-11 text-ink placeholder:text-ink/35 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="need"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink-soft text-sm">I am looking to</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-bg-alt border-line rounded-xl h-11 text-ink focus-visible:ring-brand-orange transition-colors">
                                <SelectValue placeholder="Select a requirement" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl bg-bg border border-line shadow-raised z-50">
                              <SelectItem value="Buy plot & build" className="cursor-pointer hover:bg-bg-alt">Buy plot &amp; build</SelectItem>
                              <SelectItem value="Build on own land" className="cursor-pointer hover:bg-bg-alt">Build on own land</SelectItem>
                              <SelectItem value="Renovate" className="cursor-pointer hover:bg-bg-alt">Renovate</SelectItem>
                              <SelectItem value="Other" className="cursor-pointer hover:bg-bg-alt">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink-soft text-sm">
                            Additional Details <span className="text-ink/30">(Optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a bit more about your dream home..."
                              className="bg-bg-alt border-line focus-visible:ring-brand-orange rounded-xl resize-none min-h-[90px] text-ink placeholder:text-ink/35 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-12 bg-brand-gradient text-ink font-semibold text-base mt-2 shadow-orange hover:brightness-110"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-ink/40 border-t-ink rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Submit Request
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
