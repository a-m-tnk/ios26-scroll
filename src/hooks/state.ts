export const state = {
  locationField: {
    searchValue: "Москва",
    isLoading: false,
    value: "47307",
    code: "city",
    suggestedItems: {
      locations: [
        {
          id: 47307,
          name: "Москва",
          signature: "Город, Россия",
          type: { name: "Город", code: "city" },
        },
        {
          id: 67139,
          name: "Новая Москва",
          signature: "Округ, Россия",
          type: { name: "Округ", code: "district" },
        },
        {
          id: 148441,
          name: "Моква",
          signature: "Город, США",
          type: { name: "Город", code: "city" },
        },
        {
          id: 109390,
          name: "Московская область и окрестности",
          signature: "Округ, Россия, Москва",
          type: { name: "Округ", code: "district" },
        },
        {
          id: 61154,
          name: "Центральный административный округ",
          signature: "Округ, Россия, Москва",
          type: { name: "Округ", code: "district" },
        },
      ],
      hotels: [
        {
          id: "1441418",
          name: "Отель Новотель Москва Аэропорт Шереметьево",
          signature:
            "Отель • Ирландия, Дублин, Международное шоссе, Шереметьево 2, вл. 3, Химки",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "1411122",
          name: "Гостиница Ибис Москва Октябрьское Поле",
          signature: "Отель • Россия, Москва, улица Маршала Рыбалко, д.2/5",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "249",
          name: "Отель Ибис Москва Павелецкая",
          signature: "Отель • Россия, Москва, улица Щипок, д. 22, стр. 1",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "1454854",
          name: "Новотель Москва Киевская",
          signature: "Отель • Россия, Москва, улица Киевская дом 2",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "1415140",
          name: "InPremium Москва-Сити Апарт-Отель",
          signature: "Отель • Россия, Москва, Пресненская набережная, д.12",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "1397617",
          name: "Отель Hilton Москва Ленинградская",
          signature: "Отель • Россия, Москва, Каланчевская ул.21/40",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "1444133",
          name: "Doubletree by Hilton Moscow - Marina",
          signature:
            "Отель • Россия, Москва, Ленинградское шоссе, 39 строение 1",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "1444298",
          name: "Отель Ibis Москва Центр Бахрушина",
          signature: "Отель • Россия, Москва, Бахрушина, 11/48, стр. 4",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "1428434",
          name: " Отель Skypoint Luxe – Шератон Москва Шереметьево Аэропорт",
          signature:
            "Отель • Россия, Москва, шоссе Международное, д.28Б, стр.5",
          type: { name: "Отель", code: "hotel" },
        },
        {
          id: "1444297",
          name: "AZIMUT Сити Отель Тульская Москва",
          signature: "Отель • Россия, Москва, Варшавское шоссе, 9",
          type: { name: "Отель", code: "hotel" },
        },
      ],
    },
  },
  searchHistory: [
    {
      date: [
        { year: 2026, month: 4, day: 30 },
        { year: 2026, month: 4, day: 31 },
      ],
      guest: { guestCount: 2, childrenAges: [] },
      location: { value: "47307", searchValue: "Москва" },
      hash: -530451900,
    },
  ],
  popularDestinations: [
    {
      id: "17039",
      name: "Москва",
      signature: "Россия",
      type: { code: "city", name: "Город" },
    },
    {
      id: "92804",
      name: "Санкт-Петербург",
      signature: "Россия",
      type: { code: "city", name: "Город" },
    },
    {
      id: "88519",
      name: "Сочи",
      signature: "Россия, Краснодарский край",
      type: { code: "city", name: "Город" },
    },
    {
      id: "90229",
      name: "Казань",
      signature: "Россия, Республика Татарстан",
      type: { code: "city", name: "Город" },
    },
    {
      id: "54174",
      name: "Минск",
      signature: "Беларусь",
      type: { code: "city", name: "Город" },
    },
    {
      id: "93815",
      name: "Нижний Новгород",
      signature: "Россия, Нижегородская область",
      type: { code: "city", name: "Город" },
    },
    {
      id: "90299",
      name: "Калининград",
      signature: "Россия",
      type: { code: "city", name: "Россия, Калининградская область" },
    },
    {
      id: "50156",
      name: "Стамбул",
      signature: "Турция",
      type: { code: "city", name: "Город" },
    },
    {
      id: "81095",
      name: "Дубай",
      signature: "ОАЭ",
      type: { code: "city", name: "Город" },
    },
    {
      id: "93148",
      name: "Екатеринбург",
      signature: "Россия, Свердловская область",
      type: { code: "city", name: "Город" },
    },
  ],
};
