declare namespace MODELS {
    type NOTE = {
        id: GENERAL.NOTES_UUID;
        title: string;
        content: string;
        searchWords: string[];
        userId: string;
        createdAt?: string;
        updatedAt?: string;
    }
}