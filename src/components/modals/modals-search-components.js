import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import MyFunction from "./myFunction";
import Image from "react-bootstrap/Image";

function ModalsSearchComponents({ searchData, setSearchData, setSearch }) {
  return (
    <ListGroup>
      <ListGroup.Item className="border-0">
        <i className="fa-solid fa-magnifying-glass"></i>
        <span className="mx-2">搜尋 「{searchData._data}」</span>
      </ListGroup.Item>
      {searchData.post != "" && (
        <>
          <ListGroup.Item className="border-0">文章</ListGroup.Item>
          {searchData.post.map((d) => {
            return (
              <ListGroup.Item key={d._id} action className="border-0">
                <Link
                  to={`/post/${d._id}`}
                  className="d-flex py-2 w-100 align-self-center dropdown-item"
                  onClick={() => {
                    setSearchData(null);
                    setSearch(false);
                  }}
                >
                  <span>{d.title}</span>
                  <span className="ms-auto">{MyFunction.time(d.date)}</span>
                  <Badge bg={MyFunction.tagBadge(d.tag).bg} className="ms-3">
                    {MyFunction.tagBadge(d.tag).text}
                  </Badge>
                </Link>
              </ListGroup.Item>
            );
          })}
        </>
      )}
      {searchData.user != "" && (
        <>
          <hr className="my-1 " />
          <ListGroup.Item className="border-0">用戶</ListGroup.Item>
          {searchData.user.map((d) => {
            return (
              <ListGroup.Item key={d._id} action className="border-0">
                <Link
                  to={`/user-profile/${d._id}`}
                  className="d-flex w-100 align-self-center dropdown-item"
                  onClick={() => {
                    setSearchData(null);
                    setSearch(false);
                  }}
                >
                  <div className="rounded-circle search_img ">
                    <Image src={d.photo} roundedCircle />
                  </div>
                  <div className="d-flex align-items-center px-2">
                    <span>{d.username}</span>
                  </div>
                </Link>
              </ListGroup.Item>
            );
          })}
        </>
      )}

      {searchData.post == "" && searchData.user == "" && (
        <ListGroup.Item className="border-0">查無資料</ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default ModalsSearchComponents;
