export default interface TaskRunner {
  run(): Promise<void>;
}