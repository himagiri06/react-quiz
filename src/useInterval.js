import { useEffect } from "react";

export default function useInterval(interval, callback) {
  useEffect(
    function () {
      const timerId = setInterval(callback, interval);
      return function () {
        clearInterval(timerId);
      };
    },
    [callback, interval]
  );
}
