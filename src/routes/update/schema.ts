import { checkSchema/*, ParamSchema*/ } from "express-validator";

const updateNoteSchema = {
    /*title: {
        in: "body",
        isString: true,
        errorMessage: 'Title should be at least 1 char long and maximum of 50 chars',
        isLength: {
            options: { min: 1, max: 50 }
        },
        trim: true
    } as ParamSchema
    */
};
export const updateValidation = checkSchema(updateNoteSchema);