import * as React from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';

interface UseNavigation {
  push: NextRouter['push'];
  replace: NextRouter['replace'];
}

export default function useNavigation(): UseNavigation {
  const router = useRouter();

  const routerRef = React.useRef(router);

  routerRef.current = router;

  const [navigation] = React.useState<Pick<NextRouter, 'push' | 'replace'>>({
    push: (path) => routerRef.current.push(path),
    replace: (path) => routerRef.current.replace(path),
  });

  return navigation;
}
