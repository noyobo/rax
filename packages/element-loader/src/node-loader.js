import parser from './parserHTML';
import loaderUtils from 'loader-utils';

module.exports = function(content) {
  this.cacheable();
  const query = loaderUtils.getOptions(this);
  const type = query.type;
  const parts = parser(content);
  let part = parts[type];
  let output = '';
  let source;

  if (Array.isArray(part)) {
    part = part[query.index];
  }

  if (type !== 'script') {
    output = part.content;
    source = parts;
  } else {
    output = `${query.banner}\n${part.content || defaultComponent}`;
  }

  this.callback(null, output, source);
};

const defaultComponent = `
  export default class extends Component {
    constructor(props) {
      super(props);
    }
  }
`;
