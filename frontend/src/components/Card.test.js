import { render, screen } from "@testing-library/react";
import Card from "./Card";


test("testSearchBar", () => {
  render(<Card/>);
  const inputNode = screen.get(
    "Search for the object on which you want information"
  );
  expect(inputNode).toBeInTheDocument();
});
