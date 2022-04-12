import EWorkmode from "@/enums/CardEditorMode";

export default interface IWorkstationState {
  card_editor: {
    mode: EWorkmode;
    selected_card: any;
    active: boolean;
  };
}
