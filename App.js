import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeList from './src/Screens/HomeList';
import DataPage from './src/Screens/DataPage';
import InfoPage from './src/Screens/InfoPage';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomePageStack(){
  return (
    <Stack.Navigator
    initialRouteName="HomePage"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen name="農產品列表" component={HomeList} />
      <Stack.Screen name="listInfoPage" component={InfoPage}  options={{ title: '伴手禮資訊' }}/>
    </Stack.Navigator>
  )
}

function DataPageStack(){
  return (
    <Stack.Navigator
    initialRouteName="CheckList"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerTitleAlign:'center',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen name="checkPage" component={DataPage}  options={{ title: '購物車清單' }} />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({route}) => ({
        tabBarIcon:({focused, color, size}) => {
          let iconName;
          if (route.name === 'List'){
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          }else if (route.name === 'Cart'){
            iconName = focused ? 'cart' : 'cart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor:'tomato',
        tabBarInactiveTintColor: 'gray',
        //headeShorwn:'false', //經爬文看到此行程式碼寫至下方才不會顯示
      })}>
        <Tab.Screen name='List' component={HomePageStack} options={{headerShown: false}} />
        <Tab.Screen name='Cart' component={DataPageStack} options={{headerShown: false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
