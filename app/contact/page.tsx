"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { User, Mail, Trophy, MessageSquare } from "lucide-react";

export default function ContactPage() {
    const form = useRef<HTMLFormElement>(null);
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!form.current) return;

  emailjs
    .sendForm(
      "service_uumhi7b",
      "template_u9kw446",
      form.current,
      "2oz5NUDpKTW-vNkv0"
    )
    .then(() => {
      alert("Message sent successfully!");
      form.current?.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message.");
    });
};
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-5xl font-bold">
          Contact OT.KA
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Ready to book a football photography session? Let's talk.
        </p>

       <form
  ref={form}
  onSubmit={sendEmail}
  className="mt-12 space-y-6"
>

  <div className="flex items-center rounded-lg bg-zinc-900 px-4">
    <User className="text-green-500" size={20} />
    <input
  name="from_name"
  type="text"
  placeholder="Your Name"
  className="w-full bg-transparent p-4 outline-none"
  required
/>
  </div>

  <div className="flex items-center rounded-lg bg-zinc-900 px-4">
    <Mail className="text-green-500" size={20} />
    <input
  name="from_email"
  type="email"
  placeholder="Email Address"
  className="w-full bg-transparent p-4 outline-none"
  required
/>
  </div>

  <div className="flex items-center rounded-lg bg-zinc-900 px-4">
    <Trophy className="text-green-500" size={20} />
    <input
  name="event"
  type="text"
  placeholder="Match or Event"
  className="w-full bg-transparent p-4 outline-none"
  required
/>
  </div>

  <div className="flex rounded-lg bg-zinc-900 px-4 pt-4">
    <MessageSquare className="mt-1 text-green-500" size={20} />
    <textarea
  name="message"
  rows={6}
  placeholder="Tell me about your event..."
  className="w-full resize-none bg-transparent p-4 outline-none"
  required
/>
  </div>

  <button
    className="w-full rounded-lg bg-green-500 py-4 font-bold transition hover:bg-green-600"
  >
    Send Message
  </button>

</form>
      </div>
    </main>
  );
}