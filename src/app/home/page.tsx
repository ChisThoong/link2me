'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Link as LinkIcon } from 'lucide-react';
import { Link2 } from 'lucide-react';
import clsx from 'clsx';
import SharedLink from './components/shareable-link';
import UserDropdown from './components/user-dropdown';
import HomeNavTabs from './components/home-nav-tabs';
import SocialLinksPanel from './components/social-links-panel';
import CustomLinksPanel from './components/custom-links-panel';
import ProductLinksPanel from './components/product-links-panel';

import MobilePreview from './components/mobile-preivew';
import toast from 'react-hot-toast';
import TemplateSelector from './components/template-selector';
import ThumbnailUploader from './components/thumbnail-uploader';
import { SOCIAL_OPTIONS } from '@/lib/social';
import Logo from '@/components/logo';
interface UserData {
  username: string;
  email: string;
  isPro: boolean;
  expiredAt?: string;
}
type DisplayAs = 'icon' | 'button';

interface SocialItem {
  type: string;
  url: string;
  active: boolean;
  displayAs?: DisplayAs;
}
interface CustomLink {
  title: string;
  url: string;
  active: boolean;
  thumbnailUrl?: string;
  animation? : string;
}
interface ProductItem {
  name: string;
  price: string;
  imageUrl: string;
  link: string;
  category: string;
  layout: '2-column' | '3-column';
  active: boolean;
}

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('social');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [previewBgColor, setPreviewBgColor] = useState<string>('linear-gradient(to right, #614385, #516395');
  const [previewBgImage, setPreviewBgImage] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialItem[]>([]);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([]);
  const [products, setProductLinks] = useState<ProductItem[]>([]);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch('/api/me');
      const data = await res.json();

      if (data?.user) {
        setUserData(data.user);
        setName(data.user.name || '');
        setBio(data.user.bio || '');
        setAvatarUrl(data.user.avatarUrl || '');
        setPreviewBgColor(data.user.bgColor || 'linear-gradient(to right, #614385, #516395)');
        setSocialLinks(
          (data.user.links || []).map((link: any) => ({
            ...link,
            displayAs: link.displayAs === 'icon' || link.displayAs === 'button' ? link.displayAs : 'button',
          }))
        );
        setCustomLinks(
          (data.user.customLinks || []).map((customLinks: any) => ({
            ...customLinks,

          }))
        );
        setProductLinks(
          (data.user.products || []).map((products: any) => ({
            ...products,

          }))
        );
        setPreviewBgImage(data.user.bgImage || '');
      }
    } catch (err) {
      console.error('Lỗi khi lấy user:', err);
    }
  };

  if (session?.user?.id) {
    fetchUser();
  }
}, [session]);


  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };
  const handleSaveProfile = async () => {
    try {
      const res = await fetch('/api/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData?.username,
          name,
          isPro:userData?.isPro,
          bio,
          avatarUrl,
          bgImage: previewBgImage,
          bgColor: previewBgColor,
          links: socialLinks.filter((s) => s.active),
          customLinks: customLinks.filter((s) => s.active),
          products: products.filter((s) => s.active),
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        toast.success('Hồ sơ đã được lưu thành công!');
      } else {
        console.error('Lỗi khi lưu:', data.error);
        toast.error('Lưu thất bại, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Lỗi kết nối, vui lòng kiểm tra mạng!');
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-4 py-3 border-b md:flex md:items-center md:justify-between">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-2xl">
            <Link2 size={28} className="text-indigo-600" />
            <span>Link2me</span>
          </div>
        </div>

        {/* PC: Shared + UserDropdown */}
        <div className="hidden md:flex items-center gap-4">
        <div className="flex justify-center shrink-0">
          <HomeNavTabs activeTab={activeTab} setActiveTab={setActiveTab} variant="inline" />
        </div>
          <SharedLink username={userData?.username || 'yourname'} />
          <UserDropdown
            email={session?.user?.email || ''}
            name={session?.user?.username || ''}
            isPro={userData?.isPro}
            expiredAt={userData?.expiredAt}
            onLogout={handleLogout}
            onUpgrade={() => alert('Nâng cấp Pro')}
            onSupport={() => alert('Hỗ trợ')}
          />
        </div>

        {/*  Mobile: Shared + UserDropdown */}
        <div className="mt-3 flex w-full items-center justify-between md:hidden gap-2">
        <div className="flex justify-center shrink-0">
          <HomeNavTabs activeTab={activeTab} setActiveTab={setActiveTab} variant="inline" />
        </div>
          <div className="flex-1">
            <SharedLink username={userData?.username || 'yourname'} />
          </div>
          <UserDropdown
            email={session?.user?.email || ''}
            name={session?.user?.username || ''}
            isPro={userData?.isPro}
            expiredAt={userData?.expiredAt}
            onLogout={handleLogout}
            onUpgrade={() => alert('Nâng cấp Pro')}
            onSupport={() => alert('Hỗ trợ')}
          />
        </div>
      </header>




      {/* Content bên dưới header */}
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Cột bên trái: Form nhập */}
          <div className="flex-1 space-y-6">
            {/* Avatar + mô tả */}
            <section className="flex flex-col items-center gap-4">
              {/* Avatar */}
              <div className="w-24 h-24">
                <ThumbnailUploader
                  currentUrl={avatarUrl || '/images/avatar-default.jpg'}
                  onUploaded={(url) => setAvatarUrl(url)}
                />
              </div>
              <div className="w-full items-start gap-4">
              <div className="">
                  <label htmlFor="name" className="text-sm font-semibold block mb-1">
                    Tên hiển thị
                  </label>
                  <textarea
                    id="name"
                    rows={1}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm resize-none"
                    placeholder="Tên mà bạn muốn hiển trị trên hồ sơ"
                  />
                </div>
                {/* Mô tả */}
                <div className="">
                  <label htmlFor="bio" className="text-sm font-semibold block mb-1">
                    Mô tả
                  </label>
                  <textarea
                    id="bio"
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm resize-none"
                    placeholder="Giới thiệu ngắn gọn về bạn..."
                  />
                </div>
                {/* Chọn màu */}
                <div className="space-y-4">
                  {/* Dòng 1: Danh sách màu */}
                  <div>
                    <label className="text-sm font-medium block mb-2">Màu nền gợi ý:</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          name: 'Sunset Dark',
                          gradient: 'linear-gradient(to right, #c94b4b, #4b134f)',
                        },
                        {
                          name: 'Ocean Deep',
                          gradient: 'linear-gradient(to right, #2c3e50, #4ca1af)',
                        },
                        {
                          name: 'Purple Night',
                          gradient: 'linear-gradient(to right, #614385, #516395)',
                        },
                        {
                          name: 'Dark Forest',
                          gradient: 'linear-gradient(to right, #1e3c72, #2a5298)',
                        },
                        {
                          name: 'Deep Rose',
                          gradient: 'linear-gradient(to right, #833ab4, #fd1d1d)',
                        },
                        {
                          name: 'Velvet',
                          gradient: 'linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)',
                        },
                        {
                          name: 'Mystic Blue',
                          gradient: 'linear-gradient(to right, #1a2980, #26d0ce)',
                        },
                      ].map(({ name, gradient }) => {
                        const isSelected = previewBgColor === gradient;
                        return (
                          <button
                            key={name}
                            onClick={() => {
                              if (!previewBgImage) setPreviewBgColor(gradient);
                            }}
                            title={name}
                            disabled={!!previewBgImage}
                            className={clsx(
                              "w-12 h-6 rounded-md border transition-all",
                              isSelected ? "ring-2 ring-indigo-500 scale-105" : "ring-0",
                              previewBgImage && "opacity-50 cursor-not-allowed"
                            )}
                            style={{ backgroundImage: gradient }}
                          />

                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium">Tuỳ chọn khác:</label>
                    <div
                      className={clsx(
                        "relative w-12 h-6 rounded-md border",
                        previewBgImage && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <input
                        type="color"
                        value={previewBgColor}
                        onChange={(e) => {
                          if (!previewBgImage) setPreviewBgColor(e.target.value);
                        }}
                        disabled={!!previewBgImage}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div
                        className="w-12 h-6 rounded-md border shadow-inner"
                        style={{ background: previewBgColor }}
                      />
                    </div>
                  </div>

                </div>
                <div className="space-y-2">
                  <div className="relative w-full max-w-xs mt-3">
                    <input
                      type="file"
                      accept="image/*"
                      id="bg-upload"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append('file', file);
                        setIsUploadingBg(true);
                        try {
                          const res = await fetch('/api/upload', {
                            method: 'POST',
                            body: formData,
                          });
                          const contentType = res.headers.get('content-type') || '';
                          if (!res.ok || !contentType.includes('application/json')) {
                            const errorText = await res.text();
                            console.error('Upload failed. Raw response:', errorText);
                            toast.error('Upload background thất bại!');
                            return;
                          }
                          const data = await res.json();
                          if (data.url) {
                            setPreviewBgImage(data.url);
                          }
                        } catch (err) {
                          console.error('Upload background error:', err);
                          toast.error('Lỗi khi upload background');
                        } finally {
                          setIsUploadingBg(false);
                        }
                      }}
                    />
                    <label
                      htmlFor="bg-upload"
                      className={clsx(
                        "cursor-pointer inline-block bg-gray-400 text-white px-4 py-1 rounded text-sm transition",
                        isUploadingBg || !userData?.isPro ? "opacity-50 pointer-events-none" : "hover:bg-indigo-700"
                      )}
                    >
                      {userData?.isPro ? (isUploadingBg ? "Đang tải..." : "Upload ảnh nền") : "Thêm ảnh nền (Pro)"}
                    </label>
                    {previewBgImage && (
                      <div className="mt-2 text-sm text-green-600 truncate">{previewBgImage}</div>
                    )}
                  </div>

                  {previewBgImage && (
                    <button
                      onClick={() => setPreviewBgImage(null)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Xóa ảnh nền
                    </button>
                  )}
                </div>
              </div>
            </section>
            {/* <TemplateSelector
              onApply={(template) => {
                setAvatarUrl(template.avatarUrl);
                setBio(template.bio);
                setName(template.name || '');
                setPreviewBgColor(template.bgColor);
                setSocialLinks(template.links || []);
              }}
            /> */}
            {/* Nội dung theo tab */}
            <section>
              {activeTab === 'social' && <SocialLinksPanel
                socials={socialLinks}
                setSocials={setSocialLinks}
                isPro={userData?.isPro}
              />
              }
              {activeTab === 'links' && (
                <CustomLinksPanel 
                  links={customLinks} 
                  setLinks={setCustomLinks} 
                  isPro={userData?.isPro}/>
              )}
              {activeTab === 'products' && (
                <ProductLinksPanel
                  products={products}
                  setProducts={setProductLinks}
                />
              )}
            </section>
          </div>

          {/* Cột bên phải: Preview */}
          <MobilePreview
            name={name}
            avatarUrl={avatarUrl || '/images/avatar-default.jpg'}
            bio={bio}
            bgColor={!previewBgImage ? previewBgColor : undefined}
            bgImage={previewBgImage ?? undefined}
            links={socialLinks
              .filter((s) => s.active)
              .map((s) => ({
                title: SOCIAL_OPTIONS.find((opt) => opt.value === s.type)?.label || s.type,
                url: s.url,
                displayAs: s.displayAs ?? 'button',
              }))}
            customLinks={customLinks.filter((c) => c.url)}
            products={products.filter((p) => p.link)}
          />
          
        </div>
        <div className="w-full flex mt-3 pb-10">
          <button
            onClick={handleSaveProfile}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Cập nhật thông tin
          </button>
        </div>
      </main>


    </div>
  );
}
