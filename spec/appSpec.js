var Jasmine = require('jasmine');
var jasmine = new Jasmine();
const annotationsList = require('./annotations_list').default;
import TestUtils from 'react-addons-test-utils';


jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.configureDefaultReporter({
  showColors: true
});
jasmine.execute();

//run jasmine stuff here
annotationsList("some_Url");

const renderer = TestUtils.createRenderer();
function shallow(Component) {
  renderer.render(<AnnotationEnvironment/>);
  return renderer.getRenderOutput();
}

describe('low level testing a React Application', () => {
  it('should shallow render', () => {
    const bar = shallow(AnnotationEnvironment);
    expect(bar.type).toBe('div');
    expect(bar.props.className).toBe('annotationEnvironment');
  });
});

