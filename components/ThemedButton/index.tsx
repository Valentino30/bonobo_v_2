import { useTheme } from '@/hooks/useTheme'
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import ThemedText from '../ThemedText'
import { getStyles } from './styles'

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export default function ThemedButton({ title, style, textStyle, ...rest }: ThemedButtonProps) {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.8} {...rest}>
      <ThemedText type="button">{title}</ThemedText>
    </TouchableOpacity>
  )
}
