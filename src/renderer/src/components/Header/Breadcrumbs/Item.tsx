import { ReactNode } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

interface ItemProps {
  isActive?: boolean
  children: ReactNode
}

export function Item({ isActive = false, children }: ItemProps) {
  const navigate = useNavigate()

  function handleNavigate() {
    navigate('/')
  }

  const Comp = isActive ? 'span' : 'a'

  return (
    <Comp
      onClick={handleNavigate}
      className={clsx('inline-flex items-center gap-2 hover:text-rotion-50', {
        'text-rotion-50': isActive,
      })}
    >
      {children}
    </Comp>
  )
}
