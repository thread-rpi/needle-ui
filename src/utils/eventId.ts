export const getEventId = (e: { _id?: string | { $oid: string } }): string =>
  typeof e._id === "string" ? e._id : e._id?.$oid ?? "";
