import { Button, Input, Modal, Tooltip } from "antd";
import Router from "next/router";
import { useEffect } from "react";
import { CopyOutlined, SelectOutlined } from "@ant-design/icons";
import Link from "next/link";

type Props = {
  showModal: any;
  isUpdating?: boolean;
  editToken?: string;
  redirectTo?: string;
  modalTitle?: string;
};

const SuccessfulModal = ({
  showModal,
  redirectTo,
  isUpdating,
  editToken,
  modalTitle,
}: Props) => {
  const [modal, contextHolder] = Modal.useModal();

  const title =
    modalTitle || `Job ${isUpdating ? `updated` : `added`} successfully!`;
  const content = "";

  const countDown = () => {
    let secondsToGo = 10;
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: (
          <>
            {!isUpdating && (
              <div>
                Please safely store the Edit Link to your Job. <br />
                <strong> Edit Link: </strong>
                {/* <a href={"/edit/" + editToken}>Go to Job Edit</a> */}
                <Input.Group compact>
                  <Input
                    style={{ width: "80%" }}
                    defaultValue={"http://localhost:3001/edit/" + editToken}
                    disabled
                  />
                  <Tooltip title="copy token url">
                    <Button
                      icon={<CopyOutlined />}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "http://localhost:3001/edit/" + editToken
                        );
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Open in New Tab">
                    <Link href={"/edit/" + editToken} passHref legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer">
                        <Button icon={<SelectOutlined />} />
                      </a>
                    </Link>
                  </Tooltip>
                </Input.Group>
                <br />
              </div>
            )}
            This modal will be destroyed after {secondsToGo} second.
            <br />
          </>
        ),
        // content +
        // `\nThis modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);

    const instance = modal.success({
      title,
      content: content || (
        <>
          {!isUpdating && (
            <div>
              Please safely store the Edit Link to your Job. <br />
              <strong> Edit Link: </strong>
              {/* <a href={"/edit/" + editToken}>Go to Job Edit</a> */}
              <Input.Group compact>
                <Input
                  style={{ width: "80%" }}
                  defaultValue={"http://localhost:3001/edit/" + editToken}
                  disabled
                />
                <Tooltip title="copy token url">
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "http://localhost:3001/edit/" + editToken
                      );
                    }}
                  />
                </Tooltip>
                <Tooltip title="Open in New Tab">
                  <Link href={"/edit/" + editToken} passHref legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      <Button icon={<SelectOutlined />} />
                    </a>
                  </Link>
                </Tooltip>
              </Input.Group>
              <br />
            </div>
          )}
          This modal will be destroyed after {secondsToGo} second.
          <br />
        </>
      ),

      onOk: () => {
        instance.destroy();
        redirectTo && Router.push(redirectTo);
        clearInterval(timer);
        clearTimeout(timeOut);
      },
    });

    const timeOut = setTimeout(() => {
      //   clearInterval(timer);
      instance.destroy();
      redirectTo && Router.push(redirectTo);
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
