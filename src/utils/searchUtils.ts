export const getSearchWords = async (
    title: string,
    content: string
): Promise<string[]> => {
    let searchWords: string[] = [];
    searchWords = content ? searchWords.concat(content.toLowerCase().split(" ")): [];
    searchWords = searchWords.concat(title.toLowerCase().split(" "));
    const searchWordsSet = new Set(searchWords);
    return Array.from(searchWordsSet);
};