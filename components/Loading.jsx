import React from 'react';
import { FaSpinner } from "react-icons/fa";
export default function Loading() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <FaSpinner className="text-slate-800 text-4xl sm:text-5xl animate-spin" />
      <p className="py-4 text-center text-black text-3xl" aria-live="polite">Loading......</p>
    </div>
  );
}
