import { checkSchema, ParamSchema } from "express-validator";

const deleteNotesSchema = {
    noteIds: {
        in: "body",
        // isArray: true,
        errorMessage: 'atleast 1 noteId must be present, to delete 1 or more notes'// ,
        /*isLength: {
            options: { min: 1, max: 50 }
        }*/
    } as ParamSchema
};
export const deleteValidation = checkSchema(deleteNotesSchema);