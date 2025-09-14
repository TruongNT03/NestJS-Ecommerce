import { Question, QuestionSet } from 'nest-commander';
import { questionConstants } from '../command.constant';

@QuestionSet({
  name: questionConstants.createAdmin,
})
export class CreateAdminQuestion {
  @Question({
    name: 'email',
    message: 'Input your email: ',
  })
  parseEmail(email: string) {
    return email;
  }

  @Question({
    name: 'password',
    message: 'Input your password: ',
    type: 'password',
  })
  parsePassword(password: string) {
    return password;
  }
}
