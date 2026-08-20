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

const UNIT_9_PRESENT_PERFECT_CONTINUOUS: GrammarUnit = {
  "unit": 9,
  "slug": "present-perfect-continuous",
  "title": "Present perfect continuous (I have been doing)",
  "topic": "Present perfect and past",
  "steps": [
    {
      "kind": "rule",
      "title": "Học quy tắc",
      "blocks": [
        {
          "label": "A",
          "heading": "have/has been + -ing: an activity that has just stopped",
          "body": "have/has been + -ing is the present perfect continuous (I/we/they/you have been doing; he/she/it has been doing). We use it for an activity that has recently stopped or has just stopped. The ground being wet even though it isn't raining now is a typical example: something happened over a period leading up to now.",
          "examples": [
            {
              "en": "Is it raining? No, but the ground is wet. It's been raining.",
              "note": "It's been = It has been"
            },
            {
              "en": "Why are you out of breath? Have you been running?"
            },
            {
              "en": "Paul is very tired. He's been working hard."
            },
            {
              "en": "Why are you so tired? What have you been doing?"
            },
            {
              "en": "I've been talking to Amanda and she agrees with me."
            },
            {
              "en": "Where have you been? I've been looking for you."
            }
          ]
        },
        {
          "label": "B",
          "heading": "how long, for, since: an activity that is still happening",
          "body": "We also use the present perfect continuous, especially with how long, for and since, when the activity is still happening now or has only just stopped. It can describe a single continuing activity or something repeated over a period.",
          "examples": [
            {
              "en": "It began raining two hours ago and it is still raining. How long has it been raining? It's been raining for two hours."
            },
            {
              "en": "How long have you been learning English?",
              "note": "you're still learning English"
            },
            {
              "en": "Ben is watching TV. He's been watching TV all day."
            },
            {
              "en": "Where have you been? I've been looking for you for the last half hour."
            },
            {
              "en": "Chris hasn't been feeling well recently."
            },
            {
              "en": "Silvia is a very good tennis player. She's been playing since she was eight.",
              "note": "a repeated action"
            },
            {
              "en": "Every morning they meet in the same cafe. They've been going there for years."
            }
          ]
        },
        {
          "label": "C",
          "heading": "I am doing vs I have been doing",
          "body": "Compare the present continuous (I am doing), which describes what is happening right now, with the present perfect continuous (I have been doing), which looks back at an activity over a period up to now.",
          "examples": [
            {
              "en": "Don't disturb me now. I'm working."
            },
            {
              "en": "I've been working hard. Now I'm going to have a break."
            },
            {
              "en": "We need an umbrella. It's raining."
            },
            {
              "en": "The ground is wet. It's been raining."
            },
            {
              "en": "Hurry up! We're waiting."
            },
            {
              "en": "We've been waiting for an hour."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "9.2 · Viết câu hỏi cho từng tình huống",
      "instructions": "Viết một câu hỏi cho mỗi tình huống, dùng thì hiện tại hoàn thành tiếp diễn (have/has been + -ing).",
      "passage": "Ví dụ: 1 You meet Kate as she is leaving the swimming pool. Hi, Kate. (you / swim?) Have you been swimming?",
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
      "instructions": "Đọc tình huống rồi hoàn thành câu bằng thì hiện tại hoàn thành tiếp diễn (have/has been + -ing).",
      "passage": "Ví dụ: 1 It's raining. The rain started two hours ago. It's been raining for two hours.",
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
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại tiếp diễn (am/is/are + -ing) hoặc hiện tại hoàn thành tiếp diễn (have/has been + -ing).",
      "passage": "Ví dụ: 1 Maria has been learning (Maria / learn) English for two years.",
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
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng thì hiện tại hoàn thành tiếp diễn (have/has been + -ing) để nói về một hoạt động vừa mới kết thúc, hoặc dùng how long/for/since để nói hoạt động đó đã kéo dài bao lâu.",
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
      "blocks": [
        {
          "label": "A",
          "heading": "has been painting vs has painted: activity vs result",
          "body": "Compare has been painting (present perfect continuous), which focuses on the activity itself without saying whether it is finished, and has painted (present perfect simple), which focuses on the result of a completed action. Kate having paint on her clothes tells us about the activity; the bedroom now being yellow tells us about the finished result.",
          "examples": [
            {
              "en": "There is paint on Kate's clothes. She has been painting her bedroom.",
              "note": "the activity, not necessarily finished"
            },
            {
              "en": "The bedroom was green. Now it is yellow. She has painted her bedroom.",
              "note": "the finished result"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Explaining a present state vs reporting a completed action",
          "body": "The present perfect continuous often explains a present state (dirty hands, eating too much) by pointing at the activity itself; the present perfect simple reports that something has been completed.",
          "examples": [
            {
              "en": "My hands are very dirty. I've been repairing my bike."
            },
            {
              "en": "My bike is OK again now. I've repaired it.",
              "note": "= I've finished repairing it"
            },
            {
              "en": "Joe has been eating too much recently. He should eat less."
            },
            {
              "en": "Somebody has eaten all the chocolates. The box is empty."
            },
            {
              "en": "It's nice to see you again. What have you been doing since we last met?"
            },
            {
              "en": "Where's the book I gave you? What have you done with it?"
            },
            {
              "en": "Where have you been? Have you been playing tennis?"
            },
            {
              "en": "Have you ever played tennis?"
            }
          ]
        },
        {
          "label": "C",
          "heading": "how long vs how much/how many/how many times",
          "body": "We use the continuous to say how long something has been happening, when it is still going on. We use the simple to say how much, how many or how many times, for completed actions.",
          "examples": [
            {
              "en": "How long have you been reading that book?"
            },
            {
              "en": "Amy is writing emails. She's been writing emails all morning."
            },
            {
              "en": "They've been playing tennis since 2 o'clock."
            },
            {
              "en": "I'm learning Arabic, but I haven't been learning it very long."
            },
            {
              "en": "How many pages of that book have you read?"
            },
            {
              "en": "Amy has sent lots of emails this morning."
            },
            {
              "en": "They've played tennis three times this week."
            },
            {
              "en": "I'm learning Arabic, but I haven't learnt very much yet."
            }
          ]
        },
        {
          "label": "D",
          "heading": "Verbs not normally used in the continuous",
          "body": "Some verbs, for example know, are not normally used in continuous forms (be + -ing). For a list of these verbs, see Unit 4A; for have, see Unit 17. Note that want and mean can be used in the present perfect continuous.",
          "examples": [
            {
              "en": "I've known about the problem for a long time.",
              "note": "not I've been knowing"
            },
            {
              "en": "How long have you had that camera?",
              "note": "not have you been having"
            },
            {
              "en": "I've been meaning to phone Anna, but I keep forgetting."
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "10.1 · Đọc tình huống và hoàn thành câu",
      "instructions": "Đọc tình huống rồi hoàn thành các câu bằng động từ trong ngoặc, chia ở thì hiện tại hoàn thành tiếp diễn hoặc hiện tại hoàn thành đơn.",
      "passage": "Ví dụ: 1 Tom started reading a book two hours ago. He is still reading it and now he is on page 53. He has been reading for two hours. (read) He has read 53 pages so far. (read)",
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
      "instructions": "Đặt câu hỏi bằng các từ trong ngoặc, dùng thì hiện tại hoàn thành đơn (have/has done) hoặc tiếp diễn (have/has been doing).",
      "passage": "Ví dụ: 1 You have a friend who is learning Arabic. You ask: (how long / learn / Arabic?) How long have you been learning Arabic?",
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
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại hoàn thành đơn (have/has done) hoặc tiếp diễn (have/has been doing).",
      "passage": "Ví dụ: 1 Where have you been? Have you been playing (you / play) tennis?",
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
      "instructions": "Hãy viết 2-3 câu tiếng Anh so sánh hiện tại hoàn thành tiếp diễn (I've been doing, nhấn mạnh hoạt động) với hiện tại hoàn thành đơn (I've done, nhấn mạnh kết quả), ví dụ về một việc bạn đang làm và một việc bạn đã hoàn thành.",
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
      "blocks": [
        {
          "label": "A",
          "heading": "How long have they been married? (not How long are they married?)",
          "body": "We use the present perfect, not the present simple, to ask how long something that began in the past has continued up to now, even though we use the present simple to describe the situation itself. Dan and Kate are married (present), but we ask How long have they been married? and say They have been married for 20 years, not How long are they married? or They are married for 20 years.",
          "examples": [
            {
              "en": "They have been married for 20 years."
            },
            {
              "en": "How long have they been married?",
              "note": "not How long are they married?"
            },
            {
              "en": "Paul is in hospital. He's been in hospital since Monday.",
              "note": "not Paul is in hospital since Monday"
            },
            {
              "en": "We know each other very well. We've known each other for a long time.",
              "note": "not We know each other for a long time"
            },
            {
              "en": "Do they have a car? How long have they had their car?"
            },
            {
              "en": "She's waiting for somebody. She hasn't been waiting very long."
            }
          ]
        },
        {
          "label": "B",
          "heading": "I've known / I've been learning: simple vs continuous with how long",
          "body": "I've known, I've had and I've lived are present perfect simple; I've been learning and I've been waiting are present perfect continuous. When we ask or say how long, the continuous is more usual (see Unit 10), but some verbs, for example know and like, are not normally used in the continuous. See also Units 4A and 10C; for have, see Unit 17.",
          "examples": [
            {
              "en": "I've been learning English since January."
            },
            {
              "en": "It's been raining all morning."
            },
            {
              "en": "Richard has been doing the same job for 20 years."
            },
            {
              "en": "'How long have you been driving?' 'Since I was 17.'"
            },
            {
              "en": "How long have you known Jane?",
              "note": "not have you been knowing"
            },
            {
              "en": "I've had these shoes for ages.",
              "note": "not I've been having"
            }
          ]
        },
        {
          "label": "C",
          "heading": "live and work: either form; always: simple only",
          "body": "You can use either the continuous or the simple with live and work. But we use the simple (have lived etc.), not the continuous, with always.",
          "examples": [
            {
              "en": "Julia has been living in this house for a long time.",
              "note": "or Julia has lived ..."
            },
            {
              "en": "How long have you been working here?",
              "note": "or How long have you worked here?"
            },
            {
              "en": "I've always lived in the country.",
              "note": "not I've always been living"
            }
          ]
        },
        {
          "label": "D",
          "heading": "I haven't (done something) since/for ...",
          "body": "We use the present perfect simple, not the continuous, to say I haven't (done something) since/for a period, meaning the last time it happened was that long ago.",
          "examples": [
            {
              "en": "I haven't seen Tom since Monday.",
              "note": "= Monday was the last time I saw him"
            },
            {
              "en": "Sarah hasn't phoned for ages.",
              "note": "= the last time she phoned was ages ago"
            }
          ]
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "11.1 · Chọn câu đúng",
      "instructions": "Chọn cách diễn đạt đúng trong mỗi cặp.",
      "passage": "Ví dụ: 1 Ben is a friend of mine. I know / I've known him very well. (I know is correct)",
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
      "instructions": "Đọc tình huống rồi viết câu hỏi bằng các từ trong ngoặc, dùng how long have/has ...",
      "passage": "Ví dụ: 1 A friend tells you that Paul is in hospital. You ask him: (how long / Paul / hospital?) How long has Paul been in hospital?",
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
      "instructions": "Hoàn thành câu trả lời của B, dùng thì hiện tại hoàn thành đơn hoặc tiếp diễn.",
      "passage": "Ví dụ: 1 A: Paul is in hospital, isn't he? B: Yes, he has been in hospital since Monday.",
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
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng how long have/has ... been ...? để hỏi về khoảng thời gian một việc đã diễn ra, và trả lời bằng have/has been + for/since.",
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
      "blocks": [
        {
          "label": "A",
          "heading": "for a period of time; since the start of a period",
          "body": "We use for and since to say how long something has been happening. We use for + a period of time (for two hours, for a week, for ages, for 50 years); we use since + the start of a period (since 8 o'clock, since Monday, since 2001). Note that we say for six months, not since six months.",
          "examples": [
            {
              "en": "Sally has been working here for six months.",
              "note": "not since six months"
            },
            {
              "en": "Sally has been working here since April.",
              "note": "= from April until now"
            },
            {
              "en": "I haven't seen Tom for three days."
            },
            {
              "en": "I haven't seen Tom since Monday."
            }
          ]
        },
        {
          "label": "B",
          "heading": "leaving out for; in instead of for; not for all ...",
          "body": "We often leave out for, but not usually in negative sentences. You can use in instead of for in negative sentences (I haven't ... etc.). We do not use for before all ... (all day, all my life etc.).",
          "examples": [
            {
              "en": "They've been married for ten years.",
              "note": "or They've been married ten years"
            },
            {
              "en": "They haven't had a holiday for ten years.",
              "note": "you need for here"
            },
            {
              "en": "They haven't had a holiday in ten years.",
              "note": "= for ten years"
            },
            {
              "en": "I've lived here all my life.",
              "note": "not for all my life"
            }
          ]
        },
        {
          "label": "C",
          "heading": "When ...? (+ past simple) vs How long ...? (+ present perfect)",
          "body": "Compare When ...? with the past simple, which asks about a point in time, and How long ...? with the present perfect, which asks about a duration up to now.",
          "examples": [
            {
              "en": "When did it start raining? It started raining an hour ago / at 1 o'clock."
            },
            {
              "en": "How long has it been raining? It's been raining for an hour / since 1 o'clock."
            },
            {
              "en": "When did Joe and Kate first meet? They first met a long time ago / at school / when they were at school."
            },
            {
              "en": "How long have they known each other? They've known each other for a long time / at school / since they were at school.",
              "note": "since they were at school"
            }
          ]
        },
        {
          "label": "D",
          "heading": "it's (been) ... since something happened",
          "body": "We say it's (= it is) or it's been (= it has been) a long time / six months etc. since something happened.",
          "examples": [
            {
              "en": "It's two years since I last saw Joe.",
              "note": "or It's been two years since ...; = I haven't seen Joe for two years"
            },
            {
              "en": "It's ages since we went to the cinema.",
              "note": "or It's been ages since ...; = We haven't been to the cinema for ages"
            },
            {
              "en": "How long is it since Mrs Hill died?",
              "note": "or How long has it been since ...?; = when did she die?"
            }
          ]
        }
      ]
    },
    {
      "kind": "fill_mc",
      "title": "12.1 · Chọn for hoặc since",
      "instructions": "Chọn for hoặc since cho mỗi câu.",
      "passage": "Ví dụ: 1 It's been raining since lunchtime.",
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
      "instructions": "Đọc câu trả lời rồi chọn câu hỏi đúng.",
      "passage": "Ví dụ: 1 Answer: Ten years ago. Question: When did they get married? (correct, not How long have they been married?)",
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
      "instructions": "Đọc tình huống rồi hoàn thành câu.",
      "passage": "Ví dụ: 1 It's raining. It's been raining since lunchtime. It started raining at lunchtime.\n2 Ann and Jess are friends. They first met years ago. They've known each other for years.",
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
      "instructions": "Hoàn thành câu trả lời của B. Sau đó viết lại câu trả lời đó theo mẫu It's ... since ....",
      "passage": "Ví dụ: 1 A: Do you often go on holiday? B: No, I haven't had a holiday for five years.\n5 (viết lại câu 1) No, it's five years since I last had a holiday.",
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
      "instructions": "Hãy viết 2-3 câu tiếng Anh dùng for hoặc since để nói một việc đã kéo dài bao lâu, hoặc dùng how long ...? để hỏi, so sánh với khi nào việc đó bắt đầu (when ...?).",
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
      "blocks": [
        {
          "label": "A",
          "heading": "Tom has lost his key (now) vs Tom lost his key (only about the past)",
          "body": "The present perfect (something has happened) is a present tense: it tells us about the situation now. Tom has lost his key means he doesn't have his key now. The past simple (something happened) tells us only about the past; if somebody says Tom lost his key, we don't know whether he has the key now or not, only that he lost it at some time in the past.",
          "examples": [
            {
              "en": "They've gone away. They'll be back on Friday.",
              "note": "they are away now"
            },
            {
              "en": "They went away, but I think they're back at home now.",
              "note": "not They've gone away"
            },
            {
              "en": "It has stopped raining now, so we don't need the umbrella.",
              "note": "it isn't raining now"
            },
            {
              "en": "It stopped raining for a while, but now it's raining again.",
              "note": "not It has stopped"
            }
          ]
        },
        {
          "label": "B",
          "heading": "New or recent happenings vs things that are not recent or new",
          "body": "You can use the present perfect for new or recent happenings, and usually the past simple works too. But use the past simple, not the present perfect, for things that are not recent or new, such as historical facts.",
          "examples": [
            {
              "en": "I've repaired the washing machine. It's working OK now."
            },
            {
              "en": "'Hannah has had a baby! It's a boy.' 'That's great news.'"
            },
            {
              "en": "I repaired the washing machine. It's working OK now.",
              "note": "past simple also possible here"
            },
            {
              "en": "Mozart was a composer. He wrote more than 600 pieces of music.",
              "note": "not has been ... has written"
            },
            {
              "en": "My mother grew up in Italy.",
              "note": "not has grown"
            },
            {
              "en": "Somebody has invented a new type of washing machine.",
              "note": "new information"
            },
            {
              "en": "Who invented the telephone?",
              "note": "not has invented"
            }
          ]
        },
        {
          "label": "C",
          "heading": "Give new information with the present perfect, continue with the past simple",
          "body": "We use the present perfect to give new information, but if we continue to talk about it, we normally switch to the past simple.",
          "examples": [
            {
              "en": "'Ow! I've burnt myself.' 'How did you do that?' 'I picked up a hot dish.'",
              "note": "not have you done ... have picked"
            },
            {
              "en": "'Look! Somebody has spilt something on the sofa.' 'Well, it wasn't me. I didn't do it.'",
              "note": "not hasn't been ... haven't done"
            }
          ]
        }
      ]
    },
    {
      "kind": "type_fill",
      "title": "13.1 · Hoàn thành câu bằng hiện tại hoàn thành hoặc quá khứ đơn",
      "instructions": "Hoàn thành các câu, dùng thì hiện tại hoàn thành nếu có thể, nếu không thì dùng quá khứ đơn.",
      "passage": "Ví dụ: 1 I can't get in. I've lost (lose) my key.",
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
          "answer": "'ve had",
          "accept": [
            "have had"
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
      "instructions": "Phần gạch chân trong mỗi câu đã đúng chưa? Sửa lại nếu cần.",
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
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại hoàn thành hoặc quá khứ đơn.",
      "passage": "Ví dụ: 1 It stopped raining for a while, but now it's raining again. (it / stop)\n2 The town where I live is very different now. It has changed a lot. (it / change)",
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
      "instructions": "Hãy viết 2-3 câu tiếng Anh: một câu dùng thì hiện tại hoàn thành để đưa ra một tin mới hoặc gần đây, và một câu tiếp theo dùng thì quá khứ đơn để kể tiếp chi tiết về việc đó, giống ví dụ: I've burnt myself. How did you do that? I picked up a hot dish.",
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
      "blocks": [
        {
          "label": "A",
          "heading": "Do not use the present perfect for a finished time",
          "body": "We do not use the present perfect (I have done) when we talk about a finished time (for example, yesterday, last year, ten minutes ago etc.); we use a past tense. We also use the past, not the present perfect, to ask When ...? or What time ...?",
          "examples": [
            {
              "en": "It was very cold yesterday.",
              "note": "not has been"
            },
            {
              "en": "Paul and Lucy arrived ten minutes ago.",
              "note": "not have arrived"
            },
            {
              "en": "Did you eat a lot of sweets when you were a child?",
              "note": "not have you eaten"
            },
            {
              "en": "I got home late last night. I was very tired and went straight to bed."
            },
            {
              "en": "When did your friends arrive?",
              "note": "not have ... arrived"
            },
            {
              "en": "What time did you finish work?"
            },
            {
              "en": "Tom has lost his key. He can't get into the house.",
              "note": "compare: Tom lost his key yesterday. He couldn't get into the house."
            },
            {
              "en": "Is Carla here or has she left?",
              "note": "compare: When did Carla leave?"
            }
          ]
        },
        {
          "label": "B",
          "heading": "Unfinished period (present perfect) vs finished period (past simple)",
          "body": "We use the present perfect for a period of time that continues until now, for example today, this week, since 2010. We use the past simple for a finished time in the past, for example yesterday, last week, from 2010 to 2014.",
          "examples": [
            {
              "en": "I've done a lot of work today.",
              "note": "compare: I did a lot of work yesterday."
            },
            {
              "en": "It hasn't rained this week.",
              "note": "compare: It didn't rain last week."
            },
            {
              "en": "Have you seen Anna this morning?",
              "note": "it is still morning now; compare: Did you see Anna this morning? (it is now afternoon or evening)"
            },
            {
              "en": "Have you seen Ben recently?",
              "note": "in the last few days or weeks; compare: Did you see Ben on Sunday?"
            },
            {
              "en": "I've been working here since 2010.",
              "note": "I still work here now; compare: I worked here from 2010 to 2014. (I don't work here now)"
            },
            {
              "en": "I don't know where Lisa is. I haven't seen her.",
              "note": "= I haven't seen her recently; compare: Was Lisa at the party on Sunday? I don't think so. I didn't see her."
            },
            {
              "en": "We've been waiting for an hour.",
              "note": "we are still waiting now; compare: We waited (or were waiting) for an hour. (we are no longer waiting)"
            },
            {
              "en": "Jack lives in Los Angeles. He has lived there for seven years.",
              "note": "compare: Jack lived in New York for ten years. Now he lives in Los Angeles."
            },
            {
              "en": "I've never ridden a horse.",
              "note": "in my life; compare: I never rode a bike when I was a child."
            },
            {
              "en": "It's been a really good holiday. I've really enjoyed it.",
              "note": "said on the last day of the holiday; compare: It was a really good holiday. I really enjoyed it. (said after coming back)"
            }
          ]
        }
      ]
    },
    {
      "kind": "judge_correct",
      "title": "14.1 · Phần gạch chân đúng hay cần sửa?",
      "instructions": "Phần gạch chân trong mỗi câu đã đúng chưa? Sửa lại nếu cần.",
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
      "instructions": "Đặt câu từ các từ trong ngoặc, dùng thì hiện tại hoàn thành hoặc quá khứ đơn.",
      "passage": "Ví dụ: 1 (it / not / rain / this week) It hasn't rained this week.",
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
      "instructions": "Chia động từ trong ngoặc ở thì hiện tại hoàn thành hoặc quá khứ đơn.",
      "passage": "Ví dụ: 1 I haven't been (I / not / be) to Canada, but I'd like to go there.\n2 Paul and Lucy arrived (arrive) about ten minutes ago.",
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
      "instructions": "Hãy viết 2-3 câu tiếng Anh so sánh thì hiện tại hoàn thành (cho khoảng thời gian chưa kết thúc như today, this week) với quá khứ đơn (cho khoảng thời gian đã kết thúc như yesterday, last week), ví dụ: It hasn't rained this week. / It didn't rain last week.",
      "ruleSummary": "This unit practises the present perfect (have/has done) for an unfinished period continuing until now (today, this week, since 2010) versus the past simple (did) for a finished time in the past (yesterday, last week, from 2010 to 2014). The present perfect is never used with a finished-time expression such as yesterday, last year or ten minutes ago (It was very cold yesterday, not has been; Paul and Lucy arrived ten minutes ago, not have arrived), and When ...? or What time ...? are always followed by the past simple, never the present perfect. A correct student sentence must use the present perfect only when the time period referred to is still open (today, this week, since a point that continues to now) and the past simple whenever a specific finished time is named or implied, including with When ...? and What time ...? questions."
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
];

export const GRAMMAR_UNITS: GrammarUnit[] = [UNIT_1_PRESENT_CONTINUOUS, UNIT_2_PRESENT_SIMPLE, UNIT_3_PRESENT_CONTINUOUS_AND_SIMPLE_1, UNIT_4_PRESENT_CONTINUOUS_AND_SIMPLE_2, UNIT_5_PAST_SIMPLE, UNIT_6_PAST_CONTINUOUS, UNIT_7_PRESENT_PERFECT_1, UNIT_8_PRESENT_PERFECT_2, UNIT_9_PRESENT_PERFECT_CONTINUOUS, UNIT_10_PRESENT_PERFECT_CONTINUOUS_AND_SIMPLE, UNIT_11_HOW_LONG_HAVE_YOU_BEEN, UNIT_12_FOR_AND_SINCE, UNIT_13_PRESENT_PERFECT_AND_PAST_1, UNIT_14_PRESENT_PERFECT_AND_PAST_2];

export function getGrammarUnit(slug: string): GrammarUnit | undefined {
  return GRAMMAR_UNITS.find((u) => u.slug === slug);
}
