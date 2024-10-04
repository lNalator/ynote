import { Module } from "@nestjs/common";
import { NoteController } from "../controllers/note.controller";
import { NoteService } from "../services/note.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Note } from "src/models/note.model";

@Module({
    imports: [SequelizeModule.forFeature([Note])],
    controllers: [NoteController],
    providers: [NoteService],
  })
  export class NoteModule {}