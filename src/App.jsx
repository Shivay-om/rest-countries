import React, { useEffect, useState } from 'react'
import { getPosts } from './api'
import './App.css'

function App(props) {
  const [value, setvalue] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    getPosts().then((data) => setvalue(data))
  }, [])
  console.log(value)

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const filteredCountries = value.filter((post) => {
    const nameMatch = post.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const regionMatch = selectedRegion === '' || post.region.toLowerCase() === selectedRegion.toLowerCase();
    return nameMatch && regionMatch;
  });


  return (
    <>
      <div className='flex justify-around'>
        <div className='m-10 gap-2 flex justify-center items-center'>
          <p className=' px-2'>Search your country here</p>
          <input className='px-3 py-2 border border-solid rounded-sm hover:border-black w-[300px] focus:outline-none'
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className='m-10 gap-2 flex justify-center items-center'>
          <p className=' px-2'>Filter By Region</p>
          <select className='border border-solid rounded-sm hover:border-black w-[200px] px-2 py-2 focus:outline-none' value={selectedRegion} onChange={handleRegionChange}>
            <option value="">Select Region</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>

        </div>
      </div>
      <div className='text-center text-3xl font-semibold m-5'>All Country List Details</div>
      <div className='flex flex-wrap w-full h-screen gap-3'>
        {filteredCountries.map((post, index) => (
          <div className=' w-[250px] h-[350px] flex flex-col justify-center items-center mb-5 mx-auto border hover:scale-[1.1] duration-300 shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px]' key={index}>
            <div className=''>
              <img className='h-[200px] w-full object-cover' src={post.flags.svg} alt="Flag" />
            </div>
            <div className='flex flex-col justify-center box-border items-center text-center w-full h-full bg-[#E5E7EB] font-bold'>
              <p>Country: {post.name.common}</p>
              <p>Population: {post.population}</p>
              <p>Capital: {post.capital}</p>
              <p>Region: {post.region}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App 
