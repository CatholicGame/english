// Content sourced from "English Grammar in Use" (Raymond Murphy, Cambridge
// University Press, 5th ed. 2019) — docs/English_Grammar_in_Use_Intermediate_2019_5th-Ed.pdf.
// Each unit follows the book's own layout: a left-page grammar explanation
// (lettered sections A, B, C ...) then right-page exercises. Every text-only
// exercise from the book is digitized; only exercises whose answers can't be
// derived without seeing the book's illustration are left out.

export type GrammarItemType = "fill_mc" | "type_fill" | "judge_correct" | "match_pairs";

export interface GrammarExample {
  en: string;
  note?: string;
  /** Vietnamese translation of `en`, shown only when the UI language is
   * Vietnamese (never mixed in for an English UI). Every example should have
   * one — this is a learner aid, not optional polish. */
  vi?: string;
}

/** A short conjugation/reference grid the book prints as a table (e.g. the
 * am/is/are + -ing rows). Rendered as an actual table, not squeezed into body
 * prose. */
export interface RuleTable {
  headers?: string[];
  rows: string[][];
}

export interface RuleBlock {
  label?: string; // "A", "B", "C" ... matching the book's lettered sections
  heading?: string;
  /** English counterpart of `heading` (heading is authored Vietnamese-first,
   * same convention as title/instructions elsewhere in this file). */
  headingEn?: string;
  /** A short standalone lead-in line before the body paragraphs, e.g. "Study
   * this example situation:" — rendered on its own line instead of running
   * into the scenario text that follows it. */
  intro?: string;
  /** Vietnamese translation of `intro`, shown only when the UI language is
   * Vietnamese. */
  introVi?: string;
  /** One or more paragraphs, separated by a blank line ("\n\n"). Keep each
   * paragraph to the same short chunk of explanation the book itself breaks
   * onto its own line — don't run everything into a single dense paragraph. */
  body: string;
  /** Vietnamese translation of `body`, with the SAME number of "\n\n"
   * paragraphs in the same order, so each Vietnamese paragraph lines up with
   * its English counterpart. Shown only when the UI language is Vietnamese;
   * an English UI must render `body` alone with no Vietnamese mixed in. */
  bodyVi?: string;
  /** A verb-form grid the book shows as a table (see RuleTable). Omit unless
   * the block genuinely has one. Not translated: the cells are the target
   * grammar forms themselves (am/is/are, -ing forms), not prose. */
  table?: RuleTable;
  /** A short word list the book prints as a word bank (e.g. getting, becoming,
   * changing ...), shown as wrapped tags instead of a comma-separated sentence. */
  wordList?: string[];
  examples: GrammarExample[];
}

export interface RuleStep {
  kind: "rule";
  title: string;
  /** English counterpart of `title`, shown when the UI language is English.
   * `title` itself stays the Vietnamese default (this module was authored
   * Vietnamese-first) — omit only for units not yet given an English pass. */
  titleEn?: string;
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
  titleEn?: string;
  instructions: string;
  /** English counterpart of `instructions`. */
  instructionsEn?: string;
  /** Same role as on TypeFillStep: the word bank or worked example the book
   * prints once above the whole exercise. */
  passage?: string;
  /** English counterpart of `passage`. */
  passageEn?: string;
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
  titleEn?: string;
  instructions: string;
  /** English counterpart of `instructions`. */
  instructionsEn?: string;
  /** Shared context shown above the items (a short reading passage, a list of
   * verbs to choose from, a dialogue setup) when the book's exercise has one. */
  passage?: string;
  /** English counterpart of `passage`. */
  passageEn?: string;
  /** The book's own item number for items[0]. Most exercises start at 1, but
   * when the first one or two items are given as a worked example (moved into
   * `passage` instead of `items`), the real items pick up numbering partway
   * through the book's list (e.g. 3, when items 1-2 were the worked example).
   * Omit for the default of 1. */
  startNumber?: number;
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
  titleEn?: string;
  instructions: string;
  instructionsEn?: string;
  items: JudgeCorrectItem[];
}

export interface AiPracticeStep {
  kind: "ai_practice";
  title: string;
  titleEn?: string;
  instructions: string;
  instructionsEn?: string;
  ruleSummary: string; // short EN description of the grammar point, sent to the AI for grading context
}

/** The book's "the sentences on the right follow those on the left, which
 * goes with which?" exercise: a numbered left column and a lettered right
 * column, printed in independent (non-corresponding) orders. `left` and
 * `right` are each shown in the book's own printed order; `answers[i]` is the
 * exact string from `right` that pairs with `left[i]`. Rendered as a
 * tap-left-then-tap-right matching UI, not as fill_mc's repeated-option-list
 * (which duplicates the whole option pool under every single item). */
export interface MatchPairsStep {
  kind: "match_pairs";
  title: string;
  titleEn?: string;
  instructions: string;
  instructionsEn?: string;
  left: string[];
  right: string[];
  answers: string[];
}

export type GrammarUnitStep = RuleStep | FillMcStep | TypeFillStep | JudgeCorrectStep | MatchPairsStep | AiPracticeStep;

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
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Cách thành lập: am/is/are + -ing",
          "headingEn": "Formation: am/is/are + -ing",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "Sarah is in her car. She is on her way to work. She's **driving** to work.\n\nThis means she is driving *now*, at the time of speaking. The action is not finished.\n\n**am/is/are + -ing** is the *present continuous*:",
          "bodyVi": "Sarah đang ở trong xe. Cô ấy đang trên đường đi làm. Cô ấy đang lái xe đi làm.\n\nĐiều này có nghĩa là cô ấy đang lái xe ngay bây giờ, vào lúc nói. Hành động chưa kết thúc.\n\nam/is/are + -ing là thì hiện tại tiếp diễn:",
          "table": {
            "rows": [
              [
                "I",
                "**am** (= **I'm**)",
                "**driving**"
              ],
              [
                "he/she/it",
                "**is** (= **he's**, **she's**, **it's**)",
                "**working**"
              ],
              [
                "we/you/they",
                "**are** (= **we're**, **you're**, **they're**)",
                "**doing** etc."
              ]
            ]
          },
          "examples": [
            {
              "en": "She's **driving** to work.",
              "note": "= She **is driving** ...",
              "vi": "Cô ấy đang lái xe đi làm."
            },
            {
              "en": "I **am driving**.",
              "note": "I am = I'm",
              "vi": "Tôi đang lái xe."
            },
            {
              "en": "He **is working**.",
              "note": "he is = he's",
              "vi": "Anh ấy đang làm việc."
            },
            {
              "en": "They **are doing** it.",
              "note": "they are = they're",
              "vi": "Họ đang làm việc đó."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Hành động đang diễn ra, chưa kết thúc",
          "headingEn": "An action in progress, not yet finished",
          "body": "**I am doing** something means I started doing it and I haven't finished it: I'm in the middle of doing it.\n\nSometimes the action is not happening at the exact time of speaking. For example, Steve is talking to a friend on the phone and says: '**I'm reading** a really good book at the moment.'\n\nSteve is *not* reading the book at the time of speaking. He means that he has started reading the book but has not finished it yet, he is in the middle of reading it.",
          "bodyVi": "I am doing something (tôi đang làm gì đó) có nghĩa là tôi đã bắt đầu làm việc đó và chưa xong: tôi đang làm việc đó giữa chừng.\n\nĐôi khi hành động không diễn ra ngay tại thời điểm nói. Ví dụ, Steve đang nói chuyện điện thoại với một người bạn và nói: 'Tôi đang đọc một cuốn sách rất hay.'\n\nSteve không đang đọc sách ngay lúc nói câu đó. Anh ấy muốn nói rằng anh ấy đã bắt đầu đọc cuốn sách nhưng chưa đọc xong, anh ấy đang đọc nó giữa chừng.",
          "examples": [
            {
              "en": "Please don't make so much noise. I**'m trying** to work.",
              "note": "not I try",
              "vi": "Đừng gây ồn quá vậy. Tôi đang cố gắng làm việc."
            },
            {
              "en": "'Where's Mark?' 'He**'s having** a shower.'",
              "note": "not He has a shower",
              "vi": "'Mark đâu rồi?' 'Anh ấy đang tắm.'"
            },
            {
              "en": "Let's go out now. It **isn't raining** any more.",
              "note": "not It doesn't rain",
              "vi": "Đi ra ngoài thôi. Trời không còn mưa nữa."
            },
            {
              "en": "How's your new job? **Are** you **enjoying** it?",
              "vi": "Công việc mới của bạn thế nào? Bạn có thích nó không?"
            },
            {
              "en": "What's all that noise? What**'s going** on? or What**'s happening**?",
              "vi": "Tiếng ồn đó là gì vậy? Chuyện gì đang xảy ra vậy?"
            },
            {
              "en": "Kate wants to work in Italy, so she**'s learning** Italian.",
              "note": "but perhaps she isn't learning Italian at the time of speaking",
              "vi": "Kate muốn làm việc ở Ý, nên cô ấy đang học tiếng Ý."
            },
            {
              "en": "Some friends of mine **are building** their own house. They hope to finish it next summer.",
              "vi": "Vài người bạn của tôi đang xây nhà riêng. Họ hy vọng sẽ hoàn thành vào mùa hè tới."
            }
          ]
        },
        {
          "label": "C",
          "heading": "Dùng với today / this week / this year",
          "headingEn": "Used with today / this week / this year",
          "body": "You can use the present continuous with **today**, **this week**, **this year** and other periods around now.",
          "bodyVi": "Bạn có thể dùng thì hiện tại tiếp diễn với today (hôm nay), this week (tuần này), this year (năm nay) và các khoảng thời gian khác quanh hiện tại.",
          "examples": [
            {
              "en": "A: You**'re working** hard **today**. B: Yes, I have a lot to do.",
              "note": "not You work hard today",
              "vi": "A: Hôm nay bạn làm việc chăm chỉ đấy. B: Vâng, tôi có nhiều việc phải làm."
            },
            {
              "en": "The company I work for **isn't doing** so well **this year**.",
              "vi": "Công ty tôi làm năm nay kinh doanh không tốt lắm."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Diễn tả sự thay đổi đang xảy ra",
          "headingEn": "Describing a change that is happening",
          "body": "We use the present continuous when we talk about a change that has started to happen.\n\nWe often use these verbs in this way:",
          "bodyVi": "Chúng ta dùng thì hiện tại tiếp diễn khi nói về một sự thay đổi đã bắt đầu xảy ra.\n\nChúng ta thường dùng những động từ này theo cách đó:",
          "wordList": [
            "getting",
            "becoming",
            "changing",
            "improving",
            "starting",
            "beginning",
            "increasing",
            "rising",
            "falling",
            "growing"
          ],
          "examples": [
            {
              "en": "**Is** your English **getting** better?",
              "note": "not Does your English get better",
              "vi": "Tiếng Anh của bạn có đang tốt hơn không?"
            },
            {
              "en": "The population of the world **is increasing** very fast.",
              "note": "not increases",
              "vi": "Dân số thế giới đang tăng rất nhanh."
            },
            {
              "en": "At first I didn't like my job, but I**'m starting** to enjoy it now.",
              "note": "not I start",
              "vi": "Ban đầu tôi không thích công việc của mình, nhưng giờ tôi đang bắt đầu thấy thích nó."
            }
          ]
        }
      ]
    },
    {
      "kind": "match_pairs",
      "title": "1.2 · Nối câu cho phù hợp",
      "titleEn": "1.2 · Match the sentences",
      "instructions": "Các câu bên phải nối tiếp ý của các câu bên trái. Chạm một câu bên trái, sau đó chạm câu phù hợp bên phải.",
      "instructionsEn": "The sentences on the right follow those on the left. Tap a sentence on the left, then tap the one on the right that goes with it.",
      "left": [
        "Please don't make so much noise.",
        "We need to leave soon.",
        "I don't have anywhere to live right now.",
        "I need to eat something soon.",
        "They don't need their car any more.",
        "Things are not so good at work.",
        "It isn't true what they say.",
        "We're going to get wet."
      ],
      "right": [
        "I'm getting hungry.",
        "They're lying.",
        "It's starting to rain.",
        "They're trying to sell it.",
        "It's getting late.",
        "I'm trying to work.",
        "I'm staying with friends.",
        "The company is losing money."
      ],
      "answers": [
        "I'm trying to work.",
        "It's getting late.",
        "I'm staying with friends.",
        "I'm getting hungry.",
        "They're trying to sell it.",
        "The company is losing money.",
        "They're lying.",
        "It's starting to rain."
      ]
    },
    {
      "kind": "type_fill",
      "title": "1.3 · Viết câu hỏi ở thì hiện tại tiếp diễn",
      "titleEn": "1.3 · Write questions in the present continuous",
      "instructions": "Viết câu hỏi bằng thì hiện tại tiếp diễn, dựa vào gợi ý trong ngoặc.",
      "instructionsEn": "Write questions using the present continuous, based on the words in brackets.",
      "passage": "Ví dụ: 1 What's all that noise? **What's happening?**",
      "passageEn": "Example: 1 What's all that noise? **What's happening?**",
      "startNumber": 2,
      "items": [
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
      "titleEn": "1.4 · Put the verb into the positive or negative form",
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại tiếp diễn, dạng khẳng định (**I'm doing** etc.) hoặc phủ định (**I'm not doing** etc.).",
      "instructionsEn": "Put the verb in brackets into the present continuous, positive (**I'm doing** etc.) or negative (**I'm not doing** etc.).",
      "passage": "Ví dụ:\n1 Please don't make so much noise. **I'm trying** (I / try) to work.\n2 Let's go out now. **It isn't raining** (it / rain) any more.",
      "passageEn": "Example:\n1 Please don't make so much noise. **I'm trying** (I / try) to work.\n2 Let's go out now. **It isn't raining** (it / rain) any more.",
      "startNumber": 3,
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
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì hiện tại tiếp diễn (**am/is/are + V-ing**) để nói về việc bạn đang làm ngay lúc này, việc bạn đang làm dở trong thời gian gần đây, hoặc một thay đổi đang diễn ra.",
      "instructionsEn": "Write 2-3 English sentences using the present continuous (**am/is/are + V-ing**) to talk about something you are doing right now, something you are in the middle of doing recently, or a change that is happening.",
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
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Dạng thì hiện tại đơn",
          "headingEn": "Formation of the present simple",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "Alex is a bus driver, but now he is in bed asleep. He is **not driving** a bus. (He is asleep.)\n\nbut He **drives** a bus. He is a bus driver.\n\n**drive(s)**, **work(s)**, **do(es)** etc. is the *present simple*:",
          "bodyVi": "Alex là lái xe buýt, nhưng bây giờ anh ấy đang ngủ trên giường. Anh ấy không đang lái xe buýt. (Anh ấy đang ngủ.)\n\nnhưng anh ấy lái xe buýt. Anh ấy là lái xe buýt.\n\ndrive(s), work(s), do(es) v.v. là thì hiện tại đơn:",
          "table": {
            "rows": [
              [
                "I/we/you/they",
                "**drive** / **work** / **do**"
              ],
              [
                "he/she/it",
                "**drives** / **works** / **does**"
              ]
            ]
          },
          "examples": [
            {
              "en": "He is **not driving** a bus.",
              "note": "He is asleep.",
              "vi": "Anh ấy không đang lái xe buýt. (Anh ấy đang ngủ.)"
            },
            {
              "en": "He **drives** a bus. He is a bus driver.",
              "vi": "Anh ấy lái xe buýt. Anh ấy là lái xe buýt."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Sự việc chung, lặp đi lặp lại, luôn đúng",
          "headingEn": "General, repeated, and always-true facts",
          "body": "We use the *present simple* to talk about things in general. We use it to say that something happens all the time or repeatedly, or that something is true in general.\n\nRemember the **-s** ending in the third person singular:",
          "bodyVi": "Chúng ta dùng thì hiện tại đơn để nói về những sự việc chung. Chúng ta dùng nó để nói rằng điều gì đó xảy ra liên tục hoặc lặp đi lặp lại, hoặc điều gì đó đúng nói chung.\n\nHãy nhớ thêm -s ở ngôi thứ ba số ít:",
          "table": {
            "rows": [
              [
                "I **work**",
                "he **works**"
              ],
              [
                "you **go**",
                "it **goes**"
              ],
              [
                "I **have**",
                "he **has**"
              ],
              [
                "they **teach**",
                "my sister **teaches**"
              ]
            ]
          },
          "examples": [
            {
              "en": "Nurses **look after** patients in hospitals.",
              "vi": "Y tá chăm sóc bệnh nhân trong bệnh viện."
            },
            {
              "en": "I usually **go away** at weekends.",
              "vi": "Tôi thường đi đâu đó vào cuối tuần."
            },
            {
              "en": "The earth **goes round** the sun.",
              "vi": "Trái đất quay quanh mặt trời."
            },
            {
              "en": "The cafe **opens** at 7.30 in the morning.",
              "vi": "Quán cà phê mở cửa lúc 7 giờ 30 sáng."
            }
          ]
        },
        {
          "label": "C",
          "heading": "Câu hỏi và câu phủ định với do/does",
          "headingEn": "Questions and negatives with do/does",
          "body": "We use **do**/**does** to make questions and negative sentences:",
          "bodyVi": "Chúng ta dùng do/does để tạo câu hỏi và câu phủ định:",
          "table": {
            "rows": [
              [
                "**Do** I/we/you/they **work**?",
                "I/we/you/they **don't work**."
              ],
              [
                "**Does** he/she/it **drive**?",
                "He/she/it **doesn't drive**."
              ]
            ]
          },
          "examples": [
            {
              "en": "I come from Canada. Where **do** you **come** from?",
              "vi": "Tôi đến từ Canada. Bạn đến từ đâu?"
            },
            {
              "en": "I **don't go** away very often.",
              "vi": "Tôi không đi đâu thường xuyên."
            },
            {
              "en": "What **does** this word **mean**?",
              "note": "not What means this word?",
              "vi": "Từ này có nghĩa là gì?"
            },
            {
              "en": "Rice **doesn't grow** in cold climates.",
              "vi": "Lúa gạo không mọc ở vùng khí hậu lạnh."
            },
            {
              "en": "'What **do** you **do**?' 'I work in a shop.'",
              "note": "do is also the main verb here",
              "vi": "'Bạn làm nghề gì?' 'Tôi làm việc trong một cửa hàng.'"
            },
            {
              "en": "He's always so lazy. He **doesn't do** anything to help.",
              "vi": "Anh ấy lúc nào cũng lười biếng như vậy. Anh ấy không làm gì để giúp cả."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Nói về mức độ thường xuyên",
          "headingEn": "Saying how often we do things",
          "body": "We use the present simple to say how often we do things:",
          "bodyVi": "Chúng ta dùng thì hiện tại đơn để nói mức độ thường xuyên chúng ta làm một việc gì đó:",
          "examples": [
            {
              "en": "I **get up** at 8 o'clock **every morning**.",
              "vi": "Tôi dậy lúc 8 giờ mỗi sáng."
            },
            {
              "en": "**How often** do you **go** to the dentist?",
              "vi": "Bạn đi khám nha sĩ bao lâu một lần?"
            },
            {
              "en": "Julie **doesn't drink** tea **very often**.",
              "vi": "Julie không uống trà thường xuyên."
            },
            {
              "en": "Robert **usually goes away** two or three times a year.",
              "vi": "Robert thường đi đâu đó hai hoặc ba lần một năm."
            }
          ]
        },
        {
          "label": "E",
          "heading": "I promise / I apologise và các động từ tương tự",
          "headingEn": "I promise / I apologise and similar verbs",
          "body": "Sometimes we do things by saying something. For example, when you promise to do something, you can say **I promise**; when you suggest something, you can say **I suggest**. In these cases we use the *present simple*, not the *present continuous*.\n\nIn the same way we also say:",
          "bodyVi": "Đôi khi chúng ta làm một việc gì đó bằng cách nói ra điều đó. Ví dụ, khi bạn hứa làm việc gì, bạn có thể nói I promise; khi bạn gợi ý điều gì, bạn có thể nói I suggest. Trong những trường hợp này chúng ta dùng thì hiện tại đơn, không dùng thì hiện tại tiếp diễn.\n\nTương tự như vậy chúng ta cũng nói:",
          "wordList": [
            "I apologise",
            "I advise",
            "I insist",
            "I agree",
            "I refuse"
          ],
          "examples": [
            {
              "en": "**I promise** I won't be late.",
              "note": "not I'm promising",
              "vi": "Tôi hứa tôi sẽ không đến muộn."
            },
            {
              "en": "'What do you suggest I do?' '**I suggest** that you ...'",
              "vi": "'Bạn gợi ý tôi nên làm gì?' 'Tôi gợi ý là bạn nên...'"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "2.1 · Hoàn thành câu với động từ cho sẵn",
      "titleEn": "2.1 · Complete the sentences with the given verbs",
      "instructions": "Hoàn thành các câu bằng cách dùng những động từ sau, chia ở dạng đúng của thì hiện tại đơn. Ví dụ: Tanya speaks German very well.",
      "instructionsEn": "Complete the sentences using the following verbs, in the correct form of the present simple. Example: Tanya speaks German very well.",
      "passage": "Word bank: cause(s), close(s), connect(s), go(es), live(s), speak(s), take(s)",
      "passageEn": "Word bank: cause(s), close(s), connect(s), go(es), live(s), speak(s), take(s)",
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
      "titleEn": "2.2 · Put the verb into the correct form",
      "instructions": "Đặt động từ trong ngoặc vào dạng đúng của thì hiện tại đơn (khẳng định, phủ định hoặc nghi vấn). Ví dụ: Julia doesn't drink (not / drink) tea very often.",
      "instructionsEn": "Put the verb in brackets into the correct form of the present simple (positive, negative or question). Example: Julia doesn't drink (not / drink) tea very often.",
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
      "titleEn": "2.3 · Complete the sentences, sometimes using the negative",
      "instructions": "Hoàn thành các câu bằng những động từ sau. Đôi khi bạn cần dùng dạng phủ định. Ví dụ: The earth goes round the sun. / Rice doesn't grow in cold climates.",
      "instructionsEn": "Complete the sentences using the following verbs. Sometimes you need the negative form. Example: The earth goes round the sun. / Rice doesn't grow in cold climates.",
      "passage": "Word bank: believe, eat, flow, go, grow, make, rise, tell, translate",
      "passageEn": "Word bank: believe, eat, flow, go, grow, make, rise, tell, translate",
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
      "titleEn": "2.4 · Write questions",
      "instructions": "Bạn hỏi Lisa về bản thân cô ấy và gia đình cô ấy. Hãy viết câu hỏi. Ví dụ: Bạn biết Lisa chơi tennis và muốn biết cô ấy chơi bao lâu một lần: How often do you play tennis?",
      "instructionsEn": "You ask Lisa about herself and her family. Write the questions. Example: You know that Lisa plays tennis and want to know how often. Ask her: How often do you play tennis?",
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
      "titleEn": "2.5 · Complete the sentences with I promise / I apologise ...",
      "instructions": "Hoàn thành các câu bằng những cụm sau. Ví dụ: Mr Evans is not in the office today. I suggest you try calling him tomorrow.",
      "instructionsEn": "Complete the sentences using the following phrases. Example: Mr Evans is not in the office today. I suggest you try calling him tomorrow.",
      "passage": "Word bank: I agree, I apologise, I insist, I promise, I recommend, I suggest",
      "passageEn": "Word bank: I agree, I apologise, I insist, I promise, I recommend, I suggest",
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
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh ở thì hiện tại đơn để nói về thói quen, việc bạn làm thường xuyên hoặc một sự thật chung, nhớ thêm -s/-es với he/she/it và dùng do/does cho câu hỏi và câu phủ định.",
      "instructionsEn": "Write 2-3 English sentences in the present simple to talk about a habit, something you do regularly, or a general fact. Remember to add -s/-es for he/she/it and use do/does for questions and negatives.",
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
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Present continuous vs present simple: cách dùng cơ bản",
          "headingEn": "Present continuous vs present simple: the basic use",
          "intro": "Compare:",
          "introVi": "So sánh:",
          "body": "We use the *present continuous* (**I am doing**) for things happening at or around the time of speaking. The action is not complete.\n\nWe use the *present simple* (**I do**) for things in general, or things that happen repeatedly.\n\nWe also use the continuous for temporary situations, things that continue only for a short time, and the simple for permanent situations, things that continue for a long time.\n\nSee Unit 1 for more information about the *present continuous* and Unit 2 for the *present simple*.",
          "bodyVi": "Chúng ta dùng *hiện tại tiếp diễn* (**I am doing**) cho những việc đang xảy ra tại hoặc quanh thời điểm nói. Hành động đó chưa hoàn thành.\n\nChúng ta dùng *hiện tại đơn* (**I do**) cho những việc nói chung, hoặc những việc xảy ra lặp đi lặp lại.\n\nChúng ta cũng dùng thể tiếp diễn cho các tình huống tạm thời, những việc chỉ tiếp diễn trong thời gian ngắn, và thể đơn cho các tình huống lâu dài, những việc tiếp diễn trong thời gian dài.\n\nXem Unit 1 để biết thêm về *hiện tại tiếp diễn* và Unit 2 để biết thêm về *hiện tại đơn*.",
          "examples": [
            {
              "en": "The water **is boiling**. Be careful.",
              "note": "continuous: happening now",
              "vi": "Nước đang sôi. Cẩn thận đấy."
            },
            {
              "en": "Water **boils** at 100 degrees Celsius.",
              "note": "simple: a general fact",
              "vi": "Nước sôi ở 100 độ C."
            },
            {
              "en": "Listen to those people. What language **are they speaking**?",
              "note": "continuous: happening now",
              "vi": "Nghe những người đó xem. Họ đang nói ngôn ngữ gì vậy?"
            },
            {
              "en": "Excuse me, **do you speak** English?",
              "note": "simple: in general",
              "vi": "Xin lỗi, bạn có nói được tiếng Anh không?"
            },
            {
              "en": "Let's go out. It **isn't raining** *now*.",
              "note": "continuous: at the time of speaking",
              "vi": "Đi ra ngoài thôi. Bây giờ trời không mưa."
            },
            {
              "en": "It **doesn't rain** very much in summer.",
              "note": "simple: in general",
              "vi": "Mùa hè trời không mưa nhiều."
            },
            {
              "en": "'I'm busy.' 'What **are you doing**?'",
              "note": "continuous: now",
              "vi": "'Tôi đang bận.' 'Bạn đang làm gì vậy?'"
            },
            {
              "en": "What **do you usually do** at weekends?",
              "note": "simple: repeated action",
              "vi": "Bạn thường làm gì vào cuối tuần?"
            },
            {
              "en": "I**'m getting** hungry. Let's go and eat.",
              "note": "continuous: around now",
              "vi": "Tôi đang thấy đói. Đi ăn thôi."
            },
            {
              "en": "I always **get** hungry in the afternoon.",
              "note": "simple: happens repeatedly",
              "vi": "Tôi luôn cảm thấy đói vào buổi chiều."
            },
            {
              "en": "Kate wants to work in Italy, so she**'s learning** Italian.",
              "note": "continuous: around the time of speaking",
              "vi": "Kate muốn làm việc ở Ý, vì vậy cô ấy đang học tiếng Ý."
            },
            {
              "en": "Most people **learn** to swim when they are children.",
              "note": "simple: in general",
              "vi": "Hầu hết mọi người học bơi khi còn nhỏ."
            },
            {
              "en": "The population of the world **is increasing** very fast.",
              "note": "continuous: changing around now",
              "vi": "Dân số thế giới đang tăng rất nhanh."
            },
            {
              "en": "Every day the population of the world **increases** by about 200,000 people.",
              "note": "simple: repeated",
              "vi": "Mỗi ngày dân số thế giới tăng thêm khoảng 200.000 người."
            },
            {
              "en": "I**'m living** with some friends until I find a place of my own.",
              "note": "continuous: a temporary situation",
              "vi": "Tôi đang sống cùng vài người bạn cho đến khi tìm được chỗ ở riêng."
            },
            {
              "en": "My parents **live** in London. They have lived there all their lives.",
              "note": "simple: a permanent situation",
              "vi": "Bố mẹ tôi sống ở London. Họ đã sống ở đó suốt cả cuộc đời."
            },
            {
              "en": "a: You**'re working** hard today. b: Yes, I have a lot to do.",
              "note": "continuous: temporary, today only",
              "vi": "a: Hôm nay bạn làm việc chăm chỉ đấy. b: Vâng, tôi có nhiều việc phải làm."
            },
            {
              "en": "Joe isn't lazy. He **works** hard most of the time.",
              "note": "simple: permanent, in general",
              "vi": "Joe không lười đâu. Anh ấy làm việc chăm chỉ hầu hết thời gian."
            }
          ]
        },
        {
          "label": "B",
          "heading": "I always do và I'm always doing",
          "headingEn": "I always do and I'm always doing",
          "body": "**I always do** something means I do it every time.\n\n**I'm always doing** something means that I do it too often, or more often than normal. It is usually a way of complaining or of saying that something is annoying or surprising.",
          "bodyVi": "**I always do** something nghĩa là tôi làm việc đó mỗi lần, lần nào cũng vậy.\n\n**I'm always doing** something nghĩa là tôi làm việc đó quá thường xuyên, hoặc thường xuyên hơn mức bình thường. Đây thường là cách để phàn nàn hoặc nói rằng điều gì đó gây khó chịu hay bất ngờ.",
          "examples": [
            {
              "en": "**I always go** to work by car.",
              "note": "not I'm always going",
              "vi": "Tôi luôn đi làm bằng ô tô."
            },
            {
              "en": "I've lost my keys again. I**'m always losing** them.",
              "note": "= I lose them too often, or more often than normal",
              "vi": "Tôi lại làm mất chìa khóa nữa rồi. Tôi cứ hay làm mất chúng."
            },
            {
              "en": "Paul is never satisfied. He**'s always complaining**.",
              "note": "= he complains too much",
              "vi": "Paul chẳng bao giờ hài lòng. Anh ấy cứ phàn nàn suốt."
            },
            {
              "en": "You**'re always looking** at your phone. Don't you have anything else to do?",
              "note": "= you look at it too often",
              "vi": "Bạn cứ nhìn điện thoại suốt vậy. Bạn không có việc gì khác để làm sao?"
            }
          ]
        }
      ]
    },
    {
      "kind": "judge_correct",
      "title": "3.1 · Động từ gạch chân đúng hay sai?",
      "titleEn": "3.1 · Are the underlined verbs right or wrong?",
      "instructions": "Các động từ được gạch chân đã dùng đúng chưa? Nếu đúng thì chọn Đúng rồi, nếu sai thì chọn Cần sửa và viết lại cho đúng.",
      "instructionsEn": "Are the underlined verbs used correctly? If they are, choose Correct; if not, choose Needs fixing and write the correct form.",
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
      "titleEn": "3.2 · Put the verb into the correct form: continuous or simple (sentence pairs a/b)",
      "instructions": "Đặt động từ vào đúng dạng, hiện tại tiếp diễn hoặc hiện tại đơn. Chú ý sự khác nhau giữa câu a và câu b trong từng cặp.",
      "instructionsEn": "Put the verb into the correct form, present continuous or present simple. Pay attention to the difference between sentence a and sentence b in each pair.",
      "passage": "Ví dụ trong sách: 1 a I usually **get** (I / usually / get) hungry in the afternoon. b I**'m getting** (I / get) hungry. Let's go and eat something.",
      "passageEn": "Example from the book: 1 a I usually **get** (I / usually / get) hungry in the afternoon. b I**'m getting** (I / get) hungry. Let's go and eat something.",
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
      "titleEn": "3.3 · Put the verb into the correct form: continuous or simple",
      "instructions": "Đặt động từ trong ngoặc vào đúng dạng, hiện tại tiếp diễn hoặc hiện tại đơn.",
      "instructionsEn": "Put the verb in brackets into the correct form, present continuous or present simple.",
      "passage": "Ví dụ trong sách: 1 Why are all these people here? What**'s happening** (What / happen)?",
      "passageEn": "Example from the book: 1 Why are all these people here? What**'s happening** (What / happen)?",
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
      "titleEn": "3.4 · Complete B's sentences with always + -ing",
      "instructions": "Hoàn thành câu của người B. Dùng always cùng với động từ ở dạng -ing để nói rằng việc đó xảy ra quá thường xuyên.",
      "instructionsEn": "Complete B's sentences. Use always with the -ing form of the verb to say that something happens too often.",
      "passage": "Ví dụ trong sách: 1 a: I've lost my keys again. b: Not again! You**'re always losing** your keys.",
      "passageEn": "Example from the book: 1 a: I've lost my keys again. b: Not again! You**'re always losing** your keys.",
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
          "answer": "am always making the same mistake",
          "accept": [
            "'m always making the same mistake",
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
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh về chính bạn: dùng hiện tại tiếp diễn cho việc đang xảy ra lúc này hoặc tình huống tạm thời, hiện tại đơn cho thói quen hay sự thật chung, và có thể thêm một câu với always + V-ing để phàn nàn về việc gì đó xảy ra quá thường xuyên.",
      "instructionsEn": "Write 2-3 English sentences about yourself: use the present continuous for something happening right now or a temporary situation, the present simple for a habit or general fact, and you can add a sentence with always + V-ing to complain about something that happens too often.",
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
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Động từ không dùng ở dạng tiếp diễn",
          "headingEn": "Verbs not normally used in the continuous",
          "body": "We use continuous forms (**I'm waiting**, **it's raining** etc.) for actions and happenings that have started but not finished.\n\nSome verbs, for example *know* and *like*, are not normally used in this way. We don't say *I am knowing* or *they are liking*. We say *I know*, *they like*.\n\nThe following verbs are not normally used in the present continuous:",
          "bodyVi": "Chúng ta dùng các dạng tiếp diễn (**I'm waiting**, **it's raining** ...) để nói về hành động, sự việc đã bắt đầu nhưng chưa kết thúc.\n\nMột số động từ, ví dụ *know* và *like*, thường không được dùng theo cách này. Chúng ta không nói *I am knowing* hay *they are liking*. Chúng ta nói *I know*, *they like*.\n\nCác động từ sau thường không được dùng ở thì hiện tại tiếp diễn:",
          "wordList": [
            "like",
            "want",
            "need",
            "prefer",
            "know",
            "realise",
            "understand",
            "recognise",
            "believe",
            "suppose",
            "remember",
            "mean",
            "belong",
            "fit",
            "contain",
            "consist",
            "seem"
          ],
          "examples": [
            {
              "en": "I'm hungry. I **want** something to eat.",
              "note": "not I'm wanting",
              "vi": "Tôi đang đói. Tôi muốn ăn gì đó."
            },
            {
              "en": "Do you **understand** what I **mean**?",
              "vi": "Bạn có hiểu ý tôi muốn nói không?"
            },
            {
              "en": "Anna doesn't **seem** very happy right *now*.",
              "vi": "Anna có vẻ không vui lắm ngay *bây giờ*."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Động từ think",
          "headingEn": "think",
          "body": "When *think* means *believe* or have an opinion, we do not use the continuous.\n\nWhen *think* means *consider*, the continuous is possible.",
          "bodyVi": "Khi *think* mang nghĩa *believe* (tin rằng) hoặc để nêu quan điểm, chúng ta không dùng thể tiếp diễn.\n\nKhi *think* mang nghĩa *consider* (xem xét, cân nhắc), thể tiếp diễn có thể dùng được.",
          "examples": [
            {
              "en": "I **think** Mary is Canadian, but I'm not sure.",
              "note": "not I'm thinking",
              "vi": "Tôi nghĩ Mary là người Canada, nhưng tôi không chắc."
            },
            {
              "en": "What do you **think** of my idea?",
              "note": "= what is your opinion?",
              "vi": "Bạn nghĩ thế nào về ý tưởng của tôi?"
            },
            {
              "en": "I**'m thinking** about what happened. I often **think** about it.",
              "vi": "Tôi đang suy nghĩ về việc đã xảy ra. Tôi thường nghĩ về nó."
            },
            {
              "en": "Nicky **is thinking** of giving up her job.",
              "note": "= she is considering it",
              "vi": "Nicky đang cân nhắc việc bỏ công việc của mình."
            }
          ]
        },
        {
          "label": "C",
          "heading": "Các động từ see, hear, smell, taste, look, feel",
          "headingEn": "see, hear, smell, taste, look, feel",
          "body": "We normally use the present simple, not the continuous, with *see*, *hear*, *smell* and *taste*.\n\nYou can use either the present simple or the present continuous to say how somebody looks or feels *now*, but not for something that is generally true.",
          "bodyVi": "Chúng ta thường dùng thì hiện tại đơn, không dùng thể tiếp diễn, với *see*, *hear*, *smell* và *taste*.\n\nBạn có thể dùng thì hiện tại đơn hoặc hiện tại tiếp diễn để nói ai đó trông như thế nào hoặc cảm thấy thế nào ngay *bây giờ*, nhưng không dùng thể tiếp diễn cho điều gì đúng nói chung.",
          "examples": [
            {
              "en": "Do you **see** that man over there?",
              "note": "not are you seeing",
              "vi": "Bạn có thấy người đàn ông đằng kia không?"
            },
            {
              "en": "The room **smells**. Let's open a window.",
              "vi": "Phòng này có mùi. Mở cửa sổ ra đi."
            },
            {
              "en": "This soup doesn't **taste** very good.",
              "vi": "Món súp này không ngon lắm."
            },
            {
              "en": "You **look** well today. or You**'re looking** well today.",
              "vi": "Hôm nay bạn trông khỏe đấy. hoặc Hôm nay bạn đang trông khỏe đấy."
            },
            {
              "en": "How do you **feel** now? or How **are** you **feeling** now?",
              "vi": "Bây giờ bạn cảm thấy thế nào? hoặc Bây giờ bạn đang cảm thấy thế nào?"
            },
            {
              "en": "I usually **feel** tired in the morning.",
              "note": "not I'm usually feeling",
              "vi": "Tôi thường cảm thấy mệt vào buổi sáng."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Cách dùng am/is/are being",
          "headingEn": "am/is/are being",
          "body": "You can say **he's being** ..., **you're being** ... etc. to say how somebody is behaving *now*.\n\nCompare this with the simple form, which describes what a person is like generally, not only *now*.\n\nWe use **am/is/are being** to say how a person is behaving, that is, doing something they can control, at the moment. It is not usually possible in other situations.",
          "bodyVi": "Bạn có thể nói **he's being** ..., **you're being** ... để nói về cách ai đó đang cư xử ngay *bây giờ*.\n\nSo sánh với dạng đơn, diễn tả một người nói chung là như thế nào, không chỉ ngay bây giờ.\n\nChúng ta dùng **am/is/are being** để nói cách một người đang cư xử, tức là đang làm điều họ có thể kiểm soát, vào lúc này. Cách dùng này thường không áp dụng được trong các trường hợp khác.",
          "examples": [
            {
              "en": "I can't understand why he**'s being** so selfish. He isn't usually like that.",
              "note": "being selfish = behaving selfishly now",
              "vi": "Tôi không hiểu sao anh ấy lại đang ích kỷ như vậy. Anh ấy thường không như thế."
            },
            {
              "en": "'The path is icy. Don't slip.' 'Don't worry. I**'m being** very careful.'",
              "vi": "'Đường trơn đấy. Đừng trượt ngã.' 'Đừng lo. Tôi đang rất cẩn thận.'"
            },
            {
              "en": "He never thinks about other people. He**'s** very selfish.",
              "note": "= he is selfish generally, not only now",
              "vi": "Anh ấy chẳng bao giờ nghĩ tới người khác. Anh ấy rất ích kỷ."
            },
            {
              "en": "I don't like to take risks. I**'m** a very careful person.",
              "vi": "Tôi không thích liều lĩnh. Tôi là người rất cẩn thận."
            },
            {
              "en": "Sam **is** ill.",
              "note": "not is being ill",
              "vi": "Sam đang bị ốm."
            },
            {
              "en": "**Are** you tired?",
              "note": "not are you being tired",
              "vi": "Bạn có mệt không?"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "4.1 · Chia động từ: tiếp diễn hay đơn",
      "titleEn": "4.1 · Put the verb into the correct form, present continuous or present simple",
      "instructions": "Chia động từ trong ngoặc sang dạng đúng: hiện tại tiếp diễn hoặc hiện tại đơn. Ví dụ: Are you hungry? Do you want (you / want) something to eat?",
      "instructionsEn": "Put the verb in brackets into the correct form: present continuous or present simple. Example: Are you hungry? Do you want (you / want) something to eat?",
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
      "titleEn": "4.2 · Use the words in brackets to make sentences",
      "instructions": "Dùng các từ trong ngoặc để viết thành câu hoàn chỉnh, chọn hiện tại đơn hoặc hiện tại tiếp diễn cho phù hợp với tình huống. Ví dụ 1: (you / not / seem / very happy today) là You don't seem very happy today.",
      "instructionsEn": "Use the words in brackets to write complete sentences, choosing the present simple or present continuous to fit the situation. Example 1: (you / not / seem / very happy today) is You don't seem very happy today.",
      "passage": "Mỗi tình huống là một đoạn hội thoại ngắn. Hãy viết câu cho phần được cho trong ngoặc.",
      "passageEn": "Each situation is a short conversation. Write the sentence for the part given in brackets.",
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
      "titleEn": "4.3 · Are the underlined verbs OK or wrong?",
      "instructions": "Các động từ được gạch chân có đúng không? Nếu sai, hãy sửa lại. Ví dụ: It's not true. I'm not believing it. sửa thành I don't believe it.",
      "instructionsEn": "Are the underlined verbs OK? Correct them where necessary. Example: It's not true. I'm not believing it. corrected to I don't believe it.",
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
      "titleEn": "4.4 · is/are being or is/are",
      "instructions": "Hoàn thành câu. Dùng is/are being (tiếp diễn) hoặc is/are (đơn). Ví dụ: I can't understand why he's being so selfish. He isn't usually like that.",
      "instructionsEn": "Complete the sentences. Use is/are being (continuous) or is/are (simple). Example: I can't understand why he's being so selfish. He isn't usually like that.",
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
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng đúng điểm ngữ pháp này: một câu với động từ chỉ trạng thái (want, know, believe, seem, belong, fit...) ở hiện tại đơn, và một câu dùng hiện tại tiếp diễn cho hành động đang diễn ra hoặc dùng is/are being để nói về cách ai đó đang cư xử lúc này.",
      "instructionsEn": "Write 2-3 English sentences using this grammar point correctly: one sentence with a state verb (want, know, believe, seem, belong, fit, etc.) in the present simple, and one sentence using the present continuous for an action in progress or is/are being to talk about how someone is behaving right now.",
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
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Quá khứ đơn dùng cho hành động đã kết thúc trong quá khứ",
          "headingEn": "Past simple for actions that finished in the past",
          "intro": "Study this example:",
          "introVi": "Hãy xem ví dụ sau:",
          "body": "Wolfgang Amadeus Mozart was an Austrian musician and composer. He **lived** from 1756 to 1791. He **started** composing at the age of five and **wrote** more than 600 pieces of music. He **was** only 35 years old when he **died**.\n\nThe forms **lived**, **started**, **wrote**, **was** and **died** are all *past simple*. We use the past simple to talk about actions and situations that finished at a definite time in the past.",
          "bodyVi": "Wolfgang Amadeus Mozart là một nhạc sĩ và nhà soạn nhạc người Áo. Ông **sống** từ năm 1756 đến 1791. Ông **bắt đầu** soạn nhạc từ khi mới năm tuổi và đã **viết** hơn 600 tác phẩm âm nhạc. Ông chỉ mới 35 tuổi khi ông **qua đời**.\n\nCác dạng **lived**, **started**, **wrote**, **was** và **died** đều là *quá khứ đơn*. Chúng ta dùng quá khứ đơn để nói về những hành động và tình huống đã kết thúc tại một thời điểm xác định trong quá khứ.",
          "examples": [
            {
              "en": "He **lived** from 1756 to 1791.",
              "vi": "Ông sống từ năm 1756 đến 1791."
            },
            {
              "en": "He **started** composing at the age of five and **wrote** more than 600 pieces of music.",
              "vi": "Ông bắt đầu soạn nhạc từ khi mới năm tuổi và đã viết hơn 600 tác phẩm âm nhạc."
            },
            {
              "en": "He **was** only 35 years old when he **died**.",
              "vi": "Ông chỉ mới 35 tuổi khi ông qua đời."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Động từ có quy tắc (-ed) và động từ bất quy tắc",
          "headingEn": "Regular (-ed) and irregular verbs",
          "body": "Very often the past simple ends in **-ed**. These are regular verbs. For spelling rules such as **stopped** and **studied**, see Appendix 6.\n\nBut many verbs are irregular: the past simple does not end in -ed. For a list of irregular verbs, see Appendix 1.",
          "bodyVi": "Quá khứ đơn thường tận cùng bằng **-ed**. Đây là các động từ có quy tắc. Về các quy tắc chính tả như **stopped** và **studied**, xem Phụ lục 6.\n\nNhưng nhiều động từ là bất quy tắc: quá khứ đơn của chúng không tận cùng bằng -ed. Xem danh sách động từ bất quy tắc ở Phụ lục 1.",
          "table": {
            "rows": [
              ["work", "**worked**"],
              ["invite", "**invited**"],
              ["decide", "**decided**"],
              ["stop", "**stopped**"],
              ["pass", "**passed**"],
              ["study", "**studied**"],
              ["write", "**wrote**"],
              ["see", "**saw**"],
              ["go", "**went**"],
              ["shut", "**shut** (no change)"]
            ]
          },
          "examples": [
            {
              "en": "I work in a travel agency now. Before that I **worked** in a department store.",
              "vi": "Bây giờ tôi làm việc ở một công ty du lịch. Trước đó tôi đã làm việc ở một cửa hàng bách hóa."
            },
            {
              "en": "They **invited** us to their party, but we **decided** not to go.",
              "vi": "Họ đã mời chúng tôi đến dự tiệc của họ, nhưng chúng tôi đã quyết định không đi."
            },
            {
              "en": "The police **stopped** me on my way home last night.",
              "vi": "Cảnh sát đã chặn tôi lại trên đường về nhà tối qua."
            },
            {
              "en": "Laura **passed** her exam because she **studied** very hard.",
              "vi": "Laura đã đậu kỳ thi vì cô ấy đã học rất chăm chỉ."
            },
            {
              "en": "Mozart **wrote** more than 600 pieces of music.",
              "note": "write - wrote",
              "vi": "Mozart đã viết hơn 600 tác phẩm âm nhạc."
            },
            {
              "en": "We **saw** Alice in town a few days ago.",
              "note": "see - saw",
              "vi": "Chúng tôi đã gặp Alice trong thành phố vài ngày trước."
            },
            {
              "en": "I **went** to the cinema three times last week.",
              "note": "go - went",
              "vi": "Tôi đã đi xem phim ba lần vào tuần trước."
            },
            {
              "en": "It was cold, so I **shut** the window.",
              "note": "shut - shut",
              "vi": "Trời lạnh, nên tôi đã đóng cửa sổ lại."
            }
          ]
        },
        {
          "label": "C",
          "heading": "Câu hỏi và câu phủ định: did / didn't + nguyên thể",
          "headingEn": "Questions and negatives: did / didn't + infinitive",
          "body": "In questions and negative sentences we use **did / didn't** + infinitive (enjoy / see / go etc.), not the past form: *did you enjoy?*, *did she see?*, *did they go?*, I **didn't enjoy**, she **didn't see**, they **didn't go**.\n\nSometimes **do** is the main verb in the sentence, so we get *did you do?* and I **didn't do**.",
          "bodyVi": "Trong câu hỏi và câu phủ định, chúng ta dùng **did / didn't** + động từ nguyên thể (enjoy / see / go...), không dùng dạng quá khứ: *did you enjoy?*, *did she see?*, *did they go?*, tôi **didn't enjoy**, cô ấy **didn't see**, họ **didn't go**.\n\nĐôi khi **do** chính là động từ chính trong câu, nên ta có *did you do?* và tôi **didn't do**.",
          "examples": [
            {
              "en": "I **enjoyed** the party a lot. **Did** you **enjoy** it?",
              "vi": "Tôi đã rất thích buổi tiệc đó. Bạn có thích nó không?"
            },
            {
              "en": "How many people **did** they **invite** to the wedding?",
              "vi": "Họ đã mời bao nhiêu người đến đám cưới?"
            },
            {
              "en": "I **didn't buy** anything because I **didn't have** any money.",
              "vi": "Tôi không mua gì cả vì tôi không có tiền."
            },
            {
              "en": "'**Did** you **go** out?' 'No, I **didn't**.'",
              "vi": "'Bạn có ra ngoài không?' 'Không, tôi không có.'"
            },
            {
              "en": "What **did** you **do** at the weekend?",
              "note": "not What did you at the weekend?",
              "vi": "Bạn đã làm gì vào cuối tuần?"
            },
            {
              "en": "I **didn't do** anything.",
              "note": "not I didn't anything",
              "vi": "Tôi không làm gì cả."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Quá khứ của be: was / were",
          "headingEn": "The past of be: was / were",
          "body": "The past of **am / is / are** is **was / were**.\n\n**I/he/she/it was, wasn't**; **we/you/they were, weren't**. Questions: **was I/he/she/it?** and **were we/you/they?**\n\nNote that we do not use *did* with **was** and **were**.",
          "bodyVi": "Quá khứ của **am / is / are** là **was / were**.\n\n**I/he/she/it was, wasn't**; **we/you/they were, weren't**. Câu hỏi: **was I/he/she/it?** và **were we/you/they?**\n\nLưu ý là chúng ta không dùng *did* với **was** và **were**.",
          "examples": [
            {
              "en": "I **was** annoyed because they **were** late.",
              "vi": "Tôi đã bực vì họ đến muộn."
            },
            {
              "en": "**Was** the weather good when you **were** on holiday?",
              "vi": "Thời tiết có tốt không khi bạn đi nghỉ?"
            },
            {
              "en": "They **weren't** able to come because they **were** so busy.",
              "vi": "Họ không thể đến vì họ quá bận."
            },
            {
              "en": "I **wasn't** hungry, so I **didn't eat** anything.",
              "vi": "Tôi không đói, nên tôi không ăn gì cả."
            },
            {
              "en": "**Did** you go out last night or **were** you too tired?",
              "vi": "Bạn có ra ngoài tối qua không, hay bạn quá mệt?"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "5.1 · Laura đã làm gì hôm qua",
      "titleEn": "5.1 · What Laura did yesterday",
      "instructions": "Đọc lời Laura kể về một ngày làm việc điển hình. Hôm qua là một ngày làm việc điển hình của Laura. Viết những việc cô ấy đã làm hoặc đã không làm hôm qua, dùng thì quá khứ đơn.",
      "instructionsEn": "Read what Laura says about a typical working day. Yesterday was a typical working day for Laura. Write what she did or didn't do yesterday, using the past simple.",
      "passage": "LAURA: I usually get up at 7 o'clock and have a big breakfast. I walk to work, which takes me about half an hour. I start work at 8.45. I never have lunch. I finish work at 5 o'clock. I'm always tired when I get home. I usually cook a meal in the evening. I don't usually go out. I go to bed at about 11 o'clock, and I always sleep well.\n\nVí dụ: 1 She got up at 7 o'clock.",
      "passageEn": "LAURA: I usually get up at 7 o'clock and have a big breakfast. I walk to work, which takes me about half an hour. I start work at 8.45. I never have lunch. I finish work at 5 o'clock. I'm always tired when I get home. I usually cook a meal in the evening. I don't usually go out. I go to bed at about 11 o'clock, and I always sleep well.\n\nExample: 1 She got up at 7 o'clock.",
      "startNumber": 2,
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
      "titleEn": "5.2 · Complete the sentences with the given verbs",
      "instructions": "Hoàn thành các câu sau, dùng những động từ trong khung ở dạng quá khứ đơn đúng.",
      "instructionsEn": "Complete the following sentences, using the verbs in the box in the correct past simple form.",
      "passage": "buy   catch   cost   fall   hurt   sell   spend   teach   throw   write\n\nVí dụ: 1 Mozart wrote more than 600 pieces of music.",
      "passageEn": "buy   catch   cost   fall   hurt   sell   spend   teach   throw   write\n\nExample: 1 Mozart wrote more than 600 pieces of music.",
      "startNumber": 2,
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
      "titleEn": "5.3 · Write questions about James's holiday",
      "instructions": "Bạn hỏi James về kỳ nghỉ của anh ấy ở Mỹ. Dựa vào câu trả lời của James, viết câu hỏi của bạn ở thì quá khứ đơn.",
      "instructionsEn": "You ask James about his holiday in the US. Based on James's answers, write your questions in the past simple.",
      "passage": "Ví dụ:\nYOU: Where did you go?\nJAMES: To the US. We went on a trip from San Francisco to Denver.",
      "passageEn": "Example:\nYOU: Where did you go?\nJAMES: To the US. We went on a trip from San Francisco to Denver.",
      "startNumber": 2,
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
      "titleEn": "5.4 · Positive or negative form",
      "instructions": "Hoàn thành các câu. Chia động từ trong ngoặc ở thì quá khứ đơn, dạng khẳng định hoặc phủ định cho phù hợp.",
      "instructionsEn": "Complete the sentences. Put the verb in brackets into the past simple, positive or negative form as appropriate.",
      "passage": "Ví dụ:\n1 It was warm, so I took off my coat. (take)\n2 The film wasn't very good. I didn't enjoy it much. (enjoy)",
      "passageEn": "Example:\n1 It was warm, so I took off my coat. (take)\n2 The film wasn't very good. I didn't enjoy it much. (enjoy)",
      "startNumber": 3,
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
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh kể về những việc bạn đã làm hoặc đã không làm hôm qua, dùng thì quá khứ đơn (gồm ít nhất một câu phủ định với didn't hoặc một câu dùng was/were).",
      "instructionsEn": "Write 2-3 English sentences about what you did or didn't do yesterday, using the past simple (including at least one negative sentence with didn't or one sentence using was/were).",
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
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Cách thành lập: was/were + -ing",
          "headingEn": "Formation: was/were + -ing",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "Yesterday Karen and Joe played tennis. They started at 10 o'clock and finished at 11.30. So, at 10.30 they **were playing** tennis.\n\n\"They **were playing**\" means they were in the middle of playing; they had not finished.\n\n**was/were + -ing** is the *past continuous*:",
          "bodyVi": "Hôm qua Karen và Joe chơi tennis. Họ bắt đầu lúc 10 giờ và kết thúc lúc 11 giờ 30. Vậy, vào lúc 10 giờ 30 họ đang chơi tennis.\n\n\"Họ đang chơi\" có nghĩa là họ đang chơi giữa chừng, họ chưa chơi xong.\n\nwas/were + -ing là thì quá khứ tiếp diễn:",
          "table": {
            "rows": [
              [
                "I/he/she/it",
                "**was** playing"
              ],
              [
                "we/you/they",
                "**were** playing (doing, working etc.)"
              ]
            ]
          },
          "examples": [
            {
              "en": "Yesterday Karen and Joe played tennis. They started at 10 o'clock and finished at 11.30.",
              "note": "past simple: the complete action",
              "vi": "Hôm qua Karen và Joe chơi tennis. Họ bắt đầu lúc 10 giờ và kết thúc lúc 11 giờ 30."
            },
            {
              "en": "At 10.30 they **were playing** tennis.",
              "note": "= they were in the middle of playing, they had not finished",
              "vi": "Vào lúc 10 giờ 30 họ đang chơi tennis."
            },
            {
              "en": "he/she/it **was playing**",
              "note": "was + -ing",
              "vi": "anh ấy/cô ấy/nó đang chơi"
            },
            {
              "en": "we/you/they **were doing**",
              "note": "were + -ing",
              "vi": "chúng tôi/bạn/họ đang làm"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Nghĩa: đang ở giữa một hành động trong quá khứ",
          "headingEn": "Meaning: in the middle of a past action",
          "body": "**I was doing** something means I was in the middle of doing it at a certain time. The action or situation started before this time, but had not finished.\n\nSo the order is: I started doing, I **was doing**, I finished doing, and the time we are talking about is somewhere in the middle.",
          "bodyVi": "I was doing something (tôi đang làm gì đó) có nghĩa là tôi đang làm việc đó giữa chừng vào một thời điểm nhất định. Hành động hoặc tình huống đã bắt đầu trước thời điểm đó nhưng chưa kết thúc.\n\nVậy trình tự là: tôi bắt đầu làm, tôi đang làm, tôi làm xong, và thời điểm chúng ta đang nói tới nằm ở giữa quá trình đó.",
          "examples": [
            {
              "en": "This time last year I **was living** in Hong Kong.",
              "vi": "Vào thời điểm này năm ngoái, tôi đang sống ở Hồng Kông."
            },
            {
              "en": "What **were** you **doing** at 10 o'clock last night?",
              "vi": "Bạn đang làm gì vào lúc 10 giờ tối hôm qua?"
            },
            {
              "en": "I waved to Helen, but she **wasn't looking**.",
              "vi": "Tôi vẫy tay chào Helen, nhưng cô ấy không nhìn."
            }
          ]
        },
        {
          "label": "C",
          "heading": "So sánh I was doing và I did",
          "headingEn": "Compare I was doing and I did",
          "intro": "Compare **I was doing** (*past continuous*) and **I did** (*past simple*):",
          "introVi": "So sánh I was doing (*quá khứ tiếp diễn*) và I did (*quá khứ đơn*):",
          "body": "**I was doing** (= in the middle of an action) is different from **I did** (= a complete action).",
          "bodyVi": "I was doing (đang làm giữa chừng) khác với I did (đã làm xong, một hành động hoàn tất).",
          "examples": [
            {
              "en": "We **were walking** home when I met Dan.",
              "note": "in the middle of walking home",
              "vi": "Chúng tôi đang đi bộ về nhà thì tôi gặp Dan."
            },
            {
              "en": "We walked home after the party last night.",
              "note": "= all the way, completely",
              "vi": "Chúng tôi đã đi bộ về nhà sau buổi tiệc tối qua."
            },
            {
              "en": "Kate **was watching** TV when we arrived.",
              "note": "she had already started before we arrived",
              "vi": "Kate đang xem TV khi chúng tôi đến."
            },
            {
              "en": "Kate watched TV a lot when she was ill last year.",
              "note": "past simple: complete action",
              "vi": "Kate đã xem TV rất nhiều khi cô ấy bị bệnh năm ngoái."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Một việc xảy ra giữa lúc việc khác đang diễn ra",
          "headingEn": "One thing happening in the middle of another",
          "body": "You can say that something happened (past simple) in the middle of something else (past continuous).\n\nBut we use the past simple to say that one thing happened after another.\n\nCompare:",
          "bodyVi": "Bạn có thể nói rằng một việc gì đó đã xảy ra (quá khứ đơn) ngay giữa lúc một việc khác đang diễn ra (quá khứ tiếp diễn).\n\nNhưng chúng ta dùng quá khứ đơn để nói rằng việc này xảy ra rồi mới đến việc kia, lần lượt.\n\nSo sánh:",
          "examples": [
            {
              "en": "Matt phoned while we **were having** dinner.",
              "vi": "Matt gọi điện khi chúng tôi đang ăn tối."
            },
            {
              "en": "It **was raining** when I got up.",
              "vi": "Trời đang mưa khi tôi ngủ dậy."
            },
            {
              "en": "I saw you in the park yesterday. You **were sitting** on the grass and reading a book.",
              "vi": "Tôi thấy bạn ở công viên hôm qua. Bạn đang ngồi trên cỏ và đọc sách."
            },
            {
              "en": "I hurt my back while I **was working** in the garden.",
              "vi": "Tôi bị đau lưng khi đang làm việc trong vườn."
            },
            {
              "en": "I **was walking** along the road when I saw Dan. So I stopped, and we talked for a while.",
              "note": "past simple for one thing after another",
              "vi": "Tôi đang đi bộ trên đường thì tôi thấy Dan. Vì vậy tôi dừng lại, và chúng tôi nói chuyện một lúc."
            },
            {
              "en": "When Karen arrived, we **were having** dinner.",
              "note": "= we had already started before she arrived",
              "vi": "Khi Karen đến, chúng tôi đang ăn tối."
            },
            {
              "en": "When Karen arrived, we had dinner.",
              "note": "= Karen arrived, and then we had dinner",
              "vi": "Khi Karen đến, chúng tôi mới ăn tối."
            }
          ]
        },
        {
          "label": "E",
          "heading": "Động từ không dùng ở thể tiếp diễn",
          "headingEn": "Verbs not used in the continuous",
          "body": "Some verbs (for example, *know* and *want*) are not normally used in continuous forms (is + -ing, **was** + **-ing** etc.). See Unit 4A for a list of these verbs.",
          "bodyVi": "Một số động từ (ví dụ *know* và *want*) thường không dùng ở thể tiếp diễn (is + -ing, **was** + **-ing**, v.v.). Xem Unit 4A để biết danh sách các động từ này.",
          "examples": [
            {
              "en": "We were good friends. We knew each other well.",
              "note": "not we were knowing",
              "vi": "Chúng tôi là những người bạn tốt. Chúng tôi biết rõ về nhau."
            },
            {
              "en": "I **was enjoying** the party, but Chris wanted to go home.",
              "note": "not was wanting",
              "vi": "Tôi đang thích thú với buổi tiệc, nhưng Chris muốn về nhà."
            }
          ]
        }
      ]
    },
    {
      "kind": "match_pairs",
      "title": "6.1 · Chọn cụm động từ đúng",
      "titleEn": "6.1 · Choose the correct verb phrase",
      "instructions": "Câu 1 đã có mẫu: Yesterday she was wearing trousers. Chạm một câu bên trái, sau đó chạm cụm động từ phù hợp bên phải để hoàn thành câu đó.",
      "instructionsEn": "Sentence 1 is already done as an example: Yesterday she was wearing trousers. Tap a sentence on the left, then tap the verb phrase on the right that completes it.",
      "left": [
        "\"What did he say?\" \"I don't know. I ___.\"",
        "We ___ at the back of the theatre. We couldn't hear very well.",
        "This time last year Steve ___ on a farm.",
        "They didn't see me. They ___ in my direction.",
        "The weather was bad. It was very cold and it ___.",
        "I saw you in your car. Where ___?",
        "I saw Kate a few minutes ago. She ___ for you."
      ],
      "right": [
        "was looking",
        "wasn't listening",
        "weren't looking",
        "was snowing",
        "was working",
        "were sitting",
        "were you going"
      ],
      "answers": [
        "wasn't listening",
        "were sitting",
        "was working",
        "weren't looking",
        "was snowing",
        "were you going",
        "was looking"
      ]
    },
    {
      "kind": "match_pairs",
      "title": "6.2 · Nối hai vế câu",
      "titleEn": "6.2 · Match the two halves of each sentence",
      "instructions": "Vế nào đi với vế nào? Chạm một vế câu bên trái, sau đó chạm phần kết thúc phù hợp bên phải.",
      "instructionsEn": "Which goes with which? Tap a sentence half on the left, then tap the ending on the right that goes with it.",
      "left": [
        "When I got to the cafe",
        "We fell asleep",
        "Amy learnt Italian",
        "Tom didn't come out with us",
        "The car began to make a strange noise",
        "The TV was on",
        "When I first met Jessica"
      ],
      "right": [
        "when she was living in Rome.",
        "she was working in a clothes shop.",
        "when I was driving home.",
        "but nobody was watching it.",
        "while we were watching a film.",
        "my friends were waiting for me.",
        "because he wasn't feeling well."
      ],
      "answers": [
        "my friends were waiting for me.",
        "while we were watching a film.",
        "when she was living in Rome.",
        "because he wasn't feeling well.",
        "when I was driving home.",
        "but nobody was watching it.",
        "she was working in a clothes shop."
      ]
    },
    {
      "kind": "type_fill",
      "title": "6.3 · Hai mẩu chuyện ngắn",
      "titleEn": "6.3 · Two short stories",
      "instructions": "Chia động từ trong ngoặc ở thì quá khứ tiếp diễn hoặc quá khứ đơn. Mỗi câu chỉ điền vào chỗ trống được đánh dấu.",
      "instructionsEn": "Put the verb in brackets into the past continuous or the past simple. Each sentence has just one blank to fill in.",
      "passage": "Mẩu chuyện 1: gặp Sue ngoài phố. Mẩu chuyện 2: đạp xe về nhà và một người đàn ông bước ra đường.",
      "passageEn": "Story 1: seeing Sue in town. Story 2: cycling home when a man stepped out into the road.",
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
      "titleEn": "6.4 · Past continuous or past simple",
      "instructions": "Chia động từ trong ngoặc ở thì quá khứ tiếp diễn hoặc quá khứ đơn. Mỗi câu chỉ điền vào chỗ trống được đánh dấu.",
      "instructionsEn": "Put the verb in brackets into the past continuous or the past simple. Each sentence has just one blank to fill in.",
      "passage": "Ví dụ mẫu: Jenny was waiting (wait) for me when I arrived (arrive).",
      "passageEn": "Example: Jenny **was waiting** (wait) for me when I **arrived** (arrive).",
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
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2 đến 3 câu tiếng Anh dùng thì quá khứ tiếp diễn (**was/were + V-ing**) để kể một việc đang diễn ra trong quá khứ thì có việc khác xảy ra chen vào, ví dụ: I was cooking dinner when the phone rang.",
      "instructionsEn": "Write 2 to 3 English sentences using the past continuous (**was/were + V-ing**) to describe something that was happening in the past when another event interrupted it, for example: I was cooking dinner when the phone rang.",
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
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Cấu tạo hiện tại hoàn thành (have/has + past participle)",
          "headingEn": "Formation: have/has + past participle",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "Tom can't find his key. He**'s lost** his key. (= He **has lost** his key.)\n\n**has lost** his key = he lost it and he doesn't have it now.\n\n**have lost** / **has lost** is the *present perfect simple*.\n\nThe present perfect simple is **have/has + past participle**. The past participle often ends in *-ed* (finished, decided etc.), but many verbs are irregular (lost, done, written etc.).\n\nFor a list of irregular verbs, see Appendix 1.",
          "bodyVi": "Tom không tìm thấy chìa khóa của mình. Anh ấy **đã làm mất** chìa khóa. (= Anh ấy **đã làm mất** chìa khóa của mình.)\n\n**đã làm mất** chìa khóa có nghĩa là anh ấy làm mất nó và giờ không có nó nữa.\n\n**have lost** / **has lost** là *thì hiện tại hoàn thành đơn*.\n\nThì hiện tại hoàn thành đơn được tạo thành bởi **have/has + phân từ hai (past participle)**. Phân từ hai thường có đuôi *-ed* (finished, decided,...), nhưng nhiều động từ có dạng bất quy tắc (lost, done, written,...).\n\nXem danh sách động từ bất quy tắc ở Phụ lục 1.",
          "table": {
            "rows": [
              [
                "I/we/they/you",
                "**have** (**I've** etc.)",
                "finished / lost / done / been etc."
              ],
              [
                "he/she/it",
                "**has** (**he's** etc.)",
                "finished / lost / done / been etc."
              ]
            ]
          },
          "examples": [
            {
              "en": "I**'ve lost** my key.",
              "vi": "Tôi **đã làm mất** chìa khóa của mình."
            },
            {
              "en": "He**'s lost** his key.",
              "note": "= He **has lost** ...",
              "vi": "Anh ấy **đã làm mất** chìa khóa của mình."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Việc mới xảy ra và kết quả ở hiện tại; gone to / been to",
          "headingEn": "New information with a result now; gone to / been to",
          "body": "When we say 'something has happened', this is usually **new information**.\n\nWhen we use the present perfect, there is a connection with *now*: the action in the past has a result now.\n\nCompare **gone (to)** and **been (to)**: **has gone to** means the person is there now or on the way there, while **has been to** means the person has now come back.",
          "bodyVi": "Khi ta nói 'something has happened' (điều gì đó vừa xảy ra), đây thường là **thông tin mới**.\n\nKhi dùng thì hiện tại hoàn thành, có một sự liên kết với *hiện tại*: hành động trong quá khứ có một kết quả ở hiện tại.\n\nSo sánh **gone (to)** và **been (to)**: **has gone to** có nghĩa là người đó đang ở đó hoặc đang trên đường đến đó, còn **has been to** có nghĩa là người đó đã trở về rồi.",
          "examples": [
            {
              "en": "Ow! I**'ve cut** my finger.",
              "vi": "Ối! Tôi **vừa bị cắt** vào ngón tay."
            },
            {
              "en": "The road is closed. There**'s been** an accident.",
              "note": "= There has been ...",
              "vi": "Con đường bị chặn. **Vừa xảy ra** một vụ tai nạn."
            },
            {
              "en": "Police **have arrested** two men in connection with the robbery.",
              "vi": "Cảnh sát **đã bắt giữ** hai người đàn ông liên quan đến vụ trộm."
            },
            {
              "en": "Tom **has lost** his key.",
              "note": "= he doesn't have it now",
              "vi": "Tom **đã làm mất** chìa khóa của mình."
            },
            {
              "en": "He told me his name, but I**'ve forgotten** it.",
              "note": "= I can't remember it now",
              "vi": "Anh ấy đã nói tên cho tôi, nhưng tôi **đã quên** rồi."
            },
            {
              "en": "Sally is still here. She **hasn't gone** out.",
              "note": "= she is here now",
              "vi": "Sally vẫn còn ở đây. Cô ấy **chưa đi** ra ngoài."
            },
            {
              "en": "I can't find my bag. **Have** you **seen** it?",
              "note": "= do you know where it is now?",
              "vi": "Tôi không tìm thấy túi của mình. Bạn **có thấy** nó không?"
            },
            {
              "en": "James is on holiday. He **has gone** to Italy.",
              "note": "= he is there now or on his way there",
              "vi": "James đang đi nghỉ. Anh ấy **đã đi** đến Ý."
            },
            {
              "en": "Amy is back home now. She **has been** to Italy.",
              "note": "= she has now come back",
              "vi": "Amy đã về nhà rồi. Cô ấy **đã từng đi** Ý."
            }
          ]
        },
        {
          "label": "C",
          "heading": "just, already và yet",
          "headingEn": "just, already and yet",
          "body": "You can use the present perfect with **just**, **already** and **yet**.\n\n*Just* = a short time ago.\n\n*Already* = sooner than expected.\n\n*Yet* = until now; we use *yet* to show that we are expecting something to happen, and we use *yet* in questions and negative sentences.",
          "bodyVi": "Bạn có thể dùng thì hiện tại hoàn thành với **just**, **already** và **yet**.\n\n*Just* = mới vừa (một lúc trước).\n\n*Already* = đã ... rồi (sớm hơn dự kiến).\n\n*Yet* = cho đến giờ (vẫn chưa); ta dùng *yet* để cho thấy ta đang chờ điều gì đó xảy ra, và ta dùng *yet* trong câu hỏi và câu phủ định.",
          "examples": [
            {
              "en": "'Are you hungry?' 'No, I**'ve just had** lunch.'",
              "note": "just = a short time ago",
              "vi": "'Bạn có đói không?' 'Không, tôi **vừa mới ăn** trưa xong.'"
            },
            {
              "en": "Hello. **Have** you **just arrived**?",
              "vi": "Xin chào. Bạn **vừa mới đến** phải không?"
            },
            {
              "en": "'Don't forget to pay the bill.' 'I**'ve already paid** it.'",
              "note": "already = sooner than expected",
              "vi": "'Đừng quên trả tiền hóa đơn nhé.' 'Tôi **đã trả** rồi.'"
            },
            {
              "en": "'What time is Mark leaving?' 'He**'s already left**.'",
              "vi": "'Mấy giờ Mark đi vậy?' 'Anh ấy **đã đi** rồi.'"
            },
            {
              "en": "**Has** it **stopped raining** yet?",
              "note": "yet = until now, in questions",
              "vi": "Trời **đã hết mưa** chưa?"
            },
            {
              "en": "I**'ve written** the email, but I **haven't sent** it yet.",
              "note": "yet in negative sentences",
              "vi": "Tôi **đã viết** email rồi, nhưng tôi **chưa gửi** nó."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Có thể dùng quá khứ đơn thay thế",
          "headingEn": "The past simple is also possible",
          "body": "You can also use the **past simple** (did, went, had etc.) in the examples on this page. So both the *present perfect* and the *past simple* are possible in these situations.",
          "bodyVi": "Bạn cũng có thể dùng **thì quá khứ đơn** (did, went, had,...) trong các ví dụ ở trang này. Vì vậy cả *hiện tại hoàn thành* và *quá khứ đơn* đều có thể dùng trong các tình huống này.",
          "examples": [
            {
              "en": "Ben isn't here. He**'s gone** out.",
              "note": "or He went out.",
              "vi": "Ben không có ở đây. Anh ấy **đã đi ra ngoài**."
            },
            {
              "en": "'Are you hungry?' 'No, I**'ve just had** lunch.'",
              "note": "or 'No, I just had lunch.'",
              "vi": "'Bạn có đói không?' 'Không, tôi **vừa mới ăn** trưa xong.'"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "7.1 · Hoàn thành câu với hiện tại hoàn thành",
      "titleEn": "7.1 · Complete the sentences using the present perfect",
      "instructions": "Đọc các tình huống và hoàn thành câu bằng thì hiện tại hoàn thành. Chọn động từ trong danh sách cho sẵn. Ví dụ: Tom is looking for his key. He can't find it. Tom has lost his key.",
      "instructionsEn": "Read the situations and complete the sentences using the present perfect. Choose a verb from the list given. Example: Tom is looking for his key. He can't find it. Tom has lost his key.",
      "passage": "Chọn từ các động từ sau: break, disappear, go up, grow, improve, lose, shrink, stop",
      "passageEn": "Choose from these verbs: break, disappear, go up, grow, improve, lose, shrink, stop",
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
      "titleEn": "7.2 · Choose been or gone",
      "instructions": "Điền been hoặc gone vào chỗ trống. Ví dụ: My parents are on holiday. They've gone to Italy.",
      "instructionsEn": "Put in been or gone. Example: My parents are on holiday. They've gone to Italy.",
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
      "titleEn": "7.3 · Complete the sentences using the present perfect",
      "instructions": "Hoàn thành các câu bằng thì hiện tại hoàn thành, dùng các từ trong ngoặc. Ví dụ: Sally is still here. She hasn't gone (she / not / go) out.",
      "instructionsEn": "Complete the sentences using the present perfect, with the words in brackets. Example: Sally is still here. She hasn't gone (she / not / go) out.",
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
      "titleEn": "7.4 · Write sentences with just, already or yet",
      "instructions": "Đọc các tình huống và viết câu dùng just, already hoặc yet, với động từ cho trong ngoặc. Ví dụ: 'Would you like something to eat?' You say: No thank you. I've just had lunch. (have lunch)",
      "instructionsEn": "Read the situations and write sentences using just, already or yet, with the verb given in brackets. Example: 'Would you like something to eat?' You say: No thank you. I've just had lunch. (have lunch)",
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
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì hiện tại hoàn thành (have/has + past participle) để nói về việc vừa xảy ra và còn ảnh hưởng tới hiện tại, có thể dùng thêm just, already hoặc yet.",
      "instructionsEn": "Write 2-3 English sentences using the present perfect (have/has + past participle) to talk about something that has just happened and still has an effect now, optionally using just, already or yet.",
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
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Khoảng thời gian kéo dài từ quá khứ đến hiện tại",
          "headingEn": "A period continuing from the past until now",
          "intro": "Study this example conversation:",
          "introVi": "Hãy xem đoạn hội thoại ví dụ sau:",
          "body": "When we talk about a period of time that continues from the past until now, we use the *present perfect* (**have been** / **have travelled** etc.). Here, Dave and Jane are talking about the places Jane has visited in her life, which is a period that continues until now.\n\nIn the same way we say:\n\n**been (to)** means *visited*:",
          "bodyVi": "Khi nói về một khoảng thời gian kéo dài từ quá khứ đến hiện tại, chúng ta dùng *thì hiện tại hoàn thành* (**have been** / **have travelled**, v.v.). Ở đây, Dave và Jane đang nói về những nơi Jane đã từng đến trong đời, và cuộc đời một người là khoảng thời gian kéo dài đến hiện tại.\n\nTheo cách tương tự, chúng ta nói:\n\n**been (to)** có nghĩa là *đã đến, đã từng đến*:",
          "examples": [
            {
              "en": "**Have** you **travelled** a lot, Jane? Yes, I**'ve been** to lots of places.",
              "note": "Jane's life = a period until now",
              "vi": "Bạn đã đi du lịch nhiều chưa, Jane? Vâng, tôi đã từng đến rất nhiều nơi."
            },
            {
              "en": "**Have** you ever **been** to China? Yes, I**'ve been** to China twice.",
              "vi": "Bạn đã bao giờ đến Trung Quốc chưa? Vâng, tôi đã đến Trung Quốc hai lần."
            },
            {
              "en": "What about India? No, I **haven't been** to India.",
              "vi": "Còn Ấn Độ thì sao? Chưa, tôi chưa từng đến Ấn Độ."
            },
            {
              "en": "**Have** you ever **eaten** caviar?",
              "vi": "Bạn đã bao giờ ăn trứng cá caviar chưa?"
            },
            {
              "en": "We**'ve** never **had** a car.",
              "vi": "Chúng tôi chưa từng có ô tô bao giờ."
            },
            {
              "en": "I don't know what the film is about. I **haven't seen** it.",
              "vi": "Tôi không biết bộ phim đó nói về gì. Tôi chưa xem nó."
            },
            {
              "en": "Susan really loves that book. She**'s read** it three times.",
              "note": "She's = She has",
              "vi": "Susan rất thích cuốn sách đó. Cô ấy đã đọc nó ba lần."
            },
            {
              "en": "It's a really boring movie. It's the most boring movie I**'ve** ever **seen**.",
              "vi": "Đó là một bộ phim thực sự chán. Đó là bộ phim chán nhất mà tôi từng xem."
            },
            {
              "en": "I**'ve** never **been** to Canada. Have you been there?",
              "note": "been (to) = visited",
              "vi": "Tôi chưa từng đến Canada bao giờ. Bạn đã đến đó chưa?"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Các mốc thời gian chưa kết thúc: recently, so far, today, this year",
          "headingEn": "recently, so far, today, this year: unfinished periods",
          "body": "In the following examples too, the speakers are talking about a period that continues until now (**recently**, **in the last few days**, **so far**, **since I arrived** etc.):\n\nIn the same way we use the *present perfect* with **today**, **this evening**, **this year** etc. when these periods are not finished at the time of speaking:",
          "bodyVi": "Trong các ví dụ sau, người nói cũng đang nhắc đến một khoảng thời gian kéo dài đến hiện tại (**recently** [gần đây], **in the last few days** [trong vài ngày qua], **so far** [cho đến nay], **since I arrived** [từ khi tôi đến], v.v.):\n\nTheo cách tương tự, chúng ta dùng *thì hiện tại hoàn thành* với **today** (hôm nay), **this evening** (tối nay), **this year** (năm nay), v.v. khi những khoảng thời gian này chưa kết thúc tại thời điểm nói:",
          "examples": [
            {
              "en": "**Have** you **heard** anything from Ben **recently**?",
              "vi": "Gần đây bạn có nghe được tin gì từ Ben không?"
            },
            {
              "en": "I**'ve met** a lot of people **in the last few days**.",
              "vi": "Tôi đã gặp rất nhiều người trong vài ngày qua."
            },
            {
              "en": "Everything is going well. There **haven't been** any problems **so far**.",
              "vi": "Mọi thứ đều đang diễn ra tốt đẹp. Cho đến nay chưa có vấn đề gì cả."
            },
            {
              "en": "The weather is bad here. It**'s rained** every day **since I arrived**.",
              "note": "It's = It has; since I arrived = from when I arrived until now",
              "vi": "Ở đây thời tiết rất xấu. Ngày nào cũng mưa từ khi tôi đến đây."
            },
            {
              "en": "It's good to see you again. We **haven't seen** each other for a long time.",
              "vi": "Gặp lại bạn thật vui. Chúng ta đã không gặp nhau một thời gian dài rồi."
            },
            {
              "en": "I**'ve drunk** four cups of coffee **today**.",
              "note": "today is not finished",
              "vi": "Hôm nay tôi đã uống bốn cốc cà phê."
            },
            {
              "en": "**Have** you **had** a holiday **this year**?",
              "vi": "Năm nay bạn đã đi nghỉ chưa?"
            },
            {
              "en": "I **haven't seen** Tom **this morning**. Have you?",
              "vi": "Sáng nay tôi chưa gặp Tom. Bạn có gặp không?"
            }
          ]
        },
        {
          "label": "C",
          "heading": "Cấu trúc It's the first time ... has happened",
          "headingEn": "It's the first time something has happened",
          "body": "We say **It's the (first) time** something **has happened**. For example, Don is having a driving lesson. It's his first lesson. We can say:\n\nIn the same way we say:",
          "bodyVi": "Chúng ta nói **It's the (first) time** (đây là lần đầu tiên) một điều gì đó **has happened** (đã xảy ra). Ví dụ, Don đang học lái xe. Đây là buổi học lái đầu tiên của anh ấy. Chúng ta có thể nói:\n\nTheo cách tương tự, chúng ta nói:",
          "examples": [
            {
              "en": "It**'s the first time** he **has driven** a car.",
              "note": "not It's the first time he drives a car",
              "vi": "Đây là lần đầu tiên anh ấy lái ô tô."
            },
            {
              "en": "He **hasn't driven** a car before.",
              "vi": "Anh ấy chưa lái ô tô bao giờ trước đây."
            },
            {
              "en": "He **has** never **driven** a car before.",
              "vi": "Anh ấy chưa từng lái ô tô bao giờ."
            },
            {
              "en": "This **is the first time** I**'ve driven** a car.",
              "vi": "Đây là lần đầu tiên tôi lái ô tô."
            },
            {
              "en": "Sarah **has lost** her passport again. **This is the second time** this **has happened**.",
              "note": "not this happens",
              "vi": "Sarah lại làm mất hộ chiếu nữa rồi. Đây là lần thứ hai điều này xảy ra."
            },
            {
              "en": "Andy is phoning his girlfriend again. It**'s the third time** he**'s phoned** her this evening.",
              "vi": "Andy lại đang gọi điện cho bạn gái. Đây là lần thứ ba tối nay anh ấy gọi cho cô ấy."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "8.1 · Đặt câu hỏi với ever",
      "titleEn": "8.1 · Write questions with ever",
      "instructions": "Bạn hỏi mọi người về những việc họ đã từng làm. Viết câu hỏi đầy đủ với ever, dùng thì hiện tại hoàn thành.",
      "instructionsEn": "You are asking people about things they have done. Write full questions with ever, using the present perfect.",
      "passage": "Ví dụ: 1 (ride / horse?) Have you ever ridden a horse?",
      "passageEn": "Example: 1 (ride / horse?) Have you ever ridden a horse?",
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
      "titleEn": "8.2 · Complete B's answers",
      "instructions": "Hoàn thành câu trả lời của B. Một số câu ở dạng khẳng định, một số ở dạng phủ định. Dùng các động từ trong khung, chia ở thì hiện tại hoàn thành.",
      "instructionsEn": "Complete B's answers. Some sentences are positive and some are negative. Use the verbs in the box, in the present perfect.",
      "passage": "Động từ dùng cho bài này: be, be, eat, happen, have, have, meet, play, read, see, try\n\nVí dụ: 1 A: What's Mark's sister like? B: I've no idea. I've never met her.",
      "passageEn": "Verbs to use for this exercise: be, be, eat, happen, have, have, meet, play, read, see, try\n\nExample: 1 A: What's Mark's sister like? B: I've no idea. I've never met her.",
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
      "titleEn": "8.4 · Read the situations and complete the sentences",
      "instructions": "Đọc các tình huống rồi hoàn thành câu bằng thì hiện tại hoàn thành (It's the first time ... / ... hasn't ... before).",
      "instructionsEn": "Read the situations and complete the sentences using the present perfect (It's the first time ... / ... hasn't ... before).",
      "passage": "Ví dụ: 1 Jack is driving a car for the first time. He's very nervous and not sure what to do. It's the first time he's driven a car.",
      "passageEn": "Example: 1 Jack is driving a car for the first time. He's very nervous and not sure what to do. It's the first time he's driven a car.",
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
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì hiện tại hoàn thành cho khoảng thời gian kéo dài đến hiện tại: nói về trải nghiệm trong đời bạn (I've been to ... / I've never eaten ...), về những điều bạn chưa làm hôm nay, tuần này, gần đây hoặc từ lâu rồi (I haven't used a computer today. I haven't travelled by bus for ages.), hoặc dùng mẫu It's the first time I've ...",
      "instructionsEn": "Write 2-3 English sentences using the present perfect for a period of time that continues until now: talk about a life experience (I've been to ... / I've never eaten ...), about something you haven't done today, this week, recently or for ages (I haven't used a computer today. I haven't travelled by bus for ages.), or use the pattern It's the first time I've ...",
      "ruleSummary": "This unit practises the present perfect (have/has + past participle) for a period of time that continues from the past until now. It covers life experience, often with ever or never (Have you ever been to China? I've never had a car. It's the most boring film I've ever seen), where been to means visited; unfinished time periods such as recently, in the last few days, so far, since I arrived, today, this evening and this year (I've drunk four cups of coffee today. There haven't been any problems so far); and the pattern It's the (first/second/third) time something has happened, where the present perfect is required, not the present simple (It's the first time he has driven a car, not he drives; This is the second time this has happened, not happens). A correct student sentence must use have/has plus a correct past participle, must refer to a period that includes the present moment (not a finished past time such as yesterday or last year), and must form negatives and questions with haven't/hasn't and Have/Has."
    }
  ]
};

const UNIT_9_PRESENT_PERFECT_CONTINUOUS: GrammarUnit = {
  "unit": 9,
  "slug": "present-perfect-continuous",
  "title": "Present perfect continuous (I have been doing)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "have/has been + -ing: hành động vừa mới kết thúc",
          "headingEn": "have/has been + -ing: an activity that has just stopped",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "**have/has been + -ing** is the *present perfect continuous*.\n\nWe use it for an activity that has recently stopped or has just stopped. The ground being wet even though it isn't raining *now* is a typical example: something happened over a period leading up to now.",
          "bodyVi": "**have/has been + -ing** là thì *hiện tại hoàn thành tiếp diễn*.\n\nChúng ta dùng thì này cho một hoạt động vừa mới dừng lại hoặc đã dừng lại gần đây. Mặt đất bị ướt dù trời hiện *không* mưa là một ví dụ điển hình: một việc gì đó đã xảy ra trong suốt một khoảng thời gian dẫn đến hiện tại.",
          "table": {
            "rows": [
              [
                "I/we/they/you",
                "**have** (= **I've**, **we've**, **they've**, **you've**)",
                "**been doing**"
              ],
              [
                "he/she/it",
                "**has** (= **he's**, **she's**, **it's**)",
                "**been working**, **learning** etc."
              ]
            ]
          },
          "examples": [
            {
              "en": "Is it raining? No, but the ground is wet. It**'s been raining**.",
              "note": "It's been = It has been",
              "vi": "Trời có đang mưa không? Không, nhưng mặt đất thì ướt. Trời vừa mưa xong."
            },
            {
              "en": "Why are you out of breath? **Have** you **been running**?",
              "vi": "Sao bạn lại thở hổn hển vậy? Bạn vừa chạy à?"
            },
            {
              "en": "Paul is very tired. He**'s been working** hard.",
              "vi": "Paul rất mệt. Anh ấy đã làm việc vất vả suốt thời gian qua."
            },
            {
              "en": "Why are you so tired? What **have** you **been doing**?",
              "vi": "Sao bạn mệt vậy? Bạn đã làm gì thế?"
            },
            {
              "en": "I**'ve been talking** to Amanda and she agrees with me.",
              "vi": "Tôi vừa nói chuyện với Amanda xong và cô ấy đồng ý với tôi."
            },
            {
              "en": "Where have you been? I**'ve been looking** for you.",
              "vi": "Bạn đã đi đâu vậy? Tôi tìm bạn nãy giờ đấy."
            }
          ]
        },
        {
          "label": "B",
          "heading": "how long, for, since: hành động vẫn đang tiếp diễn",
          "headingEn": "how long, for, since: an activity that is still happening",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "We also use the present perfect continuous, especially with **how long**, *for* and *since*, when the activity is still happening now or has only just stopped.\n\nIt can also describe something repeated over a period up to now.",
          "bodyVi": "Chúng ta cũng dùng thì hiện tại hoàn thành tiếp diễn, đặc biệt với how long, for và since, khi hoạt động vẫn đang diễn ra hoặc vừa mới dừng lại.\n\nNó cũng có thể diễn tả một việc được lặp lại trong suốt một khoảng thời gian tính đến hiện tại.",
          "examples": [
            {
              "en": "It began raining two hours ago and it is still raining. How long **has** it **been raining**? It**'s been raining** for two hours.",
              "vi": "Trời bắt đầu mưa từ hai giờ trước và đến giờ vẫn còn mưa. Trời đã mưa được bao lâu rồi? Trời đã mưa được hai giờ rồi."
            },
            {
              "en": "How long **have** you **been learning** English?",
              "note": "you're still learning English",
              "vi": "Bạn đã học tiếng Anh được bao lâu rồi?"
            },
            {
              "en": "Ben is watching TV. He**'s been watching** TV all day.",
              "vi": "Ben đang xem TV. Anh ấy đã xem TV cả ngày rồi."
            },
            {
              "en": "Where have you been? I**'ve been looking** for you for the last half hour.",
              "vi": "Bạn đã đi đâu vậy? Tôi đã tìm bạn suốt nửa giờ qua."
            },
            {
              "en": "Chris **hasn't been feeling** well recently.",
              "vi": "Gần đây Chris không cảm thấy khỏe."
            },
            {
              "en": "Silvia is a very good tennis player. She**'s been playing** since she was eight.",
              "note": "a repeated action",
              "vi": "Silvia là một tay vợt tennis rất giỏi. Cô ấy đã chơi tennis từ khi tám tuổi."
            },
            {
              "en": "Every morning they meet in the same cafe. They**'ve been going** there for years.",
              "vi": "Mỗi sáng họ đều gặp nhau ở cùng một quán cà phê. Họ đã đến đó nhiều năm rồi."
            }
          ]
        },
        {
          "label": "C",
          "heading": "So sánh I am doing và I have been doing",
          "headingEn": "I am doing vs I have been doing",
          "body": "Compare the present continuous (*I am doing*), which describes what is happening right now, with the present perfect continuous (**I have been doing**), which looks back at an activity over a period up to now.",
          "bodyVi": "So sánh thì hiện tại tiếp diễn (*I am doing*), diễn tả điều đang xảy ra ngay lúc này, với thì hiện tại hoàn thành tiếp diễn (**I have been doing**), nhìn lại một hoạt động trong suốt một khoảng thời gian tính đến hiện tại.",
          "examples": [
            {
              "en": "Don't disturb me *now*. I'm working.",
              "vi": "Đừng làm phiền tôi bây giờ. Tôi đang làm việc."
            },
            {
              "en": "I**'ve been working** hard. Now I'm going to have a break.",
              "vi": "Tôi đã làm việc vất vả suốt thời gian qua. Giờ tôi sẽ nghỉ một chút."
            },
            {
              "en": "We need an umbrella. It's raining.",
              "vi": "Chúng ta cần một cái dù. Trời đang mưa."
            },
            {
              "en": "The ground is wet. It**'s been raining**.",
              "vi": "Mặt đất bị ướt. Trời đã mưa."
            },
            {
              "en": "Hurry up! We're waiting.",
              "vi": "Nhanh lên! Chúng tôi đang đợi đây."
            },
            {
              "en": "We**'ve been waiting** for an hour.",
              "vi": "Chúng tôi đã đợi suốt một giờ rồi."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "9.2 · Viết câu hỏi cho từng tình huống",
      "titleEn": "9.2 · Write a question for each situation",
      "instructions": "Viết một câu hỏi cho mỗi tình huống, dùng thì hiện tại hoàn thành tiếp diễn (have/has been + -ing).",
      "instructionsEn": "Write a question for each situation, using the present perfect continuous (have/has been + -ing).",
      "passage": "Ví dụ: 1 You meet Kate as she is leaving the swimming pool. Hi, Kate. (you / swim?) Have you been swimming?",
      "passageEn": "Example: 1 You meet Kate as she is leaving the swimming pool. Hi, Kate. (you / swim?) Have you been swimming?",
      "items": [
        {
          "prompt": "2 You have arrived a little late to meet Ben who is waiting for you. You say: (you / wait / long?) ___",
          "answer": "Have you been waiting long?"
        },
        {
          "prompt": "3 Jane's little boy comes into the house with a very dirty face and dirty hands. His mother says: (what / you / do?) ___",
          "answer": "What have you been doing?"
        },
        {
          "prompt": "4 You are in a shop and see Anna. You didn't know she worked there. You say: (how long / you / work / here?) ___",
          "answer": "How long have you been working here?"
        },
        {
          "prompt": "5 A friend tells you about his job, he sells phones. You say: (how long / you / do / that?) ___",
          "answer": "How long have you been doing that?"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "9.3 · Đọc tình huống và hoàn thành câu",
      "titleEn": "9.3 · Read the situations and complete the sentences",
      "instructions": "Đọc tình huống rồi hoàn thành câu bằng thì hiện tại hoàn thành tiếp diễn (have/has been + -ing).",
      "instructionsEn": "Read the situation, then complete the sentence using the present perfect continuous (have/has been + -ing).",
      "passage": "Ví dụ: 1 It's raining. The rain started two hours ago. It's been raining for two hours.",
      "passageEn": "Example: 1 It's raining. The rain started two hours ago. It's been raining for two hours.",
      "items": [
        {
          "prompt": "2 We are waiting for the bus. We started waiting 20 minutes ago. We ___ for 20 minutes.",
          "answer": "have been waiting",
          "accept": [
            "'ve been waiting"
          ]
        },
        {
          "prompt": "3 I'm learning Japanese. I started classes in December. I ___ since December.",
          "answer": "have been learning Japanese",
          "accept": [
            "'ve been learning Japanese",
            "have been learning"
          ]
        },
        {
          "prompt": "4 Jessica is working in a hotel. She started working there on 18 January. ___ since 18 January.",
          "answer": "She has been working in a hotel",
          "accept": [
            "She's been working in a hotel",
            "She has been working there",
            "She's been working there"
          ]
        },
        {
          "prompt": "5 Our friends always go to Italy for their holidays. The first time was years ago. ___ for years.",
          "answer": "They have been going to Italy",
          "accept": [
            "They've been going to Italy"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "9.4 · Chọn hiện tại tiếp diễn hay hiện tại hoàn thành tiếp diễn",
      "titleEn": "9.4 · Choose the present continuous or the present perfect continuous",
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại tiếp diễn (am/is/are + -ing) hoặc hiện tại hoàn thành tiếp diễn (have/has been + -ing).",
      "instructionsEn": "Put the verb in brackets into the present continuous (am/is/are + -ing) or the present perfect continuous (have/has been + -ing).",
      "passage": "Ví dụ: 1 Maria has been learning (Maria / learn) English for two years.",
      "passageEn": "Example: 1 Maria has been learning (Maria / learn) English for two years.",
      "items": [
        {
          "prompt": "2 Hi, Tom. ___ (I / look) for you. I need to ask you something.",
          "answer": "I've been looking",
          "accept": [
            "I have been looking"
          ]
        },
        {
          "prompt": "3 Why ___ (you / look) at me like that? Stop it!",
          "answer": "are you looking"
        },
        {
          "prompt": "4 Rachel is a teacher. ___ (she / teach) for ten years.",
          "answer": "She has been teaching",
          "accept": [
            "She's been teaching"
          ]
        },
        {
          "prompt": "5 ___ (I / think) about what you said and I've decided to take your advice.",
          "answer": "I've been thinking",
          "accept": [
            "I have been thinking"
          ]
        },
        {
          "prompt": "6 'Is Paul on holiday this week?' 'No, ___ (he / work).'",
          "answer": "he's working",
          "accept": [
            "he is working"
          ]
        },
        {
          "prompt": "7 Sarah is very tired. ___ (she / work) very hard recently.",
          "answer": "She's been working",
          "accept": [
            "She has been working"
          ]
        },
        {
          "prompt": "8 It's dangerous to use your phone when ___ (you / drive).",
          "answer": "you're driving",
          "accept": [
            "you are driving"
          ]
        },
        {
          "prompt": "9 Laura ___ (travel) in South America for the last three months.",
          "answer": "has been travelling",
          "accept": [
            "has been traveling"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì hiện tại hoàn thành tiếp diễn (have/has been + -ing) để nói về một hoạt động vừa mới kết thúc, hoặc dùng how long/for/since để nói hoạt động đó đã kéo dài bao lâu.",
      "instructionsEn": "Write 2-3 English sentences using the present perfect continuous (have/has been + -ing) to talk about an activity that has just finished, or use how long/for/since to say how long that activity has been going on.",
      "ruleSummary": "This unit practises the present perfect continuous (have/has been + -ing). It is used for an activity that has recently stopped or has just stopped, often explaining a present result (Why are you out of breath? Have you been running? The ground is wet. It's been raining.), and for an activity that is still happening now, especially with how long, for and since (How long have you been learning English? They've been playing tennis since 2 o'clock.), or for a repeated action over a period (She's been playing since she was eight.). Compare it with the present continuous (I am doing), which simply describes what is happening right now with no sense of an activity carried on over a period up to now. A correct student sentence must use have/has been plus the -ing form of the verb, and should refer to an activity, not a state verb such as know or have, which do not normally take the continuous."
    }
  ]
};

const UNIT_10_PRESENT_PERFECT_CONTINUOUS_AND_SIMPLE: GrammarUnit = {
  "unit": 10,
  "slug": "present-perfect-continuous-and-simple",
  "title": "Present perfect continuous and simple (I have been doing and I have done)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "So sánh has been painting và has painted: hoạt động và kết quả",
          "headingEn": "has been painting vs has painted: activity vs result",
          "intro": "Compare these two situations:",
          "introVi": "Hãy so sánh hai tình huống sau:",
          "body": "**has been painting** is the *present perfect continuous*. We are thinking of the activity: it does not matter whether it has been finished or not. In this example, the activity (painting the bedroom) has not been finished.\n\n**has painted** is the *present perfect simple*. Here, the important thing is that something has been finished. **She has painted** her bedroom is a completed action: we are thinking about the result of the activity (the painted bedroom), not the activity itself.",
          "bodyVi": "**has been painting** là thì hiện tại hoàn thành tiếp diễn. Chúng ta đang nghĩ đến hoạt động: không quan trọng việc đó đã hoàn thành hay chưa. Trong ví dụ này, hoạt động (sơn phòng ngủ) vẫn chưa hoàn thành.\n\n**has painted** là thì hiện tại hoàn thành đơn. Ở đây, điều quan trọng là một việc gì đó đã hoàn thành. Câu **She has painted** her bedroom (Cô ấy đã sơn xong phòng ngủ) là một hành động đã hoàn tất: chúng ta đang nghĩ đến kết quả của hoạt động đó (căn phòng đã được sơn), không phải hoạt động bản thân nó.",
          "examples": [
            {
              "en": "There is paint on Kate's clothes. She **has been painting** her bedroom.",
              "note": "the activity, not necessarily finished",
              "vi": "Có sơn dính trên áo của Kate. Cô ấy đang sơn phòng ngủ của mình."
            },
            {
              "en": "The bedroom was green. Now it is yellow. She **has painted** her bedroom.",
              "note": "the finished result",
              "vi": "Phòng ngủ trước đây màu xanh. Giờ nó màu vàng. Cô ấy đã sơn xong phòng ngủ của mình."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Diễn tả trạng thái hiện tại và báo cáo một hành động đã hoàn thành",
          "headingEn": "Explaining a present state vs reporting a completed action",
          "intro": "Compare these examples:",
          "introVi": "Hãy so sánh các ví dụ sau:",
          "body": "The *present perfect continuous* often explains a present state, by pointing at the activity itself and not saying whether it is finished.\n\nThe *present perfect simple* reports that something has been completed.",
          "bodyVi": "Thì hiện tại hoàn thành tiếp diễn thường diễn tả một trạng thái hiện tại, bằng cách nhấn vào hoạt động mà không nói rõ hoạt động đó đã kết thúc hay chưa.\n\nThì hiện tại hoàn thành đơn báo rằng một việc gì đó đã hoàn thành.",
          "examples": [
            {
              "en": "My hands are very dirty. I**'ve been repairing** my bike.",
              "vi": "Tay tôi bẩn lắm. Tôi đang sửa xe đạp của mình."
            },
            {
              "en": "My bike is OK again now. I**'ve repaired** it.",
              "note": "= I've finished repairing it",
              "vi": "Xe đạp của tôi lại ổn rồi. Tôi đã sửa xong nó."
            },
            {
              "en": "Joe **has been eating** too much recently. He should eat less.",
              "vi": "Gần đây Joe ăn quá nhiều. Anh ấy nên ăn ít lại."
            },
            {
              "en": "Somebody **has eaten** all the chocolates. The box is empty.",
              "vi": "Ai đó đã ăn hết sạch số sô cô la. Cái hộp trống rồi."
            },
            {
              "en": "It's nice to see you again. What **have** you **been doing** since we last met?",
              "vi": "Gặp lại bạn thật vui. Từ lần gặp trước tới giờ bạn đã làm gì rồi?"
            },
            {
              "en": "Where's the book I gave you? What **have** you **done** with it?",
              "vi": "Cuốn sách tôi đưa bạn đâu rồi? Bạn đã làm gì với nó?"
            },
            {
              "en": "Where **have** you **been**? **Have** you **been playing** tennis?",
              "vi": "Bạn vừa ở đâu vậy? Bạn có phải vừa chơi tennis không?"
            },
            {
              "en": "**Have** you ever **played** tennis?",
              "vi": "Bạn đã từng chơi tennis chưa?"
            }
          ]
        },
        {
          "label": "C",
          "heading": "how long so với how much/how many/how many times",
          "headingEn": "how long vs how much/how many/how many times",
          "body": "We use the continuous to say *how long* something has been happening, when it is still going on.\n\nWe use the simple to say *how much*, *how many* or *how many times*, for completed actions.",
          "bodyVi": "Chúng ta dùng thể tiếp diễn để nói *bao lâu* một việc gì đó đã diễn ra, khi việc đó vẫn còn đang xảy ra.\n\nChúng ta dùng thể đơn để nói *bao nhiêu*, *bao nhiêu cái* hoặc *bao nhiêu lần*, cho những hành động đã hoàn thành.",
          "examples": [
            {
              "en": "*How long* **have you been reading** that book?",
              "vi": "Bạn đã đọc cuốn sách đó bao lâu rồi?"
            },
            {
              "en": "Amy is writing emails. She**'s been writing** emails all morning.",
              "vi": "Amy đang viết email. Cô ấy đã viết email suốt cả buổi sáng."
            },
            {
              "en": "They**'ve been playing** tennis since 2 o'clock.",
              "vi": "Họ đã chơi tennis từ 2 giờ rồi."
            },
            {
              "en": "I'm learning Arabic, but I **haven't been learning** it very long.",
              "vi": "Tôi đang học tiếng Ả Rập, nhưng tôi mới học nó không lâu."
            },
            {
              "en": "*How many* pages of that book **have you read**?",
              "vi": "Bạn đã đọc bao nhiêu trang của cuốn sách đó?"
            },
            {
              "en": "Amy **has sent** lots of emails this morning.",
              "vi": "Amy đã gửi rất nhiều email sáng nay."
            },
            {
              "en": "They**'ve played** tennis three times this week.",
              "vi": "Họ đã chơi tennis ba lần trong tuần này."
            },
            {
              "en": "I'm learning Arabic, but I **haven't learnt** very much yet.",
              "vi": "Tôi đang học tiếng Ả Rập, nhưng tôi chưa học được nhiều lắm."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Động từ không dùng ở dạng tiếp diễn",
          "headingEn": "Verbs not normally used in the continuous",
          "body": "Some verbs, for example *know*, are not normally used in continuous forms (**be + -ing**). For a list of these verbs, see Unit 4A; for *have*, see Unit 17.\n\nNote that *want* and *mean* can be used in the *present perfect continuous* (**have/has been + -ing**).",
          "bodyVi": "Một số động từ, ví dụ *know* (biết), thường không được dùng ở dạng tiếp diễn (**be + -ing**). Để xem danh sách các động từ này, xem Unit 4A; với *have*, xem Unit 17.\n\nLưu ý rằng *want* và *mean* có thể dùng ở thì hiện tại hoàn thành tiếp diễn (**have/has been + -ing**).",
          "examples": [
            {
              "en": "I**'ve known** about the problem for a long time.",
              "note": "not **I've been knowing**",
              "vi": "Tôi đã biết vấn đề này từ lâu rồi."
            },
            {
              "en": "How long **have you had** that camera?",
              "note": "not **have you been having**",
              "vi": "Bạn đã có cái máy ảnh đó bao lâu rồi?"
            },
            {
              "en": "I**'ve been meaning** to phone Anna, but I keep forgetting.",
              "vi": "Tôi đã định gọi điện cho Anna, nhưng tôi cứ quên mãi."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "10.1 · Đọc tình huống và hoàn thành câu",
      "titleEn": "10.1 · Read the situation and complete the sentences",
      "instructions": "Đọc tình huống rồi hoàn thành các câu bằng động từ trong ngoặc, chia ở thì hiện tại hoàn thành tiếp diễn hoặc hiện tại hoàn thành đơn.",
      "instructionsEn": "Read the situation, then complete the sentences using the verbs in brackets, in the present perfect continuous or present perfect simple.",
      "passage": "Ví dụ: 1 Tom started reading a book two hours ago. He is still reading it and now he is on page 53. He has been reading for two hours. (read) He has read 53 pages so far. (read)",
      "passageEn": "Example: 1 Tom started reading a book two hours ago. He is still reading it and now he is on page 53. He has been reading for two hours. (read) He has read 53 pages so far. (read)",
      "items": [
        {
          "prompt": "2a Rachel is from Australia. She is travelling round Europe. She began her trip three months ago. She ___ for three months. (travel)",
          "answer": "has been travelling round Europe",
          "accept": [
            "'s been travelling round Europe",
            "has been travelling"
          ]
        },
        {
          "prompt": "2b She began her trip three months ago. ___ six countries so far. (visit)",
          "answer": "She has visited",
          "accept": [
            "She's visited"
          ]
        },
        {
          "prompt": "3a Patrick is a tennis player. He began playing tennis when he was 10 years old. This year he won the national championship again, for the fourth time. ___ the national championship four times. (win)",
          "answer": "He has won",
          "accept": [
            "He's won"
          ]
        },
        {
          "prompt": "3b ___ since he was ten. (play)",
          "answer": "He has been playing tennis",
          "accept": [
            "He's been playing tennis",
            "He has been playing"
          ]
        },
        {
          "prompt": "4a When they left college, Lisa and Sue started making films together. They still make films. They ___ films since they left college. (make)",
          "answer": "have been making",
          "accept": [
            "'ve been making"
          ]
        },
        {
          "prompt": "4b ___ five films since they left college. (make)",
          "answer": "They have made",
          "accept": [
            "They've made"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "10.2 · Đặt câu hỏi với hiện tại hoàn thành đơn hoặc tiếp diễn",
      "titleEn": "10.2 · Ask questions using the present perfect simple or continuous",
      "instructions": "Đặt câu hỏi bằng các từ trong ngoặc, dùng thì hiện tại hoàn thành đơn (have/has done) hoặc tiếp diễn (have/has been doing).",
      "instructionsEn": "Ask questions using the words in brackets, using the present perfect simple (have/has done) or continuous (have/has been doing).",
      "passage": "Ví dụ: 1 You have a friend who is learning Arabic. You ask: (how long / learn / Arabic?) How long have you been learning Arabic?",
      "passageEn": "Example: 1 You have a friend who is learning Arabic. You ask: (how long / learn / Arabic?) How long have you been learning Arabic?",
      "items": [
        {
          "prompt": "2 You have just arrived to meet a friend. She is waiting for you. You ask: (wait / long?) ___",
          "answer": "Have you been waiting long?"
        },
        {
          "prompt": "3 You see somebody fishing by the river. You ask: (catch / any fish?) ___",
          "answer": "Have you caught any fish?"
        },
        {
          "prompt": "4 Some friends of yours are having a party next week. You ask: (how many people / invite?) ___",
          "answer": "How many people have you invited?"
        },
        {
          "prompt": "5 A friend of yours is a teacher. You ask: (how long / teach?) ___",
          "answer": "How long have you been teaching?"
        },
        {
          "prompt": "6a You meet somebody who is a writer. You ask: (how many books / write?) ___",
          "answer": "How many books have you written?"
        },
        {
          "prompt": "6b You also ask: (how long / write / books?) ___",
          "answer": "How long have you been writing books?"
        },
        {
          "prompt": "7a A friend of yours is saving money to go on a world trip. You ask: (how long / save?) ___",
          "answer": "How long have you been saving?"
        },
        {
          "prompt": "7b You also ask: (how much money / save?) ___",
          "answer": "How much money have you saved?"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "10.3 · Chia động từ ở thì hiện tại hoàn thành đơn hoặc tiếp diễn",
      "titleEn": "10.3 · Put the verb into the present perfect simple or continuous",
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại hoàn thành đơn (have/has done) hoặc tiếp diễn (have/has been doing).",
      "instructionsEn": "Put the verb in brackets into the present perfect simple (have/has done) or continuous (have/has been doing).",
      "passage": "Ví dụ: 1 Where have you been? Have you been playing (you / play) tennis?",
      "passageEn": "Example: 1 Where have you been? Have you been playing (you / play) tennis?",
      "items": [
        {
          "prompt": "2 Look! ___ (somebody / break) that window.",
          "answer": "Somebody has broken",
          "accept": [
            "Somebody's broken"
          ]
        },
        {
          "prompt": "3 You look tired. ___ (you / work) hard?",
          "answer": "Have you been working",
          "accept": [
            "Have you been working hard"
          ]
        },
        {
          "prompt": "4 '___ (you / ever / work) in a factory?' 'No, never.'",
          "answer": "Have you ever worked"
        },
        {
          "prompt": "5 Where's Lisa? Where ___ (she / go)?",
          "answer": "has she gone"
        },
        {
          "prompt": "6 This is a very old book. ___ (I / have) it since I was a child.",
          "answer": "I've had",
          "accept": [
            "I have had"
          ]
        },
        {
          "prompt": "7 'Have you been busy?' 'No, ___ (I / watch) TV.'",
          "answer": "I've been watching",
          "accept": [
            "I have been watching"
          ]
        },
        {
          "prompt": "8 My brother is an actor. ___ (he / appear) in several films.",
          "answer": "He has appeared",
          "accept": [
            "He's appeared"
          ]
        },
        {
          "prompt": "9 'Sorry I'm late.' 'That's all right. ___ (I / not / wait) long.'",
          "answer": "I haven't been waiting",
          "accept": [
            "I have not been waiting"
          ]
        },
        {
          "prompt": "10 Are you OK? You look as if ___ (you / cry).",
          "answer": "you've been crying",
          "accept": [
            "you have been crying"
          ]
        },
        {
          "prompt": "11 'Is it still raining?' 'No, ___ (it / stop).'",
          "answer": "it's stopped",
          "accept": [
            "it has stopped"
          ]
        },
        {
          "prompt": "12 The children are tired now. ___ (they / play) in the garden.",
          "answer": "They've been playing",
          "accept": [
            "They have been playing"
          ]
        },
        {
          "prompt": "13a ___ (I / lose) my phone.",
          "answer": "I've lost",
          "accept": [
            "I have lost"
          ]
        },
        {
          "prompt": "13b ___ (you / see) it?",
          "answer": "Have you seen"
        },
        {
          "prompt": "14a ___ (I / read) the book you lent me, but",
          "answer": "I've been reading",
          "accept": [
            "I have been reading"
          ]
        },
        {
          "prompt": "14b ___ (I / not / finish) it yet. It's really interesting.",
          "answer": "I haven't finished",
          "accept": [
            "I have not finished"
          ]
        },
        {
          "prompt": "15 ___ (I / read) the book you lent me, so you can have it back now.",
          "answer": "I've read",
          "accept": [
            "I have read"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh so sánh hiện tại hoàn thành tiếp diễn (I've been doing, nhấn mạnh hoạt động) với hiện tại hoàn thành đơn (I've done, nhấn mạnh kết quả), ví dụ về một việc bạn đang làm và một việc bạn đã hoàn thành.",
      "instructionsEn": "Write 2-3 English sentences comparing the present perfect continuous (I've been doing, emphasizing the activity) with the present perfect simple (I've done, emphasizing the result), for example about something you are doing and something you have finished.",
      "ruleSummary": "This unit contrasts the present perfect continuous (have/has been + -ing) with the present perfect simple (have/has + past participle). The continuous focuses on the activity itself, regardless of whether it is finished (She has been painting her bedroom), often explaining a present state (My hands are dirty. I've been repairing my bike.). The simple focuses on the result of a completed action (She has painted her bedroom. My bike is OK now, I've repaired it.). Use the continuous with how long to ask about an activity still going on (How long have you been reading that book?), and the simple with how much, how many or how many times for completed actions (How many pages have you read? They've played tennis three times this week.). Some verbs, especially state verbs like know and have, are not normally used in the continuous. A correct student sentence should use the continuous when describing an ongoing or repeated activity without regard to completion, and the simple when reporting a finished result or a quantity."
    }
  ]
};

const UNIT_11_HOW_LONG_HAVE_YOU_BEEN: GrammarUnit = {
  "unit": 11,
  "slug": "how-long-have-you-been",
  "title": "How long have you (been) ...?",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Dùng hiện tại hoàn thành, không dùng hiện tại đơn, để hỏi \"bao lâu\"",
          "headingEn": "How long have they been married? (not How long are they married?)",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "We use the **present perfect**, not the present simple, to ask how long something that began in the past has continued up to now, even though we use the present simple to describe the situation itself.\n\nDan and Kate are married (present), but we ask **How long have they been married?** and say **They have been married for 20 years**, not How long are they married? or They are married for 20 years.",
          "bodyVi": "Chúng ta dùng **thì hiện tại hoàn thành**, không dùng hiện tại đơn, để hỏi một việc bắt đầu trong quá khứ đã tiếp diễn đến bây giờ được bao lâu rồi, mặc dù chúng ta dùng hiện tại đơn để miêu tả chính tình huống đó.\n\nDan và Kate đã kết hôn (hiện tại), nhưng chúng ta hỏi **How long have they been married?** và nói **They have been married for 20 years**, không nói How long are they married? hay They are married for 20 years.",
          "examples": [
            {
              "en": "They **have been married** for 20 years.",
              "vi": "Họ đã kết hôn được 20 năm."
            },
            {
              "en": "**How long have they been married?**",
              "note": "not How long are they married?",
              "vi": "Họ đã kết hôn được bao lâu rồi?"
            },
            {
              "en": "Paul is in hospital. He**'s been** in hospital since Monday.",
              "note": "not Paul is in hospital since Monday",
              "vi": "Paul đang nằm viện. Anh ấy đã nằm viện từ hôm thứ Hai."
            },
            {
              "en": "We know each other very well. We**'ve known** each other for a long time.",
              "note": "not We know each other for a long time",
              "vi": "Chúng tôi biết nhau rất rõ. Chúng tôi đã biết nhau từ lâu rồi."
            },
            {
              "en": "Do they have a car? How long **have they had** their car?",
              "vi": "Họ có ô tô không? Họ đã có chiếc ô tô đó bao lâu rồi?"
            },
            {
              "en": "She's waiting for somebody. She **hasn't been waiting** very long.",
              "vi": "Cô ấy đang chờ ai đó. Cô ấy chưa chờ lâu đâu."
            }
          ]
        },
        {
          "label": "B",
          "heading": "I've known hay I've been learning: hoàn thành đơn hay tiếp diễn khi hỏi \"bao lâu\"",
          "headingEn": "I've known / I've been learning: simple vs continuous with how long",
          "body": "**I've known**, **I've had** and **I've lived** are present perfect simple; **I've been learning** and **I've been waiting** are present perfect continuous. When we ask or say *how long*, the continuous is more usual (see Unit 10), but some verbs, for example *know* and *like*, are not normally used in the continuous.\n\nSee also Units 4A and 10C. For **have**, see Unit 17.",
          "bodyVi": "**I've known**, **I've had** và **I've lived** là hiện tại hoàn thành đơn; **I've been learning** và **I've been waiting** là hiện tại hoàn thành tiếp diễn. Khi hỏi hoặc nói *how long* (bao lâu), dạng tiếp diễn thường được dùng hơn (xem Unit 10), nhưng một số động từ, ví dụ *know* và *like*, thường không dùng ở dạng tiếp diễn.\n\nXem thêm Unit 4A và 10C. Với **have**, xem Unit 17.",
          "examples": [
            {
              "en": "I**'ve been learning** English since January.",
              "vi": "Tôi đã học tiếng Anh từ tháng Một."
            },
            {
              "en": "It**'s been raining** all morning.",
              "vi": "Trời đã mưa suốt cả buổi sáng."
            },
            {
              "en": "Richard **has been doing** the same job for 20 years.",
              "vi": "Richard đã làm công việc đó suốt 20 năm."
            },
            {
              "en": "'How long **have you been driving**?' 'Since I was 17.'",
              "vi": "'Bạn đã lái xe được bao lâu rồi?' 'Từ khi tôi 17 tuổi.'"
            },
            {
              "en": "How long **have you known** Jane?",
              "note": "not have you been knowing",
              "vi": "Bạn đã biết Jane bao lâu rồi?"
            },
            {
              "en": "I**'ve had** these shoes for ages.",
              "note": "not I've been having",
              "vi": "Tôi đã có đôi giày này từ lâu rồi."
            }
          ]
        },
        {
          "label": "C",
          "heading": "live và work: dùng dạng nào cũng được; always: chỉ dùng dạng đơn",
          "headingEn": "live and work: either form; always: simple only",
          "body": "You can use either the continuous or the simple with *live* and *work*.\n\nBut we use the simple (**have lived** etc.), not the continuous, with *always*.",
          "bodyVi": "Bạn có thể dùng dạng tiếp diễn hoặc dạng đơn với *live* (sống) và *work* (làm việc), cách nào cũng được.\n\nNhưng với *always* (luôn luôn), chúng ta dùng dạng đơn (**have lived** v.v.), không dùng dạng tiếp diễn.",
          "examples": [
            {
              "en": "Julia **has been living** in this house for a long time.",
              "note": "or Julia has lived ...",
              "vi": "Julia đã sống trong căn nhà này từ lâu rồi."
            },
            {
              "en": "How long **have you been working** here?",
              "note": "or How long have you worked here?",
              "vi": "Bạn đã làm việc ở đây bao lâu rồi?"
            },
            {
              "en": "I**'ve always lived** in the country.",
              "note": "not I've always been living",
              "vi": "Tôi luôn sống ở vùng nông thôn."
            }
          ]
        },
        {
          "label": "D",
          "heading": "I haven't (làm gì) since/for ...: dùng hiện tại hoàn thành đơn",
          "headingEn": "I haven't (done something) since/for ...",
          "body": "We use the *present perfect simple*, not the continuous, to say **I haven't (done something) since/for** a period, meaning the last time it happened was that long ago.",
          "bodyVi": "Chúng ta dùng *hiện tại hoàn thành đơn*, không dùng dạng tiếp diễn, để nói **I haven't (làm gì) since/for** một khoảng thời gian, nghĩa là lần cuối việc đó xảy ra là từ khoảng thời gian đó trước đây.",
          "examples": [
            {
              "en": "I **haven't seen** Tom since Monday.",
              "note": "= Monday was the last time I saw him",
              "vi": "Tôi chưa gặp Tom từ hôm thứ Hai."
            },
            {
              "en": "Sarah **hasn't phoned** for ages.",
              "note": "= the last time she phoned was ages ago",
              "vi": "Sarah chưa gọi điện đã lâu rồi."
            }
          ]
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "11.1 · Chọn câu đúng",
      "titleEn": "11.1 · Choose the correct sentence",
      "instructions": "Chọn cách diễn đạt đúng trong mỗi cặp.",
      "instructionsEn": "Choose the correct wording in each pair.",
      "passage": "Ví dụ: 1 Ben is a friend of mine. I know / I've known him very well. (I know is correct)",
      "passageEn": "Example: 1 Ben is a friend of mine. I know / I've known him very well. (I know is correct)",
      "items": [
        {
          "before": "I like your house. How long",
          "options": [
            "do you live",
            "have you lived"
          ],
          "after": "here?",
          "answer": "have you lived"
        },
        {
          "before": "You'll need an umbrella if you go out now.",
          "options": [
            "It's raining",
            "It's been raining"
          ],
          "after": "",
          "answer": "It's raining"
        },
        {
          "before": "The weather",
          "options": [
            "is",
            "has been"
          ],
          "after": "awful since I arrived here.",
          "answer": "has been"
        },
        {
          "before": "I'm sorry I'm late.",
          "options": [
            "Are you waiting",
            "Have you been waiting"
          ],
          "after": "long?",
          "answer": "Have you been waiting"
        },
        {
          "before": "We've moved.",
          "options": [
            "We're living",
            "We've been living"
          ],
          "after": "in New Street now.",
          "answer": "We're living"
        },
        {
          "before": "I met Maria only recently.",
          "options": [
            "I don't know",
            "I haven't known"
          ],
          "after": "her very long.",
          "answer": "I haven't known"
        },
        {
          "before": "Lisa is in Germany.",
          "options": [
            "She's",
            "She's been"
          ],
          "after": "there on a business trip.",
          "answer": "She's"
        },
        {
          "before": "That's a very old bike. How long",
          "options": [
            "do you have",
            "have you had"
          ],
          "after": "it?",
          "answer": "have you had"
        },
        {
          "before": "I'm not feeling good.",
          "options": [
            "I'm feeling",
            "I've been feeling"
          ],
          "after": "ill all day.",
          "answer": "I've been feeling"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "11.2 · Đọc tình huống và viết câu hỏi",
      "titleEn": "11.2 · Read the situations and write questions",
      "instructions": "Đọc tình huống rồi viết câu hỏi bằng các từ trong ngoặc, dùng how long have/has ...",
      "instructionsEn": "Read the situation and write a question using the words in brackets, with how long have/has ...",
      "passage": "Ví dụ: 1 A friend tells you that Paul is in hospital. You ask him: (how long / Paul / hospital?) How long has Paul been in hospital?",
      "passageEn": "Example: 1 A friend tells you that Paul is in hospital. You ask him: (how long / Paul / hospital?) How long has Paul been in hospital?",
      "items": [
        {
          "prompt": "2 You know that Jane is a good friend of Katherine's. You ask Jane: (how long / you / know / Katherine?) ___",
          "answer": "How long have you known Katherine?"
        },
        {
          "prompt": "3 Your friend's sister went to Australia some time ago and she's still there. You ask your friend: (how long / sister / in Australia?) ___",
          "answer": "How long has your sister been in Australia?"
        },
        {
          "prompt": "4 You meet a woman who tells you that she teaches English. You ask her: (how long / you / teach / English?) ___",
          "answer": "How long have you been teaching English?"
        },
        {
          "prompt": "5 Tom always wears the same jacket. It's very old. You ask him: (how long / you / have / that jacket?) ___",
          "answer": "How long have you had that jacket?"
        },
        {
          "prompt": "6 You are talking to a friend about Joe, who now works at the airport. You ask your friend: (how long / Joe / work / airport?) ___",
          "answer": "How long has Joe been working at the airport?",
          "accept": [
            "How long has Joe worked at the airport?"
          ]
        },
        {
          "prompt": "7 You meet somebody on a plane. She says that she lives in Chicago. You ask her: (you / always / live / in Chicago?) ___",
          "answer": "Have you always lived in Chicago?"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "11.3 · Hoàn thành câu trả lời của B",
      "titleEn": "11.3 · Complete B's answers",
      "instructions": "Hoàn thành câu trả lời của B, dùng thì hiện tại hoàn thành đơn hoặc tiếp diễn.",
      "instructionsEn": "Complete B's answers, using the present perfect simple or continuous.",
      "passage": "Ví dụ: 1 A: Paul is in hospital, isn't he? B: Yes, he has been in hospital since Monday.",
      "passageEn": "Example: 1 A: Paul is in hospital, isn't he? B: Yes, he has been in hospital since Monday.",
      "items": [
        {
          "prompt": "2 A: Do you see Lisa very often? B: No, I ___ her for three months.",
          "answer": "haven't seen",
          "accept": [
            "have not seen"
          ]
        },
        {
          "prompt": "3 A: Is Paul married? B: Yes, he ___ married for ten years.",
          "answer": "has been",
          "accept": [
            "'s been"
          ]
        },
        {
          "prompt": "4 A: Is Amy married? B: Yes, she ___ married to a German guy.",
          "answer": "she's",
          "accept": [
            "she is"
          ]
        },
        {
          "prompt": "5 A: Do you still play tennis? B: No, I ___ tennis for years.",
          "answer": "haven't played",
          "accept": [
            "have not played"
          ]
        },
        {
          "prompt": "6 A: Are you waiting for the bus? B: Yes, I ___ for about 20 minutes.",
          "answer": "have been waiting",
          "accept": [
            "'ve been waiting"
          ]
        },
        {
          "prompt": "7 A: You know Mel, don't you? B: Yes, we ___ each other a long time.",
          "answer": "have known",
          "accept": [
            "'ve known"
          ]
        },
        {
          "prompt": "8 A: Jack is never ill, is he? B: No, he ___ ill since I've known him.",
          "answer": "hasn't been",
          "accept": [
            "has not been"
          ]
        },
        {
          "prompt": "9 A: Martin lives in Italy, doesn't he? B: Yes, he ___ in Milan.",
          "answer": "lives",
          "accept": [
            "'s living"
          ]
        },
        {
          "prompt": "10 A: Sue lives in Berlin, doesn't she? B: Yes, she ___ in Berlin for many years.",
          "answer": "has lived",
          "accept": [
            "'s lived",
            "'s been living",
            "has been living"
          ]
        },
        {
          "prompt": "11 A: Is Joe watching TV? B: Yes, he ___ TV all evening.",
          "answer": "has been watching",
          "accept": [
            "'s been watching"
          ]
        },
        {
          "prompt": "12 A: Do you watch TV a lot? B: No, I ___ TV since last weekend.",
          "answer": "haven't watched",
          "accept": [
            "have not watched"
          ]
        },
        {
          "prompt": "13 A: Do you have a headache? B: Yes, I ___ a headache all morning.",
          "answer": "have had",
          "accept": [
            "'ve had"
          ]
        },
        {
          "prompt": "14 A: Do you go to the cinema a lot? B: No, I ___ to the cinema for ages.",
          "answer": "haven't been",
          "accept": [
            "have not been"
          ]
        },
        {
          "prompt": "15 A: Would you like to go to New York one day? B: Yes, I ___ to go to New York. (use always / want)",
          "answer": "have always wanted",
          "accept": [
            "'ve always wanted"
          ]
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng how long have/has ... been ...? để hỏi về khoảng thời gian một việc đã diễn ra, và trả lời bằng have/has been + for/since.",
      "instructionsEn": "Write 2-3 English sentences using how long have/has ... been ...? to ask how long something has continued, and answer using have/has been + for/since.",
      "ruleSummary": "This unit practises asking and answering how long something has continued up to now, using the present perfect rather than the present simple: How long have they been married? They have been married for 20 years (not How long are they married? / They are married for 20 years). I've known, I've had and I've lived are present perfect simple; I've been learning and I've been waiting are present perfect continuous, and the continuous is more usual with how long, except for state verbs such as know, like, have, which stay simple. Live and work can take either form, but always is only used with the simple (I've always lived in the country, not I've always been living). We also use the present perfect simple, not the continuous, in the pattern I haven't (done something) since/for ... (I haven't seen Tom since Monday). A correct student sentence should use the present perfect, simple or continuous matching the verb, rather than the present simple, whenever the sentence describes something continuing up to now, and must use since plus a starting point or for plus a length of time correctly."
    }
  ]
};

const UNIT_12_FOR_AND_SINCE: GrammarUnit = {
  "unit": 12,
  "slug": "for-and-since",
  "title": "For and since, When ...? and How long ...?",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "for + khoảng thời gian; since + thời điểm bắt đầu",
          "headingEn": "for a period of time; since the start of a period",
          "intro": "We use for and since to say how long something has been happening.",
          "introVi": "Chúng ta dùng for và since để nói một việc đã diễn ra được bao lâu.",
          "body": "We use **for** + a period of time (**for** two hours, **for** a week, **for** ages, **for** 50 years); we use **since** + the start of a period (**since** 8 o'clock, **since** Monday, **since** 2001). Note that we say **for** six months, not **since** six months.",
          "bodyVi": "Chúng ta dùng **for** + một khoảng thời gian (**for** two hours, **for** a week, **for** ages, **for** 50 years); dùng **since** + thời điểm bắt đầu (**since** 8 o'clock, **since** Monday, **since** 2001). Lưu ý là chúng ta nói **for** six months, không nói **since** six months.",
          "table": {
            "headers": [
              "for",
              "since"
            ],
            "rows": [
              [
                "two hours, 20 minutes, five days",
                "8 o'clock, Monday, 12 May"
              ],
              [
                "a week, ages, years",
                "April, 2001, Christmas"
              ],
              [
                "a long time, six months, 50 years",
                "lunchtime, we arrived, I got up"
              ]
            ]
          },
          "examples": [
            {
              "en": "Sally has been working here **for** six months.",
              "note": "not since six months",
              "vi": "Sally đã làm việc ở đây được sáu tháng rồi."
            },
            {
              "en": "Sally has been working here **since** April.",
              "note": "= from April until now",
              "vi": "Sally đã làm việc ở đây từ tháng Tư đến giờ."
            },
            {
              "en": "I haven't seen Tom **for** three days.",
              "vi": "Tôi đã không gặp Tom được ba ngày rồi."
            },
            {
              "en": "I haven't seen Tom **since** Monday.",
              "vi": "Tôi không gặp Tom từ thứ Hai đến giờ."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Bỏ for; dùng in thay cho for; không dùng for với all ...",
          "headingEn": "Leaving out for; using in instead of for; not for all ...",
          "body": "We often leave out **for**, but not usually in negative sentences.\n\nYou can use **in** instead of **for** in negative sentences (I haven't ... etc.).\n\nWe do not use **for** before *all* ... (all day, all my life etc.).",
          "bodyVi": "Chúng ta thường bỏ **for**, nhưng thường không bỏ trong câu phủ định.\n\nBạn có thể dùng **in** thay cho **for** trong câu phủ định (I haven't ... v.v.).\n\nChúng ta không dùng **for** trước *all* ... (all day, all my life v.v.).",
          "examples": [
            {
              "en": "They've been married **for** ten years.",
              "note": "or They've been married ten years",
              "vi": "Họ đã kết hôn được mười năm rồi."
            },
            {
              "en": "They haven't had a holiday **for** ten years.",
              "note": "you need for here",
              "vi": "Đã mười năm rồi họ không đi nghỉ."
            },
            {
              "en": "They haven't had a holiday **in** ten years.",
              "note": "= for ten years",
              "vi": "Đã mười năm rồi họ không đi nghỉ."
            },
            {
              "en": "I've lived here *all* my life.",
              "note": "not for all my life",
              "vi": "Tôi đã sống ở đây suốt cả đời."
            }
          ]
        },
        {
          "label": "C",
          "heading": "When...? (+ quá khứ đơn) so với How long...? (+ hiện tại hoàn thành)",
          "headingEn": "When ...? (+ past simple) vs How long ...? (+ present perfect)",
          "body": "Compare **When ...?** with the *past simple*, which asks about a point in time, and **How long ...?** with the *present perfect*, which asks about a duration up to now.",
          "bodyVi": "So sánh **When ...?** dùng với *quá khứ đơn* (past simple), hỏi về một điểm thời gian cụ thể, và **How long ...?** dùng với *hiện tại hoàn thành* (present perfect), hỏi về một khoảng thời gian kéo dài đến hiện tại.",
          "examples": [
            {
              "en": "**When** did it start raining? It started raining an hour ago / at 1 o'clock.",
              "vi": "Trời bắt đầu mưa khi nào? Trời bắt đầu mưa một giờ trước / lúc 1 giờ."
            },
            {
              "en": "**How long** has it been raining? It's been raining **for** an hour / **since** 1 o'clock.",
              "vi": "Trời đã mưa được bao lâu rồi? Trời đã mưa được một giờ / từ lúc 1 giờ."
            },
            {
              "en": "**When** did Joe and Kate first meet? They first met a long time ago / at school / when they were at school.",
              "vi": "Joe và Kate gặp nhau lần đầu khi nào? Họ gặp nhau lần đầu từ lâu rồi / ở trường / khi họ còn học ở trường."
            },
            {
              "en": "**How long** have they known each other? They've known each other **for** a long time / at school / **since** they were at school.",
              "note": "since they were at school",
              "vi": "Họ đã biết nhau được bao lâu rồi? Họ đã biết nhau từ lâu rồi / từ khi ở trường / từ khi họ còn học ở trường."
            }
          ]
        },
        {
          "label": "D",
          "heading": "it's (been) ... since + việc đã xảy ra",
          "headingEn": "it's (been) ... since something happened",
          "body": "We say **it's** (= it is) or **it's been** (= it has been) a long time / six months etc. **since** something happened.",
          "bodyVi": "Chúng ta nói **it's** (= it is) hoặc **it's been** (= it has been) a long time / six months v.v. **since** một việc gì đó xảy ra.",
          "examples": [
            {
              "en": "**It's** two years **since** I last saw Joe.",
              "note": "or It's been two years since ...; = I haven't seen Joe for two years",
              "vi": "Đã hai năm rồi từ khi tôi gặp Joe lần cuối."
            },
            {
              "en": "**It's** ages **since** we went to the cinema.",
              "note": "or It's been ages since ...; = We haven't been to the cinema for ages",
              "vi": "Đã lâu lắm rồi từ khi chúng tôi đi xem phim."
            },
            {
              "en": "**How long** is it **since** Mrs Hill died?",
              "note": "or How long has it been since ...?; = when did she die?",
              "vi": "Đã bao lâu rồi từ khi bà Hill qua đời?"
            }
          ]
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "12.1 · Chọn for hoặc since",
      "titleEn": "12.1 · Choose for or since",
      "instructions": "Chọn for hoặc since cho mỗi câu.",
      "instructionsEn": "Write for or since for each sentence.",
      "passage": "Ví dụ: 1 It's been raining since lunchtime.",
      "passageEn": "Example: 1 It's been raining since lunchtime.",
      "items": [
        {
          "before": "Paul has lived in Brazil",
          "options": [
            "for",
            "since"
          ],
          "after": "ten years.",
          "answer": "for"
        },
        {
          "before": "I'm tired of waiting. We've been sitting here",
          "options": [
            "for",
            "since"
          ],
          "after": "an hour.",
          "answer": "for"
        },
        {
          "before": "Kevin has been looking for a job",
          "options": [
            "for",
            "since"
          ],
          "after": "he left school.",
          "answer": "since"
        },
        {
          "before": "I haven't been to a party",
          "options": [
            "for",
            "since"
          ],
          "after": "ages.",
          "answer": "for"
        },
        {
          "before": "I wonder where Joe is. I haven't seen him",
          "options": [
            "for",
            "since"
          ],
          "after": "last week.",
          "answer": "since"
        },
        {
          "before": "Jane is away on holiday. She's been away",
          "options": [
            "for",
            "since"
          ],
          "after": "Friday.",
          "answer": "since"
        },
        {
          "before": "The weather is dry. It hasn't rained",
          "options": [
            "for",
            "since"
          ],
          "after": "a few weeks.",
          "answer": "for"
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "12.2 · Chọn câu hỏi đúng cho câu trả lời",
      "titleEn": "12.2 · Choose the right question for the answer",
      "instructions": "Đọc câu trả lời rồi chọn câu hỏi đúng.",
      "instructionsEn": "Look at each answer and choose the right question.",
      "passage": "Ví dụ: 1 Answer: Ten years ago. Question: When did they get married? (correct, not How long have they been married?)",
      "passageEn": "Example: 1 Answer: Ten years ago. Question: When did they get married? (correct, not How long have they been married?)",
      "items": [
        {
          "before": "Answer: About five years.",
          "options": [
            "How long have you had this car?",
            "When did you buy this car?"
          ],
          "after": "",
          "answer": "How long have you had this car?"
        },
        {
          "before": "Answer: Only a few minutes.",
          "options": [
            "How long have you been waiting?",
            "When did you get here?"
          ],
          "after": "",
          "answer": "How long have you been waiting?"
        },
        {
          "before": "Answer: September.",
          "options": [
            "How long have you been doing your course?",
            "When did your course start?"
          ],
          "after": "",
          "answer": "When did your course start?"
        },
        {
          "before": "Answer: Last week.",
          "options": [
            "How long has Anna been in London?",
            "When did Anna arrive in London?"
          ],
          "after": "",
          "answer": "When did Anna arrive in London?"
        },
        {
          "before": "Answer: A long time.",
          "options": [
            "How long have you known each other?",
            "When did you first meet each other?"
          ],
          "after": "",
          "answer": "How long have you known each other?"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "12.3 · Đọc tình huống và hoàn thành câu",
      "titleEn": "12.3 · Read the situations and complete the sentences",
      "instructions": "Đọc tình huống rồi hoàn thành câu.",
      "instructionsEn": "Read the situations and complete the sentences.",
      "passage": "Ví dụ: 1 It's raining. It's been raining since lunchtime. It started raining at lunchtime.\n2 Ann and Jess are friends. They first met years ago. They've known each other for years.",
      "passageEn": "Example: 1 It's raining. It's been raining since lunchtime. It started raining at lunchtime.\n2 Ann and Jess are friends. They first met years ago. They've known each other for years.",
      "items": [
        {
          "prompt": "3 Mark is unwell. He became ill on Sunday. He has ___ Sunday.",
          "answer": "been ill since",
          "accept": [
            "been unwell since"
          ]
        },
        {
          "prompt": "4 Sarah is married. She's been married for a year. She got ___.",
          "answer": "married a year ago"
        },
        {
          "prompt": "5 You have a headache. It started when you woke up. I've ___ I woke up.",
          "answer": "had a headache since"
        },
        {
          "prompt": "6 Sue is in a meeting at work. It's been going on since 9 o'clock. The meeting ___ at 9 o'clock.",
          "answer": "started"
        },
        {
          "prompt": "7 You're working in a hotel. You started working there six months ago. I've been ___.",
          "answer": "working in a hotel for six months"
        },
        {
          "prompt": "8 Kate is learning Japanese. She's been doing this for a long time. Kate started ___.",
          "answer": "learning Japanese a long time ago"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "12.4 · Hoàn thành câu trả lời của B",
      "titleEn": "12.4 · Complete B's sentences",
      "instructions": "Hoàn thành câu trả lời của B. Sau đó viết lại câu trả lời đó theo mẫu It's ... since ....",
      "instructionsEn": "Complete B's sentences. Then write B's answers again using the pattern It's ... since ....",
      "passage": "Ví dụ: 1 A: Do you often go on holiday? B: No, I haven't had a holiday for five years.\n5 (viết lại câu 1) No, it's five years since I last had a holiday.",
      "passageEn": "Example: 1 A: Do you often go on holiday? B: No, I haven't had a holiday for five years.\n5 (rewrite of 1) No, it's five years since I last had a holiday.",
      "items": [
        {
          "prompt": "2 A: Have you seen Lisa recently? B: No, I ___ about a month.",
          "answer": "haven't seen her for"
        },
        {
          "prompt": "3 A: Do you still go swimming regularly? B: No, I ___ a long time.",
          "answer": "haven't been swimming for"
        },
        {
          "prompt": "4 A: Do you still ride a bike these days? B: No, I ___ ages.",
          "answer": "haven't ridden a bike for"
        },
        {
          "prompt": "6 Viết lại câu 2 theo mẫu It's ... since ...: No, it's ___.",
          "answer": "about a month since I last saw Lisa"
        },
        {
          "prompt": "7 Viết lại câu 3 theo mẫu It's ... since ...: No, it's ___.",
          "answer": "a long time since I last went swimming"
        },
        {
          "prompt": "8 Viết lại câu 4 theo mẫu It's ... since ...: ___.",
          "answer": "It's ages since I last rode a bike"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng for hoặc since để nói một việc đã kéo dài bao lâu, hoặc dùng how long ...? để hỏi, so sánh với khi nào việc đó bắt đầu (when ...?).",
      "instructionsEn": "Write 2-3 English sentences using for or since to say how long something has been happening, or use how long ...? to ask, comparing it with when the thing started (when ...?).",
      "ruleSummary": "This unit practises for (a period of time: for two hours, for ten years) and since (the start of a period: since 8 o'clock, since Monday), always with the present perfect, to say how long something has been happening (not since six months, but since April). For is often left out except in negative sentences (They've been married ten years, but They haven't had a holiday for ten years), and for + all ... (all day, all my life) is never used. Compare When ...? with the past simple, which asks about a point in time (When did it start raining? It started raining an hour ago.), with How long ...? with the present perfect, which asks about a duration up to now (How long has it been raining? It's been raining for an hour.). Also practises it's / it's been + a period + since something happened (It's two years since I last saw Joe = I haven't seen Joe for two years). A correct student sentence must pair for with a length of time and since with a starting point, and must use the present perfect, not the present simple, whenever for/since expresses a duration up to now."
    }
  ]
};

const UNIT_13_PRESENT_PERFECT_AND_PAST_1: GrammarUnit = {
  "unit": 13,
  "slug": "present-perfect-and-past-1",
  "title": "Present perfect and past 1 (I have done and I did)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Tom has lost his key (hiện tại) so với Tom lost his key (chỉ nói về quá khứ)",
          "headingEn": "Tom has lost his key (now) vs Tom lost his key (only about the past)",
          "body": "The *present perfect* (something **has happened**) is a present tense: it tells us about the situation now. Tom **has lost** his key means he doesn't have his key now.\n\nThe *past simple* (something **happened**) tells us only about the past; if somebody says Tom **lost** his key, we don't know whether he has the key now or not, only that he **lost** it at some time in the past.",
          "bodyVi": "Hiện tại hoàn thành (something has happened) là một thời hiện tại: nó cho biết về tình huống ở hiện tại. Câu 'Tom has lost his key' (Tom đã mất chìa khóa) có nghĩa là anh ấy không có chìa khóa vào lúc này.\n\nQuá khứ đơn (something happened) chỉ cho biết về quá khứ; nếu ai đó nói Tom lost his key (Tom đã mất chìa khóa), chúng ta không biết liệu anh ấy có chìa khóa lúc này hay không, chỉ biết rằng anh ấy đã mất nó vào một thời điểm nào đó trong quá khứ.",
          "examples": [
            {
              "en": "They**'ve gone** away. They'll be back on Friday.",
              "note": "they are away now",
              "vi": "Họ đã đi rồi. Họ sẽ về vào thứ Sáu."
            },
            {
              "en": "They **went** away, but I think they're back at home now.",
              "note": "not They've gone away",
              "vi": "Họ đã đi, nhưng tôi nghĩ giờ họ đã về nhà rồi."
            },
            {
              "en": "It **has stopped** raining now, so we don't need the umbrella.",
              "note": "it isn't raining now",
              "vi": "Trời đã tạnh mưa rồi, nên chúng ta không cần ô nữa."
            },
            {
              "en": "It **stopped** raining for a while, but now it's raining again.",
              "note": "not It has stopped",
              "vi": "Trời đã tạnh mưa một lúc, nhưng giờ lại mưa tiếp."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Tin tức mới hoặc gần đây, so với việc không còn mới hay gần đây",
          "headingEn": "New or recent happenings vs things that are not recent or new",
          "body": "You can use the *present perfect* for new or recent happenings, and usually the *past simple* works too.\n\nBut use the *past simple*, not the *present perfect*, for things that are not recent or new, such as historical facts.",
          "bodyVi": "Bạn có thể dùng hiện tại hoàn thành cho những việc mới xảy ra hoặc gần đây, và thường thì quá khứ đơn cũng dùng được.\n\nNhưng hãy dùng quá khứ đơn, không dùng hiện tại hoàn thành, cho những việc không còn mới hay gần đây, chẳng hạn như các sự kiện lịch sử.",
          "examples": [
            {
              "en": "I**'ve repaired** the washing machine. It's working OK now.",
              "vi": "Tôi đã sửa xong máy giặt rồi. Giờ nó hoạt động tốt."
            },
            {
              "en": "'Hannah **has had** a baby! It's a boy.' 'That's great news.'",
              "vi": "'Hannah mới sinh con rồi! Là con trai.' 'Tin tuyệt quá.'"
            },
            {
              "en": "I **repaired** the washing machine. It's working OK now.",
              "note": "past simple also possible here",
              "vi": "Tôi đã sửa máy giặt. Giờ nó hoạt động tốt."
            },
            {
              "en": "Mozart **was** a composer. He **wrote** more than 600 pieces of music.",
              "note": "not has been ... has written",
              "vi": "Mozart là một nhà soạn nhạc. Ông đã viết hơn 600 tác phẩm âm nhạc."
            },
            {
              "en": "My mother **grew up** in Italy.",
              "note": "not has grown",
              "vi": "Mẹ tôi đã lớn lên ở Ý."
            },
            {
              "en": "Somebody **has invented** a new type of washing machine.",
              "note": "new information",
              "vi": "Ai đó đã phát minh ra một loại máy giặt mới."
            },
            {
              "en": "Who **invented** the telephone?",
              "note": "not has invented",
              "vi": "Ai đã phát minh ra điện thoại?"
            }
          ]
        },
        {
          "label": "C",
          "heading": "Đưa tin mới bằng hiện tại hoàn thành, rồi tiếp tục kể bằng quá khứ đơn",
          "headingEn": "Give new information with the present perfect, continue with the past simple",
          "body": "We use the *present perfect* to give new information, but if we continue to talk about it, we normally switch to the *past simple*.",
          "bodyVi": "Chúng ta dùng hiện tại hoàn thành để đưa ra thông tin mới, nhưng nếu tiếp tục nói về việc đó, chúng ta thường chuyển sang dùng quá khứ đơn.",
          "examples": [
            {
              "en": "'Ow! I**'ve burnt** myself.' 'How **did** you **do** that?' 'I **picked up** a hot dish.'",
              "note": "not have you done ... have picked",
              "vi": "'Ui! Tôi bị bỏng rồi.' 'Sao lại bị vậy?' 'Tôi vừa cầm một cái đĩa nóng.'"
            },
            {
              "en": "'Look! Somebody **has spilt** something on the sofa.' 'Well, it **wasn't** me. I **didn't do** it.'",
              "note": "not hasn't been ... haven't done",
              "vi": "'Nhìn này! Ai đó làm đổ thứ gì đó lên ghế sofa.' 'Không phải tôi đâu. Tôi không làm việc đó.'"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "13.1 · Hoàn thành câu bằng hiện tại hoàn thành hoặc quá khứ đơn",
      "titleEn": "13.1 · Complete the sentences using the present perfect or past simple",
      "instructions": "Hoàn thành các câu, dùng thì hiện tại hoàn thành nếu có thể, nếu không thì dùng quá khứ đơn.",
      "instructionsEn": "Complete the sentences. Use the present perfect where possible. Otherwise use the past simple.",
      "passage": "Ví dụ: 1 I can't get in. **I've lost** (lose) my key.",
      "passageEn": "Example: 1 I can't get in. **I've lost** (lose) my key.",
      "items": [
        {
          "prompt": "2 The office is empty now. Everybody ___ home. (go)",
          "answer": "has gone",
          "accept": [
            "'s gone"
          ]
        },
        {
          "prompt": "3 I meant to call you last night, but I ___. (forget)",
          "answer": "forgot"
        },
        {
          "prompt": "4 Can you help us? Our car ___ down. (break)",
          "answer": "has broken",
          "accept": [
            "'s broken"
          ]
        },
        {
          "prompt": "5 Are you OK? Yes, I ___ a headache, but it's OK now. (have)",
          "answer": "have had",
          "accept": [
            "'ve had"
          ]
        },
        {
          "prompt": "6 Helen ___ to New York for a holiday, but she's back home in London now. (go)",
          "answer": "went"
        }
      ]
    },
    {
      "kind": "judge_correct",
      "title": "13.2 · Phần gạch chân đúng hay cần sửa?",
      "titleEn": "13.2 · Are the underlined parts correct or do they need fixing?",
      "instructions": "Phần gạch chân trong mỗi câu đã đúng chưa? Sửa lại nếu cần.",
      "instructionsEn": "Are the underlined parts of these sentences OK? Correct them where necessary.",
      "items": [
        {
          "sentence": "Did you hear about Sophie? She's given up her job.",
          "underlined": "She's given up her job",
          "ok": true
        },
        {
          "sentence": "My mother has grown up in Italy.",
          "underlined": "has grown up",
          "ok": false,
          "correction": "grew up"
        },
        {
          "sentence": "How many plays has William Shakespeare written?",
          "underlined": "has William Shakespeare written",
          "ok": false,
          "correction": "did William Shakespeare write",
          "accept": [
            "did Shakespeare write"
          ]
        },
        {
          "sentence": "I've forgotten his name. Is it Joe or Jack?",
          "underlined": "I've forgotten",
          "ok": true
        },
        {
          "sentence": "Who has invented paper?",
          "underlined": "has invented",
          "ok": false,
          "correction": "invented"
        },
        {
          "sentence": "Drugs have become a big problem everywhere.",
          "underlined": "have become",
          "ok": true
        },
        {
          "sentence": "We've washed the car, but now it's dirty again.",
          "underlined": "We've washed",
          "ok": false,
          "correction": "We washed"
        },
        {
          "sentence": "Where have you been born?",
          "underlined": "have you been born",
          "ok": false,
          "correction": "were you born"
        },
        {
          "sentence": "Ellie has gone shopping. She'll be back in about an hour.",
          "underlined": "Ellie has gone shopping",
          "ok": true
        },
        {
          "sentence": "Albert Einstein has been the scientist who has developed the theory of relativity.",
          "underlined": "has been the scientist who has developed",
          "ok": false,
          "correction": "was the scientist who developed"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "13.3 · Chia động từ ở thì hiện tại hoàn thành hoặc quá khứ đơn",
      "titleEn": "13.3 · Put the verb into the present perfect or past simple",
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại hoàn thành hoặc quá khứ đơn.",
      "instructionsEn": "Put the verb in brackets into the present perfect or past simple.",
      "passage": "Ví dụ: 1 It **stopped** raining for a while, but now it's raining again. (it / stop)\n2 The town where I live is very different now. It **has changed** a lot. (it / change)",
      "passageEn": "Example: 1 It **stopped** raining for a while, but now it's raining again. (it / stop)\n2 The town where I live is very different now. It **has changed** a lot. (it / change)",
      "items": [
        {
          "prompt": "3 I studied German at school, but ___ most of it now. (I / forget)",
          "answer": "I've forgotten",
          "accept": [
            "I have forgotten"
          ]
        },
        {
          "prompt": "4 The police ___ three people, but later they let them go. (arrest)",
          "answer": "arrested"
        },
        {
          "prompt": "5 What do you think of my English? Do you think ___? (it / improve)",
          "answer": "it's improved",
          "accept": [
            "it has improved"
          ]
        },
        {
          "prompt": "6 Are you ready to go? ___ your coffee? (you / finish)",
          "answer": "Have you finished"
        },
        {
          "prompt": "7 ___ for a job as a tour guide, but I wasn't successful. (I / apply)",
          "answer": "I applied"
        },
        {
          "prompt": "8 Where's my bike? ___ outside the house, but it's not there now. (it / be)",
          "answer": "It was"
        },
        {
          "prompt": "9 Quick! We need to call an ambulance. ___ an accident. (there / be)",
          "answer": "There's been",
          "accept": [
            "There has been"
          ]
        },
        {
          "prompt": "10a A: I've found my phone. B: Oh, good. Where ___ it? (you / find)",
          "answer": "did you find"
        },
        {
          "prompt": "10b A: I've found my phone. B: Oh, good. Where did you find it? A: ___ at the bottom of my bag. (It / be)",
          "answer": "It was"
        },
        {
          "prompt": "11a Ben won't be able to play tennis for a while. ___ his arm. (He / break)",
          "answer": "He's broken",
          "accept": [
            "He has broken"
          ]
        },
        {
          "prompt": "11b Oh. How ___? (that / happen)",
          "answer": "did that happen"
        },
        {
          "prompt": "11c ___ off a ladder. (He / fall)",
          "answer": "He fell"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practice with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh: một câu dùng thì hiện tại hoàn thành để đưa ra một tin mới hoặc gần đây, và một câu tiếp theo dùng thì quá khứ đơn để kể tiếp chi tiết về việc đó, giống ví dụ: **I've burnt** myself. How **did** you **do** that? I **picked up** a hot dish.",
      "instructionsEn": "Write 2-3 English sentences: one sentence using the present perfect to give a piece of new or recent news, and a following sentence using the past simple to continue with details about it, like the example: **I've burnt** myself. How **did** you **do** that? I **picked up** a hot dish.",
      "ruleSummary": "This unit practises choosing between the present perfect (has/have done) and the past simple (did) when there is no explicit finished-time marker. The present perfect is a present tense: it tells us about the situation now (Tom has lost his key = he doesn't have it now), and is typical for new or recent news (I've repaired the washing machine. Hannah has had a baby!). The past simple only tells us about the past and is required for things that are not recent or new, especially historical facts (Mozart was a composer, not has been; Who invented the telephone?, not has invented). A key pattern: we use the present perfect to give new information, but once we continue talking about the same event, we switch to the past simple (I've burnt myself. How did you do that? I picked up a hot dish, not have you done / have picked). A correct student sentence must use the present perfect only for something that is new, recent, or still relevant right now, and the past simple once the same event is being discussed further or when it is a finished, non-recent fact."
    }
  ]
};

const UNIT_14_PRESENT_PERFECT_AND_PAST_2: GrammarUnit = {
  "unit": 14,
  "slug": "present-perfect-and-past-2",
  "title": "Present perfect and past 2 (I have done and I did)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Không dùng hiện tại hoàn thành cho thời gian đã kết thúc",
          "headingEn": "Do not use the present perfect for a finished time",
          "body": "We do not use the present perfect (**have done**) when we talk about a finished time (for example, **yesterday**, **last year**, **ten minutes ago** etc.); we use a past tense.\n\nWe also use the past, not the present perfect, to ask When ...? or What time ...?",
          "bodyVi": "Chúng ta không dùng thì hiện tại hoàn thành (**have done**) khi nói về một thời điểm đã kết thúc (ví dụ: **hôm qua**, **năm ngoái**, **mười phút trước**...); chúng ta dùng thì quá khứ đơn.\n\nChúng ta cũng dùng thì quá khứ, không dùng thì hiện tại hoàn thành, để hỏi When ...? hoặc What time ...?",
          "examples": [
            {
              "en": "It **was** very cold **yesterday**.",
              "note": "not has been",
              "vi": "**Hôm qua** trời rất lạnh."
            },
            {
              "en": "Paul and Lucy **arrived** **ten minutes ago**.",
              "note": "not have arrived",
              "vi": "Paul và Lucy đã đến **mười phút trước**."
            },
            {
              "en": "**Did** you **eat** a lot of sweets when you were a child?",
              "note": "not have you eaten",
              "vi": "Hồi nhỏ bạn có ăn nhiều đồ ngọt không?"
            },
            {
              "en": "I **got** home late **last night**. I **was** very tired and **went** straight to bed.",
              "vi": "Tôi về nhà muộn **đêm qua**. Tôi rất mệt và đã đi ngủ ngay."
            },
            {
              "en": "When **did** your friends **arrive**?",
              "note": "not have ... arrived",
              "vi": "Bạn của bạn đã đến khi nào?"
            },
            {
              "en": "What time **did** you **finish** work?",
              "vi": "Bạn đã xong việc lúc mấy giờ?"
            },
            {
              "en": "Tom **has lost** his key. He can't get into the house.",
              "note": "compare: Tom lost his key yesterday. He couldn't get into the house.",
              "vi": "Tom **đã làm mất** chìa khóa của anh ấy. Anh ấy không vào được nhà."
            },
            {
              "en": "Is Carla here or **has** she **left**?",
              "note": "compare: When did Carla leave?",
              "vi": "Carla có ở đây không hay là cô ấy **đã đi** rồi?"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Giai đoạn chưa kết thúc (hiện tại hoàn thành) và giai đoạn đã kết thúc (quá khứ đơn)",
          "headingEn": "Unfinished period (present perfect) vs finished period (past simple)",
          "intro": "Compare:",
          "introVi": "So sánh:",
          "body": "We use the *present perfect* for a period of time that continues until now, for example **today**, **this week**, **since 2010**.\n\nWe use the *past simple* for a finished time in the past, for example **yesterday**, **last week**, **from 2010 to 2014**.",
          "bodyVi": "Chúng ta dùng thì *hiện tại hoàn thành* cho một khoảng thời gian kéo dài đến hiện tại, ví dụ **hôm nay**, **tuần này**, **từ năm 2010**.\n\nChúng ta dùng thì *quá khứ đơn* cho một thời điểm đã kết thúc trong quá khứ, ví dụ **hôm qua**, **tuần trước**, **từ 2010 đến 2014**.",
          "examples": [
            {
              "en": "I**'ve done** a lot of work **today**.",
              "note": "compare: I did a lot of work yesterday.",
              "vi": "Tôi **đã làm** được nhiều việc **hôm nay**."
            },
            {
              "en": "It **hasn't rained** **this week**.",
              "note": "compare: It didn't rain last week.",
              "vi": "**Tuần này** trời **không mưa**."
            },
            {
              "en": "**Have** you **seen** Anna **this morning**?",
              "note": "it is still morning now; compare: Did you see Anna this morning? (it is now afternoon or evening)",
              "vi": "**Sáng nay** bạn có gặp Anna không?"
            },
            {
              "en": "**Have** you **seen** Ben **recently**?",
              "note": "in the last few days or weeks; compare: Did you see Ben on Sunday?",
              "vi": "**Gần đây** bạn có gặp Ben không?"
            },
            {
              "en": "I**'ve been working** here **since 2010**.",
              "note": "I still work here now; compare: I worked here from 2010 to 2014. (I don't work here now)",
              "vi": "Tôi **đã làm việc** ở đây **từ năm 2010**."
            },
            {
              "en": "I don't know where Lisa is. I **haven't seen** her.",
              "note": "= I haven't seen her recently; compare: Was Lisa at the party on Sunday? I don't think so. I didn't see her.",
              "vi": "Tôi không biết Lisa ở đâu. Tôi **không gặp** cô ấy."
            },
            {
              "en": "We**'ve been waiting** for an hour.",
              "note": "we are still waiting now; compare: We waited (or were waiting) for an hour. (we are no longer waiting)",
              "vi": "Chúng tôi **đã đợi** một giờ rồi."
            },
            {
              "en": "Jack lives in Los Angeles. He **has lived** there for seven years.",
              "note": "compare: Jack lived in New York for ten years. Now he lives in Los Angeles.",
              "vi": "Jack sống ở Los Angeles. Anh ấy **đã sống** ở đó bảy năm."
            },
            {
              "en": "I**'ve never ridden** a horse.",
              "note": "in my life; compare: I never rode a bike when I was a child.",
              "vi": "Tôi **chưa từng cưỡi** ngựa bao giờ."
            },
            {
              "en": "It**'s been** a really good holiday. I**'ve really enjoyed** it.",
              "note": "said on the last day of the holiday; compare: It was a really good holiday. I really enjoyed it. (said after coming back)",
              "vi": "Đây **đã là** một kỳ nghỉ rất tuyệt. Tôi **đã rất thích** nó."
            }
          ]
        }
      ]
    },
    {
      "kind": "judge_correct",
      "title": "14.1 · Phần gạch chân đúng hay cần sửa?",
      "titleEn": "14.1 · Are the underlined parts OK?",
      "instructions": "Phần gạch chân trong mỗi câu đã đúng chưa? Sửa lại nếu cần.",
      "instructionsEn": "Are the underlined parts of these sentences OK? Correct them where necessary.",
      "items": [
        {
          "sentence": "I've lost my key. I can't find it anywhere.",
          "underlined": "I've lost my key",
          "ok": true
        },
        {
          "sentence": "Have you eaten a lot of sweets when you were a child?",
          "underlined": "Have you eaten",
          "ok": false,
          "correction": "Did you eat"
        },
        {
          "sentence": "I've bought a new car. You must come and see it.",
          "underlined": "I've bought a new car",
          "ok": true
        },
        {
          "sentence": "I've bought a new car last week.",
          "underlined": "I've bought a new car",
          "ok": false,
          "correction": "I bought a new car"
        },
        {
          "sentence": "Where have you been yesterday evening?",
          "underlined": "have you been",
          "ok": false,
          "correction": "were you"
        },
        {
          "sentence": "Maria has left school in 1999.",
          "underlined": "has left",
          "ok": false,
          "correction": "left"
        },
        {
          "sentence": "I'm looking for Mike. Have you seen him?",
          "underlined": "Have you seen him",
          "ok": true
        },
        {
          "sentence": "'Have you been to Paris?' 'Yes, many times.'",
          "underlined": "Have you been to Paris",
          "ok": true
        },
        {
          "sentence": "I'm very hungry. I haven't eaten much today.",
          "underlined": "I haven't eaten much today",
          "ok": true
        },
        {
          "sentence": "When has this bridge been built?",
          "underlined": "has this bridge been built",
          "ok": false,
          "correction": "was this bridge built"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "14.2 · Đặt câu từ các từ trong ngoặc",
      "titleEn": "14.2 · Make sentences from the words in brackets",
      "instructions": "Đặt câu từ các từ trong ngoặc, dùng thì hiện tại hoàn thành hoặc quá khứ đơn.",
      "instructionsEn": "Make sentences from the words in brackets. Use the present perfect or past simple.",
      "passage": "Ví dụ: 1 (it / not / rain / this week) It hasn't rained this week.",
      "passageEn": "Example: 1 (it / not / rain / this week) It hasn't rained this week.",
      "items": [
        {
          "prompt": "2 (the weather / be / cold / recently) The weather ___",
          "answer": "has been cold recently"
        },
        {
          "prompt": "3 (it / cold / last week) It ___",
          "answer": "was cold last week"
        },
        {
          "prompt": "4 (I / not / eat / any fruit yesterday) I ___",
          "answer": "didn't eat any fruit yesterday"
        },
        {
          "prompt": "5 (I / not / eat / any fruit today) ___",
          "answer": "I haven't eaten any fruit today"
        },
        {
          "prompt": "6 (Emily / earn / a lot of money / this year) ___",
          "answer": "Emily has earned a lot of money this year",
          "accept": [
            "Emily's earned a lot of money this year"
          ]
        },
        {
          "prompt": "7 (she / not / earn / so much / last year) ___",
          "answer": "She didn't earn so much last year"
        },
        {
          "prompt": "8 (you / have / a holiday recently?) ___",
          "answer": "Have you had a holiday recently?"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "14.3 · Chia động từ ở thì hiện tại hoàn thành hoặc quá khứ đơn",
      "titleEn": "14.3 · Put the verbs into the present perfect or past simple",
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại hoàn thành hoặc quá khứ đơn.",
      "instructionsEn": "Put the verb in brackets into the present perfect or past simple.",
      "passage": "Ví dụ: 1 I haven't been (I / not / be) to Canada, but I'd like to go there.\n2 Paul and Lucy arrived (arrive) about ten minutes ago.",
      "passageEn": "Example: 1 I haven't been (I / not / be) to Canada, but I'd like to go there.\n2 Paul and Lucy arrived (arrive) about ten minutes ago.",
      "items": [
        {
          "prompt": "3 I'm tired. ___ well last night. (I / not / sleep)",
          "answer": "I didn't sleep"
        },
        {
          "prompt": "4a ___ a bus drivers' strike last week. (There / be)",
          "answer": "There was"
        },
        {
          "prompt": "4b so ___ no buses. (there / be)",
          "answer": "there were"
        },
        {
          "prompt": "5a Edward ___ in a bank for 15 years. (work)",
          "answer": "worked"
        },
        {
          "prompt": "5b Then ___ it up. Now he works as a gardener. (he / give)",
          "answer": "he gave"
        },
        {
          "prompt": "6 Mary lives in Dublin. ___ there all her life. (She / live)",
          "answer": "She has lived",
          "accept": [
            "She's lived"
          ]
        },
        {
          "prompt": "7a My grandfather ___ before I was born. (die)",
          "answer": "died"
        },
        {
          "prompt": "7b ___ him. (I / never / meet)",
          "answer": "I've never met",
          "accept": [
            "I have never met"
          ]
        },
        {
          "prompt": "8 I don't know Karen's husband. ___ him. (I / never / meet)",
          "answer": "I've never met",
          "accept": [
            "I have never met"
          ]
        },
        {
          "prompt": "9 It's nearly lunchtime, and ___ Martin all morning. I wonder where he is. (I / not / see)",
          "answer": "I haven't seen"
        },
        {
          "prompt": "10a A: ___ to the cinema last night? (you / go)",
          "answer": "Did you go"
        },
        {
          "prompt": "10b B: Yes, but the movie ___ awful. (be)",
          "answer": "was"
        },
        {
          "prompt": "11a A: ___ very warm here since we arrived. (It / be)",
          "answer": "It's been",
          "accept": [
            "It has been"
          ]
        },
        {
          "prompt": "11b B: Yes, ___ 35 degrees yesterday. (it / be)",
          "answer": "it was"
        },
        {
          "prompt": "12a A: Where do you live? B: In Boston. A: How long ___ there? (you / live)",
          "answer": "have you lived"
        },
        {
          "prompt": "12b B: Five years. A: Where ___ before that? (you / live)",
          "answer": "did you live"
        },
        {
          "prompt": "12c B: In Chicago. A: And how long ___ in Chicago? (you / live)",
          "answer": "did you live"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practise with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh so sánh thì hiện tại hoàn thành (cho khoảng thời gian chưa kết thúc như today, this week) với quá khứ đơn (cho khoảng thời gian đã kết thúc như yesterday, last week), ví dụ: It hasn't rained this week. / It didn't rain last week.",
      "instructionsEn": "Write 2-3 English sentences comparing the present perfect (for an unfinished period such as today, this week) with the past simple (for a finished period such as yesterday, last week), for example: It hasn't rained this week. / It didn't rain last week.",
      "ruleSummary": "This unit practises the present perfect (have/has done) for an unfinished period continuing until now (today, this week, since 2010) versus the past simple (did) for a finished time in the past (yesterday, last week, from 2010 to 2014). The present perfect is never used with a finished-time expression such as yesterday, last year or ten minutes ago (It was very cold yesterday, not has been; Paul and Lucy arrived ten minutes ago, not have arrived), and When ...? or What time ...? are always followed by the past simple, never the present perfect. A correct student sentence must use the present perfect only when the time period referred to is still open (today, this week, since a point that continues to now) and the past simple whenever a specific finished time is named or implied, including with When ...? and What time ...? questions."
    }
  ]
};

const UNIT_15_PAST_PERFECT: GrammarUnit = {
  "unit": 15,
  "slug": "past-perfect",
  "title": "Past perfect (I had done)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Cách thành lập: had + phân từ hai",
          "headingEn": "Formation: had + past participle",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "Sarah and Paul went to the same party last week, but they didn't see each other. Paul left the party at 10.30 and Sarah arrived at 11 o'clock. So when Sarah arrived at the party, Paul wasn't there. He had **gone** home.\n\n**had gone** is the *past perfect*:",
          "bodyVi": "Sarah và Paul cùng đến một buổi tiệc tuần trước, nhưng họ không gặp nhau. Paul ra khỏi tiệc lúc 10 giờ 30, còn Sarah đến lúc 11 giờ. Vì vậy khi Sarah đến, Paul đã không còn ở đó. Anh ấy đã về nhà rồi.\n\n**had gone** là thì *quá khứ hoàn thành*:",
          "table": {
            "rows": [
              [
                "I/we/they/you",
                "**had** (= **I'd** etc.)",
                "**gone** / **seen** / **finished** etc."
              ],
              [
                "he/she/it",
                "**had** (= **he'd** etc.)",
                "**gone** / **seen** / **finished** etc."
              ]
            ]
          },
          "examples": [
            {
              "en": "The past perfect (simple) is **had** + past participle (**gone**/**seen**/**finished** etc.).",
              "vi": "Thì quá khứ hoàn thành (đơn) là had + phân từ hai (gone/seen/finished v.v.)."
            },
            {
              "en": "Sarah arrived at the party.",
              "note": "the starting point of the story",
              "vi": "Sarah đến buổi tiệc."
            },
            {
              "en": "When Sarah arrived at the party, Paul **had** already **gone** home.",
              "vi": "Khi Sarah đến buổi tiệc, Paul đã về nhà rồi."
            },
            {
              "en": "When we got home last night, we found that somebody **had broken** into the flat.",
              "vi": "Khi chúng tôi về nhà đêm qua, chúng tôi phát hiện có ai đó đã đột nhập vào căn hộ."
            },
            {
              "en": "Karen didn't come to the cinema with us. She**'d already seen** the movie.",
              "vi": "Karen không đi xem phim cùng chúng tôi. Cô ấy đã xem bộ phim đó rồi."
            },
            {
              "en": "At first I thought I**'d done** the right thing, but I soon realised that I**'d made** a big mistake.",
              "vi": "Ban đầu tôi nghĩ mình đã làm đúng, nhưng chẳng mấy chốc tôi nhận ra là mình đã phạm một lỗi lớn."
            },
            {
              "en": "The people sitting next to me on the plane were nervous. They **hadn't flown** before.",
              "note": "or They'd never flown before.",
              "vi": "Những người ngồi cạnh tôi trên máy bay có vẻ lo lắng. Họ chưa từng đi máy bay trước đó."
            }
          ]
        },
        {
          "label": "B",
          "heading": "So sánh hiện tại hoàn thành và quá khứ hoàn thành",
          "headingEn": "Compare present perfect and past perfect",
          "body": "Compare *have seen* (present perfect) and *had seen* (past perfect):",
          "bodyVi": "So sánh *have seen* (hiện tại hoàn thành) và *had seen* (quá khứ hoàn thành):",
          "examples": [
            {
              "en": "Who is that woman? **I've seen** her before, but I can't remember where.",
              "note": "present perfect: an unspecified time before now",
              "vi": "Người phụ nữ đó là ai vậy? Tôi đã gặp cô ấy trước đây rồi, nhưng không nhớ ở đâu."
            },
            {
              "en": "I wasn't sure who she was. **I'd seen** her before, but I couldn't remember where.",
              "note": "past perfect: before that past moment",
              "vi": "Tôi không chắc cô ấy là ai. Tôi đã gặp cô ấy trước đó rồi, nhưng không nhớ ở đâu."
            },
            {
              "en": "We aren't hungry. **We've just had** lunch.",
              "vi": "Chúng tôi không đói. Chúng tôi vừa ăn trưa xong."
            },
            {
              "en": "We weren't hungry. **We'd just had** lunch.",
              "vi": "Chúng tôi không đói. Chúng tôi vừa ăn trưa xong trước đó."
            },
            {
              "en": "The house is dirty. They **haven't cleaned** it for weeks.",
              "vi": "Ngôi nhà bẩn quá. Họ đã không dọn dẹp nó trong nhiều tuần."
            },
            {
              "en": "The house was dirty. They **hadn't cleaned** it for weeks.",
              "vi": "Ngôi nhà đã bẩn. Họ đã không dọn dẹp nó trong nhiều tuần trước đó."
            }
          ]
        },
        {
          "label": "C",
          "heading": "So sánh quá khứ đơn và quá khứ hoàn thành",
          "headingEn": "Compare past simple and past perfect",
          "body": "Compare past simple (left, was etc.) and past perfect (had left, had been etc.):",
          "bodyVi": "So sánh quá khứ đơn (left, was v.v.) và quá khứ hoàn thành (had left, had been v.v.):",
          "examples": [
            {
              "en": "A: Was Tom there when you arrived? B: Yes, but he **left** soon afterwards.",
              "note": "past simple: things happened one after another",
              "vi": "A: Tom có ở đó khi bạn đến không? B: Có, nhưng anh ấy rời đi ngay sau đó."
            },
            {
              "en": "A: Was Tom there when you arrived? B: No, he**'d already left**.",
              "note": "past perfect: he left before you arrived",
              "vi": "A: Tom có ở đó khi bạn đến không? B: Không, anh ấy đã rời đi trước đó rồi."
            },
            {
              "en": "Kate wasn't at home when I phoned. She **was** at her mother's house.",
              "vi": "Kate không có ở nhà khi tôi gọi điện. Cô ấy đang ở nhà mẹ mình."
            },
            {
              "en": "Kate **had** just **got** home when I phoned. She**'d been** at her mother's house.",
              "vi": "Kate vừa về nhà xong khi tôi gọi điện. Cô ấy đã ở nhà mẹ mình trước đó."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "15.1 · Đọc tình huống và viết câu ở thì quá khứ hoàn thành",
      "titleEn": "15.1 · Read the situations and write sentences in the past perfect",
      "instructions": "Đọc tình huống rồi viết câu bằng các từ trong ngoặc, dùng thì quá khứ hoàn thành.",
      "instructionsEn": "Read the situations and write sentences using the words in brackets, in the past perfect.",
      "passage": "Ví dụ:\n1 There was a picture lying on the floor. (It / fall / off the wall) It had fallen off the wall.\n2 The people sitting next to you on the plane were nervous. It was their first flight. (They / not / fly / before) They hadn't flown before.",
      "passageEn": "Example:\n1 There was a picture lying on the floor. (It / fall / off the wall) It had fallen off the wall.\n2 The people sitting next to you on the plane were nervous. It was their first flight. (They / not / fly / before) They hadn't flown before.",
      "startNumber": 3,
      "items": [
        {
          "prompt": "You went back to your home town recently after many years. It wasn't the same as before. (It / change / a lot) It ___.",
          "answer": "had changed a lot"
        },
        {
          "prompt": "Somebody sang a song. You didn't know it. (I / not / hear / it / before) I ___.",
          "answer": "hadn't heard it before"
        },
        {
          "prompt": "I invited Rachel to the party, but she couldn't come. (She / arrange / to do something else) ___.",
          "answer": "She had arranged to do something else",
          "accept": [
            "She'd arranged to do something else"
          ]
        },
        {
          "prompt": "You went to the cinema last night. You got to the cinema late. (The film / already / start) ___.",
          "answer": "The film had already started"
        },
        {
          "prompt": "Last year we went to Mexico. It was our first time there. (We / not / be / there / before) We ___.",
          "answer": "hadn't been there before"
        },
        {
          "prompt": "I met Daniel last week. It was good to see him again after such a long time. (I / not / see / him for five years) ___.",
          "answer": "I hadn't seen him for five years"
        },
        {
          "prompt": "I offered my friends something to eat, but they weren't hungry. (They / just / have / lunch) ___.",
          "answer": "They had just had lunch",
          "accept": [
            "They'd just had lunch"
          ]
        },
        {
          "prompt": "Sam played tennis yesterday. He wasn't very good at it because it was his first game ever. (He / never / play / before) ___.",
          "answer": "He had never played before",
          "accept": [
            "He'd never played before"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "15.2 · Hoàn thành đoạn văn bằng thì quá khứ hoàn thành",
      "titleEn": "15.2 · Complete the paragraphs using the past perfect",
      "instructions": "Dùng các câu bên trái để hoàn thành đoạn văn bên phải. Các câu bên trái được sắp theo thứ tự việc đã xảy ra, nên đôi khi bạn cần dùng thì quá khứ hoàn thành cho việc xảy ra trước.",
      "instructionsEn": "Use the sentences on the left to complete the paragraphs on the right. The sentences on the left are in the order the events happened, so you sometimes need the past perfect for whatever happened earlier.",
      "passage": "Ví dụ: 1 (a) Somebody broke into the office during the night. (b) We arrived at work in the morning. (c) We called the police. Đoạn văn: We arrived at work in the morning and found that somebody had broken into the office during the night. So we called the police.",
      "passageEn": "Example: 1 (a) Somebody broke into the office during the night. (b) We arrived at work in the morning. (c) We called the police. Paragraph: We arrived at work in the morning and found that somebody had broken into the office during the night. So we called the police.",
      "startNumber": 2,
      "items": [
        {
          "prompt": "2a (a) Laura went out this morning. (b) I rang her doorbell. (c) There was no answer. I went to Laura's house this morning and rang her doorbell, but ___ no answer.",
          "answer": "there was"
        },
        {
          "prompt": "2b ___ out. (Laura had already left before you rang the doorbell.)",
          "answer": "She had gone",
          "accept": [
            "She'd gone"
          ]
        },
        {
          "prompt": "3a (a) Joe came back from holiday a few days ago. (b) I met him the same day. (c) He looked very well. I met Joe a few days ago. ___ from holiday.",
          "answer": "He had just come back",
          "accept": [
            "He'd just come back"
          ]
        },
        {
          "prompt": "3b ___ very well.",
          "answer": "He looked"
        },
        {
          "prompt": "4a (a) James sent Amy lots of emails. (b) She never replied to them. (c) Yesterday he got a phone call from her. (d) He was surprised. Yesterday James ___ from Amy.",
          "answer": "got a phone call"
        },
        {
          "prompt": "4b ___ surprised.",
          "answer": "He was"
        },
        {
          "prompt": "4c He ___ Amy lots of emails,",
          "answer": "had sent",
          "accept": [
            "'d sent"
          ]
        },
        {
          "prompt": "4d but ___.",
          "answer": "she had never replied",
          "accept": [
            "she'd never replied"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "15.3 · Chia động từ ở thì quá khứ hoàn thành hoặc quá khứ đơn",
      "titleEn": "15.3 · Put the verb into the past perfect or past simple",
      "instructions": "Chia động từ trong ngoặc ở thì quá khứ hoàn thành (I had done) hoặc quá khứ đơn (I did).",
      "instructionsEn": "Put the verb in brackets into the past perfect (I had done) or the past simple (I did).",
      "passage": "Ví dụ: 1 Paul wasn't at the party when I arrived. He'd gone (He / go) home.",
      "passageEn": "Example: 1 Paul wasn't at the party when I arrived. He'd gone (He / go) home.",
      "startNumber": 2,
      "items": [
        {
          "prompt": "I felt very tired when I got home, so ___ straight to bed. (I / go)",
          "answer": "I went"
        },
        {
          "prompt": "The house was very quiet when I got home. Everybody ___ to bed. (go)",
          "answer": "had gone",
          "accept": [
            "'d gone"
          ]
        },
        {
          "prompt": "Mark travels a lot. When I first met him, ___ round the world. (he / already / travel)",
          "answer": "he had already travelled",
          "accept": [
            "he'd already travelled"
          ]
        },
        {
          "prompt": "Sorry I'm late. The car ___ down on my way here. (break)",
          "answer": "broke"
        },
        {
          "prompt": "We were driving along the road when ___ a car. (we / see)",
          "answer": "we saw"
        },
        {
          "prompt": "... a car which ___ down, (break)",
          "answer": "had broken",
          "accept": [
            "'d broken"
          ]
        },
        {
          "prompt": "so ___ to help. (we / stop)",
          "answer": "we stopped"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practise with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì quá khứ hoàn thành (had + phân từ hai) để kể về một việc đã xảy ra trước một mốc thời gian khác trong quá khứ, ví dụ: When Sarah arrived at the party, Paul had already gone home.",
      "instructionsEn": "Write 2-3 English sentences using the past perfect (had + past participle) to describe something that happened before another point in the past, for example: When Sarah arrived at the party, Paul had already gone home.",
      "ruleSummary": "This unit practises the past perfect (had + past participle), used for something that happened before a past starting point already established in a story. If the starting point is 'Sarah arrived at the party', anything that happened earlier than that moment needs the past perfect (Paul had already gone home), while events at or after the starting point use the past simple. Compare with the present perfect, which relates a past event to now (I've seen her before, I can't remember where) versus the past perfect, which relates it to another point in the past (I'd seen her before, but I couldn't remember where). Compare also with the past simple for events that simply happened one after another (he arrived, then he left) versus the past perfect when one event happened before the other and needs to be marked as earlier (when I arrived, he'd already left). A correct student sentence must use had plus a correct past participle, and must genuinely need to mark one past event as earlier than another past reference point, not just describe a single past event, which would only need the past simple."
    }
  ]
};

const UNIT_16_PAST_PERFECT_CONTINUOUS: GrammarUnit = {
  "unit": 16,
  "slug": "past-perfect-continuous",
  "title": "Past perfect continuous (I had been doing)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "Cách thành lập: had been + -ing",
          "headingEn": "Formation: had been + -ing",
          "intro": "Study this example situation:",
          "introVi": "Hãy xem tình huống ví dụ sau:",
          "body": "Yesterday morning I got up and looked out of the window. The sun was shining, but the ground was very wet. It **had been raining**.\n\nIt was not raining when I looked out of the window. The sun was shining. But it **had been raining** before.\n\n**had been -ing** is the *past perfect continuous*:",
          "bodyVi": "Sáng hôm qua tôi ngủ dậy và nhìn ra ngoài cửa sổ. Nắng đang chiếu, nhưng mặt đất rất ướt. Trời đã mưa trước đó.\n\nLúc tôi nhìn ra cửa sổ thì trời không mưa. Nắng đang chiếu. Nhưng trước đó trời đã mưa.\n\n**had been -ing** là thì *quá khứ hoàn thành tiếp diễn*:",
          "table": {
            "rows": [
              [
                "I/we/you/they",
                "**had** (= **I'd** etc.)",
                "**been doing**"
              ],
              [
                "he/she/it",
                "**had** (= **he'd** etc.)",
                "**been working** / **been playing** etc."
              ]
            ]
          },
          "examples": [
            {
              "en": "My hands were dirty because I**'d been repairing** my bike.",
              "vi": "Tay tôi bẩn vì tôi vừa sửa xe đạp xong."
            },
            {
              "en": "Tom was tired when he got home. He**'d been working** hard all day.",
              "vi": "Tom mệt khi về nhà. Anh ấy đã làm việc vất vả cả ngày."
            },
            {
              "en": "I went to Madrid a few years ago and stayed with a friend of mine. She **hadn't been living** there very long, but she knew the city very well.",
              "vi": "Vài năm trước tôi đến Madrid và ở cùng một người bạn. Cô ấy chưa sống ở đó lâu, nhưng lại biết thành phố rất rõ."
            },
            {
              "en": "We**'d been playing** tennis for about half an hour when it started to rain heavily.",
              "note": "something had been happening before something else happened",
              "vi": "Chúng tôi đã chơi tennis được khoảng nửa giờ thì trời bắt đầu mưa to."
            }
          ]
        },
        {
          "label": "B",
          "heading": "So sánh hiện tại hoàn thành tiếp diễn và quá khứ hoàn thành tiếp diễn",
          "headingEn": "Compare present perfect continuous and past perfect continuous",
          "body": "Compare *have been -ing* (present perfect continuous) and *had been -ing* (past perfect continuous):",
          "bodyVi": "So sánh *have been -ing* (hiện tại hoàn thành tiếp diễn) và *had been -ing* (quá khứ hoàn thành tiếp diễn):",
          "examples": [
            {
              "en": "I hope the bus comes soon. I**'ve been waiting** for 20 minutes.",
              "note": "before now",
              "vi": "Tôi mong xe buýt đến sớm. Tôi đã đợi 20 phút rồi."
            },
            {
              "en": "At last the bus came. I**'d been waiting** for 20 minutes.",
              "note": "before the bus came",
              "vi": "Cuối cùng xe buýt cũng đến. Tôi đã đợi 20 phút trước đó."
            },
            {
              "en": "James is out of breath. He**'s been running**.",
              "note": "= he has been ...",
              "vi": "James đang hụt hơi. Anh ấy vừa chạy xong."
            },
            {
              "en": "James was out of breath. He**'d been running**.",
              "note": "= he had been ...",
              "vi": "James đã hụt hơi. Anh ấy vừa chạy xong trước đó."
            }
          ]
        },
        {
          "label": "C",
          "heading": "So sánh quá khứ tiếp diễn và quá khứ hoàn thành tiếp diễn",
          "headingEn": "Compare past continuous and past perfect continuous",
          "body": "Compare *was -ing* (past continuous) and *had been -ing*:",
          "bodyVi": "So sánh *was -ing* (quá khứ tiếp diễn) và *had been -ing*:",
          "examples": [
            {
              "en": "It **wasn't raining** when we went out. The sun was shining. But it **had been raining**, so the ground was wet.",
              "vi": "Trời không mưa khi chúng tôi ra ngoài. Nắng đang chiếu. Nhưng trước đó trời đã mưa, nên mặt đất ướt."
            },
            {
              "en": "Katherine **was lying** on the sofa. She was tired because she**'d been working** hard.",
              "vi": "Katherine đang nằm trên ghế sofa. Cô ấy mệt vì đã làm việc vất vả trước đó."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Động từ không dùng ở dạng tiếp diễn",
          "headingEn": "Verbs not normally used in the continuous",
          "body": "Some verbs (for example, know) are not normally used in continuous forms (be + -ing). For a list of these verbs, see Unit 4A; for have, see Unit 17.",
          "bodyVi": "Một số động từ (ví dụ know) không được dùng ở dạng tiếp diễn (be + -ing). Xem danh sách các động từ này ở Unit 4A; về have, xem Unit 17.",
          "examples": [
            {
              "en": "We were good friends. We **had known** each other for years.",
              "note": "not had been knowing",
              "vi": "Chúng tôi là bạn tốt. Chúng tôi đã biết nhau nhiều năm."
            },
            {
              "en": "A few years ago Lisa cut her hair really short. I was surprised because she**'d always had** long hair.",
              "note": "not she'd been having",
              "vi": "Vài năm trước Lisa cắt tóc rất ngắn. Tôi ngạc nhiên vì trước đó cô ấy luôn để tóc dài."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "16.1 · Đọc tình huống và viết câu ở thì quá khứ hoàn thành tiếp diễn",
      "titleEn": "16.1 · Read the situations and make sentences in the past perfect continuous",
      "instructions": "Đọc tình huống rồi viết câu bằng các từ trong ngoặc, dùng thì quá khứ hoàn thành tiếp diễn.",
      "instructionsEn": "Read the situations and make sentences using the words in brackets, in the past perfect continuous.",
      "passage": "Ví dụ: 1 Tom was very tired when he got home. (He / work / hard all day) He'd been working hard all day.",
      "passageEn": "Example: 1 Tom was very tired when he got home. (He / work / hard all day) He'd been working hard all day.",
      "startNumber": 2,
      "items": [
        {
          "prompt": "The children came into the house. They had a football and they were both very tired. (They / play / football)",
          "answer": "They had been playing football",
          "accept": [
            "They'd been playing football"
          ]
        },
        {
          "prompt": "I was disappointed when I had to cancel my holiday. (I / look / forward to it)",
          "answer": "I had been looking forward to it",
          "accept": [
            "I'd been looking forward to it"
          ]
        },
        {
          "prompt": "Anna woke up in the middle of the night. She was frightened and didn't know where she was. (She / have / a bad dream)",
          "answer": "She had been having a bad dream",
          "accept": [
            "She'd been having a bad dream"
          ]
        },
        {
          "prompt": "When I got home, Mark was sitting in front of the TV. He had just turned it off. (He / watch / a film)",
          "answer": "He had been watching a film",
          "accept": [
            "He'd been watching a film"
          ]
        },
        {
          "prompt": "The people waiting at the bus stop were getting impatient. The bus was very late. (They / wait / a long time)",
          "answer": "They had been waiting a long time",
          "accept": [
            "They'd been waiting a long time"
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "16.2 · Đọc tình huống và hoàn thành câu",
      "titleEn": "16.2 · Read the situations and complete the sentences",
      "instructions": "Đọc tình huống rồi hoàn thành câu, dùng thì quá khứ hoàn thành tiếp diễn hoặc quá khứ đơn cho phù hợp.",
      "instructionsEn": "Read the situations and complete the sentences, using the past perfect continuous or the past simple as appropriate.",
      "passage": "Ví dụ: 1 We played tennis yesterday. We didn't finish our game. We'd been playing (We / play) for half an hour when it started (it / start) to rain.",
      "passageEn": "Example: 1 We played tennis yesterday. We didn't finish our game. We'd been playing (We / play) for half an hour when it started (it / start) to rain.",
      "startNumber": 2,
      "items": [
        {
          "prompt": "2a I had arranged to meet Tom in a restaurant. I arrived and waited for him to come. ___ for 20 minutes (I / wait)",
          "answer": "I had been waiting",
          "accept": [
            "I'd been waiting"
          ]
        },
        {
          "prompt": "2b when ___ that (I / realise)",
          "answer": "I realised"
        },
        {
          "prompt": "2c ___ in the wrong restaurant. (I / be)",
          "answer": "I was"
        },
        {
          "prompt": "3a Sarah worked in a company for a long time. The company no longer exists. At the time the company ___ out of business, (go)",
          "answer": "went"
        },
        {
          "prompt": "3b Sarah ___ there for twelve years. (work)",
          "answer": "had been working",
          "accept": [
            "had worked",
            "'d been working"
          ]
        },
        {
          "prompt": "4a I went to a concert. Soon after the orchestra began playing, something strange happened. The orchestra ___ for about ten minutes (play)",
          "answer": "had been playing",
          "accept": [
            "'d been playing"
          ]
        },
        {
          "prompt": "4b when a man in the audience suddenly ___ shouting. (start)",
          "answer": "started"
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "16.3 · Chọn câu đúng",
      "titleEn": "16.3 · Which is right?",
      "instructions": "Chọn cách diễn đạt đúng trong mỗi cặp.",
      "instructionsEn": "Choose the correct form in each pair.",
      "passage": "Ví dụ: 1 It was noisy next door last night. Our neighbours were having / had been having a party. (were having is correct)",
      "passageEn": "Example: 1 It was noisy next door last night. Our neighbours were having / had been having a party. (were having is correct)",
      "items": [
        {
          "before": "At the end of our journey we were extremely tired.",
          "options": [
            "We were travelling",
            "We'd been travelling"
          ],
          "after": "for more than 24 hours.",
          "answer": "We'd been travelling"
        },
        {
          "before": "James was on his hands and knees on the floor.",
          "options": [
            "He was looking",
            "He'd been looking"
          ],
          "after": "for his contact lens.",
          "answer": "He'd been looking"
        },
        {
          "before": "Sue was sitting on the ground. She was out of breath.",
          "options": [
            "She was running",
            "She'd been running"
          ],
          "after": "",
          "answer": "She'd been running"
        },
        {
          "before": "John and I went for a walk.",
          "options": [
            "He was walking",
            "He'd been walking"
          ],
          "after": "very fast and I had difficulty keeping up with him.",
          "answer": "He was walking"
        },
        {
          "before": "I was sad when I sold my car.",
          "options": [
            "I've had it",
            "I'd had it"
          ],
          "after": "for a very long time.",
          "answer": "I'd had it"
        },
        {
          "before": "I was sad when my local cafe closed.",
          "options": [
            "I was going",
            "I'd been going"
          ],
          "after": "there for many years.",
          "answer": "I'd been going"
        },
        {
          "before": "I'm running a marathon next month.",
          "options": [
            "I've been training",
            "I'd been training"
          ],
          "after": "for it every day.",
          "answer": "I've been training"
        },
        {
          "before": "I had arranged to meet Kate, but I was late. When I finally arrived,",
          "options": [
            "she was waiting",
            "she'd been waiting"
          ],
          "after": "for me.",
          "answer": "she was waiting"
        },
        {
          "before": "She was annoyed because",
          "options": [
            "she was waiting",
            "she'd been waiting"
          ],
          "after": "such a long time.",
          "answer": "she'd been waiting"
        },
        {
          "before": "Joe and I work for the same company. He joined the company before me. When I started a few years ago,",
          "options": [
            "he was already working",
            "he'd already been working"
          ],
          "after": "there.",
          "answer": "he'd already been working"
        },
        {
          "before": "I started working at the company a few years ago. At the time I started, Joe",
          "options": [
            "was already working",
            "had already been working"
          ],
          "after": "there for two years.",
          "answer": "had already been working"
        },
        {
          "before": "Joe still works for the company.",
          "options": [
            "He's been working",
            "He'd been working"
          ],
          "after": "there a long time now.",
          "answer": "He's been working"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practise with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì quá khứ hoàn thành tiếp diễn (had been + V-ing) để giải thích lý do cho một trạng thái trong quá khứ, ví dụ: My hands were dirty because I'd been repairing my bike.",
      "instructionsEn": "Write 2-3 English sentences using the past perfect continuous (had been + V-ing) to explain the reason for a past state, for example: My hands were dirty because I'd been repairing my bike.",
      "ruleSummary": "This unit practises the past perfect continuous (had been + -ing), used for an activity that had been going on before a particular past moment, often to explain a state at that moment (My hands were dirty because I'd been repairing my bike. Tom was tired because he'd been working hard all day). Compare it with the present perfect continuous, which relates the activity to now (I've been waiting for 20 minutes, before now) versus the past perfect continuous, which relates it to another past moment (I'd been waiting for 20 minutes, before the bus came). Compare it also with the past continuous (was doing), which simply describes what was happening at a past moment, versus the past perfect continuous, which looks back at an activity that had been happening before that moment. As with other continuous forms, state verbs such as know are not normally used in the continuous (We had known each other for years, not had been knowing). A correct student sentence must use had been plus the -ing form, and should describe an activity that explains or precedes a specific past moment, not simply narrate a single past event."
    }
  ]
};

const UNIT_17_HAVE_AND_HAVE_GOT: GrammarUnit = {
  "unit": 17,
  "slug": "have-and-have-got",
  "title": "have and have got",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "titleEn": "Learn the rule",
      "blocks": [
        {
          "label": "A",
          "heading": "have và have got: sở hữu, quan hệ, bệnh tật, cuộc hẹn...",
          "headingEn": "have and have got: possession, relationships, illnesses, appointments etc.",
          "body": "You can use **have** or **have got**. There is no difference in meaning.\n\nWith these meanings (possession etc.), we do not use continuous forms (**I'm having** etc.).\n\nFor the past we use **had** (usually without got).",
          "bodyVi": "Bạn có thể dùng **have** hoặc **have got**. Không có sự khác biệt về nghĩa.\n\nVới những nghĩa này (sở hữu v.v.), chúng ta không dùng dạng tiếp diễn (**I'm having** v.v.).\n\nỞ thì quá khứ, chúng ta dùng **had** (thường không có got).",
          "examples": [
            {
              "en": "They **have** a new car.",
              "note": "or They've got a new car.",
              "vi": "Họ có một chiếc xe mới."
            },
            {
              "en": "Lisa **has** two brothers.",
              "note": "or Lisa has got two brothers.",
              "vi": "Lisa có hai anh trai."
            },
            {
              "en": "I **have** a headache.",
              "note": "or I've got a headache.",
              "vi": "Tôi bị đau đầu."
            },
            {
              "en": "Our house **has** a small garden.",
              "note": "or Our house has got a small garden.",
              "vi": "Nhà chúng tôi có một khu vườn nhỏ."
            },
            {
              "en": "He **has** a few problems.",
              "note": "or He's got a few problems.",
              "vi": "Anh ấy có vài vấn đề."
            },
            {
              "en": "I **have** a driving lesson tomorrow.",
              "note": "or I've got a driving lesson tomorrow.",
              "vi": "Ngày mai tôi có một buổi học lái xe."
            },
            {
              "en": "We're enjoying our holiday. We **have** / We've got a nice room in the hotel.",
              "note": "not We're having a nice room",
              "vi": "Chúng tôi đang có một kỳ nghỉ vui vẻ. Chúng tôi có một phòng đẹp trong khách sạn."
            },
            {
              "en": "Lisa **had** long hair when she was a child.",
              "note": "not Lisa had got",
              "vi": "Lisa từng để tóc dài khi còn nhỏ."
            }
          ]
        },
        {
          "label": "B",
          "heading": "Câu hỏi và câu phủ định",
          "headingEn": "Questions and negatives",
          "body": "In questions and negative sentences there are three possible forms:",
          "bodyVi": "Trong câu hỏi và câu phủ định, có ba cách diễn đạt:",
          "table": {
            "headers": [
              "Câu hỏi",
              "Câu phủ định"
            ],
            "rows": [
              [
                "**Do** you **have** any questions?",
                "I **don't have** any questions."
              ],
              [
                "**Have** you **got** any questions?",
                "I **haven't got** any questions."
              ],
              [
                "**Have** you any questions? (less usual)",
                "I **haven't** any questions. (less usual)"
              ],
              [
                "**Does** she **have** a car?",
                "She **doesn't have** a car."
              ],
              [
                "**Has** she **got** a car?",
                "She **hasn't got** a car."
              ],
              [
                "**Has** she a car? (less usual)",
                "She **hasn't** a car. (less usual)"
              ]
            ]
          },
          "examples": [
            {
              "en": "In past questions and negative sentences, we use **did/didn't**:",
              "vi": "Ở câu hỏi và câu phủ định thời quá khứ, chúng ta dùng **did/didn't**:"
            },
            {
              "en": "**Did** you **have** a car when you were living in Paris?",
              "vi": "Bạn có xe hơi không khi bạn đang sống ở Paris?"
            },
            {
              "en": "I **didn't have** my phone, so I couldn't call you.",
              "vi": "Tôi không có điện thoại, nên tôi không thể gọi cho bạn."
            },
            {
              "en": "Lisa **had** long hair, didn't she?",
              "vi": "Lisa từng để tóc dài, đúng không?"
            }
          ]
        },
        {
          "label": "C",
          "heading": "have breakfast / have a shower / have a good time...",
          "headingEn": "have breakfast / have a shower / have a good time etc.",
          "body": "We also use **have** (but not have got) for things we do or experience. For example:",
          "bodyVi": "Chúng ta cũng dùng **have** (nhưng không dùng have got) cho những việc chúng ta làm hoặc trải qua. Ví dụ:",
          "wordList": [
            "breakfast",
            "dinner",
            "a cup of coffee",
            "something to eat",
            "a bath",
            "a shower",
            "a swim",
            "a break",
            "a rest",
            "a party",
            "a holiday",
            "an accident",
            "an experience",
            "a dream",
            "a look (at something)",
            "a chat",
            "a discussion",
            "a conversation (with somebody)",
            "trouble",
            "difficulty",
            "fun",
            "a good time",
            "a baby"
          ],
          "examples": [
            {
              "en": "**Have got** is not possible in these expressions.",
              "vi": "Không dùng được **have got** trong các cách diễn đạt này."
            },
            {
              "en": "Sometimes I **have** (= eat) a sandwich for my lunch.",
              "note": "not I've got",
              "vi": "Đôi khi tôi ăn một cái sandwich cho bữa trưa."
            },
            {
              "en": "I've got / I **have** some sandwiches. Would you like one?",
              "vi": "Tôi có vài cái sandwich. Bạn có muốn ăn một cái không?"
            },
            {
              "en": "You can use continuous forms (**I'm having** etc.) with these expressions:",
              "vi": "Bạn có thể dùng dạng tiếp diễn (**I'm having** v.v.) với những cách diễn đạt này:"
            },
            {
              "en": "We're enjoying our holiday. We**'re having** a great time.",
              "vi": "Chúng tôi đang có một kỳ nghỉ vui vẻ. Chúng tôi đang có khoảng thời gian tuyệt vời."
            },
            {
              "en": "'Where's Mark?' 'He**'s having** a shower.'",
              "vi": "'Mark đâu rồi?' 'Anh ấy đang tắm.'"
            },
            {
              "en": "In questions and negative sentences we use **do/does/did**:",
              "vi": "Trong câu hỏi và câu phủ định, chúng ta dùng **do/does/did**:"
            },
            {
              "en": "I **don't** usually **have** a big breakfast.",
              "note": "not I usually haven't",
              "vi": "Tôi thường không ăn sáng nhiều."
            },
            {
              "en": "Where **does** Chris usually **have** lunch?",
              "vi": "Chris thường ăn trưa ở đâu?"
            },
            {
              "en": "**Did** you **have** trouble finding somewhere to stay?",
              "note": "not Had you",
              "vi": "Bạn có gặp khó khăn khi tìm chỗ ở không?"
            }
          ]
        }
      ]
    },
    {
      "kind": "match_pairs",
      "title": "17.1 · Nối câu cho phù hợp",
      "titleEn": "17.1 · Which goes with which?",
      "instructions": "Các câu bên phải nối tiếp ý của các câu bên trái. Chạm một câu bên trái, sau đó chạm câu phù hợp bên phải.",
      "instructionsEn": "The sentences on the right go with those on the left. Tap a sentence on the left, then tap the one on the right that goes with it.",
      "left": [
        "I'm not free tomorrow morning.",
        "Rachel is an only child.",
        "We've got plenty of time.",
        "You've got a really good voice.",
        "I don't feel very well this morning.",
        "Laura studied at university.",
        "I've got a question.",
        "James has got a lot of experience."
      ],
      "right": [
        "She's got a degree in physics.",
        "I've got a sore throat.",
        "There's no need to hurry.",
        "I've got a driving lesson.",
        "Maybe you can answer it.",
        "I think he should get the job.",
        "I wish I could sing as well as you.",
        "She's got no brothers or sisters."
      ],
      "answers": [
        "I've got a driving lesson.",
        "She's got no brothers or sisters.",
        "There's no need to hurry.",
        "I wish I could sing as well as you.",
        "I've got a sore throat.",
        "She's got a degree in physics.",
        "Maybe you can answer it.",
        "I think he should get the job."
      ]
    },
    {
      "kind": "type_fill",
      "title": "17.2 · Hoàn thành câu dùng have",
      "titleEn": "17.2 · Complete the sentences using have",
      "instructions": "Hoàn thành các câu bằng have, chia ở dạng phù hợp.",
      "instructionsEn": "Complete the sentences using have, in the correct form.",
      "passage": "Ví dụ:\n1 She couldn't get into the house. She didn't have a key.\n2 Is there anything you'd like to ask? Do you have any questions?",
      "passageEn": "Example:\n1 She couldn't get into the house. She didn't have a key.\n2 Is there anything you'd like to ask? Do you have any questions?",
      "startNumber": 3,
      "items": [
        {
          "prompt": "They can't pay their bills. They ___ any money. (have)",
          "answer": "don't have"
        },
        {
          "prompt": "We got wet in the rain yesterday. We ___ an umbrella. (have)",
          "answer": "didn't have"
        },
        {
          "prompt": "Jack ___ a car. He can't afford one and he can't drive anyway. (have)",
          "answer": "doesn't have"
        },
        {
          "prompt": "'Excuse me, ___ a pen I could borrow?' 'Yes, sure. Here you are.' (have)",
          "answer": "do you have"
        },
        {
          "prompt": "I was very busy yesterday. I ___ time to go shopping. (have)",
          "answer": "didn't have"
        },
        {
          "prompt": "'Tell me about Jack. ___ a job?' 'Yes, he works at the hospital.' (have)",
          "answer": "does he have"
        },
        {
          "prompt": "When you worked in your last job, ___ your own office? (have)",
          "answer": "did you have"
        },
        {
          "prompt": "'Where's the remote control?' 'I don't know. I ___ it.' (have)",
          "answer": "don't have"
        },
        {
          "prompt": "'Tom ___ a motorbike, (have)",
          "answer": "had"
        },
        {
          "prompt": "___ he?' 'Yes, that's right. A long time ago.'",
          "answer": "didn't"
        }
      ]
    },
    {
      "kind": "judge_correct",
      "title": "17.3 · Phần gạch chân đúng hay cần sửa?",
      "titleEn": "17.3 · Are the underlined words OK?",
      "instructions": "Phần gạch chân trong mỗi câu đã đúng chưa? Sửa lại nếu cần.",
      "instructionsEn": "Are the underlined words in each sentence OK? Change them where necessary.",
      "items": [
        {
          "sentence": "I'm not free tomorrow morning. I've got a driving lesson.",
          "underlined": "I've got a driving lesson",
          "ok": true
        },
        {
          "sentence": "Lisa had got long hair when she was a child.",
          "underlined": "had got long hair",
          "ok": false,
          "correction": "had long hair"
        },
        {
          "sentence": "I couldn't contact you because I hadn't my phone.",
          "underlined": "hadn't my phone",
          "ok": false,
          "correction": "didn't have my phone"
        },
        {
          "sentence": "'Are you feeling OK?' 'No, I'm having a cold.'",
          "underlined": "I'm having a cold",
          "ok": false,
          "correction": "I've got a cold",
          "accept": [
            "I have a cold"
          ]
        },
        {
          "sentence": "I'm not working right now. I'm having a break.",
          "underlined": "I'm having a break",
          "ok": true
        },
        {
          "sentence": "I felt really tired. I hadn't any energy.",
          "underlined": "I hadn't any energy",
          "ok": false,
          "correction": "I didn't have any energy",
          "accept": [
            "I had no energy"
          ]
        },
        {
          "sentence": "It's a small town. It doesn't have many shops.",
          "underlined": "It doesn't have many shops",
          "ok": true
        },
        {
          "sentence": "Was your trip OK? Had you any problems?",
          "underlined": "Had you any problems",
          "ok": false,
          "correction": "Did you have any problems"
        },
        {
          "sentence": "My friend called me when I was having breakfast.",
          "underlined": "I was having breakfast",
          "ok": true
        },
        {
          "sentence": "The last time I saw Steve, he was having a beard.",
          "underlined": "he was having a beard",
          "ok": false,
          "correction": "he had a beard"
        },
        {
          "sentence": "We don't need to hurry. We have plenty of time.",
          "underlined": "We have plenty of time",
          "ok": true
        },
        {
          "sentence": "How often have you a shower?",
          "underlined": "have you a shower",
          "ok": false,
          "correction": "do you have a shower"
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "17.4 · Hoàn thành câu với cụm động từ have",
      "titleEn": "17.4 · Complete the sentences with a have expression",
      "instructions": "Hoàn thành câu bằng một cụm động từ với have ở dạng đúng, chọn trong danh sách cho sẵn.",
      "instructionsEn": "Complete the sentences using an expression with have in the correct form, chosen from the list.",
      "passage": "Danh sách: have a baby, have a break, have a chat, have trouble, have a shower, have a look, have lunch, have a party, have a nice time, have a holiday\n\nVí dụ: 1 I don't eat much during the day. I never have lunch.",
      "passageEn": "Choose from: have a baby, have a break, have a chat, have trouble, have a shower, have a look, have lunch, have a party, have a nice time, have a holiday\n\nExample: 1 I don't eat much during the day. I never have lunch.",
      "startNumber": 2,
      "items": [
        {
          "prompt": "David starts work at 8 o'clock and ___ at 10.30.",
          "answer": "has a break"
        },
        {
          "prompt": "We ___ last week. We invited lots of people.",
          "answer": "had a party"
        },
        {
          "prompt": "There's something wrong with my bike. Can you ___ at it for me?",
          "answer": "have a look"
        },
        {
          "prompt": "Joe is away on holiday at the moment. I hope he ___.",
          "answer": "is having a nice time",
          "accept": [
            "'s having a nice time"
          ]
        },
        {
          "prompt": "I met some friends in the supermarket yesterday. We stopped and ___.",
          "answer": "had a chat"
        },
        {
          "prompt": "'___ finding the book you wanted?' 'No, I found it OK.'",
          "answer": "Did you have trouble"
        },
        {
          "prompt": "Suzanne ___ a few weeks ago. It's her second child.",
          "answer": "had a baby"
        },
        {
          "prompt": "I ___ when the light went out suddenly.",
          "answer": "was having a shower"
        },
        {
          "prompt": "I'd like to go away somewhere. I ___ for a long time.",
          "answer": "haven't had a holiday"
        }
      ]
    },
    {
      "kind": "ai_practice",
      "title": "Luyện với AI",
      "titleEn": "Practise with AI",
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng have hoặc have got để nói về những gì bạn sở hữu, hoặc dùng một cụm động từ với have (have breakfast, have a shower, have a good time...) để nói về việc bạn làm hoặc trải nghiệm.",
      "instructionsEn": "Write 2-3 English sentences using have or have got to talk about what you own, or using a have expression (have breakfast, have a shower, have a good time...) to talk about something you do or experience.",
      "ruleSummary": "This unit practises have and have got. For possession, relationships, illnesses and similar states, have and have got mean the same thing (I have / I've got a headache) and do not use continuous forms (not I'm having a headache); for the past, only had is used, not had got. Questions and negatives can use do/does/did have (Do you have ...? I don't have ...) or have/has got (Have you got ...? I haven't got ...), but past questions and negatives always use did/didn't have, never had got. Separately, have (but never have got) is used for things people do or experience, such as have breakfast, have a shower, have a look, have a good time, have a chat, have a baby; these DO use continuous forms (I'm having a shower) and use do/does/did in questions and negatives (Did you have a good time?). A correct student sentence must not mix had got with a past-tense question or negative, and must not use a continuous form for possession/state have."
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
  { unit: 9, slug: UNIT_9_PRESENT_PERFECT_CONTINUOUS.slug, title: UNIT_9_PRESENT_PERFECT_CONTINUOUS.title, topic: UNIT_9_PRESENT_PERFECT_CONTINUOUS.topic, available: true },
  { unit: 10, slug: UNIT_10_PRESENT_PERFECT_CONTINUOUS_AND_SIMPLE.slug, title: UNIT_10_PRESENT_PERFECT_CONTINUOUS_AND_SIMPLE.title, topic: UNIT_10_PRESENT_PERFECT_CONTINUOUS_AND_SIMPLE.topic, available: true },
  { unit: 11, slug: UNIT_11_HOW_LONG_HAVE_YOU_BEEN.slug, title: UNIT_11_HOW_LONG_HAVE_YOU_BEEN.title, topic: UNIT_11_HOW_LONG_HAVE_YOU_BEEN.topic, available: true },
  { unit: 12, slug: UNIT_12_FOR_AND_SINCE.slug, title: UNIT_12_FOR_AND_SINCE.title, topic: UNIT_12_FOR_AND_SINCE.topic, available: true },
  { unit: 13, slug: UNIT_13_PRESENT_PERFECT_AND_PAST_1.slug, title: UNIT_13_PRESENT_PERFECT_AND_PAST_1.title, topic: UNIT_13_PRESENT_PERFECT_AND_PAST_1.topic, available: true },
  { unit: 14, slug: UNIT_14_PRESENT_PERFECT_AND_PAST_2.slug, title: UNIT_14_PRESENT_PERFECT_AND_PAST_2.title, topic: UNIT_14_PRESENT_PERFECT_AND_PAST_2.topic, available: true },
  { unit: 15, slug: UNIT_15_PAST_PERFECT.slug, title: UNIT_15_PAST_PERFECT.title, topic: UNIT_15_PAST_PERFECT.topic, available: true },
  { unit: 16, slug: UNIT_16_PAST_PERFECT_CONTINUOUS.slug, title: UNIT_16_PAST_PERFECT_CONTINUOUS.title, topic: UNIT_16_PAST_PERFECT_CONTINUOUS.topic, available: true },
  { unit: 17, slug: UNIT_17_HAVE_AND_HAVE_GOT.slug, title: UNIT_17_HAVE_AND_HAVE_GOT.title, topic: UNIT_17_HAVE_AND_HAVE_GOT.topic, available: true },
];

export const GRAMMAR_UNITS: GrammarUnit[] = [UNIT_1_PRESENT_CONTINUOUS, UNIT_2_PRESENT_SIMPLE, UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1, UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2, UNIT_5_PAST_SIMPLE, UNIT_6_PAST_CONTINUOUS, UNIT_7_PRESENT_PERFECT_1, UNIT_8_PRESENT_PERFECT_2, UNIT_9_PRESENT_PERFECT_CONTINUOUS, UNIT_10_PRESENT_PERFECT_CONTINUOUS_AND_SIMPLE, UNIT_11_HOW_LONG_HAVE_YOU_BEEN, UNIT_12_FOR_AND_SINCE, UNIT_13_PRESENT_PERFECT_AND_PAST_1, UNIT_14_PRESENT_PERFECT_AND_PAST_2, UNIT_15_PAST_PERFECT, UNIT_16_PAST_PERFECT_CONTINUOUS, UNIT_17_HAVE_AND_HAVE_GOT];

export function getGrammarUnit(slug: string): GrammarUnit | undefined {
  return GRAMMAR_UNITS.find((u) => u.slug === slug);
}
