import { Button, Col, Row } from "antd";
import { Job } from "../../interfaces/job";
import Router from "next/router";
import { EditOutlined } from "@ant-design/icons";

type Props = {
  job: Job;
  isAdmin?: boolean;
};

const EditButton = ({ job, isAdmin }: Props) => {
  return (
    <>
      {isAdmin && (
        <Row justify={"end"}>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => {
                Router.push(`/admin/manage/job/edit/${job.editToken}`);
              }}
            >
              Edit this Job
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default EditButton;
