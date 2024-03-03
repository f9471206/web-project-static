import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

function SortComponents({ setData }) {
  //Dropdown.Item
  const dropdownItem = [
    {
      id: 1,
      eventKey: "最新文章",
      to: "",
      sort: "",
    },
    {
      id: 2,
      eventKey: "最舊文章",
      to: "?sort=old",
      sort: "old",
    },
    {
      id: 3,
      eventKey: "最多喜歡",
      to: "?sort=like",
      sort: "like",
    },
    {
      id: 4,
      eventKey: "最熱門",
      to: "?sort=hot",
      sort: "hot",
    },
  ];
  const handleSelect = (selectedKey) => {
    setTitle(selectedKey);
    setData(null);
  };
  //下拉是選單title
  const [title, setTitle] = useState("最新文章");

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    if (parsed.sort) {
      let correspondingEventKey = dropdownItem.filter(
        (item) => item.sort === parsed.sort
      );
      setTitle(correspondingEventKey[0].eventKey);
    }
  }, []);

  return (
    <Col>
      {/* 文章排序選單 */}
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {dropdownItem.map((item) => {
            return (
              <Link key={item.id} to={`${item.to}`}>
                <Dropdown.Item
                  eventKey={item.eventKey}
                  active={title === item.eventKey}
                  as="button"
                >
                  {item.eventKey}
                </Dropdown.Item>
              </Link>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

export default SortComponents;
