(function () {
  var modules = [
    {
      id: "01",
      title: "运行状态监测",
      desc: "温度场 / 索力 / 对比下载等实时监测",
      path: "page/indexTemp.html · indexForce.html · tempcmp*.html · force*.html",
      kind: "real",
      label: "真实数据"
    },
    {
      id: "02",
      title: "故障诊断结果",
      desc: "对象·类型·等级·置信度·建议，三维定位",
      path: "page/diagnosis.html · ui/js/mock.js",
      kind: "demo",
      label: "演示数据"
    },
    {
      id: "03",
      title: "寿命预测结果",
      desc: "关键资产剩余寿命 / 风险 / 趋势",
      path: "page/life.html · ui/js/mock.js",
      kind: "demo",
      label: "演示数据"
    },
    {
      id: "04",
      title: "健康状态评估",
      desc: "综合健康指数与子系统评分",
      path: "page/health.html · ui/js/mock.js",
      kind: "demo",
      label: "演示数据"
    },
    {
      id: "05",
      title: "备品备件管理",
      desc: "库存台账、安全库存标色、出入库",
      path: "page/spare.html · ui/js/mock.js",
      kind: "demo",
      label: "演示台账"
    },
    {
      id: "06",
      title: "系统显示平台",
      desc: "三大监测云图统一入口",
      path: "page/display.html → indexTemp / Force / Alarm",
      kind: "hub",
      label: "入口聚合"
    },
    {
      id: "07",
      title: "故障警报展示",
      desc: "断丝预警三维 + 告警记录 / 下载",
      path: "page/indexAlarm.html · alarmBoard.html · alarmdownload.html",
      kind: "real",
      label: "真实数据"
    },
    {
      id: "08",
      title: "运行日志生成",
      desc: "事件流与一键运行日报",
      path: "page/logs.html · ui/js/mock.js",
      kind: "demo",
      label: "演示数据"
    },
    {
      id: "09",
      title: "信息发布",
      desc: "维护计划 / 通知通报编辑发布",
      path: "page/publish.html",
      kind: "demo",
      label: "演示发布"
    }
  ];

  var maturity = [
    ["运行状态监测", "可用", "真实接口为主", "indexTemp / indexForce / 对比下载页"],
    ["故障诊断结果", "界面就绪", "前端演示", "diagnosis.html"],
    ["寿命预测结果", "界面就绪", "前端演示", "life.html"],
    ["健康状态评估", "界面就绪", "前端演示", "health.html"],
    ["备品备件管理", "界面就绪", "前端演示台账", "spare.html"],
    ["系统显示平台", "可用（入口）", "跳转真实大屏", "display.html"],
    ["故障警报展示", "可用", "真实告警接口", "indexAlarm / alarmBoard"],
    ["运行日志生成", "界面就绪", "演示事件流", "logs.html"],
    ["信息发布", "界面就绪", "本地演示", "publish.html"],
    ["数字孪生模型", "可用", "三维 + 监测叠加", "index30 / 3D / 大屏 iframe"]
  ];

  var apis = [
    {
      title: "故障诊断",
      routes: ["GET /api/diagnosis/list", "GET /api/diagnosis/{id}"],
      note: "字段：asset, type, level, confidence, advice, time, position"
    },
    {
      title: "寿命预测",
      routes: ["GET /api/life/assets", "GET /api/life/cloud"],
      note: "字段：asset, remainYears, risk, trend, updatedAt"
    },
    {
      title: "健康评估",
      routes: ["GET /api/health/summary", "GET /api/health/subsystems", "GET /api/health/report"],
      note: "综合指数 + 子系统评分，可导出报告"
    },
    {
      title: "备品备件",
      routes: ["GET /api/spare/items", "POST /api/spare/in|out|apply", "GET /api/spare/flows"],
      note: "SKU、库存、安全库存、出入库流水"
    },
    {
      title: "运行日志",
      routes: ["GET /api/logs/events", "POST /api/logs/daily-report"],
      note: "事件汇聚后一键生成值班日报"
    },
    {
      title: "信息发布 / 孪生求解",
      routes: ["POST /api/publish/bulletin", "POST /api/twin/solve"],
      note: "通报发布；中长期接入有限元云图结果"
    }
  ];

  document.getElementById("moduleGrid").innerHTML = modules
    .map(function (m) {
      return (
        '<a class="mod" href="#files">' +
        '<div class="idx">MODULE ' +
        m.id +
        "</div><h3>" +
        m.title +
        "</h3><p>" +
        m.desc +
        '</p><div class="path">' +
        m.path +
        '</div><span class="badge ' +
        m.kind +
        '">' +
        m.label +
        "</span></a>"
      );
    })
    .join("");

  document.getElementById("maturityBody").innerHTML = maturity
    .map(function (r) {
      var tone = r[2].indexOf("真实") >= 0 || r[1] === "可用" || r[1].indexOf("可用") === 0 ? "real" : "demo";
      if (r[0] === "系统显示平台" || r[0] === "数字孪生模型") tone = "real";
      if (r[2].indexOf("演示") >= 0) tone = "demo";
      return (
        "<tr><td>" +
        r[0] +
        '</td><td><span class="tag ' +
        tone +
        '">' +
        r[1] +
        "</span></td><td>" +
        r[2] +
        "</td><td><code>" +
        r[3] +
        "</code></td></tr>"
      );
    })
    .join("");

  document.getElementById("apiGrid").innerHTML = apis
    .map(function (a) {
      return (
        '<div class="api-item"><h4>' +
        a.title +
        "</h4>" +
        a.routes.map(function (x) {
          return "<div><code>" + x + "</code></div>";
        }).join("") +
        "<p>" +
        a.note +
        "</p></div>"
      );
    })
    .join("");
})();
