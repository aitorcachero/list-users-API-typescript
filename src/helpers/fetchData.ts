// import '../mocks/data.json';

export const fetchData = async () => {
  const response = await fetch('../mocks/data.json');
  const data = await response.json();
  console.log(data);
  return data.results;
};
