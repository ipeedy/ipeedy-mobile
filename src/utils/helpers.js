import axios from 'axios';
import Polyline from '@mapbox/polyline';

import { constants } from '../utils/constants';

export const getPrice = price => {
  if (price / 1000000 >= 1) {
    return `${price / 1000000}M`;
  } else if (price / 1000 >= 1) {
    return `${price / 1000}K`;
  }
  return `${price}Đ`;
};

export const getDirections = async (startLoc, destinationLoc) => {
  try {
    const resp = await axios.get(constants.DIRECTION_API_URL, {
      params: {
        mode: 'walking',
        origin: `${startLoc.latitude},${startLoc.longitude}`,
        destination: `${destinationLoc.latitude},${destinationLoc.longitude}`,
        key: constants.DIRECTION_API_KEY,
      },
    });
    const points = Polyline.decode(
      resp.data.routes[0].overview_polyline.points,
    );
    const coords = points.map(point => ({
      latitude: point[0],
      longitude: point[1],
    }));
    return coords;
  } catch (error) {
    return error;
  }
};

export const regionContainingPoints = points => {
  let minX;
  let maxX;
  let minY;
  let maxY;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX + 0.001,
    longitudeDelta: deltaY + 0.001,
  };
};
