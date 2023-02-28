import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ENVIRONMENT from '../../environment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url: ENVIRONMENT.URL_PREFIX + '/restaurants/r01.jpg',
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url: ENVIRONMENT.URL_PREFIX + '/restaurants/r02.jpg',
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "India's Grill",
    image_url: ENVIRONMENT.URL_PREFIX + '/restaurants/r03.jpg',
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
  {
    name: "Chicky Wong",
    image_url: ENVIRONMENT.URL_PREFIX + '/restaurants/r04.jpg',
    categories: ["Chinese", "Takeaway"],
    price: "$$",
    reviews: 800,
    rating: 3.9,
  }
]

export default function RestaurantItems({navigation, ...props}) {
  return (
    <>
      {props.restaurantData.map((restaurant,index) => (
        <TouchableOpacity 
          key={index}
          activeOpacity={1} 
          style={{marginBottom: 5}}
          onPress={() => 
            navigation.navigate('RestaurantDetail', {
            name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories
            })
          }
        >
          <View
            style={{
              paddingHorizontal:20,
              paddingTop:10,
              backgroundColor:'white'
            }}
          >
            <RestaurantImage image={restaurant.image_url}/>
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating}/>
          </View>
        </TouchableOpacity>
      ))}
    </>
  )
}

const RestaurantImage = (props) => (
    <>
        <Image
            source={{uri: props.image === '' ? localRestaurants[0].image_url : props.image }}
            style={{width:'100%', height:180, borderRadius:20}}
        />
        <TouchableOpacity style={{ position: "absolute", right: 30, top: 20 }}>
            <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
        </TouchableOpacity>
    </>
)

const RestaurantInfo = (props) => (
  <View style={{
      flexDirection:'row', 
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:7
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: 'gray' }}>30-45 * min</Text>
    </View>
    <View
      style={{
        backgroundColor: '#eee',
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
      }}
    >
      <Text>{props.rating}</Text>
    </View>
  </View>
)

