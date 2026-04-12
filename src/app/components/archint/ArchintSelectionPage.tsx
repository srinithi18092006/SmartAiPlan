import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArchintNavbar } from './ArchintNavbar';
import { archDesigns, DesignType, StyleType } from '../../data/archintData';
import '../../../styles/archint.css';

const STYLES: StyleType[] = ['Modern', 'Traditional', 'Luxury', 'Villa', 'Duplex'];

const SQFT_MIN = 500;
const SQFT_MAX = 5000;
const BUDGET_MIN = 45;
const BUDGET_MAX = 200;

function formatBudget(v: number) {
  if (v >= 100) return `₹${v} L`;
  return `₹${v} L`;
}

export function ArchintSelectionPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const designType: DesignType = type === 'apartment' ? 'apartment' : 'house';

  // Basic filters
  const [floors, setFloors] = useState<number | null>(null);
  const [sqftRange, setSqftRange] = useState<[number, number]>([SQFT_MIN, SQFT_MAX]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([BUDGET_MIN, BUDGET_MAX]);
  const [style, setStyle] = useState<string>('');

  // Advanced filters (null = not filtered)
  const [garden, setGarden] = useState<boolean | null>(null);
  const [freeSpace, setFreeSpace] = useState<boolean | null>(null);
  const [balcony, setBalcony] = useState<boolean | null>(null);
  const [parking, setParking] = useState<boolean | null>(null);

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filter logic
  const filtered = useMemo(() => {
    return archDesigns.filter((d) => {
      if (d.type !== designType) return false;
      if (floors !== null && d.floors !== floors) return false;
      if (d.sqft < sqftRange[0] || d.sqft > sqftRange[1]) return false;
      if (d.budget < budgetRange[0] || d.budget > budgetRange[1]) return false;
      if (style && d.style !== style) return false;
      if (garden !== null && d.garden !== garden) return false;
      if (freeSpace !== null && d.freeSpace !== freeSpace) return false;
      if (balcony !== null && d.balcony !== balcony) return false;
      if (parking !== null && d.parking !== parking) return false;
      return true;
    });
  }, [designType, floors, sqftRange, budgetRange, style, garden, freeSpace, balcony, parking]);

  const handleSearch = () => {
    const params = new URLSearchParams({
      type: designType,
      floors: floors?.toString() ?? '',
      sqftMin: sqftRange[0].toString(),
      sqftMax: sqftRange[1].toString(),
      budgetMin: budgetRange[0].toString(),
      budgetMax: budgetRange[1].toString(),
      style,
      garden: garden === null ? '' : garden.toString(),
      freeSpace: freeSpace === null ? '' : freeSpace.toString(),
      balcony: balcony === null ? '' : balcony.toString(),
      parking: parking === null ? '' : parking.toString(),
    });
    navigate(`/archint/results?${params.toString()}`);
  };

  const resetFilters = () => {
    setFloors(null);
    setSqftRange([SQFT_MIN, SQFT_MAX]);
    setBudgetRange([BUDGET_MIN, BUDGET_MAX]);
    setStyle('');
    setGarden(null);
    setFreeSpace(null);
    setBalcony(null);
    setParking(null);
  };

  return (
    <div className="archint-app">
      <div className="arch-bg-grid" />
      <div className="arch-orb arch-orb-1" />
      <div className="arch-orb arch-orb-2" />

      <ArchintNavbar />

      <main style={{ paddingTop: '80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '48px 24px 0' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: designType === 'house' ? 'rgba(0,212,255,0.08)' : 'rgba(168,85,247,0.08)',
            border: `1px solid ${designType === 'house' ? 'rgba(0,212,255,0.25)' : 'rgba(168,85,247,0.25)'}`,
            borderRadius: '30px', padding: '6px 18px', marginBottom: '20px',
            fontFamily: 'Outfit,sans-serif', fontSize: '13px', fontWeight: 600,
            color: designType === 'house' ? '#00d4ff' : '#a855f7',
          }}>
            {designType === 'house' ? '🏡' : '🏢'}
            {designType === 'house' ? 'House Designs' : 'Apartment Designs'}
          </div>

          <h1 style={{
            fontFamily: 'Outfit,sans-serif',
            fontSize: 'clamp(1.75rem,4vw,3rem)',
            fontWeight: 900,
            letterSpacing: '-1px',
            marginBottom: '10px',
          }}>
            <span className="arch-gradient-text">
              Configure Your{' '}
            </span>
            <span style={{ color: '#f0f4ff' }}>
              {designType === 'house' ? 'House' : 'Apartment'}
            </span>
          </h1>
          <p style={{ color: '#64748b', fontFamily: 'Outfit,sans-serif', fontSize: '15px' }}>
            Apply filters to get your perfect architectural match. Showing <strong style={{ color: '#00d4ff' }}>{filtered.length}</strong> matching designs.
          </p>

          {/* Type switcher */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
            <button
              id="sel-type-house"
              onClick={() => navigate('/archint/select/house')}
              style={{
                padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
                fontFamily: 'Outfit,sans-serif', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: designType === 'house' ? 'linear-gradient(135deg,#00d4ff,#a855f7)' : 'rgba(255,255,255,0.05)',
                color: designType === 'house' ? '#fff' : '#94a3b8',
                boxShadow: designType === 'house' ? '0 0 20px rgba(0,212,255,0.3)' : 'none',
              }}
            >
              🏡 Houses
            </button>
            <button
              id="sel-type-apt"
              onClick={() => navigate('/archint/select/apartment')}
              style={{
                padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
                fontFamily: 'Outfit,sans-serif', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                background: designType === 'apartment' ? 'linear-gradient(135deg,#a855f7,#ec4899)' : 'rgba(255,255,255,0.05)',
                color: designType === 'apartment' ? '#fff' : '#94a3b8',
                boxShadow: designType === 'apartment' ? '0 0 20px rgba(168,85,247,0.3)' : 'none',
              }}
            >
              🏢 Apartments
            </button>
          </div>
        </div>

        {/* Filters + Preview */}
        <div style={{
          maxWidth: '1100px', margin: '40px auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: '360px 1fr', gap: '28px', alignItems: 'start',
        }}>
          {/* ── FILTER PANEL ── */}
          <div className="arch-glass-strong" style={{ padding: '28px' }}>
            {/* Basic Filters */}
            <div style={{ marginBottom: '28px' }}>
              <SectionLabel icon="🏗️" label="Basic Filters" />

              {/* Floors */}
              <FilterGroup label="Number of Floors">
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[null, 1, 2, 3].map((f) => (
                    <button
                      key={String(f)}
                      id={`filter-floors-${f ?? 'any'}`}
                      onClick={() => setFloors(f)}
                      className={`arch-floor-pill${floors === f ? ' active' : ''}`}
                    >
                      {f === null ? 'Any' : f === 3 ? '3+' : `${f} Floor${f > 1 ? 's' : ''}`}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              {/* Sqft Slider */}
              <FilterGroup label={`Square Feet: ${sqftRange[0].toLocaleString()} – ${sqftRange[1].toLocaleString()} sq.ft`}>
                <RangeSlider
                  id="filter-sqft"
                  min={SQFT_MIN}
                  max={SQFT_MAX}
                  step={100}
                  value={sqftRange}
                  onChange={setSqftRange}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', color: '#475569', fontSize: '11px', fontFamily: 'Outfit,sans-serif' }}>
                  <span>{SQFT_MIN.toLocaleString()} sq.ft</span>
                  <span>{SQFT_MAX.toLocaleString()} sq.ft</span>
                </div>
              </FilterGroup>

              {/* Budget Slider */}
              <FilterGroup label={`Budget: ${formatBudget(budgetRange[0])} – ${formatBudget(budgetRange[1])}`}>
                <RangeSlider
                  id="filter-budget"
                  min={BUDGET_MIN}
                  max={BUDGET_MAX}
                  step={5}
                  value={budgetRange}
                  onChange={setBudgetRange}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', color: '#475569', fontSize: '11px', fontFamily: 'Outfit,sans-serif' }}>
                  <span>₹45 L</span>
                  <span>₹2 Cr</span>
                </div>
              </FilterGroup>

              {/* Style */}
              <FilterGroup label="Architectural Style">
                <select
                  id="filter-style"
                  value={style}
                  onChange={e => setStyle(e.target.value)}
                  className="arch-select"
                  style={{ padding: '10px 14px', fontSize: '14px', width: '100%' }}
                >
                  <option value="">All Styles</option>
                  {STYLES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </FilterGroup>
            </div>

            <div className="arch-divider" style={{ marginBottom: '22px' }} />

            {/* Advanced Filters Toggle */}
            <button
              id="filter-advanced-toggle"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px', padding: '10px 16px', cursor: 'pointer',
                fontFamily: 'Outfit,sans-serif', color: '#94a3b8', fontSize: '14px', fontWeight: 600,
                transition: 'all 0.2s', marginBottom: showAdvanced ? '20px' : '0',
              }}
            >
              <SectionLabel icon="⚙️" label="Advanced Filters" style={{ margin: 0 }} />
              <span style={{ transition: 'transform 0.3s', transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', fontSize: '12px' }}>▼</span>
            </button>

            {showAdvanced && (
              <div style={{ animation: 'archFadeInUp 0.3s ease' }}>
                {[
                  { id: 'garden', label: '🌿 Garden', value: garden, set: setGarden },
                  { id: 'freespace', label: '🟩 Free Space', value: freeSpace, set: setFreeSpace },
                  { id: 'balcony', label: '🌇 Balcony', value: balcony, set: setBalcony },
                  { id: 'parking', label: '🚗 Parking', value: parking, set: setParking },
                ].map(({ id, label, value, set }) => (
                  <div key={id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>
                      {label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '11px', color: '#475569', fontFamily: 'Outfit,sans-serif' }}>
                        {value === null ? 'Any' : value ? 'Yes' : 'No'}
                      </span>
                      <TriStateToggle
                        id={`filter-${id}`}
                        value={value}
                        onChange={set}
                      />
                    </div>
                  </div>
                ))}

                {/* Water note */}
                <div style={{
                  background: 'rgba(34,197,94,0.06)',
                  border: '1px solid rgba(34,197,94,0.15)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  marginTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>💧</span>
                  <span style={{ color: '#4ade80', fontSize: '12px', fontFamily: 'Outfit,sans-serif' }}>
                    Water facility is included in ALL designs by default.
                  </span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                id="filter-reset-btn"
                onClick={resetFilters}
                className="arch-btn-ghost"
                style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: 600 }}
              >
                Reset
              </button>
              <button
                id="filter-search-btn"
                onClick={handleSearch}
                className="arch-btn-primary arch-animate-pulse-glow"
                style={{ flex: 2, padding: '12px', fontSize: '14px', fontWeight: 700 }}
              >
                🔍 View {filtered.length} Results
              </button>
            </div>
          </div>

          {/* ── LIVE PREVIEW GRID ── */}
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1rem', fontWeight: 700, color: '#f0f4ff' }}>
                Live Preview ({filtered.length})
              </h3>
              <span style={{ color: '#475569', fontSize: '13px', fontFamily: 'Outfit,sans-serif' }}>
                Scroll to explore
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
              gap: '16px',
              maxHeight: '70vh',
              overflowY: 'auto',
              paddingRight: '4px',
            }}>
              {filtered.length === 0 ? (
                <div style={{
                  gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px',
                  color: '#475569', fontFamily: 'Outfit,sans-serif',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
                  <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#64748b' }}>No designs found</p>
                  <p style={{ fontSize: '13px' }}>Try adjusting your filters</p>
                </div>
              ) : (
                filtered.slice(0, 20).map((d) => (
                  <div
                    key={d.id}
                    className="arch-design-card"
                    style={{ cursor: 'default' }}
                    onClick={handleSearch}
                  >
                    <div className="arch-card-image-wrap" style={{ height: '140px' }}>
                      <img src={d.image} alt={d.name} loading="lazy" />
                    </div>
                    <div style={{ padding: '12px' }}>
                      <p style={{ fontFamily: 'Outfit,sans-serif', fontSize: '13px', fontWeight: 700, color: '#f0f4ff', marginBottom: '6px', lineHeight: 1.3 }}>
                        {d.name}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'Outfit,sans-serif' }}>
                          {d.floors}F · {d.sqft.toLocaleString()} sqft
                        </span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#00d4ff', fontFamily: 'Outfit,sans-serif', marginTop: '4px', fontWeight: 600 }}>
                        ₹{d.budget}L
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {filtered.length > 20 && (
              <p style={{ color: '#475569', fontSize: '12px', textAlign: 'center', marginTop: '12px', fontFamily: 'Outfit,sans-serif' }}>
                +{filtered.length - 20} more in results
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Mobile layout fix */}
      <style>{`
        @media (max-width: 768px) {
          main > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Sub-components ──

function SectionLabel({ icon, label, style: s }: { icon: string; label: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', ...s }}>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
        {label}
      </span>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontFamily: 'Outfit,sans-serif',
        fontSize: '13px',
        fontWeight: 600,
        color: '#94a3b8',
        marginBottom: '10px',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function RangeSlider({
  id, min, max, step, value, onChange,
}: {
  id: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const [lo, hi] = value;
  const pctLo = ((lo - min) / (max - min)) * 100;
  const pctHi = ((hi - min) / (max - min)) * 100;

  return (
    <div style={{ position: 'relative', paddingBottom: '4px' }}>
      {/* Track */}
      <div style={{
        position: 'relative', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px',
      }}>
        <div style={{
          position: 'absolute',
          left: `${pctLo}%`,
          right: `${100 - pctHi}%`,
          height: '100%',
          background: 'linear-gradient(90deg,#00d4ff,#a855f7)',
          borderRadius: '2px',
        }} />
      </div>

      {/* Low slider */}
      <input
        id={`${id}-min`}
        type="range" min={min} max={max} step={step} value={lo}
        onChange={e => { const v = +e.target.value; if (v < hi) onChange([v, hi]); }}
        className="arch-slider"
        style={{ position: 'absolute', top: '-8px', left: 0, width: '100%', background: 'transparent', zIndex: 2 }}
      />
      {/* High slider */}
      <input
        id={`${id}-max`}
        type="range" min={min} max={max} step={step} value={hi}
        onChange={e => { const v = +e.target.value; if (v > lo) onChange([lo, v]); }}
        className="arch-slider"
        style={{ position: 'absolute', top: '-8px', left: 0, width: '100%', background: 'transparent', zIndex: 2 }}
      />
    </div>
  );
}

function TriStateToggle({
  id, value, onChange,
}: {
  id: string;
  value: boolean | null;
  onChange: (v: boolean | null) => void;
}) {
  const cycle = () => {
    if (value === null) onChange(true);
    else if (value === true) onChange(false);
    else onChange(null);
  };

  return (
    <button
      id={id}
      onClick={cycle}
      style={{
        width: '60px', height: '24px', borderRadius: '12px',
        border: 'none', cursor: 'pointer', fontFamily: 'Outfit,sans-serif',
        fontSize: '11px', fontWeight: 700, transition: 'all 0.25s',
        background: value === null
          ? 'rgba(255,255,255,0.08)'
          : value
          ? 'linear-gradient(135deg,#00d4ff,#a855f7)'
          : 'rgba(239,68,68,0.2)',
        color: value === null ? '#475569' : value ? '#fff' : '#ef4444',
        boxShadow: value === true ? '0 0 10px rgba(0,212,255,0.3)' : 'none',
      }}
    >
      {value === null ? 'ANY' : value ? 'YES' : 'NO'}
    </button>
  );
}
