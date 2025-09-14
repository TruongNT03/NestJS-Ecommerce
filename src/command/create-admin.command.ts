import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { commandConstants, questionConstants } from './command.constant';

@Command({
  name: commandConstants.createAdmin,
})
export class CreateAdminCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super();
  }

  async run(): Promise<void> {
    let account = await this.inquirer.ask<{
      email: string;
      password: string;
    }>(questionConstants.createAdmin, undefined);
    console.log(account);
  }
  @Option({
    flags: '-s, --shell <shell>',
  })
  parseShell(val: string) {
    return val;
  }
}
