import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb({ value }) {
  return (
    <p className="my-24 fs-16 text-grey-13">
      {value.map((item, index) => (
        <span key={index}>
          {index === value.length - 1 ? (
            <span className="text-primary fw-600">{item.title}</span>
          ) : (
            <Link to={item.url} className="text-grey-13">
              {item.title}
            </Link>
          )}
          {index < value.length - 1 && " / "}
        </span>
      ))}
    </p>
  );
}

export default BreadCrumb;
