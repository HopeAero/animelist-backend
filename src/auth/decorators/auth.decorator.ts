import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UserRole } from "src/users/entities/user.entity";
import { Roles } from "./roles.decorador";

export function Auth(roles: UserRole) {
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}