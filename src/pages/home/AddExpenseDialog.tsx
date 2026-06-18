import { ChevronDown } from "lucide-react"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Bills & Utilities",
  "Entertainment",
  "Others",
] as const

type AddExpenseDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: { name: string; amount: number; category: string }) => void
}

export function AddExpenseDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddExpenseDialogProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<(typeof expenseCategories)[number]>(
    "Food & Dining",
  )

  const amountValue = useMemo(() => Number(amount.replace(/[^0-9.]/g, "")), [amount])

  const handleSubmit = () => {
    if (!name.trim() || !Number.isFinite(amountValue) || amountValue <= 0) {
      return
    }

    onSubmit({
      name: name.trim(),
      amount: amountValue,
      category,
    })

    setName("")
    setAmount("")
    setCategory("Food & Dining")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Enter the expense details and pick a category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700" htmlFor="expense-name">
              Expense name
            </label>
            <Input
              id="expense-name"
              placeholder="Coffee Shop"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700" htmlFor="expense-amount">
              Amount
            </label>
            <Input
              id="expense-amount"
              inputMode="decimal"
              placeholder="₱0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Category</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                >
                  <span className="truncate">{category}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {expenseCategories.map((item) => (
                  <DropdownMenuItem key={item} onClick={() => setCategory(item)}>
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
