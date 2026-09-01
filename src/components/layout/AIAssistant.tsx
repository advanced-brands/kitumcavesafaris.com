"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/packages";

type Message = {
  role: "user" | "assistant";
  content: string;
  links?: { label: string; href: string }[];
};

const quickReplies = [
  "What packages do you offer?",
  "How do I book a trip?",
  "Tell me about gorilla trekking",
  "What's your contact info?",
];

const knowledgeBase: Record<string, { answer: string; links?: { label: string; href: string }[] }> = {
  packages: {
    answer:
      "We offer curated travel packages across East Africa — Uganda, Kenya, Tanzania, Rwanda, and Zanzibar. Journeys outside that map are quoted on request; we do not list placeholder countries.",
    links: [
      { label: "East African Packages", href: "/packages/east-africa" },
      { label: "International Packages", href: "/packages/international" },
    ],
  },
  book: {
    answer:
      "You can book directly through any package page by clicking 'Book This Journey', or reach out via our inquiry form if you'd like a custom trip planned for you.",
    links: [
      { label: "Plan Your Journey", href: "/plan-your-journey" },
      { label: "View Packages", href: "/packages/east-africa" },
    ],
  },
  gorilla: {
    answer:
      "Our flagship experience is the 3-Day Gorilla Safari to Bwindi Impenetrable National Park and Lake Bunyonyi. You'll track mountain gorillas in their natural habitat — one of Africa's most profound wildlife encounters. Treks take 2-6 hours and permits must be booked in advance.",
    links: [
      { label: "View Gorilla Safari", href: "/packages/3-days-gorilla-safari" },
      { label: "Read About Gorillas", href: "/blog/mountain-gorillas-uganda" },
    ],
  },
  contact: {
    answer: `You can reach us at:\n• Email: ${siteConfig.email}\n• Phone: ${siteConfig.phone}\n• WhatsApp: ${siteConfig.whatsappDisplay}\n• Location: ${siteConfig.address}`,
    links: [
      { label: "Contact Page", href: "/contact" },
      { label: "Chat on WhatsApp", href: `https://wa.me/${siteConfig.whatsapp}` },
    ],
  },
  price: {
    answer:
      "Package pricing varies depending on the destination, duration, and season. Please view individual package pages for details, or contact us for a custom quote tailored to your travel dates and group size.",
    links: [
      { label: "View Packages", href: "/packages/east-africa" },
      { label: "Send Inquiry", href: "/plan-your-journey" },
    ],
  },
  payment: {
    answer:
      "A 30% deposit confirms most safaris; gorilla permits are paid in full up front. You can prefer card, mobile money, or bank transfer. Online card checkout waits on the owner's payment-gateway details — until then we confirm by email or WhatsApp and send payment instructions. You will get a receipt when money has actually been received.",
    links: [
      { label: "Plan Your Journey", href: "/plan-your-journey" },
      { label: "WhatsApp the team", href: `https://wa.me/${siteConfig.whatsapp}` },
    ],
  },
  default: {
    answer:
      "Thank you for your question! For detailed assistance, I'd recommend reaching out to our team directly. We're happy to help plan your perfect journey.",
    links: [
      { label: "Plan Your Journey", href: "/plan-your-journey" },
      { label: "Contact Us", href: "/contact" },
      { label: "Chat on WhatsApp", href: `https://wa.me/${siteConfig.whatsapp}` },
    ],
  },
};

function findAnswer(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes("package") || lower.includes("offer") || lower.includes("destination") || lower.includes("trip"))
    return knowledgeBase.packages;
  if (lower.includes("book") || lower.includes("reserve") || lower.includes("how do i"))
    return knowledgeBase.book;
  if (lower.includes("gorilla") || lower.includes("bwindi") || lower.includes("trek"))
    return knowledgeBase.gorilla;
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("where"))
    return knowledgeBase.contact;
  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much"))
    return knowledgeBase.price;
  if (lower.includes("pay") || lower.includes("deposit") || lower.includes("payment"))
    return knowledgeBase.payment;
  return knowledgeBase.default;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to Kitum Cave Safaris! I'm here to help you explore our journeys across Uganda, East Africa, and beyond. How can I assist you?",
      links: [
        { label: "Explore Packages", href: "/packages/east-africa" },
        { label: "Plan Your Journey", href: "/plan-your-journey" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = findAnswer(messageText);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.answer, links: response.links },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center justify-center w-14 h-14 bg-brand-forest text-brand-cream shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="Open travel assistant"
      >
        <MessageCircle size={24} />
      </button>

      <div
        className={cn(
          "fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[min(400px,calc(100%-2rem))] bg-white shadow-2xl border border-brand-sand-dark transition-all duration-300 origin-bottom-left",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-brand-forest text-brand-cream">
          <div>
            <h3 className="font-serif text-lg">Travel Assistant</h3>
            <p className="text-xs text-brand-cream/60">Kitum Cave Safaris</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-brand-forest-light rounded transition-colors"
            aria-label="Close assistant"
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-[360px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-brand-forest text-brand-cream"
                    : "bg-brand-sand text-brand-charcoal"
                )}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
                {msg.links && (
                  <div className="mt-3 space-y-2">
                    {msg.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-1 text-xs font-medium text-brand-terracotta hover:text-brand-terracotta-dark transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <ArrowRight size={12} />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-brand-sand px-4 py-3 text-sm text-brand-charcoal/50">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSend(reply)}
              className="text-xs px-3 py-1.5 border border-brand-sand-dark text-brand-charcoal/70 hover:border-brand-forest hover:text-brand-forest transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 pb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about our journeys..."
            className="flex-1 px-3 py-2.5 text-sm border border-brand-sand-dark focus:outline-none focus:ring-1 focus:ring-brand-forest"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-brand-forest text-brand-cream hover:bg-brand-forest-light transition-colors"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
