import { useTheme } from '@/hooks/useTheme'
import { Text, type TextProps } from 'react-native'
import { getStyles } from './styles'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'title' | 'subtitle' | 'button' | 'link'
}

export default function ThemedText({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedTextProps) {
  const { theme, colorScheme } = useTheme()
  const styles = getStyles(theme)
  let fontFamily = 'Nunito_400Regular'
  const color = (colorScheme === 'light' && lightColor) || (colorScheme === 'dark' && darkColor) || theme.text

  return (
    <Text
      style={[
        { color, fontFamily },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  )
}
