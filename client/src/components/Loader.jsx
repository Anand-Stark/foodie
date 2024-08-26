import { BeatLoader } from "react-spinners";

const Loader = () => {
    return (
        <div
            className="
            fixed
            inset-0
            flex
            justify-center
            items-center
            bg-white
            bg-opacity-75
            z-50
        "
        >
            <BeatLoader color="red" />
        </div>
    );
};

export default Loader;