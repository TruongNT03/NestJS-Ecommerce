import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { commandConstants, questionConstants } from './command.constant';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hassingPassword } from 'src/common/utils/hash.util';
import { RoleEntity } from 'src/entities/role.entity';
import { RoleType } from 'src/common/enum/role.enum';

@Command({
  name: commandConstants.createAdmin,
})
export class CreateAdminCommand extends CommandRunner {
  constructor(
    private readonly inquirer: InquirerService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {
    super();
  }

  async run(): Promise<void> {
    let account = await this.inquirer.ask<{
      email: string;
      password: string;
    }>(questionConstants.createAdmin, undefined);

    const existUser = await this.userRepo.findOneBy({ email: account.email });
    if (existUser) {
      throw new Error('Email already exist.');
    }

    const adminRole = await this.roleRepo.findOneBy({ name: RoleType.ADMIN });

    const user = await this.userRepo.save({
      email: account.email,
      password: hassingPassword(account.password),
      roles: [adminRole],
    });

    console.log('Admin account has been created.');
  }
  @Option({
    flags: '-s, --shell <shell>',
  })
  parseShell(val: string) {
    return val;
  }
}
