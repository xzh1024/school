import { Tree } from "@/utils/tool";

export type Area = Tree;

const areas: Area[] = [
  {
    value: 565,
    label: "北京市",
    children: [
      {
        value: 566,
        label: "北京市",
        children: [
          { value: 2108, label: "东城区" },
          { value: 2989, label: "西城区" },
          { value: 3276, label: "朝阳区" },
          { value: 2928, label: "丰台区" },
          { value: 580, label: "石景山区" },
          { value: 2828, label: "海淀区" },
          { value: 2140, label: "门头沟区" },
          { value: 3245, label: "房山区" },
          { value: 3277, label: "通州区" },
          { value: 2268, label: "顺义区" },
          { value: 731, label: "昌平区" },
          { value: 1486, label: "大兴区" },
          { value: 2059, label: "怀柔区" },
          { value: 1359, label: "平谷区" },
          { value: 3278, label: "密云区" },
          { value: 3279, label: "延庆区" }
        ]
      }
    ]
  },
  {
    value: 699,
    label: "天津市",
    children: [
      {
        value: 700,
        label: "天津市",
        children: [
          { value: 3280, label: "和平区" },
          { value: 3281, label: "河东区" },
          { value: 2175, label: "河西区" },
          { value: 740, label: "南开区" },
          { value: 748, label: "河北区" },
          { value: 3167, label: "红桥区" },
          { value: 1589, label: "东丽区" },
          { value: 1732, label: "西青区" },
          { value: 847, label: "津南区" },
          { value: 1799, label: "北辰区" },
          { value: 1779, label: "武清区" },
          { value: 2458, label: "宝坻区" },
          { value: 1721, label: "滨海新区" },
          { value: 701, label: "宁河区" },
          { value: 2471, label: "静海区" },
          { value: 1602, label: "蓟州区" }
        ]
      }
    ]
  },
  {
    value: 9,
    label: "河北省",
    children: [
      {
        value: 600,
        label: "石家庄市",
        children: [
          { value: 3282, label: "长安区" },
          { value: 3283, label: "桥西区" },
          { value: 3284, label: "新华区" },
          { value: 601, label: "井陉矿区" },
          { value: 1398, label: "裕华区" },
          { value: 3285, label: "藁城区" },
          { value: 3286, label: "鹿泉区" },
          { value: 3287, label: "栾城区" },
          { value: 621, label: "井陉县" },
          { value: 2866, label: "正定县" },
          { value: 3202, label: "行唐县" },
          { value: 2592, label: "灵寿县" },
          { value: 2528, label: "高邑县" },
          { value: 2199, label: "深泽县" },
          { value: 1135, label: "赞皇县" },
          { value: 3066, label: "无极县" },
          { value: 2389, label: "平山县" },
          { value: 1343, label: "元氏县" },
          { value: 3042, label: "赵县" },
          { value: 2916, label: "辛集市" },
          { value: 812, label: "晋州市" },
          { value: 2255, label: "新乐市" }
        ]
      },
      {
        value: 208,
        label: "唐山市",
        children: [
          { value: 2325, label: "路南区" },
          { value: 209, label: "路北区" },
          { value: 1363, label: "古冶区" },
          { value: 697, label: "开平区" },
          { value: 1669, label: "丰南区" },
          { value: 3032, label: "丰润区" },
          { value: 3288, label: "曹妃甸区" },
          { value: 2824, label: "滦南县" },
          { value: 3157, label: "乐亭县" },
          { value: 2377, label: "迁西县" },
          { value: 2197, label: "玉田县" },
          { value: 3199, label: "遵化市" },
          { value: 2848, label: "迁安市" },
          { value: 3289, label: "滦州市" }
        ]
      },
      {
        value: 727,
        label: "秦皇岛市",
        children: [
          { value: 1447, label: "海港区" },
          { value: 1289, label: "山海关区" },
          { value: 728, label: "北戴河区" },
          { value: 3290, label: "抚宁区" },
          { value: 885, label: "青龙满族自治县" },
          { value: 2243, label: "昌黎县" },
          { value: 1111, label: "卢龙县" }
        ]
      },
      {
        value: 51,
        label: "邯郸市",
        children: [
          { value: 2212, label: "邯山区" },
          { value: 1336, label: "丛台区" },
          { value: 530, label: "复兴区" },
          { value: 403, label: "峰峰矿区" },
          { value: 3291, label: "肥乡区" },
          { value: 3292, label: "永年区" },
          { value: 192, label: "临漳县" },
          { value: 685, label: "成安县" },
          { value: 896, label: "大名县" },
          { value: 794, label: "涉县" },
          { value: 2221, label: "磁县" },
          { value: 2238, label: "邱县" },
          { value: 243, label: "鸡泽县" },
          { value: 1301, label: "广平县" },
          { value: 1719, label: "馆陶县" },
          { value: 52, label: "魏县" },
          { value: 2781, label: "曲周县" },
          { value: 457, label: "武安市" }
        ]
      },
      {
        value: 514,
        label: "邢台市",
        children: [
          { value: 3293, label: "桥东区" },
          { value: 3294, label: "桥西区" },
          { value: 1996, label: "邢台县" },
          { value: 1916, label: "临城县" },
          { value: 1720, label: "内丘县" },
          { value: 1296, label: "柏乡县" },
          { value: 2321, label: "隆尧县" },
          { value: 2829, label: "任县" },
          { value: 2502, label: "南和县" },
          { value: 2713, label: "宁晋县" },
          { value: 2858, label: "巨鹿县" },
          { value: 1666, label: "新河县" },
          { value: 1214, label: "广宗县" },
          { value: 515, label: "平乡县" },
          { value: 2488, label: "威县" },
          { value: 3109, label: "清河县" },
          { value: 560, label: "临西县" },
          { value: 3177, label: "南宫市" },
          { value: 1607, label: "沙河市" }
        ]
      },
      {
        value: 10,
        label: "保定市",
        children: [
          { value: 3295, label: "竞秀区" },
          { value: 3296, label: "莲池区" },
          { value: 3297, label: "满城区" },
          { value: 3298, label: "清苑区" },
          { value: 3299, label: "徐水区" },
          { value: 3059, label: "涞水县" },
          { value: 2859, label: "阜平县" },
          { value: 868, label: "定兴县" },
          { value: 2441, label: "唐县" },
          { value: 2445, label: "高阳县" },
          { value: 1764, label: "容城县" },
          { value: 2838, label: "涞源县" },
          { value: 1279, label: "望都县" },
          { value: 3054, label: "安新县" },
          { value: 11, label: "易县" },
          { value: 2839, label: "曲阳县" },
          { value: 3239, label: "蠡县" },
          { value: 1464, label: "顺平县" },
          { value: 1046, label: "博野县" },
          { value: 861, label: "雄县" },
          { value: 1842, label: "涿州市" },
          { value: 1663, label: "定州市" },
          { value: 710, label: "安国市" },
          { value: 2070, label: "高碑店市" }
        ]
      },
      {
        value: 306,
        label: "张家口市",
        children: [
          { value: 870, label: "桥东区" },
          { value: 871, label: "桥西区" },
          { value: 307, label: "宣化区" },
          { value: 3131, label: "下花园区" },
          { value: 1921, label: "万全区" },
          { value: 3300, label: "崇礼区" },
          { value: 416, label: "张北县" },
          { value: 3192, label: "康保县" },
          { value: 1539, label: "沽源县" },
          { value: 3108, label: "尚义县" },
          { value: 466, label: "蔚县" },
          { value: 1439, label: "阳原县" },
          { value: 2180, label: "怀安县" },
          { value: 432, label: "怀来县" },
          { value: 3016, label: "涿鹿县" },
          { value: 3003, label: "赤城县" }
        ]
      },
      {
        value: 217,
        label: "承德市",
        children: [
          { value: 2951, label: "双桥区" },
          { value: 218, label: "双滦区" },
          { value: 3213, label: "鹰手营子矿区" },
          { value: 1465, label: "承德县" },
          { value: 1265, label: "兴隆县" },
          { value: 1545, label: "滦平县" },
          { value: 2246, label: "隆化县" },
          { value: 1146, label: "丰宁满族自治县" },
          { value: 3039, label: "宽城满族自治县" },
          { value: 3184, label: "围场满族蒙古族自治县" },
          { value: 3301, label: "平泉市" }
        ]
      },
      {
        value: 60,
        label: "沧州市",
        children: [
          { value: 3302, label: "新华区" },
          { value: 1820, label: "运河区" },
          { value: 2135, label: "沧县" },
          { value: 164, label: "青县" },
          { value: 3005, label: "东光县" },
          { value: 2213, label: "海兴县" },
          { value: 2645, label: "盐山县" },
          { value: 2433, label: "肃宁县" },
          { value: 61, label: "南皮县" },
          { value: 1624, label: "吴桥县" },
          { value: 3000, label: "献县" },
          { value: 1749, label: "孟村回族自治县" },
          { value: 1552, label: "泊头市" },
          { value: 1023, label: "任丘市" },
          { value: 1546, label: "黄骅市" },
          { value: 2731, label: "河间市" }
        ]
      },
      {
        value: 983,
        label: "廊坊市",
        children: [
          { value: 1776, label: "安次区" },
          { value: 2094, label: "广阳区" },
          { value: 2879, label: "固安县" },
          { value: 2104, label: "永清县" },
          { value: 1406, label: "香河县" },
          { value: 1595, label: "大城县" },
          { value: 984, label: "文安县" },
          { value: 1695, label: "大厂回族自治县" },
          { value: 2275, label: "霸州市" },
          { value: 1297, label: "三河市" }
        ]
      },
      {
        value: 136,
        label: "衡水市",
        children: [
          { value: 3212, label: "桃城区" },
          { value: 3303, label: "冀州区" },
          { value: 2303, label: "枣强县" },
          { value: 1912, label: "武邑县" },
          { value: 137, label: "武强县" },
          { value: 2752, label: "饶阳县" },
          { value: 3150, label: "安平县" },
          { value: 2136, label: "故城县" },
          { value: 1151, label: "景县" },
          { value: 2014, label: "阜城县" },
          { value: 1823, label: "深州市" }
        ]
      }
    ]
  },
  {
    value: 262,
    label: "山西省",
    children: [
      {
        value: 308,
        label: "太原市",
        children: [
          { value: 2293, label: "小店区" },
          { value: 696, label: "迎泽区" },
          { value: 1667, label: "杏花岭区" },
          { value: 2613, label: "尖草坪区" },
          { value: 1452, label: "万柏林区" },
          { value: 2712, label: "晋源区" },
          { value: 462, label: "清徐县" },
          { value: 2947, label: "阳曲县" },
          { value: 465, label: "娄烦县" },
          { value: 309, label: "古交市" }
        ]
      },
      {
        value: 369,
        label: "大同市",
        children: [
          { value: 370, label: "新荣区" },
          { value: 3304, label: "平城区" },
          { value: 3305, label: "云冈区" },
          { value: 3306, label: "云州区" },
          { value: 1060, label: "阳高县" },
          { value: 3112, label: "天镇县" },
          { value: 2020, label: "广灵县" },
          { value: 1596, label: "灵丘县" },
          { value: 1314, label: "浑源县" },
          { value: 2821, label: "左云县" }
        ]
      },
      {
        value: 978,
        label: "阳泉市",
        children: [
          { value: 3307, label: "城区" },
          { value: 2056, label: "矿区" },
          { value: 3308, label: "郊区" },
          { value: 2426, label: "平定县" },
          { value: 979, label: "盂县" }
        ]
      },
      {
        value: 267,
        label: "长治市",
        children: [
          { value: 3309, label: "潞州区" },
          { value: 3310, label: "上党区" },
          { value: 3311, label: "屯留区" },
          { value: 3312, label: "潞城区" },
          { value: 1380, label: "襄垣县" },
          { value: 3165, label: "平顺县" },
          { value: 1351, label: "黎城县" },
          { value: 3070, label: "壶关县" },
          { value: 2544, label: "长子县" },
          { value: 268, label: "武乡县" },
          { value: 1097, label: "沁县" },
          { value: 2173, label: "沁源县" }
        ]
      },
      {
        value: 1537,
        label: "晋城市",
        children: [
          { value: 3313, label: "城区" },
          { value: 1538, label: "沁水县" },
          { value: 1887, label: "阳城县" },
          { value: 2291, label: "陵川县" },
          { value: 2084, label: "泽州县" },
          { value: 2758, label: "高平市" }
        ]
      },
      {
        value: 650,
        label: "朔州市",
        children: [
          { value: 890, label: "朔城区" },
          { value: 3173, label: "平鲁区" },
          { value: 2614, label: "山阴县" },
          { value: 651, label: "应县" },
          { value: 1712, label: "右玉县" },
          { value: 3314, label: "怀仁市" }
        ]
      },
      {
        value: 1113,
        label: "晋中市",
        children: [
          { value: 2284, label: "榆次区" },
          { value: 3315, label: "太谷区" },
          { value: 1492, label: "榆社县" },
          { value: 1175, label: "左权县" },
          { value: 1923, label: "和顺县" },
          { value: 2552, label: "昔阳县" },
          { value: 1959, label: "寿阳县" },
          { value: 2262, label: "祁县" },
          { value: 1558, label: "平遥县" },
          { value: 1163, label: "灵石县" },
          { value: 2981, label: "介休市" }
        ]
      },
      {
        value: 493,
        label: "运城市",
        children: [
          { value: 494, label: "盐湖区" },
          { value: 1033, label: "临猗县" },
          { value: 1202, label: "万荣县" },
          { value: 989, label: "闻喜县" },
          { value: 2132, label: "稷山县" },
          { value: 1298, label: "新绛县" },
          { value: 2938, label: "绛县" },
          { value: 946, label: "垣曲县" },
          { value: 2142, label: "夏县" },
          { value: 1339, label: "平陆县" },
          { value: 2701, label: "芮城县" },
          { value: 1468, label: "永济市" },
          { value: 2900, label: "河津市" }
        ]
      },
      {
        value: 263,
        label: "忻州市",
        children: [
          { value: 708, label: "忻府区" },
          { value: 1282, label: "定襄县" },
          { value: 2972, label: "五台县" },
          { value: 1745, label: "代县" },
          { value: 264, label: "繁峙县" },
          { value: 496, label: "宁武县" },
          { value: 836, label: "静乐县" },
          { value: 2463, label: "神池县" },
          { value: 900, label: "五寨县" },
          { value: 2664, label: "岢岚县" },
          { value: 1884, label: "河曲县" },
          { value: 1498, label: "保德县" },
          { value: 483, label: "偏关县" },
          { value: 1947, label: "原平市" }
        ]
      },
      {
        value: 1073,
        label: "临汾市",
        children: [
          { value: 2832, label: "尧都区" },
          { value: 1843, label: "曲沃县" },
          { value: 1410, label: "翼城县" },
          { value: 2331, label: "襄汾县" },
          { value: 1573, label: "洪洞县" },
          { value: 1074, label: "古县" },
          { value: 1466, label: "安泽县" },
          { value: 2359, label: "浮山县" },
          { value: 1560, label: "吉县" },
          { value: 2158, label: "乡宁县" },
          { value: 3087, label: "大宁县" },
          { value: 2779, label: "隰县" },
          { value: 2066, label: "永和县" },
          { value: 3194, label: "蒲县" },
          { value: 2227, label: "汾西县" },
          { value: 1825, label: "侯马市" },
          { value: 3191, label: "霍州市" }
        ]
      },
      {
        value: 1000,
        label: "吕梁市",
        children: [
          { value: 2479, label: "离石区" },
          { value: 2550, label: "文水县" },
          { value: 3148, label: "交城县" },
          { value: 2165, label: "兴县" },
          { value: 1784, label: "临县" },
          { value: 1001, label: "柳林县" },
          { value: 2272, label: "石楼县" },
          { value: 1035, label: "岚县" },
          { value: 3219, label: "方山县" },
          { value: 3135, label: "中阳县" },
          { value: 2790, label: "交口县" },
          { value: 2414, label: "孝义市" },
          { value: 3225, label: "汾阳市" }
        ]
      }
    ]
  },
  {
    value: 6,
    label: "内蒙古自治区",
    children: [
      {
        value: 293,
        label: "呼和浩特市",
        children: [
          { value: 3316, label: "新城区" },
          { value: 2732, label: "回民区" },
          { value: 3143, label: "玉泉区" },
          { value: 2830, label: "赛罕区" },
          { value: 769, label: "土默特左旗" },
          { value: 1746, label: "托克托县" },
          { value: 294, label: "和林格尔县" },
          { value: 386, label: "清水河县" },
          { value: 2767, label: "武川县" }
        ]
      },
      {
        value: 260,
        label: "包头市",
        children: [
          { value: 2005, label: "东河区" },
          { value: 261, label: "昆都仑区" },
          { value: 3317, label: "青山区" },
          { value: 588, label: "石拐区" },
          { value: 3318, label: "白云鄂博矿区" },
          { value: 2565, label: "九原区" },
          { value: 1392, label: "土默特右旗" },
          { value: 3081, label: "固阳县" },
          { value: 2761, label: "达尔罕茂明安联合旗" }
        ]
      },
      {
        value: 1381,
        label: "乌海市",
        children: [
          { value: 3057, label: "海勃湾区" },
          { value: 1620, label: "海南区" },
          { value: 2907, label: "乌达区" }
        ]
      },
      {
        value: 387,
        label: "赤峰市",
        children: [
          { value: 915, label: "红山区" },
          { value: 1263, label: "元宝山区" },
          { value: 388, label: "松山区" },
          { value: 1681, label: "阿鲁科尔沁旗" },
          { value: 2619, label: "巴林左旗" },
          { value: 3319, label: "巴林右旗" },
          { value: 1949, label: "林西县" },
          { value: 3320, label: "克什克腾旗" },
          { value: 913, label: "翁牛特旗" },
          { value: 3321, label: "喀喇沁旗" },
          { value: 3041, label: "宁城县" },
          { value: 3322, label: "敖汉旗" }
        ]
      },
      {
        value: 1431,
        label: "通辽市",
        children: [
          { value: 2060, label: "科尔沁区" },
          { value: 1827, label: "科尔沁左翼中旗" },
          { value: 1550, label: "科尔沁左翼后旗" },
          { value: 1678, label: "开鲁县" },
          { value: 2602, label: "库伦旗" },
          { value: 1762, label: "奈曼旗" },
          { value: 1432, label: "扎鲁特旗" },
          { value: 1748, label: "霍林郭勒市" }
        ]
      },
      {
        value: 922,
        label: "鄂尔多斯市",
        children: [
          { value: 1785, label: "东胜区" },
          { value: 3323, label: "康巴什区" },
          { value: 2868, label: "达拉特旗" },
          { value: 3324, label: "准格尔旗" },
          { value: 923, label: "鄂托克前旗" },
          { value: 3325, label: "鄂托克旗" },
          { value: 2680, label: "杭锦旗" },
          { value: 3017, label: "乌审旗" },
          { value: 1504, label: "伊金霍洛旗" }
        ]
      },
      {
        value: 38,
        label: "呼伦贝尔市",
        children: [
          { value: 835, label: "海拉尔区" },
          { value: 3326, label: "扎赉诺尔区" },
          { value: 3327, label: "阿荣旗" },
          { value: 2679, label: "莫力达瓦达斡尔族自治旗" },
          { value: 3328, label: "鄂伦春自治旗" },
          { value: 3329, label: "鄂温克族自治旗" },
          { value: 3330, label: "陈巴尔虎旗" },
          { value: 629, label: "新巴尔虎左旗" },
          { value: 281, label: "新巴尔虎右旗" },
          { value: 409, label: "满洲里市" },
          { value: 3331, label: "牙克石市" },
          { value: 3332, label: "扎兰屯市" },
          { value: 678, label: "额尔古纳市" },
          { value: 1811, label: "根河市" }
        ]
      },
      {
        value: 516,
        label: "巴彦淖尔市",
        children: [
          { value: 517, label: "临河区" },
          { value: 2593, label: "五原县" },
          { value: 2776, label: "磴口县" },
          { value: 1319, label: "乌拉特前旗" },
          { value: 2216, label: "乌拉特中旗" },
          { value: 1219, label: "乌拉特后旗" },
          { value: 1619, label: "杭锦后旗" }
        ]
      },
      {
        value: 334,
        label: "乌兰察布市",
        children: [
          { value: 3043, label: "集宁区" },
          { value: 1623, label: "卓资县" },
          { value: 1782, label: "化德县" },
          { value: 1768, label: "商都县" },
          { value: 335, label: "兴和县" },
          { value: 3119, label: "凉城县" },
          { value: 1120, label: "察哈尔右翼前旗" },
          { value: 3227, label: "察哈尔右翼中旗" },
          { value: 2431, label: "察哈尔右翼后旗" },
          { value: 2076, label: "四子王旗" },
          { value: 1443, label: "丰镇市" }
        ]
      },
      {
        value: 7,
        label: "兴安盟",
        children: [
          { value: 2157, label: "乌兰浩特市" },
          { value: 3063, label: "阿尔山市" },
          { value: 1826, label: "科尔沁右翼前旗" },
          { value: 8, label: "科尔沁右翼中旗" },
          { value: 3129, label: "扎赉特旗" },
          { value: 2499, label: "突泉县" }
        ]
      },
      {
        value: 523,
        label: "锡林郭勒盟",
        children: [
          { value: 1654, label: "二连浩特市" },
          { value: 2855, label: "锡林浩特市" },
          { value: 3333, label: "阿巴嘎旗" },
          { value: 3334, label: "苏尼特左旗" },
          { value: 2885, label: "苏尼特右旗" },
          { value: 2903, label: "东乌珠穆沁旗" },
          { value: 1395, label: "西乌珠穆沁旗" },
          { value: 3079, label: "太仆寺旗" },
          { value: 2416, label: "镶黄旗" },
          { value: 524, label: "正镶白旗" },
          { value: 637, label: "正蓝旗" },
          { value: 2117, label: "多伦县" }
        ]
      },
      {
        value: 285,
        label: "阿拉善盟",
        children: [
          { value: 2620, label: "阿拉善左旗" },
          { value: 1753, label: "阿拉善右旗" },
          { value: 286, label: "额济纳旗" }
        ]
      }
    ]
  },
  {
    value: 109,
    label: "辽宁省",
    children: [
      {
        value: 180,
        label: "沈阳市",
        children: [
          { value: 1171, label: "和平区" },
          { value: 181, label: "沈河区" },
          { value: 2631, label: "大东区" },
          { value: 1280, label: "皇姑区" },
          { value: 3335, label: "铁西区" },
          { value: 2339, label: "苏家屯区" },
          { value: 3336, label: "浑南区" },
          { value: 1795, label: "沈北新区" },
          { value: 2069, label: "于洪区" },
          { value: 3337, label: "辽中区" },
          { value: 2025, label: "康平县" },
          { value: 1441, label: "法库县" },
          { value: 1164, label: "新民市" }
        ]
      },
      {
        value: 110,
        label: "大连市",
        children: [
          { value: 986, label: "中山区" },
          { value: 1158, label: "西岗区" },
          { value: 2584, label: "沙河口区" },
          { value: 2364, label: "甘井子区" },
          { value: 2718, label: "旅顺口区" },
          { value: 1257, label: "金州区" },
          { value: 3338, label: "普兰店区" },
          { value: 1321, label: "长海县" },
          { value: 1833, label: "瓦房店市" },
          { value: 458, label: "庄河市" }
        ]
      },
      {
        value: 760,
        label: "鞍山市",
        children: [
          { value: 3339, label: "铁东区" },
          { value: 3340, label: "铁西区" },
          { value: 1572, label: "立山区" },
          { value: 1582, label: "千山区" },
          { value: 2424, label: "台安县" },
          { value: 1064, label: "岫岩满族自治县" },
          { value: 761, label: "海城市" }
        ]
      },
      {
        value: 283,
        label: "抚顺市",
        children: [
          { value: 942, label: "新抚区" },
          { value: 284, label: "东洲区" },
          { value: 2886, label: "望花区" },
          { value: 1953, label: "顺城区" },
          { value: 1958, label: "抚顺县" },
          { value: 3031, label: "新宾满族自治县" },
          { value: 2717, label: "清原满族自治县" }
        ]
      },
      {
        value: 270,
        label: "本溪市",
        children: [
          { value: 1617, label: "平山区" },
          { value: 3170, label: "溪湖区" },
          { value: 1957, label: "明山区" },
          { value: 271, label: "南芬区" },
          { value: 368, label: "本溪满族自治县" },
          { value: 1246, label: "桓仁满族自治县" }
        ]
      },
      {
        value: 184,
        label: "丹东市",
        children: [
          { value: 1603, label: "元宝区" },
          { value: 3056, label: "振兴区" },
          { value: 185, label: "振安区" },
          { value: 2398, label: "宽甸满族自治县" },
          { value: 354, label: "东港市" },
          { value: 1727, label: "凤城市" }
        ]
      },
      {
        value: 360,
        label: "锦州市",
        children: [
          { value: 1961, label: "古塔区" },
          { value: 834, label: "凌河区" },
          { value: 3024, label: "太和区" },
          { value: 717, label: "黑山县" },
          { value: 1879, label: "义县" },
          { value: 361, label: "凌海市" },
          { value: 961, label: "北镇市" }
        ]
      },
      {
        value: 121,
        label: "营口市",
        children: [
          { value: 2988, label: "站前区" },
          { value: 675, label: "西市区" },
          { value: 2610, label: "鲅鱼圈区" },
          { value: 2945, label: "老边区" },
          { value: 122, label: "盖州市" },
          { value: 583, label: "大石桥市" }
        ]
      },
      {
        value: 1117,
        label: "阜新市",
        children: [
          { value: 3341, label: "海州区" },
          { value: 2336, label: "新邱区" },
          { value: 2308, label: "太平区" },
          { value: 2998, label: "清河门区" },
          { value: 1981, label: "细河区" },
          { value: 1178, label: "阜新蒙古族自治县" },
          { value: 1118, label: "彰武县" }
        ]
      },
      {
        value: 363,
        label: "辽阳市",
        children: [
          { value: 2660, label: "白塔区" },
          { value: 902, label: "文圣区" },
          { value: 2038, label: "宏伟区" },
          { value: 3141, label: "弓长岭区" },
          { value: 1063, label: "太子河区" },
          { value: 1340, label: "辽阳县" },
          { value: 364, label: "灯塔市" }
        ]
      },
      {
        value: 1295,
        label: "盘锦市",
        children: [
          { value: 3198, label: "双台子区" },
          { value: 2684, label: "兴隆台区" },
          { value: 1985, label: "大洼区" },
          { value: 2798, label: "盘山县" }
        ]
      },
      {
        value: 809,
        label: "铁岭市",
        children: [
          { value: 993, label: "银州区" },
          { value: 1962, label: "清河区" },
          { value: 2102, label: "铁岭县" },
          { value: 2738, label: "西丰县" },
          { value: 810, label: "昌图县" },
          { value: 1417, label: "调兵山市" },
          { value: 974, label: "开原市" }
        ]
      },
      {
        value: 382,
        label: "朝阳市",
        children: [
          { value: 1618, label: "双塔区" },
          { value: 908, label: "龙城区" },
          { value: 763, label: "朝阳县" },
          { value: 1830, label: "建平县" },
          { value: 383, label: "喀喇沁左翼蒙古族自治县" },
          { value: 1859, label: "北票市" },
          { value: 1642, label: "凌源市" }
        ]
      },
      {
        value: 1217,
        label: "葫芦岛市",
        children: [
          { value: 1898, label: "连山区" },
          { value: 1218, label: "龙港区" },
          { value: 3195, label: "南票区" },
          { value: 1513, label: "绥中县" },
          { value: 3168, label: "建昌县" },
          { value: 1549, label: "兴城市" }
        ]
      }
    ]
  },
  {
    value: 133,
    label: "吉林省",
    children: [
      {
        value: 528,
        label: "长春市",
        children: [
          { value: 1047, label: "南关区" },
          { value: 2566, label: "宽城区" },
          { value: 1290, label: "朝阳区" },
          { value: 1888, label: "二道区" },
          { value: 569, label: "绿园区" },
          { value: 529, label: "双阳区" },
          { value: 3342, label: "九台区" },
          { value: 2453, label: "农安县" },
          { value: 1783, label: "榆树市" },
          { value: 733, label: "德惠市" }
        ]
      },
      {
        value: 213,
        label: "吉林市",
        children: [
          { value: 1557, label: "昌邑区" },
          { value: 881, label: "龙潭区" },
          { value: 3100, label: "船营区" },
          { value: 434, label: "丰满区" },
          { value: 1993, label: "永吉县" },
          { value: 2778, label: "蛟河市" },
          { value: 214, label: "桦甸市" },
          { value: 720, label: "舒兰市" },
          { value: 595, label: "磐石市" }
        ]
      },
      {
        value: 938,
        label: "四平市",
        children: [
          { value: 939, label: "铁西区" },
          { value: 1119, label: "铁东区" },
          { value: 1780, label: "梨树县" },
          { value: 2417, label: "伊通满族自治县" },
          { value: 2456, label: "公主岭市" },
          { value: 2109, label: "双辽市" }
        ]
      },
      {
        value: 200,
        label: "辽源市",
        children: [
          { value: 2289, label: "龙山区" },
          { value: 3343, label: "西安区" },
          { value: 2176, label: "东丰县" },
          { value: 2167, label: "东辽县" }
        ]
      },
      {
        value: 373,
        label: "通化市",
        children: [
          { value: 2443, label: "东昌区" },
          { value: 2511, label: "二道江区" },
          { value: 374, label: "通化县" },
          { value: 666, label: "辉南县" },
          { value: 1496, label: "柳河县" },
          { value: 1109, label: "梅河口市" },
          { value: 2354, label: "集安市" }
        ]
      },
      {
        value: 210,
        label: "白山市",
        children: [
          { value: 3344, label: "浑江区" },
          { value: 1236, label: "江源区" },
          { value: 1690, label: "抚松县" },
          { value: 428, label: "靖宇县" },
          { value: 2295, label: "长白朝鲜族自治县" },
          { value: 2435, label: "临江市" }
        ]
      },
      {
        value: 134,
        label: "松原市",
        children: [
          { value: 1172, label: "宁江区" },
          { value: 2363, label: "前郭尔罗斯蒙古族自治县" },
          { value: 135, label: "长岭县" },
          { value: 1822, label: "乾安县" },
          { value: 3345, label: "扶余市" }
        ]
      },
      {
        value: 275,
        label: "白城市",
        children: [
          { value: 1588, label: "洮北区" },
          { value: 656, label: "镇赉县" },
          { value: 2835, label: "通榆县" },
          { value: 758, label: "洮南市" },
          { value: 367, label: "大安市" }
        ]
      },
      {
        value: 239,
        label: "延边朝鲜族自治州",
        children: [
          { value: 3116, label: "延吉市" },
          { value: 314, label: "图们市" },
          { value: 2709, label: "敦化市" },
          { value: 240, label: "珲春市" },
          { value: 2730, label: "龙井市" },
          { value: 1128, label: "和龙市" },
          { value: 2384, label: "汪清县" },
          { value: 259, label: "安图县" }
        ]
      }
    ]
  },
  {
    value: 78,
    label: "黑龙江省",
    children: [
      {
        value: 155,
        label: "哈尔滨市",
        children: [
          { value: 977, label: "道里区" },
          { value: 1485, label: "南岗区" },
          { value: 2016, label: "道外区" },
          { value: 557, label: "平房区" },
          { value: 1787, label: "松北区" },
          { value: 1346, label: "香坊区" },
          { value: 1494, label: "呼兰区" },
          { value: 156, label: "阿城区" },
          { value: 3346, label: "双城区" },
          { value: 2802, label: "依兰县" },
          { value: 1174, label: "方正县" },
          { value: 2224, label: "宾县" },
          { value: 3034, label: "巴彦县" },
          { value: 1448, label: "木兰县" },
          { value: 2370, label: "通河县" },
          { value: 1926, label: "延寿县" },
          { value: 770, label: "尚志市" },
          { value: 945, label: "五常市" }
        ]
      },
      {
        value: 476,
        label: "齐齐哈尔市",
        children: [
          { value: 1801, label: "龙沙区" },
          { value: 2958, label: "建华区" },
          { value: 1446, label: "铁锋区" },
          { value: 1554, label: "昂昂溪区" },
          { value: 1691, label: "富拉尔基区" },
          { value: 1268, label: "碾子山区" },
          { value: 3347, label: "梅里斯达斡尔族区" },
          { value: 3146, label: "龙江县" },
          { value: 477, label: "依安县" },
          { value: 2923, label: "泰来县" },
          { value: 1061, label: "甘南县" },
          { value: 2982, label: "富裕县" },
          { value: 2655, label: "克山县" },
          { value: 751, label: "克东县" },
          { value: 1419, label: "拜泉县" },
          { value: 1309, label: "讷河市" }
        ]
      },
      {
        value: 639,
        label: "鸡西市",
        children: [
          { value: 2343, label: "鸡冠区" },
          { value: 2447, label: "恒山区" },
          { value: 2803, label: "滴道区" },
          { value: 2261, label: "梨树区" },
          { value: 3244, label: "城子河区" },
          { value: 1460, label: "麻山区" },
          { value: 640, label: "鸡东县" },
          { value: 2380, label: "虎林市" },
          { value: 1423, label: "密山市" }
        ]
      },
      {
        value: 249,
        label: "鹤岗市",
        children: [
          { value: 3348, label: "向阳区" },
          { value: 826, label: "工农区" },
          { value: 3349, label: "南山区" },
          { value: 2145, label: "兴安区" },
          { value: 1307, label: "东山区" },
          { value: 250, label: "兴山区" },
          { value: 2531, label: "萝北县" },
          { value: 2352, label: "绥滨县" }
        ]
      },
      {
        value: 246,
        label: "双鸭山市",
        children: [
          { value: 247, label: "尖山区" },
          { value: 1967, label: "岭东区" },
          { value: 2710, label: "四方台区" },
          { value: 3350, label: "宝山区" },
          { value: 1025, label: "集贤县" },
          { value: 1714, label: "友谊县" },
          { value: 2653, label: "宝清县" },
          { value: 1489, label: "饶河县" }
        ]
      },
      {
        value: 453,
        label: "大庆市",
        children: [
          { value: 3351, label: "萨尔图区" },
          { value: 3352, label: "龙凤区" },
          { value: 1262, label: "让胡路区" },
          { value: 1167, label: "红岗区" },
          { value: 3211, label: "大同区" },
          { value: 2702, label: "肇州县" },
          { value: 454, label: "肇源县" },
          { value: 501, label: "林甸县" },
          { value: 1189, label: "杜尔伯特蒙古族自治县" }
        ]
      },
      {
        value: 123,
        label: "伊春市",
        children: [
          { value: 3353, label: "伊美区" },
          { value: 3354, label: "乌翠区" },
          { value: 1832, label: "友好区" },
          { value: 1430, label: "嘉荫县" },
          { value: 3355, label: "汤旺县" },
          { value: 3356, label: "丰林县" },
          { value: 3357, label: "大箐山县" },
          { value: 3358, label: "南岔县" },
          { value: 3359, label: "金林区" },
          { value: 415, label: "铁力市" }
        ]
      },
      {
        value: 119,
        label: "佳木斯市",
        children: [
          { value: 2148, label: "向阳区" },
          { value: 1445, label: "前进区" },
          { value: 120, label: "东风区" },
          { value: 3360, label: "郊区" },
          { value: 1226, label: "桦南县" },
          { value: 329, label: "桦川县" },
          { value: 2164, label: "汤原县" },
          { value: 684, label: "同江市" },
          { value: 2652, label: "富锦市" },
          { value: 2451, label: "抚远市" }
        ]
      },
      {
        value: 96,
        label: "七台河市",
        children: [
          { value: 1100, label: "新兴区" },
          { value: 849, label: "桃山区" },
          { value: 97, label: "茄子河区" },
          { value: 2333, label: "勃利县" }
        ]
      },
      {
        value: 690,
        label: "牡丹江市",
        children: [
          { value: 2852, label: "东安区" },
          { value: 3200, label: "阳明区" },
          { value: 792, label: "爱民区" },
          { value: 201, label: "西安区" },
          { value: 730, label: "林口县" },
          { value: 3078, label: "绥芬河市" },
          { value: 2405, label: "海林市" },
          { value: 2695, label: "宁安市" },
          { value: 691, label: "穆棱市" },
          { value: 3361, label: "东宁市" }
        ]
      },
      {
        value: 886,
        label: "黑河市",
        children: [
          { value: 920, label: "爱辉区" },
          { value: 2029, label: "逊克县" },
          { value: 2851, label: "孙吴县" },
          { value: 2265, label: "北安市" },
          { value: 2371, label: "五大连池市" },
          { value: 3362, label: "嫩江市" }
        ]
      },
      {
        value: 79,
        label: "绥化市",
        children: [
          { value: 3104, label: "北林区" },
          { value: 1542, label: "望奎县" },
          { value: 2002, label: "兰西县" },
          { value: 2448, label: "青冈县" },
          { value: 2861, label: "庆安县" },
          { value: 2365, label: "明水县" },
          { value: 80, label: "绥棱县" },
          { value: 2170, label: "安达市" },
          { value: 1658, label: "肇东市" },
          { value: 2137, label: "海伦市" }
        ]
      },
      {
        value: 348,
        label: "大兴安岭地区",
        children: [
          { value: 3363, label: "漠河市" },
          { value: 2946, label: "呼玛县" },
          { value: 1426, label: "塔河县" }
        ]
      }
    ]
  },
  {
    value: 438,
    label: "上海市",
    children: [
      {
        value: 439,
        label: "上海市",
        children: [
          { value: 1568, label: "黄浦区" },
          { value: 2808, label: "徐汇区" },
          { value: 659, label: "长宁区" },
          { value: 1225, label: "静安区" },
          { value: 3364, label: "普陀区" },
          { value: 1007, label: "虹口区" },
          { value: 1394, label: "杨浦区" },
          { value: 2691, label: "闵行区" },
          { value: 1599, label: "宝山区" },
          { value: 2296, label: "嘉定区" },
          { value: 1659, label: "浦东新区" },
          { value: 2768, label: "金山区" },
          { value: 1356, label: "松江区" },
          { value: 1641, label: "青浦区" },
          { value: 2150, label: "奉贤区" },
          { value: 1156, label: "崇明区" }
        ]
      }
    ]
  },
  {
    value: 15,
    label: "江苏省",
    children: [
      {
        value: 297,
        label: "南京市",
        children: [
          { value: 1078, label: "玄武区" },
          { value: 930, label: "秦淮区" },
          { value: 1051, label: "建邺区" },
          { value: 3365, label: "鼓楼区" },
          { value: 1809, label: "浦口区" },
          { value: 872, label: "栖霞区" },
          { value: 298, label: "雨花台区" },
          { value: 1960, label: "江宁区" },
          { value: 425, label: "六合区" },
          { value: 3366, label: "溧水区" },
          { value: 3367, label: "高淳区" }
        ]
      },
      {
        value: 1232,
        label: "无锡市",
        children: [
          { value: 2872, label: "锡山区" },
          { value: 1971, label: "惠山区" },
          { value: 1576, label: "滨湖区" },
          { value: 1233, label: "梁溪区" },
          { value: 2877, label: "新吴区" },
          { value: 1543, label: "江阴市" },
          { value: 2606, label: "宜兴市" }
        ]
      },
      {
        value: 148,
        label: "徐州市",
        children: [
          { value: 3368, label: "鼓楼区" },
          { value: 149, label: "云龙区" },
          { value: 2368, label: "贾汪区" },
          { value: 1984, label: "泉山区" },
          { value: 3369, label: "铜山区" },
          { value: 1032, label: "丰县" },
          { value: 1196, label: "沛县" },
          { value: 305, label: "睢宁县" },
          { value: 2306, label: "新沂市" },
          { value: 1986, label: "邳州市" }
        ]
      },
      {
        value: 652,
        label: "常州市",
        children: [
          { value: 1815, label: "天宁区" },
          { value: 767, label: "钟楼区" },
          { value: 653, label: "新北区" },
          { value: 754, label: "武进区" },
          { value: 3370, label: "金坛区" },
          { value: 2953, label: "溧阳市" }
        ]
      },
      {
        value: 182,
        label: "苏州市",
        children: [
          { value: 1858, label: "虎丘区" },
          { value: 1610, label: "吴中区" },
          { value: 456, label: "相城区" },
          { value: 183, label: "姑苏区" },
          { value: 3371, label: "吴江区" },
          { value: 744, label: "常熟市" },
          { value: 1478, label: "张家港市" },
          { value: 1673, label: "昆山市" },
          { value: 1334, label: "太仓市" }
        ]
      },
      {
        value: 22,
        label: "南通市",
        children: [
          { value: 2351, label: "崇川区" },
          { value: 225, label: "港闸区" },
          { value: 2918, label: "通州区" },
          { value: 2421, label: "如东县" },
          { value: 1614, label: "启东市" },
          { value: 170, label: "如皋市" },
          { value: 1095, label: "海门市" },
          { value: 3372, label: "海安市" }
        ]
      },
      {
        value: 502,
        label: "连云港市",
        children: [
          { value: 2244, label: "连云区" },
          { value: 965, label: "海州区" },
          { value: 3373, label: "赣榆区" },
          { value: 503, label: "东海县" },
          { value: 1102, label: "灌云县" },
          { value: 2178, label: "灌南县" }
        ]
      },
      {
        value: 592,
        label: "淮安市",
        children: [
          { value: 3374, label: "淮安区" },
          { value: 2334, label: "淮阴区" },
          { value: 3375, label: "清江浦区" },
          { value: 3376, label: "洪泽区" },
          { value: 711, label: "涟水县" },
          { value: 928, label: "盱眙县" },
          { value: 1933, label: "金湖县" }
        ]
      },
      {
        value: 30,
        label: "盐城市",
        children: [
          { value: 186, label: "亭湖区" },
          { value: 1861, label: "盐都区" },
          { value: 1091, label: "大丰区" },
          { value: 59, label: "响水县" },
          { value: 3047, label: "滨海县" },
          { value: 31, label: "阜宁县" },
          { value: 1731, label: "射阳县" },
          { value: 1049, label: "建湖县" },
          { value: 437, label: "东台市" }
        ]
      },
      {
        value: 16,
        label: "扬州市",
        children: [
          { value: 1230, label: "广陵区" },
          { value: 1488, label: "邗江区" },
          { value: 3377, label: "江都区" },
          { value: 316, label: "宝应县" },
          { value: 17, label: "仪征市" },
          { value: 558, label: "高邮市" }
        ]
      },
      {
        value: 535,
        label: "镇江市",
        children: [
          { value: 1169, label: "京口区" },
          { value: 1679, label: "润州区" },
          { value: 2714, label: "丹徒区" },
          { value: 2440, label: "丹阳市" },
          { value: 718, label: "扬中市" },
          { value: 536, label: "句容市" }
        ]
      },
      {
        value: 1020,
        label: "泰州市",
        children: [
          { value: 2064, label: "海陵区" },
          { value: 1021, label: "高港区" },
          { value: 3378, label: "姜堰区" },
          { value: 2408, label: "兴化市" },
          { value: 2876, label: "靖江市" },
          { value: 1604, label: "泰兴市" }
        ]
      },
      {
        value: 1228,
        label: "宿迁市",
        children: [
          { value: 1341, label: "宿城区" },
          { value: 2902, label: "宿豫区" },
          { value: 2663, label: "沭阳县" },
          { value: 1229, label: "泗阳县" },
          { value: 1873, label: "泗洪县" }
        ]
      }
    ]
  },
  {
    value: 32,
    label: "浙江省",
    children: [
      {
        value: 506,
        label: "杭州市",
        children: [
          { value: 2026, label: "上城区" },
          { value: 507, label: "下城区" },
          { value: 2978, label: "江干区" },
          { value: 973, label: "拱墅区" },
          { value: 3379, label: "西湖区" },
          { value: 2496, label: "滨江区" },
          { value: 981, label: "萧山区" },
          { value: 1303, label: "余杭区" },
          { value: 3380, label: "富阳区" },
          { value: 3381, label: "临安区" },
          { value: 2195, label: "桐庐县" },
          { value: 1821, label: "淳安县" },
          { value: 2971, label: "建德市" }
        ]
      },
      {
        value: 1003,
        label: "宁波市",
        children: [
          { value: 1453, label: "海曙区" },
          { value: 3382, label: "江北区" },
          { value: 2965, label: "北仑区" },
          { value: 2849, label: "镇海区" },
          { value: 2493, label: "鄞州区" },
          { value: 3383, label: "奉化区" },
          { value: 1692, label: "象山县" },
          { value: 1367, label: "宁海县" },
          { value: 1913, label: "余姚市" },
          { value: 1036, label: "慈溪市" }
        ]
      },
      {
        value: 127,
        label: "温州市",
        children: [
          { value: 1142, label: "鹿城区" },
          { value: 2661, label: "龙湾区" },
          { value: 620, label: "瓯海区" },
          { value: 3384, label: "洞头区" },
          { value: 2373, label: "永嘉县" },
          { value: 955, label: "平阳县" },
          { value: 1249, label: "苍南县" },
          { value: 1968, label: "文成县" },
          { value: 1284, label: "泰顺县" },
          { value: 1948, label: "瑞安市" },
          { value: 128, label: "乐清市" },
          { value: 3385, label: "龙港市" }
        ]
      },
      {
        value: 355,
        label: "嘉兴市",
        children: [
          { value: 1377, label: "南湖区" },
          { value: 901, label: "秀洲区" },
          { value: 1682, label: "嘉善县" },
          { value: 356, label: "海盐县" },
          { value: 2397, label: "海宁市" },
          { value: 2814, label: "平湖市" },
          { value: 618, label: "桐乡市" }
        ]
      },
      {
        value: 1306,
        label: "湖州市",
        children: [
          { value: 2469, label: "吴兴区" },
          { value: 3216, label: "南浔区" },
          { value: 2601, label: "德清县" },
          { value: 3124, label: "长兴县" },
          { value: 3155, label: "安吉县" }
        ]
      },
      {
        value: 551,
        label: "绍兴市",
        children: [
          { value: 552, label: "越城区" },
          { value: 3386, label: "柯桥区" },
          { value: 3387, label: "上虞区" },
          { value: 2218, label: "新昌县" },
          { value: 1075, label: "诸暨市" },
          { value: 3224, label: "嵊州市" }
        ]
      },
      {
        value: 352,
        label: "金华市",
        children: [
          { value: 1723, label: "婺城区" },
          { value: 2597, label: "金东区" },
          { value: 2330, label: "武义县" },
          { value: 1390, label: "浦江县" },
          { value: 1750, label: "磐安县" },
          { value: 1371, label: "兰溪市" },
          { value: 353, label: "义乌市" },
          { value: 2115, label: "东阳市" },
          { value: 996, label: "永康市" }
        ]
      },
      {
        value: 33,
        label: "衢州市",
        children: [
          { value: 1808, label: "柯城区" },
          { value: 1130, label: "衢江区" },
          { value: 2742, label: "常山县" },
          { value: 1349, label: "开化县" },
          { value: 34, label: "龙游县" },
          { value: 1512, label: "江山市" }
        ]
      },
      {
        value: 799,
        label: "舟山市",
        children: [
          { value: 1987, label: "定海区" },
          { value: 440, label: "普陀区" },
          { value: 800, label: "岱山县" },
          { value: 1633, label: "嵊泗县" }
        ]
      },
      {
        value: 1028,
        label: "台州市",
        children: [
          { value: 1421, label: "椒江区" },
          { value: 1506, label: "黄岩区" },
          { value: 1616, label: "路桥区" },
          { value: 2569, label: "三门县" },
          { value: 2888, label: "天台县" },
          { value: 2541, label: "仙居县" },
          { value: 2315, label: "温岭市" },
          { value: 1029, label: "临海市" },
          { value: 3388, label: "玉环市" }
        ]
      },
      {
        value: 863,
        label: "丽水市",
        children: [
          { value: 1810, label: "莲都区" },
          { value: 1897, label: "青田县" },
          { value: 2659, label: "缙云县" },
          { value: 2892, label: "遂昌县" },
          { value: 864, label: "松阳县" },
          { value: 1743, label: "云和县" },
          { value: 2954, label: "庆元县" },
          { value: 2349, label: "景宁畲族自治县" },
          { value: 2273, label: "龙泉市" }
        ]
      }
    ]
  },
  {
    value: 145,
    label: "安徽省",
    children: [
      {
        value: 447,
        label: "合肥市",
        children: [
          { value: 2191, label: "瑶海区" },
          { value: 1076, label: "庐阳区" },
          { value: 673, label: "蜀山区" },
          { value: 705, label: "包河区" },
          { value: 448, label: "长丰县" },
          { value: 2986, label: "肥东县" },
          { value: 654, label: "肥西县" },
          { value: 2771, label: "庐江县" },
          { value: 3389, label: "巢湖市" }
        ]
      },
      {
        value: 280,
        label: "芜湖市",
        children: [
          { value: 3140, label: "镜湖区" },
          { value: 2801, label: "弋江区" },
          { value: 633, label: "鸠江区" },
          { value: 2481, label: "三山区" },
          { value: 1544, label: "芜湖县" },
          { value: 1433, label: "繁昌县" },
          { value: 1462, label: "南陵县" },
          { value: 3390, label: "无为市" }
        ]
      },
      {
        value: 1277,
        label: "蚌埠市",
        children: [
          { value: 2335, label: "龙子湖区" },
          { value: 1899, label: "蚌山区" },
          { value: 1886, label: "禹会区" },
          { value: 2101, label: "淮上区" },
          { value: 1894, label: "怀远县" },
          { value: 2966, label: "五河县" },
          { value: 2865, label: "固镇县" }
        ]
      },
      {
        value: 146,
        label: "淮南市",
        children: [
          { value: 1908, label: "大通区" },
          { value: 768, label: "田家庵区" },
          { value: 147, label: "谢家集区" },
          { value: 599, label: "八公山区" },
          { value: 1868, label: "潘集区" },
          { value: 2237, label: "凤台县" },
          { value: 2121, label: "寿县" }
        ]
      },
      {
        value: 206,
        label: "马鞍山市",
        children: [
          { value: 207, label: "花山区" },
          { value: 2539, label: "雨山区" },
          { value: 3391, label: "博望区" },
          { value: 1157, label: "当涂县" },
          { value: 1237, label: "含山县" },
          { value: 597, label: "和县" }
        ]
      },
      {
        value: 317,
        label: "淮北市",
        children: [
          { value: 1841, label: "杜集区" },
          { value: 2015, label: "相山区" },
          { value: 318, label: "烈山区" },
          { value: 1892, label: "濉溪县" }
        ]
      },
      {
        value: 917,
        label: "铜陵市",
        children: [
          { value: 3392, label: "铜官区" },
          { value: 3393, label: "义安区" },
          { value: 807, label: "郊区" },
          { value: 1625, label: "枞阳县" }
        ]
      },
      {
        value: 195,
        label: "安庆市",
        children: [
          { value: 2558, label: "迎江区" },
          { value: 1254, label: "大观区" },
          { value: 2747, label: "宜秀区" },
          { value: 2346, label: "怀宁县" },
          { value: 1990, label: "太湖县" },
          { value: 1747, label: "宿松县" },
          { value: 196, label: "望江县" },
          { value: 2973, label: "岳西县" },
          { value: 2161, label: "桐城市" },
          { value: 3394, label: "潜山市" }
        ]
      },
      {
        value: 484,
        label: "黄山市",
        children: [
          { value: 1797, label: "屯溪区" },
          { value: 564, label: "黄山区" },
          { value: 485, label: "徽州区" },
          { value: 545, label: "歙县" },
          { value: 1597, label: "休宁县" },
          { value: 971, label: "黟县" },
          { value: 574, label: "祁门县" }
        ]
      },
      {
        value: 343,
        label: "滁州市",
        children: [
          { value: 589, label: "琅琊区" },
          { value: 1487, label: "南谯区" },
          { value: 1382, label: "来安县" },
          { value: 2897, label: "全椒县" },
          { value: 2264, label: "定远县" },
          { value: 2358, label: "凤阳县" },
          { value: 2760, label: "天长市" },
          { value: 753, label: "明光市" }
        ]
      },
      {
        value: 773,
        label: "阜阳市",
        children: [
          { value: 2740, label: "颍州区" },
          { value: 1472, label: "颍东区" },
          { value: 2934, label: "颍泉区" },
          { value: 1087, label: "临泉县" },
          { value: 774, label: "太和县" },
          { value: 1364, label: "阜南县" },
          { value: 2837, label: "颍上县" },
          { value: 2662, label: "界首市" }
        ]
      },
      {
        value: 1978,
        label: "宿州市",
        children: [
          { value: 2326, label: "埇桥区" },
          { value: 1979, label: "砀山县" },
          { value: 3163, label: "萧县" },
          { value: 2147, label: "灵璧县" },
          { value: 2382, label: "泗县" }
        ]
      },
      {
        value: 935,
        label: "六安市",
        children: [
          { value: 2648, label: "金安区" },
          { value: 1373, label: "裕安区" },
          { value: 3395, label: "叶集区" },
          { value: 2394, label: "霍邱县" },
          { value: 936, label: "舒城县" },
          { value: 2501, label: "金寨县" },
          { value: 1313, label: "霍山县" }
        ]
      },
      {
        value: 1937,
        label: "亳州市",
        children: [
          { value: 3138, label: "谯城区" },
          { value: 2523, label: "涡阳县" },
          { value: 2013, label: "蒙城县" },
          { value: 1938, label: "利辛县" }
        ]
      },
      {
        value: 1564,
        label: "池州市",
        children: [
          { value: 2271, label: "贵池区" },
          { value: 2107, label: "东至县" },
          { value: 3147, label: "石台县" },
          { value: 2353, label: "青阳县" }
        ]
      },
      {
        value: 344,
        label: "宣城市",
        children: [
          { value: 904, label: "宣州区" },
          { value: 345, label: "郎溪县" },
          { value: 1220, label: "泾县" },
          { value: 509, label: "绩溪县" },
          { value: 1702, label: "旌德县" },
          { value: 1385, label: "宁国市" },
          { value: 3396, label: "广德市" }
        ]
      }
    ]
  },
  {
    value: 65,
    label: "福建省",
    children: [
      {
        value: 779,
        label: "福州市",
        children: [
          { value: 3397, label: "鼓楼区" },
          { value: 780, label: "台江区" },
          { value: 2737, label: "仓山区" },
          { value: 2254, label: "马尾区" },
          { value: 1865, label: "晋安区" },
          { value: 3398, label: "长乐区" },
          { value: 2491, label: "闽侯县" },
          { value: 2298, label: "连江县" },
          { value: 1818, label: "罗源县" },
          { value: 2100, label: "闽清县" },
          { value: 3180, label: "永泰县" },
          { value: 1069, label: "平潭县" },
          { value: 1689, label: "福清市" }
        ]
      },
      {
        value: 497,
        label: "厦门市",
        children: [
          { value: 1388, label: "思明区" },
          { value: 498, label: "海沧区" },
          { value: 3011, label: "湖里区" },
          { value: 1970, label: "集美区" },
          { value: 679, label: "同安区" },
          { value: 2327, label: "翔安区" }
        ]
      },
      {
        value: 2577,
        label: "莆田市",
        children: [
          { value: 2794, label: "城厢区" },
          { value: 3035, label: "涵江区" },
          { value: 2626, label: "荔城区" },
          { value: 3145, label: "秀屿区" },
          { value: 2804, label: "仙游县" }
        ]
      },
      {
        value: 66,
        label: "三明市",
        children: [
          { value: 3082, label: "梅列区" },
          { value: 1208, label: "三元区" },
          { value: 1153, label: "明溪县" },
          { value: 1520, label: "清流县" },
          { value: 1372, label: "宁化县" },
          { value: 2369, label: "大田县" },
          { value: 67, label: "尤溪县" },
          { value: 427, label: "沙县" },
          { value: 235, label: "将乐县" },
          { value: 3012, label: "泰宁县" },
          { value: 3019, label: "建宁县" },
          { value: 2526, label: "永安市" }
        ]
      },
      {
        value: 104,
        label: "泉州市",
        children: [
          { value: 1134, label: "鲤城区" },
          { value: 105, label: "丰泽区" },
          { value: 130, label: "洛江区" },
          { value: 2372, label: "泉港区" },
          { value: 2322, label: "惠安县" },
          { value: 2194, label: "安溪县" },
          { value: 2537, label: "永春县" },
          { value: 853, label: "德化县" },
          { value: 2932, label: "金门县" },
          { value: 228, label: "石狮市" },
          { value: 1836, label: "晋江市" },
          { value: 1270, label: "南安市" }
        ]
      },
      {
        value: 107,
        label: "漳州市",
        children: [
          { value: 1256, label: "芗城区" },
          { value: 2917, label: "龙文区" },
          { value: 1950, label: "云霄县" },
          { value: 1773, label: "漳浦县" },
          { value: 1941, label: "诏安县" },
          { value: 108, label: "长泰县" },
          { value: 2560, label: "东山县" },
          { value: 2099, label: "南靖县" },
          { value: 1278, label: "平和县" },
          { value: 655, label: "华安县" },
          { value: 2472, label: "龙海市" }
        ]
      },
      {
        value: 171,
        label: "南平市",
        children: [
          { value: 2128, label: "延平区" },
          { value: 3399, label: "建阳区" },
          { value: 1039, label: "顺昌县" },
          { value: 1096, label: "浦城县" },
          { value: 172, label: "光泽县" },
          { value: 2274, label: "松溪县" },
          { value: 2967, label: "政和县" },
          { value: 402, label: "邵武市" },
          { value: 1656, label: "武夷山市" },
          { value: 2649, label: "建瓯市" }
        ]
      },
      {
        value: 553,
        label: "龙岩市",
        children: [
          { value: 554, label: "新罗区" },
          { value: 3400, label: "永定区" },
          { value: 2429, label: "长汀县" },
          { value: 3046, label: "上杭县" },
          { value: 1143, label: "武平县" },
          { value: 3171, label: "连城县" },
          { value: 2388, label: "漳平市" }
        ]
      },
      {
        value: 714,
        label: "宁德市",
        children: [
          { value: 1027, label: "蕉城区" },
          { value: 715, label: "霞浦县" },
          { value: 1895, label: "古田县" },
          { value: 2647, label: "屏南县" },
          { value: 1534, label: "寿宁县" },
          { value: 2751, label: "周宁县" },
          { value: 2894, label: "柘荣县" },
          { value: 1508, label: "福安市" },
          { value: 2052, label: "福鼎市" }
        ]
      }
    ]
  },
  {
    value: 74,
    label: "江西省",
    children: [
      {
        value: 282,
        label: "南昌市",
        children: [
          { value: 2340, label: "东湖区" },
          { value: 1674, label: "西湖区" },
          { value: 2627, label: "青云谱区" },
          { value: 1767, label: "青山湖区" },
          { value: 3401, label: "新建区" },
          { value: 3402, label: "红谷滩区" },
          { value: 1983, label: "南昌县" },
          { value: 3045, label: "安义县" },
          { value: 741, label: "进贤县" }
        ]
      },
      {
        value: 219,
        label: "景德镇市",
        children: [
          { value: 1222, label: "昌江区" },
          { value: 220, label: "珠山区" },
          { value: 426, label: "浮梁县" },
          { value: 2245, label: "乐平市" }
        ]
      },
      {
        value: 215,
        label: "萍乡市",
        children: [
          { value: 1145, label: "安源区" },
          { value: 1559, label: "湘东区" },
          { value: 1101, label: "莲花县" },
          { value: 1648, label: "上栗县" },
          { value: 216, label: "芦溪县" }
        ]
      },
      {
        value: 310,
        label: "九江市",
        children: [
          { value: 3403, label: "濂溪区" },
          { value: 2240, label: "浔阳区" },
          { value: 3404, label: "柴桑区" },
          { value: 1009, label: "武宁县" },
          { value: 3052, label: "修水县" },
          { value: 738, label: "永修县" },
          { value: 1253, label: "德安县" },
          { value: 793, label: "都昌县" },
          { value: 511, label: "湖口县" },
          { value: 2348, label: "彭泽县" },
          { value: 2725, label: "瑞昌市" },
          { value: 3405, label: "共青城市" },
          { value: 311, label: "庐山市" }
        ]
      },
      {
        value: 252,
        label: "新余市",
        children: [
          { value: 2893, label: "渝水区" },
          { value: 253, label: "分宜县" }
        ]
      },
      {
        value: 549,
        label: "鹰潭市",
        children: [
          { value: 2667, label: "月湖区" },
          { value: 3406, label: "余江区" },
          { value: 550, label: "贵溪市" }
        ]
      },
      {
        value: 379,
        label: "赣州市",
        children: [
          { value: 1876, label: "章贡区" },
          { value: 3407, label: "南康区" },
          { value: 3408, label: "赣县区" },
          { value: 3149, label: "信丰县" },
          { value: 380, label: "大余县" },
          { value: 1355, label: "上犹县" },
          { value: 1612, label: "崇义县" },
          { value: 1605, label: "安远县" },
          { value: 1708, label: "龙南县" },
          { value: 1384, label: "定南县" },
          { value: 1862, label: "全南县" },
          { value: 2754, label: "宁都县" },
          { value: 2378, label: "于都县" },
          { value: 2311, label: "兴国县" },
          { value: 1449, label: "会昌县" },
          { value: 3062, label: "寻乌县" },
          { value: 1881, label: "石城县" },
          { value: 1152, label: "瑞金市" }
        ]
      },
      {
        value: 681,
        label: "吉安市",
        children: [
          { value: 3233, label: "吉州区" },
          { value: 3218, label: "青原区" },
          { value: 2573, label: "吉安县" },
          { value: 1403, label: "吉水县" },
          { value: 2719, label: "峡江县" },
          { value: 1267, label: "新干县" },
          { value: 682, label: "永丰县" },
          { value: 1622, label: "泰和县" },
          { value: 3040, label: "遂川县" },
          { value: 874, label: "万安县" },
          { value: 1710, label: "安福县" },
          { value: 2486, label: "永新县" },
          { value: 969, label: "井冈山市" }
        ]
      },
      {
        value: 393,
        label: "宜春市",
        children: [
          { value: 1860, label: "袁州区" },
          { value: 2387, label: "奉新县" },
          { value: 985, label: "万载县" },
          { value: 3409, label: "上高县" },
          { value: 2138, label: "宜丰县" },
          { value: 394, label: "靖安县" },
          { value: 2782, label: "铜鼓县" },
          { value: 1204, label: "丰城市" },
          { value: 2087, label: "樟树市" },
          { value: 3095, label: "高安市" }
        ]
      },
      {
        value: 75,
        label: "抚州市",
        children: [
          { value: 735, label: "临川区" },
          { value: 3410, label: "东乡区" },
          { value: 2078, label: "南城县" },
          { value: 2316, label: "黎川县" },
          { value: 2276, label: "南丰县" },
          { value: 441, label: "崇仁县" },
          { value: 2253, label: "乐安县" },
          { value: 1775, label: "宜黄县" },
          { value: 76, label: "金溪县" },
          { value: 2338, label: "资溪县" },
          { value: 628, label: "广昌县" }
        ]
      },
      {
        value: 188,
        label: "上饶市",
        children: [
          { value: 1147, label: "信州区" },
          { value: 3411, label: "广丰区" },
          { value: 3412, label: "广信区" },
          { value: 2239, label: "玉山县" },
          { value: 2521, label: "铅山县" },
          { value: 1518, label: "横峰县" },
          { value: 189, label: "弋阳县" },
          { value: 1476, label: "余干县" },
          { value: 2442, label: "鄱阳县" },
          { value: 199, label: "万年县" },
          { value: 1386, label: "婺源县" },
          { value: 1125, label: "德兴市" }
        ]
      }
    ]
  },
  {
    value: 71,
    label: "山东省",
    children: [
      {
        value: 176,
        label: "济南市",
        children: [
          { value: 3229, label: "历下区" },
          { value: 3413, label: "市中区" },
          { value: 2955, label: "槐荫区" },
          { value: 3022, label: "天桥区" },
          { value: 1569, label: "历城区" },
          { value: 1368, label: "长清区" },
          { value: 3414, label: "章丘区" },
          { value: 3415, label: "济阳区" },
          { value: 3416, label: "莱芜区" },
          { value: 2815, label: "钢城区" },
          { value: 2842, label: "平阴县" },
          { value: 1730, label: "商河县" }
        ]
      },
      {
        value: 376,
        label: "青岛市",
        children: [
          { value: 2519, label: "市南区" },
          { value: 1328, label: "市北区" },
          { value: 2061, label: "黄岛区" },
          { value: 2422, label: "崂山区" },
          { value: 1514, label: "李沧区" },
          { value: 3234, label: "城阳区" },
          { value: 3417, label: "即墨区" },
          { value: 377, label: "胶州市" },
          { value: 2507, label: "平度市" },
          { value: 2644, label: "莱西市" }
        ]
      },
      {
        value: 72,
        label: "淄博市",
        children: [
          { value: 2055, label: "淄川区" },
          { value: 1857, label: "张店区" },
          { value: 1758, label: "博山区" },
          { value: 1338, label: "临淄区" },
          { value: 2207, label: "周村区" },
          { value: 73, label: "桓台县" },
          { value: 1686, label: "高青县" },
          { value: 2412, label: "沂源县" }
        ]
      },
      {
        value: 561,
        label: "枣庄市",
        children: [
          { value: 3418, label: "市中区" },
          { value: 3053, label: "薛城区" },
          { value: 2153, label: "峄城区" },
          { value: 3419, label: "台儿庄区" },
          { value: 752, label: "山亭区" },
          { value: 2379, label: "滕州市" }
        ]
      },
      {
        value: 83,
        label: "东营市",
        children: [
          { value: 84, label: "东营区" },
          { value: 1261, label: "河口区" },
          { value: 3420, label: "垦利区" },
          { value: 1500, label: "利津县" },
          { value: 2228, label: "广饶县" }
        ]
      },
      {
        value: 241,
        label: "烟台市",
        children: [
          { value: 2337, label: "芝罘区" },
          { value: 1807, label: "福山区" },
          { value: 1915, label: "牟平区" },
          { value: 1442, label: "莱山区" },
          { value: 1562, label: "长岛县" },
          { value: 2508, label: "龙口市" },
          { value: 3067, label: "莱阳市" },
          { value: 1910, label: "莱州市" },
          { value: 2309, label: "蓬莱市" },
          { value: 242, label: "招远市" },
          { value: 921, label: "栖霞市" },
          { value: 3201, label: "海阳市" }
        ]
      },
      {
        value: 467,
        label: "潍坊市",
        children: [
          { value: 2219, label: "潍城区" },
          { value: 1547, label: "寒亭区" },
          { value: 613, label: "坊子区" },
          { value: 2880, label: "奎文区" },
          { value: 468, label: "临朐县" },
          { value: 1352, label: "昌乐县" },
          { value: 3075, label: "青州市" },
          { value: 2063, label: "诸城市" },
          { value: 3122, label: "寿光市" },
          { value: 2574, label: "安丘市" },
          { value: 2074, label: "高密市" },
          { value: 1420, label: "昌邑市" }
        ]
      },
      {
        value: 371,
        label: "济宁市",
        children: [
          { value: 880, label: "任城区" },
          { value: 3421, label: "兖州区" },
          { value: 2473, label: "微山县" },
          { value: 1086, label: "鱼台县" },
          { value: 846, label: "金乡县" },
          { value: 372, label: "嘉祥县" },
          { value: 1839, label: "汶上县" },
          { value: 1285, label: "泗水县" },
          { value: 2044, label: "梁山县" },
          { value: 3161, label: "曲阜市" },
          { value: 2068, label: "邹城市" }
        ]
      },
      {
        value: 460,
        label: "泰安市",
        children: [
          { value: 2277, label: "泰山区" },
          { value: 1370, label: "岱岳区" },
          { value: 461, label: "宁阳县" },
          { value: 887, label: "东平县" },
          { value: 3137, label: "新泰市" },
          { value: 1505, label: "肥城市" }
        ]
      },
      {
        value: 1834,
        label: "威海市",
        children: [
          { value: 3107, label: "环翠区" },
          { value: 3422, label: "文登区" },
          { value: 1835, label: "荣成市" },
          { value: 2279, label: "乳山市" }
        ]
      },
      {
        value: 223,
        label: "日照市",
        children: [
          { value: 224, label: "东港区" },
          { value: 1840, label: "岚山区" },
          { value: 2671, label: "五莲县" },
          { value: 1090, label: "莒县" }
        ]
      },
      {
        value: 435,
        label: "临沂市",
        children: [
          { value: 474, label: "兰山区" },
          { value: 1376, label: "罗庄区" },
          { value: 1327, label: "河东区" },
          { value: 3223, label: "沂南县" },
          { value: 444, label: "郯城县" },
          { value: 839, label: "沂水县" },
          { value: 3423, label: "兰陵县" },
          { value: 3235, label: "费县" },
          { value: 2853, label: "平邑县" },
          { value: 436, label: "莒南县" },
          { value: 2682, label: "蒙阴县" },
          { value: 2123, label: "临沭县" }
        ]
      },
      {
        value: 630,
        label: "德州市",
        children: [
          { value: 1626, label: "德城区" },
          { value: 3424, label: "陵城区" },
          { value: 631, label: "宁津县" },
          { value: 1501, label: "庆云县" },
          { value: 742, label: "临邑县" },
          { value: 1771, label: "齐河县" },
          { value: 2454, label: "平原县" },
          { value: 2563, label: "夏津县" },
          { value: 1450, label: "武城县" },
          { value: 2367, label: "乐陵市" },
          { value: 784, label: "禹城市" }
        ]
      },
      {
        value: 340,
        label: "聊城市",
        children: [
          { value: 2280, label: "东昌府区" },
          { value: 3425, label: "茌平区" },
          { value: 1845, label: "阳谷县" },
          { value: 2841, label: "莘县" },
          { value: 1709, label: "东阿县" },
          { value: 627, label: "冠县" },
          { value: 2360, label: "高唐县" },
          { value: 341, label: "临清市" }
        ]
      },
      {
        value: 332,
        label: "滨州市",
        children: [
          { value: 333, label: "滨城区" },
          { value: 3426, label: "沾化区" },
          { value: 2492, label: "惠民县" },
          { value: 3094, label: "阳信县" },
          { value: 1646, label: "无棣县" },
          { value: 2299, label: "博兴县" },
          { value: 3427, label: "邹平市" }
        ]
      },
      {
        value: 590,
        label: "菏泽市",
        children: [
          { value: 1791, label: "牡丹区" },
          { value: 3428, label: "定陶区" },
          { value: 2639, label: "曹县" },
          { value: 2576, label: "单县" },
          { value: 2985, label: "成武县" },
          { value: 1008, label: "巨野县" },
          { value: 2960, label: "郓城县" },
          { value: 591, label: "鄄城县" },
          { value: 1255, label: "东明县" }
        ]
      }
    ]
  },
  {
    value: 68,
    label: "河南省",
    children: [
      {
        value: 237,
        label: "郑州市",
        children: [
          { value: 2252, label: "中原区" },
          { value: 2618, label: "二七区" },
          { value: 911, label: "管城回族区" },
          { value: 781, label: "金水区" },
          { value: 1170, label: "上街区" },
          { value: 1988, label: "惠济区" },
          { value: 238, label: "中牟县" },
          { value: 1031, label: "巩义市" },
          { value: 2797, label: "荥阳市" },
          { value: 1756, label: "新密市" },
          { value: 1792, label: "新郑市" },
          { value: 455, label: "登封市" }
        ]
      },
      {
        value: 236,
        label: "开封市",
        children: [
          { value: 1880, label: "龙亭区" },
          { value: 3429, label: "顺河回族区" },
          { value: 1288, label: "鼓楼区" },
          { value: 611, label: "禹王台区" },
          { value: 3430, label: "祥符区" },
          { value: 2021, label: "杞县" },
          { value: 2081, label: "通许县" },
          { value: 2257, label: "尉氏县" },
          { value: 1954, label: "兰考县" }
        ]
      },
      {
        value: 211,
        label: "洛阳市",
        children: [
          { value: 1511, label: "老城区" },
          { value: 2462, label: "西工区" },
          { value: 3431, label: "瀍河回族区" },
          { value: 3091, label: "涧西区" },
          { value: 2867, label: "吉利区" },
          { value: 3002, label: "洛龙区" },
          { value: 1939, label: "孟津县" },
          { value: 1944, label: "新安县" },
          { value: 1657, label: "栾川县" },
          { value: 2875, label: "嵩县" },
          { value: 1816, label: "汝阳县" },
          { value: 2572, label: "宜阳县" },
          { value: 1920, label: "洛宁县" },
          { value: 776, label: "伊川县" },
          { value: 546, label: "偃师市" }
        ]
      },
      {
        value: 325,
        label: "平顶山市",
        children: [
          { value: 443, label: "新华区" },
          { value: 1563, label: "卫东区" },
          { value: 2423, label: "石龙区" },
          { value: 2693, label: "湛河区" },
          { value: 2134, label: "宝丰县" },
          { value: 1197, label: "叶县" },
          { value: 825, label: "鲁山县" },
          { value: 563, label: "郏县" },
          { value: 2840, label: "舞钢市" },
          { value: 1853, label: "汝州市" }
        ]
      },
      {
        value: 89,
        label: "安阳市",
        children: [
          { value: 2385, label: "文峰区" },
          { value: 1477, label: "北关区" },
          { value: 956, label: "殷都区" },
          { value: 2399, label: "龙安区" },
          { value: 1072, label: "安阳县" },
          { value: 1738, label: "汤阴县" },
          { value: 695, label: "滑县" },
          { value: 576, label: "内黄县" },
          { value: 90, label: "林州市" }
        ]
      },
      {
        value: 3265,
        label: "鹤壁市",
        children: [
          { value: 1126, label: "鹤山区" },
          { value: 2053, label: "山城区" },
          { value: 1160, label: "淇滨区" },
          { value: 422, label: "浚县" },
          { value: 635, label: "淇县" }
        ]
      },
      {
        value: 389,
        label: "新乡市",
        children: [
          { value: 2909, label: "红旗区" },
          { value: 2432, label: "卫滨区" },
          { value: 390, label: "凤泉区" },
          { value: 3193, label: "牧野区" },
          { value: 2899, label: "新乡县" },
          { value: 1736, label: "获嘉县" },
          { value: 2344, label: "原阳县" },
          { value: 808, label: "延津县" },
          { value: 1672, label: "封丘县" },
          { value: 3188, label: "卫辉市" },
          { value: 2461, label: "辉县市" },
          { value: 3432, label: "长垣市" }
        ]
      },
      {
        value: 1198,
        label: "焦作市",
        children: [
          { value: 1209, label: "解放区" },
          { value: 1199, label: "中站区" },
          { value: 1326, label: "马村区" },
          { value: 2991, label: "山阳区" },
          { value: 1276, label: "修武县" },
          { value: 2386, label: "博爱县" },
          { value: 3110, label: "武陟县" },
          { value: 2184, label: "温县" },
          { value: 2666, label: "沁阳市" },
          { value: 2901, label: "孟州市" }
        ]
      },
      {
        value: 221,
        label: "濮阳市",
        children: [
          { value: 2941, label: "华龙区" },
          { value: 1459, label: "清丰县" },
          { value: 2833, label: "南乐县" },
          { value: 222, label: "范县" },
          { value: 1213, label: "台前县" },
          { value: 2810, label: "濮阳县" }
        ]
      },
      {
        value: 883,
        label: "许昌市",
        children: [
          { value: 2557, label: "魏都区" },
          { value: 3433, label: "建安区" },
          { value: 2088, label: "鄢陵县" },
          { value: 2391, label: "襄城县" },
          { value: 2604, label: "禹州市" },
          { value: 975, label: "长葛市" }
        ]
      },
      {
        value: 463,
        label: "漯河市",
        children: [
          { value: 1627, label: "源汇区" },
          { value: 3125, label: "郾城区" },
          { value: 2673, label: "召陵区" },
          { value: 464, label: "舞阳县" },
          { value: 1532, label: "临颍县" }
        ]
      },
      {
        value: 1193,
        label: "三门峡市",
        children: [
          { value: 2193, label: "湖滨区" },
          { value: 3434, label: "陕州区" },
          { value: 1583, label: "渑池县" },
          { value: 2467, label: "卢氏县" },
          { value: 1685, label: "义马市" },
          { value: 1946, label: "灵宝市" }
        ]
      },
      {
        value: 69,
        label: "南阳市",
        children: [
          { value: 1635, label: "宛城区" },
          { value: 3214, label: "卧龙区" },
          { value: 3197, label: "南召县" },
          { value: 1530, label: "方城县" },
          { value: 2763, label: "西峡县" },
          { value: 1765, label: "镇平县" },
          { value: 1855, label: "内乡县" },
          { value: 860, label: "淅川县" },
          { value: 1688, label: "社旗县" },
          { value: 833, label: "唐河县" },
          { value: 3189, label: "新野县" },
          { value: 910, label: "桐柏县" },
          { value: 70, label: "邓州市" }
        ]
      },
      {
        value: 404,
        label: "商丘市",
        children: [
          { value: 3132, label: "梁园区" },
          { value: 3103, label: "睢阳区" },
          { value: 548, label: "民权县" },
          { value: 478, label: "睢县" },
          { value: 573, label: "宁陵县" },
          { value: 1203, label: "柘城县" },
          { value: 405, label: "虞城县" },
          { value: 2120, label: "夏邑县" },
          { value: 916, label: "永城市" }
        ]
      },
      {
        value: 661,
        label: "信阳市",
        children: [
          { value: 2585, label: "浉河区" },
          { value: 662, label: "平桥区" },
          { value: 1038, label: "罗山县" },
          { value: 2393, label: "光山县" },
          { value: 1241, label: "新县" },
          { value: 2031, label: "商城县" },
          { value: 2529, label: "固始县" },
          { value: 2202, label: "潢川县" },
          { value: 3030, label: "淮滨县" },
          { value: 1292, label: "息县" }
        ]
      },
      {
        value: 525,
        label: "周口市",
        children: [
          { value: 747, label: "川汇区" },
          { value: 3435, label: "淮阳区" },
          { value: 526, label: "扶沟县" },
          { value: 1015, label: "西华县" },
          { value: 3115, label: "商水县" },
          { value: 2285, label: "沈丘县" },
          { value: 1269, label: "郸城县" },
          { value: 2813, label: "太康县" },
          { value: 622, label: "鹿邑县" },
          { value: 2992, label: "项城市" }
        ]
      },
      {
        value: 837,
        label: "驻马店市",
        children: [
          { value: 1902, label: "驿城区" },
          { value: 1924, label: "西平县" },
          { value: 862, label: "上蔡县" },
          { value: 3076, label: "平舆县" },
          { value: 2638, label: "正阳县" },
          { value: 3105, label: "确山县" },
          { value: 1104, label: "泌阳县" },
          { value: 3436, label: "汝南县" },
          { value: 2200, label: "遂平县" },
          { value: 838, label: "新蔡县" }
        ]
      },
      {
        value: 3569,
        label: "省直辖县级行政单位",
        children: [{ value: 3249, label: "济源市" }]
      }
    ]
  },
  {
    value: 62,
    label: "湖北省",
    children: [
      {
        value: 63,
        label: "武汉市",
        children: [
          { value: 1503, label: "江岸区" },
          { value: 64, label: "江汉区" },
          { value: 1348, label: "硚口区" },
          { value: 3055, label: "汉阳区" },
          { value: 2668, label: "武昌区" },
          { value: 827, label: "青山区" },
          { value: 2786, label: "洪山区" },
          { value: 3117, label: "东西湖区" },
          { value: 931, label: "汉南区" },
          { value: 1893, label: "蔡甸区" },
          { value: 2105, label: "江夏区" },
          { value: 677, label: "黄陂区" },
          { value: 2080, label: "新洲区" }
        ]
      },
      {
        value: 451,
        label: "黄石市",
        children: [
          { value: 3160, label: "黄石港区" },
          { value: 1058, label: "西塞山区" },
          { value: 1935, label: "下陆区" },
          { value: 452, label: "铁山区" },
          { value: 617, label: "阳新县" },
          { value: 3118, label: "大冶市" }
        ]
      },
      {
        value: 391,
        label: "十堰市",
        children: [
          { value: 2912, label: "茅箭区" },
          { value: 2406, label: "张湾区" },
          { value: 3437, label: "郧阳区" },
          { value: 1010, label: "郧西县" },
          { value: 1322, label: "竹山县" },
          { value: 2586, label: "竹溪县" },
          { value: 2657, label: "房县" },
          { value: 420, label: "丹江口市" }
        ]
      },
      {
        value: 85,
        label: "宜昌市",
        children: [
          { value: 2881, label: "西陵区" },
          { value: 2062, label: "伍家岗区" },
          { value: 86, label: "点军区" },
          { value: 547, label: "猇亭区" },
          { value: 612, label: "夷陵区" },
          { value: 106, label: "远安县" },
          { value: 2231, label: "兴山县" },
          { value: 1247, label: "秭归县" },
          { value: 1094, label: "长阳土家族自治县" },
          { value: 2112, label: "五峰土家族自治县" },
          { value: 2759, label: "宜都市" },
          { value: 1706, label: "当阳市" },
          { value: 2697, label: "枝江市" }
        ]
      },
      {
        value: 3266,
        label: "襄阳市",
        children: [
          { value: 641, label: "襄城区" },
          { value: 299, label: "樊城区" },
          { value: 3438, label: "襄州区" },
          { value: 315, label: "南漳县" },
          { value: 2543, label: "谷城县" },
          { value: 1931, label: "保康县" },
          { value: 1082, label: "老河口市" },
          { value: 1590, label: "枣阳市" },
          { value: 1332, label: "宜城市" }
        ]
      },
      {
        value: 125,
        label: "鄂州市",
        children: [
          { value: 1675, label: "梁子湖区" },
          { value: 2048, label: "华容区" },
          { value: 126, label: "鄂城区" }
        ]
      },
      {
        value: 648,
        label: "荆门市",
        children: [
          { value: 649, label: "东宝区" },
          { value: 1360, label: "掇刀区" },
          { value: 2561, label: "沙洋县" },
          { value: 2495, label: "钟祥市" },
          { value: 3439, label: "京山市" }
        ]
      },
      {
        value: 906,
        label: "孝感市",
        children: [
          { value: 2457, label: "孝南区" },
          { value: 1644, label: "孝昌县" },
          { value: 2995, label: "大悟县" },
          { value: 1474, label: "云梦县" },
          { value: 907, label: "应城市" },
          { value: 1571, label: "安陆市" },
          { value: 2067, label: "汉川市" }
        ]
      },
      {
        value: 787,
        label: "荆州市",
        children: [
          { value: 1207, label: "沙市区" },
          { value: 1932, label: "荆州区" },
          { value: 858, label: "公安县" },
          { value: 3159, label: "监利县" },
          { value: 2419, label: "江陵县" },
          { value: 2361, label: "石首市" },
          { value: 1517, label: "洪湖市" },
          { value: 2143, label: "松滋市" }
        ]
      },
      {
        value: 418,
        label: "黄冈市",
        children: [
          { value: 3178, label: "黄州区" },
          { value: 2452, label: "团风县" },
          { value: 1697, label: "红安县" },
          { value: 2375, label: "罗田县" },
          { value: 2468, label: "英山县" },
          { value: 1817, label: "浠水县" },
          { value: 1741, label: "蕲春县" },
          { value: 2266, label: "黄梅县" },
          { value: 419, label: "麻城市" },
          { value: 2646, label: "武穴市" }
        ]
      },
      {
        value: 537,
        label: "咸宁市",
        children: [
          { value: 538, label: "咸安区" },
          { value: 952, label: "嘉鱼县" },
          { value: 707, label: "通城县" },
          { value: 3158, label: "崇阳县" },
          { value: 811, label: "通山县" },
          { value: 1969, label: "赤壁市" }
        ]
      },
      {
        value: 1683,
        label: "随州市",
        children: [
          { value: 1684, label: "曾都区" },
          { value: 3440, label: "随县" },
          { value: 2871, label: "广水市" }
        ]
      },
      {
        value: 686,
        label: "恩施土家族苗族自治州",
        children: [
          { value: 687, label: "恩施市" },
          { value: 1634, label: "利川市" },
          { value: 2705, label: "建始县" },
          { value: 3099, label: "巴东县" },
          { value: 1429, label: "宣恩县" },
          { value: 2750, label: "咸丰县" },
          { value: 1081, label: "来凤县" },
          { value: 1408, label: "鹤峰县" }
        ]
      },
      {
        value: 3568,
        label: "省直辖县级行政单位",
        children: [
          { value: 3253, label: "仙桃市" },
          { value: 3262, label: "潜江市" },
          { value: 3263, label: "天门市" },
          { value: 3259, label: "神农架林区" }
        ]
      }
    ]
  },
  {
    value: 48,
    label: "湖南省",
    children: [
      {
        value: 131,
        label: "长沙市",
        children: [
          { value: 234, label: "芙蓉区" },
          { value: 2788, label: "天心区" },
          { value: 980, label: "岳麓区" },
          { value: 1444, label: "开福区" },
          { value: 132, label: "雨花区" },
          { value: 3441, label: "望城区" },
          { value: 2036, label: "长沙县" },
          { value: 1471, label: "浏阳市" },
          { value: 3442, label: "宁乡市" }
        ]
      },
      {
        value: 49,
        label: "株洲市",
        children: [
          { value: 2290, label: "荷塘区" },
          { value: 50, label: "芦淞区" },
          { value: 820, label: "石峰区" },
          { value: 634, label: "天元区" },
          { value: 3443, label: "渌口区" },
          { value: 2152, label: "攸县" },
          { value: 2086, label: "茶陵县" },
          { value: 1300, label: "炎陵县" },
          { value: 2685, label: "醴陵市" }
        ]
      },
      {
        value: 81,
        label: "湘潭市",
        children: [
          { value: 2831, label: "雨湖区" },
          { value: 144, label: "岳塘区" },
          { value: 82, label: "湘潭县" },
          { value: 559, label: "湘乡市" },
          { value: 1638, label: "韶山市" }
        ]
      },
      {
        value: 430,
        label: "衡阳市",
        children: [
          { value: 1127, label: "珠晖区" },
          { value: 2242, label: "雁峰区" },
          { value: 2166, label: "石鼓区" },
          { value: 2746, label: "蒸湘区" },
          { value: 1728, label: "南岳区" },
          { value: 2957, label: "衡阳县" },
          { value: 2683, label: "衡南县" },
          { value: 2536, label: "衡山县" },
          { value: 1737, label: "衡东县" },
          { value: 431, label: "祁东县" },
          { value: 2753, label: "耒阳市" },
          { value: 746, label: "常宁市" }
        ]
      },
      {
        value: 702,
        label: "邵阳市",
        children: [
          { value: 3026, label: "双清区" },
          { value: 1244, label: "大祥区" },
          { value: 3127, label: "北塔区" },
          { value: 2792, label: "新邵县" },
          { value: 1011, label: "邵阳县" },
          { value: 1057, label: "隆回县" },
          { value: 703, label: "洞口县" },
          { value: 2504, label: "绥宁县" },
          { value: 2820, label: "新宁县" },
          { value: 3444, label: "城步苗族自治县" },
          { value: 1901, label: "武冈市" },
          { value: 1404, label: "邵东市" }
        ]
      },
      {
        value: 615,
        label: "岳阳市",
        children: [
          { value: 1182, label: "岳阳楼区" },
          { value: 2241, label: "云溪区" },
          { value: 2127, label: "君山区" },
          { value: 2540, label: "岳阳县" },
          { value: 1519, label: "华容县" },
          { value: 2756, label: "湘阴县" },
          { value: 3096, label: "平江县" },
          { value: 616, label: "汨罗市" },
          { value: 739, label: "临湘市" }
        ]
      },
      {
        value: 244,
        label: "常德市",
        children: [
          { value: 1724, label: "武陵区" },
          { value: 1615, label: "鼎城区" },
          { value: 544, label: "安乡县" },
          { value: 2870, label: "汉寿县" },
          { value: 1139, label: "澧县" },
          { value: 2911, label: "临澧县" },
          { value: 245, label: "桃源县" },
          { value: 1166, label: "石门县" },
          { value: 2607, label: "津市市" }
        ]
      },
      {
        value: 817,
        label: "张家界市",
        children: [
          { value: 1357, label: "永定区" },
          { value: 2775, label: "武陵源区" },
          { value: 818, label: "慈利县" },
          { value: 1991, label: "桑植县" }
        ]
      },
      {
        value: 365,
        label: "益阳市",
        children: [
          { value: 2816, label: "资阳区" },
          { value: 2925, label: "赫山区" },
          { value: 698, label: "南县" },
          { value: 491, label: "桃江县" },
          { value: 2658, label: "安化县" },
          { value: 2051, label: "沅江市" }
        ]
      },
      {
        value: 202,
        label: "郴州市",
        children: [
          { value: 1291, label: "北湖区" },
          { value: 903, label: "苏仙区" },
          { value: 2347, label: "桂阳县" },
          { value: 203, label: "宜章县" },
          { value: 2687, label: "永兴县" },
          { value: 417, label: "嘉禾县" },
          { value: 1467, label: "临武县" },
          { value: 1124, label: "汝城县" },
          { value: 584, label: "桂东县" },
          { value: 1900, label: "安仁县" },
          { value: 815, label: "资兴市" }
        ]
      },
      {
        value: 161,
        label: "永州市",
        children: [
          { value: 2208, label: "零陵区" },
          { value: 2332, label: "冷水滩区" },
          { value: 757, label: "祁阳县" },
          { value: 2770, label: "东安县" },
          { value: 173, label: "双牌县" },
          { value: 471, label: "道县" },
          { value: 2154, label: "江永县" },
          { value: 2904, label: "宁远县" },
          { value: 829, label: "蓝山县" },
          { value: 734, label: "新田县" },
          { value: 162, label: "江华瑶族自治县" }
        ]
      },
      {
        value: 265,
        label: "怀化市",
        children: [
          { value: 1992, label: "鹤城区" },
          { value: 1215, label: "中方县" },
          { value: 2307, label: "沅陵县" },
          { value: 2103, label: "辰溪县" },
          { value: 266, label: "溆浦县" },
          { value: 2699, label: "会同县" },
          { value: 1187, label: "麻阳苗族自治县" },
          { value: 2615, label: "新晃侗族自治县" },
          { value: 1231, label: "芷江侗族自治县" },
          { value: 2518, label: "靖州苗族侗族自治县" },
          { value: 2919, label: "通道侗族自治县" },
          { value: 2641, label: "洪江市" }
        ]
      },
      {
        value: 1317,
        label: "娄底市",
        children: [
          { value: 1804, label: "娄星区" },
          { value: 1411, label: "双峰县" },
          { value: 2599, label: "新化县" },
          { value: 1318, label: "冷水江市" },
          { value: 2675, label: "涟源市" }
        ]
      },
      {
        value: 346,
        label: "湘西土家族苗族自治州",
        children: [
          { value: 2999, label: "吉首市" },
          { value: 1699, label: "泸溪县" },
          { value: 2722, label: "凤凰县" },
          { value: 1070, label: "花垣县" },
          { value: 2633, label: "保靖县" },
          { value: 1639, label: "古丈县" },
          { value: 2126, label: "永顺县" },
          { value: 3445, label: "龙山县" }
        ]
      }
    ]
  },
  {
    value: 27,
    label: "广东省",
    children: [
      {
        value: 53,
        label: "广州市",
        children: [
          { value: 2956, label: "荔湾区" },
          { value: 1509, label: "越秀区" },
          { value: 865, label: "海珠区" },
          { value: 1875, label: "天河区" },
          { value: 3446, label: "白云区" },
          { value: 2402, label: "黄埔区" },
          { value: 2514, label: "番禺区" },
          { value: 1312, label: "花都区" },
          { value: 3025, label: "南沙区" },
          { value: 3447, label: "从化区" },
          { value: 54, label: "增城区" }
        ]
      },
      {
        value: 469,
        label: "韶关市",
        children: [
          { value: 1122, label: "武江区" },
          { value: 470, label: "浈江区" },
          { value: 1242, label: "曲江区" },
          { value: 3151, label: "始兴县" },
          { value: 1155, label: "仁化县" },
          { value: 3156, label: "翁源县" },
          { value: 492, label: "乳源瑶族自治县" },
          { value: 2556, label: "新丰县" },
          { value: 788, label: "乐昌市" },
          { value: 762, label: "南雄市" }
        ]
      },
      {
        value: 755,
        label: "深圳市",
        children: [
          { value: 1402, label: "罗湖区" },
          { value: 2205, label: "福田区" },
          { value: 852, label: "南山区" },
          { value: 1851, label: "宝安区" },
          { value: 756, label: "龙岗区" },
          { value: 2736, label: "盐田区" },
          { value: 3448, label: "龙华区" },
          { value: 3449, label: "坪山区" },
          { value: 3450, label: "光明区" }
        ]
      },
      {
        value: 1065,
        label: "珠海市",
        children: [
          { value: 2301, label: "香洲区" },
          { value: 1066, label: "斗门区" },
          { value: 2513, label: "金湾区" }
        ]
      },
      {
        value: 40,
        label: "汕头市",
        children: [
          { value: 1085, label: "龙湖区" },
          { value: 2082, label: "金平区" },
          { value: 2769, label: "濠江区" },
          { value: 1106, label: "潮阳区" },
          { value: 41, label: "潮南区" },
          { value: 3014, label: "澄海区" },
          { value: 2046, label: "南澳县" }
        ]
      },
      {
        value: 997,
        label: "佛山市",
        children: [
          { value: 998, label: "禅城区" },
          { value: 1399, label: "南海区" },
          { value: 1964, label: "顺德区" },
          { value: 2092, label: "三水区" },
          { value: 2582, label: "高明区" }
        ]
      },
      {
        value: 1180,
        label: "江门市",
        children: [
          { value: 1515, label: "蓬江区" },
          { value: 1181, label: "江海区" },
          { value: 2749, label: "新会区" },
          { value: 2854, label: "台山市" },
          { value: 2984, label: "开平市" },
          { value: 2506, label: "鹤山市" },
          { value: 1869, label: "恩平市" }
        ]
      },
      {
        value: 319,
        label: "湛江市",
        children: [
          { value: 2470, label: "赤坎区" },
          { value: 320, label: "霞山区" },
          { value: 819, label: "坡头区" },
          { value: 375, label: "麻章区" },
          { value: 2603, label: "遂溪县" },
          { value: 2807, label: "徐闻县" },
          { value: 2156, label: "廉江市" },
          { value: 2765, label: "雷州市" },
          { value: 2350, label: "吴川市" }
        ]
      },
      {
        value: 555,
        label: "茂名市",
        children: [
          { value: 1668, label: "茂南区" },
          { value: 3451, label: "电白区" },
          { value: 1017, label: "高州市" },
          { value: 2534, label: "化州市" },
          { value: 556, label: "信宜市" }
        ]
      },
      {
        value: 801,
        label: "肇庆市",
        children: [
          { value: 1976, label: "端州区" },
          { value: 2149, label: "鼎湖区" },
          { value: 3452, label: "高要区" },
          { value: 1022, label: "广宁县" },
          { value: 802, label: "怀集县" },
          { value: 1999, label: "封开县" },
          { value: 816, label: "德庆县" },
          { value: 2185, label: "四会市" }
        ]
      },
      {
        value: 1955,
        label: "惠州市",
        children: [
          { value: 2517, label: "惠城区" },
          { value: 2962, label: "惠阳区" },
          { value: 2133, label: "博罗县" },
          { value: 2555, label: "惠东县" },
          { value: 1956, label: "龙门县" }
        ]
      },
      {
        value: 805,
        label: "梅州市",
        children: [
          { value: 3009, label: "梅江区" },
          { value: 3453, label: "梅县区" },
          { value: 3120, label: "大埔县" },
          { value: 934, label: "丰顺县" },
          { value: 2974, label: "五华县" },
          { value: 3126, label: "平远县" },
          { value: 2674, label: "蕉岭县" },
          { value: 806, label: "兴宁市" }
        ]
      },
      {
        value: 193,
        label: "汕尾市",
        children: [
          { value: 1149, label: "城区" },
          { value: 194, label: "海丰县" },
          { value: 1995, label: "陆河县" },
          { value: 2300, label: "陆丰市" }
        ]
      },
      {
        value: 232,
        label: "河源市",
        children: [
          { value: 2715, label: "源城区" },
          { value: 1409, label: "紫金县" },
          { value: 570, label: "龙川县" },
          { value: 233, label: "连平县" },
          { value: 2201, label: "和平县" },
          { value: 2524, label: "东源县" }
        ]
      },
      {
        value: 28,
        label: "阳江市",
        children: [
          { value: 1302, label: "江城区" },
          { value: 3454, label: "阳东区" },
          { value: 29, label: "阳西县" },
          { value: 1570, label: "阳春市" }
        ]
      },
      {
        value: 413,
        label: "清远市",
        children: [
          { value: 2908, label: "清城区" },
          { value: 3455, label: "清新区" },
          { value: 414, label: "佛冈县" },
          { value: 1393, label: "阳山县" },
          { value: 2420, label: "连山壮族瑶族自治县" },
          { value: 2783, label: "连南瑶族自治县" },
          { value: 2439, label: "英德市" },
          { value: 3033, label: "连州市" }
        ]
      },
      {
        value: 489,
        label: "东莞市",
        children: [{ value: 527, label: "东莞市" }]
      },
      {
        value: 1788,
        label: "中山市",
        children: [{ value: 3256, label: "中山市" }]
      },
      {
        value: 1704,
        label: "潮州市",
        children: [
          { value: 1705, label: "湘桥区" },
          { value: 3456, label: "潮安区" },
          { value: 2174, label: "饶平县" }
        ]
      },
      {
        value: 291,
        label: "揭阳市",
        children: [
          { value: 2163, label: "榕城区" },
          { value: 1665, label: "揭东区" },
          { value: 292, label: "揭西县" },
          { value: 1896, label: "惠来县" },
          { value: 378, label: "普宁市" }
        ]
      },
      {
        value: 100,
        label: "云浮市",
        children: [
          { value: 2608, label: "云城区" },
          { value: 3457, label: "云安区" },
          { value: 2209, label: "新兴县" },
          { value: 2034, label: "郁南县" },
          { value: 101, label: "罗定市" }
        ]
      }
    ]
  },
  {
    value: 150,
    label: "广西壮族自治区",
    children: [
      {
        value: 688,
        label: "南宁市",
        children: [
          { value: 2446, label: "兴宁区" },
          { value: 2477, label: "青秀区" },
          { value: 3142, label: "江南区" },
          { value: 2640, label: "西乡塘区" },
          { value: 3036, label: "良庆区" },
          { value: 3083, label: "邕宁区" },
          { value: 3458, label: "武鸣区" },
          { value: 1080, label: "隆安县" },
          { value: 1305, label: "马山县" },
          { value: 2650, label: "上林县" },
          { value: 1533, label: "宾阳县" },
          { value: 3049, label: "横县" }
        ]
      },
      {
        value: 481,
        label: "柳州市",
        children: [
          { value: 3459, label: "城中区" },
          { value: 1661, label: "鱼峰区" },
          { value: 2846, label: "柳南区" },
          { value: 3020, label: "柳北区" },
          { value: 2071, label: "柳江区" },
          { value: 1068, label: "柳城县" },
          { value: 482, label: "鹿寨县" },
          { value: 2490, label: "融安县" },
          { value: 2784, label: "融水苗族自治县" },
          { value: 2162, label: "三江侗族自治县" }
        ]
      },
      {
        value: 300,
        label: "桂林市",
        children: [
          { value: 1631, label: "秀峰区" },
          { value: 1191, label: "叠彩区" },
          { value: 663, label: "象山区" },
          { value: 1054, label: "七星区" },
          { value: 1131, label: "雁山区" },
          { value: 3460, label: "临桂区" },
          { value: 3242, label: "阳朔县" },
          { value: 2780, label: "灵川县" },
          { value: 723, label: "全州县" },
          { value: 1387, label: "兴安县" },
          { value: 2297, label: "永福县" },
          { value: 949, label: "灌阳县" },
          { value: 1846, label: "龙胜各族自治县" },
          { value: 301, label: "资源县" },
          { value: 3166, label: "平乐县" },
          { value: 3051, label: "恭城瑶族自治县" },
          { value: 3461, label: "荔浦市" }
        ]
      },
      {
        value: 671,
        label: "梧州市",
        children: [
          { value: 1077, label: "万秀区" },
          { value: 1718, label: "长洲区" },
          { value: 3462, label: "龙圩区" },
          { value: 2860, label: "苍梧县" },
          { value: 1243, label: "藤县" },
          { value: 672, label: "蒙山县" },
          { value: 1919, label: "岑溪市" }
        ]
      },
      {
        value: 888,
        label: "北海市",
        children: [
          { value: 2545, label: "海城区" },
          { value: 889, label: "银海区" },
          { value: 2800, label: "铁山港区" },
          { value: 1365, label: "合浦县" }
        ]
      },
      {
        value: 1525,
        label: "防城港市",
        children: [
          { value: 1526, label: "港口区" },
          { value: 2220, label: "防城区" },
          { value: 2318, label: "上思县" },
          { value: 2407, label: "东兴市" }
        ]
      },
      {
        value: 579,
        label: "钦州市",
        children: [
          { value: 1458, label: "钦南区" },
          { value: 3073, label: "钦北区" },
          { value: 2250, label: "灵山县" },
          { value: 1600, label: "浦北县" }
        ]
      },
      {
        value: 480,
        label: "贵港市",
        children: [
          { value: 2977, label: "港北区" },
          { value: 1323, label: "港南区" },
          { value: 594, label: "覃塘区" },
          { value: 3206, label: "平南县" },
          { value: 3068, label: "桂平市" }
        ]
      },
      {
        value: 664,
        label: "玉林市",
        children: [
          { value: 665, label: "玉州区" },
          { value: 3463, label: "福绵区" },
          { value: 3246, label: "容县" },
          { value: 1260, label: "陆川县" },
          { value: 2004, label: "博白县" },
          { value: 1186, label: "兴业县" },
          { value: 1115, label: "北流市" }
        ]
      },
      {
        value: 384,
        label: "百色市",
        children: [
          { value: 2669, label: "右江区" },
          { value: 3464, label: "田阳区" },
          { value: 606, label: "田东县" },
          { value: 636, label: "德保县" },
          { value: 2690, label: "那坡县" },
          { value: 1434, label: "凌云县" },
          { value: 385, label: "乐业县" },
          { value: 510, label: "田林县" },
          { value: 1640, label: "西林县" },
          { value: 2882, label: "隆林各族自治县" },
          { value: 3465, label: "靖西市" },
          { value: 3466, label: "平果市" }
        ]
      },
      {
        value: 821,
        label: "贺州市",
        children: [
          { value: 1802, label: "八步区" },
          { value: 3467, label: "平桂区" },
          { value: 2155, label: "昭平县" },
          { value: 822, label: "钟山县" },
          { value: 1766, label: "富川瑶族自治县" }
        ]
      },
      {
        value: 646,
        label: "河池市",
        children: [
          { value: 964, label: "金城江区" },
          { value: 3468, label: "宜州区" },
          { value: 1510, label: "南丹县" },
          { value: 3008, label: "天峨县" },
          { value: 842, label: "凤山县" },
          { value: 914, label: "东兰县" },
          { value: 709, label: "罗城仫佬族自治县" },
          { value: 647, label: "环江毛南族自治县" },
          { value: 2317, label: "巴马瑶族自治县" },
          { value: 785, label: "都安瑶族自治县" },
          { value: 3001, label: "大化瑶族自治县" }
        ]
      },
      {
        value: 151,
        label: "来宾市",
        children: [
          { value: 2234, label: "兴宾区" },
          { value: 2113, label: "忻城县" },
          { value: 962, label: "象州县" },
          { value: 1179, label: "武宣县" },
          { value: 152, label: "金秀瑶族自治县" },
          { value: 2703, label: "合山市" }
        ]
      },
      {
        value: 712,
        label: "崇左市",
        children: [
          { value: 824, label: "江州区" },
          { value: 1016, label: "扶绥县" },
          { value: 713, label: "宁明县" },
          { value: 1358, label: "龙州县" },
          { value: 2727, label: "大新县" },
          { value: 1350, label: "天等县" },
          { value: 2878, label: "凭祥市" }
        ]
      }
    ]
  },
  {
    value: 45,
    label: "海南省",
    children: [
      {
        value: 289,
        label: "海口市",
        children: [
          { value: 2008, label: "秀英区" },
          { value: 3204, label: "龙华区" },
          { value: 290, label: "琼山区" },
          { value: 2124, label: "美兰区" }
        ]
      },
      {
        value: 395,
        label: "三亚市",
        children: [
          { value: 3469, label: "海棠区" },
          { value: 3470, label: "吉阳区" },
          { value: 3471, label: "天涯区" },
          { value: 3472, label: "崖州区" }
        ]
      },
      {
        value: 3267,
        label: "三沙市",
        children: [{ value: 3570, label: "三沙市" }]
      },
      {
        value: 3268,
        label: "儋州市",
        children: [{ value: 3015, label: "儋州市" }]
      },
      {
        value: 3567,
        label: "省直辖县级行政单位",
        children: [
          { value: 1272, label: "五指山市" },
          { value: 2549, label: "琼海市" },
          { value: 1914, label: "文昌市" },
          { value: 2913, label: "万宁市" },
          { value: 399, label: "东方市" },
          { value: 3264, label: "定安县" },
          { value: 3261, label: "屯昌县" },
          { value: 3255, label: "澄迈县" },
          { value: 3251, label: "临高县" },
          { value: 3248, label: "白沙黎族自治县" },
          { value: 3260, label: "昌江黎族自治县" },
          { value: 3247, label: "乐东黎族自治县" },
          { value: 3258, label: "陵水黎族自治县" },
          { value: 3252, label: "保亭黎族苗族自治县" },
          { value: 3250, label: "琼中黎族苗族自治县" }
        ]
      }
    ]
  },
  {
    value: 55,
    label: "重庆市",
    children: [
      {
        value: 56,
        label: "区",
        children: [
          { value: 1523, label: "万州区" },
          { value: 924, label: "涪陵区" },
          { value: 1579, label: "渝中区" },
          { value: 1041, label: "大渡口区" },
          { value: 1212, label: "江北区" },
          { value: 57, label: "沙坪坝区" },
          { value: 1210, label: "九龙坡区" },
          { value: 625, label: "南岸区" },
          { value: 2688, label: "北碚区" },
          { value: 1536, label: "綦江区" },
          { value: 1162, label: "大足区" },
          { value: 3139, label: "渝北区" },
          { value: 831, label: "巴南区" },
          { value: 2415, label: "黔江区" },
          { value: 2583, label: "长寿区" },
          { value: 2898, label: "江津区" },
          { value: 1828, label: "合川区" },
          { value: 1754, label: "永川区" },
          { value: 1761, label: "南川区" },
          { value: 1024, label: "璧山区" },
          { value: 2287, label: "铜梁区" },
          { value: 3473, label: "潼南区" },
          { value: 1608, label: "荣昌区" },
          { value: 1772, label: "开州区" },
          { value: 3474, label: "梁平区" },
          { value: 3475, label: "武隆区" }
        ]
      },
      {
        value: 3566,
        label: "县",
        children: [
          { value: 1479, label: "城口县" },
          { value: 160, label: "丰都县" },
          { value: 1266, label: "垫江县" },
          { value: 2766, label: "忠县" },
          { value: 1594, label: "云阳县" },
          { value: 1789, label: "奉节县" },
          { value: 3187, label: "巫山县" },
          { value: 2168, label: "巫溪县" },
          { value: 2929, label: "石柱土家族自治县" },
          { value: 488, label: "秀山土家族苗族自治县" },
          { value: 2396, label: "酉阳土家族苗族自治县" },
          { value: 1034, label: "彭水苗族土家族自治县" }
        ]
      }
    ]
  },
  {
    value: 2,
    label: "四川省",
    children: [
      {
        value: 3,
        label: "成都市",
        children: [
          { value: 1264, label: "锦江区" },
          { value: 2410, label: "青羊区" },
          { value: 475, label: "金牛区" },
          { value: 1994, label: "武侯区" },
          { value: 2598, label: "成华区" },
          { value: 4, label: "龙泉驿区" },
          { value: 1906, label: "青白江区" },
          { value: 1507, label: "新都区" },
          { value: 2720, label: "温江区" },
          { value: 2933, label: "双流区" },
          { value: 3037, label: "郫都区" },
          { value: 2836, label: "金堂县" },
          { value: 3058, label: "大邑县" },
          { value: 2723, label: "蒲江县" },
          { value: 2734, label: "新津县" },
          { value: 2844, label: "都江堰市" },
          { value: 1687, label: "彭州市" },
          { value: 2743, label: "邛崃市" },
          { value: 966, label: "崇州市" },
          { value: 783, label: "简阳市" }
        ]
      },
      {
        value: 138,
        label: "自贡市",
        children: [
          { value: 1108, label: "自流井区" },
          { value: 2437, label: "贡井区" },
          { value: 522, label: "大安区" },
          { value: 278, label: "沿滩区" },
          { value: 139, label: "荣县" },
          { value: 2269, label: "富顺县" }
        ]
      },
      {
        value: 91,
        label: "攀枝花市",
        children: [
          { value: 3476, label: "东区" },
          { value: 3477, label: "西区" },
          { value: 92, label: "仁和区" },
          { value: 2497, label: "米易县" },
          { value: 2711, label: "盐边县" }
        ]
      },
      {
        value: 539,
        label: "泸州市",
        children: [
          { value: 867, label: "江阳区" },
          { value: 2628, label: "纳溪区" },
          { value: 2968, label: "龙马潭区" },
          { value: 1037, label: "泸县" },
          { value: 540, label: "合江县" },
          { value: 2689, label: "叙永县" },
          { value: 2413, label: "古蔺县" }
        ]
      },
      {
        value: 967,
        label: "德阳市",
        children: [
          { value: 968, label: "旌阳区" },
          { value: 3478, label: "罗江区" },
          { value: 2856, label: "中江县" },
          { value: 2039, label: "广汉市" },
          { value: 2656, label: "什邡市" },
          { value: 3069, label: "绵竹市" }
        ]
      },
      {
        value: 168,
        label: "绵阳市",
        children: [
          { value: 169, label: "涪城区" },
          { value: 1216, label: "游仙区" },
          { value: 953, label: "安州区" },
          { value: 1925, label: "三台县" },
          { value: 736, label: "盐亭县" },
          { value: 1786, label: "梓潼县" },
          { value: 3479, label: "北川羌族自治县" },
          { value: 3179, label: "平武县" },
          { value: 2494, label: "江油市" }
        ]
      },
      {
        value: 357,
        label: "广元市",
        children: [
          { value: 2795, label: "利州区" },
          { value: 3480, label: "昭化区" },
          { value: 358, label: "朝天区" },
          { value: 645, label: "旺苍县" },
          { value: 1632, label: "青川县" },
          { value: 1781, label: "剑阁县" },
          { value: 3044, label: "苍溪县" }
        ]
      },
      {
        value: 295,
        label: "遂宁市",
        children: [
          { value: 1227, label: "船山区" },
          { value: 1713, label: "安居区" },
          { value: 296, label: "蓬溪县" },
          { value: 1854, label: "大英县" },
          { value: 3481, label: "射洪市" }
        ]
      },
      {
        value: 721,
        label: "内江市",
        children: [
          { value: 3482, label: "市中区" },
          { value: 1874, label: "东兴区" },
          { value: 1824, label: "威远县" },
          { value: 3038, label: "资中县" },
          { value: 3483, label: "隆昌市" }
        ]
      },
      {
        value: 642,
        label: "乐山市",
        children: [
          { value: 177, label: "市中区" },
          { value: 2809, label: "沙湾区" },
          { value: 832, label: "五通桥区" },
          { value: 2183, label: "金口河区" },
          { value: 643, label: "犍为县" },
          { value: 3190, label: "井研县" },
          { value: 2643, label: "夹江县" },
          { value: 2302, label: "沐川县" },
          { value: 1389, label: "峨边彝族自治县" },
          { value: 1848, label: "马边彝族自治县" },
          { value: 951, label: "峨眉山市" }
        ]
      },
      {
        value: 925,
        label: "南充市",
        children: [
          { value: 1735, label: "顺庆区" },
          { value: 3021, label: "高坪区" },
          { value: 2033, label: "嘉陵区" },
          { value: 1140, label: "南部县" },
          { value: 3061, label: "营山县" },
          { value: 1493, label: "蓬安县" },
          { value: 926, label: "仪陇县" },
          { value: 1141, label: "西充县" },
          { value: 3089, label: "阆中市" }
        ]
      },
      {
        value: 987,
        label: "眉山市",
        children: [
          { value: 2924, label: "东坡区" },
          { value: 3484, label: "彭山区" },
          { value: 3203, label: "仁寿县" },
          { value: 1653, label: "洪雅县" },
          { value: 1283, label: "丹棱县" },
          { value: 1774, label: "青神县" }
        ]
      },
      {
        value: 276,
        label: "宜宾市",
        children: [
          { value: 1934, label: "翠屏区" },
          { value: 3485, label: "南溪区" },
          { value: 3486, label: "叙州区" },
          { value: 1294, label: "江安县" },
          { value: 2483, label: "长宁县" },
          { value: 277, label: "高县" },
          { value: 1651, label: "珙县" },
          { value: 2515, label: "筠连县" },
          { value: 2022, label: "兴文县" },
          { value: 2160, label: "屏山县" }
        ]
      },
      {
        value: 226,
        label: "广安市",
        children: [
          { value: 2595, label: "广安区" },
          { value: 3487, label: "前锋区" },
          { value: 789, label: "岳池县" },
          { value: 227, label: "武胜县" },
          { value: 2130, label: "邻水县" },
          { value: 1014, label: "华蓥市" }
        ]
      },
      {
        value: 112,
        label: "达州市",
        children: [
          { value: 674, label: "通川区" },
          { value: 3488, label: "达川区" },
          { value: 2217, label: "宣汉县" },
          { value: 113, label: "开江县" },
          { value: 1281, label: "大竹县" },
          { value: 3210, label: "渠县" },
          { value: 585, label: "万源市" }
        ]
      },
      {
        value: 12,
        label: "雅安市",
        children: [
          { value: 324, label: "雨城区" },
          { value: 3489, label: "名山区" },
          { value: 2629, label: "荥经县" },
          { value: 2920, label: "汉源县" },
          { value: 1871, label: "石棉县" },
          { value: 1963, label: "天全县" },
          { value: 13, label: "芦山县" },
          { value: 2023, label: "宝兴县" }
        ]
      },
      {
        value: 1098,
        label: "巴中市",
        children: [
          { value: 2564, label: "巴州区" },
          { value: 3490, label: "恩阳区" },
          { value: 1584, label: "通江县" },
          { value: 1099, label: "南江县" },
          { value: 1287, label: "平昌县" }
        ]
      },
      {
        value: 782,
        label: "资阳市",
        children: [
          { value: 2822, label: "雁江区" },
          { value: 1092, label: "安岳县" },
          { value: 927, label: "乐至县" }
        ]
      },
      {
        value: 765,
        label: "阿坝藏族羌族自治州",
        children: [
          { value: 3491, label: "马尔康市" },
          { value: 1998, label: "汶川县" },
          { value: 2444, label: "理县" },
          { value: 2323, label: "茂县" },
          { value: 766, label: "松潘县" },
          { value: 2845, label: "九寨沟县" },
          { value: 1645, label: "金川县" },
          { value: 2427, label: "小金县" },
          { value: 2773, label: "黑水县" },
          { value: 1553, label: "壤塘县" },
          { value: 2097, label: "阿坝县" },
          { value: 823, label: "若尔盖县" },
          { value: 2625, label: "红原县" }
        ]
      },
      {
        value: 116,
        label: "甘孜藏族自治州",
        children: [
          { value: 3492, label: "康定市" },
          { value: 2366, label: "泸定县" },
          { value: 251, label: "丹巴县" },
          { value: 486, label: "九龙县" },
          { value: 2547, label: "雅江县" },
          { value: 1556, label: "道孚县" },
          { value: 269, label: "炉霍县" },
          { value: 2546, label: "甘孜县" },
          { value: 2944, label: "新龙县" },
          { value: 1424, label: "德格县" },
          { value: 499, label: "白玉县" },
          { value: 786, label: "石渠县" },
          { value: 1040, label: "色达县" },
          { value: 117, label: "理塘县" },
          { value: 187, label: "巴塘县" },
          { value: 366, label: "乡城县" },
          { value: 3007, label: "稻城县" },
          { value: 1555, label: "得荣县" }
        ]
      },
      {
        value: 1636,
        label: "凉山彝族自治州",
        children: [
          { value: 3088, label: "西昌市" },
          { value: 3493, label: "木里藏族自治县" },
          { value: 2533, label: "盐源县" },
          { value: 2706, label: "德昌县" },
          { value: 1813, label: "会理县" },
          { value: 1670, label: "会东县" },
          { value: 2328, label: "宁南县" },
          { value: 3208, label: "普格县" },
          { value: 3077, label: "布拖县" },
          { value: 2939, label: "金阳县" },
          { value: 1877, label: "昭觉县" },
          { value: 2233, label: "喜德县" },
          { value: 3169, label: "冕宁县" },
          { value: 2057, label: "越西县" },
          { value: 1759, label: "甘洛县" },
          { value: 2611, label: "美姑县" },
          { value: 2475, label: "雷波县" }
        ]
      }
    ]
  },
  {
    value: 165,
    label: "贵州省",
    children: [
      {
        value: 338,
        label: "贵阳市",
        children: [
          { value: 1918, label: "南明区" },
          { value: 3231, label: "云岩区" },
          { value: 3215, label: "花溪区" },
          { value: 2535, label: "乌当区" },
          { value: 1245, label: "白云区" },
          { value: 3494, label: "观山湖区" },
          { value: 2724, label: "开阳县" },
          { value: 1744, label: "息烽县" },
          { value: 339, label: "修文县" },
          { value: 3153, label: "清镇市" }
        ]
      },
      {
        value: 623,
        label: "六盘水市",
        children: [
          { value: 1575, label: "钟山区" },
          { value: 624, label: "六枝特区" },
          { value: 3174, label: "水城县" },
          { value: 3495, label: "盘州市" }
        ]
      },
      {
        value: 411,
        label: "遵义市",
        children: [
          { value: 2621, label: "红花岗区" },
          { value: 2764, label: "汇川区" },
          { value: 3496, label: "播州区" },
          { value: 2570, label: "桐梓县" },
          { value: 2959, label: "绥阳县" },
          { value: 2356, label: "正安县" },
          { value: 3237, label: "道真仡佬族苗族自治县" },
          { value: 412, label: "务川仡佬族苗族自治县" },
          { value: 2122, label: "凤冈县" },
          { value: 2401, label: "湄潭县" },
          { value: 2230, label: "余庆县" },
          { value: 614, label: "习水县" },
          { value: 1928, label: "赤水市" },
          { value: 1123, label: "仁怀市" }
        ]
      },
      {
        value: 396,
        label: "安顺市",
        children: [
          { value: 397, label: "西秀区" },
          { value: 3497, label: "平坝区" },
          { value: 3183, label: "普定县" },
          { value: 2567, label: "镇宁布依族苗族自治县" },
          { value: 408, label: "关岭布依族苗族自治县" },
          { value: 1844, label: "紫云苗族布依族自治县" }
        ]
      },
      {
        value: 3269,
        label: "毕节市",
        children: [
          { value: 3498, label: "七星关区" },
          { value: 1904, label: "大方县" },
          { value: 167, label: "黔西县" },
          { value: 1521, label: "金沙县" },
          { value: 3499, label: "织金县" },
          { value: 2681, label: "纳雍县" },
          { value: 2428, label: "威宁彝族回族苗族自治县" },
          { value: 857, label: "赫章县" }
        ]
      },
      {
        value: 3270,
        label: "铜仁市",
        children: [
          { value: 3500, label: "碧江区" },
          { value: 3501, label: "万山区" },
          { value: 2009, label: "江口县" },
          { value: 2890, label: "玉屏侗族自治县" },
          { value: 2487, label: "石阡县" },
          { value: 1316, label: "思南县" },
          { value: 2914, label: "印江土家族苗族自治县" },
          { value: 2146, label: "德江县" },
          { value: 1205, label: "沿河土家族自治县" },
          { value: 3130, label: "松桃苗族自治县" }
        ]
      },
      {
        value: 994,
        label: "黔西南布依族苗族自治州",
        children: [
          { value: 1578, label: "兴义市" },
          { value: 3502, label: "兴仁市" },
          { value: 995, label: "普安县" },
          { value: 2040, label: "晴隆县" },
          { value: 2612, label: "贞丰县" },
          { value: 2522, label: "望谟县" },
          { value: 2887, label: "册亨县" },
          { value: 1940, label: "安龙县" }
        ]
      },
      {
        value: 174,
        label: "黔东南苗族侗族自治州",
        children: [
          { value: 1071, label: "凯里市" },
          { value: 2589, label: "黄平县" },
          { value: 1798, label: "施秉县" },
          { value: 2777, label: "三穗县" },
          { value: 1400, label: "镇远县" },
          { value: 508, label: "岑巩县" },
          { value: 944, label: "天柱县" },
          { value: 1248, label: "锦屏县" },
          { value: 1829, label: "剑河县" },
          { value: 175, label: "台江县" },
          { value: 1259, label: "黎平县" },
          { value: 1864, label: "榕江县" },
          { value: 1757, label: "从江县" },
          { value: 3228, label: "雷山县" },
          { value: 2187, label: "麻江县" },
          { value: 1936, label: "丹寨县" }
        ]
      },
      {
        value: 3271,
        label: "黔南布依族苗族自治州",
        children: [
          { value: 359, label: "都匀市" },
          { value: 351, label: "福泉市" },
          { value: 3010, label: "荔波县" },
          { value: 2632, label: "贵定县" },
          { value: 1966, label: "瓮安县" },
          { value: 2927, label: "独山县" },
          { value: 2594, label: "平塘县" },
          { value: 2510, label: "罗甸县" },
          { value: 1778, label: "长顺县" },
          { value: 1059, label: "龙里县" },
          { value: 1480, label: "惠水县" },
          { value: 644, label: "三都水族自治县" }
        ]
      }
    ]
  },
  {
    value: 93,
    label: "云南省",
    children: [
      {
        value: 1052,
        label: "昆明市",
        children: [
          { value: 2211, label: "五华区" },
          { value: 2090, label: "盘龙区" },
          { value: 2085, label: "官渡区" },
          { value: 1053, label: "西山区" },
          { value: 2376, label: "东川区" },
          { value: 3503, label: "呈贡区" },
          { value: 3504, label: "晋宁区" },
          { value: 1165, label: "富民县" },
          { value: 1819, label: "宜良县" },
          { value: 2342, label: "石林彝族自治县" },
          { value: 1258, label: "嵩明县" },
          { value: 2010, label: "禄劝彝族苗族自治县" },
          { value: 3505, label: "寻甸回族彝族自治县" },
          { value: 1422, label: "安宁市" }
        ]
      },
      {
        value: 609,
        label: "曲靖市",
        children: [
          { value: 3205, label: "麒麟区" },
          { value: 2192, label: "沾益区" },
          { value: 3506, label: "马龙区" },
          { value: 2189, label: "陆良县" },
          { value: 610, label: "师宗县" },
          { value: 1497, label: "罗平县" },
          { value: 2744, label: "富源县" },
          { value: 1473, label: "会泽县" },
          { value: 1012, label: "宣威市" }
        ]
      },
      {
        value: 669,
        label: "玉溪市",
        children: [
          { value: 933, label: "红塔区" },
          { value: 3507, label: "江川区" },
          { value: 1698, label: "通海县" },
          { value: 791, label: "华宁县" },
          { value: 1161, label: "易门县" },
          { value: 2970, label: "峨山彝族自治县" },
          { value: 2869, label: "新平彝族傣族自治县" },
          { value: 2035, label: "元江哈尼族彝族傣族自治县" },
          { value: 3508, label: "澄江市" }
        ]
      },
      {
        value: 892,
        label: "保山市",
        children: [
          { value: 1574, label: "隆阳区" },
          { value: 2677, label: "施甸县" },
          { value: 2292, label: "龙陵县" },
          { value: 2000, label: "昌宁县" },
          { value: 3509, label: "腾冲市" }
        ]
      },
      {
        value: 567,
        label: "昭通市",
        children: [
          { value: 2516, label: "昭阳区" },
          { value: 1831, label: "鲁甸县" },
          { value: 2480, label: "巧家县" },
          { value: 3101, label: "盐津县" },
          { value: 568, label: "大关县" },
          { value: 845, label: "永善县" },
          { value: 976, label: "绥江县" },
          { value: 2041, label: "镇雄县" },
          { value: 3207, label: "彝良县" },
          { value: 1366, label: "威信县" },
          { value: 3510, label: "水富市" }
        ]
      },
      {
        value: 273,
        label: "丽江市",
        children: [
          { value: 2106, label: "古城区" },
          { value: 2575, label: "玉龙纳西族自治县" },
          { value: 1416, label: "永胜县" },
          { value: 1927, label: "华坪县" },
          { value: 274, label: "宁蒗彝族自治县" }
        ]
      },
      {
        value: 98,
        label: "普洱市",
        children: [
          { value: 1989, label: "思茅区" },
          { value: 1867, label: "宁洱哈尼族彝族自治县" },
          { value: 2058, label: "墨江哈尼族自治县" },
          { value: 1581, label: "景东彝族自治县" },
          { value: 3511, label: "景谷傣族彝族自治县" },
          { value: 844, label: "镇沅彝族哈尼族拉祜族自治县" },
          { value: 562, label: "江城哈尼族彝族自治县" },
          { value: 2449, label: "孟连傣族拉祜族佤族自治县" },
          { value: 2073, label: "澜沧拉祜族自治县" },
          { value: 99, label: "西盟佤族自治县" }
        ]
      },
      {
        value: 322,
        label: "临沧市",
        children: [
          { value: 410, label: "临翔区" },
          { value: 2826, label: "凤庆县" },
          { value: 323, label: "云县" },
          { value: 2259, label: "永德县" },
          { value: 2926, label: "镇康县" },
          { value: 3512, label: "双江拉祜族佤族布朗族傣族自治县" },
          { value: 3513, label: "耿马傣族佤族自治县" },
          { value: 3514, label: "沧源佤族自治县" }
        ]
      },
      {
        value: 94,
        label: "楚雄彝族自治州",
        children: [
          { value: 95, label: "楚雄市" },
          { value: 2196, label: "双柏县" },
          { value: 118, label: "牟定县" },
          { value: 2538, label: "南华县" },
          { value: 1177, label: "姚安县" },
          { value: 2980, label: "大姚县" },
          { value: 2206, label: "永仁县" },
          { value: 1945, label: "元谋县" },
          { value: 660, label: "武定县" },
          { value: 1397, label: "禄丰县" }
        ]
      },
      {
        value: 400,
        label: "红河哈尼族彝族自治州",
        children: [
          { value: 2045, label: "个旧市" },
          { value: 2757, label: "开远市" },
          { value: 3515, label: "蒙自市" },
          { value: 3516, label: "弥勒市" },
          { value: 1240, label: "屏边苗族自治县" },
          { value: 3230, label: "建水县" },
          { value: 2590, label: "石屏县" },
          { value: 1414, label: "泸西县" },
          { value: 2188, label: "元阳县" },
          { value: 2294, label: "红河县" },
          { value: 401, label: "金平苗族瑶族傣族自治县" },
          { value: 2139, label: "绿春县" },
          { value: 2512, label: "河口瑶族自治县" }
        ]
      },
      {
        value: 445,
        label: "文山壮族苗族自治州",
        children: [
          { value: 3517, label: "文山市" },
          { value: 1234, label: "砚山县" },
          { value: 446, label: "西畴县" },
          { value: 2874, label: "麻栗坡县" },
          { value: 771, label: "马关县" },
          { value: 1192, label: "丘北县" },
          { value: 2357, label: "广南县" },
          { value: 1729, label: "富宁县" }
        ]
      },
      {
        value: 850,
        label: "西双版纳傣族自治州",
        children: [
          { value: 1866, label: "景洪市" },
          { value: 2089, label: "勐海县" },
          { value: 851, label: "勐腊县" }
        ]
      },
      {
        value: 157,
        label: "大理白族自治州",
        children: [
          { value: 2591, label: "大理市" },
          { value: 1482, label: "漾濞彝族自治县" },
          { value: 229, label: "祥云县" },
          { value: 3065, label: "宾川县" },
          { value: 2498, label: "弥渡县" },
          { value: 1436, label: "南涧彝族自治县" },
          { value: 158, label: "巍山彝族回族自治县" },
          { value: 1110, label: "永平县" },
          { value: 2400, label: "云龙县" },
          { value: 1903, label: "洱源县" },
          { value: 1693, label: "剑川县" },
          { value: 970, label: "鹤庆县" }
        ]
      },
      {
        value: 1437,
        label: "德宏傣族景颇族自治州",
        children: [
          { value: 2571, label: "瑞丽市" },
          { value: 3518, label: "芒市" },
          { value: 2305, label: "梁河县" },
          { value: 1438, label: "盈江县" },
          { value: 2177, label: "陇川县" }
        ]
      },
      {
        value: 330,
        label: "怒江傈僳族自治州",
        children: [
          { value: 2698, label: "泸水市" },
          { value: 2700, label: "福贡县" },
          { value: 331, label: "贡山独龙族怒族自治县" },
          { value: 3084, label: "兰坪白族普米族自治县" }
        ]
      },
      {
        value: 692,
        label: "迪庆藏族自治州",
        children: [
          { value: 3519, label: "香格里拉市" },
          { value: 3238, label: "德钦县" },
          { value: 725, label: "维西傈僳族自治县" }
        ]
      }
    ]
  },
  {
    value: 42,
    label: "西藏自治区",
    children: [
      {
        value: 991,
        label: "拉萨市",
        children: [
          { value: 3520, label: "城关区" },
          { value: 3521, label: "堆龙德庆区" },
          { value: 3522, label: "达孜区" },
          { value: 2434, label: "林周县" },
          { value: 1089, label: "当雄县" },
          { value: 992, label: "尼木县" },
          { value: 2548, label: "曲水县" },
          { value: 3523, label: "墨竹工卡县" }
        ]
      },
      {
        value: 43,
        label: "日喀则市",
        children: [
          { value: 3524, label: "桑珠孜区" },
          { value: 2129, label: "南木林县" },
          { value: 848, label: "江孜县" },
          { value: 2484, label: "定日县" },
          { value: 2455, label: "萨迦县" },
          { value: 1647, label: "拉孜县" },
          { value: 44, label: "昂仁县" },
          { value: 982, label: "谢通门县" },
          { value: 3064, label: "白朗县" },
          { value: 841, label: "仁布县" },
          { value: 2144, label: "康马县" },
          { value: 2093, label: "定结县" },
          { value: 2847, label: "仲巴县" },
          { value: 2181, label: "亚东县" },
          { value: 1609, label: "吉隆县" },
          { value: 2270, label: "聂拉木县" },
          { value: 1138, label: "萨嘎县" },
          { value: 2670, label: "岗巴县" }
        ]
      },
      {
        value: 472,
        label: "昌都市",
        children: [
          { value: 3525, label: "卡若区" },
          { value: 473, label: "江达县" },
          { value: 1329, label: "贡觉县" },
          { value: 1005, label: "类乌齐县" },
          { value: 2476, label: "丁青县" },
          { value: 2721, label: "察雅县" },
          { value: 2772, label: "八宿县" },
          { value: 3154, label: "左贡县" },
          { value: 2843, label: "芒康县" },
          { value: 719, label: "洛隆县" },
          { value: 586, label: "边坝县" }
        ]
      },
      {
        value: 3272,
        label: "林芝市",
        children: [
          { value: 3526, label: "巴宜区" },
          { value: 1079, label: "工布江达县" },
          { value: 2963, label: "米林县" },
          { value: 534, label: "墨脱县" },
          { value: 3121, label: "波密县" },
          { value: 2395, label: "察隅县" },
          { value: 2799, label: "朗县" }
        ]
      },
      {
        value: 519,
        label: "山南市",
        children: [
          { value: 1535, label: "乃东区" },
          { value: 1717, label: "扎囊县" },
          { value: 1975, label: "贡嘎县" },
          { value: 2362, label: "桑日县" },
          { value: 2733, label: "琼结县" },
          { value: 840, label: "曲松县" },
          { value: 1548, label: "措美县" },
          { value: 520, label: "洛扎县" },
          { value: 1885, label: "加查县" },
          { value: 859, label: "隆子县" },
          { value: 2642, label: "错那县" },
          { value: 1345, label: "浪卡子县" }
        ]
      },
      {
        value: 932,
        label: "那曲市",
        children: [
          { value: 3527, label: "色尼区" },
          { value: 759, label: "嘉黎县" },
          { value: 2579, label: "比如县" },
          { value: 1333, label: "聂荣县" },
          { value: 2559, label: "安多县" },
          { value: 582, label: "申扎县" },
          { value: 3528, label: "索县" },
          { value: 1495, label: "班戈县" },
          { value: 1870, label: "巴青县" },
          { value: 3529, label: "尼玛县" },
          { value: 3530, label: "双湖县" }
        ]
      },
      {
        value: 777,
        label: "阿里地区",
        children: [
          { value: 3186, label: "普兰县" },
          { value: 878, label: "札达县" },
          { value: 778, label: "噶尔县" },
          { value: 1952, label: "日土县" },
          { value: 941, label: "革吉县" },
          { value: 2983, label: "改则县" },
          { value: 2605, label: "措勤县" }
        ]
      }
    ]
  },
  {
    value: 23,
    label: "陕西省",
    children: [
      {
        value: 24,
        label: "西安市",
        children: [
          { value: 2708, label: "新城区" },
          { value: 1176, label: "碑林区" },
          { value: 2562, label: "莲湖区" },
          { value: 2409, label: "灞桥区" },
          { value: 3175, label: "未央区" },
          { value: 598, label: "雁塔区" },
          { value: 1331, label: "阎良区" },
          { value: 25, label: "临潼区" },
          { value: 1630, label: "长安区" },
          { value: 3531, label: "高陵区" },
          { value: 1883, label: "鄠邑区" },
          { value: 638, label: "蓝田县" },
          { value: 2007, label: "周至县" }
        ]
      },
      {
        value: 2223,
        label: "铜川市",
        children: [
          { value: 2884, label: "王益区" },
          { value: 2324, label: "印台区" },
          { value: 2905, label: "耀州区" },
          { value: 2527, label: "宜君县" }
        ]
      },
      {
        value: 197,
        label: "宝鸡市",
        children: [
          { value: 1951, label: "渭滨区" },
          { value: 2079, label: "金台区" },
          { value: 3023, label: "陈仓区" },
          { value: 2863, label: "凤翔县" },
          { value: 2179, label: "岐山县" },
          { value: 1048, label: "扶风县" },
          { value: 1889, label: "眉县" },
          { value: 571, label: "陇县" },
          { value: 198, label: "千阳县" },
          { value: 1112, label: "麟游县" },
          { value: 2390, label: "凤县" },
          { value: 2404, label: "太白县" }
        ]
      },
      {
        value: 114,
        label: "咸阳市",
        children: [
          { value: 2952, label: "秦都区" },
          { value: 3532, label: "杨陵区" },
          { value: 743, label: "渭城区" },
          { value: 2922, label: "三原县" },
          { value: 2883, label: "泾阳县" },
          { value: 2286, label: "乾县" },
          { value: 804, label: "礼泉县" },
          { value: 3133, label: "永寿县" },
          { value: 479, label: "长武县" },
          { value: 115, label: "旬邑县" },
          { value: 3222, label: "淳化县" },
          { value: 159, label: "武功县" },
          { value: 3071, label: "兴平市" },
          { value: 3533, label: "彬州市" }
        ]
      },
      {
        value: 541,
        label: "渭南市",
        children: [
          { value: 1470, label: "临渭区" },
          { value: 3534, label: "华州区" },
          { value: 1529, label: "潼关县" },
          { value: 2774, label: "大荔县" },
          { value: 948, label: "合阳县" },
          { value: 2482, label: "澄城县" },
          { value: 2111, label: "蒲城县" },
          { value: 2030, label: "白水县" },
          { value: 1461, label: "富平县" },
          { value: 963, label: "韩城市" },
          { value: 542, label: "华阴市" }
        ]
      },
      {
        value: 504,
        label: "延安市",
        children: [
          { value: 2006, label: "宝塔区" },
          { value: 3535, label: "安塞区" },
          { value: 1173, label: "延长县" },
          { value: 2976, label: "延川县" },
          { value: 3221, label: "志丹县" },
          { value: 1412, label: "吴起县" },
          { value: 1150, label: "甘泉县" },
          { value: 505, label: "富县" },
          { value: 2028, label: "洛川县" },
          { value: 3086, label: "宜川县" },
          { value: 1977, label: "黄龙县" },
          { value: 1304, label: "黄陵县" },
          { value: 3536, label: "子长市" }
        ]
      },
      {
        value: 312,
        label: "汉中市",
        children: [
          { value: 2210, label: "汉台区" },
          { value: 3537, label: "南郑区" },
          { value: 3185, label: "城固县" },
          { value: 1591, label: "洋县" },
          { value: 1391, label: "西乡县" },
          { value: 2075, label: "勉县" },
          { value: 954, label: "宁强县" },
          { value: 1211, label: "略阳县" },
          { value: 912, label: "镇巴县" },
          { value: 2374, label: "留坝县" },
          { value: 313, label: "佛坪县" }
        ]
      },
      {
        value: 279,
        label: "榆林市",
        children: [
          { value: 1694, label: "榆阳区" },
          { value: 3538, label: "横山区" },
          { value: 1561, label: "府谷县" },
          { value: 3106, label: "靖边县" },
          { value: 1457, label: "定边县" },
          { value: 843, label: "绥德县" },
          { value: 2812, label: "米脂县" },
          { value: 1703, label: "佳县" },
          { value: 302, label: "吴堡县" },
          { value: 2741, label: "清涧县" },
          { value: 2226, label: "子洲县" },
          { value: 3539, label: "神木市" }
        ]
      },
      {
        value: 797,
        label: "安康市",
        children: [
          { value: 1188, label: "汉滨区" },
          { value: 1469, label: "汉阴县" },
          { value: 1592, label: "石泉县" },
          { value: 1751, label: "宁陕县" },
          { value: 3050, label: "紫阳县" },
          { value: 1917, label: "岚皋县" },
          { value: 1129, label: "平利县" },
          { value: 2465, label: "镇坪县" },
          { value: 3128, label: "旬阳县" },
          { value: 798, label: "白河县" }
        ]
      },
      {
        value: 58,
        label: "商洛市",
        children: [
          { value: 764, label: "商州区" },
          { value: 2012, label: "洛南县" },
          { value: 248, label: "丹凤县" },
          { value: 1379, label: "商南县" },
          { value: 429, label: "山阳县" },
          { value: 2961, label: "镇安县" },
          { value: 1235, label: "柞水县" }
        ]
      }
    ]
  },
  {
    value: 35,
    label: "甘肃省",
    children: [
      {
        value: 36,
        label: "兰州市",
        children: [
          { value: 1299, label: "城关区" },
          { value: 37, label: "七里河区" },
          { value: 2042, label: "西固区" },
          { value: 1856, label: "安宁区" },
          { value: 1475, label: "红古区" },
          { value: 3092, label: "永登县" },
          { value: 891, label: "皋兰县" },
          { value: 2304, label: "榆中县" }
        ]
      },
      {
        value: 1790,
        label: "嘉峪关市",
        children: [{ value: 3257, label: "嘉峪关市" }]
      },
      {
        value: 1601,
        label: "金昌市",
        children: [
          { value: 2110, label: "金川区" },
          { value: 1929, label: "永昌县" }
        ]
      },
      {
        value: 140,
        label: "白银市",
        children: [
          { value: 1221, label: "白银区" },
          { value: 2672, label: "平川区" },
          { value: 716, label: "靖远县" },
          { value: 231, label: "会宁县" },
          { value: 1088, label: "景泰县" }
        ]
      },
      {
        value: 3273,
        label: "天水市",
        children: [
          { value: 1585, label: "秦州区" },
          { value: 2857, label: "麦积区" },
          { value: 2729, label: "清水县" },
          { value: 141, label: "秦安县" },
          { value: 3085, label: "甘谷县" },
          { value: 2131, label: "武山县" },
          { value: 2949, label: "张家川回族自治县" }
        ]
      },
      {
        value: 1973,
        label: "武威市",
        children: [
          { value: 2222, label: "凉州区" },
          { value: 2532, label: "民勤县" },
          { value: 2425, label: "古浪县" },
          { value: 1974, label: "天祝藏族自治县" }
        ]
      },
      {
        value: 1132,
        label: "张掖市",
        children: [
          { value: 2943, label: "甘州区" },
          { value: 1133, label: "肃南裕固族自治县" },
          { value: 1930, label: "民乐县" },
          { value: 3098, label: "临泽县" },
          { value: 1137, label: "高台县" },
          { value: 1716, label: "山丹县" }
        ]
      },
      {
        value: 272,
        label: "平凉市",
        children: [
          { value: 2964, label: "崆峒区" },
          { value: 2707, label: "泾川县" },
          { value: 1755, label: "灵台县" },
          { value: 619, label: "崇信县" },
          { value: 1168, label: "庄浪县" },
          { value: 500, label: "静宁县" },
          { value: 3540, label: "华亭市" }
        ]
      },
      {
        value: 813,
        label: "酒泉市",
        children: [
          { value: 1863, label: "肃州区" },
          { value: 1413, label: "金塔县" },
          { value: 2098, label: "瓜州县" },
          { value: 2806, label: "肃北蒙古族自治县" },
          { value: 3006, label: "阿克塞哈萨克族自治县" },
          { value: 1044, label: "玉门市" },
          { value: 814, label: "敦煌市" }
        ]
      },
      {
        value: 577,
        label: "庆阳市",
        children: [
          { value: 578, label: "西峰区" },
          { value: 2542, label: "庆城县" },
          { value: 1375, label: "环县" },
          { value: 680, label: "华池县" },
          { value: 2817, label: "合水县" },
          { value: 2600, label: "正宁县" },
          { value: 2095, label: "宁县" },
          { value: 1415, label: "镇原县" }
        ]
      },
      {
        value: 326,
        label: "定西市",
        children: [
          { value: 2027, label: "安定区" },
          { value: 2623, label: "通渭县" },
          { value: 3097, label: "陇西县" },
          { value: 1794, label: "渭源县" },
          { value: 1311, label: "临洮县" },
          { value: 327, label: "漳县" },
          { value: 3209, label: "岷县" }
        ]
      },
      {
        value: 178,
        label: "陇南市",
        children: [
          { value: 179, label: "武都区" },
          { value: 667, label: "成县" },
          { value: 1045, label: "文县" },
          { value: 1907, label: "宕昌县" },
          { value: 2236, label: "康县" },
          { value: 2474, label: "西和县" },
          { value: 893, label: "礼县" },
          { value: 1324, label: "徽县" },
          { value: 1369, label: "两当县" }
        ]
      },
      {
        value: 87,
        label: "临夏回族自治州",
        children: [
          { value: 1524, label: "临夏市" },
          { value: 88, label: "临夏县" },
          { value: 2091, label: "康乐县" },
          { value: 1353, label: "永靖县" },
          { value: 1852, label: "广河县" },
          { value: 2636, label: "和政县" },
          { value: 2509, label: "东乡族自治县" },
          { value: 1273, label: "积石山保安族东乡族撒拉族自治县" }
        ]
      },
      {
        value: 102,
        label: "甘南藏族自治州",
        children: [
          { value: 543, label: "合作市" },
          { value: 1643, label: "临潭县" },
          { value: 2987, label: "卓尼县" },
          { value: 1838, label: "舟曲县" },
          { value: 1872, label: "迭部县" },
          { value: 2745, label: "玛曲县" },
          { value: 1337, label: "碌曲县" },
          { value: 103, label: "夏河县" }
        ]
      }
    ]
  },
  {
    value: 256,
    label: "青海省",
    children: [
      {
        value: 257,
        label: "西宁市",
        children: [
          { value: 258, label: "城东区" },
          { value: 1056, label: "城中区" },
          { value: 1942, label: "城西区" },
          { value: 1722, label: "城北区" },
          { value: 3541, label: "湟中区" },
          { value: 828, label: "大通回族土族自治县" },
          { value: 1943, label: "湟源县" }
        ]
      },
      {
        value: 3274,
        label: "海东市",
        children: [
          { value: 3542, label: "乐都区" },
          { value: 3543, label: "平安区" },
          { value: 1002, label: "民和回族土族自治县" },
          { value: 1621, label: "互助土族自治县" },
          { value: 2011, label: "化隆回族自治县" },
          { value: 521, label: "循化撒拉族自治县" }
        ]
      },
      {
        value: 406,
        label: "海北藏族自治州",
        children: [
          { value: 884, label: "门源回族自治县" },
          { value: 407, label: "祁连县" },
          { value: 626, label: "海晏县" },
          { value: 1252, label: "刚察县" }
        ]
      },
      {
        value: 1083,
        label: "黄南藏族自治州",
        children: [
          { value: 2937, label: "同仁县" },
          { value: 3074, label: "尖扎县" },
          { value: 1084, label: "泽库县" },
          { value: 2520, label: "河南蒙古族自治县" }
        ]
      },
      {
        value: 1586,
        label: "海南藏族自治州",
        children: [
          { value: 1587, label: "共和县" },
          { value: 2634, label: "同德县" },
          { value: 3029, label: "贵德县" },
          { value: 3114, label: "兴海县" },
          { value: 2116, label: "贵南县" }
        ]
      },
      {
        value: 1018,
        label: "果洛藏族自治州",
        children: [
          { value: 2392, label: "玛沁县" },
          { value: 2787, label: "班玛县" },
          { value: 1062, label: "甘德县" },
          { value: 1019, label: "达日县" },
          { value: 1374, label: "久治县" },
          { value: 1250, label: "玛多县" }
        ]
      },
      {
        value: 957,
        label: "玉树藏族自治州",
        children: [
          { value: 3544, label: "玉树市" },
          { value: 2403, label: "杂多县" },
          { value: 1201, label: "称多县" },
          { value: 1611, label: "治多县" },
          { value: 958, label: "囊谦县" },
          { value: 2249, label: "曲麻莱县" }
        ]
      },
      {
        value: 336,
        label: "海西蒙古族藏族自治州",
        children: [
          { value: 449, label: "格尔木市" },
          { value: 3182, label: "德令哈市" },
          { value: 3545, label: "茫崖市" },
          { value: 2235, label: "乌兰县" },
          { value: 3162, label: "都兰县" },
          { value: 803, label: "天峻县" }
        ]
      }
    ]
  },
  {
    value: 190,
    label: "宁夏回族自治区",
    children: [
      {
        value: 254,
        label: "银川市",
        children: [
          { value: 2503, label: "兴庆区" },
          { value: 255, label: "西夏区" },
          { value: 572, label: "金凤区" },
          { value: 1223, label: "永宁县" },
          { value: 2119, label: "贺兰县" },
          { value: 3028, label: "灵武市" }
        ]
      },
      {
        value: 303,
        label: "石嘴山市",
        children: [
          { value: 2096, label: "大武口区" },
          { value: 304, label: "惠农区" },
          { value: 2651, label: "平罗县" }
        ]
      },
      {
        value: 191,
        label: "吴忠市",
        children: [
          { value: 1144, label: "利通区" },
          { value: 3546, label: "红寺堡区" },
          { value: 3226, label: "盐池县" },
          { value: 230, label: "同心县" },
          { value: 2525, label: "青铜峡市" }
        ]
      },
      {
        value: 1676,
        label: "固原市",
        children: [
          { value: 2551, label: "原州区" },
          { value: 2172, label: "西吉县" },
          { value: 2617, label: "隆德县" },
          { value: 1677, label: "泾源县" },
          { value: 2739, label: "彭阳县" }
        ]
      },
      {
        value: 749,
        label: "中卫市",
        children: [
          { value: 750, label: "沙坡头区" },
          { value: 2258, label: "中宁县" },
          { value: 1347, label: "海原县" }
        ]
      }
    ]
  },
  {
    value: 19,
    label: "新疆维吾尔自治区",
    children: [
      {
        value: 163,
        label: "乌鲁木齐市",
        children: [
          { value: 2438, label: "天山区" },
          { value: 990, label: "沙依巴克区" },
          { value: 1890, label: "新市区" },
          { value: 1707, label: "水磨沟区" },
          { value: 328, label: "头屯河区" },
          { value: 2001, label: "达坂城区" },
          { value: 2278, label: "米东区" },
          { value: 830, label: "乌鲁木齐县" }
        ]
      },
      {
        value: 795,
        label: "克拉玛依市",
        children: [
          { value: 796, label: "独山子区" },
          { value: 1652, label: "克拉玛依区" },
          { value: 2229, label: "白碱滩区" },
          { value: 2588, label: "乌尔禾区" }
        ]
      },
      {
        value: 3275,
        label: "吐鲁番市",
        children: [
          { value: 3547, label: "高昌区" },
          { value: 919, label: "鄯善县" },
          { value: 3181, label: "托克逊县" }
        ]
      },
      {
        value: 657,
        label: "哈密市",
        children: [
          { value: 3548, label: "伊州区" },
          { value: 658, label: "巴里坤哈萨克自治县" },
          { value: 950, label: "伊吾县" }
        ]
      },
      {
        value: 603,
        label: "昌吉回族自治州",
        children: [
          { value: 604, label: "昌吉市" },
          { value: 2198, label: "阜康市" },
          { value: 1427, label: "呼图壁县" },
          { value: 1598, label: "玛纳斯县" },
          { value: 1006, label: "奇台县" },
          { value: 2141, label: "吉木萨尔县" },
          { value: 1850, label: "木垒哈萨克自治县" }
        ]
      },
      {
        value: 1274,
        label: "博尔塔拉蒙古自治州",
        children: [
          { value: 1325, label: "博乐市" },
          { value: 3549, label: "阿拉山口市" },
          { value: 3550, label: "精河县" },
          { value: 1275, label: "温泉县" }
        ]
      },
      {
        value: 531,
        label: "巴音郭楞蒙古自治州",
        children: [
          { value: 1649, label: "库尔勒市" },
          { value: 1456, label: "轮台县" },
          { value: 532, label: "尉犁县" },
          { value: 1239, label: "若羌县" },
          { value: 676, label: "且末县" },
          { value: 1606, label: "焉耆回族自治县" },
          { value: 1286, label: "和静县" },
          { value: 1740, label: "和硕县" },
          { value: 854, label: "博湖县" }
        ]
      },
      {
        value: 512,
        label: "阿克苏地区",
        children: [
          { value: 2728, label: "阿克苏市" },
          { value: 3551, label: "库车市" },
          { value: 2637, label: "温宿县" },
          { value: 2616, label: "沙雅县" },
          { value: 1911, label: "新和县" },
          { value: 894, label: "拜城县" },
          { value: 2864, label: "乌什县" },
          { value: 2260, label: "阿瓦提县" },
          { value: 937, label: "柯坪县" }
        ]
      },
      {
        value: 20,
        label: "克孜勒苏柯尔克孜自治州",
        children: [
          { value: 1224, label: "阿图什市" },
          { value: 21, label: "阿克陶县" },
          { value: 2578, label: "阿合奇县" },
          { value: 129, label: "乌恰县" }
        ]
      },
      {
        value: 142,
        label: "喀什地区",
        children: [
          { value: 3136, label: "喀什市" },
          { value: 875, label: "疏附县" },
          { value: 1662, label: "疏勒县" },
          { value: 2320, label: "英吉沙县" },
          { value: 1425, label: "泽普县" },
          { value: 1770, label: "莎车县" },
          { value: 668, label: "叶城县" },
          { value: 1777, label: "麦盖提县" },
          { value: 2748, label: "岳普湖县" },
          { value: 1154, label: "伽师县" },
          { value: 1891, label: "巴楚县" },
          { value: 143, label: "塔什库尔干塔吉克自治县" }
        ]
      },
      {
        value: 855,
        label: "和田地区",
        children: [
          { value: 943, label: "和田市" },
          { value: 2568, label: "和田县" },
          { value: 856, label: "墨玉县" },
          { value: 2996, label: "皮山县" },
          { value: 1107, label: "洛浦县" },
          { value: 2665, label: "策勒县" },
          { value: 2024, label: "于田县" },
          { value: 1922, label: "民丰县" }
        ]
      },
      {
        value: 632,
        label: "伊犁哈萨克自治州",
        children: [
          { value: 2171, label: "伊宁市" },
          { value: 1567, label: "奎屯市" },
          { value: 3552, label: "霍尔果斯市" },
          { value: 1491, label: "伊宁县" },
          { value: 3217, label: "察布查尔锡伯自治县" },
          { value: 1055, label: "霍城县" },
          { value: 1541, label: "巩留县" },
          { value: 1700, label: "新源县" },
          { value: 1105, label: "昭苏县" },
          { value: 3553, label: "特克斯县" },
          { value: 3554, label: "尼勒克县" }
        ]
      },
      {
        value: 423,
        label: "塔城地区",
        children: [
          { value: 2630, label: "塔城市" },
          { value: 1671, label: "乌苏市" },
          { value: 424, label: "额敏县" },
          { value: 2256, label: "沙湾县" },
          { value: 1454, label: "托里县" },
          { value: 3102, label: "裕民县" },
          { value: 869, label: "和布克赛尔蒙古自治县" }
        ]
      },
      {
        value: 204,
        label: "阿勒泰地区",
        children: [
          { value: 205, label: "阿勒泰市" },
          { value: 2805, label: "布尔津县" },
          { value: 1655, label: "富蕴县" },
          { value: 2182, label: "福海县" },
          { value: 3220, label: "哈巴河县" },
          { value: 1251, label: "青河县" },
          { value: 999, label: "吉木乃县" }
        ]
      },
      {
        value: 3564,
        label: "自治区直辖县级行政单位",
        children: [
          { value: 1121, label: "石河子市" },
          { value: 1660, label: "阿拉尔市" },
          { value: 2823, label: "图木舒克市" },
          { value: 2281, label: "五家渠市" },
          { value: 3555, label: "北屯市" },
          { value: 3556, label: "铁门关市" },
          { value: 3557, label: "双河市" },
          { value: 3558, label: "可克达拉市" },
          { value: 3559, label: "昆玉市" },
          { value: 3560, label: "胡杨河市" }
        ]
      }
    ]
  }
];

export default areas;
