import React from "react";

function ControlledOnboardingFlow({
  children,
  onFinish,
  currentIndex,
  onNext
}) {
  const currentChild = React.Children.toArray(children)[currentIndex];

  const goToNext = (stepData) => onNext(stepData);

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goToNext });
  }

  return currentChild;
}

export default ControlledOnboardingFlow;
