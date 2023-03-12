const mockMoudels = {};
const wpMoudles = require.context(
  "@/mock/moudles",
  true,
  /^\.\/(?!index\.).+.js$/
);
wpMoudles.keys().forEach(key => (mockMoudels[key] = wpMoudles(key).default));
export default mockMoudels;
