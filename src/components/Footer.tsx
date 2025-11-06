export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="container py-8 text-sm text-foreground/60 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Mochamad Faiz Adli. All rights reserved.</p>
        <p className="subtle">Crafted with Next.js, Tailwind & GSAP.</p>
      </div>
    </footer>
  );
}