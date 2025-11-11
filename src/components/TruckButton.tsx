"use client";
import React, { useRef } from "react";

interface TruckButtonProps {
  onSubmit: () => Promise<boolean> | boolean;
  onReset?: () => void;
  labelDefault?: string;
  labelSuccess?: string;
  className?: string;
}

export default function TruckButton({
  onSubmit,
  onReset,
  labelDefault = "Kirim Pesan",
  labelSuccess = "Pesan Terkirim",
  className,
}: TruckButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const truckRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const animateButton = () => {
    const button = buttonRef.current as HTMLButtonElement;
    const truck = truckRef.current as HTMLDivElement;
    const box = boxRef.current as HTMLDivElement;

    if (!button || button.classList.contains("done")) return;
    if (button.classList.contains("animation")) return;

    button.classList.add("animation");

    setTimeout(() => {
      button.style.setProperty('--box-s', '1');
      button.style.setProperty('--box-o', '1');
    }, 500);

    setTimeout(() => {
      box.style.transform = 'translate(0px, -6px) scale(1)';
    }, 700);

    setTimeout(() => {
      button.style.setProperty('--hx', '-5');
      button.style.setProperty('--bx', '50');
    }, 920);

    setTimeout(() => {
      box.style.transform = 'translate(0px, 0px) scale(1)';
    }, 1150);

    setTimeout(() => {
      button.style.setProperty('--truck-y', '1');
      button.style.setProperty('--truck-y-n', '-25');
    }, 1250);

    setTimeout(() => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.01;
        button.style.setProperty('--progress', Math.min(progress, 1).toString());
        if (progress >= 1) clearInterval(interval);
      }, 24);

      setTimeout(() => truck.style.transform = 'rotateX(90deg) translate3d(0px, -26px, 12px)', 0);
      setTimeout(() => truck.style.transform = 'rotateX(90deg) translate3d(40px, -26px, 12px)', 400);
      setTimeout(() => truck.style.transform = 'rotateX(90deg) translate3d(20px, -26px, 12px)', 1400);
      setTimeout(() => {
        truck.style.transform = 'rotateX(90deg) translate3d(96px, -26px, 12px)';
        button.classList.add("done");
      }, 2000);
    }, 1450);
  };

  const resetButton = () => {
    const button = buttonRef.current as HTMLButtonElement | null;
    const truck = truckRef.current as HTMLDivElement | null;
    const box = boxRef.current as HTMLDivElement | null;

    if (!button || !truck || !box) return;

    button.classList.remove("animation", "done");
    truck.style.transform = 'rotateX(90deg) translate3d(4px, -26px, 12px)';
    box.style.transform = 'translate(-24px, -6px) scale(0.5)';

    button.style.setProperty('--progress', '0');
    button.style.setProperty('--hx', '0');
    button.style.setProperty('--bx', '0');
    button.style.setProperty('--box-s', '0.5');
    button.style.setProperty('--box-o', '0');
    button.style.setProperty('--truck-y', '0');
    button.style.setProperty('--truck-y-n', '-26');
  };

  const handleClick = async () => {
    const button = buttonRef.current as HTMLButtonElement;
    if (!button) return;

    if (button.classList.contains("done")) {
      resetButton();
      onReset && onReset();
      return;
    }

    // Start animation and perform submission
    animateButton();
    const ok = await Promise.resolve(onSubmit());
    if (!ok) {
      resetButton();
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`truck-button ${className ?? ""}`}
      onClick={handleClick}
    >
      <span className="default">{labelDefault}</span>
      <span className="success">
        {labelSuccess}
        <svg viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      <div className="truck" ref={truckRef}>
        <div className="wheel"></div>
        <div className="back"></div>
        <div className="front"></div>
        <div className="box" ref={boxRef}></div>
      </div>
    </button>
  );
}