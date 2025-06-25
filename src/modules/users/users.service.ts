import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/common/util/bcrypt.util';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DistrictService } from '../district/district.service';
import { RolesService } from '../roles/roles.service';
import { formatTimeUtil } from 'src/common/util/formatTime.util';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly districtService: DistrictService,
    private readonly rolesService: RolesService
  ) { }
  async create(createUserDto: CreateUserDto) {
    const isUser = await this.findOneByEmail(createUserDto.email);
    if (isUser) {
      throw new BadRequestException('Email already exists');
    }
    const isDistrict = await this.districtService.getOneById(createUserDto.districtId);
    if (!isDistrict) {
      throw new BadRequestException('District not found');
    }
    const isRole = await this.rolesService.findOne(createUserDto.roleId);
    if (!isRole) {
      throw new BadRequestException('Role not found');
    }
    const user = this.userRepository.create({
      ...createUserDto,
      role: { id: createUserDto.roleId },
      district: { id: createUserDto.districtId },
      password: await hashPassword(createUserDto.password)
    });
    const { password, ...result } = user
    await this.userRepository.save(user);
    return {
      message: 'User created successfully',
      user: result
    };
  }

  async findAll() {
    const users = await this.userRepository.find({ relations: ['role', 'district','district.province'] });
    const mapper = users.map(({password,...user}) => ({
      ...user,
      role: user.role.name,
      district: user.district.name,
      province: user.district.province.name,
      createdAt: formatTimeUtil(user.createdAt),
      updatedAt: formatTimeUtil(user.updatedAt),
    }))
    return mapper;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } , relations: ['role', 'district','district.province'] });
    if(!user){
      throw new BadRequestException('User not found');
    }
    const mapper = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role.name,
      district: user.district.name,
      province: user.district.province.name,
      createdAt: formatTimeUtil(user.createdAt),
      updatedAt: formatTimeUtil(user.updatedAt),
    }
    return mapper;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } , relations: ['role', 'district'] });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new BadRequestException('User not found');
    }
    await this.userRepository.delete(id)
    return {
      message: 'User deleted successfully'
    };
  }
}
