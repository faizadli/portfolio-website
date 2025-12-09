"use client";
import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  id: number | string;
  message: string;
  type: "success" | "error";
  onClose: (id: number | string) => void;
  duration?: number; // ms
}

export default function Toast({
  id,
  message,
  type,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(t);
  }, [id, duration, onClose]);

  const isSuccess = type === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className={`relative overflow-hidden rounded-xl border ${
        isSuccess ? "border-emerald-500/40" : "border-red-500/40"
      } bg-card text-foreground shadow-lg`}
    >
      <div
        className={`absolute inset-y-0 left-0 w-1 ${isSuccess ? "bg-emerald-500" : "bg-red-500"}`}
      />
      <div className="flex items-start gap-3 p-3 pl-4 sm:p-4">
        {isSuccess ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
        ) : (
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
        )}
        <div className="flex-1 text-sm">{message}</div>
        <button
          type="button"
          aria-label="Close notification"
          onClick={() => onClose(id)}
          className="text-foreground/70 hover:text-foreground inline-flex items-center justify-center rounded-md p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
