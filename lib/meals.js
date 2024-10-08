import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';
import { S3 } from '@aws-sdk/client-s3';

const db = sql('meals.db');
const s3 = new S3({
  region: 'us-east-1',
});

export async function getMeals() {
  await new Promise(resolve => setTimeout(resolve, 2000));

  //   throw new Error('Failed loading meals');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }); // all title to lowercase letters
  meal.instructions = xss(meal.instructions); //sanitase instructions text

  const extention = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extention}`;

  // const stream = fs.createWriteStream(`public/images/${fileName}`);  //its for local image saver sistem
  const bufferedImage = await meal.image.arrayBuffer();

  // stream.write(Buffer.from(bufferedImage), (error) => {
  // if(error) {
  //   throw new Error('Saving image is faild!')
  // }
  // })
  // meal.image = `/images/${fileName}`
  s3.putObject({
    Bucket: 'iryna-nextjs-meal-demo-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
  @title,
  @summary,
  @instructions,
  @creator,
  @creator_email,
  @image,
  @slug
  )
  `
  ).run(meal);
}
