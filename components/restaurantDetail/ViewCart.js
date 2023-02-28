import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'react-native'
import { StyleSheet } from 'react-native'
import OrderItem from './OrderItem'
import LottieView from 'lottie-react-native'

import { db, firebase, storage} from '../../firebase'

const ViewCart = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems)
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0)
  const displayPrice =  '$' + total.toFixed(2)

  const addOrderToFireBase = () => {
    setLoading(true)
    db.collection('orders')
      .add({
        items: items,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false)
          navigation.navigate('OrderCompleted')
        }, 2500)
      })
  }

  const checkoutModalContent = () => {
    return (
        <>
            <View style={styles.modalContainer}>
                <View style={styles.modalCheckoutContainer}>
                    <Text style={styles.restaurantName}>{restaurantName}</Text>
                    {items.map((item, index) => (
                      <OrderItem key={index} item={item} />
                    ))}
                    <View style={styles.subtotalContainer}>
                        <Text style={styles.subtotalText}>Subtotal</Text>
                        <Text>{displayPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity
                            style={{
                            marginTop: 20,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            padding: 13,
                            borderRadius: 30,
                            width: 300,
                            position: 'relative',
                            }}
                            onPress={() => {
                                addOrderToFireBase()
                                setModalVisible(false)
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 20, alignSelf:'flex-start', marginLeft:20 }}>Checkout</Text>
                            <Text
                                style={{
                                    position: 'absolute',
                                    right: 20,
                                    color: 'white',
                                    fontSize: 15,
                                    top: 17,
                                    marginRight:20
                                }}
                            >
                                {total ? displayPrice : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
  }

  return (
    <>
        <Modal 
            animationType='slide' 
            visible={modalVisible} 
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            {checkoutModalContent()}
        </Modal>
        {total ? (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 20,
                zIndex: 999
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%'
                }}
            >
                <TouchableOpacity
                    style={{
                        marginTop: 10,
                        backgroundColor: '#474943',
                        flexDirection:'row',
                        justifyContent:'space-around',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 30,
                        width: 250,
                        position: 'relative'
                    }}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{ color:'white', fontSize:16, marginRight:20 }}>View Cart</Text>
                    <Text style={{ color:'white', fontSize:16 }}>{displayPrice}</Text>
                </TouchableOpacity>
            </View>
        </View>
        ) : (
            <></>
        )}
        {loading ? (
            <View
                style={{
                    backgroundColor: 'black',
                    position: 'absolute',
                    opacity: 0.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}
            >
            <LottieView
                style={{ height: 200 }}
                source={require('../../assets/animations/scanner.json')}
                autoPlay
                speed={3}
            />
            </View>
        ) : (
            <></>
      )}
    </>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)'
    },

    modalCheckoutContainer: {
      backgroundColor: 'white',
      padding: 16,
      height: 600,
      borderWidth: 1
    },

    restaurantName: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 18,
      marginBottom: 10
    },

    subtotalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15
    },

    subtotalText: {
      textAlign: 'left',
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 10
    }
  })

export default ViewCart