/**
 * Shuffles the quiz options while preserving the correct answer index.
 * Returns { shuffledOpts, shuffledAnswerIdx }
 */
export function shuffleOptions(opts, correctIdx) {
  const indexed = opts.map((opt, i) => ({ opt, isCorrect: i === correctIdx }));
  // Fisher-Yates shuffle
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const shuffledOpts = indexed.map(x => x.opt);
  const shuffledAnswerIdx = indexed.findIndex(x => x.isCorrect);
  return { shuffledOpts, shuffledAnswerIdx };
}

/**
 * Prepares a full quiz: shuffles question order AND answer options per question.
 */
export function prepareQuiz(questions) {
  // Fisher-Yates shuffle on question order
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Shuffle answer options for each question
  return shuffled.map(q => {
    const { shuffledOpts, shuffledAnswerIdx } = shuffleOptions(q.opts, q.a);
    return { ...q, opts: shuffledOpts, a: shuffledAnswerIdx };
  });
}
