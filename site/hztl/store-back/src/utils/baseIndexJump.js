let jumpData = "";
let jumpId = "";

const baseIndexJump = {
  setInfo(id, data) {
    jumpData = data;
    jumpId = id;
  },

  getInfo() {
    return { jumpId: jumpId, jumpData: jumpData };
  },

  clearInfo() {
    jumpData = "";
    jumpId = "";
  }
};

export default baseIndexJump;
