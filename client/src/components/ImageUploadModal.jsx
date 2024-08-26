import React, { useState } from "react";
import { uploadImageToServer } from "../services/restaurantService";
import {
  setUploadedRestaurants,
  setUploadedDish,
  setLoading,
} from "../store/slices/imageSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbPhotoPlus } from "react-icons/tb";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const ImageUploadModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { loading } = useSelector((state) => state.image);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      dispatch(setLoading(true));
      const response = await uploadImageToServer(formData);
      dispatch(setUploadedRestaurants(response.data.restaurants));
      dispatch(setUploadedDish(response.data.cuisine));

      navigate(`/uploaded-restaurants`);

      onClose();
    } catch (error) {
      console.error("Error uploading image", error);
      alert("Failed to upload image");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center max-w-xl w-full">
            <h2 className="text-2xl font-bold mb-6">Upload an Image</h2>
            <div
              className="relative cursor-pointer hover:opacity-80 transition border-dashed border-2 border-neutral-300 p-16 flex flex-col justify-center items-center gap-6 text-neutral-600 w-full"
              onClick={() => document.getElementById("file-input").click()}
            >
              <TbPhotoPlus size={80} />
              <div className="font-semibold text-xl">Click to upload</div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {image && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6 gap-6 w-full items-center justify-center">
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleImageUpload}
                className="bg-black text-white px-8 py-3 rounded hover:bg-slate-900"
                disabled={!image}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploadModal;
