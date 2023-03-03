import { Modal } from "antd";
import Router from "next/router";
import { useEffect } from "react";

type Props = {
  showModal: any;
  message: {
    title: string;
    content?: string;
  };
  redirectTo: string;
};

const SuccessfulModal = ({ showModal, message, redirectTo }: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  const { title, content } = message;

  const countDown = () => {
    let secondsToGo = 5;
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content:
          content ||
          `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);

    const instance = modal.success({
      title,
      content:
        content || `This modal will be destroyed after ${secondsToGo} second.`,
      onOk: () => {
        instance.destroy();
        Router.push(redirectTo);
        clearInterval(timer);
        clearTimeout(timeOut);
      },
    });

    const timeOut = setTimeout(() => {
      //   clearInterval(timer);
      instance.destroy();
      Router.push(redirectTo);
    }, secondsToGo * 1000);
  };

  useEffect(() => {
    if (showModal) {
      countDown();
    }
  }, [showModal]);
  return <>{contextHolder}</>;
};

export default SuccessfulModal;
