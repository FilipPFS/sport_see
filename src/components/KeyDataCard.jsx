function KeyDataCard({ icon, iconBg, value, label }) {
  return (
    <div className="key-data-card">
      <div className="key-data-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div>
        <p className="key-data-value">{value}</p>
        <p className="key-data-label">{label}</p>
      </div>
    </div>
  )
}

export default KeyDataCard
