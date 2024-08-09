
export const extractCloudinaryImageIdFromUrl = (imageUrlString) => {
    return imageUrlString.split("/").pop().split(".")[0];
}