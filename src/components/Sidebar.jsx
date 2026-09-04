function Sidebar() {
  const activities = [
    { icon: '🧘', label: 'Yoga' },
    { icon: '🏊', label: 'Natation' },
    { icon: '🚴', label: 'Cyclisme' },
    { icon: '🤸', label: 'Musculation' },
  ]

  return (
    <aside className="sidebar">
      <ul>
        {activities.map(({ icon, label }) => (
          <li key={label} aria-label={label}>
            {icon}
          </li>
        ))}
      </ul>
      <p className="copyright">Copyright, SportSee 2020</p>
    </aside>
  )
}

export default Sidebar
