import NextLink from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="container py-10">
        <div className="grid gap-8 text-sm md:grid-cols-3">
          <div>
            <div className="text-foreground text-base font-semibold">
              Mochamad Faiz Adli
            </div>
            <p className="subtle text-foreground/70 mt-1">
              Fullstack Developer · Open to freelance
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="mailto:faizadli9912@gmail.com"
                aria-label="Send email"
                className="border-brand/30 bg-brand/15 text-foreground hover:bg-brand/25 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
              <a
                href="/assets/cv/Resume Mochammad Faiz Adli.pdf"
                download
                className="border-accent/30 bg-accent/15 text-foreground hover:bg-accent/25 rounded-full border px-3 py-1.5"
              >
                Download CV
              </a>
            </div>
          </div>
          <div>
            <div className="text-foreground mb-2 text-xs">Pages</div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <NextLink
                href="/"
                className="text-foreground/70 hover:text-foreground"
                aria-label="Go to Home"
              >
                Home
              </NextLink>
              <NextLink
                href="/projects"
                className="text-foreground/70 hover:text-foreground"
                aria-label="View Projects"
              >
                Projects
              </NextLink>
              <NextLink
                href="/certificate"
                className="text-foreground/70 hover:text-foreground"
                aria-label="View Certificates"
              >
                Certificates
              </NextLink>
              <NextLink
                href="/about"
                className="text-foreground/70 hover:text-foreground"
                aria-label="Learn About"
              >
                About
              </NextLink>
              <NextLink
                href="/contact"
                className="text-foreground/70 hover:text-foreground"
                aria-label="Contact"
              >
                Contact
              </NextLink>
            </div>
          </div>
          <div>
            <div className="text-foreground mb-2 text-xs">Connect</div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://github.com/faizadli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile"
                className="border-border bg-card hover:bg-accent/10 text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/faiz-adli/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile"
                className="border-border bg-card hover:bg-accent/10 text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/faizadli.pflo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Instagram profile"
                className="border-border bg-card hover:bg-accent/10 text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              >
                <Instagram className="h-3.5 w-3.5" />
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="text-foreground/60 mt-8 flex items-center justify-between text-xs">
          <p>
            © {new Date().getFullYear()} Mochamad Faiz Adli. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
