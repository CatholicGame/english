// Content adapted from "Cambridge Vocabulary for IELTS Advanced" (Pauline Cullen, Cambridge
// University Press) — docs/Cambridge Vocabulary for IELTS Advanced_Book.pdf in this repo.
// Hand-authored per unit (not generated): UNITS_META mirrors the book's "Map of the book" for
// all 25 units, CAMBRIDGE_UNITS holds the full interactive content for units that are ready.

export type WordPos = "noun" | "adjective" | "verb" | "phrase";

export interface VocabExample {
  en: string;
  vi: string;
}

export interface VocabWord {
  term: string;
  ipa: string;
  pos: WordPos;
  usageNote: string;
  en: string;
  vi: string;
  synonyms: string[];
  antonyms: string[];
  examples: VocabExample[];
  ieltsTip: string;
  summary: string;
}

export interface UnitMeta {
  unit: number;
  slug: string;
  title: string;
  topics: string;
  testPractice: string;
  available: boolean;
}

export interface VocabStep {
  kind: "vocab";
  title: string;
  instructions?: string;
  words: VocabWord[];
}

export interface ListeningClozeStep {
  kind: "listening_cloze";
  title: string;
  instructions: string;
  audioUrl: string;
  template: string; // plain text with {{answer}} markers, see src/lib/cloze.ts
  script: string;
  tip?: string;
}

export interface SortStep {
  kind: "sort";
  title: string;
  instructions: string;
  buckets: [string, string];
  items: { term: string; bucket: 0 | 1 }[];
}

export interface FillMcItem {
  before: string;
  after: string;
  options: string[];
  answer: string;
}

export interface FillMcStep {
  kind: "fill_mc";
  title: string;
  instructions: string;
  items: FillMcItem[];
}

export interface TypeFillItem {
  prompt: string;
  answer: string;
}

export interface TypeFillStep {
  kind: "type_fill";
  title: string;
  instructions: string;
  items: TypeFillItem[];
}

export interface ReadingQuestion {
  text: string;
  answer: "True" | "False" | "Not given";
  justification: string;
}

export interface ReadingTfNgStep {
  kind: "reading_tfng";
  title: string;
  passageTitle: string;
  passage: string;
  questions: ReadingQuestion[];
}

export interface RevealPairsStep {
  kind: "reveal_pairs";
  title: string;
  instructions: string;
  pairs: { prompt: string; reveal: string }[];
}

export interface SpeakingStep {
  kind: "speaking";
  title: string;
  prompt: string;
  bullets: string[];
  prepSeconds: number;
  talkSeconds: number;
  tip: string;
}

// One series per named sub-category (e.g. an age group, a weight bracket) —
// color is assigned by slot position when rendered (a fixed, validated
// categorical order), never authored here, so chart data stays just data.
export interface ChartSeriesDef {
  key: string;
  label: string;
}

export interface ChartGroupData {
  /** Row label — e.g. "Clothing", "2010 — 20–29". */
  label: string;
  /** seriesKey -> value (0-100). */
  values: Record<string, number>;
}

export interface ChartPanel {
  /** Optional sub-heading, e.g. "2010" vs "1950" for a chart split into two panels. */
  title?: string;
  series: ChartSeriesDef[];
  groups: ChartGroupData[];
}

export type WritingChart =
  // Independent 0-100 measures per series, compared side by side (e.g. % of
  // each age group who do X) — NOT parts of a whole.
  | { kind: "groupedBar"; panels: ChartPanel[] }
  // Parts of a whole per group (values within a group sum to ~100%) — rendered
  // as a single 100%-stacked bar per group, never a pie (see dataviz skill:
  // part-to-whole → stacked bar, not pie).
  | { kind: "stackedBar"; panels: ChartPanel[] };

export interface WritingTaskStep {
  kind: "writing_task";
  title: string;
  taskLabel: string;
  prompt: string;
  chartCaption?: string;
  /** Plain-text rows sent to the AI as chart context for grading — keep this
   * populated even when `chart` below also exists (AI feedback reads chartRows). */
  chartRows?: string[];
  /** Typed chart data for visual rendering (WritingChartView) — optional; when
   * absent, chartRows falls back to a plain bullet list. */
  chart?: WritingChart;
  minWords: number;
  tip: string;
  modelAnswer: string;
}

export type UnitStep =
  | VocabStep
  | ListeningClozeStep
  | SortStep
  | FillMcStep
  | TypeFillStep
  | ReadingTfNgStep
  | RevealPairsStep
  | SpeakingStep
  | WritingTaskStep;

export interface CambridgeUnit {
  unit: number;
  slug: string;
  title: string;
  topics: string;
  testPractice: string;
  steps: UnitStep[];
}

export const UNITS_META: UnitMeta[] = [
  { unit: 1, slug: "human-nature", title: "Human nature", topics: "Character, psychology", testPractice: "Listening Section 4", available: true },
  { unit: 2, slug: "time-for-a-change", title: "Time for a change", topics: "Time, change", testPractice: "Reading", available: true },
  { unit: 3, slug: "no-man-is-an-island", title: "No man is an island", topics: "Individuality, community", testPractice: "Writing Task 1", available: true },
  { unit: 4, slug: "scientific-discovery", title: "Scientific discovery", topics: "Chemistry, medicine", testPractice: "Reading", available: true },
  { unit: 5, slug: "striving-to-achieve", title: "Striving to achieve", topics: "Study, work", testPractice: "Speaking", available: true },
  { unit: 6, slug: "powers-of-persuasion", title: "Powers of persuasion", topics: "Advertising, marketing", testPractice: "Reading", available: true },
  { unit: 7, slug: "ways-and-means", title: "Ways and means", topics: "Tourism, travel", testPractice: "Writing Task 1", available: true },
  { unit: 8, slug: "state-control", title: "State control", topics: "Government, society", testPractice: "Writing Task 2", available: true },
  { unit: 9, slug: "natural-history", title: "Natural history", topics: "Animals, conservation", testPractice: "Reading", available: true },
  { unit: 10, slug: "rocket-science", title: "Rocket science", topics: "Space, physics", testPractice: "Listening Section 4", available: true },
  { unit: 11, slug: "progress", title: "Progress", topics: "Technology, design", testPractice: "Reading", available: true },
  { unit: 12, slug: "the-latest-thing", title: "The latest thing", topics: "Fashion and trends, consumerism", testPractice: "Reading", available: true },
  { unit: 13, slug: "urban-jungle", title: "Urban jungle", topics: "Rural life, city life", testPractice: "Listening Section 1", available: true },
  { unit: 14, slug: "tackling-issues", title: "Tackling issues", topics: "Problems, solutions", testPractice: "Writing Task 2", available: true },
  { unit: 15, slug: "this-earth", title: "This Earth", topics: "Natural phenomena, agriculture", testPractice: "Listening Section 3", available: true },
  { unit: 16, slug: "energy-efficient", title: "Energy efficient", topics: "Energy, natural resources", testPractice: "Writing Task 2", available: true },
  { unit: 17, slug: "getting-down-to-business", title: "Getting down to business", topics: "Management, personal finance", testPractice: "Reading", available: true },
  { unit: 18, slug: "law-enforcement", title: "Law enforcement", topics: "Crime, punishment", testPractice: "Writing Task 2", available: true },
  { unit: 19, slug: "the-media", title: "The media", topics: "Fame and the media, media bias", testPractice: "Speaking", available: true },
  { unit: 20, slug: "a-matter-of-taste", title: "A matter of taste", topics: "The arts, personal taste", testPractice: "Reading", available: true },
  { unit: 21, slug: "learning-vocabulary", title: "Learning vocabulary", topics: "Dictionaries, wordlists", testPractice: "Reference", available: true },
  { unit: 22, slug: "ielts-reading", title: "IELTS Reading", topics: "Reading skills, question types", testPractice: "Reference", available: true },
  { unit: 23, slug: "ielts-writing", title: "IELTS Writing", topics: "Writing Task 1, Writing Task 2", testPractice: "Reference", available: true },
  { unit: 24, slug: "ielts-listening", title: "IELTS Listening", topics: "Section 1 and 2, Section 3 and 4", testPractice: "Reference", available: true },
  { unit: 25, slug: "ielts-speaking", title: "IELTS Speaking", topics: "Part 1, Part 2, Part 3", testPractice: "Reference", available: true },
];

const unit1Vocab: VocabWord[] = [
  {
    term: "adolescent",
    ipa: "/ˌædəˈlesənt/",
    pos: "noun",
    usageNote: "thường dùng để chỉ người trẻ trong độ tuổi 13–19, đang trong giai đoạn chuyển từ trẻ em sang người lớn",
    en: "a young person who is no longer a child but not yet an adult",
    vi: "thanh thiếu niên",
    synonyms: ["teenager", "youth", "young person"],
    antonyms: ["adult", "grown-up"],
    examples: [
      { en: "Many adolescents struggle to balance independence with parental guidance.", vi: "Nhiều thanh thiếu niên phải vật lộn để cân bằng giữa sự độc lập và sự chỉ bảo của cha mẹ." },
      { en: "The study focused on how adolescents form their sense of identity.", vi: "Nghiên cứu tập trung vào cách thanh thiếu niên hình thành nhận thức về bản thân." },
    ],
    ieltsTip: "Dùng \"adolescent(s)\" thay cho \"teenager(s)\" hoặc \"young people\" trong Writing Task 2 để nghe trang trọng, mang tính học thuật hơn.",
    summary: "adolescent = thanh thiếu niên (danh từ trang trọng, học thuật, thay cho \"teenager\").",
  },
  {
    term: "characteristic",
    ipa: "/ˌkærəktəˈrɪstɪk/",
    pos: "noun",
    usageNote: "dùng để chỉ một đặc điểm nổi bật, giúp phân biệt người/vật này với người/vật khác",
    en: "a quality that makes someone or something different from others, and easy to recognize",
    vi: "đặc điểm, nét đặc trưng",
    synonyms: ["trait", "feature", "attribute", "quality"],
    antonyms: [],
    examples: [
      { en: "Honesty is one of her best characteristics.", vi: "Trung thực là một trong những đặc điểm tốt nhất của cô ấy." },
      { en: "Flexibility is a key characteristic of a good leader.", vi: "Linh hoạt là một đặc điểm quan trọng của một người lãnh đạo giỏi." },
    ],
    ieltsTip: "Trong Writing Task 2, dùng \"a key/defining characteristic of…\" để giới thiệu đặc điểm nổi bật của một hiện tượng hay nhóm người.",
    summary: "characteristic = đặc điểm, nét đặc trưng của một người hoặc sự vật.",
  },
  {
    term: "trait",
    ipa: "/treɪt/",
    pos: "noun",
    usageNote: "gần nghĩa với characteristic nhưng nhấn mạnh vào tính cách cá nhân, thường bẩm sinh hoặc lâu dài",
    en: "a quality in someone's character, especially one that is fixed and easy to notice",
    vi: "nét tính cách",
    synonyms: ["characteristic", "quality", "attribute"],
    antonyms: [],
    examples: [
      { en: "Patience is a trait she inherited from her father.", vi: "Kiên nhẫn là một nét tính cách cô ấy thừa hưởng từ cha mình." },
      { en: "Curiosity is a common trait among successful scientists.", vi: "Tò mò là một nét tính cách phổ biến ở các nhà khoa học thành công." },
    ],
    ieltsTip: "\"Personality trait\" là cụm collocation rất tự nhiên — dùng trong Speaking Part 2/3 khi mô tả tính cách một người bạn ngưỡng mộ.",
    summary: "trait = nét tính cách (đặc điểm cá nhân, thường bẩm sinh/lâu dài).",
  },
  {
    term: "apprehensive",
    ipa: "/ˌæprɪˈhensɪv/",
    pos: "adjective",
    usageNote: "mô tả cảm giác lo lắng nhẹ về việc gì đó sắp xảy ra, chưa chắc chắn kết quả",
    en: "worried about something that is going to happen, because you think it might go wrong",
    vi: "lo lắng, e sợ",
    synonyms: ["anxious", "nervous", "uneasy", "worried"],
    antonyms: ["confident", "calm", "relaxed"],
    examples: [
      { en: "I felt apprehensive before my job interview.", vi: "Tôi cảm thấy lo lắng trước buổi phỏng vấn xin việc." },
      { en: "She was apprehensive about moving to a new country alone.", vi: "Cô ấy lo lắng về việc chuyển đến một đất nước mới một mình." },
    ],
    ieltsTip: "Dùng \"apprehensive about + V-ing/noun\" để diễn đạt lo lắng về tương lai — tự nhiên hơn \"worried\" trong văn viết học thuật.",
    summary: "apprehensive = lo lắng, e ngại về điều sắp xảy ra.",
  },
  {
    term: "assertive",
    ipa: "/əˈsɜːtɪv/",
    pos: "adjective",
    usageNote: "mô tả người dám nói ra ý kiến, yêu cầu một cách tự tin nhưng không hung hăng",
    en: "able to say clearly what you think or want, in a confident way",
    vi: "quyết đoán, tự tin bày tỏ ý kiến",
    synonyms: ["confident", "assured", "self-assured", "forceful"],
    antonyms: ["timid", "passive", "indecisive"],
    examples: [
      { en: "You need to be more assertive if you want that promotion.", vi: "Bạn cần quyết đoán hơn nếu muốn được thăng chức." },
      { en: "She gave an assertive response to the interviewer's difficult question.", vi: "Cô ấy đưa ra câu trả lời quyết đoán trước câu hỏi khó của người phỏng vấn." },
    ],
    ieltsTip: "Rất hữu ích khi mô tả tính cách lãnh đạo trong Speaking Part 2 (\"Describe a person you admire\").",
    summary: "assertive = quyết đoán, tự tin thể hiện quan điểm của mình.",
  },
  {
    term: "clumsy",
    ipa: "/ˈklʌmzi/",
    pos: "adjective",
    usageNote: "mô tả người/hành động thiếu khéo léo, dễ làm rơi vỡ đồ hoặc vấp ngã",
    en: "moving or doing things in an awkward way, so that you often drop things or make mistakes",
    vi: "vụng về",
    synonyms: ["awkward", "ungainly", "uncoordinated"],
    antonyms: ["graceful", "coordinated", "skilful"],
    examples: [
      { en: "He's so clumsy that he broke two glasses this week.", vi: "Anh ấy vụng về đến nỗi làm vỡ hai cái cốc trong tuần này." },
      { en: "Her clumsy attempt to fix the shelf made it worse.", vi: "Nỗ lực vụng về của cô ấy để sửa cái kệ khiến nó tệ hơn." },
    ],
    ieltsTip: "Có thể dùng nghĩa bóng để mô tả một giải pháp/chính sách thiếu tinh tế: \"a clumsy attempt to solve the problem\".",
    summary: "clumsy = vụng về, thiếu khéo léo trong cử động hoặc hành động.",
  },
  {
    term: "cynical",
    ipa: "/ˈsɪnɪkəl/",
    pos: "adjective",
    usageNote: "mô tả người tin rằng ai cũng hành động vì lợi ích cá nhân, hay hoài nghi về động cơ tốt đẹp của người khác",
    en: "believing that people always act for selfish reasons, not because they are kind or honest",
    vi: "hoài nghi, yếm thế",
    synonyms: ["sceptical", "distrustful", "pessimistic"],
    antonyms: ["idealistic", "trusting", "optimistic"],
    examples: [
      { en: "Don't be so cynical — not everyone has hidden motives.", vi: "Đừng hoài nghi quá vậy — không phải ai cũng có động cơ ẩn giấu." },
      { en: "He has a cynical view of politicians and their promises.", vi: "Anh ấy có cái nhìn hoài nghi về các chính trị gia và những lời hứa của họ." },
    ],
    ieltsTip: "Dùng trong Writing Task 2 khi bàn về thái độ công chúng với truyền thông/chính trị: \"the public has become increasingly cynical about…\".",
    summary: "cynical = hoài nghi, cho rằng người khác luôn có động cơ vụ lợi.",
  },
  {
    term: "desirable",
    ipa: "/dɪˈzaɪərəbəl/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó đáng có, mang lại lợi ích hoặc được nhiều người mong muốn",
    en: "good enough or useful enough to be worth having",
    vi: "đáng mong muốn",
    synonyms: ["appealing", "attractive", "advantageous"],
    antonyms: ["undesirable", "unappealing"],
    examples: [
      { en: "A quiet, considerate neighbour is a highly desirable thing.", vi: "Một người hàng xóm yên tĩnh, biết quan tâm là điều rất đáng mong muốn." },
      { en: "It is desirable for candidates to have some work experience.", vi: "Các ứng viên có kinh nghiệm làm việc là điều đáng mong muốn." },
    ],
    ieltsTip: "\"It is desirable that…\" là cấu trúc trang trọng, hữu ích khi nêu khuyến nghị trong Writing Task 2.",
    summary: "desirable = đáng mong muốn, mang lại lợi ích hoặc được ưa chuộng.",
  },
  {
    term: "eccentric",
    ipa: "/ɪkˈsentrɪk/",
    pos: "adjective",
    usageNote: "mô tả hành vi khác thường nhưng thường theo hướng thú vị, vô hại, không theo chuẩn mực xã hội",
    en: "behaving in a way that is unusual and a little strange, but not in a harmful way",
    vi: "lập dị, kỳ quặc",
    synonyms: ["unconventional", "quirky", "odd", "peculiar"],
    antonyms: ["conventional", "normal", "ordinary"],
    examples: [
      { en: "My uncle is a lovable eccentric who collects vintage clocks.", vi: "Chú tôi là một người lập dị đáng yêu, sưu tầm đồng hồ cổ." },
      { en: "She's known for her eccentric fashion choices.", vi: "Cô ấy nổi tiếng với gu thời trang kỳ quặc." },
    ],
    ieltsTip: "Thường dùng trong Speaking để mô tả một người thú vị/đặc biệt bạn biết — mang sắc thái tích cực hơn \"weird\".",
    summary: "eccentric = lập dị, kỳ quặc nhưng theo hướng thú vị, khác biệt.",
  },
  {
    term: "egotistical",
    ipa: "/ˌiːɡəʊˈtɪstɪkəl/",
    pos: "adjective",
    usageNote: "mô tả người luôn coi bản thân là quan trọng nhất, chỉ quan tâm đến lợi ích/hình ảnh của mình",
    en: "believing that you are more important than everyone else, and behaving in a way that shows this",
    vi: "ích kỷ, tự cao",
    synonyms: ["self-centred", "conceited", "arrogant", "vain"],
    antonyms: ["modest", "humble", "selfless"],
    examples: [
      { en: "His egotistical attitude made him unpopular with colleagues.", vi: "Thái độ tự cao của anh ấy khiến anh không được đồng nghiệp yêu mến." },
      { en: "It was an egotistical decision that ignored the whole team's needs.", vi: "Đó là một quyết định ích kỷ, bỏ qua nhu cầu của cả đội." },
    ],
    ieltsTip: "Mang nghĩa tiêu cực mạnh — phù hợp khi phản biện quan điểm ai đó trong Writing Task 2 (vd bàn về chủ nghĩa cá nhân).",
    summary: "egotistical = ích kỷ, tự cao, chỉ nghĩ đến bản thân.",
  },
  {
    term: "gullible",
    ipa: "/ˈɡʌlɪbəl/",
    pos: "adjective",
    usageNote: "mô tả người quá tin người khác nên dễ bị lừa hoặc lợi dụng",
    en: "too ready to believe what people tell you, so that you are easily tricked",
    vi: "cả tin, dễ bị lừa",
    synonyms: ["naive", "credulous", "trusting"],
    antonyms: ["sceptical", "shrewd", "streetwise"],
    examples: [
      { en: "She's so gullible that she believed the obvious prank.", vi: "Cô ấy cả tin đến mức tin vào trò đùa lộ liễu đó." },
      { en: "Gullible customers are often targeted by online scams.", vi: "Những khách hàng cả tin thường bị nhắm đến bởi các trò lừa đảo trực tuyến." },
    ],
    ieltsTip: "Hữu ích khi bàn về lừa đảo trực tuyến/quảng cáo trong Writing Task 2: \"advertisers often target gullible consumers\".",
    summary: "gullible = cả tin, dễ bị lừa vì quá tin người khác.",
  },
  {
    term: "idealised",
    ipa: "/aɪˈdɪəlaɪzd/",
    pos: "adjective",
    usageNote: "mô tả một hình ảnh được vẽ nên đẹp/hoàn hảo hơn thực tế, thường mang tính phóng đại",
    en: "shown or described as better and more perfect than it really is",
    vi: "được lý tưởng hoá",
    synonyms: ["romanticised", "glorified"],
    antonyms: ["realistic", "accurate"],
    examples: [
      { en: "The film gives an idealised picture of village life.", vi: "Bộ phim vẽ nên một bức tranh được lý tưởng hoá về cuộc sống làng quê." },
      { en: "Social media often presents an idealised version of people's lives.", vi: "Mạng xã hội thường phô bày một phiên bản được lý tưởng hoá của cuộc sống con người." },
    ],
    ieltsTip: "Rất hữu dụng khi phản biện quan điểm phổ biến trong Writing Task 2: \"this is an idealised, rather than realistic, view of…\".",
    summary: "idealised = được lý tưởng hoá, đẹp/hoàn hảo hơn thực tế.",
  },
  {
    term: "inconsiderate",
    ipa: "/ˌɪnkənˈsɪdərət/",
    pos: "adjective",
    usageNote: "mô tả hành vi không nghĩ đến cảm xúc/sự bất tiện của người khác",
    en: "not thinking or caring about how your actions affect other people",
    vi: "thiếu quan tâm đến người khác, vô tâm",
    synonyms: ["thoughtless", "insensitive", "selfish"],
    antonyms: ["considerate", "thoughtful", "attentive"],
    examples: [
      { en: "It's inconsiderate to play loud music at midnight.", vi: "Thật vô tâm khi bật nhạc to vào lúc nửa đêm." },
      { en: "He made an inconsiderate remark about her weight.", vi: "Anh ta đã đưa ra một nhận xét thiếu tế nhị về cân nặng của cô ấy." },
    ],
    ieltsTip: "Ngược lại với \"considerate\" — hai từ này rất hay bị nhầm, chú ý tiền tố \"in-\" khi viết.",
    summary: "inconsiderate = vô tâm, không nghĩ đến cảm nhận của người khác.",
  },
  {
    term: "indecisive",
    ipa: "/ˌɪndɪˈsaɪsɪv/",
    pos: "adjective",
    usageNote: "mô tả người khó/chậm đưa ra quyết định, hay do dự giữa các lựa chọn",
    en: "finding it hard to make a decision, especially quickly",
    vi: "do dự, thiếu quyết đoán",
    synonyms: ["hesitant", "uncertain", "wavering"],
    antonyms: ["decisive", "assertive", "resolute"],
    examples: [
      { en: "He's so indecisive that choosing a restaurant takes forever.", vi: "Anh ấy do dự đến mức chọn một nhà hàng cũng mất cả tiếng." },
      { en: "Being indecisive can hold you back in a fast-paced job.", vi: "Sự thiếu quyết đoán có thể cản trở bạn trong một công việc có nhịp độ nhanh." },
    ],
    ieltsTip: "Trái nghĩa trực tiếp với \"assertive\" và \"decisive\" — ba từ này rất hay xuất hiện cùng nhau khi mô tả tính cách.",
    summary: "indecisive = do dự, khó đưa ra quyết định.",
  },
  {
    term: "self-assured",
    ipa: "/ˌselfəˈʃɔːd/",
    pos: "adjective",
    usageNote: "mô tả người tin tưởng vào khả năng và giá trị bản thân, thể hiện qua thái độ điềm tĩnh",
    en: "showing calm confidence in yourself and what you can do",
    vi: "tự tin",
    synonyms: ["confident", "self-confident", "poised"],
    antonyms: ["insecure", "self-conscious", "timid"],
    examples: [
      { en: "She walked into the interview looking calm and self-assured.", vi: "Cô ấy bước vào buổi phỏng vấn với vẻ bình tĩnh và tự tin." },
      { en: "A self-assured leader can handle criticism without losing confidence.", vi: "Một người lãnh đạo tự tin có thể đối mặt với chỉ trích mà không mất đi sự tự tin." },
    ],
    ieltsTip: "Gần nghĩa \"self-confident\" nhưng nhấn mạnh sự điềm tĩnh — phù hợp mô tả phong thái trong Speaking Part 2.",
    summary: "self-assured = tự tin, điềm tĩnh, tin vào năng lực bản thân.",
  },
  {
    term: "self-absorbed",
    ipa: "/ˌselfəbˈzɔːbd/",
    pos: "adjective",
    usageNote: "mô tả người chỉ quan tâm đến bản thân, ít để ý đến người xung quanh",
    en: "so interested in yourself and your own life that you do not notice or care about other people",
    vi: "chỉ nghĩ đến bản thân",
    synonyms: ["self-centred", "egocentric", "narcissistic"],
    antonyms: ["considerate", "selfless", "empathetic"],
    examples: [
      { en: "He was too self-absorbed to notice she was upset.", vi: "Anh ấy quá chú tâm vào bản thân nên không nhận ra cô ấy đang buồn." },
      { en: "Social media can make people more self-absorbed.", vi: "Mạng xã hội có thể khiến con người trở nên chỉ nghĩ đến bản thân hơn." },
    ],
    ieltsTip: "Chủ đề hay gặp trong Writing Task 2 về ảnh hưởng của mạng xã hội: \"social media has made society more self-absorbed\".",
    summary: "self-absorbed = chỉ nghĩ đến bản thân, ít quan tâm người khác.",
  },
  {
    term: "self-centred",
    ipa: "/ˌselfˈsentəd/",
    pos: "adjective",
    usageNote: "gần nghĩa self-absorbed nhưng nhấn mạnh việc luôn đặt lợi ích bản thân lên trên hết",
    en: "only interested in yourself and what you want, not in the needs of others",
    vi: "ích kỷ, chỉ nghĩ đến mình",
    synonyms: ["egotistical", "selfish", "self-absorbed"],
    antonyms: ["selfless", "considerate", "altruistic"],
    examples: [
      { en: "A self-centred boss rarely asks how the team is doing.", vi: "Một người sếp ích kỷ hiếm khi hỏi thăm tình hình của cả đội." },
      { en: "Being self-centred can damage close relationships over time.", vi: "Tính ích kỷ có thể làm tổn hại các mối quan hệ thân thiết theo thời gian." },
    ],
    ieltsTip: "Dễ nhầm với \"self-confident\" — chú ý \"self-centred\" luôn mang nghĩa tiêu cực.",
    summary: "self-centred = ích kỷ, luôn đặt bản thân lên trên hết.",
  },
  {
    term: "self-confident",
    ipa: "/ˌselfˈkɒnfɪdənt/",
    pos: "adjective",
    usageNote: "mô tả người tin vào khả năng của chính mình, mang nghĩa tích cực",
    en: "sure of your own abilities, opinions, and judgment",
    vi: "tự tin",
    synonyms: ["confident", "self-assured", "assured"],
    antonyms: ["insecure", "self-doubting", "timid"],
    examples: [
      { en: "Public speaking classes made him far more self-confident.", vi: "Các lớp học nói trước công chúng khiến anh ấy tự tin hơn nhiều." },
      { en: "Self-confident employees are more likely to take on new challenges.", vi: "Những nhân viên tự tin thường sẵn sàng đón nhận thử thách mới hơn." },
    ],
    ieltsTip: "Từ tích cực rất an toàn để mô tả bản thân/người khác trong Speaking Part 1 và 2.",
    summary: "self-confident = tự tin vào năng lực của bản thân (nghĩa tích cực).",
  },
  {
    term: "self-congratulatory",
    ipa: "/ˌselfkənˌɡrætʃʊˈleɪtəri/",
    pos: "adjective",
    usageNote: "mô tả thái độ/lời nói tự khen bản thân/thành tích của mình một cách thái quá",
    en: "showing that you are very pleased with what you have done, in a way that seems too proud",
    vi: "tự mãn, tự khen mình",
    synonyms: ["smug", "boastful", "self-satisfied"],
    antonyms: ["modest", "humble"],
    examples: [
      { en: "The report had a self-congratulatory tone that annoyed investors.", vi: "Bản báo cáo có giọng điệu tự mãn khiến các nhà đầu tư khó chịu." },
      { en: "His self-congratulatory speech ignored his team's contribution.", vi: "Bài phát biểu tự mãn của anh ấy bỏ qua đóng góp của cả đội." },
    ],
    ieltsTip: "Từ nâng cao, phù hợp khi phê phán phong cách truyền thông/quảng cáo của công ty trong Writing Task 2.",
    summary: "self-congratulatory = tự mãn, tự khen thành tích của bản thân quá mức.",
  },
  {
    term: "self-deprecating",
    ipa: "/ˌselfˈdeprəkeɪtɪŋ/",
    pos: "adjective",
    usageNote: "mô tả cách nói tự hạ thấp/châm biếm bản thân, thường mang tính hài hước, khiêm tốn",
    en: "making jokes about your own faults or failures, often as a way of seeming modest",
    vi: "hay tự giễu, khiêm tốn quá mức",
    synonyms: ["modest", "self-critical", "humble"],
    antonyms: ["self-congratulatory", "boastful", "arrogant"],
    examples: [
      { en: "Her self-deprecating humour makes her very likeable.", vi: "Sự hài hước hay tự giễu của cô ấy khiến cô rất dễ mến." },
      { en: "He made a self-deprecating joke about his poor cooking.", vi: "Anh ấy đùa tự giễu về khả năng nấu ăn kém cỏi của mình." },
    ],
    ieltsTip: "Rất tốt để mô tả tính cách hài hước, khiêm tốn của một người bạn trong Speaking Part 2.",
    summary: "self-deprecating = hay tự giễu/hạ thấp bản thân theo cách hài hước, khiêm tốn.",
  },
  {
    term: "self-important",
    ipa: "/ˌselfɪmˈpɔːtənt/",
    pos: "adjective",
    usageNote: "mô tả người nghĩ mình quan trọng hơn thực tế, thường thể hiện qua thái độ kiêu ngạo",
    en: "believing, in a way that annoys other people, that you are more important than you really are",
    vi: "tự cao, coi mình quan trọng",
    synonyms: ["arrogant", "pompous", "conceited"],
    antonyms: ["modest", "humble", "unassuming"],
    examples: [
      { en: "The self-important manager insisted on being called 'Sir'.", vi: "Người quản lý tự cao khăng khăng đòi được gọi là \"Sir\"." },
      { en: "He has a self-important manner that puts people off.", vi: "Anh ta có thái độ tự cao khiến người khác e ngại." },
    ],
    ieltsTip: "Gần nghĩa \"egotistical\" nhưng nhấn mạnh việc phóng đại tầm quan trọng của bản thân trước người khác.",
    summary: "self-important = tự cao, tự cho mình quan trọng hơn thực tế.",
  },
  {
    term: "tactful",
    ipa: "/ˈtæktfəl/",
    pos: "adjective",
    usageNote: "mô tả người biết cách nói/hành xử khéo léo để không làm tổn thương hay xúc phạm người khác",
    en: "careful about what you say or do, so that you do not upset or embarrass anyone",
    vi: "khéo léo, tế nhị",
    synonyms: ["diplomatic", "sensitive", "considerate"],
    antonyms: ["tactless", "blunt", "insensitive"],
    examples: [
      { en: "She gave tactful feedback that didn't hurt his feelings.", vi: "Cô ấy đưa ra góp ý khéo léo mà không làm tổn thương cảm xúc của anh ấy." },
      { en: "It's important to be tactful when discussing salary with a colleague.", vi: "Cần khéo léo khi bàn về lương bổng với đồng nghiệp." },
    ],
    ieltsTip: "Phẩm chất rất được đánh giá cao khi mô tả một người lãnh đạo/đồng nghiệp giỏi trong Speaking Part 2/3.",
    summary: "tactful = khéo léo, tế nhị trong lời nói và cách cư xử.",
  },
  {
    term: "well-adjusted",
    ipa: "/ˌweləˈdʒʌstɪd/",
    pos: "adjective",
    usageNote: "mô tả người có tâm lý ổn định, thích nghi tốt với cuộc sống/hoàn cảnh xung quanh",
    en: "calm and sensible, and able to deal well with the normal problems of life",
    vi: "thích nghi tốt, tâm lý ổn định",
    synonyms: ["balanced", "stable", "well-rounded"],
    antonyms: ["troubled", "unstable", "maladjusted"],
    examples: [
      { en: "Despite a difficult childhood, she grew into a well-adjusted adult.", vi: "Dù có tuổi thơ khó khăn, cô ấy vẫn trưởng thành thành một người có tâm lý ổn định." },
      { en: "Well-adjusted children usually cope better with change.", vi: "Những đứa trẻ có tâm lý ổn định thường ứng phó với sự thay đổi tốt hơn." },
    ],
    ieltsTip: "Thường dùng trong ngữ cảnh tâm lý học/giáo dục — hữu ích cho Writing Task 2 chủ đề nuôi dạy con cái.",
    summary: "well-adjusted = có tâm lý ổn định, thích nghi tốt với cuộc sống.",
  },
  {
    term: "well-bred",
    ipa: "/ˌwelˈbred/",
    pos: "adjective",
    usageNote: "mô tả người có cách cư xử lịch sự, thường ngụ ý xuất thân từ gia đình có giáo dục tốt",
    en: "polite and well-behaved, especially as a result of a good upbringing",
    vi: "được giáo dục tốt, lịch thiệp",
    synonyms: ["well-mannered", "polite", "refined", "cultured"],
    antonyms: ["ill-mannered", "rude", "uncouth"],
    examples: [
      { en: "His well-bred manners impressed everyone at dinner.", vi: "Cách cư xử lịch thiệp của anh ấy gây ấn tượng với mọi người trong bữa tối." },
      { en: "She comes from a well-bred family known for its charity work.", vi: "Cô ấy xuất thân từ một gia đình có giáo dục, nổi tiếng với các hoạt động từ thiện." },
    ],
    ieltsTip: "Gần nghĩa \"well-brought-up\" nhưng trang trọng/cổ điển hơn, đôi khi gợi ý về tầng lớp xã hội.",
    summary: "well-bred = lịch thiệp, được giáo dục tốt (thường gắn với gia thế).",
  },
  {
    term: "well-brought-up",
    ipa: "/ˌwelbrɔːtˈʌp/",
    pos: "adjective",
    usageNote: "thường dùng để mô tả trẻ em hoặc thanh thiếu niên, nhấn mạnh đến nền tảng giáo dục gia đình",
    en: "taught by your parents, from a young age, to behave politely and correctly",
    vi: "được nuôi dạy tử tế, ngoan ngoãn",
    synonyms: ["well-bred", "well-mannered", "polite", "cultured"],
    antonyms: ["ill-brought-up", "rude", "badly behaved"],
    examples: [
      { en: "She is a well-brought-up child who always says \"please\" and \"thank you\".", vi: "Cô bé là một đứa trẻ được nuôi dạy tử tế, luôn nói \"làm ơn\" và \"cảm ơn\"." },
      { en: "He is well-brought-up and treats everyone with respect.", vi: "Anh ấy được nuôi dạy tốt và luôn đối xử với mọi người bằng sự tôn trọng." },
    ],
    ieltsTip: "Dùng để mô tả phẩm chất cá nhân trong Speaking Part 2: \"I admire her because she is well-brought-up, polite, and considerate.\"",
    summary: "well-brought-up = được nuôi dạy tử tế, lịch sự, có giáo dục và cư xử đúng mực.",
  },
  {
    term: "well-dressed",
    ipa: "/ˌwelˈdrest/",
    pos: "adjective",
    usageNote: "mô tả người ăn mặc đẹp, hợp thời trang hoặc chỉn chu",
    en: "wearing clothes that are smart, fashionable, or suitable for the occasion",
    vi: "ăn mặc chỉnh tề, sang trọng",
    synonyms: ["smart", "stylish", "elegant"],
    antonyms: ["scruffy", "shabby", "unkempt"],
    examples: [
      { en: "Every guest at the gala was impeccably well-dressed.", vi: "Mọi vị khách tại buổi dạ tiệc đều ăn mặc vô cùng chỉnh tề." },
      { en: "He always looks well-dressed, even on casual days.", vi: "Anh ấy luôn trông chỉnh tề, ngay cả vào những ngày mặc đồ thường." },
    ],
    ieltsTip: "Từ đơn giản nhưng hữu ích khi mô tả ngoại hình một người trong Speaking Part 1/2.",
    summary: "well-dressed = ăn mặc chỉnh tề, thời trang.",
  },
];

const track02Script = `Speaker 1: I used to live next door to an elderly lady who had about 20 cats! She could never turn away a stray animal — she said she preferred them to people. She'd been born and raised in that house and she'd walk around the garden chatting away happily to all her cats. But, you know, I never saw her speak to a single human being!

Speaker 2: I first met Chris at high school. She sat next to me in one of my classes and we've been inseparable ever since. She made me laugh because she was always bumping into things or tripping over. One day, in biology, she managed to break five test tubes! But I know she's always there for me, and you can never feel miserable around her because she's always smiling.

Speaker 3: I'd like to describe someone I used to work with. He made my job quite difficult because he couldn't work independently at all. The main problem was that, if he had to choose between two or three different options, he just couldn't make his mind up, so I would have to help him or choose for him. I don't know whether he just lacked confidence, but it meant I couldn't get on with my own work and that made me look unreliable, which I'm not at all.`;

const track03Script = `Good morning, everyone. The purpose of this series of lectures is to help you to become a better student by making you more aware of the psychology behind the learning process. In the past, people were seen as either intelligent or unintelligent, and this was measured with an IQ test. However, psychologists now recognise that there are many different types of intelligence and these are reflected in your personality. The multiple intelligence theory first came to light in 1983 in Howard Gardner's book Frames of Mind. In it, Gardner listed seven types of intelligence. The first of these is termed 'linguistic', and this describes people who are more interested in the written word and reading. The next kind of intelligence is 'logical', and this is used to describe people whose strengths are in subjects such as maths and science. Then there is 'musical' intelligence, followed by 'kinaesthetic', which relates to the body and movement. After that there is 'visual' intelligence, which describes people who are attracted by or drawn to images. And then the final two intelligences are 'interpersonal' — describing someone who is aware of the feelings of others — and 'intrapersonal', which concerns self-awareness. Over the years, researchers have put forward other types of intelligence to add to this list, but these are usually ignored as they tend to be rather complex and less easily defined.

So, how can we use this information in education? Well, these intelligences basically refer to your strengths and weaknesses. Once you have identified these you can build on your strengths by choosing activities that match your intelligence type. For example, a kinaesthetic learner is a typical fidgeter and needs active participation. This means they will struggle to learn from a lecture. Instead, kinaesthetic learners could participate in a game or anything that allows them to play an active role in the lesson. Visual learners meanwhile, can benefit from visual aids such as making a poster outlining key points.

So, how can you find out what kind of learner you are? Well, you simply need to think about how you prefer to do things in your everyday life. For example, if a visual learner was trying to teach someone how to use a new piece of equipment, they would naturally draw a diagram to show visually how the equipment is used, while a kinaesthetic learner would show how something works by giving a demonstration. Now, other questions you could ask yourself are ...`;

const unit2Vocab: VocabWord[] = [
  {
    term: "retrospect",
    ipa: "/ˈretrəspekt/",
    pos: "noun",
    usageNote: "thường dùng trong cụm \"in retrospect\" để nhìn lại một sự việc đã qua và đánh giá nó bằng hiểu biết hiện tại",
    en: "the act of thinking about past events, knowing more now than you did when they happened",
    vi: "sự nhìn lại (quá khứ)",
    synonyms: ["hindsight", "reflection"],
    antonyms: [],
    examples: [
      { en: "In retrospect, moving to the city was the best decision I ever made.", vi: "Nhìn lại, chuyển đến thành phố là quyết định đúng đắn nhất tôi từng đưa ra." },
      { en: "In retrospect, we should have left earlier to avoid the traffic.", vi: "Nhìn lại, lẽ ra chúng tôi nên đi sớm hơn để tránh tắc đường." },
    ],
    ieltsTip: "Cụm \"in retrospect\" là cách mở đầu rất tự nhiên cho câu chủ đề khi bạn muốn đánh giá lại một quyết định trong Writing Task 2 hoặc Speaking Part 3.",
    summary: "retrospect = sự nhìn lại quá khứ; thường dùng trong cụm 'in retrospect'.",
  },
  {
    term: "contemporary",
    ipa: "/kənˈtempərəri/",
    pos: "adjective",
    usageNote: "có 2 nghĩa: (1) thuộc về thời hiện tại, hiện đại; (2) tồn tại/xảy ra cùng thời điểm với thứ khác",
    en: "belonging to the present time; or existing at the same time as something else",
    vi: "đương đại; cùng thời",
    synonyms: ["modern", "current", "present-day"],
    antonyms: ["historical", "bygone"],
    examples: [
      { en: "Contemporary art often challenges traditional ideas of beauty.", vi: "Nghệ thuật đương đại thường thách thức những quan niệm truyền thống về cái đẹp." },
      { en: "Shakespeare's contemporary, Christopher Marlowe, was also a celebrated playwright.", vi: "Người cùng thời với Shakespeare, Christopher Marlowe, cũng là một nhà viết kịch nổi tiếng." },
    ],
    ieltsTip: "\"Contemporary\" hay bị nhầm với \"temporary\" (tạm thời) — chú ý chính tả và nghĩa khi viết Task 2.",
    summary: "contemporary = đương đại / cùng thời; dễ nhầm với 'temporary'.",
  },
  {
    term: "bygone",
    ipa: "/ˈbaɪɡɒn/",
    pos: "adjective",
    usageNote: "mang sắc thái hoài niệm, thường đi với \"era/days/age\" để nói về một thời đã qua",
    en: "belonging to a time in the past, especially one you feel nostalgic about",
    vi: "đã qua, thuộc về quá khứ",
    synonyms: ["past", "former"],
    antonyms: ["contemporary", "current"],
    examples: [
      { en: "The old photographs reminded her of a bygone era.", vi: "Những bức ảnh cũ khiến bà nhớ về một thời đã qua." },
      { en: "The bygone days of letter-writing have largely disappeared.", vi: "Những ngày tháng viết thư tay đã gần như biến mất." },
    ],
    ieltsTip: "\"Bygone era/days\" là collocation cố định — dùng khi miêu tả sự hoài niệm về quá khứ trong bài luận hoặc Speaking Part 2.",
    summary: "bygone = thuộc về quá khứ (mang sắc thái hoài niệm); collocation: 'bygone era'.",
  },
  {
    term: "immediate",
    ipa: "/ɪˈmiːdiət/",
    pos: "adjective",
    usageNote: "có 2 nghĩa: (1) xảy ra ngay lập tức; (2) gần nhất về không gian/thời gian/quan hệ (vd \"immediate family\")",
    en: "happening or done at once; or nearest in time, place, or relationship",
    vi: "ngay lập tức; gần nhất",
    synonyms: ["instant", "prompt"],
    antonyms: ["delayed"],
    examples: [
      { en: "The medicine had an immediate effect on her pain.", vi: "Loại thuốc này có tác dụng ngay lập tức với cơn đau của cô ấy." },
      { en: "The immediate effect of the war was a breakdown in law and order.", vi: "Tác động tức thời của cuộc chiến là sự sụp đổ của luật pháp và trật tự." },
    ],
    ieltsTip: "\"Immediate effect/impact\" là collocation phổ biến trong Writing Task 2 khi bàn về hậu quả tức thời của một vấn đề.",
    summary: "immediate = ngay lập tức / gần nhất; collocation: 'immediate effect'.",
  },
  {
    term: "preceding",
    ipa: "/prɪˈsiːdɪŋ/",
    pos: "adjective",
    usageNote: "dùng để chỉ điều xảy ra ngay trước một mốc thời gian hoặc sự việc được nhắc đến",
    en: "happening or existing before something else, or before the one being mentioned",
    vi: "trước đó, ngay trước",
    synonyms: ["previous", "prior", "foregoing"],
    antonyms: ["following", "subsequent"],
    examples: [
      { en: "Sales fell sharply compared with the preceding year.", vi: "Doanh số giảm mạnh so với năm trước đó." },
      { en: "The preceding chapter explained the causes of the conflict.", vi: "Chương trước đó đã giải thích nguyên nhân của cuộc xung đột." },
    ],
    ieltsTip: "Dùng \"the preceding + noun\" (year/chapter/decade) để tránh lặp từ \"before\" hoặc \"previous\" nhiều lần trong bài viết.",
    summary: "preceding = ngay trước đó (thời gian/thứ tự); trang trọng hơn 'previous'.",
  },
  {
    term: "current",
    ipa: "/ˈkʌrənt/",
    pos: "adjective",
    usageNote: "mô tả điều đang diễn ra ở thời điểm hiện tại, thường dùng với danh từ chỉ tình trạng, xu hướng",
    en: "happening or existing now",
    vi: "hiện tại, hiện hành",
    synonyms: ["present", "ongoing", "existing"],
    antonyms: ["former", "past"],
    examples: [
      { en: "The current trend is for people to work from home more often.", vi: "Xu hướng hiện tại là mọi người làm việc tại nhà nhiều hơn." },
      { en: "Under the current system, applications take six weeks to process.", vi: "Theo hệ thống hiện hành, đơn đăng ký mất sáu tuần để xử lý." },
    ],
    ieltsTip: "\"Current trend/situation/system\" là collocation an toàn, dùng được trong hầu hết các đề Writing Task 2 để mô tả hiện trạng trước khi nêu quan điểm.",
    summary: "current = hiện tại, hiện hành; collocation: 'current trend/situation'.",
  },
  {
    term: "topical",
    ipa: "/ˈtɒpɪkəl/",
    pos: "adjective",
    usageNote: "mô tả một chủ đề đang được nhiều người quan tâm, bàn luận vào thời điểm hiện tại",
    en: "relating to a subject that people are currently interested in or talking about",
    vi: "mang tính thời sự",
    synonyms: ["current", "newsworthy"],
    antonyms: ["outdated"],
    examples: [
      { en: "Climate change is a topical issue that dominates the news.", vi: "Biến đổi khí hậu là vấn đề thời sự chiếm sóng tin tức." },
      { en: "The debate covered several topical questions about technology.", vi: "Cuộc tranh luận đề cập đến một số câu hỏi thời sự về công nghệ." },
    ],
    ieltsTip: "\"A topical issue\" là cách hay để mở đầu Writing Task 2 khi đề bài liên quan đến vấn đề xã hội đang nóng.",
    summary: "topical = mang tính thời sự, đang được quan tâm.",
  },
  {
    term: "the status quo",
    ipa: "/ˌsteɪtəs ˈkwəʊ/",
    pos: "phrase",
    usageNote: "luôn đi kèm \"the\" — chỉ tình trạng hiện tại của sự việc, thường dùng khi nói về việc duy trì hay thay đổi nó",
    en: "the situation as it is now, before any changes are made",
    vi: "hiện trạng, nguyên trạng",
    synonyms: ["current situation", "present state"],
    antonyms: ["change", "reform"],
    examples: [
      { en: "Many people resist change because they prefer the status quo.", vi: "Nhiều người chống lại sự thay đổi vì họ thích duy trì hiện trạng." },
      { en: "The new policy threatens to disrupt the status quo.", vi: "Chính sách mới có nguy cơ phá vỡ hiện trạng." },
    ],
    ieltsTip: "\"Maintain/challenge/disrupt the status quo\" là các collocation hữu ích khi viết về thay đổi xã hội trong Task 2.",
    summary: "the status quo = hiện trạng; hay đi với 'maintain/challenge'.",
  },
  {
    term: "profound",
    ipa: "/prəˈfaʊnd/",
    pos: "adjective",
    usageNote: "mô tả một sự thay đổi/ảnh hưởng rất sâu sắc, có tính chất căn bản, không phải bề nổi",
    en: "very great or intense; having a deep and lasting effect",
    vi: "sâu sắc, sâu rộng",
    synonyms: ["deep", "far-reaching", "significant"],
    antonyms: ["superficial", "minor"],
    examples: [
      { en: "The internet has had a profound effect on how we communicate.", vi: "Internet đã có ảnh hưởng sâu sắc đến cách chúng ta giao tiếp." },
      { en: "Losing her job had a profound impact on her confidence.", vi: "Mất việc đã ảnh hưởng sâu sắc đến sự tự tin của cô ấy." },
    ],
    ieltsTip: "\"A profound effect/impact/change\" là collocation nâng band điểm, thay cho \"big\" hoặc \"huge\" quá đơn giản.",
    summary: "profound = sâu sắc; collocation: 'a profound effect/change'.",
  },
  {
    term: "sweeping",
    ipa: "/ˈswiːpɪŋ/",
    pos: "adjective",
    usageNote: "mô tả một sự thay đổi có phạm vi rất rộng, ảnh hưởng đến gần như mọi thứ/mọi người liên quan",
    en: "very wide in range or effect, affecting almost everything",
    vi: "trên diện rộng, toàn diện",
    synonyms: ["comprehensive", "wide-ranging", "extensive"],
    antonyms: ["limited", "minor"],
    examples: [
      { en: "The government introduced sweeping reforms to the healthcare system.", vi: "Chính phủ đã đưa ra những cải cách toàn diện đối với hệ thống y tế." },
      { en: "Sweeping changes to the curriculum affected every student.", vi: "Những thay đổi trên diện rộng đối với chương trình học đã ảnh hưởng đến mọi học sinh." },
    ],
    ieltsTip: "\"Sweeping reforms/changes\" thường xuất hiện trong bài đọc IELTS về chính sách — ghi nhớ để dùng lại trong Writing Task 2 khi bàn về vai trò của chính phủ.",
    summary: "sweeping = trên diện rộng, toàn diện; collocation: 'sweeping reforms/changes'.",
  },
  {
    term: "drastic",
    ipa: "/ˈdræstɪk/",
    pos: "adjective",
    usageNote: "mô tả biện pháp/thay đổi mạnh mẽ, đôi khi mang nghĩa tiêu cực vì quá đột ngột hoặc cực đoan",
    en: "extreme and sudden, or having a strong effect",
    vi: "mạnh mẽ, quyết liệt (thường mang sắc thái tiêu cực)",
    synonyms: ["extreme", "radical", "severe"],
    antonyms: ["mild", "moderate"],
    examples: [
      { en: "The company took drastic measures to cut costs, including layoffs.", vi: "Công ty đã áp dụng các biện pháp quyết liệt để cắt giảm chi phí, bao gồm sa thải nhân sự." },
      { en: "Drastic action is needed to address climate change.", vi: "Cần có hành động mạnh mẽ để giải quyết vấn đề biến đổi khí hậu." },
    ],
    ieltsTip: "\"Take drastic measures/action\" là collocation phổ biến khi đề xuất giải pháp mạnh trong Writing Task 2.",
    summary: "drastic = mạnh mẽ, quyết liệt; collocation: 'drastic measures/action'.",
  },
  {
    term: "infinitesimal",
    ipa: "/ˌɪnfɪnɪˈtesɪməl/",
    pos: "adjective",
    usageNote: "mô tả một sự thay đổi/số lượng cực kỳ nhỏ, gần như không đáng kể",
    en: "extremely small in size or amount, almost too small to measure",
    vi: "cực kỳ nhỏ, vi mô",
    synonyms: ["negligible", "minuscule", "tiny"],
    antonyms: ["huge", "substantial"],
    examples: [
      { en: "The change in temperature was infinitesimal and went unnoticed.", vi: "Sự thay đổi nhiệt độ là cực kỳ nhỏ và không ai để ý." },
      { en: "Her chances of winning were infinitesimal.", vi: "Cơ hội chiến thắng của cô ấy là cực kỳ nhỏ." },
    ],
    ieltsTip: "Từ \"infinitesimal\" cho thấy vốn từ vựng học thuật nâng cao — dùng thay cho \"very small\" trong Writing Task 1 khi mô tả biểu đồ có mức thay đổi gần như bằng 0.",
    summary: "infinitesimal = cực kỳ nhỏ, gần như không đáng kể.",
  },
  {
    term: "modest",
    ipa: "/ˈmɒdɪst/",
    pos: "adjective",
    usageNote: "ở đây mang nghĩa \"không lớn\", khiêm tốn về quy mô/mức độ (khác với nghĩa \"khiêm tốn về tính cách\")",
    en: "(of a change or amount) not very large; fairly small",
    vi: "khiêm tốn, không đáng kể (về quy mô)",
    synonyms: ["moderate", "small", "slight"],
    antonyms: ["substantial", "dramatic"],
    examples: [
      { en: "The company reported only a modest increase in profits this year.", vi: "Công ty báo cáo mức tăng lợi nhuận khá khiêm tốn trong năm nay." },
      { en: "There has been a modest improvement in air quality since the new law.", vi: "Đã có sự cải thiện khiêm tốn về chất lượng không khí kể từ khi có luật mới." },
    ],
    ieltsTip: "\"A modest increase/improvement\" rất hữu ích trong Writing Task 1 khi mô tả một đường biểu diễn tăng nhẹ, không đột biến.",
    summary: "modest = khiêm tốn về quy mô/mức độ; collocation: 'a modest increase'.",
  },
  {
    term: "gradual",
    ipa: "/ˈɡrædʒuəl/",
    pos: "adjective",
    usageNote: "mô tả sự thay đổi diễn ra từ từ, qua nhiều bước nhỏ, trái ngược với đột ngột",
    en: "happening slowly or in small stages over a period of time",
    vi: "dần dần, từ từ",
    synonyms: ["slow", "steady", "incremental"],
    antonyms: ["sudden", "abrupt"],
    examples: [
      { en: "There has been a gradual increase in life expectancy over the last century.", vi: "Đã có sự gia tăng dần dần về tuổi thọ trung bình trong thế kỷ qua." },
      { en: "Learning a language is a gradual process that takes years.", vi: "Học một ngôn ngữ là một quá trình từ từ, kéo dài nhiều năm." },
    ],
    ieltsTip: "\"Gradual increase/decline/process\" là collocation cơ bản nhưng chính xác cho Writing Task 1 — nhớ phân biệt với \"sudden/dramatic\".",
    summary: "gradual = dần dần, từ từ; trái nghĩa với 'sudden/abrupt'.",
  },
  {
    term: "steady",
    ipa: "/ˈstedi/",
    pos: "adjective",
    usageNote: "mô tả sự thay đổi đều đặn, ổn định theo một hướng, không dao động lên xuống thất thường",
    en: "developing or moving at a regular and continuous rate, without sudden changes",
    vi: "đều đặn, ổn định",
    synonyms: ["consistent", "constant", "stable"],
    antonyms: ["erratic", "fluctuating"],
    examples: [
      { en: "The company has seen steady growth in sales over the past five years.", vi: "Công ty đã chứng kiến sự tăng trưởng đều đặn về doanh số trong năm năm qua." },
      { en: "There was a steady rise in temperature throughout the afternoon.", vi: "Nhiệt độ tăng đều đặn suốt buổi chiều." },
    ],
    ieltsTip: "\"A steady rise/increase/decline\" mô tả một đường biểu diễn tăng/giảm đều, không có đột biến — rất cần thiết cho Writing Task 1.",
    summary: "steady = đều đặn, ổn định; hay dùng để mô tả biểu đồ trong Writing Task 1.",
  },
  {
    term: "turbulent",
    ipa: "/ˈtɜːbjələnt/",
    pos: "adjective",
    usageNote: "mô tả một giai đoạn đầy biến động, hỗn loạn, khó dự đoán, thường dùng cho lịch sử/chính trị/kinh tế",
    en: "full of sudden changes, confusion, or violence; not stable",
    vi: "hỗn loạn, đầy biến động",
    synonyms: ["chaotic", "unstable", "volatile"],
    antonyms: ["stable", "calm"],
    examples: [
      { en: "The country went through a turbulent period after the revolution.", vi: "Đất nước đã trải qua một giai đoạn đầy biến động sau cuộc cách mạng." },
      { en: "Financial markets have been turbulent this year.", vi: "Thị trường tài chính đã đầy biến động trong năm nay." },
    ],
    ieltsTip: "\"A turbulent period/era\" rất hữu ích khi mô tả các giai đoạn lịch sử bất ổn trong bài đọc hoặc Speaking Part 3.",
    summary: "turbulent = hỗn loạn, đầy biến động; collocation: 'a turbulent period'.",
  },
  {
    term: "abrupt",
    ipa: "/əˈbrʌpt/",
    pos: "adjective",
    usageNote: "mô tả điều xảy ra đột ngột, không có dấu hiệu báo trước, đôi khi khiến người khác bất ngờ hoặc khó chịu",
    en: "sudden and unexpected, often in a way that is unpleasant",
    vi: "đột ngột",
    synonyms: ["sudden", "unexpected"],
    antonyms: ["gradual", "smooth"],
    examples: [
      { en: "The meeting came to an abrupt end when the fire alarm went off.", vi: "Cuộc họp kết thúc đột ngột khi chuông báo cháy vang lên." },
      { en: "There was an abrupt change in the weather this afternoon.", vi: "Đã có một sự thay đổi thời tiết đột ngột vào chiều nay." },
    ],
    ieltsTip: "\"An abrupt change/end\" trái nghĩa với \"gradual\" — cặp từ này rất hay được hỏi trong bài đọc IELTS dạng matching.",
    summary: "abrupt = đột ngột; trái nghĩa với 'gradual'.",
  },
  {
    term: "rapid",
    ipa: "/ˈræpɪd/",
    pos: "adjective",
    usageNote: "mô tả tốc độ thay đổi rất nhanh, thường mang tính trung lập (không hàm ý tốt/xấu như 'drastic')",
    en: "happening in a short time or at great speed",
    vi: "nhanh chóng",
    synonyms: ["swift", "fast", "quick"],
    antonyms: ["slow", "gradual"],
    examples: [
      { en: "The country has experienced rapid economic growth in the last decade.", vi: "Đất nước đã trải qua tăng trưởng kinh tế nhanh chóng trong thập kỷ qua." },
      { en: "Rapid advances in technology have changed the way we live.", vi: "Những tiến bộ nhanh chóng trong công nghệ đã thay đổi cách chúng ta sống." },
    ],
    ieltsTip: "\"Rapid growth/advance/change\" là collocation rất phổ biến trong cả bài đọc lẫn Writing Task 2 về chủ đề phát triển.",
    summary: "rapid = nhanh chóng; collocation: 'rapid growth/advance'.",
  },
];

const track04Script = `Speaker 1: I think when you're really young, your spare time seems to last an eternity — it just drags on and on. I remember the summer holidays went on for ages and I had so much time on my hands. Then, in next to no time, you're an adult and time seems to speed up. It just goes so fast and there aren't enough hours in the day to get everything done. You feel constantly pressed for time, and spare time becomes this luxury you can't afford anymore!

Speaker 2: There's a saying that 'the past is another country'. I think that's very true for old people like my gran. For her, the past is a country she likes to visit for hours and hours at a time through her memories. She's always telling me that time passes in the blink of an eye and I should make the most of every moment of it. But for young people, the past seems like only an instant ago and they don't want to reflect on it. They just want to go out and have the time of their life! I think that, when you get near the end of it, your life must seem brief and fleeting. Looking back on it helps you feel you've achieved something, helps you feel proud of what you've done.`;

const track05Script = `Over the past few years we've been involved in conducting research on an area of the USA known as Lake Coeur D'Alene. Now, long ago, our ancestors came to these shores from Europe. They were the pioneers of the colonial era and felt they had discovered the charms of this lake.

But in fact, if we go back many thousands of years, we find that ancient civilisations dwelt along the shores of the lake, fishing in its blue depths and digging for potatoes near the shore. And I've been working with a group of archaeologists gathering evidence of those prehistoric lakeside dwellers.

In some areas, we've found remnants of ancient villages buried beneath deep layers of sediment. Other areas have yielded only small flecks of charcoal from prehistoric fires.

However, our discoveries mean that the sites will now receive greater formal protection. For example, we've just learned that the area will be placed on the National Register of Historic Places. This is wonderful news. It's vital that we conserve these sites because several of them are on the verge of destruction. They're under attack not only from erosion but also from looters. These thieves steal what they see as antiques in order to sell them. Without protection, this practice will sadly continue. To help with our research, we aim to fully excavate the sites. And we really need to do that as a matter of some urgency. When we do, we will remove any artefacts we manage to uncover and put them into safe storage.`;

const UNIT_2_TIME_FOR_A_CHANGE: CambridgeUnit = {
  unit: 2,
  slug: "time-for-a-change",
  title: "Time for a change",
  topics: "Time, change",
  testPractice: "Reading",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit2Vocab,
    },
    {
      kind: "listening_cloze",
      title: "What does time mean to them?",
      instructions: "Listen to two people talking about time. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-04.mp3",
      template:
        "Speaker 1 says that as a child, spare time seemed to {{drag}} on forever, but as an adult he never has enough hours in the day — spare time has become a {{luxury}} he can no longer afford.\n\n" +
        "Speaker 2 talks about her grandmother, for whom the past feels close, as if time passes in the {{blink}} of an eye. She adds that young people rarely stop to {{reflect}} on the past because they are too busy living in the moment.",
      script: track04Script,
    },
    {
      kind: "sort",
      title: "Past or present?",
      instructions: "Tap a word, then tap whether it refers to the past or the present.",
      buckets: ["Past", "Present"],
      items: [
        { term: "retrospect", bucket: 0 },
        { term: "bygone", bucket: 0 },
        { term: "preceding", bucket: 0 },
        { term: "contemporary", bucket: 1 },
        { term: "immediate", bucket: 1 },
        { term: "current", bucket: 1 },
        { term: "topical", bucket: 1 },
        { term: "status quo", bucket: 1 },
      ],
    },
    {
      kind: "sort",
      title: "Large change or small change?",
      instructions: "Tap a word, then tap the size of change it describes.",
      buckets: ["Large change", "Small change"],
      items: [
        { term: "enormous", bucket: 0 },
        { term: "dramatic", bucket: 0 },
        { term: "immense", bucket: 0 },
        { term: "extraordinary", bucket: 0 },
        { term: "tremendous", bucket: 0 },
        { term: "sweeping", bucket: 0 },
        { term: "profound", bucket: 0 },
        { term: "drastic", bucket: 0 },
        { term: "huge", bucket: 0 },
        { term: "major", bucket: 0 },
        { term: "minute", bucket: 1 },
        { term: "modest", bucket: 1 },
        { term: "minor", bucket: 1 },
        { term: "infinitesimal", bucket: 1 },
        { term: "slight", bucket: 1 },
      ],
    },
    {
      kind: "fill_mc",
      title: "Gradual or sudden?",
      instructions: "Choose the word that best describes how the change happened.",
      items: [
        {
          before: "After years of decline, the shift to renewable energy has been",
          after: "rather than sudden.",
          options: ["gradual", "abrupt", "turbulent"],
          answer: "gradual",
        },
        {
          before: "The company enjoyed a",
          after: "rise in profits every year for a decade.",
          options: ["steady", "abrupt", "turbulent"],
          answer: "steady",
        },
        {
          before: "The country went through a",
          after: "period of civil unrest in the 1990s.",
          options: ["turbulent", "gradual", "steady"],
          answer: "turbulent",
        },
        {
          before: "The meeting came to an",
          after: "end when the fire alarm went off.",
          options: ["abrupt", "gradual", "steady"],
          answer: "abrupt",
        },
        {
          before: "Mobile technology has seen",
          after: "growth over the past twenty years.",
          options: ["rapid", "steady", "abrupt"],
          answer: "rapid",
        },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Listening — new evidence from an old lake",
      instructions: "Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-05.mp3",
      tip: "The wording in the notes paraphrases what you hear, but the answers come in the same order as the talk. Keep to the word limit and check your spelling at the end.",
      template:
        "Research at Lake Coeur D'Alene\n" +
        "• {{ancient}} civilisations lived along the shores of the lake thousands of years ago\n" +
        "• They fished in the lake and dug for {{potatoes}} near the shore\n\n" +
        "Findings\n" +
        "• Remnants of villages found buried under deep layers of {{sediment}}\n" +
        "• Some areas only yielded small flecks of {{charcoal}}\n\n" +
        "Next steps\n" +
        "• The area will be added to the National Register of {{Historic}} Places\n" +
        "• Protection is urgent because sites are threatened by erosion and {{looters}}\n" +
        "• The team plans to fully {{excavate}} the sites and move artefacts to safe storage",
      script: track05Script,
    },
    {
      kind: "speaking",
      title: "Speaking — describe a change",
      prompt: "Describe a change you made in your life.",
      bullets: [
        "what the change was",
        "why you decided to make it",
        "how difficult it was to make",
        "and say how you felt about it afterwards",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"Do you often make changes like this?\" or \"Are you someone who likes change or avoids it?\" — think about how you'd answer those too. Try working in some of this unit's vocabulary (gradual, drastic, profound...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "was mostly ignored", reveal: "was often set aside... on the assumption that it had little left to reveal" },
        { prompt: "big discoveries", reveal: "grander artefacts" },
        { prompt: "breaks down quickly", reveal: "decays quickly" },
        { prompt: "older than believed", reveal: "thousands of years earlier than researchers had previously believed" },
        { prompt: "what someone ate", reveal: "a community's diet down to individual meals" },
        { prompt: "not impressive", reveal: "none of this evidence is glamorous" },
        { prompt: "where someone grew up", reveal: "the chemical signature of local water and soil is absorbed into the skeleton" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Test practice — Reading",
      passageTitle: "What old rubbish tells us about the past",
      passage:
        "For most of the twentieth century, archaeologists who uncovered an ancient site paid the closest attention to its most impressive contents: temples, tombs, weapons and jewellery. Everyday rubbish — broken pottery, food scraps, worn fragments of cloth — was often set aside during excavations, on the assumption that it had little left to reveal. In the last few decades, that assumption has been overturned. Advances in laboratory analysis mean that scientists can now recover detailed information from even the smallest and most fragile scraps of material, and this has produced an entirely new picture of everyday life in the ancient world.\n\n" +
        "Textiles are a good example. Cloth rarely survives the passage of centuries, since it decays quickly unless conditions happen to be unusually dry, cold or airless. But where scraps do survive, chemical analysis of the fibres can reveal what plants or animals they came from, how the yarn was spun, and even what dyes were used to colour it. This kind of evidence has already overturned some long-standing assumptions. Textile production was long thought to be a relatively recent skill, but fibre samples recovered from caves show that people were spinning and weaving thousands of years earlier than researchers had previously believed.\n\n" +
        "Food waste tells its own story. Charred seeds, fish bones and the residue left inside cooking pots can now be tested for traces of specific plants, animals and even cooking methods, letting scientists reconstruct a community's diet down to individual meals. Isotope analysis of bone can go further still, revealing not just what someone ate over a lifetime but sometimes where they grew up, since the chemical signature of local water and soil is absorbed into the skeleton as it forms.\n\n" +
        "None of this evidence is glamorous. A handful of charcoal or a scrap of thread will never draw the crowds that a gold death mask does. But taken together, these unglamorous fragments are filling in the gaps that grander artefacts leave behind, giving archaeologists a far more complete — and far more ordinary — picture of how people actually lived.",
      questions: [
        {
          text: "In the past, archaeologists usually discarded the most impressive objects they found.",
          answer: "False",
          justification: "They paid the closest attention to impressive objects; it was everyday rubbish that was often set aside.",
        },
        {
          text: "Cloth survives well in most burial conditions.",
          answer: "False",
          justification: "Cloth decays quickly unless conditions happen to be unusually dry, cold or airless.",
        },
        {
          text: "Fibre evidence has shown that weaving is older than scientists previously thought.",
          answer: "True",
          justification: "Fibre samples recovered from caves show people were spinning and weaving thousands of years earlier than researchers had previously believed.",
        },
        {
          text: "Isotope analysis of bones can reveal where a person grew up.",
          answer: "True",
          justification: "It can reveal where they grew up, since the chemical signature of local water and soil is absorbed into the skeleton as it forms.",
        },
        {
          text: "Modern museums now display food residue more prominently than gold artefacts.",
          answer: "Not given",
          justification: "The passage does not discuss how museums display or prioritise artefacts.",
        },
        {
          text: "Cooking pot residue can indicate what people ate on a single occasion.",
          answer: "True",
          justification: "Residue can be tested to reconstruct a community's diet down to individual meals.",
        },
        {
          text: "Charred seeds are more useful to researchers than fragments of cloth.",
          answer: "Not given",
          justification: "The passage does not compare the relative usefulness of charred seeds and cloth.",
        },
      ],
    },
  ],
};

const unit3Vocab: VocabWord[] = [
  {
    term: "blend in (with)",
    ipa: "/blend ɪn/",
    pos: "phrase",
    usageNote: "dùng khi ai/vật gì hoà lẫn vào xung quanh, không nổi bật",
    en: "to look similar to the things or people around you and not be noticeable",
    vi: "hoà lẫn, hoà nhập (không nổi bật)",
    synonyms: ["fit in", "merge"],
    antonyms: ["stand out"],
    examples: [
      { en: "The chameleon can blend in with its surroundings.", vi: "Con tắc kè có thể hoà lẫn vào môi trường xung quanh." },
      { en: "He tried to blend in with the crowd so no one would recognise him.", vi: "Anh ta cố hoà lẫn vào đám đông để không ai nhận ra." },
    ],
    ieltsTip: "\"Blend in with\" trái nghĩa với \"stand out from\" — một cặp phrasal verb rất hay gặp trong bài nghe/đọc về chủ đề cá tính, hội nhập.",
    summary: "blend in (with) = hoà lẫn vào, không nổi bật; trái nghĩa với 'stand out'.",
  },
  {
    term: "stand out (from)",
    ipa: "/stænd aʊt/",
    pos: "phrase",
    usageNote: "dùng khi ai/vật gì nổi bật, khác biệt so với xung quanh (thường theo nghĩa tích cực)",
    en: "to be much easier to notice than the people or things around you",
    vi: "nổi bật",
    synonyms: ["be noticeable", "be distinctive"],
    antonyms: ["blend in"],
    examples: [
      { en: "She always stands out from the crowd with her colourful clothes.", vi: "Cô ấy luôn nổi bật giữa đám đông nhờ trang phục sặc sỡ." },
      { en: "A good CV needs to stand out from hundreds of others.", vi: "Một bản CV tốt cần nổi bật so với hàng trăm bản khác." },
    ],
    ieltsTip: "Dùng \"stand out from the crowd\" trong Speaking Part 2/3 khi mô tả một người có cá tính riêng.",
    summary: "stand out (from) = nổi bật; trái nghĩa với 'blend in'.",
  },
  {
    term: "fit in (with)",
    ipa: "/fɪt ɪn/",
    pos: "phrase",
    usageNote: "dùng khi ai đó hoà hợp, được chấp nhận trong một nhóm/môi trường",
    en: "to feel happy and comfortable in a particular situation or group because you are similar to other people in it",
    vi: "hoà hợp, hợp với (một nhóm/môi trường)",
    synonyms: ["belong", "blend in"],
    antonyms: ["stand out"],
    examples: [
      { en: "It took her a while to fit in with her new colleagues.", vi: "Cô ấy mất một thời gian để hoà hợp với đồng nghiệp mới." },
      { en: "New students often worry about whether they will fit in.", vi: "Học sinh mới thường lo lắng về việc liệu mình có hoà hợp được không." },
    ],
    ieltsTip: "\"Fit in with\" khác \"blend in with\" ở chỗ nó nhấn mạnh cảm giác được chấp nhận, không chỉ đơn thuần là không nổi bật.",
    summary: "fit in (with) = hoà hợp, được chấp nhận trong một nhóm.",
  },
  {
    term: "break away (from)",
    ipa: "/breɪk əˈweɪ/",
    pos: "phrase",
    usageNote: "dùng khi ai đó tách khỏi một nhóm, truyền thống hay hệ thống để trở nên độc lập",
    en: "to leave a group or organisation, especially in order to form a new one, or to stop following tradition",
    vi: "tách ra, thoát ly (khỏi truyền thống/nhóm)",
    synonyms: ["break free", "split from"],
    antonyms: ["conform"],
    examples: [
      { en: "Young artists often try to break away from tradition.", vi: "Các nghệ sĩ trẻ thường cố gắng thoát ly khỏi truyền thống." },
      { en: "The region voted to break away from the rest of the country.", vi: "Khu vực này đã bỏ phiếu để tách khỏi phần còn lại của đất nước." },
    ],
    ieltsTip: "\"Break away from tradition/the norm\" rất hữu ích khi bàn về cá nhân/nhóm không tuân theo chuẩn mực trong Writing Task 2.",
    summary: "break away (from) = tách ra, thoát ly khỏi (truyền thống, nhóm).",
  },
  {
    term: "opt out (of)",
    ipa: "/ɒpt aʊt/",
    pos: "phrase",
    usageNote: "dùng khi ai đó chọn không tham gia một việc gì mà lẽ ra được kỳ vọng tham gia",
    en: "to choose not to take part in something, or to stop taking part in it",
    vi: "chọn không tham gia, rút lui",
    synonyms: ["withdraw", "decline to participate"],
    antonyms: ["opt in", "join in"],
    examples: [
      { en: "Many employees chose to opt out of the pension scheme.", vi: "Nhiều nhân viên đã chọn không tham gia chương trình lương hưu." },
      { en: "She decided to opt out of the group project and work alone.", vi: "Cô ấy quyết định không tham gia dự án nhóm và làm việc một mình." },
    ],
    ieltsTip: "\"Opt out of\" hay xuất hiện trong bài đọc về chính sách xã hội — chú ý phân biệt với \"drop out of\" (bỏ học/bỏ dở).",
    summary: "opt out (of) = chọn không tham gia, rút lui khỏi.",
  },
  {
    term: "flaunt",
    ipa: "/flɔːnt/",
    pos: "verb",
    usageNote: "mang sắc thái tiêu cực nhẹ, ngụ ý phô trương một cách khoe khoang, muốn người khác chú ý",
    en: "to show something in a very obvious way, especially in order to be admired, often in a way that annoys other people",
    vi: "phô trương, khoe khoang",
    synonyms: ["show off", "display"],
    antonyms: ["hide", "conceal"],
    examples: [
      { en: "He loves to flaunt his wealth by driving expensive cars.", vi: "Anh ta thích phô trương sự giàu có bằng cách lái những chiếc xe đắt tiền." },
      { en: "She flaunted her new engagement ring to all her friends.", vi: "Cô ấy khoe chiếc nhẫn đính hôn mới với tất cả bạn bè." },
    ],
    ieltsTip: "\"Flaunt wealth/success\" là collocation hay dùng khi phê phán chủ nghĩa tiêu dùng hoặc mạng xã hội trong Writing Task 2.",
    summary: "flaunt = phô trương, khoe khoang (một cách khiến người khác khó chịu).",
  },
  {
    term: "suburban",
    ipa: "/səˈbɜːbən/",
    pos: "adjective",
    usageNote: "mô tả khu vực dân cư nằm ngoài trung tâm thành phố, thường gắn với lối sống yên tĩnh, trung lưu",
    en: "relating to a quiet residential area on the edge of a city",
    vi: "thuộc ngoại ô",
    synonyms: ["residential"],
    antonyms: ["urban", "rural"],
    examples: [
      { en: "They moved from the city to a quiet suburban neighbourhood to raise their children.", vi: "Họ chuyển từ thành phố ra một khu ngoại ô yên tĩnh để nuôi dạy con cái." },
      { en: "Suburban life can feel dull compared to the excitement of the city centre.", vi: "Cuộc sống ngoại ô có thể cảm thấy tẻ nhạt so với sự sôi động của trung tâm thành phố." },
    ],
    ieltsTip: "Phân biệt \"urban\" (đô thị) - \"suburban\" (ngoại ô) - \"rural\" (nông thôn) — bộ ba tính từ này rất hay xuất hiện trong bài đọc/Writing Task 2 về đô thị hoá.",
    summary: "suburban = thuộc ngoại ô; phân biệt với 'urban' và 'rural'.",
  },
  {
    term: "influential",
    ipa: "/ˌɪnfluˈenʃəl/",
    pos: "adjective",
    usageNote: "mô tả người/vật có khả năng tác động, thay đổi suy nghĩ hoặc hành động của người khác",
    en: "having a lot of influence on someone or something",
    vi: "có ảnh hưởng, có sức tác động",
    synonyms: ["powerful", "prominent"],
    antonyms: ["insignificant"],
    examples: [
      { en: "She is one of the most influential figures in the fashion industry.", vi: "Cô ấy là một trong những nhân vật có ảnh hưởng nhất trong ngành thời trang." },
      { en: "Social media has become hugely influential in shaping public opinion.", vi: "Mạng xã hội đã trở nên vô cùng có ảnh hưởng trong việc định hình dư luận." },
    ],
    ieltsTip: "\"An influential figure/role\" là collocation phổ biến trong Speaking Part 3 khi bàn về người có tầm ảnh hưởng trong xã hội.",
    summary: "influential = có ảnh hưởng, có sức tác động lớn.",
  },
  {
    term: "skewed",
    ipa: "/skjuːd/",
    pos: "adjective",
    usageNote: "mô tả dữ liệu/quan điểm bị lệch, không phản ánh đúng thực tế do thiên vị hoặc sai lệch",
    en: "not fair or accurate because it has been affected or influenced by something",
    vi: "bị lệch, thiên lệch",
    synonyms: ["biased", "distorted"],
    antonyms: ["balanced", "accurate"],
    examples: [
      { en: "The survey results were skewed because most respondents were under 25.", vi: "Kết quả khảo sát bị lệch vì hầu hết người trả lời đều dưới 25 tuổi." },
      { en: "Media coverage of the event was skewed in favour of one side.", vi: "Việc đưa tin về sự kiện này thiên lệch về một phía." },
    ],
    ieltsTip: "\"Skewed data/results\" rất hữu ích khi phân tích tính đáng tin cậy của số liệu trong Writing Task 1 hoặc bài đọc về nghiên cứu khoa học.",
    summary: "skewed = bị lệch, thiên lệch (số liệu, quan điểm).",
  },
  {
    term: "segment",
    ipa: "/ˈseɡmənt/",
    pos: "noun",
    usageNote: "dùng để chỉ một phần/nhóm nhỏ trong một tổng thể lớn hơn, thường trong ngữ cảnh thị trường, xã hội, dân số",
    en: "a part of something, especially a part of a population or market",
    vi: "phân khúc, bộ phận",
    synonyms: ["section", "portion", "part"],
    antonyms: ["whole"],
    examples: [
      { en: "The company is targeting a younger segment of the market.", vi: "Công ty đang nhắm đến một phân khúc thị trường trẻ hơn." },
      { en: "A large segment of the population now works remotely.", vi: "Một bộ phận lớn dân số hiện làm việc từ xa." },
    ],
    ieltsTip: "\"A segment of the population/market\" là collocation học thuật, dùng thay cho \"part\" hoặc \"group\" trong Writing Task 1/2.",
    summary: "segment = phân khúc, bộ phận (của thị trường, dân số...).",
  },
  {
    term: "conform",
    ipa: "/kənˈfɔːm/",
    pos: "verb",
    usageNote: "dùng khi ai đó hành xử theo đúng chuẩn mực, quy tắc mà xã hội/nhóm mong đợi",
    en: "to behave in the way that most other people in your society or group behave",
    vi: "tuân theo, hành xử theo chuẩn mực",
    synonyms: ["comply", "obey"],
    antonyms: ["rebel", "deviate"],
    examples: [
      { en: "Teenagers often feel pressure to conform to their friends' expectations.", vi: "Thanh thiếu niên thường cảm thấy áp lực phải tuân theo kỳ vọng của bạn bè." },
      { en: "She refused to conform to traditional gender roles.", vi: "Cô ấy từ chối tuân theo các vai trò giới truyền thống." },
    ],
    ieltsTip: "\"Conform to social norms/expectations\" là collocation quan trọng khi bàn về áp lực xã hội trong Writing Task 2.",
    summary: "conform (to) = tuân theo, hành xử theo chuẩn mực xã hội.",
  },
  {
    term: "mores",
    ipa: "/ˈmɔːreɪz/",
    pos: "noun",
    usageNote: "luôn ở dạng số nhiều, chỉ những quy tắc đạo đức/ứng xử không thành văn của một xã hội, thường đi với \"social\"",
    en: "the traditional customs and ways of behaving that are typical of a particular society or group",
    vi: "phong tục, chuẩn mực (đạo đức xã hội)",
    synonyms: ["customs", "conventions"],
    antonyms: [],
    examples: [
      { en: "Social mores around marriage have changed dramatically in the last 50 years.", vi: "Chuẩn mực xã hội về hôn nhân đã thay đổi mạnh mẽ trong 50 năm qua." },
      { en: "It can take years for a newcomer to understand the mores of a foreign culture.", vi: "Người mới đến có thể mất nhiều năm để hiểu được phong tục của một nền văn hoá nước ngoài." },
    ],
    ieltsTip: "\"Social mores\" là cụm từ trang trọng, học thuật — dùng thay cho \"customs\" hoặc \"rules\" để nâng band từ vựng trong Writing Task 2.",
    summary: "mores (luôn số nhiều) = phong tục, chuẩn mực xã hội; collocation: 'social mores'.",
  },
  {
    term: "conventional",
    ipa: "/kənˈvenʃənəl/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó phổ biến, theo lối truyền thống, không có gì khác lạ hay sáng tạo",
    en: "following the traditional and accepted way of doing something; not unusual",
    vi: "thông thường, theo lối truyền thống",
    synonyms: ["traditional", "orthodox", "mainstream"],
    antonyms: ["unconventional", "radical"],
    examples: [
      { en: "She has a conventional approach to raising her children.", vi: "Cô ấy có cách nuôi dạy con theo lối truyền thống." },
      { en: "Solar power is now a serious alternative to conventional energy sources.", vi: "Năng lượng mặt trời hiện là một giải pháp thay thế nghiêm túc cho các nguồn năng lượng truyền thống." },
    ],
    ieltsTip: "\"Conventional methods/wisdom\" là collocation phổ biến khi so sánh cách làm cũ và mới trong Writing Task 2.",
    summary: "conventional = thông thường, theo lối truyền thống; trái nghĩa với 'unconventional'.",
  },
  {
    term: "counter-culture",
    ipa: "/ˈkaʊntə ˌkʌltʃə/",
    pos: "noun",
    usageNote: "chỉ một nền văn hoá/lối sống hình thành để phản đối, đối lập với văn hoá chủ đạo của xã hội",
    en: "a way of life and set of ideas that are completely different from and opposed to the principal ideas and way of life of the rest of society",
    vi: "phản văn hoá, văn hoá đối lập",
    synonyms: ["alternative culture"],
    antonyms: ["mainstream culture"],
    examples: [
      { en: "The hippy movement of the 1960s was a famous counter-culture.", vi: "Phong trào hippy những năm 1960 là một nền phản văn hoá nổi tiếng." },
      { en: "Punk music grew out of a counter-culture that rejected mainstream values.", vi: "Nhạc punk ra đời từ một nền phản văn hoá bác bỏ các giá trị chủ đạo." },
    ],
    ieltsTip: "Dùng \"a counter-culture movement\" khi mô tả các nhóm xã hội chống lại chuẩn mực chủ đạo trong Speaking Part 3 hoặc bài đọc về lịch sử văn hoá.",
    summary: "counter-culture = phản văn hoá, văn hoá đối lập với chủ đạo.",
  },
  {
    term: "mainstream",
    ipa: "/ˈmeɪnstriːm/",
    pos: "adjective",
    usageNote: "mô tả những gì được số đông chấp nhận, phổ biến trong xã hội, trái với thiểu số/bên lề",
    en: "the ideas and opinions that are shared by most people, and are considered normal or conventional",
    vi: "chủ đạo, phổ biến, chính thống",
    synonyms: ["conventional", "dominant"],
    antonyms: ["alternative", "fringe"],
    examples: [
      { en: "Veganism has moved from a niche diet to the mainstream.", vi: "Ăn thuần chay đã chuyển từ một chế độ ăn ít người biết đến trở thành xu hướng chủ đạo." },
      { en: "The band's music was too experimental for mainstream audiences.", vi: "Âm nhạc của ban nhạc quá thử nghiệm đối với khán giả đại chúng." },
    ],
    ieltsTip: "\"Mainstream values/culture/media\" là collocation rất hữu ích khi so sánh số đông với thiểu số trong Writing Task 2.",
    summary: "mainstream = chủ đạo, phổ biến, được số đông chấp nhận.",
  },
  {
    term: "multicultural",
    ipa: "/ˌmʌltiˈkʌltʃərəl/",
    pos: "adjective",
    usageNote: "mô tả một xã hội/cộng đồng có nhiều nền văn hoá, sắc tộc khác nhau cùng chung sống",
    en: "including people who have many different customs and beliefs",
    vi: "đa văn hoá",
    synonyms: ["diverse", "multiethnic"],
    antonyms: ["homogeneous"],
    examples: [
      { en: "London is one of the most multicultural cities in the world.", vi: "London là một trong những thành phố đa văn hoá nhất thế giới." },
      { en: "Growing up in a multicultural neighbourhood taught her to appreciate different traditions.", vi: "Lớn lên trong một khu phố đa văn hoá đã dạy cô ấy biết trân trọng những truyền thống khác nhau." },
    ],
    ieltsTip: "\"A multicultural society\" là chủ đề rất hay gặp trong Writing Task 2 — kết hợp với \"diversity\", \"integration\", \"assimilate\" để bài viết mạch lạc hơn.",
    summary: "multicultural = đa văn hoá; chủ đề quen thuộc trong Writing Task 2.",
  },
  {
    term: "rebel",
    ipa: "/rɪˈbel/ (v), /ˈrebəl/ (n)",
    pos: "verb",
    usageNote: "khi là động từ, trọng âm rơi vào âm 2; khi là danh từ, trọng âm rơi vào âm 1 — chỉ hành động/con người chống đối quyền lực hoặc chuẩn mực",
    en: "to fight against or refuse to obey authority or an accepted set of rules",
    vi: "nổi loạn, chống đối",
    synonyms: ["revolt", "defy"],
    antonyms: ["conform", "comply"],
    examples: [
      { en: "Many teenagers rebel against their parents' rules at some point.", vi: "Nhiều thanh thiếu niên nổi loạn chống lại các quy tắc của cha mẹ vào một thời điểm nào đó." },
      { en: "She was seen as a rebel for refusing to follow the school's dress code.", vi: "Cô ấy bị coi là kẻ nổi loạn vì từ chối tuân theo quy định trang phục của trường." },
    ],
    ieltsTip: "Chú ý trọng âm khác nhau giữa động từ \"reBEL\" và danh từ \"REbel\" — lỗi phát âm phổ biến của người học.",
    summary: "rebel = nổi loạn, chống đối (chuẩn mực, quyền lực); chú ý trọng âm động từ/danh từ khác nhau.",
  },
  {
    term: "harmonious",
    ipa: "/hɑːˈməʊniəs/",
    pos: "adjective",
    usageNote: "mô tả mối quan hệ/xã hội êm đềm, ít xung đột, mọi người sống hoà thuận với nhau",
    en: "friendly and peaceful; without any disagreement",
    vi: "hài hoà, hoà thuận",
    synonyms: ["peaceful", "cooperative"],
    antonyms: ["conflicting", "discordant"],
    examples: [
      { en: "The company promotes a harmonious working environment.", vi: "Công ty thúc đẩy một môi trường làm việc hài hoà." },
      { en: "They have built a harmonious relationship with their neighbours.", vi: "Họ đã xây dựng mối quan hệ hoà thuận với hàng xóm." },
    ],
    ieltsTip: "\"A harmonious society/relationship\" là collocation an toàn khi kết luận bài Writing Task 2 về chủ đề cộng đồng, xã hội.",
    summary: "harmonious = hài hoà, hoà thuận; collocation: 'a harmonious society'.",
  },
];

const track06Script = `It's pretty easy to create your own blog and express yourself that way. But that's in the privacy of your own home. I think people should show their individuality when they're out and about on the street. You know, through things like their car. Cars come in such boring colours they just blend in with everyone else's. I prefer to stand out from the crowd, so I've customised mine. I've had an image of a shark painted down both sides. I think it looks really cool, but my mum refuses to get in it! She'd much rather just fit in with everyone else.`;

const track07Script = `One of the main factors in ensuring a harmonious society is that there are clear, established patterns in the way we conduct ourselves. And we expect people to behave according to our accepted standards of behaviour. There are those who observe these social mores religiously, and these people are often labelled 'conservative'. It's actually through such people that our heritage is preserved. But then, gradually, over time, as our society becomes more and more multicultural, there is a blending of these customs and we gradually come to redefine the norm. If we enter a new group, we notice the unwritten rules and social norms of that group. Those who fail to observe these norms are inevitably excluded from that group. Of course, there will always be those who seek to break away from tradition, and to rebel. These people see themselves as unconventional in every sense of the word. They create a counter-culture and they shun mainstream values. However, ironically, in doing so, they inevitably also create their own new code of behaviour with its own set of unwritten rules. For example, becoming a hippy in the 1970s required you to don the accepted casual dress of a hippy rather than the obligatory suit and tie that was standard at that time.`;

const UNIT_3_NO_MAN_IS_AN_ISLAND: CambridgeUnit = {
  unit: 3,
  slug: "no-man-is-an-island",
  title: "No man is an island",
  topics: "Individuality, community",
  testPractice: "Writing Task 1",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit3Vocab,
    },
    {
      kind: "listening_cloze",
      title: "Showing your individuality",
      instructions: "Listen to someone talking about individuality. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-06.mp3",
      template:
        "The speaker says it's easy to express yourself through a blog, but people should show their {{individuality}} out on the street too — for example through their car. He finds most cars come in boring colours that just {{blend}} in with everyone else's, so he prefers to {{stand}} out from the crowd and has had his car customised with a painted shark. His mother, however, refuses to get in it because she would much rather just {{fit}} in with everyone else.",
      script: track06Script,
    },
    {
      kind: "fill_mc",
      title: "Individuality — phrasal verbs in context",
      instructions: "Choose the phrasal verb that best completes each sentence.",
      items: [
        {
          before: "He dyed his hair bright green because he wanted to",
          after: "from everyone else.",
          options: ["stand out", "blend in", "fit in"],
          answer: "stand out",
        },
        {
          before: "New employees often worry about whether they will",
          after: "with the rest of the team.",
          options: ["fit in", "break away", "opt out"],
          answer: "fit in",
        },
        {
          before: "The soldiers wore camouflage so they could",
          after: "with the forest around them.",
          options: ["blend in", "stand out", "rebel"],
          answer: "blend in",
        },
        {
          before: "After years of following his father's business, he finally decided to",
          after: "and start his own company.",
          options: ["break away", "fit in", "conform"],
          answer: "break away",
        },
        {
          before: "Some parents choose to",
          after: "of the school's new uniform policy.",
          options: ["opt out", "join in", "blend in"],
          answer: "opt out",
        },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — how tattoos went mainstream",
      passageTitle: "Ink and acceptance: how tattoos went mainstream",
      passage:
        "Fifty years ago, a visible tattoo was widely read as a warning sign. Surveys from the period link tattoos overwhelmingly with sailors, bikers and inmates, and most respondents described the practice itself as a symbol of rebellion against ordinary society. Getting a tattoo meant placing yourself, quite deliberately, outside the mainstream.\n\n" +
        "That reputation has been transformed. Industry figures suggest that tattoo studios are now among the fastest-growing small businesses in several Western countries, and the clientele driving that growth looks nothing like the old stereotype. Market research consistently finds that a large and growing share of new customers are professionals in their thirties and forties, many of them women, who would never have considered a tattoo a generation ago.\n\n" +
        "Popular culture has played an important part in this shift. When mainstream celebrities began displaying tattoos openly rather than hiding them, the association between tattoos and criminality started to weaken. Fashion magazines followed, treating tattoos as a style choice on a par with jewellery rather than a marker of a rough past. Within a couple of decades, an image that once signalled danger had been repackaged as a form of self-expression.\n\n" +
        "Institutions have had to catch up with this change in attitude. Employers who once enforced strict no-visible-tattoo policies have gradually relaxed them, partly because refusing to hire otherwise qualified candidates over ink became difficult to justify as tattoos spread through the professional classes. Local governments in some areas have likewise updated licensing rules that were originally written with a very different clientele in mind.\n\n" +
        "None of this means tattoos are universally accepted. Older generations in particular still associate extensive tattooing with the counter-culture values it once represented, and visible tattoos can still work against a candidate in more conservative industries. But the overall trajectory is unmistakable: what was once a badge of nonconformity has, for a large segment of the population, become just another mainstream fashion choice.",
      questions: [
        {
          text: "Fifty years ago, tattoos were mainly linked with dangerous or criminal groups.",
          answer: "True",
          justification: "Surveys from the period link tattoos overwhelmingly with sailors, bikers and inmates.",
        },
        {
          text: "The people getting tattoos today are mostly the same age and background as those who got them decades ago.",
          answer: "False",
          justification: "The clientele driving that growth looks nothing like the old stereotype — professionals in their thirties and forties, many of them women.",
        },
        {
          text: "Fashion magazines were the first to change public attitudes towards tattoos.",
          answer: "False",
          justification: "Celebrities began displaying tattoos openly first; fashion magazines followed.",
        },
        {
          text: "Some employers have changed their hiring policies because of the rise in tattoos.",
          answer: "True",
          justification: "Employers who once enforced strict no-visible-tattoo policies have gradually relaxed them.",
        },
        {
          text: "Tattoos are now accepted by people of all ages.",
          answer: "False",
          justification: "Older generations in particular still associate extensive tattooing with counter-culture values.",
        },
        {
          text: "Local governments have introduced new taxes on tattoo studios.",
          answer: "Not given",
          justification: "The passage mentions updated licensing rules, but says nothing about taxes.",
        },
        {
          text: "Tattoo studios are growing faster than most other kinds of small business.",
          answer: "True",
          justification: "Tattoo studios are among the fastest-growing small businesses in several Western countries.",
        },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "seen as a warning sign", reveal: "widely read as a warning sign" },
        { prompt: "grew a lot", reveal: "among the fastest-growing small businesses" },
        { prompt: "people who study the market", reveal: "market research" },
        { prompt: "became less strong", reveal: "started to weaken" },
        { prompt: "just a style choice", reveal: "a style choice on a par with jewellery" },
        { prompt: "had to adapt", reveal: "have had to catch up with this change in attitude" },
        { prompt: "a sign of not fitting in", reveal: "a badge of nonconformity" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "What keeps society harmonious?",
      instructions: "Listen to a talk about society and conformity. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-07.mp3",
      tip: "The wording in the notes paraphrases what you hear, but the answers come in the same order as the talk.",
      template:
        "According to the speaker, a harmonious society depends on having clear, established patterns of {{behaviour}} that most people are expected to follow. People who observe these social {{mores}} closely are often labelled 'conservative', and it is through such people that our heritage is {{preserved}}. However, as society becomes more {{multicultural}}, customs blend together and the norm is gradually redefined. Those who fail to observe a group's unwritten rules are excluded from it, while some people choose to break away from tradition and {{rebel}}, creating their own counter-culture with a new code of behaviour.",
      script: track07Script,
    },
    {
      kind: "sort",
      title: "Individuality or conformity?",
      instructions: "Tap a word, then tap the idea it belongs with.",
      buckets: ["Individuality", "Conformity"],
      items: [
        { term: "stand out", bucket: 0 },
        { term: "break away", bucket: 0 },
        { term: "rebel", bucket: 0 },
        { term: "flaunt", bucket: 0 },
        { term: "counter-culture", bucket: 0 },
        { term: "unconventional", bucket: 0 },
        { term: "blend in", bucket: 1 },
        { term: "fit in", bucket: 1 },
        { term: "conform", bucket: 1 },
        { term: "conventional", bucket: 1 },
        { term: "mainstream", bucket: 1 },
        { term: "mores", bucket: 1 },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — someone who doesn't follow the crowd",
      prompt: "Describe a person you know who doesn't follow the crowd.",
      bullets: [
        "who this person is",
        "how you know them",
        "in what way they are different from other people",
        "and say how you feel about their individuality",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"Do you think it's difficult to be different in your country?\" or \"Is it becoming easier to express individuality?\" — think about how you'd answer those too. Try working in some of this unit's vocabulary (stand out, conform, unconventional...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "writing_task",
      title: "Test practice — Writing Task 1",
      taskLabel: "Writing Task 1",
      prompt:
        "The chart below shows the percentage of people in three age groups who said they regularly express their individuality through five different activities. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chartCaption: "Percentage of each age group who regularly express their individuality through:",
      chartRows: [
        "Clothing — Under 25: 68%, 25–50: 45%, Over 50: 22%",
        "Hairstyle — Under 25: 52%, 25–50: 20%, Over 50: 8%",
        "Music taste — Under 25: 74%, 25–50: 58%, Over 50: 35%",
        "Home decoration — Under 25: 30%, 25–50: 55%, Over 50: 60%",
        "Social media posts — Under 25: 66%, 25–50: 33%, Over 50: 10%",
      ],
      chart: {
        kind: "groupedBar",
        panels: [
          {
            series: [
              { key: "u25", label: "Under 25" },
              { key: "m2550", label: "25–50" },
              { key: "o50", label: "Over 50" },
            ],
            groups: [
              { label: "Clothing", values: { u25: 68, m2550: 45, o50: 22 } },
              { label: "Hairstyle", values: { u25: 52, m2550: 20, o50: 8 } },
              { label: "Music taste", values: { u25: 74, m2550: 58, o50: 35 } },
              { label: "Home decoration", values: { u25: 30, m2550: 55, o50: 60 } },
              { label: "Social media posts", values: { u25: 66, m2550: 33, o50: 10 } },
            ],
          },
        ],
      },
      minWords: 150,
      tip:
        "You will increase your Writing Task 1 band score if you (1) mention all the major features of the chart; (2) describe the figures accurately; (3) paraphrase the information in the question rather than copying it; (4) avoid repeating the same words and phrases and vary your sentence structures; and (5) give an overview of the most important trends before going into detail.",
      modelAnswer:
        "The chart compares three age groups — under 25s, 25- to 50-year-olds, and the over-50s — in terms of how they say they express their individual style, across five different activities.\n\n" +
        "Overall, younger people are considerably more likely to express their individuality through their appearance and online activity, whereas older people rely more on how they decorate their homes.\n\n" +
        "Clothing and hairstyle show the clearest generational gap. Over two-thirds of under-25s said they used clothing to express individuality, compared with under half of the 25-50 age group and only around a fifth of the over-50s. The pattern for hairstyle is even more pronounced, falling from just over half among the youngest group to single figures among the oldest.\n\n" +
        "Music taste follows a similar, if less dramatic, downward trend with age, ranging from 74% among under-25s to 35% among the over-50s. Social media posts show the widest gap of all: two-thirds of younger respondents used social media to express their individuality, compared with just 10% of the oldest group.\n\n" +
        "Home decoration is the only activity that becomes more common with age, rising from 30% among under-25s to 60% among the over-50s — the single highest figure in the entire chart.",
    },
  ],
};

const unit4Vocab: VocabWord[] = [
  {
    term: "pharmaceutical",
    ipa: "/ˌfɑːməˈsuːtɪkəl/",
    pos: "adjective",
    usageNote: "thường dùng làm tính từ đi kèm \"industry/company\", hoặc danh từ số nhiều \"pharmaceuticals\" chỉ dược phẩm",
    en: "relating to the production of medicines",
    vi: "thuộc về dược phẩm",
    synonyms: ["medicinal"],
    antonyms: [],
    examples: [
      { en: "The pharmaceutical industry invests billions in new drug research every year.", vi: "Ngành dược phẩm đầu tư hàng tỷ đô la vào nghiên cứu thuốc mới mỗi năm." },
      { en: "She works for a large pharmaceutical company.", vi: "Cô ấy làm việc cho một công ty dược phẩm lớn." },
    ],
    ieltsTip: "\"The pharmaceutical industry\" là collocation cơ bản khi bàn về y tế, nghiên cứu khoa học trong Writing Task 2.",
    summary: "pharmaceutical = thuộc về dược phẩm; collocation: 'pharmaceutical industry/company'.",
  },
  {
    term: "carbon",
    ipa: "/ˈkɑːbən/",
    pos: "noun",
    usageNote: "nguyên tố hoá học cơ bản, hay xuất hiện trong các cụm về môi trường như \"carbon footprint/emissions\"",
    en: "a chemical element that is found in coal and diamonds, and in all living things",
    vi: "cacbon",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Diamonds are a crystallised form of carbon.", vi: "Kim cương là dạng tinh thể của cacbon." },
      { en: "The government wants to reduce the country's carbon emissions.", vi: "Chính phủ muốn giảm lượng khí thải cacbon của đất nước." },
    ],
    ieltsTip: "\"Carbon footprint/emissions\" là collocation cực kỳ phổ biến trong đề Writing Task 2 về môi trường.",
    summary: "carbon = cacbon; collocation quan trọng: 'carbon footprint/emissions'.",
  },
  {
    term: "reaction",
    ipa: "/riˈækʃən/",
    pos: "noun",
    usageNote: "ở đây mang nghĩa khoa học (phản ứng hoá học), khác với nghĩa thông thường \"phản ứng, cảm xúc\"",
    en: "a chemical process in which substances combine or change into other substances",
    vi: "phản ứng (hoá học)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Mixing bleach and ammonia can cause a dangerous chemical reaction.", vi: "Trộn thuốc tẩy và amoniac có thể gây ra phản ứng hoá học nguy hiểm." },
      { en: "The reaction produces heat and light.", vi: "Phản ứng này tạo ra nhiệt và ánh sáng." },
    ],
    ieltsTip: "\"A chemical reaction\" — chú ý nghĩa khoa học khác với nghĩa 'phản ứng, thái độ' thường gặp trong Speaking.",
    summary: "reaction = phản ứng hoá học; phân biệt với nghĩa 'phản ứng, cảm xúc'.",
  },
  {
    term: "fertiliser",
    ipa: "/ˈfɜːtɪlaɪzə/",
    pos: "noun",
    usageNote: "chất được nông dân dùng để bón đất, giúp cây trồng phát triển tốt hơn",
    en: "a natural or chemical substance added to soil to help plants grow",
    vi: "phân bón",
    synonyms: [],
    antonyms: ["pesticide"],
    examples: [
      { en: "Farmers use fertiliser to increase crop yields.", vi: "Nông dân sử dụng phân bón để tăng năng suất cây trồng." },
      { en: "Overusing chemical fertiliser can damage the soil in the long run.", vi: "Lạm dụng phân bón hoá học có thể gây hại cho đất về lâu dài." },
    ],
    ieltsTip: "\"Chemical/organic fertiliser\" hay xuất hiện trong bài đọc về nông nghiệp, môi trường.",
    summary: "fertiliser = phân bón; đi với 'chemical' hoặc 'organic'.",
  },
  {
    term: "absorb",
    ipa: "/əbˈzɔːb/",
    pos: "verb",
    usageNote: "dùng khi một chất hút/thấm chất khác vào bên trong (nước, ánh sáng, chất dinh dưỡng...)",
    en: "to take in a liquid, gas, heat, or other substance gradually",
    vi: "hấp thụ, thấm hút",
    synonyms: ["soak up", "take in"],
    antonyms: ["release", "emit"],
    examples: [
      { en: "Plants absorb water through their roots.", vi: "Cây hấp thụ nước qua rễ." },
      { en: "The body cannot easily absorb phytochemicals in their pure form.", vi: "Cơ thể không dễ dàng hấp thụ các hợp chất thực vật ở dạng nguyên chất." },
    ],
    ieltsTip: "\"Absorb nutrients/water/heat\" là collocation khoa học cơ bản, hữu ích cho cả bài đọc và Writing Task 2 về sinh học, môi trường.",
    summary: "absorb = hấp thụ, thấm hút.",
  },
  {
    term: "disinfectant",
    ipa: "/ˌdɪsɪnˈfektənt/",
    pos: "noun",
    usageNote: "chỉ sản phẩm hoá học dùng để diệt khuẩn, làm sạch bề mặt trong nhà",
    en: "a chemical substance that destroys bacteria and is used for cleaning",
    vi: "chất khử trùng",
    synonyms: ["antiseptic"],
    antonyms: [],
    examples: [
      { en: "She wiped the kitchen counter with disinfectant.", vi: "Cô ấy lau mặt bàn bếp bằng chất khử trùng." },
      { en: "Hospitals rely heavily on disinfectant to prevent the spread of infection.", vi: "Bệnh viện phụ thuộc rất nhiều vào chất khử trùng để ngăn ngừa lây lan nhiễm trùng." },
    ],
    ieltsTip: "Từ vựng hữu ích khi bàn về vệ sinh y tế, phòng chống dịch bệnh trong Writing Task 2.",
    summary: "disinfectant = chất khử trùng, dùng để diệt khuẩn.",
  },
  {
    term: "toxic",
    ipa: "/ˈtɒksɪk/",
    pos: "adjective",
    usageNote: "mô tả chất có hại, có thể gây ngộ độc hoặc tử vong",
    en: "containing poison; very harmful",
    vi: "độc hại, có độc",
    synonyms: ["poisonous", "harmful"],
    antonyms: ["harmless", "non-toxic"],
    examples: [
      { en: "The factory was fined for dumping toxic waste into the river.", vi: "Nhà máy đã bị phạt vì đổ chất thải độc hại xuống sông." },
      { en: "Some household cleaning products contain toxic chemicals.", vi: "Một số sản phẩm tẩy rửa gia dụng chứa hoá chất độc hại." },
    ],
    ieltsTip: "\"Toxic waste/chemicals\" là collocation rất phổ biến trong bài đọc và Writing Task 2 về ô nhiễm môi trường.",
    summary: "toxic = độc hại; collocation: 'toxic waste/chemicals'.",
  },
  {
    term: "emission",
    ipa: "/ɪˈmɪʃən/",
    pos: "noun",
    usageNote: "chỉ việc thải ra khí/chất vào môi trường, thường ở dạng số nhiều \"emissions\"",
    en: "the production and discharge of something, especially gas or radiation",
    vi: "sự phát thải, khí thải",
    synonyms: ["discharge"],
    antonyms: ["absorption"],
    examples: [
      { en: "The new law aims to reduce carbon emissions from factories.", vi: "Luật mới nhằm giảm lượng khí thải cacbon từ các nhà máy." },
      { en: "Vehicle emissions are a major cause of air pollution in cities.", vi: "Khí thải từ phương tiện giao thông là nguyên nhân chính gây ô nhiễm không khí ở các thành phố." },
    ],
    ieltsTip: "\"Reduce/cut emissions\" là collocation không thể thiếu trong Writing Task 2 về môi trường và biến đổi khí hậu.",
    summary: "emission(s) = sự phát thải, khí thải; collocation: 'reduce emissions'.",
  },
  {
    term: "petrochemical",
    ipa: "/ˌpetrəʊˈkemɪkəl/",
    pos: "noun",
    usageNote: "chỉ hoá chất được chiết xuất từ dầu mỏ hoặc khí tự nhiên, dùng làm nguyên liệu công nghiệp",
    en: "a chemical substance obtained from petrol or natural gas",
    vi: "hoá dầu, hoá chất từ dầu mỏ",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Plastics are made from petrochemicals.", vi: "Nhựa được sản xuất từ hoá chất dầu mỏ." },
      { en: "The region's economy depends heavily on the petrochemical industry.", vi: "Nền kinh tế khu vực phụ thuộc nhiều vào ngành công nghiệp hoá dầu." },
    ],
    ieltsTip: "\"The petrochemical industry\" hữu ích khi bàn về công nghiệp nặng, ô nhiễm trong bài đọc/Writing Task 2.",
    summary: "petrochemical = hoá chất/hoá dầu chiết xuất từ dầu mỏ, khí tự nhiên.",
  },
  {
    term: "additive",
    ipa: "/ˈædɪtɪv/",
    pos: "noun",
    usageNote: "chỉ chất được thêm vào thực phẩm hoặc sản phẩm khác để cải thiện hương vị, màu sắc, độ bền...",
    en: "a substance added to food or another product in small amounts for a particular purpose, e.g. to add flavour or preserve it",
    vi: "chất phụ gia",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Many processed foods contain artificial additives and preservatives.", vi: "Nhiều thực phẩm chế biến sẵn chứa phụ gia và chất bảo quản nhân tạo." },
      { en: "Consumers are becoming more wary of food additives.", vi: "Người tiêu dùng ngày càng thận trọng hơn với phụ gia thực phẩm." },
    ],
    ieltsTip: "\"Food additives\" là chủ đề quen thuộc trong bài đọc/Writing Task 2 về sức khoẻ, thực phẩm.",
    summary: "additive = chất phụ gia (thường trong thực phẩm).",
  },
  {
    term: "contamination",
    ipa: "/kənˌtæmɪˈneɪʃən/",
    pos: "noun",
    usageNote: "chỉ tình trạng một chất/khu vực bị nhiễm bẩn bởi hoá chất, vi khuẩn hoặc chất phóng xạ",
    en: "the process of making something dirty, polluted, or poisonous by adding a substance",
    vi: "sự ô nhiễm, nhiễm bẩn",
    synonyms: ["pollution"],
    antonyms: ["purification"],
    examples: [
      { en: "The oil spill caused serious contamination of the coastline.", vi: "Sự cố tràn dầu đã gây ô nhiễm nghiêm trọng cho bờ biển." },
      { en: "Radioactive contamination can persist in soil for decades.", vi: "Sự nhiễm phóng xạ có thể tồn tại trong đất hàng thập kỷ." },
    ],
    ieltsTip: "\"Radioactive/chemical contamination\" là collocation học thuật, thường gặp trong bài đọc khoa học môi trường.",
    summary: "contamination = sự ô nhiễm, nhiễm bẩn (bởi hoá chất, vi khuẩn, phóng xạ).",
  },
  {
    term: "pesticide",
    ipa: "/ˈpestɪsaɪd/",
    pos: "noun",
    usageNote: "chất hoá học dùng để diệt côn trùng, sâu bệnh gây hại cho cây trồng",
    en: "a chemical substance used for killing insects and other creatures that damage plants",
    vi: "thuốc trừ sâu",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Organic farmers avoid using synthetic pesticides.", vi: "Nông dân hữu cơ tránh sử dụng thuốc trừ sâu tổng hợp." },
      { en: "Pesticide residue on fruit can pose health risks if not washed off.", vi: "Dư lượng thuốc trừ sâu trên trái cây có thể gây hại cho sức khoẻ nếu không được rửa sạch." },
    ],
    ieltsTip: "\"Pesticide residue\" là collocation hữu ích khi bàn về an toàn thực phẩm trong Writing Task 2.",
    summary: "pesticide = thuốc trừ sâu.",
  },
  {
    term: "radiation",
    ipa: "/ˌreɪdiˈeɪʃən/",
    pos: "noun",
    usageNote: "chỉ năng lượng phát ra dưới dạng sóng hoặc hạt, có thể đến từ mặt trời hoặc các nguồn phóng xạ nguy hiểm",
    en: "energy in the form of waves or particles, especially the type produced by nuclear reactions that can be very harmful to health",
    vi: "bức xạ, phóng xạ",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Workers at the plant wore protective suits to avoid exposure to radiation.", vi: "Công nhân tại nhà máy mặc đồ bảo hộ để tránh phơi nhiễm bức xạ." },
      { en: "Too much exposure to UV radiation can damage the skin.", vi: "Phơi nhiễm quá nhiều bức xạ tia cực tím có thể gây hại cho da." },
    ],
    ieltsTip: "\"Exposure to radiation\" là collocation quan trọng trong bài đọc khoa học/y tế.",
    summary: "radiation = bức xạ, phóng xạ; collocation: 'exposure to radiation'.",
  },
  {
    term: "hydrocarbon",
    ipa: "/ˌhaɪdrəˈkɑːbən/",
    pos: "noun",
    usageNote: "hợp chất hoá học chỉ chứa hai nguyên tố hydro và cacbon, có nhiều trong dầu mỏ",
    en: "a chemical compound that contains only hydrogen and carbon, found in petroleum",
    vi: "hydrocacbon",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Petrol is a mixture of different hydrocarbons.", vi: "Xăng là hỗn hợp của nhiều loại hydrocacbon khác nhau." },
      { en: "Burning hydrocarbons releases carbon dioxide into the atmosphere.", vi: "Đốt cháy hydrocacbon giải phóng khí cacbonic vào khí quyển." },
    ],
    ieltsTip: "Từ vựng học thuật, thường gặp trong bài đọc IELTS về hoá học, năng lượng, ô nhiễm.",
    summary: "hydrocarbon = hydrocacbon (hợp chất chỉ chứa hydro và cacbon).",
  },
  {
    term: "dosage",
    ipa: "/ˈdəʊsɪdʒ/",
    pos: "noun",
    usageNote: "chỉ liều lượng chính xác của thuốc cần dùng, quan trọng trong y học để đảm bảo an toàn",
    en: "the amount of a medicine or drug that should be taken",
    vi: "liều lượng (thuốc)",
    synonyms: ["dose"],
    antonyms: [],
    examples: [
      { en: "Always check the correct dosage before taking any medication.", vi: "Luôn kiểm tra liều lượng chính xác trước khi dùng bất kỳ loại thuốc nào." },
      { en: "Scientists are trying to find the precise dosage that treats the condition without side effects.", vi: "Các nhà khoa học đang cố gắng tìm ra liều lượng chính xác để điều trị bệnh mà không gây tác dụng phụ." },
    ],
    ieltsTip: "\"The correct/precise dosage\" là collocation quan trọng trong bài đọc/nghe về y học.",
    summary: "dosage = liều lượng (thuốc); collocation: 'the correct dosage'.",
  },
  {
    term: "compound",
    ipa: "/ˈkɒmpaʊnd/",
    pos: "noun",
    usageNote: "chỉ chất được tạo ra khi hai hay nhiều nguyên tố hoá học kết hợp với nhau",
    en: "a substance formed when two or more chemical elements combine",
    vi: "hợp chất",
    synonyms: [],
    antonyms: ["element"],
    examples: [
      { en: "Water is a compound made of hydrogen and oxygen.", vi: "Nước là hợp chất được tạo thành từ hydro và oxy." },
      { en: "Researchers identified a new compound with promising medical properties.", vi: "Các nhà nghiên cứu đã phát hiện ra một hợp chất mới có đặc tính y học đầy triển vọng." },
    ],
    ieltsTip: "Phân biệt \"compound\" (hợp chất, từ ≥2 nguyên tố) với \"element\" (nguyên tố) trong bài đọc khoa học.",
    summary: "compound = hợp chất (tạo từ ≥2 nguyên tố hoá học).",
  },
  {
    term: "phytochemical",
    ipa: "/ˌfaɪtəʊˈkemɪkəl/",
    pos: "noun",
    usageNote: "từ ghép từ \"phyto-\" (thực vật) + \"chemical\", chỉ hợp chất hoá học tồn tại tự nhiên trong thực vật",
    en: "a chemical compound that occurs naturally in plants",
    vi: "hợp chất thực vật (phytochemical)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Green tea contains phytochemicals that may benefit health.", vi: "Trà xanh chứa các hợp chất thực vật có thể có lợi cho sức khoẻ." },
      { en: "Scientists are studying phytochemicals as a possible treatment for Alzheimer's disease.", vi: "Các nhà khoa học đang nghiên cứu các hợp chất thực vật như một phương pháp điều trị tiềm năng cho bệnh Alzheimer." },
    ],
    ieltsTip: "Từ vựng chuyên ngành hữu ích cho bài đọc/nghe chủ đề y học tự nhiên, dinh dưỡng.",
    summary: "phytochemical = hợp chất hoá học có tự nhiên trong thực vật.",
  },
  {
    term: "antioxidant",
    ipa: "/ˌæntiˈɒksɪdənt/",
    pos: "noun",
    usageNote: "chất giúp bảo vệ tế bào khỏi tác hại của quá trình oxy hoá, thường được nhắc đến trong dinh dưỡng và sức khoẻ",
    en: "a substance that helps to protect the cells in your body from damage",
    vi: "chất chống oxy hoá",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Berries are rich in antioxidants.", vi: "Các loại quả mọng rất giàu chất chống oxy hoá." },
      { en: "Researchers are studying how antioxidants might help treat Alzheimer's disease.", vi: "Các nhà nghiên cứu đang tìm hiểu cách chất chống oxy hoá có thể giúp điều trị bệnh Alzheimer." },
    ],
    ieltsTip: "\"Rich in antioxidants\" là collocation phổ biến trong bài đọc về dinh dưỡng, thực phẩm chức năng.",
    summary: "antioxidant = chất chống oxy hoá.",
  },
];

const track09Script = `Just as early man made use of the medicinal properties of insects and reptiles to treat common ailments, even using them as a form of pain relief, today's researchers are analysing the proteins that are present in crocodile blood. Scientists are convinced that, because crocodiles have such a long lifespan, they must have a natural ability to combat infection. In ancient times, people never doubted the healing powers of plants and animals. Now, our modern-day world of medical science is beginning to realise just how effective these phytochemicals, chemical compounds that occur naturally in plants, can be. There has already been some success. For example, researchers have already proven that green tea has considerable health benefits. Even more research into phytochemicals is likely in the future, now that funding bodies have begun to recognise the advantages of using alternative therapies. Because of this, several groups of scientists have been able to undertake research.

One group is carrying out research into the use of antioxidants to treat Alzheimer's, a disease that affects the brain. In particular, these scientists are hoping to discover the precise dosage that will allow us to effectively treat this condition without producing toxic side effects.

Meanwhile, researchers have found that if phytochemicals are used in their pure form, our body is unable to readily absorb them. These researchers are using nanotechnology to create a capsule that will release the medication slowly into the body. One final example is in the fight against bacteria. This is a growing problem all over the world as bacteria grow more and more resistant to antibiotics. Medical staff in hospitals are combating these superbugs on a daily basis, and some people are turning to natural remedies such as tea tree oil to deal with the problem.`;

const UNIT_4_SCIENTIFIC_DISCOVERY: CambridgeUnit = {
  unit: 4,
  slug: "scientific-discovery",
  title: "Scientific discovery",
  topics: "Chemistry, medicine",
  testPractice: "Reading",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit4Vocab,
    },
    {
      kind: "sort",
      title: "Chemistry or medicine?",
      instructions: "Tap a word, then tap the field it belongs to.",
      buckets: ["Chemistry", "Medicine"],
      items: [
        { term: "carbon", bucket: 0 },
        { term: "reaction", bucket: 0 },
        { term: "hydrocarbon", bucket: 0 },
        { term: "compound", bucket: 0 },
        { term: "emission", bucket: 0 },
        { term: "petrochemical", bucket: 0 },
        { term: "pharmaceutical", bucket: 1 },
        { term: "dosage", bucket: 1 },
        { term: "phytochemical", bucket: 1 },
        { term: "antioxidant", bucket: 1 },
        { term: "disinfectant", bucket: 1 },
        { term: "toxic", bucket: 1 },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Medicines from nature",
      instructions: "Listen to a talk about natural medicine. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-09.mp3",
      tip: "The wording in the notes paraphrases what you hear, but the answers come in the same order as the talk.",
      template:
        "Just as early humans used the medicinal properties of insects and reptiles to treat common ailments, today's researchers are analysing the {{proteins}} present in crocodile blood, believing crocodiles' long lifespan comes from a natural ability to fight {{infection}}. Modern medical science is taking a growing interest in phytochemicals — chemical {{compounds}} that occur naturally in plants — and has already proven that green tea has real health benefits.\n\n" +
        "One group is researching antioxidants to treat Alzheimer's disease, hoping to find the precise {{dosage}} that treats the condition without toxic {{side effects}}. Meanwhile, because the body cannot easily absorb phytochemicals in their pure form, researchers are using nanotechnology to build a {{capsule}} that releases the medicine slowly. A final example is the fight against {{bacteria}} that are growing resistant to antibiotics, which has led some people to turn to {{natural remedies}} such as tea tree oil.",
      script: track09Script,
    },
    {
      kind: "type_fill",
      title: "Guess the word from its definition",
      instructions: "Read each definition and type the matching word from this unit.",
      items: [
        { prompt: "A ___ is a chemical compound made only of hydrogen and carbon, found in petroleum.", answer: "hydrocarbon" },
        { prompt: "A ___ is a substance formed when two or more chemical elements combine.", answer: "compound" },
        { prompt: "The ___ is the exact amount of a medicine that should be taken.", answer: "dosage" },
        { prompt: "A ___ is a substance that pollutes or makes something impure.", answer: "contaminant" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Highly, absolutely or extremely?",
      instructions: "Some adjectives collocate with 'highly', some with 'absolutely', and some with 'extremely'. Choose the right adverb.",
      items: [
        { before: "She is a", after: "skilled surgeon with over twenty years of experience.", options: ["highly", "extremely", "absolutely"], answer: "highly" },
        { before: "The proposal was", after: "controversial and divided the committee.", options: ["highly", "extremely", "absolutely"], answer: "highly" },
        { before: "Getting enough sleep is", after: "essential for good health.", options: ["absolutely", "highly", "extremely"], answer: "absolutely" },
        { before: "The old machine is now", after: "useless and needs to be replaced.", options: ["absolutely", "highly", "extremely"], answer: "absolutely" },
        { before: "She felt", after: "anxious before her final exam.", options: ["extremely", "highly", "absolutely"], answer: "extremely" },
        { before: "This dessert is", after: "addictive — I can't stop eating it!", options: ["highly", "extremely", "absolutely"], answer: "highly" },
        { before: "The instructions were", after: "difficult to follow.", options: ["extremely", "highly", "absolutely"], answer: "extremely" },
        { before: "Wearing a seatbelt is", after: "vital for your safety in a car.", options: ["absolutely", "highly", "extremely"], answer: "absolutely" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Science vocabulary in context",
      instructions: "Choose the word that best completes each sentence.",
      items: [
        { before: "Many processed foods contain artificial", after: "to improve flavour and shelf life.", options: ["additives", "pesticides", "emissions"], answer: "additives" },
        { before: "Organic farmers avoid using synthetic", after: "on their crops.", options: ["pesticides", "additives", "radiation"], answer: "pesticides" },
        { before: "Workers at the nuclear plant wore protective suits to avoid exposure to", after: ".", options: ["radiation", "emissions", "additives"], answer: "radiation" },
        { before: "The new law aims to reduce carbon", after: "from factories.", options: ["emissions", "pesticides", "contamination"], answer: "emissions" },
        { before: "The oil spill caused serious", after: "of the coastline.", options: ["contamination", "radiation", "additives"], answer: "contamination" },
        { before: "Plastics and other materials are made from", after: ".", options: ["petrochemicals", "pesticides", "antioxidants"], answer: "petrochemicals" },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — a scientific discovery",
      prompt: "Describe a scientific discovery that you find interesting.",
      bullets: [
        "what the discovery was",
        "when you first heard about it",
        "how it has affected people's lives",
        "and explain why you find it interesting",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"Do you think governments should fund more scientific research?\" or \"What field of science interests you most?\" — think about how you'd answer those too. Try working in some of this unit's vocabulary (compound, phytochemical, breakthrough...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "became less clear", reveal: "has become increasingly blurred" },
        { prompt: "not very successful", reveal: "met with only modest success" },
        { prompt: "doubtful", reveal: "sceptical" },
        { prompt: "based on some proof", reveal: "provided there is at least some scientific evidence" },
        { prompt: "too many claims at once", reveal: "a flood of competing claims" },
        { prompt: "differs a lot", reveal: "varies enormously" },
        { prompt: "strong evidence", reveal: "a substantial body of research" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Test practice — Reading",
      passageTitle: "Food with benefits: the rise of 'functional foods'",
      passage:
        "For most of the twentieth century, the food industry and the pharmaceutical industry occupied separate worlds: one sold things to eat, the other sold things to treat illness. That boundary has become increasingly blurred. Supermarket shelves are now stocked with yoghurt fortified with probiotic bacteria, orange juice enriched with calcium, and cereal boosted with plant sterols said to lower cholesterol. Products designed to deliver a specific health benefit alongside ordinary nutrition are often referred to as 'functional foods'.\n\n" +
        "Early attempts to sell functional foods met with only modest success. Manufacturers assumed that consumers would pay a premium for added health benefits, but many shoppers were sceptical of unfamiliar ingredients and, more importantly, did not notice any difference in taste. Sales grew slowly until nutrition information became far more visible on packaging, and a wave of public interest in weight and diet made shoppers pay closer attention to what was actually in their food.\n\n" +
        "Regulators have had to adapt to this shift. In several countries, food companies are now permitted to place qualified health claims on packaging, provided there is at least some scientific evidence behind them. Supporters of these looser rules argue that consumers deserve more information about the foods they buy. Critics counter that a flood of competing claims, some based on limited research, may end up confusing shoppers rather than helping them, and that allowing marketing claims to run ahead of solid clinical evidence risks misleading the public about a product's real benefits.\n\n" +
        "The scientific evidence for functional foods varies enormously from one product to another. Some claims, such as the link between soy protein and heart health, are backed by a substantial body of research. Others rest on much thinner evidence, and nutrition scientists warn that a health claim on a label is not the same thing as a guarantee. For now, functional foods sit in a middle ground between ordinary groceries and medicine — trading on the promise of science, even where the science itself is still catching up.",
      questions: [
        {
          text: "The food and pharmaceutical industries have always worked closely together.",
          answer: "False",
          justification: "They occupied separate worlds; the boundary has become increasingly blurred, implying it was not close before.",
        },
        {
          text: "Functional foods were an immediate commercial success when first introduced.",
          answer: "False",
          justification: "Early attempts to sell functional foods met with only modest success.",
        },
        {
          text: "Increased attention to nutrition labelling contributed to the growth of functional foods.",
          answer: "True",
          justification: "Sales grew slowly until nutrition information became far more visible on packaging.",
        },
        {
          text: "All countries require the same level of scientific evidence before allowing a health claim on packaging.",
          answer: "Not given",
          justification: "The passage only says 'in several countries', without comparing standards across all countries.",
        },
        {
          text: "Critics worry that too many health claims could confuse consumers.",
          answer: "True",
          justification: "A flood of competing claims... may end up confusing shoppers rather than helping them.",
        },
        {
          text: "The scientific evidence supporting different functional foods is equally strong for every product.",
          answer: "False",
          justification: "The evidence varies enormously; some claims are backed by substantial research, others rest on thinner evidence.",
        },
        {
          text: "A health claim printed on a food label guarantees the product works as described.",
          answer: "False",
          justification: "A health claim on a label is not the same thing as a guarantee.",
        },
      ],
    },
  ],
};

const unit5Vocab: VocabWord[] = [
  {
    term: "motivate",
    ipa: "/ˈməʊtɪveɪt/",
    pos: "verb",
    usageNote: "dùng khi điều gì thúc đẩy ai đó hành động, cố gắng đạt mục tiêu",
    en: "to make someone want to work hard or make an effort",
    vi: "thúc đẩy, tạo động lực",
    synonyms: ["inspire", "encourage"],
    antonyms: ["discourage"],
    examples: [
      { en: "A good teacher knows how to motivate students who are struggling.", vi: "Một giáo viên giỏi biết cách tạo động lực cho những học sinh đang gặp khó khăn." },
      { en: "She was motivated by the thought of a reward at the end of the course.", vi: "Cô ấy được thúc đẩy bởi ý nghĩ về phần thưởng khi kết thúc khoá học." },
    ],
    ieltsTip: "\"Motivate students/employees\" là collocation phổ biến trong Writing Task 2 về giáo dục, quản lý.",
    summary: "motivate = thúc đẩy, tạo động lực.",
  },
  {
    term: "feedback",
    ipa: "/ˈfiːdbæk/",
    pos: "noun",
    usageNote: "luôn là danh từ không đếm được (không có 's'), chỉ ý kiến phản hồi về kết quả/hiệu suất",
    en: "comments about how well or badly someone is doing something, used to help them improve",
    vi: "phản hồi, nhận xét",
    synonyms: ["comments", "response"],
    antonyms: [],
    examples: [
      { en: "Getting positive feedback from tutors keeps students motivated.", vi: "Nhận được phản hồi tích cực từ giảng viên giúp sinh viên có động lực." },
      { en: "The manager gave detailed feedback on my presentation.", vi: "Người quản lý đã đưa ra phản hồi chi tiết về bài thuyết trình của tôi." },
    ],
    ieltsTip: "\"Feedback\" KHÔNG có dạng số nhiều \"feedbacks\" — lỗi rất phổ biến của người học tiếng Việt.",
    summary: "feedback (không đếm được) = phản hồi, nhận xét; không có dạng số nhiều.",
  },
  {
    term: "theoretical",
    ipa: "/ˌθɪəˈretɪkəl/",
    pos: "adjective",
    usageNote: "mô tả kiến thức mang tính lý thuyết, chưa được áp dụng thực tế",
    en: "based on ideas rather than practical experience",
    vi: "mang tính lý thuyết",
    synonyms: ["abstract"],
    antonyms: ["practical"],
    examples: [
      { en: "The course focuses too much on theoretical content rather than practical skills.", vi: "Khoá học tập trung quá nhiều vào nội dung lý thuyết thay vì kỹ năng thực hành." },
      { en: "His knowledge of economics is purely theoretical.", vi: "Kiến thức kinh tế của anh ấy hoàn toàn mang tính lý thuyết." },
    ],
    ieltsTip: "Cặp trái nghĩa \"theoretical vs practical\" rất hữu ích khi so sánh cách học trong Writing Task 2 về giáo dục.",
    summary: "theoretical = mang tính lý thuyết; trái nghĩa với 'practical'.",
  },
  {
    term: "practical",
    ipa: "/ˈpræktɪkəl/",
    pos: "adjective",
    usageNote: "mô tả kỹ năng/kiến thức có thể áp dụng trực tiếp vào thực tế, công việc",
    en: "involving skills that produce useful results, rather than just ideas or theories",
    vi: "mang tính thực hành, thực tế",
    synonyms: ["applied", "hands-on"],
    antonyms: ["theoretical"],
    examples: [
      { en: "The internship gave her valuable practical experience.", vi: "Kỳ thực tập mang lại cho cô ấy kinh nghiệm thực hành quý giá." },
      { en: "Employers often value practical skills as much as academic qualifications.", vi: "Nhà tuyển dụng thường coi trọng kỹ năng thực hành ngang với bằng cấp học thuật." },
    ],
    ieltsTip: "\"Practical experience/skills\" là collocation quan trọng khi so sánh giáo dục lý thuyết và thực hành.",
    summary: "practical = thực hành, thực tế; trái nghĩa với 'theoretical'.",
  },
  {
    term: "reward",
    ipa: "/rɪˈwɔːd/",
    pos: "noun",
    usageNote: "chỉ phần thưởng/lợi ích nhận được sau nỗ lực, hoặc động từ \"khen thưởng\"",
    en: "something you are given because you have done something good or worked hard",
    vi: "phần thưởng; khen thưởng",
    synonyms: ["prize", "incentive"],
    antonyms: ["punishment"],
    examples: [
      { en: "Passing the exam felt like a reward for months of hard work.", vi: "Vượt qua kỳ thi giống như một phần thưởng cho nhiều tháng nỗ lực." },
      { en: "Companies should reward employees who go the extra mile.", vi: "Các công ty nên khen thưởng những nhân viên nỗ lực vượt trội." },
    ],
    ieltsTip: "\"Reward hard work/effort\" là collocation hữu ích khi bàn về động lực học tập, làm việc trong Writing Task 2.",
    summary: "reward = phần thưởng; khen thưởng (cho nỗ lực, thành tích).",
  },
  {
    term: "analyse",
    ipa: "/ˈænəlaɪz/",
    pos: "verb",
    usageNote: "dùng khi xem xét kỹ lưỡng, chia nhỏ vấn đề để hiểu bản chất",
    en: "to examine something carefully in order to understand it",
    vi: "phân tích",
    synonyms: ["examine", "study"],
    antonyms: [],
    examples: [
      { en: "Researchers analysed the data collected over five years.", vi: "Các nhà nghiên cứu đã phân tích dữ liệu thu thập trong năm năm." },
      { en: "You need to analyse the question carefully before you start writing.", vi: "Bạn cần phân tích kỹ câu hỏi trước khi bắt đầu viết." },
    ],
    ieltsTip: "Danh từ \"analysis\" và tính từ \"analytical\" cùng gốc — nhớ cả 3 dạng để linh hoạt trong Writing.",
    summary: "analyse (v) = phân tích; danh từ: analysis, tính từ: analytical.",
  },
  {
    term: "hypothesis",
    ipa: "/haɪˈpɒθəsɪs/",
    pos: "noun",
    usageNote: "số nhiều là \"hypotheses\" — chỉ một giả thuyết khoa học chưa được kiểm chứng đầy đủ",
    en: "an idea that is suggested as an explanation for something, but has not yet been proved to be true",
    vi: "giả thuyết",
    synonyms: ["theory", "assumption"],
    antonyms: ["fact", "proof"],
    examples: [
      { en: "The scientists tested their hypothesis with a series of experiments.", vi: "Các nhà khoa học đã kiểm chứng giả thuyết của mình bằng một loạt thí nghiệm." },
      { en: "Her hypothesis was later confirmed by further research.", vi: "Giả thuyết của cô ấy sau đó đã được xác nhận bởi các nghiên cứu tiếp theo." },
    ],
    ieltsTip: "Chú ý dạng số nhiều bất quy tắc \"hypotheses\" — hay dùng sai trong Writing Task 2 học thuật.",
    summary: "hypothesis (số nhiều: hypotheses) = giả thuyết (khoa học).",
  },
  {
    term: "interpret",
    ipa: "/ɪnˈtɜːprɪt/",
    pos: "verb",
    usageNote: "dùng khi giải thích ý nghĩa của dữ liệu, hành động hoặc lời nói theo một cách nào đó",
    en: "to decide that an action, statement, etc. has a particular meaning",
    vi: "diễn giải, hiểu theo nghĩa",
    synonyms: ["understand", "explain"],
    antonyms: [],
    examples: [
      { en: "It is important to interpret the results of the survey with caution.", vi: "Cần diễn giải kết quả khảo sát một cách thận trọng." },
      { en: "She interpreted his silence as a sign of disagreement.", vi: "Cô ấy hiểu sự im lặng của anh ấy là dấu hiệu của sự không đồng ý." },
    ],
    ieltsTip: "\"Interpret data/results\" là collocation quan trọng trong Writing Task 1 khi phân tích biểu đồ.",
    summary: "interpret = diễn giải, hiểu theo một nghĩa nào đó; danh từ: interpretation.",
  },
  {
    term: "significant",
    ipa: "/sɪɡˈnɪfɪkənt/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó quan trọng, đáng chú ý, có tác động lớn",
    en: "large or important enough to have an effect on something or to be noticed",
    vi: "đáng kể, quan trọng",
    synonyms: ["considerable", "notable"],
    antonyms: ["insignificant", "negligible"],
    examples: [
      { en: "There was a significant improvement in her grades this term.", vi: "Có sự cải thiện đáng kể trong điểm số của cô ấy học kỳ này." },
      { en: "The study found a significant link between sleep and academic performance.", vi: "Nghiên cứu tìm thấy mối liên hệ đáng kể giữa giấc ngủ và kết quả học tập." },
    ],
    ieltsTip: "\"A significant increase/improvement/difference\" là collocation không thể thiếu trong Writing Task 1.",
    summary: "significant = đáng kể, quan trọng; danh từ: significance.",
  },
  {
    term: "valid",
    ipa: "/ˈvælɪd/",
    pos: "adjective",
    usageNote: "mô tả lập luận/kết quả có cơ sở logic, đáng tin cậy, được chấp nhận",
    en: "based on truth or reason; able to be defended against criticism",
    vi: "có căn cứ, hợp lệ, đáng tin cậy",
    synonyms: ["sound", "legitimate"],
    antonyms: ["invalid", "unfounded"],
    examples: [
      { en: "You need more evidence to make a valid argument.", vi: "Bạn cần thêm bằng chứng để đưa ra một lập luận có căn cứ." },
      { en: "The researchers questioned whether the survey results were valid.", vi: "Các nhà nghiên cứu đặt câu hỏi liệu kết quả khảo sát có đáng tin cậy hay không." },
    ],
    ieltsTip: "\"A valid argument/point\" hữu ích khi phản biện trong Writing Task 2; danh từ: validity.",
    summary: "valid = có căn cứ, hợp lệ, đáng tin cậy; danh từ: validity.",
  },
  {
    term: "employable",
    ipa: "/ɪmˈplɔɪəbəl/",
    pos: "adjective",
    usageNote: "mô tả người có đủ kỹ năng, trình độ để được tuyển dụng",
    en: "having the skills and qualifications needed to get a job",
    vi: "có khả năng được tuyển dụng, đủ điều kiện làm việc",
    synonyms: ["qualified", "hireable"],
    antonyms: ["unemployable"],
    examples: [
      { en: "Vocational training can make graduates more employable.", vi: "Đào tạo nghề có thể giúp sinh viên tốt nghiệp dễ được tuyển dụng hơn." },
      { en: "Employers said the course made candidates far more employable.", vi: "Nhà tuyển dụng cho biết khoá học giúp ứng viên trở nên đủ điều kiện làm việc hơn nhiều." },
    ],
    ieltsTip: "\"Employable/employability\" là từ vựng quan trọng khi bàn về giáo dục và thị trường lao động trong Writing Task 2.",
    summary: "employable = có khả năng được tuyển dụng, đủ điều kiện làm việc.",
  },
  {
    term: "a living wage",
    ipa: "/ə ˈlɪvɪŋ weɪdʒ/",
    pos: "phrase",
    usageNote: "chỉ mức lương đủ để trang trải các nhu cầu cơ bản của cuộc sống",
    en: "an amount of money that is enough to pay for the things a person needs to live",
    vi: "mức lương đủ sống",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Many part-time workers struggle to earn a living wage.", vi: "Nhiều lao động bán thời gian phải vật lộn để kiếm mức lương đủ sống." },
      { en: "The campaign is calling on companies to pay all staff a living wage.", vi: "Chiến dịch này kêu gọi các công ty trả cho toàn bộ nhân viên mức lương đủ sống." },
    ],
    ieltsTip: "\"Earn/pay a living wage\" là collocation hữu ích khi bàn về bất bình đẳng thu nhập trong Writing Task 2.",
    summary: "a living wage = mức lương đủ sống.",
  },
  {
    term: "blue-collar",
    ipa: "/ˌbluː ˈkɒlə/",
    pos: "adjective",
    usageNote: "mô tả công việc lao động chân tay, thường trong nhà máy, công trường",
    en: "relating to work that involves physical labour, e.g. in a factory",
    vi: "thuộc lao động chân tay",
    synonyms: ["manual"],
    antonyms: ["white-collar"],
    examples: [
      { en: "Blue-collar jobs remain essential to the manufacturing industry.", vi: "Công việc lao động chân tay vẫn rất cần thiết cho ngành sản xuất." },
      { en: "He comes from a blue-collar family in the north of the country.", vi: "Anh ấy xuất thân từ một gia đình lao động chân tay ở miền bắc đất nước." },
    ],
    ieltsTip: "Cặp từ \"blue-collar\" (lao động chân tay) và \"white-collar\" (văn phòng) rất hữu ích khi bàn về thị trường lao động.",
    summary: "blue-collar = thuộc lao động chân tay; trái nghĩa với 'white-collar'.",
  },
  {
    term: "white-collar",
    ipa: "/ˌwaɪt ˈkɒlə/",
    pos: "adjective",
    usageNote: "mô tả công việc văn phòng, thường đòi hỏi trình độ học vấn cao hơn",
    en: "relating to office work rather than physical labour",
    vi: "thuộc công việc văn phòng",
    synonyms: ["professional"],
    antonyms: ["blue-collar"],
    examples: [
      { en: "White-collar workers make up a growing share of the workforce.", vi: "Lao động văn phòng chiếm tỷ trọng ngày càng lớn trong lực lượng lao động." },
      { en: "She left her white-collar job to start a small farm.", vi: "Cô ấy đã rời bỏ công việc văn phòng để bắt đầu một trang trại nhỏ." },
    ],
    ieltsTip: "So sánh \"white-collar\" và \"blue-collar\" là chủ đề hay gặp trong bài đọc/Speaking Part 3 về việc làm.",
    summary: "white-collar = thuộc công việc văn phòng; trái nghĩa với 'blue-collar'.",
  },
  {
    term: "vocational",
    ipa: "/vəʊˈkeɪʃənəl/",
    pos: "adjective",
    usageNote: "mô tả giáo dục/đào tạo hướng đến một nghề cụ thể, thiên về kỹ năng thực hành",
    en: "relating to the skills and knowledge that you need for a particular job",
    vi: "thuộc về hướng nghiệp, dạy nghề",
    synonyms: ["practical", "occupational"],
    antonyms: ["academic"],
    examples: [
      { en: "Vocational education prepares students directly for a specific career.", vi: "Giáo dục hướng nghiệp chuẩn bị cho sinh viên trực tiếp cho một nghề nghiệp cụ thể." },
      { en: "Not every student wants to follow an academic path — some prefer vocational training.", vi: "Không phải học sinh nào cũng muốn theo con đường học thuật — một số thích đào tạo nghề hơn." },
    ],
    ieltsTip: "\"Vocational education/training\" đối lập với \"academic education\" — cặp từ quan trọng trong Writing Task 2 về giáo dục.",
    summary: "vocational = thuộc hướng nghiệp, dạy nghề; trái nghĩa với 'academic'.",
  },
  {
    term: "job market",
    ipa: "/dʒɒb ˈmɑːkɪt/",
    pos: "phrase",
    usageNote: "chỉ tình hình cung-cầu việc làm nói chung trong một khu vực hoặc ngành",
    en: "the availability of jobs, and the number of people looking for work, at a particular place or time",
    vi: "thị trường việc làm",
    synonyms: ["labour market"],
    antonyms: [],
    examples: [
      { en: "The job market for graduates has become extremely competitive.", vi: "Thị trường việc làm cho sinh viên tốt nghiệp đã trở nên vô cùng cạnh tranh." },
      { en: "New technology is changing the job market faster than ever before.", vi: "Công nghệ mới đang thay đổi thị trường việc làm nhanh hơn bao giờ hết." },
    ],
    ieltsTip: "\"The job market\" là cụm rất phổ biến khi mở bài Writing Task 2 về chủ đề việc làm.",
    summary: "job market = thị trường việc làm.",
  },
  {
    term: "career path",
    ipa: "/kəˈrɪə pɑːθ/",
    pos: "phrase",
    usageNote: "chỉ chuỗi các công việc/vị trí mà một người trải qua để đạt được mục tiêu nghề nghiệp",
    en: "the series of jobs a person has in a particular area of work as they try to progress",
    vi: "lộ trình sự nghiệp",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "She mapped out a clear career path after graduating.", vi: "Cô ấy đã vạch ra một lộ trình sự nghiệp rõ ràng sau khi tốt nghiệp." },
      { en: "Changing your career path in your thirties is more common than people think.", vi: "Thay đổi lộ trình sự nghiệp ở tuổi ba mươi phổ biến hơn mọi người nghĩ." },
    ],
    ieltsTip: "\"Follow/pursue a career path\" là collocation hữu ích trong Speaking Part 3 về công việc, tương lai.",
    summary: "career path = lộ trình sự nghiệp.",
  },
  {
    term: "feat",
    ipa: "/fiːt/",
    pos: "noun",
    usageNote: "chỉ một thành tựu/kỳ tích đòi hỏi kỹ năng, sức mạnh hoặc lòng can đảm đặc biệt",
    en: "an impressive and difficult achievement, requiring skill, strength or courage",
    vi: "kỳ tích, thành tựu đáng kinh ngạc",
    synonyms: ["achievement", "accomplishment"],
    antonyms: ["failure"],
    examples: [
      { en: "Building the pyramids was an extraordinary feat of human endeavour.", vi: "Xây dựng kim tự tháp là một kỳ tích phi thường của nỗ lực con người." },
      { en: "Completing the marathon in under three hours was quite a feat.", vi: "Hoàn thành marathon trong chưa đầy ba giờ là một kỳ tích đáng nể." },
    ],
    ieltsTip: "\"A feat of engineering/human endeavour\" là collocation nâng band trong Writing Task 2 khi ca ngợi thành tựu.",
    summary: "feat = kỳ tích, thành tựu đáng kinh ngạc; collocation: 'a feat of human endeavour'.",
  },
];

const track10Script = `Speaker 1: I'm studying accounting at the moment and I find it really hard to keep motivated sometimes. There are so many facts and figures to learn and the exams are really gruelling so you've got to study hard all the time. I find the only way to do it is to set myself a goal, you know, give myself something to aim for. For me, that's the only thing that helps with the learning process. It doesn't have to be a big thing, it might be rewarding myself with a night out if I'm successful in a test. I know I'll reap the rewards one day, when I'm qualified. My aim is to be qualified by the time I'm 25.

Speaker 2: I'm working at the moment but I don't like my job so I've decided to further my career by taking a computer course at night. I'm finding it a struggle completing my assignments. I'm lucky, though, because I get on really well with some of the other students and we get together once a week to help each other revise and study for our exams. Some people might find it distracting but for me it helps make the course more sociable and so more enjoyable. It's a pretty dry subject and they're teaching us in a pretty boring way, but I really feel like I'm broadening my knowledge of computers.`;

const track11Script = `In the past, people believed that you had to have a degree in order to start a career with good prospects. We used to think that not having a degree would condemn you to a job in the service sector. But now, the job market is extremely competitive and trainees are finding that it is the qualifications they gain through technical courses rather than degree courses that can help make them employable. The fact is that nowadays there are plenty of jobs that offer a living wage and that don't require a degree. Some of these occupations are familiar, for example, a carpenter, creating things for the home. But there are also some new jobs on the list, largely thanks to our interest in the environment. One example would be a solar-panel installer.

In the past, we used to talk about blue-collar and white-collar jobs to differentiate between manual labour and working in an office. Now we might refer to these new jobs as 'chrome-collar' for those working as a technician in various fields or 'green-collar' jobs to do with clean energy or the environment. These new areas are where many of the job vacancies are now, and students who are not academically inclined would do well to pursue one of these new career paths rather than stick to conventional ones.`;

const UNIT_5_STRIVING_TO_ACHIEVE: CambridgeUnit = {
  unit: 5,
  slug: "striving-to-achieve",
  title: "Striving to achieve",
  topics: "Study, work",
  testPractice: "Speaking",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit5Vocab,
    },
    {
      kind: "sort",
      title: "Study or work?",
      instructions: "Tap a word, then tap the area it belongs to.",
      buckets: ["Study", "Work"],
      items: [
        { term: "theoretical", bucket: 0 },
        { term: "hypothesis", bucket: 0 },
        { term: "analyse", bucket: 0 },
        { term: "interpret", bucket: 0 },
        { term: "valid", bucket: 0 },
        { term: "significant", bucket: 0 },
        { term: "employable", bucket: 1 },
        { term: "blue-collar", bucket: 1 },
        { term: "white-collar", bucket: 1 },
        { term: "vocational", bucket: 1 },
        { term: "job market", bucket: 1 },
        { term: "career path", bucket: 1 },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Staying motivated",
      instructions: "Listen to two people talking about studying. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-10.mp3",
      template:
        "Speaker 1 says she finds it hard to stay {{motivated}} while studying accounting, so she sets herself a {{goal}} to aim for — sometimes rewarding herself with a night out after a successful test, knowing she will {{reap}} the rewards once qualified.\n\n" +
        "Speaker 2 is taking a computer course at night to further her career. She finds the assignments a struggle, but meeting other students once a week to {{revise}} together makes the course more enjoyable, and she feels she is {{broadening}} her knowledge of computers.",
      script: track10Script,
    },
    {
      kind: "listening_cloze",
      title: "The changing job market",
      instructions: "Listen to a talk about employment. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-11.mp3",
      tip: "The wording in the notes paraphrases what you hear, but the answers come in the same order as the talk.",
      template:
        "Previous beliefs\n" +
        "• Needed a degree to get a job with good {{prospects}}\n" +
        "• Not attending university would limit you to work in the {{service}} sector\n\n" +
        "Current work situation\n" +
        "• The job market is now extremely {{competitive}}\n" +
        "• Technical courses can make you more {{employable}} than a degree\n" +
        "• Plenty of jobs offer a {{living wage}} without requiring a degree, e.g. carpenter\n" +
        "• New jobs also pay reasonably well, e.g. {{solar-panel}} installer\n" +
        "• New categories of work: 'chrome-collar' (technicians) or 'green-collar' (linked to the environment) — this is where many job {{vacancies}} exist",
      script: track11Script,
    },
    {
      kind: "fill_mc",
      title: "Word families",
      instructions: "Choose the correct word form for each sentence.",
      items: [
        { before: "Researchers need to", after: "the data carefully before drawing any conclusions.", options: ["analyse", "analysis", "analytical"], answer: "analyse" },
        { before: "Her", after: "was later confirmed by further research.", options: ["hypothesis", "hypothesise", "hypothetical"], answer: "hypothesis" },
        { before: "It can be difficult to", after: "the results of a small survey.", options: ["interpret", "interpretation", "interpretive"], answer: "interpret" },
        { before: "There was a", after: "improvement in test scores this year.", options: ["significant", "signify", "significance"], answer: "significant" },
        { before: "You need more evidence to make a", after: "argument.", options: ["valid", "validity", "validate"], answer: "valid" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Idioms of achievement",
      instructions: "Choose the phrase that best completes each sentence.",
      items: [
        { before: "Finding the cure was a process of", after: ". We tried out many theories and failed many times before finally succeeding.", options: ["trial and error", "give and take", "cause and effect"], answer: "trial and error" },
        { before: "We are making a", after: "to solve this problem before the deadline.", options: ["concerted effort", "human endeavour", "feeble attempt"], answer: "concerted effort" },
        { before: "Building the pyramids was an amazing", after: "of human endeavour.", options: ["feat", "feature", "fact"], answer: "feat" },
        { before: "It was only after several weeks of", after: "exercise that I finally regained my fitness levels.", options: ["strenuous", "feeble", "theoretical"], answer: "strenuous" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "predict", reveal: "can the size... predict how well someone will learn" },
        { prompt: "taking part in the study", reveal: "participants" },
        { prompt: "doing several things at once", reveal: "multitasking" },
        { prompt: "part of the brain linked to pleasure", reveal: "part of the brain's reward circuitry" },
        { prompt: "only at the beginning", reveal: "only in the earliest stages of training" },
        { prompt: "kept improving", reveal: "continued to learn more, and more quickly" },
        { prompt: "when the brain stops working normally", reveal: "how learning breaks down" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — what a video game reveals about learning",
      passageTitle: "What a video game reveals about learning",
      passage:
        "Can the size of a particular brain region predict how well someone will learn a new skill? According to research led by the psychologist Kirk Erickson, the answer appears to be yes, at least for a task requiring the fast acquisition of new motor skills.\n\n" +
        "In the study, participants were taught to play Space Fortress, a video game designed at the University of Illinois specifically for research into learning. One group was simply asked to maximise their overall score. A second group was asked to do something harder: shift their priorities periodically, focusing on improving one skill for a while before switching attention to another, all while still trying to maximise their total score. Erickson's team called this second approach 'variable priority training', and noted that it closely resembles the kind of multitasking many people are required to do in ordinary daily life.\n\n" +
        "Before any training began, the researchers scanned each participant's brain and measured the volume of several specific structures. One of these, the nucleus accumbens, forms part of the brain's reward circuitry and is linked to the pleasure that follows achieving a goal. Participants with a larger nucleus accumbens performed better than the rest of the group, but only in the earliest stages of training — a pattern Erickson attributes to the fact that the emotional reward of early progress is usually strongest right at the start of learning something new.\n\n" +
        "Two other brain structures, the caudate nucleus and the putamen, told a different story. Participants with larger volumes in these regions did not just start faster; they continued to learn more, and more quickly, throughout the entire training period. Erickson believes findings like these could eventually help researchers understand not only how healthy brains acquire complex skills, but also how learning breaks down in conditions such as dementia.",
      questions: [
        {
          text: "The study found that brain volume alone can predict success at every stage of learning a new skill.",
          answer: "False",
          justification: "The nucleus accumbens only predicted performance in the earliest stages; other structures predicted performance throughout.",
        },
        {
          text: "Space Fortress was originally created purely for entertainment.",
          answer: "False",
          justification: "It is a video game designed at the University of Illinois specifically for research into learning.",
        },
        {
          text: "Participants in the 'variable priority training' group had to switch their focus between different skills.",
          answer: "True",
          justification: "They had to shift their priorities periodically, focusing on one skill before switching to another.",
        },
        {
          text: "A larger nucleus accumbens was linked to better performance throughout the whole training period.",
          answer: "False",
          justification: "It was linked to better performance only in the earliest stages of training.",
        },
        {
          text: "The caudate nucleus and putamen were linked to faster learning at every stage of training.",
          answer: "True",
          justification: "Participants with larger volumes in these regions continued to learn more, and more quickly, throughout the entire training period.",
        },
        {
          text: "Erickson believes his findings might help researchers understand conditions like dementia.",
          answer: "True",
          justification: "The findings could help understand how learning breaks down in conditions such as dementia.",
        },
        {
          text: "All participants in the study were professional gamers before the training began.",
          answer: "Not given",
          justification: "The passage does not mention participants' prior gaming experience.",
        },
      ],
    },
    {
      kind: "speaking",
      title: "Test practice — Speaking",
      prompt: "Describe a school you attended.",
      bullets: [
        "what you learned there",
        "how long you studied there",
        "what the teachers were like",
        "and explain whether you enjoyed studying there",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. In the real test, Part 1 might ask about familiar topics like your home or daily routine, and Part 3 often asks broader questions such as \"Do tests and exams really help students learn?\" or \"Should governments encourage students to study certain subjects?\" — think about how you'd answer those too. When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
  ],
};

const unit6Vocab: VocabWord[] = [
  {
    term: "ubiquitous",
    ipa: "/juːˈbɪkwɪtəs/",
    pos: "adjective",
    usageNote: "mô tả thứ có mặt ở khắp mọi nơi, đến mức gần như không thể tránh khỏi",
    en: "seeming to be everywhere at the same time; very common",
    vi: "có mặt khắp nơi, phổ biến",
    synonyms: ["omnipresent", "widespread"],
    antonyms: ["rare", "scarce"],
    examples: [
      { en: "Smartphones have become ubiquitous in modern life.", vi: "Điện thoại thông minh đã trở nên phổ biến khắp nơi trong cuộc sống hiện đại." },
      { en: "Online advertising is now ubiquitous — it's almost impossible to avoid.", vi: "Quảng cáo trực tuyến giờ có mặt khắp nơi — gần như không thể tránh khỏi." },
    ],
    ieltsTip: "\"Ubiquitous\" là tính từ học thuật nâng band, dùng thay cho \"everywhere\" trong Writing Task 2.",
    summary: "ubiquitous = có mặt khắp nơi, phổ biến đến mức khó tránh.",
  },
  {
    term: "compelling",
    ipa: "/kəmˈpelɪŋ/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó hấp dẫn, thuyết phục đến mức khiến người ta chú ý hoặc tin theo",
    en: "very interesting or convincing, so that you feel you must pay attention",
    vi: "hấp dẫn, thuyết phục mạnh mẽ",
    synonyms: ["persuasive", "gripping"],
    antonyms: ["unconvincing", "dull"],
    examples: [
      { en: "The advert told a compelling story about a family reunion.", vi: "Quảng cáo kể một câu chuyện hấp dẫn về cuộc đoàn tụ gia đình." },
      { en: "She made a compelling argument for why the product was worth the price.", vi: "Cô ấy đưa ra một lập luận thuyết phục về lý do sản phẩm xứng đáng với giá tiền." },
    ],
    ieltsTip: "\"A compelling argument/story\" là collocation hữu ích khi đánh giá quảng cáo hoặc bài luận trong Writing Task 2.",
    summary: "compelling = hấp dẫn, thuyết phục mạnh mẽ.",
  },
  {
    term: "invasive",
    ipa: "/ɪnˈveɪsɪv/",
    pos: "adjective",
    usageNote: "ở đây mang nghĩa xâm phạm vào không gian riêng tư của người khác một cách không mong muốn",
    en: "intruding on someone's private life or space in an unwelcome way",
    vi: "xâm phạm (quyền riêng tư)",
    synonyms: ["intrusive"],
    antonyms: ["unobtrusive"],
    examples: [
      { en: "Many people find targeted online advertising quite invasive.", vi: "Nhiều người thấy quảng cáo trực tuyến nhắm mục tiêu khá xâm phạm quyền riêng tư." },
      { en: "The company was criticised for its invasive data-collection practices.", vi: "Công ty bị chỉ trích vì các hoạt động thu thập dữ liệu mang tính xâm phạm." },
    ],
    ieltsTip: "\"Invasive advertising/data collection\" hữu ích khi bàn về quyền riêng tư trong Writing Task 2 về công nghệ.",
    summary: "invasive = xâm phạm (không gian riêng tư, sự tự do cá nhân).",
  },
  {
    term: "infuriating",
    ipa: "/ɪnˈfjʊərieɪtɪŋ/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó khiến người ta rất tức giận, khó chịu tột độ",
    en: "extremely annoying; making someone very angry",
    vi: "gây tức giận, bực bội tột độ",
    synonyms: ["maddening", "irritating"],
    antonyms: ["pleasing"],
    examples: [
      { en: "It's infuriating to be interrupted by a sales call during dinner.", vi: "Thật bực bội khi bị gián đoạn bởi một cuộc gọi bán hàng trong bữa tối." },
      { en: "She found the constant pop-up ads absolutely infuriating.", vi: "Cô ấy thấy những quảng cáo pop-up liên tục thực sự gây tức giận." },
    ],
    ieltsTip: "\"Infuriating\" mạnh hơn \"irritating\" — dùng khi muốn nhấn mạnh mức độ khó chịu trong Speaking Part 3.",
    summary: "infuriating = gây tức giận tột độ; mạnh hơn 'irritating'.",
  },
  {
    term: "slick",
    ipa: "/slɪk/",
    pos: "adjective",
    usageNote: "mô tả thứ được thực hiện khéo léo, chuyên nghiệp, đôi khi hàm ý thiếu chiều sâu/thực chất",
    en: "impressively smooth and skilfully done, sometimes suggesting a lack of real substance",
    vi: "bóng bẩy, chuyên nghiệp (đôi khi thiếu thực chất)",
    synonyms: ["polished", "slick → smooth"],
    antonyms: ["clumsy", "amateurish"],
    examples: [
      { en: "The company launched a slick new advertising campaign.", vi: "Công ty đã tung ra một chiến dịch quảng cáo mới bóng bẩy, chuyên nghiệp." },
      { en: "His slick presentation impressed the clients, but some details didn't add up.", vi: "Bài thuyết trình bóng bẩy của anh ấy gây ấn tượng với khách hàng, nhưng một số chi tiết không hợp lý." },
    ],
    ieltsTip: "\"A slick campaign/presentation\" hữu ích khi phê phán vẻ ngoài hào nhoáng nhưng thiếu thực chất trong Writing Task 2.",
    summary: "slick = bóng bẩy, chuyên nghiệp (đôi khi hàm ý thiếu thực chất).",
  },
  {
    term: "catchy",
    ipa: "/ˈkætʃi/",
    pos: "adjective",
    usageNote: "mô tả giai điệu/câu nói dễ nhớ, dễ bị ám ảnh trong đầu sau khi nghe",
    en: "(of a tune or phrase) pleasant and easy to remember",
    vi: "dễ nhớ, bắt tai",
    synonyms: ["memorable"],
    antonyms: ["forgettable"],
    examples: [
      { en: "The advert used a catchy jingle that stuck in everyone's head.", vi: "Quảng cáo sử dụng một giai điệu dễ nhớ khiến ai cũng nhớ mãi." },
      { en: "A catchy slogan can make a brand instantly recognisable.", vi: "Một khẩu hiệu dễ nhớ có thể khiến một thương hiệu được nhận ra ngay lập tức." },
    ],
    ieltsTip: "\"A catchy jingle/slogan\" là collocation tự nhiên khi mô tả quảng cáo hiệu quả trong Speaking Part 2.",
    summary: "catchy = dễ nhớ, bắt tai (giai điệu, câu nói).",
  },
  {
    term: "pressurise",
    ipa: "/ˈpreʃəraɪz/",
    pos: "verb",
    usageNote: "dùng khi ai đó bị gây áp lực, ép buộc phải làm điều gì mà họ có thể không muốn",
    en: "to try to make someone do something by putting pressure on them",
    vi: "gây áp lực, ép buộc",
    synonyms: ["pressure", "coerce"],
    antonyms: ["reassure"],
    examples: [
      { en: "Customers can often feel pressurised into buying a product they don't need.", vi: "Khách hàng thường cảm thấy bị ép buộc phải mua một sản phẩm mà họ không cần." },
      { en: "Salespeople shouldn't pressurise elderly customers into signing contracts.", vi: "Nhân viên bán hàng không nên gây áp lực để khách hàng lớn tuổi ký hợp đồng." },
    ],
    ieltsTip: "\"Feel pressurised into (doing) something\" là collocation hữu ích khi phê phán chiến thuật bán hàng trong Writing Task 2.",
    summary: "pressurise = gây áp lực, ép buộc (ai làm gì).",
  },
  {
    term: "entice",
    ipa: "/ɪnˈtaɪs/",
    pos: "verb",
    usageNote: "dùng khi thu hút ai đó bằng cách đưa ra thứ gì đó hấp dẫn, thường trong ngữ cảnh bán hàng",
    en: "to attract someone by offering them something pleasant",
    vi: "lôi kéo, dụ dỗ (bằng thứ gì hấp dẫn)",
    synonyms: ["tempt", "lure"],
    antonyms: ["repel"],
    examples: [
      { en: "Department stores use pleasant smells and music to entice shoppers inside.", vi: "Các cửa hàng bách hoá dùng mùi hương và âm nhạc dễ chịu để lôi kéo khách hàng vào bên trong." },
      { en: "The pop-up promised to entice him with a chance to win $1 million.", vi: "Cửa sổ bật lên hứa hẹn lôi kéo anh ta bằng cơ hội trúng 1 triệu đô." },
    ],
    ieltsTip: "\"Entice customers/shoppers\" là collocation tự nhiên khi mô tả chiến lược marketing.",
    summary: "entice = lôi kéo, dụ dỗ (bằng điều gì đó hấp dẫn).",
  },
  {
    term: "induce",
    ipa: "/ɪnˈdjuːs/",
    pos: "verb",
    usageNote: "dùng khi thuyết phục hoặc tác động khiến ai đó làm một việc cụ thể",
    en: "to persuade or influence someone to do something",
    vi: "thuyết phục, khiến ai làm gì",
    synonyms: ["persuade", "prompt"],
    antonyms: ["deter"],
    examples: [
      { en: "Free samples are designed to induce customers to try a new product.", vi: "Mẫu thử miễn phí được thiết kế để khiến khách hàng dùng thử sản phẩm mới." },
      { en: "Nothing could induce her to change her mind.", vi: "Không gì có thể thuyết phục cô ấy thay đổi ý định." },
    ],
    ieltsTip: "\"Induce someone to do something\" là cấu trúc trang trọng, hữu ích trong Writing Task 2 học thuật.",
    summary: "induce = thuyết phục, khiến ai đó làm gì.",
  },
  {
    term: "tempt",
    ipa: "/tempt/",
    pos: "verb",
    usageNote: "dùng khi khiến ai đó muốn làm một việc, đặc biệt việc không khôn ngoan hoặc không cần thiết",
    en: "to attract someone to do something, especially something unwise or unnecessary",
    vi: "cám dỗ, quyến rũ",
    synonyms: ["entice", "lure"],
    antonyms: ["discourage"],
    examples: [
      { en: "The bright packaging is designed to tempt children into asking their parents for the toy.", vi: "Bao bì sặc sỡ được thiết kế để cám dỗ trẻ em đòi bố mẹ mua đồ chơi." },
      { en: "I was tempted to buy the shoes even though I didn't need them.", vi: "Tôi bị cám dỗ mua đôi giày dù không thực sự cần." },
    ],
    ieltsTip: "\"Tempted to do something\" là cấu trúc rất tự nhiên trong Speaking khi kể về việc mua sắm bốc đồng.",
    summary: "tempt = cám dỗ, quyến rũ (làm điều gì không cần thiết).",
  },
  {
    term: "ploy",
    ipa: "/plɔɪ/",
    pos: "noun",
    usageNote: "chỉ một mưu mẹo, chiêu trò được tính toán để đạt lợi thế, thường mang sắc thái tiêu cực nhẹ",
    en: "a cunning plan or trick designed to gain an advantage",
    vi: "mánh khoé, chiêu trò",
    synonyms: ["trick", "tactic"],
    antonyms: [],
    examples: [
      { en: "Many competitions are simply a marketing ploy to boost sales.", vi: "Nhiều cuộc thi chỉ đơn giản là một chiêu trò marketing để tăng doanh số." },
      { en: "Critics called the price cut a cheap ploy to attract attention.", vi: "Các nhà phê bình gọi việc giảm giá là một chiêu trò rẻ tiền để thu hút sự chú ý." },
    ],
    ieltsTip: "\"A marketing ploy\" là collocation hữu ích khi phê phán chiến lược quảng cáo trong Writing Task 2.",
    summary: "ploy = mánh khoé, chiêu trò (để đạt lợi thế).",
  },
  {
    term: "gimmick",
    ipa: "/ˈɡɪmɪk/",
    pos: "noun",
    usageNote: "chỉ thủ thuật/vật dụng dùng để thu hút sự chú ý hoặc bán hàng, thường không mang lại giá trị thực",
    en: "a trick or device intended to attract attention or sell something, without adding any real value",
    vi: "chiêu trò (quảng cáo), không có giá trị thực",
    synonyms: ["stunt", "trick"],
    antonyms: [],
    examples: [
      { en: "The free gift was just a gimmick to get people through the door.", vi: "Món quà miễn phí chỉ là một chiêu trò để kéo người vào cửa hàng." },
      { en: "Some customers see loyalty cards as nothing more than a marketing gimmick.", vi: "Một số khách hàng coi thẻ khách hàng thân thiết chẳng qua chỉ là một chiêu trò marketing." },
    ],
    ieltsTip: "Phân biệt \"gimmick\" (chiêu trò, tiêu cực) với \"strategy\" (chiến lược, trung tính) khi viết Writing Task 2.",
    summary: "gimmick = chiêu trò (quảng cáo), thường không có giá trị thực chất.",
  },
  {
    term: "branding",
    ipa: "/ˈbrændɪŋ/",
    pos: "noun",
    usageNote: "chỉ hoạt động xây dựng hình ảnh, tên gọi nhận diện nhất quán cho một sản phẩm/công ty",
    en: "the promotion of a product or company by using a distinctive design, name, or symbol",
    vi: "xây dựng thương hiệu",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Coca-Cola invests heavily in branding to keep its image consistent worldwide.", vi: "Coca-Cola đầu tư mạnh vào xây dựng thương hiệu để giữ hình ảnh nhất quán trên toàn thế giới." },
      { en: "Good branding can make a small company look much more established.", vi: "Xây dựng thương hiệu tốt có thể khiến một công ty nhỏ trông có vị thế hơn nhiều." },
    ],
    ieltsTip: "\"Invest in branding\" là collocation hữu ích khi bàn về chiến lược kinh doanh trong Writing Task 2.",
    summary: "branding = xây dựng thương hiệu (hình ảnh, tên gọi nhận diện).",
  },
  {
    term: "slogan",
    ipa: "/ˈsləʊɡən/",
    pos: "noun",
    usageNote: "chỉ một câu ngắn, dễ nhớ, dùng để quảng cáo sản phẩm hoặc truyền tải thông điệp",
    en: "a short, memorable phrase used in advertising or to express an idea",
    vi: "khẩu hiệu",
    synonyms: ["catchphrase", "tagline"],
    antonyms: [],
    examples: [
      { en: "The company's new slogan was catchy but didn't explain what the product actually did.", vi: "Khẩu hiệu mới của công ty dễ nhớ nhưng không giải thích được sản phẩm thực sự làm gì." },
      { en: "The famous Nike slogan was drawn up by a design student who was only paid $35.", vi: "Khẩu hiệu nổi tiếng của Nike được một sinh viên thiết kế nghĩ ra và chỉ được trả 35 đô." },
    ],
    ieltsTip: "\"A catchy/memorable slogan\" là collocation hữu ích khi mô tả quảng cáo hiệu quả.",
    summary: "slogan = khẩu hiệu (câu ngắn, dễ nhớ dùng trong quảng cáo).",
  },
  {
    term: "exaggerate",
    ipa: "/ɪɡˈzædʒəreɪt/",
    pos: "verb",
    usageNote: "dùng khi mô tả điều gì đó lớn hơn, tốt hơn hoặc tệ hơn thực tế",
    en: "to represent something as being larger, better, or worse than it really is",
    vi: "phóng đại, thổi phồng",
    synonyms: ["overstate"],
    antonyms: ["understate", "downplay"],
    examples: [
      { en: "Advertisements often exaggerate the benefits of a product.", vi: "Quảng cáo thường phóng đại lợi ích của sản phẩm." },
      { en: "Companies often exaggerate the features of toys and may make promises they cannot keep.", vi: "Các công ty thường phóng đại tính năng của đồ chơi và có thể đưa ra những lời hứa không thể thực hiện." },
    ],
    ieltsTip: "\"Exaggerate the benefits/features\" hữu ích khi phê phán quảng cáo phóng đại trong Writing Task 2.",
    summary: "exaggerate = phóng đại, thổi phồng (lợi ích, tính năng).",
  },
  {
    term: "impulsive",
    ipa: "/ɪmˈpʌlsɪv/",
    pos: "adjective",
    usageNote: "mô tả hành động được thực hiện đột ngột, theo cảm xúc, không suy nghĩ kỹ trước",
    en: "acting suddenly, without thinking carefully first",
    vi: "bốc đồng, thiếu suy nghĩ",
    synonyms: ["spontaneous", "rash"],
    antonyms: ["cautious", "deliberate"],
    examples: [
      { en: "Retailers prefer their customers to make impulsive purchases rather than planned ones.", vi: "Các nhà bán lẻ thích khách hàng của mình mua sắm bốc đồng hơn là có kế hoạch." },
      { en: "Buying the car was an impulsive decision she later regretted.", vi: "Mua chiếc xe là một quyết định bốc đồng mà sau này cô ấy hối hận." },
    ],
    ieltsTip: "\"An impulsive purchase/decision\" là collocation hữu ích khi bàn về thói quen tiêu dùng trong Writing Task 2.",
    summary: "impulsive = bốc đồng, thiếu suy nghĩ (hành động, quyết định).",
  },
  {
    term: "consumer",
    ipa: "/kənˈsjuːmə/",
    pos: "noun",
    usageNote: "chỉ người mua/sử dụng hàng hoá, dịch vụ nói chung, thường dùng trong ngữ cảnh kinh tế học",
    en: "a person who buys goods or services",
    vi: "người tiêu dùng",
    synonyms: ["customer", "buyer"],
    antonyms: ["producer", "manufacturer"],
    examples: [
      { en: "Consumers are becoming more aware of the tricks used in advertising.", vi: "Người tiêu dùng ngày càng nhận thức rõ hơn về những chiêu trò được sử dụng trong quảng cáo." },
      { en: "Consumer confidence has fallen sharply this year.", vi: "Niềm tin của người tiêu dùng đã giảm mạnh trong năm nay." },
    ],
    ieltsTip: "\"Consumer confidence/behaviour\" là collocation cơ bản khi bàn về kinh tế, tiêu dùng trong Writing Task 2.",
    summary: "consumer = người tiêu dùng; trái nghĩa với 'producer/manufacturer'.",
  },
  {
    term: "possessions",
    ipa: "/pəˈzeʃənz/",
    pos: "noun",
    usageNote: "luôn ở dạng số nhiều, chỉ những đồ vật mà một người sở hữu",
    en: "the things that a person owns",
    vi: "tài sản, đồ đạc sở hữu",
    synonyms: ["belongings", "property"],
    antonyms: [],
    examples: [
      { en: "At the hospital, they made a list of my possessions and put them in a bag.", vi: "Tại bệnh viện, họ đã lập danh sách đồ đạc của tôi và cho vào túi." },
      { en: "She lost all her possessions in the fire.", vi: "Cô ấy đã mất tất cả tài sản của mình trong vụ hoả hoạn." },
    ],
    ieltsTip: "\"Personal possessions\" là cách trang trọng hơn để nói \"things\" — tránh dùng từ \"stuff\" quá thân mật trong bài thi IELTS.",
    summary: "possessions (luôn số nhiều) = tài sản, đồ đạc sở hữu.",
  },
];

const track12Script = `Speaker 1: I really don't like it when I'm online and visit a website and suddenly I'm bombarded with adverts for products I don't want or need. Don't they realise how annoying it is? Especially when you see the same image over and over again. I know my young son often gets sidetracked when these images suddenly appear and entice him to 'click here to win $1million'!

Speaker 2: What I find most annoying is when I'm getting dinner ready, the phone invariably rings and it's someone trying to sell me something. How or why they persist in ringing at that time, I just don't know. It infuriates me and I can't believe they ever manage to sell anything that way.`;

const track13Script = `Speaker 3: Yeah, look, it's everywhere, isn't it? There's a street I walk down everyday and the walls are plastered with flyers for new bands and events. They don't remove the old ones — they just put new ones up over the top, so I think people just tend to shut them out and ignore them. I think they're a bit ugly, really. But then sometimes you'll see an ad that helps you escape from where you are. I was stuck in traffic the other day and I was feeling pretty down but then I saw a huge ad for some island somewhere and it looked amazing. At least while I was stuck there, I could sit and dream about a better place. And I think that's what ads are all about, aren't they? Selling us an idea of something better. Then on the radio I heard this jingle for a new toothpaste and it's one I've heard a lot and I couldn't get the tune out of my head after that! And then of course there's the issue of sponsorship. I think a lot of sports teams and athletes wouldn't be able to survive now without advertising. And I really can't see the situation changing at all. I guess we just have to learn to live with it.`;

const UNIT_6_POWERS_OF_PERSUASION: CambridgeUnit = {
  unit: 6,
  slug: "powers-of-persuasion",
  title: "Powers of persuasion",
  topics: "Advertising, marketing",
  testPractice: "Reading",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit6Vocab,
    },
    {
      kind: "sort",
      title: "Positive or negative?",
      instructions: "Tap a word, then tap how it usually describes an advert.",
      buckets: ["Positive", "Negative"],
      items: [
        { term: "compelling", bucket: 0 },
        { term: "catchy", bucket: 0 },
        { term: "slick", bucket: 0 },
        { term: "effective", bucket: 0 },
        { term: "persuasive", bucket: 0 },
        { term: "convincing", bucket: 0 },
        { term: "irritating", bucket: 1 },
        { term: "ubiquitous", bucket: 1 },
        { term: "invasive", bucket: 1 },
        { term: "infuriating", bucket: 1 },
        { term: "disappointing", bucket: 1 },
        { term: "disturbing", bucket: 1 },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Complaints about advertising",
      instructions: "Listen to two people talking about advertising. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-12.mp3",
      template:
        "Speaker 1 says he doesn't like being {{bombarded}} with adverts for things he doesn't want when he's online, and finds it especially {{annoying}} to see the same image repeatedly. He adds that his young son often gets {{sidetracked}} by pop-ups that {{entice}} him to click for a prize.\n\n" +
        "Speaker 2 finds it most annoying when the phone {{invariably}} rings with a sales call right as she's cooking dinner. She says it {{infuriates}} her that she can't understand how such calls ever manage to sell anything.",
      script: track12Script,
    },
    {
      kind: "listening_cloze",
      title: "Living with advertising",
      instructions: "Listen to a third speaker talking about advertising. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-13.mp3",
      template:
        "Speaker 3 says the street he walks down every day is {{plastered}} with flyers for bands and events, so people tend to {{shut}} them out and ignore them. He finds most ads ugly, but says a good ad can help you {{escape}} from where you are — like a billboard for an island that let him dream of a better place while stuck in traffic. He also mentions a toothpaste {{jingle}} he can't get out of his head, and the issue of {{sponsorship}}, without which he thinks many sports teams and athletes could not survive.",
      script: track13Script,
    },
    {
      kind: "fill_mc",
      title: "Marketing verbs and nouns in context",
      instructions: "Choose the word that best completes each sentence.",
      items: [
        { before: "Customers can often feel", after: "into buying a product they don't really need.", options: ["pressurised", "entertained", "informed"], answer: "pressurised" },
        { before: "Department stores often use pleasant smells and music to", after: "shoppers into their stores.", options: ["entice", "pressurise", "exaggerate"], answer: "entice" },
        { before: "Free samples are designed to", after: "customers to try a new product.", options: ["induce", "exaggerate", "pressurise"], answer: "induce" },
        { before: "The bright packaging is designed to", after: "children into asking their parents for the toy.", options: ["tempt", "reassure", "exaggerate"], answer: "tempt" },
        { before: "Many competitions are simply a marketing", after: "to help boost sales.", options: ["ploy", "branding", "slogan"], answer: "ploy" },
        { before: "The free gift was just a", after: "to get people through the door.", options: ["gimmick", "slogan", "consumer"], answer: "gimmick" },
        { before: "Coca-Cola invests heavily in", after: "to keep its image consistent worldwide.", options: ["branding", "gimmick", "possessions"], answer: "branding" },
        { before: "The company's new", after: "was catchy but didn't explain what the product actually did.", options: ["slogan", "ploy", "consumer"], answer: "slogan" },
      ],
    },
    {
      kind: "type_fill",
      title: "Guess the word from its definition",
      instructions: "Read each definition and type the matching word from this unit.",
      items: [
        { prompt: "To ___ something means to make it sound bigger, better or worse than it really is.", answer: "exaggerate" },
        { prompt: "An ___ purchase is one made suddenly, without thinking it through.", answer: "impulsive" },
        { prompt: "A ___ is a person who buys goods or services.", answer: "consumer" },
        { prompt: "Your personal ___ are the things you own.", answer: "possessions" },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — an advertisement you remember",
      prompt: "Describe an advertisement that you remember well.",
      bullets: [
        "what it was for",
        "where or when you saw it",
        "what made it memorable",
        "and explain whether you think it was effective",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"Do you think advertising has a negative effect on society?\" or \"Should advertising aimed at children be banned?\" — think about how you'd answer those too. Try working in some of this unit's vocabulary (compelling, gimmick, exaggerate...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "not automatic", reveal: "far less automatic than that" },
        { prompt: "loads fast", reveal: "how quickly a site loads" },
        { prompt: "safe payment details", reveal: "confident... that their card details are secure" },
        { prompt: "hard selling", reveal: "aggressive, sales-focused messaging" },
        { prompt: "reach millions", reveal: "reach an audience of millions" },
        { prompt: "handled badly", reveal: "poorly handled" },
        { prompt: "before it becomes public", reveal: "before their frustration goes public" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Test practice — Reading",
      passageTitle: "Why some customers stay loyal — and some don't",
      passage:
        "Marketers have long assumed that a satisfied customer is a loyal customer, but a growing body of consumer research suggests the relationship is far less automatic than that. Being satisfied with a single purchase, it turns out, is not enough on its own to persuade someone to come back.\n\n" +
        "Researchers studying online retail found that customers judge a website on much more than the quality of what they eventually buy. How quickly a site loads, how intrusive its pop-up windows are, and how confident a shopper feels that their card details are secure all shape whether someone returns. In effect, an online store is being judged the way people judge a new acquaintance: on trustworthiness as much as on any single transaction.\n\n" +
        "Building that trust, researchers found, does not necessarily require constant hard selling. In fact, promotions built around aggressive, sales-focused messaging were less effective at building a long-term relationship than promotions that simply gave customers useful information — a rebate they qualified for, or a discount for their next visit. Consumers, it seems, respond better to being helped than to being pushed.\n\n" +
        "Social media has raised the stakes considerably. A single dissatisfied customer can now reach an audience of millions with one post or video, and companies have discovered that a poorly handled complaint can do more damage than years of careful advertising. As a result, many businesses have shifted resources away from simply attracting new customers and towards systems specifically designed to identify and respond to unhappy ones before their frustration goes public.",
      questions: [
        {
          text: "Customer satisfaction with a single purchase is enough to guarantee loyalty.",
          answer: "False",
          justification: "Being satisfied with a single purchase is not enough on its own to persuade someone to come back.",
        },
        {
          text: "Online shoppers judge a website only by the quality of the products they buy.",
          answer: "False",
          justification: "Customers judge a website on much more than the quality of what they eventually buy.",
        },
        {
          text: "How fast a website loads can affect whether a customer returns.",
          answer: "True",
          justification: "How quickly a site loads... shapes whether someone returns.",
        },
        {
          text: "Promotions based on aggressive selling were found to be the most effective way to build loyalty.",
          answer: "False",
          justification: "Aggressive, sales-focused messaging was less effective than promotions offering useful information.",
        },
        {
          text: "Social media has made it easier for unhappy customers to reach a large audience.",
          answer: "True",
          justification: "A single dissatisfied customer can now reach an audience of millions with one post or video.",
        },
        {
          text: "Companies have started dedicating more resources to responding to unhappy customers.",
          answer: "True",
          justification: "Many businesses have shifted resources... towards systems specifically designed to identify and respond to unhappy ones.",
        },
        {
          text: "Most companies now spend more on responding to complaints than on advertising to new customers.",
          answer: "Not given",
          justification: "The passage describes a shift in resources but does not compare the exact amounts spent on each.",
        },
      ],
    },
  ],
};

const unit7Vocab: VocabWord[] = [
  {
    term: "imminent",
    ipa: "/ˈɪmɪnənt/",
    pos: "adjective",
    usageNote: "thường mô tả điều gì đó sắp xảy ra, mang tính đe doạ hoặc khẩn cấp",
    en: "about to happen very soon",
    vi: "sắp xảy ra (thường mang tính đe doạ)",
    synonyms: ["impending", "forthcoming"],
    antonyms: ["distant"],
    examples: [
      { en: "Scientists warned that the volcano's eruption was imminent.", vi: "Các nhà khoa học cảnh báo rằng núi lửa sắp phun trào." },
      { en: "With storm clouds gathering, rain seemed imminent.", vi: "Với mây bão đang kéo đến, mưa dường như sắp ập đến." },
    ],
    ieltsTip: "\"Imminent danger/threat\" là collocation hữu ích khi mô tả tình huống khẩn cấp trong Writing Task 2.",
    summary: "imminent = sắp xảy ra (thường mang tính đe doạ).",
  },
  {
    term: "pristine",
    ipa: "/ˈprɪstiːn/",
    pos: "adjective",
    usageNote: "mô tả thiên nhiên/môi trường còn nguyên vẹn, chưa bị con người tác động",
    en: "in its original condition; completely clean, unspoilt or new",
    vi: "nguyên sơ, chưa bị phá hoại",
    synonyms: ["unspoilt", "untouched"],
    antonyms: ["polluted", "spoilt"],
    examples: [
      { en: "The island is famous for its pristine beaches and clear water.", vi: "Hòn đảo nổi tiếng với những bãi biển nguyên sơ và làn nước trong vắt." },
      { en: "Development has destroyed much of the region's once pristine countryside.", vi: "Sự phát triển đã phá huỷ phần lớn vùng nông thôn từng nguyên sơ của khu vực." },
    ],
    ieltsTip: "\"Pristine beaches/countryside\" là collocation hữu ích khi mô tả tự nhiên trong Writing Task 2 về du lịch, môi trường.",
    summary: "pristine = nguyên sơ, chưa bị phá hoại (thiên nhiên, môi trường).",
  },
  {
    term: "capitalise (on)",
    ipa: "/ˈkæpɪtəlaɪz/",
    pos: "verb",
    usageNote: "dùng khi tận dụng một tình huống hay cơ hội để thu lợi",
    en: "to use a situation to your own advantage",
    vi: "tận dụng, khai thác (cơ hội)",
    synonyms: ["exploit", "take advantage of"],
    antonyms: ["waste", "miss"],
    examples: [
      { en: "The new resort plans to capitalise on the island's growing popularity.", vi: "Khu nghỉ dưỡng mới có kế hoạch tận dụng sự nổi tiếng ngày càng tăng của hòn đảo." },
      { en: "Local businesses capitalised on the surge in tourism after the film's release.", vi: "Các doanh nghiệp địa phương đã tận dụng sự gia tăng du lịch sau khi bộ phim ra mắt." },
    ],
    ieltsTip: "\"Capitalise on an opportunity\" là collocation nâng band, thay cho \"take advantage of\" trong Writing Task 2.",
    summary: "capitalise (on) = tận dụng, khai thác (một cơ hội, tình huống).",
  },
  {
    term: "renowned",
    ipa: "/rɪˈnaʊnd/",
    pos: "adjective",
    usageNote: "đi kèm giới từ \"for\" — mô tả điều gì đó nổi tiếng vì một phẩm chất cụ thể",
    en: "famous for something, especially a good quality",
    vi: "nổi tiếng, danh tiếng",
    synonyms: ["famous", "celebrated"],
    antonyms: ["unknown", "obscure"],
    examples: [
      { en: "The hotel chain is renowned for its luxurious setting.", vi: "Chuỗi khách sạn này nổi tiếng vì khung cảnh sang trọng." },
      { en: "She is renowned throughout the region for her hospitality.", vi: "Bà nổi tiếng khắp vùng vì lòng hiếu khách." },
    ],
    ieltsTip: "\"Renowned for\" đi kèm giới từ \"for\", không phải \"in\" hay \"with\" — lỗi phổ biến của người học.",
    summary: "renowned (for) = nổi tiếng, danh tiếng (vì điều gì đó).",
  },
  {
    term: "sparse",
    ipa: "/spɑːs/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó thưa thớt, phân bố rải rác trên một khu vực rộng",
    en: "only in small amounts or numbers, spread over a large area",
    vi: "thưa thớt, ít ỏi",
    synonyms: ["scarce", "scattered"],
    antonyms: ["dense", "abundant"],
    examples: [
      { en: "The restaurant was sparsely populated when we arrived early.", vi: "Nhà hàng khá thưa vắng khi chúng tôi đến sớm." },
      { en: "Population is sparse in the more remote parts of the country.", vi: "Dân số thưa thớt ở những vùng xa xôi hơn của đất nước." },
    ],
    ieltsTip: "\"Sparsely populated\" là collocation quen thuộc khi mô tả khu vực nông thôn, hẻo lánh trong Writing Task 1/2.",
    summary: "sparse = thưa thớt, ít ỏi (dân số, đồ vật...).",
  },
  {
    term: "pre-arranged",
    ipa: "/ˌpriːəˈreɪndʒd/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó đã được sắp xếp, lên kế hoạch từ trước, không phải ngẫu hứng",
    en: "planned or organised in advance",
    vi: "được sắp xếp/lên kế hoạch từ trước",
    synonyms: ["planned", "scheduled"],
    antonyms: ["spontaneous"],
    examples: [
      { en: "The only way to visit the island is on a pre-arranged package tour.", vi: "Cách duy nhất để đến thăm hòn đảo là qua một tour du lịch trọn gói đã sắp xếp trước." },
      { en: "We had a pre-arranged meeting time, so I couldn't be late.", vi: "Chúng tôi đã có thời gian hẹn gặp sắp xếp trước, nên tôi không thể đến muộn." },
    ],
    ieltsTip: "\"A pre-arranged tour/meeting\" hữu ích khi mô tả du lịch có kế hoạch trong Speaking Part 2.",
    summary: "pre-arranged = được sắp xếp/lên kế hoạch từ trước.",
  },
  {
    term: "backpacker",
    ipa: "/ˈbækpækə/",
    pos: "noun",
    usageNote: "chỉ người du lịch tự do, tiết kiệm chi phí, thường mang balo và đi trong thời gian dài",
    en: "a person who travels cheaply carrying their belongings in a backpack, usually for a long time",
    vi: "khách du lịch bụi (mang balo)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "The policy succeeds in keeping the backpacking hordes away.", vi: "Chính sách này thành công trong việc ngăn dòng khách du lịch bụi đông đảo." },
      { en: "Backpackers often prefer hostels to expensive hotels.", vi: "Khách du lịch bụi thường thích nhà nghỉ tập thể hơn là khách sạn đắt tiền." },
    ],
    ieltsTip: "\"Backpacker\" khác với \"tourist\" ở phong cách du lịch tiết kiệm, tự do — hữu ích khi so sánh loại hình du lịch trong Speaking Part 3.",
    summary: "backpacker = khách du lịch bụi, mang balo, đi tiết kiệm và dài ngày.",
  },
  {
    term: "mass tourism",
    ipa: "/mæs ˈtʊərɪzəm/",
    pos: "phrase",
    usageNote: "chỉ loại hình du lịch với số lượng khách rất lớn, thường bị coi là gây hại cho điểm đến",
    en: "tourism involving very large numbers of visitors, often seen as harmful to a place",
    vi: "du lịch đại chúng (số lượng lớn)",
    synonyms: [],
    antonyms: ["low-volume tourism"],
    examples: [
      { en: "Mass tourism has damaged the coral reefs surrounding the island.", vi: "Du lịch đại chúng đã làm hỏng các rạn san hô xung quanh hòn đảo." },
      { en: "The government wants to avoid the negative effects of mass tourism seen in neighbouring countries.", vi: "Chính phủ muốn tránh những tác động tiêu cực của du lịch đại chúng đã thấy ở các nước láng giềng." },
    ],
    ieltsTip: "\"The negative effects of mass tourism\" là chủ đề rất phổ biến trong Writing Task 2 về môi trường, du lịch.",
    summary: "mass tourism = du lịch đại chúng (lượng khách rất lớn, thường gây hại).",
  },
  {
    term: "tourist attraction",
    ipa: "/ˈtʊərɪst əˈtrækʃən/",
    pos: "phrase",
    usageNote: "chỉ địa điểm mà nhiều khách du lịch đến tham quan vì tính hấp dẫn của nó",
    en: "a place that many tourists visit because it is interesting",
    vi: "điểm thu hút khách du lịch",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Sydney has so many tourist attractions that travellers never feel bored there.", vi: "Sydney có rất nhiều điểm thu hút khách du lịch đến nỗi du khách không bao giờ thấy chán ở đó." },
      { en: "The new museum has become the city's top tourist attraction.", vi: "Bảo tàng mới đã trở thành điểm thu hút khách du lịch hàng đầu của thành phố." },
    ],
    ieltsTip: "\"A major/top tourist attraction\" là collocation cơ bản nhưng cần thiết khi viết về du lịch.",
    summary: "tourist attraction = điểm thu hút khách du lịch.",
  },
  {
    term: "travel restrictions",
    ipa: "/ˈtrævəl rɪˈstrɪkʃənz/",
    pos: "phrase",
    usageNote: "chỉ các quy định chính thức nhằm hạn chế việc đi lại, thường do chính phủ áp đặt",
    en: "official rules that limit where or how people can travel",
    vi: "hạn chế đi lại",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Travel restrictions were lifted once the number of visitors was under control.", vi: "Các hạn chế đi lại đã được dỡ bỏ khi số lượng du khách được kiểm soát." },
      { en: "The country imposed strict travel restrictions to protect its cultural identity.", vi: "Đất nước áp đặt các hạn chế đi lại nghiêm ngặt để bảo vệ bản sắc văn hoá của mình." },
    ],
    ieltsTip: "\"Impose/lift travel restrictions\" là collocation hữu ích khi bàn về chính sách du lịch trong Writing Task 2.",
    summary: "travel restrictions = các hạn chế/quy định về việc đi lại.",
  },
  {
    term: "deregulate",
    ipa: "/diːˈreɡjʊleɪt/",
    pos: "verb",
    usageNote: "dùng khi nhà nước bãi bỏ hoặc nới lỏng các quy định kiểm soát đối với một ngành",
    en: "to remove government rules and controls from an industry",
    vi: "bãi bỏ quy định (kiểm soát)",
    synonyms: [],
    antonyms: ["regulate"],
    examples: [
      { en: "Airlines were deregulated in the 1970s and 80s, allowing them to set their own fares.", vi: "Ngành hàng không đã được bãi bỏ quy định vào những năm 1970 và 80, cho phép các hãng tự đặt giá vé." },
      { en: "The government decided to deregulate the energy market.", vi: "Chính phủ quyết định bãi bỏ các quy định kiểm soát đối với thị trường năng lượng." },
    ],
    ieltsTip: "\"Deregulate an industry\" hữu ích khi bàn về vai trò của chính phủ trong nền kinh tế ở Writing Task 2.",
    summary: "deregulate = bãi bỏ/nới lỏng quy định kiểm soát của nhà nước.",
  },
  {
    term: "non-stop",
    ipa: "/ˌnɒnˈstɒp/",
    pos: "adjective",
    usageNote: "mô tả chuyến bay/chuyến đi không dừng lại giữa chừng",
    en: "without stopping; direct, without a break in the journey",
    vi: "không dừng, bay/đi thẳng",
    synonyms: ["direct"],
    antonyms: ["connecting"],
    examples: [
      { en: "Charles Lindbergh flew non-stop from New York to Paris in 1927.", vi: "Charles Lindbergh đã bay thẳng không dừng từ New York đến Paris năm 1927." },
      { en: "We took a non-stop flight to avoid a long layover.", vi: "Chúng tôi đã chọn chuyến bay thẳng để tránh phải quá cảnh lâu." },
    ],
    ieltsTip: "\"A non-stop flight\" trái nghĩa với \"a connecting flight\" — cặp từ hữu ích khi nói về du lịch hàng không.",
    summary: "non-stop = không dừng lại giữa chừng; trái nghĩa với 'connecting'.",
  },
  {
    term: "traffic-free",
    ipa: "/ˈtræfɪk friː/",
    pos: "adjective",
    usageNote: "tính từ ghép, mô tả khu vực không cho phép xe cộ qua lại, dành cho người đi bộ",
    en: "(of an area) with no vehicles allowed",
    vi: "không có xe cộ qua lại (khu vực dành cho người đi bộ)",
    synonyms: ["pedestrianised"],
    antonyms: [],
    examples: [
      { en: "There are no cars allowed on the island, so the area is completely traffic-free.", vi: "Không có ô tô nào được phép vào đảo, vì vậy khu vực này hoàn toàn không có xe cộ qua lại." },
      { en: "The city centre became traffic-free after the new pedestrian zone was introduced.", vi: "Trung tâm thành phố trở nên không còn xe cộ sau khi khu vực đi bộ mới được đưa vào sử dụng." },
    ],
    ieltsTip: "Tính từ ghép (compound adjective) như \"traffic-free\" luôn có gạch nối khi đứng trước danh từ.",
    summary: "traffic-free = không có xe cộ qua lại; ví dụ điển hình của tính từ ghép.",
  },
  {
    term: "world-renowned",
    ipa: "/wɜːld rɪˈnaʊnd/",
    pos: "adjective",
    usageNote: "tính từ ghép, mạnh và trang trọng hơn \"famous\", mô tả điều gì đó nổi tiếng khắp thế giới",
    en: "famous all over the world",
    vi: "nổi tiếng thế giới",
    synonyms: ["world-famous"],
    antonyms: [],
    examples: [
      { en: "The hotel chain is world-renowned for its luxurious setting.", vi: "Chuỗi khách sạn nổi tiếng thế giới vì khung cảnh sang trọng." },
      { en: "She trained under a world-renowned chef in Paris.", vi: "Cô ấy được đào tạo dưới sự hướng dẫn của một đầu bếp nổi tiếng thế giới ở Paris." },
    ],
    ieltsTip: "Tính từ ghép \"world-renowned\" mạnh và trang trọng hơn \"famous\" — dùng để nâng band trong Writing.",
    summary: "world-renowned = nổi tiếng thế giới.",
  },
  {
    term: "long-awaited",
    ipa: "/lɒŋ əˈweɪtɪd/",
    pos: "adjective",
    usageNote: "tính từ ghép, mô tả điều gì đó được mong chờ trong một thời gian dài",
    en: "that people have been waiting for a long time",
    vi: "được mong đợi từ lâu",
    synonyms: [],
    antonyms: ["unexpected"],
    examples: [
      { en: "We finally departed for our long-awaited holiday.", vi: "Cuối cùng chúng tôi cũng lên đường cho kỳ nghỉ đã mong đợi từ lâu." },
      { en: "The long-awaited sequel finally hit cinemas this year.", vi: "Phần phim tiếp theo được mong đợi từ lâu cuối cùng đã ra rạp năm nay." },
    ],
    ieltsTip: "\"A long-awaited event/trip\" là tính từ ghép hữu ích khi kể chuyện trong Speaking Part 2.",
    summary: "long-awaited = được mong đợi từ lâu.",
  },
  {
    term: "outweigh",
    ipa: "/aʊtˈweɪ/",
    pos: "verb",
    usageNote: "dùng khi so sánh, cho thấy điều gì đó lớn hơn/quan trọng hơn hẳn so với điều còn lại",
    en: "to be greater or more important than something else",
    vi: "vượt trội hơn, lớn hơn (so với cái khác)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "In my view, the benefits of tourism far outweigh the drawbacks.", vi: "Theo tôi, lợi ích của du lịch vượt trội hơn hẳn so với những hạn chế." },
      { en: "The risks of the project clearly outweigh its potential rewards.", vi: "Rủi ro của dự án rõ ràng lớn hơn so với lợi ích tiềm năng của nó." },
    ],
    ieltsTip: "\"The benefits outweigh the drawbacks\" là cấu trúc kết luận kinh điển cho dạng bài Writing Task 2 'advantages and disadvantages'.",
    summary: "outweigh = vượt trội hơn, lớn hơn (so với điều gì khác).",
  },
  {
    term: "resource",
    ipa: "/rɪˈsɔːs/",
    pos: "noun",
    usageNote: "chú ý chính tả — không có 2 chữ 's' liên tiếp như trong tiếng Pháp 'ressource'",
    en: "a supply of something useful or valuable, such as money, workers, or natural materials",
    vi: "tài nguyên, nguồn lực",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Tourism has become one of the country's most important resources.", vi: "Du lịch đã trở thành một trong những nguồn lực quan trọng nhất của đất nước." },
      { en: "Natural resources such as oil and gas are unevenly distributed around the world.", vi: "Các tài nguyên thiên nhiên như dầu và khí đốt được phân bố không đồng đều trên thế giới." },
    ],
    ieltsTip: "Chú ý chính tả \"resource\" (không phải \"ressource\") — lỗi rất phổ biến của người học.",
    summary: "resource = tài nguyên, nguồn lực.",
  },
  {
    term: "drawback",
    ipa: "/ˈdrɔːbæk/",
    pos: "noun",
    usageNote: "từ đồng nghĩa học thuật với \"disadvantage\", dùng để tránh lặp từ trong bài viết",
    en: "a disadvantage or problem that makes something less attractive",
    vi: "nhược điểm, hạn chế",
    synonyms: ["disadvantage", "downside"],
    antonyms: ["advantage", "benefit"],
    examples: [
      { en: "The main drawback of the policy is that it keeps ordinary travellers away.", vi: "Nhược điểm chính của chính sách này là nó khiến khách du lịch bình thường không thể đến được." },
      { en: "Despite its drawbacks, most people agree that tourism brings real economic benefits.", vi: "Dù có những hạn chế, hầu hết mọi người đồng ý rằng du lịch mang lại lợi ích kinh tế thực sự." },
    ],
    ieltsTip: "\"Drawback\" là từ đồng nghĩa học thuật với \"disadvantage\" — dùng luân phiên để tránh lặp từ trong Writing Task 2.",
    summary: "drawback = nhược điểm, hạn chế (của một sự việc, chính sách).",
  },
];

const track15Script = `The most memorable place I've ever visited was Bhutan. It's a really amazing place because it's in a very remote, mountainous area. So a lot of the buildings seem really precarious, they're sort of built into the mountainside and seem to just perch there. The accommodation is very traditional and you get the impression that nothing has changed there for hundreds of years. It's a really historic place and very rustic. Of course, that means the accommodation is pretty basic, but the place is altogether so charming that I didn't mind at all. As for the views, they were just spectacular. With the mountains all around it's a very dramatic landscape and the view from my room was breathtaking.`;

const track16Script = `This semester, we're going to be looking at the modern aviation industry here in the USA. But today I'd like to take a look at how it all began.

When Orville and Wilbur Wright flew history's first airplane in North Carolina in 1903, the significance of their new invention was of course not yet apparent. Twenty years later, by 1923, the first passenger planes did little to change that. The first of these were provided by some of the airmail services flying mail around the country. The US Post Office Department added a few seats for extra revenue, but their planes were noisy, cold and uncomfortable. They couldn't fly over mountains, so passengers took trains for part of their journey. Another problem was that these planes couldn't carry enough seats to make passenger traffic profitable. So the train was still the way to go.

In 1927, Charles Lindbergh's transatlantic flight captured America's imagination. Lindbergh flew in a small airplane for 33 hours from New York to Paris. Baseball games stopped, and radio announcers wept when his safe arrival in Paris was announced. Humans, who had always looked to the sky and stars with wonder, could now cross vast oceans with amazing speed by taking to the skies.

By the late 1930s, the airlines carried mail and passengers from coast to coast. The DC-3, a new airplane with powerful engines and an enclosed cabin, cut the cost of flying in half. It made airlines a profitable business. But at a cost of five cents per mile to transport one passenger, air travel was still expensive. Train travel cost only 1.3 cents per passenger mile and was still more comfortable. The average person usually couldn't afford to fly. But a whole class of people, businessmen who put a money value on their time could afford to fly on company expense accounts. And they did, in soaring numbers.

Further developments during World War Two sped the development of commercial aviation. Military airfields built during the war were afterwards sold to cities, which were eager to open their own commercial airports. Airplane manufacturers built new airplanes with pressurised and heated cabins. Suddenly, airplanes could fly above bad weather and mountains, where the air and thus the journeys were smoother. In 1940, three million Americans flew. By 1956, 55 million flew. In a country with a population of barely 150 million, large numbers of Americans were seeing the world from the air.

By the 1960s, passengers were still mostly business travellers on expense accounts, who flew on a regular basis. But in the 1970s and 1980s, a few visionary people began to open the skies to the average American with low fares. Since 1938, the federal government had strictly regulated airline fares and routes. In 1978, President Jimmy Carter deregulated the airlines. Airlines could now choose their own routes and fares. Air traffic figures soared from 205 million in 1975 before deregulation.`;

const UNIT_7_WAYS_AND_MEANS: CambridgeUnit = {
  unit: 7,
  slug: "ways-and-means",
  title: "Ways and means",
  topics: "Tourism, travel",
  testPractice: "Writing Task 1",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit7Vocab,
    },
    {
      kind: "sort",
      title: "Positive description or a challenge?",
      instructions: "Tap a word, then tap the idea it belongs with.",
      buckets: ["Positive description", "A challenge or control"],
      items: [
        { term: "pristine", bucket: 0 },
        { term: "renowned", bucket: 0 },
        { term: "world-renowned", bucket: 0 },
        { term: "traffic-free", bucket: 0 },
        { term: "tourist attraction", bucket: 0 },
        { term: "long-awaited", bucket: 0 },
        { term: "mass tourism", bucket: 1 },
        { term: "drawback", bucket: 1 },
        { term: "travel restrictions", bucket: 1 },
        { term: "deregulate", bucket: 1 },
        { term: "sparse", bucket: 1 },
        { term: "imminent", bucket: 1 },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Describing a memorable place",
      instructions: "Listen to someone describing a place they visited. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-15.mp3",
      template:
        "The speaker describes the most {{memorable}} place they've ever visited: a remote, mountainous area where the buildings seem {{precarious}}, built into the mountainside. The accommodation is very {{traditional}} and {{rustic}} — pretty basic, but charming. The views were {{spectacular}}, and the landscape was described as {{dramatic}}.",
      script: track15Script,
    },
    {
      kind: "listening_cloze",
      title: "A history of air travel",
      instructions: "Listen to a talk about the history of air travel in the USA. Complete the timeline with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-16.mp3",
      tip: "The wording in the notes paraphrases what you hear, but the answers come in the same order as the talk.",
      template:
        "1923 • {{Passenger}} planes were introduced, owned by the Post Office, which added a few {{seats}} to increase income. Planes couldn't cross {{mountains}}, so people made part of the journey by train.\n\n" +
        "1927 • Charles Lindbergh flew non-stop from New York to Paris. People were emotional on hearing about his {{safe arrival}} in the French capital.\n\n" +
        "Late 1930s • The DC-3 airplane cut costs, but train travel was still cheaper and more {{comfortable}}.\n\n" +
        "1940s • Events of the Second World War led to the growth of {{commercial aviation}}, with better {{cabins}} for travellers.\n\n" +
        "1960s • Only {{businessmen}} flew regularly.\n\n" +
        "1970s and 80s • Airlines were deregulated, so airlines could set their own {{routes}} and {{fares}} themselves.",
      script: track16Script,
    },
    {
      kind: "fill_mc",
      title: "Tourism and travel vocabulary in context",
      instructions: "Choose the word or phrase that best completes each sentence.",
      items: [
        { before: "There are no cars allowed on the island, so the area is completely", after: ".", options: ["traffic-free", "world-renowned", "long-awaited"], answer: "traffic-free" },
        { before: "The hotel chain is world-", after: "for its luxurious setting.", options: ["renowned", "sparse", "imminent"], answer: "renowned" },
        { before: "We finally departed for our", after: "holiday.", options: ["long-awaited", "non-stop", "traffic-free"], answer: "long-awaited" },
        { before: "Charles Lindbergh made a", after: "flight from New York to Paris.", options: ["non-stop", "long-awaited", "world-renowned"], answer: "non-stop" },
        { before: "Independent travellers on a low budget, often called", after: ", usually prefer hostels to expensive hotels.", options: ["backpackers", "tourists", "drawbacks"], answer: "backpackers" },
        { before: "", after: "has damaged the coral reefs surrounding the island.", options: ["Mass tourism", "Deregulation", "A drawback"], answer: "Mass tourism" },
        { before: "President Carter decided to", after: "the airline industry in 1978.", options: ["deregulate", "capitalise", "outweigh"], answer: "deregulate" },
        { before: "In my view, the benefits of tourism far", after: "the drawbacks.", options: ["outweigh", "capitalise", "deregulate"], answer: "outweigh" },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — a special trip",
      prompt: "Describe a special trip you have been on.",
      bullets: ["the place you visited", "the journey", "what you did there", "and explain why the trip was special to you"],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Remember the error warning for this unit: \"travel\" is only used as a noun in a general sense (travel broadens the mind); use \"trip\" for a journey or short stay, and \"journey\" for getting from one place to another. Try working in some of this unit's vocabulary (pristine, renowned, long-awaited...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "spend a lot of money", reveal: "spend heavily" },
        { prompt: "a set price plan", reveal: "a fixed daily package" },
        { prompt: "made too expensive for", reveal: "effectively priced out" },
        { prompt: "damage traditions", reveal: "erode traditions" },
        { prompt: "worry about outside influence", reveal: "anxiety about outside cultural influence" },
        { prompt: "hurt more than usual", reveal: "hurt the industry disproportionately" },
        { prompt: "feels like real adventure", reveal: "feeling closer to genuine exploration" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — the kingdom that limits its own tourists",
      passageTitle: "The kingdom that limits its own tourists",
      passage:
        "Most governments spend heavily to attract more foreign visitors. Bhutan, a small Himalayan kingdom wedged between India and China, has spent decades doing the opposite: deliberately keeping the number of tourists low.\n\n" +
        "Since the country first opened to foreign visitors in the 1970s, officials have required nearly every tourist to book through a licensed local operator, who arranges a fixed daily package covering accommodation, meals, a guide and transport. For years this package came with a minimum daily spend that effectively priced out casual backpackers, a policy officials openly describe as 'high-value, low-volume' tourism.\n\n" +
        "The reasoning behind the policy has as much to do with culture as with money. Bhutanese leaders have long worried that opening the country to mass tourism, as happened in some neighbouring destinations, would erode traditions that had survived for centuries — from a national dress code to the widespread practice of Buddhism. Television, now unremarkable across most of the world, was not permitted in Bhutan until 1999, a restriction driven by the same anxiety about outside cultural influence.\n\n" +
        "The policy has costs of its own. Guides and hotel owners depend on a small, wealthy pool of visitors rather than a larger and more forgiving base of tourists, so a single bad season can hurt the industry disproportionately. Younger Bhutanese, meanwhile, increasingly have access to smartphones and streaming video, so the cultural isolation the tourism policy was partly designed to protect is arriving through other channels regardless.\n\n" +
        "Even so, the approach has arguably delivered what it promised. Bhutan has largely avoided the crowded beaches, littered trails and diluted traditions visible in some of the region's most popular destinations, and travel writers routinely describe a visit there as feeling closer to genuine exploration than a typical package holiday. Whether that balance can hold as neighbouring economies grow and pressure to relax the rules increases remains an open question.",
      questions: [
        {
          text: "Most countries try to increase the number of tourists they receive.",
          answer: "True",
          justification: "Most governments spend heavily to attract more foreign visitors.",
        },
        {
          text: "Bhutan has always allowed foreign tourists to visit freely, without any restrictions.",
          answer: "False",
          justification: "Since opening in the 1970s, tourists have had to book through a licensed operator with a fixed package — not freely.",
        },
        {
          text: "The minimum daily spend was designed partly to discourage backpackers.",
          answer: "True",
          justification: "The minimum daily spend effectively priced out casual backpackers.",
        },
        {
          text: "Television was banned in Bhutan because the government could not afford the technology.",
          answer: "False",
          justification: "The restriction was driven by anxiety about outside cultural influence, not affordability.",
        },
        {
          text: "The tourism policy has no economic drawbacks for local businesses.",
          answer: "False",
          justification: "A single bad season can hurt the industry disproportionately.",
        },
        {
          text: "Young people in Bhutan are now being exposed to outside culture through smartphones and streaming video.",
          answer: "True",
          justification: "Younger Bhutanese increasingly have access to smartphones and streaming video.",
        },
        {
          text: "Bhutan's tourism policy has been officially abandoned in recent years.",
          answer: "Not given",
          justification: "The passage only raises whether the policy can hold in future — it does not say it has already been abandoned.",
        },
      ],
    },
    {
      kind: "writing_task",
      title: "Test practice — Writing Task 1",
      taskLabel: "Writing Task 1",
      prompt:
        "The pie charts below show the most common advantages and disadvantages of Fairmont Island, according to a survey of visitors. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chartCaption: "Survey of visitors to Fairmont Island",
      chartRows: [
        "Most common disadvantages — Weather: 20%, High cost of living: 45%, Entertainment: 30%, Food quality: 5%",
        "Most common advantages — The people: 40%, The scenery: 37%, Good accommodation: 11%, Culture: 12%",
      ],
      chart: {
        kind: "stackedBar",
        panels: [
          {
            title: "Most common disadvantages",
            series: [
              { key: "cost", label: "High cost of living" },
              { key: "entertainment", label: "Entertainment" },
              { key: "weather", label: "Weather" },
              { key: "food", label: "Food quality" },
            ],
            groups: [{ label: "Disadvantages", values: { weather: 20, cost: 45, entertainment: 30, food: 5 } }],
          },
          {
            title: "Most common advantages",
            series: [
              { key: "people", label: "The people" },
              { key: "scenery", label: "The scenery" },
              { key: "culture", label: "Culture" },
              { key: "accommodation", label: "Good accommodation" },
            ],
            groups: [{ label: "Advantages", values: { people: 40, scenery: 37, accommodation: 11, culture: 12 } }],
          },
        ],
      },
      minWords: 150,
      tip:
        "Show the examiner you can paraphrase the figures in the chart. Use phrases like 'just under half of', 'a third of' and 'a fifth of' instead of exact percentages. Remember not to repeat the words in the question too many times — use 'plus points' and 'benefits' in place of 'advantages', and 'drawbacks' or 'problems' in place of 'disadvantages'.",
      modelAnswer:
        "The two pie charts compare what visitors to Fairmont Island considered to be the island's main plus points and its main drawbacks.\n\n" +
        "Overall, high living costs were seen as the single biggest problem for visitors, while the local people were rated as the island's greatest asset.\n\n" +
        "Looking at the disadvantages first, almost half of the complaints (45%) were about the high cost of living on the island, making it by far the most commonly cited problem. Entertainment options were the second most frequent complaint, mentioned by 30% of visitors, followed by the weather at a fifth. Food quality was a relatively minor concern, accounting for just 5% of the complaints raised.\n\n" +
        "Turning to the advantages, two features stood out well above the others. Two-fifths of visitors named the local people as what they liked most about the island, closely followed by the scenery at just over a third. Good accommodation and culture were rated far less highly, at 11% and 12% respectively, together making up less than a quarter of the responses.\n\n" +
        "In summary, visitors appear to value Fairmont Island primarily for its people and natural beauty, while its practical shortcomings — particularly the expense of staying there — are what most commonly disappoint them.",
    },
  ],
};

const unit8Vocab: VocabWord[] = [
  {
    term: "mayor",
    ipa: "/ˈmeə/",
    pos: "noun",
    usageNote: "chỉ người đứng đầu chính quyền một thị trấn hoặc thành phố",
    en: "the person who leads the government of a town or city",
    vi: "thị trưởng",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Residents can raise local issues directly with the mayor's office.", vi: "Người dân có thể phản ánh các vấn đề địa phương trực tiếp với văn phòng thị trưởng." },
      { en: "The mayor was elected for a four-year term.", vi: "Thị trưởng được bầu với nhiệm kỳ bốn năm." },
    ],
    ieltsTip: "\"The mayor's office\" hữu ích khi mô tả chính quyền địa phương trong Writing Task 2 hoặc Listening Section 1.",
    summary: "mayor = thị trưởng (người đứng đầu một thị trấn/thành phố).",
  },
  {
    term: "bureaucrat",
    ipa: "/ˈbjʊərəkræt/",
    pos: "noun",
    usageNote: "thường mang sắc thái tiêu cực nhẹ, ngụ ý cứng nhắc, nhiều giấy tờ thủ tục",
    en: "an official who works for the government, especially one who follows rules very strictly",
    vi: "viên chức hành chính (thường mang sắc thái cứng nhắc)",
    synonyms: ["official"],
    antonyms: [],
    examples: [
      { en: "Critics say the plan was blocked by cautious bureaucrats.", vi: "Các nhà phê bình cho rằng kế hoạch đã bị chặn lại bởi các viên chức thận trọng." },
      { en: "A bureaucrat is an administrator who works for the government.", vi: "Bureaucrat là một nhà quản lý hành chính làm việc cho chính phủ." },
    ],
    ieltsTip: "Danh từ \"bureaucracy\" (bộ máy quan liêu) cùng gốc — hữu ích khi phê phán sự cồng kềnh của chính phủ trong Writing Task 2.",
    summary: "bureaucrat = viên chức hành chính; danh từ liên quan: bureaucracy.",
  },
  {
    term: "civil servant",
    ipa: "/ˈsɪvəl ˈsɜːvənt/",
    pos: "phrase",
    usageNote: "khác với chính trị gia — công chức làm việc lâu dài trong bộ máy nhà nước, không do bầu cử",
    en: "a person who works for the government (but not as a politician or in the military)",
    vi: "công chức",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Civil servants ensure that correct rules and regulations are put in place.", vi: "Công chức đảm bảo các quy tắc và quy định đúng đắn được thực thi." },
      { en: "She has worked as a civil servant in the tax department for over a decade.", vi: "Bà đã làm công chức tại cơ quan thuế hơn một thập kỷ." },
    ],
    ieltsTip: "\"Civil servant\" khác với \"politician\" — công chức không được bầu mà làm việc lâu dài trong bộ máy nhà nước.",
    summary: "civil servant = công chức (làm việc cho nhà nước, không phải chính trị gia).",
  },
  {
    term: "leader of the opposition",
    ipa: "/ˈliːdə əv ði ˌɒpəˈzɪʃən/",
    pos: "phrase",
    usageNote: "chỉ người đứng đầu đảng chính trị lớn nhất hiện không nắm quyền",
    en: "the person in charge of the biggest political party that is not currently in power",
    vi: "lãnh đạo phe đối lập",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "The leader of the opposition criticised the government's new tax policy.", vi: "Lãnh đạo phe đối lập đã chỉ trích chính sách thuế mới của chính phủ." },
      { en: "She became leader of the opposition after her party lost the election.", vi: "Bà trở thành lãnh đạo phe đối lập sau khi đảng của bà thua trong cuộc bầu cử." },
    ],
    ieltsTip: "Cụm từ chính trị hữu ích cho Speaking Part 3 khi bàn về hệ thống chính trị, bầu cử.",
    summary: "leader of the opposition = lãnh đạo phe đối lập (đảng lớn nhất không cầm quyền).",
  },
  {
    term: "mismanage",
    ipa: "/ˌmɪsˈmænɪdʒ/",
    pos: "verb",
    usageNote: "tiền tố 'mis-' + 'manage' — quản lý kém, xử lý sai một vấn đề hoặc nguồn lực",
    en: "to manage or organise something badly",
    vi: "quản lý kém, xử lý sai",
    synonyms: [],
    antonyms: ["manage well"],
    examples: [
      { en: "Critics accused the previous government of mismanaging the economy.", vi: "Các nhà phê bình cáo buộc chính phủ trước đã quản lý kém nền kinh tế." },
      { en: "The project failed because funds were badly mismanaged.", vi: "Dự án thất bại vì nguồn vốn bị quản lý sai nghiêm trọng." },
    ],
    ieltsTip: "Tiền tố \"mis-\" + \"manage\" = quản lý sai — rất hữu ích khi phê phán chính sách nhà nước trong Writing Task 2.",
    summary: "mismanage = quản lý kém, xử lý sai (một vấn đề, nguồn lực).",
  },
  {
    term: "misinform",
    ipa: "/ˌmɪsɪnˈfɔːm/",
    pos: "verb",
    usageNote: "dùng khi cung cấp thông tin sai, khiến người khác hiểu nhầm",
    en: "to give someone false or incorrect information",
    vi: "cung cấp thông tin sai, làm hiểu nhầm",
    synonyms: ["mislead"],
    antonyms: ["inform correctly"],
    examples: [
      { en: "Voters said they had been deliberately misinformed about the policy.", vi: "Cử tri cho biết họ đã bị cố tình cung cấp thông tin sai về chính sách này." },
      { en: "The report misinformed the public about the true cost of the project.", vi: "Bản báo cáo đã cung cấp thông tin sai cho công chúng về chi phí thực sự của dự án." },
    ],
    ieltsTip: "\"Misinform the public\" hữu ích khi bàn về vai trò của truyền thông, chính phủ trong Writing Task 2.",
    summary: "misinform = cung cấp thông tin sai, khiến ai đó hiểu nhầm.",
  },
  {
    term: "miscalculate",
    ipa: "/ˌmɪsˈkælkjʊleɪt/",
    pos: "verb",
    usageNote: "dùng khi tính toán sai hoặc ước lượng sai một con số hay tình huống",
    en: "to make a mistake when judging a situation or calculating a number",
    vi: "tính toán sai, ước lượng sai",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "The company miscalculated how much demand there would be for the product.", vi: "Công ty đã ước tính sai nhu cầu sẽ có đối với sản phẩm này." },
      { en: "Officials miscalculated the number of votes needed to win.", vi: "Các quan chức đã tính toán sai số phiếu cần thiết để giành chiến thắng." },
    ],
    ieltsTip: "\"Miscalculate the cost/risk/demand\" hữu ích khi phân tích sai lầm trong Writing Task 2 hoặc Speaking Part 3.",
    summary: "miscalculate = tính toán sai, ước lượng sai (con số, tình huống).",
  },
  {
    term: "misjudge",
    ipa: "/ˌmɪsˈdʒʌdʒ/",
    pos: "verb",
    usageNote: "dùng khi đánh giá sai về ai đó hoặc một tình huống nào đó",
    en: "to form a wrong opinion or judgement about someone or something",
    vi: "đánh giá sai",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "The government misjudged how the public would react to the new tax.", vi: "Chính phủ đã đánh giá sai phản ứng của công chúng đối với loại thuế mới." },
      { en: "I completely misjudged him — he turned out to be very reliable.", vi: "Tôi đã hoàn toàn đánh giá sai về anh ấy — hoá ra anh ấy rất đáng tin cậy." },
    ],
    ieltsTip: "\"Misjudge a situation/reaction\" hữu ích khi phân tích sai lầm trong chính sách hoặc quan hệ cá nhân.",
    summary: "misjudge = đánh giá sai (về ai đó, một tình huống).",
  },
  {
    term: "mistrust",
    ipa: "/ˌmɪsˈtrʌst/",
    pos: "verb",
    usageNote: "dùng khi không tin tưởng ai đó, thường vì từng có trải nghiệm xấu",
    en: "to have doubts about someone or something; a feeling of not trusting someone",
    vi: "không tin tưởng, nghi ngờ",
    synonyms: ["distrust", "suspicion"],
    antonyms: ["trust"],
    examples: [
      { en: "Many citizens mistrust politicians after years of broken promises.", vi: "Nhiều công dân không tin tưởng các chính trị gia sau nhiều năm lời hứa bị phá vỡ." },
      { en: "There is a deep mistrust of the government in some rural areas.", vi: "Có một sự nghi ngờ sâu sắc đối với chính phủ ở một số vùng nông thôn." },
    ],
    ieltsTip: "\"Mistrust of the government/media\" là chủ đề hay gặp trong Writing Task 2 về niềm tin xã hội.",
    summary: "mistrust = không tin tưởng, nghi ngờ (ai đó, tổ chức nào đó).",
  },
  {
    term: "entitled (to)",
    ipa: "/ɪnˈtaɪtəld/",
    pos: "adjective",
    usageNote: "mô tả việc có quyền hợp pháp được hưởng điều gì đó",
    en: "having the legal right to have or do something",
    vi: "có quyền được hưởng",
    synonyms: ["eligible"],
    antonyms: [],
    examples: [
      { en: "In some countries, citizens are entitled to free medical care.", vi: "Ở một số quốc gia, công dân có quyền được hưởng chăm sóc y tế miễn phí." },
      { en: "Employees are entitled to at least four weeks of paid leave a year.", vi: "Nhân viên có quyền được nghỉ phép có lương ít nhất bốn tuần một năm." },
    ],
    ieltsTip: "\"Be entitled to something\" là cấu trúc quan trọng khi bàn về quyền lợi công dân trong Writing Task 2.",
    summary: "entitled (to) = có quyền được hưởng (điều gì đó theo luật).",
  },
  {
    term: "take charge of",
    ipa: "/teɪk tʃɑːdʒ əv/",
    pos: "phrase",
    usageNote: "dùng khi đảm nhận trách nhiệm quản lý, điều hành một việc gì đó",
    en: "to take control of or responsibility for something",
    vi: "đảm nhận, chịu trách nhiệm điều hành",
    synonyms: ["take control of"],
    antonyms: [],
    examples: [
      { en: "The government needs to take charge of the current economic problems.", vi: "Chính phủ cần đảm nhận trách nhiệm giải quyết các vấn đề kinh tế hiện tại." },
      { en: "She took charge of the project after the previous manager resigned.", vi: "Cô ấy đã đảm nhận điều hành dự án sau khi người quản lý trước từ chức." },
    ],
    ieltsTip: "\"Take charge of / take control of / be responsible for\" là nhóm cụm từ đồng nghĩa hữu ích để tránh lặp từ trong Writing Task 2.",
    summary: "take charge of = đảm nhận, chịu trách nhiệm điều hành (một việc, vấn đề).",
  },
  {
    term: "welfare state",
    ipa: "/ˈwelfeə steɪt/",
    pos: "phrase",
    usageNote: "chỉ mô hình trong đó nhà nước dùng thuế để đảm bảo phúc lợi kinh tế, xã hội cho công dân",
    en: "a system in which the government uses taxes to provide for the economic and social well-being of its citizens",
    vi: "nhà nước phúc lợi",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "The modern welfare state in the UK developed during the late 19th and 20th centuries.", vi: "Nhà nước phúc lợi hiện đại ở Anh phát triển vào cuối thế kỷ 19 và 20." },
      { en: "Supporters argue that a strong welfare state reduces poverty and inequality.", vi: "Những người ủng hộ cho rằng một nhà nước phúc lợi mạnh mẽ giúp giảm nghèo đói và bất bình đẳng." },
    ],
    ieltsTip: "\"The welfare state\" là chủ đề kinh điển trong Writing Task 2 về vai trò của chính phủ.",
    summary: "welfare state = nhà nước phúc lợi (dùng thuế đảm bảo an sinh cho công dân).",
  },
  {
    term: "safety net",
    ipa: "/ˈseɪfti net/",
    pos: "phrase",
    usageNote: "ẩn dụ chỉ hệ thống hỗ trợ những người gặp khó khăn, đặc biệt về kinh tế",
    en: "a system that provides help to people in difficulty, especially financial difficulty",
    vi: "mạng lưới an sinh (bảo vệ người khó khăn)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Welfare can create a safety net through the provision of social services.", vi: "Phúc lợi có thể tạo ra một mạng lưới an sinh thông qua việc cung cấp các dịch vụ xã hội." },
      { en: "Unemployment benefit acts as a safety net for people who lose their jobs.", vi: "Trợ cấp thất nghiệp đóng vai trò như một mạng lưới an sinh cho những người mất việc." },
    ],
    ieltsTip: "\"A safety net\" là ẩn dụ phổ biến khi mô tả hệ thống phúc lợi xã hội trong Writing Task 2.",
    summary: "safety net = mạng lưới an sinh, hệ thống bảo vệ người gặp khó khăn.",
  },
  {
    term: "empower",
    ipa: "/ɪmˈpaʊə/",
    pos: "verb",
    usageNote: "dùng khi trao quyền hoặc khả năng để ai đó tự kiểm soát cuộc sống của mình tốt hơn",
    en: "to give someone more control over their own life or situation",
    vi: "trao quyền, tăng quyền tự chủ",
    synonyms: [],
    antonyms: ["disempower"],
    examples: [
      { en: "A welfare state can empower its citizens and directly affect their well-being.", vi: "Một nhà nước phúc lợi có thể trao quyền cho công dân và trực tiếp ảnh hưởng đến phúc lợi của họ." },
      { en: "Education empowers people to make informed decisions about their future.", vi: "Giáo dục trao quyền cho con người để đưa ra quyết định sáng suốt về tương lai của mình." },
    ],
    ieltsTip: "\"Empower citizens/women/communities\" là collocation nâng band trong Writing Task 2 về xã hội, giáo dục.",
    summary: "empower = trao quyền, tăng khả năng tự chủ cho ai đó.",
  },
  {
    term: "autonomy",
    ipa: "/ɔːˈtɒnəmi/",
    pos: "noun",
    usageNote: "chỉ quyền tự quyết, khả năng tự đưa ra quyết định mà không bị người khác kiểm soát",
    en: "the freedom to govern yourself or control your own affairs",
    vi: "quyền tự chủ, tự quyết",
    synonyms: ["independence", "self-governance"],
    antonyms: ["dependence"],
    examples: [
      { en: "Welfare provisions can directly affect a citizen's personal autonomy.", vi: "Các chính sách phúc lợi có thể ảnh hưởng trực tiếp đến quyền tự chủ cá nhân của công dân." },
      { en: "The region was granted greater autonomy to make its own laws.", vi: "Khu vực này được trao quyền tự chủ lớn hơn để tự ban hành luật của mình." },
    ],
    ieltsTip: "\"Personal/regional autonomy\" hữu ích khi bàn về quyền tự do cá nhân hoặc chính trị trong Writing Task 2.",
    summary: "autonomy = quyền tự chủ, tự quyết (cá nhân hoặc khu vực).",
  },
  {
    term: "equitable",
    ipa: "/ˈekwɪtəbəl/",
    pos: "adjective",
    usageNote: "mô tả sự đối xử công bằng, hợp lý với mọi người trong phân phối nguồn lực",
    en: "fair and reasonable in a way that gives equal treatment to everyone",
    vi: "công bằng, bình đẳng",
    synonyms: ["fair", "just"],
    antonyms: ["unfair", "inequitable"],
    examples: [
      { en: "A welfare state is based on the notion of equitable distribution of wealth.", vi: "Nhà nước phúc lợi dựa trên quan niệm về sự phân phối của cải công bằng." },
      { en: "The new policy aims for a more equitable sharing of resources.", vi: "Chính sách mới nhằm mục đích chia sẻ nguồn lực công bằng hơn." },
    ],
    ieltsTip: "\"Equitable distribution\" là collocation học thuật, hữu ích khi bàn về bất bình đẳng trong Writing Task 2.",
    summary: "equitable = công bằng, bình đẳng (trong phân phối, đối xử).",
  },
  {
    term: "taxation",
    ipa: "/tækˈseɪʃən/",
    pos: "noun",
    usageNote: "chỉ hệ thống thu thuế của nhà nước từ người dân và doanh nghiệp",
    en: "the system by which a government collects money from people and businesses",
    vi: "hệ thống thuế, việc đánh thuế",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "A welfare state is a taxation system that allows the state to provide for its citizens.", vi: "Nhà nước phúc lợi là một hệ thống thuế cho phép nhà nước chăm lo cho công dân của mình." },
      { en: "Higher taxation on the wealthy could help fund public services.", vi: "Đánh thuế cao hơn đối với người giàu có thể giúp tài trợ cho các dịch vụ công." },
    ],
    ieltsTip: "\"A taxation system\" hữu ích khi mở bài Writing Task 2 về chủ đề chính phủ, kinh tế.",
    summary: "taxation = hệ thống thuế, việc đánh thuế của nhà nước.",
  },
  {
    term: "non-government organisation (NGO)",
    ipa: "/nɒn ˈɡʌvənmənt ˌɔːɡənaɪˈzeɪʃən/",
    pos: "phrase",
    usageNote: "viết tắt phổ biến là NGO — tổ chức hoạt động độc lập với chính phủ, thường vì mục đích xã hội",
    en: "an organisation that works independently of any government, usually to help people or protect the environment",
    vi: "tổ chức phi chính phủ (NGO)",
    synonyms: ["charity"],
    antonyms: [],
    examples: [
      { en: "Non-government organisations became important providers of social services after the war.", vi: "Các tổ chức phi chính phủ trở thành những đơn vị cung cấp dịch vụ xã hội quan trọng sau chiến tranh." },
      { en: "Several NGOs are working together to provide clean water in the region.", vi: "Một số tổ chức phi chính phủ đang phối hợp cung cấp nước sạch cho khu vực này." },
    ],
    ieltsTip: "Viết tắt \"NGO\" rất phổ biến trong bài đọc/Writing Task 2 về phát triển xã hội, từ thiện.",
    summary: "non-government organisation (NGO) = tổ chức phi chính phủ.",
  },
];

const track17Script = `Employee: Good morning, Havenpool Borough Council. How can I help you?

Mrs Smith: Hello, my name's Jenny Smith and I'm just ringing to report a few problems in my local area.

Employee: Oh, what problems are those?

Mrs Smith: Well, the first one is the shop next door to my house. It's been vacant for about a year now and it's falling into disrepair. Quite a few of the windows are broken.

Employee: I see. Well, I'm afraid that's not our responsibility here at the council. It would be up to the owner.

Mrs Smith: I understand that, but I've contacted the owner several times and he refuses to do anything about it.

Employee: Right, well, that's a different matter. In that case, you need to talk to the community officer. She deals with issues like that. Her name's Hilary Sharpe. I can put you through to her if you like.

Mrs Smith: Wonderful. Can you spell her name for me?

Employee: Yes, it's H.I.L.A.R.Y, Hilary, S.H.A.R.P.E, Sharpe.

Mrs Smith: Got that. Now, before you transfer me, there were a few other problems. The next one's to do with the cliff above South Sands beach. I watched some children playing there the other day and I think it's really dangerous. It needs some sort of warning sign at least.

Employee: Well, that's the sort of thing you need to approach the mayor about. You should talk to Lynne Denton first. That's L.Y. double N.E, and the surname is D.E.N.T.O.N. She's the mayor's secretary.

Mrs Smith: Great, I'll get on to her straight away. Do you have her phone number?

Employee: Yes, it's 3567, triple 9,4.

Mrs Smith: Got that. Now, the final problem is a road repair. Over the past year, Bramhurst Road has developed big potholes all over the place. Can anything be done about it?

Employee: I'm afraid we have no control over that. You'd need to talk to John Marsden's office.

Mrs Smith: He's our Member of Parliament, isn't he?

Employee: That's right and you can ...`;

const UNIT_8_STATE_CONTROL: CambridgeUnit = {
  unit: 8,
  slug: "state-control",
  title: "State control",
  topics: "Government, society",
  testPractice: "Writing Task 2",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit8Vocab,
    },
    {
      kind: "sort",
      title: "Government role or citizen concept?",
      instructions: "Tap a word, then tap the idea it belongs with.",
      buckets: ["Government role", "Citizen concept"],
      items: [
        { term: "mayor", bucket: 0 },
        { term: "bureaucrat", bucket: 0 },
        { term: "civil servant", bucket: 0 },
        { term: "leader of the opposition", bucket: 0 },
        { term: "taxation", bucket: 0 },
        { term: "welfare state", bucket: 0 },
        { term: "entitled (to)", bucket: 1 },
        { term: "safety net", bucket: 1 },
        { term: "empower", bucket: 1 },
        { term: "autonomy", bucket: 1 },
        { term: "equitable", bucket: 1 },
        { term: "non-government organisation (NGO)", bucket: 1 },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Reporting local problems",
      instructions: "Listen to a telephone conversation with a local council. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-17.mp3",
      tip: "IELTS Listening Section 1 often contains a number and/or a name you need to write. Look at the questions before you listen to see which need a number or a name.",
      template:
        "Problem: a broken shop {{window}} — Who to contact: the {{community}} officer, named {{Hilary Sharpe}}\n\n" +
        "Problem: a dangerous cliff — Who to contact: {{Lynne Denton}} (secretary of the {{mayor}}), tel: {{3567 9994}}\n\n" +
        "Problem: potholes — a road {{repair}} needed on Bramhurst Road — Who to contact: John Marsden, the local {{Member of Parliament}}",
      script: track17Script,
    },
    {
      kind: "fill_mc",
      title: "The 'mis-' prefix",
      instructions: "Choose the correct 'mis-' verb for each sentence.",
      items: [
        { before: "A government might", after: "the economy by spending far more than it earns.", options: ["mismanage", "misinform", "mistrust"], answer: "mismanage" },
        { before: "Officials were accused of trying to", after: "the public about the true cost of the project.", options: ["misinform", "mismanage", "misjudge"], answer: "misinform" },
        { before: "The company", after: "how much demand there would be for the new product.", options: ["miscalculated", "misinformed", "mistrusted"], answer: "miscalculated" },
        { before: "The government badly", after: "how the public would react to the new tax.", options: ["misjudged", "miscalculated", "misinformed"], answer: "misjudged" },
        { before: "Many citizens", after: "politicians after years of broken promises.", options: ["mistrust", "misjudge", "mismanage"], answer: "mistrust" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Rights and responsibilities",
      instructions: "Choose the word or phrase that best completes each sentence.",
      items: [
        { before: "In some countries, citizens are", after: "free healthcare.", options: ["entitled to", "empowered by", "responsible for"], answer: "entitled to" },
        { before: "The government needs to", after: "the current economic problems.", options: ["take charge of", "be entitled to", "empower"], answer: "take charge of" },
        { before: "Unemployment benefit acts as a", after: "for people who lose their jobs.", options: ["safety net", "welfare state", "taxation system"], answer: "safety net" },
        { before: "Education can", after: "people to make informed decisions about their future.", options: ["empower", "entitle", "mismanage"], answer: "empower" },
        { before: "Supporters argue that a strong", after: "reduces poverty and inequality.", options: ["welfare state", "safety net", "civil servant"], answer: "welfare state" },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — a change you'd like to see",
      prompt: "Describe a change you would like the government to make in your country.",
      bullets: [
        "what the change would be",
        "why it is needed",
        "who would benefit from it",
        "and explain how likely you think this change is to happen",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"Should governments be more involved in people's lives, or less?\" — think about how you'd answer that too. Try working in some of this unit's vocabulary (welfare state, autonomy, take charge of...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "a general idea, not one policy", reveal: "a broad principle" },
        { prompt: "in the worst situations only", reveal: "only catches people in the direst circumstances" },
        { prompt: "much older than people think", reveal: "far older than most people realise" },
        { prompt: "a basic right", reveal: "a fundamental entitlement" },
        { prompt: "stepped in to help", reveal: "stepped in to provide services the state could not yet manage" },
        { prompt: "discourages people from working", reveal: "can discourage work" },
        { prompt: "fair society", reveal: "a more stable, equitable society" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — the idea behind the welfare state",
      passageTitle: "The idea behind the welfare state",
      passage:
        "A welfare state is best understood not as a single policy but as a broad principle: that a government, funded through taxation, bears some responsibility for the basic economic and social well-being of its citizens. In practice, this principle can be implemented in very different ways, from a minimal safety net that only catches people in the direst circumstances, to a much larger system in which healthcare, education, unemployment support and pensions are treated as rights available to everyone regardless of income.\n\n" +
        "The concept is often assumed to be a purely modern invention, but forms of state-provided welfare are far older than most people realise. The Roman Empire granted pensions to soldiers who completed their military service, recognising, in a limited way, an obligation to those who had served the state. What changed in the industrialised world of the late nineteenth and twentieth centuries was the scale and ambition of these systems, as governments began offering support to far wider sections of the population, well beyond those who had served in an army.\n\n" +
        "Two broad philosophies tend to divide how welfare states are designed. One treats welfare as a fundamental entitlement: every citizen has a right to a basic standard of living, and the state exists partly to guarantee it. The other treats welfare more narrowly, as a safety net intended to catch those who cannot support themselves, while leaving as much provision as possible to individuals, employers, and private markets.\n\n" +
        "Non-government organisations have often filled the gaps between these two positions. Particularly after major conflicts, when state resources were stretched thin and public systems were still developing, charities and other independent organisations stepped in to provide services the state could not yet manage on its own — a role many continue to play today, even in countries with well-established welfare systems.\n\n" +
        "Critics of extensive welfare states argue that high taxation to fund such systems can discourage work and economic growth, and that state bureaucracies inevitably mismanage some of the resources they are given. Supporters counter that a well-designed welfare state does not just help individuals; it also creates a more stable, equitable society that ultimately benefits the economy as a whole.",
      questions: [
        {
          text: "All welfare states operate in exactly the same way.",
          answer: "False",
          justification: "The principle can be implemented in very different ways.",
        },
        {
          text: "The idea of state-provided welfare only began in the twentieth century.",
          answer: "False",
          justification: "The Roman Empire granted pensions to soldiers, so the idea is much older.",
        },
        {
          text: "In the Roman Empire, pensions were available to every citizen.",
          answer: "Not given",
          justification: "The passage only mentions pensions for soldiers, not whether other citizens received them.",
        },
        {
          text: "One approach to welfare treats basic living standards as a right for every citizen.",
          answer: "True",
          justification: "One treats welfare as a fundamental entitlement — every citizen has a right to a basic standard of living.",
        },
        {
          text: "Non-government organisations have never played a role in providing welfare services.",
          answer: "False",
          justification: "Charities and other independent organisations stepped in to provide services the state could not yet manage.",
        },
        {
          text: "Critics argue that high taxation for welfare can reduce people's motivation to work.",
          answer: "True",
          justification: "Critics argue that high taxation can discourage work and economic growth.",
        },
        {
          text: "Supporters of extensive welfare states believe such systems have no benefit for the economy.",
          answer: "False",
          justification: "Supporters counter that it ultimately benefits the economy as a whole.",
        },
      ],
    },
    {
      kind: "writing_task",
      title: "Test practice — Writing Task 2",
      taskLabel: "Writing Task 2",
      prompt:
        "All education and healthcare should be funded by the government and free for everyone. To what extent do you agree or disagree with this opinion? Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      tip:
        "The most common mistakes of candidates who achieve Band Score 6 are: missing out the, a, an, their, it's; and misspelling their, government, environment, which, until, believe, nowadays. If you want to achieve higher than Band Score 6, check your essay carefully for mistakes like these when you finish.",
      modelAnswer:
        "Whether the state should pay for all education and healthcare is one of the most enduring debates in modern politics, and I believe the right answer lies somewhere between the two extremes rather than at either end of them.\n\n" +
        "There are strong arguments in favour of full state funding. Both education and healthcare are basic needs rather than luxuries, and making them dependent on a family's income risks creating a society in which poorer citizens receive worse schooling and worse medical care simply because they cannot pay. Countries with free, universal healthcare systems often report better overall public health outcomes than countries where access depends heavily on private insurance, partly because problems are treated earlier rather than being ignored until they become expensive emergencies.\n\n" +
        "However, funding every aspect of education and healthcare entirely through taxation is not without serious costs. Governments have limited budgets, and money spent on completely free provision for everyone, including those who could easily afford to pay, is money that cannot be spent on improving quality for those most in need. In many countries, a mixed system — where the state guarantees free access to essential services while allowing people who want additional options, such as private hospital rooms or specialist tutoring, to pay for them — appears to deliver good basic standards without exhausting public resources.\n\n" +
        "In conclusion, I partly agree with the statement. Government funding should guarantee that no one is denied essential education or healthcare because of their financial situation, but I do not believe every single aspect of these services needs to be free for every citizen, including those who are able and willing to pay for extra provision.",
    },
  ],
};

const unit9Vocab: VocabWord[] = [
  {
    term: "appalling",
    ipa: "/əˈpɔːlɪŋ/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó tệ hại đến mức gây sốc, khiến người ta khó chịu mạnh",
    en: "extremely bad or unpleasant, causing shock or disgust",
    vi: "kinh khủng, gây sốc",
    synonyms: ["shocking", "dreadful"],
    antonyms: ["wonderful"],
    examples: [
      { en: "Some people find it appalling that hens are kept in such small cages.", vi: "Một số người thấy kinh khủng khi gà mái bị nhốt trong những chiếc lồng nhỏ như vậy." },
      { en: "The living conditions in the old factory were appalling.", vi: "Điều kiện sống trong nhà máy cũ thật kinh khủng." },
    ],
    ieltsTip: "\"Appalling conditions\" hữu ích khi phê phán điều kiện sống/làm việc tồi tệ trong Writing Task 2.",
    summary: "appalling = kinh khủng, gây sốc vì tệ hại.",
  },
  {
    term: "distressing",
    ipa: "/dɪˈstresɪŋ/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó gây đau buồn, khó chịu về mặt cảm xúc",
    en: "making you feel very upset or worried",
    vi: "gây đau buồn, khó chịu",
    synonyms: ["upsetting"],
    antonyms: ["comforting"],
    examples: [
      { en: "She found the images of caged animals being tested on quite distressing.", vi: "Cô ấy thấy những hình ảnh động vật bị nhốt lồng để thí nghiệm khá đau lòng." },
      { en: "It was distressing to see the effects of the drought on local farmers.", vi: "Thật đau lòng khi chứng kiến tác động của hạn hán đối với nông dân địa phương." },
    ],
    ieltsTip: "\"Find something distressing\" là cấu trúc tự nhiên khi nêu cảm xúc cá nhân trong Speaking Part 3.",
    summary: "distressing = gây đau buồn, khó chịu về mặt cảm xúc.",
  },
  {
    term: "hypocritical",
    ipa: "/ˌhɪpəˈkrɪtɪkəl/",
    pos: "adjective",
    usageNote: "mô tả sự không nhất quán giữa lời nói và hành động của một người",
    en: "behaving in a way that does not match your stated beliefs",
    vi: "giả dối, đạo đức giả",
    synonyms: [],
    antonyms: ["sincere", "genuine"],
    examples: [
      { en: "I think it would be hypocritical of me to insist on animal rights while eating meat.", vi: "Tôi nghĩ sẽ là giả dối nếu tôi khăng khăng đòi quyền động vật trong khi vẫn ăn thịt." },
      { en: "Critics called the politician hypocritical for flying private jets while urging others to cut emissions.", vi: "Các nhà phê bình gọi chính trị gia này là đạo đức giả vì đi máy bay riêng trong khi kêu gọi người khác giảm khí thải." },
    ],
    ieltsTip: "Danh từ \"hypocrisy\" (sự giả dối) cùng gốc — hữu ích khi phê phán sự thiếu nhất quán trong Writing Task 2.",
    summary: "hypocritical = giả dối, nói một đằng làm một nẻo; danh từ: hypocrisy.",
  },
  {
    term: "impartial",
    ipa: "/ɪmˈpɑːʃəl/",
    pos: "adjective",
    usageNote: "mô tả thái độ không thiên vị, không ngả về bên nào",
    en: "not supporting one person or side more than another; fair",
    vi: "không thiên vị, trung lập",
    synonyms: ["objective", "neutral"],
    antonyms: ["biased"],
    examples: [
      { en: "He said he was pretty impartial when it comes to animals.", vi: "Anh ấy nói rằng mình khá trung lập khi nói đến vấn đề động vật." },
      { en: "Judges are expected to remain impartial throughout the trial.", vi: "Thẩm phán được kỳ vọng luôn giữ thái độ không thiên vị trong suốt phiên toà." },
    ],
    ieltsTip: "\"Remain impartial\" hữu ích khi mô tả tính khách quan trong Writing Task 2 hoặc Speaking Part 3.",
    summary: "impartial = không thiên vị, trung lập; đồng nghĩa với 'objective'.",
  },
  {
    term: "irresponsible",
    ipa: "/ˌɪrɪˈspɒnsəbəl/",
    pos: "adjective",
    usageNote: "mô tả hành vi thiếu trách nhiệm, không cân nhắc hậu quả",
    en: "not thinking about the effects of your actions on other people or things",
    vi: "thiếu trách nhiệm",
    synonyms: ["reckless"],
    antonyms: ["responsible"],
    examples: [
      { en: "It's irresponsible to carry on causing environmental damage that makes animals suffer.", vi: "Thật thiếu trách nhiệm khi tiếp tục gây ra thiệt hại môi trường khiến động vật phải chịu đau khổ." },
      { en: "Leaving young children unsupervised near water is extremely irresponsible.", vi: "Để trẻ nhỏ không có người giám sát gần nước là vô cùng thiếu trách nhiệm." },
    ],
    ieltsTip: "\"Irresponsible behaviour\" hữu ích khi phê phán hành vi cá nhân hoặc doanh nghiệp trong Writing Task 2.",
    summary: "irresponsible = thiếu trách nhiệm, không cân nhắc hậu quả.",
  },
  {
    term: "outrageous",
    ipa: "/aʊtˈreɪdʒəs/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó quá đáng, gây phẫn nộ vì bất công hoặc vô lý",
    en: "very shocking and unacceptable",
    vi: "quá đáng, gây phẫn nộ",
    synonyms: ["scandalous"],
    antonyms: ["acceptable"],
    examples: [
      { en: "It's even more outrageous when all this research is done for cosmetics.", vi: "Càng đáng phẫn nộ hơn khi tất cả nghiên cứu này được thực hiện vì mục đích mỹ phẩm." },
      { en: "Many viewers were outraged by the outrageous prices charged for basic tickets.", vi: "Nhiều khán giả đã phẫn nộ trước mức giá vé cơ bản quá đáng." },
    ],
    ieltsTip: "\"Outrageous\" mạnh hơn \"unfair\" — dùng khi muốn nhấn mạnh cảm xúc phẫn nộ trong Speaking Part 3.",
    summary: "outrageous = quá đáng, gây phẫn nộ (vì bất công, vô lý).",
  },
  {
    term: "demise",
    ipa: "/dɪˈmaɪz/",
    pos: "noun",
    usageNote: "từ trang trọng, chỉ sự kết thúc hoặc biến mất của một sự vật, xu hướng hay loài",
    en: "the end or failure of something",
    vi: "sự kết thúc, biến mất",
    synonyms: ["end", "downfall"],
    antonyms: ["rise", "emergence"],
    examples: [
      { en: "It was the demise of the dinosaurs that let mammals flourish.", vi: "Chính sự biến mất của loài khủng long đã giúp các loài động vật có vú phát triển mạnh." },
      { en: "Many experts predicted the demise of print newspapers years ago.", vi: "Nhiều chuyên gia đã dự đoán về sự suy tàn của báo in nhiều năm trước." },
    ],
    ieltsTip: "\"The demise of\" là từ trang trọng, hữu ích để thay cho \"the end of\" trong Writing Task 2.",
    summary: "demise = sự kết thúc, biến mất (trang trọng); trái nghĩa với 'emergence'.",
  },
  {
    term: "flourish",
    ipa: "/ˈflʌrɪʃ/",
    pos: "verb",
    usageNote: "dùng khi điều gì đó phát triển mạnh mẽ, khoẻ mạnh theo hướng tích cực",
    en: "to develop successfully; to grow or increase in a healthy way",
    vi: "phát triển mạnh mẽ, thịnh vượng",
    synonyms: ["thrive", "prosper"],
    antonyms: ["decline", "wither"],
    examples: [
      { en: "Mammals began to flourish after the extinction of the dinosaurs.", vi: "Các loài động vật có vú bắt đầu phát triển mạnh mẽ sau khi khủng long tuyệt chủng." },
      { en: "Small businesses flourished in the years after the reforms.", vi: "Các doanh nghiệp nhỏ đã phát triển mạnh trong những năm sau cải cách." },
    ],
    ieltsTip: "\"Flourish\" là từ đồng nghĩa học thuật với \"thrive\" — hữu ích để đa dạng hoá từ vựng trong Writing.",
    summary: "flourish = phát triển mạnh mẽ, thịnh vượng; trái nghĩa với 'decline'.",
  },
  {
    term: "emerge",
    ipa: "/ɪˈmɜːdʒ/",
    pos: "verb",
    usageNote: "dùng khi điều gì đó xuất hiện hoặc trở nên rõ ràng, thường sau một quá trình",
    en: "to appear or become known, especially after being hidden",
    vi: "xuất hiện, nổi lên",
    synonyms: ["appear", "arise"],
    antonyms: ["disappear"],
    examples: [
      { en: "Humans emerged as a distinct species millions of years after mammals began to flourish.", vi: "Loài người xuất hiện như một loài riêng biệt hàng triệu năm sau khi động vật có vú bắt đầu phát triển mạnh." },
      { en: "New evidence has emerged that could change our understanding of the event.", vi: "Bằng chứng mới đã xuất hiện có thể thay đổi hiểu biết của chúng ta về sự kiện này." },
    ],
    ieltsTip: "\"Emerge as\" hữu ích khi mô tả sự xuất hiện của xu hướng/loài mới trong bài đọc khoa học.",
    summary: "emerge = xuất hiện, nổi lên (sau một quá trình).",
  },
  {
    term: "brink",
    ipa: "/brɪŋk/",
    pos: "noun",
    usageNote: "luôn đi với \"on the brink of\" — chỉ ranh giới ngay trước khi điều gì đó (thường xấu) xảy ra",
    en: "the point just before something, usually bad, happens",
    vi: "bờ vực, ranh giới (sắp xảy ra điều gì)",
    synonyms: ["verge"],
    antonyms: [],
    examples: [
      { en: "The world is on the brink of another mass extinction.", vi: "Thế giới đang đứng trước bờ vực của một cuộc đại tuyệt chủng khác." },
      { en: "The company was on the brink of bankruptcy before the merger.", vi: "Công ty đã đứng trước bờ vực phá sản trước khi sáp nhập." },
    ],
    ieltsTip: "\"On the brink of\" luôn theo sau bởi danh từ (extinction, collapse, war) — cấu trúc trang trọng cho Writing Task 2.",
    summary: "brink = bờ vực; luôn dùng trong cụm 'on the brink of'.",
  },
  {
    term: "rival",
    ipa: "/ˈraɪvəl/",
    pos: "verb",
    usageNote: "dùng khi so sánh, cho thấy điều gì đó có thể sánh ngang về mức độ hoặc quy mô",
    en: "to be as good, impressive, or serious as something else",
    vi: "sánh ngang, có thể so sánh với",
    synonyms: ["match", "equal"],
    antonyms: [],
    examples: [
      { en: "Some scientists warn of an extinction rate that could rival the one that wiped out the dinosaurs.", vi: "Một số nhà khoa học cảnh báo về tốc độ tuyệt chủng có thể sánh ngang với sự kiện đã xoá sổ loài khủng long." },
      { en: "The new stadium rivals any other in the country in terms of size.", vi: "Sân vận động mới có thể sánh ngang với bất kỳ sân nào khác trong nước về quy mô." },
    ],
    ieltsTip: "\"Rival\" làm động từ (sánh ngang) hữu ích trong Writing Task 1 khi so sánh dữ liệu tương đương nhau.",
    summary: "rival (v) = sánh ngang, có thể so sánh với (về mức độ, quy mô).",
  },
  {
    term: "degradation",
    ipa: "/ˌdeɡrəˈdeɪʃən/",
    pos: "noun",
    usageNote: "chỉ sự suy thoái, xuống cấp về chất lượng, thường dùng cho môi trường",
    en: "the process of something being damaged or reduced in quality",
    vi: "sự suy thoái, xuống cấp",
    synonyms: ["deterioration"],
    antonyms: ["improvement"],
    examples: [
      { en: "Environmental degradation is accelerating in many parts of the world.", vi: "Sự suy thoái môi trường đang gia tăng ở nhiều nơi trên thế giới." },
      { en: "The report warned of the degradation of ecosystem services if action isn't taken.", vi: "Báo cáo cảnh báo về sự suy thoái các dịch vụ hệ sinh thái nếu không có hành động kịp thời." },
    ],
    ieltsTip: "\"Environmental degradation\" là collocation kinh điển trong Writing Task 2 về môi trường.",
    summary: "degradation = sự suy thoái, xuống cấp (môi trường, chất lượng).",
  },
  {
    term: "threshold",
    ipa: "/ˈθreʃhəʊld/",
    pos: "noun",
    usageNote: "chỉ ngưỡng, điểm giới hạn mà khi vượt qua sẽ gây ra thay đổi lớn",
    en: "the level or point at which something starts to happen or change",
    vi: "ngưỡng, điểm giới hạn",
    synonyms: ["limit"],
    antonyms: [],
    examples: [
      { en: "There is a high risk of biodiversity loss if the Earth's system is pushed beyond a certain threshold.", vi: "Có nguy cơ cao mất đa dạng sinh học nếu hệ thống Trái Đất bị đẩy vượt quá một ngưỡng nhất định." },
      { en: "Once pollution crosses a certain threshold, recovery becomes much harder.", vi: "Một khi ô nhiễm vượt qua một ngưỡng nhất định, việc phục hồi trở nên khó khăn hơn nhiều." },
    ],
    ieltsTip: "\"Cross/reach a threshold\" hữu ích khi mô tả điểm giới hạn trong các vấn đề môi trường, xã hội.",
    summary: "threshold = ngưỡng, điểm giới hạn (trước khi có thay đổi lớn).",
  },
  {
    term: "habitat",
    ipa: "/ˈhæbɪtæt/",
    pos: "noun",
    usageNote: "chỉ môi trường sống tự nhiên của một loài động thực vật",
    en: "the natural environment in which an animal or plant normally lives",
    vi: "môi trường sống (tự nhiên)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Habitat loss is one of the biggest threats facing endangered species today.", vi: "Mất môi trường sống là một trong những mối đe doạ lớn nhất đối với các loài nguy cấp hiện nay." },
      { en: "The reserve was created to protect the natural habitat of the gorillas.", vi: "Khu bảo tồn được tạo ra để bảo vệ môi trường sống tự nhiên của loài khỉ đột." },
    ],
    ieltsTip: "\"Habitat loss/destruction\" là collocation không thể thiếu trong Writing Task 2 về bảo tồn động vật.",
    summary: "habitat = môi trường sống tự nhiên (của động thực vật).",
  },
  {
    term: "invasive species",
    ipa: "/ɪnˈveɪsɪv ˈspiːʃiːz/",
    pos: "phrase",
    usageNote: "chỉ loài sinh vật ngoại lai xâm hại, gây hại khi du nhập vào một hệ sinh thái mới",
    en: "a non-native plant or animal that spreads quickly and causes harm to a new environment",
    vi: "loài ngoại lai xâm hại",
    synonyms: [],
    antonyms: ["native species"],
    examples: [
      { en: "Invasive species are one of the main threats to native wildlife.", vi: "Các loài ngoại lai xâm hại là một trong những mối đe doạ chính đối với động vật hoang dã bản địa." },
      { en: "The lake's ecosystem was damaged after an invasive species of fish was introduced.", vi: "Hệ sinh thái của hồ đã bị tổn hại sau khi một loài cá ngoại lai xâm hại được du nhập." },
    ],
    ieltsTip: "\"Invasive species\" là thuật ngữ sinh thái học quan trọng, thường xuất hiện trong bài đọc IELTS về môi trường.",
    summary: "invasive species = loài ngoại lai xâm hại (gây hại cho hệ sinh thái bản địa).",
  },
  {
    term: "overexploitation",
    ipa: "/ˌəʊvəˌeksplɔɪˈteɪʃən/",
    pos: "noun",
    usageNote: "chỉ việc khai thác quá mức một nguồn tài nguyên hoặc loài sinh vật, dẫn đến cạn kiệt",
    en: "the use of a resource or species to such an extent that it becomes damaged or reduced",
    vi: "sự khai thác quá mức",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Overexploitation of fish stocks has led to the collapse of several fisheries.", vi: "Việc khai thác quá mức nguồn cá đã dẫn đến sự sụp đổ của một số ngành đánh bắt cá." },
      { en: "Threats such as habitat loss and overexploitation are on the rise.", vi: "Các mối đe doạ như mất môi trường sống và khai thác quá mức đang gia tăng." },
    ],
    ieltsTip: "\"Overexploitation of resources\" hữu ích khi bàn về khai thác tài nguyên thiên nhiên trong Writing Task 2.",
    summary: "overexploitation = sự khai thác quá mức (tài nguyên, loài sinh vật).",
  },
  {
    term: "devastation",
    ipa: "/ˌdevəˈsteɪʃən/",
    pos: "noun",
    usageNote: "chỉ sự tàn phá nghiêm trọng, thiệt hại trên diện rộng",
    en: "very great damage or destruction",
    vi: "sự tàn phá (nghiêm trọng)",
    synonyms: ["destruction", "ruin"],
    antonyms: [],
    examples: [
      { en: "Heavy rains and devastating winds caused several trees to fall.", vi: "Mưa lớn và gió tàn phá đã khiến nhiều cây đổ." },
      { en: "The flood left a trail of devastation across the region.", vi: "Trận lũ để lại một vệt tàn phá khắp khu vực." },
    ],
    ieltsTip: "\"Widespread devastation\" là collocation mạnh, hữu ích khi mô tả hậu quả thiên tai trong Writing Task 1/2.",
    summary: "devastation = sự tàn phá nghiêm trọng, thiệt hại trên diện rộng.",
  },
  {
    term: "endangered",
    ipa: "/ɪnˈdeɪndʒəd/",
    pos: "adjective",
    usageNote: "mô tả loài sinh vật đang có nguy cơ tuyệt chủng",
    en: "(of a species) at risk of becoming extinct",
    vi: "nguy cấp, có nguy cơ tuyệt chủng",
    synonyms: ["threatened"],
    antonyms: ["thriving"],
    examples: [
      { en: "It's vital we try to reduce the number of animals that are endangered.", vi: "Điều thiết yếu là chúng ta phải cố gắng giảm số lượng động vật đang trong tình trạng nguy cấp." },
      { en: "The mountain gorilla remains a critically endangered species.", vi: "Khỉ đột núi vẫn là một loài đang trong tình trạng cực kỳ nguy cấp." },
    ],
    ieltsTip: "\"An endangered species\" là cụm cơ bản nhưng thiết yếu trong mọi bài viết về bảo tồn động vật.",
    summary: "endangered = nguy cấp, có nguy cơ tuyệt chủng (loài sinh vật).",
  },
];

const track18Script = `Speaker 1: I think it's absolutely horrifying the way we treat animals sometimes, especially when it's done for research purposes. I find the images of caged animals being forced to smoke quite distressing. And it's even more outrageous when all this research is done for cosmetics. It's not a subject that I can be objective about, I'm afraid, and I think it's absolutely essential we find a different way of doing this type of research.

Speaker 2: I honestly think we should do a lot more because I think it's vital we try to reduce the number of animals that are endangered. It's something I feel very strongly about. I think it's irresponsible to carry on causing environmental damage that makes animals suffer. One of the things we need to do is stop developments that will affect the habitat of wild animals. I think it's totally appropriate to do that even if it does mean a company might make a loss.

Speaker 3: I haven't really thought much about it, to be honest. I'm pretty impartial when it comes to animals. I'm not a vegetarian so I think it would be hypocritical of me to insist on rights for animals. I know there are plenty of people who find all of that pretty upsetting. But I think it's perfectly acceptable to keep chickens in cages to provide us with eggs, though a friend of mine thinks it's appalling.`;

const UNIT_9_NATURAL_HISTORY: CambridgeUnit = {
  unit: 9,
  slug: "natural-history",
  title: "Natural history",
  topics: "Animals, conservation",
  testPractice: "Reading",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit9Vocab,
    },
    {
      kind: "sort",
      title: "Extinction and environment, or attitude to animals?",
      instructions: "Tap a word, then tap the category it belongs to.",
      buckets: ["Extinction and environment", "Attitude to animals"],
      items: [
        { term: "demise", bucket: 0 },
        { term: "flourish", bucket: 0 },
        { term: "emerge", bucket: 0 },
        { term: "brink", bucket: 0 },
        { term: "rival", bucket: 0 },
        { term: "degradation", bucket: 0 },
        { term: "threshold", bucket: 0 },
        { term: "habitat", bucket: 0 },
        { term: "invasive species", bucket: 0 },
        { term: "overexploitation", bucket: 0 },
        { term: "devastation", bucket: 0 },
        { term: "endangered", bucket: 0 },
        { term: "appalling", bucket: 1 },
        { term: "distressing", bucket: 1 },
        { term: "hypocritical", bucket: 1 },
        { term: "impartial", bucket: 1 },
        { term: "irresponsible", bucket: 1 },
        { term: "outrageous", bucket: 1 },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Attitudes to animals",
      instructions: "Listen to three speakers giving their views on animals. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-18.mp3",
      template:
        "Speaker 1 finds the images of caged animals used in {{research}} quite {{distressing}}, and thinks it's even more {{outrageous}} when this research is done for cosmetics.\n\n" +
        "Speaker 2 feels strongly that we should do more to protect {{endangered}} animals, and believes it's {{irresponsible}} to keep causing environmental damage that harms wildlife {{habitats}}.\n\n" +
        "Speaker 3 says they are fairly {{impartial}} about animal rights, and thinks it would be {{hypocritical}} to insist on animal rights while not being vegetarian — though they admit a friend finds keeping chickens in cages {{appalling}}.",
      script: track18Script,
    },
    {
      kind: "fill_mc",
      title: "Extinction vocabulary in context",
      instructions: "Choose the word that best completes each sentence.",
      items: [
        { before: "It was the", after: "of the dinosaurs that allowed mammals to flourish.", options: ["demise", "emergence", "threshold"], answer: "demise" },
        { before: "Small mammals began to", after: "once large predators disappeared.", options: ["flourish", "rival", "brink"], answer: "flourish" },
        { before: "Humans didn't", after: "as a distinct species until millions of years later.", options: ["emerge", "flourish", "rival"], answer: "emerge" },
        { before: "Scientists warn the world is on the", after: "of another mass extinction.", options: ["brink", "threshold", "demise"], answer: "brink" },
        { before: "The extinction rate today could", after: "the one that wiped out the dinosaurs.", options: ["rival", "emerge", "flourish"], answer: "rival" },
        { before: "Ecosystems may collapse once pollution crosses a certain", after: ".", options: ["threshold", "brink", "demise"], answer: "threshold" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Conservation vocabulary in context",
      instructions: "Choose the word or phrase that best completes each sentence.",
      items: [
        { before: "Building new roads often destroys the natural", after: "of local wildlife.", options: ["habitat", "degradation", "devastation"], answer: "habitat" },
        { before: "An", after: "of fish introduced to the lake wiped out several native species.", options: ["invasive species", "overexploitation", "degradation"], answer: "invasive species" },
        { before: "", after: "of fish stocks has led to the collapse of several fisheries.", options: ["Overexploitation", "Devastation", "Degradation"], answer: "Overexploitation" },
        { before: "The flood left a trail of", after: "across the region.", options: ["devastation", "degradation", "habitat"], answer: "devastation" },
        { before: "Environmental", after: "is accelerating in many parts of the world.", options: ["degradation", "devastation", "habitat"], answer: "degradation" },
      ],
    },
    {
      kind: "type_fill",
      title: "Animal classification",
      instructions: "Read each definition and type the matching animal.",
      items: [
        { prompt: "A venomous arachnid, often kept as an exotic pet, is called a ___.", answer: "tarantula" },
        { prompt: "A soft-bodied aquatic invertebrate with a sting is called a ___.", answer: "jellyfish" },
        { prompt: "A nocturnal mammal that hibernates and can fly is called a ___.", answer: "bat" },
        { prompt: "A critically endangered primate found in Central Africa is called a ___.", answer: "gorilla" },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — an interesting animal",
      prompt: "Describe an animal that you find interesting.",
      bullets: [
        "what animal it is",
        "where it can be found",
        "what makes it interesting",
        "and explain whether you think it is well protected",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"Do you think zoos are a good way to protect endangered animals?\" — think about how you'd answer that too. Try working in some of this unit's vocabulary (habitat, endangered, flourish...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "not very impressive alone", reveal: "not very impressive... not especially clever" },
        { prompt: "challenging tasks", reveal: "solve problems that would challenge a team of human engineers" },
        { prompt: "no one is in charge", reveal: "no central authority organising the whole" },
        { prompt: "changing circumstances", reveal: "constantly shifting conditions" },
        { prompt: "brief touching", reveal: "brief physical contact" },
        { prompt: "hold off, wait", reveal: "foragers hold back" },
        { prompt: "seems very planned", reveal: "look... remarkably deliberate" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Test practice — Reading",
      passageTitle: "The wisdom of the colony",
      passage:
        "A single ant, watched up close, is not very impressive. It wanders, backtracks, and appears to have no real plan. Deborah Gordon, a biologist at Stanford University who has spent decades studying ant colonies in the Arizona desert, puts it bluntly: individual ants are not especially clever. And yet a colony of thousands of these unremarkable insects can solve problems that would challenge a team of human engineers — finding the shortest route to a food source, allocating workers to different tasks, or defending territory from rivals.\n\n" +
        "The puzzle, Gordon argues, is that none of this intelligence lives inside any single ant. There is no ant in charge, no manager assigning jobs, and the queen's role is limited to laying eggs rather than directing the colony's work. Instead, a colony functions through what biologists call 'swarm intelligence': complex, coordinated behaviour that emerges from many simple individuals each following simple local rules, with no central authority organising the whole.\n\n" +
        "Gordon's research on harvester ants illustrates how this works in practice. Each morning, a colony has to decide how many ants to send out foraging for food, a decision that depends on constantly shifting conditions — how much food was found the previous day, whether the nest was damaged overnight, how many ants are needed for repairs instead. Gordon discovered that ants make this collective decision through brief physical contact. When foragers meet returning patroller ants at a certain rate, that pattern of contact is enough to trigger foraging; if the rate is too low, foragers hold back, since a lower rate of returning ants often signals a problem outside the nest, such as bad weather or a predator.\n\n" +
        "No individual ant assesses the situation or decides anything. Each is simply reacting to a short sequence of antenna touches. Yet from thousands of these small, local interactions, the colony as a whole reaches decisions that look, from the outside, remarkably deliberate. Gordon has since applied the same logic to her own workplace, noting that a university department, like an ant colony, often functions surprisingly well without anyone being able to say exactly who is in charge of what.",
      questions: [
        {
          text: "According to Gordon, individual ants show great intelligence on their own.",
          answer: "False",
          justification: "Individual ants are not especially clever, according to Gordon.",
        },
        {
          text: "A colony of ants can solve problems that would challenge human engineers.",
          answer: "True",
          justification: "A colony can solve problems that would challenge a team of human engineers.",
        },
        {
          text: "The queen ant is responsible for organising the colony's daily tasks.",
          answer: "False",
          justification: "The queen's role is limited to laying eggs, not directing the colony's work.",
        },
        {
          text: "Swarm intelligence relies on a central ant or group of ants making decisions for the whole colony.",
          answer: "False",
          justification: "Swarm intelligence emerges from many simple individuals, with no central authority.",
        },
        {
          text: "The number of ants sent out to forage each day is always exactly the same.",
          answer: "False",
          justification: "The decision depends on constantly shifting conditions.",
        },
        {
          text: "Ants decide whether to forage based on physical contact with other ants.",
          answer: "True",
          justification: "Ants make this collective decision through brief physical contact.",
        },
        {
          text: "Gordon has never applied her research findings to any situation outside ant colonies.",
          answer: "False",
          justification: "Gordon has applied the same logic to her own workplace.",
        },
      ],
    },
  ],
};

const unit10Vocab: VocabWord[] = [
  {
    term: "weightlessness",
    ipa: "/ˈweɪtləsnəs/",
    pos: "noun",
    usageNote: "chỉ trạng thái không có trọng lượng, thường trải nghiệm trong không gian",
    en: "the condition of having no weight, especially as experienced in space",
    vi: "trạng thái không trọng lượng",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Astronauts experience weightlessness once they leave Earth's atmosphere.", vi: "Các phi hành gia trải nghiệm trạng thái không trọng lượng khi rời khỏi bầu khí quyển Trái Đất." },
      { en: "Training for weightlessness involves flying in a specially adapted aircraft.", vi: "Việc huấn luyện cho trạng thái không trọng lượng bao gồm bay trên một loại máy bay được cải tiến đặc biệt." },
    ],
    ieltsTip: "\"Experience weightlessness\" là collocation cơ bản khi mô tả du hành vũ trụ trong Speaking hoặc Writing.",
    summary: "weightlessness = trạng thái không trọng lượng (trong không gian).",
  },
  {
    term: "space debris",
    ipa: "/speɪs ˈdebriː/",
    pos: "phrase",
    usageNote: "chỉ các mảnh vụn từ vệ tinh, tên lửa cũ trôi nổi trong không gian",
    en: "pieces of old satellites, rockets, and other equipment left in space",
    vi: "rác vũ trụ",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Space debris poses a growing risk to satellites and spacecraft.", vi: "Rác vũ trụ đang trở thành mối nguy ngày càng lớn đối với vệ tinh và tàu vũ trụ." },
      { en: "Scientists are developing ways to remove space debris from orbit.", vi: "Các nhà khoa học đang phát triển các phương pháp để loại bỏ rác vũ trụ khỏi quỹ đạo." },
    ],
    ieltsTip: "\"Space debris\" là chủ đề hiện đại, hữu ích khi bàn về hậu quả của khám phá không gian trong Writing Task 2.",
    summary: "space debris = rác vũ trụ (mảnh vụn từ vệ tinh, tên lửa cũ).",
  },
  {
    term: "unmanned spacecraft",
    ipa: "/ʌnˈmænd ˈspeɪskrɑːft/",
    pos: "phrase",
    usageNote: "chỉ tàu vũ trụ không có phi hành đoàn, hoạt động tự động hoặc điều khiển từ xa",
    en: "a vehicle for travelling in space that has no human crew on board",
    vi: "tàu vũ trụ không người lái",
    synonyms: [],
    antonyms: ["manned spacecraft"],
    examples: [
      { en: "Unmanned spacecraft are often cheaper and safer for exploring distant planets.", vi: "Tàu vũ trụ không người lái thường rẻ hơn và an toàn hơn khi khám phá các hành tinh xa xôi." },
      { en: "The unmanned spacecraft sent back thousands of images of the planet's surface.", vi: "Tàu vũ trụ không người lái đã gửi về hàng nghìn bức ảnh về bề mặt hành tinh." },
    ],
    ieltsTip: "\"Unmanned spacecraft/mission\" hữu ích khi so sánh chi phí và rủi ro trong Writing Task 2 về không gian.",
    summary: "unmanned spacecraft = tàu vũ trụ không người lái.",
  },
  {
    term: "space tourism",
    ipa: "/speɪs ˈtʊərɪzəm/",
    pos: "phrase",
    usageNote: "hình thức du lịch đưa khách hàng (không phải phi hành gia) lên không gian",
    en: "the activity of travelling into space as a tourist",
    vi: "du lịch vũ trụ",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Space tourism remains extremely expensive and is only available to a small number of people.", vi: "Du lịch vũ trụ vẫn cực kỳ đắt đỏ và chỉ dành cho một số ít người." },
      { en: "Some critics argue that space tourism is a waste of resources.", vi: "Một số nhà phê bình cho rằng du lịch vũ trụ là một sự lãng phí nguồn lực." },
    ],
    ieltsTip: "\"Space tourism\" là chủ đề tranh luận hay gặp trong Speaking Part 3 về chi tiêu công cho không gian.",
    summary: "space tourism = du lịch vũ trụ.",
  },
  {
    term: "communications satellite",
    ipa: "/kəˌmjuːnɪˈkeɪʃənz ˈsætəlaɪt/",
    pos: "phrase",
    usageNote: "vệ tinh dùng để truyền tín hiệu liên lạc như điện thoại, truyền hình, internet",
    en: "a satellite used to send signals for television, telephone, or internet communication",
    vi: "vệ tinh liên lạc",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Communications satellites make it possible to make phone calls across the world instantly.", vi: "Vệ tinh liên lạc giúp việc gọi điện thoại xuyên thế giới trở nên tức thời." },
      { en: "The company launched a new communications satellite last year.", vi: "Công ty đã phóng một vệ tinh liên lạc mới vào năm ngoái." },
    ],
    ieltsTip: "\"Communications satellite\" là một trong những ứng dụng thực tế quan trọng nhất của công nghệ không gian — hữu ích trong Writing Task 2.",
    summary: "communications satellite = vệ tinh liên lạc.",
  },
  {
    term: "eclipse",
    ipa: "/ɪˈklɪps/",
    pos: "noun",
    usageNote: "chỉ hiện tượng thiên thể này che khuất thiên thể khác",
    en: "an event in which one planet, moon, or star seems to disappear because another one moves across it",
    vi: "nhật thực/nguyệt thực",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "A total solar eclipse is worth the wait, even if you only witness one in your lifetime.", vi: "Một lần nhật thực toàn phần đáng để chờ đợi, dù bạn chỉ được chứng kiến một lần trong đời." },
      { en: "Thousands of people travelled to see the rare eclipse.", vi: "Hàng nghìn người đã đi xa để xem hiện tượng nhật thực hiếm gặp này." },
    ],
    ieltsTip: "\"A solar/lunar eclipse\" là từ vựng thiên văn cơ bản, hay gặp trong bài đọc khoa học.",
    summary: "eclipse = nhật thực/nguyệt thực (thiên thể này che khuất thiên thể khác).",
  },
  {
    term: "gravity",
    ipa: "/ˈɡrævɪti/",
    pos: "noun",
    usageNote: "chỉ lực kéo các vật về phía tâm Trái Đất hoặc thiên thể khác",
    en: "the force that attracts objects towards the centre of the earth or another body",
    vi: "trọng lực, lực hấp dẫn",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Gravity is what keeps the moon in orbit around the Earth.", vi: "Lực hấp dẫn là thứ giữ mặt trăng quay quanh Trái Đất." },
      { en: "Astronauts must adapt to the low gravity conditions on the moon.", vi: "Các phi hành gia phải thích nghi với điều kiện trọng lực thấp trên mặt trăng." },
    ],
    ieltsTip: "\"The force of gravity\" hữu ích trong bài đọc/nghe về vật lý, thiên văn học.",
    summary: "gravity = trọng lực, lực hấp dẫn.",
  },
  {
    term: "penetrate",
    ipa: "/ˈpenɪtreɪt/",
    pos: "verb",
    usageNote: "dùng khi xuyên qua hoặc đi vào bên trong một vật thể hay bề mặt",
    en: "to succeed in getting into or through something",
    vi: "xuyên qua, thâm nhập",
    synonyms: ["pierce"],
    antonyms: [],
    examples: [
      { en: "Beams of sunlight can just penetrate the rugged valleys of the moon during a total eclipse.", vi: "Các tia nắng mặt trời có thể vừa đủ xuyên qua những thung lũng gồ ghề của mặt trăng trong lúc nhật thực toàn phần." },
      { en: "The signal is too weak to penetrate thick concrete walls.", vi: "Tín hiệu quá yếu để xuyên qua các bức tường bê tông dày." },
    ],
    ieltsTip: "\"Penetrate a surface/wall\" hữu ích khi mô tả các quá trình vật lý trong bài đọc khoa học.",
    summary: "penetrate = xuyên qua, thâm nhập (một bề mặt, vật thể).",
  },
  {
    term: "sustain",
    ipa: "/səˈsteɪn/",
    pos: "verb",
    usageNote: "dùng khi duy trì, giữ cho điều gì đó tiếp tục tồn tại theo thời gian",
    en: "to keep something going or existing over a period of time",
    vi: "duy trì, giữ cho tồn tại",
    synonyms: ["maintain"],
    antonyms: [],
    examples: [
      { en: "Earth is the only known planet to sustain life.", vi: "Trái Đất là hành tinh duy nhất được biết đến có thể duy trì sự sống." },
      { en: "The economy needs steady investment to sustain long-term growth.", vi: "Nền kinh tế cần đầu tư ổn định để duy trì tăng trưởng dài hạn." },
    ],
    ieltsTip: "\"Sustain life/growth\" là collocation học thuật hữu ích trong Writing Task 2 về môi trường, kinh tế.",
    summary: "sustain = duy trì, giữ cho tồn tại (theo thời gian).",
  },
  {
    term: "vast",
    ipa: "/vɑːst/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó rất lớn về quy mô hoặc số lượng",
    en: "extremely large in size or amount",
    vi: "rất lớn, rộng lớn",
    synonyms: ["enormous", "immense"],
    antonyms: ["tiny"],
    examples: [
      { en: "Space programmes require vast sums of money.", vi: "Các chương trình không gian đòi hỏi số tiền khổng lồ." },
      { en: "The vast majority of scientists agree on the risks of climate change.", vi: "Đại đa số các nhà khoa học đồng ý về những rủi ro của biến đổi khí hậu." },
    ],
    ieltsTip: "\"A vast amount/majority\" là collocation rất linh hoạt, dùng được trong hầu hết các bài Writing Task 2.",
    summary: "vast = rất lớn, rộng lớn (quy mô, số lượng).",
  },
  {
    term: "minuscule",
    ipa: "/ˈmɪnəskjuːl/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó cực kỳ nhỏ, gần như không đáng kể",
    en: "extremely small",
    vi: "cực kỳ nhỏ",
    synonyms: ["tiny", "microscopic"],
    antonyms: ["vast", "enormous"],
    examples: [
      { en: "It is made up of minuscule particles that are invisible to the naked eye.", vi: "Nó được tạo thành từ những hạt cực kỳ nhỏ mà mắt thường không nhìn thấy được." },
      { en: "The chances of the mission failing were minuscule.", vi: "Khả năng nhiệm vụ thất bại là cực kỳ nhỏ." },
    ],
    ieltsTip: "\"Minuscule\" là từ đồng nghĩa học thuật với \"tiny\" — hữu ích để tránh lặp từ trong Writing Task 1.",
    summary: "minuscule = cực kỳ nhỏ; trái nghĩa với 'vast/enormous'.",
  },
  {
    term: "colossal",
    ipa: "/kəˈlɒsəl/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó khổng lồ, cực kỳ lớn, thường về kích thước hoặc quy mô ấn tượng",
    en: "extremely large",
    vi: "khổng lồ, cực kỳ lớn",
    synonyms: ["huge", "gigantic"],
    antonyms: ["tiny"],
    examples: [
      { en: "The surface of the planet is covered in colossal volcanoes, much larger than any on Earth.", vi: "Bề mặt hành tinh này được bao phủ bởi những ngọn núi lửa khổng lồ, lớn hơn nhiều so với bất kỳ ngọn núi lửa nào trên Trái Đất." },
      { en: "Building the space station was a colossal engineering achievement.", vi: "Việc xây dựng trạm vũ trụ là một thành tựu kỹ thuật khổng lồ." },
    ],
    ieltsTip: "\"Colossal\" mạnh hơn \"big\" hoặc \"huge\" — dùng để nhấn mạnh quy mô ấn tượng trong Writing Task 1.",
    summary: "colossal = khổng lồ, cực kỳ lớn (về kích thước, quy mô).",
  },
  {
    term: "imperceptible",
    ipa: "/ˌɪmpəˈseptəbəl/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó quá nhỏ hoặc quá chậm để nhận thấy bằng giác quan thông thường",
    en: "so small that it is impossible to notice or measure",
    vi: "không thể nhận thấy được, quá nhỏ",
    synonyms: ["undetectable"],
    antonyms: ["obvious", "noticeable"],
    examples: [
      { en: "The change in the star's brightness was imperceptible to the naked eye.", vi: "Sự thay đổi độ sáng của ngôi sao là không thể nhận thấy được bằng mắt thường." },
      { en: "The shift in temperature was so imperceptible that no one noticed it at first.", vi: "Sự thay đổi nhiệt độ nhỏ đến mức không ai nhận ra lúc đầu." },
    ],
    ieltsTip: "\"Imperceptible change\" hữu ích trong Writing Task 1 khi mô tả một đường biểu diễn gần như không thay đổi.",
    summary: "imperceptible = không thể nhận thấy được, quá nhỏ để nhận ra.",
  },
  {
    term: "fleeting",
    ipa: "/ˈfliːtɪŋ/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó tồn tại trong thời gian rất ngắn, thoáng qua",
    en: "lasting for only a very short time",
    vi: "thoáng qua, ngắn ngủi",
    synonyms: ["brief", "momentary"],
    antonyms: ["lasting", "enduring"],
    examples: [
      { en: "The shooting star was only visible for a very fleeting moment before it disappeared.", vi: "Ngôi sao băng chỉ có thể nhìn thấy trong một khoảnh khắc thoáng qua trước khi biến mất." },
      { en: "He caught a fleeting glimpse of the eclipse through the clouds.", vi: "Anh ấy chỉ thoáng nhìn thấy nhật thực qua các đám mây." },
    ],
    ieltsTip: "\"A fleeting glimpse/moment\" hữu ích khi mô tả trải nghiệm ngắn ngủi trong Speaking Part 2.",
    summary: "fleeting = thoáng qua, ngắn ngủi; trái nghĩa với 'lasting/enduring'.",
  },
  {
    term: "sustained",
    ipa: "/səˈsteɪnd/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó liên tục, kéo dài không bị gián đoạn trong một khoảng thời gian",
    en: "continuing for a long time without interruption",
    vi: "liên tục, kéo dài",
    synonyms: ["continuous", "prolonged"],
    antonyms: ["brief", "temporary"],
    examples: [
      { en: "We've had two years of sustained growth in science funding.", vi: "Chúng ta đã có hai năm tăng trưởng liên tục trong nguồn tài trợ khoa học." },
      { en: "Sustained effort is needed to achieve real progress in space exploration.", vi: "Cần có nỗ lực bền bỉ để đạt được tiến bộ thực sự trong thám hiểm không gian." },
    ],
    ieltsTip: "\"Sustained growth/effort\" là collocation hữu ích trong Writing Task 1/2 khi mô tả xu hướng dài hạn, ổn định.",
    summary: "sustained = liên tục, kéo dài không gián đoạn.",
  },
  {
    term: "prolonged",
    ipa: "/prəˈlɒŋd/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó kéo dài hơn bình thường hoặc dự kiến, thường mang hàm ý hơi tiêu cực",
    en: "continuing for a long time, often longer than expected or wanted",
    vi: "kéo dài (hơn bình thường)",
    synonyms: ["lengthy", "protracted"],
    antonyms: ["brief", "short"],
    examples: [
      { en: "There was a prolonged investigation into the failure of the launch system.", vi: "Đã có một cuộc điều tra kéo dài về sự cố của hệ thống phóng." },
      { en: "Prolonged exposure to radiation can be harmful to astronauts.", vi: "Phơi nhiễm kéo dài với bức xạ có thể gây hại cho các phi hành gia." },
    ],
    ieltsTip: "\"Prolonged exposure/investigation\" hữu ích khi mô tả tình huống kéo dài không mong muốn trong Writing Task 2.",
    summary: "prolonged = kéo dài (hơn bình thường, thường mang hàm ý tiêu cực).",
  },
  {
    term: "momentary",
    ipa: "/ˈməʊməntəri/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó chỉ diễn ra trong một khoảnh khắc rất ngắn",
    en: "lasting for only a moment; very brief",
    vi: "trong chốc lát, tức thời",
    synonyms: ["brief", "instant"],
    antonyms: ["lasting"],
    examples: [
      { en: "There was a momentary silence before the announcement was made.", vi: "Có một khoảnh khắc im lặng ngắn ngủi trước khi thông báo được đưa ra." },
      { en: "The astronaut felt a momentary loss of balance during the manoeuvre.", vi: "Phi hành gia cảm thấy mất thăng bằng trong chốc lát trong lúc thao tác." },
    ],
    ieltsTip: "\"A momentary pause/silence\" hữu ích khi kể chuyện trong Speaking Part 2.",
    summary: "momentary = trong chốc lát, tức thời (rất ngắn).",
  },
  {
    term: "propulsion",
    ipa: "/prəˈpʌlʃən/",
    pos: "noun",
    usageNote: "chỉ lực đẩy giúp một vật thể (như tên lửa) di chuyển về phía trước",
    en: "the force that pushes something forward",
    vi: "lực đẩy",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Rocket propulsion relies on burning fuel to generate enormous thrust.", vi: "Lực đẩy tên lửa dựa vào việc đốt cháy nhiên liệu để tạo ra lực đẩy khổng lồ." },
      { en: "Engineers are developing new propulsion systems for deep space travel.", vi: "Các kỹ sư đang phát triển các hệ thống lực đẩy mới cho du hành không gian sâu." },
    ],
    ieltsTip: "\"A propulsion system\" là thuật ngữ kỹ thuật hữu ích khi bàn về công nghệ tên lửa, hàng không.",
    summary: "propulsion = lực đẩy (giúp tên lửa, phương tiện di chuyển về phía trước).",
  },
];

const track20Script = `Good afternoon, everyone. Today is our final lecture on teaching science, and I'm going to focus on ways of making science, and in particular physics, fun for children. The concepts of physics can be very difficult for children to understand, but they can also be really exciting. I'm going to describe three different experiments you can use in the classroom to help show children not only how exciting, but also how useful, physics can be.

The first one is based on what's known as the Brazil nut effect. Physicists wondered why large Brazil nuts end up at the top of a jar of mixed nuts. To demonstrate this, you need a jar, a marble and some sand. You put the marble and the sand in the jar and get students to predict what will happen to the marble if they shake the jar. As the marble is denser than the sand, they will make the same assumption as the physicists, that the marble will sink to the bottom. In fact, no matter how much you shake it, the marble will remain at or near the top of the sand. This is because the sand and the marble both move up and down. With each shake, the sand fills in the space below the marble before it falls. I think it always helps to increase interest in science if you can show that it has a real world application. In this case, the scientists realised that if powdered medications of different density are mixed together, they may in fact not mix evenly. So they now take density into account.

The second experiment is always fun as it involves a balloon! You also need a pin and some sticky tape. First, you inflate the balloon and then you put sticky tape on it, but don't tell the students you've done that. Now you ask the students what makes a balloon burst. Most people assume balloons make a loud bang when the air is released through the hole. However, if you pierce the balloon through the sticky tape, instead of bursting it, the air will leak out quietly and slowly. So it can't be the air escaping that causes the noise. Instead, physics has shown us the loud bang occurs because the hole expands rapidly, forming a catastrophic crack. You can also tell your students, when the balloon does burst open, it does so faster than the speed of sound, so the loud bang you hear is actually a sonic boom! In the real world, this principle is used to test different materials to see how elastic they are and how much stress can be put on them.

The next experiment is called the arm engine, and for this one you need a chair that can swivel or rotate and some small hand weights. This is a great experiment for demonstrating an important principle of energy and momentum. Ask one of your students to sit on the chair holding the weights in their hands. Then get another student to spin the chair as fast as they can. Thanks to the weights, the student sitting in the chair will be able to control their own speed. If they hold the weights out, they will slow down and if they hold them close to their body, making themselves narrower, they will accelerate the speed of their rotation. We can observe this principle in the real world in the sport of ice skating, where the skaters manage to spin incredibly fast by tucking their hands in close to their body.

So, as you can see ...`;

const UNIT_10_ROCKET_SCIENCE: CambridgeUnit = {
  unit: 10,
  slug: "rocket-science",
  title: "Rocket science",
  topics: "Space, physics",
  testPractice: "Listening Section 4",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit10Vocab,
    },
    {
      kind: "sort",
      title: "Big or small?",
      instructions: "Tap a word, then tap the size it describes.",
      buckets: ["Big", "Small"],
      items: [
        { term: "vast", bucket: 0 },
        { term: "colossal", bucket: 0 },
        { term: "enormous", bucket: 0 },
        { term: "astronomical", bucket: 0 },
        { term: "immense", bucket: 0 },
        { term: "minuscule", bucket: 1 },
        { term: "imperceptible", bucket: 1 },
        { term: "microscopic", bucket: 1 },
        { term: "infinitesimal", bucket: 1 },
        { term: "minute", bucket: 1 },
      ],
    },
    {
      kind: "sort",
      title: "Long or short (time)?",
      instructions: "Tap a word, then tap the length of time it describes.",
      buckets: ["Short", "Long"],
      items: [
        { term: "fleeting", bucket: 0 },
        { term: "momentary", bucket: 0 },
        { term: "brief", bucket: 0 },
        { term: "transient", bucket: 0 },
        { term: "instant", bucket: 0 },
        { term: "sustained", bucket: 1 },
        { term: "prolonged", bucket: 1 },
        { term: "lengthy", bucket: 1 },
        { term: "enduring", bucket: 1 },
        { term: "lasting", bucket: 1 },
      ],
    },
    {
      kind: "type_fill",
      title: "Guess the space word",
      instructions: "Read each definition and type the matching word or phrase from this unit.",
      items: [
        { prompt: "The state of having no weight, experienced by astronauts in space, is called ___.", answer: "weightlessness" },
        { prompt: "Old satellites and rocket parts left floating in space are known as ___.", answer: "space debris" },
        { prompt: "A ___ has no human crew on board.", answer: "unmanned spacecraft" },
        { prompt: "Travelling into space purely as a paying visitor is called ___.", answer: "space tourism" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Size and time adjectives in context",
      instructions: "Choose the word that best completes each sentence.",
      items: [
        { before: "Space programmes require", after: "sums of money.", options: ["vast", "minuscule", "fleeting"], answer: "vast" },
        { before: "It is made up of", after: "particles that are invisible to the naked eye.", options: ["minuscule", "colossal", "sustained"], answer: "minuscule" },
        { before: "The surface of the planet is covered in", after: "volcanoes, much larger than any on Earth.", options: ["colossal", "imperceptible", "fleeting"], answer: "colossal" },
        { before: "The change in brightness was", after: "to the naked eye.", options: ["imperceptible", "vast", "prolonged"], answer: "imperceptible" },
        { before: "The shooting star was only visible for a", after: "moment before it disappeared.", options: ["fleeting", "sustained", "colossal"], answer: "fleeting" },
        { before: "We've had two years of", after: "growth in science funding.", options: ["sustained", "fleeting", "imperceptible"], answer: "sustained" },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — the future of space exploration",
      prompt: "Describe something you would like to see happen in space exploration.",
      bullets: [
        "what it would be",
        "why it interests you",
        "what challenges it would involve",
        "and explain how it might benefit people on Earth",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"Should governments spend more money on space exploration?\" — think about how you'd answer that too. Try working in some of this unit's vocabulary (vast, sustain, propulsion...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "happens by chance", reveal: "a cosmic coincidence" },
        { prompt: "almost the same size", reveal: "appear almost exactly the same size" },
        { prompt: "formed from the same disc as the planet", reveal: "condensing from the same swirling disc of material" },
        { prompt: "a huge amount of debris", reveal: "a vast quantity of debris" },
        { prompt: "swings unpredictably", reveal: "allowing it to swing wildly" },
        { prompt: "a better opportunity", reveal: "a better chance to take hold" },
        { prompt: "wasn't guaranteed to happen", reveal: "none of this was inevitable" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — the lucky coincidence that lights up the sky",
      passageTitle: "The lucky coincidence that lights up the sky",
      passage:
        "Total solar eclipses are, in a strict sense, a cosmic coincidence. The sun is roughly 400 times wider than the moon, but it also happens to sit roughly 400 times further from Earth. The two objects therefore appear almost exactly the same size in our sky — an alignment not shared by any other planet-moon pair in the solar system, as far as astronomers have observed. Because of this coincidence, the moon can, on rare occasions, block the sun's disc almost perfectly, producing the brief but spectacular effect known as totality.\n\n" +
        "The moon itself is something of an oddity. Most large moons in the solar system are thought to have formed alongside their planet, condensing from the same swirling disc of material. Earth's moon, by contrast, is widely believed to have formed after a Mars-sized object collided with the young Earth early in the solar system's history, flinging a vast quantity of debris into orbit that eventually gathered into a single, unusually large satellite.\n\n" +
        "That large moon appears to have done more than provide spectacular eclipses. Because Earth's axis is not perfectly stable, it naturally tends to wobble over long timescales, a bit like a spinning top slowing down. The moon's gravity acts as a stabilising anchor, keeping that wobble within a narrow, predictable range rather than allowing it to swing wildly. Some scientists argue that a more stable axis, and the more stable climate that comes with it, may have given early life on Earth a better chance to take hold and diversify than it would have had on a planet with a smaller, less stabilising moon.\n\n" +
        "None of this was inevitable. A slightly different angle of impact, a slightly different mass for the object that struck early Earth, and the moon we see today might never have formed at all — taking with it both the eclipses we still travel long distances to witness, and, on one reading of the evidence, a more stable climate for life to get started in.",
      questions: [
        {
          text: "The sun and moon appear the same size in our sky purely by chance.",
          answer: "True",
          justification: "This is described as 'a cosmic coincidence'.",
        },
        {
          text: "Every planet in the solar system has a moon that appears the same size as its sun.",
          answer: "False",
          justification: "This alignment is not shared by any other planet-moon pair, as far as astronomers have observed.",
        },
        {
          text: "Most large moons in the solar system formed in exactly the same way as Earth's moon.",
          answer: "False",
          justification: "Most large moons formed alongside their planet; Earth's moon is believed to have formed differently, from a collision.",
        },
        {
          text: "Earth's moon is believed to have formed from debris created by a collision.",
          answer: "True",
          justification: "A Mars-sized object collided with young Earth, flinging debris that formed the moon.",
        },
        {
          text: "The moon's gravity helps keep the tilt of Earth's axis relatively stable.",
          answer: "True",
          justification: "The moon's gravity acts as a stabilising anchor for Earth's axis.",
        },
        {
          text: "Scientists are certain that a stable climate was necessary for life to begin on Earth.",
          answer: "Not given",
          justification: "The passage says some scientists argue this 'may have' helped — it is not presented as a certainty.",
        },
        {
          text: "If the ancient collision had been slightly different, the moon might not have formed at all.",
          answer: "True",
          justification: "A slightly different angle or mass, and the moon we see today might never have formed.",
        },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Test practice — Listening Section 4",
      instructions: "Complete the table below. Write NO MORE THAN TWO WORDS for each answer.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-20.mp3",
      tip: "For table completion items, read the heading of each column so you know what information to listen for, and use the other information in each row to help follow the talk.",
      template:
        "Brazil nut effect — put a marble and some {{sand}} in a jar and shake: most people assume the marble will {{sink}}, but the opposite is true. Real-world use: making sure {{powdered medications}} of different densities are mixed accurately.\n\n" +
        "Unpoppable balloon — use a balloon, a pin and some {{sticky tape}}; pierce the balloon and the air leaks out {{quietly}} instead of bursting. Real-world use: checking how {{elastic}} a material is.\n\n" +
        "Arm engine — use a swivel chair and hand weights; holding weights close to the body makes you spin {{faster}}. This principle can be seen in {{ice skating}}.",
      script: track20Script,
    },
  ],
};

const unit11Vocab: VocabWord[] = [
  {
    term: "revolutionise",
    ipa: "/ˌrevəˈluːʃənaɪz/",
    pos: "verb",
    usageNote: "dùng khi điều gì đó thay đổi hoàn toàn cách một việc được thực hiện",
    en: "to completely change the way something is done",
    vi: "cách mạng hoá, thay đổi hoàn toàn",
    synonyms: ["transform"],
    antonyms: [],
    examples: [
      { en: "Wireless technology has revolutionised the way we communicate.", vi: "Công nghệ không dây đã cách mạng hoá cách chúng ta giao tiếp." },
      { en: "The internet revolutionised how people access information.", vi: "Internet đã cách mạng hoá cách con người tiếp cận thông tin." },
    ],
    ieltsTip: "\"Revolutionise the way we...\" là cấu trúc mạnh, hữu ích để mở đầu bài Writing Task 2 về công nghệ.",
    summary: "revolutionise = cách mạng hoá, thay đổi hoàn toàn cách làm việc gì.",
  },
  {
    term: "advent",
    ipa: "/ˈædvent/",
    pos: "noun",
    usageNote: "dùng trong cụm \"since/with the advent of\" khi nói về sự ra đời của một công nghệ/xu hướng mới",
    en: "the arrival or beginning of something important",
    vi: "sự ra đời, xuất hiện (của điều gì quan trọng)",
    synonyms: ["arrival", "emergence"],
    antonyms: [],
    examples: [
      { en: "No breakthrough revolutionised life as much as the advent of wireless technology.", vi: "Không phát minh nào cách mạng hoá cuộc sống nhiều như sự ra đời của công nghệ không dây." },
      { en: "Since the advent of smartphones, people rarely use paper maps.", vi: "Kể từ khi điện thoại thông minh ra đời, mọi người hiếm khi dùng bản đồ giấy nữa." },
    ],
    ieltsTip: "\"Since the advent of\" là cách mở đầu trang trọng cho câu chủ đề khi bàn về công nghệ trong Writing Task 2.",
    summary: "advent = sự ra đời, xuất hiện (của điều gì mới và quan trọng).",
  },
  {
    term: "overhaul",
    ipa: "/ˌəʊvəˈhɔːl/",
    pos: "verb",
    usageNote: "dùng khi cải tổ, thay đổi triệt để một hệ thống hoặc ngành nghề",
    en: "to change or improve a system completely",
    vi: "cải tổ, đại tu (một hệ thống)",
    synonyms: ["restructure"],
    antonyms: [],
    examples: [
      { en: "Technological advances served to overhaul industries at a lightning-fast pace.", vi: "Những tiến bộ công nghệ đã cải tổ các ngành công nghiệp với tốc độ nhanh chóng mặt." },
      { en: "The company decided to overhaul its entire supply chain system.", vi: "Công ty đã quyết định cải tổ toàn bộ hệ thống chuỗi cung ứng của mình." },
    ],
    ieltsTip: "\"Overhaul a system\" là động từ mạnh, hữu ích thay cho \"change\" trong Writing Task 2.",
    summary: "overhaul = cải tổ, đại tu triệt để (một hệ thống, ngành nghề).",
  },
  {
    term: "cutting-edge",
    ipa: "/ˈkʌtɪŋ edʒ/",
    pos: "adjective",
    usageNote: "mô tả công nghệ/phương pháp tiên tiến nhất hiện có trong một lĩnh vực",
    en: "using the most modern methods or technology available",
    vi: "tiên tiến nhất, hiện đại nhất",
    synonyms: ["state-of-the-art"],
    antonyms: ["outdated"],
    examples: [
      { en: "This cutting-edge, more sophisticated technology brought with it a whole new set of problems.", vi: "Công nghệ tiên tiến, tinh vi hơn này đã mang theo cả một loạt vấn đề mới." },
      { en: "The lab is equipped with cutting-edge research facilities.", vi: "Phòng thí nghiệm được trang bị các cơ sở nghiên cứu tiên tiến nhất." },
    ],
    ieltsTip: "\"Cutting-edge technology\" là collocation nâng band, thay cho \"new/modern technology\" trong Writing.",
    summary: "cutting-edge = tiên tiến nhất, hiện đại nhất (trong một lĩnh vực).",
  },
  {
    term: "sophisticated",
    ipa: "/səˈfɪstɪkeɪtɪd/",
    pos: "adjective",
    usageNote: "mô tả máy móc/hệ thống được phát triển ở mức độ phức tạp, tinh vi cao",
    en: "(of a machine, system, or technique) highly developed and complex",
    vi: "tinh vi, phức tạp (một cách tinh tế)",
    synonyms: ["advanced", "complex"],
    antonyms: ["simple", "basic"],
    examples: [
      { en: "Modern smartphones contain increasingly sophisticated processors.", vi: "Điện thoại thông minh hiện đại chứa các bộ vi xử lý ngày càng tinh vi." },
      { en: "The security system is far more sophisticated than the previous one.", vi: "Hệ thống an ninh này tinh vi hơn nhiều so với hệ thống trước đó." },
    ],
    ieltsTip: "\"Sophisticated technology/system\" hữu ích khi mô tả mức độ phát triển của công nghệ trong Writing Task 2.",
    summary: "sophisticated = tinh vi, phức tạp (một cách tinh tế); trái nghĩa với 'basic'.",
  },
  {
    term: "harness",
    ipa: "/ˈhɑːnɪs/",
    pos: "verb",
    usageNote: "dùng khi khai thác, tận dụng một nguồn lực hoặc công nghệ để phục vụ một mục đích cụ thể",
    en: "to control and use the force or qualities of something to produce power or achieve something",
    vi: "khai thác, tận dụng (để phục vụ mục đích)",
    synonyms: ["utilise", "exploit"],
    antonyms: ["waste"],
    examples: [
      { en: "The entertainment industry harnessed satellite technology to give consumers more choice.", vi: "Ngành công nghiệp giải trí đã khai thác công nghệ vệ tinh để mang lại nhiều lựa chọn hơn cho người tiêu dùng." },
      { en: "Engineers are working on ways to harness solar energy more efficiently.", vi: "Các kỹ sư đang nghiên cứu cách khai thác năng lượng mặt trời hiệu quả hơn." },
    ],
    ieltsTip: "\"Harness technology/energy\" là collocation học thuật, hữu ích trong Writing Task 2 về năng lượng, công nghệ.",
    summary: "harness = khai thác, tận dụng (nguồn lực, công nghệ) để phục vụ mục đích.",
  },
  {
    term: "portable",
    ipa: "/ˈpɔːtəbəl/",
    pos: "adjective",
    usageNote: "mô tả thiết bị nhỏ gọn, có thể mang theo dễ dàng",
    en: "designed to be easily carried or moved",
    vi: "di động, có thể mang theo dễ dàng",
    synonyms: ["mobile"],
    antonyms: ["stationary"],
    examples: [
      { en: "The ability to store data allowed us to keep computer technology portable.", vi: "Khả năng lưu trữ dữ liệu giúp chúng ta duy trì tính di động của công nghệ máy tính." },
      { en: "Portable devices have made it easier to work from anywhere.", vi: "Các thiết bị di động đã giúp việc làm việc từ bất cứ đâu trở nên dễ dàng hơn." },
    ],
    ieltsTip: "\"Portable device/technology\" hữu ích khi mô tả xu hướng công nghệ hiện đại trong Writing Task 2.",
    summary: "portable = di động, có thể mang theo dễ dàng.",
  },
  {
    term: "tech-savvy",
    ipa: "/tek ˈsævi/",
    pos: "adjective",
    usageNote: "mô tả người am hiểu, sử dụng thành thạo các công nghệ/thiết bị mới",
    en: "having a good understanding of and skill in using modern technology",
    vi: "am hiểu công nghệ, thành thạo công nghệ",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "The internet helped tech-savvy music lovers to force changes in the way the music industry did business.", vi: "Internet đã giúp những người yêu nhạc am hiểu công nghệ tạo ra thay đổi trong cách ngành công nghiệp âm nhạc vận hành." },
      { en: "Younger employees tend to be more tech-savvy than older colleagues.", vi: "Nhân viên trẻ thường am hiểu công nghệ hơn các đồng nghiệp lớn tuổi." },
    ],
    ieltsTip: "\"Tech-savvy\" là tính từ ghép hiện đại, hữu ích khi mô tả khoảng cách công nghệ giữa các thế hệ.",
    summary: "tech-savvy = am hiểu công nghệ, thành thạo công nghệ hiện đại.",
  },
  {
    term: "internet addiction",
    ipa: "/ˈɪntənet əˈdɪkʃən/",
    pos: "phrase",
    usageNote: "chỉ tình trạng nghiện internet, không thể kiểm soát việc sử dụng",
    en: "a compulsive need to spend a great deal of time using the internet",
    vi: "nghiện internet",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Internet addiction is becoming a growing concern among parents of teenagers.", vi: "Nghiện internet đang trở thành mối lo ngại ngày càng lớn đối với cha mẹ của các thanh thiếu niên." },
      { en: "Some countries have opened clinics specifically to treat internet addiction.", vi: "Một số quốc gia đã mở các phòng khám chuyên điều trị chứng nghiện internet." },
    ],
    ieltsTip: "\"Internet addiction\" là chủ đề quen thuộc trong Writing Task 2 về ảnh hưởng tiêu cực của công nghệ.",
    summary: "internet addiction = nghiện internet.",
  },
  {
    term: "illegal downloads",
    ipa: "/ɪˈliːɡəl ˈdaʊnləʊdz/",
    pos: "phrase",
    usageNote: "chỉ việc tải xuống nội dung (nhạc, phim) bất hợp pháp, vi phạm bản quyền",
    en: "copies of music, films, or software obtained from the internet without permission",
    vi: "tải xuống bất hợp pháp (vi phạm bản quyền)",
    synonyms: ["piracy"],
    antonyms: [],
    examples: [
      { en: "The music industry has lost billions of dollars due to illegal downloads.", vi: "Ngành công nghiệp âm nhạc đã mất hàng tỷ đô la vì tải xuống bất hợp pháp." },
      { en: "Illegal downloads remain a major concern for film studios.", vi: "Tải xuống bất hợp pháp vẫn là mối lo ngại lớn đối với các hãng phim." },
    ],
    ieltsTip: "\"Illegal downloads\" hữu ích khi bàn về quyền sở hữu trí tuệ trong Writing Task 2 về công nghệ.",
    summary: "illegal downloads = tải xuống bất hợp pháp (vi phạm bản quyền).",
  },
  {
    term: "internet fraud",
    ipa: "/ˈɪntənet frɔːd/",
    pos: "phrase",
    usageNote: "chỉ hành vi lừa đảo qua mạng internet, thường nhằm chiếm đoạt tiền",
    en: "the crime of deceiving people online, especially to get money",
    vi: "lừa đảo qua mạng",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Internet fraud has become more sophisticated as technology develops.", vi: "Lừa đảo qua mạng đã trở nên tinh vi hơn khi công nghệ phát triển." },
      { en: "She lost her savings after falling victim to internet fraud.", vi: "Cô ấy đã mất hết tiền tiết kiệm sau khi trở thành nạn nhân của lừa đảo qua mạng." },
    ],
    ieltsTip: "\"Fall victim to internet fraud\" là cấu trúc hữu ích khi kể chuyện hoặc viết về an ninh mạng.",
    summary: "internet fraud = lừa đảo qua mạng internet.",
  },
  {
    term: "cyberbullying",
    ipa: "/ˈsaɪbəˌbʊliɪŋ/",
    pos: "noun",
    usageNote: "chỉ hành vi bắt nạt, quấy rối người khác qua mạng, đặc biệt mạng xã hội",
    en: "the use of the internet, especially social media, to hurt or frighten someone",
    vi: "bắt nạt qua mạng",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Cyberbullying is listed as one of the disadvantages of increased internet use among teenagers.", vi: "Bắt nạt qua mạng được liệt kê là một trong những mặt trái của việc thanh thiếu niên sử dụng internet nhiều hơn." },
      { en: "Schools are introducing new policies to tackle cyberbullying.", vi: "Các trường học đang áp dụng các chính sách mới để giải quyết vấn đề bắt nạt qua mạng." },
    ],
    ieltsTip: "\"Tackle cyberbullying\" là collocation hữu ích trong Writing Task 2 về mạng xã hội, giáo dục.",
    summary: "cyberbullying = bắt nạt qua mạng (đặc biệt trên mạng xã hội).",
  },
  {
    term: "information overload",
    ipa: "/ˌɪnfəˈmeɪʃən ˈəʊvələʊd/",
    pos: "phrase",
    usageNote: "chỉ tình trạng bị quá tải bởi lượng thông tin quá lớn, khó xử lý hết",
    en: "the state of having too much information to deal with",
    vi: "quá tải thông tin",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Many people suffer from information overload due to constant notifications from their phones.", vi: "Nhiều người bị quá tải thông tin vì liên tục nhận thông báo từ điện thoại." },
      { en: "Information overload can make it harder to focus on what really matters.", vi: "Quá tải thông tin có thể khiến việc tập trung vào những điều thực sự quan trọng trở nên khó khăn hơn." },
    ],
    ieltsTip: "\"Suffer from information overload\" hữu ích khi bàn về tác động tiêu cực của công nghệ số trong Writing Task 2.",
    summary: "information overload = tình trạng quá tải thông tin.",
  },
  {
    term: "demolish",
    ipa: "/dɪˈmɒlɪʃ/",
    pos: "verb",
    usageNote: "dùng khi phá dỡ, san bằng một công trình xây dựng một cách có chủ đích",
    en: "to intentionally destroy a building",
    vi: "phá dỡ, san bằng (công trình)",
    synonyms: ["knock down"],
    antonyms: ["build", "construct"],
    examples: [
      { en: "The old factory was demolished to make way for new apartments.", vi: "Nhà máy cũ đã bị phá dỡ để nhường chỗ cho các căn hộ mới." },
      { en: "Engineers decided the bridge was unsafe and had to be demolished.", vi: "Các kỹ sư quyết định rằng cây cầu không an toàn và phải bị phá dỡ." },
    ],
    ieltsTip: "\"Demolish a building\" trái nghĩa với \"construct/build\" — cặp từ hữu ích trong Writing Task 2 về đô thị hoá.",
    summary: "demolish = phá dỡ, san bằng (một công trình); trái nghĩa với 'construct'.",
  },
  {
    term: "innovate",
    ipa: "/ˈɪnəveɪt/",
    pos: "verb",
    usageNote: "dùng khi giới thiệu phương pháp, ý tưởng hoặc sản phẩm mới",
    en: "to introduce new methods, ideas, or products",
    vi: "đổi mới, sáng tạo",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Companies must constantly innovate to stay competitive.", vi: "Các công ty phải liên tục đổi mới để duy trì tính cạnh tranh." },
      { en: "Leonardo da Vinci innovated in fields as different as engineering and anatomy.", vi: "Leonardo da Vinci đã đổi mới trong các lĩnh vực khác nhau như kỹ thuật và giải phẫu học." },
    ],
    ieltsTip: "Danh từ \"innovation\" cùng gốc, rất phổ biến trong Writing Task 2 về công nghệ, kinh doanh.",
    summary: "innovate = đổi mới, sáng tạo (phương pháp, sản phẩm mới).",
  },
  {
    term: "timber",
    ipa: "/ˈtɪmbə/",
    pos: "noun",
    usageNote: "chỉ gỗ đã qua xử lý, dùng làm vật liệu xây dựng",
    en: "wood that has been prepared for use in building",
    vi: "gỗ (vật liệu xây dựng)",
    synonyms: ["wood"],
    antonyms: [],
    examples: [
      { en: "The house was built almost entirely from timber.", vi: "Ngôi nhà được xây dựng gần như hoàn toàn từ gỗ." },
      { en: "Timber remains a popular building material because it is renewable.", vi: "Gỗ vẫn là vật liệu xây dựng phổ biến vì nó có thể tái tạo được." },
    ],
    ieltsTip: "\"Timber\" là từ trang trọng hơn \"wood\" khi nói về vật liệu xây dựng trong bài đọc/Writing.",
    summary: "timber = gỗ (đã qua xử lý, dùng làm vật liệu xây dựng).",
  },
  {
    term: "concrete",
    ipa: "/ˈkɒŋkriːt/",
    pos: "noun",
    usageNote: "chỉ vật liệu xây dựng cứng làm từ xi măng, cát, đá và nước",
    en: "a hard building material made from a mixture of cement, sand, small stones, and water",
    vi: "bê tông",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Most modern buildings are constructed using steel and concrete.", vi: "Hầu hết các toà nhà hiện đại được xây dựng bằng thép và bê tông." },
      { en: "The bridge's concrete supports have lasted for over fifty years.", vi: "Các trụ đỡ bê tông của cây cầu đã tồn tại hơn năm mươi năm." },
    ],
    ieltsTip: "\"Steel and concrete\" là collocation phổ biến khi mô tả kiến trúc hiện đại trong bài đọc/Writing Task 1.",
    summary: "concrete = bê tông (vật liệu xây dựng từ xi măng, cát, đá, nước).",
  },
  {
    term: "fibre",
    ipa: "/ˈfaɪbə/",
    pos: "noun",
    usageNote: "chỉ vật liệu dạng sợi mảnh, dùng để dệt vải hoặc gia cố các vật liệu khác",
    en: "a thin thread-like piece of material, used to make cloth or reinforce other materials",
    vi: "sợi (vật liệu)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Cotton is a natural fibre commonly used in clothing.", vi: "Bông là một loại sợi tự nhiên thường được dùng trong may mặc." },
      { en: "Carbon fibre is prized for being both light and extremely strong.", vi: "Sợi cacbon được ưa chuộng vì vừa nhẹ vừa cực kỳ chắc chắn." },
    ],
    ieltsTip: "\"Carbon fibre\" là vật liệu hiện đại hay xuất hiện trong bài đọc khoa học/công nghệ.",
    summary: "fibre = sợi (vật liệu dệt vải hoặc gia cố).",
  },
];

const track21Script = `Leonardo da Vinci was a renowned artist but he was also a scientist, engineer and inventor. Many of his designs were futuristic for the time and were never built. This was because they were either too costly or impractical since the necessary materials either did not exist at the time or were too heavy. Leonardo conceived ideas vastly ahead of his own time, such as a helicopter, the use of solar power and a calculator. The source of all this information and the reason we know so much about Leonardo and his work is the legacy he left behind. Leonardo followed his grandfather's habit of keeping a journal. He used his journals to diligently record his observations and, fortunately for us, diagrams of his inventions, such as those of a flying machine.

As well as his drawings, Leonardo constructed models. He used these to demonstrate many of his ideas, such as how better access could be obtained in mountainous areas by creating a tunnel. Leonardo was a master of mechanical principles. He also demonstrated how to lift great weights by means of levers and pulleys, and ways of cleaning harbours by using a pump to suck up water from great depths.

Because Leonardo's inventions date from an era before the issue of patents, it is impossible to say with any certainty how many of his inventions passed into general and practical use. Among those inventions that he is credited with are the strut bridge, the machine for testing the tensile strength of wire and even our modern day scissors.

He also invented many types of war machines. One of his many notebooks contains drawings of a tank. Although the drawing itself looks quite finished, the mechanics were apparently not fully developed because, if it was built as it was drawn, the tank might be able to rotate on the spot, but it would never progress forwards.`;

const UNIT_11_PROGRESS: CambridgeUnit = {
  unit: 11,
  slug: "progress",
  title: "Progress",
  topics: "Technology, design",
  testPractice: "Reading",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit11Vocab,
    },
    {
      kind: "sort",
      title: "Technology advances or technology problems?",
      instructions: "Tap a word, then tap the category it belongs to.",
      buckets: ["Technology advances", "Technology problems"],
      items: [
        { term: "revolutionise", bucket: 0 },
        { term: "advent", bucket: 0 },
        { term: "overhaul", bucket: 0 },
        { term: "cutting-edge", bucket: 0 },
        { term: "sophisticated", bucket: 0 },
        { term: "harness", bucket: 0 },
        { term: "portable", bucket: 0 },
        { term: "tech-savvy", bucket: 0 },
        { term: "innovate", bucket: 0 },
        { term: "internet addiction", bucket: 1 },
        { term: "illegal downloads", bucket: 1 },
        { term: "internet fraud", bucket: 1 },
        { term: "cyberbullying", bucket: 1 },
        { term: "information overload", bucket: 1 },
      ],
    },
    {
      kind: "type_fill",
      title: "Building materials",
      instructions: "Read each definition and type the matching word from this unit.",
      items: [
        { prompt: "___ is wood that has been prepared for use in building.", answer: "timber" },
        { prompt: "___ is a hard building material made from cement, sand, stones and water.", answer: "concrete" },
        { prompt: "A thin, thread-like material used to make cloth or reinforce other materials is called ___.", answer: "fibre" },
        { prompt: "To intentionally destroy a building is to ___ it.", answer: "demolish" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Technology in context",
      instructions: "Choose the word that best completes each sentence.",
      items: [
        { before: "Wireless technology has", after: "the way we communicate and access information.", options: ["revolutionised", "demolished", "harnessed"], answer: "revolutionised" },
        { before: "Since the", after: "of smartphones, people rarely use paper maps.", options: ["advent", "overhaul", "harness"], answer: "advent" },
        { before: "The company decided to", after: "its entire supply chain system.", options: ["overhaul", "harness", "demolish"], answer: "overhaul" },
        { before: "The lab is equipped with", after: "research facilities.", options: ["cutting-edge", "portable", "tech-savvy"], answer: "cutting-edge" },
        { before: "Engineers are working on ways to", after: "solar energy more efficiently.", options: ["harness", "overhaul", "demolish"], answer: "harness" },
        { before: "Younger employees tend to be more", after: "than older colleagues.", options: ["tech-savvy", "portable", "sophisticated"], answer: "tech-savvy" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Problems of the internet",
      instructions: "Choose the word or phrase that best completes each sentence.",
      items: [
        { before: "", after: "is becoming a growing concern among parents of teenagers.", options: ["Internet addiction", "Internet fraud", "Information overload"], answer: "Internet addiction" },
        { before: "The music industry has lost billions of dollars due to", after: ".", options: ["illegal downloads", "cyberbullying", "internet addiction"], answer: "illegal downloads" },
        { before: "She lost her savings after falling victim to", after: ".", options: ["internet fraud", "cyberbullying", "information overload"], answer: "internet fraud" },
        { before: "Schools are introducing new policies to tackle", after: ".", options: ["cyberbullying", "internet fraud", "illegal downloads"], answer: "cyberbullying" },
        { before: "Many people suffer from", after: "due to constant notifications from their phones.", options: ["information overload", "internet addiction", "internet fraud"], answer: "information overload" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "The genius of Leonardo da Vinci",
      instructions: "Listen to a talk about Leonardo da Vinci. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-21.mp3",
      tip: "For questions where you need to write a word, it will usually appear in the recording in exactly the same form — you do not need to change it.",
      template:
        "Leonardo da Vinci was a renowned artist but also a scientist, engineer and inventor. Many of his designs were futuristic and never built because the necessary {{materials}} either did not exist or were too heavy — examples include a helicopter, solar power, and a {{calculator}}.\n\n" +
        "We know so much about Leonardo because he kept journals recording his observations and {{diagrams}} of inventions such as a flying machine. He also built {{models}} to demonstrate ideas, such as using a {{tunnel}} for movement through mountainous areas, and showed how a {{pump}} could draw water from great depths.\n\n" +
        "Because Leonardo worked before the existence of {{patents}}, we cannot know for certain how many of his inventions were used. Some, however, are still used today, including the strut bridge, a wire-testing machine, and even modern {{scissors}}.\n\n" +
        "He also invented many war machines, including a tank that — as drawn — could rotate on the spot but would never progress {{forwards}}.",
      script: track21Script,
    },
    {
      kind: "speaking",
      title: "Speaking — a piece of technology you use every day",
      prompt: "Describe a piece of technology you use every day.",
      bullets: [
        "what it is",
        "how long you've had it",
        "how you use it",
        "and explain how your life would be different without it",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"How has technology changed the way people communicate?\" — think about how you'd answer that too. Try working in some of this unit's vocabulary (cutting-edge, portable, revolutionise...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "vanish completely", reveal: "disappear without a trace" },
        { prompt: "not comforting", reveal: "considerably less comforting" },
        { prompt: "grow bigger and bigger", reveal: "tended to snowball" },
        { prompt: "an unexpected huge success", reveal: "a runaway hit" },
        { prompt: "worrying implication", reveal: "unsettling for anyone who assumes" },
        { prompt: "essentially by chance", reveal: "essentially random differences" },
        { prompt: "builds up over time", reveal: "compounding over time" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Test practice — Reading",
      passageTitle: "What a music experiment revealed about popularity",
      passage:
        "Why do some songs become massive hits while other, seemingly similar songs by similar artists disappear without a trace? For a long time, the standard explanation was simply quality: better songs succeed, weaker ones don't. A now well-known online experiment suggested the truth is more complicated, and considerably less comforting for anyone hoping that merit alone determines success.\n\n" +
        "Researchers built a website where thousands of participants could listen to, rate, and download songs by relatively unknown bands. Crucially, participants were split into separate groups. In one group, listeners could see how many times other people in their group had already downloaded each song; in another, described as an independent condition, listeners could not see any of this information and had to judge each song purely on their own reaction to it.\n\n" +
        "In the independent condition, where social influence was removed, the best-rated songs did reasonably well and the worst-rated songs did reasonably poorly — quality was not irrelevant. But in the groups where participants could see other people's downloads, outcomes became far less predictable. The same song might become a runaway hit in one group and attract barely any attention in another, parallel group exposed to the identical set of songs. Early downloads, however arbitrary, tended to snowball: a song that happened to attract a handful of early listeners became more visible, which attracted more listeners still, regardless of how it had been rated on quality alone.\n\n" +
        "The implication is unsettling for anyone who assumes that popularity straightforwardly reflects merit. Small, essentially random differences in a song's early reception, rather than differences in quality, appeared to be doing much of the work in determining which songs became hits. The researchers have since argued that the same basic dynamic — early, somewhat arbitrary advantages compounding over time — likely shapes success far beyond music, in areas from books to viral news stories to social media trends.",
      questions: [
        {
          text: "Before this experiment, most people assumed that popularity was mainly determined by quality.",
          answer: "True",
          justification: "The standard explanation was simply quality: better songs succeed, weaker ones don't.",
        },
        {
          text: "In the experiment, all participants could see how many times other people had downloaded each song.",
          answer: "False",
          justification: "Only some groups could see this; the independent condition could not.",
        },
        {
          text: "In the independent condition, song quality had no effect on how well a song performed.",
          answer: "False",
          justification: "Quality was not irrelevant — the best-rated songs did reasonably well.",
        },
        {
          text: "The same song performed identically in every group where social influence was visible.",
          answer: "False",
          justification: "The same song might become a runaway hit in one group and attract barely any attention in another.",
        },
        {
          text: "Early downloads tended to make a song even more popular over time.",
          answer: "True",
          justification: "Early downloads, however arbitrary, tended to snowball.",
        },
        {
          text: "The researchers concluded that popularity is entirely random and has nothing to do with quality.",
          answer: "False",
          justification: "The passage states quality was 'not irrelevant', which contradicts a claim that it has nothing to do with quality.",
        },
        {
          text: "The researchers believe similar dynamics might apply to how books or news stories become popular.",
          answer: "True",
          justification: "The same dynamic likely shapes success far beyond music, in areas from books to viral news stories.",
        },
      ],
    },
  ],
};

const unit12Vocab: VocabWord[] = [
  {
    term: "trendy",
    ipa: "/ˈtrendi/",
    pos: "adjective",
    usageNote: "mang tính thân mật, mô tả điều gì đó hợp thời trang, đang thịnh hành",
    en: "fashionable at the current time",
    vi: "hợp thời trang, thịnh hành",
    synonyms: ["fashionable", "stylish"],
    antonyms: ["outdated"],
    examples: [
      { en: "She always wears trendy clothes from the latest collections.", vi: "Cô ấy luôn mặc quần áo hợp thời trang từ những bộ sưu tập mới nhất." },
      { en: "The café has become a trendy spot for young professionals.", vi: "Quán cà phê đã trở thành địa điểm thịnh hành cho giới trẻ đi làm." },
    ],
    ieltsTip: "\"Trendy\" mang tính thân mật hơn \"fashionable\" — phù hợp trong Speaking hơn Writing trang trọng.",
    summary: "trendy = hợp thời trang, đang thịnh hành.",
  },
  {
    term: "chic",
    ipa: "/ʃiːk/",
    pos: "adjective",
    usageNote: "vay mượn từ tiếng Pháp, mang sắc thái sang trọng, gu thẩm mỹ tinh tế",
    en: "stylish and elegant",
    vi: "thanh lịch, sành điệu",
    synonyms: ["elegant", "stylish"],
    antonyms: ["dowdy"],
    examples: [
      { en: "She wore a chic black dress to the gala.", vi: "Cô ấy mặc một chiếc váy đen thanh lịch đến buổi dạ tiệc." },
      { en: "The hotel lobby had a chic, minimalist design.", vi: "Sảnh khách sạn có thiết kế thanh lịch, tối giản." },
    ],
    ieltsTip: "\"Chic\" vay mượn từ tiếng Pháp, mang sắc thái sang trọng hơn \"stylish\" — hữu ích trong Speaking Part 2.",
    summary: "chic = thanh lịch, sành điệu (gu thẩm mỹ tinh tế).",
  },
  {
    term: "drab",
    ipa: "/dræb/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó tẻ nhạt, thiếu màu sắc hoặc sức sống",
    en: "lacking brightness or interest; dull",
    vi: "tẻ nhạt, ảm đạm (thiếu màu sắc)",
    synonyms: ["dull", "dreary"],
    antonyms: ["vibrant", "colourful"],
    examples: [
      { en: "He was tired of his drab office clothes and wanted something more colourful.", vi: "Anh ấy đã chán với những bộ đồ công sở tẻ nhạt và muốn thứ gì đó sặc sỡ hơn." },
      { en: "The building's drab exterior didn't match its lively interior.", vi: "Mặt ngoài tẻ nhạt của toà nhà không tương xứng với nội thất sống động bên trong." },
    ],
    ieltsTip: "\"Drab\" trái nghĩa với \"vibrant/colourful\" — hữu ích khi mô tả trang phục hoặc không gian trong Speaking Part 2.",
    summary: "drab = tẻ nhạt, ảm đạm (thiếu màu sắc, sức sống).",
  },
  {
    term: "mundane",
    ipa: "/mʌnˈdeɪn/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó tầm thường, nhàm chán, thuộc về đời sống thường nhật",
    en: "not interesting or exciting; ordinary",
    vi: "tầm thường, nhàm chán (đời thường)",
    synonyms: ["ordinary", "dull"],
    antonyms: ["extraordinary"],
    examples: [
      { en: "She wanted an outfit that stood out, not something mundane.", vi: "Cô ấy muốn một bộ trang phục nổi bật, không phải thứ gì đó tầm thường." },
      { en: "Most of his day is spent on mundane tasks like answering emails.", vi: "Hầu hết thời gian trong ngày của anh ấy dành cho những công việc tầm thường như trả lời email." },
    ],
    ieltsTip: "\"Mundane tasks/routine\" hữu ích khi mô tả sự nhàm chán trong công việc, cuộc sống ở Speaking Part 3.",
    summary: "mundane = tầm thường, nhàm chán (thuộc đời sống thường nhật).",
  },
  {
    term: "all the rage",
    ipa: "/ɔːl ðə reɪdʒ/",
    pos: "phrase",
    usageNote: "thành ngữ thân mật, chỉ điều gì đó đang cực kỳ thịnh hành trong một thời gian ngắn",
    en: "very popular for a short period of time",
    vi: "đang cực kỳ thịnh hành (nhất thời)",
    synonyms: ["in fashion"],
    antonyms: ["out of fashion"],
    examples: [
      { en: "When I was about 11, boots with really high heels were all the rage.", vi: "Khi tôi khoảng 11 tuổi, giày cao gót thật cao đang cực kỳ thịnh hành." },
      { en: "Bubble tea was all the rage a few years ago.", vi: "Trà sữa trân châu từng cực kỳ thịnh hành vài năm trước." },
    ],
    ieltsTip: "\"All the rage\" là thành ngữ thân mật, phù hợp trong Speaking khi nói về xu hướng nhất thời.",
    summary: "all the rage = đang cực kỳ thịnh hành (trong một thời gian ngắn).",
  },
  {
    term: "a must-have",
    ipa: "/ə ˈmʌst hæv/",
    pos: "phrase",
    usageNote: "chỉ một món đồ được coi là thiết yếu phải có, thường theo xu hướng nhất thời",
    en: "something that is considered essential or highly desirable to own",
    vi: "món đồ phải có, thiết yếu (theo xu hướng)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Within a month, there was some other must-have item and the boots went out of fashion.", vi: "Chỉ trong vòng một tháng, đã có một món đồ phải có khác và đôi giày cao gót đã lỗi mốt." },
      { en: "This season's must-have accessory is a leather tote bag.", vi: "Món phụ kiện phải có của mùa này là túi tote da." },
    ],
    ieltsTip: "\"A must-have item\" hữu ích khi mô tả xu hướng tiêu dùng, thời trang trong Writing Task 2.",
    summary: "a must-have = món đồ được coi là phải có, thiết yếu (theo xu hướng).",
  },
  {
    term: "fashion-conscious",
    ipa: "/ˈfæʃən ˈkɒnʃəs/",
    pos: "adjective",
    usageNote: "tính từ ghép, mô tả người luôn để ý, quan tâm đến xu hướng thời trang",
    en: "very interested in and aware of the latest fashion",
    vi: "quan tâm, để ý đến thời trang",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "I wouldn't say I'm fashion-conscious at all, though a few of my friends are.", vi: "Tôi sẽ không nói mình quan tâm đến thời trang chút nào, mặc dù vài người bạn của tôi thì có." },
      { en: "Fashion-conscious shoppers often queue overnight for new releases.", vi: "Những người mua sắm quan tâm đến thời trang thường xếp hàng qua đêm để mua sản phẩm mới ra mắt." },
    ],
    ieltsTip: "Tính từ ghép \"fashion-conscious\" hữu ích khi mô tả bản thân hoặc người khác trong Speaking Part 1/2.",
    summary: "fashion-conscious = quan tâm, để ý đến xu hướng thời trang.",
  },
  {
    term: "a passing trend",
    ipa: "/ə ˈpɑːsɪŋ trend/",
    pos: "phrase",
    usageNote: "chỉ một xu hướng chỉ tồn tại trong thời gian ngắn rồi biến mất",
    en: "a fashion or interest that lasts only a short time",
    vi: "một xu hướng nhất thời, chóng qua",
    synonyms: ["fad"],
    antonyms: ["a lasting trend"],
    examples: [
      { en: "They just don't seem to realise that it's just a passing trend and it'll soon be considered out-of-date.", vi: "Họ dường như không nhận ra rằng đó chỉ là một xu hướng nhất thời và sẽ sớm bị coi là lỗi thời." },
      { en: "Some experts believe remote work is more than just a passing trend.", vi: "Một số chuyên gia tin rằng làm việc từ xa không chỉ là một xu hướng nhất thời." },
    ],
    ieltsTip: "\"A passing trend/fad\" hữu ích khi bàn về sự thay đổi trong Writing Task 2 về văn hoá tiêu dùng.",
    summary: "a passing trend = xu hướng nhất thời, chóng qua (rồi biến mất).",
  },
  {
    term: "hoard",
    ipa: "/hɔːd/",
    pos: "verb",
    usageNote: "dùng khi tích trữ, cất giữ thứ gì đó, thường nhiều hơn mức cần thiết",
    en: "to collect and store large amounts of something, often more than you need",
    vi: "tích trữ (thường quá mức)",
    synonyms: ["stockpile"],
    antonyms: ["discard"],
    examples: [
      { en: "Some people hoard old newspapers and magazines for years.", vi: "Một số người tích trữ báo và tạp chí cũ trong nhiều năm." },
      { en: "During the crisis, many households began to hoard food and supplies.", vi: "Trong thời kỳ khủng hoảng, nhiều hộ gia đình bắt đầu tích trữ thực phẩm và nhu yếu phẩm." },
    ],
    ieltsTip: "\"Hoard\" mang sắc thái tiêu cực nhẹ (tích trữ quá mức) — hữu ích khi phê phán thói quen tiêu dùng.",
    summary: "hoard = tích trữ, cất giữ (thường nhiều hơn mức cần thiết).",
  },
  {
    term: "stockpile",
    ipa: "/ˈstɒkpaɪl/",
    pos: "verb",
    usageNote: "dùng khi tích trữ một lượng lớn để dùng trong tương lai, thường mang tính phòng ngừa",
    en: "to store a large supply of something for future use",
    vi: "tích trữ (lượng lớn, phòng ngừa)",
    synonyms: ["hoard"],
    antonyms: [],
    examples: [
      { en: "Consumers began to stockpile clothing they rarely wore.", vi: "Người tiêu dùng bắt đầu tích trữ quần áo mà họ hiếm khi mặc." },
      { en: "The government stockpiles emergency supplies in case of natural disasters.", vi: "Chính phủ tích trữ vật tư khẩn cấp phòng khi có thiên tai." },
    ],
    ieltsTip: "\"Stockpile supplies/goods\" hữu ích khi bàn về hành vi tiêu dùng, dự trữ trong Writing Task 2.",
    summary: "stockpile = tích trữ (lượng lớn để dùng sau, mang tính phòng ngừa).",
  },
  {
    term: "discard",
    ipa: "/dɪsˈkɑːd/",
    pos: "verb",
    usageNote: "dùng khi vứt bỏ, loại bỏ thứ gì đó không còn cần dùng",
    en: "to throw something away because you no longer want or need it",
    vi: "vứt bỏ, loại bỏ",
    synonyms: ["throw away"],
    antonyms: ["keep", "retain"],
    examples: [
      { en: "Fast fashion encourages people to discard clothes after only a few wears.", vi: "Thời trang nhanh khuyến khích mọi người vứt bỏ quần áo chỉ sau vài lần mặc." },
      { en: "Old batteries should never be discarded with regular household waste.", vi: "Pin cũ không bao giờ nên bị vứt bỏ cùng với rác thải sinh hoạt thông thường." },
    ],
    ieltsTip: "\"Discard\" là từ trang trọng hơn \"throw away\" — dùng trong Writing Task 2 về tiêu dùng, môi trường.",
    summary: "discard = vứt bỏ, loại bỏ (thứ không còn cần dùng).",
  },
  {
    term: "dispose of",
    ipa: "/dɪˈspəʊz əv/",
    pos: "phrase",
    usageNote: "dùng khi loại bỏ, xử lý rác thải hoặc vật không cần dùng một cách có hệ thống",
    en: "to get rid of something, especially in an official or careful way",
    vi: "loại bỏ, xử lý (rác thải, đồ không cần)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Rather than disposing of plastic bags, people should recycle them.", vi: "Thay vì vứt bỏ túi nhựa, mọi người nên tái chế chúng." },
      { en: "Companies must dispose of hazardous waste according to strict regulations.", vi: "Các công ty phải xử lý chất thải nguy hại theo các quy định nghiêm ngặt." },
    ],
    ieltsTip: "\"Dispose of waste\" là collocation học thuật, hữu ích trong Writing Task 2 về môi trường.",
    summary: "dispose of = loại bỏ, xử lý (rác thải, đồ không cần dùng).",
  },
  {
    term: "eradicate",
    ipa: "/ɪˈrædɪkeɪt/",
    pos: "verb",
    usageNote: "dùng khi xoá bỏ hoàn toàn, tiêu diệt tận gốc một vấn đề",
    en: "to destroy or get rid of something completely",
    vi: "xoá bỏ hoàn toàn, tiêu diệt tận gốc",
    synonyms: ["eliminate"],
    antonyms: [],
    examples: [
      { en: "Companies will cause an environmental disaster if they illegally dump waste in our rivers.", vi: "Các công ty sẽ gây ra thảm hoạ môi trường nếu họ xả thải bất hợp pháp xuống sông." },
      { en: "Vaccination campaigns have helped eradicate several deadly diseases.", vi: "Các chiến dịch tiêm chủng đã giúp xoá bỏ hoàn toàn một số căn bệnh chết người." },
    ],
    ieltsTip: "\"Eradicate a problem/disease\" là động từ mạnh, hữu ích trong Writing Task 2 khi đề xuất giải pháp triệt để.",
    summary: "eradicate = xoá bỏ hoàn toàn, tiêu diệt tận gốc (một vấn đề).",
  },
  {
    term: "consumerism",
    ipa: "/kənˈsjuːmərɪzəm/",
    pos: "noun",
    usageNote: "chỉ xu hướng coi trọng việc mua sắm, tiêu dùng hàng hoá trong xã hội",
    en: "the belief that buying and consuming goods is good for a society or individual",
    vi: "chủ nghĩa tiêu dùng",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "As the United States became the economic leader, it also took the lead in consumerism.", vi: "Khi Hoa Kỳ trở thành cường quốc kinh tế, nước này cũng dẫn đầu về chủ nghĩa tiêu dùng." },
      { en: "Critics argue that consumerism encourages people to define happiness through possessions.", vi: "Các nhà phê bình cho rằng chủ nghĩa tiêu dùng khiến người ta định nghĩa hạnh phúc qua của cải sở hữu." },
    ],
    ieltsTip: "\"Consumerism\" là chủ đề kinh điển trong Writing Task 2 về xã hội hiện đại, tiêu dùng.",
    summary: "consumerism = chủ nghĩa tiêu dùng.",
  },
  {
    term: "disposable income",
    ipa: "/dɪˈspəʊzəbəl ˈɪnkʌm/",
    pos: "phrase",
    usageNote: "chỉ phần thu nhập còn lại sau khi đã chi trả các khoản thiết yếu",
    en: "the money you have left to spend after paying taxes and essential bills",
    vi: "thu nhập khả dụng",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "The money you have left over after you have paid all of your expenses and bills is your disposable income.", vi: "Số tiền còn lại sau khi bạn đã thanh toán tất cả chi phí và hoá đơn chính là thu nhập khả dụng của bạn." },
      { en: "Rising prices have reduced many families' disposable income.", vi: "Giá cả tăng đã làm giảm thu nhập khả dụng của nhiều gia đình." },
    ],
    ieltsTip: "\"Disposable income\" là thuật ngữ kinh tế quan trọng, hữu ích trong Writing Task 1/2 về chi tiêu, thu nhập.",
    summary: "disposable income = thu nhập khả dụng (sau khi trừ chi phí thiết yếu).",
  },
  {
    term: "acquisitiveness",
    ipa: "/əˈkwɪzɪtɪvnəs/",
    pos: "noun",
    usageNote: "chỉ lòng ham muốn sở hữu, tích luỹ của cải một cách mạnh mẽ",
    en: "a strong desire to get and own more things",
    vi: "lòng ham muốn sở hữu, tích luỹ của cải",
    synonyms: ["greed"],
    antonyms: [],
    examples: [
      { en: "To curb our acquisitiveness, some experts suggest we should avoid brand names altogether.", vi: "Để kiềm chế lòng ham muốn sở hữu, một số chuyên gia gợi ý chúng ta nên tránh hoàn toàn các thương hiệu." },
      { en: "Modern advertising often exploits people's natural acquisitiveness.", vi: "Quảng cáo hiện đại thường lợi dụng lòng ham muốn sở hữu tự nhiên của con người." },
    ],
    ieltsTip: "\"Curb/fuel acquisitiveness\" hữu ích khi bàn về chủ nghĩa tiêu dùng trong Writing Task 2.",
    summary: "acquisitiveness = lòng ham muốn sở hữu, tích luỹ của cải.",
  },
  {
    term: "buyer's remorse",
    ipa: "/ˈbaɪəz rɪˈmɔːs/",
    pos: "phrase",
    usageNote: "chỉ cảm giác hối hận sau khi mua một món đồ, thường vì thấy không cần thiết hoặc quá đắt",
    en: "a feeling of regret after buying something, especially something expensive or unnecessary",
    vi: "cảm giác hối hận sau khi mua sắm",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Just as American as the need to buy, social observers say, is buyer's remorse.", vi: "Các nhà quan sát xã hội cho rằng, cũng giống như nhu cầu mua sắm, cảm giác hối hận sau khi mua cũng rất phổ biến ở người Mỹ." },
      { en: "She felt a wave of buyer's remorse after purchasing the expensive handbag.", vi: "Cô ấy cảm thấy hối hận sau khi mua chiếc túi xách đắt tiền." },
    ],
    ieltsTip: "\"Buyer's remorse\" là cụm từ hiện đại, hữu ích khi bàn về tâm lý tiêu dùng trong Speaking Part 3.",
    summary: "buyer's remorse = cảm giác hối hận sau khi mua sắm.",
  },
  {
    term: "de-clutter",
    ipa: "/diːˈklʌtə/",
    pos: "verb",
    usageNote: "dùng khi dọn dẹp, loại bỏ những đồ đạc không cần thiết để không gian gọn gàng hơn",
    en: "to remove unnecessary items from a place to make it tidier",
    vi: "dọn dẹp, loại bỏ đồ không cần thiết",
    synonyms: ["tidy up"],
    antonyms: [],
    examples: [
      { en: "A magazine called Real Simple specialises in de-cluttering advice.", vi: "Một tạp chí tên là Real Simple chuyên về lời khuyên dọn dẹp, loại bỏ đồ không cần thiết." },
      { en: "She spent the weekend de-cluttering her wardrobe.", vi: "Cô ấy dành cả cuối tuần để dọn dẹp tủ quần áo của mình." },
    ],
    ieltsTip: "\"De-clutter\" là động từ hiện đại, hữu ích khi bàn về lối sống tối giản trong Speaking Part 3.",
    summary: "de-clutter = dọn dẹp, loại bỏ đồ đạc không cần thiết.",
  },
];

const track24Script = `When I was about 11, boots with really high heels were all the rage. I begged and begged my mum to get me some but she refused. I remember how upset I was, but within a month there was some other must-have item and the boots went out of fashion. That taught me how fickle the world of fashion can be. I wouldn't say I'm fashion-conscious at all now, though a few of my friends are. It's not that they are real trendsetters or anything, it's just that I don't pay as much attention to it as they do. They always seem to know what's in fashion, and they spend just about all their money on the latest trend. They just don't seem to realise that it's just a passing trend and it'll soon be considered out-of-date. That's why I prefer classical styles, which aren't really affected by fashion trends.`;

const UNIT_12_THE_LATEST_THING: CambridgeUnit = {
  unit: 12,
  slug: "the-latest-thing",
  title: "The latest thing",
  topics: "Fashion and trends, consumerism",
  testPractice: "Reading",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit12Vocab,
    },
    {
      kind: "sort",
      title: "Fashion or consumerism?",
      instructions: "Tap a word, then tap the category it belongs to.",
      buckets: ["Fashion", "Consumerism"],
      items: [
        { term: "trendy", bucket: 0 },
        { term: "chic", bucket: 0 },
        { term: "drab", bucket: 0 },
        { term: "mundane", bucket: 0 },
        { term: "all the rage", bucket: 0 },
        { term: "a must-have", bucket: 0 },
        { term: "fashion-conscious", bucket: 0 },
        { term: "a passing trend", bucket: 0 },
        { term: "hoard", bucket: 1 },
        { term: "stockpile", bucket: 1 },
        { term: "discard", bucket: 1 },
        { term: "dispose of", bucket: 1 },
        { term: "eradicate", bucket: 1 },
        { term: "consumerism", bucket: 1 },
        { term: "disposable income", bucket: 1 },
        { term: "acquisitiveness", bucket: 1 },
        { term: "buyer's remorse", bucket: 1 },
        { term: "de-clutter", bucket: 1 },
      ],
    },
    {
      kind: "listening_cloze",
      title: "How fickle is fashion?",
      instructions: "Listen to a woman talking about fashion. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-24.mp3",
      template:
        "When she was about 11, boots with really high heels were {{all the rage}}. She begged her mum for some but was refused; within a month there was some other {{must-have}} item and the boots had {{gone out of fashion}}. She says this taught her how fickle fashion can be, and admits she isn't very {{fashion-conscious}} now, unlike some of her friends, who always know what's {{in fashion}} and spend most of their money on the latest trend — not realising it's just a {{passing trend}} that will soon be {{out-of-date}}.",
      script: track24Script,
    },
    {
      kind: "fill_mc",
      title: "Fashion adjectives in context",
      instructions: "Choose the word that best completes each sentence.",
      items: [
        { before: "The café has become a", after: "spot for young professionals.", options: ["trendy", "drab", "mundane"], answer: "trendy" },
        { before: "She wore a", after: "black dress to the gala.", options: ["chic", "drab", "mundane"], answer: "chic" },
        { before: "He was tired of his", after: "office clothes and wanted something more colourful.", options: ["drab", "chic", "trendy"], answer: "drab" },
        { before: "Most of his day is spent on", after: "tasks like answering emails.", options: ["mundane", "chic", "trendy"], answer: "mundane" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Consumerism verbs in context",
      instructions: "Choose the word or phrase that best completes each sentence.",
      items: [
        { before: "Some people", after: "old newspapers and magazines for years.", options: ["hoard", "discard", "eradicate"], answer: "hoard" },
        { before: "Consumers began to", after: "clothing they rarely wore.", options: ["stockpile", "dispose of", "eradicate"], answer: "stockpile" },
        { before: "Fast fashion encourages people to", after: "clothes after only a few wears.", options: ["discard", "hoard", "stockpile"], answer: "discard" },
        { before: "Rather than", after: "plastic bags, people should recycle them.", options: ["disposing of", "hoarding", "eradicating"], answer: "disposing of" },
        { before: "Vaccination campaigns have helped", after: "several deadly diseases.", options: ["eradicate", "discard", "hoard"], answer: "eradicate" },
      ],
    },
    {
      kind: "type_fill",
      title: "Consumer culture",
      instructions: "Read each definition and type the matching word or phrase from this unit.",
      items: [
        { prompt: "The belief that buying and consuming goods is good for society is called ___.", answer: "consumerism" },
        { prompt: "The money left over after paying taxes and essential bills is your ___.", answer: "disposable income" },
        { prompt: "A strong desire to get and own more things is called ___.", answer: "acquisitiveness" },
        { prompt: "The regret felt after buying something unnecessary or expensive is known as ___.", answer: "buyer's remorse" },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — an expensive item you bought",
      prompt: "Describe an expensive item you bought recently.",
      bullets: ["what you bought", "why you chose it", "what you use or need it for", "whether it was good value"],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes, and explain whether you are happy with your purchase and why. Try working in some of this unit's vocabulary (chic, a must-have, buyer's remorse...). When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "treated as throwaway", reveal: "effectively disposable" },
        { prompt: "uses a lot of energy", reveal: "energy-intensive" },
        { prompt: "makes the problem worse", reveal: "compounds the problem" },
        { prompt: "barely worn clothes piling up", reveal: "a 'national wardrobe' of barely worn items" },
        { prompt: "a recent development", reveal: "a relatively recent phenomenon" },
        { prompt: "fixed and reused", reveal: "routinely mended, resized... or repurposed" },
        { prompt: "only lasted a short while", reveal: "the effect proved temporary" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Test practice — Reading",
      passageTitle: "The true cost of a cheap T-shirt",
      passage:
        "A T-shirt sold for a few dollars in a shopping mall and a second-hand T-shirt worn by a teenager on another continent are, more often than not, connected by the same global supply chain. Falling production costs have made clothing so cheap that many shoppers now treat it as effectively disposable, buying new items every few weeks rather than every season. Industry commentators have coined a term for this: 'fast fashion', modelled deliberately on the logic of fast food.\n\n" +
        "The environmental cost of this shift is considerable. Polyester, now the most widely used fibre in clothing, is manufactured from petroleum in an energy-intensive process that releases emissions linked to respiratory illness near manufacturing sites. Cotton, often assumed to be the more natural alternative, carries its own footprint: in some cotton-growing regions, the crop accounts for a significant share of all pesticide use, even though cotton fields cover only a small fraction of farmland.\n\n" +
        "What happens after clothes are bought compounds the problem. Researchers estimate that a large share of clothing purchases never leave the home once bought, quietly adding to a 'national wardrobe' of barely worn items that will eventually be thrown away regardless. In the United States, government estimates put annual textile waste at well over sixty pounds per person, a figure that has been rising for years.\n\n" +
        "This is a relatively recent phenomenon. Historians who study consumer culture note that, for much of the early twentieth century, clothing was routinely mended, resized for other family members, or repurposed as rags rather than discarded. Wartime shortages reinforced this thriftier habit for a time — one wartime government campaign in the United States urged citizens to 'make economy fashionable' — but the effect proved temporary. Within a decade of the war ending, consumer spending, including on clothing, had returned to its earlier upward trend, and has continued rising ever since.",
      questions: [
        {
          text: "Falling production costs have made clothing cheap enough that many people treat it as disposable.",
          answer: "True",
          justification: "Falling production costs have made clothing so cheap that many shoppers treat it as effectively disposable.",
        },
        {
          text: "'Fast fashion' is a term invented completely independently of the food industry.",
          answer: "False",
          justification: "'Fast fashion' was modelled deliberately on the logic of fast food.",
        },
        {
          text: "Cotton has no negative environmental impact compared to polyester.",
          answer: "False",
          justification: "Cotton carries its own footprint, accounting for a significant share of pesticide use.",
        },
        {
          text: "Most clothing purchases are worn regularly once bought.",
          answer: "False",
          justification: "A large share of clothing purchases never leave the home once bought.",
        },
        {
          text: "Textile waste per person in the United States has been decreasing in recent years.",
          answer: "False",
          justification: "The figure has been rising for years.",
        },
        {
          text: "In the early twentieth century, clothing was often repaired or reused rather than thrown away.",
          answer: "True",
          justification: "Clothing was routinely mended, resized for other family members, or repurposed as rags.",
        },
        {
          text: "The wartime campaign to reduce consumption in the United States had a permanent effect on spending habits.",
          answer: "False",
          justification: "The effect proved temporary; spending returned to its earlier upward trend within a decade.",
        },
      ],
    },
  ],
};

const UNIT_1_HUMAN_NATURE: CambridgeUnit = {
  unit: 1,
  slug: "human-nature",
  title: "Human nature",
  topics: "Character, psychology",
  testPractice: "Listening Section 4",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit1Vocab,
    },
    {
      kind: "listening_cloze",
      title: "Who's being described?",
      instructions: "Listen to three people describing someone they know. Complete the sentences with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-02.mp3",
      template:
        "1  Speaker 1 is describing his {{neighbour}}, who sounds {{eccentric}}.\n" +
        "2  Speaker 2 is describing her {{friend}}, who sounds {{clumsy}} but {{cheerful}}.\n" +
        "3  Speaker 3 is describing his {{colleague}}, who sounds {{indecisive}}.",
      script: track02Script,
    },
    {
      kind: "sort",
      title: "Positive or negative?",
      instructions: "Tap a word, then tap the column it belongs in.",
      buckets: ["Positive qualities", "Negative qualities"],
      items: [
        { term: "assertive", bucket: 0 },
        { term: "charming", bucket: 0 },
        { term: "cheerful", bucket: 0 },
        { term: "self-confident", bucket: 0 },
        { term: "sensible", bucket: 0 },
        { term: "tactful", bucket: 0 },
        { term: "well-liked", bucket: 0 },
        { term: "anxious", bucket: 1 },
        { term: "apprehensive", bucket: 1 },
        { term: "clumsy", bucket: 1 },
        { term: "cynical", bucket: 1 },
        { term: "egotistical", bucket: 1 },
        { term: "gullible", bucket: 1 },
        { term: "self-conscious", bucket: 1 },
      ],
    },
    {
      kind: "sort",
      title: "Self- or well-?",
      instructions: "Tap a word part, then tap the prefix it combines with to build a real adjective.",
      buckets: ["self-", "well-"],
      items: [
        { term: "absorbed", bucket: 0 },
        { term: "assured", bucket: 0 },
        { term: "centred", bucket: 0 },
        { term: "confident", bucket: 0 },
        { term: "congratulatory", bucket: 0 },
        { term: "deprecating", bucket: 0 },
        { term: "important", bucket: 0 },
        { term: "reliant", bucket: 0 },
        { term: "adjusted", bucket: 1 },
        { term: "behaved", bucket: 1 },
        { term: "bred", bucket: 1 },
        { term: "brought-up", bucket: 1 },
        { term: "dressed", bucket: 1 },
        { term: "educated", bucket: 1 },
        { term: "informed", bucket: 1 },
        { term: "mannered", bucket: 1 },
        { term: "rounded", bucket: 1 },
      ],
    },
    {
      kind: "type_fill",
      title: "Make it negative",
      instructions: "Add a prefix to make each adjective negative.",
      items: [
        { prompt: "considerate", answer: "inconsiderate" },
        { prompt: "sensitive", answer: "insensitive" },
        { prompt: "decisive", answer: "indecisive" },
        { prompt: "patient", answer: "impatient" },
        { prompt: "reliable", answer: "unreliable" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Personality, character or characteristic?",
      instructions: "Choose the correct word for each sentence.",
      items: [
        {
          before: "She's always the life and soul of the party because she has such a bubbly",
          after: ".",
          options: ["personality", "character", "characteristic"],
          answer: "personality",
        },
        {
          before: "Dedication, commitment and knowledge are all",
          after: "of a good teacher.",
          options: ["characteristics", "personalities", "characters"],
          answer: "characteristics",
        },
        {
          before: "I don't believe he said that; it would be really out of",
          after: ".",
          options: ["character", "personality", "characteristic"],
          answer: "character",
        },
        {
          before: "I didn't get along with my business partner because our",
          after: "clashed.",
          options: ["personalities", "characteristics", "characters"],
          answer: "personalities",
        },
        {
          before: "Children may display",
          after: "of either of their parents.",
          options: ["characteristics", "personalities", "characters"],
          answer: "characteristics",
        },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — describe a friend",
      prompt: "Describe a friend you have known for a long time.",
      bullets: [
        "how long you have known them",
        "how you met them",
        "their personality and character",
        "what you have in common",
        "and say what you like doing together",
      ],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "This is IELTS Speaking Part 2: you get 1 minute to prepare notes, then talk for 1–2 minutes. Afterwards the examiner may ask rounding-off questions like \"Do you still see this person?\" or \"Do you often make new friends?\" — think about how you'd answer those too. When you finish, check: no hesitation mid-sentence, clear pronunciation, a good range of vocabulary, and not too much repetition.",
    },
    {
      kind: "reading_tfng",
      title: "Reading — popular or well-liked?",
      passageTitle: "Would you prefer to be 'popular' or 'well-liked'?",
      passage:
        "Would you prefer to be 'popular' or 'well-liked'? A new study from The Australian National University (ANU) has shown that for Canberra's young people, being well-liked is much more desirable than being popular, and being popular does not always mean you're well-liked. The study by Stephanie Hawke, a PhD candidate in clinical psychology at ANU, looked at nearly 200 Year 9 and Year 11 students from across Canberra. It found that adolescents saw being popular and being well-liked as two very different things, and that young people may not see popularity as a desirable trait.\n\n" +
        "The research has been released as part of National Psychology Week. It is the first Australian study to address the issue of popularity and what it means to young people. 'Both boys and girls agreed that many popular teenagers are disliked by the year group as a whole,' said Ms Hawke. 'This can be for several reasons such as bullying, having an attitude of superiority and disrupting the classroom. Those students who are described as being both popular and well-liked manage to balance their high social status with positive qualities such as being kind and friendly.'\n\n" +
        "The study also found that there was a complicated relationship between both individual and group popularity, and how these were perceived by students. 'One interesting finding is that popular students are likely to belong to popular groups. This was contrasted with well-liked students, who were much less likely to belong to groups of well-liked peers,' said Ms Hawke. 'It seems that being popular is about the group that you fit into, whereas being well-liked is about the individual person's inherent characteristics. Almost all of the students interviewed said that they would prefer to be known as well-liked, as opposed to popular, because this is a reflection of who they are as a person.' She added that the results indicate that 'popular' students are not idealised in the way that popular culture sometimes portrays, and that once other students are aware that many 'popular' students are not liked by others in the year group, it is possible that they will lose the power they are perceived to have.",
      questions: [
        {
          text: "The ANU study found that young people in Canberra confuse being well-liked with being popular.",
          answer: "False",
          justification: "It found that adolescents saw being popular and being well-liked as two very different things.",
        },
        {
          text: "The ANU study showed that most young people in Canberra wish they were popular.",
          answer: "False",
          justification: "young people may not see popularity as a desirable trait",
        },
        {
          text: "According to Ms Hawke, popular students may look down on other students.",
          answer: "True",
          justification: "having an attitude of superiority",
        },
        {
          text: "According to Ms Hawke, popular students can prevent others from learning.",
          answer: "True",
          justification: "disrupting the classroom",
        },
        {
          text: "According to Ms Hawke, students who are well-liked tend to mix with others who are well-liked.",
          answer: "False",
          justification: "This was contrasted with well-liked students, who were much less likely to belong to groups of well-liked peers.",
        },
        {
          text: "Being well-liked tells us more about someone's true character than being popular.",
          answer: "True",
          justification: "being popular is about the group that you fit into, whereas being well-liked is about the individual person's inherent characteristics",
        },
        {
          text: "There is often one popular student in a year group who is thought to have more power than the others.",
          answer: "Not given",
          justification: "We are not told whether a single student has more power than the others.",
        },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal the equivalent word or phrase used in the reading passage.",
      pairs: [
        { prompt: "young people", reveal: "adolescents / teenagers" },
        { prompt: "wish they were popular", reveal: "see popularity as a desirable trait" },
        { prompt: "look down on", reveal: "having an attitude of superiority" },
        { prompt: "prevent others from learning", reveal: "disrupting the classroom" },
        { prompt: "tend to … others", reveal: "(be) likely to … (their) peers" },
        { prompt: "true character", reveal: "inherent characteristics" },
        { prompt: "thought to", reveal: "perceived to" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Test practice — Listening Section 4",
      instructions: "Complete the notes below. Write NO MORE THAN ONE WORD for each answer.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-03.mp3",
      tip: "Remember: the wording on the question paper paraphrases what you hear, but the answers come in the same order as the talk. Keep to the word limit and check your spelling at the end.",
      template:
        "Past views of intelligence\n" +
        "• Thought to be only one type\n" +
        "• Could be assessed through an IQ test\n\n" +
        "Current views\n" +
        "• More than one type of intelligence – these can be seen in our {{personality}}\n" +
        "• Howard Gardner – Frames of Mind (1983) identified seven types of intelligence:\n" +
        "  i) linguistic (i.e. words and language)\n" +
        "  ii) {{logical}} (science and maths)\n" +
        "  iii) musical\n" +
        "  iv) kinaesthetic (i.e. the body and {{movement}})\n" +
        "  v) visual (relating to images)\n" +
        "  vi) interpersonal (conscious of the {{feelings}} of other people)\n" +
        "  vii) intrapersonal (relating to self-awareness)\n" +
        "• Other intelligences have been suggested but are not generally included because they are too {{complex}}\n\n" +
        "Uses in education\n" +
        "• Adapt activities to suit the type of student you are, e.g.\n" +
        "  – a kinaesthetic type learner will not learn well from a {{lecture}} – they would learn better from taking part in a {{game}}\n" +
        "  – visual learners could create their own {{poster}}\n" +
        "• Find out the type of learner you are by thinking about the way you prefer to do things, e.g. when teaching someone how to use a new piece of equipment\n" +
        "  – a visual learner would prefer to use a {{diagram}}\n" +
        "  – a kinaesthetic learner would prefer to do a {{demonstration}}",
      script: track03Script,
    },
  ],
};

const unit13Vocab: VocabWord[] = [
  {
    term: "tranquillity",
    ipa: "/træŋˈkwɪləti/",
    pos: "noun",
    usageNote: "danh từ không đếm được, chỉ trạng thái yên bình, tĩnh lặng của một nơi chốn",
    en: "a state of calm and quiet",
    vi: "sự yên bình, tĩnh lặng",
    synonyms: ["serenity", "peace"],
    antonyms: ["chaos", "commotion"],
    examples: [
      { en: "I love the peace and tranquillity of the area where I grew up.", vi: "Tôi yêu sự yên bình, tĩnh lặng của vùng quê nơi tôi lớn lên." },
      { en: "Visitors come here for the tranquillity of the surrounding countryside.", vi: "Du khách đến đây vì sự yên bình của vùng nông thôn xung quanh." },
    ],
    ieltsTip: "\"Peace and tranquillity\" là cụm cố định rất hay dùng khi nói về ưu điểm của cuộc sống nông thôn trong Speaking Part 1 và 3.",
    summary: "tranquillity = sự yên bình, tĩnh lặng.",
  },
  {
    term: "serenity",
    ipa: "/səˈrenəti/",
    pos: "noun",
    usageNote: "trang trọng hơn tranquillity, nhấn mạnh cảm giác thanh thản trong tâm hồn",
    en: "the quality of being calm, peaceful and untroubled",
    vi: "sự thanh bình, an nhiên",
    synonyms: ["tranquillity", "calmness"],
    antonyms: ["turmoil"],
    examples: [
      { en: "The serenity of village life appeals to people escaping the city.", vi: "Sự thanh bình của cuộc sống làng quê hấp dẫn những người muốn thoát khỏi thành phố." },
      { en: "Nothing disturbed the serenity of the lake at dawn.", vi: "Không gì làm xáo trộn sự thanh bình của mặt hồ lúc bình minh." },
    ],
    ieltsTip: "\"Serenity\" trang trọng hơn \"tranquillity\" — dùng tốt trong Writing khi mô tả môi trường sống lý tưởng.",
    summary: "serenity = sự thanh bình, an nhiên (thanh thản trong tâm hồn).",
  },
  {
    term: "tranquil",
    ipa: "/ˈtræŋkwɪl/",
    pos: "adjective",
    usageNote: "dạng tính từ của tranquillity, mô tả nơi chốn yên tĩnh, không bị quấy rầy",
    en: "quiet and peaceful",
    vi: "yên bình, tĩnh lặng",
    synonyms: ["peaceful", "serene"],
    antonyms: ["frantic", "hectic"],
    examples: [
      { en: "They moved to a tranquil village on the edge of the moors.", vi: "Họ chuyển đến một ngôi làng yên bình ở rìa vùng đồng hoang." },
      { en: "The garden is a tranquil escape from the noise of the city.", vi: "Khu vườn là nơi trốn thoát yên bình khỏi tiếng ồn của thành phố." },
    ],
    ieltsTip: "Cặp \"tranquil ↔ frantic\" là cách đối lập nông thôn – thành thị rất tự nhiên trong Speaking Part 3.",
    summary: "tranquil = yên bình, tĩnh lặng (tính từ).",
  },
  {
    term: "remote",
    ipa: "/rɪˈməʊt/",
    pos: "adjective",
    usageNote: "mô tả nơi ở rất xa các thị trấn, thành phố và khó đi lại",
    en: "far away from towns or other places where people live",
    vi: "hẻo lánh, xa xôi",
    synonyms: ["isolated", "far-flung"],
    antonyms: ["central", "accessible"],
    examples: [
      { en: "Medical care is hard to provide in remote rural areas.", vi: "Rất khó cung cấp dịch vụ y tế ở những vùng nông thôn hẻo lánh." },
      { en: "Their farm is so remote that the nearest shop is an hour away.", vi: "Trang trại của họ hẻo lánh đến mức cửa hàng gần nhất cũng cách một tiếng đi đường." },
    ],
    ieltsTip: "\"Remoteness\" (danh từ) hay xuất hiện trong Listening khi nói về nhược điểm của vùng nông thôn.",
    summary: "remote = hẻo lánh, xa xôi (cách xa khu dân cư).",
  },
  {
    term: "isolated",
    ipa: "/ˈaɪsəleɪtɪd/",
    pos: "adjective",
    usageNote: "vừa mô tả nơi chốn biệt lập, vừa mô tả cảm giác bị tách biệt khỏi mọi người",
    en: "far from other places or people; feeling alone and separated from others",
    vi: "biệt lập; cảm thấy cô lập",
    synonyms: ["remote", "cut off"],
    antonyms: ["connected"],
    examples: [
      { en: "Because all the properties are so spread out, it's easy to feel isolated at times.", vi: "Vì các ngôi nhà nằm cách xa nhau, đôi lúc rất dễ cảm thấy bị cô lập." },
      { en: "Older people living in isolated villages often lack support.", vi: "Người già sống ở những ngôi làng biệt lập thường thiếu sự hỗ trợ." },
    ],
    ieltsTip: "Phân biệt: \"isolated\" nói được cả về nơi chốn lẫn cảm xúc, còn \"remote\" chỉ nói về khoảng cách địa lý.",
    summary: "isolated = biệt lập (nơi chốn) / cảm thấy cô lập (con người).",
  },
  {
    term: "cherished",
    ipa: "/ˈtʃerɪʃt/",
    pos: "adjective",
    usageNote: "mô tả điều gì đó được yêu quý và gìn giữ, thường mang sắc thái tình cảm",
    en: "loved, valued and carefully protected",
    vi: "được trân trọng, quý mến",
    synonyms: ["treasured", "valued"],
    antonyms: ["neglected"],
    examples: [
      { en: "The less rural life is practised, the more it is cherished.", vi: "Lối sống nông thôn càng ít được duy trì thì lại càng được trân trọng." },
      { en: "Village traditions are still cherished by local families.", vi: "Những truyền thống làng quê vẫn được các gia đình địa phương trân trọng." },
    ],
    ieltsTip: "\"Cherished\" là cách diễn đạt nâng cao thay cho \"loved\" — ghi điểm lexical resource trong Writing Task 2.",
    summary: "cherished = được trân trọng, quý mến và gìn giữ.",
  },
  {
    term: "a sense of community",
    ipa: "/ə sens əv kəˈmjuːnəti/",
    pos: "phrase",
    usageNote: "chỉ cảm giác gắn bó, thân thuộc giữa những người sống cùng một khu vực",
    en: "a feeling of belonging and of caring about the people who live around you",
    vi: "tinh thần cộng đồng, tình làng nghĩa xóm",
    synonyms: ["community spirit"],
    antonyms: ["anonymity"],
    examples: [
      { en: "Rural communities usually have a strong sense of community.", vi: "Các cộng đồng nông thôn thường có tinh thần cộng đồng rất mạnh." },
      { en: "High-rise living can weaken the sense of community in a city.", vi: "Sống trong nhà cao tầng có thể làm suy yếu tinh thần cộng đồng ở thành phố." },
    ],
    ieltsTip: "Đây là ý tưởng \"ăn điểm\" khi so sánh nông thôn với thành thị trong Speaking Part 3 và Writing Task 2.",
    summary: "a sense of community = tinh thần cộng đồng, sự gắn bó láng giềng.",
  },
  {
    term: "a slow pace of life",
    ipa: "/ə sləʊ peɪs əv laɪf/",
    pos: "phrase",
    usageNote: "cụm mô tả nhịp sống thong thả, không vội vã, đặc trưng của vùng quê",
    en: "a way of living that is unhurried and relaxed",
    vi: "nhịp sống chậm rãi",
    synonyms: ["a relaxed lifestyle"],
    antonyms: ["a hectic lifestyle"],
    examples: [
      { en: "What I like most about the countryside is the slow pace of life.", vi: "Điều tôi thích nhất ở nông thôn là nhịp sống chậm rãi." },
      { en: "After ten years in the city, he wanted a slower pace of life.", vi: "Sau mười năm ở thành phố, anh ấy muốn một nhịp sống chậm hơn." },
    ],
    ieltsTip: "Đối lập với \"the frantic pace of city life\" — cặp này rất hữu ích cho câu trả lời so sánh.",
    summary: "a slow pace of life = nhịp sống chậm rãi, thong thả.",
  },
  {
    term: "open spaces",
    ipa: "/ˈəʊpən ˈspeɪsɪz/",
    pos: "phrase",
    usageNote: "chỉ những khoảng đất trống, thoáng đãng, không bị nhà cửa che kín",
    en: "large areas of land without buildings",
    vi: "không gian thoáng đãng, đất trống",
    synonyms: ["green space"],
    antonyms: ["built-up areas"],
    examples: [
      { en: "Rural communities have open spaces and fresh air.", vi: "Các cộng đồng nông thôn có không gian thoáng đãng và không khí trong lành." },
      { en: "Children need open spaces where they can play safely.", vi: "Trẻ em cần không gian thoáng đãng để chơi đùa an toàn." },
    ],
    ieltsTip: "\"Open/green spaces\" là từ vựng cần thiết cho các đề Writing Task 2 về quy hoạch đô thị.",
    summary: "open spaces = không gian thoáng đãng, khu đất trống.",
  },
  {
    term: "urbanite",
    ipa: "/ˈɜːbənaɪt/",
    pos: "noun",
    usageNote: "chỉ người sống ở thành phố và quen với lối sống đô thị",
    en: "a person who lives in a city",
    vi: "dân thành thị, người sống ở đô thị",
    synonyms: ["city dweller"],
    antonyms: ["country dweller"],
    examples: [
      { en: "I really had no choice but to become an urbanite.", vi: "Tôi thực sự không còn lựa chọn nào khác ngoài việc trở thành dân thành thị." },
      { en: "Many urbanites dream of retiring to the countryside.", vi: "Nhiều người thành thị mơ về việc nghỉ hưu ở nông thôn." },
    ],
    ieltsTip: "\"Urbanite\" và \"city dweller\" là cách paraphrase cho \"people who live in cities\" trong Reading.",
    summary: "urbanite = dân thành thị, người sống ở đô thị.",
  },
  {
    term: "megacity",
    ipa: "/ˈmeɡəsɪti/",
    pos: "noun",
    usageNote: "thuật ngữ chỉ đô thị có dân số trên 10 triệu người",
    en: "a very large city, usually with a population of more than ten million people",
    vi: "siêu đô thị (trên 10 triệu dân)",
    synonyms: ["metropolis"],
    antonyms: ["hamlet"],
    examples: [
      { en: "A megacity is usually defined as a metropolitan area with a population in excess of ten million.", vi: "Siêu đô thị thường được định nghĩa là khu vực đô thị có dân số vượt quá mười triệu người." },
      { en: "The Greater Tokyo Area was the largest megacity in the 2000s.", vi: "Vùng đại đô thị Tokyo là siêu đô thị lớn nhất trong những năm 2000." },
    ],
    ieltsTip: "Trong Listening Section 4 về đô thị hoá, \"megacity\" và \"metropolis\" thường được dùng thay thế cho nhau.",
    summary: "megacity = siêu đô thị, thành phố trên 10 triệu dân.",
  },
  {
    term: "frantic",
    ipa: "/ˈfræntɪk/",
    pos: "adjective",
    usageNote: "mô tả trạng thái hối hả, vội vã đến mức căng thẳng",
    en: "done in a hurried and anxious way; extremely busy",
    vi: "hối hả, cuống cuồng",
    synonyms: ["hectic", "frenzied"],
    antonyms: ["tranquil", "leisurely"],
    examples: [
      { en: "City life can be frantic compared with the countryside.", vi: "Cuộc sống thành thị có thể hối hả hơn nhiều so với nông thôn." },
      { en: "There is a frantic rush to get to work every morning.", vi: "Sáng nào cũng có cảnh hối hả chen chúc để kịp đi làm." },
    ],
    ieltsTip: "\"The frantic pace of city life\" là collocation rất mạnh cho Speaking Part 3.",
    summary: "frantic = hối hả, cuống cuồng (nhịp sống căng thẳng).",
  },
  {
    term: "overpopulated",
    ipa: "/ˌəʊvəˈpɒpjuleɪtɪd/",
    pos: "adjective",
    usageNote: "mô tả nơi có quá nhiều người sinh sống so với nguồn lực sẵn có",
    en: "having too many people living in one place for the available resources",
    vi: "quá đông dân",
    synonyms: ["overcrowded"],
    antonyms: ["sparsely populated"],
    examples: [
      { en: "In many poor countries, overpopulated slums have high rates of disease.", vi: "Ở nhiều nước nghèo, các khu ổ chuột quá đông dân có tỷ lệ bệnh tật cao." },
      { en: "The city centre is becoming seriously overpopulated.", vi: "Trung tâm thành phố đang trở nên quá đông dân một cách nghiêm trọng." },
    ],
    ieltsTip: "Phân biệt \"overpopulated\" (quá đông so với nguồn lực) với \"densely populated\" (mật độ dân cư cao, trung tính).",
    summary: "overpopulated = quá đông dân so với nguồn lực.",
  },
  {
    term: "traffic congestion",
    ipa: "/ˈtræfɪk kənˈdʒestʃən/",
    pos: "phrase",
    usageNote: "cách nói trang trọng cho tình trạng tắc đường trong đô thị",
    en: "a situation in which roads are so full of vehicles that traffic moves very slowly",
    vi: "ùn tắc giao thông",
    synonyms: ["gridlock"],
    antonyms: ["free-flowing traffic"],
    examples: [
      { en: "Traffic congestion creates enormous problems for people travelling at peak times.", vi: "Ùn tắc giao thông gây ra vô số vấn đề cho người di chuyển vào giờ cao điểm." },
      { en: "Congestion charges were introduced to reduce traffic in the centre.", vi: "Phí ùn tắc được áp dụng để giảm lượng xe trong trung tâm." },
    ],
    ieltsTip: "Dùng \"traffic congestion\" thay cho \"too many cars\" để nâng band từ vựng trong Writing Task 2.",
    summary: "traffic congestion = tình trạng ùn tắc giao thông.",
  },
  {
    term: "urban sprawl",
    ipa: "/ˈɜːbən sprɔːl/",
    pos: "phrase",
    usageNote: "chỉ sự lan rộng thiếu kiểm soát của thành phố ra vùng nông thôn xung quanh",
    en: "the uncontrolled spread of a city into the countryside around it",
    vi: "sự bành trướng đô thị (lan ra vùng ven)",
    synonyms: ["overdevelopment"],
    antonyms: ["compact development"],
    examples: [
      { en: "It is difficult to determine where the city ends because of the urban sprawl.", vi: "Rất khó xác định thành phố kết thúc ở đâu vì sự bành trướng đô thị." },
      { en: "Urban sprawl has swallowed up several nearby villages.", vi: "Sự bành trướng đô thị đã nuốt chửng vài ngôi làng lân cận." },
    ],
    ieltsTip: "\"Urban sprawl\" là từ khoá thường gặp trong Reading về quy hoạch và môi trường đô thị.",
    summary: "urban sprawl = sự lan rộng mất kiểm soát của đô thị.",
  },
  {
    term: "concrete jungle",
    ipa: "/ˈkɒŋkriːt ˈdʒʌŋɡl/",
    pos: "phrase",
    usageNote: "cách nói ẩn dụ, tiêu cực, về một thành phố toàn nhà bê tông, thiếu cây xanh",
    en: "a city area full of large, unattractive buildings and with very little greenery",
    vi: "rừng bê tông (đô thị ngột ngạt, thiếu cây xanh)",
    synonyms: ["built-up area"],
    antonyms: ["green belt"],
    examples: [
      { en: "Without parks, the city becomes a concrete jungle.", vi: "Không có công viên, thành phố trở thành một rừng bê tông." },
      { en: "He escapes the concrete jungle every weekend.", vi: "Cuối tuần nào anh ấy cũng trốn khỏi rừng bê tông." },
    ],
    ieltsTip: "Đây là idiom mang sắc thái tiêu cực — hợp Speaking hơn là Writing học thuật trang trọng.",
    summary: "concrete jungle = rừng bê tông, đô thị ngột ngạt thiếu cây xanh.",
  },
  {
    term: "shanty town",
    ipa: "/ˈʃænti taʊn/",
    pos: "phrase",
    usageNote: "chỉ khu nhà tạm bợ do người nghèo dựng lên, thường ở rìa các thành phố lớn",
    en: "an area on the edge of a city where poor people live in rough shelters they build themselves",
    vi: "khu nhà ổ chuột tạm bợ (ở rìa thành phố)",
    synonyms: ["slum settlement"],
    antonyms: ["affluent suburb"],
    examples: [
      { en: "One-sixth of the world's population now live in shanty towns.", vi: "Một phần sáu dân số thế giới hiện đang sống trong các khu nhà ổ chuột tạm bợ." },
      { en: "Shanty towns often lack clean water and sanitation.", vi: "Các khu nhà tạm bợ thường thiếu nước sạch và hệ thống vệ sinh." },
    ],
    ieltsTip: "Trong Listening, \"slums\" và \"shanty towns\" thường được chấp nhận thay thế cho nhau.",
    summary: "shanty town = khu nhà ổ chuột tạm bợ ở rìa thành phố.",
  },
  {
    term: "inner-city slums",
    ipa: "/ˌɪnə ˈsɪti slʌmz/",
    pos: "phrase",
    usageNote: "chỉ những khu nhà nghèo nàn, xuống cấp nằm ngay trong khu vực trung tâm cũ của thành phố",
    en: "poor, overcrowded areas of housing near the centre of a city",
    vi: "khu ổ chuột trong nội đô",
    synonyms: ["deprived neighbourhoods"],
    antonyms: ["affluent districts"],
    examples: [
      { en: "Many people who move to the city end up living in inner-city slums.", vi: "Nhiều người chuyển đến thành phố cuối cùng phải sống trong các khu ổ chuột nội đô." },
      { en: "The council plans to redevelop the inner-city slums.", vi: "Hội đồng thành phố dự định cải tạo lại các khu ổ chuột nội đô." },
    ],
    ieltsTip: "Phân biệt: \"inner-city slums\" nằm trong trung tâm, còn \"shanty towns\" mọc lên ở vùng rìa.",
    summary: "inner-city slums = khu ổ chuột nghèo nàn ở nội đô.",
  },
  {
    term: "high-rise buildings",
    ipa: "/ˌhaɪ raɪz ˈbɪldɪŋz/",
    pos: "phrase",
    usageNote: "chỉ các toà nhà rất nhiều tầng, đặc trưng của đô thị đông đúc",
    en: "very tall buildings with many floors",
    vi: "nhà cao tầng, cao ốc",
    synonyms: ["tower blocks"],
    antonyms: ["low-rise housing"],
    examples: [
      { en: "High-rise buildings allow more people to live in a small area.", vi: "Nhà cao tầng cho phép nhiều người hơn sống trong một diện tích nhỏ." },
      { en: "Rural areas rarely have high-rise buildings.", vi: "Vùng nông thôn hiếm khi có nhà cao tầng." },
    ],
    ieltsTip: "\"High rises\" (danh từ số nhiều) là dạng rút gọn thường gặp trong bài nghe.",
    summary: "high-rise buildings = các toà nhà cao tầng.",
  },
  {
    term: "recreational facilities",
    ipa: "/ˌrekriˈeɪʃənl fəˈsɪlətiz/",
    pos: "phrase",
    usageNote: "chỉ các cơ sở phục vụ giải trí, thể thao như rạp phim, bể bơi, sân vận động",
    en: "places such as sports centres, cinemas and parks where people spend their free time",
    vi: "cơ sở vật chất/tiện ích giải trí",
    synonyms: ["leisure facilities"],
    antonyms: [],
    examples: [
      { en: "The city has far more recreational facilities than rural areas.", vi: "Thành phố có nhiều tiện ích giải trí hơn hẳn vùng nông thôn." },
      { en: "Young people complain about the lack of recreational facilities in the village.", vi: "Giới trẻ phàn nàn về việc thiếu tiện ích giải trí trong làng." },
    ],
    ieltsTip: "\"Facilities\" luôn ở dạng số nhiều khi nói về cơ sở vật chất — lỗi số ít rất hay bị trừ điểm.",
    summary: "recreational facilities = các tiện ích, cơ sở giải trí.",
  },
];

const track25Script = `Speaker 1: I moved here about two years ago. Although I love the peace and tranquillity of the area where I grew up, I wanted to be an interior designer and there are very limited opportunities for that type of work there. So I really had no choice but to become an urbanite! I have to say I do miss the fresh air, though. But living in the country can have its disadvantages, too. I only have to walk down the street now to my local supermarket, which is really convenient, but where my parents live you have to travel for several hours to get to the nearest shops.
Speaker 2: I came here after I graduated from university. I've always wanted to be a vet, but city vets really only deal with pets and I wanted to work with larger farm animals. It's really interesting work but, because all the properties are so spread out, it's easy to feel isolated at times. That's why it can be tough for children out here. They don't have a lot of choice when it comes to education. They either have to go to boarding school or be schooled at home. Having said that, they have a lot more freedom here because it's a really safe environment for them. I love my life here now, and I don't miss the city at all.`;

const track26Script = `A megacity is usually defined as a metropolitan area with a total population in excess of ten million people. Some definitions also set a minimum level for population density with a figure of at least two thousand inhabitants per square kilometre. A megacity can be a single metropolitan area or two or more areas that converge or join together. This is sometimes referred to as a metropolis.
Looking right back through history, for almost a thousand years Rome was the largest, wealthiest and most politically important city in Europe. Rome's population passed a million by the end of the first century BC. However, during the Early Middle Ages, its population declined to a mere 20 thousand. By this time, what had been a sprawling city was reduced to groups of inhabited buildings spread out among large areas of ruins.
In 1800, only three per cent of the world's population lived in cities. But this figure had risen to 47 per cent by the end of the twentieth century. In 1950, New York City was the only urban area with a population of over ten million. And there were 83 cities with populations exceeding one million. However, by 2007, this number had risen to 468. If the trend continues, the world's urban population will double every 38 years. The UN has predicted that today's urban population of 3.2 billion will rise to nearly five billion by 2030, when three out of five people will live in cities.
In the 2000s, the largest megacity was the Greater Tokyo Area. The population of this metropolis includes areas such as Yokohama and Kawasaki, and is estimated to be between 35 and 36 million. This variation in estimates can be accounted for by different definitions of what the area encompasses. A characteristic issue of megacities is the difficulty in defining their outer limits. At present, one billion people, or one-sixth of the world's population, now live in shanty towns. In many poor countries, overpopulated slums have high rates of disease due to unsanitary conditions. The UN estimates that by 2030, over two billion people in the world will be living in slums.`;

const track27Script = `Woman: Hello, I wonder if you could help me. I'm moving to Liverpool next month and I've got a job at the children's hospital, so I need to find accommodation near there.
Man: Yes, of course. Now, the hospital you're talking about has some very nice suburbs nearby. The first one I'd recommend you look at is called Broadgreen.
Woman: Right, can you tell me a bit about the area itself? I have a car but I'm not a confident driver and I'd rather use other forms of transport as much as I can.
Man: Well, this area has a very good bus service and a train service as well, so it's really convenient as far as that's concerned.
Woman: Good. I'd like to use public transport when I can. Now, I come from London and parking can be a real problem there. Is that the same here?
Man: Yeah, my sister lives in London and she has to pay for parking in her own street! You'll be glad to hear we don't have that problem here.
Woman: That's great. I'm hoping the cost of living here will be a lot less than in London. What are the rents like? We pay over £200 a week on average, and that's in a cheaper area of London.
Man: Wow, well, you'll be glad to know the average weekly rent here is around £120. So you'll be saving around half what you have been paying.
Woman: That's great! There has to be some downside to it, it's sounding too good to be true. I'll bet there's a lot of crime in the area or something.
Man: Not at all. Though some people do find they have to travel a bit to get their groceries. The area could do with a few more shops.
Woman: Well, that doesn't sound so bad. So, is there any other area I should look at as well?
Man: Yes, I'd recommend West Derby. It will be closer to work for you.
Woman: That sounds good.
Man: Yes, and if you have children, it also has very good schools.
Woman: That's not an issue for me. I live on my own so I'm only looking for cheap, single accommodation. Something like a flat.
Man: Hmm, that may be a problem here then because this area has mostly larger houses. You'd probably be able to share one with other people who want to rent, though.
Woman: No, I'm only interested in flats at the moment, so I may be disappointed there.
Man: Yes. It's a lovely quiet area but the accommodation can be on the expensive side.
Woman: Well, I think I'd still like to have a look at both areas.
Man: We actually have an office in West Derby, and the guy who works there is a really good friend of mine. He'll be a great help.
Woman: Can you give me his contact details?
Man: Yes. His name is John Godfrey. That's G.O.D.F.R.E.Y.
Woman: Right, I've got that, and what's the best telephone number to reach him on?
Man: Well, I'll give you his mobile number. It's 0742, triple 6, 3951.
Woman: Great, is there a good time to call him? I'm here for a whole week until next Wednesday.
Man: I'm sure he'll be able to see you on Saturday. He's away from tomorrow until Friday, though.
Woman: That should be fine. I'll give him a call. Thanks for all your help!`;

const UNIT_13_URBAN_JUNGLE: CambridgeUnit = {
  unit: 13,
  slug: "urban-jungle",
  title: "Urban jungle",
  topics: "Rural life, city life",
  testPractice: "Listening Section 1",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit13Vocab,
    },
    {
      kind: "listening_cloze",
      title: "Two people, two lifestyles",
      instructions: "Listen to two people talking about where they live. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-25.mp3",
      template:
        "Speaker 1 has become an {{urbanite}}. She loves the peace and {{tranquillity}} of the area where she grew up, but there were very limited {{opportunities}} for the work she wanted to do. She misses the {{fresh air}}, though she admits the country has disadvantages too: where her parents live you have to travel for several hours to reach the nearest {{shops}}.\n\n" +
        "Speaker 2 moved to the country after graduating because he wanted to work with larger {{farm animals}}. Because all the properties are so spread out, it is easy to feel {{isolated}} at times, and children don't have a lot of choice when it comes to {{education}}. On the other hand, they have far more {{freedom}} because it is such a safe {{environment}} for them.",
      script: track25Script,
      tip: "Nghe kỹ các cặp lợi – hại: bài nghe IELTS thường sắp xếp thông tin theo advantages rồi disadvantages.",
    },
    {
      kind: "sort",
      title: "Rural life or city life?",
      instructions: "Tap a word, then tap the category it belongs to.",
      buckets: ["Rural life", "City life"],
      items: [
        { term: "tranquillity", bucket: 0 },
        { term: "serenity", bucket: 0 },
        { term: "tranquil", bucket: 0 },
        { term: "remote", bucket: 0 },
        { term: "isolated", bucket: 0 },
        { term: "cherished", bucket: 0 },
        { term: "a sense of community", bucket: 0 },
        { term: "a slow pace of life", bucket: 0 },
        { term: "open spaces", bucket: 0 },
        { term: "urbanite", bucket: 1 },
        { term: "megacity", bucket: 1 },
        { term: "frantic", bucket: 1 },
        { term: "overpopulated", bucket: 1 },
        { term: "traffic congestion", bucket: 1 },
        { term: "urban sprawl", bucket: 1 },
        { term: "concrete jungle", bucket: 1 },
        { term: "shanty town", bucket: 1 },
        { term: "inner-city slums", bucket: 1 },
        { term: "high-rise buildings", bucket: 1 },
        { term: "recreational facilities", bucket: 1 },
      ],
    },
    {
      kind: "fill_mc",
      title: "Describing where people live",
      instructions: "Choose the word that best completes each sentence.",
      items: [
        { before: "Living so far from town, she often complains about a sense of", after: "in the winter months.", options: ["isolation", "congestion", "sprawl"], answer: "isolation" },
        { before: "Villages like this have no", after: ", so everyone has to drive.", options: ["public transport system", "concrete jungle", "shanty town"], answer: "public transport system" },
        { before: "What I miss most is the", after: "pace of country life.", options: ["slower", "frantic", "overpopulated"], answer: "slower" },
        { before: "Rush hour in the capital is absolutely", after: ".", options: ["frantic", "tranquil", "cherished"], answer: "frantic" },
        { before: "People in the village lead", after: ", traditional lives.", options: ["simpler", "denser", "taller"], answer: "simpler" },
        { before: "The town centre is so", after: "that the roads can no longer cope.", options: ["overpopulated", "remote", "tranquil"], answer: "overpopulated" },
      ],
    },
    {
      kind: "type_fill",
      title: "City collocations",
      instructions: "Complete each sentence with a compound noun from this unit.",
      items: [
        { prompt: "We need a stronger ___ to help keep crime levels in our major cities down.", answer: "police force" },
        { prompt: "The city has far more ___ than rural areas, so young people don't get bored so easily.", answer: "recreational facilities" },
        { prompt: "___ creates enormous problems for people travelling around the city at peak times.", answer: "traffic congestion" },
        { prompt: "Many people who move to the city from rural areas end up living in ___ because of a shortage of housing.", answer: "inner-city slums" },
        { prompt: "It is difficult to determine where the city ends because of the ___.", answer: "urban sprawl" },
        { prompt: "An efficient ___ is essential to maintaining sanitation in densely populated areas.", answer: "sewage system" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Urbanisation — a talk",
      instructions: "Listen to a talk about urbanisation and complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-26.mp3",
      template:
        "Definition\n" +
        "• A {{megacity}} = a metropolitan area with a population in excess of ten million people\n" +
        "• Some definitions also set a minimum level for population {{density}}\n" +
        "• Two or more areas that {{converge}} or join together are sometimes called a {{metropolis}}\n\n" +
        "History\n" +
        "• Rome's population passed a million by the end of the first century BC, then declined during the Early Middle Ages\n" +
        "• What had been a {{sprawling}} city was reduced to groups of inhabited buildings among ruins\n\n" +
        "Growth\n" +
        "• In 1800 only three per cent of the world's population lived in cities\n" +
        "• If the trend continues, the world's {{urban population}} will double every 38 years\n\n" +
        "Problems\n" +
        "• A characteristic issue of megacities is the difficulty of defining their {{outer limits}}\n" +
        "• One-sixth of the world's population now live in {{shanty towns}}\n" +
        "• Overpopulated {{slums}} in poor countries have high rates of disease due to {{unsanitary}} conditions",
      script: track26Script,
      tip: "Trong Listening Section 4, hãy dự đoán loại từ cần điền (danh từ số nhiều? tính từ?) trước khi audio bắt đầu.",
    },
    {
      kind: "reveal_pairs",
      title: "Paraphrase practice",
      instructions: "Tap each phrase to reveal a more academic way of saying it.",
      pairs: [
        { prompt: "developed over time", reveal: "evolved" },
        { prompt: "very big", reveal: "massive" },
        { prompt: "the opposite", reveal: "the reverse" },
        { prompt: "loved and protected", reveal: "cherished" },
        { prompt: "a slight suggestion of a feeling", reveal: "an undertone" },
        { prompt: "showed / made clear", reveal: "revealed" },
        { prompt: "peace and calm", reveal: "serenity" },
        { prompt: "made to feel they don't belong", reveal: "alienated" },
        { prompt: "noticeably / clearly", reveal: "markedly" },
        { prompt: "people who live in cities", reveal: "urbanites / city dwellers" },
      ],
    },
    {
      kind: "speaking",
      title: "Speaking — the place where you live",
      prompt: "Describe the city, town or village where you live.",
      bullets: ["how you would describe it", "whether you prefer city life or country life", "how it has changed in the last 20 years", "what changes you would like to see in the future"],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "Đây là dạng câu hỏi Speaking Part 1 về nơi bạn sống — hãy trả lời đầy đủ chứ đừng chỉ nói một câu. Cố gắng dùng từ vựng của unit này (a slow pace of life, urban sprawl, recreational facilities...). Khi nói xong, tự kiểm tra: có ngập ngừng giữa câu không, phát âm có rõ không, vốn từ có đa dạng không, và có lặp từ quá nhiều không.",
    },
    {
      kind: "listening_cloze",
      title: "Test practice — Listening Section 1",
      instructions: "Listen to a conversation between an estate agent and a woman looking for accommodation. Complete the notes with NO MORE THAN ONE WORD for each answer.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-27.mp3",
      template:
        "New accommodation\n" +
        "Need to find accommodation close to the children's hospital.\n\n" +
        "Area 1 — Broadgreen\n" +
        "Advantages:\n" +
        "• has several types of {{transport}}\n" +
        "• no need to pay for {{parking}}\n" +
        "• average rent £120 a week\n" +
        "Disadvantages:\n" +
        "• not many local {{shops}}\n\n" +
        "Area 2 — West Derby\n" +
        "Advantages:\n" +
        "• good {{schools}}\n" +
        "Disadvantages:\n" +
        "• unlikely to find a {{flat}} in the area\n" +
        "• may be too {{expensive}}\n\n" +
        "Contact\n" +
        "• John {{Godfrey}}\n" +
        "• arrange appointment for: {{Saturday}}",
      script: track27Script,
      tip: "Section 1 luôn có một ví dụ mẫu được làm sẵn. Hãy nghe kỹ xem đáp án có cần dạng số nhiều hay không — kiểm tra lại chữ 's' ở cuối từ khi soát bài.",
    },
  ],
};

const unit14Vocab: VocabWord[] = [
  {
    term: "setback",
    ipa: "/ˈsetbæk/",
    pos: "noun",
    usageNote: "chỉ sự cố làm chậm hoặc cản trở một tiến trình đang diễn ra",
    en: "something that happens which delays or prevents a process from advancing",
    vi: "trở ngại, bước lùi (làm chậm tiến độ)",
    synonyms: ["hold-up", "reversal"],
    antonyms: ["breakthrough"],
    examples: [
      { en: "We experienced a minor setback when we lost several plants, but the rest are thriving.", vi: "Chúng tôi gặp một trở ngại nhỏ khi mất vài cây, nhưng số còn lại vẫn phát triển tốt." },
      { en: "The project suffered a major setback after the funding was withdrawn.", vi: "Dự án gặp trở ngại lớn sau khi nguồn tài trợ bị rút." },
    ],
    ieltsTip: "Collocation hay gặp: \"a minor / major / serious setback\" và động từ \"suffer a setback\".",
    summary: "setback = trở ngại làm chậm hoặc lùi tiến độ.",
  },
  {
    term: "dilemma",
    ipa: "/dɪˈlemə/",
    pos: "noun",
    usageNote: "chỉ tình huống buộc phải chọn giữa hai phương án đều khó khăn",
    en: "a situation where a difficult choice has to be made between two things",
    vi: "tình thế tiến thoái lưỡng nan",
    synonyms: ["quandary"],
    antonyms: ["clear choice"],
    examples: [
      { en: "Genetic modification presents a moral dilemma for many scientists.", vi: "Biến đổi gen đặt ra một tình thế lưỡng nan về đạo đức cho nhiều nhà khoa học." },
      { en: "Working parents often face the dilemma of career versus family.", vi: "Cha mẹ đi làm thường đối mặt với tình thế lưỡng nan giữa sự nghiệp và gia đình." },
    ],
    ieltsTip: "\"Dilemma\" luôn hàm ý có ĐÚNG HAI lựa chọn khó — đừng dùng thay cho \"problem\" chung chung.",
    summary: "dilemma = tình thế lưỡng nan giữa hai lựa chọn khó.",
  },
  {
    term: "predicament",
    ipa: "/prɪˈdɪkəmənt/",
    pos: "noun",
    usageNote: "chỉ hoàn cảnh khó chịu, khó thoát ra được",
    en: "an unpleasant situation which is difficult to get out of",
    vi: "cảnh khó xử, tình cảnh khó khăn",
    synonyms: ["plight", "predicament"],
    antonyms: ["comfortable position"],
    examples: [
      { en: "I doubt that recycling alone can get us out of our current predicament.", vi: "Tôi nghi ngờ rằng chỉ riêng tái chế có thể đưa chúng ta thoát khỏi tình cảnh hiện tại." },
      { en: "The government must explain how it plans to resolve this predicament.", vi: "Chính phủ phải giải thích họ dự định giải quyết tình cảnh này ra sao." },
    ],
    ieltsTip: "Collocation chuẩn: \"our current predicament\", \"get out of a predicament\".",
    summary: "predicament = hoàn cảnh khó khăn, khó thoát ra.",
  },
  {
    term: "obstacle",
    ipa: "/ˈɒbstəkl/",
    pos: "noun",
    usageNote: "chỉ thứ chặn đường, khiến tiến trình không thể tiếp tục",
    en: "something that blocks you so that forward movement is prevented",
    vi: "chướng ngại vật, vật cản",
    synonyms: ["hurdle", "barrier"],
    antonyms: ["aid"],
    examples: [
      { en: "The cost of equipment is the biggest obstacle to expanding the programme.", vi: "Chi phí thiết bị là chướng ngại lớn nhất cho việc mở rộng chương trình." },
      { en: "She overcame numerous obstacles to complete her degree.", vi: "Cô ấy đã vượt qua vô số chướng ngại để hoàn thành tấm bằng." },
    ],
    ieltsTip: "Động từ đi kèm mạnh nhất là \"overcome an obstacle\" — rất hợp cho Writing Task 2 dạng problem–solution.",
    summary: "obstacle = chướng ngại chặn đường tiến lên.",
  },
  {
    term: "hurdle",
    ipa: "/ˈhɜːdl/",
    pos: "noun",
    usageNote: "gần nghĩa obstacle nhưng gợi hình ảnh rào cần vượt qua trong một chặng đường",
    en: "a difficulty that must be dealt with before you can make progress",
    vi: "rào cản cần vượt qua",
    synonyms: ["obstacle", "barrier"],
    antonyms: ["shortcut"],
    examples: [
      { en: "The enormous cost of this programme is a major hurdle that we need to overcome.", vi: "Chi phí khổng lồ của chương trình này là một rào cản lớn mà chúng ta cần vượt qua." },
      { en: "Getting a visa was the first hurdle.", vi: "Xin visa là rào cản đầu tiên." },
    ],
    ieltsTip: "\"A major hurdle\" + \"overcome\" là cặp collocation gần như cố định.",
    summary: "hurdle = rào cản phải vượt qua để tiến tới.",
  },
  {
    term: "controversy",
    ipa: "/ˈkɒntrəvɜːsi/",
    pos: "noun",
    usageNote: "chỉ sự tranh cãi kéo dài, thường liên quan đến nhiều người trong xã hội",
    en: "a lot of disagreement or argument about something, usually affecting many people",
    vi: "sự tranh cãi, tranh luận gay gắt",
    synonyms: ["dispute", "debate"],
    antonyms: ["consensus"],
    examples: [
      { en: "The use of drugs by athletes has caused considerable controversy in the world of sport.", vi: "Việc vận động viên dùng chất kích thích đã gây tranh cãi đáng kể trong giới thể thao." },
      { en: "The new law provoked controversy across the country.", vi: "Đạo luật mới đã gây tranh cãi trên khắp cả nước." },
    ],
    ieltsTip: "Tính từ tương ứng là \"controversial\" — \"a controversial issue\" là cách mở bài rất tự nhiên cho Task 2.",
    summary: "controversy = sự tranh cãi rộng rãi trong xã hội.",
  },
  {
    term: "catastrophe",
    ipa: "/kəˈtæstrəfi/",
    pos: "noun",
    usageNote: "chỉ thảm hoạ có hậu quả cực kỳ nghiêm trọng, mạnh hơn disaster",
    en: "an event causing great and usually sudden damage or suffering",
    vi: "thảm hoạ (mức độ nghiêm trọng)",
    synonyms: ["disaster", "calamity"],
    antonyms: ["blessing"],
    examples: [
      { en: "To prevent a catastrophe of global proportions, we need to reach a compromise.", vi: "Để ngăn chặn một thảm hoạ mang tầm toàn cầu, chúng ta cần đạt được một sự thoả hiệp." },
      { en: "Rising sea levels could be a catastrophe for low-lying nations.", vi: "Mực nước biển dâng có thể là thảm hoạ với các quốc gia thấp trũng." },
    ],
    ieltsTip: "Tính từ là \"catastrophic\" — dùng cho hậu quả, ví dụ \"catastrophic consequences\".",
    summary: "catastrophe = thảm hoạ lớn, hậu quả nghiêm trọng.",
  },
  {
    term: "crisis",
    ipa: "/ˈkraɪsɪs/",
    pos: "noun",
    usageNote: "số nhiều bất quy tắc là \"crises\" /ˈkraɪsiːz/, chỉ giai đoạn nguy cấp cần hành động ngay",
    en: "a time of great danger or difficulty when decisions must be made quickly",
    vi: "khủng hoảng",
    synonyms: ["emergency"],
    antonyms: ["stability"],
    examples: [
      { en: "The global financial crisis affected employment around the world.", vi: "Cuộc khủng hoảng tài chính toàn cầu đã ảnh hưởng đến việc làm trên khắp thế giới." },
      { en: "Many countries are facing an energy crisis.", vi: "Nhiều quốc gia đang đối mặt với khủng hoảng năng lượng." },
    ],
    ieltsTip: "Nhớ dạng số nhiều \"crises\" — viết \"crisises\" là lỗi bị trừ điểm ngữ pháp.",
    summary: "crisis = khủng hoảng (số nhiều: crises).",
  },
  {
    term: "alleviate",
    ipa: "/əˈliːvieɪt/",
    pos: "verb",
    usageNote: "làm dịu bớt mức độ nghiêm trọng của một vấn đề hoặc nỗi đau",
    en: "to make something bad less severe",
    vi: "làm giảm nhẹ, xoa dịu",
    synonyms: ["ease", "mitigate"],
    antonyms: ["exacerbate"],
    examples: [
      { en: "Better public transport would alleviate traffic congestion.", vi: "Giao thông công cộng tốt hơn sẽ làm giảm nhẹ tình trạng ùn tắc." },
      { en: "The charity works to alleviate poverty in rural areas.", vi: "Tổ chức từ thiện này hoạt động nhằm giảm nhẹ đói nghèo ở vùng nông thôn." },
    ],
    ieltsTip: "\"Alleviate the problem / poverty / pressure\" là các collocation ăn điểm trong Writing Task 2.",
    summary: "alleviate = làm giảm nhẹ mức độ nghiêm trọng.",
  },
  {
    term: "mitigate",
    ipa: "/ˈmɪtɪɡeɪt/",
    pos: "verb",
    usageNote: "trang trọng, thường dùng khi nói về giảm thiểu tác động tiêu cực hoặc rủi ro",
    en: "to reduce the harmful effects of something",
    vi: "giảm thiểu (tác động xấu)",
    synonyms: ["alleviate", "lessen"],
    antonyms: ["aggravate"],
    examples: [
      { en: "Planting trees can help mitigate the effects of climate change.", vi: "Trồng cây có thể giúp giảm thiểu tác động của biến đổi khí hậu." },
      { en: "Governments must act now to mitigate the risks.", vi: "Các chính phủ phải hành động ngay để giảm thiểu rủi ro." },
    ],
    ieltsTip: "\"Mitigate the effects/impact of...\" là cụm gần như cố định trong các bài về môi trường.",
    summary: "mitigate = giảm thiểu tác động tiêu cực.",
  },
  {
    term: "rectify",
    ipa: "/ˈrektɪfaɪ/",
    pos: "verb",
    usageNote: "sửa chữa một điều sai hoặc một tình huống không đúng",
    en: "to correct something that is wrong",
    vi: "sửa chữa, chấn chỉnh",
    synonyms: ["put right", "remedy"],
    antonyms: ["worsen"],
    examples: [
      { en: "The council promised to rectify the situation within a month.", vi: "Hội đồng đã hứa sẽ chấn chỉnh tình hình trong vòng một tháng." },
      { en: "These errors must be rectified before the report is published.", vi: "Những lỗi này phải được sửa chữa trước khi báo cáo được công bố." },
    ],
    ieltsTip: "\"Rectify\" đi với lỗi/tình huống sai, không dùng cho \"a problem\" chung chung — với problem hãy dùng \"tackle/address\".",
    summary: "rectify = sửa chữa điều sai, chấn chỉnh tình hình.",
  },
  {
    term: "exacerbate",
    ipa: "/ɪɡˈzæsəbeɪt/",
    pos: "verb",
    usageNote: "làm một vấn đề vốn đã xấu trở nên tồi tệ hơn",
    en: "to make a bad situation worse",
    vi: "làm trầm trọng thêm",
    synonyms: ["aggravate", "worsen"],
    antonyms: ["alleviate"],
    examples: [
      { en: "Building more roads may actually exacerbate congestion.", vi: "Xây thêm đường thực ra có thể làm trầm trọng thêm tình trạng ùn tắc." },
      { en: "The drought was exacerbated by poor irrigation.", vi: "Hạn hán trở nên trầm trọng hơn do tưới tiêu kém." },
    ],
    ieltsTip: "Cặp \"alleviate ↔ exacerbate\" là một trong những cặp trái nghĩa đáng giá nhất cho band 7+.",
    summary: "exacerbate = làm cho tình hình xấu càng xấu hơn.",
  },
  {
    term: "aggravate",
    ipa: "/ˈæɡrəveɪt/",
    pos: "verb",
    usageNote: "gần nghĩa exacerbate, hay dùng với bệnh tật, chấn thương hoặc căng thẳng",
    en: "to make an illness or a bad situation worse",
    vi: "làm nặng thêm, làm trầm trọng hơn",
    synonyms: ["exacerbate", "worsen"],
    antonyms: ["relieve"],
    examples: [
      { en: "Emissions from these factories can aggravate respiratory disease.", vi: "Khí thải từ những nhà máy này có thể làm nặng thêm bệnh hô hấp." },
      { en: "Lifting the box aggravated his back injury.", vi: "Việc nhấc chiếc hộp đã làm chấn thương lưng của anh ấy nặng thêm." },
    ],
    ieltsTip: "Trong văn học thuật, \"aggravate\" thường đi với bệnh tật; với vấn đề xã hội hãy ưu tiên \"exacerbate\".",
    summary: "aggravate = làm bệnh/tình hình nặng thêm.",
  },
  {
    term: "compound",
    ipa: "/kəmˈpaʊnd/",
    pos: "verb",
    usageNote: "là động từ, nghĩa làm một vấn đề khó khăn hơn bằng cách thêm khó khăn mới",
    en: "to make a difficulty worse by adding to it",
    vi: "làm phức tạp/khó khăn thêm",
    synonyms: ["compound", "worsen"],
    antonyms: ["ease"],
    examples: [
      { en: "What happens after clothes are bought compounds the problem.", vi: "Điều xảy ra sau khi quần áo được mua càng làm vấn đề thêm trầm trọng." },
      { en: "Poor planning compounded the difficulties faced by the city.", vi: "Việc quy hoạch kém đã làm khó khăn của thành phố thêm chồng chất." },
    ],
    ieltsTip: "Chú ý trọng âm: động từ \"compound\" /kəmˈpaʊnd/ khác danh từ \"compound\" /ˈkɒmpaʊnd/.",
    summary: "compound (v) = làm vấn đề thêm khó khăn.",
  },
  {
    term: "hinder",
    ipa: "/ˈhɪndə(r)/",
    pos: "verb",
    usageNote: "cản trở khiến việc gì đó diễn ra chậm hoặc khó khăn hơn",
    en: "to make it more difficult for something to happen or develop",
    vi: "cản trở, gây khó khăn",
    synonyms: ["impede", "hamper"],
    antonyms: ["facilitate"],
    examples: [
      { en: "A lack of funding continues to hinder research in this area.", vi: "Việc thiếu kinh phí tiếp tục cản trở nghiên cứu trong lĩnh vực này." },
      { en: "Bad weather hindered the rescue operation.", vi: "Thời tiết xấu đã cản trở chiến dịch cứu hộ." },
    ],
    ieltsTip: "Cặp \"hinder ↔ facilitate\" rất hữu ích khi bàn về chính sách trong Writing Task 2.",
    summary: "hinder = cản trở, làm chậm tiến trình.",
  },
  {
    term: "tackle",
    ipa: "/ˈtækl/",
    pos: "verb",
    usageNote: "bắt tay xử lý một vấn đề khó một cách quyết liệt",
    en: "to make a determined effort to deal with a difficult problem",
    vi: "giải quyết, xử lý (vấn đề khó)",
    synonyms: ["address", "deal with"],
    antonyms: ["ignore"],
    examples: [
      { en: "One way of tackling this problem is to educate children about healthy eating habits.", vi: "Một cách giải quyết vấn đề này là giáo dục trẻ em về thói quen ăn uống lành mạnh." },
      { en: "The government has promised to tackle unemployment.", vi: "Chính phủ đã hứa sẽ giải quyết tình trạng thất nghiệp." },
    ],
    ieltsTip: "\"Tackle the problem/issue\" là cách mở đoạn giải pháp chuẩn cho Writing Task 2 dạng problem–solution.",
    summary: "tackle = bắt tay giải quyết vấn đề khó.",
  },
  {
    term: "overcome",
    ipa: "/ˌəʊvəˈkʌm/",
    pos: "verb",
    usageNote: "động từ bất quy tắc (overcome – overcame – overcome), nghĩa vượt qua khó khăn",
    en: "to successfully deal with or control a difficulty",
    vi: "vượt qua, khắc phục",
    synonyms: ["surmount", "conquer"],
    antonyms: ["succumb to"],
    examples: [
      { en: "We could overcome the difficulties raised by this issue if all governments agreed.", vi: "Chúng ta có thể vượt qua những khó khăn do vấn đề này gây ra nếu tất cả các chính phủ đồng thuận." },
      { en: "She overcame considerable obstacles to reach the final.", vi: "Cô ấy đã vượt qua nhiều chướng ngại đáng kể để vào tới trận chung kết." },
    ],
    ieltsTip: "Nhớ dạng quá khứ phân từ giống nguyên thể: \"has overcome\" (không phải \"overcomed\").",
    summary: "overcome = vượt qua, khắc phục khó khăn.",
  },
  {
    term: "unemployment",
    ipa: "/ˌʌnɪmˈplɔɪmənt/",
    pos: "noun",
    usageNote: "danh từ không đếm được, chỉ tình trạng thiếu việc làm trong xã hội",
    en: "the situation in which people who want to work cannot find jobs",
    vi: "tình trạng thất nghiệp",
    synonyms: ["joblessness"],
    antonyms: ["full employment"],
    examples: [
      { en: "Rising unemployment is one of the most serious issues facing the region.", vi: "Thất nghiệp gia tăng là một trong những vấn đề nghiêm trọng nhất của khu vực." },
      { en: "The factory closure led to widespread unemployment.", vi: "Việc đóng cửa nhà máy đã dẫn đến thất nghiệp trên diện rộng." },
    ],
    ieltsTip: "Không đếm được: viết \"high unemployment\", KHÔNG viết \"unemployments\".",
    summary: "unemployment = tình trạng thất nghiệp (không đếm được).",
  },
  {
    term: "homelessness",
    ipa: "/ˈhəʊmləsnəs/",
    pos: "noun",
    usageNote: "danh từ không đếm được, chỉ tình trạng không có nhà ở",
    en: "the situation of having nowhere to live",
    vi: "tình trạng vô gia cư",
    synonyms: ["rooflessness"],
    antonyms: ["secure housing"],
    examples: [
      { en: "If we wish to remedy this situation, we must ensure there is sufficient affordable accommodation.", vi: "Nếu muốn khắc phục tình trạng này, trước hết phải đảm bảo có đủ chỗ ở giá phải chăng." },
      { en: "Homelessness has risen sharply in major cities.", vi: "Tình trạng vô gia cư đã tăng mạnh ở các thành phố lớn." },
    ],
    ieltsTip: "Đây là \"a lack of accommodation\" nói theo cách học thuật — rất hợp cho Task 2 về đô thị.",
    summary: "homelessness = tình trạng vô gia cư.",
  },
  {
    term: "obesity",
    ipa: "/əʊˈbiːsəti/",
    pos: "noun",
    usageNote: "thuật ngữ y khoa chỉ tình trạng béo phì, dùng trung tính trong văn viết học thuật",
    en: "the condition of being extremely overweight",
    vi: "bệnh béo phì",
    synonyms: ["excess weight"],
    antonyms: ["healthy weight"],
    examples: [
      { en: "Obesity is now one of the main causes of preventable death.", vi: "Béo phì hiện là một trong những nguyên nhân chính gây tử vong có thể phòng ngừa." },
      { en: "Childhood obesity has doubled in the last twenty years.", vi: "Tỷ lệ béo phì ở trẻ em đã tăng gấp đôi trong hai mươi năm qua." },
    ],
    ieltsTip: "Tính từ là \"obese\" (mức độ nặng), khác \"overweight\" (thừa cân nhẹ hơn).",
    summary: "obesity = tình trạng béo phì.",
  },
];

const track28Script = `1 One way of tackling this problem is to make sure that children are educated about healthy eating habits.
2 We could overcome the difficulties raised by this issue if all governments agree to limit emissions of harmful gases.
3 If we wish to remedy this situation, we must first ensure that there is sufficient affordable accommodation.
4 To prevent a catastrophe of global proportions, we need to find a way to reach a compromise between meeting our energy needs and living in an environmentally sustainable way.
5 We could resolve this issue by making sure that farmers follow very strict guidelines and that food grown this way is carefully monitored.`;

const UNIT_14_TACKLING_ISSUES: CambridgeUnit = {
  unit: 14,
  slug: "tackling-issues",
  title: "Tackling issues",
  topics: "Problems, solutions",
  testPractice: "Writing Task 2",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit14Vocab,
    },
    {
      kind: "type_fill",
      title: "Naming the issue",
      instructions: "Read each definition and type the global issue it refers to.",
      items: [
        { prompt: "a lack of jobs", answer: "unemployment" },
        { prompt: "a lack of accommodation", answer: "homelessness" },
        { prompt: "being extremely overweight", answer: "obesity" },
        { prompt: "the increase of trade around the world", answer: "globalisation" },
        { prompt: "the way the world's weather is changing", answer: "climate change" },
        { prompt: "a lack of oil", answer: "energy crisis" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Which kind of problem?",
      instructions: "Choose the noun that matches the meaning of each sentence.",
      items: [
        { before: "Losing the funding was a serious", after: "that delayed the whole project.", options: ["setback", "dilemma", "controversy"], answer: "setback" },
        { before: "Choosing between her career and her family was a real", after: ".", options: ["dilemma", "hurdle", "setback"], answer: "dilemma" },
        { before: "Once he was in debt, he could see no way out of his", after: ".", options: ["predicament", "controversy", "hurdle"], answer: "predicament" },
        { before: "The cost of the equipment is the main", after: "to expanding the scheme.", options: ["obstacle", "dilemma", "crisis"], answer: "obstacle" },
        { before: "Drug use in sport has caused considerable", after: "in recent years.", options: ["controversy", "predicament", "setback"], answer: "controversy" },
        { before: "Rising sea levels could become a", after: "for low-lying countries.", options: ["catastrophe", "hurdle", "dilemma"], answer: "catastrophe" },
      ],
    },
    {
      kind: "type_fill",
      title: "Adjective + noun collocations",
      instructions: "Complete each sentence with an adjective + noun phrase from this unit.",
      items: [
        { prompt: "We experienced a few ___ at the airport, but nothing very serious.", answer: "minor difficulties" },
        { prompt: "The enormous cost of this programme is a ___ that we need to overcome.", answer: "major hurdle" },
        { prompt: "Adopting children from poor countries is a ___.", answer: "sensitive issue" },
        { prompt: "I doubt that recycling alone can get us out of our ___.", answer: "current predicament" },
        { prompt: "The building of this dam will lead to a ___ for the local wildlife.", answer: "total disaster" },
        { prompt: "Global warming presents a ___ for every government.", answer: "significant challenge" },
      ],
    },
    {
      kind: "sort",
      title: "Make it better or make it worse?",
      instructions: "Tap a verb, then tap the meaning it belongs to.",
      buckets: ["Make better", "Make worse"],
      items: [
        { term: "alleviate", bucket: 0 },
        { term: "mitigate", bucket: 0 },
        { term: "rectify", bucket: 0 },
        { term: "improve", bucket: 0 },
        { term: "tackle", bucket: 0 },
        { term: "overcome", bucket: 0 },
        { term: "remedy", bucket: 0 },
        { term: "exacerbate", bucket: 1 },
        { term: "hinder", bucket: 1 },
        { term: "compound", bucket: 1 },
        { term: "complicate", bucket: 1 },
        { term: "aggravate", bucket: 1 },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Talking about solutions",
      instructions: "Listen to five people talking about global issues. Complete the expressions they use for dealing with problems.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-28.mp3",
      template:
        "1  One way of {{tackling}} this problem is to make sure that children are educated about healthy eating habits. (obesity)\n" +
        "2  We could {{overcome}} the difficulties raised by this issue if all governments agree to limit emissions of harmful gases. (climate change)\n" +
        "3  If we wish to {{remedy}} this situation, we must first ensure that there is sufficient affordable accommodation. (homelessness)\n" +
        "4  To {{prevent}} a catastrophe of global proportions, we need to find a way to reach a compromise between meeting our energy needs and living sustainably. (environmental disasters)\n" +
        "5  We could {{resolve}} this issue by making sure that farmers follow very strict guidelines. (genetically modified foods)",
      script: track28Script,
      tip: "Học thuộc bộ động từ này (tackle / overcome / remedy / prevent / resolve) — chúng là bộ khung mở đoạn giải pháp cho Writing Task 2.",
    },
    {
      kind: "fill_mc",
      title: "do, make or take?",
      instructions: "Choose the verb that collocates correctly.",
      items: [
        { before: "We need to", after: "measures to prevent this from happening again.", options: ["take", "make", "do"], answer: "take" },
        { before: "First, we have to", after: "a real effort to deal with the underlying causes.", options: ["make", "take", "do"], answer: "make" },
        { before: "Governments should", after: "notice of what the research shows.", options: ["take", "make", "do"], answer: "take" },
        { before: "Punishing people too harshly may", after: "more harm than good.", options: ["do", "make", "take"], answer: "do" },
        { before: "If we act now, we can still", after: "a change.", options: ["make", "take", "do"], answer: "make" },
        { before: "Before deciding, the committee should", after: "stock of the situation.", options: ["take", "do", "make"], answer: "take" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Essay language — choose the right word",
      instructions: "Choose the correct alternative to complete this extract from an essay on obesity.",
      items: [
        { before: "Clearly, obesity", after: "a real problem today.", options: ["represents", "presents"], answer: "represents" },
        { before: "What can be done to", after: "a solution to it?", options: ["find", "resolve"], answer: "find" },
        { before: "We have to make a real effort to deal", after: "the underlying causes.", options: ["with", "in"], answer: "with" },
        { before: "If this isn't done, we will never completely", after: "this issue.", options: ["resolve", "raise"], answer: "resolve" },
        { before: "All our efforts will be wasted if we don't", after: "the difficult situations children face.", options: ["tackle", "meet"], answer: "tackle" },
        { before: "We also need to take measures to", after: "this from happening in the future.", options: ["prevent", "protect"], answer: "prevent" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — the paradox of depression",
      passageTitle: "Is depression an adaptation?",
      passage:
        "Depression is an ongoing and pervasive problem in our society, and it poses something of an evolutionary paradox: the brain plays a crucial role in our survival, so evolution should have left our brains resistant to such high rates of malfunction. The paradox could be resolved if depression was linked to growing old. After all, the functioning of all body systems and organs tends to deteriorate with age. This is not a satisfactory explanation for depression, however, as people are most likely to experience their first bout in adolescence. Perhaps depression is like obesity — a recent problem that has arisen because modern conditions are so different from those in which we evolved. Yet this is not a satisfactory explanation either, as depression exists in every culture, including small-scale societies where people are thought to live in environments similar to those that prevailed in our evolutionary past.\n\n" +
        "There is another possibility: depression is, in fact, an adaptation, a state of mind which can bring real benefits. This is not to say that depression is not a serious problem. Depressed people often have trouble performing everyday activities and tend to isolate themselves socially. So what could be so useful about depression? Depressed people often think intensely about their problems. Numerous studies have shown that this thinking style is often highly analytical and can be very productive. Depressed people dwell on personal problems, breaking them down into smaller components. Each individual component is less problematic, so what begins as an insurmountable problem is far less difficult. This type of thinking allows people to gain insight into their problems. Indeed, when you are faced with a daunting problem, feeling depressed is often a useful response that may help you analyse and solve it.",
      questions: [
        {
          text: "The writer suggests that depression may bring genuine benefits.",
          answer: "True",
          justification: "Depression is described as 'an adaptation, a state of mind which can bring real benefits'.",
        },
        {
          text: "People usually experience depression for the first time in old age.",
          answer: "False",
          justification: "People are most likely to experience their first bout in adolescence.",
        },
        {
          text: "Depression is found only in modern industrialised societies.",
          answer: "False",
          justification: "Depression exists in every culture, including small-scale societies.",
        },
        {
          text: "Depression is more common among women than among men.",
          answer: "Not given",
          justification: "The passage makes no comparison between men and women.",
        },
        {
          text: "The writer accepts that depression is a serious problem.",
          answer: "True",
          justification: "'This is not to say that depression is not a serious problem.'",
        },
        {
          text: "Depressed people tend to think about their problems in a superficial way.",
          answer: "False",
          justification: "Their thinking style is often highly analytical and productive, breaking problems into smaller components.",
        },
        {
          text: "Doctors now recommend that mild depression should be left untreated.",
          answer: "Not given",
          justification: "The passage says nothing about medical treatment or recommendations.",
        },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Collocations with 'problem'",
      instructions: "Tap each phrase to reveal the adjective or verb that goes with 'problem'.",
      pairs: [
        { prompt: "a problem that never goes away", reveal: "an ongoing problem" },
        { prompt: "a problem found everywhere in society", reveal: "a pervasive problem" },
        { prompt: "a problem that seems impossible to solve", reveal: "an insurmountable problem" },
        { prompt: "a problem that frightens you because it is so big", reveal: "a daunting problem" },
        { prompt: "when a problem appears", reveal: "a problem arises" },
        { prompt: "to keep thinking about a problem", reveal: "to dwell on a problem" },
        { prompt: "to start to understand a problem", reveal: "to gain insight into a problem" },
        { prompt: "to have to deal with a problem", reveal: "to be faced with a problem" },
      ],
    },
    {
      kind: "writing_task",
      title: "Test practice — Writing Task 2",
      taskLabel: "Writing Task 2",
      prompt:
        "Obesity is now a major global epidemic. What can be done to tackle this increasingly common problem? Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      tip:
        "Với dạng đề problem–solution, hãy lập dàn ý theo bốn phần: Problem – Causes – Effects – Possible solutions. Giải thích chính xác vấn đề là gì (nguyên nhân và hậu quả) rồi mới cân nhắc ưu và nhược điểm của từng giải pháp. Dành khoảng 40 phút và viết ít nhất 250 từ.",
      modelAnswer:
        "Obesity is now one of the main causes of preventable death, especially in industrialised countries. To tackle this problem, governments can reduce the impact of their overweight citizens by the careful use of taxation to fund alternatives to a sedentary lifestyle. However, individuals should also take responsibility for their own health by avoiding a bad diet and taking the initiative to participate in sport.\n\n" +
        "It is important for governments to act quickly to curb obesity because of the rising death rate. There will also be rising costs in healthcare and the benefits system if it is left unchecked. To combat this problem, governments should, first of all, heavily tax junk food and use the revenue generated to subsidise healthy fruit and vegetables. This would make healthy food cheaper and more widely available than unhealthier options. Also, the government can act by funding leisure centres, sports clubs and gyms. This money could be used to help people gain motivation to exercise and become more active.\n\n" +
        "On the other hand, there are those who claim that obesity is due to lifestyle choice and therefore an individual problem, not one for the government. They claim that people should find their own motivation to prevent obesity by being aware of the potentially fatal consequences of their lifestyles. Individuals could also change their diets by switching from a carbohydrate-heavy diet to one which includes a balance of vitamins and minerals. Joining a sports club need not always be the only way to lose weight. Even vigorous housework or heavy gardening can help avert heart disease.\n\n" +
        "In conclusion, although individuals may be able to help themselves by changing their diets and activities, it may require government intervention to tackle obesity quickly and on a large scale.",
    },
  ],
};

const unit15Vocab: VocabWord[] = [
  {
    term: "erupt",
    ipa: "/ɪˈrʌpt/",
    pos: "verb",
    usageNote: "dùng cho núi lửa phun trào; cũng dùng nghĩa bóng cho bạo lực hoặc cảm xúc bùng nổ",
    en: "(of a volcano) to throw out lava, ash and gases suddenly",
    vi: "phun trào (núi lửa)",
    synonyms: ["explode"],
    antonyms: ["lie dormant"],
    examples: [
      { en: "They wondered if the volcano might erupt and cause even more damage.", vi: "Họ tự hỏi liệu ngọn núi lửa có phun trào và gây thêm thiệt hại không." },
      { en: "The volcano last erupted more than a century ago.", vi: "Ngọn núi lửa lần cuối phun trào cách đây hơn một thế kỷ." },
    ],
    ieltsTip: "Danh từ là \"eruption\" — \"a volcanic eruption\" là cụm chuẩn trong bài đọc về thiên tai.",
    summary: "erupt = phun trào (núi lửa).",
  },
  {
    term: "tremor",
    ipa: "/ˈtremə(r)/",
    pos: "noun",
    usageNote: "chỉ rung chấn nhẹ của mặt đất, yếu hơn một trận động đất lớn",
    en: "a small earthquake in which the ground shakes slightly",
    vi: "rung chấn, dư chấn nhẹ",
    synonyms: ["quake"],
    antonyms: [],
    examples: [
      { en: "A tremor was felt across the region but no buildings collapsed.", vi: "Rung chấn được cảm nhận trên khắp khu vực nhưng không có toà nhà nào đổ sập." },
      { en: "Minor tremors are common in this part of the country.", vi: "Những rung chấn nhẹ khá phổ biến ở vùng này của đất nước." },
    ],
    ieltsTip: "Nhóm từ cùng chủ đề: earthquake – tremor – aftershock, hay xuất hiện cùng nhau trong Listening.",
    summary: "tremor = rung chấn nhẹ của mặt đất.",
  },
  {
    term: "aftershock",
    ipa: "/ˈɑːftəʃɒk/",
    pos: "noun",
    usageNote: "chỉ cơn rung chấn xảy ra SAU một trận động đất chính",
    en: "a smaller earthquake that happens after a larger one",
    vi: "dư chấn (sau động đất)",
    synonyms: ["secondary tremor"],
    antonyms: [],
    examples: [
      { en: "A series of aftershocks hampered the rescue operation.", vi: "Một loạt dư chấn đã cản trở công tác cứu hộ." },
      { en: "Residents were warned to expect aftershocks for several days.", vi: "Cư dân được cảnh báo hãy đề phòng dư chấn trong vài ngày." },
    ],
    ieltsTip: "Đừng nhầm \"aftershock\" (sau động đất) với \"tremor\" (có thể xảy ra độc lập).",
    summary: "aftershock = dư chấn xảy ra sau trận động đất chính.",
  },
  {
    term: "torrential",
    ipa: "/təˈrenʃl/",
    pos: "adjective",
    usageNote: "chỉ đi với \"rain\" — mưa rất to và xối xả",
    en: "(of rain) falling very heavily",
    vi: "xối xả, như trút nước (mưa)",
    synonyms: ["heavy"],
    antonyms: ["light"],
    examples: [
      { en: "There was a night of torrential rain, as well as severe winds.", vi: "Đã có một đêm mưa xối xả kèm theo gió mạnh." },
      { en: "Torrential rain caused flooding across the valley.", vi: "Mưa xối xả đã gây lũ lụt khắp thung lũng." },
    ],
    ieltsTip: "\"Torrential\" gần như chỉ đi với \"rain/downpour\" — không nói \"torrential wind\".",
    summary: "torrential = (mưa) xối xả, như trút nước.",
  },
  {
    term: "severe",
    ipa: "/sɪˈvɪə(r)/",
    pos: "adjective",
    usageNote: "mô tả mức độ nghiêm trọng của thời tiết, thiệt hại hoặc vấn đề",
    en: "very bad or serious",
    vi: "khắc nghiệt, nghiêm trọng",
    synonyms: ["extreme", "harsh"],
    antonyms: ["mild"],
    examples: [
      { en: "Severe winds blew down several outbuildings.", vi: "Gió mạnh đã thổi đổ vài công trình phụ." },
      { en: "The region suffers from severe winters.", vi: "Khu vực này phải chịu những mùa đông khắc nghiệt." },
    ],
    ieltsTip: "Collocation: severe weather / severe drought / severe damage — dùng nhiều trong Writing Task 2 về môi trường.",
    summary: "severe = khắc nghiệt, nghiêm trọng.",
  },
  {
    term: "drought",
    ipa: "/draʊt/",
    pos: "noun",
    usageNote: "chỉ giai đoạn dài không có mưa, gây thiếu nước nghiêm trọng",
    en: "a long period of time when there is little or no rain",
    vi: "hạn hán",
    synonyms: ["dry spell"],
    antonyms: ["flood"],
    examples: [
      { en: "Extreme weather can range from long stretches of drought to extremely heavy rain.", vi: "Thời tiết cực đoan có thể từ những đợt hạn hán kéo dài đến mưa cực lớn." },
      { en: "The drought destroyed most of this year's harvest.", vi: "Hạn hán đã phá huỷ phần lớn vụ mùa năm nay." },
    ],
    ieltsTip: "Phát âm /draʊt/ (vần với \"out\") — đây là lỗi phát âm rất phổ biến.",
    summary: "drought = hạn hán, giai đoạn dài thiếu mưa.",
  },
  {
    term: "soil erosion",
    ipa: "/sɔɪl ɪˈrəʊʒn/",
    pos: "phrase",
    usageNote: "chỉ hiện tượng lớp đất mặt bị nước hoặc gió cuốn trôi",
    en: "the process by which soil is gradually washed or blown away",
    vi: "xói mòn đất",
    synonyms: ["land degradation"],
    antonyms: [],
    examples: [
      { en: "Rainwater runs off compacted soil, carrying the soil with it and leading to an increase in erosion.", vi: "Nước mưa chảy tràn trên nền đất bị nén chặt, cuốn theo đất và làm gia tăng xói mòn." },
      { en: "Soil erosion can be prevented if there is enough vegetation.", vi: "Xói mòn đất có thể được ngăn chặn nếu có đủ thảm thực vật." },
    ],
    ieltsTip: "\"Soil erosion\" và \"soil degradation\" là cặp từ khoá quen thuộc trong Reading về nông nghiệp.",
    summary: "soil erosion = sự xói mòn lớp đất mặt.",
  },
  {
    term: "crop yields",
    ipa: "/krɒp jiːldz/",
    pos: "phrase",
    usageNote: "chỉ sản lượng thu hoạch được trên một diện tích đất nhất định",
    en: "the amount of a crop that is produced from an area of land",
    vi: "năng suất/sản lượng cây trồng",
    synonyms: ["harvests"],
    antonyms: [],
    examples: [
      { en: "The earth dries out and our crop yields decline.", vi: "Đất khô kiệt và năng suất cây trồng của chúng ta giảm sút." },
      { en: "Fertilisers can increase crop yields dramatically.", vi: "Phân bón có thể làm tăng năng suất cây trồng đáng kể." },
    ],
    ieltsTip: "Động từ đi kèm: yields rise / decline / double — rất hữu ích cho Writing Task 1 mô tả biểu đồ.",
    summary: "crop yields = năng suất cây trồng.",
  },
  {
    term: "irrigation",
    ipa: "/ˌɪrɪˈɡeɪʃn/",
    pos: "noun",
    usageNote: "chỉ việc dẫn nước tới đồng ruộng để trồng trọt",
    en: "the practice of supplying land with water so that crops will grow",
    vi: "sự tưới tiêu, thuỷ lợi",
    synonyms: ["watering"],
    antonyms: [],
    examples: [
      { en: "People are likely to seek new sources of irrigation water.", vi: "Con người có khả năng sẽ tìm kiếm nguồn nước tưới tiêu mới." },
      { en: "Modern irrigation systems waste far less water.", vi: "Các hệ thống tưới tiêu hiện đại lãng phí ít nước hơn nhiều." },
    ],
    ieltsTip: "Động từ là \"irrigate\" — \"irrigated land\" (đất được tưới tiêu) hay gặp trong Reading.",
    summary: "irrigation = việc tưới tiêu cho đất canh tác.",
  },
  {
    term: "desalination",
    ipa: "/ˌdiːˌsælɪˈneɪʃn/",
    pos: "noun",
    usageNote: "chỉ quá trình loại bỏ muối khỏi nước biển để tạo nước ngọt",
    en: "the process of removing salt from seawater",
    vi: "sự khử muối (nước biển)",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "If we choose desalination of seawater as a possible solution, large amounts of energy will be required.", vi: "Nếu chọn khử muối nước biển làm giải pháp, sẽ cần một lượng năng lượng rất lớn." },
      { en: "Several desalination plants have been built along the coast.", vi: "Vài nhà máy khử muối đã được xây dọc bờ biển." },
    ],
    ieltsTip: "Đây là từ khoá thường xuất hiện trong Reading về khủng hoảng nước sạch.",
    summary: "desalination = quá trình khử muối khỏi nước biển.",
  },
  {
    term: "cultivate",
    ipa: "/ˈkʌltɪveɪt/",
    pos: "verb",
    usageNote: "nghĩa đen là canh tác đất, trồng trọt; nghĩa bóng là vun đắp một mối quan hệ, thói quen",
    en: "to prepare and use land for growing crops",
    vi: "canh tác, trồng trọt",
    synonyms: ["farm", "till"],
    antonyms: ["neglect"],
    examples: [
      { en: "Only a small part of this land can be cultivated.", vi: "Chỉ một phần nhỏ vùng đất này có thể canh tác được." },
      { en: "Farmers here cultivate rice twice a year.", vi: "Nông dân ở đây canh tác lúa hai vụ mỗi năm." },
    ],
    ieltsTip: "Nghĩa bóng \"cultivate a habit / relationship\" cũng rất hữu ích cho Speaking Part 3.",
    summary: "cultivate = canh tác, trồng trọt trên đất.",
  },
  {
    term: "sow",
    ipa: "/səʊ/",
    pos: "verb",
    usageNote: "động từ bất quy tắc (sow – sowed – sown), nghĩa gieo hạt xuống đất",
    en: "to plant seeds in the ground",
    vi: "gieo (hạt)",
    synonyms: ["plant", "seed"],
    antonyms: ["harvest", "reap"],
    examples: [
      { en: "The seeds are sown in early spring.", vi: "Hạt giống được gieo vào đầu mùa xuân." },
      { en: "Farmers sow the fields as soon as the rains arrive.", vi: "Nông dân gieo hạt trên cánh đồng ngay khi mùa mưa đến." },
    ],
    ieltsTip: "Cặp \"sow ↔ reap/harvest\" (gieo ↔ gặt) là cặp từ vựng nông nghiệp cơ bản cần nhớ.",
    summary: "sow = gieo hạt giống xuống đất.",
  },
  {
    term: "pasture",
    ipa: "/ˈpɑːstʃə(r)/",
    pos: "noun",
    usageNote: "chỉ vùng đồng cỏ dùng để chăn thả gia súc",
    en: "an area of grassland used for feeding animals",
    vi: "đồng cỏ chăn thả",
    synonyms: ["grazing land", "meadow"],
    antonyms: ["arable land"],
    examples: [
      { en: "The cattle were moved to fresh pasture.", vi: "Đàn gia súc được chuyển đến đồng cỏ mới." },
      { en: "Much of the forest has been cleared to create pasture.", vi: "Phần lớn khu rừng đã bị phát quang để làm đồng cỏ chăn thả." },
    ],
    ieltsTip: "Phân biệt: \"pasture\" là đất chăn thả, còn \"arable land\" là đất trồng trọt.",
    summary: "pasture = đồng cỏ dùng để chăn thả gia súc.",
  },
  {
    term: "pest",
    ipa: "/pest/",
    pos: "noun",
    usageNote: "chỉ côn trùng hoặc động vật nhỏ phá hoại mùa màng",
    en: "an insect or animal that destroys plants and crops",
    vi: "sâu bệnh, loài gây hại",
    synonyms: ["vermin"],
    antonyms: [],
    examples: [
      { en: "Harsh conditions allow pests to proliferate.", vi: "Điều kiện khắc nghiệt khiến các loài gây hại sinh sôi." },
      { en: "GM crops can be made resistant to disease or pests.", vi: "Cây trồng biến đổi gen có thể được tạo ra để kháng bệnh hoặc sâu hại." },
    ],
    ieltsTip: "\"Pesticide\" (thuốc trừ sâu) bắt nguồn từ \"pest\" — hai từ này thường đi cùng nhau trong bài đọc.",
    summary: "pest = loài côn trùng/động vật phá hoại mùa màng.",
  },
  {
    term: "deforestation",
    ipa: "/ˌdiːˌfɒrɪˈsteɪʃn/",
    pos: "noun",
    usageNote: "chỉ việc chặt phá rừng trên diện rộng, thường để lấy đất",
    en: "the cutting down of trees over a large area",
    vi: "nạn phá rừng",
    synonyms: ["clearance"],
    antonyms: ["reforestation"],
    examples: [
      { en: "Deforestation is one of the main causes of soil degradation in the world today.", vi: "Nạn phá rừng là một trong những nguyên nhân chính gây suy thoái đất hiện nay." },
      { en: "Trees are cleared to make way for houses.", vi: "Cây cối bị chặt bỏ để nhường chỗ cho nhà cửa." },
    ],
    ieltsTip: "Trái nghĩa \"reforestation\" (trồng lại rừng) — nêu được cặp này giúp ăn điểm ở phần giải pháp.",
    summary: "deforestation = nạn chặt phá rừng trên diện rộng.",
  },
  {
    term: "a vicious circle",
    ipa: "/ə ˈvɪʃəs ˈsɜːkl/",
    pos: "phrase",
    usageNote: "chỉ vòng lặp trong đó vấn đề này gây ra vấn đề kia rồi quay lại làm vấn đề đầu tệ hơn",
    en: "a situation in which one problem causes another, which then makes the first problem worse",
    vi: "vòng luẩn quẩn",
    synonyms: ["vicious cycle"],
    antonyms: ["virtuous circle"],
    examples: [
      { en: "We are caught in a vicious circle as more fossil fuels are consumed.", vi: "Chúng ta mắc kẹt trong một vòng luẩn quẩn khi ngày càng nhiều nhiên liệu hoá thạch bị tiêu thụ." },
      { en: "Debt and poverty form a vicious circle.", vi: "Nợ nần và đói nghèo tạo thành một vòng luẩn quẩn." },
    ],
    ieltsTip: "Dùng cụm này để mô tả quan hệ nhân quả vòng tròn — rất ấn tượng trong Writing Task 2.",
    summary: "a vicious circle = vòng luẩn quẩn, vấn đề nọ nuôi vấn đề kia.",
  },
  {
    term: "a viable solution",
    ipa: "/ə ˈvaɪəbl səˈluːʃn/",
    pos: "phrase",
    usageNote: "chỉ giải pháp thực tế, có thể thực hiện được và duy trì lâu dài",
    en: "a solution that can realistically work and be maintained",
    vi: "giải pháp khả thi",
    synonyms: ["a workable solution"],
    antonyms: ["an impractical solution"],
    examples: [
      { en: "Clearly, a long-term viable solution that does not produce acid rain is needed.", vi: "Rõ ràng cần một giải pháp khả thi lâu dài mà không tạo ra mưa axit." },
      { en: "Wind power is now a viable solution for remote communities.", vi: "Điện gió hiện là một giải pháp khả thi cho các cộng đồng vùng sâu vùng xa." },
    ],
    ieltsTip: "\"Viable\" mạnh hơn \"possible\" vì nhấn mạnh tính thực tế — dùng thay \"good solution\" để nâng band.",
    summary: "a viable solution = giải pháp khả thi, thực hiện được.",
  },
  {
    term: "greenhouse gases",
    ipa: "/ˈɡriːnhaʊs ˈɡæsɪz/",
    pos: "phrase",
    usageNote: "chỉ các khí giữ nhiệt trong khí quyển như CO₂ và mê-tan",
    en: "gases such as carbon dioxide that trap heat in the atmosphere",
    vi: "khí nhà kính",
    synonyms: ["emissions"],
    antonyms: [],
    examples: [
      { en: "Climate change is associated with increasing levels of greenhouse gases.", vi: "Biến đổi khí hậu gắn liền với mức khí nhà kính ngày càng tăng." },
      { en: "Burning fossil fuels results in an increase in greenhouse gas emissions.", vi: "Việc đốt nhiên liệu hoá thạch dẫn đến gia tăng phát thải khí nhà kính." },
    ],
    ieltsTip: "Luôn ở dạng số nhiều khi nói chung: \"greenhouse gases\" hoặc \"greenhouse gas emissions\".",
    summary: "greenhouse gases = các khí nhà kính giữ nhiệt trong khí quyển.",
  },
  {
    term: "acid rain",
    ipa: "/ˈæsɪd reɪn/",
    pos: "phrase",
    usageNote: "chỉ mưa bị nhiễm axit do ô nhiễm không khí, gây hại cho cây cối và công trình",
    en: "rain containing harmful chemicals caused by air pollution",
    vi: "mưa axit",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "A long-term solution that does not produce acid rain is needed.", vi: "Cần một giải pháp lâu dài không tạo ra mưa axit." },
      { en: "Acid rain has damaged forests across the continent.", vi: "Mưa axit đã tàn phá rừng trên khắp lục địa." },
    ],
    ieltsTip: "Đây là danh từ không đếm được — không viết \"acid rains\".",
    summary: "acid rain = mưa axit do ô nhiễm không khí.",
  },
  {
    term: "weather the storm",
    ipa: "/ˈweðə ðə stɔːm/",
    pos: "phrase",
    usageNote: "thành ngữ, nghĩa vượt qua được một giai đoạn khó khăn",
    en: "to survive a difficult period",
    vi: "vượt qua giai đoạn khó khăn",
    synonyms: ["ride out"],
    antonyms: ["give in"],
    examples: [
      { en: "The government should be prepared to weather the storm rather than please the public.", vi: "Chính phủ nên sẵn sàng vượt qua giai đoạn khó khăn thay vì chiều lòng dư luận." },
      { en: "Small businesses struggled to weather the storm of the recession.", vi: "Các doanh nghiệp nhỏ chật vật vượt qua cơn bão suy thoái." },
    ],
    ieltsTip: "Nhiều từ về thời tiết được dùng theo nghĩa bóng — nhóm thành ngữ này rất hợp cho Speaking Part 3.",
    summary: "weather the storm = trụ vững, vượt qua giai đoạn khó khăn.",
  },
];

const track29Script = `Agriculture is extremely vulnerable to climate change. Changes in our climate bring about higher temperatures, which in turn inevitably result in reduced yields of desirable crops. Of course, not everything is depleted, and these harsh conditions encourage the growth of weeds and also allow pests to proliferate. This inevitably leads to a greater use of chemical pesticides by farmers. The poor quality of our soil stems from this.
Climate change also produces more extreme weather patterns. These can range from long stretches of drought, and also, conversely, extremely heavy rain, which can cause floods. The destruction of food crops can result from both a lack or a surfeit of water.
Certain human activities also have a negative impact on agriculture. Firstly, farming practices themselves can be damaging. The use of heavy machinery like tractors can compact the soil. This means that, rather than soaking into the ground, rainwater runs off it, carrying the soil with it, and so leads to an increase in erosion. Soil erosion can be prevented if there is enough vegetation. So clearly, overgrazing by cattle, which removes the vegetation, leads to a loss of soil.
Urban development due to an increased population also takes its toll as trees are cleared to make way for houses. Deforestation is one of the main causes of soil degradation in the world today. It seems that housing our growing population comes at the cost of providing much needed food. So it is not surprising that farmers are turning to genetically modified crops to try to boost productivity and grow crops in more ecologically healthy fields, while allowing more efficient use of resources. This technology means that farmers can grow crops that are resistant to disease or pests, so fewer chemicals are used.`;

const track30Script = `John: Hi, Sarah.
Sarah: Hi, John. Did you see that article in Nature magazine about genetically modified crops?
John: Yeah, I've just read it. Some of the research results were pretty incredible.
Sarah: They've made some amazing advances, haven't they?
John: What I was impressed with was the fact that the emphasis has gone from increased profits to more environmental issues.
Sarah: That's right — take the research on the maize crop they mentioned. It was described as being wildlife-friendly, wasn't it?
John: Yeah, it's good to see GM crops that won't have a detrimental effect on nearby livestock.
Sarah: The research on the GM soya bean crop was promising as well. Apparently, it's designed to be resistant to weeds, so farmers don't need to spray any nasty chemicals to remove them.
John: Which is great because for something like wheat, this can drive down the cost of food and improve the quality of the water supply as well.
Sarah: And it's not just weeds these new GM crops can guard against. I was interested to read what they're doing with potato crops.
John: Mmm. It said they're aiming to introduce an antifreeze that's found naturally in fish into the potato crops so that they can withstand extreme temperatures. That'd be a huge advantage for remote areas that struggle through harsh winter conditions.
Sarah: I agree. Another GM crop that could help poorer areas is the rice crop they're developing. It's such a staple food in many areas and the plan is to create a crop that contains a richer supply of nutrients.
John: Yes, in particular they're trying to produce a rice crop that'll supply high levels of vitamin A.
Sarah: But these crops can have other uses beyond basic nutrition. Did you read about their planned use for tomatoes?
John: Yes, that was amazing. They plan to use tomatoes to transport medicines, don't they?
Sarah: Yeah, that's right. Transporting vaccines isn't easy because they're so fragile. So they're hoping to make an edible vaccine using tomatoes, that'll be easier to ship, store and even administer to patients. It's a really good example of the uses other than food that GM crops can have. Like the poplar trees.
John: Oh, yes, the GM poplar trees they're working on should really do a lot to persuade people just how good this type of biotechnology can be.
Sarah: That's right. I mean, imagine, they're creating a tree that can soak up contaminants like heavy metals right out of the soil. A tree like that could totally eradicate our environmental problems.
John: I think articles like this can be very useful to show the general public that biotechnology shouldn't be feared.
Sarah: Yes, this article certainly covered just about every new crop under development. It's good to have the very latest information. Things have changed a great deal over the last few years.
John: That's right. It could have been a little more balanced in its approach though, don't you think?
Sarah: I suppose there was only one side presented. People do need to have all of the facts and this article didn't really provide them, did it?
John: No, but it did provide a very convincing argument for GM crops. It mentioned all of the main benefits, such as increased crop yields.
Sarah: Yes, but there was a particular emphasis on pesticide use and the impact this will have on farmers. In many countries, pesticides are sprayed manually, and over time can be very harmful to the users.
John: That's right, and it's a far more important impact to focus on than increased profits.
Sarah: But I do think the public has a right to know about the potential problems of GM crops as well. Many scientists still have concerns.
John: Well, there is the concern that these crops will spread uncontrollably and affect natural crops.
Sarah: Mmm, but I'm more concerned about the studies showing children may develop a severe allergic reaction to these foods.
John: That's something that definitely needs to be researched thoroughly. Tests they've done so far on rats have shown that we can't really predict what impact these foods will have in the long term.
Sarah: I think there's a long way to go yet.`;

const UNIT_15_THIS_EARTH: CambridgeUnit = {
  unit: 15,
  slug: "this-earth",
  title: "This Earth",
  topics: "Natural phenomena, agriculture",
  testPractice: "Listening Section 3",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit15Vocab,
    },
    {
      kind: "fill_mc",
      title: "Describing a storm",
      instructions: "Choose the word that best completes each sentence about the storms.",
      items: [
        { before: "There was a night of", after: "rain that flooded the low-lying fields.", options: ["torrential", "dense", "freezing"], answer: "torrential" },
        { before: "There were also", after: "winds, which blew down several outbuildings.", options: ["severe", "tropical", "heavy"], answer: "severe" },
        { before: "It seemed inevitable that the high-rise buildings would be", after: "by lightning.", options: ["struck", "erupted", "fallen"], answer: "struck" },
        { before: "There was a twenty-minute period of deafening", after: ", which terrified the islanders.", options: ["thunder", "ash", "fog"], answer: "thunder" },
        { before: "They looked towards the volcano and wondered if it might", after: "and cause more damage.", options: ["erupt", "strike", "melt"], answer: "erupt" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Weather idioms",
      instructions: "Tap each idiom to reveal what it means.",
      pairs: [
        { prompt: "every cloud has a silver lining", reveal: "difficult situations can also have positive effects" },
        { prompt: "in the cold light of day", reveal: "see something for what it really is" },
        { prompt: "weather the storm", reveal: "endure a difficult period" },
        { prompt: "know which way the wind is blowing", reveal: "be aware of current opinions" },
        { prompt: "the calm before the storm", reveal: "a period of peace followed by a period of chaos" },
        { prompt: "a storm in a teacup", reveal: "a small problem that has been exaggerated" },
        { prompt: "not have the foggiest idea", reveal: "be totally unaware of or ignorant of something" },
        { prompt: "be snowed under", reveal: "feel overwhelmed, have too much work" },
      ],
    },
    {
      kind: "type_fill",
      title: "Idioms in context",
      instructions: "Complete each sentence with an idiom from this unit. You may need to change the form.",
      items: [
        { prompt: "We need to ignore all of the media hype and examine this problem ___.", answer: "in the cold light of day" },
        { prompt: "If the government introduces necessary but unpopular measures, they should be prepared to ___ rather than please the public.", answer: "weather the storm" },
        { prompt: "Although the unemployment figures dropped today, experts believe this may be ___, with hundreds of job losses predicted.", answer: "the calm before the storm" },
        { prompt: "Climate sceptics believe that scientists are exaggerating the situation and this is simply ___.", answer: "a storm in a teacup" },
        { prompt: "To be honest, I don't think the present government ___ what to do about obesity.", answer: "has the foggiest idea" },
      ],
    },
    {
      kind: "sort",
      title: "Natural world or farming?",
      instructions: "Tap a word, then tap the category it belongs to.",
      buckets: ["Natural phenomena", "Agriculture"],
      items: [
        { term: "erupt", bucket: 0 },
        { term: "tremor", bucket: 0 },
        { term: "aftershock", bucket: 0 },
        { term: "torrential", bucket: 0 },
        { term: "drought", bucket: 0 },
        { term: "acid rain", bucket: 0 },
        { term: "greenhouse gases", bucket: 0 },
        { term: "cultivate", bucket: 1 },
        { term: "sow", bucket: 1 },
        { term: "pasture", bucket: 1 },
        { term: "pest", bucket: 1 },
        { term: "crop yields", bucket: 1 },
        { term: "irrigation", bucket: 1 },
        { term: "soil erosion", bucket: 1 },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — water, energy and the soil",
      passageTitle: "A vicious circle",
      passage:
        "Current research models indicate that climate change associated with increasing levels of greenhouse gases is likely to lead to the soils in the interiors of the major continents drying out. In response to a drying of cropland, people are likely to seek either new sources of irrigation water or new, wetter areas to farm. If we choose desalination of seawater as a possible solution, large amounts of energy will be required. This means we are caught in a vicious circle as more fossil fuels are consumed. This results in an increase in carbon dioxide or greenhouse gas emissions. This in turn contributes to climate change, which warms up the planet. As a result, the earth dries out, causing soil erosion, and our crop yields decline, meaning that new sources of water need to be sought. Clearly, a long-term viable solution that does not produce acid rain and is not damaging to the environment is needed.",
      questions: [
        {
          text: "Climate change is expected to dry out soils in the middle of large continents.",
          answer: "True",
          justification: "Climate change is likely to lead to the soils in the interiors of the major continents drying out.",
        },
        {
          text: "Desalination of seawater requires a great deal of energy.",
          answer: "True",
          justification: "If we choose desalination of seawater, large amounts of energy will be required.",
        },
        {
          text: "Desalination plants are cheaper to build than irrigation systems.",
          answer: "Not given",
          justification: "The passage makes no comparison of costs between the two.",
        },
        {
          text: "Burning more fossil fuels reduces greenhouse gas emissions.",
          answer: "False",
          justification: "Consuming more fossil fuels results in an increase in carbon dioxide or greenhouse gas emissions.",
        },
        {
          text: "Falling crop yields create a need to find new sources of water.",
          answer: "True",
          justification: "Crop yields decline, meaning that new sources of water need to be sought.",
        },
        {
          text: "The writer believes an acceptable long-term solution has already been found.",
          answer: "False",
          justification: "The writer says a long-term viable solution is still needed.",
        },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Threats to agriculture",
      instructions: "Listen to a talk about agriculture and complete the table with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-29.mp3",
      template:
        "Climate change\n" +
        "• leads to: higher {{temperatures}}\n" +
        "• effects: decrease in yield from {{crops}}; increase in {{weeds}} and {{pests}}; poor soil quality\n\n" +
        "Extreme weather\n" +
        "• leads to: periods of {{drought}}; increased risk of {{floods}}\n" +
        "• effects: loss of crops\n\n" +
        "Farming practices\n" +
        "• leads to: use of {{tractors}}; using land to feed {{cattle}}\n" +
        "• effects: soil {{erosion}}\n\n" +
        "Urban development\n" +
        "• leads to: {{deforestation}} to provide space for homes\n" +
        "• effects: soil degradation\n\n" +
        "Genetically modified crops\n" +
        "• leads to: increased {{productivity}}\n" +
        "• effects: crops that are {{resistant}} to diseases or pests; reduction in the use of {{chemicals}}",
      script: track29Script,
      tip: "Chú ý các cụm chỉ nhân – quả: bring about, result in, lead to, stem from, take its toll, comes at the cost of. Đây chính là ngôn ngữ ghi điểm cho Writing Task 2.",
    },
    {
      kind: "listening_cloze",
      title: "Test practice — Listening Section 3",
      instructions: "Listen to two university lecturers discussing an article about genetically modified crops. Complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-30.mp3",
      template:
        "Benefits mentioned for each GM crop\n" +
        "• maize — wildlife-friendly; no {{detrimental}} effect on nearby livestock\n" +
        "• soya beans — designed to be resistant to {{weeds}}, so no need to spray nasty chemicals\n" +
        "• wheat — can drive down the {{cost}} of food\n" +
        "• potatoes — an {{antifreeze}} found naturally in fish lets the crop withstand extreme temperatures\n" +
        "• rice — a crop containing a richer supply of {{nutrients}}, with high levels of vitamin A\n" +
        "• tomatoes — used to transport {{medicines}} as an edible vaccine\n" +
        "• poplar trees — soak up {{contaminants}} such as heavy metals from the soil\n\n" +
        "Opinions about the article\n" +
        "• the speakers agree the article was not {{balanced}} — only one side was presented\n" +
        "• it placed a particular emphasis on {{pesticide}} use rather than on increased profits\n" +
        "• Sarah's main concern is that children may develop a severe {{allergic}} reaction to these foods",
      script: track30Script,
      tip: "Section 3 thường là hội thoại giữa hai người: hãy chú ý ai nói gì và các cụm thể hiện đồng tình/không đồng tình (That's right / I suppose / but I do think...).",
    },
  ],
};

const unit16Vocab: VocabWord[] = [
  {
    term: "renewable",
    ipa: "/rɪˈnjuːəbl/",
    pos: "adjective",
    usageNote: "mô tả nguồn năng lượng có thể tái tạo, không bao giờ cạn kiệt",
    en: "(of energy sources) able to be replaced naturally and therefore never running out",
    vi: "có thể tái tạo (năng lượng)",
    synonyms: ["sustainable"],
    antonyms: ["finite", "non-renewable"],
    examples: [
      { en: "Fuel sources that won't run out are renewable.", vi: "Những nguồn nhiên liệu không cạn kiệt được gọi là năng lượng tái tạo." },
      { en: "The country aims to generate half its electricity from renewable sources.", vi: "Quốc gia này đặt mục tiêu sản xuất một nửa lượng điện từ các nguồn tái tạo." },
    ],
    ieltsTip: "\"Renewable energy sources\" là cụm chuẩn — nhớ dùng \"sources\" số nhiều.",
    summary: "renewable = có thể tái tạo, không cạn kiệt.",
  },
  {
    term: "sustainable",
    ipa: "/səˈsteɪnəbl/",
    pos: "adjective",
    usageNote: "mô tả cách làm có thể duy trì lâu dài mà không gây hại cho môi trường",
    en: "able to continue for a long time without damaging the environment",
    vi: "bền vững",
    synonyms: ["viable", "renewable"],
    antonyms: ["unsustainable"],
    examples: [
      { en: "Alternative energy is a sustainable means of providing electrical power.", vi: "Năng lượng thay thế là phương thức cung cấp điện năng bền vững." },
      { en: "We need to live in an environmentally sustainable way.", vi: "Chúng ta cần sống theo cách bền vững với môi trường." },
    ],
    ieltsTip: "\"Sustainable development / growth / solution\" — collocation xuất hiện rất nhiều trong Writing Task 2.",
    summary: "sustainable = bền vững, duy trì được lâu dài.",
  },
  {
    term: "alternative energy",
    ipa: "/ɔːlˈtɜːnətɪv ˈenədʒi/",
    pos: "phrase",
    usageNote: "chỉ các nguồn năng lượng thay cho nhiên liệu hoá thạch",
    en: "energy from sources other than coal, oil and gas",
    vi: "năng lượng thay thế",
    synonyms: ["green energy"],
    antonyms: ["fossil fuel energy"],
    examples: [
      { en: "Alternative energy sources are low emitters of CO₂.", vi: "Các nguồn năng lượng thay thế phát thải CO₂ rất thấp." },
      { en: "Domestic alternative energy systems can only power small appliances.", vi: "Hệ thống năng lượng thay thế trong gia đình chỉ đủ chạy các thiết bị nhỏ." },
    ],
    ieltsTip: "\"Alternative energy\" và \"green energy\" có thể dùng thay nhau — rất tiện để tránh lặp từ.",
    summary: "alternative energy = năng lượng thay thế nhiên liệu hoá thạch.",
  },
  {
    term: "fossil fuels",
    ipa: "/ˈfɒsl fjuːəlz/",
    pos: "phrase",
    usageNote: "chỉ than đá, dầu mỏ và khí đốt — hình thành từ xác sinh vật cổ đại",
    en: "fuels such as coal, oil and gas formed from the remains of ancient plants and animals",
    vi: "nhiên liệu hoá thạch",
    synonyms: [],
    antonyms: ["renewables"],
    examples: [
      { en: "We need to curb our use of fossil fuels.", vi: "Chúng ta cần hạn chế việc sử dụng nhiên liệu hoá thạch." },
      { en: "We will soon need to wean ourselves off fossil fuels.", vi: "Chẳng bao lâu nữa chúng ta sẽ phải cai dần nhiên liệu hoá thạch." },
    ],
    ieltsTip: "Luôn dùng số nhiều \"fossil fuels\" khi nói chung về than, dầu, khí.",
    summary: "fossil fuels = nhiên liệu hoá thạch (than, dầu, khí).",
  },
  {
    term: "emissions",
    ipa: "/ɪˈmɪʃnz/",
    pos: "noun",
    usageNote: "danh từ số nhiều, chỉ lượng khí thải ra môi trường",
    en: "gases sent out into the air, especially harmful ones",
    vi: "khí thải, lượng phát thải",
    synonyms: ["discharge"],
    antonyms: [],
    examples: [
      { en: "These sources of energy have a major benefit in the shape of their low emissions.", vi: "Các nguồn năng lượng này có lợi thế lớn là mức phát thải thấp." },
      { en: "Governments must agree to limit emissions of harmful gases.", vi: "Các chính phủ phải đồng thuận hạn chế phát thải khí độc hại." },
    ],
    ieltsTip: "Phân biệt: \"emissions\" (danh từ) — \"emit\" (động từ) — \"emitter\" (nguồn phát thải).",
    summary: "emissions = khí thải phát ra môi trường.",
  },
  {
    term: "carbon footprint",
    ipa: "/ˈkɑːbən ˈfʊtprɪnt/",
    pos: "phrase",
    usageNote: "chỉ tổng lượng khí nhà kính mà một người hoặc tổ chức thải ra",
    en: "the amount of greenhouse gases a person or organisation produces",
    vi: "dấu chân carbon (lượng phát thải cá nhân)",
    synonyms: ["carbon impact"],
    antonyms: [],
    examples: [
      { en: "People talk about reducing their carbon footprint.", vi: "Mọi người nói về việc giảm dấu chân carbon của mình." },
      { en: "Flying less is the quickest way to cut your carbon footprint.", vi: "Bay ít đi là cách nhanh nhất để cắt giảm dấu chân carbon của bạn." },
    ],
    ieltsTip: "Collocation: \"reduce / cut / offset your carbon footprint\".",
    summary: "carbon footprint = tổng lượng khí nhà kính do một cá nhân/tổ chức tạo ra.",
  },
  {
    term: "generate",
    ipa: "/ˈdʒenəreɪt/",
    pos: "verb",
    usageNote: "dùng cho việc tạo ra điện, năng lượng, thu nhập hoặc việc làm",
    en: "to produce energy, especially electricity",
    vi: "sản xuất, tạo ra (điện, năng lượng)",
    synonyms: ["produce"],
    antonyms: ["consume"],
    examples: [
      { en: "At present, we burn fossil fuels to generate electricity.", vi: "Hiện tại, chúng ta đốt nhiên liệu hoá thạch để sản xuất điện." },
      { en: "The wind farm generates enough power for 40,000 homes.", vi: "Trang trại gió tạo ra đủ điện cho 40.000 hộ gia đình." },
    ],
    ieltsTip: "Với điện, \"generate\" tự nhiên hơn \"make\"; cặp \"generate ↔ consume\" rất hữu ích cho Task 1.",
    summary: "generate = sản xuất, tạo ra điện/năng lượng.",
  },
  {
    term: "consume",
    ipa: "/kənˈsjuːm/",
    pos: "verb",
    usageNote: "dùng cho việc tiêu thụ năng lượng, nhiên liệu, thời gian hoặc hàng hoá",
    en: "to use fuel, energy or time, especially in large amounts",
    vi: "tiêu thụ, tiêu hao",
    synonyms: ["use up"],
    antonyms: ["conserve"],
    examples: [
      { en: "Large screen TVs consume far more energy than older models.", vi: "TV màn hình lớn tiêu thụ nhiều năng lượng hơn hẳn các mẫu cũ." },
      { en: "We are caught in a vicious circle as more fossil fuels are consumed.", vi: "Chúng ta mắc kẹt trong vòng luẩn quẩn khi ngày càng nhiều nhiên liệu hoá thạch bị tiêu thụ." },
    ],
    ieltsTip: "Danh từ là \"consumption\" — \"energy/petrol consumption\" là cụm cực kỳ thông dụng.",
    summary: "consume = tiêu thụ nhiên liệu/năng lượng với lượng lớn.",
  },
  {
    term: "conserve",
    ipa: "/kənˈsɜːv/",
    pos: "verb",
    usageNote: "nghĩa giữ gìn, dùng tiết kiệm để không lãng phí nguồn lực",
    en: "to use something carefully so that it is not wasted",
    vi: "bảo tồn, tiết kiệm (nguồn lực)",
    synonyms: ["save", "preserve"],
    antonyms: ["waste"],
    examples: [
      { en: "Simple changes at home can help conserve energy.", vi: "Những thay đổi đơn giản tại nhà có thể giúp tiết kiệm năng lượng." },
      { en: "It is vital that we conserve these natural resources.", vi: "Việc bảo tồn những nguồn tài nguyên thiên nhiên này là vô cùng quan trọng." },
    ],
    ieltsTip: "\"Conserve energy\" (tiết kiệm năng lượng) khác \"preserve\" (giữ nguyên trạng, bảo quản).",
    summary: "conserve = dùng tiết kiệm, bảo tồn nguồn lực.",
  },
  {
    term: "harness",
    ipa: "/ˈhɑːnɪs/",
    pos: "verb",
    usageNote: "nghĩa khai thác và kiểm soát một nguồn lực tự nhiên để sử dụng",
    en: "to control and use the natural force or power of something",
    vi: "khai thác, tận dụng (sức mạnh tự nhiên)",
    synonyms: ["capture", "exploit"],
    antonyms: ["waste"],
    examples: [
      { en: "Turbines are used to harness the energy from the wind.", vi: "Tua-bin được dùng để khai thác năng lượng từ gió." },
      { en: "Coastal waters could be harnessed to provide electricity.", vi: "Vùng biển ven bờ có thể được khai thác để cung cấp điện." },
    ],
    ieltsTip: "\"Harness solar/wind/wave energy\" là cách diễn đạt học thuật thay cho \"use\".",
    summary: "harness = khai thác, tận dụng sức mạnh tự nhiên.",
  },
  {
    term: "energy-efficient",
    ipa: "/ˈenədʒi ɪˈfɪʃnt/",
    pos: "adjective",
    usageNote: "mô tả thiết bị hoặc quy trình dùng ít năng lượng để đạt cùng kết quả",
    en: "using little energy to do the same job",
    vi: "tiết kiệm năng lượng, hiệu suất năng lượng cao",
    synonyms: ["low-consumption"],
    antonyms: ["wasteful"],
    examples: [
      { en: "Researchers have found an energy-efficient way to make hydrogen.", vi: "Các nhà nghiên cứu đã tìm ra cách sản xuất hydro tiết kiệm năng lượng." },
      { en: "Diesel cars are more efficient than petrol ones because they use less fuel per kilometre.", vi: "Xe chạy dầu hiệu quả hơn xe chạy xăng vì tiêu hao ít nhiên liệu hơn trên mỗi ki-lô-mét." },
    ],
    ieltsTip: "Phân biệt \"efficient\" (ít lãng phí) với \"effective\" (đạt được kết quả mong muốn).",
    summary: "energy-efficient = tiết kiệm năng lượng, ít lãng phí.",
  },
  {
    term: "exhaust",
    ipa: "/ɪɡˈzɔːst/",
    pos: "verb",
    usageNote: "là động từ nghĩa dùng cạn kiệt; là danh từ nghĩa khí thải từ động cơ",
    en: "to use something completely so that none is left",
    vi: "dùng cạn kiệt; (danh từ) khí xả",
    synonyms: ["use up", "deplete"],
    antonyms: ["replenish"],
    examples: [
      { en: "If we continue to use petrol at the current rate, we will exhaust our natural reserves.", vi: "Nếu tiếp tục dùng xăng với tốc độ hiện tại, chúng ta sẽ làm cạn kiệt nguồn dự trữ tự nhiên." },
      { en: "Exhaust fumes from cars contribute to greenhouse gases.", vi: "Khí xả từ ô tô góp phần tạo ra khí nhà kính." },
    ],
    ieltsTip: "\"Exhaust our resources/reserves\" — đừng dùng \"wear out\" cho tài nguyên.",
    summary: "exhaust = dùng cạn kiệt; exhaust fumes = khí xả.",
  },
  {
    term: "fumes",
    ipa: "/fjuːmz/",
    pos: "noun",
    usageNote: "danh từ số nhiều, chỉ khí hoặc khói độc hại khó thở",
    en: "strong-smelling and often harmful gas or smoke",
    vi: "khói/khí độc hại",
    synonyms: ["exhaust", "emissions"],
    antonyms: ["fresh air"],
    examples: [
      { en: "It's the fumes cars produce that cause greenhouse gases.", vi: "Chính khí thải do ô tô sinh ra gây ra khí nhà kính." },
      { en: "Traffic fumes make the air in the city centre unpleasant.", vi: "Khói xe làm không khí trong trung tâm thành phố khó chịu." },
    ],
    ieltsTip: "\"Fumes\" luôn ở dạng số nhiều — không viết \"a fume\".",
    summary: "fumes = khói/khí độc hại (luôn số nhiều).",
  },
  {
    term: "curb",
    ipa: "/kɜːb/",
    pos: "verb",
    usageNote: "nghĩa kiềm chế, hạn chế điều gì đó đang tăng quá nhanh",
    en: "to control or limit something harmful",
    vi: "kiềm chế, hạn chế",
    synonyms: ["restrict", "restrain"],
    antonyms: ["encourage"],
    examples: [
      { en: "We need to curb our use of fossil fuels.", vi: "Chúng ta cần hạn chế việc sử dụng nhiên liệu hoá thạch." },
      { en: "It is important for governments to act quickly to curb obesity.", vi: "Điều quan trọng là các chính phủ phải hành động nhanh để kiềm chế béo phì." },
    ],
    ieltsTip: "\"Curb\" mạnh và học thuật hơn \"reduce\" — dùng cho những thứ tiêu cực đang gia tăng.",
    summary: "curb = kiềm chế, hạn chế điều tiêu cực.",
  },
  {
    term: "natural resources",
    ipa: "/ˈnætʃrəl rɪˈsɔːsɪz/",
    pos: "phrase",
    usageNote: "luôn dùng số nhiều; chỉ tài nguyên sẵn có trong tự nhiên như than, dầu, gỗ, nước",
    en: "materials such as coal, oil, wood and water that exist naturally and can be used",
    vi: "tài nguyên thiên nhiên",
    synonyms: ["reserves"],
    antonyms: [],
    examples: [
      { en: "Oil, gas and coal are natural resources used to produce energy.", vi: "Dầu, khí và than là tài nguyên thiên nhiên dùng để sản xuất năng lượng." },
      { en: "Making hydrogen must not use up scarce natural resources.", vi: "Việc sản xuất hydro không được làm cạn kiệt các tài nguyên thiên nhiên khan hiếm." },
    ],
    ieltsTip: "Error warning: dùng \"resources\" (số nhiều) cho tài nguyên; dùng \"source\" khi nói nơi xuất phát (\"a good source of information\").",
    summary: "natural resources = tài nguyên thiên nhiên (luôn số nhiều).",
  },
  {
    term: "hydroelectric",
    ipa: "/ˌhaɪdrəʊɪˈlektrɪk/",
    pos: "adjective",
    usageNote: "tiền tố hydro- liên quan đến nước; chỉ điện sản xuất từ sức nước",
    en: "producing electricity using the power of falling water",
    vi: "thuỷ điện",
    synonyms: [],
    antonyms: [],
    examples: [
      { en: "Hydroelectric dams have been around for a long time but produce only 19% of the world's energy.", vi: "Các đập thuỷ điện đã tồn tại từ lâu nhưng chỉ tạo ra 19% năng lượng thế giới." },
      { en: "There are emissions costs in building hydroelectric power stations.", vi: "Việc xây dựng nhà máy thuỷ điện cũng phát sinh chi phí phát thải." },
    ],
    ieltsTip: "Nhóm collocation cần nhớ: hydroelectric dam / power station, wind turbine / farm, solar panel / farm.",
    summary: "hydroelectric = thuộc về thuỷ điện (điện từ sức nước).",
  },
  {
    term: "nuclear power",
    ipa: "/ˈnjuːkliə ˈpaʊə(r)/",
    pos: "phrase",
    usageNote: "chỉ năng lượng sinh ra từ hạt nhân nguyên tử",
    en: "the power produced from the nucleus of an atom",
    vi: "điện hạt nhân, năng lượng hạt nhân",
    synonyms: ["atomic power"],
    antonyms: [],
    examples: [
      { en: "One last obstacle to the adoption of green energy is nuclear power.", vi: "Một trở ngại cuối cùng cho việc áp dụng năng lượng xanh là điện hạt nhân." },
      { en: "It should appeal to the public more than having a nuclear power plant on their doorstep.", vi: "Nó sẽ hấp dẫn công chúng hơn là có một nhà máy điện hạt nhân ngay cạnh nhà." },
    ],
    ieltsTip: "Chú ý phát âm /ˈnjuːkliə/ — nhiều thí sinh đọc sai thành \"nucular\".",
    summary: "nuclear power = năng lượng/điện hạt nhân.",
  },
  {
    term: "ore",
    ipa: "/ɔː(r)/",
    pos: "noun",
    usageNote: "chỉ loại đá chứa kim loại có thể khai thác được",
    en: "rock from which metal can be obtained",
    vi: "quặng (đá chứa kim loại)",
    synonyms: ["mineral deposit"],
    antonyms: [],
    examples: [
      { en: "Lead is usually found in ore, which is the name given to rock that we can extract metal from.", vi: "Chì thường được tìm thấy trong quặng — loại đá mà từ đó ta có thể chiết xuất kim loại." },
      { en: "Iron ore is one of the country's main exports.", vi: "Quặng sắt là một trong những mặt hàng xuất khẩu chính của nước này." },
    ],
    ieltsTip: "Bộ từ vựng khai khoáng: ore – smelt – quarry – mine, hay gặp trong Listening Section 4.",
    summary: "ore = quặng, đá chứa kim loại khai thác được.",
  },
  {
    term: "smelt",
    ipa: "/smelt/",
    pos: "verb",
    usageNote: "chỉ quá trình nung chảy quặng ở nhiệt độ rất cao để lấy kim loại",
    en: "to obtain metal from rock by heating it to a very high temperature",
    vi: "nấu chảy quặng, luyện kim",
    synonyms: ["refine"],
    antonyms: [],
    examples: [
      { en: "Metal is extracted by a process known as smelting.", vi: "Kim loại được chiết xuất bằng quy trình gọi là luyện quặng." },
      { en: "The ore is smelted before it can be used.", vi: "Quặng được nấu chảy trước khi có thể sử dụng." },
    ],
    ieltsTip: "Danh từ là \"smelting\"; đừng nhầm với \"smell\".",
    summary: "smelt = nung chảy quặng để lấy kim loại.",
  },
  {
    term: "malleable",
    ipa: "/ˈmæliəbl/",
    pos: "adjective",
    usageNote: "mô tả kim loại dễ dát mỏng, dễ tạo hình; nghĩa bóng chỉ người dễ bị tác động",
    en: "easily changed into a new shape",
    vi: "dễ dát mỏng, dễ tạo hình",
    synonyms: ["pliable"],
    antonyms: ["brittle"],
    examples: [
      { en: "Lead is extremely malleable, so it's easy to shape or flatten into sheets.", vi: "Chì rất dễ dát mỏng nên dễ tạo hình hoặc cán thành tấm." },
      { en: "Young children's opinions are highly malleable.", vi: "Quan điểm của trẻ nhỏ rất dễ bị uốn nắn." },
    ],
    ieltsTip: "Nghĩa bóng (\"malleable opinions/minds\") rất hữu ích cho các đề về giáo dục và quảng cáo.",
    summary: "malleable = dễ dát mỏng, dễ uốn nắn.",
  },
];

const track31Script = `Anne: Hi, Pete, have you read this article about the solar farm they're planning to build?
Pete: No, where's that?
Anne: It says they're planning to build large-scale solar farms in Africa.
Pete: Oh. That sounds like a good idea. The only problem with alternative energy sources is that they don't seem to be able to produce enough to meet all our energy needs. I mean, hydroelectric dams have been around for a long time now but they only produce 19% of the world's energy.
Anne: Well, I suppose it all helps, and this plant will supposedly provide up to 15% of Europe's energy needs by 2050.
Pete: Europe? How will they get the electricity there?
Anne: They're going to use undersea cables to carry it there.
Pete: Well, that's a good idea, I suppose. I mean, one of the main criticisms of things like wind farms is how visible the wind turbines are.
Anne: Yeah, I know. People often complain about the noise they make, too, but that isn't an issue with solar power.
Pete: No, but that reminds me. I saw a documentary at the weekend about renewable energy in Scotland.
Anne: Really? Not exactly the perfect spot for a solar farm.
Pete: No, not solar energy, wave energy. They reckon coastal waters could provide up to ten times Scotland's annual electricity usage.
Anne: Wow, that would make them self-sufficient. It's certainly an interesting proposal, and if they generate that much electricity, it would be a remarkable achievement. And it should appeal to the public more than having a nuclear power plant on their doorstep.`;

const track32Script = `Mining in Australia probably started with the arrival of Aborigines around 40,000 years ago. Aborigines mined for ochre, a naturally occurring coloured clay which they used for decoration.
'Modern' Australian mining followed the arrival of European settlers in 1788. At first, this mining was limited to the quarrying and shaping of local sandstone, which they used for the first buildings at Sydney Cove.
Coal wasn't found until 1791, when some convicts managed to escape and got as far as Newcastle. The coal industry began in 1798, when ship owners gathered surface coal at Newcastle and brought it to Sydney for sale. Export of Newcastle coal began in the following year with a shipment to India.
Lead was the first metal mined in Australia, on the outskirts of Adelaide in 1841. Lead is one of the oldest metals known to humans. It's relatively simple to extract and it's extremely malleable, so it's easy to shape or flatten into sheets. Lead is usually found in ore, which is the name given to rock that we can extract metal from. It's extracted by a process known as smelting, where the rock, or ore, is heated to extremely high temperatures.
Of course, precious metals and precious stones are the natural resources that most people go in search of in the hope of striking it rich. In 1849, many Australians migrated to the United States during the gold rush. In a bid to stop this, the New South Wales Government decided to offer incentives for Australians to find gold in their own country.
But it is opals rather than gold or diamonds that Australia became famous for. The largest site was discovered in 1915 by a 14-year-old boy. He was with a group of gold diggers. The boy had been sent to look for water when he made the discovery of what was to become the world's largest and most productive opal field at Coober Pedy.`;

const UNIT_16_ENERGY_EFFICIENT: CambridgeUnit = {
  unit: 16,
  slug: "energy-efficient",
  title: "Energy efficient",
  topics: "Energy, natural resources",
  testPractice: "Writing Task 2",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit16Vocab,
    },
    {
      kind: "type_fill",
      title: "Kinds of power",
      instructions: "Complete each phrase with the kind of power being described.",
      items: [
        { prompt: "Power produced by panels that capture sunlight is ___ power.", answer: "solar" },
        { prompt: "Power produced by dams using falling water is ___ power.", answer: "hydroelectric" },
        { prompt: "Power produced by turbines placed in the sea is ___ power.", answer: "wave" },
        { prompt: "Power produced by turbines on tall towers on land is ___ power.", answer: "wind" },
        { prompt: "Power produced from the nucleus of an atom is ___ power.", answer: "nuclear" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Two students discuss green energy",
      instructions: "Listen to two students talking about alternative energy and complete the notes.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-31.mp3",
      template:
        "• The article is about large-scale {{solar farms}} planned in Africa.\n" +
        "• Pete's main criticism of alternative energy is that it cannot {{meet}} all our energy needs — {{hydroelectric}} dams still produce only 19% of the world's energy.\n" +
        "• The new plant should provide up to 15% of Europe's energy needs by 2050, carried there by {{undersea cables}}.\n" +
        "• A common complaint about {{wind farms}} is how visible the turbines are, and people also complain about the {{noise}}.\n" +
        "• Pete saw a documentary about {{wave}} energy in Scotland: coastal waters could provide up to ten times the country's annual electricity usage, making it {{self-sufficient}}.\n" +
        "• Anne thinks this would appeal to the public more than a {{nuclear power plant}} on their doorstep.",
      script: track31Script,
      tip: "Chú ý cách hai người thể hiện sự dè dặt (\"I suppose\", \"supposedly\") — Section 3 hay hỏi về thái độ của người nói.",
    },
    {
      kind: "fill_mc",
      title: "Verbs that go with 'energy'",
      instructions: "Choose the verb that fits each sentence.",
      items: [
        { before: "Many domestic solar energy systems don't", after: "enough energy to meet all our needs.", options: ["generate", "conserve", "harness"], answer: "generate" },
        { before: "Statistics show that the majority of energy", after: "in UK households is for heating.", options: ["consumed", "generated", "harnessed"], answer: "consumed" },
        { before: "Large screen TVs", after: "far more energy than older models.", options: ["consume", "supply", "conserve"], answer: "consume" },
        { before: "A solar plant on the moon would be capable of", after: "all our energy needs.", options: ["supplying", "consuming", "requiring"], answer: "supplying" },
        { before: "Turbines are used to", after: "the energy from the wind.", options: ["harness", "consume", "exhaust"], answer: "harness" },
        { before: "Switching off appliances at the wall helps to", after: "energy.", options: ["conserve", "generate", "require"], answer: "conserve" },
      ],
    },
    {
      kind: "type_fill",
      title: "Energy word puzzle",
      instructions: "Read each definition and type the word from this unit.",
      items: [
        { prompt: "What most UK household electricity is used for.", answer: "heating" },
        { prompt: "Toxic gases from cars which aren't good to breathe in.", answer: "fumes" },
        { prompt: "A country's deposits of coal, gas and oil are its natural ___.", answer: "resources" },
        { prompt: "Fuel sources that won't run out are ___.", answer: "renewable" },
        { prompt: "To totally use up.", answer: "exhaust" },
        { prompt: "People talk about reducing their carbon ___.", answer: "footprint" },
        { prompt: "Able to be recycled.", answer: "recyclable" },
        { prompt: "To use fuel, energy or time in large amounts.", answer: "consume" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Natural resources — choose the right word",
      instructions: "Choose the correct alternative to complete each sentence.",
      items: [
        { before: "We need to", after: "our use of fossil fuels.", options: ["curb", "maximise"], answer: "curb" },
        { before: "Our levels of petrol", after: "are not sustainable.", options: ["consumption", "burning"], answer: "consumption" },
        { before: "At present, we burn fossil fuels to", after: "electricity.", options: ["generate", "power"], answer: "generate" },
        { before: "Domestic alternative energy sources can only produce enough energy to", after: "small appliances.", options: ["run", "provide"], answer: "run" },
        { before: "Diesel cars are more", after: "than petrol ones because they use less fuel per kilometre.", options: ["efficient", "effective"], answer: "efficient" },
        { before: "If we continue to use petrol at the current rate, we will", after: "our natural reserves within 50 years.", options: ["exhaust", "wear out"], answer: "exhaust" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "The history of mining in Australia",
      instructions: "Listen to a talk about mining in Australia and complete the notes.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-32.mp3",
      template:
        "• Mining began with the Aborigines around 40,000 years ago, who mined {{ochre}} — a naturally occurring coloured clay used for decoration.\n" +
        "• After European settlers arrived in 1788, mining was limited to the {{quarrying}} and shaping of local sandstone.\n" +
        "• The coal industry began in 1798; export of Newcastle coal began the following year with a shipment to {{India}}.\n" +
        "• {{Lead}} was the first metal mined in Australia, near Adelaide in 1841. It is extremely {{malleable}}, so it is easy to flatten into sheets.\n" +
        "• Metal is found in {{ore}} and extracted by a process known as {{smelting}}, in which the rock is heated to extremely high temperatures.\n" +
        "• Australia became famous not for gold or diamonds but for {{opals}}; the largest field, at Coober Pedy, was discovered in 1915.",
      script: track32Script,
      tip: "Với bài nghe theo dòng thời gian, hãy dùng các mốc năm làm \"mỏ neo\" để không bị lạc khi nghe.",
    },
    {
      kind: "reveal_pairs",
      title: "Mining vocabulary",
      instructions: "Tap each word to reveal its meaning.",
      pairs: [
        { prompt: "ochre", reveal: "a naturally coloured type of rock or earth" },
        { prompt: "a quarry", reveal: "a large artificial hole in the ground where stone is dug for use as building material" },
        { prompt: "malleable", reveal: "easily changed into a new shape" },
        { prompt: "ore", reveal: "rock from which metal can be obtained" },
        { prompt: "smelt", reveal: "to obtain metal from rock by exposing it to very high temperature" },
        { prompt: "an opal", reveal: "a precious stone or gem" },
      ],
    },
    {
      kind: "writing_task",
      title: "Test practice — Writing Task 2",
      taskLabel: "Writing Task 2",
      prompt:
        "Alternative energy sources that use the natural power of the wind, waves and sun are too expensive and complicated to replace the coal, oil and gas that we use to power our cities and transport. To what extent do you agree or disagree with this opinion? Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      tip:
        "Với dạng đề \"to what extent do you agree or disagree\", hãy lập dàn ý hai cột Agree – Disagree trước khi viết, rồi nêu rõ quan điểm của bạn ngay ở phần mở bài và giữ nhất quán đến kết bài. Dành khoảng 40 phút và viết ít nhất 250 từ.",
      modelAnswer:
        "Alternative energy is thought by some to be the answer to our reliance on fossil fuels, as sources of alternative energy are low emitters of CO₂ and are a sustainable means of providing electrical power. Critics of 'green energy' contend that current technologies are either too costly or impractical to realistically replace our current energy needs.\n\n" +
        "The advantages of 'green energy' are obvious. There is no need to worry about dwindling supplies of progressively more expensive resources. Solar power will never run out and, once initial costs are paid off, the electricity is basically free. These sources of energy have another major benefit in the shape of their low emissions. Although there are emissions costs in the building of wind turbines or hydroelectric power stations, there is no further air pollution or the risk of environmental contamination.\n\n" +
        "This notion of a perfect world of free and non-polluting energy does draw criticism, however. It is obvious that solar power won't work at night or that not every country has a coastline, rivers or windy hills. It is also a problem that replacing our current energy supply will entail expensive research and development, which, in turn, involves government cooperation. One last obstacle to the adoption of 'green energy' is nuclear power. Many countries see the huge energy production from this power source as a more practical solution than messing around with the wind and waves.\n\n" +
        "In conclusion, there is little doubt that we will soon need to wean ourselves off fossil fuels and on to an alternative fuel source. The only real question is whether we risk the costs and delays of green energy or choose the productive, but potentially dangerous, nuclear option.",
    },
  ],
};

const unit17Vocab: VocabWord[] = [
  {
    term: "promote",
    ipa: "/prəˈməʊt/",
    pos: "verb",
    usageNote: "trong ngữ cảnh công việc nghĩa là thăng chức cho ai đó; cũng có nghĩa quảng bá sản phẩm",
    en: "to raise someone to a higher or more important position",
    vi: "thăng chức cho ai đó",
    synonyms: ["upgrade", "elevate"],
    antonyms: ["demote"],
    examples: [
      { en: "I was promoted last year to head of department.", vi: "Tôi được thăng chức lên trưởng phòng vào năm ngoái." },
      { en: "Long-term employees are more likely to be promoted to a managerial position.", vi: "Nhân viên gắn bó lâu dài có nhiều khả năng được thăng lên vị trí quản lý hơn." },
    ],
    ieltsTip: "Thường dùng bị động: \"be promoted to + chức danh\". Danh từ là \"promotion\".",
    summary: "promote = thăng chức cho ai lên vị trí cao hơn.",
  },
  {
    term: "capital",
    ipa: "/ˈkæpɪtl/",
    pos: "noun",
    usageNote: "trong kinh doanh chỉ số vốn lớn để khởi nghiệp hoặc đầu tư",
    en: "a large amount of money used to start or expand a business",
    vi: "vốn (kinh doanh)",
    synonyms: ["funds", "investment"],
    antonyms: ["debt"],
    examples: [
      { en: "It's a big investment in terms of time and capital.", vi: "Đó là một khoản đầu tư lớn cả về thời gian lẫn vốn." },
      { en: "They raised enough capital to open two new branches.", vi: "Họ huy động đủ vốn để mở hai chi nhánh mới." },
    ],
    ieltsTip: "Trong bài đọc kinh tế, \"capital\" hầu như luôn mang nghĩa vốn, không phải thủ đô.",
    summary: "capital = vốn lớn để khởi nghiệp hoặc mở rộng kinh doanh.",
  },
  {
    term: "a calculated risk",
    ipa: "/ə ˈkælkjuleɪtɪd rɪsk/",
    pos: "phrase",
    usageNote: "chỉ rủi ro đã được cân nhắc kỹ và chấp nhận vì đáng để thử",
    en: "a chance that you consider to be worth taking",
    vi: "rủi ro đã được tính toán, cân nhắc kỹ",
    synonyms: ["a considered gamble"],
    antonyms: ["a reckless gamble"],
    examples: [
      { en: "It's a calculated risk and it should pay off over time.", vi: "Đó là một rủi ro đã được tính toán và về lâu dài sẽ mang lại kết quả." },
      { en: "Expanding overseas was a calculated risk for the company.", vi: "Mở rộng ra nước ngoài là một rủi ro có tính toán của công ty." },
    ],
    ieltsTip: "Đi với \"take a calculated risk\" — cách nói rất tự nhiên trong Speaking Part 3 về kinh doanh.",
    summary: "a calculated risk = rủi ro đã cân nhắc kỹ, đáng để chấp nhận.",
  },
  {
    term: "amalgamate",
    ipa: "/əˈmælɡəmeɪt/",
    pos: "verb",
    usageNote: "chỉ việc hai tổ chức hợp nhất thành một tổ chức lớn hơn",
    en: "to join or unite to form a larger organisation",
    vi: "sáp nhập, hợp nhất",
    synonyms: ["merge", "combine"],
    antonyms: ["split up"],
    examples: [
      { en: "We decided to amalgamate with a Chinese company.", vi: "Chúng tôi quyết định sáp nhập với một công ty Trung Quốc." },
      { en: "The two banks amalgamated last year.", vi: "Hai ngân hàng đã hợp nhất vào năm ngoái." },
    ],
    ieltsTip: "\"Merge\" thông dụng hơn, còn \"amalgamate\" trang trọng hơn — dùng trong Writing để nâng band.",
    summary: "amalgamate = sáp nhập, hợp nhất thành tổ chức lớn hơn.",
  },
  {
    term: "domestic",
    ipa: "/dəˈmestɪk/",
    pos: "adjective",
    usageNote: "trong kinh doanh nghĩa là thuộc thị trường trong nước, đối lập với overseas",
    en: "relating to your own country rather than other countries",
    vi: "trong nước, nội địa",
    synonyms: ["home", "internal"],
    antonyms: ["overseas", "foreign"],
    examples: [
      { en: "Things aren't running very smoothly in our domestic sales at the moment.", vi: "Mảng bán hàng nội địa của chúng tôi hiện đang không suôn sẻ lắm." },
      { en: "The company focuses on the domestic market.", vi: "Công ty tập trung vào thị trường trong nước." },
    ],
    ieltsTip: "\"Domestic\" còn có nghĩa \"thuộc về gia đình\" (domestic chores) — chú ý ngữ cảnh khi làm Reading.",
    summary: "domestic = thuộc thị trường trong nước (hoặc gia đình).",
  },
  {
    term: "cutback",
    ipa: "/ˈkʌtbæk/",
    pos: "noun",
    usageNote: "chỉ việc cắt giảm chi phí, nhân sự hoặc dịch vụ để tiết kiệm tiền",
    en: "a reduction in something made in order to save money",
    vi: "sự cắt giảm (chi phí, nhân sự)",
    synonyms: ["reduction"],
    antonyms: ["expansion"],
    examples: [
      { en: "If things don't improve soon, I'll be forced to make cutbacks in that department.", vi: "Nếu tình hình không sớm cải thiện, tôi buộc phải cắt giảm ở phòng ban đó." },
      { en: "Government cutbacks have affected local services.", vi: "Việc cắt giảm ngân sách của chính phủ đã ảnh hưởng tới các dịch vụ địa phương." },
    ],
    ieltsTip: "Collocation: \"make cutbacks\" — dùng như danh từ, còn động từ là \"cut back on something\".",
    summary: "cutback = sự cắt giảm để tiết kiệm chi phí.",
  },
  {
    term: "a golden opportunity",
    ipa: "/ə ˈɡəʊldən ˌɒpəˈtjuːnəti/",
    pos: "phrase",
    usageNote: "thành ngữ chỉ cơ hội quá tốt, hiếm có, không nên bỏ lỡ",
    en: "an excellent chance that should not be missed",
    vi: "cơ hội vàng",
    synonyms: ["a perfect chance"],
    antonyms: ["a missed chance"],
    examples: [
      { en: "It's a golden opportunity for me.", vi: "Đây là một cơ hội vàng cho tôi." },
      { en: "The internship was a golden opportunity to gain experience.", vi: "Kỳ thực tập là cơ hội vàng để tích luỹ kinh nghiệm." },
    ],
    ieltsTip: "Idiom này dùng rất tự nhiên trong Speaking Part 2 khi kể về một bước ngoặt trong sự nghiệp.",
    summary: "a golden opportunity = cơ hội vàng, hiếm có.",
  },
  {
    term: "make a name for yourself",
    ipa: "/meɪk ə neɪm fə jɔːˈself/",
    pos: "phrase",
    usageNote: "nghĩa gây dựng danh tiếng, được nhiều người biết đến nhờ năng lực",
    en: "to become well known and respected for what you do",
    vi: "gây dựng tên tuổi, tạo danh tiếng",
    synonyms: ["build a reputation"],
    antonyms: [],
    examples: [
      { en: "I'm hoping it'll give me a chance to make a name for myself in the industry.", vi: "Tôi hy vọng điều đó sẽ cho tôi cơ hội gây dựng tên tuổi trong ngành." },
      { en: "She made a name for herself as a designer while still at university.", vi: "Cô ấy đã tạo được tên tuổi trong vai trò nhà thiết kế ngay khi còn học đại học." },
    ],
    ieltsTip: "Nhớ đổi đại từ phản thân cho đúng: myself / yourself / himself / herself.",
    summary: "make a name for yourself = tạo dựng danh tiếng trong lĩnh vực của mình.",
  },
  {
    term: "a win-win situation",
    ipa: "/ə wɪn wɪn ˌsɪtʃuˈeɪʃn/",
    pos: "phrase",
    usageNote: "chỉ tình huống mà cả hai bên đều được lợi",
    en: "a situation in which everyone involved benefits",
    vi: "tình huống đôi bên cùng có lợi",
    synonyms: ["mutually beneficial arrangement"],
    antonyms: ["a zero-sum game"],
    examples: [
      { en: "They were looking for an exporter and we were looking for a local manufacturer, so it's a win-win situation.", vi: "Họ cần nhà xuất khẩu còn chúng tôi cần nhà sản xuất địa phương, nên đôi bên đều có lợi." },
      { en: "Flexible working can be a win-win situation for staff and employers.", vi: "Làm việc linh hoạt có thể là tình huống đôi bên cùng có lợi cho nhân viên và người sử dụng lao động." },
    ],
    ieltsTip: "Rất hữu ích khi nêu giải pháp trong Writing Task 2 — \"this would be a win-win situation\".",
    summary: "a win-win situation = tình huống cả hai bên đều được lợi.",
  },
  {
    term: "a household name",
    ipa: "/ə ˈhaʊshəʊld neɪm/",
    pos: "phrase",
    usageNote: "chỉ thương hiệu hoặc người nổi tiếng đến mức ai cũng biết",
    en: "a person or brand that everybody knows",
    vi: "cái tên quen thuộc với mọi nhà",
    synonyms: ["a famous brand"],
    antonyms: ["an unknown"],
    examples: [
      { en: "It's only through sheer hard work that we've become the household name we are today.", vi: "Chỉ nhờ nỗ lực bền bỉ mà chúng tôi mới trở thành cái tên quen thuộc như hôm nay." },
      { en: "The company became a household name in less than a decade.", vi: "Công ty trở thành thương hiệu ai cũng biết trong chưa đầy một thập kỷ." },
    ],
    ieltsTip: "Hay dùng trong các đề Speaking/Writing về quảng cáo và thương hiệu.",
    summary: "a household name = thương hiệu/tên tuổi ai cũng biết.",
  },
  {
    term: "a hands-on approach",
    ipa: "/ə ˌhændz ˈɒn əˈprəʊtʃ/",
    pos: "phrase",
    usageNote: "chỉ phong cách quản lý trực tiếp tham gia vào công việc thay vì chỉ ra lệnh",
    en: "a way of managing in which you get directly involved in the work",
    vi: "phong cách trực tiếp bắt tay vào việc",
    synonyms: ["an involved approach"],
    antonyms: ["a hands-off approach"],
    examples: [
      { en: "I take a hands-on approach to management and keep track of every department.", vi: "Tôi theo phong cách trực tiếp tham gia vào việc quản lý và theo dõi mọi phòng ban." },
      { en: "The best teachers take a hands-on approach in the classroom.", vi: "Những giáo viên giỏi nhất áp dụng cách dạy trực tiếp thực hành trong lớp." },
    ],
    ieltsTip: "Trái nghĩa \"a hands-off approach\" — nêu được cả cặp sẽ rất ấn tượng trong Speaking Part 3.",
    summary: "a hands-on approach = cách làm trực tiếp tham gia vào công việc.",
  },
  {
    term: "the tricks of the trade",
    ipa: "/ðə trɪks əv ðə treɪd/",
    pos: "phrase",
    usageNote: "chỉ những mẹo, kinh nghiệm mà người trong nghề biết",
    en: "the clever methods known by experienced people in a particular job",
    vi: "bí quyết nghề nghiệp",
    synonyms: ["know-how"],
    antonyms: [],
    examples: [
      { en: "He certainly knows all the tricks of the trade.", vi: "Anh ấy chắc chắn nắm rõ mọi bí quyết nghề nghiệp." },
      { en: "A good mentor will teach you the tricks of the trade.", vi: "Một người cố vấn giỏi sẽ dạy bạn những bí quyết trong nghề." },
    ],
    ieltsTip: "Luôn dùng đủ mạo từ: \"the tricks of the trade\", không nói \"tricks of trade\".",
    summary: "the tricks of the trade = bí quyết, mẹo nghề của người có kinh nghiệm.",
  },
  {
    term: "the bottom line",
    ipa: "/ðə ˈbɒtəm laɪn/",
    pos: "phrase",
    usageNote: "chỉ điều quan trọng nhất, kết luận cuối cùng; trong kế toán là lợi nhuận ròng",
    en: "the most important fact in a situation; a company's final profit or loss",
    vi: "điều cốt lõi; lợi nhuận cuối cùng",
    synonyms: ["the key point"],
    antonyms: [],
    examples: [
      { en: "The bottom line is, we're running a business here and we need to be profitable.", vi: "Điều cốt lõi là chúng ta đang kinh doanh và cần phải có lãi." },
      { en: "Rising fuel costs are hurting the company's bottom line.", vi: "Chi phí nhiên liệu tăng đang ảnh hưởng tới lợi nhuận của công ty." },
    ],
    ieltsTip: "\"The bottom line is (that)...\" là cách mở câu kết luận rất tự nhiên trong Speaking.",
    summary: "the bottom line = điều cốt lõi nhất / lợi nhuận sau cùng.",
  },
  {
    term: "break into",
    ipa: "/breɪk ˈɪntə/",
    pos: "verb",
    usageNote: "trong kinh doanh nghĩa là thâm nhập thành công vào một thị trường mới",
    en: "to become involved in a new market or area of business",
    vi: "thâm nhập (thị trường mới)",
    synonyms: ["enter", "penetrate"],
    antonyms: ["withdraw from"],
    examples: [
      { en: "We set up a new office in China so we can break into that market.", vi: "Chúng tôi lập văn phòng mới ở Trung Quốc để thâm nhập thị trường đó." },
      { en: "Setting up our own website allowed us to break into the overseas market.", vi: "Việc lập trang web riêng đã giúp chúng tôi thâm nhập thị trường nước ngoài." },
    ],
    ieltsTip: "Đừng nhầm với \"break through\" (đột phá) — với thị trường, đúng là \"break into\".",
    summary: "break into (a market) = thâm nhập vào thị trường mới.",
  },
  {
    term: "keep track of",
    ipa: "/kiːp træk əv/",
    pos: "phrase",
    usageNote: "nghĩa theo dõi sát sao tình hình hoặc con số nào đó",
    en: "to make sure you know what is happening to something",
    vi: "theo dõi sát, nắm được diễn biến",
    synonyms: ["monitor"],
    antonyms: ["lose track of"],
    examples: [
      { en: "It's important to keep track of how much money your department is spending.", vi: "Việc theo dõi sát mức chi tiêu của phòng ban là rất quan trọng." },
      { en: "I keep track of how things are going in just about every department.", vi: "Tôi theo dõi tình hình ở hầu như mọi phòng ban." },
    ],
    ieltsTip: "Luôn có giới từ \"of\": keep track OF something (không phải \"keep track for\").",
    summary: "keep track of = theo dõi sát sao điều gì đó.",
  },
  {
    term: "pay off",
    ipa: "/peɪ ˈɒf/",
    pos: "verb",
    usageNote: "có hai nghĩa: trả hết nợ, và (một việc mạo hiểm) mang lại kết quả tốt",
    en: "to pay back money you owe; or (of a risk) to bring good results",
    vi: "trả hết (nợ); mang lại kết quả tốt",
    synonyms: ["settle", "succeed"],
    antonyms: ["fail"],
    examples: [
      { en: "Mid-level lottery winners did not in fact pay off their debt.", vi: "Những người trúng số mức trung thực ra đã không trả hết nợ." },
      { en: "Starting up our own company was a risk, but it has really paid off for us.", vi: "Khởi nghiệp là một rủi ro, nhưng nó thực sự đã mang lại kết quả tốt cho chúng tôi." },
    ],
    ieltsTip: "Chú ý ngữ cảnh để chọn đúng nghĩa — đây là bẫy quen thuộc trong Reading.",
    summary: "pay off = trả hết nợ; hoặc (rủi ro) đem lại kết quả tốt.",
  },
  {
    term: "bankruptcy",
    ipa: "/ˈbæŋkrʌptsi/",
    pos: "noun",
    usageNote: "chỉ tình trạng pháp lý khi một người/công ty không thể trả được nợ",
    en: "the state of being unable to pay your debts",
    vi: "tình trạng phá sản",
    synonyms: ["insolvency"],
    antonyms: ["solvency"],
    examples: [
      { en: "People who won between $50,000 and $150,000 only postponed bankruptcy.", vi: "Những người trúng từ 50.000 đến 150.000 đô la chỉ trì hoãn được việc phá sản." },
      { en: "Filing for bankruptcy seriously harms your credit rating.", vi: "Việc nộp đơn phá sản gây tổn hại nghiêm trọng đến điểm tín dụng của bạn." },
    ],
    ieltsTip: "Tính từ là \"bankrupt\": \"go/become bankrupt\" — không nói \"become bankruptcy\".",
    summary: "bankruptcy = tình trạng phá sản, mất khả năng trả nợ.",
  },
  {
    term: "financial distress",
    ipa: "/faɪˈnænʃl dɪˈstres/",
    pos: "phrase",
    usageNote: "cách nói trang trọng chỉ tình trạng khó khăn nghiêm trọng về tiền bạc",
    en: "serious difficulty in paying what you owe",
    vi: "khốn đốn về tài chính",
    synonyms: ["financial difficulty"],
    antonyms: ["financial security"],
    examples: [
      { en: "Filing for bankruptcy is arguably the most extreme signal of financial distress.", vi: "Nộp đơn phá sản có lẽ là dấu hiệu cực đoan nhất của tình trạng khốn đốn tài chính." },
      { en: "Many households were in financial distress after the crisis.", vi: "Nhiều hộ gia đình rơi vào cảnh khốn đốn tài chính sau khủng hoảng." },
    ],
    ieltsTip: "Nhóm từ cùng chủ đề: financial problems – debt – creditors – bankruptcy – financial distress.",
    summary: "financial distress = tình trạng khốn đốn nghiêm trọng về tài chính.",
  },
  {
    term: "budget",
    ipa: "/ˈbʌdʒɪt/",
    pos: "noun",
    usageNote: "chỉ số tiền dự kiến dành cho một mục đích trong một khoảng thời gian",
    en: "the amount of money available to spend on something",
    vi: "ngân sách, khoản tiền dự chi",
    synonyms: ["allowance"],
    antonyms: [],
    examples: [
      { en: "Our department has an annual budget of $100,000 to cover travel expenses.", vi: "Phòng chúng tôi có ngân sách hằng năm 100.000 đô la cho chi phí đi lại." },
      { en: "I try to stay within my budget, but then I see something I really want to buy!", vi: "Tôi cố gắng chi tiêu trong ngân sách, nhưng rồi lại thấy thứ mình rất muốn mua!" },
    ],
    ieltsTip: "Collocation: an annual budget / stay within your budget / a tight budget.",
    summary: "budget = ngân sách, số tiền dành cho một mục đích.",
  },
  {
    term: "income",
    ipa: "/ˈɪnkʌm/",
    pos: "noun",
    usageNote: "chỉ tổng số tiền nhận được từ công việc hoặc đầu tư",
    en: "the money a person or organisation receives, especially from work",
    vi: "thu nhập",
    synonyms: ["earnings"],
    antonyms: ["expenditure"],
    examples: [
      { en: "You may need an extra job to supplement your income and help pay off your debts.", vi: "Bạn có thể cần một công việc thêm để bổ sung thu nhập và trả nợ." },
      { en: "Low-income families find it difficult to manage when prices rise rapidly.", vi: "Các gia đình thu nhập thấp gặp khó khăn khi giá cả tăng nhanh." },
    ],
    ieltsTip: "Phân biệt income (thu nhập nói chung) – salary (lương tháng) – wage (lương theo giờ/tuần).",
    summary: "income = thu nhập nhận được từ công việc hoặc đầu tư.",
  },
];

const track34Script = `Speaker 1: I was promoted last year to head of department. I'm in charge of all of our overseas operations now. It's a golden opportunity for me. It means a lot more responsibility, but I'm hoping it'll also give me a chance to make a name for myself in the industry. One of the projects I took on recently involved setting up a new office in China so we can break into that market. It's a big investment in terms of time and capital, but I think it's a calculated risk and it should pay off over time. Because it is a risk, we decided to amalgamate with a Chinese company. I was involved in the negotiations and drawing up the contracts for it. The other company was looking for an exporter and we were looking for a local manufacturer, so it's a win-win situation, really.
Speaker 2: Running a company this size is never an easy task, and it's only through sheer hard work and determination we've become the household name we are today. I employ over 2,000 staff, but I take a hands-on approach to management and so I keep track of how things are going in just about every department. Things aren't running very smoothly in our domestic sales at the moment. The main problem seems to be the supervisor, who I appointed myself. It was a promotion for him and he seemed ready to take on the extra responsibility. He certainly knows all the tricks of the trade, but his department is barely breaking even. In terms of his own management style, he certainly seems to communicate well with his team, and holds regular meetings. But just this month they missed an important deadline and cost us an important client. He just doesn't seem to be able to get the best out of his staff and the bottom line is, we're running a business here and we need to be profitable. If things don't improve soon, I'll be forced to make cutbacks in that department.`;

const UNIT_17_GETTING_DOWN_TO_BUSINESS: CambridgeUnit = {
  unit: 17,
  slug: "getting-down-to-business",
  title: "Getting down to business",
  topics: "Management, personal finance",
  testPractice: "Reading",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit17Vocab,
    },
    {
      kind: "listening_cloze",
      title: "Two managers talking",
      instructions: "Listen to two speakers talking about management. Complete the notes with the missing words and phrases.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-34.mp3",
      template:
        "Speaker 1\n" +
        "• Was {{promoted}} last year to head of department and is now in charge of all overseas operations — he calls it a {{golden opportunity}}.\n" +
        "• Hopes it will give him a chance to {{make a name}} for himself in the industry.\n" +
        "• Setting up a new office in China will let the firm {{break into}} that market; it is a big investment in time and {{capital}}, but a {{calculated risk}}.\n" +
        "• They decided to {{amalgamate}} with a Chinese company — for both sides it is a {{win-win}} situation.\n\n" +
        "Speaker 2\n" +
        "• Her company has become a {{household name}} through sheer hard work and determination.\n" +
        "• She takes a {{hands-on}} approach to management and likes to {{keep track}} of every department.\n" +
        "• The problem is in {{domestic}} sales: the supervisor knows all the {{tricks of the trade}} but his department is barely breaking even.\n" +
        "• The {{bottom line}} is that the business needs to be profitable — otherwise she will have to make {{cutbacks}}.",
      script: track34Script,
      tip: "Idiom trong bài nghe thường được diễn giải lại ở câu hỏi — hãy nghe ý chứ đừng chỉ bám vào từ.",
    },
    {
      kind: "reveal_pairs",
      title: "Business idioms",
      instructions: "Tap each idiom to reveal what it means.",
      pairs: [
        { prompt: "a golden opportunity", reveal: "an excellent chance that should not be missed" },
        { prompt: "make a name for yourself", reveal: "become well known and respected for what you do" },
        { prompt: "a win-win situation", reveal: "a situation in which both sides benefit" },
        { prompt: "a household name", reveal: "a brand or person everybody knows" },
        { prompt: "a hands-on approach", reveal: "getting directly involved in the work yourself" },
        { prompt: "the tricks of the trade", reveal: "the clever methods known by experienced people in a job" },
        { prompt: "the bottom line", reveal: "the most important fact; the final profit or loss" },
        { prompt: "a spanner in the works", reveal: "something that spoils a plan" },
        { prompt: "in the red", reveal: "owing money to the bank" },
        { prompt: "sell like hotcakes", reveal: "sell very quickly and in large numbers" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Business collocations",
      instructions: "Choose the correct alternative. The words in bold will help you.",
      items: [
        { before: "We need guidelines for anyone wishing to", after: "an employment contract.", options: ["draw up", "draw over"], answer: "draw up" },
        { before: "When times are tough, employers do not", after: "as many new staff.", options: ["take on", "take up"], answer: "take on" },
        { before: "We decided to", after: "an office near the airport.", options: ["set up", "set down"], answer: "set up" },
        { before: "New employees may be tempted to", after: "too much responsibility at first.", options: ["take on", "take in"], answer: "take on" },
        { before: "Each of our managers is", after: "around 20 staff.", options: ["in charge of", "in charge for"], answer: "in charge of" },
        { before: "Starting up our own company was a risk, but it has really", after: "for us.", options: ["paid off", "paid up"], answer: "paid off" },
        { before: "It's important to", after: "how much money your department is spending.", options: ["keep track of", "keep track for"], answer: "keep track of" },
        { before: "Setting up our own website allowed us to", after: "the overseas market.", options: ["break into", "break through"], answer: "break into" },
      ],
    },
    {
      kind: "type_fill",
      title: "Verb + noun in the office",
      instructions: "Type the verb that goes with the noun in each sentence.",
      items: [
        { prompt: "Lawyers will ___ the contract before both parties sign it. (agree the terms of)", answer: "negotiate" },
        { prompt: "The board will ___ a meeting on Friday morning. (organise and have)", answer: "hold" },
        { prompt: "Both sides finally managed to ___ an agreement. (arrive at)", answer: "reach" },
        { prompt: "The company plans to ___ 50 new staff this year. (employ)", answer: "recruit" },
        { prompt: "If you ___ the deadline, the client will not be happy. (fail to meet)", answer: "miss" },
        { prompt: "The deputy director will ___ the meeting in her absence. (lead)", answer: "chair" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Employment vocabulary — accuracy",
      instructions: "Choose the correct alternative to improve the accuracy of this Writing Task 2 extract.",
      items: [
        { before: "A common belief is that", after: "alone is not sufficient to make staff happy.", options: ["money", "a pay"], answer: "money" },
        { before: "Companies need to offer them good", after: "conditions and benefits.", options: ["working", "job"], answer: "working" },
        { before: "It helps if people choose an", after: "that they enjoy and find fulfilling.", options: ["occupation", "employment"], answer: "occupation" },
        { before: "Retaining", after: "means companies can save money on recruiting and training.", options: ["an employee", "a staff"], answer: "an employee" },
        { before: "A worker who feels well looked after by their", after: "is more likely to stay.", options: ["employer", "employee"], answer: "employer" },
        { before: "Long-term employees are more likely to be promoted to a", after: "position within the company.", options: ["managerial", "managing"], answer: "managerial" },
      ],
    },
    {
      kind: "type_fill",
      title: "cost, income or budget?",
      instructions: "Complete each sentence with cost, income or budget. The words in bold collocate with only one of them.",
      items: [
        { prompt: "We increased our profits through a combination of ___-cutting and price increases.", answer: "cost" },
        { prompt: "I try to stay within my ___, but then I see something I really want to buy!", answer: "budget" },
        { prompt: "Low-___ families must find it difficult to manage when prices rise rapidly.", answer: "income" },
        { prompt: "You may need to take on an extra job to supplement your ___ and help pay off your debts.", answer: "income" },
        { prompt: "Our department has an annual ___ of $100,000 to cover travel expenses.", answer: "budget" },
        { prompt: "The recent rise in interest rates will increase the ___ of living.", answer: "cost" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — lottery winners and bankruptcy",
      passageTitle: "Winning big, losing big",
      passage:
        "In this tough economy, the allure of purchasing lottery tickets seems like a pretty enticing way to erase financial problems. But new research from Vanderbilt Law School found that people who won between $50,000 and $150,000 only postponed bankruptcy. The researchers found that mid-level lottery winners did not in fact pay off their debt or increase equity in new or existing assets. And, though these mid-level lottery winners were less likely than small winners (those who won less than $10,000) to become bankrupt immediately after winning, they were 50 per cent more likely to do so three to five years after winning their prize. 'Our results are consistent with some winners using their prize to take additional risks or buy luxury goods,' said a researcher. 'Others simply lack the knowledge to handle large amounts of money wisely.'\n\n" +
        "The researchers used data from Florida's Fantasy 5 lottery game from April 1993 through November 2002. They examined all winners who won more than $600. This added up to almost 35,000 individuals. In all, almost 2,000 Fantasy 5 winners were linked to a bankruptcy in the five years after winning. The fact that they filed for bankruptcy is significant for several reasons. 'Filing for bankruptcy is arguably the most extreme signal of financial distress,' said the researcher. 'Not only is it bad for creditors, but it also seriously harms a filer's credit rating, affecting the availability and cost of future loans.'",
      questions: [
        {
          text: "Mid-level lottery winners used their prize money to clear their debts.",
          answer: "False",
          justification: "The researchers found that mid-level winners did not in fact pay off their debt.",
        },
        {
          text: "Mid-level winners were more likely than small winners to go bankrupt immediately after winning.",
          answer: "False",
          justification: "They were less likely than small winners to become bankrupt immediately after winning.",
        },
        {
          text: "Some winners spent their prize money on luxury goods.",
          answer: "True",
          justification: "Results are consistent with some winners using their prize to take additional risks or buy luxury goods.",
        },
        {
          text: "The researchers studied lottery data covering a period of about ten years.",
          answer: "True",
          justification: "They used data from April 1993 through November 2002.",
        },
        {
          text: "Most of the winners studied had never been in debt before winning.",
          answer: "Not given",
          justification: "The passage gives no information about the winners' financial history before winning.",
        },
        {
          text: "Filing for bankruptcy makes future loans harder and more expensive to obtain.",
          answer: "True",
          justification: "It seriously harms a filer's credit rating, affecting the availability and cost of future loans.",
        },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Test practice — Reading",
      passageTitle: "Companies and the customers who hate them",
      passage:
        "One of the most influential propositions in marketing is that customer satisfaction means loyalty and loyalty means profits. Why, then, do so many companies infuriate their customers with contracts, fees and fine print, penalising them for their business? Because, unfortunately, companies have found that confused and ill-informed customers, who often end up making poor purchasing decisions, can be highly profitable indeed.\n\n" +
        "Some companies consciously and cynically exploit their customers' confusion in this way. However, in conversations with dozens of executives in various industries we found that many firms have unwittingly fallen into this trap. Most of the companies in these industries started out with product and pricing strategies designed to provide value to a variety of customer segments. Yet today, many find that their transparent, customer-centred strategies for delivering value have evolved into confusing company-centred strategies for extracting it. Although this approach may work for a while, businesses that prey on customers are always vulnerable to possible hostility: at any time, customers may retaliate with anger, lawsuits and defection.\n\n" +
        "Companies profit from customers' confusion by several means. The first stems from a legitimate attempt to create value by giving customers a broad set of options. All else being equal, a hotel that has three types of room at three different prices can serve a wider customer base than a hotel with just one type of room at one price. However, customers benefit from such diversity only when they are guided towards the option that best suits their needs, and a company is less likely to help customers make good choices if it knows that it can generate more profits when they make poor ones. A wide range of offers can confuse customers with a lack of transparency: hotels, for example, often don't reveal information about discounts and, along with car hire companies, fail to inform customers about possible upgrades.\n\n" +
        "Companies can also profit from customers' bad decisions by over-relying on penalties and fees. Such charges may have been conceived as a way to deter undesirable customer behaviour and offset the costs that businesses incur as a result of that behaviour. Penalties for problems such as bouncing a cheque, for example, were originally designed to discourage banking customers from spending more money than they had. But many firms have discovered just how profitable penalties can be; as a result, they have an incentive to encourage their customers to incur them. Many credit card issuers, for example, choose not to deny a transaction that would put the cardholder over his or her credit limit; it is more profitable to let the customer overspend and then impose penalties.\n\n" +
        "These strategies are common across industries from hotels to video stores and car rentals. Health club companies also have a long history of luring customers with attractive short-term offers, assaulting them with aggressive sales pitches, and then binding them with long-term contracts. That is because some of their most profitable customers have been those who were enticed to sign up for a long-term membership but then rarely visited the club. Indeed, many companies, knowing the typical health club customer will underuse the facility, intentionally sell many more memberships than they have floor space to accommodate.\n\n" +
        "Some companies are challenging the industry's bad behaviour. In fact one company, Life Time Fitness, has become one of the largest fitness chains in the US by eschewing contracts altogether: membership can be cancelled at any time with no penalty. Other smaller companies are experimenting with less antagonistic ways to retain customers, such as reward points for customers who work out regularly.",
      questions: [
        {
          text: "Companies have discovered that badly informed customers can be very profitable.",
          answer: "True",
          justification: "Confused and ill-informed customers who make poor purchasing decisions can be highly profitable indeed.",
        },
        {
          text: "All of the companies interviewed deliberately set out to confuse their customers.",
          answer: "False",
          justification: "Many firms have unwittingly fallen into this trap.",
        },
        {
          text: "Offering a range of prices and products can genuinely benefit customers.",
          answer: "True",
          justification: "A hotel with three types of room at three prices can serve a wider customer base — but only when customers are guided to the right option.",
        },
        {
          text: "Penalty charges such as fees for bouncing a cheque were originally intended to make a profit.",
          answer: "False",
          justification: "They were conceived to deter undesirable behaviour and offset costs; only later did firms discover how profitable they could be.",
        },
        {
          text: "Some credit card companies allow customers to exceed their credit limit so that penalties can be charged.",
          answer: "True",
          justification: "Many issuers choose not to deny a transaction that would put the cardholder over the limit because it is more profitable to impose penalties.",
        },
        {
          text: "Health clubs sell more memberships than they have space for because they know many members will rarely attend.",
          answer: "True",
          justification: "Knowing the typical customer will underuse the facility, they intentionally sell more memberships than they have floor space for.",
        },
        {
          text: "Life Time Fitness charges a small fee to members who cancel their membership early.",
          answer: "False",
          justification: "Membership can be cancelled at any time with no penalty.",
        },
        {
          text: "Reward points have been shown to increase health club profits by 20 per cent.",
          answer: "Not given",
          justification: "The passage mentions reward points but gives no figures for their effect on profits.",
        },
      ],
    },
  ],
};

const unit18Vocab: VocabWord[] = [
  {
    term: "petty crime",
    ipa: "/ˈpeti kraɪm/",
    pos: "phrase",
    usageNote: "chỉ tội vặt, mức độ nhẹ như ăn cắp vặt, phá hoại nhỏ",
    en: "crime that is not very serious, such as small thefts",
    vi: "tội vặt, tội nhẹ",
    synonyms: ["minor offence"],
    antonyms: ["serious crime"],
    examples: [
      { en: "Children might start with petty crimes but this can escalate to more serious crimes.", vi: "Trẻ em có thể bắt đầu từ tội vặt nhưng điều này có thể leo thang thành tội nghiêm trọng hơn." },
      { en: "Vandals are generally seen as petty criminals.", vi: "Những kẻ phá hoại thường bị xem là tội phạm vặt." },
    ],
    ieltsTip: "Error warning: nói \"petty crime\" (hành vi) và \"petty criminal\" (người) — đừng dùng lẫn lộn.",
    summary: "petty crime = tội vặt, không nghiêm trọng.",
  },
  {
    term: "juvenile crime",
    ipa: "/ˈdʒuːvənaɪl kraɪm/",
    pos: "phrase",
    usageNote: "thuật ngữ pháp lý chỉ tội phạm do người chưa thành niên gây ra",
    en: "crime committed by young people below the legal adult age",
    vi: "tội phạm vị thành niên",
    synonyms: ["youth crime"],
    antonyms: [],
    examples: [
      { en: "I think that there's also been an increase in juvenile crime.", vi: "Tôi cho rằng tội phạm vị thành niên cũng đã gia tăng." },
      { en: "If young people become involved in juvenile crime, they are more likely to have a criminal record later.", vi: "Nếu người trẻ dính vào tội phạm vị thành niên, sau này họ dễ có tiền án hơn." },
    ],
    ieltsTip: "Error warning: dùng \"juvenile crime\", KHÔNG nói \"young crime\".",
    summary: "juvenile crime = tội phạm do người chưa thành niên gây ra.",
  },
  {
    term: "the crime rate",
    ipa: "/ðə ˈkraɪm reɪt/",
    pos: "phrase",
    usageNote: "chỉ tỷ lệ tội phạm trong một khu vực hoặc thời kỳ",
    en: "the number of crimes committed in a place over a period of time",
    vi: "tỷ lệ tội phạm",
    synonyms: ["crime levels"],
    antonyms: [],
    examples: [
      { en: "The crime rate has actually decreased in some parts of New York in recent years.", vi: "Tỷ lệ tội phạm thực ra đã giảm ở một số khu vực của New York trong những năm gần đây." },
      { en: "In the area where I live, the crime rate has increased significantly.", vi: "Ở khu vực tôi sống, tỷ lệ tội phạm đã tăng đáng kể." },
    ],
    ieltsTip: "Error warning: nói \"the crime rate\", KHÔNG nói \"the criminal rate\".",
    summary: "the crime rate = tỷ lệ tội phạm.",
  },
  {
    term: "a criminal record",
    ipa: "/ə ˈkrɪmɪnl ˈrekɔːd/",
    pos: "phrase",
    usageNote: "chỉ hồ sơ ghi lại các tội đã bị kết án của một người",
    en: "an official record of the crimes a person has been convicted of",
    vi: "tiền án, lý lịch tư pháp có tội",
    synonyms: ["a police record"],
    antonyms: ["a clean record"],
    examples: [
      { en: "If you get a criminal record as a child, it can affect your whole life.", vi: "Nếu có tiền án từ nhỏ, điều đó có thể ảnh hưởng cả cuộc đời bạn." },
      { en: "Employers often ask whether applicants have a criminal record.", vi: "Nhà tuyển dụng thường hỏi ứng viên có tiền án hay không." },
    ],
    ieltsTip: "Nhóm collocation với \"criminal\": criminal record / act / offence / investigation / activity.",
    summary: "a criminal record = hồ sơ tiền án của một người.",
  },
  {
    term: "a hardened criminal",
    ipa: "/ə ˈhɑːdnd ˈkrɪmɪnl/",
    pos: "phrase",
    usageNote: "chỉ tội phạm chuyên nghiệp, phạm tội nhiều lần và không hối cải",
    en: "someone who has committed many crimes and shows no regret",
    vi: "tội phạm chai lì, phạm tội nhiều lần",
    synonyms: ["a career criminal"],
    antonyms: ["a first-time offender"],
    examples: [
      { en: "He was a hardened criminal with a long list of previous convictions.", vi: "Hắn là một tội phạm chai lì với danh sách dài các tiền án." },
      { en: "Young offenders should not be locked up with hardened criminals.", vi: "Người phạm tội vị thành niên không nên bị giam cùng những tội phạm chai lì." },
    ],
    ieltsTip: "Các tính từ đi với \"criminal\": convicted / petty / hardened / armed criminal.",
    summary: "a hardened criminal = tội phạm chai lì, tái phạm nhiều lần.",
  },
  {
    term: "organised crime",
    ipa: "/ˈɔːɡənaɪzd kraɪm/",
    pos: "phrase",
    usageNote: "chỉ hoạt động tội phạm có tổ chức, do băng nhóm điều hành",
    en: "criminal activity that is planned and controlled by powerful groups",
    vi: "tội phạm có tổ chức",
    synonyms: ["gang crime"],
    antonyms: ["opportunistic crime"],
    examples: [
      { en: "The sale of drugs is organised by armed criminal gangs.", vi: "Việc buôn bán ma tuý do các băng nhóm tội phạm có vũ trang tổ chức." },
      { en: "Police have set up a special unit to tackle organised crime.", vi: "Cảnh sát đã lập một đơn vị đặc biệt để đối phó với tội phạm có tổ chức." },
    ],
    ieltsTip: "Nhóm collocation với \"crime\": petty / juvenile / organised / gun / unsolved crime.",
    summary: "organised crime = tội phạm có tổ chức do băng nhóm điều hành.",
  },
  {
    term: "commit a crime",
    ipa: "/kəˈmɪt ə kraɪm/",
    pos: "phrase",
    usageNote: "động từ chuẩn đi với \"a crime\" là commit, không phải \"do\" hay \"make\"",
    en: "to do something illegal",
    vi: "phạm tội, gây án",
    synonyms: ["break the law"],
    antonyms: ["obey the law"],
    examples: [
      { en: "If you commit a crime, you should be punished.", vi: "Nếu bạn phạm tội, bạn phải bị trừng phạt." },
      { en: "The reasons why people commit crime are countless.", vi: "Có vô số lý do khiến người ta phạm tội." },
    ],
    ieltsTip: "Sai lầm phổ biến: \"do a crime\". Luôn dùng \"commit a crime / an offence\".",
    summary: "commit a crime = phạm tội, thực hiện hành vi phạm pháp.",
  },
  {
    term: "arrest",
    ipa: "/əˈrest/",
    pos: "verb",
    usageNote: "đi với giới từ \"for\" khi nêu lý do: be arrested for something",
    en: "(of the police) to take someone away because they may have committed a crime",
    vi: "bắt giữ",
    synonyms: ["detain"],
    antonyms: ["release"],
    examples: [
      { en: "Today, three times as many people are likely to be arrested for shoplifting than in 1970.", vi: "Ngày nay, số người bị bắt vì trộm đồ trong siêu thị nhiều gấp ba lần so với năm 1970." },
      { en: "Police arrested a suspect for the robbery.", vi: "Cảnh sát đã bắt giữ một nghi phạm vì vụ cướp." },
    ],
    ieltsTip: "Cấu trúc: arrest somebody FOR something — nhớ kỹ giới từ.",
    summary: "arrest = bắt giữ (thường dùng: be arrested for + tội danh).",
  },
  {
    term: "charge",
    ipa: "/tʃɑːdʒ/",
    pos: "verb",
    usageNote: "trong luật pháp nghĩa là buộc tội chính thức; đi với giới từ \"with\"",
    en: "to officially accuse someone of a crime",
    vi: "buộc tội, truy tố",
    synonyms: ["accuse"],
    antonyms: ["acquit"],
    examples: [
      { en: "If a person is charged with a crime they did not commit, it's my job to defend them.", vi: "Nếu một người bị buộc tội mà họ không gây ra, việc của tôi là bào chữa cho họ." },
      { en: "The researchers found 406 pairs of offenders who had been charged with assault.", vi: "Các nhà nghiên cứu tìm được 406 cặp tội phạm bị buộc tội hành hung." },
    ],
    ieltsTip: "So sánh giới từ: charge somebody WITH / accuse somebody OF / arrest somebody FOR.",
    summary: "charge (somebody) with = buộc tội ai đó về một tội danh.",
  },
  {
    term: "convict",
    ipa: "/kənˈvɪkt/",
    pos: "verb",
    usageNote: "nghĩa toà tuyên ai đó có tội; đi với giới từ \"of\" hoặc \"for\"",
    en: "to decide officially in a court that someone is guilty of a crime",
    vi: "kết án, tuyên có tội",
    synonyms: ["find guilty"],
    antonyms: ["acquit"],
    examples: [
      { en: "The researchers found 96 pairs of convicted burglars.", vi: "Các nhà nghiên cứu tìm được 96 cặp trộm đã bị kết án." },
      { en: "He was convicted of fraud last year.", vi: "Anh ta bị kết tội gian lận vào năm ngoái." },
    ],
    ieltsTip: "Chú ý trọng âm: động từ /kənˈvɪkt/, danh từ (tù nhân) /ˈkɒnvɪkt/.",
    summary: "convict = toà tuyên ai đó có tội.",
  },
  {
    term: "a prison sentence",
    ipa: "/ə ˈprɪzn ˈsentəns/",
    pos: "phrase",
    usageNote: "chỉ án tù mà toà tuyên cho người phạm tội",
    en: "a punishment of a period of time spent in prison",
    vi: "án tù",
    synonyms: ["a custodial sentence"],
    antonyms: ["a non-custodial penalty"],
    examples: [
      { en: "A recent study looked into the effect of prison sentences on criminals.", vi: "Một nghiên cứu gần đây xem xét tác động của các án tù đối với tội phạm." },
      { en: "He received a life sentence for the murder.", vi: "Anh ta nhận án chung thân vì tội giết người." },
    ],
    ieltsTip: "Nhóm collocation về hình phạt: a prison sentence / a life sentence / a heavy fine / community service.",
    summary: "a prison sentence = án tù do toà tuyên.",
  },
  {
    term: "community service",
    ipa: "/kəˈmjuːnəti ˈsɜːvɪs/",
    pos: "phrase",
    usageNote: "chỉ hình phạt lao động công ích thay cho việc ngồi tù",
    en: "unpaid work that an offender does to help the community instead of going to prison",
    vi: "lao động công ích (thay án tù)",
    synonyms: ["a non-custodial penalty"],
    antonyms: ["imprisonment"],
    examples: [
      { en: "The study suggests that community service may be just as suitable a form of punishment for minor offences.", vi: "Nghiên cứu cho thấy lao động công ích có thể là hình phạt phù hợp không kém cho các tội nhẹ." },
      { en: "He was sentenced to 200 hours of community service.", vi: "Anh ta bị tuyên phạt 200 giờ lao động công ích." },
    ],
    ieltsTip: "Rất hữu ích cho các đề Writing Task 2 về việc nên phạt tù hay phạt cải tạo.",
    summary: "community service = lao động công ích thay cho án tù.",
  },
  {
    term: "capital punishment",
    ipa: "/ˈkæpɪtl ˈpʌnɪʃmənt/",
    pos: "phrase",
    usageNote: "cách nói trang trọng cho án tử hình",
    en: "punishment by death, ordered by a court",
    vi: "án tử hình",
    synonyms: ["the death penalty"],
    antonyms: [],
    examples: [
      { en: "I'm totally opposed to capital punishment.", vi: "Tôi hoàn toàn phản đối án tử hình." },
      { en: "Capital punishment has been abolished in most European countries.", vi: "Án tử hình đã bị bãi bỏ ở hầu hết các nước châu Âu." },
    ],
    ieltsTip: "Đây là chủ đề Task 2 kinh điển — hãy chuẩn bị sẵn cả lập luận ủng hộ lẫn phản đối.",
    summary: "capital punishment = án tử hình.",
  },
  {
    term: "deter",
    ipa: "/dɪˈtɜː(r)/",
    pos: "verb",
    usageNote: "nghĩa khiến ai đó sợ mà không dám làm điều gì",
    en: "to make someone decide not to do something, especially by threat of punishment",
    vi: "ngăn chặn, răn đe",
    synonyms: ["discourage"],
    antonyms: ["encourage"],
    examples: [
      { en: "Prison either fails to deter criminals or actually increases criminal activity.", vi: "Nhà tù hoặc không răn đe được tội phạm, hoặc thực ra còn làm gia tăng hoạt động phạm tội." },
      { en: "Penalties were designed to deter undesirable behaviour.", vi: "Các hình phạt được thiết kế để răn đe những hành vi không mong muốn." },
    ],
    ieltsTip: "Danh từ là \"a deterrent\" — \"a deterrent to crime\" là cụm rất mạnh cho Writing Task 2.",
    summary: "deter = răn đe, khiến ai không dám làm điều gì.",
  },
  {
    term: "re-offend",
    ipa: "/ˌriː əˈfend/",
    pos: "verb",
    usageNote: "chỉ việc tái phạm sau khi đã bị kết án hoặc mãn hạn tù",
    en: "to commit another crime after being punished for a previous one",
    vi: "tái phạm",
    synonyms: ["relapse into crime"],
    antonyms: ["reform"],
    examples: [
      { en: "Offenders given a prison sentence were slightly more likely to re-offend.", vi: "Những người bị tuyên án tù có xu hướng tái phạm cao hơn một chút." },
      { en: "Rehabilitation programmes aim to stop prisoners re-offending.", vi: "Các chương trình cải huấn nhằm ngăn tù nhân tái phạm." },
    ],
    ieltsTip: "Danh từ \"re-offending rates\" xuất hiện rất nhiều trong Reading về hệ thống tư pháp.",
    summary: "re-offend = tái phạm sau khi đã bị trừng phạt.",
  },
  {
    term: "a heavy fine",
    ipa: "/ə ˈhevi faɪn/",
    pos: "phrase",
    usageNote: "chỉ khoản tiền phạt lớn; tính từ đi kèm thường là heavy hoặc hefty",
    en: "a large amount of money someone must pay as a punishment",
    vi: "khoản tiền phạt nặng",
    synonyms: ["a hefty fine"],
    antonyms: ["a token fine"],
    examples: [
      { en: "Drivers caught using a phone face a heavy fine.", vi: "Tài xế bị bắt gặp dùng điện thoại sẽ đối mặt với khoản phạt nặng." },
      { en: "The company was given a heavy fine for polluting the river.", vi: "Công ty bị phạt nặng vì làm ô nhiễm dòng sông." },
    ],
    ieltsTip: "Đừng nói \"a big fine\" trong văn viết học thuật — \"a heavy/hefty fine\" tự nhiên hơn.",
    summary: "a heavy fine = khoản tiền phạt lớn.",
  },
  {
    term: "lenient",
    ipa: "/ˈliːniənt/",
    pos: "adjective",
    usageNote: "mô tả hình phạt hoặc cách xử lý nhẹ nhàng hơn mức đáng lẽ phải có",
    en: "not as severe as expected in punishing someone",
    vi: "khoan dung, nhẹ tay",
    synonyms: ["merciful"],
    antonyms: ["severe", "harsh"],
    examples: [
      { en: "Many people felt the sentence was far too lenient.", vi: "Nhiều người cho rằng bản án quá nhẹ." },
      { en: "Some argue that lenient punishments fail to deter offenders.", vi: "Một số người cho rằng hình phạt nhẹ không răn đe được tội phạm." },
    ],
    ieltsTip: "Cặp \"lenient ↔ harsh/severe\" rất hữu ích cho các đề về hình phạt.",
    summary: "lenient = khoan dung, xử phạt nhẹ.",
  },
  {
    term: "atrocious",
    ipa: "/əˈtrəʊʃəs/",
    pos: "adjective",
    usageNote: "mức độ rất mạnh, mô tả điều gây sốc và tàn nhẫn",
    en: "extremely bad, cruel or shocking",
    vi: "tàn bạo, kinh khủng",
    synonyms: ["appalling", "horrifying"],
    antonyms: ["admirable"],
    examples: [
      { en: "The conditions in some prisons are atrocious.", vi: "Điều kiện trong một số nhà tù thật kinh khủng." },
      { en: "It was an atrocious act of violence.", vi: "Đó là một hành động bạo lực tàn bạo." },
    ],
    ieltsTip: "Nhóm đồng nghĩa mạnh: shocking – appalling – atrocious – horrifying. Dùng đúng mức độ để ghi điểm.",
    summary: "atrocious = tàn bạo, cực kỳ tồi tệ.",
  },
  {
    term: "alienated",
    ipa: "/ˈeɪliəneɪtɪd/",
    pos: "adjective",
    usageNote: "mô tả cảm giác bị tách rời, không thuộc về xã hội hay cộng đồng",
    en: "feeling that you do not belong to a group or society",
    vi: "cảm thấy bị xa lánh, lạc lõng",
    synonyms: ["isolated", "excluded"],
    antonyms: ["included"],
    examples: [
      { en: "Children from these broken families often become criminals because they feel alienated from society.", vi: "Trẻ em từ những gia đình đổ vỡ thường trở thành tội phạm vì cảm thấy bị xã hội xa lánh." },
      { en: "Young people who feel alienated are more vulnerable to gangs.", vi: "Người trẻ cảm thấy lạc lõng dễ bị các băng nhóm lôi kéo hơn." },
    ],
    ieltsTip: "Đây là từ \"vàng\" khi phân tích nguyên nhân xã hội của tội phạm trong Writing Task 2.",
    summary: "alienated = cảm thấy bị xa lánh, không thuộc về xã hội.",
  },
  {
    term: "peer pressure",
    ipa: "/ˈpɪə ˌpreʃə(r)/",
    pos: "phrase",
    usageNote: "chỉ áp lực phải làm theo bạn bè cùng lứa để được chấp nhận",
    en: "the influence your friends of the same age have on your behaviour",
    vi: "áp lực từ bạn bè đồng trang lứa",
    synonyms: ["social pressure"],
    antonyms: [],
    examples: [
      { en: "Partly I think this is through peer pressure — young people are very much influenced by what their friends think of them.", vi: "Tôi cho rằng một phần là do áp lực bạn bè — người trẻ bị ảnh hưởng rất nhiều bởi cách bạn bè nhìn nhận họ." },
      { en: "Peer pressure can lead teenagers into petty crime.", vi: "Áp lực bạn bè có thể đẩy thanh thiếu niên vào những tội vặt." },
    ],
    ieltsTip: "Là nguyên nhân được nhắc đến nhiều nhất khi bàn về hành vi của giới trẻ — nhớ dùng trong Speaking Part 3.",
    summary: "peer pressure = áp lực làm theo bạn bè đồng trang lứa.",
  },
];

const track35Script = `Speaker A: That's a very good question. I think every country has a different idea of how old a child is when they can be held responsible for their actions. If they're really young, in their pre-teens, then I would say the parents are responsible. Very young children only get involved in crime if they are left alone without any supervision. Nowadays, a lot of families are too busy to worry about these things and I think family values are lost in the process. The children might only start with petty crimes but, if they fall in with the wrong crowd and become a delinquent, then this can escalate to more serious crimes like robbery or car theft. If you get a criminal record as a child, it can affect your whole life.
Speaker B: I think each older generation looks at the younger generation and criticises it for being badly behaved. But I do think it's true that, nowadays, people generally have less and less respect for the rules of society. You only need to look around the streets to see all the graffiti and vandalism. I think that there's also been an increase in juvenile crime. Partly I think this is through peer pressure – young people are very much influenced by what their friends think of them, and it's become cool to act like a gangster. I think the main problem, though, is the media. It cultivates that image and it becomes normal for children to see violent behaviour.
Speaker C: I go out on my own in the day quite often but I would very rarely do it at night. In the area where I live, the crime rate has increased significantly in the past few years. There seems to be a lot more criminal activity these days so I think it's a lot safer to go out in a group. There's no knife crime or anything like that. I'm not afraid of getting stabbed, it's more muggings, you know, when people grab your bag, stuff like that. I think it's because of the rising unemployment. People just don't have enough money. I suppose that's why some of them turn to theft.`;

const track36Script = `I was recently in charge of a government-funded study looking into the impact that prison sentences have on criminals. For our study, we found 96 pairs of convicted burglars and 406 pairs of offenders who had been charged with assault. One member of each pair had been given a prison sentence for their crimes, while the other had received some form of non-custodial penalty. The offenders involved were exactly matched according to the type of offence they had committed, their prior prison experience and the number of prior appearances in court they had had.
The findings of our study were interesting. Our research team found that offenders who were given a prison sentence were slightly more likely to re-offend than those who did not go to jail. In fact, these results are consistent with a growing body of evidence suggesting that prison either does nothing to deter offenders or actually increases the risk of re-offending. In other words, prisons may help to increase criminal activity.
So, what should we conclude from this? Well, it doesn't mean we should abandon our prisons altogether and set all the prisoners free. Far from it. A prison sentence can be justified on other grounds. For example, the majority of us would agree that criminals, especially dangerous ones, should be punished. But what this study does seem to indicate is that sending people convicted of relatively minor offences to prison is no more effective in changing their behaviour than sentencing them to some form of community service.`;

const UNIT_18_LAW_ENFORCEMENT: CambridgeUnit = {
  unit: 18,
  slug: "law-enforcement",
  title: "Law enforcement",
  topics: "Crime, punishment",
  testPractice: "Writing Task 2",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit18Vocab,
    },
    {
      kind: "listening_cloze",
      title: "Three speakers on crime",
      instructions: "Listen to three speakers talking about crime and complete the notes on the causes they mention.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-35.mp3",
      template:
        "Speaker A — who is responsible when young people commit crime?\n" +
        "• crimes mentioned: {{petty crimes}}, robbery, car theft\n" +
        "• causes: children left alone without supervision; loss of {{family values}}; falling in with the wrong crowd\n\n" +
        "Speaker B — are young people today well behaved?\n" +
        "• crimes mentioned: graffiti, vandalism, {{juvenile crime}}\n" +
        "• causes: loss of {{respect}} for the rules of society; {{peer}} pressure; too much violence in {{the media}}\n\n" +
        "Speaker C — going out alone or with friends?\n" +
        "• crimes mentioned: {{muggings}}, theft\n" +
        "• causes: increasing {{unemployment}} levels; economic reasons",
      script: track35Script,
      tip: "Trong Listening, nguyên nhân thường được nêu bằng \"I think it's because of...\", \"partly this is through...\" — hãy chú ý các tín hiệu này.",
    },
    {
      kind: "sort",
      title: "crime or criminal?",
      instructions: "Tap a word, then choose whether it goes with 'crime' (the act) or 'criminal' (the person).",
      buckets: ["+ crime", "+ criminal"],
      items: [
        { term: "petty", bucket: 0 },
        { term: "juvenile", bucket: 0 },
        { term: "organised", bucket: 0 },
        { term: "gun", bucket: 0 },
        { term: "unsolved", bucket: 0 },
        { term: "statistics", bucket: 0 },
        { term: "prevention", bucket: 0 },
        { term: "rate", bucket: 0 },
        { term: "convicted", bucket: 1 },
        { term: "hardened", bucket: 1 },
        { term: "armed", bucket: 1 },
        { term: "record", bucket: 1 },
        { term: "investigation", bucket: 1 },
        { term: "offence", bucket: 1 },
      ],
    },
    {
      kind: "type_fill",
      title: "crime or criminal?",
      instructions: "Complete each sentence with crime or criminal(s). The words in bold will help you.",
      items: [
        { prompt: "Vandals are generally seen as petty ___.", answer: "criminals" },
        { prompt: "The ___ rate has actually decreased in some parts of New York in recent years.", answer: "crime" },
        { prompt: "He was a hardened ___ with a long list of previous convictions.", answer: "criminal" },
        { prompt: "Prosecutors have launched a ___ investigation into the firm's accounting practices.", answer: "criminal" },
        { prompt: "Police and federal officials are working together to target gun ___.", answer: "crime" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Punishment collocations",
      instructions: "Tap each word to reveal the noun it collocates with.",
      pairs: [
        { prompt: "capital", reveal: "capital punishment" },
        { prompt: "community", reveal: "community service" },
        { prompt: "a heavy", reveal: "a heavy fine" },
        { prompt: "a prison", reveal: "a prison sentence / term" },
        { prompt: "a life", reveal: "a life sentence" },
        { prompt: "a treatment", reveal: "a treatment programme" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Prepositions in the courtroom",
      instructions: "Choose the correct preposition or phrase to complete each sentence.",
      items: [
        { before: "Children should be taught to accept the consequences", after: "their actions.", options: ["of", "for", "with"], answer: "of" },
        { before: "Three times as many people are likely to be arrested", after: "shoplifting than in 1970.", options: ["for", "of", "with"], answer: "for" },
        { before: "If you are a victim", after: "a violent crime, it can take years to get over it.", options: ["of", "for", "to"], answer: "of" },
        { before: "If a person is charged", after: "a crime they did not commit, a lawyer will defend them.", options: ["with", "of", "for"], answer: "with" },
        { before: "The court convicted the defendant", after: "fraud.", options: ["of", "with", "to"], answer: "of" },
        { before: "A local drifter was sentenced", after: "life without parole for the murder.", options: ["to", "with", "for"], answer: "to" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Do prison sentences work?",
      instructions: "Listen to someone talking about a study on prisons and complete the summary.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-36.mp3",
      template:
        "A recent study looked into the effect of {{prison sentences}} on criminals. The researchers found 96 pairs of convicted {{burglars}}, and 406 pairs who had been {{charged with}} assault. One member of each pair had been sent to prison while the other had been given some type of non-custodial {{penalty}}. All of the criminals had committed the same kind of {{offence}} and had had similar previous experiences of prison and had appeared {{in court}} the same number of times.\n\n" +
        "Criminals who were sent to prison were slightly more likely to {{re-offend}} than those who didn't go to {{jail}}. The results support other studies that have shown that prison either fails to {{deter}} criminals or actually increases criminal activity.\n\n" +
        "There is still a place for prisons, and most people think dangerous criminals need to be {{punished}} in some way. But the study suggests that {{community service}} may be just as suitable a form of punishment for minor offences.",
      script: track36Script,
      tip: "Hãy thử đoán trước đáp án bằng ngữ pháp và kiến thức nền trước khi nghe — đây là kỹ năng cốt lõi để làm tốt phần điền từ.",
    },
    {
      kind: "reveal_pairs",
      title: "Agreeing and disagreeing",
      instructions: "Tap each opinion phrase to see whether it shows support or opposition.",
      pairs: [
        { prompt: "I'm all for...", reveal: "support — strongly in favour" },
        { prompt: "I approve of...", reveal: "support" },
        { prompt: "I can see a need for...", reveal: "support — cautious agreement" },
        { prompt: "I'm totally opposed to...", reveal: "opposition — very strong" },
        { prompt: "I can't condone...", reveal: "opposition — you cannot accept it" },
        { prompt: "I object to...", reveal: "opposition" },
        { prompt: "I don't approve of...", reveal: "opposition — milder" },
        { prompt: "I don't agree with...", reveal: "opposition — milder" },
      ],
    },
    {
      kind: "writing_task",
      title: "Test practice — Writing Task 2",
      taskLabel: "Writing Task 2",
      prompt:
        "Each year, the crime rate increases. What are the causes of crime and what could be done to prevent this rise in criminal activity? Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      minWords: 250,
      tip:
        "Lập dàn ý thành hai cột — Causes of crime và Possible solutions — trước khi viết, để lập luận mạch lạc và dễ theo dõi. Ghi lại vài từ vựng của unit này mà bạn muốn dùng (petty crime, deter, re-offend, alienated, community service...). Dành khoảng 40 phút và viết ít nhất 250 từ.",
      modelAnswer:
        "Crime is an issue of increasing concern around the world, and more money than ever before is being spent on the detection and punishment of criminal activity. The reasons why people commit crime are countless, but drugs and alcohol, social problems and poverty play a major role. To solve these problems, governments can either focus on draconian punishments, or improve employment opportunities, invest in good housing projects and tackle drug and alcohol abuse.\n\n" +
        "One of the main causes of criminality is the use, sale and trafficking of narcotics. For example, the sale of drugs is organised by armed criminal gangs who illegally traffick drugs and control their business with extreme violence. Drug-related crime does not end there; drug users often steal to fund their habit, resulting in further acts of petty crime. The social problems connected with crime are said to be the result of single-parent families, absent role models and bad living conditions. The children from these broken families often become criminals because they feel alienated from society. Poverty is also a reason behind crime. When unskilled jobs pay so little and prices are so high, it's easy to see why some turn to crime for an income.\n\n" +
        "Crime can, of course, be dealt with by toughening criminal laws and introducing longer custodial sentences for persistent criminals, but some of the best ways to deal with crime may be to deal with the social causes. Increasing employment opportunities in poorer areas would improve living standards, which would mean access to affordable housing and education. Government funding for drug and alcohol rehabilitation programmes would help reduce dependency on stimulants and the need for the criminal activity that surrounds them.\n\n" +
        "In conclusion, crime is a major issue, but cracking down on offenders with a harsh penal system is not the only way. These problems can be solved through the government providing jobs and funding which should raise living standards and dramatically reduce crime levels.",
    },
  ],
};

const unit19Vocab: VocabWord[] = [
  {
    term: "shoot to fame",
    ipa: "/ʃuːt tə feɪm/",
    pos: "phrase",
    usageNote: "chỉ việc nổi tiếng rất nhanh và bất ngờ",
    en: "to become famous very suddenly",
    vi: "nổi tiếng chớp nhoáng",
    synonyms: ["become famous overnight"],
    antonyms: ["fade into obscurity"],
    examples: [
      { en: "She shot to fame after appearing on a talent show.", vi: "Cô ấy nổi tiếng chớp nhoáng sau khi xuất hiện trong một chương trình tìm kiếm tài năng." },
      { en: "The band shot to fame with their first single.", vi: "Ban nhạc nổi tiếng ngay lập tức với đĩa đơn đầu tay." },
    ],
    ieltsTip: "Cùng nhóm với \"become famous overnight\" — rất hợp khi kể chuyện trong Speaking Part 2.",
    summary: "shoot to fame = trở nên nổi tiếng rất nhanh.",
  },
  {
    term: "media attention",
    ipa: "/ˈmiːdiə əˈtenʃn/",
    pos: "phrase",
    usageNote: "chỉ sự quan tâm, đưa tin của báo chí và truyền hình về một người hay sự kiện",
    en: "interest shown in someone or something by newspapers and television",
    vi: "sự chú ý của truyền thông",
    synonyms: ["press coverage"],
    antonyms: ["privacy"],
    examples: [
      { en: "Those shows just feed this insatiable appetite everyone seems to have for media attention.", vi: "Những chương trình đó chỉ nuôi dưỡng cơn thèm khát sự chú ý của truyền thông mà ai cũng có." },
      { en: "The trial received enormous media attention.", vi: "Phiên toà nhận được sự chú ý rất lớn của truyền thông." },
    ],
    ieltsTip: "Collocation: attract / receive / seek media attention.",
    summary: "media attention = sự chú ý, đưa tin của truyền thông.",
  },
  {
    term: "in the public eye",
    ipa: "/ɪn ðə ˈpʌblɪk aɪ/",
    pos: "phrase",
    usageNote: "chỉ trạng thái được công chúng biết đến và theo dõi thường xuyên",
    en: "well known to many people and often reported on",
    vi: "được công chúng chú ý",
    synonyms: ["in the spotlight"],
    antonyms: ["out of the limelight"],
    examples: [
      { en: "You wouldn't sign up for those shows if you didn't want to be in the public eye.", vi: "Bạn sẽ không đăng ký những chương trình đó nếu không muốn được công chúng chú ý." },
      { en: "Politicians must accept life in the public eye.", vi: "Chính trị gia phải chấp nhận cuộc sống dưới sự chú ý của công chúng." },
    ],
    ieltsTip: "Idiom này rất tự nhiên khi bàn về đời tư của người nổi tiếng trong Speaking Part 3.",
    summary: "in the public eye = được công chúng biết đến và theo dõi.",
  },
  {
    term: "high-profile",
    ipa: "/ˌhaɪ ˈprəʊfaɪl/",
    pos: "adjective",
    usageNote: "mô tả người hoặc sự kiện được nhiều người biết và báo chí quan tâm",
    en: "receiving a lot of attention from the public and the media",
    vi: "nổi bật, được chú ý nhiều",
    synonyms: ["prominent"],
    antonyms: ["low-profile"],
    examples: [
      { en: "It was a high-profile case that dominated the news for weeks.", vi: "Đó là một vụ việc nổi bật chiếm sóng tin tức suốt nhiều tuần." },
      { en: "She took a high-profile role in the campaign.", vi: "Cô ấy đảm nhận một vai trò nổi bật trong chiến dịch." },
    ],
    ieltsTip: "Trái nghĩa \"low-profile\" (kín tiếng) — cặp này rất hữu ích khi so sánh.",
    summary: "high-profile = nổi bật, được truyền thông chú ý nhiều.",
  },
  {
    term: "become famous overnight",
    ipa: "/bɪˈkʌm ˈfeɪməs ˌəʊvəˈnaɪt/",
    pos: "phrase",
    usageNote: "nhấn mạnh việc nổi tiếng chỉ sau một đêm, thường nhờ truyền thông",
    en: "to become well known extremely quickly",
    vi: "nổi tiếng sau một đêm",
    synonyms: ["shoot to fame"],
    antonyms: [],
    examples: [
      { en: "Reality shows turn these ordinary people into instant celebrities — they become famous overnight.", vi: "Các chương trình truyền hình thực tế biến những người bình thường thành người nổi tiếng tức thì — họ nổi tiếng chỉ sau một đêm." },
      { en: "The video went viral and he became famous overnight.", vi: "Đoạn video lan truyền chóng mặt và anh ấy nổi tiếng chỉ sau một đêm." },
    ],
    ieltsTip: "\"Overnight\" ở đây là trạng từ chỉ tốc độ, không phải nghĩa đen là qua đêm.",
    summary: "become famous overnight = nổi tiếng cực nhanh, chỉ sau một đêm.",
  },
  {
    term: "the tabloid press",
    ipa: "/ðə ˈtæblɔɪd pres/",
    pos: "phrase",
    usageNote: "chỉ dòng báo lá cải, khổ nhỏ, thiên về tin giật gân và đời tư người nổi tiếng",
    en: "newspapers with small pages that focus on sensational stories and celebrity gossip",
    vi: "báo lá cải",
    synonyms: ["the popular press"],
    antonyms: ["the broadsheets"],
    examples: [
      { en: "There's a lot of demand for gossip about celebrities these days, especially in the tabloid press.", vi: "Ngày nay nhu cầu về tin đồn người nổi tiếng rất lớn, nhất là trên báo lá cải." },
      { en: "The story was splashed across the tabloid press.", vi: "Câu chuyện được đăng rầm rộ trên các báo lá cải." },
    ],
    ieltsTip: "Đối lập với \"broadsheets\" (báo khổ lớn, nghiêm túc) — nêu cặp này sẽ rất ấn tượng.",
    summary: "the tabloid press = báo lá cải, chuyên tin giật gân.",
  },
  {
    term: "paparazzi",
    ipa: "/ˌpæpəˈrætsi/",
    pos: "noun",
    usageNote: "danh từ số nhiều gốc Ý, chỉ các tay săn ảnh bám theo người nổi tiếng",
    en: "photographers who follow celebrities in order to take pictures of them",
    vi: "thợ săn ảnh (bám theo người nổi tiếng)",
    synonyms: ["press photographers"],
    antonyms: [],
    examples: [
      { en: "The paparazzi can create really dangerous situations just trying to get a photograph.", vi: "Cánh săn ảnh có thể tạo ra những tình huống rất nguy hiểm chỉ để chụp được một tấm hình." },
      { en: "She was chased through the streets by the paparazzi.", vi: "Cô ấy bị cánh săn ảnh rượt theo trên phố." },
    ],
    ieltsTip: "Phân biệt \"paparazzi\" (săn ảnh) với \"serious journalists\" (nhà báo nghiêm túc) — đúng như hội thoại trong bài nghe.",
    summary: "paparazzi = cánh thợ săn ảnh bám theo người nổi tiếng.",
  },
  {
    term: "prominent",
    ipa: "/ˈprɒmɪnənt/",
    pos: "adjective",
    usageNote: "mô tả người quan trọng, có tiếng nói; hoặc điều gì nổi bật, dễ thấy",
    en: "important and well known",
    vi: "nổi bật, có tiếng tăm",
    synonyms: ["leading", "eminent"],
    antonyms: ["obscure"],
    examples: [
      { en: "Sometimes as much prominence is given to a gossip column as to serious news stories.", vi: "Đôi khi mục tin đồn được đặt ở vị trí nổi bật ngang với tin tức nghiêm túc." },
      { en: "She is a prominent figure in local politics.", vi: "Bà ấy là một nhân vật nổi bật trong chính trường địa phương." },
    ],
    ieltsTip: "Danh từ \"prominence\" — \"give prominence to something\" là cụm rất học thuật.",
    summary: "prominent = nổi bật, quan trọng và được biết đến.",
  },
  {
    term: "eminent",
    ipa: "/ˈemɪnənt/",
    pos: "adjective",
    usageNote: "chỉ người rất được kính trọng trong lĩnh vực chuyên môn của họ",
    en: "famous and respected within a particular profession",
    vi: "lỗi lạc, được kính trọng",
    synonyms: ["distinguished"],
    antonyms: ["unknown"],
    examples: [
      { en: "An eminent scientist was invited to open the conference.", vi: "Một nhà khoa học lỗi lạc được mời khai mạc hội nghị." },
      { en: "He is eminent in the field of medical research.", vi: "Ông ấy nổi danh trong lĩnh vực nghiên cứu y học." },
    ],
    ieltsTip: "\"Eminent\" gắn với chuyên môn, còn \"famous\" là nổi tiếng nói chung — đừng dùng lẫn.",
    summary: "eminent = lỗi lạc, được kính trọng trong nghề.",
  },
  {
    term: "infamous",
    ipa: "/ˈɪnfəməs/",
    pos: "adjective",
    usageNote: "nổi tiếng vì điều xấu, mang sắc thái tiêu cực",
    en: "well known for something bad",
    vi: "khét tiếng, tai tiếng",
    synonyms: ["notorious"],
    antonyms: ["renowned"],
    examples: [
      { en: "Ronnie Biggs, the infamous train robber, died in 2001.", vi: "Ronnie Biggs, tên cướp tàu khét tiếng, qua đời năm 2001." },
      { en: "The city is infamous for its traffic.", vi: "Thành phố này khét tiếng vì nạn kẹt xe." },
    ],
    ieltsTip: "\"Infamous\" KHÔNG phải phủ định của \"famous\" — nó nghĩa là nổi tiếng vì điều xấu.",
    summary: "infamous = nổi tiếng vì điều tồi tệ, khét tiếng.",
  },
  {
    term: "a gossip column",
    ipa: "/ə ˈɡɒsɪp ˈkɒləm/",
    pos: "phrase",
    usageNote: "chỉ chuyên mục đưa tin đời tư người nổi tiếng trên báo",
    en: "a regular newspaper article about the private lives of famous people",
    vi: "chuyên mục tin đồn (về người nổi tiếng)",
    synonyms: ["celebrity news"],
    antonyms: ["hard news"],
    examples: [
      { en: "They're only doing it to fill the gossip columns.", vi: "Họ làm vậy chỉ để lấp đầy các chuyên mục tin đồn." },
      { en: "Her wedding was reported in every gossip column.", vi: "Đám cưới của cô ấy được đăng trên mọi chuyên mục tin đồn." },
    ],
    ieltsTip: "Nhóm từ về báo in: article – column – headline – publication – online edition.",
    summary: "a gossip column = chuyên mục tin đồn về người nổi tiếng.",
  },
  {
    term: "rolling news",
    ipa: "/ˈrəʊlɪŋ njuːz/",
    pos: "phrase",
    usageNote: "chỉ kênh/dịch vụ phát tin tức liên tục 24 giờ",
    en: "news that is broadcast continuously, 24 hours a day",
    vi: "tin tức phát liên tục 24/7",
    synonyms: ["24-hour news"],
    antonyms: ["scheduled bulletins"],
    examples: [
      { en: "Then there's the rolling news we have on the TV day and night.", vi: "Rồi còn có tin tức phát liên tục trên TV cả ngày lẫn đêm." },
      { en: "Rolling news channels repeat the same stories for hours.", vi: "Các kênh tin tức liên tục lặp lại cùng những tin đó hàng giờ liền." },
    ],
    ieltsTip: "Hữu ích cho câu hỏi Speaking Part 3 \"Is there too much news these days?\".",
    summary: "rolling news = tin tức phát liên tục suốt ngày đêm.",
  },
  {
    term: "a live stream",
    ipa: "/ə laɪv striːm/",
    pos: "phrase",
    usageNote: "chỉ nội dung phát trực tiếp qua internet",
    en: "a broadcast sent over the internet at the same time as it happens",
    vi: "buổi phát trực tiếp (trên internet)",
    synonyms: ["live broadcast"],
    antonyms: ["a recording"],
    examples: [
      { en: "Many TV companies offer a live stream so you can watch the news on your computer or phone.", vi: "Nhiều đài truyền hình cung cấp bản phát trực tiếp để bạn xem tin tức trên máy tính hoặc điện thoại." },
      { en: "The concert was available as a live stream.", vi: "Buổi hoà nhạc được phát trực tiếp trên mạng." },
    ],
    ieltsTip: "Từ vựng hiện đại — dùng khi trả lời câu hỏi về tương lai của truyền thông.",
    summary: "a live stream = nội dung phát trực tiếp qua internet.",
  },
  {
    term: "an online edition",
    ipa: "/ən ˌɒnˈlaɪn ɪˈdɪʃn/",
    pos: "phrase",
    usageNote: "chỉ phiên bản điện tử của một tờ báo hoặc tạp chí",
    en: "the internet version of a newspaper or magazine",
    vi: "phiên bản điện tử (của báo)",
    synonyms: ["digital edition"],
    antonyms: ["print edition"],
    examples: [
      { en: "We are moving from print articles to the online editions of newspapers.", vi: "Chúng ta đang chuyển từ báo in sang phiên bản điện tử của các tờ báo." },
      { en: "The online edition is updated every hour.", vi: "Phiên bản điện tử được cập nhật mỗi giờ." },
    ],
    ieltsTip: "Cặp \"print edition ↔ online edition\" rất tiện để nói về xu hướng truyền thông.",
    summary: "an online edition = bản điện tử của báo/tạp chí.",
  },
  {
    term: "the media",
    ipa: "/ðə ˈmiːdiə/",
    pos: "noun",
    usageNote: "luôn có mạo từ \"the\"; là dạng số nhiều của \"medium\"",
    en: "newspapers, magazines, radio and television considered as a group",
    vi: "giới truyền thông, các phương tiện truyền thông",
    synonyms: ["the press"],
    antonyms: [],
    examples: [
      { en: "And the media encourage that, in a way.", vi: "Và ở một khía cạnh nào đó, giới truyền thông khuyến khích điều đó." },
      { en: "I believe television is the most effective medium for advertising.", vi: "Tôi tin truyền hình là phương tiện quảng cáo hiệu quả nhất." },
    ],
    ieltsTip: "Error warning: \"medium\" là số ít, \"media\" là số nhiều — nói \"the most effective medium\", KHÔNG nói \"the most effective media\".",
    summary: "the media = giới truyền thông (số ít: medium).",
  },
  {
    term: "biased",
    ipa: "/ˈbaɪəst/",
    pos: "adjective",
    usageNote: "mô tả việc thiên vị một bên, không công bằng khi đưa tin hoặc đánh giá",
    en: "unfairly supporting or opposing one person or side",
    vi: "thiên vị, có định kiến",
    synonyms: ["partial", "one-sided"],
    antonyms: ["impartial", "objective"],
    examples: [
      { en: "Media coverage has failed to keep pace and remains biased against them.", vi: "Việc đưa tin của truyền thông đã không theo kịp và vẫn thiên vị chống lại họ." },
      { en: "I think they're the best team here, but then I am biased as I'm their teacher.", vi: "Tôi nghĩ họ là đội tốt nhất ở đây, nhưng tôi cũng thiên vị vì tôi là giáo viên của họ." },
    ],
    ieltsTip: "Danh từ là \"bias\" — \"media bias\", \"political bias\" là các cụm quen thuộc trong Reading.",
    summary: "biased = thiên vị, không công bằng.",
  },
  {
    term: "prejudiced",
    ipa: "/ˈpredʒudɪst/",
    pos: "adjective",
    usageNote: "mô tả định kiến không có căn cứ với một nhóm người",
    en: "having an unfair opinion about someone before you know them",
    vi: "có thành kiến, định kiến",
    synonyms: ["biased"],
    antonyms: ["open-minded"],
    examples: [
      { en: "Some companies are prejudiced against taking on employees over 40.", vi: "Một số công ty có thành kiến với việc tuyển nhân viên trên 40 tuổi." },
      { en: "He was prejudiced against the idea from the start.", vi: "Anh ta đã có thành kiến với ý tưởng đó ngay từ đầu." },
    ],
    ieltsTip: "Cấu trúc: prejudiced/biased AGAINST somebody — nhớ giới từ \"against\".",
    summary: "prejudiced = có thành kiến với ai/điều gì.",
  },
  {
    term: "impartial",
    ipa: "/ɪmˈpɑːʃl/",
    pos: "adjective",
    usageNote: "mô tả thái độ khách quan, không nghiêng về bên nào",
    en: "not supporting one side more than another",
    vi: "khách quan, không thiên vị",
    synonyms: ["neutral", "objective"],
    antonyms: ["biased"],
    examples: [
      { en: "A good sports journalist tries to remain impartial and doesn't show support for any one team.", vi: "Một phóng viên thể thao giỏi cố gắng giữ khách quan và không ủng hộ riêng đội nào." },
      { en: "The report was praised for its impartial analysis.", vi: "Bản báo cáo được khen ngợi vì phân tích khách quan." },
    ],
    ieltsTip: "\"Remain impartial\" là collocation cố định — rất hợp khi bàn về vai trò của báo chí.",
    summary: "impartial = khách quan, không nghiêng về bên nào.",
  },
  {
    term: "subjective",
    ipa: "/səbˈdʒektɪv/",
    pos: "adjective",
    usageNote: "dựa trên cảm nhận và ý kiến cá nhân thay vì bằng chứng khách quan",
    en: "based on personal feelings and opinions rather than facts",
    vi: "chủ quan, theo cảm nhận cá nhân",
    synonyms: ["personal"],
    antonyms: ["objective"],
    examples: [
      { en: "The judging of artistic works can be very subjective.", vi: "Việc chấm các tác phẩm nghệ thuật có thể rất chủ quan." },
      { en: "Beauty is a subjective matter.", vi: "Cái đẹp là chuyện chủ quan." },
    ],
    ieltsTip: "Cặp \"subjective ↔ objective\" rất hữu ích trong Writing Task 2 khi bàn về đánh giá nghệ thuật hoặc báo chí.",
    summary: "subjective = chủ quan, dựa trên cảm nhận cá nhân.",
  },
  {
    term: "influential",
    ipa: "/ˌɪnfluˈenʃl/",
    pos: "adjective",
    usageNote: "mô tả người hoặc thứ có sức tác động lớn tới suy nghĩ, hành vi của người khác",
    en: "having a lot of effect on the way people think or behave",
    vi: "có ảnh hưởng lớn",
    synonyms: ["powerful"],
    antonyms: ["insignificant"],
    examples: [
      { en: "The mass media is very influential in our society and has a big impact on young people.", vi: "Truyền thông đại chúng rất có ảnh hưởng trong xã hội và tác động lớn đến giới trẻ." },
      { en: "One of the most influential propositions in marketing is that satisfaction means loyalty.", vi: "Một trong những luận điểm có ảnh hưởng nhất trong marketing là sự hài lòng tạo nên lòng trung thành." },
    ],
    ieltsTip: "Đừng nhầm với \"influenced\" (bị ảnh hưởng) — \"influential\" nghĩa là gây ảnh hưởng.",
    summary: "influential = có sức ảnh hưởng lớn tới người khác.",
  },
];

const track37Script = `Vickie: Hi, Paul. How are you?
Paul: Hi, Vickie, I'm fine, just a bit tired. I stayed up late last night watching that new reality TV show. It's a bit like Big Brother.
Vickie: Oh, you didn't watch that rubbish, did you? It's just a bunch of people, stuck in a house, doing nothing!
Paul: No, it isn't. I love it.
Vickie: I have to admit that I did use to like that kind of thing when it was new. It's strange to think people are still watching the same shows a decade on.
Paul: Well, actually, it's still pretty much a worldwide phenomenon.
Vickie: Well, I can't say it's a phenomenon that I like very much. It seems to me that those shows just feed this insatiable appetite everyone seems to have for media attention.
Paul: You're probably right there. I mean, you wouldn't sign up for those shows if you didn't want to be in the public eye.
Vickie: That's right. Everyone seems to want to be a celebrity these days.
Paul: And the media encourage that, in a way, because once those shows start, the people in them are always in the headlines.
Vickie: I know, and it just increases the hype around the show and turns these ordinary people into instant celebrities. They become famous overnight.
Paul: You're right. But I suppose there's a lot of demand for gossip about celebrities these days, especially in the tabloid press. I guess all the media is doing is supplying that demand.
Vickie: But some journalists go to ridiculous lengths to get their story.
Paul: I agree with you there, but I think you're talking more about the paparazzi than serious journalists.
Vickie: Yeah, they can create really dangerous situations just trying to get a photograph of whoever's making headlines at the moment.
Paul: I know, it's all a bit silly when you realise they're only doing it to fill the gossip columns.
Vickie: But I don't want to read about these nobodies whose chief claim to fame is that they were on a reality TV show. I want to read about people with real talent who've actually earned their fame because they are different from the rest of us.
Paul: Hmm, that doesn't bother me so much. Maybe we need to rethink what fame is!`;

const UNIT_19_THE_MEDIA: CambridgeUnit = {
  unit: 19,
  slug: "the-media",
  title: "The media",
  topics: "Fame and the media, media bias",
  testPractice: "Speaking",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit19Vocab,
    },
    {
      kind: "listening_cloze",
      title: "Talking about reality TV",
      instructions: "Listen to a conversation between Paul and Vickie and complete the notes with the fame expressions they use.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-37.mp3",
      template:
        "• Paul says reality TV is still pretty much a {{worldwide phenomenon}}.\n" +
        "• Vickie thinks these shows feed the insatiable appetite everyone has for {{media attention}}.\n" +
        "• Paul says you wouldn't sign up for those shows if you didn't want to be {{in the public eye}}.\n" +
        "• Once the shows start, the people in them are always {{in the headlines}}.\n" +
        "• The hype turns ordinary people into {{instant celebrities}} — they {{become famous overnight}}.\n" +
        "• There is a lot of demand for celebrity gossip, especially in the {{tabloid press}}.\n" +
        "• Paul says Vickie is really talking about the {{paparazzi}} rather than serious journalists, who go to ridiculous lengths to photograph whoever is {{making headlines}}.\n" +
        "• Vickie doesn't want to read about people whose {{chief claim to fame}} is a reality TV show; she prefers people who have actually {{earned}} their fame.",
      script: track37Script,
      tip: "Trong Speaking, thay \"famous people\" bằng các cụm như \"instant celebrities\", \"high-profile figures\" sẽ nâng điểm từ vựng ngay lập tức.",
    },
    {
      kind: "sort",
      title: "Which part of the media?",
      instructions: "Tap a word, then tap the part of the media it belongs to.",
      buckets: ["Television and radio", "Newspapers and magazines"],
      items: [
        { term: "broadcaster", bucket: 0 },
        { term: "viewer", bucket: 0 },
        { term: "listener", bucket: 0 },
        { term: "episode", bucket: 0 },
        { term: "series", bucket: 0 },
        { term: "screen", bucket: 0 },
        { term: "rolling news", bucket: 0 },
        { term: "live stream", bucket: 0 },
        { term: "programme", bucket: 0 },
        { term: "article", bucket: 1 },
        { term: "reader", bucket: 1 },
        { term: "print", bucket: 1 },
        { term: "publication", bucket: 1 },
        { term: "tabloid", bucket: 1 },
        { term: "publisher", bucket: 1 },
        { term: "the press", bucket: 1 },
        { term: "online edition", bucket: 1 },
        { term: "gossip column", bucket: 1 },
      ],
    },
    {
      kind: "type_fill",
      title: "Speaking test answers",
      instructions: "Complete these Speaking test answers with a media word. You may need to change the form.",
      items: [
        { prompt: "We are already moving from getting our news from ___ articles and moving to digital.", answer: "print" },
        { prompt: "People increasingly read the ___ of newspapers instead of buying a paper copy.", answer: "online editions" },
        { prompt: "Then there's the ___ we have on the TV day and night.", answer: "rolling news" },
        { prompt: "Many TV companies now offer a ___ so you can watch the news on your computer or phone.", answer: "live stream" },
        { prompt: "We will soon blur the distinction between a ___, a listener and a viewer.", answer: "reader" },
        { prompt: "There are lots of sensational ___ to try to persuade us to buy a newspaper.", answer: "headlines" },
        { prompt: "Sometimes as much prominence is given to a ___ column as to the serious news stories.", answer: "gossip" },
        { prompt: "I think ___ have a duty to warn parents about unsuitable content.", answer: "broadcasters" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — media bias",
      passageTitle: "Media Bias and Politics",
      passage:
        "Regardless of their suitability, the moment a female candidate announces their intention of entering the political arena, the press immediately begin to speculate about the possibility of a female president of the United States. The media debate doesn't stop even if the candidate fails to get nominated as a candidate.\n\n" +
        "In her recent book, Media Bias and Politics, Susanna Baxter explores the press treatment of female presidential candidates from the 1800s to the present day. Baxter contends that, while the public's attitude towards women in politics has evolved considerably, media coverage both on TV and in the press has failed to keep pace and remains biased against them. We generally use the press as our primary source of information about political candidates. According to Baxter, it could therefore be argued that, by treating women unfairly, media reports not only impede the progress of female candidates but also inevitably deter women from taking part in the political process.\n\n" +
        "The book begins by examining the stereotypes that the media ascribes to female candidates, and asserts that, as well as portraying women as incompetent leaders, reporters also tend to describe them according to their fashion choices. Baxter also concludes that reporting on male candidates is far more likely to concentrate on political issues, and questions whether we are in fact ready for a woman president. She claims that this blatant media prejudice against women contradicts opinion polls that indicate voters would actually support a female candidate.\n\n" +
        "Baxter's study involved a detailed analysis of national broadsheets and one tabloid from each candidate's local area. In my view, the inevitable home-town bias of local newspapers could give a distorted view in terms of the number and length of articles they contain. Furthermore, when it comes to elections, the coverage in the majority of newspapers is generally tainted with political bias. Consequently, selecting only one newspaper from each town seems too small a sample to reach any decisive conclusion.",
      questions: [
        {
          text: "Baxter believes biased media reports reflect the attitude of the general public with regard to women in politics.",
          answer: "False",
          justification: "The public's attitude has evolved considerably, but media coverage has failed to keep pace and remains biased.",
        },
        {
          text: "Baxter maintains that female politicians are treated more fairly on TV than in newspapers.",
          answer: "Not given",
          justification: "No comparison is made between newspaper and TV reporting.",
        },
        {
          text: "Baxter warns that the attitude of the media may lead to fewer women in politics.",
          answer: "True",
          justification: "Media reports inevitably deter women from taking part in the political process.",
        },
        {
          text: "Baxter suggests that the press try to show that female politicians make poor leaders.",
          answer: "True",
          justification: "The media portray women as incompetent leaders.",
        },
        {
          text: "According to Baxter, the general public is biased against the idea of female leaders.",
          answer: "False",
          justification: "Opinion polls indicate voters would actually support a female candidate.",
        },
        {
          text: "In the tabloids, Baxter found fewer articles than anticipated about local politicians.",
          answer: "Not given",
          justification: "We are not told what Baxter expected to find in local tabloids.",
        },
        {
          text: "Most print media provide political reporting that is impartial.",
          answer: "False",
          justification: "The coverage in the majority of newspapers is generally tainted with political bias.",
        },
        {
          text: "Baxter should have included a wider range of newspapers in her study.",
          answer: "True",
          justification: "Selecting only one newspaper from each town seems too small a sample to reach any decisive conclusion.",
        },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Reporting verbs",
      instructions: "Tap each verb to reveal what it means.",
      pairs: [
        { prompt: "announce", reveal: "state publicly" },
        { prompt: "speculate", reveal: "guess possible answers to a question" },
        { prompt: "explore / examine", reveal: "discuss an idea carefully to discover more about it" },
        { prompt: "contend / argue / assert", reveal: "state something is true or a fact" },
        { prompt: "conclude", reveal: "judge or decide something after some consideration" },
        { prompt: "indicate", reveal: "show or make clear" },
      ],
    },
    {
      kind: "sort",
      title: "Certain or in doubt?",
      instructions: "Tap a verb, then decide whether the writer is presenting something as a fact or as something in doubt.",
      buckets: ["Not certain / in doubt", "True / a fact"],
      items: [
        { term: "disagree", bucket: 0 },
        { term: "question", bucket: 0 },
        { term: "debate", bucket: 0 },
        { term: "contest", bucket: 0 },
        { term: "challenge", bucket: 0 },
        { term: "dispute", bucket: 0 },
        { term: "state", bucket: 1 },
        { term: "cite", bucket: 1 },
        { term: "declare", bucket: 1 },
      ],
    },
    {
      kind: "fill_mc",
      title: "Fair or unfair?",
      instructions: "Choose the word that best completes each sentence.",
      items: [
        { before: "Some companies are", after: "against taking on employees over 40.", options: ["prejudiced", "impartial", "subjective"], answer: "prejudiced" },
        { before: "The mass media is very", after: "in our society and has a big impact on young people.", options: ["influential", "biased", "impartial"], answer: "influential" },
        { before: "I think they're the best team here, but then I am", after: "as I'm their teacher.", options: ["biased", "impartial", "influential"], answer: "biased" },
        { before: "The judging of artistic works can be very", after: "; we need to make it more specific.", options: ["subjective", "impartial", "prejudiced"], answer: "subjective" },
        { before: "A good sports journalist tries to remain", after: "and doesn't show support for any one team.", options: ["impartial", "biased", "subjective"], answer: "impartial" },
      ],
    },
    {
      kind: "speaking",
      title: "Test practice — Speaking Part 2",
      prompt: "Describe a television show you have seen recently.",
      bullets: ["what it was about", "where and when you saw it", "what type of programme it was", "why you enjoy this kind of show"],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "Đây là Speaking Part 2: bạn có 1 phút chuẩn bị và nói 1–2 phút. Hãy bám sát thời gian và nếu được thì ghi âm lại để nghe lại sau. Dùng càng nhiều từ vựng mới của unit này càng tốt (a worldwide phenomenon, instant celebrities, rolling news, a live stream...). Sau đó thử tự trả lời vài câu Part 3: \"Is there too much news these days?\", \"How easy is it for the media to manipulate public opinion?\".",
    },
  ],
};

const unit20Vocab: VocabWord[] = [
  {
    term: "exhibit",
    ipa: "/ɪɡˈzɪbɪt/",
    pos: "verb",
    usageNote: "nghĩa trưng bày tác phẩm nghệ thuật ở nơi công cộng",
    en: "to show works of art to the public",
    vi: "trưng bày, triển lãm",
    synonyms: ["display", "show"],
    antonyms: ["conceal"],
    examples: [
      { en: "Museums should exhibit indigenous art to help preserve traditional art forms.", vi: "Các bảo tàng nên trưng bày nghệ thuật bản địa để giúp bảo tồn các loại hình nghệ thuật truyền thống." },
      { en: "Her paintings were exhibited in Paris last year.", vi: "Tranh của cô ấy đã được triển lãm ở Paris năm ngoái." },
    ],
    ieltsTip: "Danh từ \"an exhibition\" (buổi triển lãm) và \"an exhibitor\" (người tham gia trưng bày).",
    summary: "exhibit = trưng bày tác phẩm cho công chúng xem.",
  },
  {
    term: "compose",
    ipa: "/kəmˈpəʊz/",
    pos: "verb",
    usageNote: "dùng cho việc sáng tác nhạc hoặc viết một tác phẩm có cấu trúc",
    en: "to write a piece of music or a poem",
    vi: "sáng tác (nhạc, thơ)",
    synonyms: ["write", "create"],
    antonyms: [],
    examples: [
      { en: "It's so hard to compose songs without any inspiration.", vi: "Thật khó sáng tác bài hát khi không có cảm hứng." },
      { en: "He composed the score for the film.", vi: "Ông ấy đã soạn phần nhạc cho bộ phim." },
    ],
    ieltsTip: "Nhóm động từ đi với \"a song\": compose / record / play a song.",
    summary: "compose = sáng tác nhạc hoặc thơ.",
  },
  {
    term: "stage",
    ipa: "/steɪdʒ/",
    pos: "verb",
    usageNote: "là động từ nghĩa dàn dựng và trình diễn một vở kịch hoặc sự kiện",
    en: "to organise and present a play or public event",
    vi: "dàn dựng, tổ chức biểu diễn",
    synonyms: ["put on", "perform"],
    antonyms: ["cancel"],
    examples: [
      { en: "This is a theatre that prefers to stage plays based on original writing.", vi: "Đây là nhà hát thích dàn dựng những vở kịch dựa trên kịch bản gốc." },
      { en: "The company staged a new production of Hamlet.", vi: "Đoàn kịch đã dàn dựng một phiên bản mới của Hamlet." },
    ],
    ieltsTip: "Nhóm động từ đi với \"a play\": perform / rehearse / stage a play.",
    summary: "stage (v) = dàn dựng và trình diễn một vở kịch.",
  },
  {
    term: "nurture",
    ipa: "/ˈnɜːtʃə(r)/",
    pos: "verb",
    usageNote: "nghĩa nuôi dưỡng, bồi đắp tài năng hoặc ý tưởng cho phát triển",
    en: "to help something or someone to develop and be successful",
    vi: "nuôi dưỡng, bồi đắp (tài năng)",
    synonyms: ["cultivate", "foster"],
    antonyms: ["neglect", "stifle"],
    examples: [
      { en: "Young people are very creative and we should do our best to nurture their talents.", vi: "Người trẻ rất sáng tạo và chúng ta nên hết sức nuôi dưỡng tài năng của họ." },
      { en: "The school nurtures a love of music from an early age.", vi: "Trường học bồi đắp tình yêu âm nhạc từ khi các em còn nhỏ." },
    ],
    ieltsTip: "Nhóm động từ đi với \"a talent\": have / cultivate / nurture a talent.",
    summary: "nurture = nuôi dưỡng, bồi đắp cho phát triển.",
  },
  {
    term: "indigenous",
    ipa: "/ɪnˈdɪdʒənəs/",
    pos: "adjective",
    usageNote: "chỉ những gì thuộc về người dân bản địa hoặc có nguồn gốc tự nhiên tại một nơi",
    en: "belonging to the original people of a place",
    vi: "bản địa, bản xứ",
    synonyms: ["native"],
    antonyms: ["imported", "foreign"],
    examples: [
      { en: "Museums should exhibit indigenous art to help preserve traditional art forms.", vi: "Bảo tàng nên trưng bày nghệ thuật bản địa để bảo tồn các loại hình nghệ thuật truyền thống." },
      { en: "The festival celebrates indigenous music and dance.", vi: "Lễ hội tôn vinh âm nhạc và điệu múa bản địa." },
    ],
    ieltsTip: "Từ khoá quen thuộc trong Reading về văn hoá và bảo tồn — thường paraphrase cho \"native\".",
    summary: "indigenous = bản địa, thuộc về cư dân gốc của một vùng.",
  },
  {
    term: "originality",
    ipa: "/əˌrɪdʒəˈnæləti/",
    pos: "noun",
    usageNote: "chỉ phẩm chất mới mẻ, độc đáo, không sao chép của một tác phẩm",
    en: "the quality of being new and different from anything else",
    vi: "tính độc đáo, sự mới mẻ",
    synonyms: ["inventiveness"],
    antonyms: ["imitation"],
    examples: [
      { en: "This theatre prefers to stage plays based on original writing rather than re-work the classics.", vi: "Nhà hát này thích dàn dựng những vở kịch từ kịch bản gốc hơn là làm lại các tác phẩm kinh điển." },
      { en: "The judges praised the originality of her design.", vi: "Ban giám khảo khen ngợi tính độc đáo trong thiết kế của cô ấy." },
    ],
    ieltsTip: "Tính từ là \"original\" — chú ý phân biệt với \"origin\" (nguồn gốc).",
    summary: "originality = tính độc đáo, mới mẻ của tác phẩm.",
  },
  {
    term: "inspiration",
    ipa: "/ˌɪnspəˈreɪʃn/",
    pos: "noun",
    usageNote: "chỉ nguồn cảm hứng thôi thúc người ta sáng tạo",
    en: "something that gives you new ideas and the desire to create",
    vi: "nguồn cảm hứng",
    synonyms: ["stimulus"],
    antonyms: [],
    examples: [
      { en: "It's so hard to compose songs without any inspiration.", vi: "Thật khó sáng tác bài hát khi không có nguồn cảm hứng nào." },
      { en: "She draws inspiration from the landscape around her.", vi: "Cô ấy lấy cảm hứng từ khung cảnh quanh mình." },
    ],
    ieltsTip: "Tính từ là \"inspirational\" (truyền cảm hứng) và \"inspired\" (được truyền cảm hứng).",
    summary: "inspiration = nguồn cảm hứng sáng tạo.",
  },
  {
    term: "imaginative",
    ipa: "/ɪˈmædʒɪnətɪv/",
    pos: "adjective",
    usageNote: "mô tả người hoặc tác phẩm giàu trí tưởng tượng, nhiều ý tưởng mới",
    en: "having or showing new and interesting ideas",
    vi: "giàu trí tưởng tượng, sáng tạo",
    synonyms: ["creative", "inventive"],
    antonyms: ["unimaginative"],
    examples: [
      { en: "It was an imaginative production that surprised the audience.", vi: "Đó là một vở diễn giàu trí tưởng tượng khiến khán giả bất ngờ." },
      { en: "Children need imaginative play as much as formal lessons.", vi: "Trẻ em cần các trò chơi kích thích trí tưởng tượng không kém gì những bài học chính khoá." },
    ],
    ieltsTip: "Phân biệt: \"imaginative\" (giàu tưởng tượng) và \"imaginary\" (không có thật).",
    summary: "imaginative = giàu trí tưởng tượng, nhiều ý tưởng mới.",
  },
  {
    term: "a matter of taste",
    ipa: "/ə ˈmætər əv teɪst/",
    pos: "phrase",
    usageNote: "dùng khi điều gì đó phụ thuộc vào sở thích riêng của mỗi người",
    en: "something that depends on personal preference rather than fact",
    vi: "chuyện tuỳ khẩu vị/sở thích mỗi người",
    synonyms: ["a personal preference"],
    antonyms: ["an objective fact"],
    examples: [
      { en: "Humour can be quite personal and subjective — it really is a matter of taste.", vi: "Sự hài hước khá cá nhân và chủ quan — đúng là chuyện tuỳ sở thích mỗi người." },
      { en: "Whether the ending works is a matter of taste.", vi: "Cái kết có hợp lý hay không là chuyện tuỳ cảm nhận mỗi người." },
    ],
    ieltsTip: "Cụm cực kỳ hữu ích để mở đầu câu trả lời Speaking Part 3 về nghệ thuật.",
    summary: "a matter of taste = chuyện phụ thuộc vào sở thích cá nhân.",
  },
  {
    term: "acquire a taste for",
    ipa: "/əˈkwaɪər ə teɪst fɔː(r)/",
    pos: "phrase",
    usageNote: "nghĩa dần dần thích một thứ mà lúc đầu mình không thích",
    en: "to gradually begin to like something you did not like at first",
    vi: "dần dần thích, tập quen với",
    synonyms: ["grow to like"],
    antonyms: ["go off"],
    examples: [
      { en: "I've tried them often but I've never managed to acquire a taste for oysters.", vi: "Tôi đã thử nhiều lần nhưng chưa bao giờ tập quen được với hàu." },
      { en: "He acquired a taste for classical music at university.", vi: "Anh ấy dần thích nhạc cổ điển từ hồi đại học." },
    ],
    ieltsTip: "Nhớ giới từ \"for\": acquire a taste FOR something.",
    summary: "acquire a taste for = dần dần thích một thứ gì đó.",
  },
  {
    term: "in bad taste",
    ipa: "/ɪn bæd teɪst/",
    pos: "phrase",
    usageNote: "mô tả lời nói hoặc hành động không phù hợp, dễ gây xúc phạm",
    en: "likely to offend people because it is inappropriate",
    vi: "thiếu tế nhị, khiếm nhã",
    synonyms: ["offensive", "tasteless"],
    antonyms: ["tactful"],
    examples: [
      { en: "The jokes he made about the earthquake were in bad taste and quite offensive.", vi: "Những câu đùa của anh ta về trận động đất thật khiếm nhã và khá xúc phạm." },
      { en: "Some viewers felt the advertisement was in bad taste.", vi: "Một số khán giả cho rằng quảng cáo đó thiếu tế nhị." },
    ],
    ieltsTip: "Chú ý phân biệt \"in bad taste\" (khiếm nhã) với \"have bad/poor taste in\" (gu thẩm mỹ kém).",
    summary: "in bad taste = khiếm nhã, không phù hợp và dễ gây xúc phạm.",
  },
  {
    term: "have good taste in",
    ipa: "/hæv ɡʊd teɪst ɪn/",
    pos: "phrase",
    usageNote: "nghĩa có gu thẩm mỹ tốt trong một lĩnh vực nào đó",
    en: "to be good at choosing attractive or high-quality things",
    vi: "có gu thẩm mỹ tốt về",
    synonyms: ["have a good eye for"],
    antonyms: ["have poor taste in"],
    examples: [
      { en: "I'm not a good judge of art but I believe I have good taste in clothes.", vi: "Tôi không giỏi thẩm định nghệ thuật nhưng tôi tin mình có gu thẩm mỹ tốt về quần áo." },
      { en: "She has very good taste in furniture.", vi: "Cô ấy có gu rất tốt về đồ nội thất." },
    ],
    ieltsTip: "Nhớ giới từ \"in\": have good taste IN clothes/music/art.",
    summary: "have good taste in = có gu thẩm mỹ tốt về lĩnh vực nào đó.",
  },
  {
    term: "diverse tastes",
    ipa: "/daɪˈvɜːs teɪsts/",
    pos: "phrase",
    usageNote: "chỉ việc thích nhiều thứ rất khác nhau trong cùng một lĩnh vực",
    en: "very varied preferences",
    vi: "gu đa dạng, thích nhiều thể loại",
    synonyms: ["varied tastes"],
    antonyms: ["narrow tastes"],
    examples: [
      { en: "I have quite diverse tastes in music — I enjoy opera and rap.", vi: "Gu âm nhạc của tôi khá đa dạng — tôi thích cả opera lẫn rap." },
      { en: "The festival has music to suit all tastes.", vi: "Lễ hội có âm nhạc hợp với mọi gu thưởng thức." },
    ],
    ieltsTip: "\"Suit all tastes\" (hợp mọi gu) là cụm rất hay dùng khi mô tả sự kiện, dịch vụ.",
    summary: "diverse tastes = gu thưởng thức đa dạng, nhiều thể loại.",
  },
  {
    term: "hilarious",
    ipa: "/hɪˈleəriəs/",
    pos: "adjective",
    usageNote: "mức độ rất mạnh của \"funny\" — cực kỳ buồn cười",
    en: "extremely funny",
    vi: "cực kỳ hài hước, buồn cười",
    synonyms: ["humorous", "side-splitting"],
    antonyms: ["dull"],
    examples: [
      { en: "The last movie I saw was supposed to be hilarious, but I didn't laugh at all.", vi: "Bộ phim gần nhất tôi xem lẽ ra phải rất hài hước, nhưng tôi chẳng cười nổi." },
      { en: "His impression of the teacher was hilarious.", vi: "Màn nhại giọng thầy giáo của cậu ấy cực kỳ buồn cười." },
    ],
    ieltsTip: "Error warning: \"fun\" là điều bạn thích làm, \"funny\" là điều khiến bạn cười — đừng dùng lẫn.",
    summary: "hilarious = cực kỳ buồn cười.",
  },
  {
    term: "thrilling",
    ipa: "/ˈθrɪlɪŋ/",
    pos: "adjective",
    usageNote: "mô tả điều gây hào hứng, hồi hộp mạnh mẽ",
    en: "extremely exciting",
    vi: "hồi hộp, phấn khích tột độ",
    synonyms: ["spectacular", "exhilarating"],
    antonyms: ["tedious"],
    examples: [
      { en: "I was expecting the circus acts to be thrilling to watch, but it was all a bit disappointing.", vi: "Tôi tưởng các tiết mục xiếc sẽ rất hồi hộp, nhưng hoá ra khá đáng thất vọng." },
      { en: "The final ten minutes of the match were thrilling.", vi: "Mười phút cuối trận đấu thật hồi hộp." },
    ],
    ieltsTip: "Thay \"very exciting\" bằng \"thrilling/spectacular\" để nâng band từ vựng.",
    summary: "thrilling = cực kỳ hồi hộp, phấn khích.",
  },
  {
    term: "petrified",
    ipa: "/ˈpetrɪfaɪd/",
    pos: "adjective",
    usageNote: "mức độ rất mạnh của \"scared\" — sợ cứng người",
    en: "extremely frightened",
    vi: "sợ chết khiếp, sợ cứng người",
    synonyms: ["terrified"],
    antonyms: ["fearless"],
    examples: [
      { en: "I like the feeling of being petrified when I watch horror movies.", vi: "Tôi thích cảm giác sợ chết khiếp khi xem phim kinh dị." },
      { en: "She was petrified of speaking in public.", vi: "Cô ấy sợ chết khiếp việc nói trước đám đông." },
    ],
    ieltsTip: "Nhóm tính từ tuyệt đối (petrified, terrified) không đi với \"very\" — dùng \"absolutely\" thay thế.",
    summary: "petrified = sợ hãi tột độ, sợ cứng người.",
  },
  {
    term: "tedious",
    ipa: "/ˈtiːdiəs/",
    pos: "adjective",
    usageNote: "mô tả điều nhàm chán vì kéo dài và lặp đi lặp lại",
    en: "boring because it lasts too long or is repetitive",
    vi: "tẻ nhạt, chán ngán",
    synonyms: ["monotonous"],
    antonyms: ["thrilling"],
    examples: [
      { en: "I've enjoyed his plays before, but this one was so tedious that I was asleep by the third act!", vi: "Tôi từng thích các vở kịch của ông ấy, nhưng vở này tẻ nhạt đến mức tôi ngủ gật từ màn ba!" },
      { en: "Filling in the forms was a tedious task.", vi: "Việc điền các mẫu đơn thật chán ngán." },
    ],
    ieltsTip: "Error warning: \"I was bored\" (tôi thấy chán) khác \"it was boring\" (nó nhàm chán) — đừng nhầm.",
    summary: "tedious = tẻ nhạt, chán vì lặp lại và kéo dài.",
  },
  {
    term: "spine-chilling",
    ipa: "/ˈspaɪn tʃɪlɪŋ/",
    pos: "adjective",
    usageNote: "mô tả phim, truyện gây cảm giác rùng rợn, lạnh sống lưng",
    en: "very frightening in an exciting way",
    vi: "rùng rợn, lạnh sống lưng",
    synonyms: ["terrifying"],
    antonyms: ["reassuring"],
    examples: [
      { en: "The special effects were so realistic it was spine-chilling to watch.", vi: "Kỹ xảo chân thực đến mức xem mà lạnh sống lưng." },
      { en: "She told us a spine-chilling ghost story.", vi: "Cô ấy kể cho chúng tôi một câu chuyện ma rùng rợn." },
    ],
    ieltsTip: "Rất hợp khi mô tả phim trong Speaking Part 2 — nhớ nói kèm lý do tại sao bạn thích cảm giác đó.",
    summary: "spine-chilling = rùng rợn, khiến lạnh sống lưng.",
  },
  {
    term: "abysmal",
    ipa: "/əˈbɪzməl/",
    pos: "adjective",
    usageNote: "mức độ cực mạnh của \"bad\" — cực kỳ tệ",
    en: "extremely bad",
    vi: "tệ hại, kém cỏi hết mức",
    synonyms: ["dismal", "appalling"],
    antonyms: ["superb"],
    examples: [
      { en: "The play was supposed to be a tragedy, but the acting was abysmal.", vi: "Vở kịch lẽ ra là bi kịch, nhưng diễn xuất thì tệ hại." },
      { en: "The team's performance this season has been abysmal.", vi: "Phong độ của đội mùa này thật tệ hại." },
    ],
    ieltsTip: "Dùng \"abysmal/dismal\" thay \"very bad\" trong Speaking để thể hiện vốn từ phong phú.",
    summary: "abysmal = cực kỳ tệ, kém cỏi hết mức.",
  },
  {
    term: "gloomy",
    ipa: "/ˈɡluːmi/",
    pos: "adjective",
    usageNote: "mô tả không khí u ám, buồn bã, thiếu hy vọng",
    en: "sad and without hope; dark and depressing",
    vi: "u ám, ảm đạm",
    synonyms: ["joyless", "dismal"],
    antonyms: ["uplifting", "cheerful"],
    examples: [
      { en: "I got so sick of the relentlessly gloomy plot, I decided to read something more uplifting instead.", vi: "Tôi quá chán cốt truyện u ám triền miên nên quyết định đọc thứ gì đó tươi sáng hơn." },
      { en: "The report paints a gloomy picture of the economy.", vi: "Bản báo cáo vẽ nên một bức tranh ảm đạm về nền kinh tế." },
    ],
    ieltsTip: "Trái nghĩa hữu ích: \"uplifting\" (nâng đỡ tinh thần) — rất hợp khi nói về sách và phim.",
    summary: "gloomy = u ám, ảm đạm, thiếu hy vọng.",
  },
];

const track38Script = `Welcome to the Ipswich Arts Festival. This recording will help you find your way around this year's festival, the twentieth we've held here in Trafalgar Park. If you look at your map, you will see the entrance to the festival is on Trafalgar Road. Directly opposite the entrance, you'll see our beautiful fountain, and to the left of this you'll find this year's sculpture garden in among the bushes and trees. It's a lovely setting to stroll around and admire the skill of the sculptors who have carved their artwork out of both wood and stone. If you follow the path through the middle of the park, you'll reach the catering village, where you can buy food and drinks. Just past there is an area between the catering village and the toilets where you'll find a display of paintings all done by local artists. There's a wide range of wonderful paintings from portraits to local landscapes. This year, we have a special exhibition of work by amateur artists from our town. If you then go back past the catering village, on the left is this year's craft market. This is always a popular area of the festival, where you can admire the craftwork of our talented exhibitors.
As always, we have live bands playing throughout the festival. There will be a range of music to suit all tastes from classical to jazz and rock, so please consult your programme to find out when your favourite musicians will be performing on stage. The stage is just to the right of the entrance. As well as live music, we also have a special section for literature lovers this year. You'll be able to listen to a variety of authors reading from their latest works, and it's wonderful to hear the writers bring their own words to life. From the stage, go along the path towards the toilets at the bottom left of the map. Carry on round, keeping the toilets on your left and you will see the author area on your right. In the very top left hand corner of your map, you'll see another set of toilets, and the information booth nearby. Right next to the information booth, you'll be able to enjoy our 'theatre in the park' performances. Our very talented and professional group of actors will be performing extracts from classical and modern plays. These will take place each evening from five till eight, so don't miss out.`;

const UNIT_20_A_MATTER_OF_TASTE: CambridgeUnit = {
  unit: 20,
  slug: "a-matter-of-taste",
  title: "A matter of taste",
  topics: "The arts, personal taste",
  testPractice: "Reading",
  steps: [
    {
      kind: "vocab",
      title: "Key vocabulary",
      words: unit20Vocab,
    },
    {
      kind: "listening_cloze",
      title: "The Ipswich Arts Festival",
      instructions: "Listen to a recording about an arts festival and complete the notes with the missing words.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-38.mp3",
      template:
        "• The sculpture garden is a lovely setting to stroll around and admire the skill of the {{sculptors}}, who have carved their artwork out of both {{wood}} and stone.\n" +
        "• Follow the path through the middle of the park to reach the {{catering village}}, where you can buy food and drinks.\n" +
        "• The display of {{paintings}} is all done by local artists, ranging from {{portraits}} to local landscapes; this year there is a special exhibition of work by {{amateur}} artists.\n" +
        "• The {{craft market}} is always a popular area, where you can admire the craftwork of talented exhibitors.\n" +
        "• There will be a range of music to suit all {{tastes}}, from classical to jazz and rock; consult your {{programme}} to find out when your favourite musicians are performing.\n" +
        "• In the special section for literature lovers, {{authors}} will read from their latest works.\n" +
        "• The 'theatre in the park' performances feature extracts from classical and modern {{plays}}, each evening from five till eight.",
      script: track38Script,
      tip: "Với bài nghe dạng bản đồ, hãy để mắt tới các từ chỉ vị trí: opposite, to the left of, just past, next to, in the corner of.",
    },
    {
      kind: "type_fill",
      title: "Noun and adjective forms",
      instructions: "Type the adjective formed from each noun.",
      items: [
        { prompt: "imagination →", answer: "imaginative" },
        { prompt: "inspiration →", answer: "inspirational" },
        { prompt: "originality →", answer: "original" },
        { prompt: "poetry →", answer: "poetic" },
        { prompt: "fiction →", answer: "fictional" },
        { prompt: "drama →", answer: "dramatic" },
        { prompt: "tradition →", answer: "traditional" },
        { prompt: "culture →", answer: "cultural" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Verbs in the arts",
      instructions: "Tap each group of verbs to reveal the noun they collocate with.",
      pairs: [
        { prompt: "compose / record / play", reveal: "a song" },
        { prompt: "perform / rehearse / stage", reveal: "a play" },
        { prompt: "take / pose for / publish", reveal: "a photograph" },
        { prompt: "make / shoot / screen", reveal: "a film" },
        { prompt: "create / exhibit / collect", reveal: "art" },
        { prompt: "have / cultivate / nurture", reveal: "a talent" },
      ],
    },
    {
      kind: "type_fill",
      title: "Talking about the arts",
      instructions: "Complete each sentence with the correct form of a word from this unit.",
      items: [
        { prompt: "Museums should ___ indigenous art to help preserve traditional art forms.", answer: "exhibit" },
        { prompt: "It's so hard to ___ songs without any inspiration. That's why I write about my experiences.", answer: "compose" },
        { prompt: "The original film was ___ in black and white to make it more dramatic.", answer: "shot" },
        { prompt: "Young people are very creative and we should do our best to ___ their talents.", answer: "nurture" },
        { prompt: "This is a theatre that prefers to ___ plays based on original writing rather than re-work the classics.", answer: "stage" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Reading — prehistoric cinema",
      passageTitle: "The world's first movies?",
      passage:
        "Rock engravings from the Copper Age found all over Europe in remote, hidden locations, indicate the artwork of the period was more than mere visual images, researchers believe. In fact, prehistoric humans enjoyed a primitive version of cinema, according to researchers. 'The cliff engravings ... in our opinion are not just images but formed part of an audiovisual performance,' said Frederick Baker of the Museum of Archaeology and Anthropology at the University of Cambridge. 'There was still no moving image but the pictures created sequences like in animation ... this was not just a treat for the eyes but also for the ears, as these rock engravings are especially found in locations with particular echoes.'\n\n" +
        "The scientists have now launched a joint project with Weimar's Bauhaus University in Germany to recreate these 'films', using computer technology to establish the sequence of images and animate them like in a cartoon. The 'movies', dating back to 4000–1000 BC, often depict dances or hunts, but interestingly never show death and rarely portray women, the project's coordinators said. The project is being conducted in Valcamonica, in Italy's northern Lombardy region, where the highest concentration of such engravings – some 100,000 pictures – can be found.",
      questions: [
        {
          text: "Researchers believe the rock engravings were part of an audiovisual performance.",
          answer: "True",
          justification: "Baker says the cliff engravings 'formed part of an audiovisual performance'.",
        },
        {
          text: "The engravings contained moving images.",
          answer: "False",
          justification: "There was still no moving image, although the pictures created sequences like in animation.",
        },
        {
          text: "The locations of the engravings often have unusual echoes.",
          answer: "True",
          justification: "These rock engravings are especially found in locations with particular echoes.",
        },
        {
          text: "Computer technology is being used to animate the sequences of images.",
          answer: "True",
          justification: "The joint project uses computer technology to establish the sequence of images and animate them like in a cartoon.",
        },
        {
          text: "Scenes showing death appear frequently in the engravings.",
          answer: "False",
          justification: "The 'movies' never show death.",
        },
        {
          text: "The engravings in Valcamonica are the oldest in Europe.",
          answer: "Not given",
          justification: "The passage says Valcamonica has the highest concentration, not that they are the oldest.",
        },
      ],
    },
    {
      kind: "type_fill",
      title: "Phrases with 'taste'",
      instructions: "Complete each sentence with a phrase containing the word taste.",
      items: [
        { prompt: "The jokes he made about the earthquake were ___ and quite offensive.", answer: "in bad taste" },
        { prompt: "I'm not a good judge of art but I believe I ___ clothes.", answer: "have good taste in" },
        { prompt: "My sister and I wanted to decorate our bedroom but we don't ___, so we could never agree on a colour!", answer: "share the same tastes" },
        { prompt: "Humour can be quite personal and subjective — it really is ___.", answer: "a matter of taste" },
        { prompt: "I have quite ___ in music — I enjoy opera and rap.", answer: "diverse tastes" },
        { prompt: "I've tried them often but I've never managed to ___ oysters.", answer: "acquire a taste for" },
      ],
    },
    {
      kind: "fill_mc",
      title: "Stronger adjectives",
      instructions: "Choose the stronger adjective that has a similar meaning to the underlined word.",
      items: [
        { before: "The comedy was supposed to be really funny, in fact", after: ", but I didn't laugh at all.", options: ["hilarious", "tedious", "gloomy"], answer: "hilarious" },
        { before: "I expected the circus acts to be daring and exciting —", after: ", even.", options: ["thrilling", "dismal", "monotonous"], answer: "thrilling" },
        { before: "I like the feeling of being really scared, even", after: ", when I watch horror films.", options: ["petrified", "humorous", "joyless"], answer: "petrified" },
        { before: "This play was so boring —", after: ", really — that I was asleep by the third act.", options: ["tedious", "spectacular", "terrifying"], answer: "tedious" },
        { before: "The effects were so realistic that the film was genuinely scary —", after: ", in fact.", options: ["spine-chilling", "hilarious", "abysmal"], answer: "spine-chilling" },
        { before: "The acting was so bad — truly", after: "— that I wanted to laugh instead of cry.", options: ["abysmal", "thrilling", "imaginative"], answer: "abysmal" },
        { before: "I got sick of the relentlessly depressing —", after: "— plot and read something more uplifting.", options: ["gloomy", "humorous", "spectacular"], answer: "gloomy" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Test practice — Reading",
      passageTitle: "Modern art shows its age",
      passage:
        "In the Oscar Wilde novel The Picture of Dorian Gray, a man remains forever young while his painted portrait acquires the blemishes of his increasingly sinful life. The story exactly reverses our expectations – that while life is a process of constant change and decay, the masterpieces of art will endure. Any conservator will tell you, however, that things are not so simple. All material objects age; paper and silk discolor and turn brittle; painted surfaces crack and pigments darken or fade; even materials as durable as marble and bronze will change color and texture after prolonged contact with the elements.\n\n" +
        "When it comes to works of modern art, the experimental embrace of new materials that gave the period much of its dynamism in the late 1800s and early 1900s poses a whole new set of challenges. These are not only technical but conceptual, since the use of the new materials – many of them never meant to last – often went hand in hand with a disdain for the traditional notion of the artwork as a precious artifact and embodiment of eternal values. A case in point was when the Busch-Reisinger Museum at Harvard recently acquired a sculpture made of dirt by the German artist Dieter Roth. Conservators had to face the fact that their mission to preserve the culture of the moment would have to yield to accommodate materials chosen precisely because of their propensity to decay. 'Our natural inclination is to preserve objects,' explains Henry Lie, head of the Straus Center for Conservation at Harvard, 'but also to honor the artist's feelings of how they should change over time.'\n\n" +
        "The recently established Center for the Technical Study of Modern Art at Harvard has been set up to grapple with the distinctive challenges posed by the art of the last century. Under the directorship of Carol Mancusi-Ungaro, the center will provide a road map to future conservators and a resource for scholars seeking to understand how works of modern art were made. In establishing guidelines for the conservation of modern art, Ms Mancusi-Ungaro said that there is no substitute for the artist's voice. Hence a goal of the center is to create an archive of videotaped interviews with artists. 'With modern art there are no boundaries,' she said. 'Anything could be used, from industrial materials to edible materials. It's time to come to terms not only with what these materials are, but why the artist used them.'\n\n" +
        "The problems for the conservator of modern art differ fundamentally from those that concern conservators of old master works, where the goal is to preserve as faithfully as possible the integrity of the original. A hands-off approach is dictated where change is essential to the artist's meaning. Joseph Beuys, for instance, used organic materials like fat or honey precisely because of their tendency to change over time; to halt that process would be to falsify the work in critical ways.\n\n" +
        "Ms Mancusi-Ungaro believes that artworks, like people, have a natural life cycle. 'It's impossible, if not misdirected, to try and make a work of art look the way it did when it was new,' she insisted. 'We have to accept aging, and in accepting, we have to understand what the artist was intending.' She recalled seeing a work by Robert Rauschenberg that had been damaged and then meticulously restored. 'This was an example where a conservator came in and, with the best of intentions and the best of skills, restored something in a way that made it stand out as being not by Rauschenberg.'\n\n" +
        "The establishment of the Center signals the transformation of modernism from the art of the now to an art for the ages. That x-rays, ultraviolet and infrared photography, and chemical analysis – tools used to probe works centuries old – are now being employed on more recent art confirms that modernism has entered history. High-tech tools can not only help conservators understand how a work was made but, when sensitively deployed, can help them recover the living artist from the evidence of the mute painting. Such an approach is much in evidence in the exhibition Mondrian: The Trans-Atlantic Paintings. The paintings there, begun by Piet Mondrian in Europe and completed in New York, were scrutinized using the latest scientific techniques. In this case, technical analysis revealed something unexpected in the character of the notably reserved Mondrian. 'What really surprised me,' curator Ron Spronk recalled, 'was the vigor and the incredible energy, how laborious these re-workings were and to what length Mondrian went to attain these paintings' serenely abstract works.'",
      questions: [
        {
          text: "The story of Dorian Gray reverses the usual expectation that works of art last while people age.",
          answer: "True",
          justification: "The story exactly reverses our expectations – that while life is a process of constant change and decay, the masterpieces of art will endure.",
        },
        {
          text: "Durable materials such as marble and bronze are unaffected by exposure to the elements.",
          answer: "False",
          justification: "Even materials as durable as marble and bronze will change colour and texture after prolonged contact with the elements.",
        },
        {
          text: "Many modern artists deliberately chose materials that were not intended to last.",
          answer: "True",
          justification: "Many of the new materials were never meant to last, reflecting a disdain for the artwork as a precious artifact.",
        },
        {
          text: "The Center for the Technical Study of Modern Art plans to record interviews with artists on video.",
          answer: "True",
          justification: "A goal of the center is to create an archive of videotaped interviews with artists.",
        },
        {
          text: "Conservators of modern art follow exactly the same principles as conservators of old master works.",
          answer: "False",
          justification: "The problems for the conservator of modern art differ fundamentally from those of conservators of old master works.",
        },
        {
          text: "Joseph Beuys used organic materials because he wanted his works to remain unchanged.",
          answer: "False",
          justification: "He used fat and honey precisely because of their tendency to change over time.",
        },
        {
          text: "The restoration of the Rauschenberg work made it look noticeably unlike his own work.",
          answer: "True",
          justification: "The restoration made it stand out as being not by Rauschenberg.",
        },
        {
          text: "Technical analysis of the Mondrian paintings revealed how much effort went into re-working them.",
          answer: "True",
          justification: "The curator was surprised by the vigour and incredible energy, and how laborious these re-workings were.",
        },
        {
          text: "The Mondrian exhibition attracted more visitors than any previous show at the museum.",
          answer: "Not given",
          justification: "Visitor numbers are never mentioned in the passage.",
        },
      ],
    },
  ],
};

const unit21Vocab: VocabWord[] = [
  {
    term: "assume",
    ipa: "/əˈsjuːm/",
    pos: "verb",
    usageNote: "nghĩa cho rằng điều gì đó đúng mà chưa có bằng chứng; danh từ là assumption",
    en: "to accept that something is true without proof",
    vi: "cho rằng, giả định",
    synonyms: ["presume", "suppose"],
    antonyms: ["verify"],
    examples: [
      { en: "It is reasonable to assume that dermatologists are similar to doctors.", vi: "Có thể hợp lý khi cho rằng bác sĩ da liễu cũng tương tự như bác sĩ." },
      { en: "The popular assumption is that women don't succeed in areas requiring spatial thinking.", vi: "Giả định phổ biến là phụ nữ không thành công trong những lĩnh vực đòi hỏi tư duy không gian." },
    ],
    ieltsTip: "Nhớ dạng danh từ \"assumption\" — rất hay xuất hiện trong Reading học thuật.",
    summary: "assume = giả định điều gì đó đúng (danh từ: assumption).",
  },
  {
    term: "derive",
    ipa: "/dɪˈraɪv/",
    pos: "verb",
    usageNote: "thường ở dạng bị động \"be derived from\" nghĩa là có nguồn gốc từ",
    en: "to get something from a particular source",
    vi: "bắt nguồn từ, chiết xuất từ",
    synonyms: ["obtain", "originate"],
    antonyms: [],
    examples: [
      { en: "Botox is a protein which is derived from a live bacteria.", vi: "Botox là một loại protein được chiết xuất từ vi khuẩn sống." },
      { en: "Many English words are derived from Latin.", vi: "Nhiều từ tiếng Anh bắt nguồn từ tiếng Latin." },
    ],
    ieltsTip: "Cấu trúc chuẩn: be derived FROM something.",
    summary: "derive = bắt nguồn/chiết xuất từ một nguồn nào đó.",
  },
  {
    term: "correlation",
    ipa: "/ˌkɒrəˈleɪʃn/",
    pos: "noun",
    usageNote: "chỉ mối liên hệ giữa hai yếu tố, khi cái này thay đổi thì cái kia cũng thay đổi",
    en: "a connection between two things in which one changes as the other does",
    vi: "mối tương quan",
    synonyms: ["link", "relationship"],
    antonyms: [],
    examples: [
      { en: "Researchers found a positive correlation between computer access at home and student academic performance.", vi: "Các nhà nghiên cứu tìm thấy mối tương quan thuận giữa việc có máy tính ở nhà và kết quả học tập của học sinh." },
      { en: "There is a strong correlation between income and life expectancy.", vi: "Có mối tương quan chặt chẽ giữa thu nhập và tuổi thọ." },
    ],
    ieltsTip: "\"A positive/strong/direct correlation between A and B\" — cụm rất hữu ích cho Writing Task 1.",
    summary: "correlation = mối tương quan giữa hai yếu tố.",
  },
  {
    term: "legislation",
    ipa: "/ˌledʒɪsˈleɪʃn/",
    pos: "noun",
    usageNote: "danh từ không đếm được, chỉ luật pháp do nhà nước ban hành",
    en: "a law or set of laws made by a government",
    vi: "đạo luật, pháp chế",
    synonyms: ["laws", "statutes"],
    antonyms: [],
    examples: [
      { en: "The government are planning to introduce new legislation that will set a minimum wage for all.", vi: "Chính phủ dự định ban hành đạo luật mới quy định mức lương tối thiểu cho tất cả mọi người." },
      { en: "Legislation alone will not change people's behaviour.", vi: "Chỉ riêng luật pháp sẽ không thay đổi được hành vi của con người." },
    ],
    ieltsTip: "Không đếm được — viết \"introduce legislation\", KHÔNG viết \"a legislation\" hay \"legislations\".",
    summary: "legislation = luật pháp do chính phủ ban hành (không đếm được).",
  },
  {
    term: "pursuit",
    ipa: "/pəˈsjuːt/",
    pos: "noun",
    usageNote: "chỉ việc theo đuổi một mục tiêu; dạng động từ là pursue",
    en: "the act of trying to achieve something",
    vi: "sự theo đuổi (mục tiêu)",
    synonyms: ["quest"],
    antonyms: ["abandonment"],
    examples: [
      { en: "Many people spend a great deal of money in the pursuit of happiness without ever finding it.", vi: "Nhiều người tiêu rất nhiều tiền để theo đuổi hạnh phúc mà không bao giờ tìm thấy nó." },
      { en: "She left her job in pursuit of a career in music.", vi: "Cô ấy nghỉ việc để theo đuổi sự nghiệp âm nhạc." },
    ],
    ieltsTip: "Cụm cố định: \"in pursuit of something\" — rất hợp cho Writing Task 2.",
    summary: "pursuit = sự theo đuổi một mục tiêu (động từ: pursue).",
  },
  {
    term: "ultimatum",
    ipa: "/ˌʌltɪˈmeɪtəm/",
    pos: "noun",
    usageNote: "chỉ tối hậu thư — lời cảnh báo cuối cùng kèm hậu quả nếu không tuân thủ",
    en: "a final warning that action will be taken unless something changes",
    vi: "tối hậu thư",
    synonyms: ["final demand"],
    antonyms: [],
    examples: [
      { en: "The school gave me an ultimatum because I had been absent for 40 days that year.", vi: "Nhà trường đưa ra tối hậu thư cho tôi vì tôi đã nghỉ 40 ngày trong năm đó." },
      { en: "The union issued an ultimatum to the management.", vi: "Công đoàn đã ra tối hậu thư cho ban quản lý." },
    ],
    ieltsTip: "Cùng gốc với \"ultimate\" (cuối cùng) — nhận ra họ từ giúp đoán nghĩa nhanh trong Reading.",
    summary: "ultimatum = tối hậu thư, lời cảnh báo cuối cùng.",
  },
  {
    term: "disproportionate",
    ipa: "/ˌdɪsprəˈpɔːʃənət/",
    pos: "adjective",
    usageNote: "mô tả tỷ lệ quá lớn hoặc quá nhỏ so với mức đáng lẽ phải có",
    en: "too large or too small in comparison with something else",
    vi: "không cân xứng, chiếm tỷ lệ bất thường",
    synonyms: ["excessive"],
    antonyms: ["proportionate"],
    examples: [
      { en: "The survey found that a disproportionate number of politicians send their children to private schools.", vi: "Khảo sát cho thấy một tỷ lệ bất thường các chính trị gia gửi con vào trường tư." },
      { en: "Housing takes up a disproportionate share of their income.", vi: "Chi phí nhà ở chiếm một phần thu nhập không cân xứng của họ." },
    ],
    ieltsTip: "Tiền tố \"dis-\" tạo nghĩa phủ định — nắm quy tắc tiền tố giúp đoán nghĩa từ mới rất nhanh.",
    summary: "disproportionate = không cân xứng, chiếm tỷ lệ bất thường.",
  },
  {
    term: "maintenance",
    ipa: "/ˈmeɪntənəns/",
    pos: "noun",
    usageNote: "chỉ việc bảo trì, giữ cho một thứ hoạt động tốt; động từ là maintain",
    en: "the work needed to keep something in good condition",
    vi: "việc bảo trì, bảo dưỡng",
    synonyms: ["upkeep"],
    antonyms: ["neglect"],
    examples: [
      { en: "Older houses generally require more maintenance than more modern houses.", vi: "Nhà cũ thường cần bảo trì nhiều hơn nhà hiện đại." },
      { en: "The maintenance of these machines is expensive.", vi: "Việc bảo dưỡng những cỗ máy này rất tốn kém." },
    ],
    ieltsTip: "Chú ý chính tả: mainTENance (không phải \"maintainance\") — lỗi viết sai rất phổ biến.",
    summary: "maintenance = công việc bảo trì, giữ cho vận hành tốt.",
  },
  {
    term: "authoritative",
    ipa: "/ɔːˈθɒrətətɪv/",
    pos: "adjective",
    usageNote: "mô tả giọng nói hoặc nguồn tin có uy quyền, khiến người khác tin và nghe theo",
    en: "showing that you are in control and expect to be obeyed; able to be trusted as accurate",
    vi: "đầy uy quyền; đáng tin cậy",
    synonyms: ["commanding", "reliable"],
    antonyms: ["hesitant"],
    examples: [
      { en: "The students immediately fell quiet when they heard the authoritative voice of their principal.", vi: "Học sinh lập tức im lặng khi nghe thấy giọng nói đầy uy quyền của thầy hiệu trưởng." },
      { en: "This is the most authoritative study on the subject.", vi: "Đây là nghiên cứu đáng tin cậy nhất về chủ đề này." },
    ],
    ieltsTip: "Đừng nhầm \"authoritative\" (uy tín, đáng tin) với \"authoritarian\" (độc đoán).",
    summary: "authoritative = uy quyền; hoặc đáng tin cậy về chuyên môn.",
  },
  {
    term: "methodology",
    ipa: "/ˌmeθəˈdɒlədʒi/",
    pos: "noun",
    usageNote: "chỉ hệ thống phương pháp được dùng trong nghiên cứu hoặc giảng dạy",
    en: "the set of methods used in a particular area of study",
    vi: "phương pháp luận, hệ phương pháp",
    synonyms: ["approach"],
    antonyms: [],
    examples: [
      { en: "The researchers explained their methodology in detail.", vi: "Các nhà nghiên cứu đã giải thích chi tiết phương pháp luận của họ." },
      { en: "Teaching methodology has changed a great deal in recent years.", vi: "Phương pháp giảng dạy đã thay đổi rất nhiều trong những năm gần đây." },
    ],
    ieltsTip: "\"Method\" là một cách làm cụ thể; \"methodology\" là cả hệ thống phương pháp.",
    summary: "methodology = hệ thống phương pháp trong nghiên cứu/giảng dạy.",
  },
  {
    term: "a labour of love",
    ipa: "/ə ˈleɪbər əv lʌv/",
    pos: "phrase",
    usageNote: "thành ngữ chỉ công việc vất vả nhưng làm vì yêu thích chứ không vì tiền",
    en: "hard work that you do because you enjoy it, not for money",
    vi: "việc làm vì đam mê (không vì tiền)",
    synonyms: [],
    antonyms: ["drudgery"],
    examples: [
      { en: "Restoring the old theatre was a labour of love for the volunteers.", vi: "Việc phục dựng nhà hát cũ là công việc vì đam mê của những tình nguyện viên." },
      { en: "Writing the book took ten years — it was a labour of love.", vi: "Viết cuốn sách mất mười năm — đó là công việc làm vì đam mê." },
    ],
    ieltsTip: "Thành ngữ này rất hợp khi kể về một dự án cá nhân trong Speaking Part 2.",
    summary: "a labour of love = việc vất vả làm vì yêu thích, không vì tiền.",
  },
  {
    term: "hindrance",
    ipa: "/ˈhɪndrəns/",
    pos: "noun",
    usageNote: "chỉ thứ gây cản trở; dạng động từ là hinder",
    en: "something that makes it more difficult to do something",
    vi: "trở ngại, vật cản trở",
    synonyms: ["obstacle", "impediment"],
    antonyms: ["help", "aid"],
    examples: [
      { en: "These new rules are more help than hindrance.", vi: "Những quy định mới này giúp ích nhiều hơn là gây cản trở." },
      { en: "The heavy equipment proved a hindrance on the narrow path.", vi: "Thiết bị nặng nề hoá ra lại là trở ngại trên con đường hẹp." },
    ],
    ieltsTip: "Mẹo đoán nghĩa: khi thấy \"more help than hindrance\", cấu trúc so sánh cho biết hindrance là trái nghĩa của help.",
    summary: "hindrance = thứ gây cản trở (động từ: hinder).",
  },
];

const UNIT_21_LEARNING_VOCABULARY: CambridgeUnit = {
  unit: 21,
  slug: "learning-vocabulary",
  title: "Learning vocabulary",
  topics: "Dictionaries, wordlists",
  testPractice: "Reference",
  steps: [
    {
      kind: "vocab",
      title: "Academic words in this unit",
      instructions: "These words come from the Academic Word List — exactly the kind of vocabulary you meet in IELTS Reading and Listening.",
      words: unit21Vocab,
    },
    {
      kind: "type_fill",
      title: "Choosing a dictionary",
      instructions: "Complete these notes about choosing and using a dictionary.",
      items: [
        { prompt: "Beginners often prefer to use a ___ dictionary (one that uses two languages).", answer: "bilingual" },
        { prompt: "Advanced students should use a dictionary that does not rely on ___.", answer: "translation" },
        { prompt: "You can ___ up the meaning of a word or phrase.", answer: "look" },
        { prompt: "You can check the ___ of a word and whether it has double letters.", answer: "spelling" },
        { prompt: "You can learn the correct ___ of words, ideally from a recording.", answer: "pronunciation" },
        { prompt: "You can also learn pronunciation from the ___ script (the symbols in slashes).", answer: "phonemic" },
        { prompt: "A good dictionary's ___ explain the meaning of a word in a simple way.", answer: "definitions" },
        { prompt: "It tells you how ___ a word is and whether it is mainly used for speaking or writing.", answer: "frequent" },
      ],
    },
    {
      kind: "type_fill",
      title: "Using a dictionary to find forms",
      instructions: "Use what a dictionary tells you to answer each question.",
      items: [
        { prompt: "The noun form of 'assume' is ___.", answer: "assumption" },
        { prompt: "The opposite of 'import' is ___.", answer: "export" },
        { prompt: "The correct spelling of the past tense of 'occur' is ___.", answer: "occurred" },
        { prompt: "Another noun form of the word 'method' is ___.", answer: "methodology" },
        { prompt: "The phrasal verb with 'factor' meaning 'to include something in a calculation' is to ___.", answer: "factor in" },
        { prompt: "The idiom with 'labour' meaning 'to work hard because you enjoy it' is a ___.", answer: "labour of love" },
      ],
    },
    {
      kind: "type_fill",
      title: "Changing the form of academic words",
      instructions: "Complete each sentence with the correct form of the word in brackets.",
      items: [
        { prompt: "The government are planning to introduce new ___ that will set a minimum wage for all. (legislate)", answer: "legislation" },
        { prompt: "Researchers found a positive ___ between computer access at home and academic performance. (correlate)", answer: "correlation" },
        { prompt: "Many people spend a great deal of money in the ___ of happiness without ever finding it. (pursue)", answer: "pursuit" },
        { prompt: "The school gave me an ___ because I had been absent for 40 days that year. (ultimate)", answer: "ultimatum" },
        { prompt: "The survey found that a ___ number of politicians send their children to private schools. (proportion)", answer: "disproportionate" },
        { prompt: "Older houses generally require more ___ than more modern houses. (maintain)", answer: "maintenance" },
        { prompt: "The students immediately fell quiet when they heard the ___ voice of their principal. (authority)", answer: "authoritative" },
        { prompt: "Botox is a protein which is ___ from a live bacteria. (derive)", answer: "derived" },
      ],
    },
    {
      kind: "sort",
      title: "Which words should you learn?",
      instructions: "In a typical academic text, about 80% of words are high frequency, 10% are academic and 10% are low frequency or technical. Sort these words from a reading passage about pigeons.",
      buckets: ["Learn these (high frequency / academic)", "Guess or ignore these (low frequency / technical)"],
      items: [
        { term: "identify", bucket: 0 },
        { term: "environment", bucket: 0 },
        { term: "complex", bucket: 0 },
        { term: "process", bucket: 0 },
        { term: "categories", bucket: 0 },
        { term: "constraints", bucket: 0 },
        { term: "version", bucket: 0 },
        { term: "whereas", bucket: 0 },
        { term: "utterly", bucket: 1 },
        { term: "stimuli", bucket: 1 },
        { term: "chaotic", bucket: 1 },
        { term: "neural", bucket: 1 },
        { term: "leafy", bucket: 1 },
        { term: "operant conditioning chamber", bucket: 1 },
        { term: "Skinner box", bucket: 1 },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Guessing meaning from context",
      instructions: "Tap each unfamiliar word to reveal what it means. In the IELTS test you are not expected to know technical words — you work them out.",
      pairs: [
        { prompt: "making pseudoscientific claims which are unsupported by scientific evidence", reveal: "pseudoscientific = not done in a scientific way" },
        { prompt: "these products give skin a healthy glow", reveal: "glow = to produce a continuous light" },
        { prompt: "these rules are more help than hindrance", reveal: "hindrance = something which makes it more difficult to do something" },
        { prompt: "pharmacists, doctors and dermatologists", reveal: "dermatologist = a doctor who treats skin diseases" },
        { prompt: "white lead caused hallucinations and convulsions", reveal: "hallucination = seeing something that does not exist; convulsion = uncontrollable muscle movement" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "How to work out an unknown word",
      instructions: "Tap each clue type to reveal how it helps you guess a word's meaning.",
      pairs: [
        { prompt: "The word is defined by a relative clause", reveal: "e.g. '...claims which are unsupported by scientific evidence' — the clause tells you the meaning" },
        { prompt: "The word is defined by an adjective", reveal: "e.g. 'a healthy glow' — the adjective shows what kind of thing it is" },
        { prompt: "The word is compared with another word", reveal: "e.g. 'more help than hindrance' — the contrast gives you the opposite meaning" },
        { prompt: "The word appears in a list", reveal: "e.g. 'pharmacists, doctors and dermatologists' — items in a list are usually similar" },
        { prompt: "The word is part of a cause and effect sentence", reveal: "e.g. 'lead resulted in hallucinations' — the cause tells you these must be symptoms" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Ways to learn new vocabulary",
      instructions: "Tap each method to see why it works. Tick the ones you already use — and try two new ones this week.",
      pairs: [
        { prompt: "Choose words from a list of frequent words", reveal: "You meet high frequency and academic words again and again, so they repay the effort" },
        { prompt: "Repeat words aloud", reveal: "You remember the oral as well as the visual aspect of the word" },
        { prompt: "Use a mind map", reveal: "Links words together into a topic, so one word helps you recall the others" },
        { prompt: "Use index cards with a synonym, antonym and translation on the back", reveal: "Forces active recall instead of passive recognition" },
        { prompt: "Record whether a word is formal, informal, positive or negative", reveal: "Stops you using the right meaning in the wrong situation" },
        { prompt: "Learn in sets of 18 or 36 words and revise before the next set", reveal: "Spaced revision moves words into long-term memory" },
        { prompt: "Use new words as often as possible", reveal: "Production, not just recognition, is what the Speaking and Writing tests reward" },
      ],
    },
  ],
};

const UNIT_22_IELTS_READING: CambridgeUnit = {
  unit: 22,
  slug: "ielts-reading",
  title: "IELTS Reading",
  topics: "Reading skills, question types",
  testPractice: "Reference",
  steps: [
    {
      kind: "reveal_pairs",
      title: "Timing in the Reading test",
      instructions: "You have 20 minutes for each passage and its 13–14 questions. Tap each stage to see how long it should take.",
      pairs: [
        { prompt: "Stage 1 — skim the passage and the items", reveal: "3–4 minutes: this gives you the gist of the passage and the types of question you need to answer" },
        { prompt: "Stage 2 — answer the questions", reveal: "13–14 minutes: if a question takes longer than a minute, move on and come back to it later" },
        { prompt: "Stage 3 — check and transfer your answers", reveal: "3–4 minutes: no extra time is given to transfer answers in the Reading test" },
        { prompt: "Reading speed", reveal: "A native speaker reads about 100 words in 20 seconds — practise reading a 100-word section in 30 seconds" },
      ],
    },
    {
      kind: "fill_mc",
      title: "One word, several meanings",
      instructions: "Choose the meaning each word has in this context: 'pecking at the good pictures would yield a grain reward, whereas... All of the pigeons learned to respond to good artwork... memorisation is probably not the main avenue by which they accomplished this.'",
      items: [
        { before: "In this context, 'yield' means", after: ".", options: ["produce", "agree", "give up"], answer: "produce" },
        { before: "In this context, 'respond' means", after: ".", options: ["react", "reply", "answer"], answer: "react" },
        { before: "In this context, 'avenue' means", after: ".", options: ["method", "road", "possibility"], answer: "method" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Referencing clues",
      instructions: "Pronouns and phrases like 'this strategy' link ideas together. Tap each one to see what it refers to.",
      pairs: [
        { prompt: "'they' (in 'the pigeons in this experiment... they')", reveal: "refers back to: pigeons" },
        { prompt: "'ones', 'those'", reveal: "refer back to: pictures" },
        { prompt: "'it'", reveal: "refers back to: the experiment" },
        { prompt: "'this strategy' — forwards or backwards?", reveal: "forwards — we learn what the strategy is in the words that follow" },
        { prompt: "'this possibility' — forwards or backwards?", reveal: "backwards — it points to the strategy that has just been explained" },
      ],
    },
    {
      kind: "reading_tfng",
      title: "Identifying information and the writer's claims",
      passageTitle: "Deliberate practice",
      passage:
        "A  Thirty years ago, two Hungarian educators, Laslo and Klara Polgar, decided to challenge the popular assumption that women don't succeed in areas requiring spatial thinking, such as chess. They wanted to make a point about the power of education. The Polgars home-schooled their three daughters, and as part of their education, the girls started playing chess with their parents at a very young age. Their systematic training and daily practice paid off. By 2000, all three daughters had been ranked in the top ten female players in the world. The youngest, Judit, had become a grandmaster at the age of 15, breaking the previous record by one month.\n\n" +
        "B  To people who have never reached a high level of competition in sport, it may appear that excellence is simply the result of playing daily for many years. However, simply living in a cave doesn't make you a geologist. Not all practice makes perfect. You need a particular kind of practice – deliberate practice – to develop expertise. Deliberate practice entails considerable, specific, and sustained effort. To illustrate this point, let's imagine you are learning to play golf. In the early phases, you try to learn the basic strokes and focus on avoiding embarrassing mistakes such as hitting another player with a ball. You practise with novices like yourself and, in a surprisingly short time, your game improves. You work on your skills and practise until your strokes become automatic. Your golf game is now a social outing, in which you occasionally concentrate on your shots.\n\n" +
        "C  However, from this point on, additional time on the golf course will not substantially improve your performance, which may remain at the same level for decades. Why does this happen? You don't improve, because when you are playing a game, you get only a single chance to make a shot from any given location. You don't get to figure out how you can correct mistakes. If you were allowed to take five to ten shots from the exact same location on the course, you would get more feedback on your technique and start to improve your control.\n\n" +
        "D  This kind of deliberate practice can be adapted to developing any kind of skill. Deliberate practice involves two kinds of learning: improving the skills you already have and extending the reach and range of your skills. The enormous concentration required to undertake these twin tasks limits the amount of time you can spend doing them. The famous violinist Nathan Milstein wrote: 'Practise as much as you feel you can accomplish with concentration. Once I asked my mentor, Leopold Auer, how many hours I should practise, and he said, \"It really doesn't matter how long. If you practise with your fingers, no amount is enough. If you practise with your head, two hours is plenty.\"'",
      questions: [
        {
          text: "Laslo Polgar gave up work in order to teach his children.",
          answer: "Not given",
          justification: "We know he helped home-school the children, but we are given no information about whether or not he worked as well.",
        },
        {
          text: "Judit Polgar was one month younger than the previous holder of the title of youngest chess grandmaster.",
          answer: "True",
          justification: "Judit had become a grandmaster at the age of 15, breaking the previous record by one month.",
        },
        {
          text: "Many people believe that women perform well in tasks requiring spatial thinking.",
          answer: "False",
          justification: "The passage refers to the popular assumption that women don't succeed in areas requiring spatial thinking.",
        },
        {
          text: "The Polgars might have produced the same results with a less punishing training schedule.",
          answer: "Not given",
          justification: "The writer expresses no personal opinion about the training schedule; we are only told it was successful.",
        },
        {
          text: "Playing a sport every day for years is enough on its own to produce excellence.",
          answer: "False",
          justification: "Not all practice makes perfect — you need deliberate practice to develop expertise.",
        },
        {
          text: "Taking several shots from the same position would give a golfer more feedback on their technique.",
          answer: "True",
          justification: "If you were allowed to take five to ten shots from the exact same location, you would get more feedback on your technique.",
        },
      ],
    },
    {
      kind: "fill_mc",
      title: "Question type 1 — objective items",
      instructions: "Answer these questions about the passage 'Deliberate practice'.",
      items: [
        { before: "MATCHING HEADINGS — the best heading for section A is", after: ".", options: ["Disproving a commonly held belief about gender", "High intelligence does not guarantee success", "Establishing a link between success and age"], answer: "Disproving a commonly held belief about gender" },
        { before: "MATCHING INFORMATION — 'an explanation of the type of preparation required to succeed' is found in section", after: ".", options: ["B", "A", "C"], answer: "B" },
        { before: "MATCHING INFORMATION — 'the specific aim of one particular experiment' is found in section", after: ".", options: ["A", "B", "D"], answer: "A" },
        { before: "MULTIPLE CHOICE — the writer mentions geologists in section B", after: ".", options: ["to illustrate the need for deliberate practice", "to represent a broad range of scientific study", "to provide an example of a field requiring special expertise"], answer: "to illustrate the need for deliberate practice" },
        { before: "MATCHING FEATURES — 'It is the quality rather than the quantity of practice that matters most' matches", after: ".", options: ["Milstein", "Polgar"], answer: "Milstein" },
        { before: "MATCHING FEATURES — 'Males and females have equal chances of achieving success' matches", after: ".", options: ["Polgar", "Milstein"], answer: "Polgar" },
        { before: "SENTENCE ENDINGS — When people begin to learn a new skill they may", after: ".", options: ["practise with people of a similar level", "practise as often and for as long as possible", "change the type of practice they do"], answer: "practise with people of a similar level" },
        { before: "SENTENCE ENDINGS — If people find it difficult to make any progress they should", after: ".", options: ["change the type of practice they do", "practise as often and for as long as possible", "practise with people of a similar level"], answer: "change the type of practice they do" },
      ],
    },
    {
      kind: "type_fill",
      title: "Question type 2 — productive items",
      instructions: "Complete each answer with words taken from the passage 'Deliberate practice'.",
      items: [
        { prompt: "SENTENCE COMPLETION — When people are learning a new skill, they often practise with other ___. (ONE WORD)", answer: "novices" },
        { prompt: "SENTENCE COMPLETION — Deliberate practice cannot be done for a long period of time because it requires a great deal of ___. (ONE WORD)", answer: "concentration" },
        { prompt: "SHORT ANSWER — Where were Laslo and Klara's children educated? (NO MORE THAN TWO WORDS)", answer: "at home" },
        { prompt: "NOTE COMPLETION — Deliberate practice requires a great deal of focused ___ over a long period of time. (ONE WORD)", answer: "effort" },
        { prompt: "NOTE COMPLETION — According to Milstein, practising for ___ hours each day may be enough to become an expert. (ONE WORD AND/OR A NUMBER)", answer: "two" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Diagram labels — a Doric column",
      instructions: "Diagram-label questions test whether you can match a description in the passage to a picture. Tap each part to reveal how the passage describes it.",
      pairs: [
        { prompt: "the capital", reveal: "the top of the column, which in the Doric order has two pieces" },
        { prompt: "the shaft", reveal: "the tall, vertical part of the column, with 20 sides, standing directly on the flat pavement" },
        { prompt: "the frieze", reveal: "the area above the column, consisting of the metopes and triglyphs" },
        { prompt: "a metope", reveal: "a plain rectangular element filling the space between two decorated triglyphs" },
        { prompt: "a triglyph", reveal: "a decorated element thought to represent wooden beam ends" },
        { prompt: "the pediment", reveal: "the large triangular section of the roof supported by the frieze" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Question-type strategies",
      instructions: "Tap each question type to reveal the key thing to remember about it.",
      pairs: [
        { prompt: "Matching headings vs matching information", reveal: "Headings cover the MAIN POINT of a section; matching information items focus on SPECIFIC DETAILS within it" },
        { prompt: "True / False / Not given", reveal: "Focuses on concrete FACTS in the passage" },
        { prompt: "Yes / No / Not given", reveal: "Focuses on the writer's CLAIMS or OPINIONS" },
        { prompt: "False/No vs Not given", reveal: "False/No items say the OPPOSITE of the passage; Not given items are neither true nor false because the information isn't there" },
        { prompt: "Matching features", reveal: "The questions are NOT in the same order as the passage — scan for the names first" },
        { prompt: "Matching sentence endings", reveal: "The sentence beginnings follow the order of the passage, but the endings are out of order" },
        { prompt: "All productive items", reveal: "Check what type of word is needed (noun? number? date?) — you score nothing if you write too many words or copy them incorrectly" },
      ],
    },
  ],
};

const UNIT_23_IELTS_WRITING: CambridgeUnit = {
  unit: 23,
  slug: "ielts-writing",
  title: "IELTS Writing",
  topics: "Writing Task 1, Writing Task 2",
  testPractice: "Reference",
  steps: [
    {
      kind: "writing_task",
      title: "Writing Task 1 — describing a bar chart",
      taskLabel: "Writing Task 1",
      prompt:
        "The charts below show the results of a weight assessment of the inhabitants of Newtown in 1950 and in 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chartCaption: "Weight assessment of inhabitants of Newtown (percentage of each age group)",
      chartRows: [
        "2010 — 20–29: underweight 20%, ideal 72%, overweight 4%, obese 4%",
        "2010 — 30–39: underweight 2%, ideal 52%, overweight 36%, obese 10%",
        "2010 — 40–49: underweight 2%, ideal 40%, overweight 33%, obese 25%",
        "2010 — 50–59: underweight 2%, ideal 42%, overweight 5%, obese 51%",
        "2010 — 60–69: underweight 0%, ideal 15%, overweight 25%, obese 60%",
        "1950 — 20–29: underweight 21%, ideal 71%, overweight 8%, obese 0%",
        "1950 — 30–39: underweight 25%, ideal 60%, overweight 15%, obese 0%",
        "1950 — 40–49: underweight 22%, ideal 60%, overweight 15%, obese 3%",
        "1950 — 50–59: underweight 30%, ideal 55%, overweight 12%, obese 3%",
        "1950 — 60–69: underweight 40%, ideal 48%, overweight 10%, obese 2%",
      ],
      chart: {
        kind: "stackedBar",
        panels: [
          {
            title: "2010",
            series: [
              { key: "under", label: "Underweight" },
              { key: "ideal", label: "Ideal" },
              { key: "over", label: "Overweight" },
              { key: "obese", label: "Obese" },
            ],
            groups: [
              { label: "20–29", values: { under: 20, ideal: 72, over: 4, obese: 4 } },
              { label: "30–39", values: { under: 2, ideal: 52, over: 36, obese: 10 } },
              { label: "40–49", values: { under: 2, ideal: 40, over: 33, obese: 25 } },
              { label: "50–59", values: { under: 2, ideal: 42, over: 5, obese: 51 } },
              { label: "60–69", values: { under: 0, ideal: 15, over: 25, obese: 60 } },
            ],
          },
          {
            title: "1950",
            series: [
              { key: "under", label: "Underweight" },
              { key: "ideal", label: "Ideal" },
              { key: "over", label: "Overweight" },
              { key: "obese", label: "Obese" },
            ],
            groups: [
              { label: "20–29", values: { under: 21, ideal: 71, over: 8, obese: 0 } },
              { label: "30–39", values: { under: 25, ideal: 60, over: 15, obese: 0 } },
              { label: "40–49", values: { under: 22, ideal: 60, over: 15, obese: 3 } },
              { label: "50–59", values: { under: 30, ideal: 55, over: 12, obese: 3 } },
              { label: "60–69", values: { under: 40, ideal: 48, over: 10, obese: 2 } },
            ],
          },
        ],
      },
      minWords: 150,
      tip:
        "Bài Task 1 phải có: introduction (viết lại đề bằng từ của bạn), overview (xu hướng chính) và tất cả các số liệu nổi bật — đủ mọi nhóm tuổi, mọi hạng cân và các xu hướng chính. Error warning: dùng \"amount\" với danh từ không đếm được và \"number\" với danh từ đếm được; \"per cent\" luôn đi kèm con số, còn \"percentage\" đứng một mình. Dành khoảng 20 phút và viết ít nhất 150 từ.",
      modelAnswer:
        "The chart summarises the weight measurements of people living in Newtown in 2010.\n\n" +
        "When it comes to weight, the healthiest age group is the 20-to-29 year-olds. More than 70% of the people in this age group are classified as maintaining a healthy weight. Less than five per cent of this age group is considered to be obese or overweight. In fact, a fifth are considered to actually weigh less than is considered healthy.\n\n" +
        "Just over half of those in their 30s are considered to have an ideal weight. This figure remains fairly constant up to the age of 59. But only 5% of residents in their 60s are considered to be at a healthy weight.\n\n" +
        "The proportion of Newtown inhabitants who are overweight or obese increases steadily with age and more than half of the fifty-somethings are categorised as obese. By the age of 60, more than 80% of the population is considered to be overweight to some degree. Being underweight as a problem is mainly restricted to the youngest age group and those most advanced in age.\n\n" +
        "Overall, it's clear from the chart that in Newtown there seems to be a direct link between age and weight gain.",
    },
    {
      kind: "fill_mc",
      title: "Language for describing figures",
      instructions: "Choose the correct alternative in this model answer comparing the two charts.",
      items: [
        { before: "In 1950, the youngest age group had the fewest", after: "of weight issues.", options: ["number", "amount"], answer: "number" },
        { before: "Being underweight affected more than twenty", after: "of each age group.", options: ["per cent", "percentage"], answer: "per cent" },
        { before: "In stark contrast to this,", after: "2010, being underweight was only a problem among 20–29-year-olds.", options: ["in", "for"], answer: "in" },
        { before: "The number of underweight elderly people had fallen", after: "10%.", options: ["to", "by"], answer: "to" },
        { before: "There was a", after: "increase in this problem in almost every age group over 29.", options: ["steady", "steadily"], answer: "steady" },
        { before: "By the age of 60, less than 50%", after: "each age group was considered to have a perfect weight.", options: ["of", "in"], answer: "of" },
        { before: "This is a fall of 10% compared", after: "the same age group in 1950.", options: ["to", "of"], answer: "to" },
        { before: "When", after: "the two years, it is clear that there has been a significant increase.", options: ["comparing", "compared"], answer: "comparing" },
        { before: "There has been a significant increase", after: "the number of obese people in Newtown.", options: ["in", "of"], answer: "in" },
        { before: "There was a general drop", after: "the number of underweight people between 1950 and 2010.", options: ["in", "of"], answer: "in" },
      ],
    },
    {
      kind: "sort",
      title: "Describing plans — now or after?",
      instructions: "In Task 1 you may have to describe two plans of the same place. Sort these words into the ones that describe the situation now and the ones that describe the proposed situation.",
      buckets: ["Now", "After the changes"],
      items: [
        { term: "current", bucket: 0 },
        { term: "existing", bucket: 0 },
        { term: "at present", bucket: 0 },
        { term: "proposed", bucket: 1 },
        { term: "future", bucket: 1 },
        { term: "planned", bucket: 1 },
        { term: "expected", bucket: 1 },
        { term: "anticipated", bucket: 1 },
        { term: "prospective", bucket: 1 },
      ],
    },
    {
      kind: "writing_task",
      title: "Writing Task 1 — describing plans",
      taskLabel: "Writing Task 1",
      prompt:
        "The plans show proposed changes to a university art gallery. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chartCaption: "University art gallery, Mill Road — now and after the proposed changes",
      chartRows: [
        "NOW — entrance on the right-hand side, leading into a lobby",
        "NOW — exhibition space divided into three separate areas",
        "NOW — an office made up of small rooms on the far left of the building",
        "AFTER — entrance widened and moved so that visitors enter the main exhibition area directly",
        "AFTER — dividing walls removed to create one large exhibition space with a large central wall",
        "AFTER — the office area opened up to create a further large exhibition space",
        "AFTER — the existing lobby replaced and enlarged to become an education centre with a large table and seating",
      ],
      minWords: 150,
      tip:
        "Hãy dùng các động từ mô tả thay đổi: enlarge, widen, divide, replace, move, convert, relocate, demolish, renovate, extend, develop, modify. Nhớ dùng thì hiện tại cho hiện trạng và \"will be + V3\" cho phần dự kiến.",
      modelAnswer:
        "The plans show the modifications that a university would like to make to its art gallery. The image on the top shows the art gallery as it is at present and the image below that shows the art gallery once the renovations have been completed.\n\n" +
        "As can be seen from the first image, the current entrance to the gallery is on the right hand side of the building and visitors pass through a large lobby before entering the gallery itself. One of the proposed changes is to allow entrance on to the main exhibition area, where an existing entrance will be widened. At present, the exhibition rooms are divided into three separate areas. According to the plans, the dividing walls will be removed and one large exhibition space will be created. Art can then be displayed on the walls around the room as well as on a large central wall.\n\n" +
        "A further major change is to an area on the far left of the building that is used as an office at present. This area is currently divided into small rooms, but will be opened up to create one large exhibition space. In addition, the gallery will gain an education centre. This area will replace the existing lobby, which will also be enlarged to create a more functional space with a large table and seating.\n\n" +
        "If these plans are carried out, then not only will the art gallery increase the exhibition areas but will also gain an educational facility. Relocating the entrance to the gallery will give visitors an immediate view of the main exhibition areas.",
    },
    {
      kind: "sort",
      title: "Planning a Task 2 essay",
      instructions: "Question: 'Tourism has increased so much over the last 50 years that it is having a mainly negative impact on local inhabitants and the environment. However, others claim that it is good for the economy.' Sort these ideas. (Note: 'climate change', 'expenses associated with travel' and 'places I would like to visit' are irrelevant to this question — leave them out of your essay.)",
      buckets: ["Advantage", "Disadvantage"],
      items: [
        { term: "local people have more money to spend", bucket: 0 },
        { term: "infrastructure improves", bucket: 0 },
        { term: "boost to the economy", bucket: 0 },
        { term: "increased jobs", bucket: 0 },
        { term: "local government may have more money to spend on environment", bucket: 0 },
        { term: "environmental damage", bucket: 1 },
        { term: "graffiti or littering", bucket: 1 },
        { term: "erosion from water sports", bucket: 1 },
        { term: "erosion of local culture and customs", bucket: 1 },
        { term: "damage to historical monuments", bucket: 1 },
      ],
    },
    {
      kind: "fill_mc",
      title: "Linking your ideas",
      instructions: "Choose the correct alternative to link these ideas accurately.",
      items: [
        { before: "", after: "there are clear benefits of tourism, there are also several drawbacks.", options: ["Although", "Despite", "However"], answer: "Although" },
        { before: "", after: "the fact that tourism has clear benefits, there are also several drawbacks.", options: ["Despite", "Although", "However"], answer: "Despite" },
        { before: "Tourism clearly has many benefits.", after: ", it also has considerable drawbacks.", options: ["However", "Although", "Despite"], answer: "However" },
        { before: "Several historical monuments are showing signs of damage", after: "the thoughtless acts of tourists.", options: ["because of", "because"], answer: "because of" },
        { before: "Several historical monuments are showing damage", after: "tourists have behaved irresponsibly.", options: ["because", "because of"], answer: "because" },
        { before: "The government could try to introduce", after: "system which limits the number of tourists allowed into an area.", options: ["a", "the"], answer: "a" },
        { before: "Additional facilities such as", after: "extra buses could be provided during the tourist season.", options: ["—  (no article)", "the"], answer: "—  (no article)" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "What the examiner is looking for (lexical resource)",
      instructions: "Tap each band score to reveal what it means for vocabulary. Note the words in bold in the official descriptors.",
      pairs: [
        { prompt: "Band 9", reveal: "uses a WIDE range of vocabulary with very NATURAL and SOPHISTICATED control; rare minor errors occur only as 'slips'" },
        { prompt: "Band 8", reveal: "uses a WIDE range fluently and flexibly to convey PRECISE meanings; skilfully uses UNCOMMON lexical items; rare errors in spelling or word formation" },
        { prompt: "Band 7", reveal: "uses a SUFFICIENT range for some flexibility and precision; uses LESS COMMON items with some awareness of STYLE and COLLOCATION; occasional errors" },
        { prompt: "Band 6", reveal: "uses an ADEQUATE range; ATTEMPTS less common vocabulary but with some inaccuracy; some errors that do not IMPEDE COMMUNICATION" },
        { prompt: "Band 5", reveal: "uses a LIMITED range, minimally adequate; NOTICEABLE errors that may CAUSE SOME DIFFICULTY for the reader" },
        { prompt: "Which introduction sounds natural?", reveal: "Script C — it does not copy from the question and reads fluently" },
        { prompt: "Which introduction copies words from the question?", reveal: "Script A — copied words score you nothing" },
        { prompt: "Which introduction has careless spelling mistakes?", reveal: "Script C" },
        { prompt: "Which introduction has errors in word formation?", reveal: "Script B (e.g. 'dramaticaly', 'developping', 'definitly')" },
        { prompt: "What band would each introduction get for lexical resource?", reveal: "Script A = band 5 (too much copied from the question); Script B = band 7 (attempts at higher-level language, errors don't obscure the message); Script C = band 8 (fluent, natural, little copied — only rare spelling slips)" },
      ],
    },
    {
      kind: "type_fill",
      title: "The eleven words candidates misspell most",
      instructions: "These are the most common spelling mistakes made by candidates at Band 6 and above. Type each word correctly.",
      items: [
        { prompt: "goverment →", answer: "government" },
        { prompt: "enviroment →", answer: "environment" },
        { prompt: "thier →", answer: "their" },
        { prompt: "diffrent →", answer: "different" },
        { prompt: "belive →", answer: "believe" },
        { prompt: "percentege →", answer: "percentage" },
        { prompt: "socity →", answer: "society" },
        { prompt: "untill →", answer: "until" },
        { prompt: "wich →", answer: "which" },
        { prompt: "nowdays →", answer: "nowadays" },
        { prompt: "definitly →", answer: "definitely" },
      ],
    },
    {
      kind: "writing_task",
      title: "Writing Task 2 — practice",
      taskLabel: "Writing Task 2",
      prompt:
        "Tourism has increased so much over the last 50 years that it is having a mainly negative impact on local inhabitants and the environment. However, others claim that it is good for the economy. Discuss the advantages and disadvantages of tourism and give your own opinion.",
      minWords: 250,
      tip:
        "Task 2 chiếm nhiều điểm hơn Task 1, nên hãy dành trọn 40 phút cho nó. Trước khi viết: chọn ý (bỏ những ý không liên quan), sắp xếp thành các đoạn, rồi liên kết bằng although/despite/however và because/because of cho chính xác. Đừng chép lại nguyên văn đề bài trong phần mở bài.",
      modelAnswer:
        "Whether or not tourist destinations benefit from international tourism is a debatable issue. To some governments, the local economic benefits are worth the overcrowding and hiked prices of the tourist season. However, there are environmental and social costs and other risks of relying on tourism as a major source of annual income.\n\n" +
        "Sleepy coastal communities can be changed beyond recognition by mass-market tourism. Package holiday companies operate huge numbers of low-cost flights to high-rise hotels in developing countries every summer. This means, of course, that easy money can be had servicing this seasonal influx and the government sees increased tax revenue and local employment. However, when the tourist season comes to an end, employment ceases and the area becomes a ghost town. The social cohesion of a small community can also be blighted by the seasonal migration of people to the cities to look for work out of season, leaving only the elderly behind. This is perhaps made worse by second home owners, who drive up house prices beyond the means of local inhabitants. On the other hand, the local community do gain language skills and other fringe benefits of cultural exchange.\n\n" +
        "Such a large volume of travellers every year can cause environmental problems to fragile habitats and historical sites. Age-old stone remains can be worn away and traditional buildings demolished in favour of bland international hotels. Local infrastructure can also fail to cope with large numbers of visitors, leading to pollution and litter. However, over time this can change as the economy improves and tourism becomes more of an established industry. Local government investment in infrastructure should ensure repeat trade and further benefits for the economy.\n\n" +
        "Overall, tourism can be a good source of income for countries blessed with natural beauty or sites of historical interest. However, governments must ensure that the wishes of local businesses are not put before the needs of the local community and that any revenue generated by tourism is reinvested in the area to protect the local environment.",
    },
  ],
};

const track39Script = `a  We have a larger group today and we are expecting about 15 people altogether.
b  It's room number 42.
c  My husband will be 55 next year.
d  It costs 50 dollars but I've only got 30.
e  There are a hundred people coming and we've only got 80 chairs so we need to order 20 more.
f  Your flight is on July the 23rd.
g  That won't do, I have a meeting on the 22nd.
h  I'm afraid she won't be back in the office until the 31st.
i  I ran in our local half marathon at the weekend and came 26th!
j  I need to organise a celebration for my sister's 40th birthday.`;

const track40Script = `1  Peter: Oh, I suppose you'll be needing my address? It's seven Eaton Gardens, Hamilton.
   Woman: Is that E.A.T.E.N?
   Peter: No, it's O.N.
2  Salesman: And I'll need a contact telephone number for you Mrs Smith. I've got your mobile number here, it's zero, four, five, five, triple six, nine, seven, five, two.
   Mrs Smith: That's correct, but I'm having a few problems with my mobile at the moment so I'll give you my home phone number. It's nine, five, six, two, double seven, oh, five.
3  Hotel receptionist: Now, breakfast is included in the cost of your stay and you have a choice of a full buffet breakfast or, for those who prefer a lighter option, we also offer a continental breakfast. So, if you wake up with a large appetite then you need to go our Ecco restaurant. That's E, double C, O. And if you want a smaller meal with a lovely view, then please join us at our Koffee Club, and that's Koffee with a K!`;

const track41Script = `1  It's very picturesque.
2  It has good rail links.
3  It's pretty strenuous work.
4  The hours are pretty flexible.
5  The area is barely adequate.`;

const track42Script = `1  We couldn't decide what approach to take so we searched for a precedent in the archive.
2  The field was unusual in its rich assemblage of archaeological finds.
3  The album's binding was fashioned from the finest Italian leather.
4  A jury should not interpret the silence of a defendant as a sign of guilt.
5  The book was heavily illustrated with stylised motifs.
6  Flammable toys like these are extremely dangerous, posing a significant risk to child safety.
7  In the fiercely competitive sphere of professional football, rules are frequently broken.`;

const track43Script = `John: Hi Anne, have you found a topic for your dissertation yet?
Anne: Oh. Hi John. Not really, but I just saw this amazing article about animal intelligence.
John: Oh, is it the one in the Animal Psychology journal with the monkeys? I read it too, it's a fascinating area.
Anne: Isn't it? It looks like there's a lot of new research coming out. I mean, we're always told 'it's commonly known that animals show intelligence when they use tools', but did you see the findings on the elephants at Bronx Zoo?
John: Yes I did, they put a mirror in their enclosure and the elephants, not only looked at themselves, but the research team were able to establish that the animals knew when they were looking at their own image and clearly showed recognition.
Anne: I know. It says here that no other animal apart from humans has demonstrated that kind of consciousness. Not even monkeys.
John: Well it sounds to me like this could be just the dissertation topic you wanted.
Anne: It does sound good doesn't it. I'd particularly like to look into the study on capuchin monkeys. They sound like real characters.
John: I know, but I'm not sure I'd like to have them on campus. Did you see they even managed to escape from their cage?
Anne: Yes, wasn't it great? And to think, a lot of people are still sceptical about animal intelligence. The standard criticism is that animals only really perform tricks because they've been taught to receive food rewards.
John: Well, the monkey case study certainly disproves that theory! Anyway, these are far more than tricks, in some cases it's about natural instincts and survival for these animals.
Anne: Yes, they said that in the bit about the scrub jay in North America. They prey on small animals and store them away. And they can also gauge how long they can keep the food until it's not safe to eat any more.
John: So, it basically has a planning capability. It's amazing to think an animal can determine its potential food supply like that, isn't it? Hey, your dissertation topic sounds more interesting than mine!`;

const track44Script = `Good morning everyone. In this opening part of the presentation I'll cover the recent work that the Biology department has been involved in based on animal intelligence. First I'll give you a bit of basic background. In 2001, we focused on monkeys and their capability to either fashion crude tools or take advantage of naturally occurring ones. Then in 2007, we turned our thoughts to higher-level thinking and, in particular, numeracy. We conducted a significant piece of research to find out whether birds are in fact able to count. The findings amazed everyone and caused quite a stir around the world. This helped to spur us on and allowed us to expand the department, making it the world-class facility it is today.
However, it's not without its drawbacks and there are several difficulties that are peculiar to this type of study. Firstly, this type of research is generally prolonged as we have to spend extensive periods gaining the animals' trust. In terms of resources, it can also be very costly to run as we need to employ a large number of supplementary staff to assist us for the length of the study. And finally, there is the question of the physical facilities themselves. We often have to try to find more space just to simply house the animals, which can be quite an arduous chore!
Which leads me to our present study, and the one we are going to look at today. Our subject this time, is elephants! We knew there was simply no way of accommodating them on campus so I have been carrying out fieldwork at the Bronx Zoo ...`;

const UNIT_24_IELTS_LISTENING: CambridgeUnit = {
  unit: 24,
  slug: "ielts-listening",
  title: "IELTS Listening",
  topics: "Section 1 and 2, Section 3 and 4",
  testPractice: "Reference",
  steps: [
    {
      kind: "listening_cloze",
      title: "Section 1 and 2 — hearing numbers",
      instructions: "Numbers like 15 and 50 sound very similar. Listen and type the number you hear (use figures).",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-39.mp3",
      template:
        "a  We have a larger group today and we are expecting about {{fifteen}} people altogether.\n" +
        "b  It's room number {{forty-two}}.\n" +
        "c  My husband will be {{fifty-five}} next year.\n" +
        "d  It costs 50 dollars but I've only got {{thirty}}.\n" +
        "e  There are a hundred people coming and we've only got {{eighty}} chairs.\n" +
        "f  Your flight is on July the {{twenty-third}}.\n" +
        "g  That won't do, I have a meeting on the {{twenty-second}}.\n" +
        "h  I'm afraid she won't be back in the office until the {{thirty-first}}.\n" +
        "i  I ran in our local half marathon at the weekend and came {{twenty-sixth}}!\n" +
        "j  I need to organise a celebration for my sister's {{fortieth}} birthday.",
      script: track39Script,
      tip: "Luyện nói to các cặp dễ nhầm: 15/50, 13/30, 18/80, và các số thứ tự 21st/23rd, 22nd/27th. Trong bài thi, trọng âm là dấu hiệu phân biệt: FIFteen ↔ fifTY.",
    },
    {
      kind: "listening_cloze",
      title: "Section 1 and 2 — names, numbers and spelling",
      instructions: "Listen and complete each sentence with NO MORE THAN THREE WORDS AND/OR A NUMBER.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-40.mp3",
      template:
        "1  Peter lives at seven {{Eaton}} Gardens, Hamilton.\n" +
        "2  Mrs Smith says the best number to call her on is her {{home}} phone.\n" +
        "3  The guests should go to the {{Ecco}} restaurant for a full breakfast.",
      script: track40Script,
      tip: "Người nói thường tự sửa lại ('That's correct, but...') — đáp án đúng luôn là thông tin CUỐI CÙNG họ xác nhận.",
    },
    {
      kind: "listening_cloze",
      title: "Section 1 and 2 — paraphrasing",
      instructions: "The recording rarely uses the same words as the question. Listen and complete what the speakers actually say.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-41.mp3",
      template:
        "1  It's very {{picturesque}}. (= The views are lovely.)\n" +
        "2  It has good {{rail links}}. (= The train services are good.)\n" +
        "3  It's pretty {{strenuous}} work. (= You need to be physically fit.)\n" +
        "4  The hours are pretty {{flexible}}. (= You can work any time.)\n" +
        "5  The area is barely {{adequate}}. (= It's not a very suitable location.)",
      script: track41Script,
      tip: "Đáp án gần như không bao giờ dùng đúng từ trong đề — hãy nghe Ý, đừng chờ nghe đúng từ.",
    },
    {
      kind: "type_fill",
      title: "Predicting from the headings",
      instructions: "Notes and table completion items have headings that tell you what kind of word to listen for. Type the word from the list (saves money, ferry, plumber, library, caravan, disease, sewing) that could appear under each heading.",
      items: [
        { prompt: "Accommodation →", answer: "caravan" },
        { prompt: "Occupation →", answer: "plumber" },
        { prompt: "Problems →", answer: "disease" },
        { prompt: "Facilities →", answer: "library" },
        { prompt: "Hobbies →", answer: "sewing" },
        { prompt: "Transportation →", answer: "ferry" },
        { prompt: "Advantages →", answer: "saves money" },
      ],
    },
    {
      kind: "type_fill",
      title: "Section 3 and 4 — academic synonyms",
      instructions: "Sections 3 and 4 use academic language. Type a simpler synonym for each word.",
      items: [
        { prompt: "analyse →", answer: "study" },
        { prompt: "approach →", answer: "method" },
        { prompt: "evidence →", answer: "proof" },
        { prompt: "percentage →", answer: "proportion" },
        { prompt: "interpret →", answer: "translate" },
        { prompt: "vary →", answer: "change" },
        { prompt: "response →", answer: "answer" },
        { prompt: "theory →", answer: "idea" },
        { prompt: "significance →", answer: "importance" },
        { prompt: "estimate →", answer: "guess" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Section 3 and 4 — words in academic contexts",
      instructions: "Listen and complete each sentence with the academic word you hear.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-42.mp3",
      template:
        "1  We couldn't decide what {{approach}} to take so we searched for a precedent in the archive.\n" +
        "2  The {{field}} was unusual in its rich assemblage of archaeological finds.\n" +
        "3  The album's binding was {{fashioned}} from the finest Italian leather.\n" +
        "4  A jury should not {{interpret}} the silence of a defendant as a sign of guilt.\n" +
        "5  The book was heavily {{illustrated}} with stylised motifs.\n" +
        "6  Flammable toys like these are extremely dangerous, {{posing}} a significant risk to child safety.\n" +
        "7  In the fiercely competitive {{sphere}} of professional football, rules are frequently broken.",
      script: track42Script,
      tip: "Nghe xong hãy làm tiếp bài tập sau để kiểm tra xem bạn có hiểu đúng NGHĨA của từ trong ngữ cảnh đó không.",
    },
    {
      kind: "fill_mc",
      title: "Same word, different context",
      instructions: "Many words have more than one meaning. Choose the meaning that fits the context you heard.",
      items: [
        { before: "'We couldn't decide what approach to take.' Here APPROACH means", after: ".", options: ["method", "come near"], answer: "method" },
        { before: "'The field was unusual in its rich assemblage of archaeological finds.' Here FIELD means", after: ".", options: ["land", "discipline"], answer: "land" },
        { before: "'The binding was fashioned from the finest Italian leather.' Here FASHION means", after: ".", options: ["manufacture", "clothes"], answer: "manufacture" },
        { before: "'A jury should not interpret the silence of a defendant as guilt.' Here INTERPRET means", after: ".", options: ["explain", "translate"], answer: "explain" },
        { before: "'The book was heavily illustrated with stylised motifs.' Here ILLUSTRATE means", after: ".", options: ["draw", "show"], answer: "draw" },
        { before: "'Flammable toys pose a significant risk to child safety.' Here POSE means", after: ".", options: ["cause", "pretend"], answer: "cause" },
        { before: "'In the fiercely competitive sphere of professional football...' Here SPHERE means", after: ".", options: ["area", "ball"], answer: "area" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Section 3 — two students discuss animal intelligence",
      instructions: "Listen to two students discussing animal psychology and complete the notes.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-43.mp3",
      template:
        "• Elephants at Bronx Zoo: a mirror was put in their enclosure and the research team established that the animals knew they were looking at their own image — they {{show self-awareness}}.\n" +
        "• Capuchin monkeys: John was surprised that they even managed to {{escape}} from their cage.\n" +
        "• Scrub jays in North America: they store food away and can gauge how long they can keep it, so they {{plan ahead}}.\n" +
        "• The standard criticism of animal intelligence research is that animals only perform {{tricks}} because they have been taught to receive food rewards.\n" +
        "• Anne read the article in the {{Animal Psychology}} journal and is looking for a topic for her {{dissertation}}.",
      script: track43Script,
      tip: "Trong dạng matching, hãy gạch chân từ khoá trong câu hỏi TRƯỚC khi nghe — bạn chỉ được nghe một lần duy nhất.",
    },
    {
      kind: "type_fill",
      title: "Academic paraphrase in Section 3",
      instructions: "Match each word from the conversation with a simpler synonym.",
      items: [
        { prompt: "findings →", answer: "results" },
        { prompt: "establish →", answer: "prove" },
        { prompt: "demonstrated →", answer: "shown" },
        { prompt: "consciousness →", answer: "awareness" },
        { prompt: "sceptical →", answer: "doubtful" },
        { prompt: "disproves →", answer: "contradicts" },
        { prompt: "gauge →", answer: "measure" },
        { prompt: "capability →", answer: "ability" },
        { prompt: "determine →", answer: "decide" },
      ],
    },
    {
      kind: "type_fill",
      title: "University vocabulary",
      instructions: "Complete each sentence with a word about university life: assignment, journal, presentation, dissertation, tutorial, study, fieldwork, campus, case study, tutor.",
      items: [
        { prompt: "The ___ is only to write a brief summary but it's taking forever and it's due in on Friday!", answer: "assignment" },
        { prompt: "This is the main university ___, which boasts superb facilities.", answer: "campus" },
        { prompt: "By the end of this week you should have booked a half-hour ___ to discuss your progress.", answer: "tutorial" },
        { prompt: "I usually dread having to give any kind of ___ but I'm pretty well-prepared for this one.", answer: "presentation" },
        { prompt: "If you refer to an extract from a particular ___ or periodical, you'll need to put that in the bibliography.", answer: "journal" },
        { prompt: "It's a Swedish ___ published in the Scandinavian Science Quarterly.", answer: "study" },
        { prompt: "Professor Atkins is the course ___ and lecturer in physical chemistry.", answer: "tutor" },
        { prompt: "We conducted extensive, topographical ___ in the region.", answer: "fieldwork" },
      ],
    },
    {
      kind: "listening_cloze",
      title: "Section 4 — notes completion",
      instructions: "Listen to the opening of a presentation about animal intelligence and complete the notes with NO MORE THAN ONE WORD for each answer.",
      audioUrl: "https://a8wdavlbr1kcxckb.public.blob.vercel-storage.com/cambridge-vocabulary-ielts/track-44.mp3",
      template:
        "Animal Intelligence\n\n" +
        "Previous studies\n" +
        "• 2001 — Monkeys and their use of {{tools}}\n" +
        "• 2007 — Birds and their ability to {{count}}\n\n" +
        "Challenges\n" +
        "• i) Need to have the animals' {{trust}}\n" +
        "• ii) Expense: need for extra staff\n" +
        "• iii) Facilities: need for extra {{space}}\n\n" +
        "Current study\n" +
        "• Elephants at the Bronx Zoo — the speaker is carrying out {{fieldwork}} there because there was no way of accommodating them on campus",
      script: track44Script,
      tip: "Dùng chính các tiêu đề trên đề (Previous studies / Challenges / Current study) làm bản đồ để bám theo bài nói — người nói sẽ đi đúng thứ tự đó.",
    },
    {
      kind: "type_fill",
      title: "Vocabulary from the Section 4 talk",
      instructions: "Type a simpler word or phrase with the same meaning.",
      items: [
        { prompt: "conduct (research) →", answer: "carry out" },
        { prompt: "a stir →", answer: "excitement" },
        { prompt: "spur →", answer: "encourage" },
        { prompt: "expand →", answer: "increase in size" },
        { prompt: "peculiar (to) →", answer: "specific" },
        { prompt: "prolonged →", answer: "time-consuming" },
        { prompt: "supplementary →", answer: "additional" },
        { prompt: "assist →", answer: "help" },
        { prompt: "arduous →", answer: "difficult" },
        { prompt: "a chore →", answer: "a task" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Listening test strategy",
      instructions: "Tap each tip to reveal what to do.",
      pairs: [
        { prompt: "You hear each section only once", reveal: "Don't lose careless marks in Sections 1 and 2 — listen for whether there is an 's' at the end of a word" },
        { prompt: "Take the word from the recording", reveal: "You won't need to change the words — copy exactly what you hear" },
        { prompt: "Question order", reveal: "The questions are always in the same order as the information in the recording" },
        { prompt: "Use the question paper", reveal: "The information on the paper helps you follow the talk or conversation" },
        { prompt: "Use the pauses", reveal: "Use the time you are given between sections to prepare for the next one" },
        { prompt: "Predict before you listen", reveal: "Read the questions and predict the topic and the type of word you need (noun? number? plural?)" },
      ],
    },
  ],
};

const UNIT_25_IELTS_SPEAKING: CambridgeUnit = {
  unit: 25,
  slug: "ielts-speaking",
  title: "IELTS Speaking",
  topics: "Part 1, Part 2, Part 3",
  testPractice: "Reference",
  steps: [
    {
      kind: "reveal_pairs",
      title: "What the examiner is listening for",
      instructions: "The Speaking score is based on four areas. Tap each band to reveal what it means for fluency, cohesion and vocabulary.",
      pairs: [
        { prompt: "The four criteria", reveal: "fluency and cohesion (how well ideas are linked) · lexical resource (vocabulary and phrases) · grammar · pronunciation" },
        { prompt: "Band 6", reveal: "willing to speak at length but may lose coherence through OCCASIONAL REPETITION, self-correction or hesitation; uses connectives but NOT ALWAYS APPROPRIATELY; generally paraphrases successfully" },
        { prompt: "Band 7", reveal: "hesitation is language-related at times; uses connectives and discourse markers WITH SOME FLEXIBILITY; uses SOME LESS COMMON and IDIOMATIC vocabulary; PARAPHRASES EFFECTIVELY" },
        { prompt: "Band 8", reveal: "speaks fluently with ONLY OCCASIONAL repetition; hesitation is CONTENT-related, only rarely to search for language; uses a WIDE vocabulary to convey PRECISE MEANING; uses idiomatic vocabulary SKILFULLY" },
        { prompt: "First impressions", reveal: "Smile and act confidently when you enter the room. The test starts when the examiner says: 'Now in this first part, I'd like to ask you some questions about yourself.'" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Judging three Part 1 answers",
      instructions: "Tap each candidate answer to reveal the band it would get, and why.",
      pairs: [
        {
          prompt: "'I usually go to shopping and I see my family and I see my friends and I go to work.'",
          reveal: "Below band 6 — the language is too simple and repetitive, there is no range of connectives, and the vocabulary is not wide enough to discuss the topic at length. (Corrected: 'I usually go shopping, see my family and friends, and go to work.' — even corrected, it is still too short.)",
        },
        {
          prompt: "'Erm, let me see, yes, actually, I'm planning on visiting my uncle and his family in Canada...'",
          reveal: "Band 8 — only occasional repetition, less common and idiomatic vocabulary, and the candidate paraphrases effectively ('a type of accountant... he's quite high up').",
        },
        {
          prompt: "'Well, on Saturdays I would normally get up quite early and doing some exercise...'",
          reveal: "Band 7 — there is some repetition (the word 'relax'), but also positive features of band 8 such as uncommon vocabulary ('a bit of a fitness fanatic').",
        },
      ],
    },
    {
      kind: "type_fill",
      title: "Pronunciation — vowel sounds",
      instructions: "Which key word has the same vowel sound as the underlined letters? Choose from: READ, SIT, BOOK, TOO, DAY, MEN, AMERICA, WORD, SORT, GO, CAT, BUT, PART, NOT, MY, HOW.",
      items: [
        { prompt: "h(ea)l →", answer: "read" },
        { prompt: "w(o)men →", answer: "sit" },
        { prompt: "b(u)tcher →", answer: "book" },
        { prompt: "sh(oe) →", answer: "too" },
        { prompt: "p(ai)nt →", answer: "day" },
        { prompt: "h(ea)lth →", answer: "men" },
        { prompt: "s(u)cceed →", answer: "america" },
        { prompt: "th(ir)d →", answer: "word" },
        { prompt: "t(a)lk →", answer: "sort" },
        { prompt: "expl(o)de →", answer: "go" },
        { prompt: "h(a)nd →", answer: "cat" },
        { prompt: "l(o)ve →", answer: "but" },
        { prompt: "c(a)n't →", answer: "part" },
        { prompt: "st(o)p →", answer: "not" },
        { prompt: "d(e)ny →", answer: "my" },
        { prompt: "f(ou)nd →", answer: "how" },
      ],
    },
    {
      kind: "type_fill",
      title: "Part 2 — linking your ideas",
      instructions: "Complete this Part 2 answer about a grandfather with a linking phrase: That's because · On top of that · But in spite of all of that · that's · When it comes to · What I mean is · Because of that · that's the reason · So, I would say",
      items: [
        { prompt: "The first person who comes to mind is my grandfather. ___, when he was young, he had a really hard life.", answer: "That's because" },
        { prompt: "When he was only 14, he had to go to work in the family business. ___, his own father became very ill.", answer: "On top of that" },
        { prompt: "___, whenever I think of my grandfather, I think of a man who is always happy and smiling.", answer: "But in spite of all of that" },
        { prompt: "I think ___ what makes him special — his outlook on life is always so positive.", answer: "that's" },
        { prompt: "___ the way that he's influenced me, I think he's made me a calmer person.", answer: "When it comes to" },
        { prompt: "___, he helped me to see that you can achieve a lot just by persevering.", answer: "What I mean is" },
        { prompt: "My grandfather taught me to relax and enjoy the work. ___, I learned to slow down.", answer: "Because of that" },
        { prompt: "And I'm sure ___ why I enjoy my work and my studies now.", answer: "that's the reason" },
        { prompt: "___ he has been a very big influence in my life so far.", answer: "So, I would say" },
      ],
    },
    {
      kind: "speaking",
      title: "Part 2 — practice",
      prompt: "Describe a person who has greatly influenced you in your life.",
      bullets: ["how you know them", "where or how you first met them", "what is special about them", "and explain how this person has influenced you so much"],
      prepSeconds: 60,
      talkSeconds: 120,
      tip:
        "Bạn có 1 phút để ghi chú. Hãy vẽ nhanh một mind map với các nhánh: how we know each other / where and how we met / why they are special / special qualities / how they have influenced me. Khi nói, dùng các cụm nối (That's because, On top of that, When it comes to...) và nếu bí ý thì dùng các câu câu giờ tự nhiên: \"Hmm, I'm not really sure about..., but I think...\", \"Well, I haven't really thought about this very much, but...\", \"Well, I suppose if I had to choose one thing, it would be...\". Nếu có thể, hãy ghi âm lại và nghe lại.",
    },
    {
      kind: "fill_mc",
      title: "Part 3 — matching answers to questions",
      instructions: "Part 3 asks less personal questions. Choose the question that each answer opening is responding to.",
      items: [
        { before: "'Hmm, that's an interesting question. I think many of the things we've achieved are positive, for example, the medical advances we've made. But on the other hand...' — This answers:", after: "", options: ["In what way will advances in scientific knowledge change our lives?", "Is progress always a good thing?", "What makes a good neighbour?"], answer: "In what way will advances in scientific knowledge change our lives?" },
        { before: "'I don't think they exist any more, do they? Actually, no, that's not true, my last neighbour was extremely friendly and helpful.' — This answers:", after: "", options: ["In your opinion, what makes a good neighbour?", "Are newspapers the best source of news?", "Is progress always a good thing?"], answer: "In your opinion, what makes a good neighbour?" },
        { before: "'That's true, I suppose. I mean, just look at how popular gossip columns are.' — This answers:", after: "", options: ["Are we too influenced by celebrities these days?", "What makes a good neighbour?", "Do workers want a lower retirement age?"], answer: "Are we too influenced by celebrities these days?" },
        { before: "'Well, I think they used to be, but nowadays there are so many other sources that are more immediate that it's difficult to say.' — This answers:", after: "", options: ["Are newspapers the best source of news?", "Is progress always a good thing?", "What negative effects does consumer society have?"], answer: "Are newspapers the best source of news?" },
        { before: "'I'm not so sure about that, maybe the reverse will be true... maybe people will start to move out of the cities instead of into them.' — This answers:", after: "", options: ["Will everyone live in cities in the future?", "Are newspapers the best source of news?", "Is progress always a good thing?"], answer: "Will everyone live in cities in the future?" },
        { before: "'Well, I think you only have to look at the mountains of rubbish we throw away each day and each year to see the biggest problem.' — This answers:", after: "", options: ["What negative effects does our consumer society have on our life?", "What makes a good neighbour?", "Do workers want a lower retirement age?"], answer: "What negative effects does our consumer society have on our life?" },
        { before: "'Well, I think it depends on what you mean by progress. Do you mean technological progress or progress in terms of the way we live?' — This answers:", after: "", options: ["Is progress always a good thing?", "Will everyone live in cities in the future?", "Are newspapers the best source of news?"], answer: "Is progress always a good thing?" },
        { before: "'That may be true to a certain extent, but I don't think it's true for everybody.' — This answers:", after: "", options: ["Do you agree that workers would like the retirement age to be lowered?", "What makes a good neighbour?", "Is progress always a good thing?"], answer: "Do you agree that workers would like the retirement age to be lowered?" },
      ],
    },
    {
      kind: "reveal_pairs",
      title: "Part 3 — useful ways to start an answer",
      instructions: "Tap each opening to see what it does for you.",
      pairs: [
        { prompt: "'Hmm, that's an interesting question...'", reveal: "Buys you thinking time without an awkward silence" },
        { prompt: "'Well, I think it depends on what you mean by...'", reveal: "Lets you define the topic and control the direction of your answer" },
        { prompt: "'That may be true to a certain extent, but...'", reveal: "Partly agrees, then adds your own view — shows a flexible use of language" },
        { prompt: "'I'm not so sure about that, maybe the reverse will be true.'", reveal: "Disagrees politely and opens up a longer answer" },
        { prompt: "'What I mean is...'", reveal: "Lets you rephrase and extend an idea — examiners reward effective paraphrase" },
        { prompt: "'I mean, just look at...'", reveal: "Introduces an example, which makes an answer longer and far more convincing" },
        { prompt: "Golden rule for Part 3", reveal: "Avoid talking about yourself — use examples from the news, or compare your country with others. Structure the answer with causes, results, reasons, examples and opinions." },
      ],
    },
    {
      kind: "speaking",
      title: "Part 3 — practice",
      prompt: "Answer these Part 3 discussion questions, giving as long and full an answer as you can.",
      bullets: [
        "Is progress always a good thing?",
        "Some people believe that in the future, everyone will live in cities. Do you agree?",
        "What negative effects does our consumer society have on our life?",
        "Are newspapers the best source of news?",
      ],
      prepSeconds: 30,
      talkSeconds: 180,
      tip:
        "Part 3 không có thời gian chuẩn bị trong bài thi thật — hãy tập trả lời ngay. Mỗi câu nên có: quan điểm → lý do → ví dụ → (mặt còn lại). Nếu có thể, hãy ghi âm rồi nghe lại: bạn có lặp từ không, có ngập ngừng để tìm từ không, và bạn có thể cải thiện câu trả lời như thế nào?",
    },
  ],
};

export const CAMBRIDGE_UNITS: CambridgeUnit[] = [
  UNIT_1_HUMAN_NATURE,
  UNIT_2_TIME_FOR_A_CHANGE,
  UNIT_3_NO_MAN_IS_AN_ISLAND,
  UNIT_4_SCIENTIFIC_DISCOVERY,
  UNIT_5_STRIVING_TO_ACHIEVE,
  UNIT_6_POWERS_OF_PERSUASION,
  UNIT_7_WAYS_AND_MEANS,
  UNIT_8_STATE_CONTROL,
  UNIT_9_NATURAL_HISTORY,
  UNIT_10_ROCKET_SCIENCE,
  UNIT_11_PROGRESS,
  UNIT_12_THE_LATEST_THING,
  UNIT_13_URBAN_JUNGLE,
  UNIT_14_TACKLING_ISSUES,
  UNIT_15_THIS_EARTH,
  UNIT_16_ENERGY_EFFICIENT,
  UNIT_17_GETTING_DOWN_TO_BUSINESS,
  UNIT_18_LAW_ENFORCEMENT,
  UNIT_19_THE_MEDIA,
  UNIT_20_A_MATTER_OF_TASTE,
  UNIT_21_LEARNING_VOCABULARY,
  UNIT_22_IELTS_READING,
  UNIT_23_IELTS_WRITING,
  UNIT_24_IELTS_LISTENING,
  UNIT_25_IELTS_SPEAKING,
];

export function getCambridgeUnit(slug: string): CambridgeUnit | undefined {
  return CAMBRIDGE_UNITS.find((u) => u.slug === slug);
}
