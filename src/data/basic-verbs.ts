// Auto-generated from content/topics/01-collocations-phrasal-verbs/basic-verbs.md
// Source of truth for lesson content in the Collocations & Phrasal Verbs module.

export type ItemType = "collocation" | "phrasal_verb" | "prepositional_verb";

export interface VerbItem {
  term: string;
  type: ItemType;
  en: string;
  vi: string;
  ex: string;
}

export interface Verb {
  verb: string;
  group: string;
  def_en: string;
  def_vi: string;
  items: VerbItem[];
}

export const GROUP_LABELS: Record<string, string> = {
  "A": "Action / Creation",
  "B": "Movement",
  "C": "Hold / Change / State",
  "D": "Other core verbs",
  "E": "Prepositional verbs"
};

export const VERBS: Verb[] = [
  {
    "verb": "DO",
    "group": "A",
    "def_en": "to perform an action, task, or activity",
    "def_vi": "thực hiện một hành động, công việc hoặc hoạt động",
    "items": [
      {
        "term": "do homework",
        "type": "collocation",
        "en": "to complete school assignments",
        "vi": "làm bài tập về nhà",
        "ex": "I always do my homework right after dinner."
      },
      {
        "term": "do the dishes",
        "type": "collocation",
        "en": "to wash plates and cutlery",
        "vi": "rửa bát đĩa",
        "ex": "Can you do the dishes tonight?"
      },
      {
        "term": "do business",
        "type": "collocation",
        "en": "to conduct commercial activity",
        "vi": "làm ăn, kinh doanh",
        "ex": "They do business with clients across Asia."
      },
      {
        "term": "do well",
        "type": "collocation",
        "en": "to succeed, to perform well",
        "vi": "làm tốt, thành công",
        "ex": "She did well in her final exams."
      },
      {
        "term": "do without",
        "type": "collocation",
        "en": "to manage without having something",
        "vi": "sống/làm việc mà không cần thứ gì đó",
        "ex": "We had to do without electricity for a day."
      },
      {
        "term": "do a favor",
        "type": "collocation",
        "en": "to help someone with a small task",
        "vi": "giúp đỡ một việc gì đó",
        "ex": "Could you do me a favor and open the door?"
      },
      {
        "term": "do away with",
        "type": "phrasal_verb",
        "en": "to get rid of something",
        "vi": "loại bỏ, xóa bỏ",
        "ex": "The company did away with paper contracts."
      },
      {
        "term": "do up",
        "type": "phrasal_verb",
        "en": "to fasten or renovate something",
        "vi": "cài (khuy, dây); sửa sang lại",
        "ex": "Do up your coat, it's cold outside."
      },
      {
        "term": "do over",
        "type": "phrasal_verb",
        "en": "to do something again",
        "vi": "làm lại",
        "ex": "The teacher asked him to do the essay over."
      },
      {
        "term": "do down",
        "type": "phrasal_verb",
        "en": "to criticize someone unfairly",
        "vi": "hạ thấp, chê bai ai đó",
        "ex": "Stop doing yourself down, you did great."
      }
    ]
  },
  {
    "verb": "MAKE",
    "group": "A",
    "def_en": "to create, produce, or cause something to exist",
    "def_vi": "tạo ra, sản xuất hoặc gây ra điều gì đó",
    "items": [
      {
        "term": "make a decision",
        "type": "collocation",
        "en": "to decide something",
        "vi": "đưa ra quyết định",
        "ex": "We need to make a decision by Friday."
      },
      {
        "term": "make progress",
        "type": "collocation",
        "en": "to improve or advance",
        "vi": "tiến bộ",
        "ex": "The team is making progress on the project."
      },
      {
        "term": "make money",
        "type": "collocation",
        "en": "to earn money",
        "vi": "kiếm tiền",
        "ex": "She makes good money as a freelancer."
      },
      {
        "term": "make friends",
        "type": "collocation",
        "en": "to form friendships",
        "vi": "kết bạn",
        "ex": "It's easy for her to make friends."
      },
      {
        "term": "make a mistake",
        "type": "collocation",
        "en": "to do something wrong",
        "vi": "mắc lỗi",
        "ex": "Everyone makes mistakes sometimes."
      },
      {
        "term": "make an effort",
        "type": "collocation",
        "en": "to try hard",
        "vi": "nỗ lực",
        "ex": "He made an effort to arrive on time."
      },
      {
        "term": "make up",
        "type": "phrasal_verb",
        "en": "to invent a story; to reconcile after a fight",
        "vi": "bịa ra; làm lành",
        "ex": "Did you make up that excuse? / They finally made up after the argument."
      },
      {
        "term": "make out",
        "type": "phrasal_verb",
        "en": "to see/hear something with difficulty; to understand",
        "vi": "nhìn/nghe không rõ; hiểu ra",
        "ex": "I could barely make out his handwriting."
      },
      {
        "term": "make up for",
        "type": "phrasal_verb",
        "en": "to compensate for something",
        "vi": "bù đắp cho",
        "ex": "He worked overtime to make up for the delay."
      },
      {
        "term": "make off with",
        "type": "phrasal_verb",
        "en": "to steal and run away with something",
        "vi": "lấy trộm rồi bỏ chạy",
        "ex": "The thief made off with her purse."
      }
    ]
  },
  {
    "verb": "HAVE",
    "group": "A",
    "def_en": "to possess, experience, or consume something",
    "def_vi": "có, sở hữu; trải nghiệm; dùng (bữa ăn, hoạt động...)",
    "items": [
      {
        "term": "have breakfast",
        "type": "collocation",
        "en": "to eat the morning meal",
        "vi": "ăn sáng",
        "ex": "I usually have breakfast at 7 a.m."
      },
      {
        "term": "have a shower",
        "type": "collocation",
        "en": "to wash yourself under running water",
        "vi": "tắm (vòi hoa sen)",
        "ex": "He had a shower before bed."
      },
      {
        "term": "have a rest",
        "type": "collocation",
        "en": "to relax or sleep for a while",
        "vi": "nghỉ ngơi",
        "ex": "You should have a rest after the trip."
      },
      {
        "term": "have fun",
        "type": "collocation",
        "en": "to enjoy yourself",
        "vi": "vui vẻ, tận hưởng",
        "ex": "The kids had fun at the beach."
      },
      {
        "term": "have a look",
        "type": "collocation",
        "en": "to look at something briefly",
        "vi": "xem qua, nhìn qua",
        "ex": "Can I have a look at your notes?"
      },
      {
        "term": "have a chat",
        "type": "collocation",
        "en": "to talk informally with someone",
        "vi": "trò chuyện phiếm",
        "ex": "We had a chat over coffee."
      },
      {
        "term": "have on",
        "type": "phrasal_verb",
        "en": "to be wearing something; to trick someone (informal)",
        "vi": "đang mặc; trêu/lừa ai đó",
        "ex": "She had on a beautiful red dress."
      },
      {
        "term": "have (something) out",
        "type": "phrasal_verb",
        "en": "to resolve a disagreement by discussing it openly",
        "vi": "nói thẳng ra để giải quyết mâu thuẫn",
        "ex": "They decided to have it out once and for all."
      },
      {
        "term": "have to do with",
        "type": "phrasal_verb",
        "en": "to be related or connected to",
        "vi": "liên quan đến",
        "ex": "This problem has to do with the software update."
      }
    ]
  },
  {
    "verb": "TAKE",
    "group": "A",
    "def_en": "to get hold of something; to move something with you; to require (time/effort)",
    "def_vi": "nắm giữ, cầm lấy; mang theo; cần đến (thời gian/công sức)",
    "items": [
      {
        "term": "take a break",
        "type": "collocation",
        "en": "to rest for a while",
        "vi": "nghỉ giải lao",
        "ex": "Let's take a break for ten minutes."
      },
      {
        "term": "take care of",
        "type": "collocation",
        "en": "to look after someone/something",
        "vi": "chăm sóc, lo liệu",
        "ex": "She takes care of her younger brother."
      },
      {
        "term": "take part in",
        "type": "collocation",
        "en": "to participate in an activity",
        "vi": "tham gia vào",
        "ex": "Many students took part in the competition."
      },
      {
        "term": "take a risk",
        "type": "collocation",
        "en": "to do something dangerous or uncertain",
        "vi": "chấp nhận rủi ro",
        "ex": "She took a risk by starting her own business."
      },
      {
        "term": "take place",
        "type": "collocation",
        "en": "to happen",
        "vi": "diễn ra",
        "ex": "The meeting will take place next Monday."
      },
      {
        "term": "take off",
        "type": "phrasal_verb",
        "en": "to leave the ground (plane); to remove clothing; to become suddenly successful",
        "vi": "cất cánh; cởi (quần áo); thành công nhanh chóng",
        "ex": "The plane took off on time."
      },
      {
        "term": "take up",
        "type": "phrasal_verb",
        "en": "to start a hobby/activity; to occupy space or time",
        "vi": "bắt đầu (sở thích); chiếm (không gian/thời gian)",
        "ex": "She took up painting last year."
      },
      {
        "term": "take over",
        "type": "phrasal_verb",
        "en": "to gain control of something",
        "vi": "tiếp quản, giành quyền kiểm soát",
        "ex": "The new manager took over the department."
      },
      {
        "term": "take after",
        "type": "phrasal_verb",
        "en": "to resemble a parent/relative",
        "vi": "giống (bố/mẹ/người thân)",
        "ex": "She takes after her mother."
      },
      {
        "term": "take back",
        "type": "phrasal_verb",
        "en": "to retract a statement; to return something",
        "vi": "rút lại lời nói; trả lại",
        "ex": "I take back what I said earlier."
      },
      {
        "term": "take in",
        "type": "phrasal_verb",
        "en": "to understand fully; to deceive someone",
        "vi": "hiểu thấu; lừa gạt",
        "ex": "It took a while for the news to take in."
      }
    ]
  },
  {
    "verb": "GIVE",
    "group": "A",
    "def_en": "to transfer something to someone; to provide or produce",
    "def_vi": "trao, chuyển giao cho ai đó; cung cấp",
    "items": [
      {
        "term": "give advice",
        "type": "collocation",
        "en": "to suggest what someone should do",
        "vi": "đưa ra lời khuyên",
        "ex": "She gave me some useful advice."
      },
      {
        "term": "give a speech",
        "type": "collocation",
        "en": "to deliver a formal talk",
        "vi": "phát biểu, thuyết trình",
        "ex": "He gave a speech at the conference."
      },
      {
        "term": "give permission",
        "type": "collocation",
        "en": "to allow something",
        "vi": "cho phép",
        "ex": "My parents gave permission for the trip."
      },
      {
        "term": "give birth",
        "type": "collocation",
        "en": "to have a baby",
        "vi": "sinh con",
        "ex": "She gave birth to twins."
      },
      {
        "term": "give a hand",
        "type": "collocation",
        "en": "to help someone",
        "vi": "giúp đỡ",
        "ex": "Could you give me a hand with these bags?"
      },
      {
        "term": "give up",
        "type": "phrasal_verb",
        "en": "to stop trying; to quit a habit",
        "vi": "từ bỏ",
        "ex": "Don't give up on your dreams."
      },
      {
        "term": "give in",
        "type": "phrasal_verb",
        "en": "to finally agree after resisting",
        "vi": "nhượng bộ, đầu hàng",
        "ex": "After hours of arguing, he gave in."
      },
      {
        "term": "give away",
        "type": "phrasal_verb",
        "en": "to give something for free; to reveal a secret",
        "vi": "cho không; tiết lộ (bí mật)",
        "ex": "They gave away free samples."
      },
      {
        "term": "give back",
        "type": "phrasal_verb",
        "en": "to return something",
        "vi": "trả lại",
        "ex": "Please give back the book when you're done."
      },
      {
        "term": "give out",
        "type": "phrasal_verb",
        "en": "to distribute; to stop functioning",
        "vi": "phát cho; hết, ngừng hoạt động",
        "ex": "Volunteers gave out flyers downtown."
      },
      {
        "term": "give off",
        "type": "phrasal_verb",
        "en": "to emit (smell, heat, gas, light)",
        "vi": "tỏa ra, phát ra (mùi, nhiệt, khí)",
        "ex": "The flowers give off a sweet scent."
      }
    ]
  },
  {
    "verb": "PUT",
    "group": "A",
    "def_en": "to move something into a specific position or place",
    "def_vi": "đặt, để một vật vào vị trí nào đó",
    "items": [
      {
        "term": "put pressure on",
        "type": "collocation",
        "en": "to force someone to do something",
        "vi": "gây áp lực lên ai đó",
        "ex": "Her parents put pressure on her to succeed."
      },
      {
        "term": "put an end to",
        "type": "collocation",
        "en": "to stop something",
        "vi": "chấm dứt điều gì đó",
        "ex": "The new law put an end to the practice."
      },
      {
        "term": "put emphasis on",
        "type": "collocation",
        "en": "to stress the importance of",
        "vi": "nhấn mạnh",
        "ex": "The course puts emphasis on speaking skills."
      },
      {
        "term": "put money into",
        "type": "collocation",
        "en": "to invest in something",
        "vi": "đầu tư tiền vào",
        "ex": "They put money into renewable energy."
      },
      {
        "term": "put off",
        "type": "phrasal_verb",
        "en": "to postpone something",
        "vi": "trì hoãn",
        "ex": "Let's not put off the decision any longer."
      },
      {
        "term": "put away",
        "type": "phrasal_verb",
        "en": "to store something in its place",
        "vi": "cất đi",
        "ex": "Put away your toys before dinner."
      },
      {
        "term": "put back",
        "type": "phrasal_verb",
        "en": "to return something to its original place; to delay",
        "vi": "để trở lại chỗ cũ; hoãn lại",
        "ex": "Please put the book back on the shelf."
      },
      {
        "term": "put down",
        "type": "phrasal_verb",
        "en": "to write something; to stop holding something; to belittle",
        "vi": "ghi lại; đặt xuống; hạ thấp ai đó",
        "ex": "Put down your ideas before you forget them."
      },
      {
        "term": "put up with",
        "type": "phrasal_verb",
        "en": "to tolerate something unpleasant",
        "vi": "chịu đựng",
        "ex": "I can't put up with this noise anymore."
      },
      {
        "term": "put on",
        "type": "phrasal_verb",
        "en": "to wear something; to gain weight",
        "vi": "mặc vào; tăng cân",
        "ex": "Put on your jacket, it's cold."
      },
      {
        "term": "put out",
        "type": "phrasal_verb",
        "en": "to extinguish (fire); to publish",
        "vi": "dập tắt; công bố",
        "ex": "Firefighters put out the blaze quickly."
      }
    ]
  },
  {
    "verb": "PAY",
    "group": "A",
    "def_en": "to give money for something; to give attention or a visit",
    "def_vi": "trả (tiền); chú ý, ghé thăm",
    "items": [
      {
        "term": "pay attention",
        "type": "collocation",
        "en": "to concentrate on something",
        "vi": "chú ý",
        "ex": "Please pay attention during the lecture."
      },
      {
        "term": "pay a visit",
        "type": "collocation",
        "en": "to visit someone/somewhere",
        "vi": "ghé thăm",
        "ex": "We paid a visit to our grandparents."
      },
      {
        "term": "pay a compliment",
        "type": "collocation",
        "en": "to say something nice about someone",
        "vi": "khen ngợi",
        "ex": "He paid her a compliment on her presentation."
      },
      {
        "term": "pay the price",
        "type": "collocation",
        "en": "to suffer the consequences of something",
        "vi": "trả giá",
        "ex": "He paid the price for being careless."
      },
      {
        "term": "pay back",
        "type": "phrasal_verb",
        "en": "to return money owed; to get revenge",
        "vi": "trả nợ; trả đũa",
        "ex": "I need to pay back my student loan."
      },
      {
        "term": "pay for",
        "type": "phrasal_verb",
        "en": "to give money for something; to suffer for a mistake",
        "vi": "trả tiền cho; chịu hậu quả",
        "ex": "He'll pay for what he did."
      },
      {
        "term": "pay off",
        "type": "phrasal_verb",
        "en": "to fully repay a debt; to be successful/worthwhile",
        "vi": "trả hết nợ; đem lại kết quả tốt",
        "ex": "Her hard work finally paid off."
      },
      {
        "term": "pay up",
        "type": "phrasal_verb",
        "en": "to pay money owed, often reluctantly",
        "vi": "trả hết (nợ), miễn cưỡng",
        "ex": "He was forced to pay up after losing the bet."
      }
    ]
  },
  {
    "verb": "THROW",
    "group": "A",
    "def_en": "to propel something through the air with force",
    "def_vi": "ném, quăng, vứt",
    "items": [
      {
        "term": "throw a party",
        "type": "collocation",
        "en": "to organize a party",
        "vi": "tổ chức một bữa tiệc",
        "ex": "They threw a party for her birthday."
      },
      {
        "term": "throw a punch",
        "type": "collocation",
        "en": "to hit someone with your fist",
        "vi": "tung một cú đấm",
        "ex": "He threw a punch at his opponent."
      },
      {
        "term": "throw a fit",
        "type": "collocation",
        "en": "to react with sudden anger",
        "vi": "nổi giận đùng đùng",
        "ex": "She threw a fit when she heard the news."
      },
      {
        "term": "throw away",
        "type": "phrasal_verb",
        "en": "to discard something",
        "vi": "vứt bỏ",
        "ex": "Don't throw away that receipt."
      },
      {
        "term": "throw out",
        "type": "phrasal_verb",
        "en": "to get rid of something; to reject",
        "vi": "vứt bỏ; bác bỏ",
        "ex": "The judge threw out the case."
      },
      {
        "term": "throw up",
        "type": "phrasal_verb",
        "en": "to vomit",
        "vi": "nôn mửa",
        "ex": "He threw up after the rollercoaster ride."
      },
      {
        "term": "throw in",
        "type": "phrasal_verb",
        "en": "to add something extra for free",
        "vi": "tặng kèm thêm",
        "ex": "The shop threw in a free charger with the phone."
      }
    ]
  },
  {
    "verb": "GO",
    "group": "B",
    "def_en": "to move or travel from one place to another",
    "def_vi": "di chuyển từ nơi này đến nơi khác",
    "items": [
      {
        "term": "go bankrupt",
        "type": "collocation",
        "en": "to lose all one's money/business",
        "vi": "phá sản",
        "ex": "The company went bankrupt last year."
      },
      {
        "term": "go abroad",
        "type": "collocation",
        "en": "to travel to a foreign country",
        "vi": "ra nước ngoài",
        "ex": "She wants to go abroad to study."
      },
      {
        "term": "go on a diet",
        "type": "collocation",
        "en": "to start eating less/healthier",
        "vi": "ăn kiêng",
        "ex": "He decided to go on a diet."
      },
      {
        "term": "go wrong",
        "type": "collocation",
        "en": "to fail or develop problems",
        "vi": "gặp trục trặc, đi sai hướng",
        "ex": "Something went wrong with the printer."
      },
      {
        "term": "go on",
        "type": "phrasal_verb",
        "en": "to continue; to happen",
        "vi": "tiếp tục; xảy ra",
        "ex": "Please go on with your story."
      },
      {
        "term": "go out",
        "type": "phrasal_verb",
        "en": "to leave home for social activity; to stop burning/shining",
        "vi": "ra ngoài (chơi, hẹn hò); tắt (lửa, đèn)",
        "ex": "They go out for dinner every Friday."
      },
      {
        "term": "go over",
        "type": "phrasal_verb",
        "en": "to review something",
        "vi": "xem lại, ôn lại",
        "ex": "Let's go over the report together."
      },
      {
        "term": "go through",
        "type": "phrasal_verb",
        "en": "to experience something difficult; to examine carefully",
        "vi": "trải qua; xem xét kỹ",
        "ex": "She went through a difficult divorce."
      },
      {
        "term": "go ahead",
        "type": "phrasal_verb",
        "en": "to proceed with something",
        "vi": "tiến hành, cứ làm",
        "ex": "Go ahead and start without me."
      },
      {
        "term": "go off",
        "type": "phrasal_verb",
        "en": "to explode/ring; to go bad (food)",
        "vi": "phát nổ, kêu (báo thức); bị hỏng (đồ ăn)",
        "ex": "The alarm went off at 6 a.m."
      }
    ]
  },
  {
    "verb": "COME",
    "group": "B",
    "def_en": "to move toward the speaker or a particular place",
    "def_vi": "di chuyển đến gần người nói hoặc một nơi nào đó",
    "items": [
      {
        "term": "come to an end",
        "type": "collocation",
        "en": "to finish",
        "vi": "kết thúc",
        "ex": "The meeting came to an end at noon."
      },
      {
        "term": "come into effect",
        "type": "collocation",
        "en": "to start being valid (law/rule)",
        "vi": "có hiệu lực",
        "ex": "The new policy comes into effect next month."
      },
      {
        "term": "come into contact with",
        "type": "collocation",
        "en": "to meet or touch something",
        "vi": "tiếp xúc với",
        "ex": "Avoid coming into contact with the chemical."
      },
      {
        "term": "come to terms with",
        "type": "collocation",
        "en": "to accept a difficult situation",
        "vi": "chấp nhận (điều khó khăn)",
        "ex": "She came to terms with the loss."
      },
      {
        "term": "come across",
        "type": "phrasal_verb",
        "en": "to find by chance; to seem/appear",
        "vi": "tình cờ gặp/thấy; tạo ấn tượng",
        "ex": "I came across an old photo yesterday."
      },
      {
        "term": "come back",
        "type": "phrasal_verb",
        "en": "to return to a place",
        "vi": "quay trở lại",
        "ex": "She came back home after a long trip."
      },
      {
        "term": "come in",
        "type": "phrasal_verb",
        "en": "to enter a place",
        "vi": "đi vào",
        "ex": "Come in and take a seat."
      },
      {
        "term": "come out",
        "type": "phrasal_verb",
        "en": "to appear/be published; to become known",
        "vi": "xuất hiện, ra mắt; lộ ra",
        "ex": "The new movie comes out next week."
      },
      {
        "term": "come up with",
        "type": "phrasal_verb",
        "en": "to think of an idea or plan",
        "vi": "nghĩ ra (ý tưởng)",
        "ex": "She came up with a brilliant solution."
      },
      {
        "term": "come down with",
        "type": "phrasal_verb",
        "en": "to become sick with an illness",
        "vi": "mắc bệnh (nhẹ)",
        "ex": "I think I'm coming down with a cold."
      }
    ]
  },
  {
    "verb": "BRING",
    "group": "B",
    "def_en": "to carry or take something/someone to a place",
    "def_vi": "mang, đem một vật/người đến một nơi",
    "items": [
      {
        "term": "bring good luck",
        "type": "collocation",
        "en": "to cause good fortune",
        "vi": "mang lại may mắn",
        "ex": "People say a four-leaf clover brings good luck."
      },
      {
        "term": "bring change",
        "type": "collocation",
        "en": "to cause something to change",
        "vi": "mang lại sự thay đổi",
        "ex": "The reform brought positive change."
      },
      {
        "term": "bring attention to",
        "type": "collocation",
        "en": "to make people notice something",
        "vi": "thu hút sự chú ý đến",
        "ex": "The report brought attention to the issue."
      },
      {
        "term": "bring up",
        "type": "phrasal_verb",
        "en": "to raise a child; to mention a topic",
        "vi": "nuôi dạy; đề cập đến",
        "ex": "She brought up an interesting point in the meeting."
      },
      {
        "term": "bring about",
        "type": "phrasal_verb",
        "en": "to cause something to happen",
        "vi": "gây ra, dẫn đến",
        "ex": "The invention brought about huge changes."
      },
      {
        "term": "bring back",
        "type": "phrasal_verb",
        "en": "to return something; to bring back memories",
        "vi": "mang trở lại; gợi nhớ lại",
        "ex": "This song brings back happy memories."
      },
      {
        "term": "bring in",
        "type": "phrasal_verb",
        "en": "to introduce something new; to earn (money)",
        "vi": "đưa vào, giới thiệu; kiếm được (tiền)",
        "ex": "The company brought in a new policy."
      },
      {
        "term": "bring out",
        "type": "phrasal_verb",
        "en": "to launch a product; to make a quality more noticeable",
        "vi": "cho ra mắt (sản phẩm); làm nổi bật",
        "ex": "The brand brought out a new phone model."
      }
    ]
  },
  {
    "verb": "CARRY",
    "group": "B",
    "def_en": "to support and move something from one place to another",
    "def_vi": "mang, vác, chở một vật từ nơi này sang nơi khác",
    "items": [
      {
        "term": "carry weight",
        "type": "collocation",
        "en": "to have influence or importance",
        "vi": "có sức nặng, có ảnh hưởng",
        "ex": "His opinion carries a lot of weight in the office."
      },
      {
        "term": "carry a risk",
        "type": "collocation",
        "en": "to involve a chance of danger",
        "vi": "tiềm ẩn rủi ro",
        "ex": "This investment carries a high risk."
      },
      {
        "term": "carry responsibility",
        "type": "collocation",
        "en": "to bear an obligation",
        "vi": "mang trách nhiệm",
        "ex": "Managers carry a lot of responsibility."
      },
      {
        "term": "carry on",
        "type": "phrasal_verb",
        "en": "to continue doing something",
        "vi": "tiếp tục",
        "ex": "Please carry on with your work."
      },
      {
        "term": "carry out",
        "type": "phrasal_verb",
        "en": "to perform or complete a task",
        "vi": "thực hiện (nhiệm vụ)",
        "ex": "Scientists carried out several experiments."
      },
      {
        "term": "carry over",
        "type": "phrasal_verb",
        "en": "to postpone to a later time; to transfer",
        "vi": "chuyển sang (kỳ sau)",
        "ex": "Unused leave can be carried over to next year."
      },
      {
        "term": "carry around",
        "type": "phrasal_verb",
        "en": "to have something with you wherever you go",
        "vi": "mang theo bên mình",
        "ex": "She always carries around a bottle of water."
      }
    ]
  },
  {
    "verb": "RUN",
    "group": "B",
    "def_en": "to move fast on foot; to manage or operate something",
    "def_vi": "chạy; điều hành, vận hành",
    "items": [
      {
        "term": "run a business",
        "type": "collocation",
        "en": "to manage a company",
        "vi": "điều hành công việc kinh doanh",
        "ex": "She runs a small bakery."
      },
      {
        "term": "run a risk",
        "type": "collocation",
        "en": "to be in danger of something happening",
        "vi": "có nguy cơ gặp phải",
        "ex": "You run the risk of losing your job."
      },
      {
        "term": "run late",
        "type": "collocation",
        "en": "to be behind schedule",
        "vi": "trễ giờ",
        "ex": "Sorry, I'm running late for the meeting."
      },
      {
        "term": "run errands",
        "type": "collocation",
        "en": "to do small tasks/chores",
        "vi": "chạy việc vặt",
        "ex": "I need to run some errands this afternoon."
      },
      {
        "term": "run out of",
        "type": "phrasal_verb",
        "en": "to have no more of something",
        "vi": "hết (cái gì đó)",
        "ex": "We ran out of milk this morning."
      },
      {
        "term": "run into",
        "type": "phrasal_verb",
        "en": "to meet someone unexpectedly; to encounter a problem",
        "vi": "tình cờ gặp; gặp phải (vấn đề)",
        "ex": "I ran into an old friend at the mall."
      },
      {
        "term": "run away",
        "type": "phrasal_verb",
        "en": "to escape from a place",
        "vi": "bỏ trốn",
        "ex": "The child ran away from home."
      },
      {
        "term": "run over",
        "type": "phrasal_verb",
        "en": "to hit someone/something with a vehicle",
        "vi": "cán, tông phải",
        "ex": "Be careful not to run over the cat."
      },
      {
        "term": "run through",
        "type": "phrasal_verb",
        "en": "to review or practice something quickly",
        "vi": "lướt qua, ôn lại nhanh",
        "ex": "Let's run through the plan once more."
      }
    ]
  },
  {
    "verb": "MOVE",
    "group": "B",
    "def_en": "to change position, place, or location",
    "def_vi": "di chuyển, chuyển động, dời chỗ",
    "items": [
      {
        "term": "move house",
        "type": "collocation",
        "en": "to relocate to a new home",
        "vi": "chuyển nhà",
        "ex": "We're moving house next month."
      },
      {
        "term": "move forward",
        "type": "collocation",
        "en": "to make progress",
        "vi": "tiến về phía trước",
        "ex": "Let's move forward with the plan."
      },
      {
        "term": "move fast",
        "type": "collocation",
        "en": "to act or happen quickly",
        "vi": "hành động/diễn ra nhanh chóng",
        "ex": "Technology moves fast these days."
      },
      {
        "term": "move in",
        "type": "phrasal_verb",
        "en": "to start living in a new home",
        "vi": "dọn vào ở",
        "ex": "They moved in together last year."
      },
      {
        "term": "move out",
        "type": "phrasal_verb",
        "en": "to leave a home permanently",
        "vi": "dọn ra khỏi (nhà)",
        "ex": "He moved out of his parents' house at 20."
      },
      {
        "term": "move on",
        "type": "phrasal_verb",
        "en": "to progress to a new stage; to stop dwelling on something",
        "vi": "tiến bước, chuyển sang giai đoạn mới",
        "ex": "It's time to move on from the past."
      }
    ]
  },
  {
    "verb": "DROP",
    "group": "B",
    "def_en": "to let something fall; to stop doing or continuing something",
    "def_vi": "làm rơi; dừng lại, từ bỏ",
    "items": [
      {
        "term": "drop a hint",
        "type": "collocation",
        "en": "to suggest something indirectly",
        "vi": "gợi ý khéo léo",
        "ex": "She dropped a hint about the surprise party."
      },
      {
        "term": "drop a class",
        "type": "collocation",
        "en": "to stop attending a course",
        "vi": "bỏ một môn học",
        "ex": "He decided to drop the class this semester."
      },
      {
        "term": "drop the subject",
        "type": "collocation",
        "en": "to stop talking about something",
        "vi": "ngừng nhắc đến chủ đề đó",
        "ex": "Let's just drop the subject, please."
      },
      {
        "term": "drop off",
        "type": "phrasal_verb",
        "en": "to leave someone/something somewhere; to fall asleep; to decrease",
        "vi": "thả ai đó xuống; ngủ thiếp đi; giảm dần",
        "ex": "I'll drop off the kids at school."
      },
      {
        "term": "drop by",
        "type": "phrasal_verb",
        "en": "to visit briefly and informally",
        "vi": "ghé qua",
        "ex": "Feel free to drop by anytime."
      },
      {
        "term": "drop out",
        "type": "phrasal_verb",
        "en": "to quit school or a program before finishing",
        "vi": "bỏ học, bỏ cuộc giữa chừng",
        "ex": "He dropped out of college in his second year."
      }
    ]
  },
  {
    "verb": "PULL",
    "group": "B",
    "def_en": "to move something toward yourself using force",
    "def_vi": "kéo, lôi",
    "items": [
      {
        "term": "pull a muscle",
        "type": "collocation",
        "en": "to injure a muscle by overstretching",
        "vi": "bị căng/kéo cơ",
        "ex": "He pulled a muscle while running."
      },
      {
        "term": "pull your weight",
        "type": "collocation",
        "en": "to do your fair share of work",
        "vi": "làm hết phần trách nhiệm của mình",
        "ex": "Everyone needs to pull their weight on this team."
      },
      {
        "term": "pull strings",
        "type": "collocation",
        "en": "to use influence to get an advantage",
        "vi": "dùng mối quan hệ để tác động",
        "ex": "He pulled some strings to get the job."
      },
      {
        "term": "pull over",
        "type": "phrasal_verb",
        "en": "to move a vehicle to the side of the road",
        "vi": "tấp xe vào lề",
        "ex": "The police told him to pull over."
      },
      {
        "term": "pull out",
        "type": "phrasal_verb",
        "en": "to withdraw from something; to move a vehicle out",
        "vi": "rút lui, rút khỏi; lùi/đánh xe ra",
        "ex": "The company pulled out of the deal."
      },
      {
        "term": "pull off",
        "type": "phrasal_verb",
        "en": "to succeed in doing something difficult",
        "vi": "thực hiện thành công (việc khó)",
        "ex": "She managed to pull off a great performance."
      },
      {
        "term": "pull through",
        "type": "phrasal_verb",
        "en": "to survive or recover from a difficult situation",
        "vi": "vượt qua (khó khăn, bệnh tật)",
        "ex": "The doctors think he will pull through."
      }
    ]
  },
  {
    "verb": "PUSH",
    "group": "B",
    "def_en": "to apply force to move something away from you",
    "def_vi": "đẩy",
    "items": [
      {
        "term": "push the limit",
        "type": "collocation",
        "en": "to test how far something can go",
        "vi": "thử thách giới hạn",
        "ex": "Athletes constantly push the limit."
      },
      {
        "term": "push for change",
        "type": "collocation",
        "en": "to actively campaign for change",
        "vi": "thúc đẩy sự thay đổi",
        "ex": "Activists are pushing for change in the law."
      },
      {
        "term": "push ahead",
        "type": "phrasal_verb",
        "en": "to continue with a plan despite difficulty",
        "vi": "tiếp tục xúc tiến",
        "ex": "They pushed ahead with the merger."
      },
      {
        "term": "push through",
        "type": "phrasal_verb",
        "en": "to force something to be approved; to persevere",
        "vi": "thúc đẩy được thông qua; cố gắng vượt qua",
        "ex": "The government pushed through the new law."
      },
      {
        "term": "push aside",
        "type": "phrasal_verb",
        "en": "to ignore or dismiss something/someone",
        "vi": "gạt sang một bên",
        "ex": "He pushed aside his doubts and signed the contract."
      }
    ]
  },
  {
    "verb": "PASS",
    "group": "B",
    "def_en": "to move past something; to succeed in a test; to give something to someone",
    "def_vi": "đi qua; đỗ (thi); chuyển, đưa",
    "items": [
      {
        "term": "pass a test/exam",
        "type": "collocation",
        "en": "to succeed in an examination",
        "vi": "đỗ (kỳ thi/bài kiểm tra)",
        "ex": "She passed her driving test on the first try."
      },
      {
        "term": "pass a law",
        "type": "collocation",
        "en": "to officially approve a law",
        "vi": "thông qua một đạo luật",
        "ex": "Parliament passed the new law yesterday."
      },
      {
        "term": "pass the time",
        "type": "collocation",
        "en": "to spend time doing something",
        "vi": "dùng thời gian làm gì đó (cho qua)",
        "ex": "We played cards to pass the time."
      },
      {
        "term": "pass away",
        "type": "phrasal_verb",
        "en": "to die (polite way of saying)",
        "vi": "qua đời",
        "ex": "Her grandfather passed away last year."
      },
      {
        "term": "pass by",
        "type": "phrasal_verb",
        "en": "to go past something/someone",
        "vi": "đi ngang qua",
        "ex": "Years passed by quickly."
      },
      {
        "term": "pass on",
        "type": "phrasal_verb",
        "en": "to give something to another person; to die (polite)",
        "vi": "truyền lại, chuyển cho; qua đời",
        "ex": "Please pass on this message to the team."
      },
      {
        "term": "pass out",
        "type": "phrasal_verb",
        "en": "to faint; to distribute something",
        "vi": "ngất xỉu; phát ra",
        "ex": "She passed out from the heat."
      }
    ]
  },
  {
    "verb": "FALL",
    "group": "B",
    "def_en": "to drop down; to decrease; to happen or come into a state suddenly",
    "def_vi": "rơi, ngã; giảm xuống; rơi vào trạng thái nào đó",
    "items": [
      {
        "term": "fall in love",
        "type": "collocation",
        "en": "to begin to love someone",
        "vi": "phải lòng, yêu",
        "ex": "They fell in love at first sight."
      },
      {
        "term": "fall ill",
        "type": "collocation",
        "en": "to become sick",
        "vi": "ngã bệnh",
        "ex": "He fell ill during the trip."
      },
      {
        "term": "fall silent",
        "type": "collocation",
        "en": "to suddenly stop talking",
        "vi": "im lặng đột ngột",
        "ex": "The room fell silent when she entered."
      },
      {
        "term": "fall apart",
        "type": "phrasal_verb",
        "en": "to break into pieces; to stop functioning emotionally",
        "vi": "tan vỡ, sụp đổ",
        "ex": "Their marriage fell apart after years of problems."
      },
      {
        "term": "fall behind",
        "type": "phrasal_verb",
        "en": "to fail to keep up with a pace or schedule",
        "vi": "bị tụt lại phía sau",
        "ex": "He fell behind on his rent payments."
      },
      {
        "term": "fall asleep",
        "type": "phrasal_verb",
        "en": "to begin sleeping",
        "vi": "ngủ thiếp đi",
        "ex": "She fell asleep on the couch."
      },
      {
        "term": "fall over",
        "type": "phrasal_verb",
        "en": "to lose balance and fall",
        "vi": "ngã, té",
        "ex": "The chair fell over when he stood up."
      },
      {
        "term": "fall out",
        "type": "phrasal_verb",
        "en": "to have an argument and stop being friends",
        "vi": "cãi nhau, bất hòa",
        "ex": "The two friends fell out over money."
      }
    ]
  },
  {
    "verb": "GET",
    "group": "C",
    "def_en": "to obtain, receive, or come to have something; to become",
    "def_vi": "nhận được, có được; trở nên (một trạng thái nào đó)",
    "items": [
      {
        "term": "get a job",
        "type": "collocation",
        "en": "to find employment",
        "vi": "tìm được việc làm",
        "ex": "She got a job at a local bank."
      },
      {
        "term": "get married",
        "type": "collocation",
        "en": "to become husband and wife",
        "vi": "kết hôn",
        "ex": "They got married last summer."
      },
      {
        "term": "get permission",
        "type": "collocation",
        "en": "to receive approval",
        "vi": "được cho phép",
        "ex": "He got permission to leave early."
      },
      {
        "term": "get in touch",
        "type": "collocation",
        "en": "to contact someone",
        "vi": "liên lạc",
        "ex": "Please get in touch if you have questions."
      },
      {
        "term": "get up",
        "type": "phrasal_verb",
        "en": "to rise from bed",
        "vi": "thức dậy",
        "ex": "I get up at 6 a.m. every day."
      },
      {
        "term": "get in",
        "type": "phrasal_verb",
        "en": "to enter a vehicle/place",
        "vi": "vào, lên (xe)",
        "ex": "She got in the car and drove off."
      },
      {
        "term": "get on",
        "type": "phrasal_verb",
        "en": "to board a vehicle; to have a good relationship",
        "vi": "lên (xe, tàu); hòa hợp với ai đó",
        "ex": "We got on the bus at the last stop."
      },
      {
        "term": "get over",
        "type": "phrasal_verb",
        "en": "to recover from something",
        "vi": "vượt qua, hồi phục từ",
        "ex": "It took her weeks to get over the flu."
      },
      {
        "term": "get along with",
        "type": "phrasal_verb",
        "en": "to have a good relationship with someone",
        "vi": "hòa hợp với ai đó",
        "ex": "I get along well with my coworkers."
      },
      {
        "term": "get used to",
        "type": "phrasal_verb",
        "en": "to become familiar/comfortable with something",
        "vi": "trở nên quen với",
        "ex": "It took time to get used to the new schedule."
      },
      {
        "term": "get rid of",
        "type": "phrasal_verb",
        "en": "to remove or eliminate something",
        "vi": "loại bỏ",
        "ex": "We need to get rid of these old files."
      },
      {
        "term": "get away with",
        "type": "phrasal_verb",
        "en": "to do something wrong without punishment",
        "vi": "làm gì sai mà không bị phạt",
        "ex": "He got away with cheating on the test."
      }
    ]
  },
  {
    "verb": "KEEP",
    "group": "C",
    "def_en": "to continue having or doing something; to retain",
    "def_vi": "giữ, duy trì; tiếp tục làm gì đó",
    "items": [
      {
        "term": "keep a promise",
        "type": "collocation",
        "en": "to do what you said you would",
        "vi": "giữ lời hứa",
        "ex": "He always keeps his promises."
      },
      {
        "term": "keep a secret",
        "type": "collocation",
        "en": "to not reveal information",
        "vi": "giữ bí mật",
        "ex": "Can you keep a secret?"
      },
      {
        "term": "keep in mind",
        "type": "collocation",
        "en": "to remember something",
        "vi": "ghi nhớ",
        "ex": "Keep in mind that the deadline is Friday."
      },
      {
        "term": "keep an eye on",
        "type": "collocation",
        "en": "to watch something carefully",
        "vi": "để mắt đến, trông chừng",
        "ex": "Can you keep an eye on my bag?"
      },
      {
        "term": "keep up",
        "type": "phrasal_verb",
        "en": "to maintain the same pace/level",
        "vi": "theo kịp, duy trì",
        "ex": "It's hard to keep up with new technology."
      },
      {
        "term": "keep on",
        "type": "phrasal_verb",
        "en": "to continue doing something",
        "vi": "tiếp tục",
        "ex": "She kept on working despite the noise."
      },
      {
        "term": "keep away",
        "type": "phrasal_verb",
        "en": "to stay at a distance from something",
        "vi": "tránh xa",
        "ex": "Keep away from the edge of the cliff."
      },
      {
        "term": "keep back",
        "type": "phrasal_verb",
        "en": "to hold something in reserve; to withhold information",
        "vi": "giữ lại, không nói ra",
        "ex": "He kept back some important details."
      },
      {
        "term": "keep in touch",
        "type": "phrasal_verb",
        "en": "to maintain contact with someone",
        "vi": "giữ liên lạc",
        "ex": "Let's keep in touch after graduation."
      }
    ]
  },
  {
    "verb": "HOLD",
    "group": "C",
    "def_en": "to have or keep something in your hands or control",
    "def_vi": "cầm, nắm giữ hoặc kiểm soát điều gì đó",
    "items": [
      {
        "term": "hold a meeting",
        "type": "collocation",
        "en": "to organize/conduct a meeting",
        "vi": "tổ chức cuộc họp",
        "ex": "The company holds a meeting every Monday."
      },
      {
        "term": "hold a record",
        "type": "collocation",
        "en": "to have the best result officially recorded",
        "vi": "giữ kỷ lục",
        "ex": "She holds the record for the fastest time."
      },
      {
        "term": "hold a position",
        "type": "collocation",
        "en": "to have a job/role",
        "vi": "giữ một vị trí (công việc)",
        "ex": "He holds a senior position in the firm."
      },
      {
        "term": "hold on",
        "type": "phrasal_verb",
        "en": "to wait; to grip tightly",
        "vi": "chờ đã; bám chặt",
        "ex": "Hold on a second, I'll be right there."
      },
      {
        "term": "hold up",
        "type": "phrasal_verb",
        "en": "to delay something; to remain strong",
        "vi": "làm chậm trễ; vẫn vững vàng",
        "ex": "Traffic held up the delivery truck."
      },
      {
        "term": "hold back",
        "type": "phrasal_verb",
        "en": "to restrain oneself or something; to hesitate",
        "vi": "kìm nén, ngần ngại",
        "ex": "She held back her tears during the speech."
      },
      {
        "term": "hold onto",
        "type": "phrasal_verb",
        "en": "to grip something tightly; to keep something",
        "vi": "bám chặt vào; giữ lại",
        "ex": "Hold onto the railing while going down the stairs."
      },
      {
        "term": "hold off",
        "type": "phrasal_verb",
        "en": "to delay or postpone",
        "vi": "trì hoãn",
        "ex": "Let's hold off on making a decision."
      }
    ]
  },
  {
    "verb": "BREAK",
    "group": "C",
    "def_en": "to separate into pieces; to stop functioning; to violate a rule",
    "def_vi": "làm vỡ, tách ra; ngừng hoạt động; vi phạm quy tắc",
    "items": [
      {
        "term": "break a promise",
        "type": "collocation",
        "en": "to fail to keep your word",
        "vi": "thất hứa",
        "ex": "He broke his promise to call."
      },
      {
        "term": "break a record",
        "type": "collocation",
        "en": "to achieve a better result than before",
        "vi": "phá kỷ lục",
        "ex": "She broke the world record in swimming."
      },
      {
        "term": "break the law",
        "type": "collocation",
        "en": "to do something illegal",
        "vi": "vi phạm pháp luật",
        "ex": "Stealing means breaking the law."
      },
      {
        "term": "break the ice",
        "type": "collocation",
        "en": "to ease tension in a social situation",
        "vi": "phá vỡ sự ngại ngùng ban đầu",
        "ex": "He told a joke to break the ice."
      },
      {
        "term": "break down",
        "type": "phrasal_verb",
        "en": "to stop working (machine); to become very upset",
        "vi": "bị hỏng (máy móc); suy sụp tinh thần",
        "ex": "The car broke down on the highway."
      },
      {
        "term": "break up",
        "type": "phrasal_verb",
        "en": "to end a relationship; to split into parts",
        "vi": "chia tay; chia nhỏ ra",
        "ex": "They broke up after two years together."
      },
      {
        "term": "break into",
        "type": "phrasal_verb",
        "en": "to enter a place illegally by force",
        "vi": "đột nhập",
        "ex": "Thieves broke into the house last night."
      },
      {
        "term": "break out",
        "type": "phrasal_verb",
        "en": "to start suddenly (fire, war, disease)",
        "vi": "bùng nổ (chiến tranh, dịch bệnh)",
        "ex": "A fire broke out in the warehouse."
      },
      {
        "term": "break even",
        "type": "phrasal_verb",
        "en": "to make neither profit nor loss",
        "vi": "hòa vốn",
        "ex": "The business broke even in its first year."
      }
    ]
  },
  {
    "verb": "TURN",
    "group": "C",
    "def_en": "to change direction or position; to become something different",
    "def_vi": "xoay, quay; thay đổi, trở thành cái gì đó khác",
    "items": [
      {
        "term": "turn a corner",
        "type": "collocation",
        "en": "to go around a bend in the road",
        "vi": "rẽ ở góc đường",
        "ex": "Turn the corner and the shop is on the left."
      },
      {
        "term": "turn a profit",
        "type": "collocation",
        "en": "to start making money",
        "vi": "bắt đầu có lãi",
        "ex": "The startup finally turned a profit this year."
      },
      {
        "term": "turn a blind eye",
        "type": "collocation",
        "en": "to deliberately ignore something wrong",
        "vi": "làm ngơ trước điều sai trái",
        "ex": "Management turned a blind eye to the problem."
      },
      {
        "term": "turn on",
        "type": "phrasal_verb",
        "en": "to start a device/light",
        "vi": "bật (thiết bị, đèn)",
        "ex": "Please turn on the lights."
      },
      {
        "term": "turn off",
        "type": "phrasal_verb",
        "en": "to stop a device/light",
        "vi": "tắt (thiết bị, đèn)",
        "ex": "Turn off the TV before you sleep."
      },
      {
        "term": "turn up",
        "type": "phrasal_verb",
        "en": "to arrive somewhere; to increase volume",
        "vi": "xuất hiện, đến; tăng âm lượng",
        "ex": "He turned up late to the party."
      },
      {
        "term": "turn down",
        "type": "phrasal_verb",
        "en": "to refuse an offer; to lower volume",
        "vi": "từ chối; giảm âm lượng",
        "ex": "She turned down the job offer."
      },
      {
        "term": "turn into",
        "type": "phrasal_verb",
        "en": "to become something different",
        "vi": "biến thành",
        "ex": "The caterpillar turned into a butterfly."
      },
      {
        "term": "turn out",
        "type": "phrasal_verb",
        "en": "to happen in a particular way; to result in the end",
        "vi": "hóa ra là",
        "ex": "The weather turned out to be perfect."
      }
    ]
  },
  {
    "verb": "CUT",
    "group": "C",
    "def_en": "to divide or reduce something, often using a sharp tool",
    "def_vi": "cắt; cắt giảm",
    "items": [
      {
        "term": "cut costs",
        "type": "collocation",
        "en": "to reduce expenses",
        "vi": "cắt giảm chi phí",
        "ex": "The company cut costs by working remotely."
      },
      {
        "term": "cut corners",
        "type": "collocation",
        "en": "to do something badly to save time/money",
        "vi": "làm ẩu để tiết kiệm thời gian/tiền",
        "ex": "Don't cut corners on safety."
      },
      {
        "term": "cut a deal",
        "type": "collocation",
        "en": "to reach an agreement",
        "vi": "đạt được thỏa thuận",
        "ex": "They cut a deal to end the dispute."
      },
      {
        "term": "cut down",
        "type": "phrasal_verb",
        "en": "to reduce the amount of something; to fell (a tree)",
        "vi": "cắt giảm; chặt hạ (cây)",
        "ex": "He's trying to cut down on sugar."
      },
      {
        "term": "cut off",
        "type": "phrasal_verb",
        "en": "to interrupt/disconnect; to isolate",
        "vi": "cắt đứt, ngắt kết nối; cô lập",
        "ex": "The storm cut off power to the village."
      },
      {
        "term": "cut back",
        "type": "phrasal_verb",
        "en": "to reduce spending or an activity",
        "vi": "cắt giảm chi tiêu/hoạt động",
        "ex": "The firm had to cut back on staff."
      },
      {
        "term": "cut out",
        "type": "phrasal_verb",
        "en": "to remove something; to stop doing something (informal)",
        "vi": "loại bỏ; ngừng làm gì đó",
        "ex": "You should cut out junk food."
      }
    ]
  },
  {
    "verb": "STAND",
    "group": "C",
    "def_en": "to be in an upright position; to tolerate; to represent",
    "def_vi": "đứng; chịu đựng; đại diện cho",
    "items": [
      {
        "term": "stand a chance",
        "type": "collocation",
        "en": "to have a possibility of success",
        "vi": "có cơ hội thành công",
        "ex": "She stands a chance of winning the award."
      },
      {
        "term": "stand in line",
        "type": "collocation",
        "en": "to wait in a queue",
        "vi": "xếp hàng chờ",
        "ex": "We stood in line for an hour."
      },
      {
        "term": "stand trial",
        "type": "collocation",
        "en": "to be judged in court",
        "vi": "ra hầu tòa, bị xét xử",
        "ex": "He will stand trial next month."
      },
      {
        "term": "stand up",
        "type": "phrasal_verb",
        "en": "to rise to a standing position; (stand up for) to defend",
        "vi": "đứng dậy; (stand up for) bảo vệ",
        "ex": "She stood up to greet the guests."
      },
      {
        "term": "stand by",
        "type": "phrasal_verb",
        "en": "to be ready to help; to support someone",
        "vi": "sẵn sàng; ủng hộ ai đó",
        "ex": "I'll stand by you no matter what happens."
      },
      {
        "term": "stand for",
        "type": "phrasal_verb",
        "en": "to represent or symbolize something; to tolerate",
        "vi": "đại diện cho, là viết tắt của; chịu đựng",
        "ex": "WHO stands for World Health Organization."
      },
      {
        "term": "stand out",
        "type": "phrasal_verb",
        "en": "to be noticeably better or different",
        "vi": "nổi bật",
        "ex": "Her work really stands out from the rest."
      }
    ]
  },
  {
    "verb": "CALL",
    "group": "D",
    "def_en": "to speak loudly to get attention; to telephone someone; to name something",
    "def_vi": "gọi (tên); gọi điện thoại; đặt tên cho",
    "items": [
      {
        "term": "call a meeting",
        "type": "collocation",
        "en": "to arrange a meeting",
        "vi": "triệu tập cuộc họp",
        "ex": "The manager called a meeting for 3 p.m."
      },
      {
        "term": "call attention to",
        "type": "collocation",
        "en": "to make people notice",
        "vi": "thu hút sự chú ý đến",
        "ex": "The report called attention to safety issues."
      },
      {
        "term": "call it a day",
        "type": "collocation",
        "en": "to stop working for the day",
        "vi": "ngừng làm việc, kết thúc ngày",
        "ex": "Let's call it a day and go home."
      },
      {
        "term": "call off",
        "type": "phrasal_verb",
        "en": "to cancel something",
        "vi": "hủy bỏ",
        "ex": "They called off the wedding."
      },
      {
        "term": "call back",
        "type": "phrasal_verb",
        "en": "to return a phone call",
        "vi": "gọi lại",
        "ex": "I'll call you back in ten minutes."
      },
      {
        "term": "call on",
        "type": "phrasal_verb",
        "en": "to ask someone to do something; to visit",
        "vi": "yêu cầu ai đó; ghé thăm",
        "ex": "The teacher called on him to answer."
      },
      {
        "term": "call up",
        "type": "phrasal_verb",
        "en": "to telephone someone; to summon (military)",
        "vi": "gọi điện cho; triệu tập",
        "ex": "She called up her old friend."
      },
      {
        "term": "call for",
        "type": "phrasal_verb",
        "en": "to require or need something",
        "vi": "yêu cầu, cần đến",
        "ex": "This situation calls for immediate action."
      }
    ]
  },
  {
    "verb": "LOOK",
    "group": "D",
    "def_en": "to direct your eyes in order to see; to appear a certain way",
    "def_vi": "nhìn, hướng mắt để thấy; trông có vẻ như",
    "items": [
      {
        "term": "take a look",
        "type": "collocation",
        "en": "to look at something briefly",
        "vi": "nhìn qua, xem qua",
        "ex": "Can you take a look at this document?"
      },
      {
        "term": "look on the bright side",
        "type": "collocation",
        "en": "to stay positive",
        "vi": "nhìn vào mặt tích cực",
        "ex": "Even in hard times, try to look on the bright side."
      },
      {
        "term": "look after",
        "type": "phrasal_verb",
        "en": "to take care of someone/something",
        "vi": "chăm sóc",
        "ex": "Can you look after my dog this weekend?"
      },
      {
        "term": "look for",
        "type": "phrasal_verb",
        "en": "to search for something",
        "vi": "tìm kiếm",
        "ex": "I'm looking for my keys."
      },
      {
        "term": "look into",
        "type": "phrasal_verb",
        "en": "to investigate something",
        "vi": "điều tra, xem xét",
        "ex": "Police are looking into the matter."
      },
      {
        "term": "look up",
        "type": "phrasal_verb",
        "en": "to search for information; to improve",
        "vi": "tra cứu; trở nên tốt hơn",
        "ex": "I looked up the word in a dictionary."
      },
      {
        "term": "look down on",
        "type": "phrasal_verb",
        "en": "to consider someone inferior",
        "vi": "coi thường ai đó",
        "ex": "He looks down on people who didn't go to college."
      },
      {
        "term": "look forward to",
        "type": "phrasal_verb",
        "en": "to anticipate with pleasure",
        "vi": "mong đợi, mong chờ",
        "ex": "We look forward to hearing from you."
      }
    ]
  },
  {
    "verb": "PICK",
    "group": "D",
    "def_en": "to choose or select something; to lift something using fingers",
    "def_vi": "chọn lựa; nhặt, nhấc lên bằng ngón tay",
    "items": [
      {
        "term": "pick a fight",
        "type": "collocation",
        "en": "to deliberately start an argument",
        "vi": "gây sự, khiêu khích",
        "ex": "He always picks a fight over small things."
      },
      {
        "term": "pick a winner",
        "type": "collocation",
        "en": "to choose the best option/person",
        "vi": "chọn ra người/thứ chiến thắng",
        "ex": "It's hard to pick a winner among these candidates."
      },
      {
        "term": "pick up",
        "type": "phrasal_verb",
        "en": "to lift something; to collect someone; to learn casually",
        "vi": "nhặt lên; đón ai đó; học được (một cách tự nhiên)",
        "ex": "I'll pick you up at the airport."
      },
      {
        "term": "pick out",
        "type": "phrasal_verb",
        "en": "to select from a group",
        "vi": "chọn ra",
        "ex": "She picked out a dress for the party."
      },
      {
        "term": "pick on",
        "type": "phrasal_verb",
        "en": "to criticize or bully someone repeatedly",
        "vi": "bắt nạt, chọc ghẹo",
        "ex": "Stop picking on your little brother."
      }
    ]
  },
  {
    "verb": "SET",
    "group": "D",
    "def_en": "to put something in a specific place or condition; to establish",
    "def_vi": "đặt, để vào vị trí/trạng thái nhất định; thiết lập",
    "items": [
      {
        "term": "set a goal",
        "type": "collocation",
        "en": "to decide on an objective",
        "vi": "đặt ra mục tiêu",
        "ex": "She set a goal to save money every month."
      },
      {
        "term": "set an example",
        "type": "collocation",
        "en": "to behave in a way others should copy",
        "vi": "làm gương",
        "ex": "Good leaders set an example for their team."
      },
      {
        "term": "set a record",
        "type": "collocation",
        "en": "to achieve the best result",
        "vi": "lập kỷ lục",
        "ex": "He set a new record in the marathon."
      },
      {
        "term": "set the table",
        "type": "collocation",
        "en": "to arrange plates/cutlery for a meal",
        "vi": "dọn bàn ăn",
        "ex": "Can you set the table for dinner?"
      },
      {
        "term": "set up",
        "type": "phrasal_verb",
        "en": "to establish or arrange something",
        "vi": "thiết lập, thành lập",
        "ex": "They set up a new company last year."
      },
      {
        "term": "set off",
        "type": "phrasal_verb",
        "en": "to start a journey; to trigger something",
        "vi": "khởi hành; kích hoạt",
        "ex": "We set off early to avoid traffic."
      },
      {
        "term": "set out",
        "type": "phrasal_verb",
        "en": "to begin an activity with a goal; to arrange/display",
        "vi": "bắt đầu (với mục tiêu); trình bày",
        "ex": "She set out to become a professional dancer."
      },
      {
        "term": "set aside",
        "type": "phrasal_verb",
        "en": "to save something for later; to put to one side",
        "vi": "dành riêng ra",
        "ex": "Try to set aside some money each month."
      },
      {
        "term": "set back",
        "type": "phrasal_verb",
        "en": "to delay progress; to cost someone a large sum",
        "vi": "làm chậm trễ; tốn kém (tiền bạc)",
        "ex": "The accident set back the project by two weeks."
      }
    ]
  },
  {
    "verb": "FIND",
    "group": "D",
    "def_en": "to discover or locate something after searching, or by chance",
    "def_vi": "tìm thấy, phát hiện ra",
    "items": [
      {
        "term": "find a solution",
        "type": "collocation",
        "en": "to discover a way to solve a problem",
        "vi": "tìm ra giải pháp",
        "ex": "We need to find a solution to this issue quickly."
      },
      {
        "term": "find fault with",
        "type": "collocation",
        "en": "to criticize or find problems in something",
        "vi": "bắt lỗi, chỉ trích",
        "ex": "He always finds fault with her work."
      },
      {
        "term": "find the time",
        "type": "collocation",
        "en": "to manage to make time for something",
        "vi": "thu xếp được thời gian",
        "ex": "It's hard to find the time to exercise."
      },
      {
        "term": "find out",
        "type": "phrasal_verb",
        "en": "to discover information",
        "vi": "tìm hiểu ra, khám phá",
        "ex": "I need to find out what happened."
      },
      {
        "term": "find yourself",
        "type": "phrasal_verb",
        "en": "to realize you are in a particular situation/place",
        "vi": "nhận ra mình đang ở tình huống/nơi nào",
        "ex": "She found herself lost in the old town."
      }
    ]
  },
  {
    "verb": "WORK",
    "group": "D",
    "def_en": "to perform labor or a job; to function properly",
    "def_vi": "làm việc; hoạt động (máy móc, kế hoạch)",
    "items": [
      {
        "term": "work overtime",
        "type": "collocation",
        "en": "to work extra hours",
        "vi": "làm thêm giờ",
        "ex": "He often works overtime to meet deadlines."
      },
      {
        "term": "work hard",
        "type": "collocation",
        "en": "to put a lot of effort into work",
        "vi": "làm việc chăm chỉ",
        "ex": "She works hard to support her family."
      },
      {
        "term": "work from home",
        "type": "collocation",
        "en": "to do your job at home instead of an office",
        "vi": "làm việc tại nhà",
        "ex": "Many employees now work from home."
      },
      {
        "term": "work out",
        "type": "phrasal_verb",
        "en": "to exercise; to find a solution; to happen successfully",
        "vi": "tập thể dục; tìm ra giải pháp; diễn ra tốt đẹp",
        "ex": "Things worked out well in the end."
      },
      {
        "term": "work on",
        "type": "phrasal_verb",
        "en": "to spend effort improving or completing something",
        "vi": "làm việc trên, cải thiện",
        "ex": "She's working on her thesis this week."
      },
      {
        "term": "work for",
        "type": "phrasal_verb",
        "en": "to be employed by someone",
        "vi": "làm việc cho ai đó",
        "ex": "He works for a tech company."
      },
      {
        "term": "work with",
        "type": "phrasal_verb",
        "en": "to collaborate with someone",
        "vi": "làm việc cùng ai đó",
        "ex": "I enjoy working with this team."
      },
      {
        "term": "work through",
        "type": "phrasal_verb",
        "en": "to deal with a problem step by step",
        "vi": "giải quyết từng bước, vượt qua",
        "ex": "They worked through their differences."
      }
    ]
  },
  {
    "verb": "CHECK",
    "group": "D",
    "def_en": "to examine something to make sure it is correct or safe",
    "def_vi": "kiểm tra",
    "items": [
      {
        "term": "check the facts",
        "type": "collocation",
        "en": "to verify information is accurate",
        "vi": "kiểm tra thông tin",
        "ex": "Always check the facts before sharing news."
      },
      {
        "term": "check your email",
        "type": "collocation",
        "en": "to look at your email messages",
        "vi": "kiểm tra email",
        "ex": "I check my email every morning."
      },
      {
        "term": "check in",
        "type": "phrasal_verb",
        "en": "to register at a hotel/airport",
        "vi": "làm thủ tục nhận phòng/lên máy bay",
        "ex": "We checked in at the hotel around noon."
      },
      {
        "term": "check out",
        "type": "phrasal_verb",
        "en": "to leave a hotel after paying; to look at or investigate something",
        "vi": "làm thủ tục trả phòng; xem thử, tìm hiểu",
        "ex": "You must check out before 11 a.m."
      },
      {
        "term": "check on",
        "type": "phrasal_verb",
        "en": "to make sure someone/something is okay",
        "vi": "kiểm tra tình trạng của ai/cái gì",
        "ex": "I'll check on the kids before I leave."
      }
    ]
  },
  {
    "verb": "FILL",
    "group": "D",
    "def_en": "to make something full",
    "def_vi": "làm đầy, lấp đầy",
    "items": [
      {
        "term": "fill a vacancy",
        "type": "collocation",
        "en": "to hire someone for an open position",
        "vi": "tuyển người cho vị trí trống",
        "ex": "The company needs to fill a vacancy in sales."
      },
      {
        "term": "fill a role",
        "type": "collocation",
        "en": "to perform the duties of a position",
        "vi": "đảm nhận một vai trò",
        "ex": "She filled the role of team leader well."
      },
      {
        "term": "fill in",
        "type": "phrasal_verb",
        "en": "to complete a form; to substitute for someone temporarily",
        "vi": "điền vào (biểu mẫu); thay thế tạm thời",
        "ex": "Please fill in this application form."
      },
      {
        "term": "fill out",
        "type": "phrasal_verb",
        "en": "to complete a form in detail",
        "vi": "điền đầy đủ vào (biểu mẫu)",
        "ex": "Fill out the survey before you leave."
      },
      {
        "term": "fill up",
        "type": "phrasal_verb",
        "en": "to make completely full",
        "vi": "đổ đầy, lấp đầy",
        "ex": "He filled up the tank before the trip."
      }
    ]
  },
  {
    "verb": "HAND",
    "group": "D",
    "def_en": "to give something to someone using your hand",
    "def_vi": "trao, đưa bằng tay",
    "items": [
      {
        "term": "hand-picked",
        "type": "collocation",
        "en": "carefully chosen",
        "vi": "được chọn lựa kỹ càng",
        "ex": "These are hand-picked employees for the project."
      },
      {
        "term": "hand in hand",
        "type": "collocation",
        "en": "closely connected, together",
        "vi": "đi đôi với nhau",
        "ex": "Success and hard work go hand in hand."
      },
      {
        "term": "hand in",
        "type": "phrasal_verb",
        "en": "to submit something (homework, resignation)",
        "vi": "nộp (bài, đơn)",
        "ex": "Please hand in your assignments by Friday."
      },
      {
        "term": "hand out",
        "type": "phrasal_verb",
        "en": "to distribute something to a group",
        "vi": "phát ra, phân phát",
        "ex": "The teacher handed out the test papers."
      },
      {
        "term": "hand over",
        "type": "phrasal_verb",
        "en": "to give control or possession of something to someone",
        "vi": "giao lại, chuyển giao quyền",
        "ex": "He handed over the keys to the new owner."
      }
    ]
  },
  {
    "verb": "POINT",
    "group": "D",
    "def_en": "to indicate direction or something specific, often with your finger",
    "def_vi": "chỉ (tay), chỉ ra, chỉ hướng",
    "items": [
      {
        "term": "point blank",
        "type": "collocation",
        "en": "said or done directly and bluntly",
        "vi": "thẳng thừng, trực tiếp",
        "ex": "She asked him point blank if he was lying."
      },
      {
        "term": "point of view",
        "type": "collocation",
        "en": "a particular way of considering something",
        "vi": "quan điểm",
        "ex": "I understand your point of view."
      },
      {
        "term": "point out",
        "type": "phrasal_verb",
        "en": "to indicate or mention something specific",
        "vi": "chỉ ra, nêu ra",
        "ex": "She pointed out a mistake in the report."
      },
      {
        "term": "point to",
        "type": "phrasal_verb",
        "en": "to indicate or suggest something",
        "vi": "cho thấy, gợi ý về",
        "ex": "The evidence points to his involvement."
      }
    ]
  },
  {
    "verb": "DEAL",
    "group": "D",
    "def_en": "to handle or take action regarding something",
    "def_vi": "xử lý, giải quyết",
    "items": [
      {
        "term": "deal with",
        "type": "phrasal_verb",
        "en": "to handle or resolve a problem or situation",
        "vi": "xử lý, giải quyết vấn đề",
        "ex": "She knows how to deal with difficult customers."
      }
    ]
  },
  {
    "verb": "CARE",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "care about",
        "type": "prepositional_verb",
        "en": "to feel concern or interest in something",
        "vi": "quan tâm đến",
        "ex": "She cares about the environment deeply."
      },
      {
        "term": "care for",
        "type": "prepositional_verb",
        "en": "to look after someone; to like (formal)",
        "vi": "chăm sóc; thích (trang trọng)",
        "ex": "He cares for his elderly parents every day."
      }
    ]
  },
  {
    "verb": "DEPEND",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "depend on",
        "type": "prepositional_verb",
        "en": "to rely on someone or something",
        "vi": "phụ thuộc vào",
        "ex": "Our trip depends on the weather."
      }
    ]
  },
  {
    "verb": "FOCUS",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "focus on",
        "type": "prepositional_verb",
        "en": "to concentrate on something",
        "vi": "tập trung vào",
        "ex": "Let's focus on the most important task first."
      }
    ]
  },
  {
    "verb": "LISTEN",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "listen to",
        "type": "prepositional_verb",
        "en": "to pay attention to sound or someone speaking",
        "vi": "lắng nghe",
        "ex": "I like to listen to music while studying."
      }
    ]
  },
  {
    "verb": "BELONG",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "belong to",
        "type": "prepositional_verb",
        "en": "to be a member of, or owned by, something",
        "vi": "thuộc về",
        "ex": "This book belongs to the school library."
      }
    ]
  },
  {
    "verb": "APPLY",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "apply for",
        "type": "prepositional_verb",
        "en": "to formally request something (a job, visa, etc.)",
        "vi": "nộp đơn xin",
        "ex": "She applied for a scholarship abroad."
      },
      {
        "term": "apply to",
        "type": "prepositional_verb",
        "en": "to be relevant or applicable to someone/something",
        "vi": "áp dụng cho, liên quan đến",
        "ex": "This rule applies to all employees."
      }
    ]
  },
  {
    "verb": "REFER",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "refer to",
        "type": "prepositional_verb",
        "en": "to mention or direct attention to something",
        "vi": "đề cập đến, tham khảo",
        "ex": "Please refer to page 10 for more details."
      }
    ]
  },
  {
    "verb": "RESULT",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "result in",
        "type": "prepositional_verb",
        "en": "to cause a particular outcome",
        "vi": "dẫn đến (kết quả)",
        "ex": "The negotiation resulted in a new agreement."
      },
      {
        "term": "result from",
        "type": "prepositional_verb",
        "en": "to be caused by something",
        "vi": "là kết quả của, bắt nguồn từ",
        "ex": "The delay resulted from bad weather."
      }
    ]
  },
  {
    "verb": "LEAD",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "lead to",
        "type": "prepositional_verb",
        "en": "to cause something to happen",
        "vi": "dẫn đến",
        "ex": "Smoking can lead to serious health problems."
      }
    ]
  },
  {
    "verb": "CONSIST",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "consist of",
        "type": "prepositional_verb",
        "en": "to be made up of particular parts",
        "vi": "bao gồm, gồm có",
        "ex": "The committee consists of five members."
      }
    ]
  },
  {
    "verb": "SUFFER",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "suffer from",
        "type": "prepositional_verb",
        "en": "to be affected by an illness or problem",
        "vi": "mắc phải, chịu đựng",
        "ex": "He suffers from chronic back pain."
      }
    ]
  },
  {
    "verb": "RECOVER",
    "group": "E",
    "def_en": "",
    "def_vi": "",
    "items": [
      {
        "term": "recover from",
        "type": "prepositional_verb",
        "en": "to get better after an illness or difficulty",
        "vi": "hồi phục sau",
        "ex": "It took months to recover from the surgery."
      }
    ]
  }
];
