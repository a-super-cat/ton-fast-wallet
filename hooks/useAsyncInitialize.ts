import { useEffect, useState } from "react";

export const useAsyncInitialize = <T>(
  func: () => Promise<T>,
  deps: any[] = []
) => {
  const [state, setState] = useState<T | null>(null);
  useEffect(() => {
    func().then(setState);
  }, deps);
  return state;
}