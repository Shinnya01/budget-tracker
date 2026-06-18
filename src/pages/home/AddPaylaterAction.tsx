import { WalletCards } from "lucide-react"

import { QuickAction } from "./QuickAction"

type AddPaylaterActionProps = {
  onClick?: () => void
}

export function AddPaylaterAction({ onClick }: AddPaylaterActionProps) {
  return (
    <QuickAction
      icon={<WalletCards className="h-4 w-4" />}
      iconClassName="bg-violet-500/10 text-violet-600"
      title="Add PayLater"
      description="Track payments"
      onClick={onClick}
    />
  )
}
