// With the provider wrapping our root component, we can now use hooks anywhere within our app, but we aren’t quite done yet.
// If we start using hooks within our app now, we’ll end up making requests to our API during page rendering (either at build time or serve time,
// depending on how the page is configured).
// This isn’t ideal because the page will be generated before the requests can return, and Next.js can pass the data to the component.

import { useEffect, useState } from "react";

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
