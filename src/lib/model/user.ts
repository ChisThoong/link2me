// src/lib/models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

const SocialLinkSchema = new Schema({
  type: { type: String, required: true },     
  url: { type: String, required: true },
  active: { type: Boolean, default: true },
  displayAs : { type: String},
});
const CustomLinkSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  active: { type: Boolean, default: true },
  thumbnailUrl : { type: String },
  animation :  { type: String }
});
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  category: { type: String },
  layout: { type: String, enum: ['2-column', '3-column'], default: '2-column' },
  active: { type: Boolean, default: true },
});
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    bio: { type: String },
    avatarUrl: { type: String },
    bgColor: { type: String },
    bgImage: {type: String},
    links: [SocialLinkSchema],
    customLinks: [CustomLinkSchema],
    products: [ProductSchema],
    role: { type: String, default: 'user' },
    isPro: { type: Boolean, default: false },     
    expiredAt: { type: Date },     
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export default User;
