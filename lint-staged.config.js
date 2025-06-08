/* eslint-env node */
const formatCommand = 'prettier . --check';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  '*': formatCommand,
};
