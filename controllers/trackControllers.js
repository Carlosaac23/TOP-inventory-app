import { getAllBrands, getAllScales } from '../db/generalQueries.js';
import {
  getAllTracks,
  getTrackById,
  getAllTrackCategories,
} from '../db/trackQueries.js';

export async function getAllTracksController(req, res) {
  const { category, scale, brand } = req.query;

  try {
    const tracks = await getAllTracks({ category, scale, brand });
    const scales = await getAllScales();
    const brands = await getAllBrands();
    const categories = await getAllTrackCategories();

    res.render('tracks/index', {
      tracks,
      scales,
      brands,
      categories,
      filters: { category, scale, brand },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading tracks');
  }
}

export async function getTrackByIdController(req, res) {
  try {
    const { trackID } = req.params;
    const track = await getTrackById(trackID);

    res.render('tracks/infoTrack', { track });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting track');
  }
}
