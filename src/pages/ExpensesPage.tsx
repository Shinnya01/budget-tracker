function ExpensesPage() {
  return (
    <section className="page" id="expenses">
      <div className="page-header">
        <p className="eyebrow">Expenses</p>
        <h2>Spending breakdown</h2>
      </div>

      <div className="stack">
        <div className="bar">
          <span>Needs</span>
          <div className="track">
            <div className="fill fill-wide" />
          </div>
        </div>
        <div className="bar">
          <span>Wants</span>
          <div className="track">
            <div className="fill fill-medium" />
          </div>
        </div>
        <div className="bar">
          <span>Savings</span>
          <div className="track">
            <div className="fill fill-short" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpensesPage
