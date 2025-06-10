import React from 'react';

export function Button({
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-lg bg-sky-800 transition duration-300 ${className}`}
    />
  );
}
