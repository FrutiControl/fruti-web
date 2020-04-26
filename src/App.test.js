import React from "react";
import { render } from "@testing-library/react";
import index from "./index";

test("renders learn react link", () => {
  const { getByText } = render(<index />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
