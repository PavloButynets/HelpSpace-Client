import { Ref, forwardRef, useEffect } from "react";

import Container, { ContainerProps } from "@mui/material/Container";

import { spliceSx } from "~/utils/helper-functions";
import { styles } from "~/containers/page-wrapper/PageWrapper.styles";
import { useModalContext } from "~/context/modal-context";

const PageWrapper = (
  { children, sx, ...rest }: ContainerProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { closeModal } = useModalContext();

  useEffect(() => {
    return () => closeModal();
  }, [closeModal]);

  return (
    <Container
      maxWidth="lg"
      ref={ref}
      sx={spliceSx(styles.container, sx)}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default forwardRef(PageWrapper);
