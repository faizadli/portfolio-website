"use client";
import { useState } from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import TruckButton from "@/components/TruckButton";
import Toast from "@/components/Toast";
import { sendEmailAction } from "@/lib/sendEmail";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "" | "success" | "error"; message: string }>({ type: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [toasts, setToasts] = useState<Array<{ id: number | string; message: string; type: "success" | "error" }>>([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id: number | string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = async (): Promise<boolean> => {
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (!form.name) nextErrors.name = "Nama wajib diisi";
    if (!form.email) {
      nextErrors.email = "Email wajib diisi";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) nextErrors.email = "Format email tidak valid";
    }
    if (!form.message) nextErrors.message = "Pesan wajib diisi";

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setErrors(nextErrors);
      setStatus({ type: "", message: "" });
      return false;
    }

    try {
      const result = await sendEmailAction({
        ...form,
        to: 'faizadli9912@gmail.com'
      });

      if (result.ok) {
        setStatus({ type: "success", message: "Pesan berhasil dikirim!" });
        showToast("Pesan berhasil dikirim!", "success");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        return true;
      } else {
        const errMsg = result.error || 'Gagal mengirim email';
        showToast(errMsg, "error");
        throw new Error(errMsg);
      }
    } catch (error: any) {
      const errMsg = error.message || 'Terjadi kesalahan';
      setStatus({ type: "error", message: errMsg });
      showToast(errMsg, "error");
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Contact</h2>
        <p className="text-foreground/70 mb-8">
          Tertarik bekerja sama atau ada pertanyaan? Kirimkan pesan Anda.
        </p>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <a
            href="https://github.com/faizadli"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka profil GitHub"
            className="w-full flex items-center gap-2 rounded-xl border border-border bg-card p-3 hover:border-white/20 transition-colors"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/faiz-adli/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka profil LinkedIn"
            className="w-full flex items-center gap-2 rounded-xl border border-border bg-card p-3 hover:border-white/20 transition-colors"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href="https://www.instagram.com/faizadli.pflo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka profil Instagram"
            className="w-full flex items-center gap-2 rounded-xl border border-border bg-card p-3 hover:border-white/20 transition-colors"
          >
            <Instagram className="w-4 h-4" /> Instagram
          </a>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name" className="sr-only">Nama</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className="w-full rounded-lg border border-border bg-card text-foreground px-4 py-3 outline-none focus:border-white/20 transition-colors"
            placeholder="Nama"
            value={form.name}
            onChange={(e) => {
              setForm((f) => ({ ...f, name: e.target.value }));
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-border bg-card text-foreground px-4 py-3 outline-none focus:border-white/20 transition-colors"
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              setForm((f) => ({ ...f, email: e.target.value }));
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
          <label htmlFor="message" className="sr-only">Pesan</label>
          <textarea
            id="message"
            name="message"
            required
            className="w-full rounded-lg border border-border bg-card text-foreground px-4 py-3 outline-none focus:border-white/20 min-h-32 sm:min-h-40 transition-colors"
            placeholder="Pesan"
            value={form.message}
            onChange={(e) => {
              setForm((f) => ({ ...f, message: e.target.value }));
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500 mt-1">{errors.message}</p>
          )}

          {/* Truck Button */}
          <TruckButton
            onSubmit={handleSubmit}
            onReset={() => setStatus({ type: "", message: "" })}
            labelDefault="Kirim Pesan"
            labelSuccess="Pesan Terkirim"
            className="w-full sm:w-auto mt-8 sm:mt-10"
          />
        </form>
        {/* Toasts */}
        <div className="fixed top-4 right-4 z-50 space-y-3">
          {toasts.map((t) => (
            <Toast key={t.id} id={t.id} message={t.message} type={t.type} onClose={removeToast} />
          ))}
        </div>
      </div>
    </div>
  );
}
