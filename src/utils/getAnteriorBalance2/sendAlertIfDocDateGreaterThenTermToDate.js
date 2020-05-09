export const sendAlertIfDocDateGreaterThenTermToDate = (essentials) => {
  const { docDateJS, termToDateJS } = essentials;
  if (docDateJS > termToDateJS) {
    console.log("Document date can't be greter then term to date");
    return true;
  }
  return false;
};
