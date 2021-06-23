export const getSearchWords = async (
    title: string,
    content: string
): Promise<string[]> => {
    let searchWords: string[] = [];
    const wordSplitRegEx = new RegExp("[ \t\n]+")
    searchWords = content ? searchWords.concat(content.toLowerCase().split(wordSplitRegEx)): [];
    searchWords = searchWords.concat(title.toLowerCase().split(wordSplitRegEx));
    const searchWordsSet = new Set(searchWords);
    return Array.from(searchWordsSet);
};