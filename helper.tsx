function checkEmailFormat(email: string) {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailRegex.test(email)) return true;
  return false;
}

function getEnglishTitle(title: string) {
  const map = {
    "*置顶*": "Pinned",
    她互助: "Her Assistance",
    她创作: "Her Creations",
    她历史: "Herstory",
    她生活: "Her Life",
    她读书: "Her Reading",
    测试: "test",
  };
  return map[title];
}

// function getChineseTitle(title: string) {
//   const map = {
//     Pinned: "*置顶*",
//     "Her Assistance": "她互助",
//     "Her Creations": "她创作",
//     Herstory: "她历史",
//     "Her Life": "她生活",
//     "Her Reading": "她读书",
//     test: "测试",
//   };
//   return map[title];
// }

const titleMap = {
  "*置顶*": "pinned",
  她互助: "herassistance",
  她创作: "hercreations",
  她历史: "herstory",
  她生活: "herlife",
  她读书: "herreading",
  测试: "test",
};

function getTranslatedTitle(title: string) {
  // Try to find the title in the map
  title = title.trim().toLowerCase();
  let translatedTitle = titleMap[title];

  // If the title is not found, try to find it in the values
  if (!translatedTitle) {
    const keys = Object.keys(titleMap);
    for (let i = 0; i < keys.length; i++) {
      if (titleMap[keys[i]] === title) {
        translatedTitle = keys[i];
        break;
      }
    }
  }

  return translatedTitle;
}

export { checkEmailFormat, getEnglishTitle, getTranslatedTitle };
