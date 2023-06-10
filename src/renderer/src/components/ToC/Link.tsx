import { ReactNode } from 'react'

interface ToCLinkProps {
  children: ReactNode
}

export function ToCLink(props: ToCLinkProps) {
  return <a className="hover:text-rotion-50 cursor-default" {...props} />
}
