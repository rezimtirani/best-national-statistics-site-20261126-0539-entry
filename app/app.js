/* NusaStat front end — vanilla JS, no libraries, no network.
   Renders KPI cards, SVG charts, the sortable/searchable province table,
   hash routing between sections, the year switch, and CSV downloads. */

(function () {
  "use strict";

  var D = window.NUSADATA;
  var TOTAL_POP = D.totalPopulation2024;

  function el(id) {
    return document.getElementById(id);
  }

  function fmt(n, digits) {
    return n.toLocaleString("id-ID", {
      minimumFractionDigits: digits === undefined ? 1 : digits,
      maximumFractionDigits: digits === undefined ? 1 : digits,
    });
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------- KPI cards ---------- */
  function renderKpis(containerId, items) {
    var host = el(containerId);
    if (!host) return;
    var html = "";
    items.forEach(function (k) {
      html +=
        '<article class="kpi' + (k.amber ? " amber" : "") + '">' +
        '<div class="kpi-label">' + esc(k.label) + "</div>" +
        '<div class="kpi-value">' + esc(k.value) + "</div>" +
        '<div class="kpi-sub">' + esc(k.sub) +
        (k.trend ? ' <span class="up">' + esc(k.trend) + "</span>" : "") +
        "</div></article>";
    });
    host.innerHTML = html;
  }

  /* ---------- SVG charts ---------- */
  function svgOpen(w, h) {
    return (
      '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="Grafik">' +
      '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="none"/>'
    );
  }

  function lineChart(containerId, series, opts) {
    var host = el(containerId);
    if (!host) return;
    var w = 560, h = 240, padL = 52, padR = 14, padT = 14, padB = 30;
    var keys = opts.keys; // [{key, color, label}]
    var values = [];
    series.forEach(function (row) {
      keys.forEach(function (k) {
        values.push(row[k.key]);
      });
    });
    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);
    if (opts.floorZero) min = Math.min(0, min);
    var span = max - min || 1;
    min -= span * 0.08;
    max += span * 0.08;
    span = max - min;
    var x = function (i) {
      return padL + (i * (w - padL - padR)) / (series.length - 1 || 1);
    };
    var y = function (v) {
      return padT + (1 - (v - min) / span) * (h - padT - padB);
    };
    var out = svgOpen(w, h);
    for (var g = 0; g <= 4; g++) {
      var gy = padT + (g * (h - padT - padB)) / 4;
      var gv = max - (g * span) / 4;
      out +=
        '<line class="grid" x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '"/>' +
        '<text class="tick" x="' + (padL - 6) + '" y="' + (gy + 4) + '" text-anchor="end">' +
        fmt(gv, opts.decimals || 0) + "</text>";
    }
    keys.forEach(function (k, ki) {
      var pts = series.map(function (row, i) {
        return x(i).toFixed(1) + "," + y(row[k.key]).toFixed(1);
      });
      out +=
        '<polyline class="' + (ki === 0 ? "line" : "line2") + '" points="' + pts.join(" ") + '"/>';
      series.forEach(function (row, i) {
        out +=
          '<circle class="' + (ki === 0 ? "dot" : "dot2") + '" cx="' + x(i).toFixed(1) +
          '" cy="' + y(row[k.key]).toFixed(1) + '" r="3.5"/>';
      });
    });
    series.forEach(function (row, i) {
      out +=
        '<text class="tick" x="' + x(i) + '" y="' + (h - 8) + '" text-anchor="middle">' +
        row.year + "</text>";
    });
    out += "</svg>";
    host.innerHTML = out;
  }

  function barChart(containerId, items, opts) {
    var host = el(containerId);
    if (!host) return;
    var w = 560, h = opts.height || 260, padL = 150, padR = 46, padT = 8, padB = 8;
    var rowH = (h - padT - padB) / items.length;
    var max = Math.max.apply(
      null,
      items.map(function (it) {
        return it.value;
      }),
    );
    var out = svgOpen(w, h);
    items.forEach(function (it, i) {
      var yTop = padT + i * rowH + 4;
      var barW = (it.value / max) * (w - padL - padR);
      out +=
        '<text class="tick" x="' + (padL - 8) + '" y="' + (yTop + rowH / 2 + 4) + '" text-anchor="end">' +
        esc(it.label) + "</text>" +
        '<rect class="bar' + (i % 2 ? " alt" : "") + '" x="' + padL + '" y="' + yTop +
        '" width="' + barW.toFixed(1) + '" height="' + (rowH - 10) + '" rx="3"/>' +
        '<text class="bar-label" x="' + (padL + barW + 6) + '" y="' + (yTop + rowH / 2 + 4) + '">' +
        fmt(it.value, opts.decimals === undefined ? 1 : opts.decimals) + (opts.suffix || "") + "</text>";
    });
    out += "</svg>";
    host.innerHTML = out;
  }

  function renderCharts() {
    lineChart("chart-gdp", D.yearly, {
      keys: [{ key: "gdp", color: "teal", label: "PDB" }],
      decimals: 0,
    });
    lineChart("chart-population", D.yearly, {
      keys: [{ key: "population", color: "teal", label: "Penduduk" }],
      decimals: 1,
    });
    barChart(
      "chart-provinces",
      D.provinces.slice(0, 6).map(function (p) {
        return { label: p.name, value: p.pop };
      }),
      { height: 240, decimals: 1, suffix: " jt" },
    );
    lineChart("chart-growth", D.yearly, {
      keys: [{ key: "growth", color: "teal", label: "Pertumbuhan" }],
      decimals: 1,
    });
    lineChart("chart-inflation", D.yearly, {
      keys: [
        { key: "inflation", color: "teal", label: "Inflasi" },
        { key: "unemployment", color: "amber", label: "Pengangguran" },
      ],
      decimals: 1,
    });
    lineChart("chart-trade", D.yearly, {
      keys: [
        { key: "exports", color: "teal", label: "Ekspor" },
        { key: "imports", color: "amber", label: "Impor" },
      ],
      decimals: 0,
    });
    barChart(
      "chart-sectors",
      D.sectors.map(function (s) {
        return { label: s.label, value: s.value };
      }),
      { height: 240, decimals: 1, suffix: "%" },
    );
    lineChart("chart-poverty", D.yearly, {
      keys: [
        { key: "poverty", color: "teal", label: "Kemiskinan" },
        { key: "unemployment", color: "amber", label: "Pengangguran" },
      ],
      decimals: 1,
    });
    lineChart("chart-hdi", D.yearly, {
      keys: [{ key: "hdi", color: "teal", label: "IPM" }],
      decimals: 1,
    });
    barChart(
      "chart-age",
      D.ageStructure.map(function (a) {
        return { label: a.label, value: a.value };
      }),
      { height: 150, decimals: 1, suffix: "%" },
    );
  }

  /* ---------- Province table ---------- */
  var sortKey = "rank";
  var sortDir = 1;

  function provinceRows() {
    var q = (el("province-search").value || "").toLowerCase().trim();
    var rows = D.provinces.map(function (p, i) {
      return {
        rank: i + 1,
        name: p.name,
        pop: p.pop,
        share: (p.pop / TOTAL_POP) * 100,
        density: Math.round((p.pop * 1000000) / p.area),
      };
    });
    if (q) {
      rows = rows.filter(function (r) {
        return r.name.toLowerCase().indexOf(q) !== -1;
      });
    }
    rows.sort(function (a, b) {
      var av = a[sortKey], bv = b[sortKey];
      if (typeof av === "string") return av.localeCompare(bv) * sortDir;
      return (av - bv) * sortDir;
    });
    return rows;
  }

  function renderProvinces() {
    var body = el("province-body");
    if (!body) return;
    var rows = provinceRows();
    var html = "";
    rows.forEach(function (r) {
      html +=
        "<tr><td>" + r.rank + "</td><td>" + esc(r.name) + "</td>" +
        '<td class="num">' + fmt(r.pop, 2) + "</td>" +
        '<td class="num">' + fmt(r.share, 2) + "</td>" +
        '<td class="num">' + r.density.toLocaleString("id-ID") + "</td></tr>";
    });
    body.innerHTML =
      html || '<tr><td colspan="5">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>';
    el("province-count").textContent =
      "Menampilkan " + rows.length + " dari " + D.provinces.length + " provinsi (16 teratas).";
  }

  function bindTable() {
    var search = el("province-search");
    if (search) search.addEventListener("input", renderProvinces);
    document.querySelectorAll("#province-table th button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-sort");
        if (sortKey === key) {
          sortDir = -sortDir;
        } else {
          sortKey = key;
          sortDir = 1;
        }
        renderProvinces();
      });
    });
  }

  /* ---------- Year switch ---------- */
  function bindYearSwitch() {
    var fact = el("year-fact");
    var buttons = document.querySelectorAll(".year-switch button");
    function show(year) {
      buttons.forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-year") === String(year));
      });
      if (fact) fact.textContent = D.yearFacts[year] || "";
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        show(parseInt(b.getAttribute("data-year"), 10));
      });
    });
    show(2024);
  }

  /* ---------- Routing ---------- */
  function currentPage() {
    var hash = (window.location.hash || "#ringkasan").slice(1);
    var known = ["ringkasan", "penduduk", "ekonomi", "masyarakat", "wilayah", "sumber"];
    return known.indexOf(hash) !== -1 ? hash : "ringkasan";
  }

  function route() {
    var page = currentPage();
    document.querySelectorAll(".page").forEach(function (section) {
      section.hidden = section.getAttribute("data-page") !== page;
    });
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === page);
    });
    window.scrollTo(0, 0);
  }

  /* ---------- CSV downloads ---------- */
  function downloadCsv(filename, header, rows) {
    var lines = [header];
    rows.forEach(function (r) {
      lines.push(
        r.map(function (cell) {
          var s = String(cell);
          return s.indexOf(",") !== -1 || s.indexOf('"') !== -1
            ? '"' + s.replace(/"/g, '""') + '"'
            : s;
        }).join(","),
      );
    });
    var blob = new Blob([lines.join("\n") + "\n"], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return lines.length - 1;
  }

  function bindDownloads() {
    var status = el("dl-status");
    var btnP = el("dl-provinces");
    if (btnP) {
      btnP.addEventListener("click", function () {
        var n = downloadCsv(
          "nusastat-provinsi-2024.csv",
          "Provinsi,Penduduk (juta),Pangsa (%),Kepadatan (per km2)",
          D.provinces.map(function (p) {
            return [
              p.name,
              p.pop.toFixed(2),
              ((p.pop / TOTAL_POP) * 100).toFixed(2),
              Math.round((p.pop * 1000000) / p.area),
            ];
          }),
        );
        if (status) status.textContent = "Diunduh: " + n + " baris provinsi (CSV).";
      });
    }
    var btnY = el("dl-yearly");
    if (btnY) {
      btnY.addEventListener("click", function () {
        var n = downloadCsv(
          "nusastat-tahunan-2020-2024.csv",
          "Tahun,PDB (Rp triliun),Pertumbuhan (%),Inflasi (%),Pengangguran (%),Kemiskinan (%),IPM,Ekspor (US$ miliar),Impor (US$ miliar),Penduduk (juta)",
          D.yearly.map(function (y) {
            return [
              y.year, y.gdp, y.growth, y.inflation, y.unemployment,
              y.poverty, y.hdi, y.exports, y.imports, y.population,
            ];
          }),
        );
        if (status) status.textContent = "Diunduh: " + n + " baris deret tahunan (CSV).";
      });
    }
  }

  /* ---------- Boot ---------- */
  renderKpis("kpi-grid", D.kpi);
  renderKpis("geo-grid", D.geoKpi);
  renderCharts();
  renderProvinces();
  bindTable();
  bindYearSwitch();
  bindDownloads();
  window.addEventListener("hashchange", route);
  route();
})();
