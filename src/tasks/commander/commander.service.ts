import { Injectable } from "@nestjs/common";
import TaskRunner from "tasks/types/task-runner.interface";

@Injectable()
export default class CommanderService implements TaskRunner {
  public async run():Promise<void> {
    console.log("hello world");
  }
}
