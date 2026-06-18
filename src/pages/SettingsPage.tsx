function SettingsPage() {
  return (
    <section className="page" id="settings">
      <div className="page-header">
        <p className="eyebrow">Settings</p>
        <h2>Preferences</h2>
      </div>

      <div className="card">
        <div className="list-row">
          <span>Currency</span>
          <strong>PHP</strong>
        </div>
        <div className="list-row">
          <span>Budget cycle</span>
          <strong>Monthly</strong>
        </div>
        <div className="list-row">
          <span>Notifications</span>
          <strong>Enabled</strong>
        </div>
      </div>
    </section>
  )
}

export default SettingsPage
