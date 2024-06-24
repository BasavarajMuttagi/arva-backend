import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    avatar: String,
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    password: { type: String, required: true },
    address: { type: String },
    pincode: { type: String },
  },
  { timestamps: true }
);

const addressSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    address: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 300,
    },
    pincode: { type: String, required: true, minLength: 6, maxLength: 6 },
  },
  { timestamps: true }
);

const coffeeShopSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  images: [String],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

coffeeShopSchema.index({ location: "2dsphere" });

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    dietType: {
      type: String,
      enum: ["VEG", "NON_VEG"],
      required: true,
    },
    category: {
      type: String,
      enum: ["COFFEE", "DRINK", "FOOD"],
      required: true,
    },
    coffeeShop: { type: Schema.Types.ObjectId, ref: "CoffeeShop" },
  },
  { timestamps: true }
);

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coffeeShop: {
      type: Schema.Types.ObjectId,
      ref: "CoffeeShop",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true, default: 1 },
    review: { type: String },
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, coffeeShop: 1 }, { unique: true });

const userPreferencesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coffeeShop: {
      type: Schema.Types.ObjectId,
      ref: "CoffeeShop",
      required: true,
    },

    isFavorite: { type: Boolean, default: false },
    isBookmarked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const polygonSchema = new Schema({
  geometry: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
});

polygonSchema.index({ geometry: "2dsphere" });

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  shopId: { type: Schema.Types.ObjectId, ref: "CoffeeShop", required: true },
  phone: String,
  pincode: String,
  items: [
    {
      price_data: {
        currency: String,
        product_data: {
          name: String,
          description: String,
          images: [String],
          metadata: {
            id: String,
          },
        },
        unit_amount: Number,
      },
      quantity: Number,
    },
  ],
  address: {
    title: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  sessionId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["Processing", "Success", "Failure"],
    default: "Processing",
  },
});

const User = model("User", userSchema);
const CoffeeShop = model("CoffeeShop", coffeeShopSchema);
const Product = model("Product", productSchema);
const Review = model("Review", reviewSchema);
const UserPreferences = model("UserPreference", userPreferencesSchema);
const Address = model("Address", addressSchema);
const Polygon = model("Polygon", polygonSchema);
const Order = model("Order", orderSchema);
export {
  User,
  CoffeeShop,
  Product,
  Review,
  UserPreferences,
  Address,
  Polygon,
  Order,
};
