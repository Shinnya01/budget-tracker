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

type AddOrderDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: { name: string; amount: number }) => void
}

export function AddOrderDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddOrderDialogProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")

  const parsedAmount = useMemo(() => Number(amount.replace(/[^0-9.]/g, "")), [amount])

  const handleSubmit = () => {
    if (!name.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return
    }

    onSubmit({
      name: name.trim(),
      amount: parsedAmount,
    })

    setName("")
    setAmount("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Order</DialogTitle>
          <DialogDescription>
            Enter the item name and cost. The amount will be deducted from your balance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700" htmlFor="order-name">
              Order name
            </label>
            <Input
              id="order-name"
              placeholder="Mechanical Keyboard"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700" htmlFor="order-amount">
              Cost
            </label>
            <Input
              id="order-amount"
              inputMode="decimal"
              placeholder="₱0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
