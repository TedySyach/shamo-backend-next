import { AuthGuard } from '@nestjs/passport';

export class AdminGuard extends AuthGuard('admin') {
  constructor() {
    super();
  }
}

export class UserGuards extends AuthGuard('user') {
  constructor() {
    super();
  }
}
