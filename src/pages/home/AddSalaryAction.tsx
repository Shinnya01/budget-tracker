import { Plus } from "lucide-react"

import { QuickAction } from "./QuickAction"

type AddSalaryActionProps = {
  onClick: () => void
}

export function AddSalaryAction({ onClick }: AddSalaryActionProps) {
  return (
    <QuickAction
      icon={<Plus className="h-4 w-4" />}
      iconClassName="bg-blue-500/10 text-blue-600"
      title="Add Salary"
      description="Fund your buckets"
      onClick={onClick}
    />
  )
}
