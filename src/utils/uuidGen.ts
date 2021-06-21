import * as UUID from "uuid/v4";

export const generateNoteUUID = (): GENERAL.NOTES_UUID =>
  (`N_${UUID()}` as unknown) as GENERAL.NOTES_UUID;
export const generateAuditLogUUID = (): GENERAL.AUDIT_LOG_UUID =>
  (`L_${UUID()}` as unknown) as GENERAL.AUDIT_LOG_UUID;
export const generateErrorUUID = (): GENERAL.ERROR_UUID =>
  (`E_${UUID()}` as unknown) as GENERAL.ERROR_UUID;
