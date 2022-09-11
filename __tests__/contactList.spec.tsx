import * as React from "react";
import Home from "../pages/index";
import { shallow, ShallowWrapper } from "enzyme";
import { findNameByAttr } from "./testUtils";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */

const setup = () => {
  return shallow(<Home />);
};

test("Contactlist component is rendered without error", () => {
  const wrapper = setup();
  const formContactList = findNameByAttr(wrapper, "component-contactlist");
  expect(formContactList.length).toBe(1);
});
