import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import HomeService from "../services/home.service";
import ModalsHomeArtcleListComponents from "./modals/modals-homeArtcleList-components";
import Spinner from "react-bootstrap/Spinner";

const HomeArticleComponents = ({ data, setData, _tag, sort }) => {
  const [count, setCount] = useState(1);
  const [final, setFinal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleMoreData = () => {
    setLoading(true);
    HomeService.home(_tag, sort, count)
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
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <ModalsHomeArtcleListComponents data={data} />
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
    </>
  );
};

export default HomeArticleComponents;
