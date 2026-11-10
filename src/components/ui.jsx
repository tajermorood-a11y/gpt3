import React from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/config';
export function Screen({ children, scroll = true, style }) {
  const content = <View style={[{ flex: 1, padding: 18, gap: 14 }, style]}>{children}</View>;
  return scroll ? <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }} contentContainerStyle={{ flexGrow: 1 }}>{content}</ScrollView> : <View style={{ flex: 1, backgroundColor: COLORS.bg }}>{content}</View>;
}
export function Txt({ children, style, ...props }) { return <Text {...props} style={[{ color: COLORS.text, fontFamily: TYPOGRAPHY.regular, fontSize: 15, textAlign: 'right' }, style]}>{children}</Text>; }
export function Heading({ children, style }) { return <Txt style={[{ fontFamily: TYPOGRAPHY.bold, fontSize: 21 }, style]}>{children}</Txt>; }
export function Field({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType = 'default' }) {
  return <View style={{ gap: 6 }}><Txt style={{ color: COLORS.textDim }}>{label}</Txt><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder || label} placeholderTextColor={COLORS.textDim} secureTextEntry={secureTextEntry} keyboardType={keyboardType} textAlign="right" style={{ color: COLORS.text, backgroundColor: COLORS.surfaceAlt, borderWidth: 1, borderColor: COLORS.border, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 12, fontFamily: TYPOGRAPHY.regular }} /></View>;
}
export function Btn({ title, onPress, disabled, loading, secondary, style }) {
  return <Pressable disabled={disabled || loading} onPress={onPress} style={[{ minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, backgroundColor: secondary ? COLORS.surfaceAlt : COLORS.primary, borderWidth: secondary ? 1 : 0, borderColor: COLORS.border, opacity: disabled ? 0.45 : 1 }, style]}>{loading ? <ActivityIndicator color={COLORS.text} /> : <Txt style={{ fontFamily: TYPOGRAPHY.bold }}>{title}</Txt>}</Pressable>;
}
export function Panel({ children, style }) { return <View style={[{ backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 15, gap: 10 }, style]}>{children}</View>; }
export function Empty({ text = 'لا توجد بيانات حالياً' }) { return <Panel><Txt style={{ color: COLORS.textDim, textAlign: 'center' }}>{text}</Txt></Panel>; }
export function Header({ title, subtitle }) { return <View style={{ gap: 2 }}><Heading>{title}</Heading>{subtitle ? <Txt style={{ color: COLORS.textDim }}>{subtitle}</Txt> : null}</View>; }
