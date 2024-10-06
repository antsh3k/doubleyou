import React from "react";
// import { UploadButton as UploadButtonUploadThing} from "uploadthing/react"
import { UploadButton as UploadButtonUploadThing } from "../../utils/uploadthing";

const UploadButton = () => {
  return (
    <UploadButtonUploadThing
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadButton;
