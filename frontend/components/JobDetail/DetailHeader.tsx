import { Col, Row, Typography } from "antd";
import { Domain, MapMarkerRadiusOutline } from "mdi-material-ui";
import { Job } from "../../interfaces/job";

const { Title, Paragraph, Text } = Typography;

type Props = {
  job: Job;
  isAdmin?: boolean;
};

const DetailHeader = ({ job }: Props) => {
  return (
    <>
      <Col>
        <img
          style={{
            border: "1px solid lightgray",
            borderRadius: "20%",
            marginTop: 6,
          }}
          width={100}
          src={
            job.logo
              ? "http://localhost:3000/" + job.logo
              : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
          }
          alt="company logo"
        />
      </Col>
      <Col xs={15} sm={15} md={19} lg={20} style={{ marginLeft: 20 }}>
        <Title level={3}>{job.position}</Title>
        <Row style={{ marginTop: "-1vh" }}>
          <Domain style={{ color: "gray" }} />
          <Paragraph style={{ marginLeft: 15 }}>{job.company}</Paragraph>
        </Row>
        <Row style={{ marginTop: "-1vh" }}>
          <MapMarkerRadiusOutline style={{ color: "gray" }} />
          <Paragraph style={{ marginLeft: 15 }}>{job.location}</Paragraph>
        </Row>
      </Col>
    </>
  );
};

export default DetailHeader;
