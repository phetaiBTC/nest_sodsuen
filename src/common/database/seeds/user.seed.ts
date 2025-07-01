// src/seeds/user.seed.ts
import { DataSource } from 'typeorm';
import { User } from '../../../modules/users/entities/user.entity';
import { hashPassword } from 'src/common/util/bcrypt.util';

export async function seedUsers(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  const exists = await userRepo.findOneBy({ email: 'admin@gmail.com' });
  if (exists) {
    console.log('⚠️ User already seeded.');
    return;
  }

  const password = await hashPassword('12345678');
  const user = userRepo.create({
    username: 'admin',
    email: 'admin@gmail.com',
    password,
    role: { id: 1 },
    district: { id: 106 },
    phone: '0123456789',
  })
  await userRepo.save(user);

  console.log('✅ Seeded Admin user.');
}
