// Foto profil Google kalau ada, kalau tidak huruf pertama nama.
export default function Avatar({ user, className = 'size-10 text-lg' }) {
  if (user?.picture) {
    return <img src={user.picture} alt="" referrerPolicy="no-referrer" className={`${className} shrink-0 rounded-full object-cover`} />
  }
  return (
    <span className={`${className} grid shrink-0 place-items-center rounded-full bg-primary font-headline text-neutral-dark`}>
      {user?.name?.charAt(0).toUpperCase() ?? '?'}
    </span>
  )
}
