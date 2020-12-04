
      let options = {"jsSandbox":true};
      export const getSlaveOptions = () => options;
      export const setSlaveOptions = (newOpts) => options = ({ ...options, ...newOpts });
      