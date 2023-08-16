import { setAppInfo, setBrowserSize } from "./appSlice";
import AppInfo from '../landing.json'

export const startGetAppInfo = () => async(dispatch, getState) => {
  const resp = AppInfo.landing;
  dispatch( setAppInfo(resp) );
}

export const startGetBrowserSize = ({ innerWidth, innerHeight }) => (dispatch, getState) => {
  const size = 
    (innerWidth>=1400)
    ? "xxl"
    : (innerWidth>=1200)
      ? "xl"
      : (innerWidth>=992)
        ? "lg"
        : (innerWidth>=768)
          ? "md"
          : (innerWidth>=576)
            ? "sm"
            : (innerWidth<576)
              && "xs"
  dispatch( setBrowserSize({innerHeight, innerWidth, size }) );
}