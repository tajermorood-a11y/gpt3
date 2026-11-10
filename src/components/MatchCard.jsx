import React from 'react';
import { View, Pressable } from 'react-native';
import { COLORS } from '../constants/config';
import { Panel, Txt } from './ui';
import OddsPill from './OddsPill';

export default function MatchCard({ match, onPick, onOpen }) {
  const locked = match.status !== 'open' || new Date(match.kickoff_at) <= new Date();
  const finished = match.status === 'settled';
  const options = [
    { key: 'home', label: match.home_team, odds: match.odds_home },
    { key: 'draw', label: 'تعادل', odds: match.odds_draw },
    { key: 'away', label: match.away_team, odds: match.odds_away }
  ];
  const statusLabel = finished ? 'انتهت المباراة' : locked ? 'التوقع مغلق' : 'التوقع متاح';
  return (
    <Panel style={{ gap: 12 }}>
      <Pressable onPress={onOpen} style={{ gap: 10 }}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
          <Txt style={{ color: COLORS.textDim, fontSize: 11 }}>{match.competition_name || 'مباراة'}</Txt>
          <Txt style={{ color: finished ? COLORS.textDim : locked ? COLORS.warning : COLORS.success, fontSize: 11 }}>{statusLabel}</Txt>
        </View>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <Txt style={{ flex: 1, fontSize: 16, textAlign: 'center' }}>{match.home_team}</Txt>
          <View style={{ alignItems: 'center', minWidth: 58 }}>
            {finished ? <Txt style={{ fontSize: 20 }}>{match.home_score} - {match.away_score}</Txt> : <Txt style={{ color: COLORS.accent, fontSize: 13 }}>VS</Txt>}
          </View>
          <Txt style={{ flex: 1, fontSize: 16, textAlign: 'center' }}>{match.away_team}</Txt>
        </View>
        <Txt style={{ color: COLORS.textDim, textAlign: 'center', fontSize: 11 }}>{new Date(match.kickoff_at).toLocaleString('ar-IQ')}</Txt>
      </Pressable>
      {match.my_pick ? (
        <Txt style={{ color: COLORS.success, textAlign: 'center' }}>توقعك: {match.my_pick === 'home' ? match.home_team : match.my_pick === 'away' ? match.away_team : 'تعادل'}</Txt>
      ) : !finished ? (
        <View style={{ flexDirection: 'row-reverse', gap: 7 }}>
          {options.map((option) => (
            <Pressable key={option.key} disabled={locked || !option.odds} onPress={() => onPick(match, option.key, option.odds)} style={{ flex: 1 }}>
              <OddsPill value={option.odds} label={option.key === 'home' ? 'فوز الأول' : option.key === 'away' ? 'فوز الثاني' : 'تعادل'} disabled={locked || !option.odds} />
            </Pressable>
          ))}
        </View>
      ) : null}
      {!match.odds_home || !match.odds_draw || !match.odds_away ? <Txt style={{ color: COLORS.warning, textAlign: 'center', fontSize: 11 }}>بانتظار تحديد الأودز</Txt> : null}
    </Panel>
  );
}
