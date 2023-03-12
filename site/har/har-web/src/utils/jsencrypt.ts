// @ts-ignore
import JSEncrypt from 'jsencrypt';

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtxJ5/W1td7Y1v3/LD' +
  '7xVLW5f1f+iRN9cVj3604oKkREuMIusATc+VwRswDD0hliFR5UPEZVsmg9g8a9QJ/aQbToNQ' +
  '1DeppvzK5NL80+PZxx+Xvu67Nn7zmQyImSNoAqof3TaWpp4lc3l3MAJAAHM3752T0ncwXPgt' +
  '5bUzIXnl0QIDAQAB';

const privateKey =
  'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAK3Enn' +
  '9bW13tjW/f8sPvFUtbl/V/6JE31xWPfrTigqRES4wi6wBNz5XBGzAMPSGWIVHlQ8RlWyaD2' +
  'Dxr1An9pBtOg1DUN6mm/Mrk0vzT49nHH5e+7rs2fvOZDIiZI2gCqh/dNpamniVzeXcwAkAA' +
  'czfvnZPSdzBc+C3ltTMheeXRAgMBAAECgYAcqYPjSfRmJ9reizgF7Ze7mF4WVoTL/0PxAHx' +
  'L5djas5Eqik/s+ui0sOeFI1+p/JN+aKym5nkEf1bZkIenJjk9Ki+s7FgaU+5Gxv7bmv98+l' +
  'FNwlKuoR9+vQNZafDgHAaZt4z1O7V4aq+8rTqyJK6TuZatxjm/laDmD2Eo0kWOqQJBANwXv' +
  'UHZL36EMuSbigtM6pi6wiKp7ZHixU8x8OCC9axdyKCWQgeq0+6fOmGbn0xLaDDcDvWn0/8l' +
  'oNz2rcr94scCQQDKHhxbc00dU4nnW/+xi4UvqoEfaHIL6DPdiAcjF9lU3Ejh0HsQdtgTOUO' +
  'ObXaEfZ/nboF6cnxBxZSnMZwJ11qnAkEAigoZmYMuVptzkA49tni3arM3r6YEastgFRutiC' +
  'KbE1B+1LlpEIYEBlW3uCBy+NcSshJTD6ADRrPDANN2jSpPYQJAMiorC5+ggijbz2qMGfrxA' +
  'ZWmGq+HruDhDpjWfKVMsb1C8ZkXEk0M8CiEVfNhOR0c9Qn+ZO/JW2G4tY6glei3fQJBANud' +
  'ELSkmFlgTSoXMrP7D5I70U3UvLz3p9BpLwX3N5c78xFXPHGQiJKU7AmtaDwAlEdfOhBJ0Qm' +
  'gSzgNrJ1wX4g=';

// 加密
export function encrypt(txt: string): string {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt(txt) || ''; // 对数据进行加密
}

// 解密
export function decrypt(txt: string): string {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  return encryptor.decrypt(txt) || ''; // 对数据进行解密
}
