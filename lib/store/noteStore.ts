
import { create } from "zustand";
import type { CreateNoteType } from "@/types/note";
import { persist } from "zustand/middleware";

export const initialDraft: CreateNoteType = {
  title: "",
  content: "",
  tag: "Todo",
};

interface FormDraft {
  draft:  CreateNoteType;
  setData: (postDraftData: Partial<CreateNoteType>) => void;
  cleanData: () => void;
}

export const useFormDraft = create<FormDraft>()(
  persist((set) => ({
  draft: initialDraft,

  setData: (postDraftData) => {
    set((prevData) => ({
      draft: {
        ...prevData.draft,
        ...postDraftData,
      },
    }));
  },

  cleanData: () => {
    set({ draft: { ...initialDraft } });
  },
}),
  {  
    name: "note-draft",
    partialize: (state) => ({
        draft: state.draft,
      }),
  }
));

