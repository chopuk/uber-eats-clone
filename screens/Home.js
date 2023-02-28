import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import RestaurantItems, { localRestaurants } from '../components/home/RestaurantItems'
import { SafeAreaView } from 'react-native-safe-area-context'

const YELP_API_KEY = '_Uk3KxIuc1ufrBeUmHavtNhj4X-Jg6VVHUO2X1WgcHqLrPocFKYfp3rmS8fUyZjvmwLmSbyvWYHcO5xDuC75qubJ0S5AEAj91g9fuhmAnn274nZb-MjWguF2gC7yY3Yx'

export default function Home({navigation}) {
  const [reastaurantData,setRestaurantData] = useState(localRestaurants)
  const [city, setCity] = useState('Los Angeles')
  const [activeTab, setActiveTab] = useState('Delivery')
  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    }

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
    )
  }

  useEffect(() => {
    getRestaurantsFromYelp()
  }, [city, activeTab])

  return (
    <SafeAreaView>
      <View style={{backgroundColor:'#a8bda6', padding:15}}>
          <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
          <SearchBar cityHandler={setCity}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{height:'80%'}}>
        <Categories/>
        <RestaurantItems 
          restaurantData={reastaurantData} navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  )
}