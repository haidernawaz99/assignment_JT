import { Col, Row } from "antd";
import Image from "next/image";
import styles from "./Process.module.css";
import interview from "./icons/interview.png";
import job from "./icons/job.png";
import web from "./icons/web.png";

const Process = () => {
  return (
    <Row justify={"space-around"} align={"middle"} className={styles.mainRow}>
      <Col className={styles.instruction} md={4}>
        <Image
          src={web}
          alt={"web"}
          width={55}
          height={55}
          className={styles.image}
        />
        <div>Visit Jobeet</div>
      </Col>
      <Col className={styles.instruction} md={4}>
        <Image
          src={job}
          alt={"web"}
          width={55}
          height={55}
          className={styles.image}
        />
        <div>Search </div>
      </Col>
      <Col
        className={styles.instruction}
        md={{ span: 4, push: 2 }}
        lg={{ span: 4, push: 3 }}
      >
        <Image
          src={interview}
          alt={"web"}
          width={55}
          height={55}
          className={styles.lastImage}
        />
        <div>Apply</div>
      </Col>
    </Row>
  );
};
export default Process;
