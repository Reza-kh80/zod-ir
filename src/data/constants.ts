const BILLS_CDN = 'https://cdn.jsdelivr.net/gh/Reza-kh80/zod-ir@main/src/assets/logos/bills' as const;
const BANKS_CDN = 'https://cdn.jsdelivr.net/gh/Reza-kh80/zod-ir@main/src/assets/logos/banks' as const;
const OPERATORS_CDN = 'https://cdn.jsdelivr.net/gh/Reza-kh80/zod-ir@main/src/assets/logos/operators' as const;

const BANKS = {
  603_799: { name: 'Melli', label: 'ملی', color: '#EF3F3E', logo: `${BANKS_CDN}/melli.svg` },
  589_210: { name: 'Sepah', label: 'سپه', color: '#FFC600', logo: `${BANKS_CDN}/sepah.svg` },
  627_648: { name: 'ToseeSaderat', label: 'توسعه صادرات', color: '#EDB12C', logo: `${BANKS_CDN}/tosee-saderat.svg` },
  627_961: { name: 'SanatMadar', label: 'صنعت و معدن', color: '#B3986D', logo: `${BANKS_CDN}/sanat-madan.svg` },
  603_770: { name: 'Keshavarzi', label: 'کشاورزی', color: '#4E7A46', logo: `${BANKS_CDN}/keshavarzi.svg` },
  628_023: { name: 'Maskan', label: 'مسکن', color: '#F05A23', logo: `${BANKS_CDN}/maskan.svg` },
  627_760: { name: 'PostBank', label: 'پست بانک', color: '#00764D', logo: `${BANKS_CDN}/post-bank.svg` },
  502_908: { name: 'ToseeTaavon', label: 'توسعه تعاون', color: '#0064A6', logo: `${BANKS_CDN}/tosee-taavon.svg` },
  627_412: { name: 'EghtesadNovin', label: 'اقتصاد نوین', color: '#652D86', logo: `${BANKS_CDN}/eghtesad-novin.svg` },
  622_106: { name: 'Parsian', label: 'پارسیان', color: '#B3282D', logo: `${BANKS_CDN}/parsian.svg` },
  502_229: { name: 'Pasargad', label: 'پاسارگاد', color: '#FFC72C', logo: `${BANKS_CDN}/pasargad.svg` },
  627_488: { name: 'Karafarin', label: 'کارآفرین', color: '#3B9C56', logo: `${BANKS_CDN}/karafarin.svg` },
  621_986: { name: 'Saman', label: 'سامان', color: '#006DB6', logo: `${BANKS_CDN}/saman.svg` },
  639_346: { name: 'Sina', label: 'سینا', color: '#004E8A', logo: `${BANKS_CDN}/sina.svg` },
  639_607: { name: 'Sarmayeh', label: 'سرمایه', color: '#0077B6', logo: `${BANKS_CDN}/sarmayeh.svg` },
  636_214: { name: 'Ayandeh', label: 'آینده', color: '#8B5F34', logo: `${BANKS_CDN}/ayandeh.svg` },
  502_806: { name: 'Shahr', label: 'شهر', color: '#ED3438', logo: `${BANKS_CDN}/shahr.svg` },
  502_938: { name: 'Day', label: 'دی', color: '#0099CC', logo: `${BANKS_CDN}/day.svg` },
  603_769: { name: 'Saderat', label: 'صادرات', color: '#1A3266', logo: `${BANKS_CDN}/saderat.svg` },
  610_433: { name: 'Mellat', label: 'ملت', color: '#D70005', logo: `${BANKS_CDN}/mellat.svg` },
  627_353: { name: 'Tejarat', label: 'تجارت', color: '#005696', logo: `${BANKS_CDN}/tejarat.svg` },
  585_983: { name: 'Tejarat', label: 'تجارت', color: '#005696', logo: `${BANKS_CDN}/tejarat.svg` },
  589_463: { name: 'Refah', label: 'رفاه', color: '#2B3C8E', logo: `${BANKS_CDN}/refah.svg` },
  627_381: { name: 'Ansar', label: 'انصار', color: '#F7B500', logo: `${BANKS_CDN}/ansar.svg` },
  505_785: { name: 'IranZamin', label: 'ایران زمین', color: '#92278F', logo: `${BANKS_CDN}/iran-zamin.svg` },
  505_416: { name: 'Gardeshgari', label: 'گردشگری', color: '#1D3265', logo: `${BANKS_CDN}/gardeshgari.svg` },
  636_949: { name: 'Hekmat', label: 'حکمت', color: '#5F2C83', logo: `${BANKS_CDN}/hekmat.svg` },
  505_801: { name: 'Kosar', label: 'کوثر', color: '#C62828', logo: `${BANKS_CDN}/kosar.svg` },
  606_373: { name: 'MehrIran', label: 'مهر ایران', color: '#359E49', logo: `${BANKS_CDN}/mehr-iran.svg` },
  504_172: { name: 'Resalat', label: 'رسالت', color: '#000000', logo: `${BANKS_CDN}/resalat.svg` },
  523_388: { name: 'Pasargad', label: 'پاسارگاد (ویپاد)', color: '#FFC72C', logo: `${BANKS_CDN}/pasargad.svg` },
  505_809: { name: 'Khavarmianeh', label: 'خاورمیانه', color: '#1F2B5B', logo: `${BANKS_CDN}/khavarmianeh.svg` },
} as const;

const MOBILE_OPERATORS = {
  MCI: {
    label: 'همراه اول',
    logo: `${OPERATORS_CDN}/mci.svg`,
    prefixes: ['0910', '0911', '0912', '0913', '0914', '0915', '0916', '0917', '0918', '0919', '0990', '0991', '0992', '0993', '0994'],
  },
  Irancell: {
    label: 'ایرانسل',
    logo: `${OPERATORS_CDN}/irancell.svg`,
    prefixes: ['0930', '0933', '0935', '0936', '0937', '0938', '0939', '0901', '0902', '0903', '0904', '0905', '0941'],
  },
  Rightel: { label: 'رایتل', logo: `${OPERATORS_CDN}/rightel.svg`, prefixes: ['0920', '0921', '0922', '0923'] },
  Shatel: { label: 'شاتل موبایل', logo: `${OPERATORS_CDN}/shatel.svg`, prefixes: ['0998'] },
  Taliya: { label: 'تالیا', logo: `${OPERATORS_CDN}/taliya.png`, prefixes: ['0932'] },
} as const;

const BILL_TYPES = {
  1: { label: 'آب', slug: 'water', color: '#00a8ff', logo: `${BILLS_CDN}/water.svg` },
  2: { label: 'برق', slug: 'electricity', color: '#fbc531', logo: `${BILLS_CDN}/electricity.svg` },
  3: { label: 'گاز', slug: 'gas', color: '#e84118', logo: `${BILLS_CDN}/gas.svg` },
  4: { label: 'تلفن ثابت', slug: 'phone', color: '#273c75', logo: `${BILLS_CDN}/phone.svg` },
  5: { label: 'تلفن همراه', slug: 'mobile', color: '#8c7ae6', logo: `${BILLS_CDN}/mobile.svg` },
  6: { label: 'عوارض شهرداری', slug: 'municipality', color: '#44bd32', logo: `${BILLS_CDN}/municipality.svg` },
  9: { label: 'جرایم رانندگی', slug: 'traffic', color: '#c23616', logo: `${BILLS_CDN}/traffic.svg` },
} as const;

const SHEBA_CODES = {
  '011': '627961',
  '012': '610433',
  '013': '589463',
  '014': '628023',
  '015': '589210',
  '016': '603770',
  '017': '603799',
  '018': '627353',
  '019': '603769',
  '020': '627648',
  '021': '627760',
  '022': '502908',
  '053': '627488',
  '054': '622106',
  '055': '627412',
  '056': '621986',
  '057': '502229',
  '058': '639607',
  '059': '639346',
  '060': '606373',
  '061': '502806',
  '062': '636214',
  '063': '627381',
  '064': '505416',
  '065': '636949',
  '066': '502938',
  '069': '505785',
  '070': '504172',
  '078': '505809',
} as const;

export { BANKS, BILL_TYPES, SHEBA_CODES, MOBILE_OPERATORS };
