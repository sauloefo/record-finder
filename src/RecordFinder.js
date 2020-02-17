const unacceptableScore = -1;
const twoOrMoreSpacesRegEx = /\s\s+/g;
const oneSpace = " ";
const emptyString = "";

const normalizeString = stringValue =>
  stringValue
    .trim()
    .replace(twoOrMoreSpacesRegEx, oneSpace)
    .toLowerCase();

const selectValidRecord = (record, field) =>
  record &&
  record.hasOwnProperty(field) &&
  record[field] &&
  record[field].trim() !== emptyString;

const convertToScorableRecord = (record, field) => ({
  record,
  score: unacceptableScore,
  searchableText: normalizeString(record[field])
});

const containsAtLeastOneQueryWord = (searchableText, queryWords) =>
  queryWords.some(queryWord => searchableText.includes(queryWord));

const scoreRecord = (scorableRecord, queryWords) => {
  if (!containsAtLeastOneQueryWord(scorableRecord.searchableText, queryWords)) {
    return scorableRecord;
  }

  return Object.assign({}, scorableRecord, { score: 1 });
  // TODO: finish it
};

const selectByAcceptableScore = scorableRecord =>
  scorableRecord.score > unacceptableScore;

const sortByScoreDescending = (firstEl, secondEl) =>
  firstEl.score - secondEl.score;

const convertToRecord = scorableRecord => scorableRecord.record;

export default function findRecord(query, records, field) {
  if (!query || !records || !field) {
    return [];
  }

  const queryWords = normalizeString(query).split(oneSpace);

  const sortedScorableRecords = records
    .filter(record => selectValidRecord(record, field))
    .map(record => convertToScorableRecord(record, field))
    .map(scorableRecord => scoreRecord(scorableRecord, queryWords))
    .filter(selectByAcceptableScore)
    .sort(sortByScoreDescending);

  return sortedScorableRecords.map(convertToRecord);
}
