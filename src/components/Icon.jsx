// Semua ikon dipetakan ke SVG inline supaya tidak bergantung CDN bootstrap-icons.
// Satu sumber bentuk ikon, bisa diwarnai lewat `currentColor`.

const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bag: <><path d="M6 7h12l1.2 13H4.8L6 7Z" /><path d="M9 7V5.5a3 3 0 0 1 6 0V7" /></>,
  person: <><circle cx="12" cy="8" r="3.5" /><path d="M5 19.5a7 7 0 0 1 14 0" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  flower: <><circle cx="12" cy="12" r="2.6" /><path d="M12 9.4C12 6.6 10.4 5 10.4 5S9 6.6 9.4 9.4M14.6 12c2.8 0 4.4-1.6 4.4-1.6s-1.6-1.4-4.4-1.4M12 14.6c0 2.8-1.6 4.4-1.6 4.4S9 17.4 9.4 14.6M9.4 12C6.6 12 5 13.6 5 13.6s1.6 1.4 4.4 1.4" /></>,
  cupHot: <><path d="M5 9h11v6.5A4.5 4.5 0 0 1 11.5 20h-2A4.5 4.5 0 0 1 5 15.5V9Z" /><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 5.5c0-1 .8-1 .8-2M12 5.5c0-1 .8-1 .8-2" /></>,
  truck: <><path d="M2.5 7h10v9h-10zM12.5 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></>,
  star: <path d="m12 3.5 2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.4l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7L12 3.5Z" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" />,
  trash: <><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.8 12.5h9.4L17.5 7" /><path d="M10 11v5M14 11v5" /></>,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  tag: <><path d="M3.5 12.5V4.5h8l9 9-8 8-9-9Z" /><circle cx="8" cy="9" r="1.4" /></>,
  chat: <><path d="M4 19.5 5.3 15A7.5 7.5 0 1 1 8.7 18.3L4 19.5Z" /><path d="M9 10.5c.5 2 2.2 3.7 4.5 4.5" /></>,
  box: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>,
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />,
  logout: <><path d="M14 4.5H6v15h8" /><path d="M10.5 12h9M16.5 8.5 20 12l-3.5 3.5" /></>,
  copy: <><rect x="8.5" y="8.5" width="11" height="11" rx="2" /><path d="M15.5 8.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5" /></>,
  edit: <path d="M4.5 19.5h4l10-10-4-4-10 10v4ZM13 7l4 4" />,
}

export default function Icon({ name, className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
