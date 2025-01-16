import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "rive-react";

const STATE_MACHINE_NAME = "Login Machine";

export const useRiveAnimation = () => {
  const { rive, RiveComponent } = useRive({
    src: "teddy.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const isCheckingInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "isChecking"
  );
  const isHandsUpInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "isHandsUp"
  );

  return {
    RiveComponent,
    isCheckingInput,
    isHandsUpInput,
  };
};
