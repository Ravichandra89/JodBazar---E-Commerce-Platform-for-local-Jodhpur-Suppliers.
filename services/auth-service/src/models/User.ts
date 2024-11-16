import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  mobile_no: string; 
  password: string;
  role: "Customer" | "Admin" | "Shopkeeper";
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  profile?: {
    profile_image?: string;
    phone_no?: string;
    address?: string;
    orderList?: mongoose.Types.ObjectId[];
    wishList?: mongoose.Types.ObjectId[];
    shippingAddress?: {
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      isDefault?: string;
    }[];
    orderHistory?: {
      order_id: mongoose.Types.ObjectId;
      orderDate: Date;
      status: string; // pendig , delivered, shipped
    }[];
  };
}

// User Schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  mobile_no: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["Customer", "Admin", "Shopkeeper"],
    default: "Customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  profile: {
    profile_image: {
      type: String,
    },
    phone_no: {
      type: String,
    },
    address: {
      type: String,
    },
    orderList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    shippingAddress: [
      {
        addressLine1: {
          type: String,
          required: true,
        },
        addressLine2: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    orderHistory: [
      {
        orderId: {
          type: mongoose.Schema.ObjectId,
          ref: "Order",
        },
        orderDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          default: "Pending",
        },
      },
    ],
  },
});

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
