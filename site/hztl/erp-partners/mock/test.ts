import { Request, Response } from "express";

const getNotices = (req: Request, res: Response) => {
  const rows = [
    {
      id: 34,
      partnerKey: "BB",
      partnerName: "犇犇",
      priceType: "alliance",
      priceTypeName: "平台价",
      shareGoods: false,
      partProperties: ["完好"],
      status: 1,
      region: "",
      warehouse: "",
    },
    {
      id: 40,
      partnerKey: "JAP",
      partnerName: "驾安配",
      priceType: "retail",
      priceTypeName: "零售价",
      shareGoods: true,
      partProperties: ["完好"],
      status: 0,
      region: "",
      warehouse: "",
    },
  ];
  const data = {
    code: "ok",
    data: {
      totalSize: rows.length,
      totalPage: 1,
      rows,
    },
    message: "success",
  };
  setTimeout(() => {
    res.json(data);
  }, 1000 * 0.1);
};

export default {
  "GET /api/test": getNotices,
};
