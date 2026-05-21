// Photos.jsx — gallery of placeholder photos
const PHOTOS = [
  { cap: 'desk · 2024', icon: 'monitor' },
  { cap: 'coffee · winter', icon: 'coffee' },
  { cap: 'rooftop · dusk', icon: 'sunset' },
  { cap: 'hike · ridge trail', icon: 'mountain' },
  { cap: 'studio · saturday', icon: 'camera' },
  { cap: 'commute · 6am', icon: 'train-front' },
  { cap: 'dog · always', icon: 'dog' },
];

function Photos() {
  return (
    <section className="section" id="photos">
      <div className="section-head">
        <h2>photos</h2>
        <span className="meta">{PHOTOS.length} · drop your own</span>
      </div>
      <p className="section-intro">
        A small collection. Replace these placeholders with real photos by dropping
        them into <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-sky)' }}>assets/photos/</code> and updating the array.
      </p>
      <div className="gallery-grid">
        {PHOTOS.map((p, i) => (
          <div key={i} className="photo">
            <div className={`ph ph-${(i % 7) + 1}`}>
              <i data-lucide={p.icon}></i>
            </div>
            <div className="meta">{p.cap}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Photos = Photos;
