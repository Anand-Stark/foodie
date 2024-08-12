
import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../services/restaurantService';

const CountrySelect = ({ value, onChange }) => {
    const [getAll, setGetAll] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const {data} = await axios.get(`${API_URL}/country`); // Adjusted endpoint
                // Format the data for react-select
                
              

                const formattedData = data.countries.map(country => ({
                    value: country.country_code,
                    label: country.country,     
                }));
                
                console.log(formattedData);
                

                setGetAll(formattedData);
            } catch (err) {
                toast.error(err?.response?.data?.message || "Something went wrong in fetching countries");
            }
        };

        fetchCountries();
    }, []);

    return (
        <div>
            <Select
                placeholder="Select country"
                isClearable
                options={getAll}
                value={value}
                onChange={onChange} // No need to wrap the onChange function
                classNamePrefix="react-select" // Prefix for custom classes
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6',
                    },
                })}
                classNames={{
                    control: () => 'p-1 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
            />
        </div>
    );
};

export default CountrySelect;
