export const checkDuplicated = async (model, fieldName, value) => {
  const query = {};
  query[fieldName] = value;

  const data = await model.find(query);

  // console.log("checkDuplicated() return: ", data);

  if (data.length > 0) return true;

  return false;
};
