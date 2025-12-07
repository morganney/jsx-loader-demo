import type { ReactNode } from 'react'

export type ReactShellProps = {
  children?: ReactNode
}

export const ReactShell = ({ children }: ReactShellProps) => (
  <div className="react-shell">{children}</div>
)
