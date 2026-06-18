import { ClipboardList } from "lucide-react"

import { QuickAction } from "./QuickAction"

type AddExpenseActionProps = {
  onClick?: () => void
}

export function AddExpenseAction({ onClick }: AddExpenseActionProps) {
  return (
    <QuickAction
      icon={<ClipboardList className="h-4 w-4" />}
      iconClassName="bg-green-500/10 text-green-600"
      title="Add Expense"
      description="Track spending"
      onClick={onClick}
    />
  )
}
