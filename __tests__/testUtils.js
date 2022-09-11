import { ShallowWrapper } from "enzyme";

/**
 * Factory function to  create a ShallowWrapper for the App component.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */

export const findNameByAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
