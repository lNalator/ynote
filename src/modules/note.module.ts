import { Module } from "@nestjs/common";
import { NoteController } from "../controllers/note.controller";
import { NoteService } from "../services/note.service";

@Module({
    controllers: [NoteController],
    providers: [NoteService],
    exports: [NoteService],
  })
  export class NoteModule {}