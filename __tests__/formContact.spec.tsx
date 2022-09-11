import { shallow } from "enzyme";
import { findNameByAttr } from "./testUtils";
import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import FormContact from "../pages/components/formContact";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => {
  return shallow(<FormContact />);
};

test("Formcontact component is rendered without error", () => {
  const wrapper = setup();
  const formContactComponent = findNameByAttr(wrapper, "component-formcontact");
  expect(formContactComponent.length).toBe(1);
});
