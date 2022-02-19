import { useContext } from "react";
import { NotificationContext } from "../component/NotificationWrapper";

const useNotification = () => {
  const { notification } = useContext(NotificationContext);

  return notification;
};

export default useNotification;
