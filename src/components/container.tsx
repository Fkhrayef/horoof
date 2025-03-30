import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center gap-4 bg-white rounded-lg p-4 min-h-[400px] min-w-[400px] sm:min-w-[600px] dark:bg-[#232323] mx-auto px-4">
      {children}
    </div>
  );
}
