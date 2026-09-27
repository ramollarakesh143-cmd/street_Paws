import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search dishes or restaurants' }) {
  return (
    <div className="search-box">
      <Search size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search food or restaurants"
      />
    </div>
  );
}
