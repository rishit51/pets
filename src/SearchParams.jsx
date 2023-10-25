import { useState } from "react";
import fetchSearch from "./fetchSearch";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [breedList, _] = useBreedList(animal);
  const [requestParams,setRequestParams]=useState({
    location:'',
    animal:'',
    breed:'',
  })
  const results=useQuery(['search',requestParams],fetchSearch)
  const pets=results?.data?.pets ?? [];
 
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData=new FormData(e.target);
          const obj={
            animal:formData.get('animal') ?? '',
            breed:formData.get('breed') ?? '',
            location:formData.get("Location") ?? '',

          }
          setRequestParams(obj)
        }}

      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            name='location'
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name='animal'
            onChange={(e)=>{setAnimal(e.target.value)}}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
          <label htmlFor="breed">
            Breed
            <select
              disabled={!breedList.length}
              id="breed"
              
              
            >
              <option />
              {breedList.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
