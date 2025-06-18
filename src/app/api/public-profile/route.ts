import { connectDB } from '@/lib/mongodb';
import User from '@/lib/model/user';

interface PublicUser {
  username: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  bgColor?: string;
  bgImage? : string;
  links: {
    type: string;
    url: string;
    active: boolean;
  }[];
  customLinks : {
    title: string;
    url : string;
    active: boolean;
    thumbnailUrl: string;
    animation : string;
  }[];
  products: {
    name: string;
    price: string;
    imageUrl: string;
    link: string;
    category: string;
    layout: '2-column' | '3-column';
    active: boolean;
  }[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ error: 'Missing username' }), { status: 400 });
  }

  try {
    await connectDB();

    const user = await User.findOne({ username }).lean<PublicUser>();
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return Response.json({
      username: user.username,
      name: user.name,
      avatarUrl: user.avatarUrl || '/images/avatar-default.jpg',
      bio: user.bio || '',
      bgColor: user.bgColor || '#ffffff',
      bgImage: user.bgImage || '',
      links: user.links || [],
      customLinks: user.customLinks || [],
      products: user.products || [],
    });
  } catch (error) {
    console.error('DB error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
