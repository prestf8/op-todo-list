const DynamicStyling = (function () {
  "use strict";

  function styleTask(TASK_ID) {
    const selectedElement = document.querySelector(`[data-task-id='${TASK_ID}']`);
    console.log(selectedElement);
  }
  return { styleTask };
})();

export default DynamicStyling;
