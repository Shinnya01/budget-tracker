import {
  ArrowLeftRight,
  ChevronRight,
  ClipboardList,
  CreditCard,
  HandPlatter,
  ShoppingBag,
  Plus,
  PiggyBank,
  TrendingUp,
  Wallet,
  WalletCards,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm py-2">
        <CardContent className="space-y-3 px-5 py-2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span>Total Balance</span>
              </div>
              <p className="text-xl font-bold tracking-tight text-slate-900">
                ₱12,500.00
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
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-1">
              <div className="rounded-2xl bg-slate-100 p-2">
                <Wallet className="h-5 w-5 text-emerald-300" />
              </div>
              <span className="text-[10px] font-medium leading-none whitespace-nowrap text-muted-foreground">
                Available
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-900">
                ₱4,200.00
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="mx-1 h-20 self-center bg-slate-200"
            />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-1">
              <div className="rounded-2xl bg-slate-100 p-2">
                <ShoppingBag className="h-5 w-5 text-amber-300" />
              </div>
              <span className="text-[10px] font-medium leading-none whitespace-nowrap text-muted-foreground">
                For Orders
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-900">
                ₱5,300.00
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="mx-1 h-20 self-center bg-slate-200"
            />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-1">
              <div className="rounded-2xl bg-slate-100 p-2">
                <PiggyBank className="h-5 w-5 text-violet-300" />
              </div>
              <span className="text-[10px] font-medium leading-none whitespace-nowrap text-muted-foreground">
                Savings
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-900">
                ₱3,000.00
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="mx-1 h-20 self-center bg-slate-200"
            />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-1">
              <div className="rounded-2xl bg-slate-100 p-2">
                <WalletCards className="h-5 w-5 text-rose-300" />
              </div>
              <span className="text-[10px] font-medium leading-none whitespace-nowrap text-muted-foreground">
                Paylater Due
              </span>
              <span className="text-sm font-medium tracking-tight text-slate-900">
                ₱2,450.00
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-1">
        <Button
          type="button"
          variant="outline"
          className="h-auto w-full flex-col items-center justify-center gap-1 rounded-2xl border-slate-200 bg-white px-2 py-2 text-center shadow-sm"
        >
          <span className="rounded-full bg-blue-500/10 p-2 text-blue-600">
            <ArrowLeftRight className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-semibold leading-tight text-slate-900">
            Move Money
          </span>
          <span className="text-[10px] leading-tight text-slate-500">
            Allocate funds
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-auto w-full flex-col items-center justify-center gap-1 rounded-2xl border-slate-200 bg-white px-2 py-2 text-center shadow-sm"
        >
          <span className="rounded-full bg-green-500/10 p-2 text-green-600">
            <Plus className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-semibold leading-tight text-slate-900">
            Add Expense
          </span>
          <span className="text-[10px] leading-tight text-slate-500">
            Track spending
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-auto w-full flex-col items-center justify-center gap-1 rounded-2xl border-slate-200 bg-white px-2 py-2 text-center shadow-sm"
        >
          <span className="rounded-full bg-amber-500/10 p-2 text-amber-600">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-semibold leading-tight text-slate-900">
            Add Order
          </span>
          <span className="text-[10px] leading-tight text-slate-500">
            Start saving
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-auto w-full flex-col items-center justify-center gap-1 rounded-2xl border-slate-200 bg-white px-2 py-2 text-center shadow-sm"
        >
          <span className="rounded-full bg-violet-500/10 p-2 text-violet-600">
            <WalletCards className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-semibold leading-tight text-slate-900">
            Add PayLater
          </span>
          <span className="text-[10px] leading-tight text-slate-500">
            Track payments
          </span>
        </Button>
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
          <Card className="border-slate-200 bg-white shadow-sm py-2">
            <CardContent className="space-y-4 px-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-blue-500/10 p-2 text-blue-600">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-md font-semibold text-slate-900">
                    Order
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sm font-medium text-muted-foreground">
                    Saved
                  </span>
                  <span className="text-xs font-bold tracking-tight text-blue-600">
                    ₱500 <span className="text-slate-400">/ ₱850</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[59%] rounded-full bg-blue-500" />
                </div>
              </div>

              <p className="text-[10px] text-slate-500">
                Need ₱350 more • Due Jun 25
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm py-2">
            <CardContent className="space-y-4 px-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-rose-500/10 p-2 text-rose-500">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-md font-semibold text-slate-900">
                    PayLater
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sm font-medium text-muted-foreground">
                    Remaining
                  </span>
                  <span className="text-xs font-bold tracking-tight text-rose-500">
                    ₱1,450 <span className="text-slate-400">/ ₱2,450</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[59%] rounded-full bg-rose-500" />
                </div>
              </div>

              <p className="text-[10px] text-slate-500">
                Due on Jul 5 • 5 days left
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm py-2">
            <CardContent className="space-y-4 p-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-600">
                  <ClipboardList className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className=" ext-md font-semibold text-slate-900">
                    Today
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sm font-medium text-muted-foreground">
                    Spent
                  </span>
                  <span className="text-xs font-bold tracking-tight text-emerald-600">
                    ₱320 <span className="text-slate-400">/ ₱500</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[64%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <p className="text-[10px] text-slate-500">
                Remaining today: ₱180
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm py-2">
            <CardContent className="space-y-4 p-2">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-violet-500/10 p-2 text-violet-600">
                  <PiggyBank className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-md font-semibold text-slate-900">
                    Savings
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sm font-medium text-muted-foreground">
                    Saved
                  </span>
                  <span className="text-xs font-bold tracking-tight text-violet-600">
                    ₱3,000 <span className="text-slate-400">/ ₱10,000</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[30%] rounded-full bg-violet-500" />
                </div>
              </div>

              <p className="text-[10px] text-slate-500">Remaining: ₱7,000</p>
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

        <Card className="border-slate-200 bg-white shadow-sm py-0">
          <CardContent className="p-0">
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="rounded-full bg-rose-500/10 p-3 text-rose-500">
                <HandPlatter className="h-5 w-5" />
              </div>
                <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">Lunch</p>
                <p className="text-xs font-medium text-muted-foreground">
                  Food &amp; Drink
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tracking-tight text-slate-900">
                  -₱120.00
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  Today, 12:30 PM
                </p>
              </div>
            </div>

            <Separator className="bg-slate-200" />

            <div className="flex items-center gap-3 px-4 py-4">
              <div className="rounded-full bg-blue-500/10 p-3 text-blue-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">Salary</p>
                <p className="text-xs font-medium text-muted-foreground">
                  Income
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tracking-tight text-emerald-500">
                  +₱15,000.00
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  May 20, 9:00 AM
                </p>
              </div>
            </div>

            <Separator className="bg-slate-200" />

            <div className="flex items-center gap-3 px-4 py-4">
              <div className="rounded-full bg-amber-500/10 p-3 text-amber-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  Shopee Order
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  Order Tracker
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tracking-tight text-slate-900">
                  -₱500.00
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  May 18, 8:15 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
