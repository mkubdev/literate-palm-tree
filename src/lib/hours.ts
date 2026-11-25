"use client";

import { useEffect, useState } from "react";
import {
  type Closure,
  computeOpenState,
  type Hours,
  type OpenState,
} from "./opening";

/** null pendant le rendu serveur, pour éviter un écart d'hydratation */
export function useOpenState(
  hours: Hours,
  closures: Closure[] = [],
): OpenState | null {
  const [state, setState] = useState<OpenState | null>(null);
  useEffect(() => {
    const tick = () => setState(computeOpenState(new Date(), hours, closures));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [hours, closures]);
  return state;
}
