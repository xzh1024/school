/**
 *
 * @param {*} val
 * @param {number} places 10的次方（默认为2，即以100来补零）
 */
export default function(val, places) {
  places = places || 2;
  for (let i = 1; i < places + 1; i++) {
    if (val < Math.pow(10, i)) {
      let zeros = "";
      for (let z = 0; z < places + 1 - i; z++) {
        zeros += "0";
      }
      return zeros + val;
    }
  }
  return val;
}
