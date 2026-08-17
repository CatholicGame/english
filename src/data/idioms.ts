// English idioms grouped into 25 topic units, mirroring the well-known structure of
// commercial idiom coursebooks (unit topics + idiom lists are common knowledge, not
// copyrightable) — but every field of actual content below (en/vi meaning, origin,
// examples) is AI-authored specifically for this app, not copied from any book.

export interface IdiomExample {
  en: string;
  vi: string;
}

export interface IdiomItem {
  slug: string;
  term: string;
  type: "idiom";
  en: string;
  vi: string;
  origin: string;
  examples: IdiomExample[];
  ex: string;
}

export interface IdiomUnitMeta {
  unit: number;
  slug: string;
  title: string;
  titleVi: string;
}

export const UNITS_META: IdiomUnitMeta[] = [
  { unit: 1, slug: "knowledge-and-understanding", title: "Knowledge and understanding", titleVi: "Kiến thức & sự hiểu biết" },
  { unit: 2, slug: "memory-and-mind", title: "Memory and mind", titleVi: "Trí nhớ & tâm trí" },
  { unit: 3, slug: "communicating", title: "Communicating", titleVi: "Giao tiếp" },
  { unit: 4, slug: "priorities-and-decisions", title: "Priorities and decisions", titleVi: "Ưu tiên & quyết định" },
  { unit: 5, slug: "relationships", title: "Relationships", titleVi: "Mối quan hệ" },
  { unit: 6, slug: "help-and-encouragement", title: "Help and encouragement", titleVi: "Giúp đỡ & động viên" },
  { unit: 7, slug: "involvement-and-interest", title: "Involvement and interest", titleVi: "Sự tham gia & hứng thú" },
  { unit: 8, slug: "starting-and-stopping", title: "Starting and stopping", titleVi: "Bắt đầu & dừng lại" },
  { unit: 9, slug: "effort", title: "Effort", titleVi: "Nỗ lực" },
  { unit: 10, slug: "honesty-and-fairness", title: "Honesty and fairness", titleVi: "Trung thực & công bằng" },
  { unit: 11, slug: "deception", title: "Deception", titleVi: "Lừa dối" },
  { unit: 12, slug: "anger-and-irritation", title: "Anger and irritation", titleVi: "Tức giận & khó chịu" },
  { unit: 13, slug: "fear-and-frustration", title: "Fear and frustration", titleVi: "Sợ hãi & thất vọng" },
  { unit: 14, slug: "disagreement", title: "Disagreement", titleVi: "Bất đồng" },
  { unit: 15, slug: "success-and-failure", title: "Success and failure", titleVi: "Thành công & thất bại" },
  { unit: 16, slug: "progress", title: "Progress", titleVi: "Tiến triển" },
  { unit: 17, slug: "expectation", title: "Expectation", titleVi: "Kỳ vọng" },
  { unit: 18, slug: "trouble-and-difficulty", title: "Trouble and difficulty", titleVi: "Rắc rối & khó khăn" },
  { unit: 19, slug: "safety-and-risk", title: "Safety and risk", titleVi: "An toàn & rủi ro" },
  { unit: 20, slug: "money", title: "Money", titleVi: "Tiền bạc" },
  { unit: 21, slug: "authority-and-control", title: "Authority and control", titleVi: "Quyền lực & kiểm soát" },
  { unit: 22, slug: "limitations-and-restrictions", title: "Limitations and restrictions", titleVi: "Giới hạn & hạn chế" },
  { unit: 23, slug: "loving-and-liking", title: "Loving and liking", titleVi: "Yêu thích" },
  { unit: 24, slug: "happiness-and-sadness", title: "Happiness and sadness", titleVi: "Vui buồn" },
  { unit: 25, slug: "health-illness-and-death", title: "Health, illness, and death", titleVi: "Sức khỏe, bệnh tật & cái chết" },
];

export const IDIOM_UNITS: Record<string, IdiomItem[]> = {
  "knowledge-and-understanding": [
  {
    slug: "get-the-hang-of-something",
    term: "get the hang of something",
    type: "idiom",
    en: "If you get the hang of something, you learn how to do it properly, usually after some practice, until it starts to feel easy and natural.",
    vi: "Nếu bạn \"get the hang of\" một việc gì đó, nghĩa là bạn dần nắm được cách làm, quen tay quen việc sau một thời gian luyện tập, đến mức cảm thấy dễ dàng và tự nhiên.",
    origin: "Nguồn gốc chính xác của thành ngữ này không hoàn toàn rõ ràng, nhưng cách giải thích được nhiều người chấp nhận nhất liên quan đến từ \"hang\" theo nghĩa cũ là cách một dụng cụ hay vũ khí (như rìu, búa) \"treo\" hay cân bằng trong tay người dùng. Khi một người thợ quen tay, họ cảm nhận được độ cân bằng đó và sử dụng dụng cụ thuần thục hơn. Thành ngữ xuất hiện phổ biến trong tiếng Anh từ thế kỷ 19, ban đầu mang nghĩa khá cụ thể rồi dần mở rộng sang bất kỳ kỹ năng hay công việc nào.",
    examples: [
      { en: "It took me a few days to get the hang of the new keyboard, but now I can type much faster.", vi: "Tôi mất vài ngày mới quen được bàn phím mới, nhưng giờ tôi gõ nhanh hơn hẳn." },
      { en: "Don't worry if the software feels confusing at first — you'll get the hang of it after using it a bit more.", vi: "Đừng lo nếu phần mềm này lúc đầu thấy rối, dùng thêm một chút bạn sẽ quen tay ngay thôi." }
    ],
    ex: "It took me a few days to get the hang of the new keyboard, but now I can type much faster.",
  },
  {
    slug: "get-the-picture",
    term: "get the picture",
    type: "idiom",
    en: "If you get the picture, you understand the general situation or the main point of something, often after someone has explained or shown it to you.",
    vi: "Nếu bạn \"get the picture\", nghĩa là bạn đã hiểu được tình hình chung hoặc ý chính của vấn đề, thường là sau khi được ai đó giải thích hay minh hoạ cho.",
    origin: "Đây là một thành ngữ tương đối hiện đại, dùng hình ảnh trực quan làm ẩn dụ: khi ta \"nhìn thấy bức tranh\" (the picture), ta nắm được toàn cảnh sự việc thay vì chỉ từng mảnh rời rạc. Cách nói này có lẽ phổ biến hơn cùng với sự phát triển của nhiếp ảnh và điện ảnh trong thế kỷ 20, khi hình ảnh trở thành phương tiện quen thuộc để truyền đạt thông tin một cách nhanh và trọn vẹn.",
    examples: [
      { en: "She showed me the sales chart for a minute and I immediately got the picture — profits were falling fast.", vi: "Cô ấy chỉ cho tôi biểu đồ doanh số trong một phút và tôi hiểu ngay vấn đề — lợi nhuận đang giảm nhanh." },
      { en: "I don't need every detail, just give me a summary so I can get the picture.", vi: "Tôi không cần từng chi tiết một, chỉ cần tóm tắt để tôi nắm được tình hình chung là được." }
    ],
    ex: "She showed me the sales chart for a minute and I immediately got the picture — profits were falling fast.",
  },
  {
    slug: "get-the-wrong-end-of-the-stick-or-get-hold-of-the-wrong-end-of-the-stick",
    term: "get the wrong end of the stick or get hold of the wrong end of the stick",
    type: "idiom",
    en: "If you get the wrong end of the stick, you misunderstand a situation completely, often reaching a conclusion that is the opposite of what was actually meant.",
    vi: "Nếu bạn \"get the wrong end of the stick\", nghĩa là bạn hiểu sai hoàn toàn về một chuyện gì đó, thậm chí hiểu theo hướng ngược hẳn với ý ban đầu.",
    origin: "Nguồn gốc chính xác của thành ngữ này không rõ ràng và có nhiều cách giải thích dân gian khác nhau. Một cách giải thích phổ biến (dù chưa được xác nhận chắc chắn) cho rằng thành ngữ liên quan đến việc cầm một cây gậy dùng để dò đường hay chống đỡ — nếu cầm nhầm đầu, người ta sẽ mất thăng bằng hoặc gặp bất lợi. Vì tính hình tượng dễ hiểu, thành ngữ đã được dùng rộng rãi trong tiếng Anh Anh từ lâu để chỉ việc hiểu sai vấn đề.",
    examples: [
      { en: "I thought she was angry with me, but I had got the wrong end of the stick — she was actually worried about her own exam.", vi: "Tôi tưởng cô ấy giận tôi, nhưng hoá ra tôi đã hiểu nhầm — thực ra cô ấy đang lo lắng về kỳ thi của chính mình." },
      { en: "You've got hold of the wrong end of the stick; I never said the project was cancelled, only delayed.", vi: "Bạn hiểu sai rồi đấy; tôi chưa bao giờ nói dự án bị huỷ, chỉ là bị hoãn lại thôi." }
    ],
    ex: "I thought she was angry with me, but I had got the wrong end of the stick — she was actually worried about her own exam.",
  },
  {
    slug: "get-your-head-around-something-or-get-your-head-round-something",
    term: "get your head around something or get your head round something",
    type: "idiom",
    en: "If you get your head around something, you finally manage to understand a difficult or complicated idea after thinking about it carefully.",
    vi: "Nếu bạn \"get your head around\" một điều gì đó, nghĩa là bạn cuối cùng cũng hiểu được một vấn đề khó hoặc phức tạp sau khi đã suy nghĩ kỹ.",
    origin: "Thành ngữ này dùng hình ảnh khá trực tiếp: đầu (head) tượng trưng cho trí óc, còn việc \"bao quanh\" (around/round) một vật thể ám chỉ việc lĩnh hội trọn vẹn một khái niệm, giống như tay ôm trọn một vật. Đây là cách diễn đạt tương đối hiện đại trong tiếng Anh nói, phổ biến từ khoảng giữa thế kỷ 20, và thường được dùng khi nói về những ý tưởng trừu tượng hoặc kỹ thuật khó nắm bắt.",
    examples: [
      { en: "It took me weeks to get my head around the new tax rules at work.", vi: "Tôi mất mấy tuần mới hiểu nổi các quy định thuế mới ở chỗ làm." },
      { en: "I still can't quite get my head round how quantum computers actually work.", vi: "Tôi vẫn chưa thể hiểu nổi máy tính lượng tử thực sự hoạt động như thế nào." }
    ],
    ex: "It took me weeks to get my head around the new tax rules at work.",
  },
  {
    slug: "go-in-one-ear-and-out-the-other",
    term: "go in one ear and out the other",
    type: "idiom",
    en: "If something goes in one ear and out the other, it is heard but quickly forgotten or ignored, without making any lasting impression.",
    vi: "Nếu điều gì đó \"go in one ear and out the other\", nghĩa là nó được nghe thấy nhưng nhanh chóng bị quên hoặc bị bỏ ngoài tai, không để lại ấn tượng gì.",
    origin: "Đây là một hình ảnh rất cổ và trực quan: âm thanh đi vào một bên tai rồi thoát ra ngay bên tai kia mà không dừng lại trong đầu để được ghi nhớ. Những cách nói tương tự về việc lời nói \"lướt qua\" người nghe đã xuất hiện từ thời cổ đại trong nhiều ngôn ngữ châu Âu, và dạng tiếng Anh hiện tại được ghi nhận đã tồn tại ít nhất từ vài thế kỷ trước, cho thấy đây là một ẩn dụ phổ quát về sự lơ đãng khi nghe.",
    examples: [
      { en: "I've told him to tidy his room a hundred times, but it just goes in one ear and out the other.", vi: "Tôi đã bảo nó dọn phòng cả trăm lần rồi mà cứ như nước đổ đầu vịt." },
      { en: "The manager's warnings went in one ear and out the other, and the same mistakes happened again.", vi: "Những lời cảnh báo của quản lý chẳng ai để tâm, thế là lỗi cũ lại tái diễn." }
    ],
    ex: "I've told him to tidy his room a hundred times, but it just goes in one ear and out the other.",
  },
  {
    slug: "a-grey-area",
    term: "a grey area",
    type: "idiom",
    en: "A grey area is a situation, topic, or set of rules that is not clearly defined, so it is hard to say exactly what is right, wrong, allowed, or true.",
    vi: "\"A grey area\" là một tình huống, chủ đề hoặc quy định không được xác định rõ ràng, khiến người ta khó nói chắc điều gì đúng, sai, được phép hay không.",
    origin: "Thành ngữ này dùng phép ẩn dụ về màu sắc: đen và trắng tượng trưng cho những gì rõ ràng, dứt khoát (đúng/sai, được/không được), còn màu xám là sự pha trộn nằm ở giữa, không thuộc hẳn về bên nào. Cách dùng \"grey area\" theo nghĩa bóng này trở nên phổ biến trong tiếng Anh từ giữa thế kỷ 20, đặc biệt trong các lĩnh vực pháp luật, đạo đức và quản lý, nơi ranh giới đúng sai thường không tuyệt đối.",
    examples: [
      { en: "Whether employees can use company laptops for personal emails is a bit of a grey area in our office.", vi: "Việc nhân viên có được dùng laptop công ty để kiểm tra email cá nhân hay không vẫn là một vùng xám ở văn phòng tôi." },
      { en: "The new copyright law leaves a grey area around content created with AI tools.", vi: "Luật bản quyền mới vẫn còn một khoảng mập mờ liên quan đến nội dung được tạo ra bằng công cụ AI." }
    ],
    ex: "Whether employees can use company laptops for personal emails is a bit of a grey area in our office.",
  },
  {
    slug: "not-have-a-clue",
    term: "not have a clue",
    type: "idiom",
    en: "If you do not have a clue about something, you have absolutely no idea or understanding of it at all.",
    vi: "Nếu bạn \"not have a clue\" về điều gì đó, nghĩa là bạn hoàn toàn không có chút ý niệm hay hiểu biết gì về nó.",
    origin: "Từ \"clue\" bắt nguồn từ \"clew\", nghĩa cổ là một cuộn hoặc chỉ sợi len/chỉ dùng để dẫn đường. Nguồn gốc này thường được liên hệ với truyền thuyết Hy Lạp về Theseus, người đã dùng một cuộn chỉ do Ariadne đưa để tìm đường ra khỏi mê cung sau khi giết quái vật Minotaur. Từ hình ảnh sợi chỉ dẫn đường đó, \"clue\" dần mang nghĩa là manh mối giúp tìm ra lời giải, và \"not have a clue\" có nghĩa là không có bất kỳ manh mối hay đầu mối nào để hiểu vấn đề.",
    examples: [
      { en: "I don't have a clue how to fix this printer — maybe we should call technical support.", vi: "Tôi chẳng biết cách nào sửa cái máy in này cả — chắc phải gọi bộ phận kỹ thuật thôi." },
      { en: "He hasn't got a clue what's going on in the meeting because he arrived twenty minutes late.", vi: "Anh ta chẳng hiểu gì về cuộc họp cả vì đến muộn tận hai mươi phút." }
    ],
    ex: "I don't have a clue how to fix this printer — maybe we should call technical support.",
  },
  {
    slug: "jump-to-conclusions",
    term: "jump to conclusions",
    type: "idiom",
    en: "If you jump to conclusions, you decide that something is true too quickly, before you have enough facts or evidence to be sure.",
    vi: "Nếu bạn \"jump to conclusions\", nghĩa là bạn vội vàng kết luận điều gì đó là đúng trước khi có đủ thông tin hay bằng chứng chắc chắn.",
    origin: "Thành ngữ này dùng hình ảnh của một cú \"nhảy\" (jump), tức là bỏ qua các bước suy luận, cân nhắc trung gian cần thiết để đi thẳng đến kết luận cuối cùng, giống như nhảy qua một khoảng đất thay vì đi từng bước qua nó. Cách diễn đạt này xuất hiện trong tiếng Anh từ khá lâu và đến nay vẫn là một trong những thành ngữ phổ biến nhất để phê phán lối suy nghĩ hấp tấp, thiếu căn cứ.",
    examples: [
      { en: "Don't jump to conclusions — we don't know yet why she cancelled the meeting.", vi: "Đừng vội kết luận — chúng ta chưa biết vì sao cô ấy huỷ cuộc họp đâu." },
      { en: "He saw the two of them talking and jumped to conclusions, assuming they were planning something behind his back.", vi: "Anh ta thấy hai người nói chuyện liền vội suy diễn, cho rằng họ đang bàn tính gì đó sau lưng mình." }
    ],
    ex: "Don't jump to conclusions — we don't know yet why she cancelled the meeting.",
  },
  {
    slug: "put-two-and-two-together",
    term: "put two and two together",
    type: "idiom",
    en: "If you put two and two together, you work out the truth or reach an obvious conclusion by combining separate pieces of information you already have.",
    vi: "Nếu bạn \"put two and two together\", nghĩa là bạn ghép nối các thông tin rời rạc đã biết lại để tự suy ra sự thật hoặc một kết luận hiển nhiên.",
    origin: "Thành ngữ này dùng phép ẩn dụ toán học đơn giản: hai cộng hai bằng bốn là một phép tính ai cũng biết chắc chắn và dễ dàng. Khi \"ghép hai với hai lại\", người ta ngụ ý việc kết hợp những dữ kiện nhỏ, riêng lẻ để tự nhiên rút ra một kết luận rõ ràng, giống như một phép tính cơ bản không cần giải thích thêm. Cách nói này đã xuất hiện trong tiếng Anh từ nhiều thế kỷ trước và vẫn được dùng phổ biến cho đến nay.",
    examples: [
      { en: "When I saw his suitcase by the door and the plane ticket on the table, I put two and two together and realized he was leaving.", vi: "Khi thấy vali của anh ấy để cạnh cửa và vé máy bay trên bàn, tôi ghép các chi tiết lại và nhận ra anh ấy sắp rời đi." },
      { en: "The detective put two and two together after noticing the same car near both crime scenes.", vi: "Vị thám tử đã ghép nối các manh mối lại sau khi để ý thấy cùng một chiếc xe xuất hiện gần cả hai hiện trường." }
    ],
    ex: "When I saw his suitcase by the door and the plane ticket on the table, I put two and two together and realized he was leaving.",
  },
  {
    slug: "read-between-the-lines",
    term: "read between the lines",
    type: "idiom",
    en: "If you read between the lines, you understand the real, hidden meaning of something that has not been said or written directly.",
    vi: "Nếu bạn \"read between the lines\", nghĩa là bạn hiểu được ý nghĩa thực sự, ẩn giấu của điều gì đó mà người ta không nói hoặc viết ra trực tiếp.",
    origin: "Thành ngữ này bắt nguồn từ kỹ thuật viết mật mã hoặc thư tín bí mật thời xưa, khi thông điệp thật được giấu bằng mực vô hình hoặc mã hoá ở khoảng trống giữa các dòng chữ của một văn bản trông có vẻ bình thường. Người nhận phải biết cách để đọc được nội dung ẩn giữa các dòng đó. Từ hình ảnh cụ thể này, thành ngữ dần được mở rộng sang nghĩa bóng, chỉ việc suy ra ý định hay cảm xúc thật sự đằng sau lời nói hoặc văn bản của ai đó.",
    examples: [
      { en: "He said everything was fine, but if you read between the lines, you could tell he was actually quite stressed.", vi: "Anh ấy nói mọi thứ vẫn ổn, nhưng nếu để ý kỹ thì có thể thấy thực ra anh ấy đang khá căng thẳng." },
      { en: "Reading between the lines of her email, I think she's not happy with how the project is going.", vi: "Đọc kỹ ẩn ý trong email của cô ấy, tôi nghĩ cô ấy không hài lòng với tiến độ của dự án." }
    ],
    ex: "He said everything was fine, but if you read between the lines, you could tell he was actually quite stressed.",
  },
  {
    slug: "take-something-on-board",
    term: "take something on board",
    type: "idiom",
    en: "If you take something on board, you accept a piece of advice, criticism, or new information and seriously consider or act on it.",
    vi: "Nếu bạn \"take something on board\", nghĩa là bạn tiếp nhận một lời khuyên, lời phê bình hay thông tin mới và nghiêm túc cân nhắc hoặc áp dụng nó.",
    origin: "Thành ngữ này có nguồn gốc từ hàng hải, trong đó \"on board\" nghĩa là ở trên tàu, và việc \"đưa lên tàu\" (take on board) vốn dùng để chỉ việc chất hàng hoá, thực phẩm hay hành khách lên tàu trước khi khởi hành. Từ hình ảnh tiếp nhận thứ gì đó có giá trị lên tàu để mang theo, thành ngữ được mở rộng sang nghĩa bóng: tiếp nhận một ý kiến hay thông tin mới và giữ nó lại để cân nhắc, giống như một món hàng hữu ích được đưa vào hành trình của mình.",
    examples: [
      { en: "I've taken your feedback on board and will change the design before the next meeting.", vi: "Tôi đã tiếp thu góp ý của bạn và sẽ chỉnh sửa thiết kế trước cuộc họp tới." },
      { en: "The coach took the players' concerns on board and adjusted the training schedule.", vi: "Huấn luyện viên đã lắng nghe những lo ngại của các cầu thủ và điều chỉnh lại lịch tập luyện." }
    ],
    ex: "I've taken your feedback on board and will change the design before the next meeting.",
  },
  {
    slug: "up-to-speed",
    term: "up to speed",
    type: "idiom",
    en: "If you are up to speed on something, you have the latest information about it, or you have reached the level of skill and knowledge needed to perform well.",
    vi: "Nếu bạn \"up to speed\" về điều gì đó, nghĩa là bạn đã nắm được thông tin mới nhất, hoặc đã đạt đủ trình độ, kỹ năng cần thiết để làm tốt việc đó.",
    origin: "Thành ngữ này có nguồn gốc từ lĩnh vực kỹ thuật và máy móc, nơi một cỗ máy hay động cơ được coi là \"đạt tốc độ\" (up to speed) khi nó đã vận hành ở tốc độ hoạt động bình thường, ổn định sau khi khởi động. Từ hình ảnh máy móc vận hành trơn tru ở đúng tốc độ, cách nói này được mở rộng sang con người, chỉ việc một người đã được cập nhật đầy đủ thông tin hoặc đã thành thạo công việc để có thể hoạt động hiệu quả, không bị chậm hay lạc hậu so với người khác.",
    examples: [
      { en: "Can you get the new employee up to speed on our safety procedures by Friday?", vi: "Bạn có thể giúp nhân viên mới nắm rõ các quy trình an toàn của chúng ta trước thứ Sáu không?" },
      { en: "I've been away for two weeks, so I need someone to bring me up to speed on what happened.", vi: "Tôi vắng mặt hai tuần rồi, nên cần ai đó cập nhật cho tôi biết chuyện gì đã xảy ra." }
    ],
    ex: "Can you get the new employee up to speed on our safety procedures by Friday?",
  }
  ],
  "memory-and-mind": [
  {
    slug: "bear-something-in-mind-or-keep-something-in-mind",
    term: "bear something in mind or keep something in mind",
    type: "idiom",
    en: "If you bear something in mind or keep something in mind, you remember it and take it into account, especially while making a decision or doing something else.",
    vi: "Nếu bạn \"bear something in mind\" hay \"keep something in mind\", nghĩa là bạn ghi nhớ và luôn để tâm đến điều đó, nhất là khi cân nhắc quyết định hay làm việc gì khác.",
    origin: "Trong tiếng Anh cổ, động từ \"bear\" có nghĩa là mang, chở, hoặc giữ một thứ gì đó bên mình. Cụm này coi tâm trí (mind) như một cái túi hay một không gian chứa đựng, nơi ta \"mang theo\" hoặc \"giữ lại\" một ý nghĩ để không quên nó. Cách hình dung tâm trí như một vật chứa (container) là một ẩn dụ rất phổ biến trong tiếng Anh, xuất hiện ở nhiều thành ngữ khác liên quan đến \"mind\".",
    examples: [
      { en: "Please bear in mind that the office will be closed next Monday for the public holiday.", vi: "Xin lưu ý rằng văn phòng sẽ đóng cửa vào thứ Hai tới vì nghỉ lễ." },
      { en: "Keep in mind that the last train leaves at eleven, so we shouldn't stay too late.", vi: "Nhớ là chuyến tàu cuối chạy lúc mười một giờ, nên chúng ta đừng ở lại quá muộn." }
    ],
    ex: "Please bear in mind that the office will be closed next Monday for the public holiday.",
  },
  {
    slug: "cross-your-mind",
    term: "cross your mind",
    type: "idiom",
    en: "If a thought or idea crosses your mind, it occurs to you suddenly and briefly, often without you having looked for it.",
    vi: "Nếu một ý nghĩ \"cross your mind\", nghĩa là nó bất chợt lóe lên trong đầu bạn, thường là thoáng qua và không hề chủ động nghĩ tới.",
    origin: "Thành ngữ này dùng hình ảnh tâm trí như một không gian mà các ý nghĩ có thể \"băng qua\" (cross), giống như một người hay một chiếc xe đi ngang qua một con đường. Ý nghĩ chỉ lướt qua trong chốc lát rồi có thể biến mất, giống hệt cách một vật thể di chuyển ngang qua tầm nhìn của ta rồi đi khuất.",
    examples: [
      { en: "It never crossed my mind that she might already know about the surprise party.", vi: "Tôi chưa bao giờ nghĩ đến chuyện cô ấy có thể đã biết về bữa tiệc bất ngờ đó." },
      { en: "The thought of quitting his job crossed his mind more than once during the stressful project.", vi: "Ý nghĩ nghỉ việc đã thoáng qua đầu anh ấy không chỉ một lần trong suốt dự án căng thẳng đó." }
    ],
    ex: "It never crossed my mind that she might already know about the surprise party.",
  },
  {
    slug: "food-for-thought",
    term: "food for thought",
    type: "idiom",
    en: "Food for thought is information, an idea, or an experience that makes you think seriously about a particular subject.",
    vi: "\"Food for thought\" là những thông tin, ý tưởng hay trải nghiệm khiến bạn phải suy nghĩ, ngẫm nghĩ nghiêm túc về một vấn đề nào đó.",
    origin: "Thành ngữ này dùng phép ẩn dụ so sánh thức ăn nuôi dưỡng cơ thể với ý tưởng \"nuôi dưỡng\" trí óc. Cũng như thức ăn cho ta năng lượng để sống, những ý tưởng hay câu hỏi đáng suy ngẫm cũng cung cấp \"chất liệu\" để bộ não tiếp tục xử lý và phát triển suy nghĩ.",
    examples: [
      { en: "The documentary about climate change gave the students a lot of food for thought.", vi: "Bộ phim tài liệu về biến đổi khí hậu đã cho các em học sinh rất nhiều điều để suy ngẫm." },
      { en: "Her comment about how we spend our free time really was food for thought for me.", vi: "Câu nhận xét của cô ấy về cách chúng ta dùng thời gian rảnh thực sự khiến tôi phải suy nghĩ." }
    ],
    ex: "The documentary about climate change gave the students a lot of food for thought.",
  },
  {
    slug: "a-gut-reaction",
    term: "a gut reaction",
    type: "idiom",
    en: "A gut reaction is an instinctive feeling or response to something that comes immediately, based on emotion rather than careful, logical thought.",
    vi: "\"A gut reaction\" là phản ứng bản năng, tức thời với điều gì đó, dựa trên cảm nhận trực giác chứ không phải suy nghĩ, phân tích kỹ càng.",
    origin: "\"Gut\" nghĩa là ruột, dạ dày. Từ xa xưa, nhiều nền văn hóa tin rằng cảm xúc và trực giác mạnh mẽ bắt nguồn từ vùng bụng chứ không phải từ não bộ, ví dụ cảm giác \"cồn cào\" hay \"quặn thắt\" trong bụng khi lo lắng hoặc sợ hãi. Vì vậy \"gut\" trở thành biểu tượng cho phản ứng bản năng, chưa qua suy xét lý trí.",
    examples: [
      { en: "My gut reaction was to say no, but I decided to think it over for a day.", vi: "Phản ứng bản năng của tôi là từ chối ngay, nhưng tôi quyết định suy nghĩ thêm một ngày." },
      { en: "What's your gut reaction to the new logo design?", vi: "Cảm nhận đầu tiên của bạn về mẫu logo mới là gì?" }
    ],
    ex: "My gut reaction was to say no, but I decided to think it over for a day.",
  },
  {
    slug: "lose-the-plot",
    term: "lose the plot",
    type: "idiom",
    en: "If someone loses the plot, they stop thinking or behaving in a sensible, rational way, or they lose touch with what is really happening or what matters.",
    vi: "Nếu ai đó \"lose the plot\", nghĩa là họ không còn suy nghĩ, hành xử tỉnh táo và hợp lý nữa, hoặc mất đi khả năng nắm bắt thực tế/điều quan trọng đang diễn ra.",
    origin: "\"Plot\" nghĩa là cốt truyện của một cuốn sách hay bộ phim. Khi xem phim hoặc đọc truyện mà không theo kịp diễn biến, người ta nói là \"lost the plot\" - mất mạch truyện. Từ nghĩa đen này, thành ngữ được mở rộng sang nghĩa bóng: một người \"mất mạch\" với chính cuộc sống hay lý trí của mình, không còn suy nghĩ mạch lạc như trước.",
    examples: [
      { en: "Honestly, I think the manager has completely lost the plot with these new rules.", vi: "Thật lòng mà nói, tôi nghĩ ông quản lý đã hoàn toàn mất kiểm soát với mấy quy định mới này." },
      { en: "He started shouting at strangers in the street - it seemed like he'd lost the plot.", vi: "Anh ta bắt đầu quát tháo những người lạ ngoài đường - có vẻ như anh ta đã mất bình tĩnh, không còn tỉnh táo." }
    ],
    ex: "Honestly, I think the manager has completely lost the plot with these new rules.",
  },
  {
    slug: "miles-away",
    term: "miles away",
    type: "idiom",
    en: "If someone is miles away, they are so lost in their own thoughts that they are not paying attention to what is happening around them.",
    vi: "Nếu ai đó \"miles away\", nghĩa là họ đang mải suy nghĩ vẩn vơ đến mức không hề chú ý đến những gì đang diễn ra xung quanh.",
    origin: "Thành ngữ này dùng khoảng cách vật lý (hàng dặm) để diễn tả khoảng cách tinh thần. Khi đầu óc mải mê nghĩ về chuyện gì đó, người ta có cảm giác như tâm trí đã \"đi xa\" khỏi thực tại, dù cơ thể vẫn đang ở đó, giống như đang ở cách xa hàng dặm so với hiện tại.",
    examples: [
      { en: "Sorry, could you repeat that? I was miles away, thinking about the weekend.", vi: "Xin lỗi, bạn nhắc lại được không? Tôi vừa mải suy nghĩ vẩn vơ về kỳ nghỉ cuối tuần." },
      { en: "She looked miles away during the meeting, staring blankly out of the window.", vi: "Cô ấy trông như đang suy nghĩ đâu đâu trong suốt cuộc họp, mắt nhìn vô định ra ngoài cửa sổ." }
    ],
    ex: "Sorry, could you repeat that? I was miles away, thinking about the weekend.",
  },
  {
    slug: "a-mind-like-a-sieve",
    term: "a mind like a sieve",
    type: "idiom",
    en: "If you have a mind like a sieve, you forget things very easily and often, as if information cannot stay in your memory for long.",
    vi: "Nếu bạn có \"a mind like a sieve\", nghĩa là bạn rất hay quên, thông tin dường như không lưu lại được trong đầu bạn lâu.",
    origin: "\"Sieve\" là cái rây hoặc cái sàng, một dụng cụ có nhiều lỗ nhỏ để lọc, khiến những vật nhỏ hoặc chất lỏng lọt qua và rơi ra ngoài. Thành ngữ này ví trí nhớ của một người giống như cái rây đó: thông tin đi vào nhưng lại nhanh chóng \"lọt\" ra ngoài, không được giữ lại.",
    examples: [
      { en: "I'm sorry I forgot your birthday again - I have a mind like a sieve these days.", vi: "Xin lỗi vì tôi lại quên mất sinh nhật bạn - dạo này trí nhớ tôi kém lắm, nhớ trước quên sau." },
      { en: "He has a mind like a sieve when it comes to remembering people's names.", vi: "Anh ấy nhớ tên người khác rất kém, cứ nghe xong là quên ngay." }
    ],
    ex: "I'm sorry I forgot your birthday again - I have a mind like a sieve these days.",
  },
  {
    slug: "off-the-top-of-your-head",
    term: "off the top of your head",
    type: "idiom",
    en: "If you say something off the top of your head, you say it immediately from memory or quick thought, without looking anything up or preparing carefully in advance.",
    vi: "Nếu bạn nói điều gì đó \"off the top of your head\", nghĩa là bạn nói ngay từ trí nhớ hoặc suy nghĩ tức thời, không cần tra cứu hay chuẩn bị kỹ trước.",
    origin: "Cụm từ này nhắc đến \"đỉnh đầu\" (top of the head) như nơi những ý nghĩ đầu tiên, chưa qua chọn lọc kỹ càng, xuất hiện. Ý tưởng bật ra ngay lập tức, như thể nó nằm ngay trên bề mặt của tâm trí chứ chưa cần đào sâu suy nghĩ hay tìm kiếm tài liệu.",
    examples: [
      { en: "I can't remember his phone number off the top of my head, but I can check my contacts.", vi: "Tôi không nhớ ngay được số điện thoại của anh ấy, nhưng tôi có thể kiểm tra trong danh bạ." },
      { en: "Off the top of my head, I'd say around fifty people came to the event, but let me check the list.", vi: "Nghĩ ngay không cần tra cứu thì tôi đoán có khoảng năm mươi người đến sự kiện, nhưng để tôi kiểm tra danh sách lại." }
    ],
    ex: "I can't remember his phone number off the top of my head, but I can check my contacts.",
  },
  {
    slug: "off-your-head",
    term: "off your head",
    type: "idiom",
    en: "If someone is off their head, they are behaving in a crazy, foolish, or completely irrational way; informally it can also suggest someone is drunk or under the influence of drugs.",
    vi: "Nếu ai đó bị nói là \"off your head\", nghĩa là họ đang hành động điên rồ, ngớ ngẩn hoặc hoàn toàn thiếu lý trí; theo cách nói thân mật, cụm này đôi khi còn ám chỉ ai đó đang say xỉn hoặc phê thuốc.",
    origin: "\"Off\" ở đây mang nghĩa \"tách rời khỏi\", nên \"off your head\" gợi hình ảnh một người đã tách rời khỏi chính cái đầu/lý trí của mình, tức không còn suy nghĩ tỉnh táo, đúng đắn như bình thường. Đây là cách nói thông tục, thường mang sắc thái phóng đại hoặc trách móc nhẹ nhàng, phổ biến trong tiếng Anh Anh.",
    examples: [
      { en: "Are you off your head? You can't drive home after drinking that much!", vi: "Cậu điên à? Uống nhiều như thế rồi mà đòi lái xe về nhà!" },
      { en: "He must be off his head to quit a stable job without any other plan.", vi: "Anh ta chắc phải mất trí mới nghỉ việc ổn định như vậy mà không có kế hoạch gì khác." }
    ],
    ex: "Are you off your head? You can't drive home after drinking that much!",
  },
  {
    slug: "on-the-tip-of-your-tongue",
    term: "on the tip of your tongue",
    type: "idiom",
    en: "If a word or name is on the tip of your tongue, you are trying hard to remember it and feel that you almost know it, but you cannot recall it at that exact moment.",
    vi: "Nếu một từ hay cái tên nào đó \"on the tip of your tongue\", nghĩa là bạn đang cố nhớ ra nó, cảm giác như biết rất rõ nhưng nhất thời không thể bật ra được.",
    origin: "Cụm từ này dùng hình ảnh nghĩa đen \"đầu lưỡi\" (tip of the tongue) - vị trí gần nhất với việc phát âm ra lời. Khi một từ đã ở \"ngay đầu lưỡi\" nghĩa là nó gần như sắp được nói ra, chỉ còn thiếu chút nữa là bật thành tiếng, diễn tả rất sát cảm giác nhớ mang máng nhưng chưa thể diễn đạt thành lời.",
    examples: [
      { en: "Her name is on the tip of my tongue, but I just can't remember it right now.", vi: "Tên của cô ấy cứ ở ngay đầu lưỡi tôi mà tôi vẫn không tài nào nhớ ra được lúc này." },
      { en: "What's that actor's name... it's on the tip of my tongue!", vi: "Tên của diễn viên đó là gì nhỉ... nó cứ ở ngay đầu lưỡi tôi ấy!" }
    ],
    ex: "Her name is on the tip of my tongue, but I just can't remember it right now.",
  },
  {
    slug: "out-of-your-mind",
    term: "out of your mind",
    type: "idiom",
    en: "If you are out of your mind, you are behaving in an extremely foolish, reckless, or crazy way, or you are extremely worried or anxious about something.",
    vi: "Nếu bạn \"out of your mind\", nghĩa là bạn đang hành động vô cùng dại dột, liều lĩnh hoặc điên rồ, hoặc đang cực kỳ lo lắng, bất an về điều gì đó.",
    origin: "Thành ngữ này tiếp tục dùng phép ẩn dụ coi tâm trí như một không gian, nơi con người \"ở trong\" khi còn tỉnh táo. \"Out of\" (ra khỏi) tâm trí nghĩa là không còn nằm trong trạng thái suy nghĩ bình thường, tỉnh táo nữa - có thể vì quá sợ hãi, lo lắng, hoặc hành động quá liều lĩnh, mất kiểm soát.",
    examples: [
      { en: "You must be out of your mind to go hiking alone in this storm!", vi: "Bạn chắc phải điên mới đi leo núi một mình giữa cơn bão thế này!" },
      { en: "I was out of my mind with worry until she finally called to say she was safe.", vi: "Tôi lo lắng đến phát điên cho đến khi cô ấy cuối cùng gọi điện báo là đã an toàn." }
    ],
    ex: "You must be out of your mind to go hiking alone in this storm!",
  },
  {
    slug: "rack-your-brain",
    term: "rack your brain",
    type: "idiom",
    en: "If you rack your brain, you think very hard and for a long time, trying to remember something or to solve a difficult problem.",
    vi: "Nếu bạn \"rack your brain\", nghĩa là bạn suy nghĩ hết sức căng thẳng và trong thời gian dài để cố nhớ ra điều gì đó hoặc giải quyết một vấn đề khó khăn.",
    origin: "\"Rack\" nguyên là tên một dụng cụ tra tấn thời Trung Cổ, dùng để kéo căng cơ thể nạn nhân đến mức đau đớn tột cùng nhằm ép cung. Từ hình ảnh đó, \"rack your brain\" mang nghĩa bóng là \"kéo căng\", \"vắt kiệt\" bộ não của mình để cố moi ra một ký ức hay lời giải, diễn tả cảm giác cố gắng đến mức mệt mỏi, căng thẳng.",
    examples: [
      { en: "I've been racking my brain all morning trying to remember where I put the keys.", vi: "Cả buổi sáng tôi cứ vắt óc suy nghĩ để cố nhớ ra mình đã để chìa khóa ở đâu." },
      { en: "We racked our brains for hours but still couldn't solve the last puzzle.", vi: "Chúng tôi đã vắt óc suy nghĩ hàng giờ liền nhưng vẫn không giải được câu đố cuối cùng." }
    ],
    ex: "I've been racking my brain all morning trying to remember where I put the keys.",
  },
  {
    slug: "ring-a-bell",
    term: "ring a bell",
    type: "idiom",
    en: "If something rings a bell, it sounds familiar to you, even though you may not remember the exact details about it.",
    vi: "Nếu điều gì đó \"ring a bell\" với bạn, nghĩa là nó nghe quen quen, gợi cho bạn cảm giác từng biết đến dù không nhớ rõ chi tiết cụ thể.",
    origin: "Thành ngữ này ví trí nhớ được \"đánh thức\" giống như một chiếc chuông vang lên để báo hiệu hoặc nhắc nhở điều gì đó. Tiếng chuông vốn dùng để thu hút sự chú ý hay báo tin, vì vậy khi một cái tên hay sự việc \"làm chuông reo\" trong đầu, nó có nghĩa là đã kích hoạt một mảnh ký ức quen thuộc, dù mờ nhạt.",
    examples: [
      { en: "The name Peterson rings a bell, but I can't remember where I heard it before.", vi: "Cái tên Peterson nghe quen quen, nhưng tôi không nhớ đã nghe ở đâu trước đây." },
      { en: "Does this address ring a bell? I think we might have visited this street before.", vi: "Địa chỉ này có nghe quen không? Tôi nghĩ chúng ta có thể đã từng đến con phố này rồi." }
    ],
    ex: "The name Peterson rings a bell, but I can't remember where I heard it before.",
  }
  ],
  "communicating": [
  {
    slug: "at-cross-purposes",
    term: "at cross purposes",
    type: "idiom",
    en: "When two people are at cross purposes, they are trying to communicate or work together but are actually misunderstanding each other, because each of them has a different aim or interpretation in mind without realizing it.",
    vi: "Khi hai người \"at cross purposes\", họ đang hiểu lầm nhau trong lúc trao đổi hoặc hợp tác, vì mỗi bên đang theo đuổi một mục đích hoặc cách hiểu khác nhau mà không hề hay biết.",
    origin: "\"Cross\" ở đây mang nghĩa \"giao nhau, chéo nhau\" — có thể hình dung mục đích của hai người như hai đường thẳng cắt chéo nhau thay vì chạy song song, khiến chúng lệch hướng với nhau. Cụm từ \"cross purposes\" đã xuất hiện trong tiếng Anh từ thế kỷ 18, ban đầu gắn với một trò chơi đối đáp mà câu trả lời cố tình không khớp với câu hỏi được đưa ra. Từ đó, nghĩa của cụm từ mở rộng sang mọi tình huống hai bên hiểu sai ý nhau vì đang nhắm tới những mục tiêu khác nhau.",
    examples: [
      { en: "We were at cross purposes for the whole meeting — I thought we were discussing the budget, and she thought we were talking about the schedule.", vi: "Cả cuộc họp chúng tôi đã hiểu lầm ý nhau — tôi tưởng đang bàn về ngân sách, còn cô ấy lại nghĩ là đang nói về lịch trình." },
      { en: "It turned out we had been at cross purposes all along; he wanted to renovate the kitchen while I was planning to sell the house.", vi: "Hóa ra chúng tôi đã hiểu sai ý nhau từ đầu; anh ấy muốn sửa lại bếp trong khi tôi lại đang định bán căn nhà." }
    ],
    ex: "We were at cross purposes for the whole meeting — I thought we were discussing the budget, and she thought we were talking about the schedule.",
  },
  {
    slug: "come-out-of-your-shell",
    term: "come out of your shell",
    type: "idiom",
    en: "If someone comes out of their shell, they become less shy and more confident or open in the way they talk and behave with other people.",
    vi: "\"Come out of your shell\" nghĩa là ai đó trở nên bớt rụt rè, cởi mở và tự tin hơn khi giao tiếp với người khác.",
    origin: "Cụm từ này bắt nguồn từ hình ảnh một số loài vật như rùa hay ốc sên rút mình vào trong lớp vỏ cứng để tự bảo vệ khi cảm thấy bị đe dọa hoặc lo sợ. Khi con vật cảm thấy an toàn trở lại, nó mới \"chui ra khỏi vỏ\" để di chuyển và tương tác với môi trường xung quanh. Người Anh mượn hình ảnh này để ví von một người nhút nhát dần trở nên mạnh dạn, sẵn sàng bộc lộ bản thân hơn với người khác.",
    examples: [
      { en: "She was very quiet at first, but after a few weeks in the drama club she really came out of her shell.", vi: "Ban đầu cô bé rất ít nói, nhưng sau vài tuần tham gia câu lạc bộ kịch, cô bé đã trở nên cởi mở hẳn lên." },
      { en: "Joining the debate team helped him come out of his shell and speak confidently in front of large groups.", vi: "Việc tham gia đội tranh biện đã giúp cậu ấy mạnh dạn hơn và tự tin nói trước đám đông." }
    ],
    ex: "She was very quiet at first, but after a few weeks in the drama club she really came out of her shell.",
  },
  {
    slug: "find-common-ground",
    term: "find common ground",
    type: "idiom",
    en: "If people find common ground, they discover shared interests, beliefs, or opinions that they can agree on, especially in a situation where they originally seemed to disagree.",
    vi: "\"Find common ground\" nghĩa là tìm ra những điểm chung, quan điểm hoặc lợi ích mà các bên đều đồng ý, nhất là khi ban đầu tưởng chừng như bất đồng.",
    origin: "Cụm từ này dùng \"ground\" (mặt đất, nền tảng) theo nghĩa ẩn dụ để chỉ một nền tảng chung mà hai bên có thể cùng \"đứng\" trên đó. Hình ảnh này gợi đến các cuộc đàm phán hay tranh luận, nơi hai phía cần tìm ra một vị trí trung lập để có thể tiếp tục đối thoại thay vì đối đầu nhau. Cách diễn đạt này trở nên phổ biến trong ngôn ngữ ngoại giao, chính trị và đàm phán từ đầu thế kỷ 20.",
    examples: [
      { en: "Despite their political differences, the two senators managed to find common ground on education reform.", vi: "Dù có khác biệt về chính trị, hai thượng nghị sĩ vẫn tìm được tiếng nói chung về cải cách giáo dục." },
      { en: "The negotiators spent hours trying to find common ground before finally agreeing on a price.", vi: "Các nhà đàm phán đã mất hàng giờ để tìm điểm chung trước khi cuối cùng thống nhất được mức giá." }
    ],
    ex: "Despite their political differences, the two senators managed to find common ground on education reform.",
  },
  {
    slug: "from-the-horse-s-mouth",
    term: "from the horse's mouth",
    type: "idiom",
    en: "If you hear something from the horse's mouth, you receive the information directly from the person who is most closely involved in or best informed about a matter, so it is considered highly reliable.",
    vi: "\"From the horse's mouth\" nghĩa là nghe tin trực tiếp từ chính người trong cuộc hoặc người nắm rõ nhất về vấn đề, nên thông tin đó được xem là đáng tin cậy.",
    origin: "Nguồn gốc phổ biến nhất được cho là từ giới đua ngựa và cá cược ở Anh, Mỹ vào đầu thế kỷ 20: người ta tin rằng cách chắc chắn nhất để biết một con ngựa có khỏe mạnh và có khả năng thắng cuộc hay không là kiểm tra ngay hàm răng của nó, vì tuổi và tình trạng sức khỏe con ngựa có thể được nhận biết qua răng. Từ hình ảnh \"hỏi thẳng miệng con ngựa\" đó, cụm từ dần được dùng ẩn dụ để chỉ việc lấy thông tin trực tiếp từ nguồn đáng tin nhất, thay vì nghe qua trung gian.",
    examples: [
      { en: "I didn't believe the rumor until I heard it from the horse's mouth — the manager himself confirmed it.", vi: "Tôi không tin lời đồn cho đến khi nghe chính miệng người quản lý xác nhận điều đó." },
      { en: "She wanted to get the news straight from the horse's mouth, so she called the CEO directly.", vi: "Cô ấy muốn nghe tin trực tiếp từ nguồn đáng tin nhất, nên đã gọi thẳng cho giám đốc điều hành." }
    ],
    ex: "I didn't believe the rumor until I heard it from the horse's mouth — the manager himself confirmed it.",
  },
  {
    slug: "get-your-wires-crossed-or-get-your-lines-crossed",
    term: "get your wires crossed or get your lines crossed",
    type: "idiom",
    en: "If two people get their wires crossed, they misunderstand each other or end up with different, conflicting information about the same situation, which often causes confusion.",
    vi: "\"Get your wires crossed\" nghĩa là hai người hiểu nhầm nhau hoặc có thông tin trái ngược nhau về cùng một việc, dẫn đến sự nhầm lẫn hoặc rối loạn.",
    origin: "Cụm từ này xuất phát từ thời kỳ đầu của điện thoại và điện báo, khi các đường dây (wires/lines) đôi khi bị đấu nối nhầm hoặc chồng chéo lên nhau, khiến cuộc gọi bị lẫn sang máy khác hoặc tín hiệu bị nhiễu loạn. Hình ảnh những sợi dây bị \"chéo\" nhau về mặt vật lý sau đó được chuyển sang nghĩa ẩn dụ, mô tả sự nhầm lẫn thông tin xảy ra giữa người với người.",
    examples: [
      { en: "I think we got our wires crossed — I was waiting at the cafe while you were waiting at the restaurant.", vi: "Chắc chúng ta đã hiểu nhầm nhau — tôi đợi ở quán cà phê trong khi bạn lại đợi ở nhà hàng." },
      { en: "Somehow we got our lines crossed about the meeting time, so half the team showed up an hour late.", vi: "Không hiểu sao chúng tôi lại nhầm lẫn về giờ họp, nên nửa đội đến trễ mất một tiếng." }
    ],
    ex: "I think we got our wires crossed — I was waiting at the cafe while you were waiting at the restaurant.",
  },
  {
    slug: "go-off-on-a-tangent-or-go-off-at-a-tangent",
    term: "go off on a tangent or go off at a tangent",
    type: "idiom",
    en: "If someone goes off on a tangent, they suddenly start talking or writing about a different subject that is only loosely, if at all, connected to the original topic.",
    vi: "\"Go off on a tangent\" nghĩa là đột ngột chuyển sang nói về một chủ đề khác, ít hoặc không liên quan gì đến vấn đề đang bàn.",
    origin: "\"Tangent\" vốn là một thuật ngữ hình học, chỉ đường thẳng chỉ chạm vào một đường cong tại đúng một điểm rồi tách hẳn sang hướng khác, không bao giờ quay trở lại đường cong đó nữa. Hình ảnh toán học này được mượn dùng ẩn dụ từ thế kỷ 19 để mô tả một cuộc trò chuyện hay bài viết \"tách hướng\" khỏi chủ đề chính, giống như đường tiếp tuyến tách khỏi đường cong ban đầu.",
    examples: [
      { en: "His answer started well, but halfway through he went off on a tangent about his college days.", vi: "Câu trả lời của anh ấy mở đầu khá tốt, nhưng đến giữa chừng thì anh ấy lại lạc sang chuyện thời sinh viên." },
      { en: "The teacher had to interrupt because the discussion kept going off at a tangent.", vi: "Giáo viên phải ngắt lời vì cuộc thảo luận cứ liên tục lạc đề." }
    ],
    ex: "His answer started well, but halfway through he went off on a tangent about his college days.",
  },
  {
    slug: "hear-something-through-the-grapevine-or-hear-something-on-the-grapevine",
    term: "hear something through the grapevine or hear something on the grapevine",
    type: "idiom",
    en: "If you hear something through the grapevine, you learn a piece of news or gossip informally, through a chain of people talking to each other, rather than from an official source.",
    vi: "\"Hear something through the grapevine\" nghĩa là nghe được tin tức hay chuyện phiếm qua lời đồn, truyền miệng từ người này sang người khác, chứ không phải từ một nguồn chính thức.",
    origin: "Cụm từ này bắt nguồn từ nước Mỹ giữa thế kỷ 19, gắn với hệ thống điện báo (telegraph) mới xuất hiện thời đó. Dây điện báo giăng trên các cột trông có phần giống những dây leo nho (grapevine) đan xen ngoằn ngoèo, và tin tức truyền qua kiểu \"grapevine telegraph\" — tức truyền miệng không chính thức — thường bị bóp méo hoặc thiếu chính xác so với tin truyền qua đường dây điện báo thật. Từ đó, \"grapevine\" trở thành hình ảnh ẩn dụ cho mạng lưới tin đồn truyền miệng.",
    examples: [
      { en: "I heard through the grapevine that the company is planning some layoffs next month.", vi: "Tôi nghe phong thanh rằng công ty đang định sa thải nhân viên vào tháng tới." },
      { en: "She heard on the grapevine that her colleague was leaving before it was officially announced.", vi: "Cô ấy nghe được tin đồn rằng đồng nghiệp mình sắp nghỉ việc trước khi có thông báo chính thức." }
    ],
    ex: "I heard through the grapevine that the company is planning some layoffs next month.",
  },
  {
    slug: "in-black-and-white",
    term: "in black and white",
    type: "idiom",
    en: "If information is in black and white, it is written down or printed clearly, which makes it official, definite, or impossible to deny.",
    vi: "\"In black and white\" nghĩa là thông tin được viết ra hoặc in ấn rõ ràng, khiến nó trở nên chính thức, dứt khoát và không thể chối cãi.",
    origin: "Cụm từ này xuất phát từ hình ảnh chữ mực đen trên nền giấy trắng — cách trình bày văn bản truyền thống, đối lập với lời nói miệng vốn dễ bị chối bỏ hay lãng quên. Khi một điều gì đó được ghi \"in black and white\", nó mang tính bằng chứng xác thực, khác hẳn với những lời hứa hay thỏa thuận chỉ trao đổi bằng miệng.",
    examples: [
      { en: "I want the agreement in black and white before we start the project, not just a verbal promise.", vi: "Tôi muốn có thỏa thuận bằng văn bản rõ ràng trước khi bắt đầu dự án, chứ không chỉ là lời hứa miệng." },
      { en: "It's right there in black and white in the contract — you're required to give thirty days' notice.", vi: "Điều đó đã được ghi rõ ràng trong hợp đồng — bạn phải báo trước ba mươi ngày." }
    ],
    ex: "I want the agreement in black and white before we start the project, not just a verbal promise.",
  },
  {
    slug: "in-the-loop",
    term: "in the loop",
    type: "idiom",
    en: "If you are in the loop, you are included in a group of people who receive information and are kept informed about what is happening regarding a particular matter.",
    vi: "\"In the loop\" nghĩa là được nằm trong nhóm những người nắm được thông tin, luôn được cập nhật tình hình về một vấn đề nào đó.",
    origin: "Cách diễn đạt này được cho là bắt nguồn từ Mỹ vào giữa thế kỷ 20, có thể liên quan đến khái niệm \"loop\" trong các hệ thống liên lạc hoặc mạch điện, nơi tín hiệu di chuyển tuần hoàn khép kín và mọi điểm trong mạch đều nhận được thông tin. Về sau, cụm từ được dùng phổ biến trong môi trường công sở và chính trị để chỉ việc ai đó được đưa vào danh sách nhận thông báo, email, hay được tham gia các cuộc thảo luận quan trọng.",
    examples: [
      { en: "Please keep me in the loop about any changes to the project timeline.", vi: "Làm ơn cập nhật cho tôi biết nếu có thay đổi gì về tiến độ dự án nhé." },
      { en: "He felt left out because nobody had kept him in the loop about the new policy.", vi: "Anh ấy cảm thấy bị bỏ rơi vì không ai thông báo cho anh về chính sách mới." }
    ],
    ex: "Please keep me in the loop about any changes to the project timeline.",
  },
  {
    slug: "keep-someone-posted",
    term: "keep someone posted",
    type: "idiom",
    en: "If you keep someone posted, you continue to give them the latest information about a situation as it develops or changes.",
    vi: "\"Keep someone posted\" nghĩa là liên tục cập nhật cho ai đó tình hình mới nhất khi có diễn biến hoặc thay đổi.",
    origin: "\"Posted\" ở đây bắt nguồn từ một nghĩa cũ của động từ \"post\" trong tiếng Anh là \"ghi chép, cập nhật sổ sách\", như trong kế toán \"to post the books\" nghĩa là cập nhật sổ cái. Người \"được post\" đầy đủ là người nắm thông tin mới và đầy đủ nhất. Từ nghĩa gốc trong kế toán này, cụm từ dần mở rộng sang nghĩa chung là cập nhật thông tin cho ai đó trong đời sống thường ngày.",
    examples: [
      { en: "Keep me posted on how the interview goes — I'll be waiting to hear from you.", vi: "Nhớ báo cho tôi biết tình hình buổi phỏng vấn thế nào nhé — tôi sẽ đợi tin từ bạn." },
      { en: "The doctor promised to keep the family posted on the patient's condition throughout the night.", vi: "Bác sĩ hứa sẽ liên tục cập nhật tình trạng bệnh nhân cho gia đình suốt đêm." }
    ],
    ex: "Keep me posted on how the interview goes — I'll be waiting to hear from you.",
  },
  {
    slug: "let-the-cat-out-of-the-bag",
    term: "let the cat out of the bag",
    type: "idiom",
    en: "If someone lets the cat out of the bag, they accidentally or carelessly reveal a secret that was supposed to be kept hidden.",
    vi: "\"Let the cat out of the bag\" nghĩa là vô tình hoặc bất cẩn tiết lộ một bí mật lẽ ra phải được giữ kín.",
    origin: "Một giả thuyết phổ biến cho rằng cụm từ này bắt nguồn từ một trò gian lận thời trung cổ ở các phiên chợ, khi người bán hàng gian dối tráo một con lợn con đang rao bán bằng một con mèo, rồi nhét vào bao tải để lừa người mua. Nếu ai đó vô tình mở bao ra, con mèo bị lộ ra ngoài và trò lừa đảo bị bại lộ theo. Tuy nhiên, nguồn gốc chính xác vẫn còn gây tranh cãi và chưa có bằng chứng lịch sử chắc chắn, nên đây chỉ là một trong những cách giải thích được nhiều người chấp nhận.",
    examples: [
      { en: "We were planning a surprise party, but my brother let the cat out of the bag by mentioning it to her.", vi: "Chúng tôi đang định tổ chức tiệc bất ngờ, nhưng em trai tôi đã lỡ miệng làm lộ chuyện với cô ấy." },
      { en: "Someone let the cat out of the bag about the merger before the official announcement was made.", vi: "Ai đó đã làm lộ chuyện sáp nhập trước khi có thông báo chính thức." }
    ],
    ex: "We were planning a surprise party, but my brother let the cat out of the bag by mentioning it to her.",
  },
  {
    slug: "put-someone-in-the-picture",
    term: "put someone in the picture",
    type: "idiom",
    en: "If you put someone in the picture, you give them all the necessary background information about a situation so that they fully understand it.",
    vi: "\"Put someone in the picture\" nghĩa là cung cấp đầy đủ thông tin nền cho ai đó để họ hiểu rõ tình hình.",
    origin: "Cụm từ này dùng hình ảnh một bức tranh hay bức ảnh (picture) như một ẩn dụ cho toàn cảnh của một tình huống. Khi ai đó \"được đưa vào bức tranh\", họ trở thành một phần của toàn cảnh đó, tức là hiểu được đầy đủ bối cảnh, thay vì đứng ngoài và chỉ biết những mảnh thông tin rời rạc. Cách nói này phổ biến trong tiếng Anh Anh từ đầu thế kỷ 20.",
    examples: [
      { en: "Before the meeting starts, let me put you in the picture about what happened last week.", vi: "Trước khi cuộc họp bắt đầu, để tôi cho bạn biết rõ chuyện gì đã xảy ra tuần trước." },
      { en: "The new manager asked her assistant to put her in the picture regarding the ongoing negotiations.", vi: "Người quản lý mới nhờ trợ lý của mình tóm tắt tình hình về các cuộc đàm phán đang diễn ra." }
    ],
    ex: "Before the meeting starts, let me put you in the picture about what happened last week.",
  },
  {
    slug: "spill-the-beans",
    term: "spill the beans",
    type: "idiom",
    en: "If someone spills the beans, they reveal secret or private information, often unintentionally or before the right time.",
    vi: "\"Spill the beans\" nghĩa là tiết lộ thông tin bí mật hoặc riêng tư, thường là vô tình hoặc trước thời điểm thích hợp.",
    origin: "Nguồn gốc chính xác của cụm từ này không hoàn toàn rõ ràng, nhưng một giả thuyết phổ biến cho rằng nó liên quan đến một hình thức bỏ phiếu kín cổ xưa ở Hy Lạp, trong đó các thành viên bỏ hạt đậu trắng hoặc đen vào một chiếc bình để biểu quyết đồng ý hay phản đối. Nếu ai đó vô tình làm đổ bình đậu ra ngoài trước khi kiểm phiếu, kết quả vốn được giữ bí mật sẽ bị lộ ra sớm. Dù câu chuyện này khá thú vị, nhiều nhà ngôn ngữ học cho rằng cụm từ thực ra chỉ mới phổ biến ở Mỹ vào đầu thế kỷ 20, và nguồn gốc Hy Lạp có thể chỉ là suy đoán về sau.",
    examples: [
      { en: "Don't spill the beans about the engagement until they announce it themselves.", vi: "Đừng để lộ chuyện đính hôn ra ngoài trước khi họ tự thông báo nhé." },
      { en: "He accidentally spilled the beans about the surprise trip during dinner.", vi: "Anh ấy vô tình làm lộ chuyện chuyến đi bất ngờ trong bữa tối." }
    ],
    ex: "Don't spill the beans about the engagement until they announce it themselves.",
  },
  {
    slug: "touch-base",
    term: "touch base",
    type: "idiom",
    en: "If you touch base with someone, you make brief contact with them, often to exchange updates or check on how things are going.",
    vi: "\"Touch base\" nghĩa là liên lạc ngắn gọn với ai đó, thường để trao đổi thông tin mới hoặc kiểm tra tình hình.",
    origin: "Cụm từ này bắt nguồn từ môn bóng chày (baseball) ở Mỹ, nơi người chạy phải chạm vào từng chốt (base) trên sân theo đúng thứ tự thì điểm mới được công nhận hợp lệ; nếu bỏ qua một chốt, điểm sẽ không được tính. Từ hình ảnh việc \"chạm chốt\" mang tính bắt buộc và xác nhận này, cụm từ được mở rộng nghĩa sang việc liên lạc ngắn gọn với ai đó để cập nhật hoặc xác nhận tình hình trước khi tiếp tục công việc.",
    examples: [
      { en: "Let's touch base again next week once you've had a chance to review the proposal.", vi: "Tuần sau khi bạn đã xem qua đề xuất, chúng ta liên lạc lại nhé." },
      { en: "I just wanted to touch base and see how the new project is progressing.", vi: "Tôi chỉ muốn liên hệ để hỏi thăm xem dự án mới đang tiến triển thế nào." }
    ],
    ex: "Let's touch base again next week once you've had a chance to review the proposal.",
  }
  ],
  "priorities-and-decisions": [
  {
    slug: "the-bottom-line",
    term: "the bottom line",
    type: "idiom",
    en: "The bottom line is the most important fact or conclusion in a situation, the essential point that matters most after everything else has been considered. It is often used to introduce the final, practical outcome of a discussion or decision.",
    vi: "Điều quan trọng nhất, cốt lõi của vấn đề, kết luận cuối cùng sau khi đã cân nhắc mọi thứ.",
    origin: "Thành ngữ này bắt nguồn từ lĩnh vực kế toán và tài chính, nơi dòng cuối cùng (bottom line) của một báo cáo lãi lỗ thể hiện con số lợi nhuận hoặc thua lỗ ròng - kết quả cuối cùng sau khi đã cộng trừ mọi khoản mục. Từ nghĩa tài chính cụ thể này, cách dùng đã mở rộng sang đời sống hàng ngày để chỉ điều quan trọng nhất, kết luận then chốt của bất kỳ vấn đề nào. Ngày nay thành ngữ được dùng rộng rãi trong kinh doanh, đàm phán và giao tiếp thường ngày.",
    examples: [
      { en: "We can debate the details all day, but the bottom line is we need more funding to finish the project.", vi: "Chúng ta có thể tranh luận chi tiết cả ngày, nhưng điều cốt yếu là chúng ta cần thêm kinh phí để hoàn thành dự án." },
      { en: "The bottom line is that customer satisfaction determines whether this business survives.", vi: "Điểm mấu chốt là sự hài lòng của khách hàng quyết định việc doanh nghiệp này có tồn tại được hay không." }
    ],
    ex: "We can debate the details all day, but the bottom line is we need more funding to finish the project.",
  },
  {
    slug: "cross-that-bridge-when-you-come-to-it",
    term: "cross that bridge when you come to it",
    type: "idiom",
    en: "This idiom means you should deal with a potential problem only when it actually happens, rather than worrying about it in advance. It is used to encourage someone not to waste energy on future difficulties that may never occur.",
    vi: "Chuyện gì đến hãy để đó tính sau; không nên lo lắng trước về những khó khăn có thể chưa xảy ra.",
    origin: "Hình ảnh của thành ngữ này gợi đến cảnh một người lữ hành đi trên đường, gặp một cây cầu ở phía trước nhưng chưa cần biết phải vượt qua nó bằng cách nào cho đến khi thực sự đứng trước cây cầu đó. Cách diễn đạt tương tự đã xuất hiện trong tiếng Anh từ giữa thế kỷ 19, ban đầu thường ở dạng \"cross a bridge before you come to it\" mang nghĩa phê phán việc lo xa vô ích. Về sau dạng phủ định \"don't cross that bridge until you come to it\" và biến thể \"when you come to it\" trở nên phổ biến hơn để khuyên nên tạm gác lo âu.",
    examples: [
      { en: "I don't know if we'll get approval, but let's cross that bridge when we come to it.", vi: "Tôi không biết liệu chúng ta có được phê duyệt hay không, nhưng chuyện đó tính sau khi nó thực sự xảy ra." },
      { en: "She refused to worry about next year's exams, saying she'd cross that bridge when she came to it.", vi: "Cô ấy từ chối lo lắng về kỳ thi năm sau, nói rằng chuyện đó để đến lúc xảy ra rồi tính." }
    ],
    ex: "I don't know if we'll get approval, but let's cross that bridge when we come to it.",
  },
  {
    slug: "cut-to-the-chase",
    term: "cut to the chase",
    type: "idiom",
    en: "To cut to the chase means to get straight to the main point of a matter without wasting time on unnecessary details or introductions. It is often used as a request for someone to stop delaying and say what really matters.",
    vi: "Đi thẳng vào vấn đề chính, bỏ qua những chi tiết rườm rà không cần thiết.",
    origin: "Thành ngữ này có nguồn gốc từ ngành công nghiệp điện ảnh Hollywood đầu thế kỷ 20, khi các bộ phim câm thường có những cảnh hội thoại hoặc giới thiệu dài dòng trước khi đến cảnh rượt đuổi gay cấn (the chase) - phần được khán giả yêu thích nhất. Cụm từ chỉ đạo \"cut to the chase\" nghĩa đen là ra lệnh cắt bỏ những cảnh rườm rà để chuyển ngay sang cảnh hành động chính. Từ đó, cách nói này được dùng ẩn dụ để chỉ việc bỏ qua phần mở đầu dài dòng và đi thẳng vào nội dung quan trọng.",
    examples: [
      { en: "Let's cut to the chase — are you willing to accept our offer or not?", vi: "Đi thẳng vào vấn đề luôn nhé - anh có đồng ý với đề nghị của chúng tôi hay không?" },
      { en: "The manager cut to the chase and told the team exactly what needed to change.", vi: "Người quản lý đi thẳng vào trọng tâm và nói rõ cho cả nhóm biết chính xác điều gì cần thay đổi." }
    ],
    ex: "Let's cut to the chase — are you willing to accept our offer or not?",
  },
  {
    slug: "the-icing-on-the-cake",
    term: "the icing on the cake",
    type: "idiom",
    en: "The icing on the cake refers to an additional good thing that makes an already positive situation even better. It describes a bonus or extra benefit on top of something that was already satisfying by itself.",
    vi: "Điều tuyệt vời thêm vào khiến một việc vốn đã tốt trở nên hoàn hảo hơn nữa; như \"điểm nhấn hoàn hảo\" cho một điều vốn đã tốt đẹp.",
    origin: "Thành ngữ này xuất phát trực tiếp từ hình ảnh lớp kem phủ ngọt ngào (icing) trên bề mặt một chiếc bánh - phần trang trí không bắt buộc nhưng làm cho chiếc bánh vốn đã ngon càng thêm hấp dẫn và đẹp mắt. Từ hình ảnh ẩm thực quen thuộc này, người Anh đã mở rộng nghĩa để chỉ bất kỳ điều gì tốt đẹp được thêm vào một tình huống vốn đã thuận lợi. Biến thể của người Mỹ là \"icing on the cake\" và ở Anh đôi khi cũng dùng \"cherry on the cake/top\" với ý nghĩa tương tự.",
    examples: [
      { en: "Getting the job was great news, and the signing bonus was just the icing on the cake.", vi: "Được nhận việc đã là tin vui rồi, còn khoản thưởng ký hợp đồng chỉ là điểm cộng hoàn hảo thêm vào." },
      { en: "The food was excellent, and the beautiful view from the rooftop was the icing on the cake.", vi: "Đồ ăn đã rất ngon, còn khung cảnh tuyệt đẹp từ sân thượng chính là điểm nhấn hoàn hảo cho bữa tối." }
    ],
    ex: "Getting the job was great news, and the signing bonus was just the icing on the cake.",
  },
  {
    slug: "in-two-minds",
    term: "in two minds",
    type: "idiom",
    en: "To be in two minds about something means to feel uncertain or unable to decide between two choices or opinions. It describes a state of hesitation when a person cannot make up their mind.",
    vi: "Phân vân, lưỡng lự, chưa thể quyết định giữa hai lựa chọn hay ý kiến.",
    origin: "Thành ngữ này hình dung một người như thể có hai \"tâm trí\" cùng tồn tại trong đầu, mỗi bên kéo về một hướng quyết định khác nhau, khiến người đó không thể chọn dứt khoát bên nào. Cách diễn đạt này là lối nói phổ biến trong tiếng Anh Anh, trong khi tiếng Anh Mỹ thường dùng biến thể tương đương \"of two minds\". Ý tưởng về sự giằng xé nội tâm giữa hai lựa chọn đã xuất hiện trong ngôn ngữ Anh từ nhiều thế kỷ trước, phản ánh cách con người thường mô tả sự phân vân như một cuộc đấu tranh giữa hai phần của bản thân.",
    examples: [
      { en: "I'm in two minds about whether to take the new job or stay where I am.", vi: "Tôi đang phân vân không biết nên nhận công việc mới hay ở lại chỗ cũ." },
      { en: "She was in two minds about the dress, so she asked her sister for a second opinion.", vi: "Cô ấy lưỡng lự về chiếc váy đó nên đã hỏi ý kiến chị gái." }
    ],
    ex: "I'm in two minds about whether to take the new job or stay where I am.",
  },
  {
    slug: "make-a-mountain-out-of-a-molehill",
    term: "make a mountain out of a molehill",
    type: "idiom",
    en: "To make a mountain out of a molehill means to treat a small, unimportant problem as if it were much more serious than it really is. It is used to criticize someone for exaggerating a minor issue.",
    vi: "Bé xé ra to, thổi phồng một chuyện nhỏ nhặt thành vấn đề nghiêm trọng.",
    origin: "Thành ngữ này so sánh một ngọn đồi nhỏ do chuột chũi đào đất tạo thành (a molehill) - vốn chỉ là một gò đất nhỏ - với một ngọn núi cao lớn (a mountain), qua đó nhấn mạnh sự chênh lệch phi lý giữa quy mô thực tế của vấn đề và cách nó bị phóng đại. Cách nói này đã xuất hiện trong tiếng Anh từ thế kỷ 16, ban đầu ở dạng gần giống \"make of a molehill a mountain\", cho thấy đây là một hình ảnh so sánh đã tồn tại rất lâu trong ngôn ngữ dân gian Anh.",
    examples: [
      { en: "It was just a small typo — there's no need to make a mountain out of a molehill.", vi: "Đó chỉ là một lỗi gõ nhỏ thôi - không cần phải bé xé ra to như vậy." },
      { en: "He tends to make a mountain out of a molehill whenever a meeting starts five minutes late.", vi: "Anh ấy hay thổi phồng chuyện nhỏ mỗi khi cuộc họp bắt đầu trễ năm phút." }
    ],
    ex: "It was just a small typo — there's no need to make a mountain out of a molehill.",
  },
  {
    slug: "on-the-back-burner",
    term: "on the back burner",
    type: "idiom",
    en: "If something is on the back burner, it has been deliberately given lower priority and set aside for now, to be dealt with later. It describes a plan or task that is temporarily paused rather than cancelled.",
    vi: "Tạm gác lại, chưa ưu tiên giải quyết ngay, để dành xử lý sau.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh chiếc bếp nấu ăn có nhiều lò (burner): lò phía trước (front burner) thường dùng để nấu món cần theo dõi sát sao, trong khi lò phía sau (back burner) dùng để giữ ấm hoặc ninh nhẹ những món chưa cần chú ý ngay. Từ hình ảnh nhà bếp này, cách nói được mở rộng sang nghĩa ẩn dụ để chỉ những công việc, kế hoạch bị tạm gác lại, chưa cần ưu tiên xử lý ngay lập tức nhưng vẫn chưa bị loại bỏ hoàn toàn.",
    examples: [
      { en: "We've put the office renovation on the back burner until sales improve.", vi: "Chúng tôi đã tạm gác việc cải tạo văn phòng lại cho đến khi doanh số cải thiện hơn." },
      { en: "With the new baby, his hobby of painting has been on the back burner for months.", vi: "Từ khi có em bé, sở thích vẽ tranh của anh ấy đã bị gác lại mấy tháng nay." }
    ],
    ex: "We've put the office renovation on the back burner until sales improve.",
  },
  {
    slug: "play-it-by-ear",
    term: "play it by ear",
    type: "idiom",
    en: "To play something by ear means to decide how to act as a situation develops, without a fixed plan made in advance. It is used when someone chooses to improvise rather than follow a set strategy.",
    vi: "Tùy cơ ứng biến, xử lý tình huống linh hoạt theo diễn biến thực tế thay vì lên kế hoạch trước.",
    origin: "Thành ngữ này bắt nguồn từ lĩnh vực âm nhạc, nơi \"playing by ear\" ban đầu mang nghĩa đen là chơi một bản nhạc dựa vào trí nhớ và khả năng nghe, mà không cần nhìn bản nhạc viết sẵn (sheet music). Từ khả năng ứng biến theo âm thanh nghe được này, cách nói dần được mở rộng sang nghĩa bóng để chỉ việc xử lý bất kỳ tình huống nào một cách linh hoạt, tùy theo diễn biến thực tế thay vì bám theo một kế hoạch cứng nhắc đã định sẵn.",
    examples: [
      { en: "We don't have a fixed itinerary for the trip — we're just going to play it by ear.", vi: "Chúng tôi không có lịch trình cố định cho chuyến đi - cứ để tùy cơ ứng biến thôi." },
      { en: "I'm not sure how the negotiation will go, so I'll have to play it by ear.", vi: "Tôi không chắc cuộc đàm phán sẽ diễn ra thế nào, nên chắc phải tùy tình hình mà xử lý." }
    ],
    ex: "We don't have a fixed itinerary for the trip — we're just going to play it by ear.",
  },
  {
    slug: "sit-on-the-fence",
    term: "sit on the fence",
    type: "idiom",
    en: "To sit on the fence means to avoid taking a clear side in an argument or decision, remaining neutral or undecided. It is often used to describe someone who is unwilling to commit to an opinion, sometimes seen as avoiding responsibility.",
    vi: "Đứng giữa, không ngả về bên nào, giữ thái độ trung lập hoặc né tránh đưa ra quyết định rõ ràng.",
    origin: "Hình ảnh của thành ngữ này là một người ngồi vắt vẻo trên hàng rào phân chia ranh giới giữa hai khu đất hoặc hai phe, thay vì bước hẳn sang bên nào - từ đó không phải chọn phe hay đưa ra lập trường rõ ràng. Cách diễn đạt này đã được ghi nhận trong tiếng Anh từ thế kỷ 18 và thường mang hàm ý phê phán nhẹ, ngụ ý người \"ngồi trên hàng rào\" đang né tránh trách nhiệm bày tỏ quan điểm hoặc đưa ra quyết định.",
    examples: [
      { en: "The senator has been sitting on the fence about the new policy for weeks.", vi: "Vị thượng nghị sĩ đó đã đứng giữa không rõ lập trường về chính sách mới suốt mấy tuần nay." },
      { en: "You can't sit on the fence forever — eventually you'll have to choose a side.", vi: "Bạn không thể mãi trung lập được - cuối cùng bạn cũng phải chọn một bên." }
    ],
    ex: "The senator has been sitting on the fence about the new policy for weeks.",
  },
  {
    slug: "split-hairs",
    term: "split hairs",
    type: "idiom",
    en: "To split hairs means to argue about very small, unimportant differences or details that make little real difference to the overall matter. It is often used to criticize someone for being needlessly picky in a discussion.",
    vi: "Bới lông tìm vết, tranh cãi về những chi tiết vụn vặt không quan trọng.",
    origin: "Thành ngữ này gợi hình ảnh cố gắng chẻ một sợi tóc (a hair) làm đôi - một việc làm đòi hỏi sự tỉ mỉ đến mức phi thực tế và gần như vô nghĩa về mặt thực tiễn. Cách nói này xuất hiện trong tiếng Anh từ thế kỷ 17, dùng để châm biếm những cuộc tranh luận đi quá sâu vào các phân biệt nhỏ nhặt, cầu kỳ đến mức không còn giá trị thực tế đối với vấn đề chính đang bàn.",
    examples: [
      { en: "Let's not split hairs over whether it was ten minutes or twelve — the point is we were late.", vi: "Đừng bới lông tìm vết xem là mười phút hay mười hai phút - vấn đề là chúng ta đã đến muộn." },
      { en: "The lawyers spent the whole afternoon splitting hairs over the exact wording of the clause.", vi: "Các luật sư dành cả buổi chiều để tranh cãi về từng câu chữ nhỏ nhặt trong điều khoản." }
    ],
    ex: "Let's not split hairs over whether it was ten minutes or twelve — the point is we were late.",
  },
  {
    slug: "stick-to-your-guns",
    term: "stick to your guns",
    type: "idiom",
    en: "To stick to your guns means to firmly maintain your opinion, decision, or position even when other people criticize it or try to pressure you to change. It describes staying determined under opposition.",
    vi: "Giữ vững lập trường, kiên định với quyết định hay quan điểm của mình dù bị phản đối hay gây áp lực.",
    origin: "Thành ngữ này có nguồn gốc quân sự, hình dung những người lính pháo binh giữ vững vị trí bên khẩu súng của mình (their guns) và tiếp tục chiến đấu thay vì bỏ chạy hay rút lui khi bị tấn công. Từ hình ảnh kiên cường giữ vị trí trên chiến trường này, cách nói được mở rộng sang đời sống thường ngày để chỉ việc kiên định giữ vững quan điểm hoặc quyết định của mình trước áp lực hay sự phản đối từ người khác.",
    examples: [
      { en: "Even though her colleagues disagreed, she stuck to her guns and kept the original plan.", vi: "Dù đồng nghiệp không đồng ý, cô ấy vẫn giữ vững lập trường và duy trì kế hoạch ban đầu." },
      { en: "Despite the criticism, the director stuck to his guns and refused to cut the scene.", vi: "Bất chấp những lời chỉ trích, đạo diễn vẫn kiên định và từ chối cắt bỏ cảnh phim đó." }
    ],
    ex: "Even though her colleagues disagreed, she stuck to her guns and kept the original plan.",
  },
  {
    slug: "take-a-back-seat",
    term: "take a back seat",
    type: "idiom",
    en: "To take a back seat means to allow someone else to have control or the leading role, deliberately taking a less important or less active position for a while. It can describe a person, or a task being given lower priority.",
    vi: "Lùi về phía sau, nhường vai trò dẫn dắt cho người khác hoặc để một việc trở nên kém ưu tiên hơn.",
    origin: "Thành ngữ này liên tưởng đến việc ngồi ở ghế sau của một chiếc xe thay vì ghế lái hay ghế trước - vị trí của người không trực tiếp điều khiển hay đưa ra quyết định chính. Từ hình ảnh vị trí ngồi trong xe này, cách nói được dùng ẩn dụ để chỉ việc một người chủ động nhường vai trò chủ chốt cho người khác, hoặc một công việc, mối quan tâm nào đó tạm thời trở nên kém quan trọng hơn so với việc khác.",
    examples: [
      { en: "After the new manager arrived, the founder decided to take a back seat and let her lead.", vi: "Sau khi người quản lý mới đến, nhà sáng lập đã quyết định lùi lại phía sau và để cô ấy dẫn dắt." },
      { en: "During exam season, his social life took a back seat to studying.", vi: "Trong mùa thi, đời sống xã hội của anh ấy phải nhường chỗ cho việc học." }
    ],
    ex: "After the new manager arrived, the founder decided to take a back seat and let her lead.",
  },
  {
    slug: "the-tip-of-the-iceberg",
    term: "the tip of the iceberg",
    type: "idiom",
    en: "The tip of the iceberg refers to a small, visible part of a much larger problem or situation that is mostly hidden. It is used to indicate that what is currently known or seen is only a fraction of the whole issue.",
    vi: "Chỉ mới là phần nổi của tảng băng chìm, một phần nhỏ được thấy trong khi phần lớn vấn đề còn ẩn giấu.",
    origin: "Thành ngữ này dựa trên hiện tượng vật lý của các tảng băng trôi (icebergs): phần nhô lên khỏi mặt nước chỉ chiếm một tỷ lệ rất nhỏ, trong khi phần lớn khối băng chìm sâu dưới mặt nước và không thể nhìn thấy được. Hình ảnh này trở nên nổi tiếng hơn sau thảm họa đắm tàu Titanic năm 1912, khi tảng băng va chạm với con tàu chính là minh chứng sống động cho sự nguy hiểm của phần chìm không thấy được. Từ đó, cách nói được dùng ẩn dụ để chỉ những vấn đề mà phần được biết đến chỉ là một phần nhỏ so với quy mô thực sự.",
    examples: [
      { en: "The reported cases are probably just the tip of the iceberg — many go unreported.", vi: "Những trường hợp được báo cáo có lẽ chỉ là phần nổi của tảng băng chìm - còn rất nhiều trường hợp chưa được ghi nhận." },
      { en: "The financial losses we've found so far are just the tip of the iceberg.", vi: "Những khoản lỗ tài chính chúng tôi phát hiện đến giờ mới chỉ là phần nổi của tảng băng chìm." }
    ],
    ex: "The reported cases are probably just the tip of the iceberg — many go unreported.",
  },
  {
    slug: "up-in-the-air",
    term: "up in the air",
    type: "idiom",
    en: "If something is up in the air, it is not yet decided or settled, and its outcome remains uncertain. It describes plans, decisions, or situations that could still change.",
    vi: "Còn bỏ ngỏ, chưa ngã ngũ, chưa có quyết định chắc chắn.",
    origin: "Thành ngữ này gợi hình ảnh một vật đang lơ lửng trên không trung, chưa rơi xuống và chưa xác định được nó sẽ đáp xuống đâu - tượng trưng cho một tình huống hay quyết định vẫn còn chông chênh, chưa được giải quyết dứt điểm. Cách diễn đạt này đã xuất hiện trong tiếng Anh từ thế kỷ 18 và ngày nay được dùng phổ biến để mô tả các kế hoạch, quyết định hoặc tình huống mà kết quả cuối cùng vẫn còn chưa rõ ràng.",
    examples: [
      { en: "Our travel plans are still up in the air because we haven't confirmed our visas yet.", vi: "Kế hoạch du lịch của chúng tôi vẫn còn bỏ ngỏ vì chúng tôi chưa xin được visa." },
      { en: "Whether the merger will go through is still up in the air.", vi: "Việc sáp nhập có diễn ra hay không thì vẫn còn chưa ngã ngũ." }
    ],
    ex: "Our travel plans are still up in the air because we haven't confirmed our visas yet.",
  }
  ],
  "relationships": [
  {
    slug: "break-the-ice",
    term: "break the ice",
    type: "idiom",
    en: "If you break the ice, you say or do something to make people who have just met feel more relaxed and less awkward with each other.",
    vi: "Phá bỏ sự ngượng ngùng, khó xử ban đầu giữa những người mới gặp nhau, giúp không khí trở nên thoải mái hơn.",
    origin: "Cụm từ này bắt nguồn từ hình ảnh những con tàu phá băng (icebreaker) rẽ lớp băng dày trên biển để mở đường cho các tàu khác đi qua. Từ thế kỷ 17-18, người Anh đã dùng hình ảnh này theo nghĩa bóng: việc \"phá lớp băng\" giao tiếp ban đầu giống như mở một lối đi cho cuộc trò chuyện được thông suốt. Qua thời gian, nghĩa đen về hàng hải dần mờ đi, chỉ còn lại nghĩa bóng quen thuộc ngày nay.",
    examples: [
      { en: "The host told a funny story about herself to break the ice before the workshop began.", vi: "Người dẫn chương trình kể một câu chuyện hài hước về bản thân để phá vỡ sự ngượng ngùng trước khi buổi hội thảo bắt đầu." },
      { en: "At the party, nobody spoke until Tom broke the ice by asking everyone about their favorite movies.", vi: "Tại bữa tiệc, không ai nói gì cho đến khi Tom phá vỡ sự im lặng bằng cách hỏi mọi người về bộ phim yêu thích của họ." }
    ],
    ex: "The host told a funny story about herself to break the ice before the workshop began.",
  },
  {
    slug: "get-off-on-the-wrong-foot",
    term: "get off on the wrong foot",
    type: "idiom",
    en: "If two people get off on the wrong foot, their relationship or a piece of work starts badly, often because of a misunderstanding or a bad first impression.",
    vi: "Bắt đầu một mối quan hệ hay một công việc một cách không suôn sẻ, thường vì hiểu lầm hoặc ấn tượng ban đầu không tốt.",
    origin: "Ý tưởng này gắn với niềm tin dân gian cổ xưa rằng bước ra khỏi giường hay bắt đầu một hành trình bằng chân trái là điềm xui, còn bước bằng chân phải mới mang lại may mắn. Từ đó, \"đặt sai chân\" (wrong foot) khi bắt đầu một việc gì đó dần được hiểu theo nghĩa bóng là khởi đầu không thuận lợi. Ngày nay ý nghĩa mê tín ban đầu gần như đã biến mất, chỉ còn lại cách dùng ẩn dụ cho một khởi đầu trục trặc.",
    examples: [
      { en: "We got off on the wrong foot when I accidentally called my new colleague by the wrong name.", vi: "Chúng tôi đã có một khởi đầu không suôn sẻ khi tôi vô tình gọi nhầm tên đồng nghiệp mới." },
      { en: "The two roommates got off on the wrong foot after arguing about chores on the very first day.", vi: "Hai người bạn cùng phòng đã có một khởi đầu tệ hại sau khi cãi nhau về việc dọn dẹp ngay ngày đầu tiên." }
    ],
    ex: "We got off on the wrong foot when I accidentally called my new colleague by the wrong name.",
  },
  {
    slug: "get-on-like-a-house-on-fire",
    term: "get on like a house on fire",
    type: "idiom",
    en: "If two people get on like a house on fire, they become friendly with each other very quickly and enjoy each other's company a great deal.",
    vi: "Hợp nhau ngay từ đầu và nhanh chóng trở nên rất thân thiết, hòa hợp với nhau.",
    origin: "Nghe có vẻ nghịch lý, nhưng \"like a house on fire\" từ thế kỷ 19 vốn được dùng để chỉ tốc độ và cường độ mạnh mẽ, giống như một ngôi nhà bốc cháy lan nhanh không kiểm soát được, chẳng hạn để mô tả công việc kinh doanh phát triển \"nhanh như lửa cháy nhà\". Khi áp dụng cho mối quan hệ giữa người với người, hình ảnh ngọn lửa bùng lên nhanh chóng và mạnh mẽ được dùng để diễn tả sự hợp nhau tức thì, nồng nhiệt.",
    examples: [
      { en: "My mother and my best friend got on like a house on fire the moment they met.", vi: "Mẹ tôi và bạn thân của tôi đã hợp nhau ngay từ lần gặp đầu tiên." },
      { en: "I was nervous about meeting his parents, but we got on like a house on fire over dinner.", vi: "Tôi đã rất lo lắng khi gặp bố mẹ anh ấy, nhưng chúng tôi lại hợp nhau đến bất ngờ trong bữa tối." }
    ],
    ex: "My mother and my best friend got on like a house on fire the moment they met.",
  },
  {
    slug: "get-on-someone-s-nerves",
    term: "get on someone's nerves",
    type: "idiom",
    en: "If someone or something gets on your nerves, they annoy or irritate you, usually because of repeated or persistent behavior.",
    vi: "Làm ai đó khó chịu, bực bội, thường vì hành động lặp đi lặp lại hoặc kéo dài.",
    origin: "Từ thế kỷ 19, tiếng Anh bắt đầu dùng từ \"nerve/nerves\" theo nghĩa bóng để chỉ trạng thái tâm lý và sức chịu đựng của một người, ví dụ \"có thần kinh vững\" hay \"thần kinh căng thẳng\". Khi một hành động cứ liên tục \"tác động lên\" (get on) hệ thần kinh nhạy cảm ấy, nó gây ra cảm giác bực bội, khó chịu kéo dài, từ đó hình thành cách nói quen thuộc ngày nay.",
    examples: [
      { en: "His habit of tapping his pen on the desk really gets on my nerves during meetings.", vi: "Thói quen gõ bút lên bàn của anh ấy thực sự khiến tôi khó chịu trong các cuộc họp." },
      { en: "The constant traffic noise outside my window is starting to get on my nerves.", vi: "Tiếng ồn giao thông liên tục ngoài cửa sổ bắt đầu khiến tôi bực bội." }
    ],
    ex: "His habit of tapping his pen on the desk really gets on my nerves during meetings.",
  },
  {
    slug: "give-someone-the-cold-shoulder",
    term: "give someone the cold shoulder",
    type: "idiom",
    en: "If you give someone the cold shoulder, you deliberately treat them in an unfriendly way, ignoring them or refusing to talk to them.",
    vi: "Cố tình lạnh nhạt, phớt lờ hoặc không muốn nói chuyện với ai đó.",
    origin: "Nguồn gốc chính xác của thành ngữ này không hoàn toàn rõ ràng. Một cách giải thích dân gian phổ biến cho rằng ngày xưa, khi một vị khách không được chào đón, chủ nhà sẽ chỉ dọn cho họ một miếng vai (thịt cừu) nguội thay vì món ăn nóng hổi dành cho khách quý, như một cách ngầm ra dấu sự lạnh nhạt. Tuy vậy nhiều nhà nghiên cứu ngôn ngữ cho rằng đây có thể chỉ là một cách giải thích được đặt ra sau này, và ý nghĩa \"lạnh lùng\" của từ \"cold\" đơn giản là ẩn dụ tự nhiên cho thái độ xa cách.",
    examples: [
      { en: "Ever since our disagreement, she has been giving me the cold shoulder at work.", vi: "Kể từ sau bất đồng của chúng tôi, cô ấy cứ lạnh nhạt với tôi ở chỗ làm." },
      { en: "He gave his old friend the cold shoulder after finding out about the rumor.", vi: "Anh ấy đã phớt lờ người bạn cũ của mình sau khi biết về tin đồn đó." }
    ],
    ex: "Ever since our disagreement, she has been giving me the cold shoulder at work.",
  },
  {
    slug: "go-back-a-long-way",
    term: "go back a long way",
    type: "idiom",
    en: "If two people go back a long way, they have known each other for a very long time and their relationship or friendship is well established.",
    vi: "Quen biết nhau đã lâu, có một mối quan hệ hay tình bạn gắn bó từ rất lâu rồi.",
    origin: "Thành ngữ này không gắn với một sự kiện lịch sử cụ thể nào, mà đơn giản là một cách mở rộng nghĩa bóng của \"go back\" (lùi lại) và \"a long way\" (một quãng đường dài). Hình ảnh được gợi lên là nếu \"lùi lại\" theo dòng thời gian của một mối quan hệ, ta sẽ phải đi một quãng đường rất xa mới chạm tới điểm khởi đầu, ngụ ý mối quan hệ đó đã tồn tại từ rất lâu.",
    examples: [
      { en: "David and I go back a long way; we've been friends since primary school.", vi: "David và tôi đã quen biết nhau từ rất lâu rồi; chúng tôi là bạn từ hồi tiểu học." },
      { en: "The two business partners go back a long way, having worked together for over twenty years.", vi: "Hai người đối tác kinh doanh đã gắn bó với nhau từ lâu, họ đã làm việc cùng nhau hơn hai mươi năm." }
    ],
    ex: "David and I go back a long way; we've been friends since primary school.",
  },
  {
    slug: "hit-it-off",
    term: "hit it off",
    type: "idiom",
    en: "If you hit it off with someone, you like each other and get along well right from the first time you meet.",
    vi: "Hợp nhau và cảm thấy quý mến nhau ngay từ lần gặp đầu tiên.",
    origin: "Cách dùng động từ \"hit\" kết hợp với đại từ phiếm chỉ \"it\" từng khá phổ biến trong tiếng Anh cổ để diễn tả việc đạt được điều gì đó đúng như mong muốn, tương tự như \"hit the mark\" (trúng đích). Từ thế kỷ 18-19, cụm \"hit it off\" được dùng để chỉ việc hai người \"trúng khớp\" với nhau về tính cách hay sở thích, từ đó dần trở thành cách nói quen thuộc để chỉ sự hợp nhau tức thì giữa hai người.",
    examples: [
      { en: "We hit it off immediately when we discovered we both loved hiking.", vi: "Chúng tôi hợp nhau ngay lập tức khi phát hiện ra cả hai đều thích đi bộ đường dài." },
      { en: "I was worried about the blind date, but we really hit it off over coffee.", vi: "Tôi đã lo lắng về buổi hẹn mù, nhưng chúng tôi thực sự hợp nhau khi ngồi uống cà phê." }
    ],
    ex: "We hit it off immediately when we discovered we both loved hiking.",
  },
  {
    slug: "leave-someone-in-the-lurch",
    term: "leave someone in the lurch",
    type: "idiom",
    en: "If you leave someone in the lurch, you abandon them in a difficult situation without the help they expected from you.",
    vi: "Bỏ rơi ai đó trong lúc khó khăn, không giúp đỡ dù họ đang trông cậy vào mình.",
    origin: "Từ \"lurch\" trong thành ngữ này bắt nguồn từ tên một trò chơi cờ/xúc xắc cổ của Pháp gọi là \"lourche\", tương tự trò backgammon. Trong trò chơi đó, người thua với khoảng cách điểm số quá lớn được gọi là bị \"in the lurch\", tức thua đậm, thua thảm hại. Về sau nghĩa này được mở rộng sang đời sống hằng ngày, chỉ việc bị bỏ mặc trong một tình thế bất lợi, khó xoay xở mà không có ai giúp đỡ.",
    examples: [
      { en: "He left his teammates in the lurch by quitting the project just days before the deadline.", vi: "Anh ấy đã bỏ rơi đồng đội của mình khi bỏ dự án ngay trước hạn chót vài ngày." },
      { en: "The babysitter left the family in the lurch by canceling at the very last minute.", vi: "Người trông trẻ đã để gia đình đó rơi vào thế bí khi hủy hẹn vào phút chót." }
    ],
    ex: "He left his teammates in the lurch by quitting the project just days before the deadline.",
  },
  {
    slug: "on-the-rocks",
    term: "on the rocks",
    type: "idiom",
    en: "If a relationship, marriage, or business is on the rocks, it is having serious problems and is in danger of ending completely.",
    vi: "Một mối quan hệ, cuộc hôn nhân hay việc kinh doanh đang gặp trục trặc nghiêm trọng và có nguy cơ tan vỡ, đổ vỡ.",
    origin: "Thành ngữ này bắt nguồn từ ngôn ngữ hàng hải, khi một con tàu bị mắc cạn hoặc đâm vào đá ngầm (rocks) gần bờ thì rất dễ bị vỡ tan hoặc đắm. Hình ảnh con tàu gặp nạn trên đá được dùng làm ẩn dụ cho một mối quan hệ hay công việc kinh doanh đang lâm vào tình trạng nguy hiểm, có thể sụp đổ bất cứ lúc nào. Cần lưu ý cụm \"on the rocks\" khi nói về đồ uống (whisky on the rocks, nghĩa là có đá) là một nghĩa khác hoàn toàn, không liên quan đến nghĩa bóng này.",
    examples: [
      { en: "Their marriage has been on the rocks ever since he lost his job.", vi: "Cuộc hôn nhân của họ đã trục trặc nghiêm trọng kể từ khi anh ấy mất việc." },
      { en: "Rumor has it that the family business is on the rocks after years of falling sales.", vi: "Có tin đồn rằng công việc kinh doanh của gia đình đó đang bên bờ sụp đổ sau nhiều năm doanh số giảm sút." }
    ],
    ex: "Their marriage has been on the rocks ever since he lost his job.",
  },
  {
    slug: "on-the-same-wavelength",
    term: "on the same wavelength",
    type: "idiom",
    en: "If two people are on the same wavelength, they think in similar ways, share similar attitudes, and find it easy to understand each other.",
    vi: "Có cùng suy nghĩ, quan điểm với nhau nên dễ dàng hiểu ý nhau.",
    origin: "Cụm từ này bắt nguồn từ công nghệ radio, khi hai máy thu phát phải được điều chỉnh cùng một tần số hay \"bước sóng\" (wavelength) thì mới có thể gửi và nhận tín hiệu rõ ràng với nhau. Từ đó, khi nói hai người \"cùng bước sóng\", ý muốn nói tư duy và cách hiểu của họ ăn khớp với nhau giống như hai đài radio dò trúng cùng một tần số, giúp họ giao tiếp và thấu hiểu nhau dễ dàng.",
    examples: [
      { en: "My business partner and I are always on the same wavelength when it comes to new ideas.", vi: "Đối tác kinh doanh và tôi luôn có cùng suy nghĩ khi bàn về những ý tưởng mới." },
      { en: "It's rare to find someone who is on the same wavelength as you about almost everything.", vi: "Thật hiếm khi tìm được một người có cùng suy nghĩ với mình về hầu như mọi thứ." }
    ],
    ex: "My business partner and I are always on the same wavelength when it comes to new ideas.",
  },
  {
    slug: "save-face",
    term: "save face",
    type: "idiom",
    en: "If you save face, you avoid embarrassment, humiliation, or a loss of respect, especially after making a mistake or being in a difficult situation.",
    vi: "Giữ thể diện, tránh bị bẽ mặt hay mất uy tín, đặc biệt là sau khi mắc lỗi hoặc rơi vào tình huống khó xử.",
    origin: "Khái niệm \"thể diện\" (face) như một biểu tượng cho danh dự và lòng tự trọng vốn có gốc rễ sâu xa trong văn hóa Trung Hoa. Vào thế kỷ 19, khi người Anh giao thương và tiếp xúc nhiều với Trung Quốc, cụm \"lose face\" (mất thể diện) được dịch và du nhập vào tiếng Anh để diễn tả khái niệm này. Từ đó, người Anh tạo ra cụm đối lập \"save face\" theo cách loại suy, mang nghĩa giữ gìn được danh dự, uy tín của bản thân.",
    examples: [
      { en: "The manager offered a vague excuse just to save face in front of the whole team.", vi: "Người quản lý đưa ra một lời bào chữa mơ hồ chỉ để giữ thể diện trước cả nhóm." },
      { en: "To save face after losing the match, the captain praised the opposing team's performance.", vi: "Để giữ thể diện sau khi thua trận, đội trưởng đã khen ngợi phong độ của đội đối phương." }
    ],
    ex: "The manager offered a vague excuse just to save face in front of the whole team.",
  },
  {
    slug: "sparks-fly",
    term: "sparks fly",
    type: "idiom",
    en: "If sparks fly between two people, they suddenly show strong emotion toward each other, either because they are attracted to one another or because they are having a heated argument.",
    vi: "Cảm xúc mạnh mẽ đột ngột bùng lên giữa hai người, có thể là sự hấp dẫn, rung động hoặc một cuộc tranh cãi gay gắt.",
    origin: "Hình ảnh gốc của thành ngữ này là những tia lửa (sparks) bắn ra khi hai vật cứng, chẳng hạn như đá lửa và kim loại, va chạm mạnh vào nhau, hay khi hàn kim loại. Cảnh tượng những tia lửa bất ngờ bắn tung tóe được dùng làm ẩn dụ sinh động cho việc cảm xúc mãnh liệt đột ngột bùng phát giữa hai người, dù đó là sự rung động, hấp dẫn lãng mạn hay một cuộc đối đầu căng thẳng.",
    examples: [
      { en: "Sparks flew between them the moment their eyes met across the room.", vi: "Tia lửa tình yêu bùng lên giữa hai người ngay khi ánh mắt họ chạm nhau qua căn phòng." },
      { en: "Sparks flew during the debate when the two candidates disagreed over the new policy.", vi: "Cuộc tranh luận trở nên gay gắt khi hai ứng viên bất đồng quan điểm về chính sách mới." }
    ],
    ex: "Sparks flew between them the moment their eyes met across the room.",
  },
  {
    slug: "treat-someone-like-dirt",
    term: "treat someone like dirt",
    type: "idiom",
    en: "If you treat someone like dirt, you behave toward them with great disrespect and contempt, as if they had no value or feelings at all.",
    vi: "Đối xử với ai đó một cách coi thường, tệ bạc, như thể người đó không có giá trị hay cảm xúc gì.",
    origin: "\"Dirt\" (đất bẩn, bụi bẩn) từ lâu đã được xem là thứ tầm thường, dơ bẩn, thứ người ta giẫm lên hoặc quét bỏ đi mà không hề để tâm. Khi so sánh cách một người bị đối xử với \"dirt\", thành ngữ này ngụ ý rằng người đó bị coi thường đến mức bị xem như một thứ vô giá trị, hoàn toàn không xứng đáng được tôn trọng hay quan tâm.",
    examples: [
      { en: "I can't believe he treats his own employees like dirt just to seem powerful.", vi: "Tôi không thể tin được rằng anh ta đối xử tệ bạc với chính nhân viên của mình chỉ để tỏ ra có quyền lực." },
      { en: "She finally left him after years of being treated like dirt.", vi: "Cuối cùng cô ấy cũng rời bỏ anh ta sau nhiều năm bị đối xử tệ bạc." }
    ],
    ex: "I can't believe he treats his own employees like dirt just to seem powerful.",
  },
  {
    slug: "your-own-flesh-and-blood",
    term: "your own flesh and blood",
    type: "idiom",
    en: "Your own flesh and blood refers to your close blood relatives, such as your children, parents, or siblings, emphasizing the natural bond you share with them.",
    vi: "Người thân ruột thịt của mình, chẳng hạn con cái, cha mẹ hay anh chị em, nhấn mạnh mối liên kết máu mủ tự nhiên giữa họ.",
    origin: "Cụm từ \"flesh and blood\" xuất hiện từ rất lâu trong tiếng Anh, kể cả trong Kinh Thánh và các tác phẩm của Shakespeare, dùng để chỉ bản chất vật lý, sinh học chung của con người. Việc ghép \"thịt\" (flesh) và \"máu\" (blood) làm biểu tượng cho quan hệ huyết thống xuất phát từ quan niệm rằng những người cùng huyết thống chia sẻ chung một bản thể sinh học, từ đó cụm từ trở thành cách nói trang trọng, giàu cảm xúc để chỉ người thân ruột thịt.",
    examples: [
      { en: "Despite their disagreements, she could never turn her back on her own flesh and blood.", vi: "Dù có bất đồng, cô ấy vẫn không bao giờ có thể quay lưng lại với người thân ruột thịt của mình." },
      { en: "He raised his nephew as if the boy were his own flesh and blood.", vi: "Anh ấy nuôi dạy cháu trai mình như thể đó là con ruột của chính mình." }
    ],
    ex: "Despite their disagreements, she could never turn her back on her own flesh and blood.",
  }
  ],
  "help-and-encouragement": [
  {
    slug: "bend-over-backwards-or-bend-over-backward",
    term: "bend over backwards or bend over backward",
    type: "idiom",
    en: "If you bend over backwards for someone, you make an extreme effort or go to great lengths to help or please them, even if it is inconvenient for you.",
    vi: "Nếu bạn \"bend over backwards\" vì ai đó, nghĩa là bạn cố gắng hết sức, thậm chí chịu thiệt hoặc bất tiện, chỉ để giúp đỡ hay làm hài lòng người đó.",
    origin: "Hình ảnh này gợi đến động tác uốn cong người ra sau, một tư thế khó và đòi hỏi sự dẻo dai bất thường, giống như diễn viên xiếc hay vũ công uốn dẻo. Từ đó, thành ngữ dùng để chỉ việc ai đó nỗ lực vượt mức bình thường, \"vặn mình\" theo đúng nghĩa bóng để đáp ứng yêu cầu hay giúp đỡ người khác. Cách dùng này được ghi nhận phổ biến trong tiếng Anh Mỹ từ giữa thế kỷ 20, dù hình ảnh tương tự đã xuất hiện sớm hơn.",
    examples: [
      { en: "Our neighbors bent over backwards to make us feel welcome when we moved in.", vi: "Hàng xóm của chúng tôi đã cố gắng hết sức để khiến chúng tôi cảm thấy được chào đón khi mới chuyển đến." },
      { en: "The manager bent over backward to accommodate her request for flexible hours.", vi: "Người quản lý đã cố hết sức để đáp ứng yêu cầu về giờ làm linh hoạt của cô ấy." }
    ],
    ex: "Our neighbors bent over backwards to make us feel welcome when we moved in.",
  },
  {
    slug: "be-there-for-someone",
    term: "be there for someone",
    type: "idiom",
    en: "If you are there for someone, you support and comfort them, especially during a difficult time, by being available whenever they need you.",
    vi: "Nếu bạn \"be there for\" ai đó, nghĩa là bạn luôn sẵn sàng ở bên, ủng hộ và an ủi người đó, nhất là trong lúc khó khăn.",
    origin: "Cụm từ này xuất phát từ nghĩa đen đơn giản của việc \"có mặt\" bên cạnh ai đó khi họ cần, dần được mở rộng sang nghĩa tinh thần chỉ sự hiện diện đáng tin cậy về mặt tình cảm chứ không chỉ vật lý. Cách dùng này rất phổ biến trong tiếng Anh hiện đại, gắn liền với văn hóa tình bạn và các mối quan hệ thân thiết, càng quen thuộc hơn nhờ các bài hát và bộ phim nhấn mạnh giá trị của sự đồng hành.",
    examples: [
      { en: "No matter what happens, I promise I'll be there for you.", vi: "Dù chuyện gì xảy ra, anh hứa sẽ luôn ở bên em." },
      { en: "She's always been there for her sister during every crisis.", vi: "Cô ấy luôn ở bên chị gái mình trong mọi biến cố." }
    ],
    ex: "No matter what happens, I promise I'll be there for you.",
  },
  {
    slug: "give-and-take",
    term: "give and take",
    type: "idiom",
    en: "Give and take is the willingness of people in a relationship or negotiation to compromise, each accepting less than they originally wanted so that both sides benefit.",
    vi: "\"Give and take\" nghĩa là sự nhân nhượng qua lại giữa các bên, mỗi bên chấp nhận bớt một phần mong muốn của mình để đạt được thỏa thuận chung có lợi cho cả hai.",
    origin: "Cấu trúc lặp \"give and take\" phản ánh trực tiếp hai hành động đối lập nhưng bổ sung cho nhau: cho đi và nhận lại. Thành ngữ này đã xuất hiện từ lâu trong tiếng Anh, ban đầu mô tả việc trao đổi hàng hóa hoặc lời nói qua lại, sau đó mở rộng thành khái niệm về sự thỏa hiệp trong các mối quan hệ, đàm phán hay hợp tác.",
    examples: [
      { en: "A good marriage requires a lot of give and take from both partners.", vi: "Một cuộc hôn nhân tốt đẹp cần rất nhiều sự nhân nhượng qua lại từ cả hai người." },
      { en: "The negotiations succeeded because both companies were willing to give and take.", vi: "Cuộc đàm phán thành công vì cả hai công ty đều sẵn sàng nhượng bộ lẫn nhau." }
    ],
    ex: "A good marriage requires a lot of give and take from both partners.",
  },
  {
    slug: "hold-someone-s-hand",
    term: "hold someone's hand",
    type: "idiom",
    en: "If you hold someone's hand through a difficult situation, you guide, support, and reassure them closely, often because they feel nervous or inexperienced.",
    vi: "\"Hold someone's hand\" nghĩa là bạn kề cận hướng dẫn, hỗ trợ và trấn an ai đó qua một tình huống khó khăn, thường vì họ cảm thấy lo lắng hoặc thiếu kinh nghiệm.",
    origin: "Nghĩa bóng của thành ngữ bắt nguồn trực tiếp từ hành động nắm tay theo nghĩa đen, chẳng hạn cha mẹ nắm tay dẫn con nhỏ qua đường hoặc an ủi một người đang sợ hãi. Từ hình ảnh chăm sóc thân thiết đó, cụm từ được mở rộng sang nghĩa ẩn dụ chỉ việc hướng dẫn, hỗ trợ sát sao ai đó từng bước một trong công việc hay cuộc sống.",
    examples: [
      { en: "New employees need someone to hold their hand for the first few weeks.", vi: "Nhân viên mới cần có người kèm cặp, hướng dẫn sát sao trong vài tuần đầu." },
      { en: "I can give advice, but I can't hold your hand through every single decision.", vi: "Tôi có thể đưa ra lời khuyên, nhưng không thể cầm tay chỉ việc cho bạn ở mọi quyết định." }
    ],
    ex: "New employees need someone to hold their hand for the first few weeks.",
  },
  {
    slug: "in-the-same-boat",
    term: "in the same boat",
    type: "idiom",
    en: "If people are in the same boat, they are all facing the same difficult situation or problem, which often creates a sense of shared understanding.",
    vi: "\"In the same boat\" nghĩa là cùng chung một hoàn cảnh khó khăn với người khác, từ đó tạo ra sự đồng cảm và thấu hiểu lẫn nhau.",
    origin: "Hình ảnh gợi đến những người ngồi chung một con thuyền, cùng chịu chung số phận trước sóng gió hay hiểm nguy trên biển — nếu thuyền chìm, tất cả đều gặp nạn như nhau. Từ hình ảnh cụ thể này, thành ngữ được dùng ẩn dụ để chỉ những người đang cùng đối mặt với một hoàn cảnh khó khăn giống nhau, dù không thực sự ở trên thuyền.",
    examples: [
      { en: "Don't worry, plenty of new parents feel exhausted — we're all in the same boat.", vi: "Đừng lo, rất nhiều bậc cha mẹ mới cũng thấy kiệt sức — tất cả chúng ta đều chung hoàn cảnh cả." },
      { en: "When the factory closed, hundreds of workers found themselves in the same boat.", vi: "Khi nhà máy đóng cửa, hàng trăm công nhân rơi vào cùng một cảnh ngộ." }
    ],
    ex: "Don't worry, plenty of new parents feel exhausted — we're all in the same boat.",
  },
  {
    slug: "keep-your-chin-up",
    term: "keep your chin up",
    type: "idiom",
    en: "If you keep your chin up during a hard time, you stay positive, brave, and cheerful instead of giving in to discouragement.",
    vi: "\"Keep your chin up\" nghĩa là giữ vững tinh thần lạc quan, can đảm trong lúc khó khăn thay vì gục ngã hay chán nản.",
    origin: "Cằm ngẩng cao là tư thế của một người tự tin, không cúi đầu buồn bã hay xấu hổ; ngược lại, người buồn bã hoặc thất vọng thường có xu hướng cúi đầu xuống. Từ quan sát ngôn ngữ cơ thể này, thành ngữ khuyên người nghe hãy giữ tư thế ngẩng cao đầu về cả nghĩa đen lẫn nghĩa bóng, tức là duy trì thái độ lạc quan, không để nghịch cảnh đánh gục tinh thần.",
    examples: [
      { en: "I know the results were disappointing, but keep your chin up — there's always next season.", vi: "Tôi biết kết quả khiến bạn thất vọng, nhưng hãy giữ vững tinh thần — luôn còn mùa giải sau mà." },
      { en: "She kept her chin up throughout the treatment, even on the hardest days.", vi: "Cô ấy luôn giữ tinh thần lạc quan suốt quá trình điều trị, ngay cả trong những ngày khó khăn nhất." }
    ],
    ex: "I know the results were disappointing, but keep your chin up — there's always next season.",
  },
  {
    slug: "lend-a-hand-or-lend-someone-a-hand",
    term: "lend a hand or lend someone a hand",
    type: "idiom",
    en: "If you lend a hand or lend someone a hand, you help them do something, especially a physical task that is difficult to manage alone.",
    vi: "\"Lend a hand\" nghĩa là giúp đỡ ai đó làm việc gì, đặc biệt là những việc chân tay khó tự làm một mình.",
    origin: "Thành ngữ dùng hình ảnh \"cho mượn\" bàn tay của mình để hỗ trợ người khác hoàn thành công việc, giống như khi hai người cùng khiêng một vật nặng. Cách nói này đã tồn tại trong tiếng Anh từ nhiều thế kỷ, phản ánh tinh thần tương trợ trong cộng đồng lao động, nơi người ta thường \"cho mượn\" sức lực của mình khi hàng xóm hay bạn bè cần giúp đỡ.",
    examples: [
      { en: "Could you lend me a hand moving this sofa upstairs?", vi: "Bạn có thể giúp tôi khiêng chiếc ghế sofa này lên tầng trên không?" },
      { en: "Whenever there's a community event, my father always lends a hand.", vi: "Mỗi khi có sự kiện cộng đồng, bố tôi luôn ra tay giúp đỡ." }
    ],
    ex: "Could you lend me a hand moving this sofa upstairs?",
  },
  {
    slug: "look-the-other-way",
    term: "look the other way",
    type: "idiom",
    en: "If you look the other way, you deliberately ignore something wrong or improper that is happening, choosing not to act or intervene, sometimes out of sympathy for the person involved.",
    vi: "\"Look the other way\" nghĩa là cố tình phớt lờ, làm ngơ trước một việc sai trái đang xảy ra, chọn không can thiệp, đôi khi vì cả nể hay thông cảm cho người liên quan.",
    origin: "Nghĩa bóng bắt nguồn trực tiếp từ hành động quay mặt sang hướng khác để tránh nhìn thấy điều gì đó, giống như khi ta không muốn chứng kiến một cảnh khó xử. Từ hành vi né tránh ánh nhìn theo nghĩa đen, thành ngữ mở rộng sang nghĩa ẩn dụ chỉ việc cố tình bỏ qua, không tố giác hay can thiệp vào sai phạm của người khác, đôi khi vì cả nể hoặc muốn giúp người đó tránh rắc rối.",
    examples: [
      { en: "The coach looked the other way when a few players broke curfew.", vi: "Huấn luyện viên đã làm ngơ khi vài cầu thủ vi phạm giờ giới nghiêm." },
      { en: "Her colleagues looked the other way rather than report the minor mistake.", vi: "Đồng nghiệp của cô ấy đã làm ngơ thay vì báo cáo lỗi nhỏ đó." }
    ],
    ex: "The coach looked the other way when a few players broke curfew.",
  },
  {
    slug: "meet-someone-halfway",
    term: "meet someone halfway",
    type: "idiom",
    en: "If you meet someone halfway, you compromise with them, giving up part of what you want so that an agreement can be reached.",
    vi: "\"Meet someone halfway\" nghĩa là thỏa hiệp với ai đó, mỗi bên nhượng bộ một phần để đi đến thống nhất chung.",
    origin: "Hình ảnh xuất phát từ việc hai người xuất phát từ hai hướng khác nhau và cùng đi đến điểm giữa để gặp nhau, thay vì bắt một bên phải đi trọn quãng đường. Từ hình ảnh không gian cụ thể này, thành ngữ được dùng ẩn dụ cho tinh thần thỏa hiệp công bằng, trong đó cả hai phía cùng nhượng bộ để đạt được thỏa thuận.",
    examples: [
      { en: "If you're willing to meet me halfway on the price, we have a deal.", vi: "Nếu bạn sẵn sàng nhượng bộ một phần về giá, chúng ta có thể thỏa thuận được." },
      { en: "The two departments finally met halfway and agreed on a shared budget.", vi: "Cuối cùng hai phòng ban đã nhượng bộ lẫn nhau và thống nhất về ngân sách chung." }
    ],
    ex: "If you're willing to meet me halfway on the price, we have a deal.",
  },
  {
    slug: "a-pat-on-the-back",
    term: "a pat on the back",
    type: "idiom",
    en: "A pat on the back is praise or congratulation given to someone for doing something well, often used to describe simple recognition or encouragement.",
    vi: "\"A pat on the back\" nghĩa là một lời khen ngợi hay sự công nhận dành cho ai đó vì đã làm tốt việc gì, mang tính động viên, khích lệ.",
    origin: "Cụm từ bắt nguồn từ hành động vỗ nhẹ vào lưng ai đó, một cử chỉ thân thiện và khích lệ phổ biến trong nhiều nền văn hóa phương Tây khi muốn khen ngợi hay động viên người khác. Từ cử chỉ vật lý này, thành ngữ được dùng ẩn dụ để chỉ bất kỳ hình thức khen ngợi hay ghi nhận thành tích nào, không nhất thiết phải có động tác vỗ lưng thật sự.",
    examples: [
      { en: "The whole team deserves a pat on the back for finishing the project early.", vi: "Cả đội xứng đáng được khen ngợi vì đã hoàn thành dự án sớm." },
      { en: "He gave his son a pat on the back after the game, even though they lost.", vi: "Anh ấy đã khen ngợi động viên con trai sau trận đấu, dù đội của cậu bé thua cuộc." }
    ],
    ex: "The whole team deserves a pat on the back for finishing the project early.",
  },
  {
    slug: "put-your-heads-together",
    term: "put your heads together",
    type: "idiom",
    en: "If people put their heads together, they combine their ideas and knowledge by discussing a problem together in order to find a solution.",
    vi: "\"Put your heads together\" nghĩa là mọi người cùng nhau bàn bạc, kết hợp ý tưởng và hiểu biết để tìm ra giải pháp cho một vấn đề.",
    origin: "Hình ảnh gợi đến cảnh nhiều người chụm đầu lại gần nhau, thường là để cùng xem một tài liệu hoặc thì thầm bàn bạc kín đáo. Từ tư thế vật lý \"chụm đầu\" này, thành ngữ mở rộng sang nghĩa ẩn dụ chỉ việc hợp tác trí tuệ, khi nhiều người cùng góp ý kiến để giải quyết một vấn đề chung.",
    examples: [
      { en: "Let's put our heads together and come up with a better plan by tomorrow.", vi: "Hãy cùng nhau bàn bạc và nghĩ ra một kế hoạch tốt hơn trước ngày mai." },
      { en: "The scientists put their heads together to solve the unexpected problem.", vi: "Các nhà khoa học đã cùng nhau bàn bạc để giải quyết vấn đề bất ngờ đó." }
    ],
    ex: "Let's put our heads together and come up with a better plan by tomorrow.",
  },
  {
    slug: "sing-someone-s-praises",
    term: "sing someone's praises",
    type: "idiom",
    en: "If you sing someone's praises, you enthusiastically praise them, often talking about their qualities or achievements to other people.",
    vi: "\"Sing someone's praises\" nghĩa là hết lời khen ngợi ai đó, thường là kể về ưu điểm hay thành tích của họ cho người khác nghe.",
    origin: "Thành ngữ gợi liên tưởng đến truyền thống hát những bài ca ngợi công trạng của vua chúa, anh hùng hay vị thánh trong văn hóa và tôn giáo phương Tây thời xưa, nơi lời ca tụng thường được thể hiện qua âm nhạc. Theo thời gian, cách nói này được dùng rộng rãi hơn để chỉ việc khen ngợi nhiệt tình ai đó bằng lời nói thông thường, không nhất thiết liên quan đến ca hát.",
    examples: [
      { en: "Everyone at the office has been singing her praises since the presentation.", vi: "Mọi người ở văn phòng đều hết lời khen ngợi cô ấy kể từ sau buổi thuyết trình." },
      { en: "My grandmother still sings my grandfather's praises after fifty years of marriage.", vi: "Bà tôi vẫn hết lời ca ngợi ông tôi sau năm mươi năm chung sống." }
    ],
    ex: "Everyone at the office has been singing her praises since the presentation.",
  },
  {
    slug: "take-someone-under-your-wing",
    term: "take someone under your wing",
    type: "idiom",
    en: "If you take someone under your wing, you take responsibility for guiding, protecting, and supporting a less experienced person.",
    vi: "\"Take someone under your wing\" nghĩa là nhận trách nhiệm dìu dắt, bảo vệ và hỗ trợ một người ít kinh nghiệm hơn mình.",
    origin: "Hình ảnh bắt nguồn từ tập tính của loài chim, khi chim mẹ xòe cánh che chở đàn con non nớt khỏi nguy hiểm và thời tiết khắc nghiệt. Từ hình ảnh tự nhiên này, thành ngữ được dùng ẩn dụ trong đời sống con người để chỉ việc một người có kinh nghiệm hơn nhận đỡ đầu, chỉ dạy và bảo vệ một người mới, ít kinh nghiệm hơn.",
    examples: [
      { en: "The senior editor took the new intern under her wing and taught her everything.", vi: "Biên tập viên kỳ cựu đã nhận cô thực tập sinh mới vào diện dìu dắt và dạy cho cô mọi thứ." },
      { en: "A veteran player took the young rookie under his wing during training camp.", vi: "Một cầu thủ kỳ cựu đã dìu dắt cầu thủ trẻ mới vào nghề trong trại tập huấn." }
    ],
    ex: "The senior editor took the new intern under her wing and taught her everything.",
  },
  {
    slug: "a-tower-of-strength-or-a-pillar-of-strength",
    term: "a tower of strength or a pillar of strength",
    type: "idiom",
    en: "If someone is a tower of strength or a pillar of strength, they provide great emotional support and stability to others, especially during a crisis.",
    vi: "\"A tower of strength\" hay \"a pillar of strength\" nghĩa là một người mang lại chỗ dựa tinh thần vững chắc, sự ổn định và sức mạnh cho người khác, đặc biệt trong lúc khủng hoảng.",
    origin: "Hình ảnh \"tower\" (tháp) và \"pillar\" (cột trụ) đều gợi đến những công trình kiến trúc vững chãi, kiên cố, có khả năng chống đỡ và không dễ lay chuyển trước bão tố. Từ hình ảnh kiến trúc đó, thành ngữ được dùng ẩn dụ để mô tả một người có tinh thần vững vàng, đáng tin cậy, luôn là chỗ dựa cho người khác trong những thời khắc khó khăn.",
    examples: [
      { en: "Throughout her illness, her husband was a tower of strength for the whole family.", vi: "Suốt thời gian cô ấy bị bệnh, chồng cô luôn là chỗ dựa vững chắc cho cả gia đình." },
      { en: "Our team captain proved to be a pillar of strength during the toughest match of the season.", vi: "Đội trưởng của chúng tôi đã chứng tỏ là một chỗ dựa vững chắc trong trận đấu khó khăn nhất mùa giải." }
    ],
    ex: "Throughout her illness, her husband was a tower of strength for the whole family.",
  }
  ],
  "involvement-and-interest": [
  {
    slug: "not-be-your-cup-of-tea",
    term: "not be your cup of tea",
    type: "idiom",
    en: "If something is not your cup of tea, it is not the type of thing you enjoy or are interested in, even though other people might like it.",
    vi: "Nếu điều gì đó \"không phải cup of tea\" của bạn, nghĩa là bạn không thích hoặc không hợp với thứ đó, dù người khác có thể rất thích.",
    origin: "Người Anh có truyền thống uống trà từ lâu đời và xem một tách trà ngon là biểu tượng của sự dễ chịu, hợp ý. Cách nói \"my cup of tea\" xuất hiện từ đầu thế kỷ 20 để chỉ những gì hợp khẩu vị, hợp sở thích cá nhân. Khi thêm \"not\", cụm từ chuyển sang nghĩa phủ định, chỉ những gì không hợp gu, không phải \"món\" mình thích. Vì trà là thức uống quen thuộc mà mỗi người có khẩu vị khác nhau, hình ảnh này rất tự nhiên để nói về sở thích cá nhân.",
    examples: [
      { en: "Horror movies are just not my cup of tea; I prefer comedies.", vi: "Phim kinh dị thật sự không hợp gu tôi; tôi thích phim hài hơn." },
      { en: "She tried golf once but decided it wasn't her cup of tea.", vi: "Cô ấy thử chơi golf một lần rồi nhận ra nó không phải sở thích của mình." }
    ],
    ex: "Horror movies are just not my cup of tea; I prefer comedies.",
  },
  {
    slug: "have-an-axe-to-grind",
    term: "have an axe to grind",
    type: "idiom",
    en: "If you have an axe to grind, you have a personal reason for being involved in something or for feeling strongly about it, often because you want to gain an advantage or settle a grievance.",
    vi: "Nếu ai đó \"có một cái rìu để mài\" (have an axe to grind), người đó có mục đích hoặc lý do cá nhân riêng khi tham gia hay lên tiếng về việc gì, thường là để đòi lại công bằng hoặc trục lợi cho bản thân.",
    origin: "Idiom này được cho là bắt nguồn từ nước Mỹ thế kỷ 18-19, khi một người thợ mài dao kéo dạo thường ghé qua các gia đình để mài giúp công cụ, nhưng thực chất mục đích chính của họ là kiếm tiền công chứ không đơn thuần vì lòng tốt. Có một giai thoại gắn với Benjamin Franklin kể về một người lạ nhờ ông giúp mài rìu, rồi lợi dụng lúc ông đang quay tay quay đá mài để hoàn thành việc mài rìu cho xong việc riêng của mình, ngụ ý ẩn giấu động cơ cá nhân. Dù câu chuyện cụ thể có thể chỉ là giai thoại được thêm thắt qua thời gian, hình ảnh \"mài rìu vì lợi ích riêng\" đã trở thành cách diễn đạt phổ biến cho động cơ ngầm.",
    examples: [
      { en: "He kept criticizing the new policy, but everyone knew he had an axe to grind since he'd been passed over for promotion.", vi: "Anh ta liên tục chỉ trích chính sách mới, nhưng ai cũng biết anh ta có mục đích riêng vì đã bị bỏ qua khi xét thăng chức." },
      { en: "The journalist claimed to be neutral, though critics said she had an axe to grind against the company.", vi: "Nhà báo đó tuyên bố mình trung lập, dù nhiều người chỉ trích rằng cô có ý đồ riêng nhắm vào công ty." }
    ],
    ex: "He kept criticizing the new policy, but everyone knew he had an axe to grind since he'd been passed over for promotion.",
  },
  {
    slug: "in-the-picture",
    term: "in the picture",
    type: "idiom",
    en: "If you are in the picture, you are fully informed about a situation and aware of what is happening.",
    vi: "Nếu ai đó \"in the picture\" (ở trong bức tranh), nghĩa là người đó nắm rõ tình hình, được cập nhật đầy đủ thông tin về việc đang diễn ra.",
    origin: "Cụm từ này dùng hình ảnh một \"bức tranh\" toàn cảnh để ví với hiểu biết đầy đủ về một tình huống - ai \"ở trong bức tranh\" thì thấy được toàn bộ cảnh, còn ai \"ngoài bức tranh\" (out of the picture) thì không biết gì hoặc không còn liên quan. Cách dùng ẩn dụ này phổ biến từ giữa thế kỷ 20, có thể liên hệ đến báo chí và nhiếp ảnh khi \"the picture\" từng được dùng để chỉ toàn cảnh sự việc được tường thuật. Do đó \"put someone in the picture\" nghĩa là cập nhật thông tin cho ai đó, còn \"in the picture\" là trạng thái đã được thông tin đầy đủ.",
    examples: [
      { en: "Before the meeting starts, let me put you in the picture about what happened last week.", vi: "Trước khi cuộc họp bắt đầu, để tôi cập nhật cho bạn biết chuyện gì đã xảy ra tuần trước." },
      { en: "Make sure the new manager is in the picture regarding the client's complaints.", vi: "Hãy chắc chắn rằng quản lý mới nắm rõ về những khiếu nại của khách hàng." }
    ],
    ex: "Before the meeting starts, let me put you in the picture about what happened last week.",
  },
  {
    slug: "jump-on-the-bandwagon",
    term: "jump on the bandwagon",
    type: "idiom",
    en: "If you jump on the bandwagon, you start supporting or doing something simply because it has suddenly become popular or successful, not because of genuine belief in it.",
    vi: "\"Nhảy lên xe hoa\" (jump on the bandwagon) nghĩa là bắt đầu ủng hộ hoặc làm theo điều gì đó chỉ vì nó đang thịnh hành, chứ không phải vì bản thân thực sự tin tưởng hay thích điều đó.",
    origin: "\"Bandwagon\" là chiếc xe chở ban nhạc diễu hành trong các đoàn rước hoặc chiến dịch vận động tranh cử ở Mỹ thế kỷ 19, thường đi đầu đoàn diễu hành để thu hút sự chú ý. Khi một ứng viên chính trị được nhiều người ủng hộ, người dân sẽ leo lên xe bandwagon để thể hiện sự ủng hộ, dần dần cụm từ \"jump on the bandwagon\" mang nghĩa gia nhập vào một xu hướng đang được nhiều người theo đuổi. Ngày nay nó thường mang sắc thái hơi tiêu cực, ngụ ý người đó chạy theo phong trào chứ không có lập trường riêng.",
    examples: [
      { en: "Once the app became a hit, dozens of companies jumped on the bandwagon and launched similar products.", vi: "Khi ứng dụng đó trở nên nổi tiếng, hàng chục công ty đã nhảy vào chạy theo trào lưu và tung ra sản phẩm tương tự." },
      { en: "I liked the band before they were famous; I didn't just jump on the bandwagon.", vi: "Tôi thích ban nhạc đó từ trước khi họ nổi tiếng; tôi không phải chỉ chạy theo trào lưu." }
    ],
    ex: "Once the app became a hit, dozens of companies jumped on the bandwagon and launched similar products.",
  },
  {
    slug: "keep-a-low-profile",
    term: "keep a low profile",
    type: "idiom",
    en: "If you keep a low profile, you deliberately avoid attracting attention to yourself, often to stay out of trouble or controversy.",
    vi: "\"Giữ vị thế thấp\" (keep a low profile) nghĩa là cố tình tránh gây sự chú ý, giữ kín tiếng để không bị soi mói hay dính vào rắc rối.",
    origin: "\"Profile\" vốn dùng để chỉ đường nét, hình dáng nhìn nghiêng của một vật hay công trình - một vật có \"low profile\" là vật thấp, không nổi bật, khó bị chú ý, một khái niệm quen thuộc trong quân sự khi xe tăng hoặc công sự thấp giúp tránh bị phát hiện từ xa. Từ nghĩa vật lý đó, cụm từ được mở rộng sang nghĩa bóng từ giữa thế kỷ 20 để chỉ việc một người cố tình không phô trương, không xuất hiện nhiều để tránh bị để ý. Ngược lại \"high profile\" chỉ sự nổi bật, được nhiều người biết đến.",
    examples: [
      { en: "After the scandal, the politician kept a low profile for several months.", vi: "Sau vụ bê bối, chính trị gia đó đã giữ kín tiếng suốt nhiều tháng." },
      { en: "She prefers to keep a low profile at work rather than seek recognition.", vi: "Cô ấy thích âm thầm làm việc hơn là tìm kiếm sự công nhận." }
    ],
    ex: "After the scandal, the politician kept a low profile for several months.",
  },
  {
    slug: "a-labour-of-love",
    term: "a labour of love",
    type: "idiom",
    en: "A labour of love is a task or piece of work that you do because you enjoy it or care deeply about it, not because you are paid or forced to do it.",
    vi: "\"Công việc vì đam mê\" (a labour of love) là một việc bạn làm vì yêu thích hoặc quan tâm sâu sắc đến nó, chứ không phải vì được trả công hay bị bắt buộc.",
    origin: "Cụm từ này bắt nguồn từ Kinh Thánh (Tân Ước), trong đó \"labour of love\" ban đầu chỉ những việc làm xuất phát từ tình yêu thương và đức tin chứ không vì lợi ích vật chất. Qua nhiều thế kỷ, nghĩa của cụm từ được dùng rộng rãi hơn trong đời sống hàng ngày để chỉ bất kỳ công việc vất vả nào mà người làm tự nguyện bỏ công sức vì đam mê hay tình cảm cá nhân, dù không được đền đáp bằng tiền bạc.",
    examples: [
      { en: "Writing this novel took ten years, but it was truly a labour of love for the author.", vi: "Viết cuốn tiểu thuyết này mất mười năm, nhưng đó thực sự là công sức xuất phát từ đam mê của tác giả." },
      { en: "Restoring the old house was a labour of love rather than a way to make money.", vi: "Việc phục chế ngôi nhà cũ là công việc làm vì đam mê chứ không phải để kiếm tiền." }
    ],
    ex: "Writing this novel took ten years, but it was truly a labour of love for the author.",
  },
  {
    slug: "mean-business",
    term: "mean business",
    type: "idiom",
    en: "If someone means business, they are serious about what they intend to do and are determined to act on it, so they should be taken seriously.",
    vi: "\"Mean business\" nghĩa là ai đó nghiêm túc và quyết tâm với điều mình định làm, không phải chỉ nói suông, nên cần được xem trọng.",
    origin: "Cách dùng \"business\" ở đây không liên quan đến kinh doanh mà mang nghĩa cổ hơn của từ này là \"việc nghiêm túc, việc quan trọng cần giải quyết\". Cụm từ xuất hiện từ thế kỷ 19, khi \"business\" được dùng để chỉ ý định thực sự, nghiêm túc của một người, khác với việc chỉ nói chơi. \"Mean business\" vì vậy nghĩa là \"có ý định nghiêm túc\", ngày nay thường dùng để cảnh báo rằng ai đó không đùa và sẽ hành động thật.",
    examples: [
      { en: "When the coach started running extra drills, the players knew he meant business.", vi: "Khi huấn luyện viên bắt đầu cho tập thêm bài tập, các cầu thủ biết ông ấy đang rất nghiêm túc." },
      { en: "The new manager fired two employees on her first day - she clearly meant business.", vi: "Quản lý mới sa thải hai nhân viên ngay ngày đầu tiên - rõ ràng cô ấy rất nghiêm túc và quyết liệt." }
    ],
    ex: "When the coach started running extra drills, the players knew he meant business.",
  },
  {
    slug: "a-nosey-parker",
    term: "a nosey parker",
    type: "idiom",
    en: "A nosey parker is someone who is excessively curious about other people's private affairs and often interferes or pries into matters that do not concern them.",
    vi: "\"Nosey parker\" là người quá tò mò về chuyện riêng tư của người khác, thường xen vào hoặc dò xét những việc không liên quan đến mình.",
    origin: "Nguồn gốc chính xác của cụm từ này không rõ ràng. Một giả thuyết phổ biến liên hệ nó với Matthew Parker, Tổng giám mục Canterbury thế kỷ 16, người nổi tiếng vì thích tìm hiểu kỹ lưỡng, chi tiết về công việc nội bộ của giáo hội, khiến một số người gán cho ông biệt danh mang tính châm biếm này. Một giả thuyết khác cho rằng \"Parker\" liên quan đến những người dò la, rình mò các đôi tình nhân trong công viên Hyde Park ở London vào thế kỷ 19. Vì chưa có bằng chứng dứt khoát cho cách giải thích nào, nhiều nhà ngôn ngữ học chỉ xem đây là các giả thuyết dân gian chưa được kiểm chứng.",
    examples: [
      { en: "Don't be such a nosey parker - it's none of your business who she's dating.", vi: "Đừng có tò mò chuyện người khác như vậy - cô ấy hẹn hò với ai không phải việc của bạn." },
      { en: "The neighbours are real nosey parkers; they watch everyone who comes and goes.", vi: "Mấy người hàng xóm đó thật sự rất hay tò mò; họ theo dõi từng người ra vào." }
    ],
    ex: "Don't be such a nosey parker - it's none of your business who she's dating.",
  },
  {
    slug: "poke-your-nose-into-something-or-stick-your-nose-into-something",
    term: "poke your nose into something or stick your nose into something",
    type: "idiom",
    en: "If you poke or stick your nose into something, you interfere in a matter that does not concern you, usually without being asked or wanted.",
    vi: "\"Thò mũi vào chuyện gì đó\" (poke/stick your nose into something) nghĩa là can thiệp, xen vào một việc không liên quan đến mình, thường là không được mời hay không được hoan nghênh.",
    origin: "Hình ảnh cái mũi ở đây tượng trưng cho sự tò mò, giống như cách nhiều loài vật thường dùng mũi để dò xét, hít ngửi xung quanh trước khi tiến vào một khu vực. Cụm từ ẩn dụ này đã xuất hiện trong tiếng Anh từ khá lâu, ví von việc \"chõ mũi\" vào chuyện người khác giống như việc chưa được mời mà đã tự ý xâm nhập, xen vào không gian riêng tư của người khác. Cách nói này rất gần gũi vì mũi luôn ở \"phía trước\" cơ thể, tượng trưng cho việc dẫn đầu, đi trước để dò xét, tọc mạch.",
    examples: [
      { en: "I wish my brother would stop poking his nose into my personal life.", vi: "Tôi ước gì anh trai tôi ngừng thò mũi vào chuyện riêng tư của tôi." },
      { en: "You shouldn't stick your nose into other people's marriages.", vi: "Bạn không nên xen vào chuyện hôn nhân của người khác." }
    ],
    ex: "I wish my brother would stop poking his nose into my personal life.",
  },
  {
    slug: "steer-clear-of-something",
    term: "steer clear of something",
    type: "idiom",
    en: "If you steer clear of something, you deliberately avoid it, especially because you think it might cause problems or trouble.",
    vi: "\"Steer clear of something\" nghĩa là chủ động tránh né điều gì đó, đặc biệt vì nghĩ rằng nó có thể gây rắc rối hoặc nguy hiểm.",
    origin: "\"Steer\" nguyên nghĩa là lái, điều khiển một phương tiện như tàu thuyền hay xe cộ, còn \"clear of\" nghĩa là tránh xa, không va chạm. Cụm từ này bắt nguồn từ ngôn ngữ hàng hải, khi người lái tàu phải \"steer clear\" của đá ngầm hay chướng ngại vật để tránh tai nạn. Qua thời gian, hình ảnh lái tàu tránh nguy hiểm đó được dùng rộng rãi sang nghĩa bóng, chỉ việc tránh né bất kỳ tình huống, con người hay chủ đề nào có thể gây rắc rối trong đời sống hàng ngày.",
    examples: [
      { en: "I try to steer clear of arguments about politics at family dinners.", vi: "Tôi cố tránh những cuộc tranh luận về chính trị trong các bữa ăn gia đình." },
      { en: "You should steer clear of that neighbourhood late at night.", vi: "Bạn nên tránh khu vực đó vào đêm khuya." }
    ],
    ex: "I try to steer clear of arguments about politics at family dinners.",
  },
  {
    slug: "try-your-hand-at-something",
    term: "try your hand at something",
    type: "idiom",
    en: "If you try your hand at something, you attempt to do an activity for the first time, usually to see whether you have any skill or interest in it.",
    vi: "\"Thử tay nghề vào việc gì đó\" (try your hand at something) nghĩa là thử làm một việc lần đầu tiên, thường để xem mình có khả năng hay hứng thú với việc đó hay không.",
    origin: "\"Hand\" trong cụm từ này tượng trưng cho kỹ năng và sự khéo léo thực hành, vì hầu hết các công việc thủ công truyền thống - từ làm mộc, nấu ăn đến hội họa - đều đòi hỏi đôi tay khéo léo. Cụm từ \"try one's hand\" xuất hiện từ khoảng thế kỷ 18, ví việc lần đầu thử sức với một nghề hay kỹ năng mới như việc \"đưa tay ra\" để kiểm nghiệm khả năng của bản thân trong lĩnh vực đó.",
    examples: [
      { en: "During the holiday, he decided to try his hand at cooking Thai food.", vi: "Trong kỳ nghỉ, anh ấy quyết định thử sức nấu món ăn Thái." },
      { en: "She's always wanted to try her hand at painting, so she signed up for a class.", vi: "Cô ấy luôn muốn thử sức với hội họa, nên đã đăng ký một lớp học." }
    ],
    ex: "During the holiday, he decided to try his hand at cooking Thai food.",
  },
  {
    slug: "up-to-your-ears",
    term: "up to your ears",
    type: "idiom",
    en: "If you are up to your ears in something, especially work or problems, you are extremely busy or deeply involved in dealing with a large amount of it.",
    vi: "\"Ngập đến tận tai\" (up to your ears in something) nghĩa là cực kỳ bận rộn hoặc ngập đầu trong một lượng lớn công việc hay vấn đề nào đó.",
    origin: "Cụm từ dùng hình ảnh phóng đại một người bị \"ngập\" trong thứ gì đó đến mức nước hay đồ vật dâng lên tận tai - gần như chìm nghỉm, không còn lối thoát. Hình ảnh cường điệu này tương tự các cách nói khác như \"up to your neck\" hay \"up to your eyeballs\", đều diễn tả mức độ ngập lụt gần như tuyệt đối. Từ nghĩa đen về việc bị ngập nước hay bùn lầy, cụm từ được dùng ẩn dụ để chỉ việc bị công việc hoặc vấn đề \"nhấn chìm\" đến mức quá tải.",
    examples: [
      { en: "I can't go out tonight - I'm up to my ears in homework.", vi: "Tối nay tôi không thể đi chơi được - tôi đang ngập đầu trong bài tập." },
      { en: "The accounting team is up to their ears in paperwork before the tax deadline.", vi: "Đội kế toán đang ngập đầu trong giấy tờ trước hạn nộp thuế." }
    ],
    ex: "I can't go out tonight - I'm up to my ears in homework.",
  },
  {
    slug: "whet-someone-s-appetite",
    term: "whet someone's appetite",
    type: "idiom",
    en: "If something whets your appetite, it increases your desire or enthusiasm for something, often by giving you a small taste or preview of it.",
    vi: "\"Kích thích sự thèm muốn của ai đó\" (whet someone's appetite) nghĩa là làm tăng ham muốn hoặc hứng thú của người đó đối với điều gì, thường bằng cách cho họ nếm trải hay xem trước một phần nhỏ.",
    origin: "\"Whet\" là một động từ cổ nghĩa là mài cho sắc bén, ví dụ mài dao. Từ nghĩa \"mài sắc\" này, \"whet the appetite\" ban đầu mang nghĩa đen là làm cho cảm giác thèm ăn trở nên sắc bén, mạnh mẽ hơn - giống như cách một món khai vị nhỏ trước bữa ăn kích thích dạ dày muốn ăn nhiều hơn. Qua thời gian, cụm từ được dùng ẩn dụ sang mọi loại ham muốn hay hứng thú, không chỉ với đồ ăn, mà cả với trải nghiệm, thông tin hay hoạt động nói chung.",
    examples: [
      { en: "The movie trailer really whetted my appetite for the full film.", vi: "Đoạn giới thiệu phim thực sự khiến tôi rất háo hức muốn xem trọn bộ phim." },
      { en: "Reading the first chapter whetted her appetite for the rest of the book.", vi: "Đọc chương đầu tiên khiến cô ấy càng thèm muốn đọc hết phần còn lại của cuốn sách." }
    ],
    ex: "The movie trailer really whetted my appetite for the full film.",
  },
  {
    slug: "your-heart-isn-t-in-something",
    term: "your heart isn't in something",
    type: "idiom",
    en: "If your heart isn't in something, you do not feel genuine enthusiasm, interest, or commitment towards it, even though you may still be doing it.",
    vi: "\"Trái tim không đặt vào việc gì đó\" (your heart isn't in something) nghĩa là bạn không thực sự có hứng thú, nhiệt huyết hay cam kết với việc đó, dù vẫn có thể đang làm nó.",
    origin: "Trái tim từ lâu đã là biểu tượng phổ biến trong nhiều nền văn hóa, trong đó có văn hóa Anh, để chỉ tình cảm, đam mê và sự chân thành của con người. Khi nói \"trái tim không ở trong đó\", cụm từ ngụ ý rằng dù cơ thể hay hành động vẫn tham gia, nhưng cảm xúc và động lực thực sự lại vắng mặt. Đây là một ẩn dụ tự nhiên và lâu đời, phản ánh cách con người thường tách \"hành động bên ngoài\" khỏi \"cảm xúc bên trong\" khi nói về sự tận tâm hay đam mê.",
    examples: [
      { en: "He kept practising the piano, but his heart wasn't in it anymore.", vi: "Anh ấy vẫn tiếp tục luyện piano, nhưng trái tim anh không còn đặt vào đó nữa." },
      { en: "She finished the project on time, though her heart clearly wasn't in it.", vi: "Cô ấy hoàn thành dự án đúng hạn, dù rõ ràng cô không thực sự tâm huyết với nó." }
    ],
    ex: "He kept practising the piano, but his heart wasn't in it anymore.",
  }
  ],
  "starting-and-stopping": [
  {
    slug: "call-it-a-day",
    term: "call it a day",
    type: "idiom",
    en: "If you call it a day, you decide to stop doing something, usually a piece of work, for the rest of that day because you feel you have done enough or you are too tired to continue.",
    vi: "Quyết định dừng công việc đang làm lại, coi như xong việc trong ngày hôm đó vì đã làm đủ hoặc đã thấm mệt.",
    origin: "Cụm từ này được cho là bắt nguồn từ cách nói cũ hơn \"call it half a day\", xuất hiện ở Mỹ vào thế kỷ 19, dùng khi công nhân rời xưởng sớm dù mới làm được nửa ngày công. Theo thời gian, người ta bỏ chữ \"half\" và rút gọn thành \"call it a day\" để chỉ việc dừng lại bất cứ lúc nào trong ngày, không nhất thiết là làm chưa đủ giờ. Ngày nay cụm từ này mang nghĩa trung tính hơn, đơn giản là thông báo kết thúc một hoạt động.",
    examples: [
      { en: "We've fixed the main bug and tested it twice, so let's call it a day and finish the rest tomorrow.", vi: "Chúng ta đã sửa xong lỗi chính và kiểm tra hai lần rồi, nên hôm nay dừng ở đây, mai làm tiếp phần còn lại." },
      { en: "After eight hours of hiking, the group decided to call it a day and set up camp before it got dark.", vi: "Sau tám tiếng đi bộ đường dài, cả nhóm quyết định dừng lại và dựng trại trước khi trời tối." }
    ],
    ex: "We've fixed the main bug and tested it twice, so let's call it a day and finish the rest tomorrow.",
  },
  {
    slug: "call-it-quits",
    term: "call it quits",
    type: "idiom",
    en: "If you call it quits, you decide to stop doing an activity permanently, or you and someone else agree to end a relationship, argument, or arrangement, often treating things as even or settled.",
    vi: "Quyết định chấm dứt hẳn một việc gì đó, hoặc hai bên đồng ý kết thúc một mối quan hệ hay thỏa thuận, coi như huề, không ai nợ ai nữa.",
    origin: "Từ \"quits\" trong cụm này liên quan đến động từ \"quit\" với nghĩa cổ là \"được giải thoát khỏi nghĩa vụ, coi như huề\", bắt nguồn từ tiếng Latin thời trung cổ \"quittus\". Người Anh xưa có cách nói \"cry quits\" để tuyên bố một khoản nợ hoặc một cuộc chơi đã ngang bằng, không ai còn nợ ai. Cụm \"call it quits\" phát triển từ đó, ban đầu dùng trong chuyện nợ nần, cờ bạc, sau mở rộng sang nghĩa chung là dừng hẳn bất kỳ việc gì, kể cả một mối quan hệ.",
    examples: [
      { en: "After three failed attempts to fix the old car, he finally decided to call it quits and buy a new one.", vi: "Sau ba lần sửa xe cũ không thành, cuối cùng anh ấy quyết định bỏ cuộc và mua một chiếc xe mới." },
      { en: "The two business partners argued for months before agreeing to call it quits and split the company.", vi: "Hai người hợp tác kinh doanh tranh cãi suốt mấy tháng trước khi đồng ý chấm dứt và chia tách công ty." }
    ],
    ex: "After three failed attempts to fix the old car, he finally decided to call it quits and buy a new one.",
  },
  {
    slug: "cut-your-losses",
    term: "cut your losses",
    type: "idiom",
    en: "If you cut your losses, you stop doing something that is failing or costing you money or time, before the situation gets even worse.",
    vi: "Dừng lại kịp thời với một việc đang thất bại hoặc gây thiệt hại, để không bị thiệt hại nặng hơn nữa.",
    origin: "Cụm từ này bắt nguồn từ lĩnh vực đầu tư và tài chính, nơi nhà đầu tư được khuyên nên bán ngay một cổ phiếu đang mất giá thay vì chờ đợi hy vọng giá hồi phục, để tránh lỗ thêm. Từ ngữ cảnh tài chính, cách diễn đạt này dần được dùng rộng rãi hơn cho bất kỳ tình huống nào cần dừng một quyết định sai lầm càng sớm càng tốt, kể cả trong công việc hay quan hệ cá nhân.",
    examples: [
      { en: "The startup had spent almost all its funding, so the founders decided to cut their losses and shut it down.", vi: "Công ty khởi nghiệp đã tiêu gần hết vốn, nên các nhà sáng lập quyết định dừng lại để tránh lỗ thêm và đóng cửa công ty." },
      { en: "I should have cut my losses after the first bad date instead of trying two more times.", vi: "Lẽ ra tôi nên dừng lại ngay sau buổi hẹn đầu tiên tệ hại, thay vì cố thử thêm hai lần nữa." }
    ],
    ex: "The startup had spent almost all its funding, so the founders decided to cut their losses and shut it down.",
  },
  {
    slug: "enough-is-enough",
    term: "enough is enough",
    type: "idiom",
    en: "You say enough is enough when a situation, a behaviour, or a problem has gone on for too long and has become unacceptable, and it must stop right now.",
    vi: "Câu nói dùng khi một tình huống hay hành vi nào đó đã diễn ra quá đủ, không thể chịu đựng thêm được nữa và phải chấm dứt ngay.",
    origin: "Đây là một cách nói nhấn mạnh dựa trên việc lặp lại chính từ \"enough\", một kiểu chơi chữ phổ biến trong tiếng Anh để tăng sức nặng cảm xúc cho câu nói, tương tự như \"a deal is a deal\". Nó không gắn với một câu chuyện lịch sử cụ thể nào, mà đơn giản là cách diễn đạt tự nhiên phát triển trong ngôn ngữ nói hằng ngày để thể hiện sự bức xúc đã lên đến giới hạn.",
    examples: [
      { en: "After the third late delivery this month, the manager said enough is enough and cancelled the contract.", vi: "Sau lần giao hàng trễ thứ ba trong tháng, người quản lý nói rằng đã quá đủ rồi và hủy hợp đồng." },
      { en: "Enough is enough — I'm not lending him any more money until he pays back what he already owes.", vi: "Đủ rồi đấy — tôi sẽ không cho anh ta mượn thêm tiền nữa cho đến khi trả hết số nợ cũ." }
    ],
    ex: "After the third late delivery this month, the manager said enough is enough and cancelled the contract.",
  },
  {
    slug: "from-scratch",
    term: "from scratch",
    type: "idiom",
    en: "If you do or make something from scratch, you start from the very beginning, without using any existing materials, plans, or preparation done in advance.",
    vi: "Làm điều gì đó từ con số không, bắt đầu hoàn toàn từ đầu mà không dựa vào bất kỳ sự chuẩn bị hay nguyên liệu có sẵn nào trước đó.",
    origin: "Nguồn gốc của cụm từ này gắn với thể thao, cụ thể là các môn điền kinh và đua thuyền thời xưa, khi vạch xuất phát được cào hoặc kẻ (scratch) trực tiếp lên mặt đất. Những vận động viên không được chấp điểm trước phải xuất phát \"from scratch\", tức là từ đúng vạch xuất phát ban đầu, khác với những người được ưu tiên chạy trước một đoạn. Từ đó, cụm từ mở rộng nghĩa sang việc bắt đầu bất cứ việc gì mà không có lợi thế hay nền tảng có sẵn.",
    examples: [
      { en: "Instead of using a store-bought sauce, my grandmother always makes her curry from scratch.", vi: "Thay vì dùng nước sốt mua sẵn, bà tôi luôn tự nấu nước cà ri từ đầu." },
      { en: "When the old system was hacked, the IT team had to rebuild the whole database from scratch.", vi: "Khi hệ thống cũ bị tấn công, đội kỹ thuật phải xây dựng lại toàn bộ cơ sở dữ liệu từ con số không." }
    ],
    ex: "Instead of using a store-bought sauce, my grandmother always makes her curry from scratch.",
  },
  {
    slug: "grind-to-a-halt",
    term: "grind to a halt",
    type: "idiom",
    en: "If a process, a machine, or an activity grinds to a halt, it gradually slows down and eventually stops completely, usually because of a problem.",
    vi: "Một quá trình, cỗ máy hoặc hoạt động nào đó chậm dần lại rồi dừng hẳn, thường vì gặp trục trặc.",
    origin: "Hình ảnh gốc của cụm từ này là những cỗ máy có bánh răng, khi thiếu dầu bôi trơn hoặc bị hỏng hóc, các bánh răng sẽ cọ xát (grind) vào nhau, phát ra tiếng nghiến và chuyển động chậm dần cho đến khi ngừng hẳn. Từ hình ảnh cơ khí cụ thể này, cách nói được dùng ẩn dụ cho bất kỳ hoạt động, dự án hay hệ thống nào đang vận hành mà bỗng chậm lại rồi tê liệt hoàn toàn.",
    examples: [
      { en: "Traffic in the city centre ground to a halt after the accident blocked two lanes.", vi: "Giao thông ở trung tâm thành phố tắc nghẽn hoàn toàn sau khi vụ tai nạn chặn mất hai làn đường." },
      { en: "Production ground to a halt when the main supplier stopped delivering raw materials.", vi: "Sản xuất bị đình trệ hoàn toàn khi nhà cung cấp chính ngừng giao nguyên liệu." }
    ],
    ex: "Traffic in the city centre ground to a halt after the accident blocked two lanes.",
  },
  {
    slug: "hit-the-ground-running",
    term: "hit the ground running",
    type: "idiom",
    en: "If you hit the ground running, you start a new job, project, or activity with great energy and speed right from the very beginning, without needing time to prepare or adjust.",
    vi: "Bắt tay ngay vào việc mới với tốc độ và năng lượng cao ngay từ đầu, không cần thời gian làm quen hay khởi động chậm.",
    origin: "Nguồn gốc chính xác của cụm từ này không hoàn toàn rõ ràng và có vài cách giải thích khác nhau. Một giả thuyết phổ biến gắn nó với lính dù, những người phải chạy ngay khi vừa tiếp đất để tránh bị thương hoặc để nhanh chóng vào vị trí chiến đấu. Một giả thuyết khác lại gắn với hình ảnh những người nhảy khỏi tàu hỏa đang chạy chậm và phải chạy ngay theo đà để không bị ngã. Dù nguồn gốc cụ thể chưa chắc chắn, cả hai hình ảnh đều nhấn mạnh việc hành động ngay lập tức, không có khoảng dừng.",
    examples: [
      { en: "The new manager hit the ground running, reorganising the team's schedule on her very first day.", vi: "Người quản lý mới bắt tay vào việc ngay lập tức, sắp xếp lại lịch làm việc của cả đội ngay trong ngày đầu tiên." },
      { en: "Because he had studied the project beforehand, he was able to hit the ground running when he joined the company.", vi: "Vì đã tìm hiểu trước về dự án, anh ấy có thể bắt nhịp công việc ngay lập tức khi vào công ty." }
    ],
    ex: "The new manager hit the ground running, reorganising the team's schedule on her very first day.",
  },
  {
    slug: "in-business",
    term: "in business",
    type: "idiom",
    en: "If a company or shop is in business, it is operating and open to sell its products or services. Informally, if you say someone is in business, you mean they are now ready and able to proceed with something.",
    vi: "Chỉ việc một công ty hay cửa hàng đang hoạt động, mở cửa kinh doanh; theo nghĩa thông tục, cũng dùng để nói ai đó đã sẵn sàng và có thể bắt đầu tiến hành việc gì đó.",
    origin: "Nghĩa đen của cụm từ này đơn giản là mô tả một doanh nghiệp đang hoạt động hợp pháp và có khách hàng, trái ngược với việc đã đóng cửa hay phá sản. Từ nghĩa thương mại cụ thể đó, người nói tiếng Anh dần mở rộng cách dùng sang những tình huống không liên quan đến kinh doanh, chỉ đơn giản là thông báo rằng mọi thứ đã sẵn sàng để bắt đầu, giống như một cửa hàng vừa mở cửa đón khách.",
    examples: [
      { en: "The bakery has been in business on this street corner for over thirty years.", vi: "Tiệm bánh này đã hoạt động ở góc phố này hơn ba mươi năm rồi." },
      { en: "Once we plug in the new router and enter the password, we should be in business.", vi: "Một khi cắm bộ định tuyến mới và nhập mật khẩu, chúng ta sẽ sẵn sàng hoạt động ngay." }
    ],
    ex: "The bakery has been in business on this street corner for over thirty years.",
  },
  {
    slug: "knock-something-on-the-head",
    term: "knock something on the head",
    type: "idiom",
    en: "If you knock something on the head, you stop a plan, idea, habit, or activity, usually deliberately and often before it causes more trouble.",
    vi: "Chủ động dập tắt hoặc dừng hẳn một kế hoạch, ý tưởng hay thói quen nào đó, thường là để tránh gây thêm rắc rối.",
    origin: "Hình ảnh gốc của cụm từ này khá trực diện: đập vào đầu một con vật để giết hoặc làm nó bất động ngay lập tức, một cách nói từng xuất hiện trong bối cảnh săn bắn hay giết mổ. Từ hành động chấm dứt sự sống một cách dứt khoát đó, cụm từ được dùng ẩn dụ cho việc chấm dứt hoàn toàn một ý tưởng, kế hoạch hay lời đồn, giống như việc \"giết chết\" nó ngay lập tức.",
    examples: [
      { en: "The board knocked the merger plan on the head after seeing the company's latest financial report.", vi: "Ban giám đốc dập tắt kế hoạch sáp nhập sau khi xem báo cáo tài chính mới nhất của công ty." },
      { en: "She decided to knock the rumour on the head by explaining exactly what had happened at the meeting.", vi: "Cô ấy quyết định dập tắt tin đồn bằng cách giải thích rõ ràng chuyện gì đã xảy ra trong cuộc họp." }
    ],
    ex: "The board knocked the merger plan on the head after seeing the company's latest financial report.",
  },
  {
    slug: "nip-something-in-the-bud",
    term: "nip something in the bud",
    type: "idiom",
    en: "If you nip something in the bud, you stop a problem, habit, or plan at a very early stage, before it has a chance to grow or become more serious.",
    vi: "Ngăn chặn một vấn đề, thói quen xấu hay kế hoạch từ khi nó mới chớm xuất hiện, không để nó phát triển thành chuyện lớn.",
    origin: "Cụm từ này bắt nguồn từ nghề làm vườn, khi người trồng cây bấm bỏ (nip) chồi non hoặc nụ hoa (bud) ngay khi vừa mọc, để cây không mọc lệch hướng hoặc để tập trung dinh dưỡng cho phần khác. Vì việc bấm chồi diễn ra ở giai đoạn sớm nhất trước khi hoa hay cành kịp phát triển, cụm từ được dùng ẩn dụ từ khoảng thế kỷ 16-17 cho việc ngăn chặn bất kỳ vấn đề nào ngay từ trứng nước.",
    examples: [
      { en: "The teacher noticed the bad habit early and nipped it in the bud before it spread to the rest of the class.", vi: "Giáo viên nhận ra thói quen xấu từ sớm và dập tắt nó ngay trước khi lan ra cả lớp." },
      { en: "Managers should nip small conflicts in the bud instead of letting them grow into major disputes.", vi: "Người quản lý nên giải quyết những mâu thuẫn nhỏ từ đầu thay vì để chúng phát triển thành tranh chấp lớn." }
    ],
    ex: "The teacher noticed the bad habit early and nipped it in the bud before it spread to the rest of the class.",
  },
  {
    slug: "set-the-ball-rolling-or-start-the-ball-rolling",
    term: "set the ball rolling or start the ball rolling",
    type: "idiom",
    en: "If you set or start the ball rolling, you begin an activity, discussion, or process, especially one that involves other people, so that it can continue by itself afterwards.",
    vi: "Khởi động một hoạt động, cuộc thảo luận hay quá trình nào đó, đặc biệt là để mọi việc sau đó có thể tiếp tục diễn ra suôn sẻ.",
    origin: "Cụm từ này gợi lên hình ảnh của các trò chơi bóng cổ như bowls hay croquet, trong đó người chơi phải đẩy quả bóng lăn đi để bắt đầu ván chơi, và một khi bóng đã lăn thì trò chơi cứ thế tiếp diễn theo đà. Từ hình ảnh thể thao cụ thể này, cụm từ được dùng ẩn dụ cho việc khởi xướng bất kỳ hoạt động nào để nó tự vận hành tiếp theo, chẳng hạn như bắt đầu một cuộc thảo luận hay một dự án.",
    examples: [
      { en: "To set the ball rolling, the host asked each guest to introduce themselves briefly.", vi: "Để bắt đầu buổi gặp mặt, người chủ trì yêu cầu mỗi khách mời tự giới thiệu ngắn gọn về bản thân." },
      { en: "Our first customer's positive review really started the ball rolling for the new shop.", vi: "Đánh giá tích cực của khách hàng đầu tiên thực sự đã khởi động thành công cho cửa hàng mới." }
    ],
    ex: "To set the ball rolling, the host asked each guest to introduce themselves briefly.",
  },
  {
    slug: "turn-over-a-new-leaf",
    term: "turn over a new leaf",
    type: "idiom",
    en: "If you turn over a new leaf, you start behaving in a better or more responsible way than before, leaving old bad habits or mistakes behind.",
    vi: "Bắt đầu sống hoặc hành xử tốt hơn, có trách nhiệm hơn, từ bỏ những thói quen hay sai lầm cũ.",
    origin: "Trong cụm từ này, \"leaf\" mang nghĩa cổ là một trang sách, không phải chiếc lá cây. Hình ảnh gốc là việc lật sang một trang sách mới, sạch sẽ và chưa viết gì, tượng trưng cho một khởi đầu mới không còn vướng bận những gì đã viết ở trang trước. Cách dùng ẩn dụ này đã xuất hiện trong tiếng Anh từ khoảng thế kỷ 16, để chỉ việc một người quyết tâm thay đổi và sống tốt hơn.",
    examples: [
      { en: "After his health scare, he turned over a new leaf and started exercising every morning.", vi: "Sau cú sốc về sức khỏe, anh ấy đã thay đổi hoàn toàn và bắt đầu tập thể dục mỗi sáng." },
      { en: "The company promised investors it had turned over a new leaf and would be more transparent from now on.", vi: "Công ty hứa với các nhà đầu tư rằng họ đã thay đổi hoàn toàn và sẽ minh bạch hơn kể từ giờ." }
    ],
    ex: "After his health scare, he turned over a new leaf and started exercising every morning.",
  },
  {
    slug: "up-and-running",
    term: "up and running",
    type: "idiom",
    en: "If a system, machine, business, or project is up and running, it has been started and is now working properly and functioning as intended.",
    vi: "Một hệ thống, máy móc, doanh nghiệp hay dự án đã được khởi động và đang hoạt động ổn định, đúng như dự kiến.",
    origin: "Cụm từ này có nguồn gốc gắn với máy móc và thiết bị kỹ thuật, đặc biệt phổ biến hơn cùng với sự phát triển của máy tính và hệ thống công nghiệp trong thế kỷ 20, khi người ta cần diễn tả trạng thái một hệ thống đã được bật lên (up) và đang chạy ổn định (running) sau khi lắp đặt hoặc sửa chữa. Từ ngữ cảnh kỹ thuật đó, cụm từ dần được dùng rộng rãi cho bất kỳ điều gì, kể cả một doanh nghiệp hay dự án, đã đi vào hoạt động trơn tru.",
    examples: [
      { en: "It took the technicians two days to get the new server up and running.", vi: "Đội kỹ thuật mất hai ngày để đưa máy chủ mới vào hoạt động ổn định." },
      { en: "Within a month of opening, the small café was already up and running smoothly with regular customers.", vi: "Chỉ trong vòng một tháng mở cửa, quán cà phê nhỏ đã hoạt động trơn tru với lượng khách quen ổn định." }
    ],
    ex: "It took the technicians two days to get the new server up and running.",
  }
  ],
  "effort": [
  {
    slug: "break-your-back",
    term: "break your back",
    type: "idiom",
    en: "If you break your back to do something, you work extremely hard and put in a great deal of effort to achieve it, often to the point of physical or mental exhaustion.",
    vi: "Nếu ai đó \"break your back\" để làm việc gì, nghĩa là họ làm việc cật lực, dốc hết sức lực đến mức gần như kiệt sức để hoàn thành việc đó.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh lao động chân tay nặng nhọc, như cày ruộng, khuân vác hay xây dựng, những công việc khiến lưng người lao động phải chịu áp lực rất lớn. Từ đó, cụm từ \"break your back\" được dùng theo nghĩa bóng để chỉ bất kỳ nỗ lực nào - dù là thể chất hay trí óc - đòi hỏi sự cố gắng cực độ. Ngày nay người ta dùng thành ngữ này ngay cả khi công việc không liên quan gì đến sức lực tay chân, miễn là nó đòi hỏi sự dốc sức lớn.",
    examples: [
      { en: "She broke her back studying for months to pass the bar exam.", vi: "Cô ấy đã dốc hết sức học hành suốt nhiều tháng trời để vượt qua kỳ thi luật sư." },
      { en: "The farmers broke their backs in the fields from dawn until dusk.", vi: "Những người nông dân làm việc quần quật ngoài đồng từ sáng sớm đến tối mịt." }
    ],
    ex: "She broke her back studying for months to pass the bar exam.",
  },
  {
    slug: "burn-the-candle-at-both-ends",
    term: "burn the candle at both ends",
    type: "idiom",
    en: "If you burn the candle at both ends, you exhaust yourself by working or staying active for very long hours, leaving too little time to rest or sleep.",
    vi: "\"Burn the candle at both ends\" nghĩa là làm việc hoặc hoạt động quá sức trong thời gian dài, thức khuya dậy sớm liên tục đến mức không còn đủ thời gian nghỉ ngơi.",
    origin: "Thành ngữ xuất phát từ hình ảnh một cây nến được đốt cùng lúc ở cả hai đầu thay vì chỉ một đầu như bình thường - nến sẽ cháy nhanh hơn và tàn lụi sớm hơn nhiều. Hình ảnh này được dùng ẩn dụ cho việc con người tiêu hao sức lực của bản thân quá nhanh vì làm việc, học tập hay vui chơi liên tục không nghỉ. Cách dùng này đã xuất hiện trong tiếng Anh từ khá lâu, ban đầu mang nghĩa tiêu xài phung phí của cải, trước khi chuyển sang nghĩa phổ biến hiện nay là kiệt sức vì làm việc quá độ.",
    examples: [
      { en: "He's been burning the candle at both ends lately, working two jobs and studying at night.", vi: "Gần đây anh ấy thức khuya dậy sớm liên tục, vừa làm hai công việc vừa học vào ban đêm." },
      { en: "You'll get sick if you keep burning the candle at both ends like this.", vi: "Bạn sẽ đổ bệnh mất nếu cứ tiếp tục làm việc kiệt sức thế này." }
    ],
    ex: "He's been burning the candle at both ends lately, working two jobs and studying at night.",
  },
  {
    slug: "cut-corners",
    term: "cut corners",
    type: "idiom",
    en: "If you cut corners, you do something in the cheapest or easiest way possible, often by skipping necessary steps or lowering quality and safety standards.",
    vi: "\"Cut corners\" nghĩa là làm việc gì đó theo cách rẻ nhất hoặc dễ nhất, thường bằng cách bỏ qua các bước cần thiết hoặc hạ thấp chất lượng, độ an toàn.",
    origin: "Thành ngữ này gợi lên hình ảnh một người đi tắt qua góc của một khu vực thay vì đi vòng theo đúng lối, nhằm tiết kiệm thời gian và quãng đường di chuyển. Từ nghĩa đen về việc rút ngắn đường đi, thành ngữ dần được dùng theo nghĩa bóng để chỉ việc bỏ bớt công đoạn hay tiêu chuẩn trong công việc nhằm tiết kiệm thời gian, công sức hoặc chi phí, dù điều đó có thể ảnh hưởng xấu đến kết quả.",
    examples: [
      { en: "The construction company was fined for cutting corners on fire safety regulations.", vi: "Công ty xây dựng đã bị phạt vì cắt giảm các quy định an toàn phòng cháy chữa cháy." },
      { en: "Don't cut corners on your homework just because you're in a hurry.", vi: "Đừng làm bài tập qua loa chỉ vì bạn đang vội." }
    ],
    ex: "The construction company was fined for cutting corners on fire safety regulations.",
  },
  {
    slug: "not-do-things-by-halves",
    term: "not do things by halves",
    type: "idiom",
    en: "If someone does not do things by halves, they always complete a task fully and thoroughly, giving it their complete effort rather than a partial one.",
    vi: "Nếu ai đó \"không làm việc gì nửa vời\", nghĩa là họ luôn hoàn thành công việc một cách trọn vẹn, dốc toàn lực chứ không làm qua loa, dở dang.",
    origin: "Thành ngữ dùng từ \"half\" (một nửa) để chỉ sự dang dở, chưa hoàn chỉnh. Khi ở dạng phủ định \"do things by halves\", câu nói nhấn mạnh rằng người đó không bao giờ chấp nhận làm mọi việc ở mức nửa vời mà luôn đi đến cùng. Cách diễn đạt phủ định để nhấn mạnh tính triệt để này khá phổ biến trong tiếng Anh và thường được dùng để khen ngợi sự tận tâm, chỉn chu của một người.",
    examples: [
      { en: "When Maria decorates the house for a party, she never does things by halves.", vi: "Khi Maria trang trí nhà cửa cho một bữa tiệc, cô ấy không bao giờ làm qua loa." },
      { en: "Our new manager doesn't do things by halves; he checks every detail before approving a project.", vi: "Người quản lý mới của chúng tôi làm việc rất triệt để; anh ấy kiểm tra từng chi tiết trước khi phê duyệt một dự án." }
    ],
    ex: "When Maria decorates the house for a party, she never does things by halves.",
  },
  {
    slug: "do-your-level-best",
    term: "do your level best",
    type: "idiom",
    en: "If you do your level best, you make the greatest possible effort to achieve something, using all your ability and energy.",
    vi: "\"Do your level best\" nghĩa là nỗ lực hết mức có thể, dùng toàn bộ khả năng và sức lực của mình để đạt được điều gì đó.",
    origin: "Nguồn gốc chính xác của từ \"level\" trong thành ngữ này không hoàn toàn rõ ràng. Một số cách lý giải cho rằng cách dùng bắt nguồn từ tiếng Anh - Mỹ, khi \"level\" được dùng như một tính từ mang nghĩa \"triệt để, không giấu giếm\" (tương tự \"level-headed\" chỉ sự vững vàng, thẳng thắn). Một cách lý giải khác liên hệ \"level\" với dụng cụ đo cân bằng trong xây dựng, ngụ ý một nỗ lực được cân đo, dốc hết và không thiên lệch. Dù nguồn gốc chưa thống nhất, ý nghĩa \"cố gắng hết sức\" của thành ngữ đã trở nên quen thuộc từ lâu.",
    examples: [
      { en: "I'll do my level best to finish the report before the deadline.", vi: "Tôi sẽ cố gắng hết sức để hoàn thành báo cáo trước hạn chót." },
      { en: "Even though he was nervous, he did his level best during the interview.", vi: "Dù rất lo lắng, anh ấy vẫn cố gắng hết mình trong buổi phỏng vấn." }
    ],
    ex: "I'll do my level best to finish the report before the deadline.",
  },
  {
    slug: "go-all-out",
    term: "go all out",
    type: "idiom",
    en: "If you go all out, you make a maximum effort and use every available resource to achieve something, holding nothing back.",
    vi: "\"Go all out\" nghĩa là dốc toàn lực, sử dụng mọi nguồn lực có thể để đạt được điều gì đó, không giữ lại chút sức nào.",
    origin: "Thành ngữ có nguồn gốc từ hình ảnh cơ khí, khi một cỗ máy hay động cơ được vận hành với công suất tối đa, ga được mở hết cỡ (\"all out\"). Từ đó, cách nói này được áp dụng cho con người khi họ dốc toàn bộ sức lực, quyết tâm vào một việc gì đó, giống như một cỗ máy chạy hết công suất.",
    examples: [
      { en: "The team went all out in the final minutes to score the winning goal.", vi: "Đội bóng đã dốc toàn lực trong những phút cuối để ghi bàn thắng quyết định." },
      { en: "She decided to go all out for her sister's wedding and organized every detail herself.", vi: "Cô ấy quyết định dốc hết sức cho đám cưới của em gái và tự tay lo liệu mọi chi tiết." }
    ],
    ex: "The team went all out in the final minutes to score the winning goal.",
  },
  {
    slug: "go-the-extra-mile",
    term: "go the extra mile",
    type: "idiom",
    en: "If you go the extra mile, you make an additional effort beyond what is expected or required in order to achieve or help with something.",
    vi: "\"Go the extra mile\" nghĩa là nỗ lực thêm, làm nhiều hơn những gì được yêu cầu hoặc mong đợi để hoàn thành hoặc giúp đỡ điều gì đó.",
    origin: "Thành ngữ này được cho là bắt nguồn từ Kinh Thánh, cụ thể là Bài giảng trên núi trong Phúc âm Matthew (5:41). Theo luật La Mã thời đó, một binh lính có quyền bắt một thường dân mang vác đồ đi một dặm đường; Chúa Giêsu dạy rằng nếu bị ép đi một dặm, người ta nên tự nguyện đi thêm dặm thứ hai. Từ hình ảnh \"đi thêm một dặm\" vượt quá yêu cầu bắt buộc, thành ngữ dần mang nghĩa bóng là nỗ lực làm nhiều hơn mức cần thiết trong công việc hay cuộc sống.",
    examples: [
      { en: "The staff at that hotel always go the extra mile to make guests feel comfortable.", vi: "Nhân viên khách sạn đó luôn nỗ lực hết mình để khách cảm thấy thoải mái." },
      { en: "A good teacher goes the extra mile to help struggling students understand the lesson.", vi: "Một giáo viên giỏi luôn cố gắng nhiều hơn để giúp những học sinh yếu hiểu bài." }
    ],
    ex: "The staff at that hotel always go the extra mile to make guests feel comfortable.",
  },
  {
    slug: "land-on-your-feet-or-fall-on-your-feet",
    term: "land on your feet or fall on your feet",
    type: "idiom",
    en: "If you land on your feet (or fall on your feet), you come out of a difficult or risky situation successfully, often thanks to good luck rather than your own effort.",
    vi: "\"Land on your feet\" (hoặc \"fall on your feet\") nghĩa là vượt qua một tình huống khó khăn hay rủi ro một cách suôn sẻ, thường là nhờ may mắn hơn là do nỗ lực của bản thân.",
    origin: "Thành ngữ này bắt nguồn từ khả năng nổi tiếng của loài mèo: khi rơi từ trên cao xuống, mèo có phản xạ tự xoay người trong không trung để luôn tiếp đất bằng bốn chân một cách an toàn. Hình ảnh con vật luôn \"hạ cánh\" an toàn dù rơi từ đâu được người Anh mượn để mô tả con người thoát khỏi nghịch cảnh một cách may mắn và gần như nguyên vẹn.",
    examples: [
      { en: "He lost his job last year, but he landed on his feet and found an even better position.", vi: "Năm ngoái anh ấy mất việc, nhưng lại may mắn tìm được một vị trí còn tốt hơn." },
      { en: "Whatever happens, I'm sure she'll fall on her feet in the end.", vi: "Dù chuyện gì xảy ra, tôi tin cuối cùng cô ấy cũng sẽ ổn thôi." }
    ],
    ex: "He lost his job last year, but he landed on his feet and found an even better position.",
  },
  {
    slug: "not-lift-a-finger-or-not-raise-a-finger",
    term: "not lift a finger or not raise a finger",
    type: "idiom",
    en: "If someone does not lift a finger (or does not raise a finger), they make absolutely no effort to help or do any work at all.",
    vi: "Nếu ai đó \"không nhấc một ngón tay\", nghĩa là họ hoàn toàn không bỏ chút công sức nào để giúp đỡ hay làm việc gì cả.",
    origin: "Thành ngữ dùng hình ảnh cường điệu về sự lười biếng: ngay cả một hành động nhỏ nhặt và tốn ít sức lực nhất - nhấc một ngón tay - cũng không được thực hiện. Cách nói phóng đại này nhấn mạnh mức độ thờ ơ hoặc lười nhác gần như tuyệt đối của một người khi không chịu góp bất kỳ công sức nào, dù là nhỏ nhất.",
    examples: [
      { en: "My brother never lifts a finger to help with the housework.", vi: "Anh trai tôi chẳng bao giờ động tay giúp đỡ việc nhà cả." },
      { en: "The manager didn't raise a finger to solve the problem, so I had to fix it myself.", vi: "Người quản lý không hề động tay giải quyết vấn đề, nên tôi phải tự mình khắc phục." }
    ],
    ex: "My brother never lifts a finger to help with the housework.",
  },
  {
    slug: "make-a-meal-of-something-or-make-a-meal-out-of-something",
    term: "make a meal of something or make a meal out of something",
    type: "idiom",
    en: "If you make a meal of something (or make a meal out of something), you spend far more time, effort, or fuss on a task than is actually necessary, making it seem more complicated or important than it really is.",
    vi: "\"Make a meal of something\" nghĩa là tốn quá nhiều thời gian, công sức hoặc làm ầm ĩ lên với một việc gì đó hơn mức cần thiết, khiến việc đơn giản trở nên rắc rối, bị thổi phồng không đáng có.",
    origin: "Thành ngữ gợi hình ảnh biến một bữa ăn đơn giản, nhẹ nhàng thành một bữa tiệc thịnh soạn, cầu kỳ hơn nhiều so với nhu cầu thực tế. Từ hình ảnh ẩm thực này, cách nói được mở rộng sang nghĩa bóng để chỉ việc thổi phồng, làm quá lên một nhiệm vụ hoặc vấn đề vốn dĩ đơn giản, không cần nhiều công sức đến vậy.",
    examples: [
      { en: "It's just a small mistake - don't make a meal of it.", vi: "Đó chỉ là một lỗi nhỏ thôi - đừng làm quá lên như vậy." },
      { en: "He made such a meal out of writing the invitation that it took him three days.", vi: "Anh ấy làm quá việc viết thiệp mời đến mức mất tận ba ngày mới xong." }
    ],
    ex: "It's just a small mistake - don't make a meal of it.",
  },
  {
    slug: "pull-your-socks-up",
    term: "pull your socks up",
    type: "idiom",
    en: "If you pull your socks up, you make a greater effort to improve your behavior or performance, especially after doing poorly.",
    vi: "\"Pull your socks up\" nghĩa là cố gắng nhiều hơn để cải thiện thái độ hoặc kết quả làm việc, đặc biệt là sau khi đã làm không tốt.",
    origin: "Thành ngữ tiếng Anh - Anh này gợi hình ảnh một người kéo chỉnh lại đôi tất đang bị tuột xuống trước khi bắt đầu vận động, chạy nhảy hay lao động, như một hành động chuẩn bị để làm việc nghiêm túc và hiệu quả hơn. Từ cử chỉ chỉnh trang bên ngoài đơn giản đó, thành ngữ chuyển sang nghĩa bóng là chấn chỉnh lại bản thân, nỗ lực hơn sau một giai đoạn làm việc chưa tốt.",
    examples: [
      { en: "If you want to pass the exam, you really need to pull your socks up and start studying.", vi: "Nếu muốn thi đậu, bạn thực sự cần chấn chỉnh lại và bắt đầu học hành nghiêm túc." },
      { en: "The coach told the team to pull their socks up after their poor performance last week.", vi: "Huấn luyện viên yêu cầu đội bóng phải cố gắng hơn sau màn trình diễn kém cỏi tuần trước." }
    ],
    ex: "If you want to pass the exam, you really need to pull your socks up and start studying.",
  },
  {
    slug: "pull-your-weight",
    term: "pull your weight",
    type: "idiom",
    en: "If you pull your weight, you do your fair share of the work in a group or team, contributing as much as everyone else.",
    vi: "\"Pull your weight\" nghĩa là làm tròn phần việc của mình trong một nhóm hay tập thể, đóng góp công sức ngang bằng với những người khác.",
    origin: "Thành ngữ này bắt nguồn từ môn chèo thuyền, trong đó mỗi tay chèo phải dùng đủ sức để kéo mái chèo tương xứng với phần trọng lượng cơ thể mình đóng góp vào con thuyền, giúp thuyền di chuyển đều và nhanh. Nếu một người chèo không dùng đủ sức, cả đội sẽ phải bù đắp phần thiếu hụt đó. Hình ảnh này được mở rộng sang mọi bối cảnh làm việc nhóm, nơi mỗi thành viên cần đóng góp công sức tương xứng với phần của mình.",
    examples: [
      { en: "Everyone on this project needs to pull their weight if we want to finish on time.", vi: "Mọi người trong dự án này cần làm tròn phần việc của mình nếu muốn hoàn thành đúng hạn." },
      { en: "She felt that her roommate wasn't pulling his weight when it came to cleaning the apartment.", vi: "Cô cảm thấy bạn cùng phòng không làm tròn phần việc của mình trong chuyện dọn dẹp căn hộ." }
    ],
    ex: "Everyone on this project needs to pull their weight if we want to finish on time.",
  },
  {
    slug: "work-your-fingers-to-the-bone",
    term: "work your fingers to the bone",
    type: "idiom",
    en: "If you work your fingers to the bone, you work extremely hard for a long period of time, often to the point of complete exhaustion.",
    vi: "\"Work your fingers to the bone\" nghĩa là làm việc cực kỳ vất vả trong thời gian dài, đến mức gần như kiệt sức hoàn toàn.",
    origin: "Thành ngữ mang tính cường điệu, gợi hình ảnh đôi bàn tay lao động không ngừng nghỉ - như may vá, giặt giũ hay làm ruộng - đến mức da thịt ở đầu ngón tay mòn đi và lộ ra tận xương, dù đây chỉ là hình ảnh phóng đại chứ không phải sự thật theo nghĩa đen. Cách nói này thường gắn với hình ảnh những người lao động chân tay, đặc biệt là phụ nữ làm việc nội trợ hay thợ may thời xưa, phải làm việc liên tục bằng đôi tay.",
    examples: [
      { en: "My grandmother worked her fingers to the bone raising five children on her own.", vi: "Bà tôi đã làm việc vất vả không ngừng để một mình nuôi năm đứa con." },
      { en: "He worked his fingers to the bone to save enough money to buy his own house.", vi: "Anh ấy đã làm việc cật lực để dành đủ tiền mua căn nhà của riêng mình." }
    ],
    ex: "My grandmother worked her fingers to the bone raising five children on her own.",
  },
  {
    slug: "work-your-socks-off",
    term: "work your socks off",
    type: "idiom",
    en: "If you work your socks off, you work extremely hard and put a great deal of energy and effort into something.",
    vi: "\"Work your socks off\" nghĩa là làm việc cực kỳ chăm chỉ, dồn rất nhiều năng lượng và công sức vào việc gì đó.",
    origin: "Đây là một thành ngữ tiếng Anh - Anh khá thân mật, cùng họ với \"pull your socks up\", dùng hình ảnh vận động mạnh đến mức đôi tất tưởng như có thể văng ra khỏi chân để nhấn mạnh cường độ làm việc dữ dội. Cách phóng đại vui nhộn kiểu \"off\" (rơi mất, văng ra) này cũng xuất hiện trong nhiều thành ngữ tiếng Anh thông tục khác nhằm nhấn mạnh mức độ mãnh liệt của một hành động, chẳng hạn \"laugh your head off\", \"talk your head off\".",
    examples: [
      { en: "The volunteers worked their socks off to get everything ready before the festival started.", vi: "Các tình nguyện viên đã làm việc hết mình để chuẩn bị mọi thứ trước khi lễ hội bắt đầu." },
      { en: "I've been working my socks off all week to meet this deadline.", vi: "Cả tuần nay tôi đã làm việc cật lực để kịp hoàn thành deadline này." }
    ],
    ex: "The volunteers worked their socks off to get everything ready before the festival started.",
  }
  ],
  "honesty-and-fairness": [
  {
    slug: "above-board",
    term: "above board",
    type: "idiom",
    en: "If a plan, deal, or person's actions are above board, they are completely honest, open, and legal, with nothing hidden.",
    vi: "Nếu một kế hoạch, thỏa thuận hay hành động nào đó là \"above board\", nghĩa là nó hoàn toàn minh bạch, đàng hoàng và hợp pháp, không có gì che giấu.",
    origin: "Nhiều nhà nghiên cứu tiếng Anh cho rằng thành ngữ này bắt nguồn từ các sòng bạc và bàn chơi bài xưa. Khi hai tay đều đặt trên mặt bàn (\"board\"), tức là \"above the board\", người chơi không thể giấu bài hay tráo bài ở dưới gầm bàn để gian lận. Vì vậy \"above board\" dần mang nghĩa bóng là công khai, không có mưu mẹo hay thủ đoạn ngầm. Đây là một trong những thành ngữ tiếng Anh có nguồn gốc khá rõ ràng, được ghi nhận từ thế kỷ 17.",
    examples: [
      { en: "The charity publishes all its accounts online to show that its fundraising is completely above board.", vi: "Tổ chức từ thiện này công bố toàn bộ sổ sách trên mạng để chứng minh việc gây quỹ của họ hoàn toàn minh bạch." },
      { en: "I want this negotiation to be above board, so let's put everything in writing.", vi: "Tôi muốn cuộc đàm phán này diễn ra đàng hoàng minh bạch, vậy nên hãy viết mọi thứ ra giấy." }
    ],
    ex: "The charity publishes all its accounts online to show that its fundraising is completely above board.",
  },
  {
    slug: "not-beat-around-the-bush-or-not-beat-about-the-bush",
    term: "not beat around the bush or not beat about the bush",
    type: "idiom",
    en: "If you do not beat around the bush, you say what you mean directly and clearly, instead of avoiding the main point or delaying an unpleasant topic.",
    vi: "Nếu bạn \"không beat around the bush\", nghĩa là bạn nói thẳng vào vấn đề chính, không vòng vo hay né tránh một chủ đề khó nói.",
    origin: "Thành ngữ này được cho là bắt nguồn từ hoạt động săn bắn thời trung cổ ở Anh. Một số người trong đoàn săn có nhiệm vụ đập vào các bụi cây (\"beat the bush\") để xua chim hoặc thú ra ngoài cho người khác bắt, thay vì trực tiếp xông vào bụi rậm vì sợ nguy hiểm như rắn rết. Vì hành động này chỉ là bước chuẩn bị vòng vo trước khi vào việc chính, \"beat around/about the bush\" dần mang nghĩa bóng là nói vòng vo, trì hoãn việc đi thẳng vào vấn đề.",
    examples: [
      { en: "Stop beating around the bush and tell me whether you're leaving the company or not.", vi: "Đừng vòng vo nữa, hãy nói thẳng cho tôi biết anh có định nghỉ việc ở công ty hay không." },
      { en: "The doctor didn't beat about the bush; she told us the test results right away.", vi: "Bác sĩ không vòng vo gì cả, cô ấy nói ngay kết quả xét nghiệm cho chúng tôi." }
    ],
    ex: "Stop beating around the bush and tell me whether you're leaving the company or not.",
  },
  {
    slug: "below-the-belt",
    term: "below the belt",
    type: "idiom",
    en: "If someone's words or actions are below the belt, they are unfair and cruel, often attacking a person's weakness or a sensitive personal matter.",
    vi: "Nếu lời nói hay hành động của ai đó là \"below the belt\", nghĩa là điều đó không công bằng và tàn nhẫn, thường nhắm vào điểm yếu hoặc chuyện riêng tư nhạy cảm của người khác.",
    origin: "Thành ngữ này xuất phát từ môn quyền anh (boxing), nơi luật thi đấu cấm các võ sĩ đấm vào phần cơ thể dưới thắt lưng đối thủ vì có thể gây chấn thương nghiêm trọng và bị coi là phạm luật. Từ đó, \"below the belt\" được dùng theo nghĩa bóng để chỉ những lời nói hay hành động không tuân theo quy tắc công bằng thông thường, cố tình gây tổn thương cho đối phương.",
    examples: [
      { en: "Bringing up her divorce during the meeting was really below the belt.", vi: "Việc nhắc đến chuyện ly hôn của cô ấy ngay trong cuộc họp thực sự là quá đáng và không công bằng." },
      { en: "Criticizing his accent instead of his ideas felt like a hit below the belt.", vi: "Việc chê bai giọng nói của anh ấy thay vì bàn về ý tưởng nghe như một đòn hiểm không đáng có." }
    ],
    ex: "Bringing up her divorce during the meeting was really below the belt.",
  },
  {
    slug: "by-fair-means-or-foul",
    term: "by fair means or foul",
    type: "idiom",
    en: "If someone will achieve something by fair means or foul, they are determined to succeed using any method available, whether it is honest or dishonest.",
    vi: "Nếu ai đó quyết tâm đạt được điều gì đó \"by fair means or foul\", nghĩa là họ sẵn sàng dùng mọi cách, dù chính đáng hay không chính đáng, miễn là đạt được mục đích.",
    origin: "Cấu trúc này ghép hai tính từ trái nghĩa \"fair\" (công bằng) và \"foul\" (gian lận, xấu xa) để nhấn mạnh ý \"bất kể cách nào\". Cách nói đối lập kiểu này khá phổ biến trong tiếng Anh cổ, và từ \"foul\" từng được dùng phổ biến trong các môn thể thao để chỉ hành vi phạm luật. Cụm từ nhấn mạnh thái độ bất chấp: người nói sẵn sàng thắng bằng cách đúng đắn lẫn cách gian dối.",
    examples: [
      { en: "Some athletes are so obsessed with winning that they will cheat by fair means or foul.", vi: "Một số vận động viên quá ám ảnh với chiến thắng đến mức họ sẵn sàng dùng mọi thủ đoạn, dù công bằng hay gian lận, để thắng." },
      { en: "The company was determined to close the deal by fair means or foul.", vi: "Công ty đó quyết tâm chốt được hợp đồng bằng mọi giá, bất kể cách làm có chính đáng hay không." }
    ],
    ex: "Some athletes are so obsessed with winning that they will cheat by fair means or foul.",
  },
  {
    slug: "call-a-spade-a-spade",
    term: "call a spade a spade",
    type: "idiom",
    en: "If you call a spade a spade, you describe something honestly and directly, using plain words instead of softening or disguising the truth.",
    vi: "Nếu bạn \"call a spade a spade\", nghĩa là bạn nói thẳng, gọi đúng bản chất sự việc bằng lời lẽ thẳng thắn thay vì né tránh hay tô vẽ sự thật.",
    origin: "Thành ngữ này có gốc từ tiếng Hy Lạp cổ, được nhà văn Erasmus dịch sang tiếng Latin rồi phổ biến sang tiếng Anh từ thế kỷ 16. \"Spade\" ở đây chỉ đơn giản là cái xẻng, một dụng cụ lao động bình thường, ý nói gọi đúng tên sự vật thay vì dùng từ ngữ hoa mỹ để che giấu. Cần lưu ý thành ngữ này hoàn toàn không liên quan đến bất kỳ nghĩa xúc phạm nào khác của từ \"spade\" trong tiếng Anh hiện đại, đây chỉ là cách nói về sự thẳng thắn.",
    examples: [
      { en: "He's known for calling a spade a spade, even when the truth is uncomfortable.", vi: "Anh ấy nổi tiếng vì luôn nói thẳng nói thật, kể cả khi sự thật khiến người khác khó chịu." },
      { en: "Let's call a spade a spade: this project has failed and we need a new plan.", vi: "Hãy nói thẳng ra: dự án này đã thất bại và chúng ta cần một kế hoạch mới." }
    ],
    ex: "He's known for calling a spade a spade, even when the truth is uncomfortable.",
  },
  {
    slug: "come-clean",
    term: "come clean",
    type: "idiom",
    en: "If you come clean, you admit the truth about something you had been hiding, especially a mistake or wrongdoing.",
    vi: "Nếu bạn \"come clean\", nghĩa là bạn thú nhận sự thật về điều mà trước đó bạn đã giấu giếm, đặc biệt là một lỗi lầm hay việc làm sai trái.",
    origin: "Cách nói này gắn liền với hình ảnh \"clean\" (sạch sẽ) tượng trưng cho sự trong sạch về đạo đức hay lương tâm. Khi một người giấu diếm điều gì đó, họ mang cảm giác \"bẩn\", có lỗi; khi họ thú nhận sự thật, họ trở nên \"sạch\", nhẹ nhõm trở lại. Cách dùng này phổ biến trong tiếng Anh từ cuối thế kỷ 19, đầu thế kỷ 20.",
    examples: [
      { en: "After weeks of lying, he finally came clean about losing the company's money.", vi: "Sau nhiều tuần nói dối, cuối cùng anh ấy cũng thú nhận việc đã làm mất tiền của công ty." },
      { en: "It's better to come clean now than to let the truth come out later.", vi: "Thà thú nhận ngay bây giờ còn hơn để sự thật bị phát hiện sau này." }
    ],
    ex: "After weeks of lying, he finally came clean about losing the company's money.",
  },
  {
    slug: "fair-and-square",
    term: "fair and square",
    type: "idiom",
    en: "If you win or achieve something fair and square, you do it honestly and according to the rules, without cheating or trickery.",
    vi: "Nếu bạn thắng hay đạt được điều gì đó \"fair and square\", nghĩa là bạn làm điều đó một cách hoàn toàn công bằng, đúng luật, không gian lận hay mánh khóe.",
    origin: "Đây là một cặp từ có vần điệu quen thuộc trong tiếng Anh, ghép \"fair\" (công bằng) với \"square\", vốn cũng từng mang nghĩa \"ngay thẳng, đúng đắn\" trong các giao dịch (như trong cụm \"a square deal\"). Việc lặp âm và nghĩa gần nhau giúp cụm từ trở nên dễ nhớ và được dùng phổ biến từ thế kỷ 16-17 để nhấn mạnh tính minh bạch tuyệt đối.",
    examples: [
      { en: "She won the chess tournament fair and square, beating every opponent on merit.", vi: "Cô ấy vô địch giải cờ vua một cách hoàn toàn công bằng, thắng mọi đối thủ bằng thực lực." },
      { en: "We lost the match fair and square; the other team simply played better.", vi: "Chúng tôi thua trận đấu một cách công bằng, đội kia đơn giản là chơi hay hơn." }
    ],
    ex: "She won the chess tournament fair and square, beating every opponent on merit.",
  },
  {
    slug: "keep-your-nose-clean",
    term: "keep your nose clean",
    type: "idiom",
    en: "If you keep your nose clean, you stay out of trouble by behaving well and avoiding illegal or dishonest activities.",
    vi: "Nếu bạn \"keep your nose clean\", nghĩa là bạn tránh xa rắc rối bằng cách cư xử đúng mực, không dính vào chuyện phi pháp hay mờ ám.",
    origin: "Cụm từ này dùng hình ảnh \"mũi sạch\" như một ẩn dụ cho việc không dính líu, không vướng bẩn vào những việc xấu, tương tự cách \"clean\" được dùng trong nhiều thành ngữ tiếng Anh để chỉ sự trong sạch, không phạm lỗi. Cách nói này phổ biến trong tiếng Anh-Mỹ từ đầu thế kỷ 20, thường dùng khi khuyên ai đó cư xử ngoan ngoãn, không gây rắc rối với pháp luật hay cấp trên.",
    examples: [
      { en: "After his last job, he promised his parole officer he would keep his nose clean.", vi: "Sau lần phạm tội trước, anh ấy hứa với cán bộ quản chế rằng sẽ sống ngoan ngoãn, không vi phạm nữa." },
      { en: "If you want to keep this job, just keep your nose clean and avoid office politics.", vi: "Nếu muốn giữ công việc này, cứ cư xử đàng hoàng và tránh xa những chuyện đấu đá trong công ty." }
    ],
    ex: "After his last job, he promised his parole officer he would keep his nose clean.",
  },
  {
    slug: "lay-your-cards-on-the-table-or-put-your-cards-on-the-table",
    term: "lay your cards on the table or put your cards on the table",
    type: "idiom",
    en: "If you lay your cards on the table, you tell people honestly and openly what your plans, intentions, or feelings are, instead of keeping them secret.",
    vi: "Nếu bạn \"lay/put your cards on the table\", nghĩa là bạn nói rõ ràng và thẳng thắn về ý định, kế hoạch hay cảm xúc thật của mình, thay vì giữ kín.",
    origin: "Thành ngữ này xuất phát từ các trò chơi bài, nơi người chơi thường giữ bài kín để giữ lợi thế chiến thuật trước đối thủ. Khi ai đó \"đặt bài lên bàn\", họ để lộ hết những gì mình đang có trong tay, không còn giấu giếm hay tính toán ngầm nữa. Nghĩa bóng này được áp dụng vào các tình huống đàm phán hay giao tiếp đời thường từ khoảng đầu thế kỷ 20.",
    examples: [
      { en: "Let's just lay our cards on the table: what salary are you actually expecting?", vi: "Chúng ta cứ nói thẳng ra: mức lương bạn thực sự mong muốn là bao nhiêu?" },
      { en: "Before signing the contract, both sides agreed to put their cards on the table.", vi: "Trước khi ký hợp đồng, cả hai bên đồng ý nói rõ mọi ý định của mình." }
    ],
    ex: "Let's just lay our cards on the table: what salary are you actually expecting?",
  },
  {
    slug: "a-level-playing-field",
    term: "a level playing field",
    type: "idiom",
    en: "A level playing field is a situation in which everyone has equal conditions and a fair chance to compete, with no one having an unfair advantage.",
    vi: "\"A level playing field\" là một tình huống mà mọi người đều có điều kiện ngang nhau và cơ hội công bằng để cạnh tranh, không ai được ưu thế bất công.",
    origin: "Thành ngữ này lấy hình ảnh từ các môn thể thao trên sân cỏ. Nếu mặt sân bị nghiêng hay gồ ghề, một đội sẽ được lợi thế hơn đội kia, ví dụ như đá bóng xuống dốc dễ dàng hơn đá lên dốc. Một sân đấu \"phẳng\" (level) đảm bảo cả hai đội có điều kiện thi đấu như nhau, từ đó thành ngữ này được dùng rộng rãi trong kinh doanh và xã hội để chỉ sự công bằng về cơ hội.",
    examples: [
      { en: "New regulations were introduced to create a level playing field for small businesses competing with large corporations.", vi: "Các quy định mới được ban hành nhằm tạo ra một sân chơi công bằng cho doanh nghiệp nhỏ khi cạnh tranh với các tập đoàn lớn." },
      { en: "Without a level playing field, local farmers can't compete against cheap imported goods.", vi: "Nếu không có một sân chơi công bằng, nông dân địa phương không thể cạnh tranh nổi với hàng nhập khẩu giá rẻ." }
    ],
    ex: "New regulations were introduced to create a level playing field for small businesses competing with large corporations.",
  },
  {
    slug: "move-the-goalposts",
    term: "move the goalposts",
    type: "idiom",
    en: "If someone moves the goalposts, they unfairly change the rules or the standard for success in the middle of a process, making it harder for others to achieve their goal.",
    vi: "Nếu ai đó \"move the goalposts\", nghĩa là họ thay đổi luật chơi hoặc tiêu chuẩn thành công một cách không công bằng giữa chừng, khiến người khác khó đạt được mục tiêu hơn.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh trong bóng đá: nếu khung thành bị di chuyển trong lúc trận đấu đang diễn ra, đội tấn công sẽ không thể ghi bàn dù đã chơi đúng theo mục tiêu ban đầu. Từ hình ảnh phi lý và bất công đó, cụm từ được dùng theo nghĩa bóng để chỉ việc thay đổi tiêu chí, yêu cầu hay điều kiện một cách bất công sau khi công việc đã bắt đầu.",
    examples: [
      { en: "First they asked for a report, then they moved the goalposts and wanted a full presentation too.", vi: "Ban đầu họ chỉ yêu cầu một bản báo cáo, sau đó lại thay đổi yêu cầu và muốn thêm cả một buổi thuyết trình đầy đủ." },
      { en: "Every time I meet the sales target, management moves the goalposts and sets a higher one.", vi: "Mỗi lần tôi đạt chỉ tiêu doanh số, ban quản lý lại thay đổi tiêu chí và đặt mức cao hơn." }
    ],
    ex: "First they asked for a report, then they moved the goalposts and wanted a full presentation too.",
  },
  {
    slug: "on-the-level",
    term: "on the level",
    type: "idiom",
    en: "If a person, deal, or offer is on the level, it is honest and legitimate, with no deception involved.",
    vi: "Nếu một người, một thỏa thuận hay một lời đề nghị nào đó là \"on the level\", nghĩa là nó hoàn toàn trung thực và hợp pháp, không có sự lừa dối.",
    origin: "Một số nhà nghiên cứu cho rằng thành ngữ này liên quan đến dụng cụ đo thăng bằng (\"a level\") dùng trong xây dựng và trong biểu tượng của hội Tam Điểm (Freemasonry), nơi cái thước thủy tượng trưng cho sự ngay thẳng, công bằng giữa các thành viên. Tuy nhiên nguồn gốc chính xác vẫn chưa hoàn toàn thống nhất; nhìn chung, \"level\" ở đây mang nghĩa \"bằng phẳng, không lệch lạc\", ẩn dụ cho một điều gì đó rõ ràng, không có góc khuất hay gian dối.",
    examples: [
      { en: "I checked with the bank, and the offer really is on the level.", vi: "Tôi đã kiểm tra với ngân hàng, và lời đề nghị đó thực sự đáng tin cậy, không có gì mờ ám." },
      { en: "Is this investment opportunity on the level, or does it sound too good to be true?", vi: "Cơ hội đầu tư này có đáng tin không, hay nghe có vẻ tốt đến mức khó tin?" }
    ],
    ex: "I checked with the bank, and the offer really is on the level.",
  },
  {
    slug: "stab-someone-in-the-back",
    term: "stab someone in the back",
    type: "idiom",
    en: "If you stab someone in the back, you betray a person who trusted you, often by secretly working against them or telling others their private information.",
    vi: "Nếu bạn \"stab someone in the back\", nghĩa là bạn phản bội một người từng tin tưởng bạn, thường bằng cách âm thầm chống lại họ hoặc tiết lộ bí mật của họ cho người khác.",
    origin: "Hình ảnh đâm dao vào lưng người khác gợi lên sự phản bội đặc biệt hèn hạ, vì nạn nhân không thể nhìn thấy hay phòng vệ trước cuộc tấn công từ phía sau, khác với một cuộc đối đầu trực diện. Chính vì tính chất lén lút và bất ngờ đó, hành động này trở thành biểu tượng cho sự phản bội của một người mà nạn nhân từng tin cậy, chứ không phải từ một kẻ thù công khai.",
    examples: [
      { en: "I trusted her with my business idea, but she stabbed me in the back and started her own company using it.", vi: "Tôi từng tin tưởng chia sẻ ý tưởng kinh doanh với cô ấy, vậy mà cô ấy phản bội tôi và tự mở công ty dùng chính ý tưởng đó." },
      { en: "He felt stabbed in the back when his best friend testified against him in court.", vi: "Anh ấy cảm thấy bị phản bội khi người bạn thân nhất lại ra làm chứng chống lại mình trước tòa." }
    ],
    ex: "I trusted her with my business idea, but she stabbed me in the back and started her own company using it.",
  },
  {
    slug: "to-someone-s-face",
    term: "to someone's face",
    type: "idiom",
    en: "If you say something to someone's face, you say it directly to that person in person, rather than talking about them when they are not present.",
    vi: "Nếu bạn nói điều gì đó \"to someone's face\", nghĩa là bạn nói trực tiếp với người đó, thay vì bàn tán sau lưng khi họ không có mặt.",
    origin: "Thành ngữ này đơn giản dựa trên nghĩa đen: nói ngay trước mặt (\"face\") một người, đối lập với việc nói \"behind someone's back\" (sau lưng người đó). Cách diễn đạt tương phản này nhấn mạnh sự khác biệt giữa thái độ thẳng thắn, dám chịu trách nhiệm về lời nói của mình, với thái độ né tránh, chỉ dám nói xấu khi người kia vắng mặt.",
    examples: [
      { en: "If you have a problem with my work, tell me to my face instead of complaining to the manager.", vi: "Nếu bạn có vấn đề gì với công việc của tôi, hãy nói thẳng với tôi thay vì đi phàn nàn với quản lý." },
      { en: "She's brave enough to criticize her boss to his face when she disagrees with him.", vi: "Cô ấy đủ can đảm để phê bình sếp ngay trước mặt mỗi khi không đồng ý với ông ấy." }
    ],
    ex: "If you have a problem with my work, tell me to my face instead of complaining to the manager.",
  }
  ],
  "deception": [
  {
    slug: "blow-the-whistle-on-someone-something",
    term: "blow the whistle on someone/something",
    type: "idiom",
    en: "If you blow the whistle on someone or something, you report their wrongdoing or illegal activity to someone in authority, even though this may cause trouble for the people involved.",
    vi: "Nếu bạn 'thổi còi' ai đó hoặc việc gì, nghĩa là bạn tố giác hành vi sai trái hoặc bất hợp pháp của họ với cấp trên hoặc cơ quan chức năng, dù việc đó có thể gây rắc rối cho những người liên quan.",
    origin: "Cách giải thích được nhiều người chấp nhận nhất là hình ảnh chiếc còi của cảnh sát Anh thời xưa: khi phát hiện một vụ phạm pháp đang xảy ra, cảnh sát sẽ thổi còi để báo động cho đồng nghiệp và người dân xung quanh, đồng thời khiến kẻ phạm tội biết mình đã bị phát hiện. Một số nguồn khác lại liên hệ với còi của trọng tài thể thao, dùng để dừng trận đấu ngay khi có lỗi xảy ra. Dù nguồn gốc chính xác không hoàn toàn thống nhất, cả hai hình ảnh đều gắn với ý nghĩa 'phát tín hiệu công khai để ngăn chặn hoặc phơi bày một việc sai trái'.",
    examples: [
      { en: "An employee finally blew the whistle on the company's illegal dumping of chemical waste.", vi: "Cuối cùng một nhân viên đã tố giác việc công ty đổ trộm chất thải hóa học trái phép." },
      { en: "She was afraid to blow the whistle on her boss in case she lost her job.", vi: "Cô ấy sợ tố cáo sếp của mình vì lo sẽ mất việc." }
    ],
    ex: "An employee finally blew the whistle on the company's illegal dumping of chemical waste.",
  },
  {
    slug: "cover-your-tracks",
    term: "cover your tracks",
    type: "idiom",
    en: "If you cover your tracks, you hide or destroy any evidence that would show what you have done, usually something wrong or illegal.",
    vi: "Nếu bạn 'xóa dấu vết' của mình, nghĩa là bạn che giấu hoặc phá hủy mọi bằng chứng có thể tiết lộ việc bạn đã làm, thường là điều sai trái hoặc phạm pháp.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh rất cụ thể trong săn bắn và trốn chạy: người hoặc con vật bị truy đuổi cố gắng xóa dấu chân, dấu vết trên mặt đất để những người đuổi theo không thể lần theo mà tìm ra. Từ nghĩa đen 'xóa vết chân' này, thành ngữ dần được dùng theo nghĩa bóng cho bất kỳ hành động nào nhằm che giấu bằng chứng, đặc biệt trong các vụ việc gian lận, trộm cắp hay tội phạm.",
    examples: [
      { en: "The hacker tried to cover his tracks by deleting the server logs.", vi: "Tên tin tặc đã cố xóa dấu vết bằng cách xóa các nhật ký của máy chủ." },
      { en: "After taking the money, she covered her tracks by altering the accounts.", vi: "Sau khi lấy số tiền đó, cô ta đã xóa dấu vết bằng cách sửa lại sổ sách kế toán." }
    ],
    ex: "The hacker tried to cover his tracks by deleting the server logs.",
  },
  {
    slug: "be-economical-with-the-truth",
    term: "be economical with the truth",
    type: "idiom",
    en: "If someone is economical with the truth, they deliberately leave out important facts or details in order to give a misleading impression, without actually stating an outright lie.",
    vi: "Nếu ai đó 'tiết kiệm sự thật', nghĩa là họ cố tình lược bớt những thông tin hoặc chi tiết quan trọng để tạo ấn tượng sai lệch, dù không hẳn là nói dối trắng trợn.",
    origin: "Cụm từ này trở nên nổi tiếng ở Anh vào những năm 1980, khi một quan chức chính phủ dùng nó trước tòa để mô tả việc không tiết lộ đầy đủ sự thật mà không thừa nhận là nói dối. Từ đó, cách nói mang tính uyển ngữ (euphemism) này được dùng rộng rãi để chỉ việc che giấu thông tin một cách tinh vi, khéo léo hơn là nói dối công khai. Vì mang tính chính trị và châm biếm, thành ngữ này thường được dùng với hàm ý mỉa mai người nói.",
    examples: [
      { en: "The spokesperson was economical with the truth about the company's real financial situation.", vi: "Người phát ngôn đã không nói hết sự thật về tình hình tài chính thực sự của công ty." },
      { en: "I think the minister was being economical with the truth when he answered that question.", vi: "Tôi nghĩ vị bộ trưởng đã né tránh sự thật khi trả lời câu hỏi đó." }
    ],
    ex: "The spokesperson was economical with the truth about the company's real financial situation.",
  },
  {
    slug: "give-the-game-away",
    term: "give the game away",
    type: "idiom",
    en: "If you give the game away, you accidentally reveal a secret plan, trick, or intention that was supposed to stay hidden.",
    vi: "Nếu bạn 'để lộ trò chơi', nghĩa là bạn vô tình tiết lộ một kế hoạch, mẹo lừa hay ý định vốn phải được giữ kín.",
    origin: "Thành ngữ này gợi liên tưởng đến các trò chơi bài hoặc trò chơi chiến thuật, nơi người chơi cần giữ bí mật về quân bài hay nước đi của mình để không bị đối thủ đoán trước. 'Game' ở đây tượng trưng cho toàn bộ kế hoạch hay mưu mẹo đang được thực hiện; khi ai đó vô tình để lộ một chi tiết, họ coi như đã 'giao nộp' cả ván chơi cho đối phương biết trước.",
    examples: [
      { en: "He tried to keep the surprise party secret, but his nervous laughter gave the game away.", vi: "Anh ấy cố giữ bí mật về bữa tiệc bất ngờ, nhưng tiếng cười lo lắng của anh đã làm lộ hết mọi chuyện." },
      { en: "Don't mention the new product name yet, or you'll give the game away to our competitors.", vi: "Đừng nhắc đến tên sản phẩm mới vội, không thì bạn sẽ để lộ hết cho đối thủ cạnh tranh biết đấy." }
    ],
    ex: "He tried to keep the surprise party secret, but his nervous laughter gave the game away.",
  },
  {
    slug: "go-behind-someone-s-back",
    term: "go behind someone's back",
    type: "idiom",
    en: "If you go behind someone's back, you do something that affects them, often something deceitful or disloyal, without telling them or asking their permission.",
    vi: "Nếu bạn 'làm sau lưng ai đó', nghĩa là bạn làm một việc ảnh hưởng đến người đó, thường là điều thiếu trung thực hoặc phản bội, mà không nói cho họ biết hay xin phép họ.",
    origin: "Hình ảnh trong thành ngữ này rất trực quan: 'sau lưng' (behind someone's back) là vị trí mà người đó không thể nhìn thấy, nên hành động diễn ra ở đó đồng nghĩa với việc diễn ra một cách bí mật, giấu giếm. Từ nghĩa đen về vị trí cơ thể, thành ngữ được mở rộng sang nghĩa bóng để chỉ mọi hành vi lén lút, thiếu minh bạch nhằm qua mặt người khác.",
    examples: [
      { en: "I can't believe he negotiated the deal behind my back without telling me.", vi: "Tôi không thể tin được là anh ta đã đàm phán vụ này sau lưng tôi mà không hề nói với tôi một lời." },
      { en: "She found out that her colleagues had been complaining about her behind her back.", vi: "Cô ấy phát hiện ra rằng các đồng nghiệp đã nói xấu mình sau lưng." }
    ],
    ex: "I can't believe he negotiated the deal behind my back without telling me.",
  },
  {
    slug: "go-through-the-motions",
    term: "go through the motions",
    type: "idiom",
    en: "If you go through the motions, you do something because you are expected to, without any real interest, effort, or sincerity, often just to give the appearance that things are normal.",
    vi: "Nếu bạn 'làm cho có', nghĩa là bạn thực hiện một việc gì đó chỉ vì bổn phận, mà không có sự nhiệt tình, nỗ lực hay chân thành thực sự, đôi khi chỉ để tạo vẻ ngoài mọi thứ vẫn bình thường.",
    origin: "Cụm 'the motions' ở đây chỉ các động tác, cử chỉ bề ngoài của một hành động, tách rời khỏi cảm xúc hay mục đích thật sự bên trong. Hình ảnh gốc có thể liên tưởng đến việc một diễn viên hay vũ công lặp lại đúng động tác đã tập luyện một cách máy móc, không còn cảm xúc, hoặc một nghi lễ được thực hiện đúng hình thức nhưng thiếu sự chân thành. Từ đó thành ngữ mang nghĩa làm việc gì đó một cách hình thức, đối phó.",
    examples: [
      { en: "After the breakup, he just went through the motions at work for weeks.", vi: "Sau khi chia tay, anh ấy chỉ làm việc cho có ở công ty suốt mấy tuần liền." },
      { en: "The team wasn't really trying anymore; they were just going through the motions in the final minutes of the match.", vi: "Đội bóng không còn thực sự cố gắng nữa, họ chỉ đá cho có trong những phút cuối trận." }
    ],
    ex: "After the breakup, he just went through the motions at work for weeks.",
  },
  {
    slug: "a-hidden-agenda",
    term: "a hidden agenda",
    type: "idiom",
    en: "A hidden agenda is a secret motive or purpose behind someone's actions or proposals, which is different from the reason they openly claim.",
    vi: "'Ý đồ ẩn giấu' là động cơ hay mục đích bí mật đằng sau hành động hoặc đề xuất của ai đó, khác với lý do họ công khai đưa ra.",
    origin: "Từ 'agenda' vốn có nghĩa là chương trình nghị sự, danh sách các việc cần bàn trong một cuộc họp. Khi thêm tính từ 'hidden' (ẩn giấu), thành ngữ ám chỉ rằng bên cạnh chương trình nghị sự công khai còn có một 'chương trình' khác, thầm kín, mà người đó theo đuổi vì lợi ích riêng. Cách dùng này phổ biến trong ngữ cảnh chính trị, kinh doanh và các mối quan hệ xã hội, nơi động cơ thật sự thường không được nói ra.",
    examples: [
      { en: "Some employees suspected the new manager had a hidden agenda when he suggested restructuring the team.", vi: "Một số nhân viên nghi ngờ vị quản lý mới có ý đồ ẩn giấu khi đề xuất tái cơ cấu đội nhóm." },
      { en: "He insisted he was just being helpful, but I think he had a hidden agenda all along.", vi: "Anh ta khăng khăng rằng mình chỉ đang muốn giúp đỡ, nhưng tôi nghĩ anh ta đã có ý đồ riêng ngay từ đầu." }
    ],
    ex: "Some employees suspected the new manager had a hidden agenda when he suggested restructuring the team.",
  },
  {
    slug: "keep-something-under-your-hat",
    term: "keep something under your hat",
    type: "idiom",
    en: "If you keep something under your hat, you keep a piece of information secret and do not tell anyone else about it.",
    vi: "Nếu bạn 'giữ điều gì đó dưới mũ', nghĩa là bạn giữ bí mật thông tin đó và không kể cho ai khác biết.",
    origin: "Hình ảnh của thành ngữ này khá đơn giản và dễ hình dung: chiếc mũ đội trên đầu che phủ phần đầu, nơi chứa suy nghĩ và bí mật của một người. 'Giữ điều gì đó dưới mũ' gợi ý rằng bí mật đó được cất kín trong đầu, không để lộ ra ngoài, giống như việc giấu một vật gì đó bên dưới vành mũ để không ai nhìn thấy. Cách diễn đạt này đã xuất hiện từ khá lâu trong tiếng Anh và vẫn còn thông dụng trong văn nói.",
    examples: [
      { en: "Please keep this under your hat until the official announcement is made next week.", vi: "Làm ơn giữ kín chuyện này cho đến khi có thông báo chính thức vào tuần sau nhé." },
      { en: "I'll tell you the good news, but you have to keep it under your hat for now.", vi: "Tôi sẽ kể cho bạn tin vui này, nhưng bạn phải giữ kín nó trong lúc này." }
    ],
    ex: "Please keep this under your hat until the official announcement is made next week.",
  },
  {
    slug: "lead-someone-up-the-garden-path",
    term: "lead someone up the garden path",
    type: "idiom",
    en: "If you lead someone up the garden path, you deliberately deceive or mislead them, often by making promises or giving them false information over a period of time.",
    vi: "Nếu bạn 'dẫn ai đó đi lạc lối vườn', nghĩa là bạn cố ý lừa dối hoặc dẫn dắt sai lệch người đó, thường bằng những lời hứa hẹn hay thông tin giả trong một khoảng thời gian.",
    origin: "Hình ảnh trong thành ngữ này gợi ra một khu vườn với nhiều lối đi quanh co, hoa lá rợp mát; kẻ lừa dối dẫn nạn nhân đi theo một con đường có vẻ dễ chịu, đáng tin nhưng thực chất lại đưa họ đến một kết cục không như mong đợi, thay vì đi thẳng đến đích thực sự. Nguồn gốc chính xác của cách ví von này không được ghi chép rõ ràng, nhưng nhiều người cho rằng nó liên quan đến hình ảnh tán tỉnh hoặc dụ dỗ ai đó bằng những lời ngọt ngào trong khung cảnh lãng mạn của khu vườn, để rồi phản bội lòng tin của họ.",
    examples: [
      { en: "The salesman led us up the garden path with promises of a big discount that never came.", vi: "Người bán hàng đã lừa chúng tôi bằng những lời hứa giảm giá lớn mà chẳng bao giờ thành hiện thực." },
      { en: "She felt betrayed when she realized her business partner had been leading her up the garden path for months.", vi: "Cô cảm thấy bị phản bội khi nhận ra người hợp tác kinh doanh đã lừa dối mình suốt mấy tháng trời." }
    ],
    ex: "The salesman led us up the garden path with promises of a big discount that never came.",
  },
  {
    slug: "lie-through-your-teeth",
    term: "lie through your teeth",
    type: "idiom",
    en: "If you lie through your teeth, you tell a blatant, shameless lie, often while looking completely calm or sincere.",
    vi: "Nếu bạn 'nói dối qua kẽ răng', nghĩa là bạn nói một lời dối trá trắng trợn, không chút xấu hổ, thường trong khi tỏ ra hoàn toàn bình tĩnh hoặc chân thành.",
    origin: "Hình ảnh 'qua kẽ răng' gợi tả lời nói dối được thốt ra một cách trơn tru, thản nhiên đến mức gần như thấy rõ trên khuôn mặt, giữa hai hàm răng đang mím chặt hoặc nở nụ cười giả tạo. Cách nói này nhấn mạnh mức độ trắng trợn, không hề do dự của người nói dối, khác với việc nói dối một cách ngập ngừng hay áy náy.",
    examples: [
      { en: "He looked me straight in the eye and lied through his teeth about where he had been.", vi: "Anh ta nhìn thẳng vào mắt tôi và nói dối trắng trợn về việc mình đã ở đâu." },
      { en: "She was lying through her teeth when she said she had never seen the document before.", vi: "Cô ta đã nói dối không chớp mắt khi bảo rằng chưa từng thấy tài liệu đó bao giờ." }
    ],
    ex: "He looked me straight in the eye and lied through his teeth about where he had been.",
  },
  {
    slug: "on-the-fiddle",
    term: "on the fiddle",
    type: "idiom",
    en: "If someone is on the fiddle, they are involved in a dishonest scheme to get money illegally, especially by cheating an employer or a system.",
    vi: "Nếu ai đó 'đang chơi trò gian lận', nghĩa là họ đang tham gia vào một trò lừa đảo để kiếm tiền bất hợp pháp, đặc biệt là bằng cách gian lận với chủ lao động hoặc một hệ thống nào đó.",
    origin: "Đây là cách nói thông tục của tiếng Anh-Anh, trong đó động từ 'fiddle' vốn có nghĩa gốc là 'chơi đàn vi-ô-lông một cách tùy hứng', sau đó phát triển thêm nghĩa lóng là 'nghịch, mân mê, chỉnh sửa vặt vãnh một thứ gì đó'. Từ ý tưởng 'táy máy, chỉnh sửa cho có lợi cho mình' này, 'fiddle' dần mang nghĩa gian lận sổ sách hay số liệu để trục lợi, và cụm 'on the fiddle' ra đời để chỉ người đang thực hiện hành vi gian lận đó, đặc biệt phổ biến ở Anh trong thế kỷ 20.",
    examples: [
      { en: "It turned out the accountant had been on the fiddle for years before anyone noticed.", vi: "Hóa ra kế toán viên đó đã gian lận sổ sách nhiều năm trước khi bị phát hiện." },
      { en: "He was fired after his boss found out he was on the fiddle with the company's expense claims.", vi: "Anh ta bị sa thải sau khi sếp phát hiện anh ta gian lận trong việc kê khai chi phí công ty." }
    ],
    ex: "It turned out the accountant had been on the fiddle for years before anyone noticed.",
  },
  {
    slug: "pull-someone-s-leg",
    term: "pull someone's leg",
    type: "idiom",
    en: "If you pull someone's leg, you tease them by telling them something untrue in a playful, harmless way, usually as a joke rather than to deceive them seriously.",
    vi: "Nếu bạn 'kéo chân ai đó', nghĩa là bạn trêu chọc họ bằng cách nói điều không đúng sự thật một cách vui đùa, vô hại, thường chỉ để đùa cợt chứ không nhằm lừa dối nghiêm túc.",
    origin: "Nguồn gốc chính xác của thành ngữ này không hoàn toàn rõ ràng. Một giả thuyết phổ biến cho rằng nó bắt nguồn từ trò đùa của những kẻ trộm cắp hoặc lưu manh thời xưa, khi chúng dùng gậy hoặc dây móc vào chân người đi đường để làm họ ngã rồi trấn lột; qua thời gian, hành động 'kéo chân' mang tính lừa gạt này chuyển nghĩa sang việc đùa giỡn, chọc ghẹo vô hại hơn. Dù giả thuyết này khá phổ biến, nhiều nhà ngôn ngữ học vẫn coi đây là cách giải thích chưa được kiểm chứng chắc chắn.",
    examples: [
      { en: "Relax, I'm just pulling your leg — I didn't really eat the last slice of cake.", vi: "Thư giãn đi, tôi chỉ đùa thôi mà, tôi đâu có thật sự ăn miếng bánh cuối cùng đâu." },
      { en: "He told her he'd won the lottery, but he was only pulling her leg.", vi: "Anh ấy nói với cô rằng anh trúng số, nhưng thực ra chỉ là đùa cho vui thôi." }
    ],
    ex: "Relax, I'm just pulling your leg — I didn't really eat the last slice of cake.",
  },
  {
    slug: "sweep-something-under-the-carpet",
    term: "sweep something under the carpet",
    type: "idiom",
    en: "If you sweep something under the carpet, you deliberately try to hide or ignore a problem, mistake, or embarrassing fact instead of dealing with it properly.",
    vi: "Nếu bạn 'quét gì đó xuống dưới thảm', nghĩa là bạn cố tình che giấu hoặc phớt lờ một vấn đề, sai lầm hay sự việc đáng xấu hổ thay vì giải quyết nó một cách thỏa đáng.",
    origin: "Hình ảnh trong thành ngữ này rất trực quan: thay vì quét sạch bụi bẩn ra khỏi nhà, người ta chỉ quét nó xuống dưới tấm thảm để che giấu khỏi tầm mắt, khiến căn phòng trông có vẻ sạch sẽ dù bụi bẩn vẫn còn nguyên đó. Từ hành động dọn dẹp qua loa, đối phó này, thành ngữ được dùng theo nghĩa bóng để chỉ việc che giấu một vấn đề thay vì giải quyết nó tận gốc, và vấn đề đó vẫn tồn tại, chỉ là không bị nhìn thấy ngay lập tức.",
    examples: [
      { en: "The company tried to sweep the safety complaints under the carpet instead of investigating them.", vi: "Công ty đã cố lờ đi những khiếu nại về an toàn thay vì điều tra chúng." },
      { en: "You can't just sweep this argument under the carpet; we need to talk about it properly.", vi: "Bạn không thể cứ lờ đi cuộc cãi vã này được, chúng ta cần nói chuyện đàng hoàng về nó." }
    ],
    ex: "The company tried to sweep the safety complaints under the carpet instead of investigating them.",
  },
  {
    slug: "a-white-lie",
    term: "a white lie",
    type: "idiom",
    en: "A white lie is a small, harmless lie, often told to avoid hurting someone's feelings or to smooth over a minor social situation.",
    vi: "'Lời nói dối trắng' là một lời nói dối nhỏ, vô hại, thường được nói ra để tránh làm tổn thương cảm xúc của người khác hoặc để mọi việc diễn ra êm xuôi trong giao tiếp xã hội.",
    origin: "Trong tiếng Anh, màu trắng thường tượng trưng cho sự trong sạch, thuần khiết và vô hại, trái ngược với những sắc thái tiêu cực thường gắn với sự dối trá. Vì vậy 'a white lie' được dùng để phân biệt với những lời nói dối gây hại hay có ác ý, nhấn mạnh rằng lời nói dối này xuất phát từ ý tốt, chẳng hạn như khen một món quà mình không thích để không làm người tặng buồn lòng.",
    examples: [
      { en: "I told a white lie and said I loved the sweater, even though it wasn't really my style.", vi: "Tôi đã nói dối vô hại rằng tôi rất thích chiếc áo len đó, dù nó không thực sự hợp gu của tôi." },
      { en: "Sometimes a little white lie is kinder than telling someone the harsh truth.", vi: "Đôi khi một lời nói dối nhỏ vô hại lại tử tế hơn là nói thẳng sự thật phũ phàng với ai đó." }
    ],
    ex: "I told a white lie and said I loved the sweater, even though it wasn't really my style.",
  }
  ],
  "anger-and-irritation": [
  {
    slug: "bite-someone-s-head-off-or-snap-someone-s-head-off",
    term: "bite someone's head off or snap someone's head off",
    type: "idiom",
    en: "If you bite or snap someone's head off, you respond to them with sudden, harsh anger, usually over something fairly minor. The reaction is often seen as unfair or out of proportion to what the other person actually did.",
    vi: "Nếu bạn \"bite/snap someone's head off\", nghĩa là bạn quát mắng hoặc nổi giận gay gắt với ai đó, thường là phản ứng thái quá so với một lỗi khá nhỏ mà họ mắc phải.",
    origin: "Hình ảnh gốc là một con vật cắn đứt đầu con mồi trong một cú ngoạm nhanh và dữ dội. Khi chuyển sang lời nói, hình ảnh đó diễn tả một lời quát mắng đến bất ngờ và gay gắt không kém một cú cắn thật sự. Cụm từ này đã được dùng trong tiếng Anh từ khoảng thế kỷ 18 để miêu tả một sự mắng mỏ dữ dội, và vẫn rất phổ biến trong giao tiếp hằng ngày ngày nay.",
    examples: [
      { en: "I only asked a simple question, but he bit my head off.", vi: "Tôi chỉ hỏi một câu đơn giản thôi mà anh ấy đã quát tôi ầm ầm." },
      { en: "She snapped my head off just because I mentioned the missed deadline.", vi: "Cô ấy nổi giận quát tôi chỉ vì tôi nhắc đến việc trễ hạn." }
    ],
    ex: "I only asked a simple question, but he bit my head off.",
  },
  {
    slug: "blow-a-fuse",
    term: "blow a fuse",
    type: "idiom",
    en: "If you blow a fuse, you suddenly become extremely angry, often losing control and shouting. The anger builds up quickly and then erupts all at once.",
    vi: "Nếu bạn \"blow a fuse\", nghĩa là bạn đột nhiên nổi giận đùng đùng, không kiềm chế được cảm xúc và có thể quát tháo lớn tiếng.",
    origin: "Idiom này ví một người như một mạch điện: khi dòng điện quá tải, cầu chì (fuse) sẽ cháy và làm hỏng cả hệ thống một cách đột ngột. Cảm giác một người \"quá tải\" cảm xúc và bùng nổ cơn giận được ví von tương tự như vậy. Cách nói này bắt nguồn từ Mỹ, gắn liền với việc sử dụng cầu chì trong hệ thống điện gia đình.",
    examples: [
      { en: "My dad blew a fuse when he saw the dent in the car door.", vi: "Bố tôi nổi giận đùng đùng khi thấy vết móp trên cửa xe." },
      { en: "Try to explain calmly instead of blowing a fuse right away.", vi: "Hãy cố giải thích bình tĩnh thay vì nổi nóng ngay lập tức." }
    ],
    ex: "My dad blew a fuse when he saw the dent in the car door.",
  },
  {
    slug: "a-dirty-look-or-a-filthy-look",
    term: "a dirty look or a filthy look",
    type: "idiom",
    en: "A dirty or filthy look is an angry or disapproving facial expression aimed at someone, without any words being spoken. If you give someone this kind of look, you are showing your annoyance through your face alone.",
    vi: "\"A dirty/filthy look\" là một ánh mắt tức giận hoặc khó chịu mà bạn nhìn ai đó, thể hiện sự bực bội mà không cần nói ra lời nào.",
    origin: "Trong cụm này, \"dirty\" không mang nghĩa đen là \"bẩn\" mà mang nghĩa bóng chỉ điều gì đó tiêu cực, khó chịu, tương tự cách dùng trong \"a dirty trick\" (một trò chơi xấu). Vì vậy \"a dirty look\" là ánh mắt mang cảm xúc tiêu cực chứ không liên quan gì đến vệ sinh hay sự sạch sẽ. Cách dùng này đã phổ biến trong tiếng Anh nói từ đầu thế kỷ 20 và vẫn rất thông dụng ngày nay.",
    examples: [
      { en: "She gave me a dirty look when I cut in line.", vi: "Cô ấy nhìn tôi bằng ánh mắt khó chịu khi tôi chen ngang hàng." },
      { en: "He shot his brother a filthy look for revealing the secret.", vi: "Anh ấy liếc anh trai mình một ánh mắt đầy khó chịu vì đã tiết lộ bí mật." }
    ],
    ex: "She gave me a dirty look when I cut in line.",
  },
  {
    slug: "drive-someone-up-the-wall",
    term: "drive someone up the wall",
    type: "idiom",
    en: "If something or someone drives you up the wall, it makes you extremely annoyed or frustrated, often through repeated or constant behavior. The irritation builds until it becomes almost unbearable.",
    vi: "Nếu điều gì đó \"drive you up the wall\", nghĩa là nó khiến bạn cực kỳ bực bội, khó chịu đến mức gần như không thể chịu đựng nổi.",
    origin: "Hình ảnh gợi lên là một người bị dồn nén cảm xúc đến mức muốn \"trèo lên tường\" để thoát khỏi sự khó chịu đang bủa vây, giống như cách hình dung ai đó bứt rứt, bồn chồn đến cực điểm. Cách diễn đạt này trở nên phổ biến ở Mỹ từ giữa thế kỷ 20 và nay được dùng rộng rãi trong tiếng Anh nói chung.",
    examples: [
      { en: "That dripping tap is driving me up the wall.", vi: "Cái vòi nước nhỏ giọt đó khiến tôi phát điên lên được." },
      { en: "His constant complaining drives everyone in the office up the wall.", vi: "Việc anh ta suốt ngày than phiền khiến ai trong văn phòng cũng phát bực." }
    ],
    ex: "That dripping tap is driving me up the wall.",
  },
  {
    slug: "a-face-like-thunder",
    term: "a face like thunder",
    type: "idiom",
    en: "If someone has a face like thunder, their expression clearly shows they are extremely angry. Anyone looking at them can immediately tell that they are furious.",
    vi: "\"A face like thunder\" chỉ vẻ mặt của một người đang giận dữ ra mặt, ai nhìn vào cũng nhận ra ngay họ đang rất tức giận.",
    origin: "Idiom này liên tưởng đến bầu trời trước một cơn giông — u ám, nặng nề và báo hiệu điều gì đó dữ dội sắp xảy ra. Vẻ mặt của một người đang giận cũng được ví như bầu trời đó: tối sầm lại và đầy vẻ đe dọa. Cách so sánh thời tiết với cảm xúc con người vốn rất phổ biến trong tiếng Anh.",
    examples: [
      { en: "He walked out of the meeting with a face like thunder.", vi: "Anh ấy bước ra khỏi cuộc họp với vẻ mặt đen sầm vì giận." },
      { en: "Her face turned like thunder the moment she saw the mess in the kitchen.", vi: "Mặt cô ấy tối sầm lại ngay khi thấy căn bếp bừa bộn." }
    ],
    ex: "He walked out of the meeting with a face like thunder.",
  },
  {
    slug: "fly-off-the-handle",
    term: "fly off the handle",
    type: "idiom",
    en: "If you fly off the handle, you suddenly lose your temper and react with uncontrolled anger. This often happens very quickly and over something relatively small.",
    vi: "Nếu bạn \"fly off the handle\", nghĩa là bạn đột ngột nổi nóng, mất kiểm soát cảm xúc, thường chỉ vì một chuyện khá nhỏ nhặt.",
    origin: "Idiom này bắt nguồn từ hình ảnh đầu rìu bị lỏng và văng ra khỏi cán khi người dùng vung mạnh — một tình huống bất ngờ và có phần nguy hiểm. Cơn giận bộc phát đột ngột của con người được ví như chiếc đầu rìu \"bay\" khỏi cán một cách mất kiểm soát. Cách nói này xuất hiện từ thế kỷ 19 tại Mỹ và vẫn được dùng phổ biến ngày nay.",
    examples: [
      { en: "He flew off the handle when I borrowed his laptop without asking.", vi: "Anh ấy nổi giận đùng đùng khi tôi mượn laptop mà không hỏi trước." },
      { en: "Try not to fly off the handle every time someone disagrees with you.", vi: "Đừng nổi nóng mỗi khi có ai đó không đồng ý với bạn." }
    ],
    ex: "He flew off the handle when I borrowed his laptop without asking.",
  },
  {
    slug: "give-someone-hell",
    term: "give someone hell",
    type: "idiom",
    en: "If you give someone hell, you criticize, punish, or scold them very severely because you are extremely angry with them. The person on the receiving end is made to feel the full force of that anger.",
    vi: "Nếu bạn \"give someone hell\", nghĩa là bạn mắng mỏ hoặc trách phạt ai đó rất gay gắt, khiến họ phải \"khốn khổ\" vì cơn giận của bạn.",
    origin: "\"Hell\" ở đây được dùng như một ẩn dụ cho sự đau khổ, khó chịu tột cùng, bắt nguồn từ hình ảnh địa ngục trong văn hóa phương Tây như nơi trừng phạt khắc nghiệt nhất. Vì vậy \"cho ai đó nếm hell\" mang nghĩa bóng là khiến người đó phải chịu đựng một trận mắng mỏ hoặc trừng phạt dữ dội.",
    examples: [
      { en: "The coach gave the team hell for losing the match so badly.", vi: "Huấn luyện viên mắng đội cực kỳ gay gắt vì thua trận quá tệ." },
      { en: "My mom gave me hell for coming home so late without calling.", vi: "Mẹ tôi mắng tôi te tua vì về nhà quá muộn mà không gọi điện báo trước." }
    ],
    ex: "The coach gave the team hell for losing the match so badly.",
  },
  {
    slug: "go-through-the-roof-or-hit-the-roof",
    term: "go through the roof or hit the roof",
    type: "idiom",
    en: "If someone goes through the roof or hits the roof, they become extremely and suddenly angry. Their anger explodes very quickly and intensely, often catching others off guard.",
    vi: "Nếu ai đó \"go through the roof\" hoặc \"hit the roof\", nghĩa là họ nổi giận đùng đùng, cơn giận bùng lên dữ dội và bất ngờ.",
    origin: "Hình ảnh gợi ra là một lực bùng nổ mạnh đến mức người ta như bị hất tung lên và \"xuyên thủng mái nhà\" hoặc \"đập đầu vào trần nhà\" — một cách nói phóng đại cho mức độ giận dữ dữ dội. Cách diễn đạt này trở nên phổ biến trong tiếng Anh từ giữa thế kỷ 20.",
    examples: [
      { en: "He went through the roof when he found a scratch on his brand-new car.", vi: "Anh ấy nổi giận đùng đùng khi thấy một vết xước trên chiếc xe mới cứng của mình." },
      { en: "My parents hit the roof when they saw my exam results.", vi: "Bố mẹ tôi nổi trận lôi đình khi thấy kết quả thi của tôi." }
    ],
    ex: "He went through the roof when he found a scratch on his brand-new car.",
  },
  {
    slug: "have-a-chip-on-your-shoulder",
    term: "have a chip on your shoulder",
    type: "idiom",
    en: "If you have a chip on your shoulder, you carry ongoing resentment or anger, usually because of a past grievance or a feeling of having been treated unfairly. This bitterness tends to surface easily in your behavior toward others.",
    vi: "Nếu bạn \"have a chip on your shoulder\", nghĩa là bạn luôn mang trong lòng sự bực bội, ấm ức kéo dài, thường vì cảm thấy từng bị đối xử bất công trong quá khứ.",
    origin: "Có một giả thuyết phổ biến, dù chưa được xác nhận chắc chắn, cho rằng vào thế kỷ 19 ở Mỹ, một người muốn khiêu khích đánh nhau sẽ đặt một mẩu gỗ nhỏ (chip) lên vai mình và thách người khác gạt nó xuống — ai dám gạt tức là chấp nhận thách đấu. Từ hình ảnh đó, \"có mẩu gỗ trên vai\" trở thành ẩn dụ cho một người luôn trong tư thế sẵn sàng nổi giận hoặc dễ cảm thấy bị xúc phạm.",
    examples: [
      { en: "He's had a chip on his shoulder ever since he was passed over for the promotion.", vi: "Anh ấy luôn ấm ức trong lòng kể từ khi bị bỏ qua trong đợt thăng chức." },
      { en: "She seems to have a chip on her shoulder about not going to college.", vi: "Có vẻ cô ấy luôn mang tâm lý ấm ức vì không được học đại học." }
    ],
    ex: "He's had a chip on his shoulder ever since he was passed over for the promotion.",
  },
  {
    slug: "have-a-fit-or-throw-a-fit",
    term: "have a fit or throw a fit",
    type: "idiom",
    en: "If you have a fit or throw a fit, you react to something with a sudden, dramatic outburst of anger, often shouting or behaving in an exaggerated way. The reaction is very visible and hard to miss.",
    vi: "Nếu bạn \"have/throw a fit\", nghĩa là bạn nổi giận một cách bùng nổ, dữ dội, thể hiện rõ ra ngoài bằng hành động hoặc lời nói thái quá.",
    origin: "Trong y học cũ, \"fit\" dùng để chỉ một cơn co giật hoặc phát bệnh đột ngột, khiến người bệnh mất kiểm soát cơ thể. Idiom này mượn hình ảnh đó để miêu tả một cơn giận dữ đột ngột và dữ dội, như thể người đó đang \"lên cơn\" vì tức giận.",
    examples: [
      { en: "Mom threw a fit when she saw my report card.", vi: "Mẹ tôi nổi giận đùng đùng khi thấy bảng điểm của tôi." },
      { en: "He had a fit when the waiter brought the wrong order twice in a row.", vi: "Anh ấy nổi cơn thịnh nộ khi người phục vụ mang nhầm món tới hai lần liên tiếp." }
    ],
    ex: "Mom threw a fit when she saw my report card.",
  },
  {
    slug: "lose-it",
    term: "lose it",
    type: "idiom",
    en: "If you lose it, you suddenly lose control of your emotions, especially anger, and react in an extreme or irrational way. In that moment, you are no longer able to keep your temper or composure in check.",
    vi: "Nếu bạn \"lose it\", nghĩa là bạn hoàn toàn mất kiểm soát cảm xúc, đặc biệt là cơn giận, và phản ứng một cách thái quá hoặc thiếu lý trí.",
    origin: "Trong cụm này, \"it\" mang nghĩa mơ hồ, ám chỉ sự bình tĩnh, lý trí hoặc khả năng tự chủ của một người. \"Đánh mất nó\" nghĩa là đánh mất chính sự kiểm soát đó. Đây là cách dùng khẩu ngữ trở nên phổ biến từ cuối thế kỷ 20 và rất thông dụng trong tiếng Anh hiện đại.",
    examples: [
      { en: "I completely lost it when he lied to my face again.", vi: "Tôi hoàn toàn mất bình tĩnh khi anh ta lại nói dối ngay trước mặt tôi." },
      { en: "She lost it and started yelling at everyone in the office.", vi: "Cô ấy mất kiểm soát và bắt đầu quát tháo mọi người trong văn phòng." }
    ],
    ex: "I completely lost it when he lied to my face again.",
  },
  {
    slug: "make-your-blood-boil",
    term: "make your blood boil",
    type: "idiom",
    en: "If something makes your blood boil, it makes you extremely angry or outraged. The feeling is often described as a sudden, intense surge of anger.",
    vi: "Nếu điều gì đó \"make your blood boil\", nghĩa là nó khiến bạn vô cùng tức giận, phẫn nộ đến mức cảm thấy nóng bừng trong người.",
    origin: "Idiom này dựa trên quan niệm dân gian lâu đời rằng cảm xúc mạnh, đặc biệt là giận dữ, khiến \"máu nóng lên\" trong cơ thể — một cách hình dung cũng xuất hiện trong nhiều ngôn ngữ khác, kể cả tiếng Việt khi nói ai đó \"sôi máu\" vì tức giận. Cảm giác nóng bừng mặt, tim đập nhanh khi giận dữ đã được ví von thành hình ảnh máu sôi trào lên trong huyết quản.",
    examples: [
      { en: "It makes my blood boil to see people littering in the park.", vi: "Thấy người ta xả rác trong công viên khiến tôi vô cùng tức giận." },
      { en: "The unfair verdict made her blood boil.", vi: "Bản án bất công đó khiến cô ấy sôi máu vì tức giận." }
    ],
    ex: "It makes my blood boil to see people littering in the park.",
  },
  {
    slug: "a-pain-in-the-neck",
    term: "a pain in the neck",
    type: "idiom",
    en: "A pain in the neck is an annoying person or situation that causes ongoing irritation. If someone or something is described this way, they repeatedly bother or frustrate you.",
    vi: "\"A pain in the neck\" chỉ một người hoặc một việc gây phiền toái, khó chịu kéo dài, khiến bạn cảm thấy bực mình mỗi khi phải đối mặt.",
    origin: "Đây được xem là cách nói giảm nhẹ, lịch sự hơn của một cụm từ thô tục hơn ám chỉ phần cơ thể phía dưới, vốn cũng mang nghĩa \"kẻ gây phiền toái\". \"Cổ\" được chọn thay thế vì nó vẫn gợi cảm giác đau nhức, khó chịu nhưng nghe nhẹ nhàng và lịch sự hơn khi dùng trong giao tiếp thông thường.",
    examples: [
      { en: "This printer is such a pain in the neck; it jams every single time.", vi: "Cái máy in này thật phiền phức, lần nào cũng bị kẹt giấy." },
      { en: "My neighbor's dog barking all night is a real pain in the neck.", vi: "Con chó nhà hàng xóm sủa suốt đêm thật sự khiến tôi phát bực." }
    ],
    ex: "This printer is such a pain in the neck; it jams every single time.",
  },
  {
    slug: "a-sore-point-or-a-sore-spot",
    term: "a sore point or a sore spot",
    type: "idiom",
    en: "A sore point or sore spot is a topic that easily upsets or angers someone because it relates to a sensitive or embarrassing matter. Bringing it up tends to provoke a negative emotional reaction.",
    vi: "\"A sore point/spot\" chỉ một chủ đề hoặc vấn đề nhạy cảm, dễ khiến ai đó khó chịu hoặc tức giận khi bị nhắc đến.",
    origin: "Idiom này bắt nguồn từ nghĩa đen \"sore\" là chỗ đau, chỗ bị thương trên cơ thể — chỉ cần chạm nhẹ vào cũng gây đau đớn. Hình ảnh này được chuyển sang nghĩa bóng để chỉ những chủ đề nhạy cảm về mặt cảm xúc, chỉ cần nhắc đến là dễ khiến người ta phản ứng tiêu cực, giống như chạm vào một vết thương chưa lành.",
    examples: [
      { en: "His weight is a sore point, so please don't joke about it.", vi: "Cân nặng là chủ đề nhạy cảm với anh ấy, đừng đùa về nó." },
      { en: "The topic of her divorce is still a sore spot in the family.", vi: "Chuyện ly hôn của cô ấy vẫn là một điểm nhạy cảm trong gia đình." }
    ],
    ex: "His weight is a sore point, so please don't joke about it.",
  }
  ],
  "fear-and-frustration": [
  {
    slug: "at-the-end-of-your-tether",
    term: "at the end of your tether",
    type: "idiom",
    en: "If you are at the end of your tether, you have no patience, energy, or emotional strength left to deal with a difficult situation. It describes the point where someone feels they simply cannot cope any longer.",
    vi: "Nếu bạn \"at the end of your tether\", nghĩa là bạn đã kiệt sức, hết kiên nhẫn và không còn chịu đựng nổi tình huống khó khăn nữa. Đây là trạng thái cảm thấy mình sắp gục ngã vì căng thẳng kéo dài.",
    origin: "Một \"tether\" là sợi dây hoặc xích dùng để buộc một con vật (như dê, ngựa) vào một cái cọc, cho phép nó di chuyển trong một phạm vi giới hạn. Khi con vật đi hết chiều dài của sợi dây, nó không thể tiến thêm được nữa dù có cố gắng đến đâu. Từ hình ảnh đó, người Anh mượn để diễn tả cảm giác con người đã đến giới hạn cuối cùng của sức chịu đựng, không còn khả năng cố gắng thêm.",
    examples: [
      { en: "After three sleepless nights with the crying baby, she was at the end of her tether.", vi: "Sau ba đêm mất ngủ vì đứa trẻ khóc, cô ấy đã kiệt sức không còn chịu nổi nữa." },
      { en: "The manager was at the end of his tether after dealing with endless complaints all week.", vi: "Người quản lý đã hết kiên nhẫn sau khi phải xử lý hàng loạt lời phàn nàn suốt cả tuần." }
    ],
    ex: "After three sleepless nights with the crying baby, she was at the end of her tether.",
  },
  {
    slug: "a-bundle-of-nerves",
    term: "a bundle of nerves",
    type: "idiom",
    en: "If someone is a bundle of nerves, they are extremely nervous, anxious, or tense, often in a way that is visible to others. The phrase emphasizes that the person's anxiety feels concentrated and overwhelming.",
    vi: "Nếu ai đó là \"a bundle of nerves\", nghĩa là người đó cực kỳ lo lắng, hồi hộp, căng thẳng đến mức không giấu được. Cụm từ này nhấn mạnh sự lo âu dồn nén, khiến người ta bồn chồn không yên.",
    origin: "Cụm từ này ví con người như một \"bó\" (bundle) gồm toàn dây thần kinh (nerves) căng thẳng, thay vì có cấu tạo bình thường. Hình ảnh \"bó dây thần kinh\" gợi lên cảm giác mọi thứ trong người đều đang căng như dây đàn, chỉ cần một tác động nhỏ cũng có thể khiến người đó phản ứng thái quá. Nguồn gốc chính xác về thời điểm ra đời không rõ ràng, nhưng cách dùng này đã phổ biến trong tiếng Anh từ đầu thế kỷ 20.",
    examples: [
      { en: "Before her driving test, Mai was a bundle of nerves and could barely eat breakfast.", vi: "Trước kỳ thi lái xe, Mai lo lắng đến mức không thể ăn nổi bữa sáng." },
      { en: "He's usually so calm, but on his wedding day he was a complete bundle of nerves.", vi: "Anh ấy thường rất bình tĩnh, nhưng vào ngày cưới thì lại hồi hộp căng thẳng vô cùng." }
    ],
    ex: "Before her driving test, Mai was a bundle of nerves and could barely eat breakfast.",
  },
  {
    slug: "butterflies-in-your-stomach",
    term: "butterflies in your stomach",
    type: "idiom",
    en: "If you have butterflies in your stomach, you feel a fluttering, nervous sensation in your abdomen, usually because you are excited or worried about something important that is about to happen.",
    vi: "Nếu bạn có \"butterflies in your stomach\", nghĩa là bạn cảm thấy bồn chồn, hồi hộp trong bụng, thường là vì lo lắng hoặc háo hức trước một việc quan trọng sắp xảy ra.",
    origin: "Cảm giác hồi hộp thường đi kèm với một cảm giác vật lý kỳ lạ trong dạ dày, giống như có thứ gì đó đang bay lượn, đập cánh nhẹ bên trong. Người nói tiếng Anh ví cảm giác đó với những con bướm đang vỗ cánh trong bụng mình. Cách diễn đạt này trở nên phổ biến từ đầu thế kỷ 20 và ngày nay được dùng rất tự nhiên khi nói về sự lo lắng, hồi hộp trước một sự kiện.",
    examples: [
      { en: "I always get butterflies in my stomach right before a job interview.", vi: "Tôi luôn cảm thấy hồi hộp trong bụng ngay trước mỗi buổi phỏng vấn xin việc." },
      { en: "She had butterflies in her stomach as she walked onto the stage to give her speech.", vi: "Cô ấy cảm thấy bồn chồn trong bụng khi bước lên sân khấu để phát biểu." }
    ],
    ex: "I always get butterflies in my stomach right before a job interview.",
  },
  {
    slug: "frighten-the-life-out-of-someone-or-scare-the-life-out-of-someone",
    term: "frighten the life out of someone or scare the life out of someone",
    type: "idiom",
    en: "If something or someone frightens (or scares) the life out of you, it gives you a sudden, very strong shock of fear. The phrase is a hyperbolic way of describing an intense fright.",
    vi: "Nếu điều gì đó \"frighten/scare the life out of\" bạn, nghĩa là nó khiến bạn giật mình sợ hãi cực độ, một cú sốc bất ngờ và mạnh. Đây là cách nói phóng đại để diễn tả sự hoảng sợ tột độ.",
    origin: "Cụm từ này dùng lối nói cường điệu, ngụ ý rằng nỗi sợ mạnh đến mức như thể \"sự sống\" bị dọa văng ra khỏi cơ thể người đó. Đây là kiểu phóng đại thường gặp trong tiếng Anh khi diễn tả cảm xúc mạnh (tương tự như \"scare someone to death\"), không có một câu chuyện lịch sử cụ thể nào gắn với cụm từ này, mà nó phát triển tự nhiên như một cách nhấn mạnh mức độ sợ hãi.",
    examples: [
      { en: "That loud thunderclap frightened the life out of me while I was asleep.", vi: "Tiếng sấm lớn đó khiến tôi giật mình sợ hãi cực độ khi đang ngủ." },
      { en: "You scared the life out of me — I didn't hear you come in!", vi: "Bạn làm tôi hết hồn luôn đấy — tôi không nghe thấy bạn bước vào!" }
    ],
    ex: "That loud thunderclap frightened the life out of me while I was asleep.",
  },
  {
    slug: "get-cold-feet-or-have-cold-feet",
    term: "get cold feet or have cold feet",
    type: "idiom",
    en: "If you get cold feet, you suddenly become too nervous or afraid to go through with something you had planned to do, especially at the last moment. It often refers to hesitating just before a big decision, like a wedding or a major commitment.",
    vi: "Nếu bạn \"get/have cold feet\", nghĩa là bạn bỗng nhiên trở nên sợ hãi, do dự và không dám thực hiện điều mình đã định làm, đặc biệt ngay trước thời điểm quan trọng như đám cưới hay một quyết định lớn.",
    origin: "Nguồn gốc chính xác của cụm từ này không hoàn toàn rõ ràng. Một số người cho rằng nó bắt nguồn từ hình ảnh người lính ra trận với đôi chân lạnh cóng vì sợ hãi, khiến họ ngần ngại tiến lên. Một số khác liên hệ nó với cảm giác chân tay lạnh toát thực sự xảy ra khi con người lo lắng, căng thẳng. Dù nguồn gốc không chắc chắn, cụm từ này đã được dùng phổ biến trong tiếng Anh từ cuối thế kỷ 19.",
    examples: [
      { en: "He got cold feet the night before the wedding and almost called it off.", vi: "Anh ấy bỗng hoảng sợ vào đêm trước đám cưới và suýt hủy hôn." },
      { en: "We were about to sign the contract, but the investor had cold feet at the last minute.", vi: "Chúng tôi sắp ký hợp đồng thì nhà đầu tư lại chùn bước vào phút chót." }
    ],
    ex: "He got cold feet the night before the wedding and almost called it off.",
  },
  {
    slug: "not-get-a-word-in-edgeways",
    term: "not get a word in edgeways",
    type: "idiom",
    en: "If you cannot get a word in edgeways, someone else is talking so much or so continuously that you have no chance to say anything yourself. It describes the frustration of being unable to join a conversation.",
    vi: "Nếu bạn \"cannot get a word in edgeways\", nghĩa là người khác nói liên tục đến mức bạn không có cơ hội chen vào để nói được câu nào. Cụm từ này diễn tả sự bực bội khi không thể tham gia vào cuộc trò chuyện.",
    origin: "Hình ảnh gốc là một cuộc trò chuyện được ví như một không gian chật kín, không còn chỗ trống. Để chen được một từ vào, người ta phải \"nhét\" nó vào theo chiều cạnh (edgeways/edgewise), giống như cố nhét thêm một vật mỏng vào khe hẹp giữa những vật khác đã xếp kín. Cách nói này phổ biến ở Anh (edgeways) và Mỹ (edgewise), phản ánh sự bất lực khi đối diện với người nói quá nhiều.",
    examples: [
      { en: "My grandmother talks so fast that nobody can get a word in edgeways.", vi: "Bà tôi nói nhanh đến mức không ai chen được lời nào." },
      { en: "He dominated the meeting so completely that I couldn't get a word in edgeways.", vi: "Anh ta thao túng cuộc họp đến mức tôi không thể chen vào nói được câu nào." }
    ],
    ex: "My grandmother talks so fast that nobody can get a word in edgeways.",
  },
  {
    slug: "give-someone-the-creeps",
    term: "give someone the creeps",
    type: "idiom",
    en: "If someone or something gives you the creeps, it makes you feel a strong sense of fear, unease, or disgust, often without a clear or logical reason.",
    vi: "Nếu ai đó hoặc điều gì đó \"gives you the creeps\", nghĩa là nó khiến bạn cảm thấy sợ hãi, rùng mình, khó chịu, thường không rõ lý do cụ thể.",
    origin: "\"The creeps\" bắt nguồn từ cảm giác rùng mình, nổi da gà lan dần khắp da (như thể có thứ gì đang \"bò\" - creep - trên da). Cảm giác này thường xuất hiện khi con người sợ hãi hoặc cảm thấy có điều gì đó kỳ quái, không ổn. Cách diễn đạt \"give someone the creeps\" xuất hiện trong tiếng Anh từ thế kỷ 19 và vẫn được dùng phổ biến để mô tả cảm giác ớn lạnh trước người hoặc vật gì đó đáng sợ.",
    examples: [
      { en: "That abandoned house at the end of the street gives me the creeps.", vi: "Căn nhà bỏ hoang ở cuối phố khiến tôi cảm thấy rùng mình." },
      { en: "The way he stared at us without blinking gave everyone the creeps.", vi: "Cách anh ta nhìn chằm chằm vào chúng tôi mà không chớp mắt khiến ai cũng thấy rợn người." }
    ],
    ex: "That abandoned house at the end of the street gives me the creeps.",
  },
  {
    slug: "jump-out-of-your-skin-or-nearly-jump-out-of-your-skin",
    term: "jump out of your skin or nearly jump out of your skin",
    type: "idiom",
    en: "If you jump (or nearly jump) out of your skin, you are suddenly and severely startled, usually by an unexpected noise or movement. It is a hyperbolic way of describing a strong physical reaction to shock.",
    vi: "Nếu bạn \"jump/nearly jump out of your skin\", nghĩa là bạn giật mình dữ dội, thường vì một tiếng động hay chuyển động bất ngờ. Đây là cách nói phóng đại để diễn tả phản ứng cơ thể mạnh trước cú sốc.",
    origin: "Cụm từ này dùng hình ảnh phóng đại rằng khi giật mình quá mạnh, cơ thể như muốn bật tung ra khỏi lớp da của chính mình vì phản xạ đột ngột. Đây là một trong nhiều cách nói cường điệu trong tiếng Anh để mô tả sự giật mình cực độ, tương tự như cách người Việt nói \"giật bắn cả người\". Cách diễn đạt này đã xuất hiện từ lâu và vẫn rất thông dụng trong văn nói hằng ngày.",
    examples: [
      { en: "The phone rang so loudly that I nearly jumped out of my skin.", vi: "Chuông điện thoại reo to đến mức tôi giật bắn cả người." },
      { en: "She jumped out of her skin when her cat suddenly leapt onto her lap.", vi: "Cô ấy giật mình thót tim khi con mèo bất ngờ nhảy lên đùi." }
    ],
    ex: "The phone rang so loudly that I nearly jumped out of my skin.",
  },
  {
    slug: "the-last-straw-or-the-final-straw",
    term: "the last straw or the final straw",
    type: "idiom",
    en: "The last straw (or the final straw) is the last in a series of problems or annoyances that finally makes a situation impossible to tolerate, causing someone to lose patience completely.",
    vi: "\"The last/final straw\" là sự việc cuối cùng trong một chuỗi rắc rối hoặc phiền toái khiến người ta không thể chịu đựng thêm được nữa, làm họ mất hết kiên nhẫn.",
    origin: "Cụm từ này bắt nguồn từ câu tục ngữ cổ \"the straw that broke the camel's back\" (cọng rơm làm gãy lưng lạc đà). Hình ảnh mô tả một con lạc đà bị chất hàng ngày càng nhiều lên lưng; dù mỗi cọng rơm rất nhẹ, đến cọng cuối cùng thì sức nặng tích lũy đã vượt quá giới hạn và làm gãy lưng nó. Từ đó, \"the last straw\" được dùng để chỉ sự việc nhỏ cuối cùng khiến toàn bộ sự chịu đựng sụp đổ.",
    examples: [
      { en: "He had missed deadlines before, but arriving late to the client meeting was the last straw.", vi: "Anh ta từng trễ hạn nhiều lần trước đó, nhưng việc đến trễ cuộc họp với khách hàng chính là giọt nước tràn ly." },
      { en: "The final straw for her was when the landlord raised the rent again without warning.", vi: "Giọt nước tràn ly đối với cô ấy là khi chủ nhà lại tăng tiền thuê mà không báo trước." }
    ],
    ex: "He had missed deadlines before, but arriving late to the client meeting was the last straw.",
  },
  {
    slug: "on-edge",
    term: "on edge",
    type: "idiom",
    en: "If you are on edge, you feel nervous, tense, or irritable, often because you are worried about something or waiting anxiously for it to happen.",
    vi: "Nếu bạn \"on edge\", nghĩa là bạn cảm thấy căng thẳng, hồi hộp, dễ cáu gắt, thường vì đang lo lắng hoặc chờ đợi điều gì đó xảy ra.",
    origin: "Hình ảnh gốc là đứng trên \"mép\" (edge) của một vật gì đó, ví dụ như mép vực hay mép ghế, một vị trí không vững chắc, khiến người ta luôn trong trạng thái cảnh giác, sẵn sàng phản ứng vì sợ mất thăng bằng hoặc ngã. Từ đó, cụm từ được dùng để diễn tả trạng thái tinh thần căng như dây đàn, luôn cảnh giác và dễ giật mình.",
    examples: [
      { en: "Ever since the burglary, she has been on edge whenever she hears a noise at night.", vi: "Kể từ vụ trộm, cô ấy luôn căng thẳng mỗi khi nghe thấy tiếng động vào ban đêm." },
      { en: "The whole team was on edge waiting for the exam results to be posted.", vi: "Cả nhóm đều căng thẳng chờ đợi kết quả thi được công bố." }
    ],
    ex: "Ever since the burglary, she has been on edge whenever she hears a noise at night.",
  },
  {
    slug: "red-tape",
    term: "red tape",
    type: "idiom",
    en: "Red tape refers to excessive official rules, forms, and procedures that make a process slow, complicated, and frustrating, especially in government or large organizations.",
    vi: "\"Red tape\" chỉ những thủ tục, quy định, giấy tờ hành chính rườm rà, phức tạp khiến một quy trình trở nên chậm chạp và gây khó chịu, đặc biệt trong các cơ quan nhà nước hoặc tổ chức lớn.",
    origin: "Cụm từ này bắt nguồn từ thói quen của các cơ quan chính phủ Anh và một số nước châu Âu từ khoảng thế kỷ 16-17, khi các văn bản pháp lý và hồ sơ chính thức thường được buộc lại bằng một dải băng vải màu đỏ trước khi lưu trữ. Muốn mở được hồ sơ, người ta phải tháo dải băng đỏ đó ra, một công đoạn tượng trưng cho sự rườm rà, chậm trễ của thủ tục hành chính. Theo thời gian, \"red tape\" trở thành cách nói ẩn dụ chỉ chung mọi thủ tục quan liêu, rắc rối.",
    examples: [
      { en: "Getting a work permit here involves so much red tape that it can take months.", vi: "Xin giấy phép lao động ở đây phải qua nhiều thủ tục rườm rà đến mức mất hàng tháng trời." },
      { en: "The charity struggled with government red tape before it could officially start operating.", vi: "Tổ chức từ thiện đã phải vật lộn với thủ tục hành chính rườm rà của nhà nước trước khi được chính thức hoạt động." }
    ],
    ex: "Getting a work permit here involves so much red tape that it can take months.",
  },
  {
    slug: "scare-someone-out-of-their-wits",
    term: "scare someone out of their wits",
    type: "idiom",
    en: "If you scare someone out of their wits, you frighten them so severely that they can barely think or react clearly. It emphasizes an extreme, overwhelming level of fear.",
    vi: "Nếu bạn \"scare someone out of their wits\", nghĩa là bạn khiến người đó sợ hãi đến mức gần như không còn suy nghĩ hay phản ứng bình thường được nữa. Cụm từ này nhấn mạnh mức độ sợ hãi cực độ.",
    origin: "\"Wits\" trong tiếng Anh cổ có nghĩa là trí óc, khả năng suy nghĩ và nhận thức của con người. Khi ai đó bị dọa \"out of their wits\", tức là nỗi sợ mạnh đến mức khiến họ như bị đẩy ra khỏi trạng thái tỉnh táo bình thường, mất khả năng suy nghĩ rõ ràng trong giây lát. Đây là một trong nhiều cách nói cường điệu về nỗi sợ hãi tồn tại lâu đời trong tiếng Anh.",
    examples: [
      { en: "The horror movie scared the kids out of their wits, and they refused to sleep alone that night.", vi: "Bộ phim kinh dị khiến bọn trẻ sợ hãi đến mức không dám ngủ một mình tối hôm đó." },
      { en: "A sudden knock on the window scared me out of my wits while I was home alone.", vi: "Tiếng gõ cửa sổ bất ngờ khiến tôi sợ hết hồn khi đang ở nhà một mình." }
    ],
    ex: "The horror movie scared the kids out of their wits, and they refused to sleep alone that night.",
  },
  {
    slug: "be-shaking-like-a-leaf",
    term: "be shaking like a leaf",
    type: "idiom",
    en: "If someone is shaking like a leaf, they are trembling uncontrollably, usually because they are very frightened, nervous, or cold.",
    vi: "Nếu ai đó \"shaking like a leaf\", nghĩa là họ đang run rẩy không kiểm soát được, thường là vì quá sợ hãi, hồi hộp hoặc lạnh.",
    origin: "Đây là một phép so sánh dựa trên hình ảnh chiếc lá cây rung rinh liên tục trước gió, dù chỉ là một làn gió nhẹ. Sự rung động nhỏ, liên tục và có phần yếu ớt của chiếc lá được dùng để ví với việc cơ thể con người run rẩy vì sợ hãi hoặc lạnh. Đây là một hình ảnh so sánh tự nhiên, xuất hiện từ lâu trong tiếng Anh và vẫn còn được dùng phổ biến.",
    examples: [
      { en: "By the time she reached the stage, she was shaking like a leaf.", vi: "Đến lúc bước lên sân khấu, cô ấy đã run rẩy như tàu lá." },
      { en: "The puppy was shaking like a leaf during the thunderstorm.", vi: "Chú chó con run rẩy như tàu lá trong cơn giông." }
    ],
    ex: "By the time she reached the stage, she was shaking like a leaf.",
  },
  {
    slug: "until-you-are-blue-in-the-face",
    term: "until you are blue in the face",
    type: "idiom",
    en: "If you do or say something until you are blue in the face, you keep doing it repeatedly and with great effort, but without achieving the result you want. It suggests exhausting effort that ultimately fails to persuade or change anything.",
    vi: "Nếu bạn làm hoặc nói điều gì đó \"until you are blue in the face\", nghĩa là bạn cố gắng lặp đi lặp lại hết sức mình nhưng vẫn không đạt được kết quả mong muốn. Cụm từ này gợi ý sự nỗ lực đến kiệt sức mà vẫn vô ích.",
    origin: "Hình ảnh gốc liên quan đến việc gắng sức quá mức, chẳng hạn như la hét, tranh cãi hay thổi một vật gì đó liên tục, khiến mặt mày đỏ bừng rồi dần chuyển sang tím tái vì thiếu oxy. Cụm từ thường đi với động từ \"talk\" (talk until you're blue in the face), diễn tả việc cố thuyết phục ai đó bằng lời nói liên tục nhưng không có tác dụng, người nói kiệt sức mà đối phương vẫn không thay đổi.",
    examples: [
      { en: "You can argue until you're blue in the face, but he will never admit he's wrong.", vi: "Bạn có thể tranh cãi đến kiệt sức, nhưng anh ta sẽ không bao giờ thừa nhận mình sai." },
      { en: "I explained the rules until I was blue in the face, yet the new staff still made the same mistakes.", vi: "Tôi đã giải thích luật lệ đến mức kiệt sức, vậy mà nhân viên mới vẫn mắc phải những lỗi tương tự." }
    ],
    ex: "You can argue until you're blue in the face, but he will never admit he's wrong.",
  }
  ],
  "disagreement": [
  {
    slug: "agree-to-differ-or-agree-to-disagree",
    term: "agree to differ or agree to disagree",
    type: "idiom",
    en: "If two people agree to differ (or agree to disagree), they stop trying to convince each other and accept that they will never share the same opinion on an issue.",
    vi: "Khi hai người \"agree to differ\" (đồng ý là bất đồng), họ ngừng cố thuyết phục nhau và chấp nhận rằng mỗi bên sẽ giữ quan điểm riêng của mình về vấn đề đó.",
    origin: "Cụm này xuất hiện phổ biến trong tiếng Anh trang trọng, khi người ta muốn kết thúc một cuộc tranh luận một cách lịch sự thay vì để nó biến thành xung đột gay gắt. Nó phản ánh tinh thần thỏa hiệp trong văn hóa tranh luận kiểu Anh: thừa nhận sự khác biệt quan điểm là điều bình thường và không nhất thiết phải phân thắng bại. Ngày nay cụm từ được dùng rộng rãi trong cả giao tiếp đời thường lẫn ngoại giao, chính trị.",
    examples: [
      { en: "After an hour of debate, we decided to agree to differ and moved on to the next topic.", vi: "Sau một giờ tranh luận, chúng tôi quyết định đồng ý là bất đồng và chuyển sang chủ đề tiếp theo." },
      { en: "My brother and I will never agree on politics, so we've learned to agree to disagree.", vi: "Tôi và anh trai sẽ không bao giờ đồng quan điểm về chính trị, nên chúng tôi đã học cách chấp nhận bất đồng của nhau." }
    ],
    ex: "After an hour of debate, we decided to agree to differ and moved on to the next topic.",
  },
  {
    slug: "at-each-other-s-throats-or-at-one-another-s-throats",
    term: "at each other's throats or at one another's throats",
    type: "idiom",
    en: "If people are at each other's throats, they are arguing or fighting with each other constantly and aggressively.",
    vi: "Khi mọi người \"at each other's throats\", họ liên tục cãi vã hoặc xung đột gay gắt với nhau.",
    origin: "Hình ảnh này gợi đến việc hai con vật lao vào cắn xé cổ họng nhau khi chiến đấu — vị trí hiểm yếu quyết định sự sống còn. Từ hình ảnh bạo lực thể chất đó, cụm từ được chuyển nghĩa sang mô tả những cuộc tranh cãi gay gắt, dai dẳng giữa người với người, dù không có bạo lực thật sự.",
    examples: [
      { en: "The two managers have been at each other's throats ever since the budget was cut.", vi: "Hai vị quản lý đã liên tục xung đột với nhau kể từ khi ngân sách bị cắt giảm." },
      { en: "By the end of the meeting, the committee members were at one another's throats over the new policy.", vi: "Đến cuối cuộc họp, các thành viên ủy ban đã cãi vã gay gắt với nhau về chính sách mới." }
    ],
    ex: "The two managers have been at each other's throats ever since the budget was cut.",
  },
  {
    slug: "a-battle-of-wills",
    term: "a battle of wills",
    type: "idiom",
    en: "A battle of wills is a prolonged struggle between two people or groups, each determined not to give in or change their position.",
    vi: "\"A battle of wills\" là một cuộc đấu ý chí kéo dài giữa hai người hoặc hai bên, khi cả hai đều nhất quyết không nhượng bộ hay thay đổi lập trường.",
    origin: "Cụm từ dùng hình ảnh \"battle\" (trận chiến) để ví von một cuộc đối đầu không phải bằng vũ khí mà bằng sự kiên định, cố chấp của mỗi bên. Nó nhấn mạnh rằng ai bỏ cuộc hoặc nhượng bộ trước sẽ được xem là \"thua\", giống như thua trong một trận chiến thực sự.",
    examples: [
      { en: "Getting the toddler to eat vegetables turned into a real battle of wills every evening.", vi: "Việc bắt đứa trẻ ăn rau trở thành một cuộc đấu ý chí thực sự mỗi tối." },
      { en: "The negotiation became a battle of wills, with neither side willing to lower their price.", vi: "Cuộc đàm phán biến thành một cuộc đấu ý chí, khi cả hai bên đều không chịu hạ giá." }
    ],
    ex: "Getting the toddler to eat vegetables turned into a real battle of wills every evening.",
  },
  {
    slug: "a-bone-of-contention",
    term: "a bone of contention",
    type: "idiom",
    en: "A bone of contention is a subject or issue that causes ongoing disagreement or argument between people.",
    vi: "\"A bone of contention\" là vấn đề hoặc chủ đề gây ra tranh cãi, bất đồng kéo dài giữa mọi người.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh hai con chó giành nhau một khúc xương (bone), mỗi con đều muốn giữ lấy phần của mình và sẵn sàng gầm gừ, cắn nhau vì nó. Từ hình ảnh đó, \"bone of contention\" được dùng để chỉ bất kỳ vấn đề nào khiến hai bên liên tục bất đồng, giống như con chó không chịu buông khúc xương.",
    examples: [
      { en: "Who should do the dishes has always been a bone of contention in our house.", vi: "Ai là người rửa bát luôn là vấn đề gây tranh cãi trong nhà tôi." },
      { en: "The company's remote-work policy remains a bone of contention between staff and management.", vi: "Chính sách làm việc từ xa của công ty vẫn là điểm bất đồng giữa nhân viên và ban quản lý." }
    ],
    ex: "Who should do the dishes has always been a bone of contention in our house.",
  },
  {
    slug: "clear-the-air",
    term: "clear the air",
    type: "idiom",
    en: "If people clear the air, they talk openly about a disagreement or tension in order to remove misunderstanding and improve the relationship.",
    vi: "Khi mọi người \"clear the air\" (làm sáng tỏ mọi chuyện), họ nói chuyện thẳng thắn về bất đồng hoặc căng thẳng để xóa bỏ hiểu lầm và cải thiện mối quan hệ.",
    origin: "Cụm từ này ví bầu không khí căng thẳng, ngột ngạt sau một cuộc bất đồng giống như không khí oi bức trước cơn giông. Một cuộc trò chuyện thẳng thắn được ví như cơn mưa giúp \"làm sạch\" bầu không khí đó, giống như một trận mưa giông làm không khí trong lành trở lại sau cái nóng bức.",
    examples: [
      { en: "We sat down after the argument to clear the air before the trip.", vi: "Chúng tôi ngồi lại sau cuộc cãi vã để làm sáng tỏ mọi chuyện trước chuyến đi." },
      { en: "It's better to clear the air now than to let the resentment build up for months.", vi: "Tốt hơn là làm rõ mọi chuyện ngay bây giờ thay vì để sự ấm ức tích tụ suốt nhiều tháng." }
    ],
    ex: "We sat down after the argument to clear the air before the trip.",
  },
  {
    slug: "cross-swords",
    term: "cross swords",
    type: "idiom",
    en: "If two people cross swords, they argue or compete with each other over a particular issue.",
    vi: "Khi hai người \"cross swords\" (giao gươm), họ tranh luận hoặc đối đầu với nhau gay gắt về một vấn đề nào đó.",
    origin: "Cụm từ xuất phát trực tiếp từ hình ảnh đấu kiếm thời xưa, khi hai kiếm sĩ chạm lưỡi gươm vào nhau trước hoặc trong khi giao chiến. Nghĩa đen \"giao gươm\" dần được dùng ẩn dụ cho mọi hình thức đối đầu, tranh cãi bằng lời nói thay vì vũ khí thật.",
    examples: [
      { en: "The two senators have crossed swords many times over the new tax bill.", vi: "Hai vị thượng nghị sĩ đã nhiều lần đối đầu nhau về dự luật thuế mới." },
      { en: "I don't want to cross swords with the boss again about the schedule.", vi: "Tôi không muốn tranh cãi với sếp thêm lần nữa về lịch trình." }
    ],
    ex: "The two senators have crossed swords many times over the new tax bill.",
  },
  {
    slug: "fight-like-cat-and-dog",
    term: "fight like cat and dog",
    type: "idiom",
    en: "If two people fight like cat and dog, they argue or quarrel with each other frequently and fiercely.",
    vi: "Khi hai người \"fight like cat and dog\", họ thường xuyên cãi vã, xung đột với nhau một cách gay gắt.",
    origin: "Thành ngữ dựa trên quan niệm dân gian lâu đời rằng chó và mèo là hai loài vật vốn không hợp nhau và hay gây gổ khi ở gần nhau. Hình ảnh này được dùng để mô tả những cặp đôi, anh chị em hoặc đồng nghiệp thường xuyên cãi nhau dù vẫn phải chung sống hoặc làm việc cùng nhau.",
    examples: [
      { en: "The two sisters fight like cat and dog whenever they share a room.", vi: "Hai chị em cãi nhau như chó với mèo mỗi khi phải ở chung phòng." },
      { en: "Our neighbors fight like cat and dog, yet somehow they've been married for twenty years.", vi: "Hàng xóm nhà tôi suốt ngày cãi vã như chó với mèo, vậy mà không hiểu sao họ đã kết hôn được hai mươi năm." }
    ],
    ex: "The two sisters fight like cat and dog whenever they share a room.",
  },
  {
    slug: "give-someone-a-piece-of-your-mind",
    term: "give someone a piece of your mind",
    type: "idiom",
    en: "If you give someone a piece of your mind, you tell them directly and angrily what you think about something they have done wrong.",
    vi: "Khi bạn \"give someone a piece of your mind\", bạn thẳng thắn và tức giận nói cho người đó biết bạn nghĩ gì về việc sai trái họ đã làm.",
    origin: "Cụm từ này ví việc bộc lộ suy nghĩ thật của mình như trao đi \"một mẩu\" (a piece) tâm trí, ý kiến của bản thân cho người khác, thường là những lời chỉ trích thẳng thắn mà bình thường người ta giữ trong lòng. Cách nói đã xuất hiện từ nhiều thế kỷ trước trong tiếng Anh và vẫn rất phổ biến để chỉ hành động trút giận bằng lời nói.",
    examples: [
      { en: "When the waiter was rude, she gave him a piece of her mind.", vi: "Khi người phục vụ tỏ ra bất lịch sự, cô ấy đã thẳng thắn nói cho anh ta biết mình nghĩ gì." },
      { en: "I'm going to give my landlord a piece of my mind about this broken heater.", vi: "Tôi sẽ nói thẳng cho chủ nhà biết suy nghĩ của tôi về cái máy sưởi hỏng này." }
    ],
    ex: "When the waiter was rude, she gave him a piece of her mind.",
  },
  {
    slug: "have-a-bone-to-pick-with-someone",
    term: "have a bone to pick with someone",
    type: "idiom",
    en: "If you have a bone to pick with someone, you have a reason to be annoyed with them and want to discuss it directly.",
    vi: "Khi bạn \"have a bone to pick with someone\", nghĩa là bạn có điều không hài lòng với người đó và muốn nói chuyện thẳng thắn để giải quyết.",
    origin: "Cùng gốc hình ảnh với \"a bone of contention\" — con chó \"gặm\" (pick) khúc xương một cách chăm chú, dai dẳng. Ở đây, việc \"có một khúc xương cần gặm\" với ai đó ngụ ý bạn có một vấn đề nhỏ nhưng dai dẳng cần giải quyết với người ấy, giống như việc gặm cho hết một khúc xương.",
    examples: [
      { en: "I have a bone to pick with you about who ate the last slice of cake.", vi: "Tôi có chuyện cần nói rõ với bạn về việc ai đã ăn miếng bánh cuối cùng." },
      { en: "The director had a bone to pick with the editor over the final cut of the film.", vi: "Đạo diễn có điều không hài lòng cần nói với người biên tập về bản dựng cuối cùng của bộ phim." }
    ],
    ex: "I have a bone to pick with you about who ate the last slice of cake.",
  },
  {
    slug: "have-a-go-at-someone",
    term: "have a go at someone",
    type: "idiom",
    en: "If you have a go at someone, you criticize them or attack them verbally, often suddenly and for something they did.",
    vi: "Khi bạn \"have a go at someone\", bạn chỉ trích hoặc công kích người đó bằng lời nói, thường là bất ngờ vì điều họ đã làm.",
    origin: "\"Have a go\" vốn trong tiếng Anh-Anh mang nghĩa chung là \"thử làm gì đó\"; khi đi với \"at someone\", nó chuyển thành nghĩa \"nhắm vào ai đó\" để chỉ trích hoặc công kích, giống như việc \"ra tay thử\" tấn công bằng lời. Đây là cách nói khá thông tục, phổ biến trong tiếng Anh Anh hơn tiếng Anh Mỹ.",
    examples: [
      { en: "My teacher had a go at me for turning in the report late.", vi: "Giáo viên của tôi đã trách mắng tôi vì nộp báo cáo trễ." },
      { en: "There's no need to have a go at him, it wasn't entirely his fault.", vi: "Không cần phải chỉ trích anh ấy như vậy, đâu hoàn toàn là lỗi của anh ấy." }
    ],
    ex: "My teacher had a go at me for turning in the report late.",
  },
  {
    slug: "in-someone-s-bad-books",
    term: "in someone's bad books",
    type: "idiom",
    en: "If you are in someone's bad books, that person is currently annoyed or displeased with you because of something you did.",
    vi: "Khi bạn \"in someone's bad books\", người đó hiện đang khó chịu hoặc không hài lòng với bạn vì điều gì đó bạn đã làm.",
    origin: "Thành ngữ gợi lại hình ảnh một cuốn sổ ghi chép cũ, nơi người ta ghi lại ai tốt ai xấu, giống như cuốn sổ ghi trẻ ngoan/trẻ hư. \"Ở trong sổ đen\" của ai đó nghĩa là bạn đang bị đánh giá tiêu cực, trái ngược với \"in someone's good books\" (được lòng ai đó).",
    examples: [
      { en: "I forgot our anniversary, so I'm definitely in my wife's bad books this week.", vi: "Tôi quên ngày kỷ niệm của chúng tôi, nên chắc chắn tuần này tôi đang bị vợ giận." },
      { en: "He's been in the teacher's bad books ever since he was caught cheating.", vi: "Cậu ấy đã bị cô giáo để ý xấu kể từ khi bị bắt gặp gian lận." }
    ],
    ex: "I forgot our anniversary, so I'm definitely in my wife's bad books this week.",
  },
  {
    slug: "jump-down-someone-s-throat",
    term: "jump down someone's throat",
    type: "idiom",
    en: "If you jump down someone's throat, you respond to them angrily and suddenly, often more harshly than the situation deserves.",
    vi: "Khi bạn \"jump down someone's throat\", bạn phản ứng lại người đó một cách giận dữ và đột ngột, thường gay gắt hơn mức cần thiết.",
    origin: "Hình ảnh phóng đại này ví phản ứng giận dữ bất ngờ như thể \"nhảy thẳng vào cổ họng\" người kia — một hành động tấn công dữ dội và sát sạt về khoảng cách. Nó nhấn mạnh tốc độ và cường độ của phản ứng, thường là quá đà so với lỗi nhỏ mà người kia mắc phải.",
    examples: [
      { en: "I only asked a simple question, but he jumped down my throat immediately.", vi: "Tôi chỉ hỏi một câu đơn giản, nhưng anh ấy đã nổi giận với tôi ngay lập tức." },
      { en: "There's no need to jump down her throat just because she made one small mistake.", vi: "Không cần phải nổi nóng với cô ấy chỉ vì một lỗi nhỏ như vậy." }
    ],
    ex: "I only asked a simple question, but he jumped down my throat immediately.",
  },
  {
    slug: "kiss-and-make-up",
    term: "kiss and make up",
    type: "idiom",
    en: "If two people kiss and make up, they end an argument and become friendly with each other again.",
    vi: "Khi hai người \"kiss and make up\", họ kết thúc một cuộc cãi vã và làm hòa, trở nên thân thiện với nhau trở lại.",
    origin: "Cụm từ này gắn liền với hình ảnh một nụ hôn làm hòa truyền thống sau khi cãi nhau, đặc biệt phổ biến trong các mối quan hệ tình cảm hoặc gia đình. Ngày nay, nó được dùng rộng hơn, kể cả khi không có nụ hôn thật sự, chỉ đơn giản là để chỉ việc hai bên bỏ qua mâu thuẫn và quay lại thân thiết.",
    examples: [
      { en: "The couple argued at the party but kissed and made up before they went home.", vi: "Cặp đôi đã cãi nhau tại bữa tiệc nhưng đã làm hòa trước khi về nhà." },
      { en: "It's time for you two to kiss and make up instead of ignoring each other.", vi: "Đã đến lúc hai người làm hòa với nhau thay vì cứ lờ nhau đi." }
    ],
    ex: "The couple argued at the party but kissed and made up before they went home.",
  },
  {
    slug: "not-see-eye-to-eye",
    term: "not see eye to eye",
    type: "idiom",
    en: "If two people do not see eye to eye, they have a different opinion about something and disagree, often continuously.",
    vi: "Khi hai người \"not see eye to eye\", họ có quan điểm khác nhau về một vấn đề nào đó và thường xuyên bất đồng ý kiến.",
    origin: "Cụm từ bắt nguồn từ Kinh Thánh (Isaiah 52:8), nơi \"see eye to eye\" ban đầu mang nghĩa nhìn nhận sự việc giống hệt nhau, cùng một góc nhìn. Hình ảnh hai người đứng ngang tầm mắt, nhìn thẳng vào nhau và thấy cùng một điều, được dùng ẩn dụ cho việc có chung quan điểm; phủ định của nó — \"not see eye to eye\" — chỉ sự bất đồng quan điểm.",
    examples: [
      { en: "My father and I don't see eye to eye when it comes to career choices.", vi: "Tôi và bố không cùng quan điểm khi nói đến chuyện chọn nghề nghiệp." },
      { en: "The two co-founders haven't seen eye to eye on the company's direction for months.", vi: "Hai nhà đồng sáng lập đã không cùng quan điểm về hướng đi của công ty suốt nhiều tháng qua." }
    ],
    ex: "My father and I don't see eye to eye when it comes to career choices.",
  },
  {
    slug: "a-shouting-match",
    term: "a shouting match",
    type: "idiom",
    en: "A shouting match is a loud, angry argument in which people shout at each other instead of talking calmly.",
    vi: "\"A shouting match\" là một cuộc cãi vã ầm ĩ, giận dữ, trong đó mọi người hét vào mặt nhau thay vì nói chuyện bình tĩnh.",
    origin: "Từ \"match\" vốn dùng để chỉ một trận đấu thể thao hay thi đấu có luật lệ, nhưng ở đây được dùng mỉa mai để ví một cuộc cãi vã ồn ào như một \"cuộc thi xem ai hét to hơn\". Cách dùng này nhấn mạnh tính chất hỗn loạn, thiếu kiểm soát của cuộc tranh cãi, khác với một cuộc thảo luận có lý lẽ.",
    examples: [
      { en: "The debate quickly turned into a shouting match between the two candidates.", vi: "Cuộc tranh luận nhanh chóng biến thành một cuộc cãi vã ầm ĩ giữa hai ứng viên." },
      { en: "What started as a calm discussion ended up as a shouting match in the parking lot.", vi: "Điều bắt đầu như một cuộc trao đổi bình tĩnh lại kết thúc bằng một trận cãi vã ầm ĩ ngoài bãi đỗ xe." }
    ],
    ex: "The debate quickly turned into a shouting match between the two candidates.",
  }
  ],
  "success-and-failure": [
  {
    slug: "back-to-the-drawing-board",
    term: "back to the drawing board",
    type: "idiom",
    en: "If you go back to the drawing board, you start a plan or project again from the very beginning because the previous attempt failed.",
    vi: "Quay lại làm từ đầu, xây dựng lại kế hoạch từ con số không vì cách làm trước đó đã thất bại.",
    origin: "Xuất phát từ ngành thiết kế kỹ thuật, nơi \"drawing board\" (bàn vẽ) là nơi các kỹ sư phác thảo bản thiết kế trước khi chế tạo. Khi một thiết kế hay nguyên mẫu không hoạt động như mong đợi, người ta phải quay lại bàn vẽ để làm lại từ đầu. Cụm từ được cho là trở nên phổ biến hơn từ giữa thế kỷ 20, gắn liền với hình ảnh biếm họa thời Thế chiến II về một chiếc máy bay bị rơi và kỹ sư ôm bản vẽ quay lại bàn làm việc.",
    examples: [
      { en: "The prototype failed the safety tests, so the engineers had to go back to the drawing board.", vi: "Nguyên mẫu không đạt các bài kiểm tra an toàn, nên các kỹ sư phải quay lại làm từ đầu." },
      { en: "Our marketing campaign didn't attract any new customers, so it's back to the drawing board for the whole team.", vi: "Chiến dịch marketing của chúng tôi không thu hút được khách hàng mới nào, nên cả đội phải làm lại từ đầu." }
    ],
    ex: "The prototype failed the safety tests, so the engineers had to go back to the drawing board.",
  },
  {
    slug: "bring-the-house-down",
    term: "bring the house down",
    type: "idiom",
    en: "If a performance brings the house down, it makes the audience clap, laugh, or cheer enthusiastically because it is extremely entertaining or impressive.",
    vi: "Khiến khán giả vỗ tay, reo hò nhiệt liệt vì màn trình diễn quá xuất sắc hoặc hài hước.",
    origin: "Idiom bắt nguồn từ sân khấu kịch nghệ, nơi tiếng vỗ tay, cười và hò reo của khán giả lớn đến mức tưởng như có thể làm sập cả nhà hát. Cách nói này đã xuất hiện từ thế kỷ 19 trong giới biểu diễn ở Anh và Mỹ. Ngày nay nó được dùng rộng rãi cho bất kỳ màn trình diễn nào gây được tiếng vang lớn với người xem.",
    examples: [
      { en: "The comedian's final joke brought the house down, and the audience laughed for a full minute.", vi: "Câu chuyện cười cuối cùng của diễn viên hài khiến khán giả cười vang suốt cả phút và vỗ tay không ngớt." },
      { en: "Her powerful high note at the end of the song brought the house down.", vi: "Nốt cao đầy nội lực ở cuối bài hát của cô ấy khiến cả khán phòng vỡ òa." }
    ],
    ex: "The comedian's final joke brought the house down, and the audience laughed for a full minute.",
  },
  {
    slug: "come-up-in-the-world",
    term: "come up in the world",
    type: "idiom",
    en: "If someone comes up in the world, they become more successful, wealthy, or socially respected than they were before.",
    vi: "Ngày càng thành đạt, giàu có hoặc có địa vị cao hơn trước trong xã hội.",
    origin: "Cụm từ dùng hình ảnh không gian \"lên cao\" để ẩn dụ cho sự thăng tiến trong đời sống hay địa vị xã hội, tương tự cách nhiều ngôn ngữ dùng \"đi lên\" để chỉ thành công. Cách diễn đạt này đã xuất hiện trong tiếng Anh từ nhiều thế kỷ trước và thường đối lập với \"come down in the world\" (sa sút). Đây là một ẩn dụ định hướng khá tự nhiên, phản ánh cách con người hình dung thành công như việc leo lên một bậc thang.",
    examples: [
      { en: "He started as a delivery driver, but after opening his own business he's really come up in the world.", vi: "Anh ấy khởi đầu là tài xế giao hàng, nhưng sau khi mở công ty riêng thì đã thực sự thành đạt hơn nhiều." },
      { en: "Ever since she got promoted to director, everyone says she's come up in the world.", vi: "Kể từ khi được thăng chức giám đốc, ai cũng nói cô ấy đã lên đời." }
    ],
    ex: "He started as a delivery driver, but after opening his own business he's really come up in the world.",
  },
  {
    slug: "fall-flat-on-your-face",
    term: "fall flat on your face",
    type: "idiom",
    en: "If you fall flat on your face, you fail completely and often embarrassingly at something you attempted.",
    vi: "Thất bại hoàn toàn và thường là một cách rất bẽ mặt, xấu hổ.",
    origin: "Nghĩa đen của cụm từ là ngã sấp mặt xuống đất, một hình ảnh vừa đau vừa gây xấu hổ trước người khác. Từ hình ảnh vật lý này, người ta mở rộng sang nghĩa bóng để chỉ những thất bại rõ ràng, công khai trong công việc, kế hoạch hay bài phát biểu. Cách dùng ẩn dụ này đã phổ biến trong tiếng Anh ít nhất từ đầu thế kỷ 20.",
    examples: [
      { en: "He tried to impress the investors with a bold pitch, but he fell flat on his face when they asked about the numbers.", vi: "Anh ấy cố gây ấn tượng với các nhà đầu tư bằng một bài thuyết trình táo bạo, nhưng lại thất bại thảm hại khi họ hỏi về số liệu." },
      { en: "I was so confident about the exam that I didn't study, and I fell flat on my face.", vi: "Tôi quá tự tin về kỳ thi nên không ôn bài, và kết quả là thất bại ê chề." }
    ],
    ex: "He tried to impress the investors with a bold pitch, but he fell flat on his face when they asked about the numbers.",
  },
  {
    slug: "be-fighting-a-losing-battle",
    term: "be fighting a losing battle",
    type: "idiom",
    en: "If you are fighting a losing battle, you are trying hard to achieve something, but you are very unlikely to succeed.",
    vi: "Đang cố gắng hết sức nhưng gần như chắc chắn sẽ không thể thành công.",
    origin: "Idiom xuất phát từ ngôn ngữ quân sự, chỉ một trận đánh mà bên tham chiến biết rõ hoặc gần như chắc chắn sẽ thua nhưng vẫn tiếp tục chiến đấu. Hình ảnh này được chuyển sang đời sống thường ngày để mô tả những nỗ lực trong công việc, sức khỏe hay các mục tiêu cá nhân mà triển vọng thành công rất mong manh. Cách dùng ẩn dụ chiến tranh cho khó khăn đời thường khá phổ biến trong tiếng Anh.",
    examples: [
      { en: "The small shop is fighting a losing battle against the new supermarket chain nearby.", vi: "Cửa hàng nhỏ đang chiến đấu trong một cuộc chiến vô vọng trước chuỗi siêu thị mới mở gần đó." },
      { en: "Trying to convince him to change his mind feels like fighting a losing battle.", vi: "Cố gắng thuyết phục anh ta đổi ý cảm giác như một cuộc chiến vô vọng vậy." }
    ],
    ex: "The small shop is fighting a losing battle against the new supermarket chain nearby.",
  },
  {
    slug: "go-belly-up",
    term: "go belly-up",
    type: "idiom",
    en: "If a business or organization goes belly-up, it fails completely and stops operating, usually because it runs out of money.",
    vi: "Công ty hay doanh nghiệp phá sản, sụp đổ hoàn toàn, thường là do cạn kiệt tài chính.",
    origin: "Hình ảnh bắt nguồn từ việc cá chết thường nổi lên mặt nước với phần bụng (belly) ngửa lên trên, một dấu hiệu rõ ràng cho thấy con vật đã chết. Từ hình ảnh này, \"go belly-up\" được dùng ẩn dụ để chỉ một doanh nghiệp hay dự án đã \"chết\", tức là phá sản hoàn toàn. Cách dùng này trở nên phổ biến trong tiếng Anh Mỹ vào thế kỷ 20, đặc biệt trong ngữ cảnh kinh doanh, tài chính.",
    examples: [
      { en: "The startup went belly-up just eighteen months after it was founded.", vi: "Công ty khởi nghiệp đó đã phá sản chỉ mười tám tháng sau khi thành lập." },
      { en: "Several local restaurants went belly-up during the economic downturn.", vi: "Nhiều nhà hàng địa phương đã phải đóng cửa, phá sản trong giai đoạn kinh tế suy thoái." }
    ],
    ex: "The startup went belly-up just eighteen months after it was founded.",
  },
  {
    slug: "go-pear-shaped",
    term: "go pear-shaped",
    type: "idiom",
    en: "If a situation goes pear-shaped, it goes wrong or turns into a mess after starting out well or as planned.",
    vi: "Tình huống hay kế hoạch trở nên hỏng bét, rối tung dù ban đầu có vẻ suôn sẻ.",
    origin: "Nguồn gốc chính xác không rõ ràng, nhưng một giả thuyết phổ biến cho rằng cụm từ bắt nguồn từ ngành hàng không Anh, khi các phi công tập bay vòng tròn (loop) nhưng nếu thực hiện không chuẩn thì đường bay sẽ có hình quả lê méo mó thay vì hình tròn hoàn hảo. Một cách giải thích khác liên hệ đến việc thổi thủy tinh hoặc gốm, khi vật thể lẽ ra tròn lại biến dạng thành hình quả lê do lỗi kỹ thuật. Dù nguồn gốc còn tranh cãi, cụm từ đã trở nên thông dụng trong tiếng Anh Anh từ cuối thế kỷ 20 để chỉ mọi việc diễn biến xấu đi.",
    examples: [
      { en: "The wedding plans went pear-shaped when the venue cancelled at the last minute.", vi: "Kế hoạch đám cưới trở nên rối tung khi địa điểm tổ chức hủy hợp đồng vào phút chót." },
      { en: "Everything was going well until the presentation went pear-shaped and the projector stopped working.", vi: "Mọi thứ đều ổn cho đến khi buổi thuyết trình trở nên hỏng bét vì máy chiếu ngừng hoạt động." }
    ],
    ex: "The wedding plans went pear-shaped when the venue cancelled at the last minute.",
  },
  {
    slug: "hit-the-nail-on-the-head",
    term: "hit the nail on the head",
    type: "idiom",
    en: "If you hit the nail on the head, you describe or identify something exactly and correctly, especially the real cause of a problem.",
    vi: "Nói trúng phóc, chỉ ra chính xác vấn đề hoặc nguyên nhân thực sự của việc gì đó.",
    origin: "Hình ảnh bắt nguồn từ công việc đóng đinh bằng búa: khi đóng đúng vào đầu đinh, cú đánh sẽ hiệu quả và chính xác nhất, thay vì trượt sang bên làm cong đinh hay hỏng việc. Từ đó, cụm từ được dùng ẩn dụ để chỉ việc nói hoặc nhận định đúng trọng tâm, chính xác vào vấn đề cốt lõi. Cách dùng này đã xuất hiện trong tiếng Anh từ thế kỷ 16, cho thấy đây là một trong những idiom có lịch sử khá lâu đời.",
    examples: [
      { en: "When she said the real problem was poor communication, she hit the nail on the head.", vi: "Khi cô ấy nói vấn đề thực sự là do giao tiếp kém, cô ấy đã nói trúng phóc." },
      { en: "You hit the nail on the head — the app is slow because of the outdated server.", vi: "Bạn đã nói đúng ngay điểm mấu chốt rồi — ứng dụng chậm là vì máy chủ đã lỗi thời." }
    ],
    ex: "When she said the real problem was poor communication, she hit the nail on the head.",
  },
  {
    slug: "plain-sailing",
    term: "plain sailing",
    type: "idiom",
    en: "If something is plain sailing, it is easy and free of difficulties or problems, especially after a difficult part is over.",
    vi: "Suôn sẻ, dễ dàng, không gặp trở ngại gì, đặc biệt là sau khi đã vượt qua phần khó khăn.",
    origin: "Cụm từ có nguồn gốc hàng hải, ban đầu vốn là \"plane sailing\" — thuật ngữ kỹ thuật chỉ phương pháp tính toán hải trình đơn giản, coi bề mặt biển như mặt phẳng thay vì mặt cầu. Theo thời gian, cách viết và cách hiểu chuyển thành \"plain sailing\" với nghĩa liên tưởng đến việc chèo thuyền trên vùng biển êm ả, không sóng gió. Ngày nay idiom này được dùng rộng rãi để chỉ bất kỳ việc gì diễn ra dễ dàng, trôi chảy.",
    examples: [
      { en: "Once we got past the visa paperwork, the rest of the trip was plain sailing.", vi: "Sau khi xong xuôi thủ tục visa, phần còn lại của chuyến đi diễn ra hết sức suôn sẻ." },
      { en: "The first few weeks of the project were tough, but after that it was plain sailing.", vi: "Vài tuần đầu của dự án khá vất vả, nhưng sau đó mọi thứ trôi chảy dễ dàng." }
    ],
    ex: "Once we got past the visa paperwork, the rest of the trip was plain sailing.",
  },
  {
    slug: "save-the-day",
    term: "save the day",
    type: "idiom",
    en: "If someone saves the day, they do something that prevents a failure, disaster, or difficult situation at a critical moment.",
    vi: "Cứu vãn tình thế, giải quyết vấn đề vào đúng thời điểm nguy cấp trước khi mọi chuyện trở nên tồi tệ.",
    origin: "Cụm từ có thể liên hệ đến ngôn ngữ quân sự, khi một trận chiến (\"the day\") tưởng chừng sắp thua nhưng nhờ một hành động, viện binh, hay chiến lược kịp thời mà xoay chuyển thành chiến thắng. Hình ảnh \"ngày\" ở đây tượng trưng cho toàn bộ cuộc chiến hoặc sự kiện đang diễn ra. Từ nghĩa quân sự ban đầu, idiom được mở rộng sang đời sống hàng ngày để chỉ bất kỳ ai giải cứu một tình huống khó khăn vào phút chót.",
    examples: [
      { en: "The backup generator saved the day when the power went out during the concert.", vi: "Máy phát điện dự phòng đã cứu nguy khi mất điện giữa buổi hòa nhạc." },
      { en: "We forgot the tickets at home, but my sister saved the day by bringing them to the theatre just in time.", vi: "Chúng tôi quên vé ở nhà, nhưng em gái tôi đã cứu vãn tình thế bằng cách mang vé đến rạp kịp lúc." }
    ],
    ex: "The backup generator saved the day when the power went out during the concert.",
  },
  {
    slug: "touch-and-go",
    term: "touch and go",
    type: "idiom",
    en: "If a situation is touch and go, the outcome is very uncertain, and it could easily turn out badly.",
    vi: "Tình huống rất bấp bênh, kết quả chưa chắc chắn và có thể xấu đi bất cứ lúc nào.",
    origin: "Nguồn gốc chính xác không rõ ràng, nhưng một cách giải thích phổ biến liên hệ đến hàng hải, khi một con thuyền chạm nhẹ (touch) vào đáy cạn hoặc đá ngầm rồi vẫn tiếp tục lướt đi (go) được mà không mắc kẹt hay bị hư hại nặng — một tình huống nguy hiểm nhưng may mắn thoát được trong gang tấc. Một giả thuyết khác cho rằng cụm từ liên quan đến xe ngựa thời xưa, khi bánh xe chạm nhẹ vào chướng ngại vật nhưng vẫn đi tiếp được. Dù nguồn gốc còn chưa thống nhất, nghĩa bấp bênh, nguy hiểm trong gang tấc đã được giữ lại trong cách dùng hiện đại.",
    examples: [
      { en: "It was touch and go for a while after the surgery, but the patient is recovering well now.", vi: "Tình hình rất bấp bênh một thời gian sau ca phẫu thuật, nhưng bệnh nhân giờ đang hồi phục tốt." },
      { en: "The negotiations were touch and go right up until both sides finally signed the agreement.", vi: "Các cuộc đàm phán vẫn còn bấp bênh cho đến tận khi hai bên cuối cùng ký được thỏa thuận." }
    ],
    ex: "It was touch and go for a while after the surgery, but the patient is recovering well now.",
  },
  {
    slug: "win-hands-down",
    term: "win hands down",
    type: "idiom",
    en: "If you win hands down, you win very easily and clearly, with no real competition or doubt about the result.",
    vi: "Thắng một cách dễ dàng, áp đảo, không có gì phải tranh cãi về kết quả.",
    origin: "Cụm từ bắt nguồn từ đua ngựa, khi một kỵ sĩ dẫn đầu quá xa đối thủ đến mức có thể buông lỏng dây cương (hands down) mà không cần thúc ngựa chạy hết sức, ngựa vẫn về đích trước dễ dàng. Hình ảnh \"hands down\" tức là hai tay hạ thấp, thả lỏng dây cương thay vì phải ghì chặt để thúc ngựa. Từ ngữ cảnh đua ngựa thế kỷ 19, cụm từ được mở rộng sang mọi lĩnh vực để chỉ chiến thắng áp đảo, không cần cố gắng nhiều.",
    examples: [
      { en: "Our team won the quiz hands down, finishing with almost double the score of the runner-up.", vi: "Đội chúng tôi thắng cuộc thi đố vui một cách áp đảo, đạt điểm số gần gấp đôi đội về nhì." },
      { en: "She won the election hands down, taking more than seventy percent of the votes.", vi: "Cô ấy thắng cử một cách áp đảo, giành hơn bảy mươi phần trăm số phiếu bầu." }
    ],
    ex: "Our team won the quiz hands down, finishing with almost double the score of the runner-up.",
  },
  {
    slug: "with-flying-colours",
    term: "with flying colours",
    type: "idiom",
    en: "If you pass a test, exam, or challenge with flying colours, you succeed very impressively, achieving an excellent result.",
    vi: "Vượt qua một cách xuất sắc, đạt kết quả rất tốt, thành công rực rỡ.",
    origin: "\"Colours\" trong tiếng Anh cổ dùng để chỉ lá cờ, đặc biệt là cờ hiệu trên tàu chiến. Khi một con tàu chiến thắng trở về với lá cờ vẫn tung bay (\"flying colours\") thay vì phải hạ cờ đầu hàng, đó là dấu hiệu của một chiến thắng vẻ vang. Từ hình ảnh hàng hải và quân sự này, cụm từ được dùng ẩn dụ để chỉ việc hoàn thành xuất sắc bất kỳ thử thách nào, đặc biệt là các kỳ thi hay bài kiểm tra.",
    examples: [
      { en: "He passed his driving test with flying colours on his very first attempt.", vi: "Anh ấy đã vượt qua bài thi lái xe một cách xuất sắc ngay trong lần thử đầu tiên." },
      { en: "She came through the final interview with flying colours and got the job offer the next day.", vi: "Cô ấy đã vượt qua vòng phỏng vấn cuối cùng một cách xuất sắc và nhận được lời mời làm việc ngay ngày hôm sau." }
    ],
    ex: "He passed his driving test with flying colours on his very first attempt.",
  },
  {
    slug: "work-like-a-charm",
    term: "work like a charm",
    type: "idiom",
    en: "If something works like a charm, it works extremely well and produces exactly the result you wanted, often very smoothly or unexpectedly effectively.",
    vi: "Hoạt động cực kỳ hiệu quả, mang lại đúng kết quả mong muốn một cách suôn sẻ đến bất ngờ.",
    origin: "\"Charm\" ở đây mang nghĩa cổ là một câu thần chú hay bùa phép được cho là có sức mạnh huyền bí, tác động tức thì và hiệu nghiệm. Khi so sánh một giải pháp hay công cụ nào đó \"work like a charm\", người nói ngụ ý nó hiệu quả gần như phép màu, vượt xa mong đợi thông thường. Cách dùng ẩn dụ liên hệ đến phép thuật cho hiệu quả vượt trội là mô típ khá phổ biến trong tiếng Anh.",
    examples: [
      { en: "I added a new plugin to the website, and it worked like a charm right away.", vi: "Tôi đã thêm một plugin mới vào trang web, và nó hoạt động cực kỳ hiệu quả ngay lập tức." },
      { en: "The old trick of restarting the router worked like a charm and fixed the connection problem.", vi: "Cách làm cũ là khởi động lại router đã hiệu nghiệm như phép màu và khắc phục được sự cố kết nối." }
    ],
    ex: "I added a new plugin to the website, and it worked like a charm right away.",
  }
  ],
  "progress": [
  {
    slug: "be-barking-up-the-wrong-tree",
    term: "be barking up the wrong tree",
    type: "idiom",
    en: "If you are barking up the wrong tree, you are pursuing a mistaken idea or course of action, especially by blaming, suspecting, or asking the wrong person or cause.",
    vi: "Nếu bạn \"sủa nhầm cây\" (be barking up the wrong tree), nghĩa là bạn đang theo đuổi một suy nghĩ hoặc hướng hành động sai lầm, đặc biệt là nghi ngờ hay đổ lỗi cho sai đối tượng.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh săn gấu trúc (raccoon) vào ban đêm ở Mỹ thế kỷ 19, khi người ta dùng chó săn để đuổi con mồi lên cây. Đôi khi con mồi đã kịp nhảy sang cây khác để trốn, nhưng con chó vẫn đứng sủa dưới gốc cây cũ vì tưởng con mồi còn ở đó. Từ hình ảnh chú chó sủa nhầm chỗ, người ta dùng cụm từ này để chỉ việc nghi ngờ hoặc tìm kiếm sai hướng.",
    examples: [
      { en: "If you think I stole your notebook, you're barking up the wrong tree — I wasn't even here yesterday.", vi: "Nếu anh nghĩ tôi lấy trộm cuốn sổ của anh thì anh nhầm người rồi — hôm qua tôi còn không có mặt ở đây." },
      { en: "The police were barking up the wrong tree when they suspected the shop owner instead of the real thief.", vi: "Cảnh sát đã điều tra sai hướng khi nghi ngờ chủ cửa hàng thay vì tên trộm thực sự." }
    ],
    ex: "If you think I stole your notebook, you're barking up the wrong tree — I wasn't even here yesterday.",
  },
  {
    slug: "be-flogging-a-dead-horse",
    term: "be flogging a dead horse",
    type: "idiom",
    en: "If someone is flogging a dead horse, they are wasting time and effort trying to achieve something that has no chance of succeeding, or continuing to discuss a matter that has already been settled.",
    vi: "Nếu ai đó \"quất roi vào con ngựa đã chết\" (be flogging a dead horse), nghĩa là họ đang lãng phí thời gian và công sức cho một việc không còn khả năng thành công, hoặc cứ tiếp tục bàn về một vấn đề đã được giải quyết xong.",
    origin: "Cụm từ xuất phát từ hình ảnh theo nghĩa đen là quất roi vào một con ngựa đã chết để bắt nó chạy hoặc kéo xe — một hành động vô ích vì con ngựa không thể phản ứng được nữa. Thành ngữ này được cho là phổ biến trong giới nghị viện Anh thế kỷ 19, khi một nghị sĩ cố gắng khơi lại sự quan tâm của đồng nghiệp với một dự luật cải cách đã mất sức hút. Từ đó, cụm từ được dùng rộng rãi để chỉ mọi nỗ lực vô ích tương tự.",
    examples: [
      { en: "Trying to convince him to change his mind at this point is just flogging a dead horse.", vi: "Cố thuyết phục anh ta đổi ý vào lúc này chỉ là công cốc mà thôi." },
      { en: "We've discussed this proposal five times already; let's stop flogging a dead horse and move on.", vi: "Chúng ta đã bàn về đề xuất này năm lần rồi; đừng cố công vô ích nữa, hãy chuyển sang việc khác." }
    ],
    ex: "Trying to convince him to change his mind at this point is just flogging a dead horse.",
  },
  {
    slug: "gain-ground",
    term: "gain ground",
    type: "idiom",
    en: "If someone or something gains ground, they make progress, become more popular or successful, or move closer to catching up with a rival.",
    vi: "Nếu ai đó hoặc điều gì đó \"gain ground\" (giành được vị thế), nghĩa là họ đang tiến bộ, trở nên phổ biến hoặc thành công hơn, hoặc đang thu hẹp khoảng cách với đối thủ.",
    origin: "Đây là một ẩn dụ quân sự, xuất phát từ hình ảnh một đội quân tiến lên và chiếm được thêm lãnh thổ (ground) từ tay đối phương trong trận chiến. Về sau, cụm từ được mở rộng sang các lĩnh vực khác như thể thao, kinh doanh, chính trị và cả sự lan tỏa của ý tưởng, để chỉ việc đạt được tiến bộ hoặc vị thế tốt hơn.",
    examples: [
      { en: "Electric cars are gaining ground quickly as more charging stations appear across the country.", vi: "Xe điện đang nhanh chóng chiếm được vị thế khi ngày càng nhiều trạm sạc xuất hiện trên khắp cả nước." },
      { en: "The underdog team gained ground in the second half and almost caught up with the leaders.", vi: "Đội yếu thế hơn đã bứt lên trong hiệp hai và suýt bắt kịp đội dẫn đầu." }
    ],
    ex: "Electric cars are gaining ground quickly as more charging stations appear across the country.",
  },
  {
    slug: "get-to-grips-with-something-or-come-to-grips-with-something",
    term: "get to grips with something or come to grips with something",
    type: "idiom",
    en: "If you get to grips with something or come to grips with something, you make a real effort to understand it thoroughly and start dealing with it effectively, especially when it is difficult.",
    vi: "Nếu bạn \"get to grips with\" hoặc \"come to grips with\" một vấn đề, nghĩa là bạn nỗ lực tìm hiểu thấu đáo và bắt đầu xử lý nó một cách hiệu quả, đặc biệt khi đó là một việc khó khăn.",
    origin: "Từ \"grip\" trong thành ngữ này gợi đến động tác nắm chặt hoặc ôm giữ đối thủ trong môn vật (wrestling) hoặc trong một cuộc ẩu đả tay đôi. Khi hai bên \"come to grips\" nghĩa đen là họ đã ôm ghì lấy nhau để giao chiến trực tiếp. Nghĩa bóng phát triển từ đó: nắm chắc được vấn đề cũng giống như nắm chắc được đối thủ, tức là không còn né tránh mà đối mặt và xử lý nó.",
    examples: [
      { en: "It took me a few weeks to get to grips with the new accounting software.", vi: "Tôi mất vài tuần mới nắm bắt được cách sử dụng phần mềm kế toán mới." },
      { en: "The government is finally coming to grips with the housing crisis after years of inaction.", vi: "Chính phủ cuối cùng cũng bắt đầu xử lý nghiêm túc cuộc khủng hoảng nhà ở sau nhiều năm trì hoãn." }
    ],
    ex: "It took me a few weeks to get to grips with the new accounting software.",
  },
  {
    slug: "get-your-act-together",
    term: "get your act together",
    type: "idiom",
    en: "If you get your act together, you start organizing yourself and behaving in a more efficient, disciplined way, especially after a period of doing things badly or carelessly.",
    vi: "Nếu bạn \"get your act together\", nghĩa là bạn chấn chỉnh lại bản thân, sắp xếp công việc gọn gàng và hành động hiệu quả hơn, đặc biệt là sau một thời gian làm việc lộn xộn hoặc cẩu thả.",
    origin: "\"Act\" trong thành ngữ này ban đầu ám chỉ một tiết mục biểu diễn trên sân khấu tạp kỹ (vaudeville), nơi diễn viên cần chuẩn bị chu đáo về đạo cụ, thời lượng và trình tự trước khi lên diễn. Nếu \"act\" chưa sẵn sàng, buổi diễn sẽ hỗn loạn. Từ giữa thế kỷ 20, cụm từ được dùng rộng rãi sang đời sống hằng ngày để nói về việc tổ chức lại cuộc sống hoặc công việc của một người.",
    examples: [
      { en: "You need to get your act together if you want to pass the final exam next month.", vi: "Bạn cần chỉnh đốn lại bản thân nếu muốn vượt qua kỳ thi cuối kỳ vào tháng tới." },
      { en: "The team finally got their act together and delivered the project on time.", vi: "Cuối cùng cả nhóm cũng chấn chỉnh lại và hoàn thành dự án đúng hạn." }
    ],
    ex: "You need to get your act together if you want to pass the final exam next month.",
  },
  {
    slug: "go-around-in-circles-or-go-round-in-circles",
    term: "go around in circles or go round in circles",
    type: "idiom",
    en: "If you go around in circles or go round in circles, you keep discussing, thinking about, or doing something repeatedly without making any real progress or reaching a conclusion.",
    vi: "Nếu bạn \"go around/round in circles\", nghĩa là bạn cứ bàn luận, suy nghĩ hoặc làm đi làm lại một việc mà không đạt được tiến triển thực sự hay đi đến kết luận nào.",
    origin: "Thành ngữ xuất phát từ hình ảnh nghĩa đen của việc đi theo một vòng tròn khép kín và cuối cùng quay lại đúng điểm xuất phát mà không hề tiến về phía trước. Hình ảnh này được dùng ẩn dụ cho những cuộc thảo luận, tranh luận hoặc nỗ lực lặp đi lặp lại nhưng không mang lại kết quả cụ thể.",
    examples: [
      { en: "We've been going around in circles in this meeting for an hour without deciding anything.", vi: "Chúng tôi đã loanh quanh bàn bạc suốt một tiếng trong cuộc họp này mà chẳng quyết định được gì." },
      { en: "Stop going round in circles and just tell me what you actually want.", vi: "Đừng vòng vo nữa, hãy nói thẳng cho tôi biết bạn thực sự muốn gì." }
    ],
    ex: "We've been going around in circles in this meeting for an hour without deciding anything.",
  },
  {
    slug: "in-the-doldrums",
    term: "in the doldrums",
    type: "idiom",
    en: "If a person, a business, or a situation is in the doldrums, they are feeling low, inactive, or stuck, showing no growth, progress, or improvement for a period of time.",
    vi: "Nếu một người, một doanh nghiệp hay một tình huống đang \"in the doldrums\", nghĩa là họ đang ở trạng thái trì trệ, uể oải hoặc bế tắc, không có sự tăng trưởng, tiến bộ hay cải thiện nào trong một thời gian.",
    origin: "\"The Doldrums\" ban đầu là tên gọi của một vùng biển thực tế gần xích đạo, nơi gió thường lặng và thất thường, khiến các con tàu buồm thời xưa có thể bị mắc kẹt hàng ngày, thậm chí hàng tuần mà không di chuyển được. Từ hiện tượng hàng hải có thật này, từ \"doldrums\" dần được dùng theo nghĩa bóng để chỉ trạng thái trì trệ, buồn chán hoặc thiếu sức sống nói chung.",
    examples: [
      { en: "The housing market has been in the doldrums since interest rates rose sharply last year.", vi: "Thị trường nhà đất đã trì trệ kể từ khi lãi suất tăng mạnh vào năm ngoái." },
      { en: "After losing the championship, the whole team seemed to be in the doldrums for months.", vi: "Sau khi thua trận chung kết, cả đội dường như rơi vào trạng thái sa sút suốt nhiều tháng." }
    ],
    ex: "The housing market has been in the doldrums since interest rates rose sharply last year.",
  },
  {
    slug: "in-the-pipeline",
    term: "in the pipeline",
    type: "idiom",
    en: "If something is in the pipeline, it is currently being planned, developed, or prepared, and is expected to happen or become available at some point in the near future.",
    vi: "Nếu điều gì đó đang \"in the pipeline\", nghĩa là nó đang được lên kế hoạch, phát triển hoặc chuẩn bị, và dự kiến sẽ diễn ra hoặc sẵn sàng trong tương lai gần.",
    origin: "Cụm từ này bắt nguồn từ hình ảnh nghĩa đen trong ngành công nghiệp dầu khí: dầu hoặc khí đã được bơm vào đường ống (pipeline) và đang trên đường di chuyển đến điểm đích, dù chưa đến nơi. Hình ảnh \"đang trong đường ống, sắp tới nơi\" được mở rộng sang nghĩa bóng để chỉ bất kỳ dự án, sản phẩm hay kế hoạch nào đang được xúc tiến nhưng chưa hoàn tất.",
    examples: [
      { en: "The company has several new features in the pipeline that should launch by the end of the year.", vi: "Công ty đang chuẩn bị một số tính năng mới, dự kiến sẽ ra mắt trước cuối năm." },
      { en: "There's a new highway project in the pipeline that will reduce travel time to the airport.", vi: "Có một dự án đường cao tốc mới đang được xúc tiến, sẽ giúp giảm thời gian di chuyển ra sân bay." }
    ],
    ex: "The company has several new features in the pipeline that should launch by the end of the year.",
  },
  {
    slug: "light-at-the-end-of-the-tunnel",
    term: "light at the end of the tunnel",
    type: "idiom",
    en: "If there is light at the end of the tunnel, there are signs that a difficult or unpleasant situation is finally coming to an end, giving hope after a long period of hardship.",
    vi: "Nếu có \"light at the end of the tunnel\" (ánh sáng cuối đường hầm), nghĩa là đã xuất hiện những dấu hiệu cho thấy một tình huống khó khăn sắp kết thúc, mang lại hy vọng sau một thời gian dài vất vả.",
    origin: "Thành ngữ dựa trên hình ảnh nghĩa đen của việc đi qua một đường hầm tối dài và cuối cùng nhìn thấy ánh sáng ban ngày phía trước, báo hiệu lối ra đã gần kề. Cách diễn đạt này được sử dụng rộng rãi từ thế kỷ 20, đặc biệt trong bối cảnh chiến tranh và suy thoái kinh tế, để bày tỏ hy vọng rằng giai đoạn khó khăn sắp qua đi.",
    examples: [
      { en: "After months of chemotherapy, doctors say there's finally light at the end of the tunnel for her recovery.", vi: "Sau nhiều tháng hóa trị, các bác sĩ nói rằng cuối cùng cũng đã có tia hy vọng cho sự hồi phục của cô ấy." },
      { en: "Sales have been falling for a year, but the new contract feels like light at the end of the tunnel.", vi: "Doanh số đã giảm suốt một năm, nhưng hợp đồng mới này giống như một tia sáng hy vọng vậy." }
    ],
    ex: "After months of chemotherapy, doctors say there's finally light at the end of the tunnel for her recovery.",
  },
  {
    slug: "make-headway",
    term: "make headway",
    type: "idiom",
    en: "If you make headway, you make progress toward achieving something, especially something that is difficult or has been slow to move forward.",
    vi: "Nếu bạn \"make headway\", nghĩa là bạn đang đạt được tiến bộ hướng tới việc hoàn thành một điều gì đó, đặc biệt là việc khó khăn hoặc trước đó tiến triển chậm.",
    origin: "\"Headway\" vốn là một thuật ngữ hàng hải, chỉ chuyển động tiến về phía trước của con tàu trên mặt nước. Một con tàu \"making headway\" là con tàu vẫn tiến lên được bất chấp sức cản của gió hoặc dòng nước ngược. Từ hình ảnh đó, cụm từ được mở rộng sang nghĩa bóng để chỉ mọi sự tiến triển đạt được dù gặp khó khăn cản trở.",
    examples: [
      { en: "Researchers are finally making headway in understanding the disease after years of study.", vi: "Sau nhiều năm nghiên cứu, các nhà khoa học cuối cùng cũng đạt được tiến triển trong việc hiểu về căn bệnh này." },
      { en: "We haven't made much headway with the negotiations this week.", vi: "Tuần này chúng tôi vẫn chưa đạt được tiến triển đáng kể nào trong các cuộc đàm phán." }
    ],
    ex: "Researchers are finally making headway in understanding the disease after years of study.",
  },
  {
    slug: "on-a-roll",
    term: "on a roll",
    type: "idiom",
    en: "If someone is on a roll, they are experiencing a continuous streak of success or good luck, with one good result following another.",
    vi: "Nếu ai đó đang \"on a roll\", nghĩa là họ đang trải qua một chuỗi thành công hoặc may mắn liên tiếp, hết kết quả tốt này đến kết quả tốt khác.",
    origin: "Nguồn gốc được cho là xuất phát từ các trò chơi cờ bạc dùng xúc xắc, chẳng hạn như craps, khi một người chơi liên tục thắng mỗi lần xúc xắc \"lăn\" (roll) theo hướng có lợi cho họ thì được gọi là \"on a roll\". Về sau, cụm từ lan rộng sang thể thao và đời sống hằng ngày để chỉ bất kỳ chuỗi thắng lợi liên tiếp nào.",
    examples: [
      { en: "She's on a roll this season, scoring in every single match.", vi: "Mùa giải này cô ấy đang thăng hoa, trận nào cũng ghi bàn." },
      { en: "Our sales team has closed four big deals this month — they're really on a roll.", vi: "Đội kinh doanh của chúng tôi đã chốt được bốn hợp đồng lớn trong tháng này — họ đang thắng liên tiếp thật đấy." }
    ],
    ex: "She's on a roll this season, scoring in every single match.",
  },
  {
    slug: "on-the-right-track",
    term: "on the right track",
    type: "idiom",
    en: "If you are on the right track, you are doing something in a way that is likely to lead to success or to the correct result.",
    vi: "Nếu bạn đang \"on the right track\", nghĩa là bạn đang làm điều gì đó theo cách có khả năng dẫn đến thành công hoặc kết quả đúng đắn.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh nghĩa đen của đường ray xe lửa: một đoàn tàu đi đúng đường ray sẽ đến được điểm đích mong muốn, còn nếu đi sai đường ray thì sẽ lạc hướng. Hình ảnh này được mở rộng sang nghĩa bóng để chỉ bất kỳ kế hoạch, ý tưởng hay nỗ lực nào đang đi đúng hướng dẫn đến kết quả mong muốn.",
    examples: [
      { en: "Your essay draft looks much clearer now — you're definitely on the right track.", vi: "Bản nháp bài luận của bạn giờ rõ ràng hơn nhiều — chắc chắn bạn đang đi đúng hướng rồi đấy." },
      { en: "The doctor said the new treatment plan is on the right track and her symptoms are improving.", vi: "Bác sĩ nói rằng phác đồ điều trị mới đang đi đúng hướng và các triệu chứng của cô ấy đang cải thiện." }
    ],
    ex: "Your essay draft looks much clearer now — you're definitely on the right track.",
  },
  {
    slug: "put-something-on-hold",
    term: "put something on hold",
    type: "idiom",
    en: "If you put something on hold, you delay or pause an action, decision, or plan temporarily, intending to continue or deal with it again later.",
    vi: "Nếu bạn \"put something on hold\", nghĩa là bạn tạm dừng hoặc hoãn lại một hành động, quyết định hay kế hoạch trong một thời gian, với ý định sẽ tiếp tục hoặc giải quyết lại sau.",
    origin: "Thành ngữ này bắt nguồn từ cách dùng trong điện thoại: khi đặt một cuộc gọi \"on hold\", người ta tạm ngưng cuộc trò chuyện trong giây lát nhưng cuộc gọi vẫn tồn tại, không bị ngắt hẳn. Từ hình ảnh đó, cụm từ được mở rộng sang nghĩa bóng để chỉ việc tạm hoãn bất kỳ kế hoạch hay quyết định nào mà không hủy bỏ hoàn toàn.",
    examples: [
      { en: "We had to put our vacation plans on hold because of the sudden change in the project deadline.", vi: "Chúng tôi phải tạm hoãn kế hoạch nghỉ mát vì hạn chót dự án đột ngột thay đổi." },
      { en: "The company put the new product launch on hold until the supply issues were resolved.", vi: "Công ty đã tạm hoãn việc ra mắt sản phẩm mới cho đến khi các vấn đề về nguồn cung được giải quyết." }
    ],
    ex: "We had to put our vacation plans on hold because of the sudden change in the project deadline.",
  }
  ],
  "expectation": [
  {
    slug: "the-calm-before-the-storm-or-the-lull-before-the-storm",
    term: "the calm before the storm or the lull before the storm",
    type: "idiom",
    en: "If a period of time is the calm before the storm, it is an unusually quiet or peaceful time that people sense will soon be followed by trouble, conflict, or a burst of intense activity.",
    vi: "\"Khoảng lặng trước cơn bão\" chỉ một giai đoạn yên tĩnh bất thường mà người ta cảm nhận rằng sẽ sớm bị thay thế bởi rắc rối, xung đột hoặc một đợt hoạt động dồn dập.",
    origin: "Thành ngữ này bắt nguồn từ một hiện tượng thời tiết có thật: trước khi một cơn bão lớn, đặc biệt là bão nhiệt đới, ập tới, không khí thường trở nên lặng gió và tĩnh lặng một cách kỳ lạ. Người đi biển và nông dân từ xa xưa đã nhận ra sự tĩnh lặng bất thường này như một dấu hiệu báo trước nguy hiểm sắp xảy đến. Qua nhiều thế kỷ, hình ảnh này được dùng theo nghĩa bóng để mô tả bất kỳ khoảng thời gian yên ả nào trước một biến cố lớn trong đời sống, công việc hay chính trị.",
    examples: [
      { en: "The office has been eerily quiet all week, but everyone knows it's just the calm before the storm before the big product launch.", vi: "Văn phòng đã yên ắng lạ thường suốt cả tuần, nhưng ai cũng biết đó chỉ là khoảng lặng trước cơn bão trước đợt ra mắt sản phẩm lớn." },
      { en: "The two countries have stopped exchanging harsh statements, though analysts warn this could simply be the lull before the storm.", vi: "Hai quốc gia đã ngừng đưa ra những tuyên bố gay gắt, dù các nhà phân tích cảnh báo đây có thể chỉ là khoảng lặng trước cơn bão." }
    ],
    ex: "The office has been eerily quiet all week, but everyone knows it's just the calm before the storm before the big product launch.",
  },
  {
    slug: "castles-in-the-air",
    term: "castles in the air",
    type: "idiom",
    en: "If someone builds castles in the air, they spend time imagining grand plans, dreams, or ambitions that are unrealistic and very unlikely ever to come true.",
    vi: "\"Lâu đài trên không\" chỉ việc mơ mộng về những kế hoạch hay tham vọng to lớn nhưng viển vông, khó có thể trở thành hiện thực.",
    origin: "Hình ảnh một tòa lâu đài lơ lửng trên không trung, không có nền móng vững chắc, tự nó đã gợi lên sự phi thực tế và không thể tồn tại lâu dài. Cách nói này có họ hàng gần với thành ngữ tiếng Pháp cổ \"château en Espagne\" (lâu đài ở Tây Ban Nha), chỉ những giấc mơ xa vời. Trong văn học Anh, cụm từ này đã xuất hiện từ nhiều thế kỷ trước để phê phán những kế hoạch thiếu tính khả thi, dù đôi khi cũng được dùng với sắc thái trung tính hơn để chỉ những lý tưởng cần được hiện thực hóa bằng hành động cụ thể.",
    examples: [
      { en: "He keeps building castles in the air about starting his own company, but he hasn't even saved enough money to get started.", vi: "Anh ấy cứ xây lâu đài trên không về việc tự mở công ty riêng, nhưng thậm chí còn chưa để dành đủ tiền để bắt đầu." },
      { en: "Instead of building castles in the air, why don't we make a realistic plan with actual deadlines?", vi: "Thay vì xây những lâu đài trên không, sao chúng ta không lập một kế hoạch thực tế với các mốc thời gian cụ thể?" }
    ],
    ex: "He keeps building castles in the air about starting his own company, but he hasn't even saved enough money to get started.",
  },
  {
    slug: "not-count-your-chickens-or-not-count-your-chickens-before-they-re-hatched",
    term: "not count your chickens or not count your chickens before they're hatched",
    type: "idiom",
    en: "This idiom is used to warn someone not to assume that something good will definitely happen, or to plan as if a benefit is guaranteed, before it has actually happened.",
    vi: "Câu này dùng để nhắc nhở ai đó đừng vội chắc chắn hay lên kế hoạch dựa trên một điều tốt đẹp khi nó chưa thực sự xảy ra.",
    origin: "Thành ngữ này gắn liền với truyền thống ngụ ngôn Aesop, cụ thể là câu chuyện về cô gái vắt sữa mơ mộng sẽ dùng tiền bán sữa để mua trứng, ấp thành gà con rồi bán gà để làm giàu — nhưng vì mải mơ mộng mà cô đánh đổ cả xô sữa và mất trắng mọi thứ. Từ câu chuyện ngụ ngôn này, cụm từ \"đừng đếm gà con trước khi trứng nở\" đã trở thành một câu tục ngữ quen thuộc trong tiếng Anh từ thế kỷ 16, nhắc nhở con người không nên vội mừng trước khi kết quả thực sự xảy ra.",
    examples: [
      { en: "We haven't signed the contract yet, so let's not count our chickens before they're hatched.", vi: "Chúng ta vẫn chưa ký hợp đồng, nên đừng vội đếm gà con trước khi trứng nở." },
      { en: "She's already planning how to spend her bonus, but I told her not to count her chickens until the deal is finalized.", vi: "Cô ấy đã lên kế hoạch tiêu tiền thưởng, nhưng tôi bảo cô ấy đừng vội mừng khi thương vụ vẫn chưa hoàn tất." }
    ],
    ex: "We haven't signed the contract yet, so let's not count our chickens before they're hatched.",
  },
  {
    slug: "feel-something-in-your-bones",
    term: "feel something in your bones",
    type: "idiom",
    en: "If you feel something in your bones, you have a strong intuitive sense that something is true or is going to happen, even without any solid proof.",
    vi: "Cảm nhận điều gì đó \"trong xương tủy\" nghĩa là có một linh cảm mạnh mẽ rằng điều đó đúng hoặc sắp xảy ra, dù không có bằng chứng cụ thể nào.",
    origin: "Trong nhiều nền văn hóa, xương được xem là phần cốt lõi, sâu thẳm nhất của cơ thể, nên cảm giác \"thấu tận xương\" mang hàm ý một sự nhận biết sâu sắc, bản năng, vượt ra ngoài lý trí thông thường. Ngoài ra, quan niệm dân gian rằng người già có thể \"cảm nhận\" thời tiết sắp thay đổi qua cơn đau nhức xương khớp cũng góp phần củng cố mối liên hệ giữa xương và trực giác. Từ đó, cụm từ này được mở rộng sang nghĩa bóng để chỉ linh cảm mạnh mẽ về bất kỳ điều gì, không chỉ thời tiết.",
    examples: [
      { en: "I feel it in my bones that this new employee is going to become a great manager one day.", vi: "Tôi cảm nhận trong xương tủy rằng nhân viên mới này một ngày nào đó sẽ trở thành một quản lý giỏi." },
      { en: "Something felt wrong the moment I walked into the meeting; I felt it in my bones that bad news was coming.", vi: "Ngay khi bước vào cuộc họp, tôi đã cảm thấy có gì đó không ổn; tôi linh cảm được rằng tin xấu sắp đến." }
    ],
    ex: "I feel it in my bones that this new employee is going to become a great manager one day.",
  },
  {
    slug: "not-have-a-prayer",
    term: "not have a prayer",
    type: "idiom",
    en: "If someone does not have a prayer, they have absolutely no chance at all of succeeding or achieving what they hope for.",
    vi: "\"Không có lấy một cơ hội\" nghĩa là hoàn toàn không có chút khả năng nào để thành công hay đạt được điều mong muốn.",
    origin: "Cụm từ này được rút gọn từ cách nói đầy đủ hơn như \"not have a prayer's chance\", ám chỉ một tình huống tuyệt vọng đến mức chỉ có phép màu — thứ mà lời cầu nguyện có thể mang lại — mới cứu vãn được. Vì vậy, khi nói ai đó \"không có lấy một lời cầu nguyện\", người ta muốn nhấn mạnh rằng ngay cả phương án cứu cánh cuối cùng ấy cũng không tồn tại, tức là hoàn toàn vô vọng.",
    examples: [
      { en: "With three minutes left and a ten-point gap, our team doesn't have a prayer of winning this match.", vi: "Chỉ còn ba phút và cách biệt mười điểm, đội chúng tôi không có chút cơ hội nào để thắng trận này." },
      { en: "He didn't have a prayer of passing the exam after skipping most of the lectures all semester.", vi: "Anh ta không có cơ hội nào để vượt qua kỳ thi sau khi bỏ hầu hết các buổi học suốt cả học kỳ." }
    ],
    ex: "With three minutes left and a ten-point gap, our team doesn't have a prayer of winning this match.",
  },
  {
    slug: "it-s-early-days-or-it-s-early-in-the-day",
    term: "it's early days or it's early in the day",
    type: "idiom",
    en: "This idiom means that it is still too soon in a process or situation to know how things will ultimately turn out or to draw firm conclusions.",
    vi: "\"Còn quá sớm\" nghĩa là mới ở giai đoạn đầu của một việc gì đó nên chưa thể biết chắc kết quả hay đưa ra kết luận cuối cùng.",
    origin: "Cách diễn đạt này xuất phát trực tiếp từ nghĩa đen của \"early in the day\" — buổi sáng sớm, khi phần lớn thời gian trong ngày vẫn còn ở phía trước. Từ đó, hình ảnh \"ngày\" được dùng như một ẩn dụ cho toàn bộ tiến trình của một dự án, mối quan hệ hay sự kiện: nếu mới ở giai đoạn \"sáng sớm\", vẫn còn rất nhiều thời gian và diễn biến chưa xảy ra, nên chưa thể vội vàng phán xét.",
    examples: [
      { en: "It's early days for the new policy, so we shouldn't judge whether it's working just yet.", vi: "Chính sách mới vẫn còn quá sớm để đánh giá, nên chúng ta chưa nên vội kết luận liệu nó có hiệu quả hay không." },
      { en: "The team has only played two matches this season, so it's early days in terms of predicting the final standings.", vi: "Đội bóng mới thi đấu hai trận trong mùa giải này, nên còn quá sớm để dự đoán bảng xếp hạng cuối cùng." }
    ],
    ex: "It's early days for the new policy, so we shouldn't judge whether it's working just yet.",
  },
  {
    slug: "like-looking-for-a-needle-in-a-haystack",
    term: "like looking for a needle in a haystack",
    type: "idiom",
    en: "If you describe a task as being like looking for a needle in a haystack, you mean it is extremely difficult, if not nearly impossible, to find one particular thing among a huge number of others.",
    vi: "\"Như mò kim đáy bể\" ví von việc tìm một thứ gì đó cực kỳ khó khăn, gần như bất khả thi, giữa vô vàn thứ khác.",
    origin: "Hình ảnh này xuất phát từ nghĩa đen rất trực quan: một cây kim nhỏ, mảnh, khó nhìn thấy bị lẫn trong một đống cỏ khô to lớn và rối rắm thì gần như không thể tìm ra. Cách so sánh này đã xuất hiện trong tiếng Anh từ khoảng thế kỷ 16 và trở thành một trong những phép ví von phổ biến nhất về sự khó khăn trong việc tìm kiếm, tương tự như thành ngữ \"mò kim đáy bể\" trong tiếng Việt.",
    examples: [
      { en: "Searching for one specific email among ten years of messages felt like looking for a needle in a haystack.", vi: "Việc tìm một email cụ thể trong hàng chục năm tin nhắn chẳng khác nào mò kim đáy bể." },
      { en: "Finding the exact source of the bug in millions of lines of code was like looking for a needle in a haystack.", vi: "Tìm ra chính xác nguồn gốc lỗi trong hàng triệu dòng mã chẳng khác nào mò kim đáy bể." }
    ],
    ex: "Searching for one specific email among ten years of messages felt like looking for a needle in a haystack.",
  },
  {
    slug: "a-long-shot",
    term: "a long shot",
    type: "idiom",
    en: "If something is a long shot, it has only a small chance of succeeding, but it may still be worth attempting.",
    vi: "\"Một cơ hội mong manh\" chỉ việc có khả năng thành công rất thấp, nhưng vẫn có thể đáng để thử.",
    origin: "Thành ngữ này bắt nguồn từ việc bắn súng hoặc săn bắn: một phát bắn nhắm vào mục tiêu ở khoảng cách xa (long shot) khó trúng đích hơn nhiều so với phát bắn ở cự ly gần. Cách nói này cũng rất phổ biến trong đua ngựa, dùng để chỉ một con ngựa ít được đánh giá cao nhưng vẫn có tỷ lệ cược cao nếu thắng, từ đó mở rộng sang nghĩa bóng chỉ bất kỳ nỗ lực nào có xác suất thành công thấp.",
    examples: [
      { en: "Applying for that scholarship is a long shot, but I think it's still worth trying.", vi: "Việc xin học bổng đó là một cơ hội khá mong manh, nhưng tôi nghĩ vẫn đáng để thử." },
      { en: "It's a long shot, but maybe the store still has the shoes in your size if you call them directly.", vi: "Cơ hội khá mong manh, nhưng có thể cửa hàng vẫn còn giày cỡ của bạn nếu bạn gọi trực tiếp cho họ." }
    ],
    ex: "Applying for that scholarship is a long shot, but I think it's still worth trying.",
  },
  {
    slug: "on-the-cards",
    term: "on the cards",
    type: "idiom",
    en: "If something is on the cards, it seems likely to happen soon, based on the current signs or circumstances.",
    vi: "\"Có khả năng xảy ra/nằm trong dự đoán\" nghĩa là điều gì đó có vẻ sẽ xảy ra dựa trên những dấu hiệu hiện tại.",
    origin: "Thành ngữ này bắt nguồn từ tục xem bói bằng bài, chẳng hạn bài tarot, nơi thầy bói sẽ nói một sự kiện là \"nằm trên những lá bài\" đã được trải ra, tức là đã được các lá bài \"báo trước\" hay dự đoán. Theo thời gian, cách nói này được dùng rộng rãi hơn để chỉ bất kỳ điều gì có vẻ sắp xảy ra dựa trên dấu hiệu thực tế, không nhất thiết liên quan đến bói toán. Ở Mỹ, người ta thường dùng biến thể \"in the cards\".",
    examples: [
      { en: "Given the company's recent losses, layoffs seem to be on the cards.", vi: "Với những khoản lỗ gần đây của công ty, việc sa thải nhân viên dường như đang nằm trong dự đoán." },
      { en: "A promotion could be on the cards for her after the success of the last project.", vi: "Rất có khả năng cô ấy sẽ được thăng chức sau thành công của dự án vừa rồi." }
    ],
    ex: "Given the company's recent losses, layoffs seem to be on the cards.",
  },
  {
    slug: "on-the-off-chance",
    term: "on the off-chance",
    type: "idiom",
    en: "If you do something on the off-chance, you do it hoping for a particular good result, even though you believe it is unlikely to happen.",
    vi: "\"Với hy vọng mong manh\" nghĩa là làm điều gì đó dù biết khả năng thành công thấp, chỉ vì còn nước còn tát.",
    origin: "Trong cụm từ này, \"off\" mang nghĩa \"lệch, xa khỏi mức thông thường\", tức chỉ một khả năng nằm ngoài những kết quả thường gặp, còn \"chance\" gắn với ý niệm về vận may. Ghép lại, cụm từ diễn tả hành động được thực hiện dù người nói biết rõ xác suất thành công là thấp, chỉ vì \"biết đâu đấy\" nó vẫn có thể xảy ra.",
    examples: [
      { en: "I called the restaurant on the off-chance that they still had a table free tonight.", vi: "Tôi đã gọi điện cho nhà hàng với hy vọng mong manh rằng tối nay họ vẫn còn bàn trống." },
      { en: "She kept the old ticket on the off-chance that it might still be valid for a refund.", vi: "Cô ấy vẫn giữ tấm vé cũ với hy vọng mong manh rằng nó vẫn có thể được hoàn tiền." }
    ],
    ex: "I called the restaurant on the off-chance that they still had a table free tonight.",
  },
  {
    slug: "out-of-the-blue",
    term: "out of the blue",
    type: "idiom",
    en: "If something happens out of the blue, it happens suddenly and unexpectedly, without any prior warning.",
    vi: "\"Bất ngờ/đột ngột\" diễn tả việc gì đó xảy ra thình lình mà không có bất kỳ dấu hiệu báo trước nào.",
    origin: "Cụm từ này là dạng rút gọn của \"a bolt/thunderbolt out of the blue (sky)\", ám chỉ một tia sét đánh xuống từ bầu trời trong xanh, không hề có mây giông báo trước — một hiện tượng bất thường và đầy bất ngờ. Cách dùng này được ghi nhận trong tiếng Anh từ đầu thế kỷ 19 và dần được rút gọn thành \"out of the blue\" khi dùng để mô tả bất kỳ sự kiện đột ngột, không lường trước nào trong đời sống.",
    examples: [
      { en: "My old college roommate called me out of the blue after ten years of silence.", vi: "Người bạn cùng phòng đại học cũ của tôi bỗng dưng gọi điện sau mười năm bặt tin." },
      { en: "The company announced the merger out of the blue, catching every employee by surprise.", vi: "Công ty bất ngờ thông báo về việc sáp nhập, khiến toàn bộ nhân viên đều bất ngờ." }
    ],
    ex: "My old college roommate called me out of the blue after ten years of silence.",
  },
  {
    slug: "par-for-the-course",
    term: "par for the course",
    type: "idiom",
    en: "If something is par for the course, it is exactly what you would normally expect to happen in a particular situation, often something unwelcome or mildly frustrating.",
    vi: "\"Chuyện thường tình/đúng như dự đoán\" nghĩa là điều gì đó hoàn toàn bình thường, đúng như những gì người ta vẫn thường gặp trong hoàn cảnh đó, thường mang sắc thái không mấy dễ chịu.",
    origin: "Thành ngữ này bắt nguồn từ môn golf, trong đó \"par\" là số gậy tiêu chuẩn được quy định để hoàn thành một lỗ hoặc cả sân golf. Đạt đúng par không phải là điều xuất sắc hay bất ngờ, mà chỉ đơn giản là mức trung bình, đúng như kỳ vọng. Từ sân golf, cách nói này được mở rộng sang đời sống hằng ngày để chỉ bất kỳ điều gì diễn ra đúng như mức bình thường, không có gì đáng ngạc nhiên.",
    examples: [
      { en: "The train was delayed again this morning, but that's par for the course during rush hour.", vi: "Sáng nay tàu lại trễ giờ, nhưng đó là chuyện thường tình vào giờ cao điểm." },
      { en: "Getting a few critical comments on a new proposal is par for the course in this industry.", vi: "Nhận vài lời phê bình về một đề xuất mới là chuyện hết sức bình thường trong ngành này." }
    ],
    ex: "The train was delayed again this morning, but that's par for the course during rush hour.",
  },
  {
    slug: "not-a-snowball-s-chance-in-hell",
    term: "not a snowball's chance in hell",
    type: "idiom",
    en: "If someone does not have a snowball's chance in hell, they have absolutely no possibility whatsoever of succeeding, because the situation is essentially impossible.",
    vi: "\"Không có cửa nào cả\" diễn tả việc hoàn toàn không thể thành công, vì hoàn cảnh gần như bất khả thi.",
    origin: "Hình ảnh này dựa trên một điều hiển nhiên không thể xảy ra: một quả cầu tuyết sẽ tan chảy ngay lập tức trong cái nóng khủng khiếp của địa ngục, nên nó không có bất kỳ cơ hội nào để tồn tại ở đó. Đây là một dạng phóng đại hình ảnh rất phổ biến trong tiếng Anh, dùng những tình huống phi lý về mặt vật lý để nhấn mạnh mức độ \"không thể xảy ra\" tuyệt đối. Cách nói này được ghi nhận trong tiếng Anh Mỹ từ thế kỷ 19.",
    examples: [
      { en: "He doesn't have a snowball's chance in hell of finishing the marathon without any training.", vi: "Anh ta không có cửa nào để hoàn thành cuộc thi marathon nếu không hề luyện tập." },
      { en: "Without a lawyer, she doesn't have a snowball's chance in hell of winning that case.", vi: "Không có luật sư, cô ấy không có chút cơ hội nào để thắng vụ kiện đó." }
    ],
    ex: "He doesn't have a snowball's chance in hell of finishing the marathon without any training.",
  }
  ],
  "trouble-and-difficulty": [
  {
    slug: "be-asking-for-trouble",
    term: "be asking for trouble",
    type: "idiom",
    en: "If you say someone is asking for trouble, you mean that their behavior is so risky or careless that it is very likely to cause problems for them. It is often used as a warning about foreseeable negative consequences.",
    vi: "Nếu ai đó \"đang tự chuốc lấy rắc rối\", nghĩa là hành động của họ quá liều lĩnh hoặc bất cẩn đến mức chắc chắn sẽ gây ra hậu quả xấu cho chính họ.",
    origin: "\"Ask for\" trong tiếng Anh vốn có nghĩa là \"cầu xin, mời gọi điều gì đó đến với mình\". Thành ngữ này hình dung việc cư xử liều lĩnh như thể người đó đang chủ động \"mời gọi\" rắc rối đến với bản thân, dù trong thực tế không ai muốn gặp rắc rối cả. Cách dùng ẩn dụ này phổ biến trong tiếng Anh nói từ đầu thế kỷ 20 và trở thành lời cảnh báo rất thông dụng trong đời sống hằng ngày.",
    examples: [
      { en: "Driving without a seatbelt on the highway is just asking for trouble.", vi: "Lái xe trên cao tốc mà không thắt dây an toàn thì đúng là tự chuốc lấy rắc rối." },
      { en: "Leaving your laptop unlocked in a coffee shop is asking for trouble.", vi: "Để laptop không khóa màn hình ở quán cà phê thì khác nào tự rước họa vào thân." }
    ],
    ex: "Driving without a seatbelt on the highway is just asking for trouble.",
  },
  {
    slug: "bite-off-more-than-you-can-chew",
    term: "bite off more than you can chew",
    type: "idiom",
    en: "If you bite off more than you can chew, you take on a task, responsibility, or commitment that turns out to be too large or difficult for you to handle successfully.",
    vi: "\"Ôm đồm quá sức\" nghĩa là nhận một công việc, trách nhiệm hoặc cam kết vượt quá khả năng thực tế của bản thân, khiến bạn không thể hoàn thành nổi.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh rất đơn giản trong đời thực: cắn một miếng thức ăn lớn hơn khả năng nhai của miệng, dẫn đến khó nuốt hoặc bị nghẹn. Cách diễn đạt này được ghi nhận trong tiếng Anh Mỹ từ cuối thế kỷ 19, ban đầu gắn với thói quen ăn uống thô lỗ, sau đó dần chuyển sang nghĩa bóng chỉ việc nhận quá nhiều việc so với năng lực thực sự.",
    examples: [
      { en: "She agreed to organize three conferences in one month and quickly realized she had bitten off more than she could chew.", vi: "Cô ấy nhận tổ chức ba hội nghị trong một tháng và nhanh chóng nhận ra mình đã ôm đồm quá sức." },
      { en: "Taking on a full-time job while studying for two degrees might mean you've bitten off more than you can chew.", vi: "Vừa đi làm toàn thời gian vừa học hai bằng cùng lúc có thể là bạn đã ôm đồm quá sức mình." }
    ],
    ex: "She agreed to organize three conferences in one month and quickly realized she had bitten off more than she could chew.",
  },
  {
    slug: "a-catch-22",
    term: "a Catch 22",
    type: "idiom",
    en: "A Catch-22 is a frustrating situation in which you cannot achieve one thing until you have achieved another, but you cannot achieve that other thing either until you have achieved the first one, so no solution seems possible.",
    vi: "\"Catch-22\" chỉ một tình huống oái oăm, luẩn quẩn: muốn đạt được điều A thì phải có điều B trước, nhưng muốn có điều B thì lại cần điều A trước, khiến không có lối thoát hợp lý.",
    origin: "Cụm từ này bắt nguồn trực tiếp từ tên cuốn tiểu thuyết trào phúng \"Catch-22\" (1961) của nhà văn Mỹ Joseph Heller. Trong truyện, một phi công muốn được miễn bay vì lý do tâm thần, nhưng theo quy định quân đội gọi là \"catch-22\", việc chủ động xin miễn bay vì sợ nguy hiểm lại chứng tỏ anh ta hoàn toàn tỉnh táo, nên không đủ điều kiện được miễn. Từ đó, cụm từ nhanh chóng đi vào ngôn ngữ đời thường để chỉ mọi nghịch lý luẩn quẩn tương tự.",
    examples: [
      { en: "To get a job you need experience, but to get experience you need a job — it's a real Catch-22.", vi: "Muốn xin việc thì cần kinh nghiệm, nhưng muốn có kinh nghiệm thì phải có việc làm — đúng là một vòng luẩn quẩn không lối thoát." },
      { en: "You can't get a loan without a credit history, and you can't build a credit history without a loan — it's a classic Catch-22.", vi: "Không có lịch sử tín dụng thì không vay được tiền, mà không vay tiền thì không thể tạo lịch sử tín dụng — đúng là một nghịch lý điển hình." }
    ],
    ex: "To get a job you need experience, but to get experience you need a job — it's a real Catch-22.",
  },
  {
    slug: "a-the-fly-in-the-ointment",
    term: "a/the fly in the ointment",
    type: "idiom",
    en: "A fly in the ointment is a small flaw, problem, or drawback that spoils an otherwise good situation, plan, or outcome.",
    vi: "\"Con ruồi trong lọ thuốc mỡ\" ý chỉ một nhược điểm hay trục trặc nhỏ nhưng đủ làm hỏng cả một việc vốn đang tốt đẹp.",
    origin: "Hình ảnh này xuất phát từ một ý tưởng rất thực tế: chỉ cần một con ruồi rơi vào lọ thuốc mỡ (ointment) cũng đủ khiến cả lọ bị coi là bẩn và không dùng được nữa, dù phần còn lại vẫn nguyên vẹn. Cách nói này có liên hệ đến một câu trong Kinh Thánh (sách Truyền Đạo) về việc ruồi chết làm hỏng cả bình dầu thơm, sau đó được rút gọn và phổ biến hóa thành thành ngữ hiện đại chỉ những khiếm khuyết nhỏ làm hỏng cái tổng thể.",
    examples: [
      { en: "The new apartment is perfect, except for one fly in the ointment: the noisy street outside.", vi: "Căn hộ mới rất hoàn hảo, chỉ có một điểm trừ nhỏ là con phố ồn ào bên ngoài." },
      { en: "The deal looked great until the fly in the ointment turned out to be a hidden cancellation fee.", vi: "Thương vụ này trông rất ổn cho đến khi phát hiện điểm trừ là một khoản phí hủy hợp đồng bị giấu kín." }
    ],
    ex: "The new apartment is perfect, except for one fly in the ointment: the noisy street outside.",
  },
  {
    slug: "not-have-a-leg-to-stand-on",
    term: "not have a leg to stand on",
    type: "idiom",
    en: "If you do not have a leg to stand on, your argument, claim, or position has no valid evidence or logical support, so it will certainly fail if challenged.",
    vi: "\"Không có chân mà đứng\" nghĩa là lập luận, yêu cầu hay lý lẽ của bạn hoàn toàn không có bằng chứng hay cơ sở vững chắc để bảo vệ, nên chắc chắn sẽ thất bại nếu bị chất vấn.",
    origin: "Hình ảnh gốc ở đây là một người không có chân thì không thể đứng vững — ngụ ý rằng một lập luận thiếu bằng chứng cũng \"đứng không vững\" giống như vậy. Cách dùng này đặc biệt phổ biến trong ngữ cảnh pháp lý và tranh luận từ thế kỷ 19, khi luật sư dùng để chỉ những vụ kiện không có cơ sở pháp lý để bào chữa, sau đó lan sang cách nói thông thường.",
    examples: [
      { en: "If they can't produce a receipt, they won't have a leg to stand on when they dispute the charge.", vi: "Nếu họ không đưa ra được hóa đơn, họ sẽ chẳng có cơ sở nào để khiếu nại khoản phí đó." },
      { en: "Once the witness confirmed the timeline, the defendant didn't have a leg to stand on.", vi: "Khi nhân chứng xác nhận mốc thời gian, bị cáo hoàn toàn không còn lý lẽ nào để bào chữa." }
    ],
    ex: "If they can't produce a receipt, they won't have a leg to stand on when they dispute the charge.",
  },
  {
    slug: "in-over-your-head",
    term: "in over your head",
    type: "idiom",
    en: "If you are in over your head, you are involved in a situation, task, or responsibility that is far too difficult or complicated for you to manage or control.",
    vi: "\"Ngập đầu\" nghĩa là bạn đang vướng vào một tình huống hay công việc quá khó, quá phức tạp so với khả năng xử lý của mình.",
    origin: "Thành ngữ này gợi hình ảnh một người lội xuống nước sâu đến mức nước ngập qua cả đầu, khiến họ có nguy cơ chết đuối vì không kiểm soát được tình thế. Từ hình ảnh nguy hiểm về thể chất này, cụm từ chuyển sang nghĩa bóng chỉ việc bị quá tải bởi trách nhiệm hay hoàn cảnh vượt quá tầm kiểm soát của bản thân.",
    examples: [
      { en: "When he agreed to manage the whole event alone, he quickly realized he was in over his head.", vi: "Khi anh ấy đồng ý một mình quản lý cả sự kiện, anh nhanh chóng nhận ra mình đã quá sức." },
      { en: "I think we're in over our heads with this budget — we need to ask for help.", vi: "Tôi nghĩ chúng ta đang quá tải với ngân sách này rồi — cần phải nhờ ai đó giúp thôi." }
    ],
    ex: "When he agreed to manage the whole event alone, he quickly realized he was in over his head.",
  },
  {
    slug: "out-of-the-frying-pan-into-the-fire-or-from-the-frying-pan-into-the-fire",
    term: "out of the frying pan into the fire or from the frying pan into the fire",
    type: "idiom",
    en: "If you go out of the frying pan into the fire, you escape one bad or difficult situation only to end up in a worse one.",
    vi: "\"Tránh vỏ dưa gặp vỏ dừa\" nghĩa là thoát khỏi một tình huống khó khăn nhưng lại rơi vào một tình huống còn tồi tệ hơn.",
    origin: "Hình ảnh gốc là thoát khỏi chảo rán nóng (frying pan) nhưng lại nhảy thẳng vào lửa (fire), tức là né được cái nóng nhỏ để rồi gặp phải cái nóng lớn hơn nhiều. Cách nói này đã xuất hiện từ rất lâu với hình ảnh tương tự trong nhiều ngôn ngữ châu Âu, cho thấy đây là một ẩn dụ dân gian cổ xưa về việc chạy trốn cái xấu để gặp cái tệ hơn, khá tương đồng với thành ngữ tiếng Việt \"tránh vỏ dưa gặp vỏ dừa\".",
    examples: [
      { en: "He quit his stressful job only to join a company that went bankrupt a month later — out of the frying pan into the fire.", vi: "Anh ấy nghỉ công việc căng thẳng để rồi vào một công ty phá sản chỉ một tháng sau — đúng là tránh vỏ dưa gặp vỏ dừa." },
      { en: "We switched flights to avoid the delay, but the new one got cancelled — from the frying pan into the fire.", vi: "Chúng tôi đổi chuyến bay để tránh trễ giờ, nhưng chuyến mới lại bị hủy — thật là tránh vỏ dưa gặp vỏ dừa." }
    ],
    ex: "He quit his stressful job only to join a company that went bankrupt a month later — out of the frying pan into the fire.",
  },
  {
    slug: "an-own-goal",
    term: "an own goal",
    type: "idiom",
    en: "If you score an own goal, you do something intended to help or protect yourself or your side that actually damages it instead, often through carelessness or poor judgment.",
    vi: "\"Tự bắn vào chân mình / phản lưới nhà\" chỉ hành động vốn định giúp bản thân hay phe mình lại vô tình gây hại ngược lại, thường do bất cẩn hoặc tính toán sai.",
    origin: "Thành ngữ này bắt nguồn trực tiếp từ bóng đá, khi một cầu thủ vô tình đá bóng vào chính lưới đội nhà (own goal), khiến đội mình bị thua điểm một cách oan uổng. Từ cuối thế kỷ 20, cụm từ này lan rộng ra ngoài sân cỏ để chỉ mọi hành động tự làm hại lợi ích của chính mình trong chính trị, kinh doanh hay đời sống thường ngày.",
    examples: [
      { en: "Cutting funding for staff training turned out to be an own goal for the company's productivity.", vi: "Việc cắt ngân sách đào tạo nhân viên hóa ra lại là một cú phản lưới nhà cho năng suất của công ty." },
      { en: "By insulting the judges, the contestant scored an own goal that cost him the competition.", vi: "Bằng việc xúc phạm ban giám khảo, thí sinh đó đã tự bắn vào chân mình và mất luôn cơ hội trong cuộc thi." }
    ],
    ex: "Cutting funding for staff training turned out to be an own goal for the company's productivity.",
  },
  {
    slug: "put-your-foot-in-it",
    term: "put your foot in it",
    type: "idiom",
    en: "If you put your foot in it, you say or do something careless, tactless, or embarrassing that causes offense or an awkward situation, usually without meaning to.",
    vi: "\"Lỡ lời / vụng về gây hớ\" nghĩa là bạn vô tình nói hoặc làm điều gì đó thiếu tế nhị, gây khó xử hoặc mất lòng người khác dù không cố ý.",
    origin: "Nguồn gốc chính xác không hoàn toàn rõ ràng, nhưng nhiều người cho rằng cụm từ liên quan đến hình ảnh vô tình giẫm chân vào thứ gì đó bẩn hoặc không mong muốn, tương tự cách nói \"giẫm phải mìn\" khi lỡ lời. Cách dùng này đã phổ biến trong tiếng Anh Anh từ thế kỷ 19 để chỉ việc lỡ lời hay hành động gây khó xử một cách vô tình.",
    examples: [
      { en: "I really put my foot in it when I asked about her old job — I didn't know she'd been fired.", vi: "Tôi đã lỡ lời khi hỏi về công việc cũ của cô ấy — tôi không biết là cô ấy đã bị sa thải." },
      { en: "He put his foot in it by joking about the boss's haircut in front of everyone.", vi: "Anh ấy đã hớ hênh khi đùa về kiểu tóc của sếp trước mặt mọi người." }
    ],
    ex: "I really put my foot in it when I asked about her old job — I didn't know she'd been fired.",
  },
  {
    slug: "a-stumbling-block",
    term: "a stumbling block",
    type: "idiom",
    en: "A stumbling block is an obstacle or difficulty that prevents progress toward a goal or agreement.",
    vi: "\"Vật cản / rào cản\" chỉ một trở ngại hay khó khăn khiến quá trình tiến tới mục tiêu hoặc thỏa thuận nào đó bị chặn lại.",
    origin: "Hình ảnh gốc là một khối đá hay vật cản nằm trên đường khiến người đi bị vấp ngã (stumble). Cụm từ này có gốc gác từ Kinh Thánh, xuất hiện trong nhiều bản dịch để chỉ những cám dỗ hay trở ngại về đạo đức khiến người ta \"vấp ngã\" trên con đường đúng đắn, sau đó nghĩa của nó mở rộng sang mọi loại trở ngại trong đời sống, công việc, đàm phán.",
    examples: [
      { en: "The biggest stumbling block in the negotiations was the disagreement over pricing.", vi: "Rào cản lớn nhất trong cuộc đàm phán là bất đồng về giá cả." },
      { en: "Lack of funding remains a major stumbling block for the research project.", vi: "Thiếu kinh phí vẫn là một trở ngại lớn đối với dự án nghiên cứu này." }
    ],
    ex: "The biggest stumbling block in the negotiations was the disagreement over pricing.",
  },
  {
    slug: "teething-problems-or-teething-troubles",
    term: "teething problems or teething troubles",
    type: "idiom",
    en: "Teething problems, or teething troubles, are minor difficulties or setbacks that occur in the early stages of something new, such as a project, product, or system, before it runs smoothly.",
    vi: "\"Trục trặc ban đầu / khó khăn thời kỳ đầu\" chỉ những vấn đề nhỏ thường gặp ở giai đoạn khởi đầu của một việc gì đó mới, trước khi nó đi vào ổn định.",
    origin: "Hình ảnh gốc xuất phát từ việc trẻ sơ sinh mọc răng (teething), thường gây khó chịu, quấy khóc, sốt nhẹ — những khó khăn tạm thời nhưng hoàn toàn bình thường trong quá trình phát triển. Từ đó, thành ngữ được dùng ẩn dụ để chỉ những trục trặc nhỏ, không đáng lo ngại, thường xảy ra khi một hệ thống, sản phẩm hay dự án mới bắt đầu vận hành.",
    examples: [
      { en: "The new software had a few teething problems, but the bugs were fixed within a week.", vi: "Phần mềm mới gặp vài trục trặc ban đầu, nhưng các lỗi đã được khắc phục trong vòng một tuần." },
      { en: "Every new business faces teething troubles before it finds its footing.", vi: "Doanh nghiệp nào mới thành lập cũng gặp phải những khó khăn ban đầu trước khi đi vào ổn định." }
    ],
    ex: "The new software had a few teething problems, but the bugs were fixed within a week.",
  },
  {
    slug: "a-vicious-circle",
    term: "a vicious circle",
    type: "idiom",
    en: "A vicious circle is a repeating chain of events in which one problem causes another problem, which in turn makes the first problem worse, so the situation keeps getting harder to escape.",
    vi: "\"Vòng luẩn quẩn\" chỉ một chuỗi sự việc lặp lại, trong đó vấn đề này gây ra vấn đề khác, rồi vấn đề đó lại làm vấn đề ban đầu tệ hơn, khiến tình huống ngày càng khó thoát ra.",
    origin: "Cụm từ \"vicious circle\" (hay \"vicious cycle\") xuất phát từ logic học thời Trung Cổ, ban đầu chỉ một dạng lập luận vòng tròn thiếu logic, nơi kết luận lại được dùng làm chính tiền đề của nó. Về sau, nghĩa của nó mở rộng sang đời sống thực tế để mô tả các chuỗi nhân quả tiêu cực cứ lặp đi lặp lại và tự làm trầm trọng thêm chính nó, ví dụ như nghèo đói dẫn đến thiếu giáo dục, rồi thiếu giáo dục lại dẫn đến nghèo đói.",
    examples: [
      { en: "Not sleeping enough makes you more stressed, and being stressed makes it harder to sleep — it's a vicious circle.", vi: "Ngủ không đủ khiến bạn căng thẳng hơn, mà căng thẳng lại khiến bạn khó ngủ hơn — đúng là một vòng luẩn quẩn." },
      { en: "Low wages lead to low morale, which lowers productivity, which then justifies even lower wages — a vicious circle few companies escape.", vi: "Lương thấp dẫn đến tinh thần làm việc kém, làm giảm năng suất, rồi năng suất thấp lại trở thành lý do để trả lương thấp hơn nữa — một vòng luẩn quẩn mà ít công ty thoát ra được." }
    ],
    ex: "Not sleeping enough makes you more stressed, and being stressed makes it harder to sleep — it's a vicious circle.",
  }
  ],
  "safety-and-risk": [
  {
    slug: "by-the-skin-of-your-teeth",
    term: "by the skin of your teeth",
    type: "idiom",
    en: "If you do something by the skin of your teeth, you barely manage to succeed or escape, with almost no margin to spare.",
    vi: "Nếu bạn làm được điều gì đó \"by the skin of your teeth\", nghĩa là bạn vừa mới kịp thành công hoặc thoát nạn trong gang tấc, không còn chút dư địa nào cả.",
    origin: "Cụm này bắt nguồn từ Kinh Thánh, trong sách Job (Job 19:20), khi Job than thở rằng ông chỉ còn thoát được \"bằng lớp da của răng mình\". Vì răng vốn không có da, hình ảnh này là một cách nói khoa trương để diễn tả một khoảng cách nhỏ đến mức gần như không tồn tại. Qua nhiều thế kỷ, cụm từ này dần được dùng rộng rãi trong tiếng Anh để chỉ việc vừa đủ, suýt soát thành công hay thoát hiểm.",
    examples: [
      { en: "She passed the final exam by the skin of her teeth, scoring just one point above the pass mark.", vi: "Cô ấy vượt qua kỳ thi cuối kỳ trong gang tấc, chỉ đạt điểm cao hơn mức đậu đúng một điểm." },
      { en: "We caught the last train by the skin of our teeth, jumping through the doors as they closed.", vi: "Chúng tôi bắt kịp chuyến tàu cuối cùng trong đường tơ kẽ tóc, nhảy vào trong ngay khi cửa vừa đóng." }
    ],
    ex: "She passed the final exam by the skin of her teeth, scoring just one point above the pass mark.",
  },
  {
    slug: "a-close-shave",
    term: "a close shave",
    type: "idiom",
    en: "A close shave is a situation in which you narrowly avoid danger, injury, or disaster.",
    vi: "\"A close shave\" là một tình huống mà bạn vừa may mắn thoát khỏi nguy hiểm, tai nạn hay thảm họa trong tích tắc.",
    origin: "Nguồn gốc chính xác không hoàn toàn rõ ràng, nhưng cách giải thích phổ biến nhất liên quan đến việc cạo râu bằng dao cạo thẳng thời xưa: nếu lưỡi dao đi quá sát da, chỉ cần lệch một chút là có thể bị đứt tay hoặc bị thương. Từ hình ảnh \"cạo sát\" đầy rủi ro đó, người ta mở rộng nghĩa để chỉ bất kỳ tình huống nào mà nguy hiểm chỉ cách mình trong gang tấc nhưng cuối cùng vẫn tránh được.",
    examples: [
      { en: "The car swerved off the road at the last second — that was a close shave for everyone inside.", vi: "Chiếc xe đánh lái tránh khỏi đường vào giây phút cuối cùng — đó thực sự là một phen thoát hiểm ngoạn mục cho mọi người trên xe." },
      { en: "The company almost went bankrupt last year; it was a close shave, but they recovered.", vi: "Công ty suýt phá sản vào năm ngoái; đó là một phen hú vía, nhưng rồi họ cũng phục hồi được." }
    ],
    ex: "The car swerved off the road at the last second — that was a close shave for everyone inside.",
  },
  {
    slug: "the-coast-is-clear",
    term: "the coast is clear",
    type: "idiom",
    en: "If the coast is clear, there is no one around to see or stop you, so it is safe to do something.",
    vi: "Khi \"the coast is clear\", tức là xung quanh không có ai để ý hay ngăn cản, nên bạn có thể yên tâm làm việc gì đó.",
    origin: "Cụm từ này được cho là bắt nguồn từ thế kỷ 16, gắn với hình ảnh những kẻ buôn lậu hoặc cướp biển quan sát bờ biển trước khi cập bến: nếu không thấy lính gác hay tuần tra nào trên bờ, tức là \"bờ biển đã quang\", an toàn để đưa hàng lậu hoặc người vào đất liền. Từ nghĩa đen liên quan đến biển cả và an ninh, cụm từ dần được dùng theo nghĩa bóng để chỉ bất kỳ tình huống nào không còn nguy cơ bị phát hiện hay cản trở.",
    examples: [
      { en: "Wait until the coast is clear before you sneak the puppy into the dormitory.", vi: "Hãy đợi cho đến khi không còn ai để ý rồi hẵng lén mang chú chó con vào ký túc xá." },
      { en: "Once the manager left the office, the interns knew the coast was clear to take a longer break.", vi: "Khi người quản lý rời khỏi văn phòng, các thực tập sinh biết rằng giờ đã an toàn để nghỉ giải lao lâu hơn một chút." }
    ],
    ex: "Wait until the coast is clear before you sneak the puppy into the dormitory.",
  },
  {
    slug: "a-good-bet-or-a-safe-bet",
    term: "a good bet or a safe bet",
    type: "idiom",
    en: "If something is a good bet or a safe bet, it is very likely to succeed, be true, or be the wisest choice among the options available.",
    vi: "Nếu điều gì đó là \"a good bet\" hoặc \"a safe bet\", nghĩa là nó rất có khả năng thành công, đúng, hoặc là lựa chọn khôn ngoan nhất trong số các phương án.",
    origin: "Cụm từ này xuất phát trực tiếp từ ngôn ngữ cá cược và đánh bạc, nơi một \"bet\" (cược) được coi là \"good\" hay \"safe\" khi khả năng thắng cao và rủi ro mất tiền thấp. Theo thời gian, người bản ngữ mở rộng cách dùng này ra khỏi sòng bạc để nói về bất kỳ quyết định, dự đoán hay lựa chọn nào có khả năng mang lại kết quả tốt, an toàn.",
    examples: [
      { en: "If you're looking for a reliable laptop, that brand is usually a safe bet.", vi: "Nếu bạn đang tìm một chiếc laptop đáng tin cậy, thương hiệu đó thường là một lựa chọn an toàn." },
      { en: "Booking your flight early is a good bet if you want to avoid high prices later.", vi: "Đặt vé máy bay sớm là một lựa chọn khôn ngoan nếu bạn muốn tránh giá vé tăng cao về sau." }
    ],
    ex: "If you're looking for a reliable laptop, that brand is usually a safe bet.",
  },
  {
    slug: "in-safe-hands",
    term: "in safe hands",
    type: "idiom",
    en: "If someone or something is in safe hands, they are being looked after or managed by a person who is capable and trustworthy, so there is little risk of harm.",
    vi: "Nếu ai đó hoặc việc gì đó \"in safe hands\", nghĩa là đang được một người đáng tin cậy và có năng lực chăm sóc hay quản lý, nên ít có nguy cơ xảy ra chuyện xấu.",
    origin: "Cụm từ này xuất phát từ hình ảnh rất trực quan: đặt một vật quý giá hay dễ vỡ vào đôi bàn tay chắc chắn, an toàn thay vì để nó rơi hay bị hư hại. Từ nghĩa đen về đôi tay vững vàng, người Anh mở rộng cách dùng này sang các tình huống trừu tượng hơn như giao phó công việc, tài sản, hay thậm chí là tính mạng cho một người có chuyên môn và uy tín.",
    examples: [
      { en: "Don't worry about the children this weekend — they're in safe hands with their grandparents.", vi: "Đừng lo về bọn trẻ cuối tuần này — chúng đang được ông bà chăm sóc rất chu đáo mà." },
      { en: "After the surgery, the patient was in safe hands with one of the best doctors in the hospital.", vi: "Sau ca phẫu thuật, bệnh nhân được chăm sóc bởi một trong những bác sĩ giỏi nhất bệnh viện nên rất yên tâm." }
    ],
    ex: "Don't worry about the children this weekend — they're in safe hands with their grandparents.",
  },
  {
    slug: "play-it-safe",
    term: "play it safe",
    type: "idiom",
    en: "If you play it safe, you deliberately choose the more cautious option and avoid taking any unnecessary risks.",
    vi: "Nếu bạn \"play it safe\", nghĩa là bạn cố tình chọn cách làm thận trọng hơn và tránh mọi rủi ro không cần thiết.",
    origin: "Cụm từ này gắn liền với ngôn ngữ của các trò chơi và cờ bạc, nơi người chơi có thể chọn giữa một nước đi mạo hiểm mang lại phần thưởng lớn hoặc một nước đi thận trọng, ít rủi ro hơn. Từ đó, \"play it safe\" được dùng rộng rãi trong đời sống để chỉ việc lựa chọn phương án an toàn thay vì liều lĩnh, dù có thể bỏ lỡ cơ hội lớn hơn.",
    examples: [
      { en: "Instead of investing all his savings in one stock, he decided to play it safe and spread the money around.", vi: "Thay vì dồn hết tiền tiết kiệm vào một cổ phiếu, anh ấy quyết định chơi an toàn và chia tiền ra nhiều nơi khác nhau." },
      { en: "The coach told the young players to play it safe in the final minutes and just hold on to their lead.", vi: "Huấn luyện viên bảo các cầu thủ trẻ chơi thận trọng trong những phút cuối và cứ thế giữ vững lợi thế đang có." }
    ],
    ex: "Instead of investing all his savings in one stock, he decided to play it safe and spread the money around.",
  },
  {
    slug: "be-playing-with-fire",
    term: "be playing with fire",
    type: "idiom",
    en: "If you are playing with fire, you are doing something risky or reckless that could easily lead to serious trouble or harm.",
    vi: "Nếu bạn đang \"playing with fire\", nghĩa là bạn đang làm một việc liều lĩnh, nguy hiểm và rất dễ dẫn đến rắc rối hay hậu quả nghiêm trọng.",
    origin: "Cụm từ này xuất phát trực tiếp từ nghĩa đen: trẻ con thường được cảnh báo không được nghịch lửa vì rất dễ bị bỏng hoặc gây cháy. Hình ảnh nguy hiểm rõ ràng và dễ hình dung này được mở rộng sang nghĩa bóng để chỉ bất kỳ hành vi liều lĩnh nào, dù không liên quan đến lửa thật, nhưng vẫn tiềm ẩn nguy cơ gây hại lớn.",
    examples: [
      { en: "Lending money to your boss without a written agreement is playing with fire.", vi: "Cho sếp vay tiền mà không có giấy tờ thỏa thuận rõ ràng chẳng khác nào chơi dao hai lưỡi." },
      { en: "He knew he was playing with fire by ignoring the safety regulations at the construction site.", vi: "Anh ấy biết rõ mình đang liều lĩnh khi phớt lờ các quy định an toàn tại công trường xây dựng." }
    ],
    ex: "Lending money to your boss without a written agreement is playing with fire.",
  },
  {
    slug: "put-all-your-eggs-in-one-basket",
    term: "put all your eggs in one basket",
    type: "idiom",
    en: "If you put all your eggs in one basket, you risk everything on a single plan, option, or venture instead of spreading the risk across several.",
    vi: "Nếu bạn \"put all your eggs in one basket\", nghĩa là bạn dồn hết mọi thứ vào một kế hoạch, lựa chọn duy nhất thay vì phân tán rủi ro ra nhiều hướng khác nhau.",
    origin: "Đây là một câu tục ngữ lâu đời, xuất phát từ hình ảnh rất thực tế: nếu bạn để tất cả trứng vào một chiếc giỏ và chẳng may làm rơi giỏ, bạn sẽ mất toàn bộ số trứng; còn nếu chia trứng ra nhiều giỏ khác nhau, một tai nạn nhỏ sẽ không khiến bạn mất trắng. Câu nói này xuất hiện trong nhiều ngôn ngữ và văn hóa từ rất lâu, thường được dùng như một lời khuyên về quản lý rủi ro, đặc biệt trong đầu tư và tài chính.",
    examples: [
      { en: "Financial advisors usually warn against putting all your eggs in one basket by investing in a single company.", vi: "Các chuyên gia tài chính thường khuyên không nên dồn hết vốn vào một công ty duy nhất." },
      { en: "She applied to only one university, which felt like putting all her eggs in one basket.", vi: "Cô ấy chỉ nộp hồ sơ vào đúng một trường đại học, giống như đặt cược tất cả vào một canh bạc duy nhất." }
    ],
    ex: "Financial advisors usually warn against putting all your eggs in one basket by investing in a single company.",
  },
  {
    slug: "be-skating-on-thin-ice",
    term: "be skating on thin ice",
    type: "idiom",
    en: "If you are skating on thin ice, you are in a risky or precarious situation where one small mistake could lead to serious trouble.",
    vi: "Nếu bạn đang \"skating on thin ice\", nghĩa là bạn đang ở trong một tình huống mong manh, nguy hiểm mà chỉ cần một sai lầm nhỏ cũng có thể dẫn đến hậu quả nghiêm trọng.",
    origin: "Cụm từ này xuất phát từ hình ảnh trượt băng trên một lớp băng chưa đủ dày và chắc chắn: lớp băng mỏng có thể vỡ bất cứ lúc nào, khiến người trượt rơi xuống dòng nước lạnh bên dưới. Từ nguy hiểm vật lý rất cụ thể này, cụm từ được mở rộng sang nghĩa bóng để chỉ những tình huống xã hội hay công việc mong manh, nơi một sai sót nhỏ cũng có thể gây ra hậu quả lớn.",
    examples: [
      { en: "After missing three deadlines in a row, he knew he was skating on thin ice with his manager.", vi: "Sau khi trễ hạn ba lần liên tiếp, anh ấy biết mình đang đứng trên ranh giới mong manh với sếp." },
      { en: "The team is skating on thin ice financially and cannot afford another poor season.", vi: "Đội bóng đang trong tình trạng tài chính rất bấp bênh và không thể chịu đựng thêm một mùa giải tệ hại nữa." }
    ],
    ex: "After missing three deadlines in a row, he knew he was skating on thin ice with his manager.",
  },
  {
    slug: "stick-your-neck-out",
    term: "stick your neck out",
    type: "idiom",
    en: "If you stick your neck out, you take a risk by expressing an opinion, taking action, or supporting someone, even though it might expose you to criticism, failure, or danger.",
    vi: "Nếu bạn \"stick your neck out\", nghĩa là bạn chấp nhận rủi ro khi bày tỏ quan điểm, hành động hay ủng hộ ai đó, dù điều này có thể khiến bạn bị chỉ trích, thất bại hoặc gặp nguy hiểm.",
    origin: "Nguồn gốc chính xác của cụm từ này không hoàn toàn chắc chắn, nhưng cách giải thích được nhiều người chấp nhận nhất liên quan đến hình ảnh một con vật (như rùa hay gà) thò cổ ra khỏi lớp mai hay chuồng bảo vệ để quan sát hoặc ăn uống, và vì vậy trở nên dễ bị tấn công hơn. Một số nguồn khác liên hệ với hình ảnh máy chém thời xưa, khi phạm nhân phải đưa cổ ra để chịu hình phạt. Dù nguồn gốc cụ thể chưa rõ ràng, hình ảnh chung đều xoay quanh việc tự đặt mình vào thế dễ bị tổn thương.",
    examples: [
      { en: "None of the other managers wanted to stick their necks out and question the new policy.", vi: "Không ai trong số các quản lý khác dám mạo hiểm lên tiếng phản đối chính sách mới." },
      { en: "She stuck her neck out for her colleague, defending him in front of the whole board.", vi: "Cô ấy đã liều mình bảo vệ đồng nghiệp trước toàn thể ban lãnh đạo." }
    ],
    ex: "None of the other managers wanted to stick their necks out and question the new policy.",
  },
  {
    slug: "take-your-life-in-your-hands-or-take-your-life-into-your-hands",
    term: "take your life in your hands or take your life into your hands",
    type: "idiom",
    en: "If you take your life in your hands, you deliberately do something extremely dangerous that could get you seriously hurt or killed.",
    vi: "Nếu bạn \"take your life in your hands\", nghĩa là bạn cố tình làm một việc cực kỳ nguy hiểm, có thể khiến bạn bị thương nặng hoặc thậm chí mất mạng.",
    origin: "Cụm từ này đã xuất hiện trong tiếng Anh từ rất lâu, với hình ảnh mang tính ẩn dụ mạnh mẽ: coi mạng sống của mình như một vật có thể cầm nắm và đặt vào tình thế rủi ro, thay vì để nó được bảo vệ an toàn. Cách diễn đạt tương tự cũng từng xuất hiện trong các bản dịch Kinh Thánh cổ, nói về việc liều mạng vì một mục đích nào đó, và từ đó dần trở thành cách nói quen thuộc trong tiếng Anh hiện đại để chỉ những hành động cực kỳ mạo hiểm.",
    examples: [
      { en: "Crossing that busy highway on foot, you're really taking your life in your hands.", vi: "Băng qua đường cao tốc đông đúc đó bằng chân, bạn thực sự đang liều cả tính mạng đấy." },
      { en: "Climbing that cliff without any safety equipment means taking your life into your hands.", vi: "Leo lên vách đá đó mà không có bất kỳ thiết bị bảo hộ nào đồng nghĩa với việc đánh cược cả mạng sống." }
    ],
    ex: "Crossing that busy highway on foot, you're really taking your life in your hands.",
  },
  {
    slug: "to-be-on-the-safe-side",
    term: "to be on the safe side",
    type: "idiom",
    en: "If you do something to be on the safe side, you take an extra precaution in order to avoid a risk or an unwanted outcome, even if it might not be strictly necessary.",
    vi: "Nếu bạn làm điều gì đó \"to be on the safe side\", nghĩa là bạn thực hiện thêm một biện pháp phòng ngừa để tránh rủi ro hay kết quả không mong muốn, dù việc đó có thể không thực sự bắt buộc.",
    origin: "Đây là một cách diễn đạt khá trực tiếp và dễ hiểu trong tiếng Anh, hình thành từ việc đối lập giữa \"phía an toàn\" và \"phía rủi ro\" của một quyết định. Không giống nhiều thành ngữ khác trong danh sách này, cụm từ này không gắn với một câu chuyện lịch sử hay hình ảnh cụ thể nào, mà đơn giản là cách nói tự nhiên đã trở nên quen thuộc để chỉ việc chọn phương án thận trọng hơn.",
    examples: [
      { en: "We arrived an hour early to be on the safe side, in case there was traffic.", vi: "Chúng tôi đến sớm cả tiếng đồng hồ cho chắc ăn, phòng khi đường xá bị kẹt xe." },
      { en: "To be on the safe side, you should back up your files before updating the software.", vi: "Để chắc chắn an toàn, bạn nên sao lưu các tệp của mình trước khi cập nhật phần mềm." }
    ],
    ex: "We arrived an hour early to be on the safe side, in case there was traffic.",
  }
  ],
  "money": [
  {
    slug: "cost-an-arm-and-a-leg",
    term: "cost an arm and a leg",
    type: "idiom",
    en: "If something costs an arm and a leg, it is extremely expensive, far more than you would normally expect to pay.",
    vi: "Nếu thứ gì đó \"cost an arm and a leg\", nghĩa là nó cực kỳ đắt đỏ, đắt hơn nhiều so với mức bạn thường chấp nhận trả.",
    origin: "Nguồn gốc chính xác của thành ngữ này không rõ ràng. Có giả thuyết dân gian cho rằng nó bắt nguồn từ việc các họa sĩ vẽ chân dung thời xưa tính phí cao hơn nếu bức tranh vẽ đầy đủ cả hai tay và chân, nhưng giả thuyết này chưa được kiểm chứng và nhiều nhà nghiên cứu ngôn ngữ cho là không đáng tin. Thực tế, cách nói này chỉ được ghi nhận phổ biến trong tiếng Anh Mỹ từ khoảng giữa thế kỷ 20. Hình ảnh \"mất cả tay lẫn chân\" gợi lên một cái giá phải trả lớn đến mức đau đớn, tương tự cách người Việt nói \"đắt cắt cổ\".",
    examples: [
      { en: "That new laptop looks great, but it costs an arm and a leg.", vi: "Chiếc laptop mới đó trông rất đẹp, nhưng nó đắt cắt cổ." },
      { en: "Flying business class costs an arm and a leg, so we always book economy.", vi: "Bay hạng thương gia đắt kinh khủng, nên chúng tôi luôn đặt vé hạng phổ thông." }
    ],
    ex: "That new laptop looks great, but it costs an arm and a leg.",
  },
  {
    slug: "down-the-drain",
    term: "down the drain",
    type: "idiom",
    en: "If money, time, or effort goes down the drain, it is completely wasted and produces no benefit at all.",
    vi: "Nếu tiền bạc, thời gian hay công sức \"đi xuống cống\", nghĩa là nó bị lãng phí hoàn toàn, không mang lại kết quả gì.",
    origin: "Thành ngữ này xuất phát từ hình ảnh rất trực quan: nước hay chất lỏng chảy xuống ống cống thì không thể lấy lại được nữa. Từ hình ảnh vật lý đó, người nói tiếng Anh mở rộng nghĩa sang tiền bạc hoặc công sức bị mất trắng, không thể thu hồi, giống như nước đã trôi xuống cống. Cách dùng ẩn dụ này xuất hiện phổ biến từ đầu thế kỷ 20 trong tiếng Anh nói.",
    examples: [
      { en: "The company invested millions in the project, but when it failed, all that money went down the drain.", vi: "Công ty đã đầu tư hàng triệu đô vào dự án, nhưng khi nó thất bại, toàn bộ số tiền đó coi như đổ xuống sông xuống biển." },
      { en: "If we cancel the trip now, the deposit we paid will just go down the drain.", vi: "Nếu bây giờ hủy chuyến đi, tiền đặt cọc chúng ta đã trả coi như mất trắng." }
    ],
    ex: "The company invested millions in the project, but when it failed, all that money went down the drain.",
  },
  {
    slug: "feel-the-pinch",
    term: "feel the pinch",
    type: "idiom",
    en: "If a person or a business feels the pinch, they start to experience financial difficulty, often because of rising costs or falling income.",
    vi: "Nếu một người hoặc một doanh nghiệp \"feel the pinch\", nghĩa là họ bắt đầu gặp khó khăn về tài chính, thường do chi phí tăng hoặc thu nhập giảm.",
    origin: "Từ \"pinch\" nghĩa gốc là cảm giác bị bóp chặt hoặc kẹp đau, chẳng hạn như khi một đôi giày quá chật làm chân bị đau. Từ cảm giác khó chịu do bị chèn ép về thể chất đó, người Anh mở rộng nghĩa sang cảm giác bị chèn ép về tài chính khi tiền bạc trở nên eo hẹp. Cách dùng này đã xuất hiện trong tiếng Anh từ nhiều thế kỷ trước và vẫn còn rất phổ biến ngày nay.",
    examples: [
      { en: "With fuel prices rising every month, many families are really feeling the pinch.", vi: "Với giá nhiên liệu tăng từng tháng, nhiều gia đình đang thực sự cảm thấy khó khăn về tài chính." },
      { en: "Small restaurants have been feeling the pinch since rents went up downtown.", vi: "Các nhà hàng nhỏ đã gặp khó khăn tài chính kể từ khi giá thuê mặt bằng ở trung tâm tăng lên." }
    ],
    ex: "With fuel prices rising every month, many families are really feeling the pinch.",
  },
  {
    slug: "have-deep-pockets",
    term: "have deep pockets",
    type: "idiom",
    en: "If a person or organization has deep pockets, they have a large amount of money available and can afford to spend heavily.",
    vi: "Nếu một người hay tổ chức \"có túi tiền sâu\", nghĩa là họ có rất nhiều tiền và đủ khả năng chi tiêu lớn.",
    origin: "Hình ảnh \"túi áo sâu\" gợi ý rằng túi càng sâu thì càng chứa được nhiều tiền mà không bị rơi ra ngoài, từ đó ẩn dụ cho nguồn lực tài chính dồi dào. Cách nói này thường xuất hiện trong ngữ cảnh kinh doanh và pháp lý, chẳng hạn khi nói về một công ty lớn có \"deep pockets\" đủ sức theo đuổi một vụ kiện tụng kéo dài hoặc đầu tư mạo hiểm mà không sợ cạn tiền.",
    examples: [
      { en: "Only a company with deep pockets could afford to keep funding research for ten years without profit.", vi: "Chỉ có một công ty có túi tiền rủng rỉnh mới đủ sức tiếp tục tài trợ nghiên cứu suốt mười năm mà không sinh lời." },
      { en: "The startup was eventually bought by an investor with deep pockets.", vi: "Công ty khởi nghiệp này cuối cùng được mua lại bởi một nhà đầu tư giàu có." }
    ],
    ex: "Only a company with deep pockets could afford to keep funding research for ten years without profit.",
  },
  {
    slug: "in-the-red",
    term: "in the red",
    type: "idiom",
    en: "If a person, account, or business is in the red, they owe more money than they have, or their finances are operating at a loss.",
    vi: "Nếu một người, tài khoản hay doanh nghiệp \"in the red\", nghĩa là họ đang nợ nần hoặc đang thua lỗ về tài chính.",
    origin: "Thành ngữ này bắt nguồn từ tập quán kế toán truyền thống: kế toán viên thường dùng mực đỏ để ghi các khoản lỗ hoặc số dư âm trong sổ sách, còn mực đen dùng để ghi lợi nhuận hay số dư dương (từ đó có cụm đối lập \"in the black\" nghĩa là có lãi). Cách dùng này trở nên phổ biến từ đầu thế kỷ 20 cùng với sự phát triển của kế toán hiện đại và vẫn được dùng rộng rãi cho đến ngày nay, kể cả khi sổ sách không còn viết tay bằng mực nữa.",
    examples: [
      { en: "The company has been in the red for three consecutive quarters.", vi: "Công ty đã thua lỗ suốt ba quý liên tiếp." },
      { en: "My checking account went into the red after I forgot to pay the rent on time.", vi: "Tài khoản thanh toán của tôi bị âm sau khi tôi quên trả tiền thuê nhà đúng hạn." }
    ],
    ex: "The company has been in the red for three consecutive quarters.",
  },
  {
    slug: "make-ends-meet",
    term: "make ends meet",
    type: "idiom",
    en: "If you make ends meet, you manage to earn just enough money to cover your basic living expenses, with little or nothing left over.",
    vi: "Nếu bạn \"make ends meet\", nghĩa là bạn kiếm đủ tiền để trang trải các chi phí sinh hoạt cơ bản, gần như không dư ra bao nhiêu.",
    origin: "Cụm từ đầy đủ ban đầu là \"make both ends meet\", được cho là gợi hình ảnh cân đối một cuốn sổ chi tiêu sao cho khoản đầu năm và khoản cuối năm khớp nhau, không bị thiếu hụt. Một số nhà nghiên cứu cũng liên hệ nó với việc may vá, khi hai đầu của một tấm vải hoặc sợi dây phải được nối khít với nhau. Thành ngữ này đã xuất hiện trong tiếng Anh từ thế kỷ 17 và mang nghĩa xoay xở đủ sống trong giới hạn thu nhập của mình.",
    examples: [
      { en: "After losing his second job, he struggled to make ends meet.", vi: "Sau khi mất công việc làm thêm, anh ấy phải chật vật mới đủ trang trải cuộc sống." },
      { en: "Many students take part-time jobs just to make ends meet during college.", vi: "Nhiều sinh viên làm thêm bán thời gian chỉ để đủ trang trải cuộc sống trong thời gian học đại học." }
    ],
    ex: "After losing his second job, he struggled to make ends meet.",
  },
  {
    slug: "on-a-shoestring",
    term: "on a shoestring",
    type: "idiom",
    en: "If you do something on a shoestring, you do it with a very small amount of money, using a very tight or limited budget.",
    vi: "Nếu bạn làm gì đó \"on a shoestring\", nghĩa là bạn làm việc đó với rất ít tiền, trong một ngân sách vô cùng hạn hẹp.",
    origin: "\"Shoestring\" nghĩa đen là sợi dây giày, một vật rất mỏng và có giá trị gần như không đáng kể. Từ hình ảnh sợi dây giày mảnh mai và rẻ tiền đó, tiếng Anh Mỹ thế kỷ 19 đã phát triển thành ẩn dụ cho một khoản ngân sách cực kỳ nhỏ bé, chỉ vừa đủ để tồn tại, tương tự cách nói \"làm ăn với vốn liếng còm cõi\" trong tiếng Việt.",
    examples: [
      { en: "They started the business on a shoestring, working from their garage with almost no capital.", vi: "Họ khởi nghiệp với số vốn ít ỏi, làm việc ngay trong nhà để xe mà gần như không có tiền vốn." },
      { en: "We traveled around Europe on a shoestring, staying in hostels and cooking our own meals.", vi: "Chúng tôi đi du lịch khắp châu Âu với ngân sách eo hẹp, ở nhà nghỉ bình dân và tự nấu ăn." }
    ],
    ex: "They started the business on a shoestring, working from their garage with almost no capital.",
  },
  {
    slug: "out-of-pocket",
    term: "out of pocket",
    type: "idiom",
    en: "If you pay for something out of pocket, you pay with your own money rather than having it covered by insurance, an employer, or someone else.",
    vi: "Nếu bạn trả tiền \"out of pocket\", nghĩa là bạn tự bỏ tiền túi của mình ra trả, thay vì được bảo hiểm, công ty hay ai khác chi trả.",
    origin: "Cụm từ này bắt nguồn từ hình ảnh rất đơn giản và trực tiếp: tiền được lấy ra từ chính túi áo hay túi quần của một người, chứ không phải từ một nguồn quỹ hay tổ chức nào khác. Cách dùng này đã tồn tại trong tiếng Anh từ nhiều thế kỷ trước, ban đầu chỉ đơn thuần mô tả hành động chi tiền cá nhân, sau này được dùng phổ biến trong ngữ cảnh bảo hiểm y tế và công việc để phân biệt khoản chi cá nhân với khoản được hoàn trả.",
    examples: [
      { en: "The insurance didn't cover the whole surgery, so we had to pay several thousand dollars out of pocket.", vi: "Bảo hiểm không chi trả toàn bộ ca phẫu thuật, nên chúng tôi phải tự bỏ ra vài nghìn đô la." },
      { en: "Employees can be reimbursed later, but they need to pay for the tickets out of pocket first.", vi: "Nhân viên có thể được hoàn tiền sau, nhưng trước tiên họ phải tự bỏ tiền túi ra mua vé." }
    ],
    ex: "The insurance didn't cover the whole surgery, so we had to pay several thousand dollars out of pocket.",
  },
  {
    slug: "be-rolling-in-it-or-be-rolling-in-money",
    term: "be rolling in it or be rolling in money",
    type: "idiom",
    en: "If someone is rolling in it, or rolling in money, they have an enormous amount of money and are extremely wealthy.",
    vi: "Nếu ai đó \"rolling in it\" hay \"rolling in money\", nghĩa là họ có rất rất nhiều tiền, giàu có đến mức dư dả.",
    origin: "Thành ngữ này gợi lên hình ảnh phóng đại, hài hước về một người giàu có đến mức có thể \"lăn qua lăn lại\" trên những đống tiền của mình, như thể tiền bạc nhiều đến mức trở thành một thứ để nằm hay lăn lên trên. Cách nói thân mật, mang tính khẩu ngữ này phổ biến trong tiếng Anh Anh và tiếng Anh Mỹ từ giữa thế kỷ 20 và thường được dùng để nói đùa hoặc ghen tị nhẹ nhàng về sự giàu có của người khác.",
    examples: [
      { en: "Ever since his startup was sold, he's been rolling in money.", vi: "Kể từ khi công ty khởi nghiệp của anh ấy được bán, anh ấy đã giàu sụ." },
      { en: "You don't need to worry about the bill, do you? I heard your family is rolling in it.", vi: "Cậu không cần lo về hóa đơn đâu nhỉ? Tôi nghe nói gia đình cậu giàu lắm mà." }
    ],
    ex: "Ever since his startup was sold, he's been rolling in money.",
  },
  {
    slug: "a-small-fortune",
    term: "a small fortune",
    type: "idiom",
    en: "If something costs a small fortune, it costs a very large amount of money, even though the word \"small\" is used ironically.",
    vi: "Nếu thứ gì đó có giá \"a small fortune\", nghĩa là nó có giá rất cao, dù từ \"nhỏ\" ở đây thực chất mang tính mỉa mai, hàm ý ngược lại.",
    origin: "Từ \"fortune\" trong tiếng Anh vốn đã mang nghĩa một khối tài sản lớn, nên khi ghép với tính từ \"small\" (nhỏ), cụm từ tạo ra một cách nói giảm nhẹ mang tính châm biếm (understatement) để nhấn mạnh rằng số tiền thực ra rất lớn. Lối chơi chữ kiểu này đã xuất hiện trong tiếng Anh từ ít nhất thế kỷ 19 và là một ví dụ điển hình của cách người Anh thích dùng lối nói giảm nhẹ để diễn đạt điều ngược lại.",
    examples: [
      { en: "Renovating that old house cost him a small fortune.", vi: "Việc cải tạo ngôi nhà cũ đó tốn của anh ấy một khoản tiền không nhỏ." },
      { en: "She spent a small fortune on her wedding dress.", vi: "Cô ấy đã chi một số tiền lớn cho chiếc váy cưới của mình." }
    ],
    ex: "Renovating that old house cost him a small fortune.",
  },
  {
    slug: "there-s-no-such-thing-as-a-free-lunch-or-there-is-no-free-lunch",
    term: "there's no such thing as a free lunch or there is no free lunch",
    type: "idiom",
    en: "This idiom means that nothing is ever truly free; anything that seems to be given for nothing actually has a hidden cost or expectation attached to it.",
    vi: "Thành ngữ này có nghĩa là chẳng có gì thực sự miễn phí cả; bất cứ điều gì có vẻ được cho không đều thực chất tiềm ẩn một cái giá hoặc điều kiện đi kèm.",
    origin: "Thành ngữ này được cho là bắt nguồn từ tập quán của các quán rượu Mỹ vào thế kỷ 19, khi nhiều nơi mời khách \"bữa trưa miễn phí\" (free lunch) để thu hút khách mua đồ uống, nhưng thực chất chi phí thức ăn đã được tính gộp vào giá đồ uống, nên bữa ăn không thực sự miễn phí. Sang thế kỷ 20, cụm từ này được các nhà kinh tế học, đặc biệt là Milton Friedman, phổ biến hóa qua câu nói nổi tiếng \"There's no such thing as a free lunch\" (thường viết tắt là TANSTAAFL) để nói về nguyên lý mọi lợi ích kinh tế đều đi kèm chi phí cơ hội.",
    examples: [
      { en: "The offer looks amazing, but remember, there's no such thing as a free lunch.", vi: "Ưu đãi này nghe có vẻ tuyệt vời, nhưng hãy nhớ, chẳng có gì miễn phí cả đâu." },
      { en: "He accepted the free trip, but later realized there is no free lunch when he was asked to promote the product.", vi: "Anh ấy nhận chuyến đi miễn phí, nhưng sau đó nhận ra chẳng có gì cho không cả khi bị yêu cầu quảng cáo sản phẩm." }
    ],
    ex: "The offer looks amazing, but remember, there's no such thing as a free lunch.",
  },
  {
    slug: "tighten-your-belt",
    term: "tighten your belt",
    type: "idiom",
    en: "If you tighten your belt, you start spending less money and living more frugally, usually because your income has dropped or times have become difficult.",
    vi: "Nếu bạn \"tighten your belt\", nghĩa là bạn bắt đầu chi tiêu tiết kiệm hơn và sống giản dị hơn, thường vì thu nhập giảm hoặc hoàn cảnh khó khăn.",
    origin: "Hình ảnh gốc của thành ngữ này liên quan đến việc khi một người thiếu ăn hoặc giảm cân do đói kém, họ phải thắt chặt dây lưng lại vì vòng bụng nhỏ đi. Từ hình ảnh thắt lưng chặt hơn khi thiếu thốn lương thực, cụm từ được mở rộng nghĩa sang việc cắt giảm chi tiêu nói chung. Cách dùng này trở nên đặc biệt phổ biến trong giai đoạn khó khăn kinh tế và thời chiến ở thế kỷ 20, khi các chính phủ kêu gọi người dân \"thắt lưng buộc bụng\" để tiết kiệm nguồn lực.",
    examples: [
      { en: "After the pay cut, the whole family had to tighten their belts.", vi: "Sau khi bị cắt giảm lương, cả gia đình phải thắt lưng buộc bụng." },
      { en: "The government asked citizens to tighten their belts during the economic crisis.", vi: "Chính phủ đã kêu gọi người dân thắt lưng buộc bụng trong thời kỳ khủng hoảng kinh tế." }
    ],
    ex: "After the pay cut, the whole family had to tighten their belts.",
  }
  ],
  "authority-and-control": [
  {
    slug: "be-breathing-down-someone-s-neck",
    term: "be breathing down someone's neck",
    type: "idiom",
    en: "If someone is breathing down your neck, they are watching or checking on you so closely and so often that you feel pressured or unable to relax.",
    vi: "Nếu ai đó \"thở sau gáy\" bạn, nghĩa là họ liên tục theo sát, giám sát bạn từng chút một, khiến bạn cảm thấy căng thẳng và mất tự do.",
    origin: "Thành ngữ này xuất phát từ hình ảnh rất trực quan: một người đứng sát ngay phía sau bạn đến mức bạn có thể cảm nhận được hơi thở của họ trên gáy mình. Cảm giác đó gợi lên sự bám đuổi hoặc giám sát ở khoảng cách quá gần, không có chút riêng tư nào. Hình ảnh này cũng gần với cảnh một kẻ săn đuổi bám sát con mồi, từ đó được dùng ẩn dụ cho việc bị cấp trên hay ai đó kiểm soát quá chặt.",
    examples: [
      { en: "My boss has been breathing down my neck all week because the deadline is tomorrow.", vi: "Sếp tôi cứ giám sát sát sao tôi suốt cả tuần vì hạn chót là ngày mai." },
      { en: "I can't concentrate when you're breathing down my neck like that - please give me some space.", vi: "Tôi không thể tập trung khi anh cứ theo sát tôi như vậy - làm ơn cho tôi chút không gian." }
    ],
    ex: "My boss has been breathing down my neck all week because the deadline is tomorrow.",
  },
  {
    slug: "call-the-shots",
    term: "call the shots",
    type: "idiom",
    en: "If you call the shots, you are the person who makes the important decisions and controls what happens.",
    vi: "\"Call the shots\" nghĩa là người nắm quyền đưa ra những quyết định quan trọng, người kiểm soát tình hình chung.",
    origin: "Nguồn gốc chính xác không hoàn toàn rõ ràng, nhưng cách giải thích phổ biến nhất gắn thành ngữ này với các trò chơi như bi-a hoặc bắn súng, nơi người chơi phải \"gọi tên\" cú đánh hay phát bắn mà mình sẽ thực hiện trước khi làm. Người \"gọi\" cú đánh chính là người kiểm soát diễn biến trận đấu. Một số ý kiến khác cho rằng cụm từ bắt nguồn từ ngữ cảnh quân sự, khi chỉ huy là người quyết định thời điểm khai hỏa.",
    examples: [
      { en: "In this company, it's the founder who calls the shots, not the board of directors.", vi: "Trong công ty này, người ra quyết định là nhà sáng lập, chứ không phải hội đồng quản trị." },
      { en: "Once she was promoted to director, she finally got to call the shots on major projects.", vi: "Sau khi được thăng chức giám đốc, cuối cùng cô ấy cũng được quyền quyết định các dự án lớn." }
    ],
    ex: "In this company, it's the founder who calls the shots, not the board of directors.",
  },
  {
    slug: "get-out-of-hand",
    term: "get out of hand",
    type: "idiom",
    en: "If a situation gets out of hand, it becomes difficult or impossible to control.",
    vi: "\"Get out of hand\" nghĩa là một tình huống trở nên mất kiểm soát, không thể quản lý được nữa.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh điều khiển ngựa hoặc vật nuôi bằng tay hoặc dây cương. Khi con vật vẫn \"in hand\" (trong tay), người điều khiển vẫn kiểm soát được nó; nhưng khi nó \"out of hand\" (thoát khỏi tay), nó đã vượt khỏi tầm kiểm soát. Từ hình ảnh cụ thể đó, cụm từ được mở rộng để nói về bất kỳ tình huống nào - một cuộc tranh cãi, một bữa tiệc, một đám đông - trở nên hỗn loạn, vượt tầm kiểm soát của con người.",
    examples: [
      { en: "The party got out of hand when uninvited guests started breaking furniture.", vi: "Bữa tiệc trở nên mất kiểm soát khi những vị khách không mời bắt đầu đập phá đồ đạc." },
      { en: "You need to address this conflict now before it gets out of hand.", vi: "Bạn cần giải quyết mâu thuẫn này ngay bây giờ trước khi nó vượt khỏi tầm kiểm soát." }
    ],
    ex: "The party got out of hand when uninvited guests started breaking furniture.",
  },
  {
    slug: "go-over-someone-s-head",
    term: "go over someone's head",
    type: "idiom",
    en: "If you go over someone's head, you skip that person and appeal directly to someone with higher authority instead of dealing with them.",
    vi: "\"Go over someone's head\" nghĩa là bỏ qua người có thẩm quyền trực tiếp để tìm đến cấp cao hơn nhằm giải quyết vấn đề.",
    origin: "Hình ảnh gốc của thành ngữ này khá đơn giản và trực quan: thay vì trao đổi trực tiếp với một người, bạn \"đi qua phía trên đầu\" họ để đến với một người khác đứng cao hơn trong hệ thống cấp bậc. Nghĩa đen về việc vượt qua đầu ai đó được chuyển hóa thành nghĩa bóng về việc bỏ qua cấp quản lý trực tiếp, thường mang hàm ý không hài lòng hoặc thiếu tin tưởng vào người đó.",
    examples: [
      { en: "When my manager refused to approve the budget, I went over her head and spoke to the CEO directly.", vi: "Khi quản lý của tôi từ chối duyệt ngân sách, tôi đã bỏ qua cô ấy và nói chuyện trực tiếp với CEO." },
      { en: "Employees who go over their supervisor's head too often can damage trust within the team.", vi: "Nhân viên thường xuyên vượt cấp qua mặt người quản lý trực tiếp có thể làm mất lòng tin trong nhóm." }
    ],
    ex: "When my manager refused to approve the budget, I went over her head and spoke to the CEO directly.",
  },
  {
    slug: "have-someone-eating-out-of-your-hand-or-have-someone-eating-out-of-the-palm-of-your-hand",
    term: "have someone eating out of your hand or have someone eating out of the palm of your hand",
    type: "idiom",
    en: "If you have someone eating out of your hand, you have such complete control or influence over them that they will do almost anything you ask.",
    vi: "\"Have someone eating out of your hand\" nghĩa là khiến ai đó hoàn toàn nghe theo, phục tùng ý muốn của mình.",
    origin: "Thành ngữ này lấy hình ảnh từ việc thuần hóa động vật, chẳng hạn như chim hay thú cưng: khi một con vật đủ tin tưởng để ăn thức ăn ngay trên lòng bàn tay người nuôi, điều đó cho thấy nó đã hoàn toàn thuần phục và nghe lời. Hình ảnh con vật ngoan ngoãn ăn từ tay người được mở rộng sang con người, ám chỉ một người bị thuyết phục hoặc mê hoặc đến mức sẵn sàng làm theo mọi ý muốn của người kia.",
    examples: [
      { en: "After just one charming speech, the new manager had the whole team eating out of her hand.", vi: "Chỉ sau một bài phát biểu đầy sức thuyết phục, vị quản lý mới đã khiến cả đội hoàn toàn nghe theo mình." },
      { en: "The salesman was so persuasive that he had the customers eating out of the palm of his hand.", vi: "Người bán hàng thuyết phục đến mức khách hàng hoàn toàn bị anh ta chi phối." }
    ],
    ex: "After just one charming speech, the new manager had the whole team eating out of her hand.",
  },
  {
    slug: "in-high-places",
    term: "in high places",
    type: "idiom",
    en: "If someone has friends or contacts in high places, they know powerful or influential people who are able to help them.",
    vi: "\"In high places\" nghĩa là có mối quan hệ với những người có quyền lực, địa vị cao, có thể giúp đỡ khi cần thiết.",
    origin: "Thành ngữ này dựa trên phép ẩn dụ không gian rất phổ biến trong nhiều ngôn ngữ: vị trí \"cao\" tượng trưng cho quyền lực và địa vị xã hội, còn vị trí \"thấp\" tượng trưng cho sự yếu thế. Vì vậy, \"những nơi cao\" (high places) ám chỉ những vị trí quyền lực trong xã hội hoặc chính quyền, và có \"bạn bè ở những nơi cao\" nghĩa là quen biết với những người có ảnh hưởng lớn.",
    examples: [
      { en: "He managed to avoid the scandal because he has friends in high places.", vi: "Anh ta tránh được vụ bê bối vì có những mối quan hệ với người có quyền lực." },
      { en: "Getting this permit approved so quickly suggests she has contacts in high places.", vi: "Việc giấy phép được duyệt nhanh như vậy cho thấy cô ấy có quan hệ với người có chức quyền." }
    ],
    ex: "He managed to avoid the scandal because he has friends in high places.",
  },
  {
    slug: "a-law-unto-yourself",
    term: "a law unto yourself",
    type: "idiom",
    en: "If someone is a law unto themselves, they behave according to their own personal rules and ignore normal conventions or authority.",
    vi: "\"A law unto yourself\" nghĩa là người hành xử hoàn toàn theo ý mình, không tuân theo quy tắc hay chuẩn mực chung của mọi người.",
    origin: "Cụm từ này có nguồn gốc từ Kinh Thánh, cụ thể là câu trong Thư gửi tín hữu Rô-ma (Romans 2:14), nói về những người không có luật pháp thành văn nhưng tự bản năng hành động đúng theo lẽ phải, như thể chính họ là luật lệ cho bản thân. Theo thời gian, ý nghĩa tôn giáo ban đầu dần biến đổi và mang sắc thái đời thường hơn, chỉ những người ngang bướng, tự đặt ra quy tắc riêng và không chịu tuân theo ai.",
    examples: [
      { en: "Don't expect him to follow the usual procedures - he's always been a law unto himself.", vi: "Đừng mong anh ta tuân theo quy trình thông thường - anh ta luôn hành xử theo cách riêng của mình." },
      { en: "The star player ignored the coach's instructions again; on the field, he's a law unto himself.", vi: "Cầu thủ ngôi sao lại phớt lờ chỉ đạo của huấn luyện viên; trên sân, anh ta chỉ làm theo ý mình." }
    ],
    ex: "Don't expect him to follow the usual procedures - he's always been a law unto himself.",
  },
  {
    slug: "on-top-of-something",
    term: "on top of something",
    type: "idiom",
    en: "If you are on top of something, you are in full control of it and managing it well, keeping track of all its details.",
    vi: "\"On top of something\" nghĩa là đang kiểm soát tốt, nắm rõ và xử lý ổn thỏa một công việc hay tình huống nào đó.",
    origin: "Giống nhiều thành ngữ khác liên quan đến quyền lực và kiểm soát, cụm từ này dựa trên ẩn dụ không gian: đứng \"ở trên đỉnh\" (on top) một sự việc nghĩa là ở vị trí quan sát và làm chủ được toàn bộ, giống như đứng trên cao có thể nhìn bao quát mọi thứ bên dưới. Từ đó, cụm từ được dùng để chỉ việc kiểm soát tốt công việc, không để nó vượt khỏi tầm tay.",
    examples: [
      { en: "Don't worry about the project - I'm on top of everything and we'll meet the deadline.", vi: "Đừng lo về dự án - tôi đang kiểm soát tốt mọi thứ và chúng ta sẽ kịp hạn chót." },
      { en: "A good manager stays on top of the team's workload to prevent burnout.", vi: "Một người quản lý giỏi luôn nắm rõ khối lượng công việc của nhóm để tránh kiệt sức." }
    ],
    ex: "Don't worry about the project - I'm on top of everything and we'll meet the deadline.",
  },
  {
    slug: "pass-the-buck",
    term: "pass the buck",
    type: "idiom",
    en: "If you pass the buck, you avoid taking responsibility for a problem by blaming someone else or making them deal with it instead.",
    vi: "\"Pass the buck\" nghĩa là né tránh trách nhiệm bằng cách đổ lỗi hoặc đẩy việc đó cho người khác giải quyết.",
    origin: "Thành ngữ này có nguồn gốc từ các sòng bài Mỹ thời xưa, nơi một vật (ban đầu thường là con dao cán bằng sừng hươu, gọi là \"buck\") được truyền tay để đánh dấu người tiếp theo có nhiệm vụ chia bài. Người giữ vật đó phải chia bài, nên \"chuyền buck đi\" (pass the buck) đồng nghĩa với việc chuyển trách nhiệm đó cho người khác. Câu nói nổi tiếng \"The buck stops here\" của Tổng thống Truman sau này lại mang ý nghĩa ngược lại - nhận trách nhiệm về mình chứ không đẩy cho ai khác.",
    examples: [
      { en: "Instead of admitting his mistake, he tried to pass the buck to his assistant.", vi: "Thay vì thừa nhận sai lầm, anh ta lại tìm cách đổ lỗi cho trợ lý của mình." },
      { en: "Stop passing the buck and take responsibility for the errors in the report.", vi: "Đừng đổ trách nhiệm cho người khác nữa, hãy chịu trách nhiệm về những lỗi trong bản báo cáo." }
    ],
    ex: "Instead of admitting his mistake, he tried to pass the buck to his assistant.",
  },
  {
    slug: "pull-strings",
    term: "pull strings",
    type: "idiom",
    en: "If you pull strings, you use personal connections or private influence to gain an advantage or get something done, often unofficially.",
    vi: "\"Pull strings\" nghĩa là dùng mối quan hệ, quen biết riêng để tác động, giúp việc gì đó diễn ra suôn sẻ theo cách không chính thức.",
    origin: "Thành ngữ này bắt nguồn từ nghệ thuật múa rối dây, trong đó người điều khiển con rối đứng ẩn phía sau và giật các sợi dây để điều khiển từng cử động của con rối mà khán giả không nhìn thấy. Hình ảnh đó được dùng ẩn dụ cho những người có quyền lực hoặc quan hệ, âm thầm tác động phía sau hậu trường để chi phối kết quả một việc gì đó, giống như người múa rối điều khiển con rối của mình.",
    examples: [
      { en: "He pulled some strings to get his son an interview at the company.", vi: "Anh ta đã nhờ vả mối quan hệ để xin cho con trai một buổi phỏng vấn tại công ty." },
      { en: "I don't want anyone to pull strings for me; I want to earn this position on my own merit.", vi: "Tôi không muốn ai nhờ vả giúp mình; tôi muốn có được vị trí này bằng chính năng lực của mình." }
    ],
    ex: "He pulled some strings to get his son an interview at the company.",
  },
  {
    slug: "put-your-foot-down",
    term: "put your foot down",
    type: "idiom",
    en: "If you put your foot down, you firmly insist on something or refuse to allow it to continue, clearly asserting your authority.",
    vi: "\"Put your foot down\" nghĩa là kiên quyết, dứt khoát yêu cầu hoặc ngăn cản điều gì đó xảy ra.",
    origin: "Nguồn gốc chính xác không hoàn toàn rõ ràng, nhưng một cách giải thích phổ biến liên hệ cụm từ này với hình ảnh dậm chân xuống đất thật mạnh - một cử chỉ thể hiện sự kiên quyết, không lay chuyển. Một cách giải thích khác liên hệ đến việc lái xe, khi \"đặt chân xuống\" ga có nghĩa là tăng tốc dứt khoát. Dù nguồn gốc nào đúng, ý nghĩa chung đều gắn với sự quyết đoán và không nhân nhượng.",
    examples: [
      { en: "After years of letting her children stay up late, she finally put her foot down about bedtime.", vi: "Sau nhiều năm để các con thức khuya, cuối cùng cô ấy đã kiên quyết đặt ra giờ đi ngủ." },
      { en: "The manager put his foot down and refused to extend the deadline any further.", vi: "Người quản lý đã kiên quyết và từ chối gia hạn thêm thời hạn." }
    ],
    ex: "After years of letting her children stay up late, she finally put her foot down about bedtime.",
  },
  {
    slug: "twist-someone-around-your-little-finger-or-wrap-someone-around-your-little-finger",
    term: "twist someone around your little finger or wrap someone around your little finger",
    type: "idiom",
    en: "If you can twist someone around your little finger, you can easily persuade them to do anything you want because they are so fond of you or devoted to you.",
    vi: "\"Twist someone around your little finger\" nghĩa là dễ dàng thao túng, khiến ai đó làm theo ý mình vì họ quá yêu quý hoặc nể trọng mình.",
    origin: "Hình ảnh gốc của thành ngữ này là một sợi vật gì đó - chẳng hạn như một sợi chỉ hay dây mảnh - nhỏ và mềm đến mức có thể quấn quanh ngón út, ngón tay nhỏ và yếu nhất của bàn tay, một cách dễ dàng. Từ đó, cụm từ được dùng để chỉ việc kiểm soát ai đó một cách hoàn toàn dễ dàng và không tốn chút công sức nào, thường là nhờ sự yêu mến hoặc ngưỡng mộ của người kia.",
    examples: [
      { en: "She can twist her grandfather around her little finger just by smiling at him.", vi: "Cô bé chỉ cần cười với ông là có thể khiến ông làm theo mọi ý muốn của mình." },
      { en: "He always gets what he wants at work because he has wrapped his boss around his little finger.", vi: "Anh ta luôn đạt được điều mình muốn ở nơi làm việc vì đã hoàn toàn thao túng được sếp." }
    ],
    ex: "She can twist her grandfather around her little finger just by smiling at him.",
  },
  {
    slug: "twist-someone-s-arm",
    term: "twist someone's arm",
    type: "idiom",
    en: "If you twist someone's arm, you persuade or pressure them into doing something that they were originally unwilling to do.",
    vi: "\"Twist someone's arm\" nghĩa là thuyết phục hoặc gây áp lực để ai đó làm một việc mà ban đầu họ không muốn làm.",
    origin: "Thành ngữ này bắt nguồn từ hình ảnh vặn tay ai đó ra sau lưng để ép buộc họ phải khuất phục hoặc làm theo, một hành động cưỡng ép bằng vũ lực trong các tình huống xung đột thể chất. Theo thời gian, ý nghĩa của nó được chuyển từ hành động vũ lực thực sự sang việc thuyết phục hoặc gây áp lực bằng lời nói, và ngày nay thường được dùng với sắc thái đùa vui, nhẹ nhàng hơn nhiều so với nghĩa đen.",
    examples: [
      { en: "I didn't want to go to the party, but my friends twisted my arm.", vi: "Tôi không muốn đi dự tiệc, nhưng bạn bè đã thuyết phục ép tôi phải đi." },
      { en: "You don't need to twist my arm - I'd love a free trip to the beach!", vi: "Bạn không cần phải thuyết phục tôi đâu - tôi rất thích một chuyến đi biển miễn phí!" }
    ],
    ex: "I didn't want to go to the party, but my friends twisted my arm.",
  },
  {
    slug: "wear-the-trousers-or-wear-the-pants",
    term: "wear the trousers or wear the pants",
    type: "idiom",
    en: "If someone wears the trousers in a relationship or family, they are the one who makes the decisions and has the most control.",
    vi: "\"Wear the trousers\" nghĩa là người có quyền quyết định, nắm quyền chủ động trong gia đình hay một mối quan hệ, thường nói về vợ hoặc chồng.",
    origin: "Về mặt lịch sử, quần dài (trousers/pants) từng được xem là trang phục đặc trưng của nam giới, gắn liền với hình ảnh người đàn ông là trụ cột và người ra quyết định trong gia đình. Vì vậy, khi nói ai đó \"mặc quần\" trong nhà, ban đầu thành ngữ này ngụ ý rằng người vợ đã đảm nhận vai trò quyết định thường thuộc về người chồng theo quan niệm truyền thống. Ngày nay cụm từ được dùng chung cho bất kỳ ai, không phân biệt giới tính, là người thực sự nắm quyền trong một mối quan hệ.",
    examples: [
      { en: "Everyone knows that in their household, it's Maria who wears the trousers.", vi: "Ai cũng biết trong gia đình đó, Maria mới là người nắm quyền quyết định." },
      { en: "He jokes that his wife wears the pants, but he's happy to let her make the big decisions.", vi: "Anh ấy đùa rằng vợ mình mới là người quyết định trong nhà, nhưng anh vui vẻ để cô ấy đưa ra những quyết định lớn." }
    ],
    ex: "Everyone knows that in their household, it's Maria who wears the trousers.",
  }
  ],
  "limitations-and-restrictions": [
  {
    slug: "bend-the-rules",
    term: "bend the rules",
    type: "idiom",
    en: "If you bend the rules, you allow an exception to a rule or apply it less strictly than normal, usually to help someone or to deal fairly with an unusual situation.",
    vi: "\"Bend the rules\" nghĩa là nới lỏng hoặc phá lệ một quy định nào đó, thường là để giúp đỡ ai đó hoặc xử lý linh hoạt một tình huống đặc biệt.",
    origin: "Hình ảnh gốc của thành ngữ này là việc uốn cong một vật vốn cứng như một thanh kim loại mà không làm nó gãy. Quy tắc được ví như vật thể cứng đó, và việc \"uốn\" nó ngụ ý một sự linh động nhỏ, có thể chấp nhận được, khác với việc phá vỡ quy tắc hoàn toàn. Cách ví von \"vật cứng có thể uốn\" này khá phổ biến trong tiếng Anh khi nói về các quy định, luật lệ.",
    examples: [
      { en: "The teacher bent the rules and let Minh submit his essay a day late because his laptop broke.", vi: "Cô giáo đã phá lệ và cho phép Minh nộp bài trễ một ngày vì máy tính của cậu ấy bị hỏng." },
      { en: "Normally pets aren't allowed, but the hotel manager bent the rules for our small dog.", vi: "Bình thường thú cưng không được phép mang vào, nhưng quản lý khách sạn đã du di cho chú chó nhỏ của chúng tôi." }
    ],
    ex: "The teacher bent the rules and let Minh submit his essay a day late because his laptop broke.",
  },
  {
    slug: "the-dos-and-don-ts",
    term: "the dos and don'ts",
    type: "idiom",
    en: "The dos and don'ts of a situation are the basic rules of accepted or recommended behavior — the things you should do and the things you should avoid doing.",
    vi: "\"The dos and don'ts\" là những quy tắc cơ bản, những điều nên làm và không nên làm trong một tình huống hay hoàn cảnh nào đó.",
    origin: "Thành ngữ này ghép động từ \"do\" (làm) với dạng phủ định \"don't\" (đừng làm) thành một cặp từ vần điệu, dễ nhớ — một kiểu cấu tạo quen thuộc trong tiếng Anh để gói gọn lời khuyên, tương tự \"ins and outs\" hay \"ups and downs\". Cách diễn đạt này trở nên phổ biến trong các sách hướng dẫn về phép lịch sự và quy tắc ứng xử, nơi các đề mục \"Do's\" và \"Don'ts\" thường được liệt kê tách biệt để người đọc dễ theo dõi.",
    examples: [
      { en: "Before you start the new job, HR will explain the dos and don'ts of the office.", vi: "Trước khi bắt đầu công việc mới, phòng nhân sự sẽ giải thích những điều nên và không nên làm ở văn phòng." },
      { en: "This article covers the dos and don'ts of eating street food safely while traveling.", vi: "Bài viết này nói về những điều nên và không nên làm để ăn đồ ăn đường phố an toàn khi đi du lịch." }
    ],
    ex: "Before you start the new job, HR will explain the dos and don'ts of the office.",
  },
  {
    slug: "draw-the-line",
    term: "draw the line",
    type: "idiom",
    en: "If you draw the line at something, you set a clear limit on what you are willing to accept, do, or tolerate, and you refuse to go any further than that point.",
    vi: "\"Draw the line\" nghĩa là vạch ra một giới hạn rõ ràng cho những gì bạn chấp nhận hoặc sẵn sàng làm, và kiên quyết không vượt qua giới hạn đó.",
    origin: "Hình ảnh gốc là việc vẽ một đường ranh giới thật sự trên mặt đất hoặc trên giấy để đánh dấu một điểm không được phép vượt qua, giống như cách trọng tài hay quan chức đánh dấu ranh giới trong thể thao và các trò chơi. Theo thời gian, đường ranh giới vật lý này trở thành phép ẩn dụ cho giới hạn cá nhân hoặc đạo đức trong hành vi.",
    examples: [
      { en: "I don't mind helping with extra tasks, but I draw the line at working every weekend.", vi: "Tôi không ngại giúp thêm việc, nhưng tôi sẽ không chấp nhận việc phải làm cả cuối tuần." },
      { en: "She draws the line at lying to customers, even if her boss asks her to.", vi: "Cô ấy nhất quyết không nói dối khách hàng, dù sếp có yêu cầu." }
    ],
    ex: "I don't mind helping with extra tasks, but I draw the line at working every weekend.",
  },
  {
    slug: "a-fine-line-between-something",
    term: "a fine line between something",
    type: "idiom",
    en: "A fine line between two things means the difference between them is very small and easy to cross without realizing it, so it can be hard to tell them apart.",
    vi: "\"A fine line between...\" nghĩa là ranh giới giữa hai điều gì đó rất mong manh, dễ vượt qua mà không nhận ra, khiến người ta khó phân biệt rạch ròi.",
    origin: "Từ \"fine\" ở đây mang nghĩa mỏng, mảnh, như một sợi chỉ mảnh hay một đường kẻ bút rất mỏng — thứ gì đó mảnh đến mức gần như khó thấy được. Hình ảnh vật lý về một đường kẻ mảnh, dễ bị vượt qua này được mở rộng sang nghĩa bóng để mô tả những khác biệt tinh tế giữa các khái niệm, chẳng hạn giữa sự tự tin và tự cao, hay giữa thẳng thắn và thô lỗ.",
    examples: [
      { en: "There's a fine line between being confident and being arrogant.", vi: "Ranh giới giữa tự tin và tự cao rất mong manh." },
      { en: "The comedian's jokes walk a fine line between funny and offensive.", vi: "Những câu đùa của diễn viên hài này đi trên ranh giới mong manh giữa hài hước và xúc phạm." }
    ],
    ex: "There's a fine line between being confident and being arrogant.",
  },
  {
    slug: "have-your-hands-full",
    term: "have your hands full",
    type: "idiom",
    en: "If you have your hands full, you are extremely busy with something that takes up all your time and effort, leaving you unable to take on anything else.",
    vi: "\"Have your hands full\" nghĩa là bạn đang bận rộn với một việc gì đó chiếm hết thời gian và sức lực, đến mức không thể nhận thêm việc khác.",
    origin: "Thành ngữ này gợi lên hình ảnh một người mà hai tay đã cầm đầy đồ vật nên không thể cầm thêm được gì nữa — một phép ẩn dụ trực quan và lâu đời để diễn tả tình trạng quá tải. Cách diễn đạt này đã xuất hiện trong tiếng Anh từ nhiều thế kỷ, thường gắn với việc chăm sóc con cái hoặc khối lượng công việc nặng nề, nơi hình ảnh \"đôi tay đầy ắp\" khiến gánh nặng trở nên dễ hình dung.",
    examples: [
      { en: "With three kids and a new puppy, she really has her hands full these days.", vi: "Với ba đứa con và một chú cún mới, dạo này chị ấy bận tối mắt tối mũi." },
      { en: "I'd love to help organize the event, but I already have my hands full with the year-end report.", vi: "Tôi rất muốn giúp tổ chức sự kiện, nhưng tôi đã ngập đầu với báo cáo cuối năm rồi." }
    ],
    ex: "With three kids and a new puppy, she really has her hands full these days.",
  },
  {
    slug: "off-limits",
    term: "off limits",
    type: "idiom",
    en: "If a place, topic, or activity is off limits, it is forbidden — you are not allowed to enter it, discuss it, or do it.",
    vi: "\"Off limits\" nghĩa là một nơi, chủ đề hoặc hoạt động nào đó bị cấm, không được phép tiếp cận, nhắc tới hoặc thực hiện.",
    origin: "Thành ngữ này bắt nguồn từ ngôn ngữ quân đội, khi các chỉ huy tuyên bố một số khu vực nhất định — chẳng hạn quán bar hay khu phố địa phương — là \"off limits\" đối với binh lính, tức là bị cấm vào. Từ đó, cách diễn đạt này lan sang tiếng Anh đời thường để chỉ bất kỳ khu vực bị hạn chế hay chủ đề cấm kỵ nào.",
    examples: [
      { en: "The construction site is off limits to anyone without a safety helmet.", vi: "Công trường xây dựng cấm những ai không đội mũ bảo hộ vào." },
      { en: "Questions about her salary are off limits during the interview.", vi: "Những câu hỏi về lương của cô ấy là chủ đề cấm kỵ trong buổi phỏng vấn." }
    ],
    ex: "The construction site is off limits to anyone without a safety helmet.",
  },
  {
    slug: "out-of-bounds",
    term: "out of bounds",
    type: "idiom",
    en: "If something is out of bounds, it is outside the permitted area, or it goes beyond what is considered acceptable behavior or conversation.",
    vi: "\"Out of bounds\" nghĩa là nằm ngoài khu vực được phép, hoặc vượt quá giới hạn hành vi hay lời nói được xem là chấp nhận được.",
    origin: "Thuật ngữ này xuất phát trực tiếp từ các môn thể thao như golf, quần vợt và bóng đá, nơi sân thi đấu có ranh giới được đánh dấu rõ ràng, và một quả bóng rơi ra ngoài ranh giới đó được gọi chính thức là \"out of bounds\" và không còn trong cuộc chơi. Nghĩa gốc trong thể thao sau đó được mượn để mô tả bất kỳ hành vi, chủ đề hay nơi chốn nào vượt ra ngoài giới hạn cho phép trong đời sống hằng ngày.",
    examples: [
      { en: "His comment about her age was completely out of bounds.", vi: "Câu bình luận của anh ta về tuổi tác của cô ấy là hoàn toàn quá đáng." },
      { en: "The golf ball landed out of bounds, so he had to take a penalty stroke.", vi: "Quả bóng golf rơi ra ngoài ranh giới sân, nên anh ấy phải chịu một gậy phạt." }
    ],
    ex: "His comment about her age was completely out of bounds.",
  },
  {
    slug: "over-the-top",
    term: "over the top",
    type: "idiom",
    en: "If something is over the top, it is excessive, exaggerated, or more extreme than necessary or appropriate for the situation.",
    vi: "\"Over the top\" nghĩa là thái quá, phóng đại hoặc vượt xa mức cần thiết hay phù hợp với hoàn cảnh.",
    origin: "Nhiều người cho rằng thành ngữ này bắt nguồn từ chiến tranh chiến hào trong Thế chiến thứ nhất, khi binh lính phải trèo \"lên trên\" (over the top) thành chiến hào để lao vào những cuộc tấn công cực kỳ nguy hiểm, được ăn cả ngã về không. Sự liên tưởng tới hành động liều lĩnh, cực đoan đó dần chuyển thành nghĩa hiện đại hơn, chỉ chung những gì thái quá hoặc phóng đại.",
    examples: [
      { en: "Don't you think fireworks for a birthday dinner is a bit over the top?", vi: "Bạn không thấy bắn pháo hoa cho một bữa tối sinh nhật là hơi quá đà sao?" },
      { en: "His apology was so over the top that it felt insincere.", vi: "Lời xin lỗi của anh ta thái quá đến mức có vẻ không chân thành." }
    ],
    ex: "Don't you think fireworks for a birthday dinner is a bit over the top?",
  },
  {
    slug: "overstep-the-mark",
    term: "overstep the mark",
    type: "idiom",
    en: "If you overstep the mark, you go beyond what is acceptable in your behavior or words, doing or saying something that crosses a proper boundary.",
    vi: "\"Overstep the mark\" nghĩa là vượt quá giới hạn cho phép trong hành vi hoặc lời nói, làm hoặc nói điều gì đó vượt ra ngoài chuẩn mực.",
    origin: "Hình ảnh gốc là một dấu mốc hoặc đường kẻ thật sự trên mặt đất — giống như vạch xuất phát trong một cuộc đua — mà người ta không được phép bước qua. Việc bước qua dấu mốc đó nghĩa là đi xa hơn mức cho phép, và ý tưởng về ranh giới vật lý này đã được mở rộng sang hành vi ứng xử nói chung.",
    examples: [
      { en: "The intern overstepped the mark by criticizing the CEO's decision in front of clients.", vi: "Nhân viên thực tập đã vượt quá giới hạn khi chỉ trích quyết định của CEO trước mặt khách hàng." },
      { en: "He apologized, admitting his joke had overstepped the mark.", vi: "Anh ấy đã xin lỗi, thừa nhận rằng câu đùa của mình đã đi quá giới hạn." }
    ],
    ex: "The intern overstepped the mark by criticizing the CEO's decision in front of clients.",
  },
  {
    slug: "step-on-someone-s-toes-or-tread-on-someone-s-toes",
    term: "step on someone's toes or tread on someone's toes",
    type: "idiom",
    en: "If you step on someone's toes (or tread on someone's toes), you interfere in their responsibilities or upset them by doing something that is really their job or area, often without meaning to.",
    vi: "\"Step on someone's toes\" (hay \"tread on someone's toes\") nghĩa là vô tình hoặc cố ý can thiệp vào công việc, trách nhiệm của người khác, khiến họ khó chịu vì cảm thấy bị lấn quyền.",
    origin: "Hình ảnh gốc là việc vô tình giẫm lên chân người khác, gây đau và khó chịu dù không cố ý — một hành động va chạm nhỏ về thể chất nhưng lại gây phản ứng cảm xúc lớn. Sự cố nhỏ nhặt trong đời sống hằng ngày này đã trở thành phép ẩn dụ tự nhiên cho việc lấn sang lãnh địa hay thẩm quyền của người khác và khiến họ phật lòng.",
    examples: [
      { en: "I don't want to step on your toes, but I think the report needs a few changes.", vi: "Tôi không muốn lấn quyền của bạn, nhưng tôi nghĩ báo cáo cần vài chỉnh sửa." },
      { en: "He tends to tread on his colleagues' toes by making decisions without asking them first.", vi: "Anh ấy hay lấn sân đồng nghiệp bằng cách tự ý quyết định mà không hỏi ý kiến trước." }
    ],
    ex: "I don't want to step on your toes, but I think the report needs a few changes.",
  },
  {
    slug: "with-no-strings-attached-or-without-strings",
    term: "with no strings attached or without strings",
    type: "idiom",
    en: "If something, especially an offer or a gift, comes with no strings attached (or without strings), it has no hidden conditions, obligations, or requirements attached to it.",
    vi: "\"With no strings attached\" (hay \"without strings\") nghĩa là một điều gì đó, đặc biệt là một lời đề nghị hay món quà, không kèm theo điều kiện, ràng buộc hay nghĩa vụ ẩn nào.",
    origin: "Hình ảnh gốc là một con rối bị điều khiển bằng các sợi dây — nếu \"có dây gắn vào\" (strings attached), nghĩa là ai đó đang bí mật điều khiển hoặc chi phối kết quả. Áp dụng vào quà tặng, thỏa thuận hay ân huệ, cụm từ \"no strings attached\" trấn an rằng người cho không hề bí mật ràng buộc người nhận bằng những nghĩa vụ ngầm.",
    examples: [
      { en: "My uncle lent me the money with no strings attached, so I didn't have to worry about conditions.", vi: "Chú tôi cho tôi mượn tiền không kèm điều kiện gì, nên tôi không phải lo lắng về ràng buộc nào cả." },
      { en: "The scholarship is offered without strings — you don't have to work for the company afterward.", vi: "Học bổng này được trao mà không ràng buộc gì — bạn không phải làm việc cho công ty sau đó." }
    ],
    ex: "My uncle lent me the money with no strings attached, so I didn't have to worry about conditions.",
  },
  {
    slug: "your-hands-are-tied",
    term: "your hands are tied",
    type: "idiom",
    en: "If your hands are tied, you are unable to act freely or do what you would like to do because of rules, promises, or circumstances that restrict you.",
    vi: "\"Your hands are tied\" nghĩa là bạn không thể tự do hành động hay làm điều mình muốn vì bị ràng buộc bởi quy định, lời hứa hoặc hoàn cảnh nào đó.",
    origin: "Thành ngữ này dùng hình ảnh trực tiếp của một người bị trói tay bằng dây thừng, khiến họ hoàn toàn bất lực, không thể làm gì bằng tay của mình. Hình ảnh này dần trở thành phép ẩn dụ phổ biến cho việc bị ràng buộc bởi quy định, quyền hạn hay hoàn cảnh nằm ngoài tầm kiểm soát, ngay cả khi bản thân rất muốn giúp đỡ.",
    examples: [
      { en: "I'd love to give you a refund, but company policy means my hands are tied.", vi: "Tôi rất muốn hoàn tiền cho bạn, nhưng chính sách công ty khiến tôi không thể làm gì được." },
      { en: "The manager wanted to promote her, but with the hiring freeze, his hands were tied.", vi: "Người quản lý muốn thăng chức cho cô ấy, nhưng vì lệnh ngừng tuyển dụng, anh ấy đành bó tay." }
    ],
    ex: "I'd love to give you a refund, but company policy means my hands are tied.",
  }
  ],
  "loving-and-liking": [
  {
    slug: "carry-a-torch-for-someone",
    term: "carry a torch for someone",
    type: "idiom",
    en: "If you carry a torch for someone, you continue to have strong romantic feelings for them, often when those feelings are not returned or the relationship has already ended.",
    vi: "Nếu bạn \"carry a torch for\" ai đó, nghĩa là bạn vẫn còn thầm yêu hoặc vương vấn tình cảm với người đó, dù tình cảm không được đáp lại hoặc mối quan hệ đã kết thúc.",
    origin: "Cụm từ này bắt nguồn từ tiếng Anh-Mỹ đầu thế kỷ 20, khi ngọn đuốc (torch) được dùng như biểu tượng cho ngọn lửa tình yêu cháy âm ỉ trong lòng. Hình ảnh \"mang theo ngọn đuốc\" gợi đến việc âm thầm giữ mãi cảm xúc dành cho một người, dù không công khai bày tỏ. Một số ý kiến còn liên hệ cụm từ với hình ảnh người rước đuốc trong các cuộc diễu hành, tượng trưng cho việc mang theo một điều gì đó nặng lòng suốt thời gian dài.",
    examples: [
      { en: "Even after ten years, he still carries a torch for his high school sweetheart.", vi: "Ngay cả sau mười năm, anh ấy vẫn còn thầm thương nhớ mối tình thời trung học." },
      { en: "She admitted she was carrying a torch for her ex, even though they broke up months ago.", vi: "Cô ấy thừa nhận vẫn còn vương vấn người yêu cũ, dù họ đã chia tay mấy tháng rồi." }
    ],
    ex: "Even after ten years, he still carries a torch for his high school sweetheart.",
  },
  {
    slug: "common-or-garden-or-garden-variety",
    term: "common-or-garden or garden-variety",
    type: "idiom",
    en: "If something is described as common-or-garden or garden-variety, it means it is very ordinary, typical, or unremarkable, with nothing special or unusual about it.",
    vi: "Nếu điều gì đó được gọi là \"common-or-garden\" hay \"garden-variety\", nghĩa là nó rất bình thường, phổ biến, không có gì đặc biệt hay khác lạ.",
    origin: "Cụm \"common-or-garden\" xuất phát từ tiếng Anh-Anh, ban đầu dùng trong làm vườn để chỉ những loài cây, hoa cỏ mọc phổ biến trong bất kỳ khu vườn nào, trái ngược với các giống hiếm hay quý. Từ đó nghĩa bóng mở rộng sang việc miêu tả bất cứ thứ gì bình thường, đại trà, không có gì nổi bật. \"Garden-variety\" là biến thể tương đương phổ biến hơn trong tiếng Anh-Mỹ, dùng theo cùng nghĩa ẩn dụ này.",
    examples: [
      { en: "It's not a rare disease, just a common-or-garden cold.", vi: "Đó không phải bệnh hiếm gặp, chỉ là cảm lạnh thông thường thôi." },
      { en: "He's not some genius investor, just a garden-variety stockbroker.", vi: "Anh ta không phải nhà đầu tư thiên tài gì, chỉ là một nhân viên môi giới chứng khoán bình thường." }
    ],
    ex: "It's not a rare disease, just a common-or-garden cold.",
  },
  {
    slug: "fall-head-over-heels-or-fall-head-over-heels-in-love",
    term: "fall head over heels or fall head over heels in love",
    type: "idiom",
    en: "If you fall head over heels, or fall head over heels in love, with someone, you fall deeply and suddenly in love with them.",
    vi: "Nếu bạn \"fall head over heels\" với ai đó, nghĩa là bạn yêu người đó say đắm và bất ngờ, một cách mãnh liệt ngay từ đầu.",
    origin: "Về mặt logic, đầu (head) vốn luôn ở trên gót chân (heels), nên cụm gốc ban đầu trong tiếng Anh cổ vốn là \"heels over head\", ý chỉ việc lộn nhào, ngã đến mức đầu chúc xuống dưới. Theo thời gian, trật tự từ bị đảo ngược thành \"head over heels\" nhưng vẫn giữ nguyên ý diễn tả trạng thái choáng váng, mất thăng bằng. Khi áp dụng cho tình yêu, hình ảnh \"lộn nhào\" này tượng trưng cho cảm giác chao đảo, mất kiểm soát khi yêu say đắm.",
    examples: [
      { en: "They met at a party and fell head over heels in love within weeks.", vi: "Họ gặp nhau tại một bữa tiệc và yêu nhau say đắm chỉ trong vài tuần." },
      { en: "I fell head over heels for him the moment he smiled at me.", vi: "Tôi đã yêu anh ấy say đắm ngay từ khoảnh khắc anh ấy mỉm cười với tôi." }
    ],
    ex: "They met at a party and fell head over heels in love within weeks.",
  },
  {
    slug: "have-a-soft-spot-for-someone-something",
    term: "have a soft spot for someone/something",
    type: "idiom",
    en: "If you have a soft spot for someone or something, you feel a particular fondness or affection for them, often without a strong logical reason.",
    vi: "Nếu bạn có tình cảm đặc biệt (\"a soft spot\") dành cho ai/điều gì đó, nghĩa là bạn có sự yêu thích riêng với người/vật đó, dù không hẳn có lý do rõ ràng.",
    origin: "Cụm từ này dùng hình ảnh ẩn dụ về \"điểm mềm\" (soft spot) trên một bề mặt cứng, nơi dễ bị tác động hoặc dễ chịu ảnh hưởng nhất. Trái tim hay tính cách con người được ví như có những điểm mềm như vậy, nơi cảm xúc dễ dàng len lỏi vào. Từ đó, cụm từ mang nghĩa bóng chỉ sự yêu thích, ưu ái đặc biệt dành cho một người hay sự vật cụ thể.",
    examples: [
      { en: "My grandmother always had a soft spot for stray cats.", vi: "Bà tôi luôn có tình cảm đặc biệt với những chú mèo hoang." },
      { en: "Despite his tough image, the coach has a soft spot for the youngest players on the team.", vi: "Dù có vẻ ngoài nghiêm khắc, huấn luyện viên vẫn luôn ưu ái các cầu thủ nhỏ tuổi nhất trong đội." }
    ],
    ex: "My grandmother always had a soft spot for stray cats.",
  },
  {
    slug: "head-and-shoulders-above-someone-something",
    term: "head and shoulders above someone/something",
    type: "idiom",
    en: "If someone or something is head and shoulders above others, they are clearly much better or more superior in quality or ability.",
    vi: "Nếu ai/điều gì đó \"vượt trội hẳn\" (head and shoulders above) so với những người/thứ khác, nghĩa là họ hơn hẳn về chất lượng hoặc năng lực.",
    origin: "Cụm từ gợi hình ảnh một người đứng cao hơn hẳn đám đông đến mức có thể nhìn thấy rõ cả đầu và vai nhô lên trên những người xung quanh. Hình ảnh trực quan này được dùng để diễn tả sự vượt trội rõ rệt, dễ nhận thấy ngay từ cái nhìn đầu tiên, mà không cần so sánh kỹ lưỡng.",
    examples: [
      { en: "Her latest novel is head and shoulders above anything else she has written.", vi: "Cuốn tiểu thuyết mới nhất của cô ấy vượt trội hẳn so với những tác phẩm trước đây." },
      { en: "As a striker, he was head and shoulders above the rest of the players on the pitch.", vi: "Với vai trò tiền đạo, anh ấy vượt trội hẳn so với các cầu thủ còn lại trên sân." }
    ],
    ex: "Her latest novel is head and shoulders above anything else she has written.",
  },
  {
    slug: "no-great-shakes",
    term: "no great shakes",
    type: "idiom",
    en: "If something or someone is no great shakes, they are not particularly impressive, talented, or good, but rather average or mediocre.",
    vi: "Nếu ai/điều gì đó \"no great shakes\", nghĩa là không có gì đặc biệt xuất sắc hay ấn tượng, chỉ ở mức bình thường, tầm tầm.",
    origin: "Nguồn gốc chính xác của cụm từ này không hoàn toàn rõ ràng. Một giả thuyết phổ biến cho rằng nó liên quan đến việc lắc xúc xắc (shake the dice) trong các trò chơi cờ bạc thời xưa, khi một cú lắc không có gì đặc biệt thì cũng không mang lại kết quả tốt. Cụm từ được ghi nhận xuất hiện từ đầu thế kỷ 19 trong tiếng Anh thông tục và dần được dùng rộng rãi để chê nhẹ nhàng một điều gì đó tầm thường.",
    examples: [
      { en: "The restaurant's food was no great shakes, but the service was excellent.", vi: "Đồ ăn ở nhà hàng đó không có gì đặc sắc, nhưng dịch vụ thì rất tuyệt." },
      { en: "He's a decent singer, but honestly no great shakes compared to professionals.", vi: "Anh ấy hát cũng tạm được, nhưng thật ra chẳng có gì nổi bật so với các ca sĩ chuyên nghiệp." }
    ],
    ex: "The restaurant's food was no great shakes, but the service was excellent.",
  },
  {
    slug: "nothing-to-write-home-about-or-not-much-to-write-home-about",
    term: "nothing to write home about or not much to write home about",
    type: "idiom",
    en: "If something is nothing to write home about, it is unremarkable or unimpressive, not exciting or special enough to be worth mentioning.",
    vi: "Nếu điều gì đó \"chẳng có gì đáng để viết thư kể\" (nothing to write home about), nghĩa là nó khá tầm thường, không đáng để khoe hay kể lại cho người khác.",
    origin: "Cụm từ này bắt nguồn từ thói quen của binh lính hoặc người đi xa viết thư về nhà (write home) kể cho gia đình nghe những điều thú vị, đáng chú ý mà họ trải qua. Nếu một trải nghiệm \"không đáng để viết thư về nhà\" kể, thì nó chẳng có gì đặc sắc hay đáng nhớ. Cách nói này được ghi nhận phổ biến từ đầu thế kỷ 20, đặc biệt trong thời gian Thế chiến thứ nhất khi thư từ giữa tiền tuyến và gia đình rất phổ biến.",
    examples: [
      { en: "The hotel was clean but nothing to write home about.", vi: "Khách sạn thì sạch sẽ nhưng chẳng có gì đặc biệt để khen ngợi." },
      { en: "We watched the movie last night — it was okay, but not much to write home about.", vi: "Tối qua chúng tôi xem bộ phim đó, cũng tạm ổn, nhưng chẳng có gì đáng để bàn tán." }
    ],
    ex: "The hotel was clean but nothing to write home about.",
  },
  {
    slug: "of-your-dreams",
    term: "of your dreams",
    type: "idiom",
    en: "If something or someone is \"of your dreams\" (for example, the man/woman of your dreams, the house of your dreams), they are exactly what you have always wished for, the ideal or perfect version you have always imagined.",
    vi: "Nếu ai/điều gì đó là \"of your dreams\" (như \"người trong mộng\", \"ngôi nhà mơ ước\"), nghĩa là đó chính là hình mẫu lý tưởng, hoàn hảo mà bạn vẫn luôn mong ước.",
    origin: "Cụm từ này xuất phát từ ý tưởng rằng giấc mơ (dream) là nơi con người hình dung những điều lý tưởng, hoàn hảo nhất mà thực tế khó đạt được trọn vẹn. Khi một điều gì đó ngoài đời thực trùng khớp với hình ảnh lý tưởng ấy, người ta dùng cụm \"of your dreams\" để nhấn mạnh mức độ hoàn hảo, như thể nó bước ra từ chính giấc mơ của mình. Cách diễn đạt này rất phổ biến trong văn hóa đại chúng, phim ảnh và quảng cáo phương Tây.",
    examples: [
      { en: "After years of searching, she finally found the house of her dreams.", vi: "Sau nhiều năm tìm kiếm, cô ấy cuối cùng cũng tìm được ngôi nhà mơ ước của mình." },
      { en: "He always said he wanted to marry the woman of his dreams.", vi: "Anh ấy luôn nói rằng mình muốn cưới người phụ nữ trong mộng của đời mình." }
    ],
    ex: "After years of searching, she finally found the house of her dreams.",
  },
  {
    slug: "an-old-flame",
    term: "an old flame",
    type: "idiom",
    en: "An old flame is a person you used to have a romantic relationship with in the past.",
    vi: "\"An old flame\" là người yêu cũ, một người mà bạn từng có mối quan hệ tình cảm lãng mạn trong quá khứ.",
    origin: "Cụm từ này dùng hình ảnh ngọn lửa (flame) như biểu tượng cổ điển cho tình yêu và đam mê cháy bỏng, một ẩn dụ đã xuất hiện trong văn học tiếng Anh từ nhiều thế kỷ trước. \"Old flame\" gợi đến một ngọn lửa tình yêu từng bùng cháy trong quá khứ nhưng nay đã lụi tàn hoặc chỉ còn âm ỉ trong ký ức, dùng để chỉ người yêu cũ mà ta từng có tình cảm sâu đậm.",
    examples: [
      { en: "She bumped into an old flame at the reunion and they talked for hours.", vi: "Cô ấy tình cờ gặp lại người yêu cũ tại buổi họp lớp và họ đã trò chuyện suốt mấy tiếng đồng hồ." },
      { en: "He still keeps in touch with an old flame from college.", vi: "Anh ấy vẫn giữ liên lạc với một người yêu cũ thời đại học." }
    ],
    ex: "She bumped into an old flame at the reunion and they talked for hours.",
  },
  {
    slug: "not-a-patch-on-someone-something",
    term: "not a patch on someone/something",
    type: "idiom",
    en: "If one thing is not a patch on another, it is much worse or far inferior in comparison.",
    vi: "Nếu điều gì đó \"not a patch on\" điều khác, nghĩa là nó kém xa, không thể sánh bằng so với cái còn lại.",
    origin: "Cụm từ tiếng Anh-Anh này có nguồn gốc chưa hoàn toàn thống nhất, nhưng một cách giải thích phổ biến liên hệ đến hình ảnh miếng vá (patch) trên quần áo, một miếng vá nhỏ, thô sơ không thể sánh với chất lượng của tấm vải nguyên bản. Từ đó, cụm từ mang nghĩa bóng chỉ sự thua kém rõ rệt khi so sánh hai thứ với nhau, thường dùng trong văn nói thân mật.",
    examples: [
      { en: "This new café is nice, but it's not a patch on the one near my old house.", vi: "Quán cà phê mới này cũng được, nhưng chẳng thể sánh bằng quán gần nhà cũ của tôi." },
      { en: "His latest film is not a patch on his earlier work.", vi: "Bộ phim mới nhất của anh ấy kém xa so với những tác phẩm trước đây." }
    ],
    ex: "This new café is nice, but it's not a patch on the one near my old house.",
  },
  {
    slug: "a-saving-grace",
    term: "a saving grace",
    type: "idiom",
    en: "A saving grace is a single good quality or feature that makes something or someone acceptable despite having many faults or being generally bad.",
    vi: "\"A saving grace\" là một điểm tốt duy nhất giúp cứu vãn, khiến điều gì đó hay ai đó vẫn được coi là chấp nhận được dù nhìn chung có nhiều khuyết điểm.",
    origin: "Cụm từ này có gốc rễ tôn giáo, xuất phát từ khái niệm \"ân sủng cứu rỗi\" (saving grace) trong Kitô giáo, chỉ ân sủng của Chúa có thể cứu rỗi một linh hồn tội lỗi khỏi sự trừng phạt. Theo thời gian, nghĩa tôn giáo này được mở rộng sang đời sống thường ngày, chỉ một yếu tố tích cực duy nhất đủ sức \"cứu vãn\" một tình huống, sự vật hay con người vốn có nhiều điểm chưa tốt.",
    examples: [
      { en: "The plot was weak, but the saving grace of the movie was its stunning visuals.", vi: "Cốt truyện thì yếu, nhưng điểm cứu vãn cho bộ phim chính là phần hình ảnh tuyệt đẹp." },
      { en: "His only saving grace as a manager is that he always listens to his staff.", vi: "Điểm cứu vãn duy nhất của anh ấy khi làm quản lý là luôn lắng nghe nhân viên." }
    ],
    ex: "The plot was weak, but the saving grace of the movie was its stunning visuals.",
  },
  {
    slug: "there-are-plenty-more-fish-in-the-sea-or-there-are-other-fish-in-the-sea",
    term: "there are plenty more fish in the sea or there are other fish in the sea",
    type: "idiom",
    en: "This saying is used to comfort someone after a romantic breakup, meaning that there are many other potential partners out there and they should not despair over losing one.",
    vi: "Câu nói này dùng để an ủi ai đó sau khi chia tay, với ý nghĩa rằng ngoài kia vẫn còn rất nhiều người khác, không nên quá buồn vì đã mất đi một người.",
    origin: "Cụm từ này bắt nguồn từ hình ảnh đại dương bao la với vô số loài cá, ngụ ý rằng luôn còn nhiều lựa chọn khác tồn tại, giống như việc đánh cá, mất một con cá không có nghĩa là hết cá để bắt. Cách nói này đã xuất hiện trong tiếng Anh từ khoảng thế kỷ 16-17 và dần trở thành một câu an ủi kinh điển trong chuyện tình cảm.",
    examples: [
      { en: "Don't be so upset about the breakup — there are plenty more fish in the sea.", vi: "Đừng buồn quá về chuyện chia tay, ngoài kia vẫn còn nhiều người khác mà." },
      { en: "She told her friend that there are other fish in the sea and he'll find someone better.", vi: "Cô ấy nói với bạn mình rằng vẫn còn nhiều cơ hội khác và anh ấy sẽ tìm được người tốt hơn." }
    ],
    ex: "Don't be so upset about the breakup — there are plenty more fish in the sea.",
  },
  {
    slug: "think-the-world-of-someone",
    term: "think the world of someone",
    type: "idiom",
    en: "If you think the world of someone, you admire and love them very much, holding them in extremely high regard.",
    vi: "Nếu bạn \"think the world of\" ai đó, nghĩa là bạn vô cùng yêu quý, ngưỡng mộ và trân trọng người đó.",
    origin: "Cụm từ này dùng hình ảnh \"cả thế giới\" (the world) như một đại lượng lớn lao, tượng trưng cho giá trị tối đa mà một người có thể dành cho ai đó. Khi ai đó \"nghĩ cả thế giới\" về một người, nghĩa là họ coi người ấy quan trọng như cả một thế giới đối với mình. Cách diễn đạt phóng đại này đã phổ biến trong tiếng Anh từ thế kỷ 19.",
    examples: [
      { en: "Her students think the world of her because she always takes time to help them.", vi: "Học sinh của cô ấy rất quý mến cô vì cô luôn dành thời gian giúp đỡ họ." },
      { en: "I think the world of my grandparents; they raised me when my parents were away.", vi: "Tôi vô cùng yêu quý ông bà mình; ông bà đã nuôi nấng tôi khi bố mẹ đi vắng." }
    ],
    ex: "Her students think the world of her because she always takes time to help them.",
  },
  {
    slug: "you-have-to-be-cruel-to-be-kind",
    term: "you have to be cruel to be kind",
    type: "idiom",
    en: "This saying means that sometimes you must do or say something harsh or unpleasant to someone in the short term because it will ultimately benefit them in the long run.",
    vi: "Câu nói này có nghĩa là đôi khi bạn phải làm hoặc nói điều gì đó có vẻ tàn nhẫn, khó nghe với ai đó trong ngắn hạn, vì về lâu dài điều đó sẽ có lợi cho họ.",
    origin: "Cụm từ này được cho là bắt nguồn từ vở kịch \"Hamlet\" của Shakespeare, trong đó nhân vật chính nói câu tương tự \"I must be cruel, only to be kind\" khi nói về việc phải đối xử nghiêm khắc với mẹ mình vì lợi ích của bà. Ý tưởng cốt lõi là đôi khi lòng tốt thật sự đòi hỏi sự thẳng thắn hoặc nghiêm khắc, thay vì chiều lòng tạm thời. Câu nói này về sau được phổ biến hơn qua nhiều bài hát và văn hóa đại chúng thế kỷ 20.",
    examples: [
      { en: "I had to tell him his business idea wouldn't work — you have to be cruel to be kind.", vi: "Tôi đã phải nói với anh ấy rằng ý tưởng kinh doanh đó sẽ không thành công, đôi khi phải thẳng thắn thì mới thực sự tốt cho người ta." },
      { en: "The coach pushed her hard in training, believing you have to be cruel to be kind.", vi: "Huấn luyện viên đã thúc ép cô ấy rất nhiều trong luyện tập, vì tin rằng đôi khi nghiêm khắc chính là cách thể hiện sự quan tâm thật sự." }
    ],
    ex: "I had to tell him his business idea wouldn't work — you have to be cruel to be kind.",
  }
  ],
  "happiness-and-sadness": [
  {
    slug: "break-someone-s-heart",
    term: "break someone's heart",
    type: "idiom",
    en: "If something breaks someone's heart, it makes them feel intense sadness or grief, often because of a loss, disappointment, or the end of a romantic relationship.",
    vi: "Nếu điều gì đó \"làm tan nát trái tim\" ai đó, nó khiến người đó cảm thấy đau khổ, buồn bã tột cùng, thường là vì mất mát, thất vọng hoặc chia tay trong tình yêu.",
    origin: "Trái tim từ lâu đã được xem là biểu tượng của cảm xúc, đặc biệt là tình yêu và nỗi đau, trong nhiều nền văn hóa, nên việc ví nỗi đau tinh thần sâu sắc như trái tim \"vỡ tan\" là một hình ảnh ẩn dụ rất tự nhiên và cổ xưa. Trong tiếng Anh, cách nói này đã xuất hiện từ ít nhất thế kỷ 16, kể cả trong các tác phẩm của Shakespeare, và vẫn là một trong những thành ngữ về trái tim phổ biến nhất. Nguồn gốc của nó không gắn với một sự kiện cụ thể nào mà hình thành tự nhiên từ xu hướng dùng \"trái tim\" để nói về cảm xúc nói chung.",
    examples: [
      { en: "It broke her heart when her best friend moved abroad without saying goodbye.", vi: "Cô ấy đau lòng khi người bạn thân nhất chuyển ra nước ngoài mà không nói lời tạm biệt." },
      { en: "Seeing the old dog left alone in the shelter broke my heart.", vi: "Nhìn thấy con chó già bị bỏ lại một mình trong trại cứu hộ khiến tôi đau lòng." }
    ],
    ex: "It broke her heart when her best friend moved abroad without saying goodbye.",
  },
  {
    slug: "down-in-the-dumps-or-in-the-dumps",
    term: "down in the dumps or in the dumps",
    type: "idiom",
    en: "If you are down in the dumps, you feel sad, low, or gloomy, usually for a period of time rather than just a moment.",
    vi: "Nếu bạn \"down in the dumps\", nghĩa là bạn đang cảm thấy buồn bã, chán nản, tinh thần sa sút, thường kéo dài một thời gian chứ không chỉ thoáng qua.",
    origin: "Từ \"dump\" trong tiếng Anh cổ từng mang nghĩa là trạng thái u sầu, suy nghĩ mông lung, có từ khoảng thế kỷ 16, tức là trước cả khi từ này mang nghĩa \"bãi rác\" như ngày nay. Một số nhà nghiên cứu ngôn ngữ cho rằng gốc của \"dump\" liên quan đến một từ tiếng Hà Lan hoặc Đức chỉ sương mù, tượng trưng cho tâm trí bị bao phủ bởi u ám, nhưng nguồn gốc chính xác vẫn còn gây tranh cãi. Theo thời gian, cụm \"the dumps\" chỉ còn tồn tại trong thành ngữ cố định này dù nghĩa thông thường của \"dump\" đã chuyển sang \"rác\", nên nếu hiểu theo nghĩa đen thì cụm từ nghe khá kỳ lạ.",
    examples: [
      { en: "He's been down in the dumps ever since he failed his driving test.", vi: "Anh ấy cứ buồn rầu mãi từ khi trượt bài thi lái xe." },
      { en: "Don't worry if you're feeling in the dumps today — tomorrow will be better.", vi: "Đừng lo nếu hôm nay bạn thấy chán nản — ngày mai sẽ tốt hơn thôi." }
    ],
    ex: "He's been down in the dumps ever since he failed his driving test.",
  },
  {
    slug: "full-of-beans",
    term: "full of beans",
    type: "idiom",
    en: "If someone is full of beans, they are lively, energetic, and enthusiastic, often more so than usual.",
    vi: "Nếu ai đó \"full of beans\", nghĩa là người đó tràn đầy năng lượng, hăng hái và sôi nổi, thường là hơn bình thường.",
    origin: "Một cách giải thích phổ biến cho rằng thành ngữ này bắt nguồn từ việc cho ngựa ăn đậu: người ta tin rằng đậu giúp ngựa làm việc có thêm sức lực và sự hăng hái, nên một con ngựa sung sức được gọi là \"full of beans\". Từ đó, cách nói này lan sang để miêu tả những người tràn đầy năng lượng và tinh thần phấn khích nói chung. Giống như nhiều câu chuyện dân gian liên quan đến ngựa, lời giải thích này được lưu truyền rộng rãi nhưng chưa được xác nhận đầy đủ bằng tư liệu, nên chỉ nên xem là một giả thuyết hợp lý chứ không phải sự thật chắc chắn.",
    examples: [
      { en: "The kids were full of beans after eating so much candy at the party.", vi: "Bọn trẻ hăng hái, chạy nhảy khắp nơi sau khi ăn quá nhiều kẹo ở bữa tiệc." },
      { en: "Grandpa is eighty but still full of beans every morning.", vi: "Ông đã tám mươi tuổi rồi mà sáng nào cũng tràn đầy năng lượng." }
    ],
    ex: "The kids were full of beans after eating so much candy at the party.",
  },
  {
    slug: "get-a-kick-out-of-something",
    term: "get a kick out of something",
    type: "idiom",
    en: "If you get a kick out of something, you feel a strong sense of pleasure, excitement, or enjoyment from doing or experiencing it.",
    vi: "Nếu bạn \"get a kick out of\" điều gì đó, nghĩa là bạn cảm thấy rất thích thú, hào hứng hoặc vui sướng khi làm hay trải nghiệm điều đó.",
    origin: "Thành ngữ này dùng \"kick\" theo nghĩa lóng chỉ một cảm giác hưng phấn, giật mình thích thú đột ngột, cách dùng phổ biến trong tiếng lóng Anh vào cuối thế kỷ 19, đầu thế kỷ 20, thường gắn với cảm giác do rượu hay chất kích thích mang lại. Theo thời gian, từ này được mở rộng để chỉ bất kỳ cảm giác hưng phấn, thích thú mạnh mẽ nào, không chỉ từ rượu, và kết hợp với cấu trúc \"get... out of\" để tạo thành thành ngữ cố định nói về việc tận hưởng niềm vui từ một hoạt động.",
    examples: [
      { en: "My dad really gets a kick out of solving crossword puzzles every morning.", vi: "Bố tôi thực sự rất thích thú khi giải ô chữ mỗi sáng." },
      { en: "She gets a kick out of surprising her friends with silly pranks.", vi: "Cô ấy rất khoái trò chơi khăm bạn bè cho vui." }
    ],
    ex: "My dad really gets a kick out of solving crossword puzzles every morning.",
  },
  {
    slug: "get-on-top-of-you",
    term: "get on top of you",
    type: "idiom",
    en: "If something gets on top of you, it becomes so overwhelming or stressful that you feel you can no longer cope with it easily.",
    vi: "Nếu điều gì đó \"gets on top of you\", nghĩa là nó trở nên quá tải, quá áp lực khiến bạn cảm thấy không còn kiểm soát hay xoay xở nổi nữa.",
    origin: "Thành ngữ này dựa trên hình ảnh vật lý của một thứ gì đó thực sự đè lên trên người, ghì chặt khiến người ta không thể cử động tự do — một ẩn dụ tự nhiên cho cảm giác bị đè bẹp bởi áp lực hay khó khăn. Nó có họ hàng gần với các cách nói khác trong tiếng Anh dùng hình ảnh sức nặng hay độ cao để diễn tả gánh nặng cảm xúc, như \"weighed down\" (bị đè nặng) hay \"under pressure\" (dưới áp lực). Không có một sự kiện cụ thể nào được ghi nhận là nguồn gốc; thành ngữ này hình thành tự nhiên từ nhóm ẩn dụ về sức nặng và áp lực rất phổ biến trong tiếng Anh.",
    examples: [
      { en: "The workload really got on top of him during exam season, and he couldn't sleep properly.", vi: "Khối lượng công việc thực sự khiến anh ấy quá tải trong mùa thi, đến mức không ngủ ngon được." },
      { en: "Try to ask for help before everything gets on top of you.", vi: "Hãy cố gắng nhờ giúp đỡ trước khi mọi thứ trở nên quá sức với bạn." }
    ],
    ex: "The workload really got on top of him during exam season, and he couldn't sleep properly.",
  },
  {
    slug: "have-a-whale-of-a-time",
    term: "have a whale of a time",
    type: "idiom",
    en: "If you have a whale of a time, you enjoy yourself enormously and have a wonderful, exciting experience.",
    vi: "Nếu bạn \"have a whale of a time\", nghĩa là bạn chơi vui cực kỳ, có một khoảng thời gian tuyệt vời và đáng nhớ.",
    origin: "Trong tiếng Anh, \"whale\" (cá voi) từ lâu đã được dùng theo nghĩa lóng để chỉ điều gì đó to lớn, ấn tượng, như trong cụm \"a whale of a difference\" (khác biệt rất lớn), đơn giản vì cá voi là loài động vật lớn nhất mà hầu hết mọi người có thể hình dung. Khi gắn ý nghĩa \"to lớn\" này với \"a time\" (khoảng thời gian), thành ngữ tạo ra nghĩa một trải nghiệm cực kỳ vui vẻ — nói cách khác là một lượng niềm vui khổng lồ chứ không phải bình thường. Cách nói này trở nên phổ biến trong tiếng Anh-Mỹ thông tục vào đầu thế kỷ 20 rồi sau đó lan sang tiếng Anh-Anh.",
    examples: [
      { en: "The children had a whale of a time at the amusement park all afternoon.", vi: "Bọn trẻ đã chơi cực kỳ vui ở công viên giải trí suốt cả buổi chiều." },
      { en: "We had a whale of a time at the reunion, catching up with old classmates.", vi: "Chúng tôi đã có một buổi họp lớp cực kỳ vui vẻ, được trò chuyện với bạn học cũ." }
    ],
    ex: "The children had a whale of a time at the amusement park all afternoon.",
  },
  {
    slug: "a-long-face",
    term: "a long face",
    type: "idiom",
    en: "If someone has a long face, their expression shows that they are sad, disappointed, or unhappy about something.",
    vi: "Nếu ai đó \"có một gương mặt dài\", nghĩa là vẻ mặt của họ cho thấy họ đang buồn bã, thất vọng hoặc không vui về điều gì đó.",
    origin: "Ý tưởng đằng sau thành ngữ này là khi con người buồn bã hay chán nản, các cơ trên mặt thường chùng xuống, khiến khuôn mặt trông dài hơn và ủ rũ hơn so với vẻ mặt bình thường hay tươi cười. Quan sát trực quan về biểu cảm khuôn mặt này đã trở thành một cách nói ẩn dụ cố định trong tiếng Anh, được ghi nhận từ ít nhất thế kỷ 18. Đây là một thành ngữ đơn giản, chuyển nghĩa trực tiếp từ hình ảnh thực tế sang biểu cảm cảm xúc, chứ không gắn với một sự kiện lịch sử cụ thể nào.",
    examples: [
      { en: "Why the long face? Did something bad happen at work?", vi: "Sao mặt mày buồn thế? Có chuyện gì xảy ra ở chỗ làm à?" },
      { en: "He walked in with a long face after hearing the exam results.", vi: "Anh ấy bước vào với vẻ mặt buồn rười rượi sau khi nghe kết quả thi." }
    ],
    ex: "Why the long face? Did something bad happen at work?",
  },
  {
    slug: "look-on-the-bright-side",
    term: "look on the bright side",
    type: "idiom",
    en: "If you look on the bright side, you choose to focus on the positive or hopeful aspects of a difficult situation rather than the negative ones.",
    vi: "Nếu bạn \"nhìn vào mặt tươi sáng\" của vấn đề, nghĩa là bạn chọn tập trung vào khía cạnh tích cực, lạc quan của một tình huống khó khăn thay vì phần tiêu cực.",
    origin: "Thành ngữ này dựa vào ẩn dụ quen thuộc trong đó ánh sáng tượng trưng cho hy vọng và điều tốt đẹp, còn bóng tối tượng trưng cho nỗi buồn hay điều không may, một sự tương phản xuất hiện xuyên suốt trong ngôn ngữ ẩn dụ tiếng Anh (so sánh với \"a ray of hope\" - tia hy vọng, hay \"a dark day\" - ngày đen tối). \"Mặt tươi sáng\" tượng trưng cho cách nhìn lạc quan hơn về một tình huống, đối lập với mặt \"tối\" hay tiêu cực của nó. Cụm từ này trở nên đặc biệt phổ biến vào thế kỷ 20, được củng cố qua các câu nói và bài hát khuyến khích sự lạc quan trong nghịch cảnh.",
    examples: [
      { en: "I know you lost your job, but try to look on the bright side — now you have time to learn new skills.", vi: "Tớ biết cậu vừa mất việc, nhưng hãy cố nhìn vào mặt tích cực — giờ cậu có thời gian học kỹ năng mới rồi." },
      { en: "Even during the storm, she looked on the bright side and said at least the garden would get watered.", vi: "Ngay cả trong cơn bão, cô ấy vẫn lạc quan và nói ít nhất khu vườn cũng được tưới nước." }
    ],
    ex: "I know you lost your job, but try to look on the bright side — now you have time to learn new skills.",
  },
  {
    slug: "make-someone-s-day",
    term: "make someone's day",
    type: "idiom",
    en: "If something makes someone's day, it brings them so much joy or satisfaction that it turns an ordinary day into a particularly happy one.",
    vi: "Nếu điều gì đó \"make someone's day\", nghĩa là nó mang lại niềm vui hoặc sự hài lòng lớn đến mức khiến cả ngày hôm đó trở nên đặc biệt vui vẻ.",
    origin: "Thành ngữ này xem \"một ngày\" như thể có thể được \"tạo nên\" hay hoàn thiện bởi một sự kiện đặc biệt tốt đẹp, như thể mọi việc khác trong ngày chỉ là nền cho khoảnh khắc nổi bật ấy. Cụm từ này được biết đến rộng rãi hơn một phần nhờ câu thoại nổi tiếng \"Go ahead, make my day\" trong bộ phim Sudden Impact năm 1983, dù cách diễn đạt sự biết ơn tương tự đã tồn tại trong tiếng Anh đời thường từ trước đó. Ngày nay thành ngữ được dùng với sắc thái ấm áp, chân thành, khác hẳn với sắc thái đầy thách thức trong câu thoại phim đó.",
    examples: [
      { en: "Thank you for the card, it really made my day!", vi: "Cảm ơn cậu vì tấm thiệp, nó thực sự làm ngày hôm nay của tớ trở nên tuyệt vời!" },
      { en: "Seeing my old friend show up unannounced made my day.", vi: "Việc thấy người bạn cũ của tôi xuất hiện bất ngờ đã làm ngày hôm đó của tôi thật tuyệt vời." }
    ],
    ex: "Thank you for the card, it really made my day!",
  },
  {
    slug: "not-a-happy-bunny",
    term: "not a happy bunny",
    type: "idiom",
    en: "If someone is not a happy bunny, they are annoyed, displeased, or in a bad mood about something.",
    vi: "Nếu ai đó \"not a happy bunny\", nghĩa là người đó đang khó chịu, bực bội hoặc có tâm trạng không vui về chuyện gì đó.",
    origin: "Đây là một thành ngữ tiếng Anh-Anh khá hiện đại và thông tục, được cho là trở nên phổ biến từ cuối thế kỷ 20, dùng từ \"bunny\" (chú thỏ con) theo cách đáng yêu, giảm nhẹ một cách cố ý để miêu tả tâm trạng cáu kỉnh của ai đó — sự dễ thương của \"bunny\" tạo ra sự tương phản nhẹ nhàng, hài hước với tính khí thực sự khó chịu của người đó. Cách nói này thường được dùng với giọng điệu vui đùa, nhẹ nhàng chứ không diễn tả sự tức giận nghiêm trọng. Thời điểm xuất hiện chính xác của cụm từ không được ghi chép rõ ràng, điều thường thấy ở nhiều thành ngữ hiện đại, thông tục.",
    examples: [
      { en: "The manager was not a happy bunny when the delivery arrived three hours late.", vi: "Sếp thực sự không vui chút nào khi hàng giao muộn tới ba tiếng." },
      { en: "She's not a happy bunny today — her flight got cancelled.", vi: "Hôm nay cô ấy đang bực mình lắm — chuyến bay của cô ấy bị hủy." }
    ],
    ex: "The manager was not a happy bunny when the delivery arrived three hours late.",
  },
  {
    slug: "on-top-of-the-world",
    term: "on top of the world",
    type: "idiom",
    en: "If you feel on top of the world, you feel extremely happy, successful, and full of confidence.",
    vi: "Nếu bạn cảm thấy \"on top of the world\", nghĩa là bạn cảm thấy cực kỳ hạnh phúc, thành công và tràn đầy tự tin.",
    origin: "Thành ngữ này dùng hình ảnh vật lý của việc đứng ở điểm cao nhất có thể — nghĩa đen là trên toàn bộ thế giới — như một ẩn dụ cho việc đạt tới trạng thái hạnh phúc hay thành tựu cao nhất, tương tự các ẩn dụ \"cao là tốt\" khác trong tiếng Anh như \"flying high\" hay \"riding high\". Cụm từ trở nên đặc biệt phổ biến qua các bài hát và bộ phim Mỹ thế kỷ 20 sử dụng hình ảnh đứng trên đỉnh thế giới để diễn tả niềm vui chiến thắng. Đây vẫn là một trong những thành ngữ tiếng Anh phổ biến nhất để diễn tả đỉnh điểm của hạnh phúc.",
    examples: [
      { en: "After winning the championship, the whole team felt on top of the world.", vi: "Sau khi vô địch, cả đội cảm thấy vô cùng sung sướng và tự hào." },
      { en: "She's been on top of the world since she got accepted into her dream university.", vi: "Cô ấy đã cực kỳ hạnh phúc từ khi được nhận vào trường đại học mơ ước." }
    ],
    ex: "After winning the championship, the whole team felt on top of the world.",
  },
  {
    slug: "over-the-moon",
    term: "over the moon",
    type: "idiom",
    en: "If you are over the moon, you are extremely happy and delighted about something.",
    vi: "Nếu bạn \"over the moon\", nghĩa là bạn cực kỳ vui sướng, hạnh phúc về điều gì đó.",
    origin: "Nhiều người cho rằng thành ngữ này bắt nguồn từ bài đồng dao cổ \"Hey Diddle Diddle\", trong đó một con bò nhảy qua mặt trăng — một hình ảnh của điều gì đó vui sướng và cao vút đến mức phi thường, dù phải mất khoảng vài thế kỷ để cụm từ này định hình thành nghĩa \"cực kỳ hạnh phúc\" như ngày nay. Nó trở nên đặc biệt phổ biến trong tiếng Anh-Anh từ giữa thế kỷ 20, nhất là trong bình luận thể thao khi miêu tả cầu thủ và người hâm mộ vui sướng. Vì bài đồng dao gốc đã quá cổ xưa, con đường chính xác từ đồng dao đến thành ngữ hiện đại không được ghi chép đầy đủ, nhưng hình ảnh niềm vui bay bổng vẫn là sợi dây liên kết rõ ràng giữa chúng.",
    examples: [
      { en: "I was over the moon when I found out I got the scholarship.", vi: "Tôi đã vui sướng tột độ khi biết mình được học bổng." },
      { en: "Grandma was over the moon to see all her grandchildren together for her birthday.", vi: "Bà đã vui mừng khôn xiết khi thấy tất cả các cháu tụ họp đông đủ vào ngày sinh nhật của bà." }
    ],
    ex: "I was over the moon when I found out I got the scholarship.",
  },
  {
    slug: "a-shoulder-to-cry-on",
    term: "a shoulder to cry on",
    type: "idiom",
    en: "If someone offers you a shoulder to cry on, they give you emotional support and comfort, listening to you and letting you express your sadness, especially during a difficult time.",
    vi: "Nếu ai đó cho bạn \"a shoulder to cry on\", nghĩa là người đó ở bên an ủi, lắng nghe và chia sẻ khi bạn buồn, đặc biệt là trong lúc khó khăn.",
    origin: "Thành ngữ này xuất phát từ sự an ủi rất thực tế, khi một người tựa đầu vào vai người khác để khóc — một cử chỉ tự nhiên, phổ biến ở mọi nền văn hóa, thể hiện sự gần gũi và tìm kiếm chỗ dựa từ người khác lúc đau buồn. Theo thời gian, cử chỉ mang tính vật lý này chuyển thành một cách nói ẩn dụ chỉ sự hỗ trợ tinh thần và sự sẵn lòng lắng nghe nói chung, không chỉ giới hạn ở việc khóc thật sự. Đây là một ẩn dụ đơn giản, dễ hiểu, không gắn với một sự kiện lịch sử cụ thể nào.",
    examples: [
      { en: "Whenever I'm going through a hard time, my sister is always a shoulder to cry on.", vi: "Bất cứ khi nào tôi gặp khó khăn, chị gái tôi luôn ở bên an ủi, lắng nghe tôi." },
      { en: "After the breakup, his best friend offered a shoulder to cry on every evening.", vi: "Sau khi chia tay, người bạn thân nhất luôn ở bên an ủi anh ấy mỗi tối." }
    ],
    ex: "Whenever I'm going through a hard time, my sister is always a shoulder to cry on.",
  }
  ],
  "health-illness-and-death": [
  {
    slug: "alive-and-kicking",
    term: "alive and kicking",
    type: "idiom",
    en: "If someone or something is alive and kicking, they are still living, active, or functioning well, often when people might have assumed otherwise.",
    vi: "Vẫn còn sống khỏe, vẫn hoạt động tốt, thường dùng để trấn an rằng ai đó hay điều gì đó chưa hề biến mất hoặc suy tàn như người ta tưởng.",
    origin: "Nguồn gốc chính xác không rõ ràng, nhưng một cách giải thích phổ biến gắn liền với những người bán cá ngoài chợ, họ thường rao rằng cá của mình còn \"alive, alive-o\" (còn sống) để chứng minh độ tươi. Từ \"kicking\" (đang giãy) được thêm vào để nhấn mạnh sự sống động, sau đó cụm từ được mở rộng nghĩa bóng sang con người, tổ chức hay truyền thống vẫn còn tồn tại và phát triển.",
    examples: [
      { en: "People thought the old bookshop had closed down, but it's still alive and kicking on the corner of the street.", vi: "Mọi người tưởng hiệu sách cũ đã đóng cửa, nhưng nó vẫn hoạt động tốt ở góc phố đó." },
      { en: "After the surgery, doctors weren't sure how he'd recover, but a year later he's alive and kicking.", vi: "Sau ca phẫu thuật, các bác sĩ không chắc anh ấy sẽ hồi phục ra sao, nhưng một năm sau anh ấy vẫn khỏe mạnh bình thường." }
    ],
    ex: "People thought the old bookshop had closed down, but it's still alive and kicking on the corner of the street.",
  },
  {
    slug: "at-death-s-door",
    term: "at death's door",
    type: "idiom",
    en: "If someone is at death's door, they are extremely ill or so close to dying that their life is seriously at risk.",
    vi: "Đang trong tình trạng nguy kịch, cận kề cái chết vì bệnh nặng hoặc chấn thương nghiêm trọng.",
    origin: "Cụm từ này bắt nguồn từ hình ảnh ẩn dụ coi cái chết như một cánh cửa hoặc ngưỡng cửa mà con người sắp bước qua, một hình ảnh xuất hiện nhiều trong văn học và tôn giáo phương Tây từ rất lâu đời. \"Door\" (cánh cửa) tượng trưng cho ranh giới giữa sự sống và cái chết, và đứng \"ở cửa\" nghĩa là chỉ còn cách ranh giới đó một bước rất ngắn.",
    examples: [
      { en: "When he caught pneumonia last winter, he was at death's door for almost a week.", vi: "Khi bị viêm phổi vào mùa đông năm ngoái, anh ấy đã cận kề cái chết gần cả tuần liền." },
      { en: "The vet said the puppy was at death's door when it arrived, but it has since made a full recovery.", vi: "Bác sĩ thú y nói chú chó con đã nguy kịch cận kề cái chết khi được đưa đến, nhưng sau đó nó đã hồi phục hoàn toàn." }
    ],
    ex: "When he caught pneumonia last winter, he was at death's door for almost a week.",
  },
  {
    slug: "a-clean-bill-of-health",
    term: "a clean bill of health",
    type: "idiom",
    en: "If someone or something is given a clean bill of health, they are officially declared to be in good condition, with no problems found after an examination or inspection.",
    vi: "Được xác nhận là hoàn toàn khỏe mạnh hoặc không có vấn đề gì sau khi được kiểm tra, xét nghiệm hay thanh tra kỹ lưỡng.",
    origin: "Cụm từ này có nguồn gốc từ hàng hải, khi \"bill of health\" là một loại giấy chứng nhận chính thức cấp cho tàu thuyền trước khi cập cảng, xác nhận trên tàu không có dịch bệnh truyền nhiễm. Một tấm \"bill of health\" \"sạch\" (clean) nghĩa là không phát hiện bệnh dịch nào, cho phép tàu được cập bến và giao thương bình thường; từ đó nghĩa bóng mở rộng sang việc kiểm tra sức khỏe con người hay tình trạng của bất kỳ thứ gì.",
    examples: [
      { en: "After the annual check-up, my grandfather was given a clean bill of health by his doctor.", vi: "Sau đợt khám sức khỏe định kỳ, ông tôi được bác sĩ xác nhận là hoàn toàn khỏe mạnh." },
      { en: "The restaurant received a clean bill of health from the food safety inspectors this morning.", vi: "Sáng nay nhà hàng đã được các thanh tra an toàn thực phẩm xác nhận là không có vấn đề gì." }
    ],
    ex: "After the annual check-up, my grandfather was given a clean bill of health by his doctor.",
  },
  {
    slug: "be-dropping-like-flies",
    term: "be dropping like flies",
    type: "idiom",
    en: "If people are dropping like flies, large numbers of them are quickly becoming ill, collapsing, or dying within a short period of time.",
    vi: "Ngã bệnh, gục ngã hoặc chết hàng loạt trong một khoảng thời gian ngắn.",
    origin: "Cụm từ này dựa trên hình ảnh so sánh với việc ruồi chết rất nhanh và hàng loạt, chẳng hạn khi bị xịt thuốc diệt côn trùng hoặc gặp thời tiết lạnh. Hình ảnh sinh động này được dùng để nhấn mạnh quy mô lớn và tốc độ nhanh của việc nhiều người cùng lúc gục ngã hay qua đời, thường mang sắc thái phóng đại, gây ấn tượng mạnh.",
    examples: [
      { en: "During the flu outbreak, employees at the office were dropping like flies.", vi: "Trong đợt bùng phát cúm, nhân viên trong văn phòng ngã bệnh hàng loạt." },
      { en: "In the summer heat, the marathon runners were dropping like flies before they even reached the halfway point.", vi: "Dưới cái nóng mùa hè, các vận động viên chạy marathon gục ngã hàng loạt trước khi kịp chạy được nửa chặng đường." }
    ],
    ex: "During the flu outbreak, employees at the office were dropping like flies.",
  },
  {
    slug: "end-it-all",
    term: "end it all",
    type: "idiom",
    en: "If someone ends it all, they take their own life, usually as a way of escaping unbearable suffering or difficulty.",
    vi: "Tự kết liễu đời mình, thường là để thoát khỏi những đau khổ hoặc khó khăn tưởng như không thể chịu đựng nổi.",
    origin: "Đây là một cách nói giảm nói tránh (euphemism), trong đó \"it all\" ám chỉ toàn bộ gánh nặng, khó khăn hay đau khổ của cuộc sống. Cách diễn đạt gián tiếp này giúp người nói đề cập đến việc tự tử một cách nhẹ nhàng và ít trực diện hơn so với việc gọi thẳng tên hành động đó.",
    examples: [
      { en: "The support hotline exists for anyone who feels so overwhelmed that they are thinking of ending it all.", vi: "Đường dây hỗ trợ tồn tại dành cho bất kỳ ai cảm thấy quá tuyệt vọng đến mức nghĩ đến việc tự kết liễu đời mình." },
      { en: "His family never suspected he was in such despair that he might end it all.", vi: "Gia đình anh ấy chưa bao giờ nghĩ rằng anh tuyệt vọng đến mức có thể tự kết liễu đời mình." }
    ],
    ex: "The support hotline exists for anyone who feels so overwhelmed that they are thinking of ending it all.",
  },
  {
    slug: "be-fighting-for-your-life",
    term: "be fighting for your life",
    type: "idiom",
    en: "If someone is fighting for their life, they are in a critical medical condition and their survival is seriously in doubt as doctors try to save them.",
    vi: "Đang trong tình trạng nguy kịch, các bác sĩ phải nỗ lực hết sức để giữ mạng sống cho người đó.",
    origin: "Cụm từ dùng hình ảnh ẩn dụ về một trận chiến, trong đó cơ thể người bệnh cùng đội ngũ y tế phải \"chiến đấu\" chống lại bệnh tật hay thương tích để giành lại sự sống. Cách nói này nhấn mạnh tính chất căng thẳng, quyết liệt của tình huống, giống như một cuộc đấu tranh sinh tử thực sự.",
    examples: [
      { en: "After the car crash, the driver was rushed to hospital fighting for his life.", vi: "Sau vụ tai nạn xe hơi, người lái xe được đưa vào bệnh viện trong tình trạng nguy kịch." },
      { en: "The newborn was fighting for her life in intensive care for the first few weeks.", vi: "Đứa trẻ sơ sinh đã phải giành giật sự sống trong phòng chăm sóc đặc biệt suốt những tuần đầu tiên." }
    ],
    ex: "After the car crash, the driver was rushed to hospital fighting for his life.",
  },
  {
    slug: "kick-the-bucket",
    term: "kick the bucket",
    type: "idiom",
    en: "To kick the bucket means to die; it is an informal, and often humorous, way of talking about someone's death.",
    vi: "Chết, ra đi, \"ngỏm\" — cách nói thông tục, đôi khi mang tính hài hước để chỉ việc ai đó qua đời.",
    origin: "Nguồn gốc chính xác của cụm từ này không rõ ràng và có nhiều giả thuyết khác nhau. Một giả thuyết cho rằng trong các lò mổ ngày xưa, con vật bị treo lên một thanh xà gọi là \"bucket\" và giãy đạp trong những giây phút cuối cùng. Một giả thuyết khác lại cho rằng cụm từ liên quan đến hình ảnh một người đứng trên chiếc xô (bucket) rồi đá nó đi. Dù giả thuyết nào đúng, cụm từ đã trở thành cách nói giảm nói tránh quen thuộc về cái chết trong tiếng Anh thông tục.",
    examples: [
      { en: "My old car finally kicked the bucket after fifteen years on the road.", vi: "Chiếc xe cũ của tôi cuối cùng cũng \"chết hẳn\" sau mười lăm năm sử dụng." },
      { en: "He joked that he wanted to see the world before he kicked the bucket.", vi: "Anh ấy đùa rằng muốn đi khắp thế giới trước khi \"về với cát bụi\"." }
    ],
    ex: "My old car finally kicked the bucket after fifteen years on the road.",
  },
  {
    slug: "knock-someone-for-six",
    term: "knock someone for six",
    type: "idiom",
    en: "If something knocks you for six, it shocks or overwhelms you so much, usually because of unexpected bad news or a difficult event, that you struggle to cope for a while.",
    vi: "Khiến ai đó choáng váng, sốc nặng hoặc suy sụp vì một tin tức hay sự việc bất ngờ, khó có thể đối phó ngay được.",
    origin: "Cụm từ này bắt nguồn từ môn cricket của Anh, nơi một cú đánh \"for six\" nghĩa là đánh bóng bay thẳng ra ngoài ranh giới sân mà không chạm đất, ghi được sáu điểm — cú đánh mạnh và ấn tượng nhất có thể. Bị \"knocked for six\" theo nghĩa bóng gợi lên cảm giác bị một cú sốc mạnh đến mức choáng váng, không kịp trở tay, giống như bị một cú đánh cực mạnh trong trận đấu.",
    examples: [
      { en: "The news of the sudden layoffs knocked the whole team for six.", vi: "Tin tức về đợt sa thải bất ngờ khiến cả đội choáng váng." },
      { en: "Losing her job and her house in the same month really knocked her for six.", vi: "Mất việc và mất nhà cùng trong một tháng khiến cô ấy thực sự suy sụp." }
    ],
    ex: "The news of the sudden layoffs knocked the whole team for six.",
  },
  {
    slug: "a-shadow-of-your-former-self",
    term: "a shadow of your former self",
    type: "idiom",
    en: "If someone is a shadow of their former self, they are much weaker, thinner, or less impressive than they used to be, often because of illness, age, or hardship.",
    vi: "Không còn được như trước, yếu đuối, gầy gò hoặc kém phần rực rỡ hơn nhiều so với trước đây, thường do bệnh tật, tuổi tác hoặc khó khăn gây ra.",
    origin: "Cụm từ dùng hình ảnh \"cái bóng\" (shadow) — một hình dạng mờ nhạt, thiếu thực chất so với vật thể gốc tạo ra nó — để ví von với một người đã mất đi phần lớn sức sống, thể lực hay phong độ từng có. Người đó vẫn còn đó về mặt hình thức, nhưng phần \"chất\" bên trong đã hao mòn đi rất nhiều.",
    examples: [
      { en: "After months of chemotherapy, he was a shadow of his former self.", vi: "Sau nhiều tháng hóa trị, trông anh ấy chẳng còn được như xưa nữa." },
      { en: "The once-champion boxer looked like a shadow of his former self in his final fight.", vi: "Võ sĩ từng vô địch giờ trông chẳng còn phong độ như xưa trong trận đấu cuối cùng." }
    ],
    ex: "After months of chemotherapy, he was a shadow of his former self.",
  },
  {
    slug: "skin-and-bone-or-skin-and-bones",
    term: "skin and bone or skin and bones",
    type: "idiom",
    en: "If someone is skin and bone (or skin and bones), they are extremely thin, often because of illness, malnutrition, or exhaustion.",
    vi: "Gầy trơ xương, gầy đến mức chỉ còn da bọc xương, thường do bệnh tật, suy dinh dưỡng hoặc kiệt sức.",
    origin: "Đây là một cách diễn đạt trực tiếp, mô tả một cơ thể gầy đến mức gần như chỉ nhìn thấy rõ khung xương dưới lớp da, hầu như không còn thịt hay mỡ. Cách nói này đã xuất hiện từ lâu trong tiếng Anh và được dùng phổ biến để nhấn mạnh mức độ gầy yếu nghiêm trọng của một người hay con vật.",
    examples: [
      { en: "The rescued dog was skin and bones when the shelter found it.", vi: "Chú chó được cứu chỉ còn da bọc xương khi trạm cứu hộ tìm thấy nó." },
      { en: "After weeks in hospital without much appetite, she had become skin and bone.", vi: "Sau nhiều tuần nằm viện chán ăn, cô ấy đã trở nên gầy trơ xương." }
    ],
    ex: "The rescued dog was skin and bones when the shelter found it.",
  },
  {
    slug: "under-the-weather",
    term: "under the weather",
    type: "idiom",
    en: "If you are under the weather, you feel slightly ill or generally unwell.",
    vi: "Cảm thấy hơi mệt, không được khỏe trong người.",
    origin: "Một cách giải thích thường được nhắc đến là nguồn gốc hàng hải: khi thủy thủ bị say sóng hoặc ốm, họ được đưa xuống dưới boong tàu, tránh khỏi phần lan can hứng thời tiết xấu (\"weather rail\"), do đó có cách nói \"under the weather\". Đây chỉ là một trong số các giả thuyết được lưu truyền và không phải ai cũng đồng ý là chính xác tuyệt đối, nhưng nó vẫn là cách giải thích phổ biến nhất hiện nay.",
    examples: [
      { en: "I think I'll skip the gym today — I'm feeling a bit under the weather.", vi: "Chắc hôm nay tôi sẽ bỏ buổi tập gym, vì thấy hơi mệt trong người." },
      { en: "She's been under the weather since Monday, so she stayed home from school.", vi: "Cô bé thấy không khỏe từ hôm thứ Hai nên đã ở nhà không đến trường." }
    ],
    ex: "I think I'll skip the gym today — I'm feeling a bit under the weather.",
  },
  {
    slug: "a-wake-up-call",
    term: "a wake-up call",
    type: "idiom",
    en: "If something is a wake-up call, it is an event or piece of information that makes people suddenly realize a serious problem exists and that action needs to be taken.",
    vi: "Một sự việc hoặc thông tin khiến người ta đột nhiên nhận ra một vấn đề nghiêm trọng đang tồn tại và cần phải hành động ngay.",
    origin: "Nghĩa đen của \"wake-up call\" là cuộc gọi báo thức mà khách sạn thực hiện để đánh thức khách vào giờ đã hẹn trước. Từ đó, nghĩa bóng mở rộng sang bất kỳ sự kiện nào có tác dụng \"đánh thức\" một người hay một nhóm người khỏi sự chủ quan, thờ ơ, khiến họ nhận thức rõ về một nguy cơ hay vấn đề cần giải quyết, chẳng hạn như một cơn bệnh bất ngờ khiến người ta thay đổi lối sống.",
    examples: [
      { en: "His heart attack at forty was a real wake-up call about his unhealthy diet.", vi: "Cơn đau tim ở tuổi bốn mươi thực sự là một hồi chuông cảnh tỉnh về chế độ ăn uống thiếu lành mạnh của anh ấy." },
      { en: "The factory fire was a wake-up call for the whole industry to review its safety standards.", vi: "Vụ hỏa hoạn ở nhà máy là một hồi chuông cảnh tỉnh cho cả ngành phải xem lại các tiêu chuẩn an toàn." }
    ],
    ex: "His heart attack at forty was a real wake-up call about his unhealthy diet.",
  },
  {
    slug: "the-worse-for-wear",
    term: "the worse for wear",
    type: "idiom",
    en: "If someone or something is the worse for wear, they are in a tired, worn-out, or damaged condition, often after a difficult experience or heavy use, and the phrase can also describe someone who has drunk too much alcohol.",
    vi: "Ở trong tình trạng tồi tệ, mệt mỏi, hao mòn hoặc xuống sắc sau một trải nghiệm khó khăn hay sử dụng nhiều, và cũng có thể dùng để chỉ tình trạng say xỉn.",
    origin: "Cụm từ này ban đầu dùng để mô tả quần áo hay đồ vật bị sờn cũ, hao mòn do sử dụng lâu ngày (\"wear\" nghĩa là sự hao mòn theo thời gian). Sau đó nghĩa được mở rộng sang con người, mô tả vẻ ngoài mệt mỏi, tiều tụy sau một đêm thức khuya, một trận ốm, hay sau khi uống quá nhiều rượu.",
    examples: [
      { en: "He showed up to work looking a bit the worse for wear after the office party.", vi: "Anh ấy đến công ty với vẻ khá phờ phạc sau buổi tiệc của văn phòng." },
      { en: "The old sofa was clearly the worse for wear after years of use by the children.", vi: "Chiếc ghế sofa cũ đã rõ ràng hao mòn xuống cấp sau nhiều năm bọn trẻ sử dụng." }
    ],
    ex: "He showed up to work looking a bit the worse for wear after the office party.",
  }
  ],
};

export function idiomUnitItems(unitSlug: string): IdiomItem[] {
  return IDIOM_UNITS[unitSlug] ?? [];
}

export function idiomItem(unitSlug: string, itemSlug: string): IdiomItem | undefined {
  return IDIOM_UNITS[unitSlug]?.find((it) => it.slug === itemSlug);
}

export function idiomProgressKey(unitSlug: string, itemSlug: string): string {
  return `${unitSlug}::${itemSlug}`;
}

export interface IdiomFlatItem extends IdiomItem {
  unitSlug: string;
  key: string;
}

export function allIdiomItems(): IdiomFlatItem[] {
  const all: IdiomFlatItem[] = [];
  for (const { slug: unitSlug } of UNITS_META) {
    for (const it of IDIOM_UNITS[unitSlug] ?? []) {
      all.push({ ...it, unitSlug, key: idiomProgressKey(unitSlug, it.slug) });
    }
  }
  return all;
}

export const IDIOM_TOTAL_COUNT = Object.values(IDIOM_UNITS).reduce((sum, items) => sum + items.length, 0);
