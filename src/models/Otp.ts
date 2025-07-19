import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
  email: string;
  code: string;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

// Optional TTL (5 min expiration)
OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const Otp = mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema);
