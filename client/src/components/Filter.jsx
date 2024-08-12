
import { useState } from 'react';
import FilterModal from './FilterModal';
import {} from 'react-icons/md';

const Filter = () => {
    const [openFilterModal, setOpenFilterModal] = useState(false);
    // const filterModal = useFilterModal()


    return (
        <>
            <div
                onClick={() => { setOpenFilterModal(true) }}
                className="
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                        text-lg
                    "
            >
                Filters
            </div>
            {openFilterModal && <FilterModal isOpen = {openFilterModal} setIsOpen = {setOpenFilterModal} />}
        </>
    );
}

export default Filter;
