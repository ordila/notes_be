import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Note } from './note.model';
import { CreateNoteInput, UpdateNoteInput } from './note.inputs';
import { NotesService } from './notes.service';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Query(() => [Note], { name: 'notes' })
  async getAllNotes(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Query(() => Note, { name: 'note' })
  async getNote(@Args('id', { type: () => ID }) id: string): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @Mutation(() => Note)
  async createNote(@Args('input') input: CreateNoteInput): Promise<Note> {
    return this.notesService.create(input);
  }

  @Mutation(() => Note)
  async updateNote(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateNoteInput,
  ): Promise<Note> {
    return this.notesService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteNote(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.notesService.remove(id);
  }

  @Query(() => String, { name: 'testSupabase' })
  async testSupabaseConnection(): Promise<string> {
    const result = await this.notesService.testConnection();
    return `${result.success ? '✅' : '❌'} ${result.message}`;
  }
}
