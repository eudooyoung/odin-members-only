import jsConvert from "js-convert-case";

const queryResultCaseConverter = <T>(rows: T[]): T[] => {
  return rows.map((row) => jsConvert.camelKeys(row) as T);
};

export default queryResultCaseConverter;
