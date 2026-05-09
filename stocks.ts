// ─── Shared stock data types & configs ───────────────────────────────────────

export interface BarDataItem {
  label: string;
  revenue: number;
  profit: number;
  active: boolean;
}

export interface GrowthRow {
  label: string;
  labelSuffix: string;
  revenue: string;
  profit: string;
  profitPositive: boolean;
}

export interface DepthOrder { price: number; qty: number; }

export interface StockConfig {
  symbol: string;        // Yahoo Finance symbol
  ticker: string;        // Exchange ticker
  exchange: string;
  shortName: string;     // Shown in collapsed AppBar
  name: string;          // Full company name
  logoUri: string;
  avgPrice: number;
  shares: number;
  quarterlyData: BarDataItem[];
  yearlyData: BarDataItem[];
  growthData: GrowthRow[];
  insights: string[];
  about: {
    details: Array<{ label: string; value: string; underline?: boolean }>;
    description: string;
  };
  mdBuyPct: number;
  mdSellPct: number;
  mdBids: DepthOrder[];
  mdAsks: DepthOrder[];
  mdBidTotal: number;
  mdAskTotal: number;
}

// ─── Stock configs ────────────────────────────────────────────────────────────

export const STOCK_CONFIGS: Record<string, StockConfig> = {

  ZOMATO: {
    symbol: 'ETERNAL.NS',
    ticker: 'ZOMATO',
    exchange: 'NSE',
    shortName: 'Eternal',
    name: 'Eternal Ltd (Zomato)',
    logoUri: 'https://www.figma.com/api/mcp/asset/8889066d-b49a-4a6b-b9b2-d7da553ad2cc',
    avgPrice: 218.4,
    shares: 50,
    quarterlyData: [
      { label: "Dec '24", revenue: 5600,  profit: 59,  active: false },
      { label: "Mar '25", revenue: 6200,  profit: 39,  active: false },
      { label: "Jun '25", revenue: 7500,  profit: 25,  active: false },
      { label: "Sep '25", revenue: 13942, profit: 65,  active: false },
      { label: "Dec '25", revenue: 16663, profit: 102, active: true  },
    ],
    yearlyData: [
      { label: '2021', revenue: 2118,  profit: -861,  active: false },
      { label: '2022', revenue: 4687,  profit: -1223, active: false },
      { label: '2023', revenue: 7761,  profit: -971,  active: false },
      { label: '2024', revenue: 12961, profit: 351,   active: false },
      { label: '2025', revenue: 21320, profit: 527,   active: true  },
    ],
    growthData: [
      { label: '1Y',      labelSuffix: ' (TTM)', revenue: '+56%', profit: '+73%',  profitPositive: true  },
      { label: '3Y CAGR', labelSuffix: '',       revenue: '+66%', profit: '-12%',  profitPositive: false },
      { label: '5Y CAGR', labelSuffix: '',       revenue: '+48%', profit: '+18%',  profitPositive: true  },
      { label: '10Y CAGR',labelSuffix: '',       revenue: '+32%', profit: '+11%',  profitPositive: true  },
    ],
    insights: [
      'Quick Commerce GMV up 18% QoQ — fastest growth segment',
      'Blinkit dark store count hit 1,000 in Dec\'25',
      'B2B Hyperpure revenue doubled in FY25',
    ],
    about: {
      details: [
        { label: 'MD/CEO',               value: 'Deepinder Goyal' },
        { label: 'Parent organization',  value: 'Eternal Ltd' },
        { label: 'NSE Symbol',           value: 'ZOMATO' },
        { label: 'Industry',             value: 'Food Delivery / Quick Commerce', underline: true },
      ],
      description: 'Eternal Ltd (formerly Zomato) is India\'s largest food delivery and quick-commerce platform. Founded in 2008, it operates Zomato for restaurant delivery and Blinkit for 10-minute grocery delivery, serving 800+ cities.',
    },
    mdBuyPct: 46.65, mdSellPct: 53.35,
    mdBids: [
      { price: 256.95, qty: 12400 }, { price: 256.90, qty: 8750  },
      { price: 256.85, qty: 5200  }, { price: 256.80, qty: 3100  },
      { price: 256.75, qty: 1800  },
    ],
    mdAsks: [
      { price: 257.00, qty: 9800  }, { price: 257.05, qty: 6200  },
      { price: 257.10, qty: 4100  }, { price: 257.15, qty: 2900  },
      { price: 257.20, qty: 1600  },
    ],
    mdBidTotal: 18240000, mdAskTotal: 18240000,
  },

  PVRINOX: {
    symbol: 'PVRINOX.NS',
    ticker: 'PVRINOX',
    exchange: 'NSE',
    shortName: 'PVR INOX',
    name: 'PVR INOX Ltd',
    logoUri: 'https://www.figma.com/api/mcp/asset/bcc97f86-6c28-4d55-b318-d0657da0b943',
    avgPrice: 1380.0,
    shares: 6,
    quarterlyData: [
      { label: "Dec '24", revenue: 1800, profit: 120, active: false },
      { label: "Mar '25", revenue: 1850, profit: 105, active: false },
      { label: "Jun '25", revenue: 2100, profit: 155, active: false },
      { label: "Sep '25", revenue: 2350, profit: 210, active: false },
      { label: "Dec '25", revenue: 2500, profit: 225, active: true  },
    ],
    yearlyData: [
      { label: '2021', revenue: 750,  profit: -820, active: false },
      { label: '2022', revenue: 1680, profit: -590, active: false },
      { label: '2023', revenue: 3450, profit: -195, active: false },
      { label: '2024', revenue: 5820, profit: 285,  active: false },
      { label: '2025', revenue: 7200, profit: 420,  active: true  },
    ],
    growthData: [
      { label: '1Y',      labelSuffix: ' (TTM)', revenue: '+24%',  profit: '+47%', profitPositive: true  },
      { label: '3Y CAGR', labelSuffix: '',       revenue: '+28%',  profit: '+62%', profitPositive: true  },
      { label: '5Y CAGR', labelSuffix: '',       revenue: '+12%',  profit: '-8%',  profitPositive: false },
      { label: '10Y CAGR',labelSuffix: '',       revenue: '+8%',   profit: '+4%',  profitPositive: true  },
    ],
    insights: [
      'Multiplex occupancy up 8% driven by Bollywood blockbusters',
      'Premium screens (IMAX, 4DX) now 22% of total screens',
      'Food & Bev revenue per patron hit ₹185 — new record',
    ],
    about: {
      details: [
        { label: 'MD/CEO',              value: 'Gautam Dutta' },
        { label: 'Parent organization', value: 'PVR INOX Ltd' },
        { label: 'NSE Symbol',          value: 'PVRINOX' },
        { label: 'Industry',            value: 'Entertainment / Multiplex', underline: true },
      ],
      description: 'PVR INOX is India\'s largest multiplex cinema chain, formed by the 2023 merger of PVR Cinemas and INOX Leisure. It operates 1,700+ screens across 350+ properties in 100+ cities.',
    },
    mdBuyPct: 52.1, mdSellPct: 47.9,
    mdBids: [
      { price: 456.40, qty: 3200  }, { price: 456.30, qty: 2100  },
      { price: 456.20, qty: 1500  }, { price: 456.10, qty: 800   },
      { price: 456.00, qty: 400   },
    ],
    mdAsks: [
      { price: 456.50, qty: 2800  }, { price: 456.60, qty: 1900  },
      { price: 456.70, qty: 1200  }, { price: 456.80, qty: 650   },
      { price: 456.90, qty: 300   },
    ],
    mdBidTotal: 4800000, mdAskTotal: 4800000,
  },

  SUZLON: {
    symbol: 'SUZLON.NS',
    ticker: 'SUZLON',
    exchange: 'NSE',
    shortName: 'Suzlon',
    name: 'Suzlon Energy Ltd',
    logoUri: 'https://www.figma.com/api/mcp/asset/2853142e-d389-47fe-b3b0-2551f690b231',
    avgPrice: 38.5,
    shares: 500,
    quarterlyData: [
      { label: "Dec '24", revenue: 2800, profit: 490, active: false },
      { label: "Mar '25", revenue: 3100, profit: 580, active: false },
      { label: "Jun '25", revenue: 3400, profit: 650, active: false },
      { label: "Sep '25", revenue: 3800, profit: 740, active: false },
      { label: "Dec '25", revenue: 4200, profit: 840, active: true  },
    ],
    yearlyData: [
      { label: '2021', revenue: 5800,  profit: -680, active: false },
      { label: '2022', revenue: 6500,  profit: -210, active: false },
      { label: '2023', revenue: 7800,  profit: 280,  active: false },
      { label: '2024', revenue: 10100, profit: 1320, active: false },
      { label: '2025', revenue: 13500, profit: 2380, active: true  },
    ],
    growthData: [
      { label: '1Y',      labelSuffix: ' (TTM)', revenue: '+34%', profit: '+80%', profitPositive: true },
      { label: '3Y CAGR', labelSuffix: '',       revenue: '+20%', profit: '+92%', profitPositive: true },
      { label: '5Y CAGR', labelSuffix: '',       revenue: '+18%', profit: '+44%', profitPositive: true },
      { label: '10Y CAGR',labelSuffix: '',       revenue: '+9%',  profit: '+12%', profitPositive: true },
    ],
    insights: [
      'Order book at 5 GW — highest ever; execution picking up pace',
      'Rotor blade exports to Europe growing at 40% YoY',
      'Debt-free balance sheet driving re-rating by analysts',
    ],
    about: {
      details: [
        { label: 'MD/CEO',              value: 'JP Morgan' },
        { label: 'Parent organization', value: 'Suzlon Group' },
        { label: 'NSE Symbol',          value: 'SUZLON' },
        { label: 'Industry',            value: 'Renewable Energy / Wind', underline: true },
      ],
      description: 'Suzlon Energy is India\'s largest renewable energy solutions provider, specialising in wind turbine manufacturing and installation. Founded in 1995, it has installed over 20 GW of wind energy capacity across India and 17 other countries.',
    },
    mdBuyPct: 58.2, mdSellPct: 41.8,
    mdBids: [
      { price: 57.95, qty: 180000 }, { price: 57.90, qty: 124000 },
      { price: 57.85, qty: 89000  }, { price: 57.80, qty: 52000  },
      { price: 57.75, qty: 28000  },
    ],
    mdAsks: [
      { price: 58.00, qty: 160000 }, { price: 58.05, qty: 112000 },
      { price: 58.10, qty: 76000  }, { price: 58.15, qty: 44000  },
      { price: 58.20, qty: 22000  },
    ],
    mdBidTotal: 62000000, mdAskTotal: 62000000,
  },

  ICICIBANK: {
    symbol: 'ICICIBANK.NS',
    ticker: 'ICICIBANK',
    exchange: 'NSE',
    shortName: 'ICICI Bank',
    name: 'ICICI Bank Ltd',
    logoUri: 'https://www.figma.com/api/mcp/asset/fe2da7a8-f4b1-4a43-a183-c4bee2097022',
    avgPrice: 890.0,
    shares: 15,
    quarterlyData: [
      { label: "Dec '24", revenue: 21800, profit: 11792, active: false },
      { label: "Mar '25", revenue: 23200, profit: 12630, active: false },
      { label: "Jun '25", revenue: 24800, profit: 13500, active: false },
      { label: "Sep '25", revenue: 26300, profit: 14800, active: false },
      { label: "Dec '25", revenue: 28100, profit: 16200, active: true  },
    ],
    yearlyData: [
      { label: '2021', revenue: 70000,  profit: 16600, active: false },
      { label: '2022', revenue: 78000,  profit: 22000, active: false },
      { label: '2023', revenue: 89000,  profit: 31500, active: false },
      { label: '2024', revenue: 107000, profit: 40800, active: false },
      { label: '2025', revenue: 128000, profit: 50000, active: true  },
    ],
    growthData: [
      { label: '1Y',      labelSuffix: ' (TTM)', revenue: '+20%', profit: '+23%', profitPositive: true },
      { label: '3Y CAGR', labelSuffix: '',       revenue: '+13%', profit: '+18%', profitPositive: true },
      { label: '5Y CAGR', labelSuffix: '',       revenue: '+13%', profit: '+25%', profitPositive: true },
      { label: '10Y CAGR',labelSuffix: '',       revenue: '+11%', profit: '+16%', profitPositive: true },
    ],
    insights: [
      'Net NPA at 0.42% — a decadal low; asset quality improving',
      'Retail loan book grew 18% YoY, driving NII expansion',
      'iMobile Pay reached 16M users — largest bank super-app in India',
    ],
    about: {
      details: [
        { label: 'MD/CEO',              value: 'Sandeep Bakhshi' },
        { label: 'Parent organization', value: 'ICICI Group' },
        { label: 'NSE Symbol',          value: 'ICICIBANK' },
        { label: 'Industry',            value: 'Private Sector Banking', underline: true },
      ],
      description: 'ICICI Bank is India\'s second-largest private sector bank by assets. Headquartered in Mumbai, it offers a wide range of banking and financial services to retail, SME, and corporate customers across India and 15 other countries.',
    },
    mdBuyPct: 54.3, mdSellPct: 45.7,
    mdBids: [
      { price: 1283.50, qty: 4200 }, { price: 1283.40, qty: 3100 },
      { price: 1283.30, qty: 2200 }, { price: 1283.20, qty: 1400 },
      { price: 1283.10, qty: 800  },
    ],
    mdAsks: [
      { price: 1283.60, qty: 3800 }, { price: 1283.70, qty: 2700 },
      { price: 1283.80, qty: 1900 }, { price: 1283.90, qty: 1100 },
      { price: 1284.00, qty: 600  },
    ],
    mdBidTotal: 14800000, mdAskTotal: 14800000,
  },

  SBIN: {
    symbol: 'SBIN.NS',
    ticker: 'SBIN',
    exchange: 'NSE',
    shortName: 'SBI',
    name: 'State Bank of India',
    logoUri: 'https://www.figma.com/api/mcp/asset/e12c30ba-2c53-4d05-94c6-ca59495fed0a',
    avgPrice: 590.0,
    shares: 20,
    quarterlyData: [
      { label: "Dec '24", revenue: 67800, profit: 16891, active: false },
      { label: "Mar '25", revenue: 68900, profit: 18100, active: false },
      { label: "Jun '25", revenue: 70200, profit: 19200, active: false },
      { label: "Sep '25", revenue: 72100, profit: 20500, active: false },
      { label: "Dec '25", revenue: 74500, profit: 21800, active: true  },
    ],
    yearlyData: [
      { label: '2021', revenue: 240000, profit: 20400, active: false },
      { label: '2022', revenue: 258000, profit: 31700, active: false },
      { label: '2023', revenue: 287000, profit: 50200, active: false },
      { label: '2024', revenue: 320000, profit: 61100, active: false },
      { label: '2025', revenue: 358000, profit: 74000, active: true  },
    ],
    growthData: [
      { label: '1Y',      labelSuffix: ' (TTM)', revenue: '+12%', profit: '+21%', profitPositive: true },
      { label: '3Y CAGR', labelSuffix: '',       revenue: '+11%', profit: '+32%', profitPositive: true },
      { label: '5Y CAGR', labelSuffix: '',       revenue: '+8%',  profit: '+29%', profitPositive: true },
      { label: '10Y CAGR',labelSuffix: '',       revenue: '+7%',  profit: '+14%', profitPositive: true },
    ],
    insights: [
      'YONO platform surpassed 90M registered users in Q3',
      'Loan growth strong at 14% YoY; home loans driving retail book',
      'Gross NPA down to 2.1% — best in 10 years',
    ],
    about: {
      details: [
        { label: 'Chairman',            value: 'CS Setty' },
        { label: 'Parent organization', value: 'Government of India (57%)' },
        { label: 'NSE Symbol',          value: 'SBIN' },
        { label: 'Industry',            value: 'Public Sector Banking', underline: true },
      ],
      description: 'State Bank of India is India\'s largest public sector bank and the largest bank by assets, with over ₹62 lakh crore in total assets. Founded in 1955, it operates 22,000+ branches and 65,000+ ATMs across India.',
    },
    mdBuyPct: 49.8, mdSellPct: 50.2,
    mdBids: [
      { price: 794.80, qty: 22000 }, { price: 794.75, qty: 15400 },
      { price: 794.70, qty: 9800  }, { price: 794.65, qty: 5600  },
      { price: 794.60, qty: 2800  },
    ],
    mdAsks: [
      { price: 794.85, qty: 19600 }, { price: 794.90, qty: 13200 },
      { price: 794.95, qty: 8400  }, { price: 795.00, qty: 4800  },
      { price: 795.05, qty: 2200  },
    ],
    mdBidTotal: 38000000, mdAskTotal: 38000000,
  },

  HDFCBANK: {
    symbol: 'HDFCBANK.NS',
    ticker: 'HDFCBANK',
    exchange: 'NSE',
    shortName: 'HDFC Bank',
    name: 'HDFC Bank Ltd',
    logoUri: 'https://www.figma.com/api/mcp/asset/0904d0cc-5997-4c79-89cf-3396d94541aa',
    avgPrice: 1520.0,
    shares: 8,
    quarterlyData: [
      { label: "Dec '24", revenue: 31900, profit: 16600, active: false },
      { label: "Mar '25", revenue: 33100, profit: 17500, active: false },
      { label: "Jun '25", revenue: 34500, profit: 18500, active: false },
      { label: "Sep '25", revenue: 36200, profit: 19700, active: false },
      { label: "Dec '25", revenue: 37800, profit: 21000, active: true  },
    ],
    yearlyData: [
      { label: '2021', revenue: 85000,  profit: 31116, active: false },
      { label: '2022', revenue: 98000,  profit: 36961, active: false },
      { label: '2023', revenue: 136000, profit: 44109, active: false },
      { label: '2024', revenue: 160000, profit: 60812, active: false },
      { label: '2025', revenue: 155000, profit: 65400, active: true  },
    ],
    growthData: [
      { label: '1Y',      labelSuffix: ' (TTM)', revenue: '-3%',  profit: '+8%',  profitPositive: true },
      { label: '3Y CAGR', labelSuffix: '',       revenue: '+14%', profit: '+14%', profitPositive: true },
      { label: '5Y CAGR', labelSuffix: '',       revenue: '+13%', profit: '+16%', profitPositive: true },
      { label: '10Y CAGR',labelSuffix: '',       revenue: '+14%', profit: '+19%', profitPositive: true },
    ],
    insights: [
      'Post-merger credit-deposit ratio normalising — headwind easing',
      'Net interest margin steady at 3.4% despite deposit cost pressure',
      'Digital transactions crossed 80% of total volumes in Q3',
    ],
    about: {
      details: [
        { label: 'MD/CEO',              value: 'Sashidhar Jagdishan' },
        { label: 'Parent organization', value: 'HDFC Group' },
        { label: 'NSE Symbol',          value: 'HDFCBANK' },
        { label: 'Industry',            value: 'Private Sector Banking', underline: true },
      ],
      description: 'HDFC Bank is India\'s largest private sector bank by assets. Formed in 1994 and headquartered in Mumbai, it provides a full range of banking, insurance, and asset management services to 90M+ customers across 8,700+ branches.',
    },
    mdBuyPct: 51.6, mdSellPct: 48.4,
    mdBids: [
      { price: 1923.70, qty: 5400 }, { price: 1923.60, qty: 3800 },
      { price: 1923.50, qty: 2600 }, { price: 1923.40, qty: 1600 },
      { price: 1923.30, qty: 800  },
    ],
    mdAsks: [
      { price: 1923.80, qty: 4900 }, { price: 1923.90, qty: 3400 },
      { price: 1924.00, qty: 2200 }, { price: 1924.10, qty: 1300 },
      { price: 1924.20, qty: 600  },
    ],
    mdBidTotal: 22000000, mdAskTotal: 22000000,
  },

  KOTAKBANK: {
    symbol: 'KOTAKBANK.NS',
    ticker: 'KOTAKBANK',
    exchange: 'NSE',
    shortName: 'Kotak Bank',
    name: 'Kotak Mahindra Bank Ltd',
    logoUri: 'https://www.figma.com/api/mcp/asset/4f4f5312-8abf-49ff-a8d9-929810a02d88',
    avgPrice: 1680.0,
    shares: 12,
    quarterlyData: [
      { label: "Dec '24", revenue: 11400, profit: 4700, active: false },
      { label: "Mar '25", revenue: 11900, profit: 4950, active: false },
      { label: "Jun '25", revenue: 12500, profit: 5200, active: false },
      { label: "Sep '25", revenue: 13100, profit: 5500, active: false },
      { label: "Dec '25", revenue: 13900, profit: 5900, active: true  },
    ],
    yearlyData: [
      { label: '2021', revenue: 32000, profit: 8300,  active: false },
      { label: '2022', revenue: 36000, profit: 10200, active: false },
      { label: '2023', revenue: 43000, profit: 12800, active: false },
      { label: '2024', revenue: 51000, profit: 15400, active: false },
      { label: '2025', revenue: 60000, profit: 18500, active: true  },
    ],
    growthData: [
      { label: '1Y',      labelSuffix: ' (TTM)', revenue: '+18%', profit: '+20%', profitPositive: true },
      { label: '3Y CAGR', labelSuffix: '',       revenue: '+14%', profit: '+16%', profitPositive: true },
      { label: '5Y CAGR', labelSuffix: '',       revenue: '+13%', profit: '+17%', profitPositive: true },
      { label: '10Y CAGR',labelSuffix: '',       revenue: '+16%', profit: '+20%', profitPositive: true },
    ],
    insights: [
      '811 zero-balance savings accounts now at 40M — largest in India',
      'Securities business market share growing at PE firm valuations',
      'NIM at 5.0% — premium over peers sustained',
    ],
    about: {
      details: [
        { label: 'MD/CEO',              value: 'Ashok Vaswani' },
        { label: 'Parent organization', value: 'Kotak Mahindra Group' },
        { label: 'NSE Symbol',          value: 'KOTAKBANK' },
        { label: 'Industry',            value: 'Private Sector Banking', underline: true },
      ],
      description: 'Kotak Mahindra Bank is India\'s fourth-largest private bank. Founded in 1985 as an NBFC and converted to a bank in 2003, it offers banking, insurance, AMC, and securities services to 48M+ customers across 1,900+ branches.',
    },
    mdBuyPct: 53.0, mdSellPct: 47.0,
    mdBids: [
      { price: 2094.50, qty: 2800 }, { price: 2094.40, qty: 1900 },
      { price: 2094.30, qty: 1200 }, { price: 2094.20, qty: 700  },
      { price: 2094.10, qty: 350  },
    ],
    mdAsks: [
      { price: 2094.60, qty: 2500 }, { price: 2094.70, qty: 1700 },
      { price: 2094.80, qty: 1100 }, { price: 2094.90, qty: 600  },
      { price: 2095.00, qty: 280  },
    ],
    mdBidTotal: 12000000, mdAskTotal: 12000000,
  },

  AXISBANK: {
    symbol: 'AXISBANK.NS',
    ticker: 'AXISBANK',
    exchange: 'NSE',
    shortName: 'Axis Bank',
    name: 'Axis Bank Ltd',
    logoUri: 'https://www.figma.com/api/mcp/asset/505a9777-071c-4fe9-b46f-73adbe03278a',
    avgPrice: 1020.0,
    shares: 10,
    quarterlyData: [
      { label: "Dec '24", revenue: 14800, profit: 6300, active: false },
      { label: "Mar '25", revenue: 15600, profit: 6700, active: false },
      { label: "Jun '25", revenue: 16500, profit: 7100, active: false },
      { label: "Sep '25", revenue: 17500, profit: 7600, active: false },
      { label: "Dec '25", revenue: 18800, profit: 8200, active: true  },
    ],
    yearlyData: [
      { label: '2021', revenue: 36000, profit: 7200,  active: false },
      { label: '2022', revenue: 42000, profit: 11400, active: false },
      { label: '2023', revenue: 52000, profit: 15300, active: false },
      { label: '2024', revenue: 64000, profit: 21200, active: false },
      { label: '2025', revenue: 75000, profit: 26500, active: true  },
    ],
    growthData: [
      { label: '1Y',      labelSuffix: ' (TTM)', revenue: '+17%', profit: '+25%', profitPositive: true },
      { label: '3Y CAGR', labelSuffix: '',       revenue: '+13%', profit: '+22%', profitPositive: true },
      { label: '5Y CAGR', labelSuffix: '',       revenue: '+16%', profit: '+30%', profitPositive: true },
      { label: '10Y CAGR',labelSuffix: '',       revenue: '+12%', profit: '+18%', profitPositive: true },
    ],
    insights: [
      'Citibank India integration complete — 2.5M new premium customers added',
      'GNPA at 1.43%, a 10-year low for the bank',
      'Retail book mix now 62%, reducing wholesale credit risk',
    ],
    about: {
      details: [
        { label: 'MD/CEO',              value: 'Amitabh Chaudhry' },
        { label: 'Parent organization', value: 'Axis Bank Group' },
        { label: 'NSE Symbol',          value: 'AXISBANK' },
        { label: 'Industry',            value: 'Private Sector Banking', underline: true },
      ],
      description: 'Axis Bank is India\'s third-largest private sector bank. Founded in 1993 as UTI Bank and rebranded in 2007, it serves 30M+ customers through 5,100+ branches and offers retail, corporate, and international banking services.',
    },
    mdBuyPct: 50.5, mdSellPct: 49.5,
    mdBids: [
      { price: 1178.60, qty: 6200 }, { price: 1178.50, qty: 4100 },
      { price: 1178.40, qty: 2700 }, { price: 1178.30, qty: 1600 },
      { price: 1178.20, qty: 800  },
    ],
    mdAsks: [
      { price: 1178.70, qty: 5600 }, { price: 1178.80, qty: 3700 },
      { price: 1178.90, qty: 2400 }, { price: 1179.00, qty: 1400 },
      { price: 1179.10, qty: 680  },
    ],
    mdBidTotal: 16500000, mdAskTotal: 16500000,
  },
};
