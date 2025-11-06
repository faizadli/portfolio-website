"use client";
import Reveal from "@/components/Reveal";
import TextSplit from "@/components/TextSplit";
import { useState } from "react";
import { Mail, Github, Linkedin, Phone } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section className="container py-16">
      <Reveal y={28}><TextSplit as="h2" text="Contact" className="heading text-4xl" variant="wave" mode="words" /></Reveal>
      <Reveal y={24} delay={0.12}>
        <p className="mt-6 max-w-2xl text-foreground/80">Tertarik bekerja sama atau ada pertanyaan? Kirimkan pesan Anda.</p>
      </Reveal>

      {/* Social quick links */}
      <Reveal y={20} delay={0.18}>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
          <a href="mailto:faiz@example.com" className="flex items-center gap-2 rounded-xl border border-white/10 p-3 hover:border-white/20">
            <Mail className="size-4" /> Email
          </a>
          <a href="https://github.com/username" target="_blank" className="flex items-center gap-2 rounded-xl border border-white/10 p-3 hover:border-white/20">
            <Github className="size-4" /> GitHub
          </a>
          <a href="https://linkedin.com/in/username" target="_blank" className="flex items-center gap-2 rounded-xl border border-white/10 p-3 hover:border-white/20">
            <Linkedin className="size-4" /> LinkedIn
          </a>
          <a href="tel:+6200000000" className="flex items-center gap-2 rounded-xl border border-white/10 p-3 hover:border-white/20">
            <Phone className="size-4" /> Telepon
          </a>
        </div>
      </Reveal>
      <Reveal y={20} delay={0.2}>
        <form className="mt-8 grid gap-4 max-w-xl">
          <input
            className="rounded-lg border border-white/10 bg-background/40 px-4 py-3 outline-none focus:border-white/20"
            placeholder="Nama"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="rounded-lg border border-white/10 bg-background/40 px-4 py-3 outline-none focus:border-white/20"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <textarea
            className="rounded-lg border border-white/10 bg-background/40 px-4 py-3 outline-none focus:border-white/20 min-h-32"
            placeholder="Pesan"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          />
          <div className="flex gap-3">
            <a
              href={`mailto:faiz@example.com?subject=Portfolio%20Contact&body=${encodeURIComponent(form.message)}%0A%0AFrom:%20${encodeURIComponent(form.name)}%20<${encodeURIComponent(form.email)}>`}
              className="px-5 py-2.5 rounded-full bg-brand/90 text-white hover:bg-brand transition-colors"
            >
              Kirim Email
            </a>
            <button
              type="reset"
              onClick={() => setForm({ name: "", email: "", message: "" })}
              className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20"
            >
              Reset
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}