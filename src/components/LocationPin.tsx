export default function LocationPin() {
  return <svg className="location-pin" viewBox="0 0 48 56" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="pin-face" x1="10" y1="5" x2="36" y2="44" gradientUnits="userSpaceOnUse"><stop stopColor="#a6ffe0" /><stop offset=".4" stopColor="#34cba0" /><stop offset="1" stopColor="#08745f" /></linearGradient>
      <linearGradient id="pin-depth" x1="21" y1="5" x2="40" y2="45" gradientUnits="userSpaceOnUse"><stop stopColor="#168f76" /><stop offset="1" stopColor="#064b42" /></linearGradient>
    </defs>
    <ellipse cx="25" cy="49" rx="15" ry="4" fill="currentColor" opacity=".12" />
    <ellipse cx="25" cy="49" rx="8" ry="2" fill="currentColor" opacity=".18" />
    <path d="M27 4C17 4 10 11 10 21c0 11 17 26 17 26S44 32 44 21C44 11 37 4 27 4Z" fill="url(#pin-depth)" />
    <path d="M22 3C12 3 5 10 5 20c0 11 17 26 17 26S39 31 39 20C39 10 32 3 22 3Z" fill="url(#pin-face)" stroke="#b5ffe6" strokeWidth=".7" />
    <circle cx="22" cy="19" r="7.5" fill="#08634f" />
    <circle cx="23.5" cy="20.5" r="6" fill="#e7fff5" />
    <path d="M9 17c1-6 5-10 11-11" stroke="white" strokeOpacity=".65" strokeWidth="2" strokeLinecap="round" />
  </svg>;
}
