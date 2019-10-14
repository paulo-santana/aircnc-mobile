import { AsyncStorage } from "react-native";

const session = {
  async save(user_id, techs) {
    await AsyncStorage.setItem("user", user_id);
    await AsyncStorage.setItem("techs", techs);
  },

  async getUserId() {
    return await AsyncStorage.getItem("user")
  },

  async getTechs() {
    return await AsyncStorage.getItem("techs");
  },

  async logout() {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("techs");
  }
}

export default session
