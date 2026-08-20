// Content sourced from "English Grammar in Use" (Raymond Murphy, Cambridge
// University Press, 5th ed. 2019) — docs/English_Grammar_in_Use_Intermediate_2019_5th-Ed.pdf.
// Each unit follows the book's own layout: a left-page grammar explanation
// (lettered sections A, B, C ...) then right-page exercises. Every text-only
// exercise from the book is digitized; only exercises whose answers can't be
// derived without seeing the book's illustration are left out.

export type GrammarItemType = "fill_mc" | "type_fill" | "judge_correct";

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
  /** Same role as on TypeFillStep: the word bank or worked example the book
   * prints once above the whole exercise. */
  passage?: string;
  items: FillMcItem[];
}

export interface TypeFillItem {
  prompt: string;
  answer: string;
  /** Other wordings that are equally correct. The book prints one answer, but
   * exercises that ask the learner to write a whole question or sentence
   * ("Write questions", "Ask her") have several natural correct forms, and
   * exact-matching only the printed one marks good answers wrong. */
  accept?: string[];
}

export interface TypeFillStep {
  kind: "type_fill";
  title: string;
  instructions: string;
  /** Shared context shown above the items (a short reading passage, a list of
   * verbs to choose from, a dialogue setup) when the book's exercise has one. */
  passage?: string;
  items: TypeFillItem[];
}

/** The book's recurring "Are the underlined verbs OK? Correct them where
 * necessary" exercise: the learner first judges whether the highlighted part is
 * right, and only writes a correction when it isn't. Squeezing this into
 * type_fill would throw away the judgement half, which is the point of it. */
export interface JudgeCorrectItem {
  sentence: string;
  /** The exact substring of `sentence` the book underlines. */
  underlined: string;
  ok: boolean;
  /** Replacement for `underlined`, required when ok is false. */
  correction?: string;
  accept?: string[];
}

export interface JudgeCorrectStep {
  kind: "judge_correct";
  title: string;
  instructions: string;
  items: JudgeCorrectItem[];
}

export interface AiPracticeStep {
  kind: "ai_practice";
  title: string;
  instructions: string;
  ruleSummary: string; // short EN description of the grammar point, sent to the AI for grading context
}

export type GrammarUnitStep = RuleStep | FillMcStep | TypeFillStep | JudgeCorrectStep | AiPracticeStep;

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
  "unit": 1,
  "slug": "present-continuous",
  "title": "Present continuous (I am doing)",
  "topic": "Present and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "Cách thành lập: am/is/are + -ing",
          "body": "Study this example situation. Sarah is in her car. She is on her way to work. She's driving to work. This means she is driving now, at the time of speaking, and the action is not finished. The form am/is/are + -ing is the present continuous: I am (I'm) driving; he/she/it is (he's, she's, it's) working; we/you/they are (we're, you're, they're) doing.",
          "examples": [
            {
              "en": "She's driving to work.",
              "note": "= She is driving ..."
            },
            {
              "en": "I am driving.",
              "note": "I am = I'm"
            },
            {
              "en": "He is working.",
              "note": "he is = he's"
            },
            {
              "en": "They are doing it.",
              "note": "they are = they're"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Hành động đang diễn ra, chưa kết thúc",
          "body": "I am doing something means I started doing it and I haven't finished; I'm in the middle of doing it. Sometimes the action is not happening at the exact time of speaking. For example, Steve is talking to a friend on the phone and says: I'm reading a really good book at the moment. He is not reading the book at the time of speaking. He means that he has started reading the book but has not finished it yet; he is in the middle of reading it.",
          "examples": [
            {
              "en": "Please don't make so much noise. I'm trying to work.",
              "note": "not I try"
            },
            {
              "en": "'Where's Mark?' 'He's having a shower.'",
              "note": "not He has a shower"
            },
            {
              "en": "Let's go out now. It isn't raining any more.",
              "note": "not It doesn't rain"
            },
            {
              "en": "How's your new job? Are you enjoying it?"
            },
            {
              "en": "What's all that noise? What's going on? or What's happening?"
            },
            {
              "en": "Kate wants to work in Italy, so she's learning Italian.",
              "note": "but perhaps she isn't learning Italian at the time of speaking"
            },
            {
              "en": "Some friends of mine are building their own house. They hope to finish it next summer."
            }
          ]
        },
        {
          "label": "C",
          "heading": "Dùng với today / this week / this year",
          "body": "You can use the present continuous with today, this week, this year and other periods around now.",
          "examples": [
            {
              "en": "A: You're working hard today. B: Yes, I have a lot to do.",
              "note": "not You work hard today"
            },
            {
              "en": "The company I work for isn't doing so well this year."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Diễn tả sự thay đổi đang xảy ra",
          "body": "We use the present continuous when we talk about a change that has started to happen. We often use these verbs in this way: getting, becoming, changing, improving, starting, beginning, increasing, rising, falling, growing.",
          "examples": [
            {
              "en": "Is your English getting better?",
              "note": "not Does your English get better"
            },
            {
              "en": "The population of the world is increasing very fast.",
              "note": "not increases"
            },
            {
              "en": "At first I didn't like my job, but I'm starting to enjoy it now.",
              "note": "not I start"
            }
          ]
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "1.2 · Nối câu cho phù hợp",
      "instructions": "Các câu bên phải nối tiếp ý của các câu bên trái. Chọn câu phù hợp với mỗi câu cho sẵn.",
      "items": [
        {
          "before": "Please don't make so much noise.",
          "after": "",
          "options": [
            "I'm getting hungry.",
            "They're lying.",
            "It's starting to rain.",
            "They're trying to sell it.",
            "It's getting late.",
            "I'm trying to work.",
            "I'm staying with friends.",
            "The company is losing money."
          ],
          "answer": "I'm trying to work."
        },
        {
          "before": "We need to leave soon.",
          "after": "",
          "options": [
            "I'm getting hungry.",
            "They're lying.",
            "It's starting to rain.",
            "They're trying to sell it.",
            "It's getting late.",
            "I'm trying to work.",
            "I'm staying with friends.",
            "The company is losing money."
          ],
          "answer": "It's getting late."
        },
        {
          "before": "I don't have anywhere to live right now.",
          "after": "",
          "options": [
            "I'm getting hungry.",
            "They're lying.",
            "It's starting to rain.",
            "They're trying to sell it.",
            "It's getting late.",
            "I'm trying to work.",
            "I'm staying with friends.",
            "The company is losing money."
          ],
          "answer": "I'm staying with friends."
        },
        {
          "before": "I need to eat something soon.",
          "after": "",
          "options": [
            "I'm getting hungry.",
            "They're lying.",
            "It's starting to rain.",
            "They're trying to sell it.",
            "It's getting late.",
            "I'm trying to work.",
            "I'm staying with friends.",
            "The company is losing money."
          ],
          "answer": "I'm getting hungry."
        },
        {
          "before": "They don't need their car any more.",
          "after": "",
          "options": [
            "I'm getting hungry.",
            "They're lying.",
            "It's starting to rain.",
            "They're trying to sell it.",
            "It's getting late.",
            "I'm trying to work.",
            "I'm staying with friends.",
            "The company is losing money."
          ],
          "answer": "They're trying to sell it."
        },
        {
          "before": "Things are not so good at work.",
          "after": "",
          "options": [
            "I'm getting hungry.",
            "They're lying.",
            "It's starting to rain.",
            "They're trying to sell it.",
            "It's getting late.",
            "I'm trying to work.",
            "I'm staying with friends.",
            "The company is losing money."
          ],
          "answer": "The company is losing money."
        },
        {
          "before": "It isn't true what they say.",
          "after": "",
          "options": [
            "I'm getting hungry.",
            "They're lying.",
            "It's starting to rain.",
            "They're trying to sell it.",
            "It's getting late.",
            "I'm trying to work.",
            "I'm staying with friends.",
            "The company is losing money."
          ],
          "answer": "They're lying."
        },
        {
          "before": "We're going to get wet.",
          "after": "",
          "options": [
            "I'm getting hungry.",
            "They're lying.",
            "It's starting to rain.",
            "They're trying to sell it.",
            "It's getting late.",
            "I'm trying to work.",
            "I'm staying with friends.",
            "The company is losing money."
          ],
          "answer": "It's starting to rain."
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "1.3 · Viết câu hỏi ở thì hiện tại tiếp diễn",
      "instructions": "Viết câu hỏi bằng thì hiện tại tiếp diễn, dựa vào gợi ý trong ngoặc. Câu 1 đã làm mẫu.",
      "items": [
        {
          "prompt": "What's all that noise? ___ (what / happen?)",
          "answer": "What's happening?",
          "accept": [
            "What is happening?"
          ]
        },
        {
          "prompt": "What's the matter? ___ (why / you / cry?)",
          "answer": "Why are you crying?",
          "accept": [
            "Why're you crying?"
          ]
        },
        {
          "prompt": "Where's your mother? ___ (she / work / today?)",
          "answer": "Is she working today?"
        },
        {
          "prompt": "I haven't seen you for ages. ___ (what / you / do / these days?)",
          "answer": "What are you doing these days?",
          "accept": [
            "What're you doing these days?"
          ]
        },
        {
          "prompt": "Amy is a student. ___ (what / she / study?)",
          "answer": "What is she studying?",
          "accept": [
            "What's she studying?"
          ]
        },
        {
          "prompt": "Who are those people? ___ (what / they / do?)",
          "answer": "What are they doing?",
          "accept": [
            "What're they doing?"
          ]
        },
        {
          "prompt": "I heard you started a new job. ___ (you / enjoy / it?)",
          "answer": "Are you enjoying it?"
        },
        {
          "prompt": "We're not in a hurry. ___ (why / you / walk / so fast?)",
          "answer": "Why are you walking so fast?",
          "accept": [
            "Why're you walking so fast?"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "1.4 · Chia động từ ở dạng khẳng định hoặc phủ định",
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại tiếp diễn, dạng khẳng định (I'm doing) hoặc phủ định (I'm not doing). Hai câu đầu đã làm mẫu: 1 Please don't make so much noise. I'm trying (I / try) to work. 2 Let's go out now. It isn't raining (it / rain) any more.",
      "items": [
        {
          "prompt": "You can turn off the radio. ___ (I / listen) to it.",
          "answer": "I'm not listening",
          "accept": [
            "I am not listening"
          ]
        },
        {
          "prompt": "Kate phoned last night. She's on holiday with friends. ___ (She / have) a great time and doesn't want to come back.",
          "answer": "She's having",
          "accept": [
            "She is having"
          ]
        },
        {
          "prompt": "Andrew started evening classes recently. ___ (He / learn) Japanese.",
          "answer": "He's learning",
          "accept": [
            "He is learning"
          ]
        },
        {
          "prompt": "Paul and Sarah have had an argument and now ___ (they / speak) to one another.",
          "answer": "they aren't speaking",
          "accept": [
            "they're not speaking",
            "they are not speaking"
          ]
        },
        {
          "prompt": "The situation is already very bad and now ___ (it / get) worse.",
          "answer": "it's getting",
          "accept": [
            "it is getting"
          ]
        },
        {
          "prompt": "Tim ___ (work) today. He's taken the day off.",
          "answer": "isn't working",
          "accept": [
            "is not working",
            "'s not working"
          ]
        },
        {
          "prompt": "___ (I / look) for Sophie. Do you know where she is?",
          "answer": "I'm looking",
          "accept": [
            "I am looking"
          ]
        },
        {
          "prompt": "The washing machine has been repaired. ___ (It / work) now.",
          "answer": "It's working",
          "accept": [
            "It is working"
          ]
        },
        {
          "prompt": "___ (They / build) a new hospital. It will be finished next year.",
          "answer": "They're building",
          "accept": [
            "They are building"
          ]
        },
        {
          "prompt": "Ben is a student, but he's not very happy. ___ (He / enjoy) his course.",
          "answer": "He isn't enjoying",
          "accept": [
            "He's not enjoying",
            "He is not enjoying"
          ]
        },
        {
          "prompt": "___ (The weather / change). Look at those clouds. I think it's going to rain.",
          "answer": "The weather is changing",
          "accept": [
            "The weather's changing"
          ]
        },
        {
          "prompt": "Dan has been in the same job for a long time. ___ (He / start) to get bored with it.",
          "answer": "He's starting",
          "accept": [
            "He is starting"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì hiện tại tiếp diễn (am/is/are + V-ing) để nói về việc bạn đang làm ngay lúc này, việc bạn đang làm dở trong thời gian gần đây, hoặc một thay đổi đang diễn ra.",
      "ruleSummary": "The present continuous is formed with am/is/are + the -ing form of the verb (I'm driving, he's working, they aren't speaking). It describes an action happening now at the time of speaking, or an unfinished action the speaker is in the middle of even if it is not happening at this exact moment (I'm reading a really good book at the moment). It is also used with periods around now such as today, this week and this year (You're working hard today), and to describe changes in progress with verbs like get, become, change, improve, start, increase, rise, fall and grow (The population of the world is increasing very fast). A correct student sentence must use am/is/are plus an -ing form, keep subject and auxiliary in agreement, form negatives and questions with the auxiliary (I'm not listening, Are you enjoying it?), and express one of these meanings rather than a habit or general fact, which would need the present simple."
    }
  ]
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
          "heading": "Dạng thì hiện tại đơn",
          "body": "Study this example situation. Alex is a bus driver, but now he is in bed asleep. He is not driving a bus, because he is asleep. But we can still say: He drives a bus. He is a bus driver. Forms like drive(s), work(s), do(es) are the present simple. With I, we, you and they the verb has no ending: drive, work, do. With he, she and it the verb takes -s or -es: drives, works, does.",
          "examples": [
            {
              "en": "He is not driving a bus.",
              "note": "He is asleep."
            },
            {
              "en": "He drives a bus. He is a bus driver."
            },
            {
              "en": "I/we/you/they drive/work/do"
            },
            {
              "en": "he/she/it drives/works/does"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Sự việc chung, lặp đi lặp lại, luôn đúng",
          "body": "We use the present simple to talk about things in general. We use it to say that something happens all the time or repeatedly, or that something is true in general. Remember the -s ending in the third person singular: I work but he works, you go but it goes, I have but he has, they teach but my sister teaches. For the spelling of -s or -es, see Appendix 6.",
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
              "en": "I work but he works."
            },
            {
              "en": "They teach but my sister teaches."
            },
            {
              "en": "You go but it goes. I have but he has."
            }
          ]
        },
        {
          "label": "C",
          "heading": "Câu hỏi và câu phủ định với do/does",
          "body": "We use do and does to make questions and negative sentences. In questions: do I/we/you/they work? does he/she/it drive? In negatives: I/we/you/they don't work; he/she/it doesn't drive. Note that after do and does the main verb has no -s ending. In some examples do is also the main verb, so we get do you do and doesn't do.",
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
          "heading": "Nói về mức độ thường xuyên",
          "body": "We use the present simple to say how often we do things. It is often used with expressions such as every morning, very often, two or three times a year, and with adverbs of frequency such as usually.",
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
          "heading": "I promise / I apologise và các động từ tương tự",
          "body": "Sometimes we do things by saying something. For example, when you promise to do something, you can say I promise; when you suggest something, you can say I suggest. In these cases we use the present simple, not the present continuous. In the same way we say: I apologise, I advise, I insist, I agree, I refuse, and so on.",
          "examples": [
            {
              "en": "I promise I won't be late.",
              "note": "not I'm promising"
            },
            {
              "en": "'What do you suggest I do?' 'I suggest that you ...'"
            },
            {
              "en": "I apologise ... / I advise ... / I insist ... / I agree ... / I refuse ..."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "2.1 · Hoàn thành câu với động từ cho sẵn",
      "instructions": "Hoàn thành các câu bằng cách dùng những động từ sau, chia ở dạng đúng của thì hiện tại đơn. Ví dụ: Tanya speaks German very well.",
      "passage": "Word bank: cause(s), close(s), connect(s), go(es), live(s), speak(s), take(s)",
      "items": [
        {
          "prompt": "Ben and Jack ___ to the same school.",
          "answer": "go"
        },
        {
          "prompt": "Bad driving ___ many accidents.",
          "answer": "causes"
        },
        {
          "prompt": "The museum ___ at 4 o'clock on Sundays.",
          "answer": "closes"
        },
        {
          "prompt": "My parents ___ in a very small flat.",
          "answer": "live"
        },
        {
          "prompt": "The Olympic Games ___ place every four years.",
          "answer": "take"
        },
        {
          "prompt": "The Panama Canal ___ the Atlantic and Pacific oceans.",
          "answer": "connects"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "2.2 · Chia động từ ở dạng đúng",
      "instructions": "Đặt động từ trong ngoặc vào dạng đúng của thì hiện tại đơn (khẳng định, phủ định hoặc nghi vấn). Ví dụ: Julia doesn't drink (not / drink) tea very often.",
      "items": [
        {
          "prompt": "What time ___ (the banks / close) here?",
          "answer": "do the banks close"
        },
        {
          "prompt": "I have a car, but I ___ (not / use) it much.",
          "answer": "don't use",
          "accept": [
            "do not use"
          ]
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
          "answer": "doesn't do",
          "accept": [
            "does not do"
          ]
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
      "title": "2.3 · Hoàn thành câu, có khi cần dạng phủ định",
      "instructions": "Hoàn thành các câu bằng những động từ sau. Đôi khi bạn cần dùng dạng phủ định. Ví dụ: The earth goes round the sun. / Rice doesn't grow in cold climates.",
      "passage": "Word bank: believe, eat, flow, go, grow, make, rise, tell, translate",
      "items": [
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
          "answer": "don't eat",
          "accept": [
            "do not eat"
          ]
        },
        {
          "prompt": "An atheist ___ in God.",
          "answer": "doesn't believe",
          "accept": [
            "does not believe"
          ]
        },
        {
          "prompt": "An interpreter ___ from one language into another.",
          "answer": "translates"
        },
        {
          "prompt": "Liars are people who ___ the truth.",
          "answer": "don't tell",
          "accept": [
            "do not tell"
          ]
        },
        {
          "prompt": "The River Amazon ___ into the Atlantic Ocean.",
          "answer": "flows"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "2.4 · Viết câu hỏi",
      "instructions": "Bạn hỏi Lisa về bản thân cô ấy và gia đình cô ấy. Hãy viết câu hỏi. Ví dụ: Bạn biết Lisa chơi tennis và muốn biết cô ấy chơi bao lâu một lần: How often do you play tennis?",
      "items": [
        {
          "prompt": "Perhaps Lisa's sister plays tennis too. You want to know. Ask Lisa. ___ your sister ___ ?",
          "answer": "Does your sister play tennis?"
        },
        {
          "prompt": "You know that Lisa goes to the cinema a lot. You want to know how often. Ask her. ___ ?",
          "answer": "How often do you go to the cinema?"
        },
        {
          "prompt": "You know that Lisa's brother works. You want to know what he does. Ask Lisa. ___ ?",
          "answer": "What does your brother do?",
          "accept": [
            "What does your brother do for a living?"
          ]
        },
        {
          "prompt": "You're not sure whether Lisa speaks Spanish. You want to know. Ask her. ___ ?",
          "answer": "Do you speak Spanish?",
          "accept": [
            "Can you speak Spanish?"
          ]
        },
        {
          "prompt": "You don't know where Lisa's grandparents live. You want to know. Ask Lisa. ___ ?",
          "answer": "Where do your grandparents live?"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "2.5 · Hoàn thành câu với I promise / I apologise ...",
      "instructions": "Hoàn thành các câu bằng những cụm sau. Ví dụ: Mr Evans is not in the office today. I suggest you try calling him tomorrow.",
      "passage": "Word bank: I agree, I apologise, I insist, I promise, I recommend, I suggest",
      "items": [
        {
          "prompt": "I won't tell anybody what you said. ___ .",
          "answer": "I promise"
        },
        {
          "prompt": "(in a restaurant) You must let me pay for the meal. ___ .",
          "answer": "I insist"
        },
        {
          "prompt": "___ for what I said. I shouldn't have said it.",
          "answer": "I apologise",
          "accept": [
            "I apologize"
          ]
        },
        {
          "prompt": "The new restaurant in Baker Street is very good. ___ it.",
          "answer": "I recommend"
        },
        {
          "prompt": "I think you're absolutely right. ___ with you.",
          "answer": "I agree"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh ở thì hiện tại đơn để nói về thói quen, việc bạn làm thường xuyên hoặc một sự thật chung, nhớ thêm -s/-es với he/she/it và dùng do/does cho câu hỏi và câu phủ định.",
      "ruleSummary": "The present simple (I do / he does) is used for things in general: actions that happen all the time or repeatedly, habits and routines, how often we do things, and facts that are true in general. The base form is used with I, we, you and they, while he, she and it take an -s or -es ending (he works, she teaches, it goes, he has). Questions and negatives are formed with do/does plus the base form, with no -s on the main verb (Where do you come from? What does this word mean? Rice doesn't grow in cold climates.). The present simple is also used for performative verbs where saying something is doing it: I promise, I suggest, I apologise, I advise, I insist, I agree, I refuse (not I'm promising). A correct student sentence should use present simple forms with accurate third-person -s agreement and correct do/does word order, and should express a habit, routine, frequency, general truth or a performative statement rather than an action happening right now."
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
          "heading": "Present continuous vs present simple: cach dung co ban",
          "body": "We use the present continuous (I am doing) for things happening at or around the time of speaking. The action is not complete. We use the present simple (I do) for things in general, or things that happen repeatedly. We also use the continuous for temporary situations, things that continue only for a short time, and the simple for permanent situations, things that continue for a long time. See Unit 1 for more information about the present continuous and Unit 2 for the present simple.",
          "examples": [
            {
              "en": "The water is boiling. Be careful.",
              "note": "continuous: happening now"
            },
            {
              "en": "Water boils at 100 degrees Celsius.",
              "note": "simple: a general fact"
            },
            {
              "en": "Listen to those people. What language are they speaking?",
              "note": "continuous: happening now"
            },
            {
              "en": "Excuse me, do you speak English?",
              "note": "simple: in general"
            },
            {
              "en": "Let's go out. It isn't raining now.",
              "note": "continuous: at the time of speaking"
            },
            {
              "en": "It doesn't rain very much in summer.",
              "note": "simple: in general"
            },
            {
              "en": "'I'm busy.' 'What are you doing?'",
              "note": "continuous: now"
            },
            {
              "en": "What do you usually do at weekends?",
              "note": "simple: repeated action"
            },
            {
              "en": "I'm getting hungry. Let's go and eat.",
              "note": "continuous: around now"
            },
            {
              "en": "I always get hungry in the afternoon.",
              "note": "simple: happens repeatedly"
            },
            {
              "en": "Kate wants to work in Italy, so she's learning Italian.",
              "note": "continuous: around the time of speaking"
            },
            {
              "en": "Most people learn to swim when they are children.",
              "note": "simple: in general"
            },
            {
              "en": "The population of the world is increasing very fast.",
              "note": "continuous: changing around now"
            },
            {
              "en": "Every day the population of the world increases by about 200,000 people.",
              "note": "simple: repeated"
            },
            {
              "en": "I'm living with some friends until I find a place of my own.",
              "note": "continuous: a temporary situation"
            },
            {
              "en": "My parents live in London. They have lived there all their lives.",
              "note": "simple: a permanent situation"
            },
            {
              "en": "a: You're working hard today. b: Yes, I have a lot to do.",
              "note": "continuous: temporary, today only"
            },
            {
              "en": "Joe isn't lazy. He works hard most of the time.",
              "note": "simple: permanent, in general"
            }
          ]
        },
        {
          "label": "B",
          "heading": "I always do va I'm always doing",
          "body": "I always do something means I do it every time. I'm always doing something means that I do it too often, or more often than normal. It is usually a way of complaining or of saying that something is annoying or surprising.",
          "examples": [
            {
              "en": "I always go to work by car.",
              "note": "not I'm always going"
            },
            {
              "en": "I've lost my keys again. I'm always losing them.",
              "note": "= I lose them too often, or more often than normal"
            },
            {
              "en": "Paul is never satisfied. He's always complaining.",
              "note": "= he complains too much"
            },
            {
              "en": "You're always looking at your phone. Don't you have anything else to do?",
              "note": "= you look at it too often"
            }
          ]
        }
      ]
    },
    {
      "kind": "judge_correct",
      "title": "3.1 · Động từ gạch chân đúng hay sai?",
      "instructions": "Các động từ được gạch chân đã dùng đúng chưa? Nếu đúng thì chọn Đúng rồi, nếu sai thì chọn Cần sửa và viết lại cho đúng.",
      "items": [
        {
          "sentence": "Water boils at 100 degrees Celsius.",
          "underlined": "boils",
          "ok": true
        },
        {
          "sentence": "How often are you going to the cinema?",
          "underlined": "are you going",
          "ok": false,
          "correction": "do you go"
        },
        {
          "sentence": "Ben tries to find a job, but he hasn't had any luck yet.",
          "underlined": "tries",
          "ok": false,
          "correction": "is trying"
        },
        {
          "sentence": "Martina is phoning her mother every day.",
          "underlined": "is phoning",
          "ok": false,
          "correction": "phones"
        },
        {
          "sentence": "The moon goes round the earth in about 27 days.",
          "underlined": "goes",
          "ok": true
        },
        {
          "sentence": "Can you hear those people? What do they talk about?",
          "underlined": "do they talk",
          "ok": false,
          "correction": "are they talking"
        },
        {
          "sentence": "What do you do in your spare time?",
          "underlined": "do you do",
          "ok": true
        },
        {
          "sentence": "Sarah is a vegetarian. She doesn't eat meat.",
          "underlined": "doesn't eat",
          "ok": true
        },
        {
          "sentence": "I must go now. It gets late.",
          "underlined": "gets",
          "ok": false,
          "correction": "is getting",
          "accept": [
            "'s getting"
          ]
        },
        {
          "sentence": "'Come on! It's time to leave.' 'OK, I come.'",
          "underlined": "I come",
          "ok": false,
          "correction": "I'm coming",
          "accept": [
            "I am coming"
          ]
        },
        {
          "sentence": "Paul is never late. He's always starting work on time.",
          "underlined": "He's always starting",
          "ok": false,
          "correction": "He always starts"
        },
        {
          "sentence": "They don't get on well. They're always arguing.",
          "underlined": "They're always arguing",
          "ok": true
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "3.2 · Chia động từ: tiếp diễn hay đơn (cặp câu a/b)",
      "instructions": "Đặt động từ vào đúng dạng, hiện tại tiếp diễn hoặc hiện tại đơn. Chú ý sự khác nhau giữa câu a và câu b trong từng cặp.",
      "passage": "Ví dụ trong sách: 1 a I usually get (I / usually / get) hungry in the afternoon. b I'm getting (I / get) hungry. Let's go and eat something.",
      "items": [
        {
          "prompt": "2 a '___ (you / listen) to the radio?' 'No, you can turn it off.'",
          "answer": "Are you listening"
        },
        {
          "prompt": "2 b '___ (you / listen) to the radio a lot?' 'No, not very often.'",
          "answer": "Do you listen"
        },
        {
          "prompt": "3 a The River Nile ___ (flow) into the Mediterranean.",
          "answer": "flows"
        },
        {
          "prompt": "3 b The river ___ (flow) very fast today, much faster than usual.",
          "answer": "is flowing",
          "accept": [
            "'s flowing"
          ]
        },
        {
          "prompt": "4 a I'm not very active. ___ (I / not / do) any sport.",
          "answer": "I don't do",
          "accept": [
            "I do not do"
          ]
        },
        {
          "prompt": "4 b What ___ (you / usually / do) at weekends?",
          "answer": "do you usually do"
        },
        {
          "prompt": "5 a Rachel is in New York right now. ___ (She / stay) at the Park Hotel.",
          "answer": "She's staying",
          "accept": [
            "She is staying"
          ]
        },
        {
          "prompt": "5 b ___ (She / always / stay) there when she's in New York.",
          "answer": "She always stays"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "3.3 · Chia động từ: tiếp diễn hay đơn",
      "instructions": "Đặt động từ trong ngoặc vào đúng dạng, hiện tại tiếp diễn hoặc hiện tại đơn.",
      "passage": "Ví dụ trong sách: 1 Why are all these people here? What's happening (What / happen)?",
      "items": [
        {
          "prompt": "2 Julia is good at languages. ___ (She / speak) four languages very well.",
          "answer": "She speaks"
        },
        {
          "prompt": "3 Are you ready yet? ___ (Everybody / wait) for you.",
          "answer": "Everybody's waiting",
          "accept": [
            "Everybody is waiting"
          ]
        },
        {
          "prompt": "4 I've never heard this word. How ___ (you / pronounce) it?",
          "answer": "do you pronounce"
        },
        {
          "prompt": "5 Kate ___ (not / work) this week. She's on holiday.",
          "answer": "isn't working",
          "accept": [
            "is not working"
          ]
        },
        {
          "prompt": "6 I think my English ___ (improve) slowly. It's better than it was.",
          "answer": "is improving",
          "accept": [
            "'s improving"
          ]
        },
        {
          "prompt": "7 Nicola ___ (live) in Manchester. She has never lived anywhere else.",
          "answer": "lives"
        },
        {
          "prompt": "8 Can we stop walking soon? ___ (I / start) to get tired.",
          "answer": "I'm starting",
          "accept": [
            "I am starting"
          ]
        },
        {
          "prompt": "9 Sam and Tina are in Madrid right now. ___ (They / visit) a friend of theirs.",
          "answer": "They're visiting",
          "accept": [
            "They are visiting"
          ]
        },
        {
          "prompt": "10 'What ___ (your father / do)?' 'He's an architect.'",
          "answer": "does your father do"
        },
        {
          "prompt": "11 It took me an hour to get to work this morning. Most days ___ (it / not / take) so long.",
          "answer": "it doesn't take",
          "accept": [
            "it does not take"
          ]
        },
        {
          "prompt": "12 ___ (I / learn) to drive. My driving test is next month.",
          "answer": "I'm learning",
          "accept": [
            "I am learning"
          ]
        },
        {
          "prompt": "12 My father ___ (teach) me.",
          "answer": "is teaching",
          "accept": [
            "'s teaching"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "3.4 · Hoàn thành câu của B với always + -ing",
      "instructions": "Hoàn thành câu của người B. Dùng always cùng với động từ ở dạng -ing để nói rằng việc đó xảy ra quá thường xuyên.",
      "passage": "Ví dụ trong sách: 1 a: I've lost my keys again. b: Not again! You're always losing your keys.",
      "items": [
        {
          "prompt": "2 a: The car has broken down again. b: That car is useless. It ___.",
          "answer": "is always breaking down",
          "accept": [
            "'s always breaking down"
          ]
        },
        {
          "prompt": "3 a: Look! You've made the same mistake again. b: Oh no, not again! I ___.",
          "answer": "'m always making the same mistake",
          "accept": [
            "am always making the same mistake",
            "'m always making that mistake",
            "am always making that mistake",
            "'m always making mistakes",
            "am always making mistakes"
          ]
        },
        {
          "prompt": "4 a: Oh, I've left my phone at home again. b: Typical! ___.",
          "answer": "You're always leaving your phone at home",
          "accept": [
            "You are always leaving your phone at home",
            "You're always leaving it at home",
            "You are always leaving it at home"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh về chính bạn: dùng hiện tại tiếp diễn cho việc đang xảy ra lúc này hoặc tình huống tạm thời, hiện tại đơn cho thói quen hay sự thật chung, và có thể thêm một câu với always + V-ing để phàn nàn về việc gì đó xảy ra quá thường xuyên.",
      "ruleSummary": "The present continuous (I am doing) is used for actions happening at or around the moment of speaking and for temporary situations, while the present simple (I do) is used for general truths, permanent situations, and things that happen repeatedly. A correct sentence therefore matches the form to the meaning: continuous for the incomplete, in-progress or short-term (\"The water is boiling\", \"I'm living with friends until I find a place\"), simple for the habitual or permanent (\"Water boils at 100 degrees Celsius\", \"My parents live in London\"). Note the special contrast between I always do something, which means every time, and I'm always doing something, which means it happens too often or more often than normal and usually carries a note of complaint. When judging a student's sentence, check that the time reference and the verb form agree, that the continuous is formed with am/is/are plus -ing, and that the simple has correct third-person -s and do/does in questions and negatives."
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
          "body": "We use continuous forms (I'm waiting, it's raining etc.) for actions and happenings that have started but not finished. Some verbs, for example know and like, are not normally used in this way. We don't say I am knowing or they are liking. We say I know, they like. The following verbs are not normally used in the present continuous: like, want, need, prefer; know, realise, understand, recognise; believe, suppose, remember, mean; belong, fit, contain, consist, seem.",
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
          "body": "When think means believe or have an opinion, we do not use the continuous. When think means consider, the continuous is possible.",
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
          "heading": "see hear smell taste look feel",
          "body": "We normally use the present simple, not the continuous, with see, hear, smell and taste. You can use either the present simple or the present continuous to say how somebody looks or feels now, but not for something that is generally true.",
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
          "body": "You can say he's being ... , you're being ... etc. to say how somebody is behaving now. Compare this with the simple form, which describes what a person is like generally, not only now. We use am/is/are being to say how a person is behaving, that is, doing something they can control, at the moment. It is not usually possible in other situations.",
          "examples": [
            {
              "en": "I can't understand why he's being so selfish. He isn't usually like that.",
              "note": "being selfish = behaving selfishly now"
            },
            {
              "en": "'The path is icy. Don't slip.' 'Don't worry. I'm being very careful.'"
            },
            {
              "en": "He never thinks about other people. He's very selfish.",
              "note": "= he is selfish generally, not only now"
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
      "title": "4.1 · Chia động từ: tiếp diễn hay đơn",
      "instructions": "Chia động từ trong ngoặc sang dạng đúng: hiện tại tiếp diễn hoặc hiện tại đơn. Ví dụ: Are you hungry? Do you want (you / want) something to eat?",
      "items": [
        {
          "prompt": "Alan says he's 90 years old, but nobody ___ (believe) him.",
          "answer": "believes"
        },
        {
          "prompt": "She told me her name, but ___ (I / not / remember) it now.",
          "answer": "I don't remember",
          "accept": [
            "I do not remember"
          ]
        },
        {
          "prompt": "Don't put the dictionary away. ___ (I / use) it.",
          "answer": "I'm using",
          "accept": [
            "I am using"
          ]
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
          "answer": "Do you recognise",
          "accept": [
            "Do you recognize"
          ]
        },
        {
          "prompt": "___ (I / think) of selling my car. Would you be interested in buying it?",
          "answer": "I'm thinking",
          "accept": [
            "I am thinking"
          ]
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
      "title": "4.2 · Dùng từ trong ngoặc để viết câu",
      "instructions": "Dùng các từ trong ngoặc để viết thành câu hoàn chỉnh, chọn hiện tại đơn hoặc hiện tại tiếp diễn cho phù hợp với tình huống. Ví dụ 1: (you / not / seem / very happy today) là You don't seem very happy today.",
      "passage": "Mỗi tình huống là một đoạn hội thoại ngắn. Hãy viết câu cho phần được cho trong ngoặc.",
      "items": [
        {
          "prompt": "A: Are you OK? You look worried. B: ___ (I / think)",
          "answer": "I'm thinking",
          "accept": [
            "I am thinking"
          ]
        },
        {
          "prompt": "A: ___ (who / this umbrella / belong to?) B: I've no idea.",
          "answer": "Who does this umbrella belong to?"
        },
        {
          "prompt": "___ (this / smell / good)",
          "answer": "This smells good."
        },
        {
          "prompt": "A: Excuse me. ___ (anybody / sit / there?) B: No, it's free.",
          "answer": "Is anybody sitting there?",
          "accept": [
            "Is anyone sitting there?"
          ]
        },
        {
          "prompt": "___ (these gloves / not / fit / me) They're too small.",
          "answer": "These gloves don't fit me.",
          "accept": [
            "These gloves do not fit me."
          ]
        }
      ]
    },
    {
      "kind": "judge_correct",
      "title": "4.3 · Động từ gạch chân đúng hay sai?",
      "instructions": "Các động từ được gạch chân có đúng không? Nếu sai, hãy sửa lại. Ví dụ: It's not true. I'm not believing it. sửa thành I don't believe it.",
      "items": [
        {
          "sentence": "Nicky is thinking of giving up her job.",
          "underlined": "is thinking",
          "ok": true
        },
        {
          "sentence": "It's not true. I'm not believing it.",
          "underlined": "I'm not believing",
          "ok": false,
          "correction": "I don't believe",
          "accept": [
            "I do not believe"
          ]
        },
        {
          "sentence": "I'm feeling hungry. Is there anything to eat?",
          "underlined": "I'm feeling",
          "ok": true
        },
        {
          "sentence": "I've never eaten that fruit. What is it tasting like?",
          "underlined": "is it tasting",
          "ok": false,
          "correction": "does it taste"
        },
        {
          "sentence": "I'm not sure what she does. I think she works in a shop.",
          "underlined": "I think",
          "ok": true
        },
        {
          "sentence": "Look over there. What are you seeing?",
          "underlined": "are you seeing",
          "ok": false,
          "correction": "do you see",
          "accept": [
            "can you see"
          ]
        },
        {
          "sentence": "You're very quiet. What are you thinking about?",
          "underlined": "are you thinking",
          "ok": true
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "4.4 · is/are being hay is/are",
      "instructions": "Hoàn thành câu. Dùng is/are being (tiếp diễn) hoặc is/are (đơn). Ví dụ: I can't understand why he's being so selfish. He isn't usually like that.",
      "items": [
        {
          "prompt": "You'll like Sophie when you meet her. She ___ very nice.",
          "answer": "is",
          "accept": [
            "'s"
          ]
        },
        {
          "prompt": "Sarah ___ very nice to me at the moment. I wonder why.",
          "answer": "is being",
          "accept": [
            "'s being"
          ]
        },
        {
          "prompt": "They ___ very happy. They've just got married.",
          "answer": "are",
          "accept": [
            "'re"
          ]
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
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng đúng điểm ngữ pháp này: một câu với động từ chỉ trạng thái (want, know, believe, seem, belong, fit...) ở hiện tại đơn, và một câu dùng hiện tại tiếp diễn cho hành động đang diễn ra hoặc dùng is/are being để nói về cách ai đó đang cư xử lúc này.",
      "ruleSummary": "This unit contrasts the present continuous with the present simple for state verbs. Verbs describing states rather than actions (like, want, need, prefer, know, realise, understand, recognise, believe, suppose, remember, mean, belong, fit, contain, consist, seem) are normally used in the present simple, not the continuous. Think and look/feel are special: think in the continuous means considering something (I'm thinking of moving), while think in the simple means having an opinion (I think it's true); see, hear, smell and taste normally take the simple, but look and feel about how someone appears or feels now allow either form. Finally, am/is/are being describes how a person is behaving at this moment (He's being selfish means behaving selfishly now) as opposed to is/are for a general characteristic or a state the person cannot control (He is selfish; Sam is ill, not is being ill). A student's sentence uses this point correctly if a state verb appears in the simple form, or if a continuous form is used for a genuine ongoing action or for controllable behaviour right now."
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
          "heading": "Quá khứ đơn dùng cho hành động đã kết thúc trong quá khứ",
          "body": "Study this example. Wolfgang Amadeus Mozart was an Austrian musician and composer. He lived from 1756 to 1791. He started composing at the age of five and wrote more than 600 pieces of music. He was only 35 years old when he died. The forms lived, started, wrote, was and died are all past simple. We use the past simple to talk about actions and situations that finished at a definite time in the past.",
          "examples": [
            {
              "en": "He lived from 1756 to 1791."
            },
            {
              "en": "He started composing at the age of five and wrote more than 600 pieces of music."
            },
            {
              "en": "He was only 35 years old when he died."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Động từ có quy tắc (-ed) và động từ bất quy tắc",
          "body": "Very often the past simple ends in -ed. These are regular verbs (work - worked, invite - invited, decide - decided, stop - stopped, pass - passed, study - studied). For spelling rules such as stopped and studied, see Appendix 6. But many verbs are irregular: the past simple does not end in -ed. For example write - wrote, see - saw, go - went, shut - shut (no change). For a list of irregular verbs, see Appendix 1.",
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
              "note": "write - wrote"
            },
            {
              "en": "We saw Alice in town a few days ago.",
              "note": "see - saw"
            },
            {
              "en": "I went to the cinema three times last week.",
              "note": "go - went"
            },
            {
              "en": "It was cold, so I shut the window.",
              "note": "shut - shut"
            }
          ]
        },
        {
          "label": "C",
          "heading": "Câu hỏi và câu phủ định: did / didn't + nguyên thể",
          "body": "In questions and negative sentences we use did / didn't + infinitive (enjoy / see / go etc.), not the past form: did you enjoy?, did she see?, did they go?, I didn't enjoy, she didn't see, they didn't go. Sometimes do is the main verb in the sentence, so we get did you do? and I didn't do.",
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
              "en": "'Did you go out?' 'No, I didn't.'"
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
          "heading": "Quá khứ của be: was / were",
          "body": "The past of am / is / are is was / were. I/he/she/it was, wasn't; we/you/they were, weren't. Questions: was I/he/she/it? and were we/you/they? Note that we do not use did with was and were.",
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
      "title": "5.1 · Laura đã làm gì hôm qua",
      "instructions": "Đọc lời Laura kể về một ngày làm việc điển hình. Hôm qua là một ngày làm việc điển hình của Laura. Viết những việc cô ấy đã làm hoặc đã không làm hôm qua, dùng thì quá khứ đơn.",
      "passage": "LAURA: I usually get up at 7 o'clock and have a big breakfast. I walk to work, which takes me about half an hour. I start work at 8.45. I never have lunch. I finish work at 5 o'clock. I'm always tired when I get home. I usually cook a meal in the evening. I don't usually go out. I go to bed at about 11 o'clock, and I always sleep well.\n\nVí dụ: 1 She got up at 7 o'clock.",
      "items": [
        {
          "prompt": "She ___ a big breakfast.",
          "answer": "had"
        },
        {
          "prompt": "She ___ to work.",
          "answer": "walked"
        },
        {
          "prompt": "It ___ to get to work.",
          "answer": "took her about half an hour",
          "accept": [
            "took her half an hour",
            "took her about 30 minutes",
            "took her half an hour to get to work"
          ]
        },
        {
          "prompt": "___ at 8.45.",
          "answer": "She started work",
          "accept": [
            "She started"
          ]
        },
        {
          "prompt": "___ lunch.",
          "answer": "She didn't have",
          "accept": [
            "She did not have",
            "She didn't have any"
          ]
        },
        {
          "prompt": "___ at 5 o'clock.",
          "answer": "She finished work",
          "accept": [
            "She finished"
          ]
        },
        {
          "prompt": "___ tired when she got home.",
          "answer": "She was"
        },
        {
          "prompt": "___ a meal yesterday evening.",
          "answer": "She cooked"
        },
        {
          "prompt": "___ out yesterday evening.",
          "answer": "She didn't go",
          "accept": [
            "She did not go"
          ]
        },
        {
          "prompt": "___ at 11 o'clock.",
          "answer": "She went to bed",
          "accept": [
            "She went to bed at about"
          ]
        },
        {
          "prompt": "___ well last night.",
          "answer": "She slept"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "5.2 · Hoàn thành câu với động từ cho sẵn",
      "instructions": "Hoàn thành các câu sau, dùng những động từ trong khung ở dạng quá khứ đơn đúng.",
      "passage": "buy   catch   cost   fall   hurt   sell   spend   teach   throw   write\n\nVí dụ: 1 Mozart wrote more than 600 pieces of music.",
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
          "prompt": "Kate spent a lot of money yesterday. She ___ a dress which cost 100 pounds.",
          "answer": "bought"
        },
        {
          "prompt": "She bought a dress which ___ 100 pounds.",
          "answer": "cost"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "5.3 · Viết câu hỏi về kỳ nghỉ của James",
      "instructions": "Bạn hỏi James về kỳ nghỉ của anh ấy ở Mỹ. Dựa vào câu trả lời của James, viết câu hỏi của bạn ở thì quá khứ đơn.",
      "passage": "Ví dụ:\nYOU: Where did you go?\nJAMES: To the US. We went on a trip from San Francisco to Denver.",
      "items": [
        {
          "prompt": "YOU: How ___ ? By car? / JAMES: Yes, we hired a car in San Francisco.",
          "answer": "did you travel",
          "accept": [
            "did you go",
            "did you get there",
            "did you get around"
          ]
        },
        {
          "prompt": "YOU: It's a long way to drive. How long ___ ? / JAMES: Two weeks. We stopped at a lot of places along the way.",
          "answer": "did it take",
          "accept": [
            "did it take you",
            "did the trip take",
            "did the journey take",
            "did you take"
          ]
        },
        {
          "prompt": "YOU: Where ___ ? In hotels? / JAMES: Yes, small hotels or motels.",
          "answer": "did you stay",
          "accept": [
            "did you sleep"
          ]
        },
        {
          "prompt": "YOU: ___ good? / JAMES: Yes, but it was very hot - sometimes too hot.",
          "answer": "Was the weather"
        },
        {
          "prompt": "YOU: ___ the Grand Canyon? / JAMES: Of course. It was wonderful.",
          "answer": "Did you see",
          "accept": [
            "Did you visit",
            "Did you go to"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "5.4 · Dạng khẳng định hay phủ định",
      "instructions": "Hoàn thành các câu. Chia động từ trong ngoặc ở thì quá khứ đơn, dạng khẳng định hoặc phủ định cho phù hợp.",
      "passage": "Ví dụ:\n1 It was warm, so I took off my coat. (take)\n2 The film wasn't very good. I didn't enjoy it much. (enjoy)",
      "items": [
        {
          "prompt": "I knew Sarah was busy, so I ___ her. (disturb)",
          "answer": "didn't disturb",
          "accept": [
            "did not disturb"
          ]
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
          "answer": "didn't sleep",
          "accept": [
            "did not sleep"
          ]
        },
        {
          "prompt": "This watch wasn't expensive. It ___ much. (cost)",
          "answer": "didn't cost",
          "accept": [
            "did not cost"
          ]
        },
        {
          "prompt": "The window was open and a bird ___ into the room. (fly)",
          "answer": "flew"
        },
        {
          "prompt": "I was in a hurry, so I ___ time to call you. (have)",
          "answer": "didn't have",
          "accept": [
            "did not have"
          ]
        },
        {
          "prompt": "I didn't like the hotel. The room ___ very clean. (be)",
          "answer": "wasn't",
          "accept": [
            "was not"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh kể về những việc bạn đã làm hoặc đã không làm hôm qua, dùng thì quá khứ đơn (gồm ít nhất một câu phủ định với didn't hoặc một câu dùng was/were).",
      "ruleSummary": "The past simple describes actions and situations that started and finished at a definite time in the past. Regular verbs add -ed (worked, invited, stopped, studied), while many common verbs are irregular and must be learned (write - wrote, see - saw, go - went, shut - shut). Questions and negatives use did / didn't plus the infinitive, never the past form: Did you enjoy it?, I didn't buy anything, What did you do?. The verb be is the exception: its past is was / wasn't (I/he/she/it) and were / weren't (we/you/they), used without did, as in Was the weather good? and They weren't able to come."
    }
  ]
};

const UNIT_6_PAST_CONTINUOUS: GrammarUnit = {
  "unit": 6,
  "slug": "past-continuous",
  "title": "Past continuous (I was doing)",
  "topic": "Present and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "Cách thành lập: was/were + -ing",
          "body": "Study this example situation. Yesterday Karen and Joe played tennis. They started at 10 o'clock and finished at 11.30. So, at 10.30 they were playing tennis. \"They were playing\" means they were in the middle of playing; they had not finished. was/were + -ing is the past continuous: I/he/she/it was playing, we/you/they were playing (doing, working etc.).",
          "examples": [
            {
              "en": "Yesterday Karen and Joe played tennis. They started at 10 o'clock and finished at 11.30.",
              "note": "past simple: the complete action"
            },
            {
              "en": "At 10.30 they were playing tennis.",
              "note": "= they were in the middle of playing, they had not finished"
            },
            {
              "en": "he / she / it was playing",
              "note": "was + -ing"
            },
            {
              "en": "we / you / they were doing",
              "note": "were + -ing"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Nghĩa: đang ở giữa một hành động trong quá khứ",
          "body": "I was doing something means I was in the middle of doing it at a certain time. The action or situation started before this time, but had not finished. So the order is: I started doing, I was doing, I finished doing, and the time we are talking about is somewhere in the middle.",
          "examples": [
            {
              "en": "This time last year I was living in Hong Kong."
            },
            {
              "en": "What were you doing at 10 o'clock last night?"
            },
            {
              "en": "I waved to Helen, but she wasn't looking."
            }
          ]
        },
        {
          "label": "C",
          "heading": "So sánh I was doing và I did",
          "body": "Compare I was doing (past continuous) and I did (past simple). I was doing means we are in the middle of an action, not necessarily finished. I did means a complete action.",
          "examples": [
            {
              "en": "We were walking home when I met Dan.",
              "note": "in the middle of walking home"
            },
            {
              "en": "We walked home after the party last night.",
              "note": "= all the way, completely"
            },
            {
              "en": "Kate was watching TV when we arrived.",
              "note": "she had already started before we arrived"
            },
            {
              "en": "Kate watched TV a lot when she was ill last year.",
              "note": "past simple: complete action"
            }
          ]
        },
        {
          "label": "D",
          "heading": "Một việc xảy ra giữa lúc việc khác đang diễn ra",
          "body": "You can say that something happened (past simple) in the middle of something else (past continuous). But we use the past simple to say that one thing happened after another. Compare: \"When Karen arrived, we were having dinner\" means we had already started before she arrived, while \"When Karen arrived, we had dinner\" means Karen arrived, and then we had dinner.",
          "examples": [
            {
              "en": "Matt phoned while we were having dinner."
            },
            {
              "en": "It was raining when I got up."
            },
            {
              "en": "I saw you in the park yesterday. You were sitting on the grass and reading a book."
            },
            {
              "en": "I hurt my back while I was working in the garden."
            },
            {
              "en": "I was walking along the road when I saw Dan. So I stopped, and we talked for a while.",
              "note": "past simple for one thing after another"
            },
            {
              "en": "When Karen arrived, we were having dinner.",
              "note": "= we had already started before she arrived"
            },
            {
              "en": "When Karen arrived, we had dinner.",
              "note": "= Karen arrived, and then we had dinner"
            }
          ]
        },
        {
          "label": "E",
          "heading": "Động từ không dùng ở thể tiếp diễn",
          "body": "Some verbs (for example, know and want) are not normally used in continuous forms (is + -ing, was + -ing etc.). See Unit 4A for a list of these verbs.",
          "examples": [
            {
              "en": "We were good friends. We knew each other well.",
              "note": "not we were knowing"
            },
            {
              "en": "I was enjoying the party, but Chris wanted to go home.",
              "note": "not was wanting"
            }
          ]
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "6.1 · Chọn cụm động từ đúng",
      "instructions": "Hoàn thành các câu. Chọn một cụm trong khung cho mỗi chỗ trống.",
      "passage": "Khung từ: was looking / was wearing / wasn't listening / weren't looking / was snowing / was working / were sitting / were you going.\nVí dụ mẫu: Today Helen is wearing a skirt. Yesterday she was wearing trousers.",
      "items": [
        {
          "before": "\"What did he say?\" \"I don't know. I",
          "after": ".\"",
          "options": [
            "was looking",
            "was wearing",
            "wasn't listening",
            "weren't looking",
            "was snowing",
            "was working",
            "were sitting",
            "were you going"
          ],
          "answer": "wasn't listening"
        },
        {
          "before": "We",
          "after": "at the back of the theatre. We couldn't hear very well.",
          "options": [
            "was looking",
            "was wearing",
            "wasn't listening",
            "weren't looking",
            "was snowing",
            "was working",
            "were sitting",
            "were you going"
          ],
          "answer": "were sitting"
        },
        {
          "before": "This time last year Steve",
          "after": "on a farm.",
          "options": [
            "was looking",
            "was wearing",
            "wasn't listening",
            "weren't looking",
            "was snowing",
            "was working",
            "were sitting",
            "were you going"
          ],
          "answer": "was working"
        },
        {
          "before": "They didn't see me. They",
          "after": "in my direction.",
          "options": [
            "was looking",
            "was wearing",
            "wasn't listening",
            "weren't looking",
            "was snowing",
            "was working",
            "were sitting",
            "were you going"
          ],
          "answer": "weren't looking"
        },
        {
          "before": "The weather was bad. It was very cold and it",
          "after": ".",
          "options": [
            "was looking",
            "was wearing",
            "wasn't listening",
            "weren't looking",
            "was snowing",
            "was working",
            "were sitting",
            "were you going"
          ],
          "answer": "was snowing"
        },
        {
          "before": "I saw you in your car. Where",
          "after": "?",
          "options": [
            "was looking",
            "was wearing",
            "wasn't listening",
            "weren't looking",
            "was snowing",
            "was working",
            "were sitting",
            "were you going"
          ],
          "answer": "were you going"
        },
        {
          "before": "I saw Kate a few minutes ago. She",
          "after": "for you.",
          "options": [
            "was looking",
            "was wearing",
            "wasn't listening",
            "weren't looking",
            "was snowing",
            "was working",
            "were sitting",
            "were you going"
          ],
          "answer": "was looking"
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "6.2 · Nối hai vế câu",
      "instructions": "Vế nào đi với vế nào? Chọn phần kết thúc phù hợp cho mỗi câu.",
      "passage": "Các phần kết thúc: a when she was living in Rome. b she was working in a clothes shop. c when I was driving home. d but nobody was watching it. e while we were watching a film. f my friends were waiting for me. g because he wasn't feeling well.",
      "items": [
        {
          "before": "When I got to the cafe",
          "after": "",
          "options": [
            "when she was living in Rome.",
            "she was working in a clothes shop.",
            "when I was driving home.",
            "but nobody was watching it.",
            "while we were watching a film.",
            "my friends were waiting for me.",
            "because he wasn't feeling well."
          ],
          "answer": "my friends were waiting for me."
        },
        {
          "before": "We fell asleep",
          "after": "",
          "options": [
            "when she was living in Rome.",
            "she was working in a clothes shop.",
            "when I was driving home.",
            "but nobody was watching it.",
            "while we were watching a film.",
            "my friends were waiting for me.",
            "because he wasn't feeling well."
          ],
          "answer": "while we were watching a film."
        },
        {
          "before": "Amy learnt Italian",
          "after": "",
          "options": [
            "when she was living in Rome.",
            "she was working in a clothes shop.",
            "when I was driving home.",
            "but nobody was watching it.",
            "while we were watching a film.",
            "my friends were waiting for me.",
            "because he wasn't feeling well."
          ],
          "answer": "when she was living in Rome."
        },
        {
          "before": "Tom didn't come out with us",
          "after": "",
          "options": [
            "when she was living in Rome.",
            "she was working in a clothes shop.",
            "when I was driving home.",
            "but nobody was watching it.",
            "while we were watching a film.",
            "my friends were waiting for me.",
            "because he wasn't feeling well."
          ],
          "answer": "because he wasn't feeling well."
        },
        {
          "before": "The car began to make a strange noise",
          "after": "",
          "options": [
            "when she was living in Rome.",
            "she was working in a clothes shop.",
            "when I was driving home.",
            "but nobody was watching it.",
            "while we were watching a film.",
            "my friends were waiting for me.",
            "because he wasn't feeling well."
          ],
          "answer": "when I was driving home."
        },
        {
          "before": "The TV was on",
          "after": "",
          "options": [
            "when she was living in Rome.",
            "she was working in a clothes shop.",
            "when I was driving home.",
            "but nobody was watching it.",
            "while we were watching a film.",
            "my friends were waiting for me.",
            "because he wasn't feeling well."
          ],
          "answer": "but nobody was watching it."
        },
        {
          "before": "When I first met Jessica",
          "after": "",
          "options": [
            "when she was living in Rome.",
            "she was working in a clothes shop.",
            "when I was driving home.",
            "but nobody was watching it.",
            "while we were watching a film.",
            "my friends were waiting for me.",
            "because he wasn't feeling well."
          ],
          "answer": "she was working in a clothes shop."
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "6.3 · Hai mẩu chuyện ngắn",
      "instructions": "Chia động từ trong ngoặc ở thì quá khứ tiếp diễn hoặc quá khứ đơn. Mỗi câu chỉ điền vào chỗ trống được đánh dấu.",
      "passage": "Mẩu chuyện 1: gặp Sue ngoài phố. Mẩu chuyện 2: đạp xe về nhà và một người đàn ông bước ra đường.",
      "items": [
        {
          "prompt": "I ___ (see) Sue in town yesterday, but she didn't see me. She was looking the other way.",
          "answer": "saw"
        },
        {
          "prompt": "I saw Sue in town yesterday, but she ___ (not/see) me. She was looking the other way.",
          "answer": "didn't see",
          "accept": [
            "did not see"
          ]
        },
        {
          "prompt": "I saw Sue in town yesterday, but she didn't see me. She ___ (look) the other way.",
          "answer": "was looking"
        },
        {
          "prompt": "I ___ (cycle) home yesterday when a man stepped out into the road in front of me.",
          "answer": "was cycling"
        },
        {
          "prompt": "I was cycling home yesterday when a man ___ (step) out into the road in front of me.",
          "answer": "stepped"
        },
        {
          "prompt": "I ___ (go) quite fast, but luckily I managed to stop in time, and I didn't hit him.",
          "answer": "was going"
        },
        {
          "prompt": "I was going quite fast, but luckily I ___ (manage) to stop in time, and I didn't hit him.",
          "answer": "managed"
        },
        {
          "prompt": "I was going quite fast, but luckily I managed to stop in time, and I ___ (not/hit) him.",
          "answer": "didn't hit",
          "accept": [
            "did not hit"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "6.4 · Quá khứ tiếp diễn hay quá khứ đơn",
      "instructions": "Chia động từ trong ngoặc ở thì quá khứ tiếp diễn hoặc quá khứ đơn. Mỗi câu chỉ điền vào chỗ trống được đánh dấu.",
      "passage": "Ví dụ mẫu: Jenny was waiting (wait) for me when I arrived (arrive).",
      "items": [
        {
          "prompt": "\"What ___ (you / do) at this time yesterday?\" \"I was asleep.\"",
          "answer": "were you doing"
        },
        {
          "prompt": "\"___ (you / go) out last night?\" \"No, I was too tired.\"",
          "answer": "Did you go"
        },
        {
          "prompt": "How fast ___ (you / drive) when the accident happened?",
          "answer": "were you driving"
        },
        {
          "prompt": "How fast were you driving when the accident ___ (happen)?",
          "answer": "happened"
        },
        {
          "prompt": "Sam ___ (take) a picture of me while I wasn't looking.",
          "answer": "took"
        },
        {
          "prompt": "Sam took a picture of me while I ___ (not / look).",
          "answer": "wasn't looking",
          "accept": [
            "was not looking"
          ]
        },
        {
          "prompt": "We were in a very difficult position. We ___ (not / know) what to do, so we did nothing.",
          "answer": "didn't know",
          "accept": [
            "did not know"
          ]
        },
        {
          "prompt": "We were in a very difficult position. We didn't know what to do, so we ___ (do) nothing.",
          "answer": "did"
        },
        {
          "prompt": "I haven't seen Alan for ages. When I last ___ (see) him, he was trying to find a job.",
          "answer": "saw"
        },
        {
          "prompt": "I haven't seen Alan for ages. When I last saw him, he ___ (try) to find a job.",
          "answer": "was trying"
        },
        {
          "prompt": "I ___ (walk) along the street when suddenly I heard something behind me.",
          "answer": "was walking"
        },
        {
          "prompt": "I was walking along the street when suddenly I ___ (hear) something behind me.",
          "answer": "heard"
        },
        {
          "prompt": "Somebody ___ (follow) me. I was scared and I started to run.",
          "answer": "was following"
        },
        {
          "prompt": "Somebody was following me. I was scared and I ___ (start) to run.",
          "answer": "started"
        },
        {
          "prompt": "When I was young, I ___ (want) to be a pilot. Later I changed my mind.",
          "answer": "wanted"
        },
        {
          "prompt": "When I was young, I wanted to be a pilot. Later I ___ (change) my mind.",
          "answer": "changed"
        },
        {
          "prompt": "Last night I ___ (drop) a plate when I was doing the washing up.",
          "answer": "dropped"
        },
        {
          "prompt": "Last night I dropped a plate when I ___ (do) the washing up.",
          "answer": "was doing"
        },
        {
          "prompt": "Last night I dropped a plate when I was doing the washing up. Fortunately it ___ (not / break).",
          "answer": "didn't break",
          "accept": [
            "did not break"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2 đến 3 câu tiếng Anh dùng thì quá khứ tiếp diễn (was/were + V-ing) để kể một việc đang diễn ra trong quá khứ thì có việc khác xảy ra chen vào, ví dụ: I was cooking dinner when the phone rang.",
      "ruleSummary": "The past continuous is was/were + -ing and describes an action that was in progress at a point in the past: it had started before that time but had not finished (This time last year I was living in Hong Kong. What were you doing at 10 o'clock last night?). It contrasts with the past simple, which presents a complete action (We were walking home when I met Dan versus We walked home after the party). Very often the two combine: the past simple event happens in the middle of the ongoing past continuous action (It was raining when I got up; Matt phoned while we were having dinner), while two past simple verbs mean one thing happened after another. A correct student sentence should therefore use was/were plus an -ing form for the background or interrupted action, agree the auxiliary with the subject (was for I/he/she/it, were for we/you/they), and should not put stative verbs such as know, want, like, need or believe into the continuous form."
    }
  ]
};

const UNIT_7_PRESENT_PERFECT_1: GrammarUnit = {
  "unit": 7,
  "slug": "present-perfect-1",
  "title": "Present perfect 1 (I have done)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "Cấu tạo hiện tại hoàn thành (have/has + past participle)",
          "body": "Study this example situation: Tom can't find his key. He has lost it. He lost it and he doesn't have it now. Have lost / has lost is the present perfect simple. The present perfect simple is have/has + past participle: I/we/they/you have (I've etc.) and he/she/it has (he's etc.) + finished / lost / done / been etc. The past participle often ends in -ed (finished, decided etc.), but many verbs are irregular (lost, done, written etc.). For a list of irregular verbs, see Appendix 1.",
          "examples": [
            {
              "en": "I've lost my key."
            },
            {
              "en": "He's lost his key.",
              "note": "= He has lost ..."
            },
            {
              "en": "he has lost his key",
              "note": "= he lost it and he doesn't have it now"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Việc mới xảy ra và kết quả ở hiện tại; gone to / been to",
          "body": "When we say 'something has happened', this is usually new information. When we use the present perfect, there is a connection with now: the action in the past has a result now. Compare gone (to) and been (to): has gone to means the person is there now or on the way there, while has been to means the person has now come back.",
          "examples": [
            {
              "en": "Ow! I've cut my finger."
            },
            {
              "en": "The road is closed. There's been an accident.",
              "note": "= There has been ..."
            },
            {
              "en": "Police have arrested two men in connection with the robbery."
            },
            {
              "en": "Tom has lost his key.",
              "note": "= he doesn't have it now"
            },
            {
              "en": "He told me his name, but I've forgotten it.",
              "note": "= I can't remember it now"
            },
            {
              "en": "Sally is still here. She hasn't gone out.",
              "note": "= she is here now"
            },
            {
              "en": "I can't find my bag. Have you seen it?",
              "note": "= do you know where it is now?"
            },
            {
              "en": "James is on holiday. He has gone to Italy.",
              "note": "= he is there now or on his way there"
            },
            {
              "en": "Amy is back home now. She has been to Italy.",
              "note": "= she has now come back"
            }
          ]
        },
        {
          "label": "C",
          "heading": "just, already và yet",
          "body": "You can use the present perfect with just, already and yet. Just = a short time ago. Already = sooner than expected. Yet = until now; we use yet to show that we are expecting something to happen, and we use yet in questions and negative sentences.",
          "examples": [
            {
              "en": "'Are you hungry?' 'No, I've just had lunch.'",
              "note": "just = a short time ago"
            },
            {
              "en": "Hello. Have you just arrived?"
            },
            {
              "en": "'Don't forget to pay the bill.' 'I've already paid it.'",
              "note": "already = sooner than expected"
            },
            {
              "en": "'What time is Mark leaving?' 'He's already left.'"
            },
            {
              "en": "Has it stopped raining yet?",
              "note": "yet = until now, in questions"
            },
            {
              "en": "I've written the email, but I haven't sent it yet.",
              "note": "yet in negative sentences"
            }
          ]
        },
        {
          "label": "D",
          "heading": "Có thể dùng quá khứ đơn thay thế",
          "body": "You can also use the past simple (did, went, had etc.) in the examples on this page. So both the present perfect and the past simple are possible in these situations.",
          "examples": [
            {
              "en": "Ben isn't here. He's gone out.",
              "note": "or He went out."
            },
            {
              "en": "'Are you hungry?' 'No, I've just had lunch.'",
              "note": "or 'No, I just had lunch.'"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "7.1 · Hoàn thành câu với hiện tại hoàn thành",
      "instructions": "Đọc các tình huống và hoàn thành câu bằng thì hiện tại hoàn thành. Chọn động từ trong danh sách cho sẵn. Ví dụ: Tom is looking for his key. He can't find it. Tom has lost his key.",
      "passage": "Chọn từ các động từ sau: break, disappear, go up, grow, improve, lose, shrink, stop",
      "items": [
        {
          "prompt": "Maria's English wasn't very good. Now it is better. Her English ___.",
          "answer": "has improved",
          "accept": [
            "'s improved",
            "has improved a lot"
          ]
        },
        {
          "prompt": "My bag was here, but it isn't here any more. My bag ___.",
          "answer": "has disappeared",
          "accept": [
            "'s disappeared"
          ]
        },
        {
          "prompt": "Lisa can't walk and her leg is in plaster. Lisa ___.",
          "answer": "has broken her leg",
          "accept": [
            "'s broken her leg"
          ]
        },
        {
          "prompt": "Last week the bus fare was 1.80 pounds. Now it is 2 pounds. The bus fare ___.",
          "answer": "has gone up",
          "accept": [
            "'s gone up"
          ]
        },
        {
          "prompt": "Dan didn't have a beard before. Now he has a beard. Dan ___.",
          "answer": "has grown a beard",
          "accept": [
            "'s grown a beard"
          ]
        },
        {
          "prompt": "It was raining ten minutes ago. It isn't raining now. It ___.",
          "answer": "has stopped raining",
          "accept": [
            "'s stopped raining",
            "has stopped"
          ]
        },
        {
          "prompt": "I washed my sweater, and now it's too small for me. My sweater ___.",
          "answer": "has shrunk",
          "accept": [
            "'s shrunk"
          ]
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "7.2 · Chọn been hoặc gone",
      "instructions": "Điền been hoặc gone vào chỗ trống. Ví dụ: My parents are on holiday. They've gone to Italy.",
      "items": [
        {
          "before": "Hello! I've just",
          "after": "to the shops. I've bought lots of things.",
          "options": [
            "been",
            "gone"
          ],
          "answer": "been"
        },
        {
          "before": "Tom has just",
          "after": "out. He'll be back in about an hour.",
          "options": [
            "been",
            "gone"
          ],
          "answer": "gone"
        },
        {
          "before": "Alice isn't here at the moment. I don't know where she's",
          "after": ".",
          "options": [
            "been",
            "gone"
          ],
          "answer": "gone"
        },
        {
          "before": "You're very late. Where have you",
          "after": "?",
          "options": [
            "been",
            "gone"
          ],
          "answer": "been"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "7.3 · Viết dạng hiện tại hoàn thành từ gợi ý",
      "instructions": "Hoàn thành các câu bằng thì hiện tại hoàn thành, dùng các từ trong ngoặc. Ví dụ: Sally is still here. She hasn't gone (she / not / go) out.",
      "items": [
        {
          "prompt": "I can't find my bag. ___ (you / see / it) anywhere?",
          "answer": "Have you seen it"
        },
        {
          "prompt": "I can't log on to the website. ___ (I / forget) my password.",
          "answer": "I've forgotten",
          "accept": [
            "I have forgotten"
          ]
        },
        {
          "prompt": "I sent Joe an email this morning, but ___ (he / not / reply).",
          "answer": "he hasn't replied",
          "accept": [
            "he has not replied"
          ]
        },
        {
          "prompt": "Is the meeting still going on, or ___ (it / finish)?",
          "answer": "has it finished"
        },
        {
          "prompt": "___ (the weather / change). It's colder now.",
          "answer": "The weather has changed",
          "accept": [
            "The weather's changed"
          ]
        },
        {
          "prompt": "___ (you / not / sign) the form. Could you sign it now, please?",
          "answer": "You haven't signed",
          "accept": [
            "You have not signed"
          ]
        },
        {
          "prompt": "Are your friends still here, or ___ (they / go) home?",
          "answer": "have they gone"
        },
        {
          "prompt": "Paul doesn't know what he's going to do. ___ (he / not / decide / yet).",
          "answer": "He hasn't decided yet",
          "accept": [
            "He has not decided yet"
          ]
        },
        {
          "prompt": "'Do you know where Julia is?' 'Yes, ___ (I / just / see / her).'",
          "answer": "I've just seen her",
          "accept": [
            "I have just seen her"
          ]
        },
        {
          "prompt": "'When is David going away?' '___ (he / already / go).'",
          "answer": "He's already gone",
          "accept": [
            "He has already gone"
          ]
        },
        {
          "prompt": "A: ___ (your course / start / yet)? B: Not yet. It starts next week.",
          "answer": "Has your course started yet"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "7.4 · Viết câu với just, already hoặc yet",
      "instructions": "Đọc các tình huống và viết câu dùng just, already hoặc yet, với động từ cho trong ngoặc. Ví dụ: 'Would you like something to eat?' You say: No thank you. I've just had lunch. (have lunch)",
      "items": [
        {
          "prompt": "Joe goes out. Five minutes later, the phone rings and the caller says, 'Can I speak to Joe?' You say: I'm afraid ___. (go out)",
          "answer": "he's just gone out",
          "accept": [
            "he has just gone out",
            "he just went out"
          ]
        },
        {
          "prompt": "You are eating in a restaurant. The waiter thinks you have finished and starts to take your plate away. You say: Wait a minute! ___. (not / finish)",
          "answer": "I haven't finished yet",
          "accept": [
            "I have not finished yet"
          ]
        },
        {
          "prompt": "You plan to eat at a restaurant tonight. You phone to reserve a table. Later your friend says, 'Shall I phone to reserve a table?' You say: No, ___. (do it)",
          "answer": "I've already done it",
          "accept": [
            "I have already done it",
            "I've already done that",
            "I already did it"
          ]
        },
        {
          "prompt": "You know that Lisa is looking for a place to live. Perhaps she has been successful. You ask her: ___? (find)",
          "answer": "Have you found a place to live yet",
          "accept": [
            "Have you found a place yet",
            "Have you found somewhere to live yet"
          ]
        },
        {
          "prompt": "You are still thinking about where to go for your holiday. A friend asks, 'Where are you going for your holiday?' You say: ___. (not / decide)",
          "answer": "I haven't decided yet",
          "accept": [
            "We haven't decided yet",
            "I have not decided yet",
            "We have not decided yet"
          ]
        },
        {
          "prompt": "Laura went out, but a few minutes ago she returned. Somebody asks, 'Is Laura still out?' You say: No, ___. (come back)",
          "answer": "she's just come back",
          "accept": [
            "she has just come back",
            "she just came back"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì hiện tại hoàn thành (have/has + past participle) để nói về việc vừa xảy ra và còn ảnh hưởng tới hiện tại, có thể dùng thêm just, already hoặc yet.",
      "ruleSummary": "The present perfect simple is have/has + past participle (I have finished, she has lost). It reports something that happened in the past but has a connection with now, usually because the past action has a present result or because the information is new (I've cut my finger; Tom has lost his key, so he doesn't have it now). Note the contrast between has gone to (the person is still away) and has been to (the person has come back). It is often used with just (a short time ago), already (sooner than expected) and yet (until now, only in questions and negatives, normally at the end of the sentence). A correct student sentence must use have/has plus a correct past participle, agree the auxiliary with the subject, and describe a situation with present relevance rather than a finished past time reference such as yesterday or last year."
    }
  ]
};

const UNIT_8_PRESENT_PERFECT_2: GrammarUnit = {
  "unit": 8,
  "slug": "present-perfect-2",
  "title": "Present perfect 2 (I have done)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "A period continuing from the past until now",
          "body": "When we talk about a period of time that continues from the past until now, we use the present perfect (have been, have travelled etc.). In the example conversation, Dave and Jane talk about the places Jane has visited in her life, and a person's life is a period that continues until now. Note that been (to) means visited.",
          "examples": [
            {
              "en": "Have you travelled a lot, Jane? Yes, I've been to lots of places.",
              "note": "Jane's life = a period until now"
            },
            {
              "en": "Really? Have you ever been to China? Yes, I've been to China twice."
            },
            {
              "en": "What about India? No, I haven't been to India."
            },
            {
              "en": "Have you ever eaten caviar?"
            },
            {
              "en": "We've never had a car."
            },
            {
              "en": "I don't know what the film is about. I haven't seen it."
            },
            {
              "en": "Susan really loves that book. She's read it three times.",
              "note": "She's = She has"
            },
            {
              "en": "It's a really boring movie. It's the most boring movie I've ever seen."
            },
            {
              "en": "I've never been to Canada. Have you been there?",
              "note": "been (to) = visited"
            }
          ]
        },
        {
          "label": "B",
          "heading": "recently, so far, today, this year: unfinished periods",
          "body": "We also use the present perfect when the speaker is talking about a period that continues until now, with expressions such as recently, in the last few days, so far and since I arrived. In the same way we use the present perfect with today, this evening, this year etc. when these periods are not finished at the time of speaking.",
          "examples": [
            {
              "en": "Have you heard anything from Ben recently?"
            },
            {
              "en": "I've met a lot of people in the last few days."
            },
            {
              "en": "Everything is going well. There haven't been any problems so far."
            },
            {
              "en": "The weather is bad here. It's rained every day since I arrived.",
              "note": "It's = It has; since I arrived = from when I arrived until now"
            },
            {
              "en": "It's good to see you again. We haven't seen each other for a long time."
            },
            {
              "en": "I've drunk four cups of coffee today.",
              "note": "today is not finished"
            },
            {
              "en": "Have you had a holiday this year?"
            },
            {
              "en": "I haven't seen Tom this morning. Have you?"
            }
          ]
        },
        {
          "label": "C",
          "heading": "It's the first time something has happened",
          "body": "We say It's the (first) time something has happened. For example, if Don is having his first driving lesson, we can say It's the first time he has driven a car, or He hasn't driven a car before, or He has never driven a car before. We use the present perfect here, not the present simple.",
          "examples": [
            {
              "en": "It's the first time he has driven a car.",
              "note": "not It's the first time he drives a car"
            },
            {
              "en": "He hasn't driven a car before."
            },
            {
              "en": "He has never driven a car before."
            },
            {
              "en": "This is the first time I've driven a car."
            },
            {
              "en": "Sarah has lost her passport again. This is the second time this has happened.",
              "note": "not this happens"
            },
            {
              "en": "Andy is phoning his girlfriend again. It's the third time he's phoned her this evening."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "8.1 · Đặt câu hỏi với ever",
      "instructions": "Bạn hỏi mọi người về những việc họ đã từng làm. Viết câu hỏi đầy đủ với ever, dùng thì hiện tại hoàn thành.",
      "passage": "Ví dụ: 1 (ride / horse?) Have you ever ridden a horse?",
      "items": [
        {
          "prompt": "2 (be / California?) ___",
          "answer": "Have you ever been to California?",
          "accept": [
            "Have you been to California?"
          ]
        },
        {
          "prompt": "3 (run / marathon?) ___",
          "answer": "Have you ever run a marathon?",
          "accept": [
            "Have you run a marathon?"
          ]
        },
        {
          "prompt": "4 (speak / famous person?) ___",
          "answer": "Have you ever spoken to a famous person?",
          "accept": [
            "Have you ever spoken with a famous person?",
            "Have you spoken to a famous person?"
          ]
        },
        {
          "prompt": "5 (most beautiful place / visit?) ___",
          "answer": "What's the most beautiful place you've ever visited?",
          "accept": [
            "What is the most beautiful place you've ever visited?",
            "What's the most beautiful place you have ever visited?",
            "What is the most beautiful place you have ever visited?"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "8.2 · Hoàn thành câu trả lời của B",
      "instructions": "Hoàn thành câu trả lời của B. Một số câu ở dạng khẳng định, một số ở dạng phủ định. Dùng các động từ trong khung, chia ở thì hiện tại hoàn thành.",
      "passage": "Động từ dùng cho bài này: be, be, eat, happen, have, have, meet, play, read, see, try\n\nVí dụ: 1 A: What's Mark's sister like? B: I've no idea. I've never met her.",
      "items": [
        {
          "prompt": "2 A: Is everything going well? B: Yes, we ___ any problems so far.",
          "answer": "haven't had",
          "accept": [
            "have not had"
          ]
        },
        {
          "prompt": "3 A: Are you hungry? B: Yes. I ___ much today.",
          "answer": "haven't eaten",
          "accept": [
            "have not eaten"
          ]
        },
        {
          "prompt": "4 A: Can you play chess? B: Yes, but ___ for ages.",
          "answer": "I haven't played",
          "accept": [
            "I have not played",
            "I haven't played chess",
            "I've not played"
          ]
        },
        {
          "prompt": "5 A: Are you enjoying your holiday? B: Yes, it's the best holiday ___ for a long time.",
          "answer": "I've had",
          "accept": [
            "I have had"
          ]
        },
        {
          "prompt": "6 A: What's that book about? B: I don't know. ___ it.",
          "answer": "I haven't read",
          "accept": [
            "I have not read",
            "I've never read",
            "I have never read"
          ]
        },
        {
          "prompt": "7 A: Is Brussels an interesting place? B: I've no idea. ___ there.",
          "answer": "I've never been",
          "accept": [
            "I have never been",
            "I haven't been",
            "I have not been"
          ]
        },
        {
          "prompt": "8 A: I hear your car broke down again yesterday. B: Yes, it's the second time ___ this month.",
          "answer": "it's happened",
          "accept": [
            "it has happened",
            "this has happened",
            "it's happened to me"
          ]
        },
        {
          "prompt": "9 A: Do you like caviar? B: I don't know. ___ it.",
          "answer": "I've never tried",
          "accept": [
            "I have never tried",
            "I haven't tried",
            "I have not tried"
          ]
        },
        {
          "prompt": "10 A: Mike was late for work again today. B: Again? He ___ late every day this week.",
          "answer": "has been",
          "accept": [
            "'s been"
          ]
        },
        {
          "prompt": "11 A: Who's that woman by the door? B: I don't know. ___ her before.",
          "answer": "I haven't seen",
          "accept": [
            "I have not seen",
            "I've never seen",
            "I have never seen"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "8.4 · Đọc tình huống và hoàn thành câu",
      "instructions": "Đọc các tình huống rồi hoàn thành câu bằng thì hiện tại hoàn thành (It's the first time ... / ... hasn't ... before).",
      "passage": "Ví dụ: 1 Jack is driving a car for the first time. He's very nervous and not sure what to do. It's the first time he's driven a car.",
      "items": [
        {
          "prompt": "2 Some children at the zoo are looking at a giraffe. They've never seen one before. It's the first time ___ a giraffe.",
          "answer": "they've seen",
          "accept": [
            "they have seen"
          ]
        },
        {
          "prompt": "3 Sue is riding a horse. She doesn't look very confident or comfortable. She ___ before.",
          "answer": "hasn't ridden a horse",
          "accept": [
            "has not ridden a horse",
            "has never ridden a horse",
            "hasn't ridden a horse before"
          ]
        },
        {
          "prompt": "4 Joe and Lisa are on holiday in Japan. They've been to Japan once before. This is the second time ___.",
          "answer": "they've been to Japan",
          "accept": [
            "they have been to Japan",
            "they've visited Japan",
            "they have visited Japan",
            "they've been in Japan"
          ]
        },
        {
          "prompt": "5 Emily is staying at the Prince Hotel. She stayed there a few years ago. It's not the first ___ this hotel.",
          "answer": "time she's stayed at",
          "accept": [
            "time she has stayed at",
            "time she's stayed in",
            "time she has stayed in"
          ]
        },
        {
          "prompt": "6 Ben is playing tennis for the first time. He's a complete beginner. ___ before.",
          "answer": "He hasn't played tennis",
          "accept": [
            "He has not played tennis",
            "He has never played tennis",
            "He's never played tennis"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì hiện tại hoàn thành cho khoảng thời gian kéo dài đến hiện tại: nói về trải nghiệm trong đời bạn (I've been to ... / I've never eaten ...), về hôm nay hoặc tuần này (I haven't seen him today), hoặc dùng mẫu It's the first time I've ...",
      "ruleSummary": "This unit practises the present perfect (have/has + past participle) for a period of time that continues from the past until now. It covers life experience, often with ever or never (Have you ever been to China? I've never had a car. It's the most boring film I've ever seen), where been to means visited; unfinished time periods such as recently, in the last few days, so far, since I arrived, today, this evening and this year (I've drunk four cups of coffee today. There haven't been any problems so far); and the pattern It's the (first/second/third) time something has happened, where the present perfect is required, not the present simple (It's the first time he has driven a car, not he drives; This is the second time this has happened, not happens). A correct student sentence must use have/has plus a correct past participle, must refer to a period that includes the present moment (not a finished past time such as yesterday or last year), and must form negatives and questions with haven't/hasn't and Have/Has."
    }
  ]
};

export const UNITS_META: GrammarUnitMeta[] = [
  { unit: 1, slug: UNIT_1_PRESENT_CONTINUOUS.slug, title: UNIT_1_PRESENT_CONTINUOUS.title, topic: UNIT_1_PRESENT_CONTINUOUS.topic, available: true },
  { unit: 2, slug: UNIT_2_PRESENT_SIMPLE.slug, title: UNIT_2_PRESENT_SIMPLE.title, topic: UNIT_2_PRESENT_SIMPLE.topic, available: true },
  { unit: 3, slug: UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1.slug, title: UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1.title, topic: UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1.topic, available: true },
  { unit: 4, slug: UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2.slug, title: UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2.title, topic: UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2.topic, available: true },
  { unit: 5, slug: UNIT_5_PAST_SIMPLE.slug, title: UNIT_5_PAST_SIMPLE.title, topic: UNIT_5_PAST_SIMPLE.topic, available: true },
  { unit: 6, slug: UNIT_6_PAST_CONTINUOUS.slug, title: UNIT_6_PAST_CONTINUOUS.title, topic: UNIT_6_PAST_CONTINUOUS.topic, available: true },
  { unit: 7, slug: UNIT_7_PRESENT_PERFECT_1.slug, title: UNIT_7_PRESENT_PERFECT_1.title, topic: UNIT_7_PRESENT_PERFECT_1.topic, available: true },
  { unit: 8, slug: UNIT_8_PRESENT_PERFECT_2.slug, title: UNIT_8_PRESENT_PERFECT_2.title, topic: UNIT_8_PRESENT_PERFECT_2.topic, available: true },
];

export const GRAMMAR_UNITS: GrammarUnit[] = [UNIT_1_PRESENT_CONTINUOUS, UNIT_2_PRESENT_SIMPLE, UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1, UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2, UNIT_5_PAST_SIMPLE, UNIT_6_PAST_CONTINUOUS, UNIT_7_PRESENT_PERFECT_1, UNIT_8_PRESENT_PERFECT_2];

export function getGrammarUnit(slug: string): GrammarUnit | undefined {
  return GRAMMAR_UNITS.find((u) => u.slug === slug);
}
