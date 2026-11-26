/* NusaStat data — figures from official publications (BPS, Bank Indonesia,
   APJII, BIG). Every number carries its year; provincial figures are
   2024 estimates. No network is used: this file is the whole dataset. */

var NUSADATA = {
  meta: {
    country: "Indonesia",
    year: 2024,
    sources: ["BPS — Statistics Indonesia", "Bank Indonesia", "APJII", "BIG"],
  },

  kpi: [
    { label: "Penduduk", value: "281,6 jt", sub: "Estimasi pertengahan 2024 (BPS)", trend: "+1,0% dari 2023", amber: false },
    { label: "PDB", value: "Rp22.139 T", sub: "≈ US$1,40 triliun, harga berlaku", trend: "+5,03% riil", amber: true },
    { label: "Pertumbuhan ekonomi", value: "5,03%", sub: "Pertumbuhan PDB 2024 (BPS)", trend: "Stabil di atas 5%", amber: false },
    { label: "Inflasi (Des, yoy)", value: "1,57%", sub: "IHK Desember 2024 (BPS)", trend: "Dalam sasaran 2,5±1%", amber: false },
    { label: "Pengangguran", value: "4,91%", sub: "Sakernas Agustus 2024 (BPS)", trend: "Turun dari 5,32%", amber: true },
    { label: "Kemiskinan", value: "9,03%", sub: "Susenas Maret 2024 (BPS)", trend: "Terendah sepanjang pencatatan", amber: false },
  ],

  geoKpi: [
    { label: "Pulau", value: "17.508", sub: "Pulau bernama dan tidak bernama (BIG)", trend: "", amber: false },
    { label: "Luas daratan", value: "1,90 jt km²", sub: "1.904.569 km² (BPS/BIG)", trend: "", amber: true },
    { label: "Provinsi", value: "38", sub: "Termasuk 4 provinsi baru di Papua", trend: "", amber: false },
    { label: "Kabupaten / kota", value: "514", sub: "416 kabupaten, 98 kota (2024)", trend: "", amber: false },
    { label: "Garis pantai", value: "54.716 km", sub: "Terpanjang kedua di dunia", trend: "", amber: true },
    { label: "Bentang barat–timur", value: "5.120 km", sub: "Sabang sampai Merauke", trend: "", amber: false },
  ],

  yearly: [
    { year: 2020, gdp: 15434.2, growth: -2.07, inflation: 1.68, unemployment: 7.07, poverty: 9.78, hdi: 71.94, exports: 163.19, imports: 141.57, population: 270.2, gdpPerCapita: 57.3 },
    { year: 2021, gdp: 16976.7, growth: 3.7, inflation: 1.87, unemployment: 6.49, poverty: 10.14, hdi: 72.29, exports: 231.61, imports: 196.19, population: 272.3, gdpPerCapita: 62.2 },
    { year: 2022, gdp: 19588.4, growth: 5.31, inflation: 5.51, unemployment: 5.86, poverty: 9.54, hdi: 73.37, exports: 291.9, imports: 237.52, population: 275.8, gdpPerCapita: 71.0 },
    { year: 2023, gdp: 20892.4, growth: 5.05, inflation: 2.61, unemployment: 5.32, poverty: 9.36, hdi: 74.39, exports: 258.82, imports: 221.89, population: 278.7, gdpPerCapita: 75.0 },
    { year: 2024, gdp: 22138.9, growth: 5.03, inflation: 1.57, unemployment: 4.91, poverty: 9.03, hdi: 75.02, exports: 264.7, imports: 233.66, population: 281.6, gdpPerCapita: 78.6 },
  ],

  yearFacts: {
    2020: "2020 — Tahun pandemi: PDB terkontraksi 2,07%, pengangguran melonjak ke 7,07%, kemiskinan naik ke 9,78%.",
    2021: "2021 — Pemulihan: PDB tumbuh 3,70% ke Rp16.977 triliun; ekspor melonjak ke US$231,6 miliar.",
    2022: "2022 — Puncak harga komoditas: ekspor US$291,9 miliar, tertinggi dalam deret ini; inflasi 5,51%.",
    2023: "2023 — Normalisasi: pertumbuhan 5,05%, inflasi turun ke 2,61%, kemiskinan 9,36%.",
    2024: "2024 — PDB Rp22.139 triliun, tumbuh 5,03%; inflasi 1,57%; pengangguran 4,91%; kemiskinan 9,03%.",
  },

  /* Population in millions, area in km2; density computed at render time. */
  provinces: [
    { name: "Jawa Barat", pop: 49.94, area: 35378 },
    { name: "Jawa Timur", pop: 41.81, area: 47803 },
    { name: "Jawa Tengah", pop: 37.89, area: 32801 },
    { name: "Sumatera Utara", pop: 15.59, area: 72981 },
    { name: "Banten", pop: 12.43, area: 9663 },
    { name: "DKI Jakarta", pop: 10.68, area: 664 },
    { name: "Sulawesi Selatan", pop: 9.46, area: 46717 },
    { name: "Lampung", pop: 9.42, area: 34624 },
    { name: "Sumatera Selatan", pop: 9.02, area: 91592 },
    { name: "Riau", pop: 7.01, area: 87024 },
    { name: "Kalimantan Barat", pop: 5.93, area: 147307 },
    { name: "Sumatera Barat", pop: 5.79, area: 42013 },
    { name: "Aceh", pop: 5.55, area: 57956 },
    { name: "Bali", pop: 4.34, area: 5780 },
    { name: "Kalimantan Selatan", pop: 4.22, area: 38744 },
    { name: "DI Yogyakarta", pop: 3.71, area: 3133 },
  ],

  ageStructure: [
    { label: "0–14 tahun", value: 24.9 },
    { label: "15–64 tahun", value: 69.0 },
    { label: "65+ tahun", value: 6.1 },
  ],

  /* Approximate shares of GDP, 2024 (BPS). */
  sectors: [
    { label: "Industri pengolahan", value: 18.8 },
    { label: "Perdagangan", value: 12.9 },
    { label: "Pertanian & perikanan", value: 11.9 },
    { label: "Konstruksi", value: 9.9 },
    { label: "Pertambangan", value: 8.4 },
    { label: "Informasi & komunikasi", value: 7.9 },
  ],

  /* Foreign tourist arrivals, millions (BPS); internet users, millions (APJII). */
  tourism: [
    { year: 2020, arrivals: 4.05 },
    { year: 2021, arrivals: 1.56 },
    { year: 2022, arrivals: 5.47 },
    { year: 2023, arrivals: 11.68 },
    { year: 2024, arrivals: 13.9 },
  ],
  internetUsers: [
    { year: 2020, users: 196.7 },
    { year: 2021, users: 210.0 },
    { year: 2022, users: 212.9 },
    { year: 2023, users: 215.6 },
    { year: 2024, users: 221.6 },
  ],

  totalPopulation2024: 281.6,
};
