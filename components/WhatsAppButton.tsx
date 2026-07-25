"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = 2348102623213; // Replace with your WhatsApp number

  return (
    <a
      href={`https://wa.me/${phone}?text=Hello%20OT.KA,%20I'd%20like%20to%20book%20you%20for%20football%20photography.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-110 hover:bg-green-600"
    >
      <MessageCircle size={28} />
    </a>
  );
}