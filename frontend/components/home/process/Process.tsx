import { Col, Row } from "antd";
import Image from "next/image";
import styles from "./Process.module.css";
import interview from "./icons/interview.png";
import job from "./icons/job.png";
import web from "./icons/web.png";

const Process = () => {
  return (
    <Row justify={"space-around"} align={"middle"} className={styles.mainRow}>
      <Col className={styles.instruction} md={4} lg={{ offset: 2 }}>
        <Image
          src={web}
          alt={"web"}
          width={55}
          height={55}
          className={styles.image}
        />
        <div className={styles.firstText}>Visit Jobeet</div>
      </Col>
      <Col
        className={styles.instruction}
        xs={{ pull: 1 }}
        sm={{ pull: 0 }}
        md={{ span: 4, push: 0 }}
        lg={{ span: 4, pull: 0 }}
      >
        <Image
          src={job}
          alt={"web"}
          width={55}
          height={55}
          className={styles.image}
        />
        <div className={styles.secondText}>Search </div>
      </Col>
      <Col
        className={styles.instruction}
        md={{ span: 4, push: 1 }}
        lg={{ span: 4, pull: 4 }}
      >
        <Image
          src={interview}
          alt={"web"}
          width={55}
          height={55}
          className={styles.lastImage}
        />
        <div className={styles.thirdText}>Apply</div>
      </Col>
    </Row>
  );
};
export default Process;
