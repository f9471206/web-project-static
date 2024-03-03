import React, { useEffect, useState } from "react";
import ModalsHomeArtcleListComponents from "./modals-homeArtcleList-components";
import ModalsHomeArtcleListReplysCompoments from "./modals-homeArtcleListReplys-compoments";
import MemberService from "../../services/member.service";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function ModalsProfilecontentComponents(_id) {
  const [data, setData] = useState([]);

  const [replyData, setReplyData] = useState("");

  const { _replys } = useParams();

  useEffect(() => {
    if (!_replys) {
      MemberService.userProfileTweet(_id._id)
        .then((d) => {
          setData(d.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (_replys) {
      MemberService.userProfileTweetReplys(_id._id)
        .then((d) => {
          setReplyData(d.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [useParams()]);

  const [final, setFinal] = useState(false);

  const [count, setCount] = useState(1);

  const [loading, setLoading] = useState(false);

  const handleMoreData = () => {
    setLoading(true);
    if (!_replys) {
      MemberService.userProfileTweet(_id._id, count)
        .then((d) => {
          setLoading(false);
          if (d.data == "") {
            //資料到底了
            setFinal(true);
            return;
          }
          setData([...data, ...d.data]);
          setCount(count + 1);

          //資料不足 5 個加入 data 後 顯示到底囉!
          if (d.data.length != 5) {
            setFinal(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      {!_replys && data && <ModalsHomeArtcleListComponents data={data} />}
      {_replys && replyData && (
        <ModalsHomeArtcleListReplysCompoments
          data={replyData}
          _id={_id._id}
          profile={true}
        />
      )}
      {!_replys && data != "" && (
        <Col className="text-center my-5">
          {!final && (
            <>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <Button
                  variant="outline-secondary"
                  onClick={handleMoreData}
                  disabled={loading}
                >
                  載入更多
                </Button>
              )}
            </>
          )}
          {final && "到底囉!"}
        </Col>
      )}
    </>
  );
}

export default ModalsProfilecontentComponents;
