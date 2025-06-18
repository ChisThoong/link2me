'use client';

import { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../../utils/cropImage';
import { Dialog } from '@headlessui/react';

export default function ThumbnailUploader({
  onUploaded,
  currentUrl,
}: {
  onUploaded: (url: string) => void;
  currentUrl?: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result as string);
        setOpen(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = (_: any, cropped: any) => {
    setCroppedAreaPixels(cropped);
  };

  const uploadCropped = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const base64 = await getCroppedImg(imageSrc, croppedAreaPixels);

    const blob = await fetch(base64).then(res => res.blob());
    const formData = new FormData();
    formData.append('file', new File([blob], 'thumbnail.png', { type: 'image/png' }));

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const json = await res.json();
    if (json.url) {
      onUploaded(json.url);
      setOpen(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className="hidden"
        id={`thumbnail-input-${currentUrl || 'new'}`}
      />
      <label htmlFor={`thumbnail-input-${currentUrl || 'new'}`} className="cursor-pointer">
        {currentUrl ? (
          <img
            src={currentUrl}
            alt="Uploaded thumbnail"
            className="w-20 h-20 object-cover rounded-md border"
          />
        ) : (
          <img
            src="/images/upload_icon.png"
            alt="Upload thumbnail"
            className="w-20 h-20 object-contain border border-dashed rounded-md p-1"
          />
        )}
      </label>

      <Dialog open={open} onClose={() => setOpen(false)} className="fixed z-50 inset-0">
        {/* Overlay mờ nền */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
        
        {/* Nội dung crop */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
            <Dialog.Panel className="bg-white/90 backdrop-blur-md rounded shadow p-4 relative w-[90%] max-w-lg">
            {imageSrc && (
                <div className="relative w-full h-[300px] bg-transparent">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
                </div>
            )}
            <div className="mt-3 flex items-center justify-between">
                <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                />
                <button
                onClick={uploadCropped}
                className="bg-indigo-600 text-white px-4 py-1 rounded"
                >
                Lưu
                </button>
            </div>
            </Dialog.Panel>
        </div>
        </Dialog>

    </>
  );
}
