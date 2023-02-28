import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'

import RootNavigation from './RootNavigation'

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {

  // display the splash screen for 1 second...
  setTimeout(async () => {
    await SplashScreen.hideAsync()
  }, 3000)

  return (
    <>
      <RootNavigation/>
      <StatusBar barStyle = 'light-content' hidden ={false} backgroundColor = '#2499d8' translucent ={true}/>
    </>
  )
}