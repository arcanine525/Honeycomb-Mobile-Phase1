const domain = {
  develop: "http://api.honeycomb2.geekup.vn/api/"
};

const api = {
  addAsset: domain.develop + "addasset",
  getAllAsset: domain.develop + "assets",
  addZone: domain.develop + "addzone",
  getHistory: `${domain.develop}addzone`,
};
export default {
  api
};
