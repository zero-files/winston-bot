import { Module } from "@nestjs/common";
import CommanderModule from "./commander/commander.module";

@Module({
  imports: [
    CommanderModule,
  ]
})
export class TasksModule {

}
