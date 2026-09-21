"use client"

import { ReactLenis } from "lenis/react"
import { ReactNode } from "react"

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // slightly smoother than default 0.1
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
