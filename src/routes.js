import React from "react";
import { Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import logo from "./assets/logo.png";

import Login from "./pages/Login";
import List from "./pages/List";
import Book from "./pages/Book";

const appNavigator = createStackNavigator(
  {
    List,
    Book
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerTitle: (
        <Image
          style={{
            height: 32,
            resizeMode: "contain"
          }}
          source={logo}
        />
      )
    }
  }
);

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    appNavigator
  })
);

export default Routes;
