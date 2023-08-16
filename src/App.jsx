import { useEffect } from 'react'
import { AppRouter } from './routes/AppRouter'
import './theme/styles.scss'
import { useDispatch } from 'react-redux'
import { startGetBrowserSize } from './store/app/appThunks'

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    dispatch(startGetBrowserSize({ innerWidth, innerHeight }));
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      dispatch(startGetBrowserSize({ innerWidth, innerHeight }));
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppRouter />
  )
}
