import type { IntentType } from "./ai-convo-store";

export interface PromptResult {
  systemPrompt: string;
  userMessage: string;
  temperature: number;
  jsonMode?: boolean; // default true, set false for conversation
}

// ─── AI response language ────────────────────────────────────────
// The client stamps every payload with `aiLang` (from the user's Settings
// toggle, default "vi"). Feedback/evaluation prose follows that single
// language instead of generating both EN+VI every time — practice dialogue
// (the conversation/discussion partner's own lines) always stays in English
// regardless of this setting, since that's the point of the exercise.

function aiLangOf(payload: Record<string, unknown>): "vi" | "en" {
  return payload.aiLang === "en" ? "en" : "vi";
}

function feedbackLangNote(payload: Record<string, unknown>): string {
  return aiLangOf(payload) === "en"
    ? " Write all feedback and explanations in English."
    : " Write all feedback and explanations in natural (not literal) Vietnamese — but keep corrected sentences, example sentences, and the target English phrases themselves in English.";
}

// ─── Topic 1: Collocations & Phrasal Verbs ───────────────────────

function cpvSentenceCheck(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const en = payload.en as string;
  const vi = payload.vi as string;
  const ex = payload.ex as string;
  const sentence = payload.sentence as string;

  return {
    systemPrompt: "You are an English teacher helping a Vietnamese student. Be encouraging. Also identify 2-3 useful words or phrases from your correction/feedback that the student should learn (collocations, phrasal verbs, idioms, or advanced words)." + feedbackLangNote(payload),
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
      systemPrompt: "You are an English teacher evaluating a Vietnamese student's conversation practice." + feedbackLangNote(payload) + " You write concise, scannable feedback — short bullets and labeled before/after corrections, never dense paragraphs.",
      userMessage: "The student practiced using: " + phraseList + ". Here is the conversation:\n" + history + "\n\n" +
        "Evaluate the student's responses and break your evaluation into these parts:\n" +
        "1. Per-turn feedback — go through the conversation and, for EVERY \"Student:\" line above, return exactly one entry in \"turns\", in the same order they appear (do not skip any, even if a turn was perfect). For that turn give: a very short comment on that specific reply; a list of 0+ wrong→correct fixes taken verbatim from that reply's own text (empty list if nothing to fix); and a \"betterExample\" — ALWAYS include this, even for a perfect reply — a more natural, richer, or more advanced way a fluent speaker could express that same idea in that moment of the conversation, so the student always has something to level up toward, not just error fixes.\n" +
        "2. Style — 2-4 short, separate bullet observations about overall naturalness, tone, and how well the student used the target phrases (" + phraseList + ") across the whole conversation. Never merge these into one paragraph. If there's a genuinely good moment, put ONE positive callout in \"styleHighlight\" (leave it empty string if nothing stands out).\n" +
        "3. Suggestions — 2-3 categories of useful phrases the student should practice next time, each with 1-3 example phrases.\n" +
        "4. Progress — 1-3 short, encouraging bullet points about how the student did overall, as a closing summary.\n\n" +
        "Respond in JSON only:\n" +
        "{\n" +
        "  \"phrasesOk\": boolean,\n" +
        "  \"turns\": [{ \"comment\": \"short feedback on this one reply, or empty string\", \"corrections\": [{ \"wrong\": \"exact phrase from this reply\", \"correct\": \"corrected phrase\" }], \"betterExample\": \"a stronger way to express the same idea — required on every turn\" }],\n" +
        "  \"style\": [\"short bullet\", ...],\n" +
        "  \"styleHighlight\": \"one positive bullet, or empty string\",\n" +
        "  \"suggestions\": [{ \"category\": \"short category name\", \"phrases\": [\"phrase 1\", \"phrase 2\"] }],\n" +
        "  \"progress\": [\"short bullet\", ...]\n" +
        "}",
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
    systemPrompt: "You are an English teacher giving feedback on a student's written response to a discussion question." + feedbackLangNote(payload),
    userMessage: `Topic: "${topic}"\nQuestion: "${question}"\nStudent's answer: "${answer}"\n\nEvaluate the student's written English. Respond in JSON only:\n{\n  "grammarScore": number (1-5),\n  "grammarNotes": "brief grammar feedback",\n  "vocabScore": number (1-5),\n  "vocabNotes": "vocabulary suggestions",\n  "contentNotes": "feedback on ideas",\n  "corrected": "fully corrected version",\n  "encouragement": "one encouraging sentence"\n}`,
    temperature: 0.3,
  };
}

// Open-ended discussion partner, shared by every AI-practice module (collocations
// /phrasal verbs, Cambridge IELTS advanced, Listen A Minute) — unlike "Converse",
// there's no target phrase to work in; the AI just asks open questions and pushes
// back on the student's opinions about `topic`, then evaluates the whole session.
function discussionChat(payload: Record<string, unknown>): PromptResult {
  const topic = payload.topic as string;
  const history = payload.history as string | undefined;
  const endRequested = payload.end as boolean | undefined;

  // End of discussion: give feedback
  if (endRequested && history) {
    return {
      systemPrompt: "You are an English teacher evaluating a Vietnamese student's open discussion practice." + feedbackLangNote(payload) + " You write concise, scannable feedback — short bullets, never dense paragraphs.",
      userMessage: "The student discussed this topic: " + topic + ". Here is the discussion:\n" + history + "\n\n" +
        "Evaluate the student's responses and break your evaluation into these parts:\n" +
        "1. Per-turn feedback — go through the discussion and, for EVERY \"Student:\" line above, return exactly one entry in \"turns\", in the same order they appear (do not skip any, even if a turn was perfect). For that turn give: a very short comment on that specific reply; a list of 0+ wrong→correct fixes taken verbatim from that reply's own text (empty list if nothing to fix); and a \"betterExample\" — ALWAYS include this, even for a perfect reply — a more natural, richer, or more advanced way a fluent speaker could express that same idea, so the student always has something to level up toward.\n" +
        "2. Style — 2-4 short, separate bullet observations about how well the student expressed and supported their ideas, and their range of language, across the whole discussion. If there's a genuinely good moment, put ONE positive callout in \"styleHighlight\" (leave it empty string if nothing stands out).\n" +
        "3. Suggestions — 2-3 categories of useful phrases for discussing this kind of topic, each with 1-3 example phrases.\n" +
        "4. Progress — 1-3 short, encouraging bullet points about how the student did overall, as a closing summary.\n\n" +
        "Also set \"wellDone\": true if the student engaged well overall (reasonable length, on-topic, mostly correct), false otherwise.\n\n" +
        "Respond in JSON only:\n" +
        "{\n" +
        "  \"wellDone\": boolean,\n" +
        "  \"turns\": [{ \"comment\": \"short feedback on this one reply, or empty string\", \"corrections\": [{ \"wrong\": \"exact phrase from this reply\", \"correct\": \"corrected phrase\" }], \"betterExample\": \"a stronger way to express the same idea — required on every turn\" }],\n" +
        "  \"style\": [\"short bullet\", ...],\n" +
        "  \"styleHighlight\": \"one positive bullet, or empty string\",\n" +
        "  \"suggestions\": [{ \"category\": \"short category name\", \"phrases\": [\"phrase 1\", \"phrase 2\"] }],\n" +
        "  \"progress\": [\"short bullet\", ...]\n" +
        "}",
      temperature: 0.3,
      jsonMode: true,
    };
  }

  // Continuing discussion
  if (history && history.length > 50) {
    return {
      systemPrompt: "You are a friendly, curious English discussion partner. Keep responses to 1-2 sentences, always in English. Ask thoughtful follow-up questions and gently challenge the student's opinions to keep the discussion going.",
      userMessage: "Topic: " + topic + ". Continue the discussion naturally. History:\n" + history,
      temperature: 0.8,
      jsonMode: false,
    };
  }

  // First message: start the discussion
  return {
    systemPrompt: "You are a friendly, curious English discussion partner. Start an open discussion by asking one open-ended opinion question about the topic, in English. Keep it short and inviting.",
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
    systemPrompt: `You are an IELTS examiner evaluating Writing Task ${taskNumber}. Use official band descriptors (0-9, 0.5 increments). Be fair and constructive.` + feedbackLangNote(payload),
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
    systemPrompt: "You are an IELTS Speaking examiner evaluating a Part 2 long turn response. Evaluate using IELTS criteria (ignore pronunciation — text only)." + feedbackLangNote(payload),
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
    systemPrompt: "You are an English teacher evaluating whether a student used an advanced vocabulary word correctly in an academic/IELTS context." + feedbackLangNote(payload),
    userMessage: `Target word: "${term}" (${pos})\nMeaning: "${en}"\nIELTS usage note: "${usageNote}"\n\nStudent's sentence: "${sentence}"\n\nEvaluate:\n1. Is the word used correctly?\n2. Would this work in an IELTS essay?\n3. Is the register appropriate for academic writing?\n\nRespond in JSON only:\n{\n  "correct": boolean,\n  "ieltsReady": boolean,\n  "feedback": "brief feedback",\n  "correction": "corrected sentence or null",\n  "registerTip": "tip about formality/academic tone or null"\n}`,
    temperature: 0.3,
  };
}

// Generates the ONE shared sample paragraph cached per word in
// src/lib/ielts-vocab-sample-db.ts (see src/app/api/ielts-vocab-sample/route.ts)
// — pure English content, no feedback/explanation prose, so unlike the
// evaluation intents above this does not call feedbackLangNote().
function cieltsVocabParagraph(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const pos = payload.pos as string;
  const en = payload.en as string;
  const usageNote = payload.usageNote as string;

  return {
    systemPrompt:
      "You are an IELTS Writing Task 2 tutor. You write natural, academic-register sample paragraphs of the quality a band 7-8 candidate would produce.",
    userMessage: `Write ONE short IELTS Writing Task 2 style paragraph (60-90 words) that naturally and correctly uses the word "${term}" (${pos}, meaning: "${en}"; usage note: "${usageNote}"). Pick any general essay topic (education, society, technology, environment, health, etc.) that the word fits naturally. Write in English only. Return ONLY the paragraph text — no title, no quotation marks, no explanation.`,
    temperature: 0.7,
    jsonMode: false,
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
    systemPrompt: "You are an English teacher reviewing a student's translation exercise. Grade each of the 5 translations. Be encouraging. Point out the best one and the one needing most improvement." + feedbackLangNote(payload),
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
    systemPrompt: "You are an English teacher evaluating a Vietnamese→English translation." + feedbackLangNote(payload),
    userMessage: "Target phrase: \"" + term + "\" = \"" + en + "\"\nVietnamese: \"" + vietnamese + "\"\nStudent: \"" + userTranslation + "\"\n\nJSON: { \"translationOk\": boolean, \"feedback\": \"brief\", \"corrected\": \"corrected or null\", \"keyVocabulary\": [{\"word\": \"...\", \"vi\": \"...\"}] }",
    temperature: 0.3,
  };
}

function cpvContextQuiz(payload: Record<string, unknown>): PromptResult {
  const term = payload.term as string;
  const en = payload.en as string;
  const vi = payload.vi as string;
  const requested = Number(payload.count);
  const count = Number.isFinite(requested) ? Math.min(10, Math.max(2, Math.round(requested))) : 5;
  const wrongCount = count - 1;
  const exampleItems = [
    '{ "text": "...", "correct": true }',
    ...Array.from({ length: wrongCount }, () => '{ "text": "...", "correct": false }'),
  ].join(",\n    ");

  return {
    systemPrompt: "You create vocabulary quiz questions for English learners at B1-B2 level." + feedbackLangNote(payload),
    userMessage: `Target phrase: "${term}"\nMeaning: "${en}" (${vi})\n\nGenerate ${count} sentences:\n- ONE sentence where the phrase is used CORRECTLY and naturally\n- ${wrongCount} sentence(s) where the phrase is used INCORRECTLY (wrong meaning, wrong grammar, or wrong context) — make each wrong sentence's mistake different from the others\n\nRespond in JSON only:\n{\n  "sentences": [\n    ${exampleItems}\n  ],\n  "explanation": "after user picks, explain why each wrong sentence is wrong"\n}`,
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
    systemPrompt: "You are an English teacher grading a Vietnamese-to-English passage translation. Be encouraging but precise." + feedbackLangNote(payload),
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

// ─── Grammar Lookup & Discussion (select any text anywhere in the app) ──
// Classifies whether the selection actually shows a nameable grammar
// structure (needs at least a full clause/sentence — a single word or bare
// noun phrase never qualifies) and, if so, explains it — then supports
// open-ended follow-up questions about that same structure, branching on
// `history` exactly like cpvConversationStart/discussionChat do.

function grammarLookup(payload: Record<string, unknown>): PromptResult {
  const text = payload.text as string;
  const context = payload.context as string | undefined;
  const category = payload.category as string | undefined;
  const history = payload.history as string | undefined;

  // Follow-up question about an already-classified grammar point.
  if (history) {
    return {
      systemPrompt:
        `You are an English grammar tutor helping a Vietnamese student understand a specific grammar structure: "${category}", ` +
        `found in the sentence: "${text}". Answer the student's follow-up questions clearly and concisely, with extra examples when useful. ` +
        "Keep replies short (2-4 sentences) unless the question needs more." +
        feedbackLangNote(payload),
      userMessage: "Conversation so far:\n" + history + "\n\nRespond to the student's latest message.",
      temperature: 0.4,
      jsonMode: false,
    };
  }

  return {
    systemPrompt:
      "You analyze a piece of selected English text for its GRAMMAR structure, for a Vietnamese learner. " +
      "First decide: does the selection show at least one clear, nameable grammar pattern worth teaching — a full sentence or clause " +
      "demonstrating something like a verb tense/aspect, a conditional, passive voice, a relative clause, reported speech, a modal, an inversion, etc.? " +
      "A single word, a bare noun phrase, or ordinary text with nothing distinctive to teach does NOT qualify — in that case respond with isGrammar: false " +
      "and keep the reply minimal (no invented grammar structure, no forced explanation)." +
      feedbackLangNote(payload),
    userMessage:
      `Selected text: "${text}"\nSurrounding context: "${context ?? ""}"\n\n` +
      "Respond in JSON only:\n" +
      "{\n" +
      "  \"isGrammar\": boolean,\n" +
      "  \"category\": \"short, standard English grammar term, e.g. 'Present Perfect Continuous', 'Second Conditional', 'Non-defining relative clause' — omit if isGrammar is false\",\n" +
      "  \"explanation\": \"how this structure is formed and why it's used here — required if isGrammar is true\",\n" +
      "  \"example\": { \"en\": \"a different example sentence using the same structure\", \"vi\": \"bản dịch\" },\n" +
      "  \"note\": \"1 short sentence explaining why this isn't a special grammar pattern — only if isGrammar is false\"\n" +
      "}",
    temperature: 0.3,
  };
}

// ─── Dispatcher ──────────────────────────────────────────────────

// DeepSeek occasionally leaks Chinese characters into responses regardless of
// the requested feedback language (a known model quirk, not specific to any
// one intent) — every system prompt gets this guard appended so the fix lives
// in one place instead of being repeated per intent.
const LANGUAGE_GUARD =
  " Respond only in English and/or Vietnamese exactly as instructed above — never output Chinese, Japanese, Korean, or any other language, even a single word or character of it.";

function withLanguageGuard(result: PromptResult): PromptResult {
  return { ...result, systemPrompt: result.systemPrompt + LANGUAGE_GUARD };
}

export function buildPrompt(
  intent: IntentType,
  payload: Record<string, unknown>,
): PromptResult {
  const result = ((): PromptResult => {
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
      case "grammar_lookup":
        return grammarLookup(payload);
      case "cpv_writing_passage":
        return cpvWritingPassageGenerate(payload);
      case "cpv_writing_review":
        return cpvWritingReview(payload);
      case "lam_opinion_feedback":
        return lamOpinionFeedback(payload);
      case "discussion":
        return discussionChat(payload);
      case "cielts_writing_feedback":
        return cieltsWritingFeedback(payload);
      case "cielts_speaking_feedback":
        return cieltsSpeakingFeedback(payload);
      case "cielts_vocab_sentence":
        return cieltsVocabSentence(payload);
      case "cielts_vocab_paragraph":
        return cieltsVocabParagraph(payload);
      default:
        throw new Error(`Unknown intent: ${intent}`);
    }
  })();
  return withLanguageGuard(result);
}