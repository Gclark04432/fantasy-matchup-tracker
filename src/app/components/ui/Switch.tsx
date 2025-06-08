import React from "react";

export function Switch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? "bg-blue-600" : "bg-gray-400"
      }`}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
}
