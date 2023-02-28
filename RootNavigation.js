import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Home from './screens/Home'
import RestaurantDetail from './screens/RestaurantDetail'
import { Provider as ReduxProvider } from 'react-redux'
import createStore from './redux/store'
import OrderCompleted from './screens/OrderCompleted'

const store = createStore()

export default function RootNavigation() {
  const Stack = createNativeStackNavigator()

  const screenOptions = {
    headerShown: false
  }

  const Tab = createBottomTabNavigator()

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#a8bda6' },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home'
                  break
                case 'RestaurantDetail':
                  iconName = focused ? 'shopping-bag' : 'shopping-bag'
                  break
                case 'Megan':
                  iconName = focused ? 'search' : 'search'
                  break
                case 'Sindi':
                  iconName = focused ? 'receipt' : 'receipt'
                  break
                case 'OrderCompleted':
                  iconName = focused ? 'user' : 'user'
              }
              return <FontAwesome5 name={iconName} size={size} color={color} />
            }
          })}
        >
          <Tab.Screen name='Home' component={Home}/>
          <Tab.Screen name='RestaurantDetail' component={RestaurantDetail}/>
          <Tab.Screen name='Megan' component={Home}/>
          <Tab.Screen name='Sindi' component={Home}/>
          <Tab.Screen name='OrderCompleted' component={OrderCompleted}/>
        </Tab.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  )
}