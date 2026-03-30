/** Additional personnel entry (denormalized) */
export type AdditionalPersonnel = {
  member_id: string;
  role: string;
};

export type EventType = 'shoot' | 'internal' | 'external';

export type OverviewEvent = {
  id: string;
  title: string;
  date: string;
  type: EventType;
};

/** Fit of the week competition result */
// export type FotResult = 'no_win' | 'w' | 'm' | 'y';

/** Event document from events collection (eventDB) */
export type Event = {
  _id: string;
  date: string;
  title: string;
  type: EventType;
  blurb: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  image_path?: string;
  image_ids?: string[];
  photographer_ids?: string[];
  creative_director_ids?: string[];
  model_ids?: string[];
  additional_personnel?: AdditionalPersonnel[];
  deleted_at?: string;
  deleted_by?: string;
};

/** Image document from images collection (imageDB) */
export type Image = {
  _id: string;
  event_id: string;
  date: string;
  path: string;
  index: number;
  caption: string;
  alt_text: string;
  published: boolean;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
  photographer_id: string | null;
  creative_director_id: string | null;
  model_ids: string[];
  additional_personnel: AdditionalPersonnel[];
  // fot: FotResult;
};

/** Past event shape used by UI (id + cover_image_path for display) */
export type PastEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  type: EventType;
  image_path: string;
};

export type PastEventCardSize = "full" | "half" | "third" | "twoThird";