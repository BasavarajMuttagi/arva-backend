import { Schema, model } from "mongoose";

const userSchema = new Schema({
  avatar: String,
  fullname: String,
  email: { type: String, unique: true },
  phone: String,
  password: String
});

const locationSchema = new Schema({
  address: String,
  latitude: Number,
  longitude: Number,
});

const coffeeShopSchema = new Schema(
  {
    name: String,
    rating: { type: Number, default: 0 },
    images: [String],
    location: locationSchema
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: { type: String, enum: ["COFFEE", "DRINK", "FOOD"] },
    coffeeShop: { type: Schema.Types.ObjectId, ref: "CoffeeShop" },
  },
  { timestamps: true }
);

const bookmarkSchema = new Schema(
  {
    coffeeShop: { type: Schema.Types.ObjectId, ref: "CoffeeShop" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const favoriteSchema = new Schema(
  {
    coffeeShop: { type: Schema.Types.ObjectId, ref: "CoffeeShop" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const reviewSchema = new Schema(
  {
    rating: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    coffeeShop: { type: Schema.Types.ObjectId, ref: "CoffeeShop" },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
const CoffeeShop = model("CoffeeShop", coffeeShopSchema);
const Product = model("Product", productSchema);
const Bookmark = model("Bookmark", bookmarkSchema);
const Favorite = model("Favorite", favoriteSchema);
const Review = model("Review", reviewSchema);

export { User, CoffeeShop, Product, Bookmark, Favorite, Review };
