import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) { }
  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(role);
    return {
      message: 'Role created successfully',
      role
    };
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const isRole = await this.findOne(id);
    if (!isRole) throw new BadRequestException('Role not found');
    const role = this.roleRepository.create(updateRoleDto);
    await this.roleRepository.update(id, role);
    return {
      message: 'Role updated successfully',
      role
    };
  }

  async remove(id: number) {
    const isRole = await this.findOne(id);
    if (!isRole) throw new BadRequestException('Role not found');
    await this.roleRepository.delete(id);
    return {
      message: 'Role deleted successfully'
    };
  }
}
