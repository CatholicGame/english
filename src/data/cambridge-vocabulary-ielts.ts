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

export interface WritingTaskStep {
  kind: "writing_task";
  title: string;
  taskLabel: string;
  prompt: string;
  chartCaption?: string;
  chartRows?: string[];
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
  { unit: 13, slug: "urban-jungle", title: "Urban jungle", topics: "Rural life, city life", testPractice: "Listening Section 1", available: false },
  { unit: 14, slug: "tackling-issues", title: "Tackling issues", topics: "Problems, solutions", testPractice: "Writing Task 2", available: false },
  { unit: 15, slug: "this-earth", title: "This Earth", topics: "Natural phenomena, agriculture", testPractice: "Listening Section 3", available: false },
  { unit: 16, slug: "energy-efficient", title: "Energy efficient", topics: "Energy, natural resources", testPractice: "Writing Task 2", available: false },
  { unit: 17, slug: "getting-down-to-business", title: "Getting down to business", topics: "Management, personal finance", testPractice: "Reading", available: false },
  { unit: 18, slug: "law-enforcement", title: "Law enforcement", topics: "Crime, punishment", testPractice: "Writing Task 2", available: false },
  { unit: 19, slug: "the-media", title: "The media", topics: "Fame and the media, media bias", testPractice: "Speaking", available: false },
  { unit: 20, slug: "a-matter-of-taste", title: "A matter of taste", topics: "The arts, personal taste", testPractice: "Reading", available: false },
  { unit: 21, slug: "learning-vocabulary", title: "Learning vocabulary", topics: "Dictionaries, wordlists", testPractice: "Reference", available: false },
  { unit: 22, slug: "ielts-reading", title: "IELTS Reading", topics: "Reading skills, question types", testPractice: "Reference", available: false },
  { unit: 23, slug: "ielts-writing", title: "IELTS Writing", topics: "Writing Task 1, Writing Task 2", testPractice: "Reference", available: false },
  { unit: 24, slug: "ielts-listening", title: "IELTS Listening", topics: "Section 1 and 2, Section 3 and 4", testPractice: "Reference", available: false },
  { unit: 25, slug: "ielts-speaking", title: "IELTS Speaking", topics: "Part 1, Part 2, Part 3", testPractice: "Reference", available: false },
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
];

export function getCambridgeUnit(slug: string): CambridgeUnit | undefined {
  return CAMBRIDGE_UNITS.find((u) => u.slug === slug);
}
