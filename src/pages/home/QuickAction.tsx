import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

type QuickActionProps = {
  icon: ReactNode
  title: string
  description: string
  iconClassName: string
  onClick?: () => void
}

export function QuickAction({
  icon,
  title,
  description,
  iconClassName,
  onClick,
}: QuickActionProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-auto w-full flex-col items-center justify-center gap-0 rounded-2xl border-slate-200 bg-white px-2 py-2 text-center shadow-sm"
      onClick={onClick}
    >
      <span className={`mb-1 rounded-full p-2 ${iconClassName}`}>{icon}</span>
      <span className="text-[11px] font-semibold leading-tight text-slate-900">
        {title}
      </span>
      <span className="text-2xs leading-tight text-slate-500">{description}</span>
    </Button>
  )
}
