"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

type Props = {
  value?: { url: string; publicId: string; alt: string };
  onChange: (v: { url: string; publicId: string; alt: string } | null) => void;
};

export function ImageUploader({ value, onChange }: Props) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setErr(null);
    setBusy(true);
    try {
      const signRes = await fetch("/api/uploads/sign");
      const signData = await signRes.json();
      if (!signData.ok) throw new Error(signData.error || "Sign failed");
      const { signature, timestamp, folder, apiKey, cloudName } = signData.data;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", apiKey);
      fd.append("timestamp", String(timestamp));
      fd.append("folder", folder);
      fd.append("signature", signature);
      const up = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: "POST",
        body: fd,
      });
      const upData = await up.json();
      if (upData.error) throw new Error(upData.error.message);
      onChange({ url: upData.secure_url, publicId: upData.public_id, alt: value?.alt || "" });
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {value?.url ? (
        <div className="space-y-3">
          <div className="relative aspect-[16/9] rounded-card overflow-hidden bg-admin-surface border border-admin-border">
            <Image src={value.url} alt={value.alt || ""} fill className="object-cover" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 grid place-items-center text-ink hover:text-red-600"
            >
              <X size={14} />
            </button>
          </div>
          <input
            value={value.alt}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
            placeholder="Image alt text (describes the image for accessibility)"
            className="w-full h-10 px-3 rounded-[8px] border border-admin-border focus:border-forest outline-none text-[13px]"
          />
        </div>
      ) : (
        <label className="block border border-dashed border-admin-border hover:border-forest rounded-card cursor-pointer transition-colors">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <div className="py-10 grid place-items-center text-ink-2">
            <Upload size={18} className="mb-2" />
            <p className="text-[13px]">{busy ? "Uploading…" : "Click to upload cover image"}</p>
            <p className="text-[11px] mt-1">Cloudinary · JPEG/PNG, ~16:9</p>
          </div>
        </label>
      )}
      {err && <p className="mt-2 text-[12px] text-red-700">{err}</p>}
    </div>
  );
}
