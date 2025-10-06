import { useThemeColor } from '@/hooks/use-theme-color'
import { View, type ViewProps } from 'react-native'
import { styles } from './styles'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default'
}

export function ThemedView({ style, lightColor, darkColor, type = 'default', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return <View style={[{ backgroundColor }, type === 'default' ? styles.default : undefined, style]} {...otherProps} />
}
