import React from "react";
import { brand } from "@/data/content";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Our Services", href: "#services" },
    { label: "Why Choose Us", href: "#why-us" },
    { label: "Housing Schemes", href: "#schemes" },
    { label: "Contact Us", href: "#contact" },
  ];

  const contactItems = [
    { Icon: MapPin, content: brand.contact.address, href: brand.contact.mapUrl },
    { Icon: Phone, content: brand.contact.phone, href: brand.contact.phoneUrl },
    { Icon: Mail, content: brand.contact.email, href: `mailto:${brand.contact.email}` },
    { Icon: Clock, content: brand.contact.hours },
  ];

  return (
    <footer className="bg-dark text-bg/75 border-t border-bg/5">
      <div className="container mx-auto px-5 sm:px-8 md:px-12 pt-14 md:pt-20 pb-10 md:pb-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 mb-12 md:mb-16">

          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 md:col-span-1">
            {/* Logo on ivory plate */}
            <div className="inline-flex bg-bg p-3 rounded-xl shadow-soft">
              <img src="/images/bdjet-homes.png" alt="Budget Homes" className="h-9 md:h-10 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-bg/60">
              {brand.intro}
            </p>
            {/* Social placeholder */}
            <p className="text-xs text-bg/30 italic">
              {/* TODO: SOCIAL_URLS — add social links */}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="font-semibold text-bg text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-bg/60 hover:text-brand-amber transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="font-semibold text-bg text-sm tracking-wide uppercase">Get in Touch</h4>
            <ul className="space-y-4">
              {contactItems.map(({ Icon, content, href }) => (
                <li key={content} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-bg/60 hover:text-brand-amber transition-colors leading-relaxed break-all"
                    >
                      {content}
                    </a>
                  ) : (
                    <span className="text-sm text-bg/60 leading-relaxed">{content}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-bg/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bg/35">
          <p>© {currentYear} {brand.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-bg/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-bg/60 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
