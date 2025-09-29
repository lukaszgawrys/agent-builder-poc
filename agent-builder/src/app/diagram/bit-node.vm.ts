export type BitNodeVM = {
  id: string;
  titleText: string;
  previewSummary?: string;
  reachable: boolean; // solid vs dashed
  invalid: boolean; // red frame
  highlighted: boolean; // green frame
  chips?: Array<{ color: string; label: string }>;
};
