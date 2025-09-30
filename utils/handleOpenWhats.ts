import { Alert, Linking, Platform } from 'react-native'

export const handleOpenWhatsApp = async () => {
  const url = 'whatsapp://'
  const androidPackage = 'com.whatsapp'

  try {
    let appOpened = false

    if (Platform.OS === 'android') {
      try {
        const marketUrl = `market://details?id=${androidPackage}`
        const canOpenMarket = await Linking.canOpenURL(marketUrl)

        if (canOpenMarket) {
          Linking.openURL(url)
          appOpened = true
          return
        }
      } catch (e) {}
    }

    const canOpen = await Linking.canOpenURL(url)

    if (canOpen) {
      Linking.openURL(url)
      appOpened = true
    }

    if (!appOpened) {
      const storeUrl = Platform.select({
        ios: 'https://apps.apple.com/us/app/whatsapp-messenger/id310633997',
        android: `https://play.google.com/store/apps/details?id=${androidPackage}`,
        default: 'https://www.whatsapp.com/download/',
      })
      Alert.alert('WhatsApp Not Found', `Please ensure WhatsApp is installed. You can download it here: ${storeUrl}`, [
        { text: 'OK' },
      ])
    }
  } catch (error) {
    console.error('Error opening WhatsApp:', error)
    Alert.alert('Error', 'Could not open WhatsApp. Please try again.')
  }
}
