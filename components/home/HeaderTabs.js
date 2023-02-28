import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function HeaderTabs(props) {
  return (
    <View style={styles.container}>
      <HeaderButton 
        title='Delivery'
        btnColor='black' 
        textColor='white'
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton 
        title='Pickup' 
        btnColor='white' 
        textColor='black'
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  )
}

const HeaderButton = (props) => {
    return (
            <TouchableOpacity 
                style={{
                    backgroundColor: props.activeTab === props.title ? 'black' : 'white',
                    paddingVertical:6,
                    paddingHorizontal:16,
                    borderRadius:30
                }}
                onPress={() => props.setActiveTab(props.title)}
            >
                <Text style={{
                            color: props.activeTab === props.title ? 'white' : 'black',
                            fontSize:15,
                            fontWeight:'900'
                        }}
                >{props.title}</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: { 
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop:10
    }
  })
  