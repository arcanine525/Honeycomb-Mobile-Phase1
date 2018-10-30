import axios from "axios";
import Config from "./Config";

function _addNewAssetApi(newAsset) {
  axios.post(Config.api.addAsset, { newAsset });
}

function _addNewZoneApi(newZone){
    axios.post(Config.api.addZone, { newZone });
}

export { _addNewAssetApi, _addNewZoneApi };
