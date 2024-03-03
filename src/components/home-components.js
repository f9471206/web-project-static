import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import HomeArticleComponents from "./home-article-components";
import SortComponents from "./modals/sort-components";
import TagComponents from "./modals/tag-components";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import HomeService from "../services/home.service";
import ModalsPlaceholderComponents from "./modals/modals-placeholder-components";
import MyFunction from "./modals/myFunction";
import Badge from "react-bootstrap/Badge";

const homeComponents = ({ data, setData }) => {
  const { _tag } = useParams();

  const [refresh, setRefresh] = useState(false);

  let location = useLocation().search;
  let sort = queryString.parse(location);

  const [placeholder, setPlaceholder] = useState(false);

  useEffect(() => {
    if (data) return;
    setPlaceholder(true);
    HomeService.home(_tag, sort)
      .then((d) => {
        setData(d.data);
        setPlaceholder(false);
      })
      .catch((e) => {
        console.log(e);
        setPlaceholder(false);
      });
  }, [_tag, location, refresh, data]);

  return (
    <>
      {_tag && (
        <Container fluid className={`bg-${MyFunction.tagBadge(_tag).bg} p-3`}>
          <Row>
            <Col className="d-flex justify-content-center">
              <Badge bg="light" text="dark">
                {MyFunction.tagBadge(_tag).text}
              </Badge>
            </Col>
          </Row>
        </Container>
      )}
      <Container className="mt-4">
        <Row>
          {/* 文章 tag */}
          <TagComponents setData={setData} />
          <Col lg={10}>
            <Row>
              {/* 文章 sort */}
              <SortComponents setData={setData} />
              {/* 重新整理 */}
              <Col style={{ textAlign: "end" }}>
                <Button
                  onClick={() => {
                    setData(null);
                    setRefresh(!refresh);
                  }}
                  variant="secondary"
                  size="sm"
                >
                  <i className="fa-solid fa-rotate"></i>
                </Button>
              </Col>
            </Row>
            <Row>
              {placeholder ? (
                <ModalsPlaceholderComponents />
              ) : (
                // 顯示文章
                <HomeArticleComponents
                  data={data}
                  setData={setData}
                  sort={sort}
                  _tag={_tag}
                />
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default homeComponents;
