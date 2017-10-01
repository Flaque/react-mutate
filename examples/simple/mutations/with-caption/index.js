export default PreviewImage => {
  return props => (
    <div>
      <PreviewImage {...props} />
      <p> I am an added caption. </p>
    </div>
  );
};
