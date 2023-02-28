import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import { db, firebase, storage} from '../firebase'
import MenuItems from '../components/restaurantDetail/MenuItems'

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
        {
        title: 'Bologna',
        description: 'With butter lettuce, tomato and sauce bechamel',
        price: '$13.50',
        image:
            'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
        }
    ]
  })
  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems)
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0)
  const displayPrice =  '$' + total.toFixed(2)

  useEffect(() => {
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data())
        })
      })
    return () => unsubscribe()
  }, [] )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View
            style={{
            margin: 15,
            alignItems: 'center',
            height: '100%'
            }}
        >
            <LottieView
            style={{ 
                height: 100, 
                alignSelf: 'center', 
                marginBottom: 15,
            }}
            source={require('../assets/animations/check-mark.json')}
            autoPlay
            speed={0.5}
            loop={false}
            />
            <Text style=
                {{ 
                    fontSize: 20, 
                    fontWeight: 'bold', 
                    marginHorizontal:20,
                    marginBottom:30
                }}
            >
                Your order at {restaurantName} has been placed for {displayPrice}
            </Text>
            <ScrollView>
                <MenuItems foods={lastOrder.items} hideCheckbox={true}/>
                <LottieView
                    style={{ height: 200, alignSelf: 'center' }}
                    source={require('../assets/animations/delivery.json')}
                    autoPlay
                    speed={0.9}
                />
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}