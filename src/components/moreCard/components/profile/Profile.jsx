import { Avatar, Spin, Tooltip } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserModalContext } from "../../../../pages/activeUser/ActiveUser";
import { Tab_MoreData } from "../../../../routes/Routes";
import { BASE_URL } from "../../../../_api/_api";

///styles
import "./styles.scss";

const Profile = ({ data }) => {
  const [showMore, setShowMore] = useState([]);
  const [loader, setloader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const TabMoreData = async () => {
      setloader(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${Tab_MoreData}`,
          { userId: data.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          // console.log("change", res.data);
          setloader(false);
          if (res) {
            setShowMore(res.data.data);
          } else {
            setShowMore();
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 401") {
            navigate("/");
            setloader(false);
          }
        });
    };
    TabMoreData();
  }, []);
  if (loader) {
    return <Spin style={{ width: "100%", margin: "auto" }} />;
  }
  return (
    <div style={{ padding: "10px" }}>
      <div className="profile-container">
        <div className="left-profile-col">
          <div className="up">
            <Avatar
              style={{
                backgroundColor: "black",
                verticalAlign: "middle",
              }}
              size="large"
              // gap={gap}
            >
              h
            </Avatar>
            <h4>{showMore.username}</h4>
            <p>demokoimoi</p>
            <div className="footer">
              <Tooltip placement="top" title={showMore.mobile}>
                <BiPhoneCall />
              </Tooltip>
              <Tooltip placement="top" title={showMore.city}>
                <BsBuilding />
              </Tooltip>
            </div>
          </div>
          <div className="down">
            <div className="down-heading">
              <h3>Partnership Information</h3>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row" className="br-0">
                    Partnership Name:
                  </th>
                  <td className="br-0">Partnership With No Return</td>
                </tr>
                <tr>
                  <th scope="row" className="br-0">
                    User Part:
                  </th>
                  <td className="br-0">{showMore.userPartnership}</td>
                </tr>
                <tr>
                  <th scope="row" className="br-0">
                    Our Part:
                  </th>
                  <td className="br-0">{showMore.ourPartnirshp}</td>
                </tr>
                <tr>
                  <th scope="row" className="br-0">
                    Remark:
                  </th>
                  <td className="br-0">{showMore.username}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="right-profile-col">
          <div className="right-profile-heading">
            <h3>Additional Information</h3>
          </div>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row" className="br-0">
                  User Name:
                </th>{" "}
                <td className="br-0">{showMore.username}</td>
              </tr>{" "}
              <tr>
                <th scope="row" className="br-0">
                  Mobile Number:
                </th>{" "}
                <td className="br-0">{showMore.mobile}</td>
              </tr>{" "}
              <tr>
                <th scope="row" className="br-0">
                  City:
                </th>{" "}
                <td className="br-0">{showMore.city}</td>
              </tr>{" "}
              <tr>
                <th scope="row" className="br-0">
                  Credit pts:
                </th>{" "}
                <td className="br-0">{showMore.creidtReference}</td>
              </tr>{" "}
              <tr>
                <th scope="row" className="br-0">
                  pts:
                </th>{" "}
                <td className="br-0">
                  <span>{showMore.availableBalance}</span>
                </td>
              </tr>{" "}
              <tr>
                <th scope="row" className="br-0">
                  Client P/L:
                </th>{" "}
                <td className="br-0">{showMore.clientPl}</td>
              </tr>{" "}
              <tr>
                <th scope="row" className="br-0">
                  Created Date :
                </th>{" "}
                <td className="br-0">
                  <span>{showMore.createdDate}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
