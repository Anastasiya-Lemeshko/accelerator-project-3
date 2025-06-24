const addActiveView = (links, addActiveStyleFunction, removeActiveStyleFunction, addHoverStyleFunction, removeHoverStyleFunction) => {
  links.forEach((link) => {
    const handlePointerDown = (evt) => {
      addActiveStyleFunction(link);
      evt.target.setPointerCapture(evt.pointerId);
    };

    const handlePointerUp = (evt) => {
      removeActiveStyleFunction(link);
      evt.target.releasePointerCapture(evt.pointerId);
    };

    const handlePointerLeave = (evt) => {
      removeActiveStyleFunction(link);
      evt.target.releasePointerCapture(evt.pointerId);
    };

    const handlePointerEnter = () => {
      addHoverStyleFunction(link);
    };

    const handlePointerOut = () => {
      removeHoverStyleFunction(link);
    };

    link.addEventListener('pointerdown', handlePointerDown);
    link.addEventListener('pointerup', handlePointerUp);
    link.addEventListener('pointerleave', handlePointerLeave);
    link.addEventListener('pointercancel', handlePointerUp);
    link.addEventListener('pointerenter', handlePointerEnter);
    link.addEventListener('pointerout', handlePointerOut);
  });
};

export { addActiveView };
