import React from "react";
import { mutate } from "react-mutate";
import path from "path";
import withCaption from "../mutations/with-caption/index.js";
import PreviewImage from "../components/PreviewImage.js";

const MutatedPreviewImage = mutate(PreviewImage, {
  PreviewImage: withCaption
});

export default () => (
  <div>
    <MutatedPreviewImage src="https://media.giphy.com/media/Z3aQVJ78mmLyo/giphy-downsized-large.gif" />
  </div>
);
