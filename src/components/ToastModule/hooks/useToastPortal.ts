import { useEffect, useState } from "react";
import { uuid } from "../shared";
import { Position, UseToastPortal } from "../types";

/**
 * Custom hook for creating a portal fot toasts
 * @type {UseToastPortal}
 */
export function useToastPortal(position: Position): UseToastPortal {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [portalId] = useState<string>(`toast-portal-${uuid()}`);

  useEffect(() => {
    const div: HTMLDivElement = document.createElement('div');
    div.id = portalId;

    if (position === 'left') {
      div.setAttribute('style', 'position: fixed; top: 10px; left: 10px');
    }

    if (position === 'right') {
      div.setAttribute('style', 'position: fixed; top: 10px; right: 10px');
    }

    if (position === 'center') {
      div.setAttribute('style', 'position:fixed; display:flex;align-items:center;justify-content:center;top:0px;left:0px; width:100vw;');
    }

    if (position === 'bottom') {
      div.setAttribute('style', 'position:fixed; display:flex;align-items:center;justify-content:center;bottom:0px;left:0px; width:100vw;');
    }

    document.getElementsByTagName('body')[0].prepend(div);

    setLoaded(true);

    return (): any => document.getElementsByTagName('body')[0].removeChild(div);
  }, [position, portalId]);

  return { loaded, portalId };
}