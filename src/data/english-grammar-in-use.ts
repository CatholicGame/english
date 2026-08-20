// Content sourced from "English Grammar in Use" (Raymond Murphy, Cambridge
// University Press, 5th ed. 2019) — docs/English_Grammar_in_Use_Intermediate_2019_5th-Ed.pdf.
// Each unit follows the book's own layout: a left-page grammar explanation
// (lettered sections A, B, C ...) then right-page exercises. Picture-dependent
// exercises (matching to an illustration) are skipped since there's no way to
// show the image — only text-only exercises are digitized.

export type GrammarItemType = "fill_mc" | "type_fill";

export interface GrammarExample {
  en: string;
  note?: string;
}

export interface RuleBlock {
  label?: string; // "A", "B", "C" ... matching the book's lettered sections
  heading?: string;
  body: string;
  examples: GrammarExample[];
}

export interface RuleStep {
  kind: "rule";
  title: string;
  blocks: RuleBlock[];
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

export interface AiPracticeStep {
  kind: "ai_practice";
  title: string;
  instructions: string;
  ruleSummary: string; // short EN description of the grammar point, sent to the AI for grading context
}

export type GrammarUnitStep = RuleStep | FillMcStep | TypeFillStep | AiPracticeStep;

export interface GrammarUnitMeta {
  unit: number;
  slug: string;
  title: string;
  topic: string;
  available: boolean;
}

export interface GrammarUnit {
  unit: number;
  slug: string;
  title: string;
  topic: string;
  steps: GrammarUnitStep[];
}

const UNIT_1_PRESENT_CONTINUOUS: GrammarUnit = {
  unit: 1,
  slug: "present-continuous",
  title: "Present continuous (I am doing)",
  topic: "Present and past",
  steps: [
    {
      kind: "rule",
      title: "Học quy tắc",
      blocks: [
        {
          label: "A",
          heading: "am/is/are + -ing",
          body: "Sarah is in her car. She is on her way to work. She's driving to work. This means: she is driving now, at the time of speaking. The action is not finished.",
          examples: [
            { en: "I am (I'm) driving" },
            { en: "he/she/it is (he's etc.) working" },
            { en: "we/you/they are (we're etc.) doing" },
          ],
        },
        {
          label: "B",
          heading: "I'm in the middle of doing it",
          body: "I am doing something = I started doing it and I haven't finished; I'm in the middle of doing it.",
          examples: [
            { en: "Please don't make so much noise. I'm trying to work.", note: "not I try" },
            { en: "Where's Mark? He's having a shower.", note: "not He has a shower" },
            { en: "Let's go out now. It isn't raining any more.", note: "not It doesn't rain" },
            { en: "How's your new job? Are you enjoying it?" },
          ],
        },
        {
          label: "C",
          heading: "today / this week / this year",
          body: "You can use the present continuous with today / this week / this year etc. (periods around now).",
          examples: [
            { en: "You're working hard today.", note: "not You work hard today" },
            { en: "The company I work for isn't doing so well this year." },
          ],
        },
        {
          label: "D",
          heading: "a change that is happening",
          body: "We use the present continuous when we talk about a change that has started to happen. We often use these verbs this way: getting, becoming, changing, improving, starting, beginning, increasing, rising, falling, growing.",
          examples: [
            { en: "Is your English getting better?", note: "not Does your English get better" },
            { en: "The population of the world is increasing very fast.", note: "not increases" },
          ],
        },
      ],
    },
    {
      kind: "fill_mc",
      title: "Ghép câu",
      instructions: "The sentences on the right follow those on the left. Which sentence goes with which?",
      items: [
        { before: "Please don't make so much noise.", after: "", options: ["I'm getting hungry.", "They're lying.", "It's starting to rain.", "I'm trying to work."], answer: "I'm trying to work." },
        { before: "We need to leave soon.", after: "", options: ["I'm getting hungry.", "It's getting late.", "I'm trying to work.", "They're lying."], answer: "It's getting late." },
        { before: "I don't have anywhere to live right now.", after: "", options: ["They're trying to sell it.", "I'm getting hungry.", "I'm staying with friends.", "The company is losing money."], answer: "I'm staying with friends." },
        { before: "I need to eat something soon.", after: "", options: ["I'm getting hungry.", "It's starting to rain.", "They're lying.", "I'm staying with friends."], answer: "I'm getting hungry." },
        { before: "They don't need their car any more.", after: "", options: ["They're trying to sell it.", "It's getting late.", "I'm getting hungry.", "The company is losing money."], answer: "They're trying to sell it." },
        { before: "Things are not so good at work.", after: "", options: ["The company is losing money.", "They're lying.", "It's starting to rain.", "I'm staying with friends."], answer: "The company is losing money." },
        { before: "It isn't true what they say.", after: "", options: ["They're lying.", "I'm trying to work.", "They're trying to sell it.", "It's getting late."], answer: "They're lying." },
        { before: "We're going to get wet.", after: "", options: ["It's starting to rain.", "I'm getting hungry.", "The company is losing money.", "I'm staying with friends."], answer: "It's starting to rain." },
      ],
    },
    {
      kind: "type_fill",
      title: "Điền đúng dạng động từ",
      instructions: "Put the verb into the correct form, positive (I'm doing etc.) or negative (I'm not doing etc.).",
      items: [
        { prompt: "Please don't make so much noise. ___ (I / try) to work.", answer: "I'm trying" },
        { prompt: "Let's go out now. ___ (it / rain) any more.", answer: "it isn't raining" },
        { prompt: "You can turn off the radio. ___ (I / listen) to it.", answer: "I'm not listening" },
        { prompt: "Andrew started evening classes recently. ___ (he / learn) Japanese.", answer: "he's learning" },
        { prompt: "The situation is already very bad and now ___ (it / get) worse.", answer: "it's getting" },
        { prompt: "Tim ___ (not / work) today. He's taken the day off.", answer: "isn't working" },
        { prompt: "___ (I / look) for Sophie. Do you know where she is?", answer: "I'm looking" },
        { prompt: "The washing machine has been repaired. ___ (it / work) now.", answer: "it's working" },
        { prompt: "Ben is a student, but he's not very happy. ___ (he / not / enjoy) his course.", answer: "he isn't enjoying" },
        { prompt: "Dan has been in the same job for a long time. ___ (he / start) to get bored with it.", answer: "he's starting" },
      ],
    },
    {
      kind: "ai_practice",
      title: "Luyện với AI",
      instructions: "Viết 2-3 câu tiếng Anh dùng đúng thì hiện tại tiếp diễn (present continuous) để mô tả một việc bạn đang làm dở hoặc một thay đổi đang diễn ra.",
      ruleSummary: "Present continuous (am/is/are + -ing): an action in progress right now, or around now, or a changing situation. Not used for permanent facts or habits (that's present simple).",
    },
  ],
};

const UNIT_2_PRESENT_SIMPLE: GrammarUnit = {
  "unit": 2,
  "slug": "present-simple",
  "title": "Present simple (I do)",
  "topic": "Present and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "Form: I/we/you/they drive, he/she/it drives",
          "body": "Alex is a bus driver, but right now he is in bed asleep, so he is not driving a bus at this moment. But in general, he drives a bus, he is a bus driver. Forms like drive(s), work(s), do(es) are the present simple. With I, we, you, they the verb keeps its base form; with he, she, it the verb adds -s (drives, works, does).",
          "examples": [
            {
              "en": "Alex is a bus driver, but now he is in bed asleep."
            },
            {
              "en": "He is not driving a bus. (He is asleep.)"
            },
            {
              "en": "He drives a bus. He is a bus driver."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Use: things in general, habits, permanent truths",
          "body": "We use the present simple to talk about things in general, to say that something happens all the time or repeatedly, or that something is true in general. Note the spelling changes for the he/she/it form: most verbs just add -s (I work, he works), but some change more, and have becomes has. For full spelling rules (-s or -es), see Appendix 6 of the book.",
          "examples": [
            {
              "en": "Nurses look after patients in hospitals."
            },
            {
              "en": "I usually go away at weekends."
            },
            {
              "en": "The earth goes round the sun."
            },
            {
              "en": "The cafe opens at 7.30 in the morning."
            },
            {
              "en": "I work but he works",
              "note": "he/she/it adds -s"
            },
            {
              "en": "you go but it goes",
              "note": "he/she/it adds -es"
            },
            {
              "en": "I have but he has",
              "note": "irregular"
            },
            {
              "en": "they teach but my sister teaches",
              "note": "he/she/it adds -es"
            }
          ]
        },
        {
          "label": "C",
          "heading": "Questions and negatives with do/does",
          "body": "We use do/does to make questions and negative sentences in the present simple. The main verb itself stays in its base form; do/does and don't/doesn't carry the question or negative meaning instead. Do can also be the main verb of the sentence at the same time as being the auxiliary, as in Do you do... or doesn't do....",
          "examples": [
            {
              "en": "I come from Canada. Where do you come from?"
            },
            {
              "en": "I don't go away very often."
            },
            {
              "en": "What does this word mean?",
              "note": "not What means this word?"
            },
            {
              "en": "Rice doesn't grow in cold climates."
            },
            {
              "en": "'What do you do?' 'I work in a shop.'"
            },
            {
              "en": "He's always so lazy. He doesn't do anything to help."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Saying how often we do things",
          "body": "We use the present simple with frequency words and expressions to say how often we do things, for example every morning, how often, very often, usually, two or three times a year.",
          "examples": [
            {
              "en": "I get up at 8 o'clock every morning."
            },
            {
              "en": "How often do you go to the dentist?"
            },
            {
              "en": "Julie doesn't drink tea very often."
            },
            {
              "en": "Robert usually goes away two or three times a year."
            }
          ]
        },
        {
          "label": "E",
          "heading": "I promise / I apologise (performative verbs)",
          "body": "Sometimes we do things simply by saying something, and we use the present simple for this. For example, when you promise to do something, you say I promise..., not I'm promising..., and when you suggest something, you say I suggest.... In the same way we use the present simple with verbs like apologise, advise, insist, agree, and refuse.",
          "examples": [
            {
              "en": "I promise I won't be late.",
              "note": "not I'm promising"
            },
            {
              "en": "'What do you suggest I do?' 'I suggest that you ...'"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "Chia động từ đúng dạng",
      "instructions": "Chia động từ trong ngoặc ở dạng đúng của thì hiện tại đơn, dùng do/does khi cần đặt câu hỏi hoặc câu phủ định.",
      "items": [
        {
          "prompt": "Julia ___ (not / drink) tea very often.",
          "answer": "doesn't drink"
        },
        {
          "prompt": "What time ___ (the banks / close) here?",
          "answer": "do the banks close"
        },
        {
          "prompt": "I have a car, but I ___ (not / use) it much.",
          "answer": "don't use"
        },
        {
          "prompt": "Where ___ (Maria / come) from? Is she Spanish?",
          "answer": "does Maria come"
        },
        {
          "prompt": "'What ___ (you / do)?' 'I'm an electrician.'",
          "answer": "do you do"
        },
        {
          "prompt": "Look at this sentence. What ___ (this word / mean)?",
          "answer": "does this word mean"
        },
        {
          "prompt": "David isn't very fit. He ___ (not / do) any sport.",
          "answer": "doesn't do"
        },
        {
          "prompt": "It ___ (take) me an hour to get to work in the morning.",
          "answer": "takes"
        },
        {
          "prompt": "How long ___ (it / take) you?",
          "answer": "does it take"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "Điền động từ thích hợp",
      "instructions": "Hoàn thành các câu sau bằng một động từ thích hợp trong danh sách: believe, eat, flow, go, grow, make, rise, tell, translate. Đôi khi bạn cần dùng dạng phủ định.",
      "items": [
        {
          "prompt": "The earth ___ round the sun.",
          "answer": "goes"
        },
        {
          "prompt": "Rice ___ in cold climates.",
          "answer": "doesn't grow"
        },
        {
          "prompt": "The sun ___ in the east.",
          "answer": "rises"
        },
        {
          "prompt": "Bees ___ honey.",
          "answer": "make"
        },
        {
          "prompt": "Vegetarians ___ meat.",
          "answer": "don't eat"
        },
        {
          "prompt": "An atheist ___ in God.",
          "answer": "doesn't believe"
        },
        {
          "prompt": "An interpreter ___ from one language into another.",
          "answer": "translates"
        },
        {
          "prompt": "Liars are people who ___ the truth.",
          "answer": "don't tell"
        },
        {
          "prompt": "The River Amazon ___ into the Atlantic Ocean.",
          "answer": "flows"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2 đến 3 câu tiếng Anh ở thì hiện tại đơn để diễn tả thói quen, việc lặp lại thường xuyên hoặc một sự thật hiển nhiên, nhớ thêm -s/-es cho động từ khi chủ ngữ là he/she/it và dùng do/does khi đặt câu hỏi hoặc câu phủ định.",
      "ruleSummary": "The present simple (I do / he does) is used for habits, routines, and general truths, things that happen regularly or are always true, not for actions happening right now. Third-person singular subjects (he/she/it) add -s or -es to the verb (he drives, she teaches, it goes), while other subjects use the base form of the verb. Questions and negatives are formed with do/does plus the base form of the main verb (Do you work? Where do you come from? She doesn't drive), never by conjugating the main verb itself in a question or negative. The present simple is also used with frequency expressions (usually, every day, how often) and with performative verbs like promise, suggest, apologise, insist, agree, refuse, where saying the word is itself the act."
    }
  ]
};

const UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1: GrammarUnit = {
  "unit": 3,
  "slug": "present-continuous-and-simple-1",
  "title": "Present continuous and present simple 1 (I am doing and I do)",
  "topic": "Present and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "Present continuous (I am doing) vs present simple (I do)",
          "body": "Use the present continuous for things happening at or around the time of speaking, when the action is not complete: something is going on right now, or these days, but it will not last forever. Use the present simple for things in general, for things that happen repeatedly, or for permanent facts and situations, not just for right now. The same contrast applies to temporary versus permanent situations: use the continuous for something that continues for a short time (a temporary arrangement), and the simple for something that continues for a long time (a permanent state).",
          "examples": [
            {
              "en": "The water is boiling. Be careful.",
              "note": "happening now"
            },
            {
              "en": "Water boils at 100 degrees Celsius.",
              "note": "general fact"
            },
            {
              "en": "Listen to those people. What language are they speaking?"
            },
            {
              "en": "Excuse me, do you speak English?"
            },
            {
              "en": "It isn't raining now."
            },
            {
              "en": "It doesn't rain very much in summer."
            },
            {
              "en": "I'm getting hungry. Let's go and eat.",
              "note": "happening now"
            },
            {
              "en": "I always get hungry in the afternoon.",
              "note": "repeated"
            },
            {
              "en": "Kate is learning Italian.",
              "note": "because she wants to work in Italy, for now"
            },
            {
              "en": "Most people learn to swim when they are children.",
              "note": "general"
            },
            {
              "en": "I'm living with some friends until I find a place of my own.",
              "note": "temporary"
            },
            {
              "en": "My parents live in London. They have lived there all their lives.",
              "note": "permanent"
            },
            {
              "en": "You're working hard today."
            },
            {
              "en": "Joe isn't lazy. He works hard most of the time."
            }
          ]
        },
        {
          "label": "B",
          "heading": "I always do vs I'm always doing",
          "body": "I always do something means I do it every time, without exception, so this uses the present simple, not the continuous. I'm always doing something has a different meaning: it means I do it too often, or more often than normal, and is often used to complain about a habit. This uses the continuous with always, even though the meaning is about repetition.",
          "examples": [
            {
              "en": "I always go to work by car.",
              "note": "not I'm always going"
            },
            {
              "en": "I've lost my keys again. I'm always losing them.",
              "note": "too often"
            },
            {
              "en": "Paul is never satisfied. He's always complaining.",
              "note": "he complains too much"
            },
            {
              "en": "You're always looking at your phone. Don't you have anything else to do?"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "Điền đúng dạng động từ (3.2)",
      "instructions": "Điền động từ trong ngoặc vào chỗ trống, chia ở thì hiện tại tiếp diễn hoặc hiện tại đơn cho phù hợp.",
      "items": [
        {
          "prompt": "___ (you / listen) to the radio? No, you can turn it off.",
          "answer": "Are you listening"
        },
        {
          "prompt": "___ (you / listen) to the radio a lot? No, not very often.",
          "answer": "Do you listen"
        },
        {
          "prompt": "The River Nile ___ (flow) into the Mediterranean.",
          "answer": "flows"
        },
        {
          "prompt": "The river ___ (flow) very fast today, much faster than usual.",
          "answer": "is flowing"
        },
        {
          "prompt": "I'm not very active. ___ (I / not / do) any sport.",
          "answer": "I don't do"
        },
        {
          "prompt": "What ___ (you / usually / do) at weekends?",
          "answer": "do you usually do"
        },
        {
          "prompt": "Rachel is in New York right now. ___ (She / stay) at the Park Hotel.",
          "answer": "She's staying"
        },
        {
          "prompt": "___ (She / always / stay) there when she's in New York.",
          "answer": "She always stays"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "Điền đúng dạng động từ (3.3)",
      "instructions": "Điền động từ trong ngoặc vào chỗ trống, chia ở thì hiện tại tiếp diễn hoặc hiện tại đơn cho phù hợp.",
      "items": [
        {
          "prompt": "Julia is good at languages. ___ (She / speak) four languages very well.",
          "answer": "She speaks"
        },
        {
          "prompt": "Are you ready yet? ___ (Everybody / wait) for you.",
          "answer": "Everybody's waiting"
        },
        {
          "prompt": "I've never heard this word. How ___ (you / pronounce) it?",
          "answer": "do you pronounce"
        },
        {
          "prompt": "Kate ___ (not / work) this week. She's on holiday.",
          "answer": "isn't working"
        },
        {
          "prompt": "I think my English ___ (improve) slowly. It's better than it was.",
          "answer": "is improving"
        },
        {
          "prompt": "Nicola ___ (live) in Manchester. She has never lived anywhere else.",
          "answer": "lives"
        },
        {
          "prompt": "Can we stop walking soon? ___ (I / start) to get tired.",
          "answer": "I'm starting"
        },
        {
          "prompt": "Sam and Tina are in Madrid right now. ___ (They / visit) a friend of theirs.",
          "answer": "They're visiting"
        },
        {
          "prompt": "What ___ (your father / do)? He's an architect.",
          "answer": "does your father do"
        },
        {
          "prompt": "It took me an hour to get to work this morning. Most days ___ (it / not / take) so long.",
          "answer": "it doesn't take"
        },
        {
          "prompt": "___ (I / learn) to drive. My driving test is next month.",
          "answer": "I'm learning"
        },
        {
          "prompt": "My father ___ (teach) me.",
          "answer": "is teaching"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2 đến 3 câu tiếng Anh, trong đó có ít nhất một câu dùng hiện tại tiếp diễn cho việc đang xảy ra ngay bây giờ hoặc một tình huống tạm thời, và một câu dùng hiện tại đơn cho một thói quen, sự thật chung hoặc tình huống lâu dài, hoặc thử dùng cấu trúc I'm always doing để than phiền về điều gì đó xảy ra quá thường xuyên.",
      "ruleSummary": "A sentence correctly uses this grammar point when the present continuous (am/is/are + -ing) is used for actions happening right now or around the time of speaking, or for temporary situations, and the present simple is used for general truths, repeated habits, and permanent situations. A sentence should be marked correct if it also correctly uses always with the present simple to mean every time, or always with the present continuous to mean an annoying, too-frequent habit; it should be marked incorrect if a stative or general-truth verb is wrongly put in the continuous, or if a right-now/temporary action is wrongly put in the simple."
    }
  ]
};

const UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2: GrammarUnit = {
  "unit": 4,
  "slug": "present-continuous-and-simple-2",
  "title": "Present continuous and present simple 2 (I am doing and I do)",
  "topic": "Present and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "Verbs not normally used in the continuous",
          "body": "We use continuous forms (I'm waiting, it's raining, etc.) for actions and happenings that have started but not finished. Some verbs, for example know and like, are not normally used this way. We don't say I am knowing or they are liking. We say I know, they like. Verbs not normally used in the present continuous include: like, want, need, prefer; know, realise, understand, recognise; believe, suppose, remember, mean; belong, fit, contain, consist, seem.",
          "examples": [
            {
              "en": "I'm hungry. I want something to eat.",
              "note": "not I'm wanting"
            },
            {
              "en": "Do you understand what I mean?"
            },
            {
              "en": "Anna doesn't seem very happy right now."
            }
          ]
        },
        {
          "label": "B",
          "heading": "think",
          "body": "When think means believe or have an opinion, we do not use the continuous. When think means consider (thinking about something, considering an action), the continuous is possible.",
          "examples": [
            {
              "en": "I think Mary is Canadian, but I'm not sure.",
              "note": "not I'm thinking"
            },
            {
              "en": "What do you think of my idea?",
              "note": "= what is your opinion?"
            },
            {
              "en": "I'm thinking about what happened. I often think about it."
            },
            {
              "en": "Nicky is thinking of giving up her job.",
              "note": "= she is considering it"
            }
          ]
        },
        {
          "label": "C",
          "heading": "see, hear, smell, taste, look, feel",
          "body": "We normally use the present simple, not continuous, with see, hear, smell and taste. You can use either the present simple or the present continuous to say how somebody looks or feels right now, but for a general habit with feel we use the simple form.",
          "examples": [
            {
              "en": "Do you see that man over there?",
              "note": "not are you seeing"
            },
            {
              "en": "The room smells. Let's open a window."
            },
            {
              "en": "This soup doesn't taste very good."
            },
            {
              "en": "You look well today. or You're looking well today."
            },
            {
              "en": "How do you feel now? or How are you feeling now?"
            },
            {
              "en": "I usually feel tired in the morning.",
              "note": "not I'm usually feeling"
            }
          ]
        },
        {
          "label": "D",
          "heading": "am/is/are being",
          "body": "You can say he's being..., you're being..., etc. to describe how somebody is behaving right now, that is, doing something they can control. This describes temporary behaviour, not a general characteristic. Compare: he's very selfish (a general, permanent quality) versus he's being selfish (behaving that way now). Am/is/are being is not usually possible with things a person cannot control, such as being ill or being tired.",
          "examples": [
            {
              "en": "I can't understand why he's being so selfish. He isn't usually like that."
            },
            {
              "en": "The path is icy. Don't slip. Don't worry, I'm being very careful."
            },
            {
              "en": "He never thinks about other people. He's very selfish.",
              "note": "he is selfish generally, not only now"
            },
            {
              "en": "I don't like to take risks. I'm a very careful person."
            },
            {
              "en": "Sam is ill.",
              "note": "not is being ill"
            },
            {
              "en": "Are you tired?",
              "note": "not are you being tired"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "Điền dạng đúng của động từ",
      "instructions": "Điền vào chỗ trống dạng đúng của động từ trong ngoặc, ở thì hiện tại tiếp diễn hoặc hiện tại đơn.",
      "items": [
        {
          "prompt": "Are you hungry? ___ (you / want) something to eat?",
          "answer": "Do you want"
        },
        {
          "prompt": "Alan says he's 90 years old, but nobody ___ (believe) him.",
          "answer": "believes"
        },
        {
          "prompt": "She told me her name, but ___ (I / not / remember) it now.",
          "answer": "I don't remember"
        },
        {
          "prompt": "Don't put the dictionary away. ___ (I / use) it.",
          "answer": "I'm using"
        },
        {
          "prompt": "Don't put the dictionary away. ___ (I / need) it.",
          "answer": "I need"
        },
        {
          "prompt": "Air ___ (consist) mainly of nitrogen and oxygen.",
          "answer": "consists"
        },
        {
          "prompt": "Who is that man? What ___ (he / want)?",
          "answer": "does he want"
        },
        {
          "prompt": "Who is that man? Why ___ (he / look) at us?",
          "answer": "is he looking"
        },
        {
          "prompt": "Who is that man? ___ (you / recognise) him?",
          "answer": "Do you recognise"
        },
        {
          "prompt": "___ (I / think) of selling my car. Would you be interested in buying it?",
          "answer": "I'm thinking"
        },
        {
          "prompt": "I can't make up my mind. What ___ (you / think) I should do?",
          "answer": "do you think"
        },
        {
          "prompt": "Gary wasn't well earlier, but ___ (he / seem) OK now.",
          "answer": "he seems"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "Is/are being hay is/are",
      "instructions": "Hoàn thành câu, dùng is/are being (thể tiếp diễn, chỉ cách cư xử nhất thời) hoặc is/are (thể đơn, chỉ tính cách hoặc trạng thái chung).",
      "items": [
        {
          "prompt": "You'll like Sophie when you meet her. She ___ very nice.",
          "answer": "is"
        },
        {
          "prompt": "Sarah ___ very nice to me at the moment. I wonder why.",
          "answer": "is being"
        },
        {
          "prompt": "They ___ very happy. They've just got married.",
          "answer": "are"
        },
        {
          "prompt": "You're normally very patient, so why ___ so unreasonable about waiting ten more minutes?",
          "answer": "are you being"
        },
        {
          "prompt": "Would you like something to eat? ___ hungry?",
          "answer": "Are you"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh: một câu dùng đúng một động từ trạng thái (như know, want, believe, seem) ở thì hiện tại đơn, và một câu dùng cấu trúc am/is/are being để diễn tả cách ai đó đang cư xử nhất thời.",
      "ruleSummary": "This unit covers verbs that are not normally used in the continuous form, such as like, want, know, believe, understand, seem, belong and consist; these take the present simple even to describe a current state. Think follows the simple form when it means believe or have an opinion, but can be continuous when it means consider. Verbs of perception (see, hear, smell, taste) normally use the present simple, while look and feel can take either simple or continuous to describe someone's current appearance or state. Am/is/are being plus an adjective is used only to describe temporary, controllable behaviour right now (e.g. being selfish, being careful), not a permanent trait or an uncontrollable state like being ill or tired, which always use the simple form."
    }
  ]
};

const UNIT_5_PAST_SIMPLE: GrammarUnit = {
  "unit": 5,
  "slug": "past-simple",
  "title": "Past simple (I did)",
  "topic": "Present and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "Ví dụ: Mozart",
          "body": "Wolfgang Amadeus Mozart was an Austrian musician and composer. He lived from 1756 to 1791, started composing at the age of five, and wrote more than 600 pieces of music. He was only 35 years old when he died. The verbs lived, started, wrote, was and died are all past simple; they describe actions and states that happened and finished in the past.",
          "examples": [
            {
              "en": "He lived from 1756 to 1791."
            },
            {
              "en": "He started composing at the age of five."
            },
            {
              "en": "He wrote more than 600 pieces of music."
            },
            {
              "en": "He was only 35 years old when he died."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Động từ có quy tắc (-ed) và bất quy tắc",
          "body": "Very often the past simple ends in -ed; these are called regular verbs. But many common verbs are irregular, so their past simple form does not end in -ed and simply has to be learned. For example, write becomes wrote, see becomes saw, go becomes went, and shut stays shut (some irregular verbs do not change at all).",
          "examples": [
            {
              "en": "I work in a travel agency now. Before that I worked in a department store."
            },
            {
              "en": "They invited us to their party, but we decided not to go."
            },
            {
              "en": "The police stopped me on my way home last night."
            },
            {
              "en": "Laura passed her exam because she studied very hard."
            },
            {
              "en": "Mozart wrote more than 600 pieces of music.",
              "note": "write becomes wrote"
            },
            {
              "en": "We saw Alice in town a few days ago.",
              "note": "see becomes saw"
            },
            {
              "en": "I went to the cinema three times last week.",
              "note": "go becomes went"
            },
            {
              "en": "It was cold, so I shut the window.",
              "note": "shut stays shut"
            }
          ]
        },
        {
          "label": "C",
          "heading": "Câu hỏi và phủ định: did/didn't + động từ nguyên mẫu",
          "body": "In questions and negative sentences, use did or didn't together with the base form of the verb (enjoy, see, go and so on), not the past tense form. Sometimes do itself is the main verb in the sentence, so a question becomes did you do and a negative becomes I didn't do.",
          "examples": [
            {
              "en": "I enjoyed the party a lot. Did you enjoy it?"
            },
            {
              "en": "How many people did they invite to the wedding?"
            },
            {
              "en": "I didn't buy anything because I didn't have any money."
            },
            {
              "en": "Did you go out? No, I didn't."
            },
            {
              "en": "What did you do at the weekend?",
              "note": "not What did you at the weekend?"
            },
            {
              "en": "I didn't do anything.",
              "note": "not I didn't anything"
            }
          ]
        },
        {
          "label": "D",
          "heading": "Quá khứ của be: was/were",
          "body": "The past form of am, is and are is was or were. Use was with I, he, she and it, and were with you, we and they. This applies in statements, questions and negatives (wasn't, weren't); notice that was/were is not used together with did.",
          "examples": [
            {
              "en": "I was annoyed because they were late."
            },
            {
              "en": "Was the weather good when you were on holiday?"
            },
            {
              "en": "They weren't able to come because they were so busy."
            },
            {
              "en": "I wasn't hungry, so I didn't eat anything."
            },
            {
              "en": "Did you go out last night or were you too tired?"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "5.2 Chia động từ bất quy tắc",
      "instructions": "Hoàn thành các câu sau bằng một động từ trong danh sách, chia đúng ở thì quá khứ đơn: buy, catch, cost, fall, hurt, sell, spend, teach, throw, write. Mỗi động từ chỉ dùng một lần (write đã được dùng làm ví dụ: Mozart wrote more than 600 pieces of music).",
      "items": [
        {
          "prompt": "'How did you learn to drive?' 'My father ___ me.'",
          "answer": "taught"
        },
        {
          "prompt": "We couldn't afford to keep our car, so we ___ it.",
          "answer": "sold"
        },
        {
          "prompt": "Dave ___ down the stairs this morning and hurt his leg.",
          "answer": "fell"
        },
        {
          "prompt": "Dave fell down the stairs this morning and ___ his leg.",
          "answer": "hurt"
        },
        {
          "prompt": "Joe ___ the ball to Sue, who caught it.",
          "answer": "threw"
        },
        {
          "prompt": "Joe threw the ball to Sue, who ___ it.",
          "answer": "caught"
        },
        {
          "prompt": "Kate ___ a lot of money yesterday.",
          "answer": "spent"
        },
        {
          "prompt": "She bought a coat which ___ 100 pounds.",
          "answer": "cost"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "5.4 Khẳng định hay phủ định",
      "instructions": "Chia động từ trong ngoặc ở thì quá khứ đơn, chọn dạng khẳng định hoặc phủ định cho phù hợp với ngữ cảnh của câu.",
      "items": [
        {
          "prompt": "I knew Sarah was busy, so I ___ her. (disturb)",
          "answer": "didn't disturb"
        },
        {
          "prompt": "We were very tired, so we ___ the party early. (leave)",
          "answer": "left"
        },
        {
          "prompt": "It was hard carrying the bags. They ___ really heavy. (be)",
          "answer": "were"
        },
        {
          "prompt": "The bed was very uncomfortable. I ___ well. (sleep)",
          "answer": "didn't sleep"
        },
        {
          "prompt": "This watch wasn't expensive. It ___ much. (cost)",
          "answer": "didn't cost"
        },
        {
          "prompt": "The window was open and a bird ___ into the room. (fly)",
          "answer": "flew"
        },
        {
          "prompt": "I was in a hurry, so I ___ time to call you. (have)",
          "answer": "didn't have"
        },
        {
          "prompt": "I didn't like the hotel. The room ___ very clean. (be)",
          "answer": "wasn't"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh ở thì quá khứ đơn kể về một việc bạn đã làm hôm qua hoặc tuần trước, chú ý chia đúng động từ (thêm -ed hoặc dùng dạng bất quy tắc) và dùng was/were, did/didn't khi cần.",
      "ruleSummary": "This rule covers the past simple tense (I did), used for actions and states that were completed in the past. Regular verbs add -ed (worked, invited, stopped, studied), while many common verbs are irregular and change form in an unpredictable way (write becomes wrote, see becomes saw, go becomes went, shut stays shut) and must be learned individually. Questions and negative sentences are formed with did or didn't followed by the base form of the verb, for example Did you enjoy it? and I didn't buy anything, never combining did with a verb that is already in the past tense. The past form of am, is and are is was (with I, he, she, it) or were (with you, we, they), used the same way in statements, questions and negatives (wasn't, weren't)."
    }
  ]
};

export const UNITS_META: GrammarUnitMeta[] = [
  { unit: 1, slug: UNIT_1_PRESENT_CONTINUOUS.slug, title: UNIT_1_PRESENT_CONTINUOUS.title, topic: UNIT_1_PRESENT_CONTINUOUS.topic, available: true },
  { unit: 2, slug: UNIT_2_PRESENT_SIMPLE.slug, title: UNIT_2_PRESENT_SIMPLE.title, topic: UNIT_2_PRESENT_SIMPLE.topic, available: true },
  { unit: 3, slug: UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1.slug, title: UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1.title, topic: UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1.topic, available: true },
  { unit: 4, slug: UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2.slug, title: UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2.title, topic: UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2.topic, available: true },
  { unit: 5, slug: UNIT_5_PAST_SIMPLE.slug, title: UNIT_5_PAST_SIMPLE.title, topic: UNIT_5_PAST_SIMPLE.topic, available: true },
];

export const GRAMMAR_UNITS: GrammarUnit[] = [UNIT_1_PRESENT_CONTINUOUS, UNIT_2_PRESENT_SIMPLE, UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1, UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2, UNIT_5_PAST_SIMPLE];

export function getGrammarUnit(slug: string): GrammarUnit | undefined {
  return GRAMMAR_UNITS.find((u) => u.slug === slug);
}
