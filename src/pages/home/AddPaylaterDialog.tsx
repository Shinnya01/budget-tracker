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

type AddPaylaterDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: {
    name: string
    months: number
    monthlyPayment: number
    imageUrl?: string
  }) => void
}

export function AddPaylaterDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddPaylaterDialogProps) {
  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [months, setMonths] = useState("")
  const [monthlyPayment, setMonthlyPayment] = useState("")

  const parsedMonths = useMemo(() => Number(months.replace(/[^0-9]/g, "")), [months])
  const parsedMonthlyPayment = useMemo(
    () => Number(monthlyPayment.replace(/[^0-9.]/g, "")),
    [monthlyPayment],
  )

  const handleSubmit = () => {
    if (
      !name.trim() ||
      !Number.isFinite(parsedMonths) ||
      parsedMonths <= 0 ||
      !Number.isFinite(parsedMonthlyPayment) ||
      parsedMonthlyPayment <= 0
    ) {
      return
    }

    onSubmit({
      name: name.trim(),
      months: parsedMonths,
      monthlyPayment: parsedMonthlyPayment,
      imageUrl: imageUrl.trim() || undefined,
    })

    setName("")
    setImageUrl("")
    setMonths("")
    setMonthlyPayment("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add PayLater</DialogTitle>
          <DialogDescription>
            Enter the item and amount. This will be deducted from your available balance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700" htmlFor="paylater-name">
              Item name
            </label>
            <Input
              id="paylater-name"
              placeholder="Shopee order"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700" htmlFor="paylater-image">
              Image URL
            </label>
            <Input
              id="paylater-image"
              placeholder="https://..."
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700" htmlFor="paylater-months">
              How many months
            </label>
            <Input
              id="paylater-months"
              inputMode="numeric"
              placeholder="6"
              value={months}
              onChange={(event) => setMonths(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700" htmlFor="paylater-monthly">
              Monthly payment
            </label>
            <Input
              id="paylater-monthly"
              inputMode="decimal"
              placeholder="₱0.00"
              value={monthlyPayment}
              onChange={(event) => setMonthlyPayment(event.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save PayLater
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
