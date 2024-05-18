import React, { useState } from "react";
import { Button, ConfigProvider, Input, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { THEME } from "config/constant";
import { useSubscriber } from "hooks/subscriber.hook";
import { emptySubscriber } from "models/subscriber.model";

type Props = {
  logoPath: string;
};
export const AppFooter: React.FC<Props> = ({ logoPath }) => {
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const { addSubscriber } = useSubscriber();

  const handleSubscribe = async () => {
    setLoad(true);
    const feedback = await addSubscriber({
      ...emptySubscriber,
      email,
    });

    if (feedback) {
      message.success("You have subscribe successfully!");
      setEmail("");
    } else {
      message.error("subscribe failed!");
    }
    setLoad(false);
  };
  return (
    <footer className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.content_group_logo}>
            <img
              src={`${logoPath}`}
              className={styles.logo}
              height={90}
              width={140}
              alt="Cumi logo"
            />
            <p className={styles.subheading}>Empowering Your Digital Journey</p>
          </div>
          <div className={styles.content_group}>
            <h4>Discover</h4>
            <Link to="/our_services">Services</Link>
            <Link to="/products">Products</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/about_us">About</Link>
          </div>
          <div className={styles.content_group}>
            <h4>Info</h4>
            <Link to="/posts">Blog Posts</Link>
            <Link to="/contact_us">Contact us</Link>
            <Link to="/faqs">FAQs</Link>
          </div>
          <div className={styles.content_group_waitlist}>
            <h4>Join Our Mailing List</h4>
            <p className={styles.subheading}>
              Get notified and updated with our marketing emails.
            </p>
            <form>
              <ConfigProvider theme={THEME}>
                <Input
                  placeholder="Your Email"
                  size="large"
                  addonAfter={
                    <Button
                      type="link"
                      icon={
                        <ArrowRightOutlined
                          style={{ color: "#81ce89" }}
                          onClick={handleSubscribe}
                        />
                      }
                    />
                  }
                  disabled={load}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ConfigProvider>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};
