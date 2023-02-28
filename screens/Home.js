import { View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import RestaurantItems, { localRestaurants } from '../components/home/RestaurantItems'
import { SafeAreaView } from 'react-native-safe-area-context'
import ENVIRONMENT from '../environment'

export default function Home({navigation}) {
  const [reastaurantData,setRestaurantData] = useState(localRestaurants)
  const [city, setCity] = useState('Los Angeles')
  const [activeTab, setActiveTab] = useState('Delivery')
  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${ENVIRONMENT.YELP_API_KEY}`
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