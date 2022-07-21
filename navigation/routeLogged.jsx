import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../screens/Home';
import Logout from '../screens/Logout';
import AddPub from '../screens/AddPub';
import Admin from '../screens/Admin';
import EditPub from '../screens/EditPub';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createBottomTabNavigator();
//Stack Navigator permet à votre application de passer d'un écran à l'autre, chaque nouvel écran étant placé au-dessus d'une pile. (on peut en créer plusieurs)
//stack.screen crée le lien du menu qui va nous afficher le composant lorsque l'on clique dessus.
const HomeStack = createStackNavigator();
const AdminStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
    </HomeStack.Navigator>
  );
}

function AdminStackScreen() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminScreen" component={Admin} />
      <AdminStack.Screen name="EditPub" component={EditPub} />
    </AdminStack.Navigator>
  );
}

const RouteLogged = (props) =>{
    return (
    <NavigationContainer styles={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-person-add" : "ios-person-add-outline";
            }
            if (route.name === "Logout") {
              iconName = focused ? "ios-exit" : "ios-exit-outline";
            }

            if (route.name === "AddPub") {
              iconName = focused ? "ios-add-outline" : "ios-add-circle-outline";
            }

            if (route.name === "Admin") {
              iconName = focused ? "md-book" : "ios-book-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          headerShown: false,
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="AddPub"
          component={AddPub}
          options={{ title: "AddPub" }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminStackScreen}
          options={{ title: "Admin" }}
        />
        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{ title: "Logout" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RouteLogged