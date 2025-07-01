// src/seeds/user.seed.ts
import { DataSource } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';

export async function seedRoles(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(Role);
  const roles = [
    {
      id: 1,
      name: 'admin',
    },
    {
      id: 2,
      name: 'cashier',
    },
    {
      id: 3,
      name: 'storekeeper',
    }
  ]
  for (let i = 0; i < roles.length; i++) {
    const createRole = userRepo.create(roles[i]);
    await userRepo.save(createRole);
  }

  console.log('✅ Seeded Roles successfully.');
}
