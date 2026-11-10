import React, { useEffect, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Header, Btn, Txt, Panel, Empty } from '../src/components/ui';
import AppLogo from '../src/components/AppLogo';
import MatchCard from '../src/components/MatchCard';
import BalanceBox from '../src/components/BalanceBox';
import StarBadge from '../src/components/StarBadge';
import WalletModal from '../src/components/WalletModal';
import ConfirmPredictionSheet from '../src/components/ConfirmPredictionSheet';
import { useAuth } from '../src/store/authStore';
import { useApp } from '../src/store/appStore';
import { api } from '../src/lib/api';
import { COLORS } from '../src/constants/config';

export default function Home() {
  const router = useRouter();
  const { user, token, signOut, setUser } = useAuth();
  const { matches, competitions, loadMatches, loadCompetitions, loading } = useApp();
  const [wallet, setWallet] = useState(false);
  const [competition, setCompetition] = useState(null);
  const [selected, setSelected] = useState(null);
  const admin = ['deputy', 'technical_manager'].includes(user?.role);

  const refresh = async () => {
    await Promise.all([loadCompetitions(token), loadMatches(token, competition)]);
  };

  useEffect(() => {
    if (!token) return;
    refresh().catch((e) => Alert.alert('تعذر تحميل المباريات', e.message));
  }, [token, competition]);

  const confirm = async (stake) => {
    try {
      const updated = await api.placePrediction(token, selected.match.id, selected.pick, stake);
      setUser(updated);
      setSelected(null);
      await loadMatches(token, competition);
      Alert.alert('تم بنجاح', 'تم تسجيل توقعك وتحديث رصيدك');
    } catch (e) {
      Alert.alert('تعذر تسجيل التوقع', e.message);
      throw e;
    }
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'flex-start', gap: 5 }}>
          <AppLogo width={142} height={44} />
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 5 }}>
            <Txt style={{ fontSize: 16 }}>أهلاً {user?.display_name || ''}</Txt>
            <StarBadge color={user?.star_color} size={17} />
          </View>
        </View>
        <Btn title="خروج" secondary onPress={async () => { await signOut(); router.replace('/login'); }} style={{ minHeight: 38 }} />
      </View>

      <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
        <View style={{ flex: 1 }}><BalanceBox balance={user?.balance} onPress={() => setWallet(true)} /></View>
        <Pressable onPress={() => router.push('/leaderboard')} style={{ flex: 1, minHeight: 112, borderRadius: 18, padding: 15, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'space-between' }}>
          <Txt style={{ fontSize: 24 }}>🏆</Txt><Txt style={{ fontSize: 16 }}>لوحة الصدارة</Txt><Txt style={{ color: COLORS.textDim, fontSize: 11 }}>ترتيب المتنافسين</Txt>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
        <Header title="المباريات" subtitle="اختر المباراة وسجّل توقعك" />
        <Pressable onPress={() => router.push('/competition')}><Txt style={{ color: COLORS.accent }}>عرض المسابقة</Txt></Pressable>
      </View>

      <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8 }}>
        {[{ id: null, name: 'الكل' }, ...competitions].map((c) => (
          <Pressable key={c.id || 'all'} onPress={() => setCompetition(c.id)} style={{ backgroundColor: competition === c.id ? COLORS.primary : COLORS.surfaceAlt, borderWidth: 1, borderColor: competition === c.id ? COLORS.primary : COLORS.border, paddingHorizontal: 13, paddingVertical: 9, borderRadius: 12 }}>
            <Txt>{c.name}</Txt>
          </Pressable>
        ))}
      </View>

      {loading ? <Panel><Txt style={{ textAlign: 'center', color: COLORS.textDim }}>جارٍ تحميل المباريات...</Txt></Panel> : matches.length ? matches.map((match) => (
        <MatchCard key={match.id} match={match} onPick={(m, pick, odds) => setSelected({ match: m, pick, odds })} onOpen={() => router.push(`/match/${match.id}`)} />
      )) : <Empty text="لا توجد مباريات حالياً" />}

      <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 8 }}>
        <Btn title="التحديات" secondary onPress={() => router.push('/rivalry')} style={{ flex: 1 }} />
        {admin ? <Btn title="لوحة الإدارة" onPress={() => router.push('/admin')} style={{ flex: 1 }} /> : null}
      </View>
      <Txt style={{ color: COLORS.textDim, textAlign: 'center', fontSize: 11 }}>PHANTOM 2.0 · تجربة مباريات محدّثة</Txt>

      <WalletModal visible={wallet} onClose={() => setWallet(false)} user={user} token={token} onUpdated={(next) => setUser(next)} />
      <ConfirmPredictionSheet visible={!!selected} match={selected?.match} pick={selected?.pick} odds={selected?.odds} balance={user?.balance} onClose={() => setSelected(null)} onConfirm={confirm} />
    </Screen>
  );
}
