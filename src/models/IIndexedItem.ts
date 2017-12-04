export interface IIndexedItem {
  readonly index: number | null;
  readonly id: string;
  readonly text: string;
  readonly isEdited: boolean;
}
