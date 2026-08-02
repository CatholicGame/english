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

export type UnitStep =
  | VocabStep
  | ListeningClozeStep
  | SortStep
  | FillMcStep
  | TypeFillStep
  | ReadingTfNgStep
  | RevealPairsStep
  | SpeakingStep;

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
  { unit: 2, slug: "time-for-a-change", title: "Time for a change", topics: "Time, change", testPractice: "Reading", available: false },
  { unit: 3, slug: "no-man-is-an-island", title: "No man is an island", topics: "Individuality, community", testPractice: "Writing Task 1", available: false },
  { unit: 4, slug: "scientific-discovery", title: "Scientific discovery", topics: "Chemistry, medicine", testPractice: "Reading", available: false },
  { unit: 5, slug: "striving-to-achieve", title: "Striving to achieve", topics: "Study, work", testPractice: "Speaking", available: false },
  { unit: 6, slug: "powers-of-persuasion", title: "Powers of persuasion", topics: "Advertising, marketing", testPractice: "Reading", available: false },
  { unit: 7, slug: "ways-and-means", title: "Ways and means", topics: "Tourism, travel", testPractice: "Writing Task 1", available: false },
  { unit: 8, slug: "state-control", title: "State control", topics: "Government, society", testPractice: "Writing Task 2", available: false },
  { unit: 9, slug: "natural-history", title: "Natural history", topics: "Animals, conservation", testPractice: "Reading", available: false },
  { unit: 10, slug: "rocket-science", title: "Rocket science", topics: "Space, physics", testPractice: "Listening Section 4", available: false },
  { unit: 11, slug: "progress", title: "Progress", topics: "Technology, design", testPractice: "Reading", available: false },
  { unit: 12, slug: "the-latest-thing", title: "The latest thing", topics: "Fashion and trends, consumerism", testPractice: "Reading", available: false },
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

export const CAMBRIDGE_UNITS: CambridgeUnit[] = [UNIT_1_HUMAN_NATURE];

export function getCambridgeUnit(slug: string): CambridgeUnit | undefined {
  return CAMBRIDGE_UNITS.find((u) => u.slug === slug);
}
