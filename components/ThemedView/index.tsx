import { useTheme } from '@/hooks/useTheme'
import { View, type ViewProps } from 'react-native'
import { styles } from './styles'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default'
}

export function ThemedView({ style, lightColor, darkColor, type = 'default', ...otherProps }: ThemedViewProps) {
  const { theme, colorScheme } = useTheme()
  const backgroundColor =
    (colorScheme === 'light' && lightColor) || (colorScheme === 'dark' && darkColor) || theme.background

  return <View style={[{ backgroundColor }, type === 'default' ? styles.default : undefined, style]} {...otherProps} />
}
