'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaCamera, FaTimes } from 'react-icons/fa';

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    bio: '',
    gender: '',
    occupation: '',
    socialLinks: [] as string[],
    dailyApps: [] as string[],
    avatar: '',
  });
  const [loading, setLoading] = useState(false);
  const socialRef = useRef<HTMLInputElement>(null);
  const appsRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      return toast.error('Only JPG, PNG and JPEG files allowed');
    }
    if (file.size > 2 * 1024 * 1024) return toast.error('File too large (max 2MB)');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

    setLoading(true);
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, avatar: data.secure_url }));
      toast.success('Avatar uploaded!');
    } catch {
      toast.error('Failed to upload avatar');
    } finally {
      setLoading(false);
    }
  };

  const handleChipAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: 'socialLinks' | 'dailyApps'
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !form[field].includes(value)) {
        setForm((prev) => ({ ...prev, [field]: [...prev[field], value] }));
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  const handleChipRemove = (field: 'socialLinks' | 'dailyApps', value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((v) => v !== value),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success('Profile updated!');
    } catch (err: unknown) {
            if (typeof err === 'object' && err !== null && 'message' in err) {
                toast.error((err as { message: string }).message, {
                    duration: 4000,
                    position: 'top-center',
                });
            } else {
                toast.error('An unexpected error occurred.', {
                    duration: 4000,
                    position: 'top-center',
                });
            }
        } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-10 text-center">Profile Settings</h1>

        <div className="flex justify-center mb-10">
          <div className="relative w-32 h-32">
            <Image
              src={
                form.avatar ||
                'https://res.cloudinary.com/demo/image/upload/v1699999999/default-avatar.png'
              }
              alt="avatar"
              width={128}
              height={128}
              className="rounded-full object-cover w-32 h-32 border-4 border-gray-700"
            />
            <label className="absolute bottom-1 right-1 bg-gray-700 hover:bg-gray-600 p-2 rounded-full cursor-pointer">
              <FaCamera className="text-white text-sm" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Gender" name="gender" value={form.gender} onChange={handleChange} />
          <Input label="Occupation" name="occupation" value={form.occupation} onChange={handleChange} />

          {/* Chips for Social Links */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Social Links</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.socialLinks.map((link) => (
                <span key={link} className="bg-green-700 px-3 py-1 rounded-full flex items-center text-sm">
                  {link}
                  <FaTimes
                    className="ml-2 cursor-pointer"
                    onClick={() => handleChipRemove('socialLinks', link)}
                  />
                </span>
              ))}
            </div>
            <input
              ref={socialRef}
              type="text"
              onKeyDown={(e) => handleChipAdd(e, 'socialLinks')}
              placeholder="Type link & press Enter"
              className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          {/* Chips for Daily Apps */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Daily Apps</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.dailyApps.map((app) => (
                <span key={app} className="bg-green-700 px-3 py-1 rounded-full flex items-center text-sm">
                  {app}
                  <FaTimes
                    className="ml-2 cursor-pointer"
                    onClick={() => handleChipRemove('dailyApps', app)}
                  />
                </span>
              ))}
            </div>
            <input
              ref={appsRef}
              type="text"
              onKeyDown={(e) => handleChipAdd(e, 'dailyApps')}
              placeholder="Type app name & press Enter"
              className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          {/* Bio */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-10 w-full bg-green-600 hover:bg-green-700 transition p-3 rounded font-semibold"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring focus:ring-green-500"
      />
    </div>
  );
}
