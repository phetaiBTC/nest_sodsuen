import * as sharp from 'sharp';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function compressAndSaveImage(buffer: Buffer, originalName: string): Promise<string> {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename =`${uniqueSuffix}-${originalName}`;
const outputDir = join(process.cwd(), 'assets');
  const outputPath = join(outputDir, filename);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }
  console.log(outputPath)
  console.log(outputDir)
  await sharp(buffer)
    .resize({ width: 800 })
    .jpeg({ quality: 70 })
    .toFile(outputPath);

  return filename;
}