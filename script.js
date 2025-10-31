/* eslint-disable */
/* global React, ReactDOM */
const { useEffect, useMemo, useRef, useState } = React;

/**
 * Prompt Durağı – Çok Dilli (TR/EN/DE/RU/UK/AR/HI)
 * - Tailwind, Masonry (columns), Flip cards, Modal, Copy-to-clipboard
 * - Admin add (image/title/prompt/category), Likes, LocalStorage
 * - Language switcher, all strings translatable
 */

// --- DİL VE ÇEVİRİ AYARLARI ---
const LANGUAGES = {
  tr: { label: "Türkçe", flag: "🇹🇷" },
  en: { label: "English", flag: "🇺🇸" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  ru: { label: "Русский", flag: "🇷🇺" },
  uk: { label: "Українська", flag: "🇺🇦" },
  ar: { label: "العربية", flag: "🇸🇦" },
  hi: { label: "हिन्दी", flag: "🇮🇳" },
};

const TRANSLATIONS = {
  tr: {
    APP_TITLE_SUB: "Yapay Zekâ ile Üretimin Başlangıç Noktası. En İyi Prompt'lar Burada Bekliyor.",
    NAV_FOLLOW: "Takip Et",
    NAV_ADMIN_OPEN: "Admin Girişi",
    NAV_ADMIN_LOGGED_OUT: "Admin",
    NAV_ADMIN_LOGGED_IN: "Admin Açık – Çıkış",
    TOAST_ADMIN_LOGIN: "Admin girişi yapıldı",
    TOAST_ADMIN_LOGOUT: "Admin çıkış yapıldı",
    TOAST_ITEM_ADDED: "Yeni öğe eklendi!",
    TOAST_ITEM_DELETED: "Fotoğraf silindi",
    TOAST_LIKED: "Beğenildi!",
    TOAST_UNLIKED: "Beğeni kaldırıldı.",
    TOAST_COPIED: "Kopyalandı!",
    MODAL_ADMIN_TITLE: "Admin Girişi",
    MODAL_ADMIN_PIN_ERR: "Hatalı PIN",
    BTN_CANCEL: "İptal",
    BTN_LOGIN: "Giriş Yap",
    ADMIN_PANEL_TITLE: "Admin Panel",
    FORM_LABEL_IMAGE: "Görsel Yükle (Dosyadan)",
    FORM_IMAGE_SELECTED: "Görsel seçildi ✓",
    FORM_IMAGE_PENDING: "Görsel bekleniyor.",
    FORM_PLACEHOLDER_TITLE: "Başlık (Örn: Neon Şehir Manzarası)",
    FORM_PLACEHOLDER_PROMPT: "Prompt Metni (Üretim komutu)",
    FORM_LABEL_CATEGORY: "Kategori Seç",
    FORM_BTN_ADD: "Prompt'u Ekle",
    GALLERY_TITLE: "Prompt Galerisi",
    GALLERY_EMPTY: "Filtreye uygun prompt görseli bulunamadı.",
    CARD_PROMPT_TIP: "Prompt'u Görmek İçin Tıklayın!",
    CARD_PROMPT_TITLE: "Prompt Metni",
    CARD_DATE_ADDED: "Eklenme Tarihi",
    CARD_BTN_VIEW_FULL: "Tam Görünüm",
    CARD_BTN_COPY: "Kopyala",
    CARD_BTN_LIKE: "Beğen",
    CARD_BTN_UNLIKE: "Beğeniyi Kaldır",
    MODAL_PROMPT_TITLE: "Prompt Metni:",
    MODAL_DATE_ADDED: "Eklenme Tarihi:",
    CAT_ALL: "Tüm Promptlar",
    CAT_WOMEN: "Kadınlara Özel",
    CAT_MEN: "Erkeklere Özel",
    CAT_WEDDING: "Düğün Fotoğrafları",
    CAT_FAVORITED: "Beğendiklerim",
    CONFIRM_DELETE: "Bu fotoğrafı silmek istediğinize emin misiniz?",
    CAT_WOMEN_OPTION: "Kadınlara Özel",
    CAT_MEN_OPTION: "Erkeklere Özel",
    CAT_WEDDING_OPTION: "Düğün Fotoğrafları",
  },
  en: {
    APP_TITLE_SUB: "The starting point for AI generation. The best Prompts are waiting here.",
    NAV_FOLLOW: "Follow",
    NAV_ADMIN_OPEN: "Admin Login",
    NAV_ADMIN_LOGGED_OUT: "Admin",
    NAV_ADMIN_LOGGED_IN: "Admin Active – Logout",
    TOAST_ADMIN_LOGIN: "Admin login successful",
    TOAST_ADMIN_LOGOUT: "Admin logged out",
    TOAST_ITEM_ADDED: "New item added!",
    TOAST_ITEM_DELETED: "Photo deleted",
    TOAST_LIKED: "Liked!",
    TOAST_UNLIKED: "Unliked.",
    TOAST_COPIED: "Copied!",
    MODAL_ADMIN_TITLE: "Admin Login",
    MODAL_ADMIN_PIN_ERR: "Invalid PIN",
    BTN_CANCEL: "Cancel",
    BTN_LOGIN: "Login",
    ADMIN_PANEL_TITLE: "Admin Panel",
    FORM_LABEL_IMAGE: "Upload Image (From file)",
    FORM_IMAGE_SELECTED: "Image selected ✓",
    FORM_IMAGE_PENDING: "Awaiting image.",
    FORM_PLACEHOLDER_TITLE: "Title (Ex: Neon Cityscape)",
    FORM_PLACEHOLDER_PROMPT: "Prompt Text (Generation command)",
    FORM_LABEL_CATEGORY: "Select Category",
    FORM_BTN_ADD: "Add Prompt",
    GALLERY_TITLE: "Prompt Gallery",
    GALLERY_EMPTY: "No prompts found matching the filter.",
    CARD_PROMPT_TIP: "Click to View Prompt!",
    CARD_PROMPT_TITLE: "Prompt Text",
    CARD_DATE_ADDED: "Date Added",
    CARD_BTN_VIEW_FULL: "Full View",
    CARD_BTN_COPY: "Copy",
    CARD_BTN_LIKE: "Like",
    CARD_BTN_UNLIKE: "Unlike",
    MODAL_PROMPT_TITLE: "Prompt Text:",
    MODAL_DATE_ADDED: "Date Added:",
    CAT_ALL: "All Prompts",
    CAT_WOMEN: "For Women",
    CAT_MEN: "For Men",
    CAT_WEDDING: "Wedding Photos",
    CAT_FAVORITED: "Favorites",
    CONFIRM_DELETE: "Are you sure you want to delete this photo?",
    CAT_WOMEN_OPTION: "For Women",
    CAT_MEN_OPTION: "For Men",
    CAT_WEDDING_OPTION: "Wedding Photos",
  },
  de: {
    APP_TITLE_SUB: "Der Startpunkt für KI-Generierung. Die besten Prompts warten hier.",
    NAV_FOLLOW: "Folgen",
    NAV_ADMIN_OPEN: "Admin-Login",
    NAV_ADMIN_LOGGED_OUT: "Admin",
    NAV_ADMIN_LOGGED_IN: "Admin Aktiv – Abmelden",
    TOAST_ADMIN_LOGIN: "Admin-Login erfolgreich",
    TOAST_ADMIN_LOGOUT: "Admin abgemeldet",
    TOAST_ITEM_ADDED: "Neues Element hinzugefügt!",
    TOAST_ITEM_DELETED: "Foto gelöscht",
    TOAST_LIKED: "Gefällt mir!",
    TOAST_UNLIKED: "Nicht mehr gemocht.",
    TOAST_COPIED: "Kopiert!",
    MODAL_ADMIN_TITLE: "Admin-Login",
    MODAL_ADMIN_PIN_ERR: "Falsche PIN",
    BTN_CANCEL: "Abbrechen",
    BTN_LOGIN: "Anmelden",
    ADMIN_PANEL_TITLE: "Admin-Panel",
    FORM_LABEL_IMAGE: "Bild hochladen (aus Datei)",
    FORM_IMAGE_SELECTED: "Bild ausgewählt ✓",
    FORM_IMAGE_PENDING: "Warten auf Bild.",
    FORM_PLACEHOLDER_TITLE: "Titel (Bsp: Neon-Stadtbild)",
    FORM_PLACEHOLDER_PROMPT: "Prompt-Text (Generierungsbefehl)",
    FORM_LABEL_CATEGORY: "Kategorie auswählen",
    FORM_BTN_ADD: "Prompt hinzufügen",
    GALLERY_TITLE: "Prompt-Galerie",
    GALLERY_EMPTY: "Keine Prompts für diesen Filter gefunden.",
    CARD_PROMPT_TIP: "Klicken Sie, um den Prompt zu sehen!",
    CARD_PROMPT_TITLE: "Prompt-Text",
    CARD_DATE_ADDED: "Hinzugefügt am",
    CARD_BTN_VIEW_FULL: "Vollansicht",
    CARD_BTN_COPY: "Kopieren",
    CARD_BTN_LIKE: "Gefällt mir",
    CARD_BTN_UNLIKE: "Gefällt mir nicht mehr",
    MODAL_PROMPT_TITLE: "Prompt-Text:",
    MODAL_DATE_ADDED: "Hinzugefügt am:",
    CAT_ALL: "Alle Prompts",
    CAT_WOMEN: "Speziell für Frauen",
    CAT_MEN: "Speziell für Männer",
    CAT_WEDDING: "Hochzeitsfotos",
    CAT_FAVORITED: "Meine Favoriten",
    CONFIRM_DELETE: "Sind Sie sicher, dass Sie dieses Foto löschen möchten?",
    CAT_WOMEN_OPTION: "Speziell für Frauen",
    CAT_MEN_OPTION: "Speziell für Männer",
    CAT_WEDDING_OPTION: "Hochzeitsfotos",
  },
  ru: {
    APP_TITLE_SUB: "Отправная точка для генерации ИИ. Лучшие промпты ждут здесь.",
    NAV_FOLLOW: "Подписаться",
    NAV_ADMIN_OPEN: "Вход для администратора",
    NAV_ADMIN_LOGGED_OUT: "Админ",
    NAV_ADMIN_LOGGED_IN: "Админ Активен – Выход",
    TOAST_ADMIN_LOGIN: "Вход администратора выполнен",
    TOAST_ADMIN_LOGOUT: "Администратор вышел",
    TOAST_ITEM_ADDED: "Новый элемент добавлен!",
    TOAST_ITEM_DELETED: "Фото удалено",
    TOAST_LIKED: "Понравилось!",
    TOAST_UNLIKED: "Не нравится.",
    TOAST_COPIED: "Скопировано!",
    MODAL_ADMIN_TITLE: "Вход для администратора",
    MODAL_ADMIN_PIN_ERR: "Неверный PIN",
    BTN_CANCEL: "Отмена",
    BTN_LOGIN: "Войти",
    ADMIN_PANEL_TITLE: "Панель администратора",
    FORM_LABEL_IMAGE: "Загрузить изображение (из файла)",
    FORM_IMAGE_SELECTED: "Изображение выбрано ✓",
    FORM_IMAGE_PENDING: "Ожидание изображения.",
    FORM_PLACEHOLDER_TITLE: "Название (Пример: Неоновый городской пейзаж)",
    FORM_PLACEHOLDER_PROMPT: "Текст промпта (Команда генерации)",
    FORM_LABEL_CATEGORY: "Выбрать категорию",
    FORM_BTN_ADD: "Добавить промпт",
    GALLERY_TITLE: "Галерея промптов",
    GALLERY_EMPTY: "Промптов, соответствующих фильтру, не найдено.",
    CARD_PROMPT_TIP: "Нажмите, чтобы увидеть промпт!",
    CARD_PROMPT_TITLE: "Текст промпта",
    CARD_DATE_ADDED: "Дата добавления",
    CARD_BTN_VIEW_FULL: "Полный просмотр",
    CARD_BTN_COPY: "Копировать",
    CARD_BTN_LIKE: "Нравится",
    CARD_BTN_UNLIKE: "Не нравится",
    MODAL_PROMPT_TITLE: "Текст промпта:",
    MODAL_DATE_ADDED: "Дата добавления:",
    CAT_ALL: "Все промпты",
    CAT_WOMEN: "Специально для женщин",
    CAT_MEN: "Специально для мужчин",
    CAT_WEDDING: "Свадебные фотографии",
    CAT_FAVORITED: "Избранное",
    CONFIRM_DELETE: "Вы уверены, что хотите удалить эту фотографию?",
    CAT_WOMEN_OPTION: "Специально для женщин",
    CAT_MEN_OPTION: "Специально для мужчин",
    CAT_WEDDING_OPTION: "Свадебные фотографии",
  },
  uk: {
    APP_TITLE_SUB: "Відправна точка для генерації ШІ. Найкращі промпти чекають тут.",
    NAV_FOLLOW: "Стежити",
    NAV_ADMIN_OPEN: "Вхід для адміністратора",
    NAV_ADMIN_LOGGED_OUT: "Адмін",
    NAV_ADMIN_LOGGED_IN: "Адмін Активний – Вихід",
    TOAST_ADMIN_LOGIN: "Вхід адміністратора успішний",
    TOAST_ADMIN_LOGOUT: "Адміністратор вийшов",
    TOAST_ITEM_ADDED: "Новий елемент додано!",
    TOAST_ITEM_DELETED: "Фото видалено",
    TOAST_LIKED: "Сподобалося!",
    TOAST_UNLIKED: "Не сподобалося.",
    TOAST_COPIED: "Скопійовано!",
    MODAL_ADMIN_TITLE: "Вхід для адміністратора",
    MODAL_ADMIN_PIN_ERR: "Невірний PIN",
    BTN_CANCEL: "Скасувати",
    BTN_LOGIN: "Увійти",
    ADMIN_PANEL_TITLE: "Панель адміністратора",
    FORM_LABEL_IMAGE: "Завантажити зображення (з файлу)",
    FORM_IMAGE_SELECTED: "Зображення вибрано ✓",
    FORM_IMAGE_PENDING: "Очікування зображення.",
    FORM_PLACEHOLDER_TITLE: "Назва (Приклад: Неоновий міський пейзаж)",
    FORM_PLACEHOLDER_PROMPT: "Текст промпту (Команда генерації)",
    FORM_LABEL_CATEGORY: "Вибрати категорію",
    FORM_BTN_ADD: "Додати промпт",
    GALLERY_TITLE: "Галерея промптів",
    GALLERY_EMPTY: "Промптів, що відповідають фільтру, не знайдено.",
    CARD_PROMPT_TIP: "Натисніть, щоб побачити промпт!",
    CARD_PROMPT_TITLE: "Текст промпту",
    CARD_DATE_ADDED: "Дата додавання",
    CARD_BTN_VIEW_FULL: "Повний перегляд",
    CARD_BTN_COPY: "Копіювати",
    CARD_BTN_LIKE: "Сподобалося",
    CARD_BTN_UNLIKE: "Не сподобалося",
    MODAL_PROMPT_TITLE: "Текст промпту:",
    MODAL_DATE_ADDED: "Дата додавання:",
    CAT_ALL: "Усі промпти",
    CAT_WOMEN: "Спеціально для жінок",
    CAT_MEN: "Спеціально для чоловіків",
    CAT_WEDDING: "Весільні фотографії",
    CAT_FAVORITED: "Вибране",
    CONFIRM_DELETE: "Ви впевнені, що бажаєте видалити це фото?",
    CAT_WOMEN_OPTION: "Спеціально для жінок",
    CAT_MEN_OPTION: "Спеціально для чоловіків",
    CAT_WEDDING_OPTION: "Весільні фотографії",
  },
  ar: {
    APP_TITLE_SUB: "نقطة البداية لتوليد الذكاء الاصطناعي. أفضل المطالبات تنتظرك هنا.",
    NAV_FOLLOW: "متابعة",
    NAV_ADMIN_OPEN: "تسجيل دخول المسؤول",
    NAV_ADMIN_LOGGED_OUT: "مسؤول",
    NAV_ADMIN_LOGGED_IN: "المسؤول نشط – تسجيل خروج",
    TOAST_ADMIN_LOGIN: "تم تسجيل دخول المسؤول بنجاح",
    TOAST_ADMIN_LOGOUT: "تم تسجيل خروج المسؤول",
    TOAST_ITEM_ADDED: "تمت إضافة عنصر جديد!",
    TOAST_ITEM_DELETED: "تم حذف الصورة",
    TOAST_LIKED: "أعجبني!",
    TOAST_UNLIKED: "إلغاء الإعجاب.",
    TOAST_COPIED: "تم النسخ!",
    MODAL_ADMIN_TITLE: "تسجيل دخول المسؤول",
    MODAL_ADMIN_PIN_ERR: "رقم سري غير صحيح",
    BTN_CANCEL: "إلغاء",
    BTN_LOGIN: "تسجيل الدخول",
    ADMIN_PANEL_TITLE: "لوحة التحكم",
    FORM_LABEL_IMAGE: "تحميل الصورة (من ملف)",
    FORM_IMAGE_SELECTED: "تم اختيار الصورة ✓",
    FORM_IMAGE_PENDING: "في انتظار الصورة.",
    FORM_PLACEHOLDER_TITLE: "العنوان (مثال: منظر مدينة نيون)",
    FORM_PLACEHOLDER_PROMPT: "نص المطالبة (أمر التوليد)",
    FORM_LABEL_CATEGORY: "اختر الفئة",
    FORM_BTN_ADD: "إضافة مطالبة",
    GALLERY_TITLE: "معرض المطالبات",
    GALLERY_EMPTY: "لم يتم العثور على مطالبات مطابقة للفلتر.",
    CARD_PROMPT_TIP: "انقر لعرض المطالبة!",
    CARD_PROMPT_TITLE: "نص المطالبة",
    CARD_DATE_ADDED: "تاريخ الإضافة",
    CARD_BTN_VIEW_FULL: "عرض كامل",
    CARD_BTN_COPY: "نسخ",
    CARD_BTN_LIKE: "أعجبني",
    CARD_BTN_UNLIKE: "إلغاء الإعجاب",
    MODAL_PROMPT_TITLE: "نص المطالبة:",
    MODAL_DATE_ADDED: "تاريخ الإضافة:",
    CAT_ALL: "جميع المطالبات",
    CAT_WOMEN: "خاص بالنساء",
    CAT_MEN: "خاص بالرجال",
    CAT_WEDDING: "صور الزفاف",
    CAT_FAVORITED: "المفضلة",
    CONFIRM_DELETE: "هل أنت متأكد من أنك تريد حذف هذه الصورة؟",
    CAT_WOMEN_OPTION: "خاص بالنساء",
    CAT_MEN_OPTION: "خاص بالرجال",
    CAT_WEDDING_OPTION: "صور الزفاف",
  },
  hi: {
    APP_TITLE_SUB: "एआई जनरेशन के लिए शुरुआती बिंदु। सबसे अच्छे प्रॉम्प्ट्स यहाँ इंतज़ार कर रहे हैं।",
    NAV_FOLLOW: "फ़ॉलो करें",
    NAV_ADMIN_OPEN: "एडमिन लॉगिन",
    NAV_ADMIN_LOGGED_OUT: "एडमिन",
    NAV_ADMIN_LOGGED_IN: "एडमिन सक्रिय – लॉगआउट",
    TOAST_ADMIN_LOGIN: "एडमिन लॉगिन सफल",
    TOAST_ADMIN_LOGOUT: "एडमिन लॉगआउट किया गया",
    TOAST_ITEM_ADDED: "नया आइटम जोड़ा गया!",
    TOAST_ITEM_DELETED: "फोटो हटाई गई",
    TOAST_LIKED: "पसंद किया गया!",
    TOAST_UNLIKED: "नापसंद किया गया।",
    TOAST_COPIED: "कॉपी किया गया!",
    MODAL_ADMIN_TITLE: "एडमिन लॉगिन",
    MODAL_ADMIN_PIN_ERR: "अवैध पिन",
    BTN_CANCEL: "रद्द करें",
    BTN_LOGIN: "लॉगिन करें",
    ADMIN_PANEL_TITLE: "एडमिन पैनल",
    FORM_LABEL_IMAGE: "छवि अपलोड करें (फ़ाइल से)",
    FORM_IMAGE_SELECTED: "छवि चुनी गई ✓",
    FORM_IMAGE_PENDING: "छवि का इंतजार है।",
    FORM_PLACEHOLDER_TITLE: "शीर्षक (उदा: नियॉन सिटीस्केप)",
    FORM_PLACEHOLDER_PROMPT: "प्रॉम्प्ट टेक्स्ट (जनरेशन कमांड)",
    FORM_LABEL_CATEGORY: "श्रेणी चुनें",
    FORM_BTN_ADD: "प्रॉम्प्ट जोड़ें",
    GALLERY_TITLE: "प्रॉम्प्ट गैलरी",
    GALLERY_EMPTY: "फ़िल्टर से मेल खाने वाले कोई प्रॉम्प्ट नहीं मिले।",
    CARD_PROMPT_TIP: "प्रॉम्प्ट देखने के लिए क्लिक करें!",
    CARD_PROMPT_TITLE: "प्रॉम्प्ट टेक्स्ट",
    CARD_DATE_ADDED: "जोड़ने की तारीख",
    CARD_BTN_VIEW_FULL: "पूर्ण दृश्य",
    CARD_BTN_COPY: "कॉपी करें",
    CARD_BTN_LIKE: "पसंद करें",
    CARD_BTN_UNLIKE: "नापसंद करें",
    MODAL_PROMPT_TITLE: "प्रॉम्प्ट टेक्स्ट:",
    MODAL_DATE_ADDED: "जोड़ने की तारीख:",
    CAT_ALL: "सभी प्रॉम्प्ट्स",
    CAT_WOMEN: "महिलाओं के लिए विशेष",
    CAT_MEN: "पुरुषों के लिए विशेष",
    CAT_WEDDING: "शादी की तस्वीरें",
    CAT_FAVORITED: "पसंदीदा",
    CONFIRM_DELETE: "क्या आप वाकई इस फोटो को हटाना चाहते हैं?",
    CAT_WOMEN_OPTION: "महिलाओं के लिए विशेष",
    CAT_MEN_OPTION: "पुरुषों के लिए विशेष",
    CAT_WEDDING_OPTION: "शादी की तस्वीरें",
  },
};

const getCategoryLabels = (t) => ({
  all: t('CAT_ALL'),
  women: t('CAT_WOMEN'),
  men: t('CAT_MEN'),
  wedding: t('CAT_WEDDING'),
  favorited: t('CAT_FAVORITED'),
});

function App() {
  const [activeLanguage, setActiveLanguage] = useState('tr');

  const T = useMemo(() => {
    const currentTranslations = TRANSLATIONS[activeLanguage];
    return (key) => currentTranslations[key] || key;
  }, [activeLanguage]);

  const CATEGORY_LABELS = useMemo(() => getCategoryLabels(T), [T]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [pinErr, setPinErr] = useState("");
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pd_items_v3") || "[]"); } catch { return []; }
  });
  const [userLikes, setUserLikes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pd_user_likes_v1") || "{}"); } catch { return {}; }
  });
  const [likeCounts, setLikeCounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pd_like_counts_v1") || "{}"); } catch { return {}; }
  });
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewItem, setViewItem] = useState(null);
  const [toast, setToast] = useState("");

  const ADMIN_PIN = "1234";

  useEffect(() => { try { localStorage.setItem("pd_items_v3", JSON.stringify(items)); } catch {} }, [items]);
  useEffect(() => { try { localStorage.setItem("pd_user_likes_v1", JSON.stringify(userLikes)); } catch {} }, [userLikes]);
  useEffect(() => { try { localStorage.setItem("pd_like_counts_v1", JSON.stringify(likeCounts)); } catch {} }, [likeCounts]);

  function submitPin(e) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      setPinOpen(false);
      setPin("");
      setPinErr("");
      showToast(T("TOAST_ADMIN_LOGIN"));
    } else setPinErr(T("MODAL_ADMIN_PIN_ERR"));
  }

  function deleteItem(id) {
    if (window.confirm(T("CONFIRM_DELETE"))) {
      setItems((prev) => prev.filter((it) => it.id !== id));
      setUserLikes((prev) => {
        const newLikes = { ...prev };
        delete newLikes[id];
        return newLikes;
      });
      setLikeCounts((prev) => {
        const newCounts = { ...prev };
        delete newCounts[id];
        return newCounts;
      });
      showToast(T("TOAST_ITEM_DELETED"));
    }
  }

  function toggleLike(id) {
    setUserLikes((prev) => {
      const isLiked = !prev[id];
      showToast(isLiked ? T("TOAST_LIKED") : T("TOAST_UNLIKED"));
      setLikeCounts((counts) => ({ ...counts, [id]: (counts[id] || 0) + (isLiked ? 1 : -1) }));
      return { ...prev, [id]: isLiked };
    });
  }

  const handleItemAdded = (newItemId) => {
    setLikeCounts((prevCounts) => ({ ...prevCounts, [newItemId]: 0 }));
    showToast(T("TOAST_ITEM_ADDED"));
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    if (activeCategory === "favorited") {
      const favoritedIds = Object.keys(userLikes).filter((id) => userLikes[Number(id)]).map(Number);
      return items.filter((item) => favoritedIds.includes(item.id));
    }
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory, userLikes]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <style>{`
        .perspective-1000{perspective:1000px}
        .preserve-3d{transform-style:preserve-3d}
        .backface-hidden{backface-visibility:hidden}
        .flip-700{transition:transform 700ms}
      `}</style>
      
      <Header
        T={T}
        activeLanguage={activeLanguage}
        setActiveLanguage={setActiveLanguage}
        isAdmin={isAdmin}
        onAdminOpen={() => setPinOpen(true)}
        onLogout={() => {
          setIsAdmin(false);
          showToast(T("TOAST_ADMIN_LOGOUT"));
        }}
      />

      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white text-sm px-3 py-2 rounded-xl shadow">
          {toast}
        </div>
      )}

      <main className="max-w-6xl mx-auto p-4">
        {isAdmin && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow p-4 mb-6">
            <h2 className="font-semibold mb-3 text-2xl text-indigo-700">{T("ADMIN_PANEL_TITLE")}</h2>
            <AddForm 
              T={T}
              items={items} 
              setItems={setItems} 
              onAdded={(id) => handleItemAdded(id)} 
            />
          </section>
        )}
        
        <div className="flex justify-center items-center flex-wrap gap-2 mb-8 bg-white p-3 rounded-2xl shadow-md border border-slate-200">
          {Object.keys(CATEGORY_LABELS).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 shadow-sm ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-indigo-400/50'
                  : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <Gallery
          T={T}
          items={filteredItems}
          setViewItem={setViewItem}
          isAdmin={isAdmin}
          deleteItem={deleteItem}
          userLikes={userLikes}
          toggleLike={toggleLike}
          likeCounts={likeCounts}
        />

        {viewItem && (
          <FullPrompt T={T} item={viewItem} onClose={() => setViewItem(null)} />
        )}
      </main>

      {pinOpen && !isAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm grid place-items-center z-50 p-4">
          <form onSubmit={submitPin} className="bg-white rounded-2xl shadow-2xl w-[92%] max-w-sm p-5 relative">
            <button type="button" onClick={() => setPinOpen(false)} className="absolute top-3 right-3 text-slate-600 hover:text-slate-900" aria-label={T("BTN_CANCEL")}>
              <Icon.Close />
            </button>
            <h3 className="text-xl font-bold mb-3 text-indigo-600">{T("MODAL_ADMIN_TITLE")}</h3>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinErr(""); }}
              placeholder={T("MODAL_ADMIN_TITLE")}
              className="w-full border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition rounded-xl px-4 py-2 text-lg"
            />
            {pinErr && <p className="text-sm text-rose-600 mt-2 font-medium">{pinErr}</p>}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setPinOpen(false)} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                {T("BTN_CANCEL")}
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                {T("BTN_LOGIN")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ---------- Language Selector ----------
function LanguageSelector({ activeLanguage, setActiveLanguage }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition shadow-sm">
        <span className="text-sm font-bold">{LANGUAGES[activeLanguage].label}</span>
        <Icon.ChevronDown size={14} className="text-slate-500" />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 origin-top-right border border-slate-100">
        {Object.keys(LANGUAGES).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLanguage(lang)}
            className={`w-full text-left flex items-center gap-3 px-4 py-2 text-sm transition-colors rounded-xl ${
              activeLanguage === lang ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            {LANGUAGES[lang].label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Header ----------
function Header({ T, activeLanguage, setActiveLanguage, isAdmin, onAdminOpen, onLogout }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 font-extrabold text-2xl">
            <Icon.Sparkle size={30} className="text-indigo-600" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Prompt Durağı
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {T("APP_TITLE_SUB")}
          </p>
        </div>
        <nav className="flex items-center gap-3">
          <LanguageSelector activeLanguage={activeLanguage} setActiveLanguage={setActiveLanguage} />
          <a href="https://www.instagram.com/promptduragi" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-pink-400 text-pink-600 font-semibold hover:bg-pink-50 transition shadow-sm">
            <Icon.Instagram size={18} /> <span className="text-sm">{T("NAV_FOLLOW")}</span>
          </a>
          {isAdmin ? (
            <button onClick={onLogout} className="px-3 py-1.5 rounded-xl border text-sm bg-emerald-100 text-emerald-700 border-emerald-300 font-medium hover:bg-emerald-200 transition shadow-sm">
              {T("NAV_ADMIN_LOGGED_IN")}
            </button>
          ) : (
            <button onClick={onAdminOpen} className="px-3 py-1.5 rounded-xl border text-sm bg-white text-slate-700 border-slate-300 hover:bg-slate-100 transition shadow-sm">
              {T("NAV_ADMIN_OPEN")}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

// ---------- AddForm, Gallery, Card, FullPrompt ----------
function AddForm({ T, items, setItems, onAdded }) {
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("women");
  const formRef = useRef(null);

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setFileDataUrl(String(r.result));
    r.readAsDataURL(f);
  }

  function onAdd(e) {
    e.preventDefault();
    if (!fileDataUrl || !title.trim() || !prompt.trim()) return;
    const newItem = {
      id: Date.now(),
      src: fileDataUrl,
      title: title.trim(),
      prompt: prompt.trim(),
      date: new Date().toLocaleDateString("tr-TR"),
      category: category,
    };
    setItems([newItem, ...(items || [])]);
    onAdded(newItem.id);
    setFileDataUrl(null);
    setTitle("");
    setPrompt("");
    try { formRef.current?.reset(); } catch {}
  }

  const isValid = !!(fileDataUrl && title.trim() && prompt.trim());

  return (
    <form ref={formRef} onSubmit={onAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-1">
        <label className="text-sm font-medium text-slate-600">
          {T("FORM_LABEL_IMAGE")}
          <input type="file" accept="image/*" onChange={onFile} className="mt-1 w-full p-3 border border-slate-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition" />
        </label>
        {fileDataUrl ? (
          <span className="text-sm text-emerald-600 mt-2 flex items-center gap-1 font-medium">
            <Icon.Check size={16} /> {T("FORM_IMAGE_SELECTED")}
          </span>
        ) : (
          <span className="text-sm text-slate-500 mt-2 flex items-center gap-1">
            {T("FORM_IMAGE_PENDING")}
          </span>
        )}
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={T("FORM_PLACEHOLDER_TITLE")} className="mt-4 p-3 border border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 transition rounded-xl w-full" />
        <label className="text-sm font-medium text-slate-600 mt-4 block">
          {T("FORM_LABEL_CATEGORY")}
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full p-3 border border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 transition rounded-xl">
            <option value="women">{T("CAT_WOMEN_OPTION")}</option>
            <option value="men">{T("CAT_MEN_OPTION")}</option>
            <option value="wedding">{T("CAT_WEDDING_OPTION")}</option>
          </select>
        </label>
      </div>
      <div className="md:col-span-1 flex flex-col">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={T("FORM_PLACEHOLDER_PROMPT")} rows={6} className="p-3 border border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 transition rounded-xl flex-grow min-h-[100px]" />
        <button type="submit" disabled={!isValid} className={`justify-self-end mt-4 px-6 py-2.5 rounded-xl text-white font-semibold transition shadow-md ${isValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"}`}>
          {T("FORM_BTN_ADD")}
        </button>
      </div>
    </form>
  );
}

function Gallery({ T, items, setViewItem, isAdmin, deleteItem, userLikes, toggleLike, likeCounts }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-slate-700 mb-6 border-b pb-2">{T("GALLERY_TITLE")}</h2>
      {!items || items.length === 0 ? (
        <div className="text-slate-500 text-center py-16 text-xl bg-white/50 rounded-2xl border border-dashed border-slate-300">
          <Icon.Empty size={48} className="mx-auto mb-4 text-indigo-400" />
          <p className="mt-2">{T("GALLERY_EMPTY")}</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
          {items.map((it) => (
            <Card
              key={it.id}
              T={T}
              item={it}
              onViewFull={() => setViewItem(it)}
              isAdmin={isAdmin}
              onDelete={() => deleteItem(it.id)}
              isLiked={userLikes[it.id] || false}
              onToggleLike={() => toggleLike(it.id)}
              likeCount={likeCounts[it.id] || 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Card({ T, item, onViewFull, isAdmin, onDelete, isLiked, onToggleLike, likeCount }) {
  const [flipped, setFlipped] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  function fallbackCopy(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }

  async function copyWithToast(text) {
    try {
      if (window.isSecureContext && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 1200);
        return true;
      }
    } catch {}
    const ok = fallbackCopy(text);
    if (ok) {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 1200);
    }
    return ok;
  }

  const onCardClick = () => setFlipped((f) => !f);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleLike();
  };
  
  const formatLikeCount = (count) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count;
  };

  return (
    <div className="mb-3 break-inside-avoid rounded-2xl cursor-pointer relative group perspective-1000" onClick={onCardClick}>
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-10 bg-rose-600/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:bg-rose-700"
          title={T("CONFIRM_DELETE")}
          aria-label={T("CONFIRM_DELETE")}
        >
          <Icon.Trash />
        </button>
      )}

      <div className={`relative w-full preserve-3d flip-700 ${flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"}`}>
        {/* Ön */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl backface-hidden">
          <img src={item.src} alt={item.title} className="w-full object-cover" style={{ aspectRatio: "3 / 4" }} />
          <div className="absolute inset-0 p-3 flex flex-col justify-between bg-black/10 transition group-hover:bg-black/20">
            <div className="bg-black/60 text-white rounded-lg px-2 py-1 text-xs font-semibold w-max shadow-lg">
              {item.title}
            </div>
            <p className="text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg w-max mx-auto transition scale-90 group-hover:scale-100 font-medium shadow-md">
              {T("CARD_PROMPT_TIP")}
            </p>
          </div>
          
          {/* Like */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center space-x-2">
            {isLiked && (
              <div className="text-white text-sm font-bold bg-black/70 px-2 py-1 rounded-full shadow-lg transition-opacity duration-300">
                {formatLikeCount(likeCount)}
              </div>
            )}
            <button
              onClick={handleLikeClick}
              className={`p-2 rounded-full transition-colors duration-300 shadow-lg ${isLiked ? 'bg-red-500 text-white' : 'bg-black/70 text-white/80 hover:bg-black/90'}`}
              title={isLiked ? T("CARD_BTN_UNLIKE") : T("CARD_BTN_LIKE")}
              aria-label={isLiked ? T("CARD_BTN_UNLIKE") : T("CARD_BTN_LIKE")}
            >
              <Icon.Heart filled={isLiked} size={18} />
            </button>
          </div>
        </div>

        {/* Arka */}
        <div className="absolute inset-0 rounded-2xl shadow-xl p-4 flex flex-col backface-hidden" style={{ transform: "rotateY(180deg)", background: "linear-gradient(160deg, rgba(99,102,241,1) 0%, rgba(147,51,234,1) 60%, rgba(168,85,247,1) 100%)" }}>
          {copiedToast && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full shadow text-white text-xs font-semibold bg-black/70">
              {T("TOAST_COPIED")}
            </div>
          )}
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-white text-lg font-bold">{T("CARD_PROMPT_TITLE")}</h2>
            <div className="flex gap-2">
              <button type="button" onClick={(e) => { e.stopPropagation(); onViewFull?.(); }} className="text-white/90 hover:text-white transition p-1 rounded-full hover:bg-white/10" title={T("CARD_BTN_VIEW_FULL")} aria-label={T("CARD_BTN_VIEW_FULL")}>
                <Icon.Eye size={18} />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); copyWithToast(item.prompt); }} className="text-white/90 hover:text-white transition p-1 rounded-full hover:bg-white/10" title={T("CARD_BTN_COPY")} aria-label={T("CARD_BTN_COPY")}>
                <Icon.Copy size={18} />
              </button>
            </div>
          </div>
          <div className="text-white/95 text-sm leading-relaxed font-medium whitespace-pre-wrap overflow-y-auto max-h-[70%] flex-grow pr-1">
            {item.prompt}
          </div>
          <div className="mt-auto pt-3 border-t border-white/30 text-white/80 text-xs flex justify-between items-center font-medium">
            <span>{T("CARD_DATE_ADDED")}</span>
            <span>{item.date}</span>
          </div>
        </div>

        {/* flow placeholder */}
        <img src={item.src} alt="" className="invisible w-full rounded-2xl" style={{ aspectRatio: "3 / 4" }} />
      </div>
    </div>
  );
}

function FullPrompt({ T, item, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md grid place-items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-[96%] max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-600 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-100 transition" aria-label={T("BTN_CANCEL")}>
          <Icon.Close size={20} />
        </button>
        <h3 className="text-2xl font-bold mb-3 text-indigo-700">{item.title}</h3>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-slate-600 mb-2">{T("MODAL_PROMPT_TITLE")}</p>
          <div className="text-base text-slate-800 bg-slate-50 border border-slate-200 p-4 rounded-xl max-h-[70vh] overflow-auto whitespace-pre-wrap flex-grow">
            {item.prompt}
          </div>
          <div className="mt-4 text-sm text-slate-500 font-medium border-t pt-3">
            {T("MODAL_DATE_ADDED")} <span className="text-slate-700">{item.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Icons ----------
const Icon = {
  Copy: ({ size = 14, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Eye: ({ size = 14, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Trash: ({ size = 14, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14H7L5 6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Instagram: ({ size = 16, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Close: ({ size = 16, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: ({ size = 16, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Empty: ({ size = 16, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  Heart: ({ size = 16, filled = false, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} {...restProps} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Sparkle: ({ size = 16, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>
    </svg>
  ),
  ChevronDown: ({ size = 16, ...restProps }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...restProps}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

// ---------- Mount ----------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
