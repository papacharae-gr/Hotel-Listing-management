import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";

const DeleteDialog: React.FC<{
  isDialogOpen: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteMutation: any;
  cancelRef: React.RefObject<HTMLButtonElement>;
}> = ({ isDialogOpen, handleCancelDelete, handleConfirmDelete, deleteMutation, cancelRef }) => {

  return (
    <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={cancelRef} onClose={handleCancelDelete} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Διαγραφή ξενοδοχείου</AlertDialogHeader>
            <AlertDialogBody>Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτό το ξενοδοχείο; Η ενέργεια δεν μπορεί να αναιρεθεί.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>Ακύρωση</Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3} isLoading={deleteMutation.isPending}>Διαγραφή</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    );
};

export default DeleteDialog;