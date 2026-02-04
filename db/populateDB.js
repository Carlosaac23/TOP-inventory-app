import { pool } from './pool.js';

async function populateDB() {
  try {
    console.log('Starting to populate database...');

    // Clear existing data (in reverse order of dependencies)
    await pool.query('DELETE FROM tracks');
    await pool.query('DELETE FROM wagons');
    await pool.query('DELETE FROM trains');
    await pool.query('DELETE FROM track_categories');
    await pool.query('DELETE FROM wagon_categories');
    await pool.query('DELETE FROM train_categories');
    await pool.query('DELETE FROM scales');
    await pool.query('DELETE FROM brands');

    // Reset sequences
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('brands', 'id'), 1, false)"
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('scales', 'id'), 1, false)"
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('train_categories', 'id'), 1, false)"
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('wagon_categories', 'id'), 1, false)"
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('track_categories', 'id'), 1, false)"
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('trains', 'id'), 1, false)"
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('wagons', 'id'), 1, false)"
    );
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('tracks', 'id'), 1, false)"
    );

    // Insert Brands
    await pool.query(`
      INSERT INTO brands (name, country, foundation) VALUES
      ('Märklin', 'Germany', 1859),
      ('LEGO', 'Denmark', 1932),
      ('Hornby', 'United Kingdom', 1901)
    `);
    console.log('✓ Brands inserted');

    // Insert Scales
    await pool.query(`
      INSERT INTO scales (scale, ratio, track_width) VALUES
      ('HO', '1:87', 16.5),
      ('N', '1:160', 9.0),
      ('O', '1:48', 32.0)
    `);
    console.log('✓ Scales inserted');

    // Insert Train Categories
    await pool.query(`
      INSERT INTO train_categories (name) VALUES
      ('Steam Locomotive'),
      ('Diesel Locomotive'),
      ('Electric Locomotive')
    `);
    console.log('✓ Train categories inserted');

    // Insert Wagon Categories
    await pool.query(`
      INSERT INTO wagon_categories (name) VALUES
      ('Passenger Coach'),
      ('Freight Car'),
      ('Tank Car')
    `);
    console.log('✓ Wagon categories inserted');

    // Insert Track Categories
    await pool.query(`
      INSERT INTO track_categories (name) VALUES
      ('Straight Track'),
      ('Curved Track'),
      ('Switch Track')
    `);
    console.log('✓ Track categories inserted');

    // Insert Trains
    await pool.query(`
      INSERT INTO trains (model, model_id, description, price, category_id, scale_id, brand_id, stock_quantity) VALUES
      ('BR 01', 37011, 'German Express Steam Locomotive', 299.99, 1, 1, 1, 5),
      ('Class 66', 69701, 'British Heavy Freight Diesel', 189.99, 2, 1, 3, 8),
      ('ICE 3', 43715, 'High-Speed Electric Train', 449.99, 3, 1, 1, 3)
    `);
    console.log('✓ Trains inserted');

    // Insert Wagons
    await pool.query(`
      INSERT INTO wagons (model, model_id, description, price, category_id, scale_id, brand_id, stock_quantity) VALUES
      ('Orient Express Coach', 43850, 'Luxury Passenger Coach 1st Class', 79.99, 1, 1, 1, 12),
      ('Covered Freight Wagon', 46871, 'DB Cargo Boxcar', 34.99, 2, 1, 1, 20),
      ('Tank Wagon BP', 48775, 'British Petroleum Tanker', 42.99, 3, 1, 3, 15)
    `);
    console.log('✓ Wagons inserted');

    // Insert Tracks
    await pool.query(`
      INSERT INTO tracks (model, model_id, description, price, category_id, scale_id, brand_id, stock_quantity) VALUES
      ('C Track Straight 188mm', 24188, 'Standard straight track piece', 4.99, 1, 1, 1, 100),
      ('C Track Curved R2', 24230, 'Standard curved track R2 radius', 5.49, 2, 1, 1, 80),
      ('C Track Left Switch', 24611, 'Electric left hand turnout', 34.99, 3, 1, 1, 25)
    `);
    console.log('✓ Tracks inserted');

    console.log('\n✅ Database populated successfully!');
  } catch (error) {
    console.error('❌ Error populating database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

populateDB();
