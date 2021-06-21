export const getSearchWords = async (
    title: string,
    content: string
): Promise<string[]> => {
    let searchWords: Array<string> = [];
    searchWords = content ? searchWords.concat(content.toLowerCase().split(" ")): [];
    searchWords = searchWords.concat(title.toLowerCase().split(" "));
    return searchWords;
};