اعمل لآخرتك — المراحل 1 إلى 3
التشغيل: فك الضغط، افتح المجلد في VS Code، ثم Live Server على index.html (يحتاج إنترنت للتلاوات والخطوط).
منجز: الهوية والرئيسية بتصميم لوحة، التنقل متعدد الصفحات، القرآن 114 سورة بنص محقق مع تفسير ميسر، 9 قراء بتلاوات حقيقية ومشغل ثابت،
الأحاديث (9 كتب، 36 ألف حديث تقريبًا مع درجات ومصادر)، الأذكار، الأدعية، الأسئلة (نحو 9700 سؤال).
قادم: المراحل 4-6 (التفسير، الأنبياء، السيرة، الصحابة، الصور، الفقه، بقية الأقسام، البحث الشامل، دون اتصال).


مصادر الأقسام: السيرة والصحابة والفقه من أحاديث البخاري ومسلم الموجودة في الموقع، والمعرض صور من ويكيميديا كومنز مع ذكر المصور والترخيص، ومواقيت الصلاة والأسماء الحسنى من api.aladhan.com. تحتاج إنترنت.قصص الأنبياء لابن كثير: نص من ar.wikisource.org (CC BY-SA 4.0) كما هو.
ركن الأطفال والمسلم الجديد: اختيارات من نصوص القرآن والأربعين النووية وحصن المسلم الموجودة في الموقع دون كتابة محتوى جديد.


=== v5 additions ===
- Ayah highlight during recitation: verse-level, for Mishary Alafasy, Yasser Al-Dosari, Mahmoud Al-Husary and Abdulbasit Abdulsamad (timings from Quran.com API). Other reciters play without highlight (no timing data exists in a source we use). Not word-level.
- Word meanings: button "كلمة بكلمة" on each ayah shows English gloss and transliteration per word from Quran.com. Arabic word meanings are not available in the source. Button "English" shows the Saheeh International translation (alquran.cloud).
- English UI: EN/ع button in the header and in Settings. Menus, buttons and headings are translated. Quran, hadith, tafsir, azkar, qisas and long notices stay Arabic (sources are not translated by us).
- Offline: sw.js caches pages as you use them. Settings > "تنزيل الأساسيات" caches pages, Quran, Tafsir Muyassar, azkar, names, qisas, hadith index. "تنزيل كل الأحاديث" adds ~40 MB. Audio, other tafsirs, word-by-word, translation, prayer times and images need internet. Needs Live Server/localhost (not file://).

=== v5 (2): hero image + new reciters ===
- Home hero: full-width background photo (img/hero.jpg) with dark gradient. It is the Sheikh Zayed Grand Mosque in Abu Dhabi, not the Kaaba, so it is not labelled as the Kaaba. The file is only 720x388 px, so it looks soft on large screens. Replace img/hero.jpg with a larger photo (same name) for sharper quality.
- New reciters (from mp3quran.net, links checked one by one): Mahmoud Ali Al-Banna (murattal + mujawwad), Mustafa Ismail (murattal + mujawwad), Muhammad Refaat (31 surahs only), Ahmad Naina, Hani Al-Rifai, Salah Bukhatir, Idris Abkar, Nasser Al-Qatami, Abdulrahman Al-Oosi, Khalid Al-Jalil. Al-Shahat Muhammad Anwar from way2quran.com (114 surahs).
- NOT added: Abdel Fattah Al-Tarouti (no complete surah-by-surah recordings found in any streamable source).
- Reciters page: search by name, categories (murattal, mujawwad, complete, incomplete), surah picker per reciter, initials avatar (no photos).

=== v6 ===
- Wallpapers center (wallpapers.html): generated geometric/gradient designs, drawn in the browser (6 designs; mobile 1080x1920, desktop 1920x1080, square 1080x1080). Blank wallpapers, or cards with an ayah (Madinah mushaf text), a dhikr (Hisn al-Muslim) or a hadith (Nawawi 40). Source line is printed on the card. Text that is too long is not cut: the page says so. Download PNG or share (share works where the browser supports file sharing). Each ayah action bar has "صورة للمشاركة"; Nawawi hadiths too.
- Scholars (scholars.html): verbatim excerpts from Al-Dhahabi, Siyar A'lam al-Nubala (Arabic Wikisource) for 3 imams only: Abu Hanifa, Malik, Al-Shafi'i. Excerpts are cut from the opening; full text link provided. No biography was written by us.
- Search: now also covers Qisas al-Anbiya (Ibn Kathir) and the scholars excerpts, besides Quran, adhkar, tafsir and (optional) hadith.
- Report an error (report.html): form that opens a prefilled WhatsApp message to the owner for review before sending. Buttons on each ayah and hadith.
- Contact: WhatsApp icon (opens the chat, number is not printed on the page) and Facebook icon in the footer and contact.html.

=== v7: installable app (PWA) ===
- manifest.webmanifest (Arabic name, standalone, icons 192/512/maskable in img/), theme color, apple-touch-icon, linked on all pages. All paths are relative, so it works under a subpath such as /amal-/.
- Install: Android Chrome menu > "Install app" / "Add to Home screen"; iPhone Safari Share > "Add to Home Screen".
- The service worker (sw.js, cache amal-v7) keeps visited pages for offline use. Audio and remote APIs still need internet.

== v8 ==
- معرض الصور: ٥٠ صورة من ويكيميديا كومنز بتراخيص حرة مع المصور والترخيص (data/mosques.js). صورة واحدة للكعبة وأخرى للقبة الخضراء فقط.
- مركز الخلفيات: خطوط متعددة، ألوان، صورة من جهازك أو من المعرض، حجم وتعتيم ومحاذاة.
- المواقيت بنظام ١٢ ساعة (ص/م).
- صانع فيديو القرآن (videomaker.html): يسجل داخل المتصفح، بزمن حقيقي.

== v9 ==
- مدرسة التلاوة المصرية القديمة (oldschool.html): ١١ قارئًا بتسجيلات موثقة (روابط إسلام ويب + مصحف مرتل كامل لمحمود عبد الحكم)، مع بحث وفلتر. أحمد ندا: لم نجد له تسجيلًا.
