import { create } from "zustand"

interface ReadDocumentInterface {
  fileContent: string | null;
  setFileContent: (content: string) => void
}

const useReadDocument = create<ReadDocumentInterface>((set) => ({
  fileContent: null,
  setFileContent: (content) => set({ fileContent: content })
}))
export default useReadDocument  
