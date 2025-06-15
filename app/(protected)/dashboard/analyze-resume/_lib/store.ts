import { create } from "zustand";

interface CVAnalysisStore {
  analysis: string | undefined;
  setAnalysis: (analysis: string) => void;
  resetAnalysis: () => void;
}

export const useCVAnalysisStore = create<CVAnalysisStore>((set) => ({
  analysis: undefined,
  setAnalysis: (analysis) =>
    set({ analysis: JSON.stringify(analysis, null, 2) }),
  resetAnalysis: () => set({ analysis: undefined }),
}));
