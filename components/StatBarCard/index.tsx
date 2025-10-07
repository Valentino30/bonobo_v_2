import { useTheme } from '@/hooks/useTheme'
import { View } from 'react-native'
import ThemedText from '../ThemedText'
import { getStyles } from './styles'

export default function StatBarCard({
  sender,
  value,
  max,
  valueLabel,
}: {
  sender: string
  value: number
  max: number
  valueLabel: string
}) {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.barRow}>
      <ThemedText style={styles.senderLabel}>{sender}</ThemedText>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${Math.min((value / max) * 100, 100)}%` }]} />
      </View>
      <ThemedText style={styles.barValue}>{valueLabel}</ThemedText>
    </View>
  )
}
