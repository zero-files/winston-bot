if(process.env.NODE_ENV === "local") require("dotenv").config();
import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import AppModule from "app/app.module";
import CommanderService from "tasks/commander/commander.service";
import { TasksModule } from "tasks/tasks.module";
import TaskRunner from "tasks/types/task-runner.interface";
const helmet = () => {} //import helmet from 'helmet';

const TASK = process.env.TASK;
const TASKS = {
  COMMANDER: CommanderService
};

class Main {
  private static async app():Promise<void> {
    const app = await NestFactory.create(AppModule);
    
    app.enableVersioning({
      type: VersioningType.URI,
    });
    
    app.use(helmet());
    app.enableCors();

    const port = process.env.PORT || 3000;
    await app.listen(port)
      .then(async () => {
        const url = await app.getUrl();
        console.log(`App running on ${url}`);
      });
  }

  private static async task():Promise<void> {
    const tasks = await NestFactory.createApplicationContext(TasksModule);
    
    try {
      const task = tasks.get<TaskRunner>(TASKS[TASK as string])
      await task.run();
    } catch (error:any) {
      console.log(`Task ${TASK} finished with error: ${error.message}.`)
    }

    await tasks.close();
    console.log(`Task ${TASK} finished.`)
    process.exit(0);
  }

  public static main():Promise<void> {
    if(TASK) return Main.task();
    else return Main.app();
  }
}

Main.main();