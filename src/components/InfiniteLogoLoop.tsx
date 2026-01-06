"use client";
import React from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGreensock,
  SiLaravel,
  SiPhp,
  SiOpenjdk,
  SiJavascript,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiSwagger,
  SiPostman,
  SiFigma,
  SiAdobexd,
  SiAdobeaftereffects,
  SiGit,
  SiExpress,
  SiGo,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiJquery,
  SiArduino,
  SiSwift,
} from "react-icons/si";

type TechLogo = {
  name: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

export const DEFAULT_LOGOS: TechLogo[] = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "GSAP", Icon: SiGreensock },
  { name: "Laravel", Icon: SiLaravel },
  { name: "PHP", Icon: SiPhp },
  { name: "Java", Icon: SiOpenjdk },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss3 },
  { name: "Bootstrap", Icon: SiBootstrap },
  { name: "Swagger UI", Icon: SiSwagger },
  { name: "Postman", Icon: SiPostman },
  { name: "Figma", Icon: SiFigma },
  { name: "Adobe XD", Icon: SiAdobexd },
  { name: "After Effects", Icon: SiAdobeaftereffects },
  { name: "Git", Icon: SiGit },
  { name: "Express", Icon: SiExpress },
  { name: "Go", Icon: SiGo },
  { name: "Docker", Icon: SiDocker },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MySQL", Icon: SiMysql },
  { name: "jQuery", Icon: SiJquery },
  { name: "Arduino", Icon: SiArduino },
  { name: "Swift", Icon: SiSwift },
];

// DEFAULT_LOGOS now sourced from shared data

export default function InfiniteLogoLoop({
  logos = DEFAULT_LOGOS,
}: {
  logos?: TechLogo[];
}) {
  // Per track repeat to ensure width > container, preventing visible gap
  const LOOP_MULTIPLIER = 3;
  const trackItems: TechLogo[] = Array.from({
    length: LOOP_MULTIPLIER,
  }).flatMap(() => logos);

  return (
    <div className="logo-loop group">
      <div className="logo-shelf">
        {/* Track A */}
        <div className="logo-track track-a">
          {trackItems.map(({ name, Icon }, idx) => (
            <div
              key={`a-${name}-${idx}`}
              className="logo-item"
              title={name}
              aria-label={name}
            >
              <Icon size={26} className="icon" />
              <span className="sr-only">{name}</span>
            </div>
          ))}
        </div>
        {/* Track B (offset) */}
        <div className="logo-track track-b">
          {trackItems.map(({ name, Icon }, idx) => (
            <div
              key={`b-${name}-${idx}`}
              className="logo-item"
              title={name}
              aria-label={name}
            >
              <Icon size={26} className="icon" />
              <span className="sr-only">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
