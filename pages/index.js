import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserActions from "../store/reducers/user";

export default function Index({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const url = window.location.href;

      if (url.includes("&")) {
        // Save info from petbooking, for future requests
        localStorage.setItem("@pb/token", url.split("token=")[1].split("&")[0]);
        localStorage.setItem(
          "@pb/businessId",
          url.split("business_id=")[1].split("&")[0]
        );
        localStorage.setItem(
          "@pb/consumerUuid",
          url.split("consumer_uuid=")[1].split("&")[0]
        );

        dispatch(UserActions.consumerTokenRequest());
      }
    }

    getData();
  }, []);

  return children;
}
