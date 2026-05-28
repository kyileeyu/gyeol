import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function baseSvgProps({ size = 20, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...rest,
  };
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M21 12c0 4.418-4.03 8-9 8a10.4 10.4 0 0 1-4.1-.82L3 21l1.6-3.6C3.55 16.1 3 14.6 3 13c0-4.418 4.03-8 9-8s9 3.582 9 7z" />
      <circle cx="9" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 3V6a1 1 0 0 1 1-1z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5z" />
    </svg>
  );
}

export function CardIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M20 4c-9 0-15 4-15 12 0 2.2 1.8 4 4 4 8 0 12-6 12-15z" />
      <path d="M5 20c4-7 9-11 14-13" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThreadsIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)} fill="currentColor" stroke="none">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.02c.028-3.577.878-6.43 2.523-8.482C5.845 1.205 8.598.024 12.179 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291.965-.054 1.872-.014 2.701.116-.118-.703-.355-1.252-.706-1.633-.485-.527-1.235-.795-2.232-.795h-.026c-.802 0-1.89.221-2.582 1.262l-1.737-1.165c.916-1.402 2.402-2.144 4.319-2.144h.041c3.207.02 5.117 1.965 5.317 5.426.114.052.227.106.337.165 1.554.728 2.694 1.84 3.293 3.214.834 1.916.911 5.044-1.628 7.572-1.92 1.91-4.252 2.811-7.4 2.832Zm-.013-11.685c-.18 0-.36.005-.547.016-1.838.103-2.96.946-2.91 1.97.054 1.144 1.351 1.823 2.628 1.823.135 0 .27-.007.405-.022 1.602-.166 3.106-1.124 3.225-3.456-.86-.21-1.751-.331-2.701-.331Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01" />
      <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4M12 10v7" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <path d="M9 19c-4 1.2-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6 0-1.2-.4-2.2-1.1-3 .1-.3.5-1.4-.1-3 0 0-.9-.3-3 1.1A10.4 10.4 0 0 0 12 4c-.9 0-1.9.1-2.8.4C7.1 3 6.2 3.3 6.2 3.3c-.6 1.6-.2 2.7-.1 3-.7.8-1.1 1.8-1.1 3 0 4.6 2.7 5.7 5.5 6-.4.4-.5.8-.5 1.5V21" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)} fill="currentColor" stroke="none">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...baseSvgProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
