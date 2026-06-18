import { useEffect, useState } from "react"
import { MoreVertical, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { db, type OrderRecord } from "@/lib/localDb"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

function OrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const totalReserved = orders.reduce(
    (sum, order) => sum + (order.amount ?? order.reserved ?? order.saved),
    0,
  )

  useEffect(() => {
    let active = true

    const loadOrders = async () => {
      const items = await db.orders.orderBy("id").toArray()
      const uniqueItems = Array.from(
        new Map(items.map((item) => [item.id ?? item.name, item])).values(),
      )

      if (active) {
        setOrders(uniqueItems)
      }
    }

    void loadOrders()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="page space-y-5" id="orders">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Orders
          </h2>
          <p className="max-w-md text-xs text-muted-foreground">
            Track and save for the things you want.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full border-slate-200 bg-white shadow-sm"
          aria-label="Add order"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Card className="">
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            {orders.length > 0 ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Order Amount
                  </p>
                  <p className="text-2xl font-semibold tracking-tight text-slate-900">
                    {formatCurrency(totalReserved)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    From {orders.length} active orders
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <ShoppingBag className="h-5 w-5" />
                </div>
              </>
            ) : (
              <div className="flex w-full items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Order Amount
                  </p>
                  <p className="text-2xl font-semibold tracking-tight text-slate-900">
                    {formatCurrency(0)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    No active orders yet
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <ShoppingBag className="h-5 w-5" />
                </div>
              </div>
            )}
          </div>

        </CardContent>
      </Card>

      <div className="flex flex-nowrap justify-between gap-2 overflow-x-auto pb-1 text-xs">
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="shrink-0 rounded-full border-slate-200 bg-white px-4 py-2 font-medium text-2xs text-slate-900 shadow-sm"
        >
          All Orders
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="shrink-0 rounded-full border-slate-200 bg-white px-4 py-2 font-medium text-2xs text-slate-600"
        >
          Savings
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="shrink-0 rounded-full border-slate-200 bg-white px-4 py-2 font-medium text-2xs text-slate-600"
        >
          Almost There
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="shrink-0 rounded-full border-slate-200 bg-white px-4 py-2 font-medium text-2xs text-slate-600"
        >
          Completed
        </Button>
      </div>

      <Card className="p-0">
        <CardContent className="p-0">
          {orders.length > 0 ? (
            orders.map((order, index, items) => (
              <div key={order.id ?? `${order.name}-${index}`}>
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-start gap-3 p-4">
                  <div className="size-17 shrink-0 rounded-md border border-dashed border-blue-200 bg-blue-50" />

                  <div className="min-w-0 space-y-2">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold">{order.name}</p>
                      <p className="text-xl font-semibold tracking-tight text-slate-900">
                        {formatCurrency(order.amount ?? order.reserved ?? order.saved)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="shrink-0"
                    aria-label="More actions"
                  >
                    <MoreVertical className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>

                {index < items.length - 1 ? (
                  <Separator className="bg-slate-200" />
                ) : null}
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-slate-900">
                No active orders
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Add a new order to start tracking progress.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        type="button"
        variant="outline"
        className="h-auto w-full flex-col items-center justify-center gap-1 rounded-2xl border-dashed  py-2 hover:bg-slate-50"
      >
        <span className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-700">
          <Plus className="h-4 w-4" />
        </span>
        <span className="text-sm font-semibold text-slate-900">
          Add New Order
        </span>
        <span className="text-xs text-muted-foreground">
          Save for something you want
        </span>
      </Button>
    </section>
  )
}

export default OrdersPage
