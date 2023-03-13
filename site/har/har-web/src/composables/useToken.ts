import { ref } from 'vue';
import lsStore from '@/utils/ls-store';
import { getPlatformFlag } from '@/utils';

function getTokenKey(): string {
  const p = getPlatformFlag();
  return `${p ? p + '-' : ''}token`;
}

export default function () {
  const token = ref('');
  function getToken() {
    token.value = lsStore.getItem(getTokenKey());
    return token.value;
  }
  function setToken(v: string) {
    lsStore.setItem(getTokenKey(), v);
  }
  return { getToken, setToken, token };
}
