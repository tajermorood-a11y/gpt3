import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen, Header, Panel, Txt, Empty } from '../../src/components/ui';
import MatchCard from '../../src/components/MatchCard';
import ConfirmPredictionSheet from '../../src/components/ConfirmPredictionSheet';
import { api } from '../../src/lib/api';
import { useAuth } from '../../src/store/authStore';
export default function MatchDetails() {
  const { id } = useLocalSearchParams(); const { token, user, setUser } = useAuth(); const [match, setMatch] = useState(null); const [selected, setSelected] = useState(null);
  const load = async () => { const rows = await api.listMatches(token); setMatch((rows || []).find((m) => m.id === id) || null); };
  useEffect(() => { load().catch((e) => Alert.alert('خطأ', e.message)); }, [id, token]);
  const confirm = async (stake) => { try { const updated = await api.placePrediction(token, id, selected.pick, stake); setUser(updated); setSelected(null); await load(); Alert.alert('تم', 'تم تسجيل التوقع'); } catch (e) { Alert.alert('خطأ', e.message); throw e; } };
  return <Screen><Header title="تفاصيل المباراة" />{match ? <><MatchCard match={match} onPick={(m,p,o) => setSelected({pick:p,odds:o})} /><Panel><Txt>موعد المباراة: {new Date(match.kickoff_at).toLocaleString('ar-IQ')}</Txt><Txt>النتيجة: {match.home_score ?? '—'} - {match.away_score ?? '—'}</Txt></Panel></> : <Empty text="المباراة غير موجودة" />}<ConfirmPredictionSheet visible={!!selected} match={match} pick={selected?.pick} odds={selected?.odds} balance={user?.balance} onClose={() => setSelected(null)} onConfirm={confirm} /></Screen>;
}
