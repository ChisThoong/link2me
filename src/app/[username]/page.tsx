import { notFound } from 'next/navigation';
import MobilePreview from '@/app/home/components/mobile-preivew';
import { SOCIAL_OPTIONS } from '@/lib/social';

interface SocialLink {
  type: string;
  url: string;
  active: boolean;
  displayAs?: 'icon' | 'button';
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
export default async function PublicProfilePage({ params }: { params: { username: string } }) {
    const { username } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/public-profile?username=${username}`, {
      cache: 'no-store',
    });
  if (!res.ok) return notFound();

  const data = await res.json();

  const publicLinks = data.links
    .filter((link: SocialLink) => link.active)
    .map((link: SocialLink) => ({
      title: SOCIAL_OPTIONS.find((s) => s.value === link.type)?.label || link.type,
      url: link.url,
      displayAs: link.displayAs,
    }));
    const publicProducts = (data.products || []).filter((product: ProductItem) => product.active);

    return (
        <div className="w-full h-screen">
          <MobilePreview
            name={data.name}
            avatarUrl={data.avatarUrl}
            bio={data.bio}
            bgColor={data.bgColor}
            bgImage={data.bgImage}
            links={publicLinks}
            customLinks={data.customLinks}
            products={publicProducts}
          />
        </div>
      );
}
