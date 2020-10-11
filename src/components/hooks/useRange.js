const { useCallback } = require('react');

const useRange = () => useCallback(len => Array(+len).fill(null), []);

export default useRange;
