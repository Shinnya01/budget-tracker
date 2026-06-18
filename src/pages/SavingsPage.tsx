function SavingsPage() {
  return (
    <section className="page" id="savings">
      <div className="page-header">
        <p className="eyebrow">Savings</p>
        <h2>Goals</h2>
      </div>

      <div className="grid goals">
        <article className="card">
          <span className="metric-label">Emergency fund</span>
          <strong className="metric-value">72%</strong>
          <p>Targeting six months of essential expenses.</p>
        </article>
        <article className="card">
          <span className="metric-label">Travel fund</span>
          <strong className="metric-value">41%</strong>
          <p>Monthly auto-transfer is already configured.</p>
        </article>
      </div>
    </section>
  )
}

export default SavingsPage
