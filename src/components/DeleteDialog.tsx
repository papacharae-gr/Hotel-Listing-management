/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";


type DeleteDialogProps = {
  isDialogOpen: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
  deleteMutation: any;
  cancelRef: React.RefObject<HTMLButtonElement | null>;
  title: string;
  bodyText: string;
  cancelText?: string;
  confirmText?: string;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isDialogOpen,
  handleCancelDelete,
  handleConfirmDelete,
  deleteMutation,
  cancelRef,
  title,
  bodyText,
  cancelText ,
  confirmText ,
}) => {
  return (
    <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={cancelRef} onClose={handleCancelDelete} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">{title}</AlertDialogHeader>
          <AlertDialogBody>{bodyText}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCancelDelete}>{cancelText}</Button>
            <Button colorScheme="red" onClick={handleConfirmDelete} ml={3} isLoading={deleteMutation.isPending}>{confirmText}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteDialog;