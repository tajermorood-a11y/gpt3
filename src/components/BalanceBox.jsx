import React from 'react';
import { Pressable, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/config';
import { Txt } from './ui';
export default function BalanceBox({ balance, onPress }) { return <Pressable onPress={onPress} style={{ flex: 1, minHeight: 132, borderRadius: 18, padding: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.accent, justifyContent: 'space-between' }}><View style={{ width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.accent }}><Txt style={{ color: COLORS.bg, fontSize: 22 }}>◈</Txt></View><View><Txt style={{ fontFamily: 'ThmanyahSans-Medium', fontSize: 16 }}>الرصيد</Txt><Txt style={{ color: COLORS.accent, fontFamily: 'ThmanyahSans-Medium', fontSize: 17 }}>{Number(balance || 0).toLocaleString('en-US')} نقطة</Txt></View></Pressable>; }
