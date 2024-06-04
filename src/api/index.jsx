const url = "https://restcountries.com/v3.1/all"

export const getPosts = async () => {
   const response = await fetch(url)
   const data = await response.json();
   return data;
}

