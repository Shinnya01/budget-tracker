import { ShoppingBag } from "lucide-react"

import { QuickAction } from "./QuickAction"

type AddOrderActionProps = {
  onClick?: () => void
}

export function AddOrderAction({ onClick }: AddOrderActionProps) {
  return (
    <QuickAction
      icon={<ShoppingBag className="h-4 w-4" />}
      iconClassName="bg-amber-500/10 text-amber-600"
      title="Add Order"
      description="Start saving"
      onClick={onClick}
    />
  )
}
