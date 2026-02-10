import React from "react";
import "./LocationDisplay.css";

/**
 * LocationDisplay - Shows user's current location and allows location selection
 */
export default function LocationDisplay({
  location,
  address,
  loading,
  error,
  onRequestLocation,
  onSearchLocation,
  isWatching,
}) {
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearchLocation(searchInput);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const displayAddress = address?.displayName || address?.address || "Location not set";

  return (
    <div className="location-display">
      <div className="location-header">
        <span className="location-icon">📍</span>
        <span className="location-title">Delivery Location</span>
        {isWatching && <span className="live-badge">● Live</span>}
      </div>

      {error && <div className="location-error">⚠️ {error}</div>}

      {location && (
        <div className="location-info">
          <p className="location-address">{displayAddress}</p>
          <p className="location-coords">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            {location.accuracy && (
              <span className="accuracy">
                {" "}
                (±{Math.round(location.accuracy)}m)
              </span>
            )}
          </p>
        </div>
      )}

      {!location && !loading && (
        <p className="location-placeholder">No location selected yet</p>
      )}

      <div className="location-search">
        <input
          type="text"
          placeholder="Search or enter address..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="location-search-input"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !searchInput.trim()}
          className="location-search-btn"
          title="Search location"
        >
          {loading ? "⏳" : "🔍"}
        </button>
      </div>

      <div className="location-actions">
        <button
          onClick={onRequestLocation}
          disabled={loading}
          className="location-btn btn-primary"
          title="Get current location"
        >
          {loading ? "⏳ Getting location..." : "📍 Use My Location"}
        </button>
      </div>

      {location && (
        <div className="location-watch-status">
          {isWatching ? (
            <span className="watching">✓ Real-time tracking active</span>
          ) : (
            <span className="not-watching">○ Real-time tracking inactive</span>
          )}
        </div>
      )}
    </div>
  );
}
