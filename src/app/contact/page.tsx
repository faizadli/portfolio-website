"use client";
import { useState } from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import TruckButton from "@/components/TruckButton";
import Toast from "@/components/Toast";
import { sendEmailAction } from "@/lib/sendEmail";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{
    type: "" | "success" | "error";
    message: string;
  }>({ type: "", message: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [toasts, setToasts] = useState<
    Array<{ id: number | string; message: string; type: "success" | "error" }>
  >([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id: number | string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = async (): Promise<boolean> => {
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (!form.name) nextErrors.name = "Name is required";
    if (!form.email) {
      nextErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email))
        nextErrors.email = "Invalid email format";
    }
    if (!form.message) nextErrors.message = "Message is required";

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setErrors(nextErrors);
      setStatus({ type: "", message: "" });
      return false;
    }

    try {
      const result = await sendEmailAction({
        ...form,
        to: "faizadli9912@gmail.com",
      });

      if (result.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        showToast("Message sent successfully!", "success");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        return true;
      } else {
        const errMsg = result.error || "Failed to send email";
        showToast(errMsg, "error");
        throw new Error(errMsg);
      }
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "An error occurred";
      setStatus({ type: "error", message: errMsg });
      showToast(errMsg, "error");
      return false;
    }
  };

  return (
    <div className="bg-background min-h-screen px-4 pt-10 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <h2 className="text-foreground mb-3 text-3xl font-bold sm:text-4xl">
          Contact
        </h2>
        <p className="text-foreground/70 mb-8">
          Interested in collaborating or have questions? Send me a message.
        </p>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="bg-card border-border rounded-xl border p-4 text-center">
            <div className="text-muted text-sm">Availability</div>
            <div className="text-base">Open to freelance</div>
          </div>
          <div className="bg-card border-border rounded-xl border p-4 text-center">
            <div className="text-muted text-sm">Response Time</div>
            <div className="text-base">24–48 hours</div>
          </div>
          <div className="bg-card border-border rounded-xl border p-4 text-center">
            <div className="text-muted text-sm">Email</div>
            <div className="text-base">faizadli9912@gmail.com</div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <a
            href="/assets/resume.pdf"
            className="border-brand/30 bg-brand/15 text-foreground hover:bg-brand/25 rounded-full border px-4 py-2 text-sm"
          >
            Download CV
          </a>
        </div>

        {/* Social Links */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            href="https://github.com/faizadli"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            className="border-border bg-card hover:bg-accent/10 flex w-full items-center gap-2 rounded-xl border p-3 transition-colors hover:border-white/20"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/faiz-adli/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile"
            className="border-border bg-card hover:bg-accent/10 flex w-full items-center gap-2 rounded-xl border p-3 transition-colors hover:border-white/20"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://www.instagram.com/faizadli.pflo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram profile"
            className="border-border bg-card hover:bg-accent/10 flex w-full items-center gap-2 rounded-xl border p-3 transition-colors hover:border-white/20"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className="border-border bg-card text-foreground w-full rounded-lg border px-4 py-3 transition-colors outline-none focus:border-white/20"
            placeholder="Name"
            value={form.name}
            onChange={(e) => {
              setForm((f) => ({ ...f, name: e.target.value }));
              if (errors.name)
                setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-500">
              {errors.name}
            </p>
          )}
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="border-border bg-card text-foreground w-full rounded-lg border px-4 py-3 transition-colors outline-none focus:border-white/20"
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              setForm((f) => ({ ...f, email: e.target.value }));
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-500">
              {errors.email}
            </p>
          )}
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="border-border bg-card text-foreground min-h-32 w-full rounded-lg border px-4 py-3 transition-colors outline-none focus:border-white/20 sm:min-h-40"
            placeholder="Message"
            value={form.message}
            onChange={(e) => {
              setForm((f) => ({ ...f, message: e.target.value }));
              if (errors.message)
                setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-500">
              {errors.message}
            </p>
          )}

          {/* Truck Button */}
          <TruckButton
            onSubmit={handleSubmit}
            onReset={() => setStatus({ type: "", message: "" })}
            labelDefault="Send Message"
            labelSuccess="Message Sent"
            className="mt-8 w-full sm:mt-10 sm:w-auto"
          />
        </form>
        {/* Toasts */}
        <div className="fixed top-4 right-4 z-50 space-y-3">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              id={t.id}
              message={t.message}
              type={t.type}
              onClose={removeToast}
            />
          ))}
        </div>
        <span className="sr-only" aria-live="polite">
          {status.message}
        </span>
      </div>
    </div>
  );
}
