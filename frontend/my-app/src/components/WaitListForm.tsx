'use client';

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

type WaitlistFormState = 'idle' | 'loading' | 'success' | 'error';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<WaitlistFormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:8000/api/waitlist/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Network response not ok');

      const data = await res.json();

      if (data.message === 'Already subscribed') {
        toast('You are already on the waitlist ✨');
      } else {
        toast.success('Thanks for joining the waitlist 🎉');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Try again!');
      setStatus('error');
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
      >
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          placeholder="you@domain.com"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-white shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-pink-500 max-w-md"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="rounded-lg bg-pink-600 text-white px-6 py-3 font-medium hover:bg-pink-700 
                     focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-60"
        >
          Join waitlist
        </button>
      </form>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}
