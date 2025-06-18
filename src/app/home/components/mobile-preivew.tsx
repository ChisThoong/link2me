'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Globe, QrCode } from 'lucide-react';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { ICON_MAP } from '@/lib/social';

export default function MobilePreview({
  name,
  avatarUrl,
  bio,
  bgColor,
  bgImage,
  links,
  customLinks,
  products,
}: {
  name: string;
  avatarUrl: string;
  bio: string;
  bgColor?: string;
  bgImage?: string;
  links: { title: string; url: string; displayAs?: 'icon' | 'button' }[];
  customLinks: { title: string; url: string; thumbnailUrl?: string; animation?: string }[];
  products: {
    name: string;
    price: string;
    imageUrl: string;
    link: string;
    category: string;
    layout: '2-column' | '3-column';
    active: boolean;
  }[];
}) {
  const iconLinks = links.filter((link) => link.displayAs === 'icon');
  const buttonLinks = links.filter((link) => link.displayAs !== 'icon');

  const [showQR, setShowQR] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const qrLink = `${currentUrl}/${name}`;

  return (
    <div className="relative min-h-screen w-full">
      {/* Background layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: bgImage ? `url(${bgImage}) center/cover no-repeat` : bgColor,
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* QR Toggle Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setShowQR(!showQR)}
          className="bg-white/90 p-2 rounded-full shadow hover:bg-white transition"
          title="Xem mã QR"
        >
          <QrCode className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      {/* QR Code View */}
      {showQR ? (
        <div className="relative z-10 min-h-screen w-full flex flex-col justify-center items-center text-white px-4">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quét mã QR để truy cập</h2>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                qrLink
              )}&size=200x200`}
              alt="QR Code"
              className="mx-auto"
            />
            <p className="mt-3 text-sm text-gray-700 break-all">{qrLink}</p>
            <button
              onClick={() => setShowQR(false)}
              className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm"
            >
              ← Quay lại
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 min-h-screen w-full flex flex-col items-center text-white px-4 py-12">
          {/* Avatar + Info */}
          <div className="flex flex-col items-center gap-2 mt-8">
            <img
              src={avatarUrl}
              alt={name}
              className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-md"
            />
            {name && <h2 className="text-xl font-bold">{name}</h2>}
            {bio && (
              <p className="text-sm text-white/80 text-center max-w-xs">{bio}</p>
            )}
          </div>

          {/* ICON GRID */}
          {iconLinks.length > 0 && (
            <div className="mt-8 w-full flex justify-center">
              <div className="flex flex-wrap justify-center gap-4 max-w-xs">
                {iconLinks.map((link, idx) => {
                  const icon = ICON_MAP[link.title.toLowerCase()] || <Globe className="w-6 h-6" />;
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-white text-white rounded-md shadow-sm hover:bg-white/20 transition flex items-center justify-center"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* BUTTON LINKS */}
          {buttonLinks.length > 0 && (
            <div className="mt-10 w-full max-w-sm flex flex-col gap-4 items-center">
              {buttonLinks.map((link, idx) => {
                const icon = ICON_MAP[link.title.toLowerCase()] || <Globe className="w-6 h-6" />;
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 px-5 py-3 w-full rounded-md bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-800 font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span className="text-blue-600 group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </span>
                    <span className="truncate text-sm">{link.title}</span>
                  </a>
                );
              })}
            </div>
          )}

          {/* CUSTOM LINKS */}
          {customLinks.map((link, idx) => (
            <a
              key={`custom-${idx}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "group relative mt-4 flex items-center gap-3 px-5 py-4 max-w-sm w-full rounded-md bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-900 font-medium shadow hover:shadow-md transition hover:-translate-y-0.5",
                {
                  'animate-buzz': link.animation === 'buzz',
                  'animate-wobble': link.animation === 'wobble',
                  'animate-pop': link.animation === 'pop',
                  'animate-blink': link.animation === 'blink',
                }
              )}
            >
              {link.thumbnailUrl && (
                <img
                  src={link.thumbnailUrl}
                  alt="thumbnail"
                  className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                />
              )}
              <span className="truncate text-sm">{link.title}</span>
            </a>
          ))}
        
          {/* PRODUCT LINKS */}
          {products.filter(p => p.active).length > 0 && (
            <div className="mt-10 w-full max-w-sm">
              <h3 className="text-white text-lg font-semibold mb-4 text-center">Khám phá thêm</h3>

              {/* Group theo layout */}
              {['2-column', '3-column'].map((layout) => {
                const items = products.filter(p => p.active && p.layout === layout);
                if (items.length === 0) return null;

                return (
                  <div
                    key={layout}
                    className={clsx(
                      'grid gap-4 mb-6',
                      layout === '3-column' ? 'grid-cols-3' : 'grid-cols-2'
                    )}
                  >
                    {items.map((product, idx) => (
                      <a
                        key={`product-${layout}-${idx}`}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-gray-200"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-28 object-cover"
                        />
                        <div className="p-3 text-center">
                          <div className="font-semibold text-sm text-gray-600 truncate">{product.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{product.price}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <footer className="mt-auto text-sm text-white/60 pt-10">Link2me.info</footer>
        </div>
      )}
    </div>
  );
}
