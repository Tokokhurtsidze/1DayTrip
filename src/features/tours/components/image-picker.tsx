'use client';

import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { MAX_IMAGE_SIZE_MB, MAX_TOUR_IMAGES } from '@/features/tours/validations/tour.validation';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from '@/shared/hooks/use-translations';

type ImagePickerProps = {
  value: string[];
  onChange: (next: string[]) => void;
};

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const { t } = useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    const remaining = MAX_TOUR_IMAGES - value.length;
    if (remaining <= 0) {
      setError(t.admin.tooManyImages);
      return;
    }

    const accepted: string[] = [];
    for (const file of Array.from(files).slice(0, remaining)) {
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        setError(`${file.name} ${t.admin.imageTooLarge}`);
        continue;
      }
      accepted.push(await readFileAsDataUrl(file));
    }

    if (accepted.length > 0) onChange([...value, ...accepted]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        {value.map((src, index) => (
          <div
            key={src.slice(0, 32) + index}
            className="relative size-20 overflow-hidden rounded-md border border-border"
          >
            <Image src={src} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeAt(index)}
              aria-label="Remove photo"
              className="absolute right-1 top-1 rounded-full bg-background/80 p-0.5 text-foreground"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}

        {value.length < MAX_TOUR_IMAGES && (
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            className="h-20 w-20 flex-col gap-1 border-dashed text-xs"
          >
            <ImagePlus className="size-4" />
            {t.admin.addPhotos}
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <p className="text-xs text-muted-foreground">{t.admin.imagesHint}</p>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
