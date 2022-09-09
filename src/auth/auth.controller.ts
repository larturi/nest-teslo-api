import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser, RawHeaders, RoleProtected } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[]
  ) {

    return {
      ok: true,
      user,
      userEmail,
      rawHeaders
    };
  }

  // @SetMetadata('roles', ['admin', 'superuser'])
  
  @Get('private2')
  @RoleProtected( ValidRoles.admin, ValidRoles.superuser, ValidRoles.user )
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRout2(
    @GetUser() user: User,
  ) {

    return {
      ok: true,
      user,
    };
  }
  
}
