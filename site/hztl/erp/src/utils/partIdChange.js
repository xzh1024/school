let partId = "";
let type = "";

const partIdChange = {
  setPartId(partIdParams, typeParams) {
    partId = partIdParams;
    type = typeParams;
  },

  getPartId() {
    return { partId, type };
  },

  clearPartId() {
    partId = "";
    type = "";
  }
};

export default partIdChange;
