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
