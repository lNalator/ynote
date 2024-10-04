import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Note } from "src/models/note.model";

@Injectable()
export class NoteService{
    constructor(
        @InjectModel(Note)
        private userModel: typeof Note,
      ) {}

      async findAll(): Promise<Note[]> {
        try {
          return await this.userModel.findAll();
        } catch (error) {
          throw new Error('Error fetching all notes');
        }
      }

      findOne(id: string): Promise<Note> {
        return this.userModel
          .findOne({
            where: {
              id,
            },
          })
          .then((result) => {
            if (!result) {
              throw new Error(`User with id ${id} not found`);
            }
            return result;
          });
      }

      async update(id: string, note: Note): Promise<void> {
        const user = await this.findOne(id);
        await user.update(note);
      }

      async delete(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
      }
}
