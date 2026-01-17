'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: '/login',
      redirect: true
    });
  };

  return (
    <button 
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      تسجيل الخروج
    </button>
  );
}
