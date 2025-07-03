// src/seeds/unit.seed.ts

import { DataSource } from 'typeorm';
import { Unit } from '../../../modules/units/entities/unit.entity';

export async function seedUnits(dataSource: DataSource) {
  const unitRepo = dataSource.getRepository(Unit);

  const count = await unitRepo.count();
  if (count > 0) {
    console.log('⚠️ Units already seeded.');
    return;
  }

  const units = unitRepo.create([
    {
      name: 'ชิ้น',
      symbol: 'ชิ้น',
      description: 'หน่วยนับพื้นฐานสำหรับสินค้าทั่วไป',
    },
    {
      name: 'แพ็ค',
      symbol: 'แพ็ค',
      description: 'หีบห่อขนาดเล็ก',
    },
    {
      name: 'โหล',
      symbol: 'โหล',
      description: '12 ชิ้น',
    },
    {
      name: 'กิโลกรัม',
      symbol: 'กก.',
      description: 'หน่วยน้ำหนัก',
    },
    {
      name: 'ลิตร',
      symbol: 'ล.',
      description: 'หน่วยปริมาตร',
    },
    {
      name: 'กล่อง',
      symbol: 'กล่อง',
      description: 'บรรจุภัณฑ์แบบกล่อง',
    },
    {
      name: 'ถุง',
      symbol: 'ถุง',
      description: 'บรรจุภัณฑ์แบบถุง',
    },
  ]);

  await unitRepo.save(units);
  console.log('✅ Seeded Units successfully.');
}
