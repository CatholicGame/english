import type { IntentType } from "./ai-convo-store";

export interface PromptResult {
  systemPrompt: string;
  userMessage: string;
  temperature: number;
  jsonMode?: boolean; // default true, set false for conversation
}

// ─── Topic 1: Collocations & Phrasal Verbs ───────────────────────

function cpvSentenceCheck(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const en = payload.en as string;
  const vi = payload.vi as string;
  const ex = payload.ex as string;
  const sentence = payload.sentence as string;

  return {
    systemPrompt: "You are an English teacher helping a Vietnamese student. Be encouraging. Also identify 2-3 useful words or phrases from your correction/feedback that the student should learn (collocations, phrasal verbs, idioms, or advanced words).",
    userMessage: "Target phrase: \"" + term + "\"\nMeaning: \"" + en + "\" / \"" + vi + "\"\nExample: \"" + ex + "\"\n\nStudent's sentence: \"" + sentence + "\"\n\nEvaluate: correct usage? grammar? naturalness?\n\nRespond in JSON:\n{\n  \"correct\": boolean,\n  \"grammarOk\": boolean,\n  \"naturalOk\": boolean,\n  \"feedback\": \"brief encouraging feedback\",\n  \"correction\": \"corrected sentence or null\",\n  \"tip\": \"quick tip or null\",\n  \"alternative\": \"alternative phrasing or null\",\n  \"keyVocabulary\": [{\"word\": \"useful word or phrase\", \"vi\": \"Vietnamese meaning\"}, ...]\n}",
    temperature: 0.3,
  };
}

function cpvParaphraseGenerate(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const en = payload.en as string;

  return {
    systemPrompt: "You generate simple English sentences for vocabulary practice.",
    userMessage: `Target phrase: "${term}" = "${en}"\n\nGenerate a simple B1-level sentence that CAN be rephrased using the target phrase.\nDO NOT include the target phrase in the generated sentence.\n\nRespond in JSON only:\n{ "original": "sentence without the target phrase", "hint": "one-word hint in English" }`,
    temperature: 0.7,
  };
}

function cpvConversationPreview(payload: Record<string, unknown>): PromptResult {
  const terms = payload.terms as { term: string; en: string }[];
  const phraseList = terms.map((t) => `"${t.term}" = ${t.en}`).join(", ");

  return {
    systemPrompt: "You create sample English conversations for vocabulary practice.",
    userMessage: "Create a short 4-line sample conversation (2 exchanges) where these phrases are used naturally: " + phraseList + ". Label who is speaking. Keep it simple (B1 level). Respond in JSON only: { \"conversation\": [ { \"speaker\": \"A\", \"text\": \"...\" }, ... ] }",
    temperature: 0.7,
    jsonMode: true,
  };
}

function cpvConversationStart(payload: Record<string, unknown>): PromptResult {
  const terms = payload.terms as { term: string; en: string }[];
  const phraseList = terms.map((t) => `"${t.term}" = ${t.en}`).join(", ");
  const history = payload.history as string | undefined;
  const endRequested = payload.end as boolean | undefined;

  // End of conversation: give feedback
  if (endRequested && history) {
    return {
      systemPrompt: "You are an English teacher evaluating a Vietnamese student's conversation practice. You always answer in both English and Vietnamese so the student can check their understanding.",
      userMessage: "The student practiced using: " + phraseList + ". Here is the conversation:\n" + history + "\n\nEvaluate the student's responses. Give feedback on: 1) Correct usage of target phrases 2) Grammar errors 3) Naturalness 4) One tip for improvement. Provide the feedback in English, AND a Vietnamese translation/explanation of that same feedback (natural Vietnamese, not machine-literal) so a learner who doesn't read English well can still understand it. Respond in JSON only: { \"phrasesOk\": boolean, \"grammarIssues\": [\"issue1\",...], \"naturalness\": \"comment\", \"tip\": \"one tip\", \"encouragement\": \"one sentence\", \"vi\": { \"grammarIssues\": [\"same issues explained in Vietnamese, same order\"], \"naturalness\": \"Vietnamese\", \"tip\": \"Vietnamese\", \"encouragement\": \"Vietnamese\" } }",
      temperature: 0.3,
      jsonMode: true,
    };
  }

  // Continuing conversation
  if (history && history.length > 50) {
    return {
      systemPrompt: "You are a friendly English conversation partner. The student is practicing: " + phraseList + ". Keep your response natural, 1-2 sentences. Gently steer the conversation so the student has a chance to use the target phrase. If they go off-topic, naturally redirect with a relevant question — like a real friend would.",
      userMessage: "Continue this conversation naturally:\n" + history,
      temperature: 0.8,
      jsonMode: false,
    };
  }

  // First message: start the conversation
  return {
    systemPrompt: "You are a friendly English conversation partner. The student is practicing: " + phraseList + ". Start a natural conversation with one short sentence. Your message should naturally lead the student to respond using the target phrase.",
    userMessage: "Start a conversation now. Just say one short, natural opening line. Do NOT use the target phrase yourself.",
    temperature: 0.8,
    jsonMode: false,
  };
}

// ─── Topic 2: Listen A Minute ────────────────────────────────────

function lamOpinionFeedback(payload: Record<string, unknown>): PromptResult {
  const topic = payload.topic as string;
  const question = payload.question as string;
  const answer = payload.answer as string;

  return {
    systemPrompt: "You are an English teacher giving feedback on a student's written response to a discussion question.",
    userMessage: `Topic: "${topic}"\nQuestion: "${question}"\nStudent's answer: "${answer}"\n\nEvaluate the student's written English. Respond in JSON only:\n{\n  "grammarScore": number (1-5),\n  "grammarNotes": "brief grammar feedback",\n  "vocabScore": number (1-5),\n  "vocabNotes": "vocabulary suggestions",\n  "contentNotes": "feedback on ideas",\n  "corrected": "fully corrected version",\n  "encouragement": "one encouraging sentence"\n}`,
    temperature: 0.3,
  };
}

function lamDiscussionStart(payload: Record<string, unknown>): PromptResult {
  const topic = payload.topic as string;
  const history = payload.history as string | undefined;

  if (history && history.length > 50) {
    return {
      systemPrompt: "You are a friendly English discussion partner. Keep responses to 1-2 sentences.",
      userMessage: "Topic: " + topic + ". Continue the discussion naturally. History:\n" + history,
      temperature: 0.8,
      jsonMode: false,
    };
  }

  return {
    systemPrompt: "You are a friendly English discussion partner. Start a conversation by asking one question. Keep it simple.",
    userMessage: "Topic: " + topic + ". Ask one open-ended question to start a discussion. Keep it short and friendly.",
    temperature: 0.8,
    jsonMode: false,
  };
}

// ─── Topic 3: Cambridge IELTS Advanced ───────────────────────────

function vocabPoolBlock(payload: Record<string, unknown>, fitClause: string): string {
  const vocabPool = (payload.vocabPool as { term: string; en: string }[] | undefined) ?? [];
  if (!vocabPool.length) return "";
  const list = vocabPool.map((v) => `"${v.term}" (${v.en})`).join(", ");
  return `\n\nThis unit's target vocabulary: ${list}.\nAlso check which of these words the student used (accept natural inflected forms) and suggest 2-3 unused ones with a concrete note on ${fitClause}.`;
}

const VOCAB_JSON_FIELDS =
  ',\n  "usedVocab": ["unit vocabulary word the student actually used, if any — [] if none given or none used"],\n  "vocabSuggestions": [{ "word": "unit vocabulary word not used", "note": "concrete suggestion, or [] if no vocabulary list was given" }]';

function cieltsWritingFeedback(payload: Record<string, unknown>): PromptResult {
  const taskNumber = payload.taskNumber as number;
  const prompt = payload.prompt as string;
  const chartRows = payload.chartRows as string[] | undefined;
  const draft = payload.draft as string;

  const chartInfo = chartRows?.length
    ? `\nChart data:\n${chartRows.map((r) => `- ${r}`).join("\n")}`
    : "";
  const criteriaKey = taskNumber === 1 ? "taskAchievement" : "taskResponse";
  const criteriaLabel = taskNumber === 1 ? "Task Achievement" : "Task Response";
  const vocabBlock = vocabPoolBlock(payload, "where in the essay it could naturally replace a simpler word or phrase");

  return {
    systemPrompt: `You are an IELTS examiner evaluating Writing Task ${taskNumber}. Use official band descriptors (0-9, 0.5 increments). Be fair and constructive.`,
    userMessage: `Task ${taskNumber} prompt: "${prompt}"${chartInfo}\n\nStudent's response:\n"${draft}"${vocabBlock}\n\nEvaluate using official IELTS criteria. Respond in JSON only:\n{\n  "${criteriaKey}": { "band": number, "comment": "feedback on ${criteriaLabel}" },\n  "coherence": { "band": number, "comment": "organization and linking" },\n  "lexicalResource": { "band": number, "comment": "vocabulary range and accuracy" },\n  "grammaticalRange": { "band": number, "comment": "sentence structure and grammar" },\n  "overallBand": number,\n  "corrections": [{ "original": "...", "corrected": "...", "explanation": "..." }],\n  "suggestions": ["tip1", "tip2", "tip3"],\n  "rewrittenParagraph": "improved version of weakest paragraph"${VOCAB_JSON_FIELDS}\n}`,
    temperature: 0.2,
  };
}

function cieltsSpeakingFeedback(payload: Record<string, unknown>): PromptResult {
  const prompt = payload.prompt as string;
  const bullets = payload.bullets as string[];
  const transcript = payload.transcript as string;
  const vocabBlock = vocabPoolBlock(payload, "how it would fit naturally into this specific answer");

  return {
    systemPrompt: "You are an IELTS Speaking examiner evaluating a Part 2 long turn response. Evaluate using IELTS criteria (ignore pronunciation — text only).",
    userMessage: `Cue card: "${prompt}"\nBullet points: ${bullets.join(" | ")}\n\nStudent's response:\n"${transcript}"${vocabBlock}\n\nEvaluate in JSON only:\n{\n  "fluency": { "band": number, "comment": "flow, coherence, discourse markers" },\n  "lexicalResource": { "band": number, "comment": "vocabulary range and precision" },\n  "grammaticalRange": { "band": number, "comment": "sentence variety and accuracy" },\n  "overallBand": number,\n  "strengths": ["...", "..."],\n  "improvements": ["...", "..."],\n  "modelResponse": "a 1-minute model response using this unit's vocabulary"${VOCAB_JSON_FIELDS}\n}`,
    temperature: 0.3,
  };
}

function cieltsVocabSentence(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const pos = payload.pos as string;
  const en = payload.en as string;
  const usageNote = payload.usageNote as string;
  const sentence = payload.sentence as string;

  return {
    systemPrompt: "You are an English teacher evaluating whether a student used an advanced vocabulary word correctly in an academic/IELTS context.",
    userMessage: `Target word: "${term}" (${pos})\nMeaning: "${en}"\nIELTS usage note: "${usageNote}"\n\nStudent's sentence: "${sentence}"\n\nEvaluate:\n1. Is the word used correctly?\n2. Would this work in an IELTS essay?\n3. Is the register appropriate for academic writing?\n\nRespond in JSON only:\n{\n  "correct": boolean,\n  "ieltsReady": boolean,\n  "feedback": "brief feedback",\n  "correction": "corrected sentence or null",\n  "registerTip": "tip about formality/academic tone or null"\n}`,
    temperature: 0.3,
  };
}

// ─── Topic 1 Extended: Translation, Context Quiz, Examples ─────

function cpvTranslateBatch(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const vi = payload.vi as string;

  return {
    systemPrompt: "You are a Vietnamese-English translation exercise generator. Create diverse Vietnamese sentences for practice.",
    userMessage: "The student needs to practice: \"" + term + "\" (meaning: " + vi + "). Generate 5 short Vietnamese sentences (B1 level, varied topics) where the natural English translation would use \"" + term + "\". Respond in JSON: { \"sentences\": [\"Câu 1\", \"Câu 2\", \"Câu 3\", \"Câu 4\", \"Câu 5\"] }",
    temperature: 0.8,
  };
}

function cpvTranslateBatchReview(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const en = payload.en as string;
  const items = payload.items as { vi: string; user: string }[];

  let reviewText = "";
  items.forEach((item, i) => {
    reviewText += (i + 1) + ". VI: \"" + item.vi + "\"\n   User: \"" + (item.user || "(empty)") + "\"\n";
  });

  return {
    systemPrompt: "You are an English teacher reviewing a student's translation exercise. Grade each of the 5 translations. Be encouraging. Point out the best one and the one needing most improvement.",
    userMessage: "Target phrase: \"" + term + "\" = \"" + en + "\"\n\nTranslations:\n" + reviewText + "\nReview each translation. Respond in JSON:\n{\n  \"results\": [\n    { \"ok\": boolean, \"feedback\": \"one sentence feedback\", \"corrected\": \"corrected version or null\" },\n    ...\n  ],\n  \"overall\": \"brief overall comment\",\n  \"best\": number (1-5 index of best),\n  \"needsWork\": number (1-5 index needing most work),\n  \"keyVocabulary\": [{\"word\": \"...\", \"vi\": \"...\"}]\n}",
    temperature: 0.3,
  };
}

// Keep old cpvTranslate for backward compatibility
function cpvTranslate(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const en = payload.en as string;
  const vi = payload.vi as string;
  const vietnamese = payload.vietnamese as string;
  const userTranslation = payload.translation as string;

  return {
    systemPrompt: "You are an English teacher evaluating a Vietnamese→English translation.",
    userMessage: "Target phrase: \"" + term + "\" = \"" + en + "\"\nVietnamese: \"" + vietnamese + "\"\nStudent: \"" + userTranslation + "\"\n\nJSON: { \"translationOk\": boolean, \"feedback\": \"brief\", \"corrected\": \"corrected or null\", \"keyVocabulary\": [{\"word\": \"...\", \"vi\": \"...\"}] }",
    temperature: 0.3,
  };
}

function cpvContextQuiz(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const en = payload.en as string;
  const vi = payload.vi as string;

  return {
    systemPrompt: "You create vocabulary quiz questions for English learners at B1-B2 level.",
    userMessage: `Target phrase: "${term}"\nMeaning: "${en}" (${vi})\n\nGenerate 3 sentences:\n- ONE sentence where the phrase is used CORRECTLY and naturally\n- TWO sentences where the phrase is used INCORRECTLY (wrong meaning, wrong grammar, or wrong context)\n\nRespond in JSON only:\n{\n  "sentences": [\n    { "text": "...", "correct": true },\n    { "text": "...", "correct": false },\n    { "text": "...", "correct": false }\n  ],\n  "explanation": "after user picks, explain why the wrong ones are wrong"\n}`,
    temperature: 0.7,
  };
}

function cpvExampleGen(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const en = payload.en as string;
  const vi = payload.vi as string;
  const count = (payload.count as number) || 4;

  return {
    systemPrompt: "You generate diverse, real-world example sentences for English vocabulary learners.",
    userMessage: `Target phrase: "${term}"\nMeaning: "${en}" (${vi})\n\nGenerate ${count} natural example sentences using this phrase in DIFFERENT contexts (e.g. business, daily life, academic, casual conversation). Each sentence should show a slightly different usage or nuance.\n\nRespond in JSON only:\n{\n  "examples": [\n    { "context": "business", "sentence": "...", "note": "brief context note" },\n    ...\n  ]\n}`,
    temperature: 0.7,
  };
}

// ─── Writing Practice (topic + selected expressions → passage) ──

function cpvWritingPassageGenerate(payload: Record<string, unknown>): PromptResult {
  const pool = payload.pool as { term: string; en: string; vi: string }[];
  const topic = payload.topic as string;
  const wordCount = payload.wordCount as number;
  const phraseList = pool.map((t) => `"${t.term}" (${t.en})`).join(", ");

  return {
    systemPrompt: "You are a Vietnamese writing-exercise generator for English learners. You write natural Vietnamese passages that create situations where some of a given pool of English expressions would naturally be used in translation — without ever writing the English expressions yourself.",
    userMessage: `Topic: "${topic}"\nPool of expressions the student has been practicing (draw from this pool — you do NOT need to use all of them; freely pick whichever handful fit the topic most naturally, prioritizing a passage that reads naturally over forcing more expressions in): ${phraseList}\n\nWrite a natural, coherent Vietnamese passage of about ${wordCount} words about this topic. Pick a natural-fitting subset of the pool and design situations/sentences so that translating them into English would naturally call for each chosen expression's meaning — but do NOT include the English expressions or their literal Vietnamese meaning as a gloss; just write natural Vietnamese prose a student could translate.\n\nRespond in JSON only: { "passage": "the Vietnamese passage", "chosenPhrases": ["exact term strings from the pool that the passage was built around"] }`,
    temperature: 0.8,
  };
}

function cpvWritingReview(payload: Record<string, unknown>): PromptResult {
  const terms = payload.terms as { term: string; en: string; vi: string }[];
  const passage = payload.passage as string;
  const translation = payload.translation as string;
  const phraseList = terms.map((t) => `"${t.term}" (${t.en})`).join(", ");

  return {
    systemPrompt: "You are an English teacher grading a Vietnamese-to-English passage translation. Be encouraging but precise.",
    userMessage: `Target expressions the student was asked to apply: ${phraseList}\n\nOriginal Vietnamese passage:\n"${passage}"\n\nStudent's English translation:\n"${translation}"\n\nSplit the passage and the student's translation into aligned sentence pairs, then grade each pair. Also determine which target expressions the student actually used (accept natural variants, not just exact wording) and which were missed.\n\nRespond in JSON only:\n{\n  "results": [\n    { "vi": "Vietnamese sentence", "user": "student's matching English sentence", "ok": boolean, "feedback": "brief feedback", "corrected": "corrected sentence or null" },\n    ...\n  ],\n  "usedPhrases": ["expressions the student used correctly"],\n  "missedPhrases": ["expressions the student did not use"],\n  "overall": "brief overall comment",\n  "tip": "one tip for improvement"\n}`,
    temperature: 0.3,
  };
}

// ─── Text Lookup (select any text anywhere in the app) ──────────
// Classifies the selection itself: a word/collocation/phrasal verb/idiom is
// treated as vocabulary worth memorizing (Longman-style dictionary entry); an
// ordinary sentence or passage is treated as plain text needing translation.

function textLookup(payload: Record<string, unknown>): PromptResult {
  const word = payload.word as string;
  const context = payload.context as string;

  return {
    systemPrompt:
      "You classify a piece of selected English text for Vietnamese learners, then respond accordingly. " +
      "If it is a single word, collocation, phrasal verb, or idiom (a reusable lexical chunk worth memorizing), treat it as VOCABULARY: write dictionary entries in the concise style of the Longman Dictionary of Contemporary English — each sense is ONE short, precise idea, never a long academic paragraph covering several meanings at once — plus a short, vivid, memorable hook (word origin, a striking mental image, a frequent collocation, or a real-life association) that helps it stick in memory instead of being learned by rote. " +
      "If it is an ordinary sentence, clause, or passage (not a fixed expression), treat it as TEXT: just translate it naturally into Vietnamese — do not force a dictionary breakdown onto full sentences.",
    userMessage:
      `Selected text: "${word}"\nSurrounding context: "${context}"\n\n` +
      "First decide the type:\n" +
      "- \"vocab\": a single word, collocation, phrasal verb, or idiom\n" +
      "- \"translation\": an ordinary sentence, clause, or passage\n\n" +
      "If type is \"vocab\", also classify its category:\n" +
      "- \"word\": a single lexical item (any part of speech)\n" +
      "- \"collocation\": 2+ words that habitually co-occur with a fairly literal, transparent combined meaning (e.g. \"make a decision\", \"heavy rain\")\n" +
      "- \"phrasal_verb\": verb + particle(s) (up/down/away/out/on/off/in/into...), e.g. \"give up\", \"turn away\"\n" +
      "- \"idiom\": a fixed expression whose meaning can't be guessed from the individual words (e.g. \"kick the bucket\", \"under the weather\")\n\n" +
      "If type is \"vocab\", respond in JSON only:\n" +
      "{\n  \"type\": \"vocab\",\n  \"word\": \"the word/phrase\",\n  \"category\": \"word\" | \"collocation\" | \"phrasal_verb\" | \"idiom\",\n  \"ipa\": \"IPA pronunciation\",\n  \"senses\": [\n    { \"pos\": \"noun/verb/adjective/phrasal verb/idiom\", \"vi\": \"short Vietnamese meaning (max ~12 words)\", \"en\": \"short English definition (max ~15 words)\", \"example\": { \"en\": \"example sentence\", \"vi\": \"bản dịch tiếng Việt\" } }\n  ],\n  \"synonyms\": [\"up to 5 synonyms\"],\n  \"memoryTip\": \"1-2 short, vivid Vietnamese sentences with a memorable hook — not a dry grammar note\"\n}\n" +
      "List at most the 3 most common/useful senses, ordered by frequency. Only give an \"example\" for the single sense that best fits the context above; omit it for the others.\n\n" +
      "If type is \"translation\", respond in JSON only:\n" +
      "{\n  \"type\": \"translation\",\n  \"text\": \"the exact selected text\",\n  \"translation\": \"natural, fluent Vietnamese translation\"\n}",
    temperature: 0.4,
  };
}

// ─── Dispatcher ──────────────────────────────────────────────────

export function buildPrompt(
  intent: IntentType,
  payload: Record<string, unknown>,
): PromptResult {
  switch (intent) {
    case "cpv_sentence_check":
      return cpvSentenceCheck(payload);
    case "cpv_paraphrase":
      return cpvParaphraseGenerate(payload);
    case "cpv_conversation":
      return cpvConversationStart(payload);
    case "cpv_conversation_preview":
      return cpvConversationPreview(payload);
    case "cpv_translate":
      return cpvTranslate(payload);
    case "cpv_translate_batch":
      return cpvTranslateBatch(payload);
    case "cpv_translate_batch_review":
      return cpvTranslateBatchReview(payload);
    case "cpv_context_quiz":
      return cpvContextQuiz(payload);
    case "cpv_example_gen":
      return cpvExampleGen(payload);
    case "text_lookup":
      return textLookup(payload);
    case "cpv_writing_passage":
      return cpvWritingPassageGenerate(payload);
    case "cpv_writing_review":
      return cpvWritingReview(payload);
    case "lam_opinion_feedback":
      return lamOpinionFeedback(payload);
    case "lam_discussion":
      return lamDiscussionStart(payload);
    case "cielts_writing_feedback":
      return cieltsWritingFeedback(payload);
    case "cielts_speaking_feedback":
      return cieltsSpeakingFeedback(payload);
    case "cielts_vocab_sentence":
      return cieltsVocabSentence(payload);
    default:
      throw new Error(`Unknown intent: ${intent}`);
  }
}