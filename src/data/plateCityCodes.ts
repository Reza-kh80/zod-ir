const PLATE_CITY_CODES = [
  {
    province: 'آذربایجان شرقی',
    codes: [
      {
        code: '15',
        details: [
          { city: 'تبریز', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
        ],
      },
      {
        code: '25',
        details: [
          { city: 'اهر', letters: ['س'] },
          { city: 'آذرشهر', letters: ['ی'] },
          { city: 'بستان‌آباد', letters: ['م'] },
          { city: 'بناب', letters: ['ل'] },
          { city: 'جلفا', letters: ['ط'] },
          { city: 'سراب', letters: ['ص'] },
          { city: 'شبستر', letters: ['ن'] },
          { city: 'کلیبر', letters: ['و'] },
          { city: 'مراغه', letters: ['ب'] },
          { city: 'مرند', letters: ['ج'] },
          { city: 'میانه', letters: ['د'] },
          { city: 'هریس', letters: ['ه'] },
          { city: 'هشترود', letters: ['ق'] },
        ],
      },
      {
        code: '35',
        details: [
          { city: 'اسکو', letters: ['ب'] },
          { city: 'مرند', letters: ['ط'] },
          { city: 'مراغه', letters: ['ق'] },
          { city: 'تبریز', letters: ['ل', 'م'] },
          { city: 'آذرشهر', letters: ['ص'] },
          { city: 'اهر', letters: ['ن'] },
          { city: 'بناب', letters: ['س'] },
          { city: 'بستان آباد', letters: ['ی'] },
          { city: 'جلفا', letters: ['ه'] },
          { city: 'سراب', letters: ['و'] },
          { city: 'شبستر', letters: ['د'] },
          { city: 'کلیبر', letters: ['ج'] },
          { city: 'میانه', letters: ['ز'] },
          { city: 'هریس', letters: ['الف'] },
          { city: 'هشترود', letters: ['ت'] },
          { city: 'تبریز و چاراویماق', letters: ['س'] },
        ],
      },
    ],
  },
  {
    province: 'آذربایجان غربی',
    codes: [
      {
        code: '17',
        details: [
          {
            city: 'ارومیه',
            letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه'],
          },
          { city: 'خوی', letters: ['م'] },
        ],
      },
      {
        code: '27',
        details: [
          { city: 'خوی', letters: ['ب'] },
          { city: 'مهاباد', letters: ['ج'] },
          { city: 'ماکو', letters: ['د'] },
          { city: 'سلماس', letters: ['س'] },
          { city: 'نقده', letters: ['ص'] },
          { city: 'میاندوآب', letters: ['ط', 'ن'] },
          { city: 'تکاب', letters: ['ق'] },
          { city: 'شاهین‌دژ', letters: ['ل'] },
          { city: 'سردشت', letters: ['م'] },
          { city: 'بوکان', letters: ['ن'] },
          { city: 'چالدران', letters: ['ه'] },
          { city: 'پیرانشهر', letters: ['و'] },
          { city: 'اشنویه', letters: ['ی'] },
        ],
      },
      {
        code: '37',
        details: [
          { city: 'خوی', letters: ['ب'] },
          { city: 'میاندوآب', letters: ['ج'] },
          { city: 'نقده', letters: ['د'] },
          { city: 'مهاباد', letters: ['ص'] },
          { city: 'بوکان', letters: ['ط'] },
          { city: 'سلماس', letters: ['ق'] },
          { city: 'ماکو', letters: ['ل'] },
        ],
      },
    ],
  },
  {
    province: 'اردبیل',
    codes: [
      {
        code: '91',
        details: [
          { city: 'اردبیل', letters: ['ب', 'ج', 'د', 'س', 'م', 'و', 'ی'] },
          { city: 'پارس‌آباد', letters: ['ص', 'م', 'و', 'ی'] },
          { city: 'خلخال', letters: ['ط'] },
          { city: 'گرمی', letters: ['ل'] },
          { city: 'بیله‌سوار', letters: ['ل'] },
          { city: 'مشکین‌شهر', letters: ['ل', 'ن'] },
          { city: 'نیر', letters: ['م'] },
          { city: 'کوثر', letters: ['م', 'و'] },
          { city: 'نمین', letters: ['ن'] },
        ],
      },
    ],
  },
  {
    province: 'اصفهان',
    codes: [
      {
        code: '13',
        details: [
          { city: 'اصفهان', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
          { city: 'فلاورجان', letters: ['ص'] },
        ],
      },
      {
        code: '23',
        details: [
          { city: 'کاشان', letters: ['ب'] },
          { city: 'نجف‌آباد', letters: ['ج'] },
          { city: 'شهرضا', letters: ['د'] },
          { city: 'خمینی‌شهر', letters: ['س'] },
          { city: 'گلپایگان', letters: ['ص'] },
          { city: 'نطنز', letters: ['ط'] },
          { city: 'اردستان', letters: ['ق'] },
          { city: 'خوانسار', letters: ['ل'] },
          { city: 'نایین', letters: ['م'] },
          { city: 'سمیرم', letters: ['ن'] },
          { city: 'فلاورجان', letters: ['ه'] },
          { city: 'فریدون‌شهر', letters: ['و'] },
          { city: 'لنجان', letters: ['ی'] },
        ],
      },
      {
        code: '43',
        details: [
          { city: 'فریدن', letters: ['ب'] },
          { city: 'مبارکه', letters: ['ج', 'ط'] },
          { city: 'شاهین‌شهر و میمه', letters: ['د', 'ل'] },
          { city: 'آران و بیدگل', letters: ['س'] },
          { city: 'تیران و کرون', letters: ['ص'] },
          { city: 'دهاقان', letters: ['ق'] },
          { city: 'نجف‌آباد', letters: ['م'] },
          { city: 'خمینی‌شهر', letters: ['ن'] },
          { city: 'لنجان', letters: ['ه'] },
          { city: 'کاشان', letters: ['و'] },
          { city: 'فلاورجان', letters: ['ی'] },
        ],
      },
      {
        code: '53',
        details: [
          { city: 'اصفهان', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ق', 'ل', 'و'] },
          { city: 'شهرضا', letters: ['ط'] },
          { city: 'شاهین‌شهر و میمه', letters: ['م'] },
          { city: 'نجف‌آباد', letters: ['ن'] },
          { city: 'کاشان', letters: ['ه'] },
          { city: 'خمینی‌شهر', letters: ['ی'] },
        ],
      },
      {
        code: '67',
        details: [
          { city: 'اصفهان', letters: ['ب', 'ج', 'د', 'س', 'ط', 'ل', 'م', 'ن', 'و'] },
          { city: 'شاهین‌شهر و میمه', letters: ['ق'] },
          { city: 'لنجان', letters: ['ص'] },
        ],
      },
    ],
  },
  {
    province: 'البرز',
    codes: [
      {
        code: '21',
        details: [
          { city: 'ساوجبلاغ', letters: ['ص'] },
          { city: 'کرج', letters: ['ل', 'و'] },
        ],
      },
      {
        code: '30',
        details: [
          { city: 'کرج', letters: ['د', 'س', 'ل', 'م', 'ه'] },
        ],
      },
      {
        code: '38',
        details: [
          { city: 'کرج', letters: ['ب', 'د', 'س', 'م', 'ن', 'ه', 'ی'] },
        ],
      },
      {
        code: '68',
        details: [
          { city: 'کرج', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
        ],
      },
      {
        code: '78',
        details: [
          { city: 'ساوجبلاغ', letters: ['ط'] },
        ],
      },
    ],
  },
  {
    province: 'ایلام',
    codes: [
      {
        code: '98',
        details: [
          { city: 'ایلام', letters: ['ب', 'ج', 'د'] },
          { city: 'مهران', letters: ['ص'] },
          { city: 'بدره', letters: ['ط'] },
          { city: 'دهلران', letters: ['ق'] },
          { city: 'چرداول', letters: ['ل'] },
          { city: 'ایوان', letters: ['م'] },
          { city: 'آبدانان', letters: ['ن'] },
        ],
      },
    ],
  },
  {
    province: 'بوشهر',
    codes: [
      {
        code: '48',
        details: [
          { city: 'بوشهر', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
        ],
      },
      {
        code: '58',
        details: [
          { city: 'دشتستان', letters: ['ب', 'م', 'و'] },
          { city: 'گناوه', letters: ['ج', 'ه'] },
          { city: 'کنگان، عسلویه', letters: ['د', 'ن'] },
          { city: 'تنگستان', letters: ['س'] },
          { city: 'دشتی', letters: ['ص', 'ی'] },
          { city: 'دیر', letters: ['ط'] },
          { city: 'دیلم', letters: ['ق'] },
          { city: 'جم', letters: ['ل'] },
        ],
      },
    ],
  },
  {
    province: 'تهران',
    codes: [
      {
        code: '11, 22, 33, 44, 55, 66, 77, 88, 99, 10, 20, 40, 50, 60',
        details: [
          { city: 'تهران (شهر)', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
        ],
      },
      {
        code: '21',
        details: [
          { city: 'اسلامشهر', letters: ['ب', 'ی'] },
          { city: 'رباط‌کریم', letters: ['م'] },
          { city: 'پاکدشت', letters: ['ل'] },
        ],
      },
      {
        code: '30',
        details: [
          { city: 'اسلامشهر', letters: ['ق'] },
          { city: 'پاکدشت', letters: ['ن'] },
        ],
      },
      {
        code: '78',
        details: [
          { city: 'اسلامشهر', letters: ['ب', 'ق'] },
          { city: 'رباط‌کریم', letters: ['ج'] },
          { city: 'ری', letters: ['ن'] },
          { city: 'شمیرانات', letters: ['و'] },
        ],
      },
      {
        code: '38',
        details: [
          { city: 'رباط‌کریم', letters: ['ل'] },
        ],
      },
    ],
  },
  {
    province: 'چهارمحال و بختیاری',
    codes: [
      {
        code: '71',
        details: [
          { city: 'شهرکرد', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
        ],
      },
      {
        code: '81',
        details: [
          { city: 'بروجن', letters: ['ب', 'ق'] },
          { city: 'لردگان', letters: ['س'] },
          { city: 'فارسان', letters: ['د'] },
          { city: 'اردل', letters: ['ج'] },
          { city: 'کوهرنگ', letters: ['ص'] },
          { city: 'کیار', letters: ['ط'] },
          { city: 'بن', letters: ['ق'] },
        ],
      },
    ],
  },
  {
    province: 'خراسان شمالی',
    codes: [
      {
        code: '32',
        details: [
          { city: 'بجنورد', letters: ['ب', 'ج', 'د', 'س', 'ص'] },
        ],
      },
      {
        code: '26',
        details: [
          { city: 'شیروان', letters: ['ص', 'ب'] },
          { city: 'اسفراین', letters: ['ج', 'ط'] },
          { city: 'مانه و سملقان', letters: ['د', 'ل'] },
          { city: 'فاروج', letters: ['م'] },
          { city: 'بجنورد', letters: ['ب', 'ج', 'د'] },
          { city: 'جاجرم و گرمه', letters: ['ق'] },
        ],
      },
    ],
  },
  {
    province: 'خراسان رضوی',
    codes: [
      {
        code: '12',
        details: [
          { city: 'مشهد', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
        ],
      },
      {
        code: '32',
        details: [
          { city: 'نیشابور', letters: ['ب', 'ی'] },
          { city: 'سبزوار', letters: ['ج'] },
          { city: 'تربت‌جام', letters: ['ص'] },
          { city: 'قوچان', letters: ['ط'] },
          { city: 'گناباد', letters: ['ق'] },
          { city: 'تربت‌حیدریه', letters: ['ل', 'ن'] },
          { city: 'کاشمر', letters: ['م'] },
          { city: 'تایباد', letters: ['ه'] },
          { city: 'مشهد', letters: ['و'] },
        ],
      },
      {
        code: '36',
        details: [
          { city: 'مشهد', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ه', 'و'] },
          { city: 'کاشمر', letters: ['ق'] },
          { city: 'نیشابور', letters: ['ل'] },
          { city: 'سبزوار', letters: ['م'] },
          { city: 'تربت حیدریه', letters: ['ن'] },
          { city: 'تربت‌جام', letters: ['ی'] },
        ],
      },
      {
        code: '42',
        details: [
          { city: 'فریمان', letters: ['ب'] },
          { city: 'مشهد', letters: ['ج', 'ق', 'ه', 'و'] },
          { city: 'سرخس', letters: ['د'] },
          { city: 'درگز', letters: ['س'] },
          { city: 'خواف', letters: ['ص'] },
          { city: 'چناران', letters: ['ط'] },
          { city: 'بردسکن', letters: ['ل'] },
          { city: 'رشتخوار', letters: ['م'] },
          { city: 'سبزوار', letters: ['ن'] },
          { city: 'تربت حیدریه', letters: ['ی'] },
          { city: 'کلات', letters: ['ی'] },
        ],
      },
      {
        code: '74',
        details: [
          { city: 'مشهد', letters: ['ب', 'د', 'س', 'ص', 'ق', 'م', 'ن', 'ه', 'و', 'ی'] },
          { city: 'قوچان', letters: ['ج'] },
          { city: 'نیشابور', letters: ['ط'] },
          { city: 'سبزوار', letters: ['ل'] },
          { city: 'گناباد', letters: ['ن'] },
        ],
      },
    ],
  },
  {
    province: 'خراسان جنوبی',
    codes: [
      {
        code: '32',
        details: [
          { city: 'بیرجند', letters: ['د'] },
        ],
      },
      {
        code: '52',
        details: [
          { city: 'بیرجند', letters: ['ب', 'ج', 'د'] },
          { city: 'قاینات', letters: ['ص'] },
          { city: 'فردوس', letters: ['ط'] },
          { city: 'نهبندان', letters: ['ق'] },
          { city: 'سربیشه', letters: ['ل'] },
        ],
      },
      {
        code: '64',
        details: [
          { city: 'طبس', letters: ['ق'] },
        ],
      },
    ],
  },
  {
    province: 'خوزستان',
    codes: [
      {
        code: '14',
        details: [
          { city: 'اهواز', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
        ],
      },
      {
        code: '24',
        details: [
          { city: 'آبادان', letters: ['ب', 'ق'] },
          { city: 'خرمشهر', letters: ['ج'] },
          { city: 'دزفول', letters: ['د'] },
          { city: 'بهبهان', letters: ['س'] },
          { city: 'مسجد سلیمان', letters: ['ص'] },
          { city: 'ماهشهر', letters: ['ط', 'ه'] },
          { city: 'دشت آزادگان', letters: ['ق'] },
          { city: 'رامهرمز', letters: ['ل'] },
          { city: 'اندیمشک', letters: ['م'] },
          { city: 'شوشتر', letters: ['ن'] },
          { city: 'شادگان', letters: ['ه'] },
          { city: 'شوش', letters: ['و'] },
          { city: 'ایذه', letters: ['ی'] },
        ],
      },
      {
        code: '34',
        details: [
          { city: 'باغملک', letters: ['ب'] },
          { city: 'شوش', letters: ['ب'] },
          { city: 'امیدیه', letters: ['ج'] },
          { city: 'خرمشهر', letters: ['د'] },
          { city: 'هندیجان', letters: ['د'] },
          { city: 'اندیمشک', letters: ['س'] },
          { city: 'لالی', letters: ['س'] },
          { city: 'دزفول', letters: ['ص', 'و'] },
          { city: 'ماهشهر', letters: ['ط'] },
          { city: 'آبادان', letters: ['ق'] },
          { city: 'بهبهان', letters: ['ن'] },
          { city: 'شوشتر', letters: ['ه'] },
          { city: 'اهواز', letters: ['ی'] },
        ],
      },
    ],
  },
  {
    province: 'زنجان',
    codes: [
      {
        code: '87',
        details: [
          { city: 'زنجان', letters: ['ب', 'د', 'ج', 'س', 'ص', 'ط'] },
        ],
      },
      {
        code: '97',
        details: [
          { city: 'ابهر', letters: ['ب', 'ق'] },
          { city: 'خدابنده', letters: ['ج'] },
          { city: 'خرم‌دره', letters: ['د'] },
          { city: 'ایجرود', letters: ['س'] },
          { city: 'طارم', letters: ['ص'] },
          { city: 'ماه‌نشان', letters: ['ط'] },
        ],
      },
    ],
  },
  {
    province: 'سمنان',
    codes: [
      {
        code: '86',
        details: [
          { city: 'سمنان', letters: ['ب', 'د', 'ج'] },
        ],
      },
      {
        code: '96',
        details: [
          { city: 'دامغان', letters: ['ب'] },
          { city: 'شاهرود', letters: ['ج', 'ط'] },
          { city: 'گرمسار', letters: ['د'] },
          { city: 'مهدی‌شهر', letters: ['س'] },
        ],
      },
    ],
  },
  {
    province: 'سیستان و بلوچستان',
    codes: [
      {
        code: '85',
        details: [
          { city: 'زاهدان', letters: ['ب', 'د', 'ج', 'س', 'ص', 'ط'] },
        ],
      },
      {
        code: '95',
        details: [
          { city: 'زابل', letters: ['ب', 'ل', 'و'] },
          { city: 'ایرانشهر', letters: ['ج', 'م'] },
          { city: 'خاش', letters: ['د'] },
          { city: 'سراوان', letters: ['س', 'ن'] },
          { city: 'نیکشهر', letters: ['ص'] },
          { city: 'سرباز', letters: ['ط'] },
          { city: 'چابهار', letters: ['ق'] },
        ],
      },
    ],
  },
  {
    province: 'فارس',
    codes: [
      {
        code: '63',
        details: [
          { city: 'شیراز', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و', 'ه', 'ی'] },
        ],
      },
      {
        code: '73',
        details: [
          { city: 'جهرم', letters: ['ب', 'ه'] },
          { city: 'لارستان', letters: ['ج'] },
          { city: 'داراب', letters: ['د'] },
          { city: 'فسا', letters: ['س'] },
          { city: 'کازرون', letters: ['ص'] },
          { city: 'فیروزآباد', letters: ['ط'] },
          { city: 'آباده', letters: ['ق'] },
          { city: 'مرودشت', letters: ['ل'] },
          { city: 'لامرد', letters: ['م'] },
          { city: 'نی‌ریز', letters: ['ن'] },
          { city: 'اقلید', letters: ['ه'] },
          { city: 'استهبان', letters: ['و'] },
          { city: 'سپیدان', letters: ['ی'] },
          { city: 'ممسنی', letters: ['ی'] },
        ],
      },
      {
        code: '83',
        details: [
          { city: 'ممسنی', letters: ['ب'] },
          { city: 'شیراز و شهرهای دیگر', letters: ['ج', 'ص', 'ط', 'ن'] },
          { city: 'قیر و کارزین', letters: ['د'] },
          { city: 'داراب، مهر، فیروزآباد', letters: ['س'] },
          { city: 'آباده، بوانات', letters: ['ق'] },
          { city: 'فراشبند', letters: ['ل'] },
          { city: 'لارستان', letters: ['م'] },
          { city: 'جهرم', letters: ['ه'] },
          { city: 'مرودشت', letters: ['و'] },
          { city: 'فسا', letters: ['ی'] },
        ],
      },
      {
        code: '93',
        details: [
          { city: 'شیراز', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'م', 'ن'] },
          { city: 'لارستان', letters: ['ل'] },
          { city: 'شیراز و شهرهای دیگر', letters: ['و', 'ی'] },
        ],
      },
    ],
  },
  {
    province: 'قزوین',
    codes: [
      {
        code: '79',
        details: [
          { city: 'قزوین', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م'] },
        ],
      },
      {
        code: '89',
        details: [
          { city: 'تاکستان', letters: ['ب', 'س'] },
          { city: 'بویین زهرا', letters: ['ج'] },
          { city: 'آبیک', letters: ['د'] },
        ],
      },
    ],
  },
  {
    province: 'قم',
    codes: [
      {
        code: '16',
        details: [
          { city: 'قم', letters: ['تمام حروف'] },
        ],
      },
    ],
  },
  {
    province: 'کردستان',
    codes: [
      {
        code: '51',
        details: [
          { city: 'سنندج', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و'] },
        ],
      },
      {
        code: '61',
        details: [
          { city: 'سقز', letters: ['ب', 'م'] },
          { city: 'بیجار', letters: ['ج'] },
          { city: 'بانه', letters: ['د', 'ه'] },
          { city: 'قروه', letters: ['س', 'ن'] },
          { city: 'مریوان', letters: ['ص', 'و'] },
          { city: 'دیواندره', letters: ['ط'] },
          { city: 'کامیاران', letters: ['ق'] },
          { city: 'سروآباد', letters: ['ل'] },
        ],
      },
    ],
  },
  {
    province: 'کرمان',
    codes: [
      {
        code: '45',
        details: [
          { city: 'کرمان', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن'] },
        ],
      },
      {
        code: '65',
        details: [
          { city: 'رفسنجان', letters: ['ب', 'ی'] },
          { city: 'بم', letters: ['ج'] },
          { city: 'سیرجان', letters: ['د'] },
          { city: 'بافت', letters: ['س'] },
          { city: 'جیرفت', letters: ['ص'] },
          { city: 'زرند', letters: ['ط'] },
          { city: 'کهنوج', letters: ['ق'] },
          { city: 'شهر بابک', letters: ['ل'] },
          { city: 'بردسیر', letters: ['م'] },
          { city: 'منوجان', letters: ['ن'] },
          { city: 'راور', letters: ['ه'] },
          { city: 'عنبرآباد', letters: ['و'] },
        ],
      },
      {
        code: '75',
        details: [
          { city: 'سیرجان', letters: ['ب', 'ص', 'م'] },
          { city: 'بم', letters: ['ج'] },
          { city: 'جیرفت', letters: ['د'] },
          { city: 'رفسنجان', letters: ['س', 'ل'] },
          { city: 'زرند', letters: ['ط'] },
          { city: 'کهنوج', letters: ['ق'] },
        ],
      },
    ],
  },
  {
    province: 'کرمانشاه',
    codes: [
      {
        code: '19',
        details: [
          { city: 'کرمانشاه', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'ه', 'و'] },
        ],
      },
      {
        code: '29',
        details: [
          { city: 'اسلام‌آباد غرب', letters: ['ب', 'ه'] },
          { city: 'گیلان غرب', letters: ['ج'] },
          { city: 'سرپل‌ذهاب', letters: ['د'] },
          { city: 'پاوه', letters: ['س'] },
          { city: 'کنگاور', letters: ['ص'] },
          { city: 'قصرشیرین', letters: ['ط'] },
          { city: 'سنقر/سقز', letters: ['ق'] },
          { city: 'جوانرود', letters: ['ل'] },
          { city: 'صحنه', letters: ['م'] },
          { city: 'هرسین', letters: ['ن'] },
          { city: 'ثلاث باباجانی', letters: ['و'] },
        ],
      },
    ],
  },
  {
    province: 'کهگیلویه و بویراحمد',
    codes: [
      {
        code: '49',
        details: [
          { city: 'یاسوج', letters: ['ب', 'ج', 'د'] },
          { city: 'گچساران', letters: ['ص', 'ل'] },
          { city: 'کهگیلویه', letters: ['ط'] },
          { city: 'دنا', letters: ['ق'] },
        ],
      },
    ],
  },
  {
    province: 'گلستان',
    codes: [
      {
        code: '59',
        details: [
          { city: 'گلستان', letters: ['ب', 'ج', 'د', 'س', 'ص'] },
          { city: 'گنبد کاووس', letters: ['ب', 'ه'] },
          { city: 'بندرترکمن', letters: ['ج'] },
          { city: 'کردکوی', letters: ['د'] },
          { city: 'علی‌آباد', letters: ['س'] },
          { city: 'آزادشهر', letters: ['ص'] },
          { city: 'مینودشت', letters: ['ط'] },
          { city: 'بندرگز', letters: ['ق'] },
          { city: 'رامیان', letters: ['ل'] },
          { city: 'آق‌قلا', letters: ['م'] },
          { city: 'کلاله', letters: ['ن'] },
        ],
      },
    ],
  },
  {
    province: 'گیلان',
    codes: [
      {
        code: '46',
        details: [
          { city: 'رشت', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن', 'و'] },
        ],
      },
      {
        code: '56',
        details: [
          { city: 'انزلی', letters: ['ب'] },
          { city: 'لاهیجان', letters: ['ج'] },
          { city: 'آستارا', letters: ['د'] },
          { city: 'طالش', letters: ['س'] },
          { city: 'رودسر', letters: ['ص'] },
          { city: 'رودبار', letters: ['ط'] },
          { city: 'صومعه‌سرا', letters: ['ق'] },
          { city: 'فومن', letters: ['ل'] },
          { city: 'لنگرود', letters: ['م'] },
          { city: 'رضوان‌شهر', letters: ['ن'] },
          { city: 'ماسال', letters: ['ه'] },
          { city: 'املش', letters: ['و'] },
          { city: 'شفت', letters: ['ی'] },
        ],
      },
      {
        code: '76',
        details: [
          { city: 'سیاهکل', letters: ['ب'] },
          { city: 'آستانه', letters: ['ج'] },
          { city: 'لاهیجان', letters: ['د'] },
          { city: 'انزلی', letters: ['س'] },
          { city: 'لنگرود', letters: ['ص'] },
          { city: 'طالش', letters: ['ط'] },
          { city: 'رودسر', letters: ['ق'] },
        ],
      },
    ],
  },
  {
    province: 'لرستان',
    codes: [
      {
        code: '31',
        details: [
          { city: 'خرم‌آباد', letters: ['ب', 'ج', 'د', 'س', 'ص'] },
        ],
      },
      {
        code: '41',
        details: [
          { city: 'بروجرد', letters: ['ب', 'م', 'ن'] },
          { city: 'الیگودرز', letters: ['ج'] },
          { city: 'دورود', letters: ['د', 'و'] },
          { city: 'کوهدشت', letters: ['س', 'و'] },
          { city: 'دلفان', letters: ['ص'] },
          { city: 'ازنا', letters: ['ط'] },
          { city: 'پل دختر', letters: ['ق'] },
          { city: 'سلسله', letters: ['ل'] },
        ],
      },
    ],
  },
  {
    province: 'مازندران',
    codes: [
      {
        code: '62',
        details: [
          { city: 'ساری', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط'] },
        ],
      },
      {
        code: '72',
        details: [
          { city: 'آمل', letters: ['ب'] },
          { city: 'بابل', letters: ['ج'] },
          { city: 'تنکابن', letters: ['د'] },
          { city: 'رامسر', letters: ['س'] },
          { city: 'نوشهر', letters: ['ص'] },
          { city: 'نور', letters: ['ط', 'ی'] },
          { city: 'بهشهر', letters: ['ق'] },
          { city: 'قائمشهر', letters: ['ل'] },
          { city: 'بابلسر', letters: ['م'] },
          { city: 'چالوس', letters: ['ن'] },
          { city: 'نکا', letters: ['ه'] },
          { city: 'محمودآباد', letters: ['و'] },
          { city: 'جویبار', letters: ['ی'] },
        ],
      },
      {
        code: '82',
        details: [
          { city: 'سوادکوه', letters: ['ب'] },
          { city: 'بابل', letters: ['ج', 'ص', 'م'] },
          { city: 'آمل', letters: ['د', 'ق'] },
          { city: 'قائمشهر', letters: ['س', 'ن'] },
          { city: 'تنکابن', letters: ['ط'] },
          { city: 'بابلسر', letters: ['ل'] },
          { city: 'بهشهر', letters: ['ه'] },
          { city: 'چالوس', letters: ['و'] },
          { city: 'نوشهر', letters: ['ی'] },
        ],
      },
      {
        code: '92',
        details: [
          { city: 'آمل', letters: ['ب'] },
          { city: 'بابل', letters: ['ج', 'ص'] },
          { city: 'تنکابن', letters: ['د'] },
          { city: 'قائمشهر', letters: ['س'] },
        ],
      },
    ],
  },
  {
    province: 'مرکزی',
    codes: [
      {
        code: '47',
        details: [
          { city: 'اراک', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق'] },
        ],
      },
      {
        code: '57',
        details: [
          { city: 'ساوه', letters: ['ب', 'ه', 'و'] },
          { city: 'خمین', letters: ['ج'] },
          { city: 'محلات', letters: ['د'] },
          { city: 'تفرش', letters: ['س'] },
          { city: 'دلیجان', letters: ['ص'] },
          { city: 'آشتیان', letters: ['ط'] },
          { city: 'شازند', letters: ['ق'] },
          { city: 'زرندیه', letters: ['ل'] },
          { city: 'کمیجان', letters: ['ن'] },
        ],
      },
    ],
  },
  {
    province: 'هرمزگان',
    codes: [
      {
        code: '84',
        details: [
          { city: 'بندرعباس', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل'] },
        ],
      },
      {
        code: '94',
        details: [
          { city: 'میناب', letters: ['ب', 'م'] },
          { city: 'بندر لنگه', letters: ['ج', 'ن'] },
          { city: 'رودان', letters: ['د'] },
          { city: 'ابوموسی', letters: ['س'] },
          { city: 'جاسک', letters: ['ص'] },
          { city: 'بستک', letters: ['ط'] },
          { city: 'حاجی‌آباد', letters: ['ق'] },
          { city: 'قشم', letters: ['ل'] },
        ],
      },
    ],
  },
  {
    province: 'همدان',
    codes: [
      {
        code: '18',
        details: [
          { city: 'همدان', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ق', 'ل', 'ط'] },
        ],
      },
      {
        code: '28',
        details: [
          { city: 'نهاوند', letters: ['ب', 'م'] },
          { city: 'ملایر', letters: ['ج', 'ل', 'ن'] },
          { city: 'تویسرکان', letters: ['د'] },
          { city: 'کبودرآهنگ', letters: ['س'] },
          { city: 'رزن', letters: ['ص'] },
          { city: 'بهار', letters: ['ط'] },
          { city: 'اسدآباد', letters: ['ق'] },
        ],
      },
    ],
  },
  {
    province: 'یزد',
    codes: [
      {
        code: '54',
        details: [
          { city: 'یزد', letters: ['ب', 'ج', 'د', 'س', 'ص', 'ط', 'ق', 'ل', 'م', 'ن'] },
        ],
      },
      {
        code: '64',
        details: [
          { city: 'اردکان', letters: ['ب'] },
          { city: 'تفت', letters: ['ج'] },
          { city: 'میبد', letters: ['د'] },
          { city: 'بافق', letters: ['س'] },
          { city: 'مهریز', letters: ['ص'] },
          { city: 'ابرکوه', letters: ['ط'] },
          { city: 'خاتم', letters: ['ل'] },
          { city: 'صدوق (اشکذر)', letters: ['م'] },
        ],
      },
    ],
  },
] as const;

export { PLATE_CITY_CODES };
