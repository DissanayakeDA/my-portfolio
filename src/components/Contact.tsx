"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send your message.");
      }

      setSubmitMessage({
        type: "success",
        text: data?.message || "Message sent successfully.",
      });
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send your message. Please try again.";
      setSubmitMessage({
        type: "error",
        text: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    "peer w-full bg-transparent border-b border-border py-4 text-lg md:text-xl text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary transition-colors";

  const fields = [
    { id: "name", label: "What's your name?", placeholder: "John Doe", type: "text" },
    { id: "email", label: "Your email", placeholder: "john@example.com", type: "email" },
    { id: "subject", label: "What's it about?", placeholder: "Project inquiry", type: "text" },
  ] as const;

  const details = [
    { label: "Email", value: "dumindudissanayake2k01@gmail.com", href: "mailto:dumindudissanayake2k01@gmail.com" },
    { label: "Phone", value: "+94 77 248 49 30", href: "tel:+94772484930" },
    { label: "Location", value: "Colombo, Sri Lanka" },
  ];

  return (
    <section className="px-[var(--gutter)] py-24 md:py-36">
      <SectionHeading
        index="06 / 06"
        label="Contact"
        title="Start a"
        accent="project"
        aside="Have a project in mind or just want to say hi? I'm always open to new ideas and opportunities."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 space-y-8"
        >
          {details.map((d) => (
            <div key={d.label}>
              <dt className="label text-foreground/50 mb-2">({d.label})</dt>
              <dd className="text-lg md:text-xl break-words">
                {d.href ? (
                  <a href={d.href} className="hover:text-primary transition-colors">
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lg:col-span-8 space-y-8"
        >
          {fields.map((f, i) => (
            <div key={f.id} className="flex gap-4 md:gap-8">
              <span className="label text-foreground/40 pt-6">({String(i + 1).padStart(2, "0")})</span>
              <div className="flex-1">
                <label htmlFor={f.id} className="label text-foreground/60">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  id={f.id}
                  name={f.id}
                  required
                  value={formState[f.id]}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder={f.placeholder}
                />
              </div>
            </div>
          ))}

          <div className="flex gap-4 md:gap-8">
            <span className="label text-foreground/40 pt-6">(04)</span>
            <div className="flex-1">
              <label htmlFor="message" className="label text-foreground/60">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formState.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project..."
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between pt-4">
            {submitMessage ? (
              <p
                className={`label ${submitMessage.type === "success" ? "text-primary" : "text-red-400"}`}
                role="status"
                aria-live="polite"
              >
                {submitMessage.text}
              </p>
            ) : (
              <span />
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              data-cursor="Send"
              className="group relative overflow-hidden rounded-full border border-foreground px-8 py-4 label font-bold text-foreground hover:text-background disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative flex items-center gap-3">
                {isSubmitting ? "Sending..." : "Send message"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
