const annotationsList = require('./annotations_list').default;
import ReactTestUtils from 'react-dom/test-utils'; // ES6


annotationsList("some_url");
////////////////////
//Functional and Integration Tests
///////////////////
test('Annotation Environment is properly initialized', () => {

});


//save something into chrome storage
function preTestWork(){

}
//mock an object from storage and pass it to the componentDidMount function to test conversion
//an integration test to see if the converted annotations are actually rendering in AnnotationList and the format of each AnnotationElement is ok
test('Annotations from storage are loaded', () => {
  let mockObj = {
    "some_url" : {"this is a quote": {annotation: "some annotation", channels: ["channel1", "channel2"]}}
  };

  preTestWork();

  const renderer = new ShallowRenderer();
  renderer.render(<AnnotationEnvironment />);
  const result = renderer.getRenderOutput();

  expect(result.props.annotationObjects).toBe();
});
test('New Annotations are successfully created and rendered', () => {

});
test('Editing annotations works and renders properly', () => {

});
test('Deleting annotations works and renders properly', () => {

});



////////////////////
//Unit Tests
///////////////////

//type checks --> React's propTypes?

//DS tests
//testing annotationMap()