import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { DeleteGuard } from './guards/delete.guard';
import { PatchGuard } from './guards/patch.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneByID(+id);
  }

  @Patch(':id')
  @UseGuards(PatchGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);
    return result;
  }

  @Delete(':id')
  @UseGuards(DeleteGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.usersService.remove(id);
    return result;
  }
}
