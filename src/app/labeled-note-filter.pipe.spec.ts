import { LabeledNoteFilterPipe } from './labeled-note-filter.pipe';
import { NoteService } from './service/note.service';
import { Note } from './object/Note';


describe('LabeledNoteFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new LabeledNoteFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
