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

type SalaryDialogProps = {
  open: boolean
  amount: string
  onOpenChange: (open: boolean) => void
  onAmountChange: (value: string) => void
  onSubmit: () => void
}

export function SalaryDialog({
  open,
  amount,
  onOpenChange,
  onAmountChange,
  onSubmit,
}: SalaryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Salary</DialogTitle>
          <DialogDescription>
            Enter the amount you want to allocate into your buckets.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700" htmlFor="salary-amount">
            Salary amount
          </label>
          <Input
            id="salary-amount"
            inputMode="decimal"
            placeholder="₱0.00"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
          />
          <p className="text-2xs text-slate-500">
            We&apos;ll use this to update your available balance and buckets.
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
