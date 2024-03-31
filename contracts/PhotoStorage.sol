// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract ImageUpload {
    
    struct Image {
        string filename;
        int32 longitude; // Using fixed-point arithmetic for 5 decimal places
        int32 latitude; // Using fixed-point arithmetic for 5 decimal places
    }
    
    Image[] public images;
    
    // Function to upload an image
    function uploadImage(string memory _filename, int32 _longitude, int32 _latitude) public {
        images.push(Image(_filename, _longitude, _latitude));
    }
    
    // Function to get the count of uploaded images
    function getImageCount() public view returns (uint) {
        return images.length;
    }
    
    // Function to get image details by index
    function getImage(uint _index) public view returns (string memory, int32, int32) {
        require(_index < images.length, "Image does not exist");
        Image memory image = images[_index];
        return (image.filename, image.longitude, image.latitude);
    }
}
