"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'upload");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Erreur réseau lors de l'upload");
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  if (value) {
    return (
      <div className={cn("relative inline-block", className)}>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <Image src={value} alt="Image uploadée" fill className="object-cover" />
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm"
        >
          <X size={12} />
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-slate-100",
          isUploading && "pointer-events-none opacity-60"
        )}
      >
        {isUploading ? (
          <>
            <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm text-slate-500">Envoi en cours…</span>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              {isDragging ? <Upload size={18} className="text-blue-600" /> : <ImageIcon size={18} className="text-slate-400" />}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">
                {isDragging ? "Déposez l'image ici" : "Cliquez ou glissez une image"}
              </p>
              <p className="text-xs text-slate-400 mt-1">JPEG, PNG, WebP, GIF — max 5 Mo</p>
            </div>
          </>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
