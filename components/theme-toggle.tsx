"use client";

import { useTheme } from "@/components/theme-provider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};
