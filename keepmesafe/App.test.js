// @noflow
import React from "react";

import {PublicNavigator} from "./App";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<PublicNavigator />).toJSON();
  expect(rendered).toBeTruthy();
});