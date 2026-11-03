import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types.ts/type';
import css from './NoteList.module.css';
import { deleteNote } from '../../services/noteService';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => mutation.mutate(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
