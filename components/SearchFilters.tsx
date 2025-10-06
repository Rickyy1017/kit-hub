interface SearchFiltersProps {
  selectedClub: string;
  selectedYear: string;
  onClubChange: (value: string) => void;
  onYearChange: (value: string) => void;
  resultsCount: number;
}

const years = ['2024', '2025', 'retro'];

export default function SearchFilters({
  selectedClub,
  selectedYear,
  onClubChange,
  onYearChange,
  resultsCount
}: SearchFiltersProps) {
  return (
    <section className="py-12 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 display-text">
          Find Your Perfect Jersey
        </h2>

        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
          {/* Club Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Search by Club</label>
            <input
              type="text"
              placeholder="Enter club name..."
              value={selectedClub}
              onChange={(e) => onClubChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Year Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Filter by Year</label>
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year.charAt(0).toUpperCase() + year.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button className="btn-primary w-full md:w-auto">
              Search
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mt-6">
          <p className="text-text-muted">
            Showing {resultsCount} team{resultsCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </section>
  );
}
