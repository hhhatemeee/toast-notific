import { useEffect, useState } from "react";
import { uuid } from "../shared";
import { UseToastPortal } from "../types";

/**
 * Custom hook for mounting div element in document upper 'root' in React
 * @returns {object} 
 * @property {boolean} loaded - Flag indicating whether the div element was mounted
 * @property {string} portalId - unique identifier for the div element 
 */
export function useToastPortal(): UseToastPortal {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [portalId] = useState<string>(`toast-portal-${uuid()}`);

  useEffect(() => {
    const div: HTMLDivElement = document.createElement('div');

    div.id = portalId;
    div.setAttribute('style', 'position: fixed; top: 10px; right: 10px');
    document.getElementsByTagName('body')[0].prepend(div);

    setLoaded(true);

    return (): any => document.getElementsByTagName('body')[0].removeChild(div);
  }, [portalId]);

  return { loaded, portalId };
}