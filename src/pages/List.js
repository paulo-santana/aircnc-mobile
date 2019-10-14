import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Alert,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import socketio from "socket.io-client";

import session from '../services/session';

import SpotList from "../components/SpotList";

const List = function() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.0.2:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20
  },
  logout: {
    padding: 15
  }
});

List.navigationOptions = ({ navigation }) => ({
  headerRight:(
    <TouchableOpacity
      style={styles.logout}
      onPress={() => {session.logout(); navigation.navigate('Login')}}>
      <Icon name="sign-out" size={22} />
    </TouchableOpacity>
  )
})

export default List;
