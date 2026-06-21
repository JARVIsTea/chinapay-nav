export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-navy text-(--color-emerald) shadow-elev-2 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17c3-6 7-6 8-6s5 0 8 6" />
        <circle cx="8" cy="9" r="2" />
        <circle cx="16" cy="9" r="2" />
      </svg>
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-(--color-emerald) ring-2 ring-background" />
    </span>
  );
}
