import React from 'react';

export function Button({
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 disabled:opacity-50 ${className}`}
    />
  );
}
