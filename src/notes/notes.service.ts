import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Note } from './note.model';
import { CreateNoteInput, UpdateNoteInput } from './note.inputs';

@Injectable()
export class NotesService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || 'https://example.supabase.co',
      process.env.SUPABASE_ANON_KEY || 'fake-key-for-testing',
    );
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await this.supabase
        .from('notes')
        .select('count', { count: 'exact', head: true });

      if (error) {
        return {
          success: false,
          message: `Помилка Supabase: ${error.message}`,
        };
      }

      return {
        success: true,
        message: 'Підключення до Supabase успішне!',
      };
    } catch (error) {
      return {
        success: false,
        message: `Помилка: ${error.message}`,
      };
    }
  }

  async findAll(): Promise<Note[]> {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return data.map(this.mapToNote);
  }

  async findOne(id: string): Promise<Note> {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Note not found');

    return this.mapToNote(data);
  }

  async create(input: CreateNoteInput): Promise<Note> {
    const { data, error } = await this.supabase
      .from('notes')
      .insert({
        title: input.title,
        content: input.content,
        tags: input.tags || [],
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return this.mapToNote(data);
  }

  async update(id: string, input: UpdateNoteInput): Promise<Note> {
    const { data, error } = await this.supabase
      .from('notes')
      .update({
        ...(input.title && { title: input.title }),
        ...(input.content && { content: input.content }),
        ...(input.tags && { tags: input.tags }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Note not found');

    return this.mapToNote(data);
  }

  async remove(id: string): Promise<boolean> {
    const { error } = await this.supabase.from('notes').delete().eq('id', id);

    if (error) throw new Error(error.message);

    return true;
  }

  private mapToNote(data: any): Note {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
