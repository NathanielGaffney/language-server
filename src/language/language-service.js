const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getFirstWord(db, languageId) {
    return db
      .from('word')
      .join('language', 'language.head', 'word.id')
      .where({ 'language.id': languageId })
      .select(
        'word.*'
      )
      .first()
  },

  getWord(db, id) {
    return db
      .from('word')
      .select('*')
      .where({ id })
      .then(rows => {
        return rows[0];
      })
  },
  setWord(db, id, newData) {
    return db('word')
      .where({ id })
      .update(newData)
  },
  setHead(db, languageId, id) {
    return db('language')
      .where({ id: languageId })
      .update({ head: id })
  },
  setTotalScore(db, languageId, totalScore) {
    return db('language')
      .where({ id: languageId })
      .update({ total_score: totalScore })
  },
}

module.exports = LanguageService
