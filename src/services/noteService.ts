import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

// interface FetchNotesParams {
//   search: string;
//   tag?: NoteTag;
//   page: number;
//   perPage?: number;
//   sortBy?: 'created' | 'updated';
// }

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteBody {
  title: string;
  content: string;
  tag: NoteTag;
}

const serverApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(query: string, page: number) {
  const { data } = await serverApi.get<FetchNotesResponse>('/notes', {
    params: {
      search: query,
      page,
      perPage: 12,
    },
  });
  return data;
}

export async function createNote(body: CreateNoteBody) {
  const { data } = await serverApi.post<Note>('/notes', body);
  return data;
}

export async function deleteNote(noteId: string) {
  const { data } = await serverApi.delete<Note>(`/notes/${noteId}`);
  return data;
}
