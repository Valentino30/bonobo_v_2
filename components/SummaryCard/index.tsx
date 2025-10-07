import { useTheme } from '@/hooks/useTheme'
import { View } from 'react-native'
import ThemedText from '../ThemedText'
import { getStyles } from './styles'

export default function SummaryCard({ value, label }: { value: number; label: string }) {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={styles.summaryCard}>
      <ThemedText style={styles.summaryTitle}>{value}</ThemedText>
      <ThemedText style={styles.summaryLabel}>{label}</ThemedText>
    </View>
  )
}
