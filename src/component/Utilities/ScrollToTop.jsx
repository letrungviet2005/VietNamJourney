import { useLayoutEffect } from 'react'; // Correct import statement
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => { // Correct hook usage
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
