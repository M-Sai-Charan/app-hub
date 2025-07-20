import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  otp?: string; // Email verification OTP
  otpExpiry?: Date;

  resetPasswordOtp?: string;         // 🔒 Password Reset OTP
  resetPasswordOtpExpiry?: Date;     // 🔒 Password Reset OTP Expiry

   avatar?: string;
  phone?: string;
  bio?: string;
  gender?: string;
  occupation?: string;
  socialLinks?: string[];
  dailyApps?: string[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },

  otp: String,
  otpExpiry: Date,

  // 🆕 Added these two lines
  resetPasswordOtp: String,
  resetPasswordOtpExpiry: Date,

   avatar: { type: String, required: true },
  phone: { type: String, required: true },
  bio: { type: String, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  socialLinks:[String],
  dailyApps:[String],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
