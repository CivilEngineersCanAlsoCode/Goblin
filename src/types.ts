export interface Action {
  /** Timestamp in ISO format */
  ts: string;
  /** Action type, e.g. click, input */
  type: string;
  /** CSS selector for the target */
  selector: string;
  /** Extra details such as value entered */
  value?: string;
  /** Page URL when action recorded */
  url: string;
  /* --- FUTURE:MOUSE_REPLAY: add x,y coordinates --- */
}
