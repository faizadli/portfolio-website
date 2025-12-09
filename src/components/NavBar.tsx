"use client";

import StaggeredMenu from "@/components/StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About Me", ariaLabel: "Learn about me", link: "/about" },
  { label: "Projects", ariaLabel: "View my projects", link: "/projects" },
  {
    label: "Certificate",
    ariaLabel: "View my certificates",
    link: "/certificate",
  },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "GitHub", link: "https://github.com/yourusername" },
  { label: "LinkedIn", link: "https://linkedin.com/in/yourusername" },
  { label: "Twitter", link: "https://twitter.com/yourusername" },
];

export default function NavBar() {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="var(--brand)"
      openMenuButtonColor="var(--brand)"
      changeMenuColorOnOpen={true}
      colors={[
        "var(--surface)",
        "var(--background)",
        "var(--brand)",
        "var(--accent)",
      ]}
      accentColor="var(--accent)"
      isFixed={true}
      onMenuOpen={() => console.log("Menu opened")}
      onMenuClose={() => console.log("Menu closed")}
    />
  );
}
