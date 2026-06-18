import { useEffect, useMemo, useState } from "react"
import {
  ChevronRight,
  CreditCard,
  ClipboardList,
  HandPlatter,
  ShoppingBag,
  PiggyBank,
  Wallet,
  WalletCards,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  db,
  type ExpenseRecord,
  type IncomeRecord,
  type OrderRecord,
  type PayLaterRecord,
  type SavingGoalRecord,
} from "@/lib/localDb"
import { AddExpenseAction } from "./AddExpenseAction"
import { AddExpenseDialog } from "./AddExpenseDialog"
import { AddOrderAction } from "./AddOrderAction"
import { AddOrderDialog } from "./AddOrderDialog"
import { AddPaylaterAction } from "./AddPaylaterAction"
import { AddPaylaterDialog } from "./AddPaylaterDialog"
import { AddSalaryAction } from "./AddSalaryAction"
import { SalaryDialog } from "./SalaryDialog"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

export function HomePage() {
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([])
  const [savingGoals, setSavingGoals] = useState<SavingGoalRecord[]>([])
  const [paylaters, setPaylaters] = useState<PayLaterRecord[]>([])
  const [incomes, setIncomes] = useState<IncomeRecord[]>([])
  const [isSalaryOpen, setIsSalaryOpen] = useState(false)
  const [isExpenseOpen, setIsExpenseOpen] = useState(false)
  const [isOrderOpen, setIsOrderOpen] = useState(false)
  const [isPaylaterOpen, setIsPaylaterOpen] = useState(false)
  const [salaryAmount, setSalaryAmount] = useState("")

  useEffect(() => {
    let active = true

    const loadHome = async () => {
      const [orderItems, expenseItems, goalItems, paylaterItems, incomeItems] = await Promise.all([
        db.orders.orderBy("id").toArray(),
        db.expenses.orderBy("id").toArray(),
        db.savingGoals.orderBy("id").toArray(),
        db.paylaters.orderBy("id").toArray(),
        db.incomes.orderBy("id").toArray(),
      ])

      if (active) {
        setOrders(
          Array.from(
            new Map(orderItems.map((item) => [item.id ?? item.name, item])).values(),
          ),
        )
        setExpenses(
          Array.from(
            new Map(
              expenseItems.map((item) => [
                `${item.name}-${item.category}-${item.time}`,
                item,
              ]),
            ).values(),
          ),
        )
        setSavingGoals(
          Array.from(
            new Map(goalItems.map((item) => [item.id ?? item.title, item])).values(),
          ),
        )
        setPaylaters(
          Array.from(
            new Map(
              paylaterItems.map(
                (item) => [item.id ?? `${item.name}-${item.months}-${item.totalAmount}`, item],
              ),
            ).values(),
          ),
        )
        setIncomes(
          Array.from(
            new Map(
              incomeItems.map((item) => [item.id ?? `${item.source}-${item.createdAt}`, item]),
            ).values(),
          ),
        )
      }
    }

    void loadHome()

    return () => {
      active = false
    }
  }, [])

  const incomeTotal = useMemo(
    () => incomes.reduce((sum, income) => sum + income.amount, 0),
    [incomes],
  )
  const totalBalance = useMemo(
    () =>
      incomeTotal +
      orders.reduce((sum, order) => sum + order.saved, 0) +
      expenses.reduce((sum, expense) => sum + expense.amount, 0) +
      savingGoals.reduce((sum, goal) => sum + goal.saved, 0),
    [expenses, incomeTotal, orders, savingGoals],
  )

  const reservedOrders = useMemo(
    () =>
      orders.reduce(
        (sum, order) => sum + (order.amount ?? order.reserved ?? order.saved),
        0,
      ),
    [orders],
  )
  const paylaterDue = useMemo(
    () => paylaters.reduce((sum, paylater) => sum + paylater.monthlyPayment, 0),
    [paylaters],
  )
  const paylaterOutstanding = useMemo(
    () => paylaters.reduce((sum, paylater) => sum + paylater.totalAmount, 0),
    [paylaters],
  )
  const available = useMemo(
    () => Math.max(0, totalBalance - reservedOrders - paylaterOutstanding),
    [paylaterOutstanding, reservedOrders, totalBalance],
  )

  const forOrders = useMemo(
    () => orders.reduce((sum, order) => sum + order.target, 0),
    [orders],
  )
  const savings = useMemo(
    () => savingGoals.reduce((sum, goal) => sum + goal.saved, 0),
    [savingGoals],
  )
  const todaySpending = useMemo(() => {
    const today = new Date().toDateString()

    return expenses.reduce((sum, expense) => {
      if (expense.time.startsWith("Today")) {
        return sum + expense.amount
      }

      const expenseDate = new Date(expense.time).toDateString()
      return expenseDate === today ? sum + expense.amount : sum
    }, 0)
  }, [expenses])
  const recentTransactions = useMemo(
    () =>
      expenses.slice(0, 3).map((expense) => ({
        name: expense.name,
        category: expense.category,
        amount: expense.amount,
        time: expense.time,
      })),
    [expenses],
  )

  const handleSalarySubmit = async () => {
    const parsedAmount = Number(salaryAmount.replace(/[^0-9.]/g, ""))

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return
    }

    const createdAt = new Date().toISOString()
    const id = await db.incomes.add({
      source: "Salary",
      amount: parsedAmount,
      createdAt,
    })

    setIncomes((current) => [
      ...current,
      {
        id,
        source: "Salary",
        amount: parsedAmount,
        createdAt,
      },
    ])
    setSalaryAmount("")
    setIsSalaryOpen(false)
  }

  const handleExpenseSubmit = async (payload: {
    name: string
    amount: number
    category: string
  }) => {
    const time = `Today, ${new Intl.DateTimeFormat("en-PH", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date())}`

    const id = await db.expenses.add({
      name: payload.name,
      amount: payload.amount,
      category: payload.category,
      time,
    })

    setExpenses((current) => [
      ...current,
      {
        id,
        name: payload.name,
        amount: payload.amount,
        category: payload.category,
        time,
      },
    ])
    setIsExpenseOpen(false)
  }

  const handleOrderSubmit = async (payload: { name: string; amount: number }) => {
    const id = await db.orders.add({
      name: payload.name,
      target: payload.amount,
      saved: 0,
      progress: 0,
      due: "N/A",
      amount: payload.amount,
    })

    setOrders((current) => [
      ...current,
      {
        id,
        name: payload.name,
        target: payload.amount,
        saved: 0,
        progress: 0,
        due: "N/A",
        amount: payload.amount,
      },
    ])
    setIsOrderOpen(false)
  }

  const handlePaylaterSubmit = async (payload: {
    name: string
    months: number
    monthlyPayment: number
    imageUrl?: string
  }) => {
    const totalAmount = payload.months * payload.monthlyPayment
    const id = await db.paylaters.add({
      name: payload.name,
      months: payload.months,
      monthlyPayment: payload.monthlyPayment,
      totalAmount,
      imageUrl: payload.imageUrl,
    })

    setPaylaters((current) => [
      ...current,
      {
        id,
        name: payload.name,
        months: payload.months,
        monthlyPayment: payload.monthlyPayment,
        totalAmount,
        imageUrl: payload.imageUrl,
      },
    ])
    setIsPaylaterOpen(false)
  }

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

      <Card className="overflow-hidden border-slate-200 bg-white py-4 shadow-sm">
        <CardContent className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span>Total Balance</span>
              </div>
              <p className="text-4xl font-bold tracking-tight text-slate-900">
                {formatCurrency(totalBalance)}
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 rounded-full"
            >
              Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="bg-slate-200" />

          <div className="flex items-stretch gap-0 text-center">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="rounded-2xl bg-slate-100 p-2">
                <Wallet className="h-5 w-5 text-emerald-300" />
              </div>
              <span className="text-2xs font-medium leading-none whitespace-nowrap text-muted-foreground">
                Available
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-900">
                {formatCurrency(available)}
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="mx-1 h-20 self-center bg-slate-200"
            />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="rounded-2xl bg-slate-100 p-2">
                <ShoppingBag className="h-5 w-5 text-amber-300" />
              </div>
              <span className="text-2xs font-medium leading-none whitespace-nowrap text-muted-foreground">
                For Orders
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-900">
                {formatCurrency(forOrders)}
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="mx-1 h-20 self-center bg-slate-200"
            />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="rounded-2xl bg-slate-100 p-2">
                <PiggyBank className="h-5 w-5 text-violet-300" />
              </div>
              <span className="text-2xs font-medium leading-none whitespace-nowrap text-muted-foreground">
                Savings
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-900">
                {formatCurrency(savings)}
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="mx-1 h-20 self-center bg-slate-200"
            />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="rounded-2xl bg-slate-100 p-2">
                <WalletCards className="h-5 w-5 text-rose-300" />
              </div>
              <span className="text-2xs font-medium leading-none whitespace-nowrap text-muted-foreground">
                Paylater Monthly
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-900">
                {formatCurrency(paylaterDue)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-1">
        <AddSalaryAction onClick={() => setIsSalaryOpen(true)} />
        <AddExpenseAction onClick={() => setIsExpenseOpen(true)} />
        <AddOrderAction onClick={() => setIsOrderOpen(true)} />
        <AddPaylaterAction onClick={() => setIsPaylaterOpen(true)} />
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">My Trackers</h2>
          <Button
            type="button"
            variant="ghost"
            className="h-auto px-0 text-xs font-medium text-blue-600 hover:bg-transparent hover:text-blue-700"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="border-slate-200 bg-white py-2 shadow-sm">
            <CardContent className="space-y-2 px-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-blue-500/10 p-2 text-blue-600">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-md font-semibold text-slate-900">Order</p>
                </div>
              </div>

              {orders.length > 0 ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-xs font-bold tracking-tight text-blue-600">
                        {formatCurrency(
                          orders.reduce((sum, order) => sum + order.saved, 0),
                        )}{" "}
                        <span className="text-slate-400">
                          / {formatCurrency(
                            orders.reduce((sum, order) => sum + order.target, 0),
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{
                          width: `${Math.min(
                            100,
                            orders.reduce((sum, order) => sum + order.progress, 0) /
                              Math.max(1, orders.length),
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-2xs text-slate-500">
                    Need{" "}
                    {formatCurrency(
                      Math.max(
                        0,
                        orders.reduce((sum, order) => sum + order.target - order.saved, 0),
                      ),
                    )}{" "}
                    more
                  </p>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-medium text-slate-900">
                    No active orders
                  </p>
                  <p className="mt-1 text-2xs text-slate-500">
                    Add an order to start tracking savings.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="py-2">
            <CardContent className="space-y-2 px-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-rose-500/10 p-2 text-rose-500">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-md font-semibold text-slate-900">PayLater</p>
                </div>
              </div>

              {paylaters.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  {paylaters.map((paylater, index, items) => (
                    <div key={paylater.id ?? `${paylater.name}-${index}`}>
                      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3">
                        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-rose-200 bg-rose-50 text-rose-400">
                          {paylater.imageUrl ? (
                            <img
                              src={paylater.imageUrl}
                              alt={paylater.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-semibold">
                              {paylater.name.trim().charAt(0).toUpperCase() || "?"}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <p className="truncate text-xs font-semibold text-slate-900">
                            {paylater.name}
                          </p>
                          <p className="text-2xs text-muted-foreground">
                            {paylater.months} months
                          </p>
                        </div>

                        <div className="space-y-1 text-right">
                          <p className="text-xs font-semibold tracking-tight text-slate-900">
                            {formatCurrency(paylater.monthlyPayment)}
                          </p>
                          <p className="text-2xs text-muted-foreground">
                            / {formatCurrency(paylater.totalAmount)}
                          </p>
                        </div>
                      </div>

                      {index < items.length - 1 ? (
                        <Separator className="bg-slate-200" />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-medium text-slate-900">
                    No paylater yet
                  </p>
                  <p className="mt-1 text-2xs text-slate-500">
                    Add an installment item to start tracking payments.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white py-2 shadow-sm">
            <CardContent className="space-y-2 p-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-600">
                  <ClipboardList className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-md font-semibold text-slate-900">Today</p>
                </div>
              </div>

              {todaySpending > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-xs font-bold tracking-tight text-emerald-600">
                      {formatCurrency(todaySpending)}{" "}
                      <span className="text-slate-400">
                        / {formatCurrency(expenses.reduce((sum, expense) => sum + expense.amount, 0))}
                      </span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{
                        width: `${Math.min(
                          100,
                          (todaySpending /
                            Math.max(
                              1,
                              expenses.reduce((sum, expense) => sum + expense.amount, 0),
                            )) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <ClipboardList className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-medium text-slate-900">
                    No spending today
                  </p>
                  <p className="mt-1 text-2xs text-slate-500">
                    Add an expense to start tracking progress.
                  </p>
                </div>
              )}

              {todaySpending > 0 ? (
                <p className="text-2xs text-slate-500">
                  Remaining today: {formatCurrency(
                    Math.max(
                      0,
                      expenses.reduce((sum, expense) => sum + expense.amount, 0) - todaySpending,
                    ),
                  )}
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white py-2 shadow-sm">
            <CardContent className="space-y-2 p-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-violet-500/10 p-2 text-violet-600">
                  <PiggyBank className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-md font-semibold text-slate-900">Savings</p>
                </div>
              </div>

              {savingGoals.length > 0 ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-xs font-bold tracking-tight text-violet-600">
                        {formatCurrency(
                          savingGoals.reduce((sum, goal) => sum + goal.saved, 0),
                        )}{" "}
                        <span className="text-slate-400">
                          / {formatCurrency(
                            savingGoals.reduce((sum, goal) => sum + goal.target, 0),
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-violet-500"
                        style={{
                          width: `${Math.min(
                            100,
                            (savingGoals.reduce((sum, goal) => sum + goal.saved, 0) /
                              Math.max(
                                1,
                                savingGoals.reduce((sum, goal) => sum + goal.target, 0),
                              )) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-2xs text-slate-500">
                    Remaining:{" "}
                    {formatCurrency(
                      Math.max(
                        0,
                        savingGoals.reduce((sum, goal) => sum + goal.target - goal.saved, 0),
                      ),
                    )}
                  </p>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600">
                    <PiggyBank className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-medium text-slate-900">
                    No savings goals yet
                  </p>
                  <p className="mt-1 text-2xs text-slate-500">
                    Add your first goal to track progress.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Recent Transactions
          </h2>
          <Button
            type="button"
            variant="ghost"
            className="h-auto px-0 text-xs font-medium text-blue-600 hover:bg-transparent hover:text-blue-700"
          >
            View All
          </Button>
        </div>

        <Card className="py-0">
          <CardContent className="p-0">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => (
                <div key={`${transaction.name}-${transaction.category}-${transaction.time}`}>
                  <div className="flex items-center gap-3 px-4 py-4">
                    <div className="rounded-full bg-rose-500/10 p-3 text-rose-500">
                      <HandPlatter className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {transaction.name}
                      </p>
                      <p className="text-xs font-medium text-muted-foreground">
                        {transaction.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tracking-tight text-slate-900">
                        -{formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs font-medium text-muted-foreground">
                        {transaction.time}
                      </p>
                    </div>
                  </div>

                  {index < recentTransactions.length - 1 ? (
                    <Separator className="bg-slate-200" />
                  ) : null}
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm font-medium text-slate-900">
                  No recent transactions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <SalaryDialog
        open={isSalaryOpen}
        amount={salaryAmount}
        onOpenChange={setIsSalaryOpen}
        onAmountChange={setSalaryAmount}
        onSubmit={() => void handleSalarySubmit()}
      />

      <AddExpenseDialog
        open={isExpenseOpen}
        onOpenChange={setIsExpenseOpen}
        onSubmit={(payload) => void handleExpenseSubmit(payload)}
      />

      <AddOrderDialog
        open={isOrderOpen}
        onOpenChange={setIsOrderOpen}
        onSubmit={(payload) => void handleOrderSubmit(payload)}
      />

      <AddPaylaterDialog
        open={isPaylaterOpen}
        onOpenChange={setIsPaylaterOpen}
        onSubmit={(payload) => void handlePaylaterSubmit(payload)}
      />
    </div>
  )
}
