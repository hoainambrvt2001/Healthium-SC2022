const API_KEY = "AIzaSyAWaAtaKV8BYTY2nDCmVtA5WW0M4yyi4Y0";

export const getPlaces = async (
  {
    // default value
    queryType = "nearbysearch",
    lat = 10.7697759,
    lng = 106.6563129,
    radius = 2000,
    rankby = "prominence",
    type = "hospital",
  },
  setItems,
  setLoading
) => {
  const queryString = `location=${lat},${lng}&radius=${radius}&rankby=${rankby}&type=${type}`;
  const url = `https://maps.googleapis.com/maps/api/place/${queryType}/json?${queryString}&key=${API_KEY}`;
  console.log(url);
  setLoading(true);
  const result = await fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e));

  setItems([...result.results]);
  setLoading(false);
};

export const getImage = ({ photo_reference }) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${1600}&maxHeight=${1600}&photo_reference=${photo_reference}&key=${API_KEY}`;

  return url;
};