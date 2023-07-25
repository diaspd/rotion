import { ReactNode } from 'react'

interface ToCSectionProps {
  children: ReactNode
}

export function ToCSection(props: ToCSectionProps) {
  return (
    <div className="flex flex-col self-end px-6 overflow-hidden" {...props} />
  )
}
