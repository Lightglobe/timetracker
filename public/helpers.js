window.helpers = (function () {
    function newTimer(attrs = {}) {
      const timer = {
        title: attrs.title || 'Timer',
        project: attrs.project || 'Project',
        id: uuid.v4(), // eslint-disable-line no-undef
        elapsed: 0,
      };
  
      return timer;
    }
  
    function findById(array, id, cb) {
      array.forEach((el) => {
        if (el.id === id) {
          cb(el);
          return;
        }
      });
    }
  


  
    function 
  
    return {
      millisecondsToHuman,
      newTimer,
      findById,
      renderElapsedString,
    };
  }());
  