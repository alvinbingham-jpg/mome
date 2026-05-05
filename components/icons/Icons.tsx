/**
 * Mome icon set — minimal inline SVGs.
 *
 * Inline icons keep us free of an external icon library and let us style
 * stroke / fill from Tailwind classes without runtime overhead.
 */
type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const baseProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function DepositIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M12 4v12" />
      <path d="m6 10 6 6 6-6" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function ActivityIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </svg>
  );
}

export function SettingsIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

export function CopyIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <rect width="13" height="13" x="9" y="9" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function ArrowRightIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function CloseIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function SparkleIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="m5.6 5.6 2.1 2.1" />
      <path d="m16.3 16.3 2.1 2.1" />
      <path d="m18.4 5.6-2.1 2.1" />
      <path d="m7.7 16.3-2.1 2.1" />
    </svg>
  );
}

export function ShieldIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
    </svg>
  );
}

export function PauseIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function ChevronRightIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ExternalIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export function FingerprintIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M12 11v3a3 3 0 0 1-6 0" />
      <path d="M9 14v-3a6 6 0 0 1 12 0v1" />
      <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
      <path d="M15 14v3a3 3 0 0 1-1.5 2.6" />
    </svg>
  );
}

export function MailIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function GoogleIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      viewBox="0 0 18 18"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M16.51 8.18c0-.55-.05-1.07-.13-1.58H9v3h4.21c-.18.97-.74 1.78-1.57 2.34v1.95h2.54c1.49-1.37 2.33-3.4 2.33-5.71Z"
      />
      <path
        fill="#34A853"
        d="M9 17c2.13 0 3.92-.71 5.22-1.93l-2.54-1.95c-.71.48-1.62.76-2.68.76-2.06 0-3.81-1.39-4.43-3.26H1.95v2.05A8 8 0 0 0 9 17Z"
      />
      <path
        fill="#FBBC05"
        d="M4.57 10.62a4.8 4.8 0 0 1 0-3.24V5.33H1.95a8 8 0 0 0 0 7.34l2.62-2.05Z"
      />
      <path
        fill="#EA4335"
        d="M9 4.5c1.16 0 2.2.4 3.02 1.18l2.26-2.26C13 2.18 11.21 1.5 9 1.5A8 8 0 0 0 1.95 5.33l2.62 2.05C5.19 5.51 6.94 4.5 9 4.5Z"
      />
    </svg>
  );
}

export function CheckCircleIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

export function AlertIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export function SendIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

export function ScanIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M21 7V5a2 2 0 0 0-2-2h-2" />
      <path d="M3 17v2a2 2 0 0 0 2 2h2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function PlusIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseProps} className={className} strokeWidth={strokeWidth}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}
