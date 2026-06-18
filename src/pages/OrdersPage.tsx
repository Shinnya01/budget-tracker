import { MoreVertical, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

function OrdersPage() {
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
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Reserved
              </p>
              <p className="text-2xl font-semibold tracking-tight text-slate-900">
                ₱4,250.00
              </p>
              <p className="text-xs text-muted-foreground">
                From 3 active orders
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 p-3 text-slate-700">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="space-y-3">
            <p className="text-xs font-bold tracking-wide text-slate-900">
              Overall progress
            </p>
            <Progress value={62} className="h-2 bg-slate-200 mt-1" />
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
          {[
            {
              name: "Mechanical Keyboard",
              target: "₱3,500.00",
              saved: "₱1,200.00 saved (34%)",
              progress: 34,
              due: "Jun 28",
            },
            {
              name: "iPhone 15 Case",
              target: "₱850.00",
              saved: "₱500.00 saved (59%)",
              progress: 59,
              due: "Jul 5",
            },
            {
              name: "Monitor Stand",
              target: "₱1,500.00",
              saved: "₱300.00 saved (20%)",
              progress: 20,
              due: "Jul 15",
            },
          ].map((order, index, items) => (
            <div key={order.name}>
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-start gap-3 p-4">
                <div className="size-17 shrink-0 rounded-md border border-dashed border-slate-200 bg-slate-50" />

                <div className="min-w-0 space-y-2">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold">{order.name}</p>
                    <p className="text-2xs text-muted-foreground">Target: {order.target}</p>
                  </div>

                  <div className="space-y-2">
                    <Progress value={order.progress} className="h-2 bg-slate-200" />
                    <p className="text-2xs font-semibold text-muted-foreground">{order.saved}</p>
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <p className="text-2xs text-muted-foreground">Due {order.due}</p>
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
          ))}
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
